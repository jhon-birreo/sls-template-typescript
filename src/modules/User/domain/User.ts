import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import {
	TimeLine,
	TimeLineCreatedAt,
	TimeLineDeletedAt,
	TimeLineUpdatedAt
} from '../../../shared/domain/value-object/TimeLine';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserIsActive } from './UserIsActive';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
export class User extends AggregateRoot {
	readonly id: UserId;
	readonly name: UserName;
	readonly email: UserEmail;
	readonly password: UserPassword;
	readonly isActive: UserIsActive;
	readonly timeLine: TimeLine;
	constructor(
		id: UserId,
		name: UserName,
		email: UserEmail,
		password: UserPassword,
		isActive: UserIsActive,
		timeLine: TimeLine
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.isActive = isActive;
		this.timeLine = timeLine;
	}
	static create(
		id: UserId,
		name: UserName,
		email: UserEmail,
		password: UserPassword,
		isActive: UserIsActive | null,
		timeLine: TimeLine
	): User {
		const user = new User(id, name, email, password, isActive, timeLine);
		return user;
	}

	toPrimitives() {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			password: this.password.value,
			isActive: this.isActive ? this.isActive.value : true,
			timeLine: this.timeLine.toPrimitives()
		};
	}

	static fromPrimitives(primitives: any) {
		return new User(
			new UserId(primitives.id),
			new UserName(primitives.name),
			new UserEmail(primitives.email),
			new UserPassword(primitives.password),
			new UserIsActive(primitives.isActive ?? false),
			new TimeLine(
				TimeLineCreatedAt.fromString(primitives.timeLine.created),
				primitives.timeLine.updated ? TimeLineUpdatedAt.fromString(primitives.timeLine.updated) : null,
				primitives.timeLine.deleted ? TimeLineDeletedAt.fromString(primitives.timeLine.deleted) : null
			)
		);
	}

	updateFromPrimitives(plainData: any): User {
		return User.fromPrimitives({
			...this.toPrimitives(),
			...plainData,
			...{
				timeLine: {
					...this.timeLine.toPrimitives(),
					...{
						updated: new Date().toISOString()
					}
				}
			}
		});
	}
}
