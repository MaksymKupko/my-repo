const { Engine, Render, Runner, World, Bodies, Body } = Matter;

const cells = 3;
const width = 600;
const height = 600;

const unitLength = width / cells;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        width,
        height,
    },
});
Render.run(render);
Runner.run(Runner.create(), engine);

//Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
    Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
    Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
    Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
];
World.add(world, walls);

// Maze generation

const grid = Array(cells)
    .fill(null)
    .map(() => Array(cells).fill(false));

const verticals = Array(cells)
    .fill(null)
    .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
    .fill(null)
    .map(() => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
};

const stepThroughCells = (row, column) => {
    // If cell is visited then return
    if (grid[row][column]) {
        return;
    }
    // Else mark current cell as visited
    grid[row][column] = true;

    // Neighbors of the cell, randomly shuffled
    const neighbors = shuffle([
        [row - 1, column, "up"],
        [row, column + 1, "right"],
        [row + 1, column, "down"],
        [row, column - 1, "left"],
    ]);

    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, direction] = neighbor;

        // Is neigbor out off bounds?
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }

        // Has it been visited?
        if (grid[nextRow][nextColumn]) {
            continue;
        }

        // Remove a wall from horizontals or verticals
        if (direction === "up") {
            horizontals[row - 1][column] = true;
        } else if (direction === "down") {
            horizontals[row][column] = true;
        } else if (direction === "left") {
            verticals[row][column - 1] = true;
        } else if (direction === "right") {
            verticals[row][column] = true;
        }

        stepThroughCells(nextRow, nextColumn);
    }
};

stepThroughCells(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength / 2,
            rowIndex * unitLength + unitLength,
            unitLength,
            3,
            {
                isStatic: true,
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength / 2,
            3,
            unitLength,
            {
                isStatic: true,
            }
        );
        World.add(world, wall);
    });
});

//Goal

const goal = Bodies.rectangle(width - unitLength / 2, height - unitLength / 2, unitLength * 0.7, unitLength * 0.7, {
    isStatic: true,
});
World.add(world, goal);

// Ball

const ball = Bodies.circle(unitLength / 2, unitLength / 2, unitLength / 4);
World.add(world, ball);

document.addEventListener("keydown", ({ keyCode }) => {
    const { x, y } = ball.velocity;

    if (keyCode === 87) {
        Body.setVelocity(ball, { x, y: y - 5 });
    }
    if (keyCode === 68) {
        Body.setVelocity(ball, { x: x + 5, y });
    }
    if (keyCode === 83) {
        Body.setVelocity(ball, { x, y: y + 5 });
    }
    if (keyCode === 65) {
        Body.setVelocity(ball, { x: x - 5, y });
    }
});