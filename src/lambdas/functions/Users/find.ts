import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserFind } from '../../../modules/User/application/UserFind';
import { createServices } from '../../../services/factory';
import { FormatJSONResponse } from '../../../shared/domain/FormatJSONResponse';
import { Middyfy } from '../../../shared/domain/Middyfy';
import { ProviderError } from '../../../shared/domain/value-object';
import { DomainError } from '../../../shared/domain/value-object/DomainError';
const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const body = event;
		const service = <UserFind>createServices('UserFind');

		const user = await service.run();

		if (!user) {
			throw new DomainError('El Usuario no se creo');
		}
		return FormatJSONResponse(200, {
			status: 200,
			message: 'Operación realizada con éxito',
			data: {
				user: user.map((user) => user.toPrimitives())
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
