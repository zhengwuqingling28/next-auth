import { connectToDatabase } from "@/data/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const context = await connectToDatabase();

        if (!context) {
          throw new Error("Failed to connect to database");
        }

        const usersCollection = context.db().collection("user");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("User not found!");
        }

        const isValid = await verifyHashPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log in!");
        }

        context.close();
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
});
