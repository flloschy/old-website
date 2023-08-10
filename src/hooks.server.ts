import { sequence } from '@sveltejs/kit/hooks';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

const auth: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);

	if (url.pathname.startsWith('/protected')) {
		if (!env.ADMIN_AUTH) {
			console.log('Not authorized, no ADMIN_AUTH');
			return new Response('Not authorized, no ADMIN_AUTH', {
				status: 401
			});
		}
		const basicAuth = event.request.headers.get('Authorization');
		if (basicAuth !== `Basic ${btoa(env.ADMIN_AUTH)}`) {
			return new Response('Not authorized', {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
				}
			});
		}
	}

	const response = await resolve(event);
	return response;
};

export const handle: Handle = sequence(auth);
