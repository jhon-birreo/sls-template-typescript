export class ProviderError extends Error {
	statusCode = 500;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.name = 'ProviderError';
		this.statusCode = statusCode || 500;
		Object.setPrototypeOf(this, ProviderError.prototype);
	}
}
