import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { databaseProviders } from './database.provider';

const API_KEY_PROD = 'prod123';
const API_KEY_DEV = 'dev123';



@Global()
@Module({
  providers: [
    ...databaseProviders,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_DEV
    },
    {
      provide: 'DB_MONGO',
      useFactory: async () => {
        //Recomendable pasar datos sensibles a variables de entorno
        const uri = `mongodb+srv://fjccandelario:HFX70a0JbfI9Fqdq@dbtodoveloci.vc9b7.mongodb.net/?retryWrites=true&w=majority&appName=dbTodoVeloci`;
        const client = new MongoClient(uri);

        await client.connect();

        const database = client.db("dbTodoVeloci");

        return database;
      }
    }
  ],
  exports: ['API_KEY', 'DB_MONGO', ...databaseProviders]
})
export class DatabaseModule {}
