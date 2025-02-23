import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  createdAt: {type: Date, default: Date.now},
})
