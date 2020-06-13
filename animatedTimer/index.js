import {Timer} from "./timer"
import {animation} from "./animation"
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButtton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButtton, animation);
