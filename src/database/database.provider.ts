import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://fjccandelario:HFX70a0JbfI9Fqdq@dbtodoveloci.vc9b7.mongodb.net/dbTodoVeloci?retryWrites=true&w=majority&appName=dbTodoVeloci'),
  },
];
