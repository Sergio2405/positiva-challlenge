import { Country } from '@src/appointment/interface';
import { ChileAppointmentStatus } from '@src/appointment/chile/model';
import { PeruAppointmentStatus } from '@src/appointment/peru/model';

export interface Notification {
  action: string;
  userId: string;
  doctor: string;
  email: string;
  phone: string;
  status: PeruAppointmentStatus | ChileAppointmentStatus;
  country: Country;
}

export interface INotificationService {
  sendNotification(notification: Partial<Notification>): Promise<void>;
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendSms(phoneNumber: string, message: string): Promise<void>;
}
