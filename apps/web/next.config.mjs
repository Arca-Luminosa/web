/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: process.env.SUPABASE_STORAGE_PROTOCOL,
				hostname: process.env.SUPABASE_STORAGE_URL,
				port: '',
				pathname: process.env.SUPABASE_STORAGE_PATH,
			},
		],
	},
	redirects: async () => ([
		{
			source: '/home',
			destination: '/',
			permanent: true,
		},
	]),
	rewrites: async () => ([
		{
			source: '/',
			destination: '/home',
		},
	]),
}

export default nextConfig;
