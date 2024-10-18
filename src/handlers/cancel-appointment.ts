import 'reflect-metadata'
import { APIGatewayEvent, Handler } from 'aws-lambda';
import { AppointmentServiceFactory } from '@src/appointment/factory';
import { Country } from '@src/appointment/interface';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const claims = event.requestContext.authorizer?.claims;
    const userId = claims.sub;

    const appointmentId = event.pathParameters?.appointmentId as string;
    const country = event.pathParameters?.country as Country;

    const appointmentService = AppointmentServiceFactory.newService(country);
    await appointmentService.cancel(userId, appointmentId);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Appointment canceled successfully',
      }),
    };
  } catch (error) {
    console.error('Error canceling appointment:', error);

    const errorMessage = (error as Error).message || 'An unknown error occurred';

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to cancel appointment',
        error: errorMessage,
      }),
    };
  }
};

