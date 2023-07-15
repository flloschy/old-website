<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    export let form;


    onMount( () => {
        goto("https://floschy.me/")
    
    })
</script>

<form method="post">
    <label>
        <input type="text" name="name" placeholder="url" autocomplete="off"/>
    </label><br>
    <label>
        <input type="text" name="url" placeholder="destination" autocomplete="off" />
    </label><br>
    <label>
        <input type="password" name="password" placeholder="password" />
    </label><br><br>
    <button type="submit">Submit</button>
</form>

<dev class="info">
    {form ? form.info : ''}
</dev>


<style>
    form {
        background-color: gray;
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        border-radius: 10px;
    }
    button {
        width: 100%;
        background-color: black;
        border-radius: 5px;
        outline: none;
        border-style: none;
        color:grey;
        padding: 7px;

    }


    input {
        margin: 2px;
        margin-left: 0;
        margin-right: 0;
        background-color: black;
        padding: 6px;
        border-radius: 5px;
        border-style: none;
        color:gray;
    }
    input:focus-within {
        outline: none;
    }
    input::placeholder {
        color:gray
    }

    .info {
        background-color: gray;
        padding: 20px;
        top: 0%;
        left: 50%;
        transform: translate(-50%, 50%);
        position: absolute;
        border-radius: 10px;
    }
</style>
