import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials) {
                const user = {
                    id: "1",
                    name: process.env.USERNAME,
                    username: process.env.USERNAME
                };

                if (
                    credentials?.username === process.env.USERNAME &&
                    credentials?.password === process.env.PASSWORD
                ) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};
