import { HealthyChecker } from '../../../modules/Healthy/application/HealthyChecker';
import { Middyfy } from '../../../shared/domain/Middyfy';

const handler = async () => {
	const healthyChecker = new HealthyChecker();
	const healthy = await healthyChecker.run();

	return healthy;
};

export const run = Middyfy(handler);
