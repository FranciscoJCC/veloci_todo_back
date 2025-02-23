import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { DatabaseModule } from './../database/database.module';
import { taskProviders } from './providers/task.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProviders],
})
export class TasksModule {
}
