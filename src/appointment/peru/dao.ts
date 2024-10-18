import { DynamoDB } from 'aws-sdk';
import { PeruAppointment, PeruAppointmentStatus } from './model';
import { generateUniqueId } from '../utils';

export interface IPeruAppointmentsDao {
  create(userId: string, appointment: PeruAppointment): Promise<PeruAppointment>;
  updateStatus(userId: string, appointmentId: string, status: PeruAppointmentStatus): Promise<PeruAppointment>;
  listByUser(userId: string): Promise<PeruAppointment[]>;
}

export class PeruAppointmentsDao implements IPeruAppointmentsDao {
  private dynamoDB: DynamoDB.DocumentClient;
  private tableName: string = 'peru-appointments';

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient();
  }

  async create(userId: string, appointment: PeruAppointment) {
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

  async updateStatus(userId: string, appointmentId: string, status: PeruAppointmentStatus) {
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
    return result.Attributes as PeruAppointment;
  }

  async listByUser(userId: string){
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await this.dynamoDB.query(params).promise();
    return result.Items as PeruAppointment[];
  }

  
}

