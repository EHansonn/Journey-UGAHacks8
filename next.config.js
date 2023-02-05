/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Pure degeneracy I know...
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfig;
