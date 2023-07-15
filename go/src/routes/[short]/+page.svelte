<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
    onMount(() => {
        if (data.valid) {
            // @ts-ignore
            goto(data.link)
        }
    })
</script>

<div class="info">
    {#if data.valid}
        If you are not redirected, click <a href="{data.link}">here</a>
    {:else}
        No link found
    {/if}
</div>

<style>
    .info {
        background-color: gray;
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        border-radius: 10px;
    }
    a {
        color: gray;
    }
</style>