import  { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      mobile?: string;
      image?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    mobile?: string;
    image?: string;
    role?: string;
  }

  interface JWT {
    _id: string;
    name: string;
    email: string;
    mobile?: string;
    image?: string;
    role?: string;
  }
}

export {}