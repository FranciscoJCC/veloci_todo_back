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
  Res,
  ParseIntPipe,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
/* import { ParseIntPipe } from '../../common/parse-int.pipe'; */
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from '../dtos/tasks.dtos';

import { TasksService } from './../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getProducts(@Query() params: FilterTaskDto){
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.tasksService.findAll(params);
  }

  /* @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  } */

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    const task = this.tasksService.findOne(productId);

    return task;
  }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
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
