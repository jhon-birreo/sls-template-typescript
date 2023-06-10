export class DomainError extends Error {
	statusCode = 400;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.statusCode = statusCode || 400;
		this.name = 'DomainError';
		Object.setPrototypeOf(this, DomainError.prototype);
	}
}
