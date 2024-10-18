import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AppointmentDto } from '../dto';
import { PeruAppointmentStatus } from './model';

export class PeruAppointmentDto extends AppointmentDto {
  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsEnum(PeruAppointmentStatus)
  status: PeruAppointmentStatus

  @IsNotEmpty()
  @IsString()
  district: string;
}

