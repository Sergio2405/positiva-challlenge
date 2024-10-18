import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class AppointmentDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  doctor: string;

  @IsNotEmpty()
  @IsString()
  hospital: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}

