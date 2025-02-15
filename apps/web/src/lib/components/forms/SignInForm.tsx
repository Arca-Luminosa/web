'use client'
import { Link, Section } from '@/lib/ui'

export const SignInForm = () => <Section>
	<form>
		<p>Crea una cuenta:</p>
		<input name="name" type="text" placeholder="Tu nombre" />
		<input name="lastName" type="text" placeholder="Tu apellido" />
		<input name="username" type="text" placeholder="Tu nombre de usuario" />
		<input name="email" type="email" placeholder="Tu correo electrónico" />
		<input name="password" type="password" placeholder="Contraseña" />
		<button type="submit">Crear cuenta</button>
	</form>
	<section>
		<p>¿Ya tienes una cuenta?</p>
		<Link href="/ingreso">¡Ingresa aquí!</Link>
	</section>
</Section>
