import { UserCreator } from '../modules/User/application/UserCreator';
import { UserDelete } from '../modules/User/application/UserDelete';
import { UserFind } from '../modules/User/application/UserFind';
import { DynamoDBUserRepository } from '../modules/User/infrastructure/persistence/DynamoDBUserRepository';
import { DynamoDBClientFactory } from '../shared/infrastructure/persistence/dynamoDB/DynamoDBClientFactory';
import DynamoDBConfig from '../shared/infrastructure/persistence/dynamoDB/DynamoDBConfig';

export function createServices(nameService: string): any {
	switch (nameService) {
		case 'DynamoDBUserRepository':
			const config: DynamoDBConfig = {
				region: process.env.AMAZON_REGION as string
			};

			if (process.env.APP_ENVIRONMENT === 'local') {
				console.log('cargando configuracion local dynamodb para companies');
				config.endpoint = process.env.DYNAMODB_LOCAL_ENDPOINT;
			}
			return new DynamoDBUserRepository(
				DynamoDBClientFactory.createClient(config),
				process.env.USER_TABLE_NAME as string
			);
			break;

		case 'UserCreator':
			return new UserCreator(<DynamoDBUserRepository>createServices('DynamoDBUserRepository'));
			break;
		case 'UserFind':
			return new UserFind(<DynamoDBUserRepository>createServices('DynamoDBUserRepository'));
			break;
		case 'UserDelete':
			return new UserDelete(<DynamoDBUserRepository>createServices('DynamoDBUserRepository'));
			break;

		default:
			break;
	}
}
