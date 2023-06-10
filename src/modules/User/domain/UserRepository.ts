import { Nullable } from '../../../shared/domain/Nullable';
import { Query } from '../../../shared/domain/Query';
import { User } from './User';
import { UserId } from './UserId';

export interface UserRepository {
	save(user: User): Promise<void>;

	search(query: Query): Promise<Nullable<User[]>>;

	getUserById(id: UserId): Promise<Nullable<User>>;

	getUser(): Promise<Nullable<User[]>>;

	deleteUser(id: string): Promise<void>;
}
