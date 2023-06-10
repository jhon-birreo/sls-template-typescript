import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { FileValueObject } from '../../../domain/value-object/FileValueObject';
import { Nullable } from '../../../domain/Nullable';

export abstract class S3Repository<T extends FileValueObject> {
	protected abstract _bucketName: string;

	constructor(private _client: Promise<S3Client>) {}

	protected bucketName(): string {
		return this._bucketName;
	}

	protected client(): Promise<S3Client> {
		return this._client;
	}

	protected async persist(file: T, key: string): Promise<boolean> {
		try {
			const bucketParams = {
				Bucket: this.bucketName(),
				Key: key,
				Body: file.content
			};

			await (await this.client()).send(new PutObjectCommand(bucketParams));
		} catch (err) {
			throw new Error('Error persisting file: ' + err);
		}

		return true;
	}

	protected async getFileContent(key: string): Promise<Nullable<string>> {
		try {
			const bucketParams = {
				Bucket: this.bucketName(),
				Key: key
			};

			const data = await (await this._client).send(new GetObjectCommand(bucketParams));
			const bodyContents = await this.streamToString(data.Body);

			return bodyContents;
		} catch (err) {
			console.log('Error', err);

			return null;
		}
	}

	protected streamToString(stream: any): Promise<string> {
		return new Promise((resolve, reject) => {
			const chunks: Uint8Array[] = [];
			stream.on('data', (chunk: any) => chunks.push(chunk));
			stream.on('error', reject);
			stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
		});
	}

	protected async deleteFile(key: string): Promise<boolean> {
		try {
			const bucketParams = {
				Bucket: this.bucketName(),
				Key: key
			};
			await (await this.client()).send(new DeleteObjectCommand(bucketParams));
		} catch (err) {
			throw new Error('Error deleting file: ' + err);
		}
		return true;
	}
}
