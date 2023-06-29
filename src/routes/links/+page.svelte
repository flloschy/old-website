<script lang="ts">
	import { onMount } from 'svelte';
	import Link from '../Link.svelte';

	onMount(() => {
		const linkCards = Array.from(document.querySelectorAll('.card'));

		linkCards.forEach((element) => {
			const description = element.getElementsByClassName('comment')[0] as HTMLElement;
			element.addEventListener('mouseover', () => {
				element.getBoundingClientRect();
				description.style.top = `${element.getBoundingClientRect().top + window.scrollY}px`;
			});
			element.addEventListener('scroll', () => {
				description.style.top = `${element.getBoundingClientRect().top + window.scrollY}px`;
			});
		});
	});
</script>

<!-- https://devicon.dev/ -->
<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
/>

<div class="title gradientText">My online presence:</div>
<div class="containerA">
	<Link
		name="Github"
		comment="Here is my github profile where you can see all my Public Projects!"
		url="https://github.com/flloschy/"
		color="#fff"
		classX="devicon-github-plain"
	/>
	<Link
		name="Discord"
		comment="Here is my discord profile where you can contact me if you'd like to!"
		url="https://discord.com/users/578620425060483072"
		color="#7289da"
		svg="/icons/discord.svg"
	/>
</div>

<div class="title gradientText">Used in this project:</div>
<div class="containerB">
	<Link
		name="Github api"
		comment="This site uses the free github api to get my projects and the last update date. But it is limited to 60 requests per hour, so if you see a loading block, you probably reached the limit."
		url="https://docs.github.com/en/rest"
		color="#fff"
		classX="devicon-github-plain"
	/>
	<Link
		name="Svelte"
		comment="This website is made with Svelte!"
		url="https://svelte.dev/"
		color="#ff3e00"
		classX="devicon-svelte-plain"
	/>
	<Link
		name="Devicon"
		comment="Most icons are from the amazing devicon.dev site!"
		url="https://devicon.dev/"
		color="#60be86"
		classX="devicon-devicon-plain"
	/>
	<Link
		name="Bootstrap Icons"
		comment="Every icon that is not from devicon.dev is from Bootstrap Icons."
		url="https://icons.getbootstrap.com/"
		color="#712cf9"
		svg="/icons/bootstrap.svg"
	/>
	<Link
		name="Realtime Colors"
		comment="I used Realtime Colors to choose a good and custom color palette for this site. The link leads to the palette I used."
		url="https://realtimecolors.com/?colors=a8a7b9-212121-9bc3ee-4975a2-9beeb4"
		color="#cababe"
		svg="https://realtimecolors.com/images/favicon.png"
	/>
	<Link
		name="Layoutit!"
		comment="Every grid used on this site is made with Layoutit and its great!"
		url="https://grid.layoutit.com/"
		color="#9dabb5"
		svg="https://grid.layoutit.com/img/icons/icon-44x44.png"
	/>
	<Link
		name="easings"
		comment="The few animations on this site where chosen from easings.net"
		url="https://easings.net/"
		color="#1473E6"
		svg="https://easings.net/96.8aa68ac4.png"
	/>
	<Link
		name="Vercel"
		comment="This site is hosted with the free Vercel plan."
		url="https://vercel.com"
		color="#fff"
		svg="https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png"
	/>
	<Link
		name="Lighthouse"
		comment="Lighthouse was used to check and improve the Performance of this site."
		url="https://developer.chrome.com/docs/lighthouse/"
		color="#FF6633"
		svg="https://wd.imgix.net/image/MtjnObpuceYe3ijODN3a79WrxLU2/QXJ5lmcjHEFLTHg5B4o8.svg"
	/>
</div>

<div class="title gradientText">Further notice:</div>
<div class="containerA">
	<Link
		name="Cookies"
		comment="This site doesn't use cookies. But third-party resources might. If so, I have no control over them nor see any data from them."
		color="#d2d15c"
		svg="/icons/fingerprint.svg"
	/>
	<Link
		name="Data protection"
		comment="I don't store any data from users on this site. Not what they do. Not what they see. Not when they visit. Not where they are from. Nothing. But third-party resources might. If so, I have no control over them nor see any data from them."
		color="#df4944"
		svg="/icons/database.svg"
	/>
</div>
<br /><br /><br /><br />

<style>
	.containerA {
		width: calc(200px * 2 + 20px);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		gap: 20px 20px;
		grid-template-areas: '. .';

		margin: 0 auto;

		justify-items: center;
		align-items: center;
	}
	.containerB {
		width: calc(200px * 3 + 20px * 2);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 20px 20px;
		grid-template-areas: '. . .';

		margin: 0 auto;

		justify-items: center;
		align-items: center;
	}

	.title {
		font-size: larger;
		font-weight: 600;
		margin-top: 30px;
		margin-bottom: 10px;
		text-align: center;
		width: 100%;
	}
</style>
