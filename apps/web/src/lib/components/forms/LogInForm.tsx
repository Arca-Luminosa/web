'use client'
import { Link, Section } from '@/lib/ui'

export const LogInForm = () => <Section>
	<form>
		<p>Ingresa a tu cuenta:</p>
		<input name="email" type="email" placeholder="Correo electrónico" />
		<input name="password" type="password" placeholder="Contraseña" />
		<button type="submit">Iniciar sesión</button>
	</form>
	<section>
		<p>¿No tienes una cuenta?</p>
		<Link href="/registro">¡Crea una!</Link>
	</section>
</Section>
