import { Appointment } from '../interface';

export enum PeruAppointmentStatus {
  Registered = 'registered',
  Pending = 'pending',
  Assigned = 'assigned',
  Canceled = 'canceled',
}

export interface PeruAppointment extends Appointment {
  dni: string;
  status: PeruAppointmentStatus;
  district: string;
}

