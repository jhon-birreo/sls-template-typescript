import { Nullable } from '../../../../shared/domain/Nullable';
import { Query } from '../../../../shared/domain/Query';
import { ProviderError } from '../../../../shared/domain/value-object/ProviderError';
import { DynamoDBRepository } from '../../../../shared/infrastructure/persistence/dynamoDB/DynamoDBRepository';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';

export class DynamoDBUserRepository extends DynamoDBRepository<User> implements UserRepository {
	public async save(user: User): Promise<void> {
		await this.persist(user.id.value, user);
	}

	public async getUserById(id: UserId): Promise<Nullable<User>> {
		const response = await this.getItem({
			TableName: this.tableName(),
			Key: {
				PK: this.convertToPk(id.value)
			}
		});

		if (!response.Item) {
			return null;
		}

		const userRaw = response.Item;

		return User.fromPrimitives({
			...userRaw,
			...{
				id: userRaw.PK
			}
		});
	}
	public async getUser(): Promise<Nullable<User[]>> {
		const response = await this.scan({
			TableName: this.tableName(),
			FilterExpression: '#isActive = :isActive',
			ExpressionAttributeNames: { '#isActive': 'isActive' },
			ExpressionAttributeValues: {
				':isActive': true
			}
		});

		if (!response.Items) {
			return null;
		}

		const userRaw = response.Items;

		return userRaw.map((item) =>
			User.fromPrimitives({
				...item,
				...{
					id: item.PK
				}
			})
		);
	}

	public async search(params: Query): Promise<Nullable<User[]>> {
		const response = await this.query({
			TableName: this.tableName(),
			KeyConditionExpression: params.conditions,
			ExpressionAttributeValues: params.values
		});
		if (!response.Items) {
			return null;
		}

		const items = await Promise.all(
			response.Items.map((item) => {
				return User.fromPrimitives({
					...item
				});
			})
		);
		return items;
	}

	public async deleteUser(uuid: string): Promise<void> {
		try {
			await this.delete({
				TableName: this.tableName(),
				Key: {
					PK: this.convertToPk(uuid)
				}
			});
		} catch (error) {
			throw new ProviderError(error.message);
		}
	}

	protected setIndexes(user: User): { [key: string]: string } {
		return {
			SK: `${user.id.value}`,
			GSI1PK: `${user.isActive}`,
			GSI1SK: `${user.timeLine.created.value.getTime()}`
		};
	}

	protected moduleName(): string {
		return 'USER';
	}

	protected convertToId(pk: string): string {
		return pk;
	}

	protected convertToPk(id: string): string {
		return id;
	}
}
