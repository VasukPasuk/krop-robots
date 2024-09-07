/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'drive.google.com',
				port: '',
				pathname: '/uc/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
			},
		],
	},
};

export default nextConfig;
