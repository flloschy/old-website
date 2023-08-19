<script lang="ts">
	interface Cell {
		adjacentMines: number;
		isMine: boolean;
		isFlagged: boolean;
		isRevealed: boolean;
		position: string;
	}
	/** Key = x,y*/
	interface Board {
		[key: string]: Cell;
	}
	/** Key = x,y */
	interface VisitedCache {
		[key: string]: boolean;
	}
	interface History {
		win: string;
		start: string;
		timeSpent: string;
		width: string;
		height: string;
		mines: string;
	}


	let width = 10;
	let height = 10;
	let mines = 20; // in percent (0-99)
	let array:Cell[] = [];
	let state = 'playing';

	let history:History[] = [
		// titles
		{win: 'win',start: 'start',timeSpent: 'time',width: 'width',height: 'height',mines: 'mines'},
		// split line
		{win: '---',start: '---',timeSpent: '---',width: '---',height: '---',mines: '---'}
	];

	class field {
		width: number;
		height: number;
		mines: number;

		/** 1D array for the 2D board */
		board: Board = {};

		/** cache to not visit the same cell twice */
		visitedCache: VisitedCache = {};

		start: number = 0;
		clicks: number = 0

		constructor(width:number, height:number, mines:number) {
			this.width = width;
			this.height = height;

			// convert mines which are in percent to a number
			this.mines = Math.floor(mines / 100 * width * height);

			state = 'setup';
			this.createBoard();
			this.placeMines();
			this.updateArray();
			state = 'waiting to start';
		}
		/** Create a empty board and fill cache */
		createBoard() {
			this.board = Array.from({length: this.width * this.height}, (_, i) => {
				let x = i % this.width;
				let y = Math.floor(i / this.width);
				return {[`${x},${y}`]: {adjacentMines: 0, isMine: false, isFlagged: false, isRevealed: false, position: `${x},${y}`}};
			}).reduce((acc, cur) => ({...acc, ...cur}), {});
			this.visitedCache = Array.from({length: this.width * this.height}, (_, i) => {
				let x = i % this.width;
				let y = Math.floor(i / this.width);
				return {[`${x},${y}`]: false};
			}).reduce((acc, cur) => ({...acc, ...cur}), {});
		}

		/** Place mines on the board */
		placeMines() {
			let minesPlaced = 0;
			while (minesPlaced < this.mines) {
				let x = Math.floor(Math.random() * this.width);
				let y = Math.floor(Math.random() * this.height);
				if (!this.board[`${x},${y}`].isMine) {
					this.board[`${x},${y}`].isMine = true;
					minesPlaced++;
				}
			}
		}

		/** Calculate the adjacent mines for each cell */
		calculateAdjacentMines() {
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < this.height; y++) {
					let adjacentMines = 0;
					for (let i = -1; i <= 1; i++) {
						for (let j = -1; j <= 1; j++) {
							if (this.board[`${x + i},${y + j}`]?.isMine) {
								adjacentMines++;
							}
						}
					}
					this.board[`${x},${y}`].adjacentMines = adjacentMines;
				}
			}
		}

		// LOGIC:
		/** reveal a singe cell */
		revealCell(x:number, y:number) {
			if (this.board[`${x},${y}`].isFlagged) {return;}
			this.board[`${x},${y}`].isRevealed = true;
		}

		/** flood fill reveal all adjacent cells */
		revealAdjacentCells(x:number, y:number) {
			let key = `${x},${y}`;

			// dont visit the same cell twice
			if (this.visitedCache[key]) {
				return;
			}
			this.visitedCache[key] = true;
			
			// stop if the cell is not empty
			if (this.board[key].adjacentMines != 0) {
				return;
			}


			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {

					// dont do diagonals
					if (i == 0 && j == 0) {continue;}
					if (i == -1 && j == -1) {continue;}
					if (i == -1 && j == 1) {continue;}
					if (i == 1 && j == -1) {continue;}
					if (i == 1 && j == 1) {continue;}

					let x2 = x + i;
					let y2 = y + j;

					if (x2 >= 0 && x2 < this.width && y2 >= 0 && y2 < this.height) {
						if (this.board[`${x2},${y2}`].isMine) {continue;}
						if (this.board[`${x2},${y2}`].isFlagged) {continue;}
						if (this.board[`${x2},${y2}`].isRevealed) {continue;}

						this.revealCell(x2, y2);
						if (this.board[`${x2},${y2}`].adjacentMines === 0) {
							this.revealAdjacentCells(x2, y2);
						}
					}
				}
			}
		}

		/** flag a cell */
		flagCell(x:number, y:number) {
			if (this.board[`${x},${y}`].isRevealed) {return;}
			// toggle flag
			this.board[`${x},${y}`].isFlagged = !this.board[`${x},${y}`].isFlagged;
		}

		/** update array */
		updateArray() {
			// overwrite array so svelte updates the board
			array = Object.values(this.board);
		}


		// INPUT:
		/** right click handler */
		rightClick(position:string) {
			this.flagCell(parseInt(position.split(',')[0]), parseInt(position.split(',')[1]));
			this.isGameWon()
		}

		/** left click handler */
		leftClick(position:string) {
			this.clicks++;

			// first click?
			if (this.clicks == 1) {
				this.start = new Date().getTime();
				state = 'playing';

				// if fist click is mine, move mine to a free cell
				if (this.board[`${position}`].isMine) {
					this.board[`${position}`].isMine = false;
					let freeCells = Object.keys(this.board).filter(key => !this.board[key].isMine);
					let randomCell = freeCells[Math.floor(Math.random() * freeCells.length)];
					this.board[randomCell].isMine = true;
					this.updateArray();
				}

				// in case a mine is moved, only now update the numbers
				this.calculateAdjacentMines();
			}
			let
				x = parseInt(position.split(',')[0]),
				y = parseInt(position.split(',')[1]);

			this.revealCell(x, y);


			if (this.board[`${x},${y}`].isFlagged) {return;}
			if (this.board[`${x},${y}`].isMine) {
				this.looseAnimation();
				this.updateArray();
			}
			this.revealAdjacentCells(x, y);
			this.isGameWon();
		}

		// CHECKS:
		/** check if the game is won */
		isGameWon() {
			let isWon = true;
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < this.height; y++) {
					let cell = this.board[`${x},${y}`];

					// is a mine is not flagged or a cell is not revealed, the game is not won
					if (
						(cell.isMine && !cell.isFlagged) ||
						(!cell.isMine && !cell.isRevealed)
					) {
						isWon = false;
					}
				}
			}
			if (isWon) {
				this.winAnimation();
			}
			this.updateArray();
		}

		// UTILS:
		/** reveal everything */
		looseAnimation() {

			// reveal all mines and set all numbers to 0 (0 is not displayed)
			state = 'lost';
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < this.height; y++) {
					this.board[`${x},${y}`].isRevealed = true;
					this.board[`${x},${y}`].adjacentMines = 0;
				}
			}
			this.addHistory(false)
		}

		/** win animation */
		winAnimation() {
			// reveal all mines and set all numbers to 0 (0 is not displayed)
			// mines will be displayed as green
			state = 'won';
			for (let x = 0; x < this.width; x++) {
				for (let y = 0; y < this.height; y++) {
					this.board[`${x},${y}`].isFlagged = false;
					this.board[`${x},${y}`].isRevealed = !this.board[`${x},${y}`].isMine;
					this.board[`${x},${y}`].adjacentMines = 0;
				}
			}
			this.addHistory(true)
		}

		/** add history */
		addHistory(win:boolean) {
			// add game to history

			let timeSpent = new Date().getTime() - this.start;
			let item:History = {
				win: win ? 'yes' : 'no',
				start: new Date(this.start).toLocaleTimeString(),
				timeSpent: `${Math.floor(timeSpent / 1000)}s`,
				width: this.width.toString(),
				height: this.height.toString(),
				mines: this.mines.toString()
			};

			// dont use .push because svelte wouldn't update
			history = [...history, item];
		}
	}


	// create game
	let game = new field(width, height, mines);

	/** create a completely new game */
	const restart = () => {
		game = new field(width, height, mines);
	}

