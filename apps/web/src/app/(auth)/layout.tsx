import { PropsWithChildren } from 'react'
import { verifySession } from '@/lib/services/session'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/lib/routes'

const AuthLayout = async ({ children }: Readonly<PropsWithChildren>) => {
	const { isAuthorised } = await verifySession()
	if (isAuthorised) redirect(ROUTES.account)
	return children
}

export default AuthLayout
