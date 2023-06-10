import { FormatJSONResponse } from './FormatJSONResponse';

export const AuthMiddleware = () => {
	const before = async (request: any) => {
		if (
			!request.event.headers['authorization'] ||
			request.event.headers['authorization'] !== `Bearer ${process.env.API_TOKEN}`
		) {
			// if (!request.event.headers["authorization"]) {
			return FormatJSONResponse(401, { status: 'Unauthorized' });
		}
	};

	const after = async (request: any) => {
		if (process.env.APP_ENVIRONMENT === 'local' && request.response.statusCode != 200) {
			console.log('error registrado', request.response.body);
			console.log(request);
		}
		if (process.env.APP_ENVIRONMENT === 'test' && request.response.statusCode != 200) {
			console.log('error registrado', request.response.body);
			console.log(request.event.rawBody);
		}
	};

	return {
		before,
		after
	};
};
