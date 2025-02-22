'use client'
import { useActionState } from 'react'
import { logIn } from '@/lib/actions/auth.actions'
import { Link, Section } from '@/lib/ui'
import { ROUTES } from '@/lib/routes'

export const LogInForm = () => {
	const [state, logInAction, pending] = useActionState(logIn, undefined)
	return <Section>
		<form action={logInAction}>
			<p>Ingresa a tu cuenta:</p>
			<div>
				<input defaultValue={state?.inputs.identifier} name="identifier" placeholder="Correo electrónico o nombre de usuario" />
				{state?.errors?.identifier && <p>{state.errors.identifier}</p>}
			</div>
			<div>
				<input defaultValue={state?.inputs.password} name="password" type="password" placeholder="Contraseña" />
				{state?.errors?.password && <p>{state.errors.password}</p>}
			</div>
			{state?.message && <p>{state.message}</p>}
			<button type="submit" disabled={pending}>Iniciar sesión</button>
		</form>
		<section>
			<p>¿No tienes una cuenta?</p>
			<Link href={ROUTES.signup}>¡Crea una!</Link>
		</section>
	</Section>
}
