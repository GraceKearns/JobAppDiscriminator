import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// The Prisma PG adapter does not automatically infer `schema` from DATABASE_URL.
// Parse it explicitly so runtime queries use the intended PostgreSQL schema.
const schema = (() => {
	try {
		return connectionString ? new URL(connectionString).searchParams.get("schema") ?? undefined : undefined;
	} catch {
		return undefined;
	}
})();

const adapter = new PrismaPg({ connectionString }, { schema });
const prisma = new PrismaClient({ adapter });

export { prisma };