import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    }
  },
	modules: [
    {
      resolve: './modules/subscription',
    },
		{
			resolve: './src/modules/wompi',
		},
		{
			resolve: '@medusajs/medusa/payment',
			options: {
				providers: [
					{
						resolve: './src/modules/wompiProvider',
						id: 'wompi',
						options: {
							url: process.env.WOMPI_API_URL,
							publicKey: process.env.WOMPI_PUBLIC_KEY,
							privateKey: process.env.WOMPI_PRIVATE_KEY,
							integritySecret: process.env.WOMPI_INTEGRITY_SECRET
						}
					}
				]
			}
		}
	]
})
