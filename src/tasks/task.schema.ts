import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  OVERDUE = 'Overdue',
  CANCELED = 'Canceled',
}

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop({ required: true })
  assignedTo: string;

  @Prop({ type: Date, required: true })
  deadline: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
