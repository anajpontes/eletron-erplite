import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { app } from 'electron';
import { Product } from '../modules/stock/models/product.model';
import { User } from '../modules/users/models/user.model';

dotenv.config();

const isDev = !app.isPackaged;

const AllEntities = [User, Product];

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
  synchronize: isDev,
  logging: isDev,
  entities: AllEntities,
});
