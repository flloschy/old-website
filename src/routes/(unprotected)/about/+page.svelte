<script lang="ts">
</script>

<div class="content">
	Hi! <br /><br />

	I am Florian a hobby developer and IT student from Germany! <br /><br /><br /><br />

	I would consider myself a pleasant person to be around. Im friendly, open-minded, creative, and
	invested in what I do. I love a good (or evil) joke. I like to give my opinion if I feel it's
	necessary, but I can also shut up when needed. When it comes to meeting new people, I will hold
	myself back at first, but with time comes confidence.<br /><br />

	Teamwork-wise, I would say it works out pretty well too. I can work in a team as long as the work
	is fairly distributed and everyone is willing to work on their part on time. Which is also my
	greatest weakness when it comes to teamwork... I hate it when relying on others doesn't work out
	and I have to do their part as well. It's just depressing. Not that I can't work on my own; in fact,
	I would say I'm a great solo worker, but when doing team work, I expect everyone to do their job.<br
	/><br />

	I should probably mention that it's hard for me to get motivated in the beginning, especially with
	coding projects that encounter problems I can't fix in under a few hours. Which is why I have (or
	had) many unfinished or deleted projects on my hard drive. But once I'm in the flow, I can work
	for hours without a break and won't give up so easily.<br /><br />

	Anyway, I love Creative and non-competitive games like Minecraft, Satisfactory, Timberborn, and
	some relaxing simulators like Euro Truck Simulator 2 or Train Sim World 2. Which is probably why
	Im really into programming. I find it very relaxing and satisfying to create things, whether in
	code or within games. Ignoring the problem, of course! Although it's part of the fun. Im equally
	into high-quality long-form English videos along the lines of documentaries, DIY/creating, and
	(self-explanatory) programming stuff. <br /><br /><br /><br />

	Okay, Im not good at writing about anything, especially not about myself, which is why I will stop
	here and follow with "just facts" in the form of a timeline:

	<div class="container">
		<div class="" />
		<div class="line" style="height: 10px; border-radius: 5px 5px 0 0" />
		<div class="" />

		<div class="date gradientText">2020</div>
		<div class="line" />
		<div class="text">
			While being homeschooled in a Corona lockdown, I finally started my programming journey with
			Python. I first used some simple tools to do my math work, like a triangle surface area
			calculator. Later, I started to learn to make a discord bot with discord.py, which I still do
			today, just with discord.js instead. Ive dipped into the world of programming before, but it
			never led anywhere. This time, though, it worked out perfectly.
		</div>

		<div class="date gradientText">2021</div>
		<div class="line" />
		<div class="text">
			This year, I got bored with Python and started to learn JavaScript. I also tried to learn C#
			for Unity and looked into vanilla web development. Both of which I dropped pretty quickly, aka
			the same day I started. JavaScript, though, was a keeper. Because of my experience with
			discord.py, I instantly used discord.js as a learning platform to learn JavaScript. And to
			this day, I primarily, or rather, exclusively, use JavaScript for discord bots (beside this
			website).
		</div>

		<div class="date gradientText">2022</div>
		<div class="line" />
		<div class="text">
			The year of greatness I bought myself a Raspberry Pi 4 and had my first experience with Linux.
			I've tried out many different distros: Raspberry Pi, Ubuntu, Debian, and Kali. Ultimately, I
			settled on Kali because I liked the UI and how it worked. Later, I would learn that Kali
			wasn't good for the programs I wanted to run. And I also realized that a UI isn't really
			necessary for a home server. So after a while, I switched over to the old-fashioned Raspberry
			Pi OS, which I use to this day. Additionally, I finished school and started my IT studies,
			where I (to be honest) didn't learn much but enjoyed them nonetheless.
		</div>

		<div class="date gradientText">2023</div>
		<div class="line" />
		<div class="text" style="margin-bottom: 0;">
			Two thousand twenty-three. I reenlightened my motivation for web development and started to
			learn Svelte. I've redone this website multiple times, and now we're on the 5th iteration or
			something. And I need to be honest; I got really into it. I finally enjoy web development,
			which I didn't before. Probably because of Svelte, which is just amazing, and Im thankful to
			be able to use Typescript for websites with it. We'll see where this year leads me.
		</div>

		<div class="" />
		<div class="line" style="height: 10px; border-radius: 0 0 5px 5px;" />
		<div class="" style="margin-bottom: 0;" />
	</div>
	<br /><br />

	That's it from me. Thanks for reading, if you did. One can't expect those things anymore, haha. I
	hope that's enough for you to get a picture of me. And if you want, feel free to contact me!<br
	/><br /><br /><br />
</div>

<style>
	.container {
		margin: auto;

		width: 70%;
		margin-top: 50px;
		display: grid;
		grid-template-columns: auto 3px 1.1fr;
		grid-template-rows: 1fr;
		gap: 0px 10px;
		grid-auto-flow: row;
		grid-template-areas: 'date line text';
	}

	.date {
		font-weight: 600;
		justify-self: end;
		align-self: start;
	}

	.line {
		background-color: var(--accent);
		width: 100%;
		height: 100%;
	}

	.text {
		justify-self: start;
		align-self: start;
		margin-bottom: 50px;
	}

	.content {
		width: fit-content;
		max-width: 50vw;
		margin: auto;
		margin-top: 100px;
		text-align: justify;
	}
	@media (max-width: 1500px) {
		.content {
			max-width: 70%;
		}
	}

	@media (max-width: 1000px) {
		.content {
			max-width: 80%;
		}
		.container {
			width: 100%;
		}
	}
	@media (max-width: 600px) {
		.content {
			max-width: 90%;
		}
		.container {
			grid-template-columns: auto 1fr;
			gap: 0px 10px;
			grid-template-areas: 'date text';
		}
		.line {
			display: none;
		}
	}
	@media (max-width: 400px) {
		.content {
			max-width: 95%;
		}
	}
</style>
