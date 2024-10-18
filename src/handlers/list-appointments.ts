import { APIGatewayEvent, Handler } from 'aws-lambda';
import { AppointmentServiceFactory } from '@src/appointment/factory';
import { Country } from '@src/appointment/interface';

export const handler: Handler = async (event: APIGatewayEvent) => {
  try {
    const claims = event.requestContext.authorizer?.claims;
    const userId = claims.sub;

    const country = event.pathParameters?.country as Country;

    const appointmentService = AppointmentServiceFactory.newService(country);
    const appointments = await appointmentService.listByUser(userId);

    return {
      statusCode: 201,
      body: JSON.stringify(appointments),
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

