<script>
	import { page } from '$app/stores';
</script>

<span class="gradientText blur">{$page.status} {$page.error?.message}</span>
<span class="gradientText">{$page.status} {$page.error?.message}</span>

<style>
	span {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		font-size: 10rem;
	}
</style>
