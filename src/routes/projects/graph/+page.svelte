<script>
	import { onMount } from 'svelte';

	const run = () => {
		const canvas = document.getElementById('plot');
		const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

		const funcs = document.getElementById('funcs');
		let gridAnimationState = 0;
		let animationState = 0;
		const container = document.getElementsByClassName('container')[0];

		const view = { offset: { x: 0, y: 0 }, zoom: 1 };

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
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight * 0.9;
		};

		const init = () => {
			setSize();
			// center screen
			view.offset.x = canvas.width / 2;
			view.offset.y = canvas.height / 2;
		};

		const plotFunction = (f, colorShift) => {
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
			for (let x = 0; x < canvas.width * animationState; x += 1) {
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
			for (let x = 0; x < canvas.width * animationState ** 3; x += 1) {
				let xVal = (x - view.offset.x) / view.zoom / 50;
				let yVal = f(xVal);
				let y = view.offset.y - yVal * 50 * view.zoom;
				// max canvas height, else it wont draw something like x**8 and higher
				ctx.lineTo(x, Math.max(Math.min(y, 32767), -32767));
			}
			ctx.stroke();
		};

		// starter functions
		let functions = [(x) => x ** 2, (x) => x, (x) => Math.sin(x)];

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
			let funcStrs = funcs.value.split('\n');

			funcStrs.forEach((funcStr) => {
				try {
					functions.push(eval(`(x) => ${funcStr}`));
				} catch (e) {
					console.log(e);
				}
			});
		};

		// overwrite page icon
		document.head.querySelector("link[rel='icon']").href = '/graphIcon.png';

		init();
		draw();

		canvas.addEventListener('wheel', (e) => {
			e.preventDefault();
			if (e.deltaY > 0) {
				view.zoom /= 1.1;
			} else {
				view.zoom *= 1.1;
			}
		});

		canvas.addEventListener('mousemove', (e) => {
			if (e.buttons === 1) {
				view.offset.x += e.movementX;
				view.offset.y += e.movementY;
			}
		});

		funcs.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				updateFuncs();
			}
		});
	};

	onMount(run);
</script>

<div class="container">
	<textarea id="funcs" aria-label="function input">x ** 2
x
Math.sin(x)</textarea>
	<canvas id="plot" />
</div>

<style>
	canvas,
	textarea {
		display: inline-block;
	}

	canvas {
		height: 90%;
	}

	textarea {
		position: absolute;
		top: 50%;
		left: 1%;
		transform: translateY(-50%);
		width: calc(20% - 5px);
		height: 50%;
		resize: none;
		background-color: black;
		color: rgb(120, 120, 120);
		border-radius: 0;
		outline: none;
	}

	textarea:focus {
		outline: none;
	}
	.container {
		overflow: hidden;
	}
</style>
