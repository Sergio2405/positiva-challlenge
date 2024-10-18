import { Appointment } from '../interface';

export enum ChileAppointmentType {
  Phone = 'phone',
  Virtual = 'virtual',
  Other = 'other',
  InPerson = 'in_person'
}

export enum ChileAppointmentStatus {
  Assigned = 'assigned',
  Canceled = 'canceled',
}

export interface ChileAppointment extends Appointment {
  birthday: string;
  status: ChileAppointmentStatus;
  type: ChileAppointmentType;
}

