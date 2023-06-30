<script>
	export let form;
</script>

<form method="POST">
	<label>
		<input name="password" autocomplete="off" placeholder="Password" />
	</label>
</form>

{#if form?.incorrect}
	<p class="error">Wrong Password!</p>
{/if}

<style>
	.error {
		display: flex;
		justify-content: center;
		color: red;
	}
	form {
		/* center horizontally */
		display: flex;
		justify-content: center;
		margin-top: 150px;
	}

</style>
