import {IAppointmentService, Country} from './interface';
import {PeruAppointmentService} from './peru/service';
import {ChileAppointmentService} from './chile/service';

export class AppointmentServiceFactory {
  static newService(country: Country): IAppointmentService {
    switch (country) {
      case Country.Peru:
        return new PeruAppointmentService();
      case Country.Chile:
        return new ChileAppointmentService();
      default:
        throw new Error('Unsupported country');
    }
  }
}


