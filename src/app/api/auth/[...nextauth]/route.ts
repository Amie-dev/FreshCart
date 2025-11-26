import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // import the options, not handlers

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