</script>


<div class="grid">
	<!-- status text: playing, win, loose, setup, waiting -->
	<div class="status">{state}</div>
	<div class="center">
		{#each array as cell}
			<div
				class="cell {cell.isRevealed ? 'revealed' : ''} {cell.isMine ? 'mine' : ''} {cell.isFlagged ? 'flagged' : ''}"
				id="{cell.position}"
				on:click={() => game.leftClick(cell.position)}
				on:contextmenu|preventDefault={() => game.rightClick(cell.position)}
				on:keyup|preventDefault={null}
				aria-hidden="true"
				style="{cell.adjacentMines == 0 ? 'color: transparent;' : ''} /* dont show 0*/"
			>
				{cell.adjacentMines}
			</div>

			<!-- new line if 1D array needs a split -->
			{#if (cell.position.split(',')[0] == (game.width - 1).toString())}
				<br>
			{/if}

		{/each}
	</div>
	<div class="ui">
		<input on:change={() => restart()} type="range" min="5" max="15" step="1" bind:value={width}>
		<input on:change={() => restart()} type="range" min="1" max="99" step="1" bind:value={mines}>
		<input on:change={() => restart()} type="range" min="5" max="15" step="1" bind:value={height}>
		<h>Width: {width}</h>
		<h>Mines: {mines}%</h>
		<h>Height: {height}</h>
		<div/>
		<button on:click={() => restart()}>Reset</button>
	</div>
</div>

<div class="history">
	{#each history as item}
		<div>{item.win}</div>
		<div>{item.start}</div>
		<div>{item.timeSpent}</div>
		<div>{item.width}</div>
		<div>{item.height}</div>
		<div>{item.mines}</div>
	{/each}
</div>


<style>
	
	.center {
		text-align: center;
	}
	.status {
		text-align: center;
		margin: auto;
		font-size: 20px;
		color: black;
		margin-bottom: 10px;
	}

	.history {
		width: 50%;
		margin: auto;
		margin-top: 20px;
		text-align: center;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 0px 10px;
		grid-auto-flow: row;
		grid-template-areas: '. . . . . .';
	}

	h {
		color: black;
		font-size: 10px;
		text-align: center;
	}


	.ui {
		margin-top: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-template-areas: '. . .';
		width: 100%;
	}
	input {
		margin: auto;
		max-width: 100px;
		width: 100%;
	}



	.grid {
		border: black solid 2px;
		background-color: lightskyblue;
		border-radius: 10px;
		padding: 20px;
		width: fit-content;
		margin: auto;
		font-size: 0;
	}

	button {
		background-color: transparent;
		display: grid;
		margin: auto;
		margin-top: 10px;
	}
	button:hover {
		border: none;
		padding: 5.6px;
		color: white
	}

	.grid * {
		user-select: none;
	}
	
	.cell {
		border-width: 2px;
		border-color: rgba(0, 0, 0, 0.05);
		border-style: solid;

		display: inline-block;
		width: 30px;
		font-size: 20px;
		text-align: center;
		vertical-align: middle;
		aspect-ratio: 1/1;
		color: transparent;
		background-color: green;

		transition: background-color 500ms ease-in-out, color 0ms 250ms ease-in-out;
	}
	.revealed:not(.mine) {
		background-color: lightskyblue;
		color: black;
	}
	.revealed.mine {
		background-color: red;
		color: transparent;
	}
	.flagged {
		background-color: yellow;
		color: transparent;
	}
</style>