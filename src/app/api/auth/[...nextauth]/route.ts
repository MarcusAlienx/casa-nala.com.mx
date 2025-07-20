import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // --- DEBUGGING LOGS ---
        console.log("--- Login Attempt ---");
        console.log("Data from Login Form:", {
          username: credentials?.username,
          password: credentials?.password,
        });
        console.log("Data from .env.local:", {
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD,
        });
        // --- END DEBUGGING LOGS ---

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          console.log("Authentication successful!");
          return { id: "1", name: "Admin" };
        }
        console.log("Authentication failed!");
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
