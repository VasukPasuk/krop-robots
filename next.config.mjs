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
		],
	},
};

export default nextConfig;
