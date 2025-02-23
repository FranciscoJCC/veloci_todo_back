import { Document } from "mongoose";

export class Task extends Document {
  title: string;
  completed: boolean;
  //createdAt: Date;
}
