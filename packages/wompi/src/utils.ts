export const createSignature = async (integritySecret: string, ref: string, amountInCents: number, currency: string, expirationTime: string = '') => {
	const rawSignature = `${ref}${amountInCents}${currency}${expirationTime}${integritySecret}`
	const encondedText = new TextEncoder().encode(rawSignature)
	const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const signedSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
	return signedSignature
}
