const container = document.querySelector(".container");
const btn = document.querySelector("button");
const winner = document.querySelector(".winner");
btn.addEventListener("click", starNewGame);

function starNewGame() {
    container.innerHTML = "";
    winner.classList.add("hidden");
    const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

    const cellsHorizontal = 14;
    const cellsVertical = 18;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const unitLengthX = width / cellsHorizontal;
    const unitLengthY = height / cellsVertical;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    const { world } = engine;
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            wireframes: false,
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

    const grid = Array(cellsVertical)
        .fill(null)
        .map(() => Array(cellsHorizontal).fill(false));

    const verticals = Array(cellsVertical)
        .fill(null)
        .map(() => Array(cellsHorizontal - 1).fill(false));

    const horizontals = Array(cellsVertical - 1)
        .fill(null)
        .map(() => Array(cellsHorizontal).fill(false));

    const startRow = Math.floor(Math.random() * cellsVertical);
    const startColumn = Math.floor(Math.random() * cellsHorizontal);

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
            if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
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
                columnIndex * unitLengthX + unitLengthX / 2,
                rowIndex * unitLengthY + unitLengthY,
                unitLengthX,
                3,
                {
                    label: "wall",
                    isStatic: true,
                    render: {
                        fillStyle: "red",
                    },
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
                columnIndex * unitLengthX + unitLengthX,
                rowIndex * unitLengthY + unitLengthY / 2,
                3,
                unitLengthY,
                {
                    label: "wall",
                    isStatic: true,
                    render: {
                        fillStyle: "red",
                    },
                }
            );
            World.add(world, wall);
        });
    });

    //Goal
    // const goalSize = Math.min(unitLengthX, unitLengthY) * 0.7;
    const goal = Bodies.rectangle(
        width - unitLengthX / 2,
        height - unitLengthY / 2,
        unitLengthX * 0.7,
        unitLengthY * 0.7,
        {
            isStatic: true,
            label: "goal",
            render: {
                fillStyle: "green",
            },
        }
    );
    World.add(world, goal);

    // Ball
    const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
    const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
        label: "ball",
        render: {
            fillStyle: "blue",
        },
    });
    World.add(world, ball);

    let timeoutID = null;

    document.onkeydown = ({ keyCode }) => {
        const { x, y } = ball.velocity;

        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (keyCode === 87) {
            // if (y > 0) {
            //     Body.setVelocity(ball, { x, y: 0 });
            // }
            if (y >= -10) {
                Body.setVelocity(ball, { x, y: y - 3 });
            }
        }

        if (keyCode === 68) {
            // if (x < 0) {
            //     Body.setVelocity(ball, { x: 0, y });
            // }
            if (x <= 10) {
                Body.setVelocity(ball, { x: x + 3, y });
            }
        }

        if (keyCode === 83) {
            // if (y < 0) {
            //     Body.setVelocity(ball, { x, y: 0 });
            // }
            if (y <= 10) {
                Body.setVelocity(ball, { x, y: y + 3 });
            }
        }

        if (keyCode === 65) {
            // if (x > 0) {
            //     Body.setVelocity(ball, { x: 0, y });
            // }
            if (x >= -10) {
                Body.setVelocity(ball, { x: x - 3, y });
            }
        }
    };

    document.onkeyup = ({ keycode }) => {
        const { x, y } = ball.velocity;
        const keyCodes = [87, 68, 83, 65];

        timeoutID = setTimeout(() => {
            Body.setVelocity(ball, { x: 0, y: 0 });
        }, 100);
    };

    // Win condition
    Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach((collision) => {
            const labels = ["ball", "goal"];

            if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
                winner.classList.remove("hidden");
                world.gravity.y = 1;
                world.bodies.forEach((body) => {
                    if (body.label === "wall") {
                        Body.setStatic(body, false);
                    }
                });
            }
        });
    });
}

starNewGame();
