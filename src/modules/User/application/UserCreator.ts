import { Nullable } from '../../../shared/domain/Nullable';
import { TimeLine } from '../../../shared/domain/value-object/TimeLine';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserIsActive } from '../domain/UserIsActive';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserRepository } from '../domain/UserRepository';
import { UserRequest } from '../domain/UserRequest';

export class UserCreator {
	private readonly repository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.repository = userRepository;
	}

	async run(request: UserRequest): Promise<Nullable<User>> {
		console.log('-----user run -----');

		const user = User.create(
			new UserId(UserId.random().value),
			new UserName(request.name),
			new UserEmail(request.email),
			new UserPassword(request.password),
			new UserIsActive(true),
			TimeLine.fromPrimitives({
				created: new Date().toISOString(),
				updated: null,
				deleted: null
			})
		);
		await this.repository.save(user);
		return user;
	}
}
