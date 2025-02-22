import 'server-only'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { ROUTES } from '@/lib/routes'

const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
	throw new Error('Please set JWT secret')
}

export const createSession = async (jwt: string) => {
	const verifiedToken = verify(jwt, JWT_SECRET)
	if (typeof verifiedToken === 'string') {
		console.error('Invalid session:', verifiedToken);
	} else {
		const { exp } = verifiedToken
		const expires = exp ? new Date(exp * 1000) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
		const cookieStore = await cookies()
		cookieStore.set('session', jwt, {
			httpOnly: true,
			secure: true,
			expires,
			sameSite: 'lax',
			path: '/'
		})
	}
}

export const verifySession = async () => {
	const sessionCookie = (await cookies()).get('session')
	if (!sessionCookie) redirect(ROUTES.login)

	const { value: jwt } = sessionCookie
	const session = verify(jwt, JWT_SECRET)

	if (typeof session === 'string' || !session.id) {
		console.error('Invalid session:', session)
		redirect(ROUTES.login)
	}

	return { isAuthorised: true, userId: session.id, jwt }
}

export const deleteSession = async () => {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}
