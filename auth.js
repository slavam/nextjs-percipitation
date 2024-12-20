import NextAuth from 'next-auth';
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import connection from '@/app/mysql'
 
async function getGmcDbUser(login, password){
  try {
    const user =  await connection.promise().query( `SELECT * FROM users WHERE login='${login}';`);
    // let data = await fetch(`http://10.54.1.30:8640/stations.json`)
    // const baseUrl = 'http://10.54.0.23:3000'
    // const user = await fetch(`http://10.54.0.23:3000/login?login=${login}&password=${password}`)
    // console.log(JSON.stringify(user[0][0]))
    // return user.rows[0];
    return user[0][0]
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ login: z.string(), password: z.string().min(5) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { login, password } = parsedCredentials.data;
          const user = await getGmcDbUser(login, password);
          if (!user) 
            return null
          else 
            return user
        }
        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})