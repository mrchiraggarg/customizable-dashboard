import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

export interface WidgetConfig {
  id: string;
  type: 'weather' | 'news' | 'stocks' | 'todo';
  title: string;
  enabled: boolean;
}

export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DashboardContextType {
  widgets: WidgetConfig[];
  layout: Layout[];
  updateWidgetEnabled: (id: string, enabled: boolean) => void;
  updateLayout: (newLayout: Layout[]) => void;
  saveDashboard: () => Promise<void>;
  loadDashboard: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

const defaultWidgets: WidgetConfig[] = [
  { id: 'weather', type: 'weather', title: 'Weather', enabled: true },
  { id: 'news', type: 'news', title: 'News', enabled: true },
  { id: 'stocks', type: 'stocks', title: 'Stock Market', enabled: true },
  { id: 'todo', type: 'todo', title: 'To-Do List', enabled: true },
];

const defaultLayout: Layout[] = [
  { i: 'weather', x: 0, y: 0, w: 2, h: 2 },
  { i: 'news', x: 2, y: 0, w: 4, h: 3 },
  { i: 'stocks', x: 0, y: 2, w: 3, h: 2 },
  { i: 'todo', x: 3, y: 2, w: 3, h: 3 },
];

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
  const [layout, setLayout] = useState<Layout[]>(defaultLayout);

  useEffect(() => {
    if (user) {
      loadDashboard();
    } else {
      // Load from localStorage for non-authenticated users
      const savedWidgets = localStorage.getItem('dashboard-widgets');
      const savedLayout = localStorage.getItem('dashboard-layout');
      
      if (savedWidgets) setWidgets(JSON.parse(savedWidgets));
      if (savedLayout) setLayout(JSON.parse(savedLayout));
    }
  }, [user]);

  const updateWidgetEnabled = (id: string, enabled: boolean) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, enabled } : w));
  };

  const updateLayout = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  const saveDashboard = async () => {
    try {
      if (user) {
        // Save to Firebase
        await setDoc(doc(db, 'dashboards', user.uid), {
          widgets,
          layout,
          updatedAt: new Date(),
        });
      } else {
        // Save to localStorage
        localStorage.setItem('dashboard-widgets', JSON.stringify(widgets));
        localStorage.setItem('dashboard-layout', JSON.stringify(layout));
      }
    } catch (error) {
      console.error('Error saving dashboard:', error);
    }
  };

  const loadDashboard = async () => {
    try {
      if (user) {
        // Load from Firebase
        const docRef = doc(db, 'dashboards', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWidgets(data.widgets || defaultWidgets);
          setLayout(data.layout || defaultLayout);
        }
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  // Auto-save changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveDashboard();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [widgets, layout]);

  return (
    <DashboardContext.Provider value={{
      widgets,
      layout,
      updateWidgetEnabled,
      updateLayout,
      saveDashboard,
      loadDashboard,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};