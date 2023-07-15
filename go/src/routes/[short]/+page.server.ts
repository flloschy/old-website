import { links } from '$lib'

export async function load({ params }) {
    if (links[params.short]) {
        return {
            valid: true,
            link: links[params.short]
        }
    }
    return {
        valid: false,
        link: "/"
    }
}