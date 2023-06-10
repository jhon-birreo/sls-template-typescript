interface HealthyCheckerResponse {
	statusCode: number;
	body: string;
}

export class HealthyChecker {
	async run(): Promise<HealthyCheckerResponse> {
		return {
			statusCode: 200,
			body: 'OK'
		};
	}
}
