import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserDelete } from '../../../modules/User/application/UserDelete';
import { createServices } from '../../../services/factory';
import { FormatJSONResponse } from '../../../shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../shared/domain/Middyfy';
import { ProviderError } from '../../../shared/domain/value-object';
import { DomainError } from '../../../shared/domain/value-object/DomainError';
const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const params: any = event.pathParameters;
		console.log(params);

		const service = <UserDelete>createServices('UserDelete');

		await service.run(params.id);

		return FormatJSONResponse(200, {
			status: 200,
			message: '👉️ Usuario Eliminado!'
		});
	} catch (error) {
		return handleError(error);
	}
	function handleError(error: any) {
		if (error instanceof DomainError) {
			return FormatJSONResponse(error.statusCode, {
				status: error.statusCode,
				error: {
					message: error.message
				}
			});
		}
		if (error instanceof ProviderError) {
			return FormatJSONResponse(error.statusCode, {
				status: error.statusCode,
				error: {
					message: error.message
				}
			});
		}
	}
};
export const run = Middyfy(handler);
