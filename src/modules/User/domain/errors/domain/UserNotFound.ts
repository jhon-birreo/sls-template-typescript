import { DomainError } from '../../../../../shared/domain/value-object';

export class UserNotFoundException extends DomainError {
	constructor() {
		super('User not foundx', 404);
	}
}
