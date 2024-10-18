import { Notification } from '@src/notification/interface';

export enum Country {
  Peru = 'peru',
  Chile = 'chile',
}

export interface Appointment {
  id?: string;
  doctor: string;
  hospital: string;
  date: string;
  time: string;
}

export interface IAppointmentService {
  create(userId: string, appointment: Appointment): Promise<Appointment>;
  cancel(userId: string, appointmentId: string): Promise<void>;
  listByUser(userId: string): Promise<Appointment[]>;
  sendAppointmentState(notification: Notification): Promise<void>;
}
