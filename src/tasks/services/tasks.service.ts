import { Model } from 'mongoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Task } from './../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto, FilterTaskDto } from './../dtos/tasks.dtos';

@Injectable()
export class TasksService {

  constructor(@Inject('TASK_MODEL') private taskModel: Model<Task>,){}

  async findAll(params: FilterTaskDto) {

    const { limit = 10, offset = 0 } = params;

    const [totalElements, tasks, completedTasks] = await Promise.all([
      this.taskModel.countDocuments(),
      this.taskModel.find().skip(offset).limit(limit).sort({ createdAt: -1 }).exec(),
      this.taskModel.find({ completed: true }).countDocuments()
    ])

    const totalPages = (Math.ceil((totalElements / limit))) || 1;

    return { totalPages, totalElements, completedTasks, tasks };
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
