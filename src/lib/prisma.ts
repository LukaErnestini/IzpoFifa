import { PrismaClient } from '@prisma/client';

declare global {
	// allow global `var` declarations
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

console.log('prisma.ts executed');

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	// Ensure the prisma instance is re-used during hot-reloading
	// Otherwise, a new client will be created on every request
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;
