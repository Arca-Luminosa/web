import { type ScheduledJobConfig } from '@medusajs/medusa';

export default async function handler() {
	console.info('Checking health...');
	try {
		const res = await fetch(`${process.env.LOCAL_URL}/store/products`, { method: 'GET' });
		const data = await res.json();
		console.info(`Looks healthy, response code: ${res.status}.`, `Numnber of products: ${data.products.length}`);
	} catch (err) {
		console.error(`Something happened, error code: ${err.code}`)
	}
};

export const config: ScheduledJobConfig = {
	name: 'health-check',
	schedule: '*/10 * * * *'
}
