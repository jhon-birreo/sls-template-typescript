import { ulid } from 'ulid';
import { InvalidArgumentError } from './InvalidArgumentError';

export class Ulid {
	readonly value: string;

	static pattern = /[0-9A-HJKMNP-TV-Z]{26}/;

	constructor(value: string) {
		this.ensureIsValidUuid(value);

		this.value = value;
	}

	static random(): Ulid {
		return new Ulid(ulid());
	}

	private ensureIsValidUuid(id: string): void {
		if (!(typeof id === 'string' && Ulid.pattern.test(id))) {
			throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
		}
	}

	toString(): string {
		return this.value;
	}
}
