import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from "./lib/db";
import User from "./model/user.model";
import bcrypt from "bcryptjs";
// import type { NextAuthOptions } from "next-auth";

export const { handlers, signIn, signOut, auth } =NextAuth( {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {

        // console.log(credentials)
        await connectDB();

        const user = await User.findOne({
          $or: [
            { email: credentials?.identifier },
            { mobile: credentials?.identifier },
          ],
        });

        if (!user) throw new Error("User does not exist");

        const isCorrectPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isCorrectPassword) throw new Error("Invalid password");

        return {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          image: user?.image,
          role: user?.role,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        await connectDB();
        let existUser = await User.findOne({ email: user?.email });
        if (!existUser) {
          existUser = await User.create({
            name: user?.name,
            email: user?.email,
            mobile: user?.mobile ?? undefined,
            image: user?.image,
            role: "user",
            provider: "google",
          });
        }
        user._id = existUser._id.toString();
        user.image = existUser.image;
        user.role = existUser.role;
        user.mobile = existUser.mobile;
         return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.mobile = user.mobile;
        token.image = user?.image;
        token.role = user?.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.mobile = token.mobile as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
}
);