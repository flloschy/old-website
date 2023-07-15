// import { PASSWORD } from '$env/static/private';
// import { addLink, links, remLink } from '$lib';

// export const actions = {
// 	default: async ({ request }) => {
//         const form = await request.formData();
//         const password = form.get('password');
// 
//         if (password !== PASSWORD) return { info: "invalid Credentials" };
// 
//         const url = "" + form.get('url');
//         const name = "" + form.get('name');
//         const entry = links[name]; 
// 
//         if (entry && url === "") {
//             remLink(name);
//             return { info: `deleted: ${name} - ${url}` }
//         }
//         if (entry || (url && name)) {
//             addLink(name, url);
//             if (entry) {
//                 return { info: `updated: ${name} from "${entry}" to "${url}"` }
//             }
//             return { info: `added: ${name} - ${url}` }
//         }
//         
//         return {
//             info: "no action taken"
//         }
//     }
// }