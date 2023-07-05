import { PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

// when page gets loaded
export function load({ cookies }) {
	if (!cookies.get('allowed')) {
		throw redirect(307, '/protected');
	} else if (cookies.get('allowed') !== PASSWORD) {
		throw redirect(307, '/protected');
	}
}

// when logging out
export const actions = {
	default: ({ cookies }) => {
		cookies.delete('allowed', { path: '/' });
		throw redirect(303, '/protected');
	}
};
