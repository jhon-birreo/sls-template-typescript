import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { headers } from '../../libs/const';
import { dynamoDBClient } from '../../libs/dynamodb-cli';
import { HttpError, handleError } from '../../libs/error-handler';
import { dynamodbTable } from '../../libs/table-names';

export const fetchUserById = async (id: string) => {
	const output = await dynamoDBClient()
		.get({
			TableName: `${dynamodbTable.USER}-${process.env.STAGE}`,
			Key: {
				userID: id
			}
		})
		.promise();

	if (!output.Item) {
		throw new HttpError(404, { error: 'not found' });
	}

	return output.Item;
};
export const run = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const product = await fetchUserById(event.pathParameters?.id as string);

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(product)
		};
	} catch (e) {
		return handleError(e);
	}
};
