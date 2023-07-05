import { redirect, fail } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';

// when page gets loaded
export function load({ cookies }) {
	if (cookies.get('allowed')) {
		throw redirect(307, '/protected/tmp');
	}
}

// when submitting password
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get('password') === PASSWORD) {
			cookies.set('allowed', PASSWORD, {
				path: '/',
				maxAge: 10
			});

			throw redirect(303, '/protected/tmp');
		}

		return fail(403, {
			incorrect: true
		});
	}
};
