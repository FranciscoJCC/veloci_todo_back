import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* import { TasksService } from './services/tasks/tasks.service'; */
/* import { TasksController } from './controllers/tasks/tasks.controller'; */
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';



async function run() {


 /*  const taskCollection = database.collection("tasks");
  const tasks = await taskCollection.find().toArray();
  console.log("TASKS", tasks) */
}

run()
@Module({
  imports: [TasksModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
