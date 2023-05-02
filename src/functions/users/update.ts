import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as yup from 'yup';
import { headers } from '../../libs/const';
import { dynamoDBClient } from '../../libs/dynamodb-cli';
import { handleError } from '../../libs/error-handler';
import { dynamodbTable } from '../../libs/table-names';
import { fetchUserById } from './findById';

export const run = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const schema = yup.object().shape({
			name: yup.string().required(),
			email: yup.string().required(),
			password: yup.number().required(),
			active: yup.bool().optional().default(true)
		});
		const id = event.pathParameters?.id as string;

		await fetchUserById(id);

		const reqBody = JSON.parse(event.body as string);

		await schema.validate(reqBody, { abortEarly: false });

		const user = {
			...reqBody,
			userID: id
		};

		await dynamoDBClient()
			.put({
				TableName: `${dynamodbTable.USER}-${process.env.STAGE}`,
				Item: user
			})
			.promise();

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(user)
		};
	} catch (e) {
		return handleError(e);
	}
};
