import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { dynamoDBClient } from '../../libs/dynamodb-cli';
import { handleError } from '../../libs/error-handler';
import { dynamodbTable } from '../../libs/table-names';
import { fetchUserById } from './findById';

export const run = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const id = event.pathParameters?.id as string;

		await fetchUserById(id);

		await dynamoDBClient()
			.delete({
				TableName: `${dynamodbTable.USER}-${process.env.STAGE}`,
				Key: {
					userID: id
				}
			})
			.promise();

		return {
			statusCode: 204,
			body: ''
		};
	} catch (e) {
		return handleError(e);
	}
};
