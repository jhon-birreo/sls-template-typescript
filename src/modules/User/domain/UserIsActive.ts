import { BooleanValueObject } from '../../../shared/domain/value-object/BooleanValueObject';

export class UserIsActive extends BooleanValueObject {
	constructor(value: boolean) {
		super(value);
	}
}
