import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { headers } from '../../libs/const';
import { dynamoDBClient } from '../../libs/dynamodb-cli';
import { dynamodbTable } from '../../libs/table-names';

export const run = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	console.log('hola mundo');
	console.log(process.env.STAGE);
	console.log(process.env.IS_OFFLINE);
	console.log(`${dynamodbTable.USER}-${process.env.STAGE}`);

	const output = await dynamoDBClient()
		.scan({
			TableName: `${dynamodbTable.USER}-${process.env.STAGE}`
		})
		.promise();

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify(output.Items)
	};
};

// export const run = rundev
