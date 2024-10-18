import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AppointmentDto } from '../dto';
import { ChileAppointmentStatus, ChileAppointmentType } from './model';

export class ChileAppointmentDto extends AppointmentDto {
  @IsNotEmpty()
  @IsString()
  fotoUrl: string;

  @IsNotEmpty()
  @IsEnum(ChileAppointmentType)
  type: ChileAppointmentType;

  @IsNotEmpty()
  @IsEnum(ChileAppointmentStatus)
  status: ChileAppointmentStatus;
}
