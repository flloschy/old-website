<script>
	import { page } from '$app/stores';
</script>

<h>{$page.status}: {$page.error?.message}</h>

<style>
	/* center h1 */
	h {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 6vw;
		font-weight: 100;
		color: #808080;
		color: var(--dark-text);
		animation: shadowIN 1s forwards cubic-bezier(0.65, 0, 0.35, 1),
			wave 6s 1.5s infinite alternate-reverse linear;
	}
</style>
