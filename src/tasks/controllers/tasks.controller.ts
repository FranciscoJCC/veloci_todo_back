import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from '../dtos/tasks.dtos';

import { TasksService } from './../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getProducts(@Query() params: FilterTaskDto){
    return this.tasksService.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {

    const task = this.tasksService.findOne(productId);

    return task;
  }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    return this.tasksService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateTaskDto) {
    return this.tasksService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
