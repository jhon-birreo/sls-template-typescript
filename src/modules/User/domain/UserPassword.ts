import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
	constructor(value: string) {
		super(value);
	}
}
