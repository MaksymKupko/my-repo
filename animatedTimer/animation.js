export class TimerAnimation {
    constructor(elem) {
        this.elem = elem;
        this.totalDuration= null;
        this.perimetr = elem.getAttribute("r") * 2 * Math.PI;
        this.elem.setAttribute("stroke-dasharray", this.perimetr);
    }
    onStart(totalDuration) {
        this.totalDuration = totalDuration;
    }
    onTick = (timeRemaining) => {
        
        const { perimetr, totalDuration } = this;
        console.log(perimetr);
        const offset = (perimetr * timeRemaining) / totalDuration - perimetr;
        this.elem.setAttribute("stroke-dashoffset", offset);
        console.log((this.elem));
        
    };
    onComplete() {}
}
