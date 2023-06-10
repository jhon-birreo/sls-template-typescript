import { DomainError } from '../../../shared/domain/value-object/DomainError';
import { Nullable } from '../../../shared/domain/Nullable';
import { UserNotFoundException } from '../domain/errors/domain/UserNotFound';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserFind {
	private readonly repository: UserRepository;
	constructor(userRepository: UserRepository) {
		this.repository = userRepository;
	}

	async run(): Promise<Nullable<User[]>> {
		const user = await this.getUser();
		return user;
	}
	async findById(uuid: string): Promise<Nullable<User>> {
		const user = await this.getUserById(uuid);
		return user;
	}

	private async getUserById(uuid: string): Promise<User> {
		const user = await this.repository.getUserById(new UserId(uuid));

		if (!user) {
			throw new UserNotFoundException();
		}

		return user;
	}
	private async getUser(): Promise<User[]> {
		const user = await this.repository.getUser();
		if (!user) {
			throw new UserNotFoundException();
		}

		return user;
	}
}
