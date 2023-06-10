import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserFind } from '../../../modules/User/application/UserFind';
import { createServices } from '../../../services/factory';
import { FormatJSONResponse } from '../../../shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../shared/domain/Middyfy';
import { DomainError } from '../../../shared/domain/value-object/DomainError';
import { ProviderError } from '../../../shared/domain/value-object';
const handler = async (event: APIGatewayProxyEvent) => {
	try {
		const params: any = event.pathParameters;
		console.log(params);

		const service = <UserFind>createServices('UserFind');

		const user = await service.findById(params.id);

		if (!user) {
			throw new DomainError('El Usuario no se creo');
		}
		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				user: user.toPrimitives()
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
