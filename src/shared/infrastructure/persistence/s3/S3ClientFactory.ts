import { S3Client } from '@aws-sdk/client-s3';
import S3Config from './S3Config';
import { Nullable } from '../../../domain/Nullable';

export class S3ClientFactory {
	private static clients: S3Client;

	static async createClient(config: S3Config): Promise<S3Client> {
		let client = S3ClientFactory.getClient();

		if (!client) {
			client = await S3ClientFactory.createAndConnectClient(config);

			S3ClientFactory.registerClient(client);
		}

		return client;
	}

	private static getClient(): Nullable<S3Client> {
		return S3ClientFactory.clients;
	}

	private static async createAndConnectClient(config: S3Config): Promise<S3Client> {
		return new S3Client(config);
	}

	private static registerClient(client: S3Client): void {
		S3ClientFactory.clients = client;
	}
}
