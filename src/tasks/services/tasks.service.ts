import { Model } from 'mongoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Task } from './../entities/task.entity';
import { Db } from 'mongodb';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from './../dtos/tasks.dtos';

@Injectable()
export class TasksService {

  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('DB_MONGO') private dbMongo: Db,
    @Inject('TASK_MODEL') private taskModel: Model<Task>,
  ){
    console.log(apiKey);
  }

  private counterId = 1;
  /* private tasks: Task[] = [
    { id: 1, title: 'Tarea 1', completed: false, createdAt: new Date() },
  ]; */

  async findAll(params: FilterTaskDto) {

    const { limit = 10, offset = 0 } = params;

    const [totalElements, tasks] = await Promise.all([
      this.taskModel.countDocuments(),
      this.taskModel.find().skip(offset * limit).limit(limit).exec()
    ])

    const totalPages = (Math.ceil((totalElements / limit))) || 1;

    return { totalPages, totalElements, tasks };
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();


    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async create(payload: CreateTaskDto) {
    const newTask = new this.taskModel(payload);
    return await newTask.save();
  }

  async update(id: string, payload: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, { $set: payload}, { new: true}).exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async remove(id: string){
    return await this.taskModel.findByIdAndDelete(id).exec();
  }
}
