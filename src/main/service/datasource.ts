import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modules/users/models/user.model';
import { Product } from '../modules/stock/models/product.model';
dotenv.config();

const AllEntities = [User,Product]

export const AppDataSource = new DataSource ({
    type: 'postgres',
    url : process.env.DATABASE_URL,
    ssl : true,
    extra : {
        ssl : { rejectUnauthorized: false },
    },
    synchronize: true,
    logging : false,
    entities: AllEntities,
});

export async function syncDatabase(){
    try{
        console.log('Conectando ao supabase para sincronizar esquema...');
        await AppDataSource.initialize();
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error){
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}