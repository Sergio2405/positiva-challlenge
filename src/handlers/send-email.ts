import { SNSEvent, SNSHandler } from "aws-lambda";
import { AppointmentServiceFactory } from '@src/appointment/factory';
import { Country } from '@src/appointment/interface';

export const handler: SNSHandler = async (event: SNSEvent): Promise<void> => {
  try {
    for (const record of event.Records) {
      const message: string = record.Sns.Message;
      const messageId: string = record.Sns.MessageId;

      console.log(`Received message with ID: ${messageId}`);
      console.log(`Message: ${message}`);

      const notification = JSON.parse(message);

      const appointmentService = AppointmentServiceFactory.newService(Country.Peru);
      appointmentService.sendAppointmentState(notification);
    }
  } catch (error) {
    console.error('Error processing SNS event:', error);
  }
};

