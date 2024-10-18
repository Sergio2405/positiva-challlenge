import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB();

export const createTable = async () => {
  const params = {
    TableName: 'Appointments',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },
      { AttributeName: 'appointmentId', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'appointmentId', AttributeType: 'S' },
      { AttributeName: 'doctor', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'DoctorIndex',
        KeySchema: [
          { AttributeName: 'doctor', KeyType: 'HASH' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };
  await dynamoDB.createTable(params).promise();
}

