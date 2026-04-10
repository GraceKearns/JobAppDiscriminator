import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { encrypt } from "@/app/lib/encrypt"

type RouteHandler = (request: Request) => Promise<Response>;

let handler: RouteHandler;

try {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const nextAuthSecret = process.env.NEXTAUTH_SECRET;

  if (!googleClientId || !googleClientSecret || !nextAuthSecret) {
    throw new Error("Auth environment variables are not fully configured.");
  }

  handler = NextAuth({
    pages: {
      signIn: "/signin",
    },
    providers: [
      GoogleProvider({
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        authorization: {
          params: {
            scope:
              "openid email profile https://www.googleapis.com/auth/gmail.readonly",
            access_type: "offline", // 🔥 ensures refresh token
            prompt: "consent", // 🔥 forces refresh token on re-login
          },
        },
      }),
    ],

    callbacks: {
      async jwt({ token, account, profile }) {
        if (account && profile?.email) {
          const { prisma } = await import("@/util/prisma");
          const firstName = profile.name?.split(" ")[0] ?? "";
          const lastName =
            profile.name?.split(" ").slice(1).join(" ") ?? "";

          let user = await prisma.userdata.findFirst({
            where: { email: profile.email },
          });

          if (!user) {
            user = await prisma.userdata.create({
              data: {
                first_name: firstName,
                last_name: lastName,
                email: profile.email,
              },
            });
          }

          
          const encryptedAccess = encrypt(account.access_token!);
          const existingToken = await prisma.token.findUnique({
            where: { user_id: user.user_id },
          });
          const encryptedRefresh = account.refresh_token
            ? encrypt(account.refresh_token)
            : existingToken?.refresh_token;

          await prisma.token.upsert({
            where: { user_id: user.user_id },
            update: {
              user_id: user.user_id,
              access_token: encryptedAccess,
              refresh_token: encryptedRefresh,
              expires_at: new Date(account.expires_at! * 1000)
            },
            create: {
              user_id: user.user_id,
              access_token: encryptedAccess,
              refresh_token: encryptedRefresh,
              expires_at: new Date(account.expires_at! * 1000)
            },
          });
          token.userId = user.user_id;
          token.email = user.email;
        }
        return token;
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.user_Id = token.userId as number;
          session.user.email = token.email as string;
        }
        return session;
      },
    },
    secret: nextAuthSecret,
  });
} catch (error) {
  console.error("[auth] NextAuth configuration error:", error);
  handler = async () => {
    return new Response(
      JSON.stringify({ error: "Authentication is not configured." }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  };
}

export { handler as GET, handler as POST };