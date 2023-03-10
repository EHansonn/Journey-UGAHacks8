import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../../lib/prisma';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'database',
	},
	secret: process.env.SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			return true;
		},
		async redirect({ url, baseUrl }) {
			return baseUrl;
		},
		async session({ session, token, user }) {
			session.user.id = user.id;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			return token;
		},
	},
};

export default NextAuth(authOptions);
