import { NotificationService } from '@src/notification/service';
import { INotificationService, Notification } from '@src/notification/interface';
import {IAppointmentService} from '../interface';
import {ChileAppointmentsDao, IChileAppointmentsDao} from './dao';
import {ChileAppointment, ChileAppointmentStatus} from './model';

export class ChileAppointmentService implements IAppointmentService {
  private appointmentDao: IChileAppointmentsDao;
  private notificationService: INotificationService;

  constructor() {
    this.appointmentDao = new ChileAppointmentsDao();
    this.notificationService = new NotificationService();
  }

  async create(userId: string, appointment: ChileAppointment) {
    appointment.status = ChileAppointmentStatus.Assigned;
    return this.appointmentDao.create(userId, appointment);
  }

  async cancel(userId: string, appointmentId: string) {
    await this.appointmentDao.updateStatus(userId, appointmentId, ChileAppointmentStatus.Canceled);
  }

  async listByUser(userId: string) {
    return this.appointmentDao.listByUser(userId);
  }

  async sendAppointmentState(notification: Notification) {
    const message = `The state of your appointment has changed to => ${notification.status}`
    await this.notificationService.sendSms(notification.phone, message);
  }
}
