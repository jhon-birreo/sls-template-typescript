import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserCreator } from '../../../modules/User/application/UserCreator';
import { createServices } from '../../../services/factory';
import { FormatJSONResponse } from '../../../shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../shared/domain/Middyfy';
import { ProviderError } from '../../../shared/domain/value-object';
import { DomainError } from '../../../shared/domain/value-object/DomainError';
const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const body: any = event.body;
		console.log(body);

		const service = <UserCreator>createServices('UserCreator');

		const user = await service.run(body);

		if (!user) {
			throw new DomainError('El Usuario no se creo');
		}
		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				user
			}
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
