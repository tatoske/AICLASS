import axios from 'axios';
import { initialMockData } from './mockData';

const savedBackend = localStorage.getItem('aiclass_backend_port') || '8080';

export const apiClient = axios.create({
  baseURL: `http://localhost:${savedBackend}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1500,
});

// Helper for local mock storage
const getMockCollection = (resource: string) => {
  const key = `aiclass_mock_${resource}`;
  let data = localStorage.getItem(key);
  if (!data) {
    const defaultData = (initialMockData as any)[resource] || [];
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

const setMockCollection = (resource: string, data: any[]) => {
  const key = `aiclass_mock_${resource}`;
  localStorage.setItem(key, JSON.stringify(data));
};

// Axios response interceptor for automatic mock fallback if backend is not running
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If connection refused / timeout / network error
    if (!error.response || error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      const config = error.config;
      const url = config.url || '';
      const method = (config.method || 'get').toLowerCase();

      // Extract resource name (e.g. /courses, /gradebook, /tasks)
      const cleanUrl = url.replace(/^\/api/, '').replace(/^\//, '').split('?')[0];
      const parts = cleanUrl.split('/');
      const resource = parts[0];
      const id = parts[1];

      let collection = getMockCollection(resource);

      if (method === 'get') {
        if (id) {
          const item = collection.find((item: any) => item.id === id);
          return Promise.resolve({ data: item || null, status: item ? 200 : 404 });
        }
        return Promise.resolve({ data: collection, status: 200 });
      }

      if (method === 'post') {
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
        const newItem = {
          id: body.id || `mock_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          ...body
        };
        // Auto calculation for grades if needed
        if (resource === 'gradebook' && newItem.saberScore !== undefined) {
          const s = newItem.saberScore || 0;
          const h = newItem.hacerScore || 0;
          const ser = newItem.serScore || 0;
          const calc = (s * 0.4) + (h * 0.4) + (ser * 0.2);
          newItem.finalScore = Math.round(calc * 100) / 100;
          newItem.performanceLevel = newItem.finalScore >= 4.6 ? 'SUPERIOR' : newItem.finalScore >= 4.0 ? 'ALTO' : newItem.finalScore >= 3.0 ? 'BÁSICO' : 'BAJO';
        }

        collection.push(newItem);
        setMockCollection(resource, collection);
        return Promise.resolve({ data: newItem, status: 201 });
      }

      if (method === 'put') {
        const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
        const index = collection.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          collection[index] = { ...collection[index], ...body, id };
          setMockCollection(resource, collection);
          return Promise.resolve({ data: collection[index], status: 200 });
        }
        return Promise.resolve({ data: body, status: 200 });
      }

      if (method === 'delete') {
        collection = collection.filter((item: any) => item.id !== id);
        setMockCollection(resource, collection);
        return Promise.resolve({ data: null, status: 204 });
      }
    }

    return Promise.reject(error);
  }
);

export const setBackendPort = (port: '8080' | '8000') => {
  localStorage.setItem('aiclass_backend_port', port);
  apiClient.defaults.baseURL = `http://localhost:${port}/api`;
  window.location.reload();
};

export const getCurrentBackendPort = (): string => {
  return localStorage.getItem('aiclass_backend_port') || '8080';
};

export const getApiUrl = (): string => {
  const port = getCurrentBackendPort();
  return `http://localhost:${port}/api`;
};
