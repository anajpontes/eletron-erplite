import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { AuthService } from './services/auth';
import { AppDataSource } from './services/datasource';
import { ProductsService } from './modules/stock/services/products.service';
import { ProductsController } from './modules/stock/controllers/products.controller';

if (started) {
  app.quit();
}

function setupIPC() {
  ipcMain.handle('auth:login', (_, email: string, password: string) => {
    const authService = new AuthService();
    return authService.login(email, password);
  });
  ipcMain.handle('products:index', (_) => {
    const service = new ProductsService();
    const products = new ProductsController(service);

    return products.index();
  });
}

const createWindow = () => {
  setupIPC();

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
};

const initializeApp = async () => {
  try {
    await AppDataSource.initialize();
    createWindow();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

app.on('ready', initializeApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
