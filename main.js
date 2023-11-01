import {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Body,
  Sleeping,
  Events,
} from "matter-js";
import { Fruits } from "./fruit";

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.getElementById("matter-canvas"),
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 700,
    height: 850,
  },
});

const world = engine.world;

const ground = Bodies.rectangle(310, 820, 800, 60, {
  isStatic: true,
  render: {
    fillStyle: "#f57196",
  },
});

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: {
    fillStyle: "#f57196",
  },
});

const rightWall = Bodies.rectangle(685, 395, 30, 790, {
  isStatic: true,
  render: {
    fillStyle: "#f57196",
  },
});

const topLine = Bodies.rectangle(310, 100, 720, 2, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "#f57196" },
  label: "topLine",
});

World.add(world, [ground, leftWall, rightWall, topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let interval = null;
let disableAction = false;
let score = 0;




function addCurrentFruit() {
  const randomFruit = getRandomFruit();

  const body = Bodies.circle(300, 50, randomFruit.radius, {
    label: randomFruit.label,
    isSleeping: true,
    render: {
      fillStyle: randomFruit.color,
      //  sprite: { texture: `/${randomFruit.label}.svg` },
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentFruit = randomFruit;

  World.add(world, body);
}

function getRandomFruit() {
  const randomIndex = Math.floor(Math.random() * 5);
  const fruit = Fruits[randomIndex];

  if (currentFruit && currentFruit.label === fruit.label)
    return getRandomFruit();

  return fruit;
}

window.onkeydown = (event) => {
  if (disableAction) return;

  switch (event.code) {
    case "ArrowLeft":
      if (interval) return;
      interval = setInterval(() => {
        if (currentBody.position.x - 20 > 25)
          Body.setPosition(currentBody, {
            x: currentBody.position.x - 1,
            y: currentBody.position.y,
          });
      }, 1);
      break;
    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (currentBody.position.x + 20 < 650)
          Body.setPosition(currentBody, {
            x: currentBody.position.x + 1,
            y: currentBody.position.y,
          });
      }, 1);
      break;
    case "Space":
      disableAction = true;
      Sleeping.set(currentBody, false);
      setTimeout(() => {
        addCurrentFruit();
        disableAction = false;
      }, 1000);
  }
};

window.onkeyup = (event) => {
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight":
      clearInterval(interval);
      interval = null;
  }
};


Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    if (collision.bodyA.label === collision.bodyB.label) {
      World.remove(world, [collision.bodyA, collision.bodyB]);
      const index = Fruits.findIndex(
        (fruit) => fruit.label === collision.bodyA.label
      );
      if (index === Fruits.length - 1) return;

      const newFruit = Fruits[index + 1];
      const body = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newFruit.radius,
        {
          render: {
            fillStyle: newFruit.color,
            // sprite: { texture: `/${newFruit.label}.svg` },
          },
          label: newFruit.label,
        }
      );
      World.add(world, body);
      score += 25;
      updateScore();
    }
    if (
      (collision.bodyA.label === "topLine" ||
        collision.bodyB.label === "topLine") &&
      !disableAction
    ) {
      alert("Game over");
    }
  });
});



function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Score: ${score}`;
}

// function resetScore() {
//   score = 0;
//   updateScore();
// }



addCurrentFruit();