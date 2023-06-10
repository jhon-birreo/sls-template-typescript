import {
	DeleteCommandInput,
	DeleteCommandOutput,
	DynamoDBDocument,
	GetCommandInput,
	GetCommandOutput,
	PutCommandInput,
	PutCommandOutput,
	QueryCommandInput,
	QueryCommandOutput,
	ScanCommandInput,
	ScanCommandOutput
} from '@aws-sdk/lib-dynamodb';
import { AggregateRoot } from '../../../../Shared/domain/AggregateRoot';
export abstract class DynamoDBRepository<T extends AggregateRoot> {
	constructor(private _client: Promise<DynamoDBDocument>, private _tableName: string) {}

	protected abstract moduleName(): string;

	protected abstract setIndexes(aggregateRoot: T): { [key: string]: string };

	protected abstract convertToId(pk: string): string;

	protected abstract convertToPk(id: string): string;

	protected client(): Promise<DynamoDBDocument> {
		return this._client;
	}

	protected tableName(): string {
		return this._tableName;
	}

	protected async getItem(params: GetCommandInput): Promise<GetCommandOutput> {
		return (await this._client).get(params);
	}

	protected async persist(id: string, aggregateRoot: T): Promise<PutCommandOutput> {
		console.log('--------persist');

		const item = {
			PK: this.convertToPk(id),
			...aggregateRoot.toPrimitives()
		};

		const params: PutCommandInput = {
			TableName: this.tableName(),
			Item: item
		};
		try {
			const result = (await this._client).put(params);

			return result;
		} catch (error) {
			console.log('----Error');

			console.log(error);
		}
	}

	protected async query(query: QueryCommandInput): Promise<QueryCommandOutput> {
		return (await this._client).query(query);
	}

	protected async scan(query: ScanCommandInput): Promise<ScanCommandOutput> {
		return (await this._client).scan(query);
	}

	protected async delete(params: DeleteCommandInput): Promise<DeleteCommandOutput> {
		return (await this._client).delete(params);
	}
}
