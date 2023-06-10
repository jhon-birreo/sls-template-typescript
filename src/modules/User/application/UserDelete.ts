import { UserRepository } from '../domain/UserRepository';
import { UserNotFoundException } from '../domain/errors/domain/UserNotFound';
import { UserFind } from './UserFind';

export class UserDelete {
	private readonly repository: UserRepository;
	private readonly userFind: UserFind;
	constructor(userRepository: UserRepository) {
		this.repository = userRepository;
		this.userFind = new UserFind(userRepository);
	}

	async run(uuid: string): Promise<void> {
		const user = await this.userFind.findById(uuid);
		if (!user) {
			console.log('user no found');

			throw new UserNotFoundException();
		}
		await this.repository.deleteUser(uuid);
	}
}
