import { PropsWithChildren } from 'react'
import { verifySession } from '@/lib/services/session'

const AccountLayout = async ({ children }: Readonly<PropsWithChildren>) => {
	await verifySession()
	return children
}

export default AccountLayout
