export default async function () {
	const imports = (await import('@medusajs/medusa/dist/api/routes/store/customers/index')) as any
	imports.allowedStoreCustomersRelations = [
		...imports.allowedStoreCustomersRelations,
		'payment_methods',
	]
	imports.defaultStoreCustomersRelations = [
		...imports.defaultStoreCustomersRelations,
		'payment_methods',
	]
}
