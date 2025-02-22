'use client'
import { useActionState } from 'react'
import { signUp } from '@/lib/actions/auth.actions'
import { Link, Section } from '@/lib/ui'
import { ROUTES } from '@/lib/routes'

export const SignUpForm = () => {
	const [state, signUpAction, pending] = useActionState(signUp, undefined)
	const renderErrors = (errors: string[]) => errors.map((error) => <p key={error}>{error}</p>)
	return <Section>
		<form action={signUpAction}>
			<p>Crea una cuenta:</p>
			<div>
				<input defaultValue={state?.inputs.name} name="name" type="text" placeholder="Tu nombre" required />
				{state?.errors?.name && renderErrors(state.errors.name)}
			</div>
			<div>
				<input defaultValue={state?.inputs.lastName} name="lastName" type="text" placeholder="Tu apellido" required />
				{state?.errors?.lastName && renderErrors(state.errors.lastName)}
			</div>
			<div>
				<input defaultValue={state?.inputs.username} name="username" type="text" placeholder="Tu nombre de usuario" required />
				{state?.errors?.username && renderErrors(state.errors.username)}
			</div>
			<div>
				<input defaultValue={state?.inputs.email} name="email" type="email" placeholder="Tu correo electrónico" required />
				{state?.errors?.email && renderErrors(state.errors.email)}
			</div>
			<div>
				<input defaultValue={state?.inputs.password} name="password" type="password" placeholder="Contraseña" required />
				{state?.errors?.password && renderErrors(state.errors.password)}
			</div>
			<button type="submit" disabled={pending}>Crear cuenta</button>
			{state?.message && <p>{state.message}</p>}
		</form>
		<section>
			<p>¿Ya tienes una cuenta?</p>
			<Link href={ROUTES.login}>¡Ingresa aquí!</Link>
		</section>
	</Section>
}
