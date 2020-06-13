export class TimerAnimation {
    constructor(elem) {
        this.elem = elem;
        // this.duration = null;
        this.currentOffset = 0;
        this.perimetr = elem.getAttribute("r") * 2 * Math.PI;
        this.elem.setAttribute("stroke-dasharray", this.perimetr)
    }
    onStart(totalDuration) {
        this.duration = totalDuration;
    }
    onTick = (timeRemaining) => {
        // const {perimetr, duration} = this;
        // const currentOffset = perimetr / duration;
        this.elem.setAttribute("stroke-dashoffset", this.currentOffset);
        this.currentOffset = this.currentOffset - 1;
        console.log(this.elem);
        
    };
    onComplete() {}
}
