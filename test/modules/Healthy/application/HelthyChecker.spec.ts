import { HealthyChecker } from '../../../../src/modules/Healthy/application/HealthyChecker';

beforeEach(() => {});

describe('Health Chcker', () => {
	it('should give a valid response', async () => {
		const checker = new HealthyChecker();
		const response = await checker.run();
		expect(response.statusCode).toBe(200);
	});
});
