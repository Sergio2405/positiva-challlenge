import { NotificationService } from '@src/notification/service';
import { INotificationService, Notification } from '@src/notification/interface';
import {IAppointmentService} from '../interface';
import {PeruAppointmentsDao, IPeruAppointmentsDao} from './dao';
import { PeruAppointment, PeruAppointmentStatus } from './model';

export class PeruAppointmentService implements IAppointmentService {
  private appointmentDao: IPeruAppointmentsDao;
  private notificationService: INotificationService;

  constructor() {
    this.appointmentDao = new PeruAppointmentsDao();
    this.notificationService = new NotificationService();
  }

  async create(userId: string, appointment: PeruAppointment) {
    appointment.status = PeruAppointmentStatus.Registered;

    const notification = {action: appointment.status, userId, ...appointment} 

    await this.notificationService.sendNotification(notification)
    return this.appointmentDao.create(userId, appointment);
  }

  async cancel(userId: string, appointmentId: string) {
    await this.appointmentDao.updateStatus(userId, appointmentId, PeruAppointmentStatus.Canceled);
  }

  async listByUser(userId: string) {
    return this.appointmentDao.listByUser(userId);
  }

  async sendAppointmentState(notification: Notification) {
    const emailTo = notification.email;
    const subject = `Appointment Status Update: ${notification.status}`;
    const body = `Hello,\n\nYour appointment with Dr. ${notification.doctor} is now ${notification.status}.\n\nCountry: ${notification.country}\n\nThank you!`;

    await this.notificationService.sendEmail(emailTo, subject, body);
  }

}
