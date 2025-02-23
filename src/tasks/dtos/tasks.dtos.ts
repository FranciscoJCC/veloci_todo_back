import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto{
  @IsString({message: 'El titulo debe ser un texto'})
  @IsNotEmpty({ message: 'El titulo de la tarea es obligatorio'})
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto){}

export class FilterTaskDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
  //tasks: string;
}
