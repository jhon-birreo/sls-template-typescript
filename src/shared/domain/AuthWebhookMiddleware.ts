import { FormatJSONResponse } from './FormatJSONResponse';

export const AuthWebhookMiddleware = () => {
	const before = async (request: any) => {
		if (
			!request.event.headers['authorization'] ||
			request.event.headers['authorization'] !== `Bearer ${process.env.WEBHOOK_TOKEN}`
		) {
			return FormatJSONResponse(401, { status: 'Unauthorized' });
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const after = async (request: any) => {
		if (process.env.APP_ENVIRONMENT === 'local' && request.event.body.action === 'opened') {
			// console.log(request);
		}
	};

	return {
		before,
		after
	};
};
