import type { APIGatewayProxyResultV2 } from 'aws-lambda';

export const FormatJSONResponse = (statusCode: number, response: object): APIGatewayProxyResultV2 => {
	return {
		isBase64Encoded: false,
		statusCode: statusCode,
		body: JSON.stringify(response),
		headers: {
			'content-type': 'application/json'
		}
	};
};
