<!--
    The code is horrible and TS is exploding
    from errors because I converted it from
    JS to TS and I wasn't bothered to fix it.
-->

<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: any = null;
	let ctx: any = null;

	let funcs: any = null;
	let gridAnimationState = 0;
	let animationState = 0;

	const view = {
		offset: {
			x: 0,
			y: 0
		},
		zoom: 1
	};

	const drawGrid = () => {
		const width = canvas.width;
		const height = canvas.height;
		const step = 50 * view.zoom;

		// draw grid
		const start = {
			x: view.offset.x % step,
			y: view.offset.y % step
		};
		ctx.strokeStyle = 'rgb(50, 50, 50)';
		ctx.lineWidth = 1;

		// y-lines
		ctx.beginPath();
		for (let x = start.x; x < width * gridAnimationState; x += step) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
		}
		// x-lines
		for (let y = start.y; y < height * gridAnimationState; y += step) {
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
		}
		ctx.stroke();

		// draw axis
		ctx.strokeStyle = ctx.fillStyle = 'rgb(120, 120, 120)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, view.offset.y);
		ctx.lineTo(width, view.offset.y);
		ctx.moveTo(view.offset.x, 0);
		ctx.lineTo(view.offset.x, height);
		ctx.stroke();

		// draw axis labels
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		// x-labels
		for (let x = start.x; x < width * gridAnimationState; x += step) {
			let xVal = Math.round((x - view.offset.x) / view.zoom / 50);
			if (xVal == 0) continue;
			ctx.fillText(xVal, x, view.offset.y + 12);
		}
		ctx.textAlign = 'right';
		// y-labels
		for (let y = start.y; y < height * gridAnimationState; y += step) {
			let yVal = Math.round((y - view.offset.y) / view.zoom / 50);
			if (yVal == 0) continue;
			ctx.fillText(-yVal, view.offset.x - 8, y);
		}
		// 0,0
		ctx.fillText(0, view.offset.x - 8, view.offset.y + 12);
	};

	const setSize = () => {
		// (also clears canvas)
		canvas.width = window.innerWidth * 0.8;
		canvas.height = window.innerHeight;
	};

	const init = () => {
		functions.push((x: number) => x);
		canvas = document.getElementById('plot');
		ctx = canvas.getContext('2d');
		funcs = document.getElementById('funcs');
		setSize();
		// center screen
		view.offset.x = canvas.width / 2;
		view.offset.y = canvas.height / 2;
	};

	const plotFunction = (f: CallableFunction, colorShift: number) => {
		// colorShift to rgb color on a rainbow spectrum
		// (some copilot magic)
		let r = Math.sin(colorShift * 0.0174533 + 0) * 127 + 128;
		let g = Math.sin(colorShift * 0.0174533 + 2) * 127 + 128;
		let b = Math.sin(colorShift * 0.0174533 + 4) * 127 + 128;
		ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

		// just for the glow
		ctx.shadowBlur = 10;
		ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;

		ctx.lineWidth = 2;
		ctx.beginPath();

		// draw the line for the function
		for (let x = 0; x < canvas.width * animationState; x += 2) {
			let xVal = (x - view.offset.x) / view.zoom / 50;
			let yVal = f(xVal);
			let y = view.offset.y - yVal * 50 * view.zoom;
			// max canvas height, else it wont draw something like x**8 and higher
			ctx.lineTo(x, Math.max(Math.min(y, 32767), -32767));
		}
		ctx.stroke();

		// just for the glow
		ctx.lineWidth = 0.25;
		ctx.strokeStyle = '#fff';
		ctx.beginPath();
		for (let x = 0; x < canvas.width * animationState ** 3; x += 2) {
			let xVal = (x - view.offset.x) / view.zoom / 50;
			let yVal = f(xVal);
			let y = view.offset.y - yVal * 50 * view.zoom;
			// max canvas height, else it wont draw something like x**8 and higher
			ctx.lineTo(x, Math.max(Math.min(y, 32767), -32767));
		}
		ctx.stroke();
	};

	// starter functions
	let functions: any[] = [];

	// the main loop
	const draw = () => {
		// progress grid animation
		animationState += 0.005;
		gridAnimationState += 0.01;
		animationState = Math.min(animationState, 1);
		gridAnimationState = Math.min(gridAnimationState, 1);

		// clear and resize canvas
		setSize();
		// background
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		drawGrid();
		functions.forEach((f, i) => plotFunction(f, (300 / functions.length) * i));
		// and again
		requestAnimationFrame(draw);
	};

	const updateFuncs = () => {
		animationState = 0.005;
		functions = [];
		let funcStrs = funcs?.value.split('\n');

		funcStrs?.forEach((funcStr: string) => {
			try {
				functions.push(eval(`(x) => ${funcStr}`));
			} catch (e) {
				console.log(e);
			}
		});
		return null;
	};

	onMount(() => {
		init();

		draw();

		canvas.addEventListener('wheel', (e: any) => {
			if (e.deltaY > 0) {
				view.zoom /= 1.1;
			} else {
				view.zoom *= 1.1;
			}
		});

		canvas.addEventListener('mousemove', (e: any) => {
			if (e.buttons === 1) {
				view.offset.x += e.movementX;
				view.offset.y += e.movementY;
			}
		});

		funcs.addEventListener('keydown', (e: any) => {
			if (e.key === 'Enter') {
				updateFuncs();
			}
		});
	});
</script>

<canvas id="plot" />
<textarea id="funcs" on:change={updateFuncs()} aria-label="function input">x</textarea>

<style>
	textarea {
		top: 0;
		left: calc(80% + 5px);
		width: calc(15%);
		height: calc(100vh - 10px);
		resize: none;
		background-color: black;
		color: rgb(120, 120, 120);
		border-radius: 0;
		outline: none;
		display: inline-block;
	}

	textarea:focus {
		outline: none;
	}
</style>
