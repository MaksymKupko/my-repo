import {Timer} from "./timer.js"
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButtton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButtton, {
    onStart() {
        console.log("Timer started");
    },
    onTick() {
        console.log("Timer just ticked down");
    },
    onComplete() {
        console.log("Timer is completed");
    },
});
