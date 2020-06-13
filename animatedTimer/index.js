import {Timer} from "./timer.js"
import {TimerAnimation} from "./animation.js"
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButtton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const animation = new TimerAnimation(circle)
const timer = new Timer(durationInput, startButton, pauseButtton, animation);