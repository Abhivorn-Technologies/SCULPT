import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password.");
        }

        const inputEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password;

        // 1. Check MongoDB User collection first
        if (process.env.MONGODB_URI) {
          try {
            await connectToDatabase();
            const user = await User.findOne({ email: inputEmail });

            if (user && user.passwordHash) {
              const isMatch = await bcrypt.compare(inputPassword, user.passwordHash);
              if (isMatch) {
                return {
                  id: user._id.toString(),
                  name: user.name,
                  email: user.email,
                  role: user.role,
                };
              } else {
                throw new Error("Invalid password.");
              }
            }
          } catch (error: any) {
            console.error("MongoDB Auth check error:", error?.message || error);
            if (error?.message === "Invalid password.") {
              throw error;
            }
          }
        }

        // 2. Fallback / Initial Admin Check from Environment Variables
        const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@sculptaesthetics.com").toLowerCase().trim();
        const envAdminPassword = process.env.ADMIN_PASSWORD || "SculptAdmin2026!";

        if (inputEmail === envAdminEmail && inputPassword === envAdminPassword) {
          return {
            id: "admin-env-user",
            name: "Sculpt Admin",
            email: envAdminEmail,
            role: "admin",
          };
        }

        throw new Error("Invalid email or password.");
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "sculpt_admin_secret_key_2026_change_me",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
