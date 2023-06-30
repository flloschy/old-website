import { PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

// when page gets loaded
export function load({ cookies }) {
	console.log("cv page gets loaded")
	if (!cookies.get('allowed')) {
		throw error(403, 'Forbidden');
	} else if (cookies.get('allowed') !== PASSWORD) {
		throw error(403, 'Forbidden');
	}
}

// when logging out
export const actions = {
	default: ({ cookies }) => {
		console.log("cv logging out");
		cookies.delete('allowed', {path:"/"});
		throw redirect(303, '/protected');
	}
};
