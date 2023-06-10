type S3Config = {
	region: string;
	endpoint?: string;
	forcePathStyle?: boolean;
	credentials?: {
		accessKeyId: string; // This specific key is required when working offline
		secretAccessKey: string;
	};
};

export default S3Config;
