import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB();

export const createTable = async () => {
  const params = {
    TableName: 'peru-ppointments', 
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
      { AttributeName: 'appointmentId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'appointmentId', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  await dynamoDB.createTable(params).promise();
};

