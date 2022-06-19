import { IsString, IsNotEmpty, IsArray } from "class-validator";

export class CreateList {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  movies: number[];
}