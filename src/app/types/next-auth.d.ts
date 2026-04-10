import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            accessToken?: string;
            user_Id?: number;
            email?: string;
            refreshToken?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        user_Id?: number;
        email?: string;
        refreshToken?: string;
    }
}