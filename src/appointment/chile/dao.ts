import { ChileAppointment, ChileAppointmentStatus } from './model';
import { DynamoDB } from 'aws-sdk';
import { generateUniqueId } from '../utils';

export interface IChileAppointmentsDao {
  create(userId: string, appointment: ChileAppointment): Promise<ChileAppointment>;
  updateStatus(userId: string, appointmentId: string, status: ChileAppointmentStatus): Promise<ChileAppointment>;
  listByUser(userId: string): Promise<ChileAppointment[]>;
}

export class ChileAppointmentsDao {
  private dynamoDB: DynamoDB.DocumentClient;
  private tableName: string = 'chile-appointments'; 

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient();
  }

  async create(userId: string, appointment: ChileAppointment) {
    const appointmentWithId = {
      ...appointment,
      userId,
      appointmentId: appointment.id || generateUniqueId(),
    };

    const params = {
      TableName: this.tableName,
      Item: appointmentWithId,
    };

    await this.dynamoDB.put(params).promise();
    return appointmentWithId;
  }

  async updateStatus(userId: string, appointmentId: string, status: ChileAppointmentStatus) {
    const params = {
      TableName: this.tableName,
      Key: {
        userId,
        appointmentId,
      },
      UpdateExpression: 'set #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDB.update(params).promise();
    return result.Attributes as ChileAppointment;
  }

  async listByUser(userId: string) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await this.dynamoDB.query(params).promise();
    return result.Items as ChileAppointment[];
  }

}

