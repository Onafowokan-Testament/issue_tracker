import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import OptionAuth from "@/app/auth/optionAuth";

const handler = NextAuth(OptionAuth);

export { handler as GET, handler as POST };
