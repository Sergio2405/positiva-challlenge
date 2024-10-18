import { SNS, SES } from 'aws-sdk';
import { INotificationService, Notification } from './interface';

export class NotificationService implements INotificationService {
  private snsClient: SNS;
  private sesClient: SES;
  private topicArn: string;
  private senderEmail: string;

  constructor() {
    this.snsClient = new SNS();
    this.sesClient = new SES();
    this.topicArn = process.env.SNS_TOPIC_ARN || 'DefaultTopicArn';
    this.senderEmail = process.env.SES_VERIFIED_EMAIL || 'example@example.com';
  }

  async sendNotification(notification: Notification) {
    const message = JSON.stringify(notification);
    await this.snsClient.publish({
      TopicArn: this.topicArn,
      Message: message,
    }).promise();
  }

  async sendEmail(to: string, subject: string, body: string) {
    await this.sesClient.sendEmail({
      Source: this.senderEmail,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    }).promise();
  }

  async sendSms(phoneNumber: string, message: string) {
    const params = {
      Message: message,
      PhoneNumber: phoneNumber,
    };

    try {
      const result = await this.snsClient.publish(params).promise();
      console.log(`SMS sent successfully. Message ID: ${result.MessageId}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
}

