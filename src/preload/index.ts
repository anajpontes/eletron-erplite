import { contextBridge, ipcRenderer } from 'electron';
import { version } from '../../package.json';

contextBridge.exposeInMainWorld('api', {
  status: 'online',
  version,
  login: (email: string, password: string) => {
    return ipcRenderer.invoke('auth:login', email, password);
  },
  products: () => {
    return ipcRenderer.invoke('products:list');
  },
});
