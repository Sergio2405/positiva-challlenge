import { APIGatewayEvent, Handler } from 'aws-lambda';
import { AppointmentServiceFactory } from '@src/appointment/factory';
import { Country } from '@src/appointment/interface';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const claims = event.requestContext.authorizer?.claims;
    const userId = claims.sub;

    const appointmentData = JSON.parse(event.body || '{}');
    const country = event.pathParameters?.country as Country;

    const appointmentService = AppointmentServiceFactory.newService(country);
    const appointment = await appointmentService.create(userId,  appointmentData);

    return {
      statusCode: 201,
      body: JSON.stringify(appointment),
    };
  } catch (error) {
    console.error('Error creating appointment:', error);

    const errorMessage = (error as Error).message || 'An unknown error occurred';

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create appointment',
        error: errorMessage,
      }),
    };
  }
};

