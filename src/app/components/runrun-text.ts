
export default class RunRun {

    private _content: string;
    private index: number = 0

    display: string;
    timer = null


    constructor() {
    }

    private tick = () => {
        if (this.index > this._content.length) {
            this.index = 0
        }

        this.display = this._content.substring(0, this.index)
        this.index += 1
        this.run(this.display)
    }

    run = (text) => { }

    stop = () => {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    }

    start = (text, fire) => {
        this._content = text
        this.index = 0
        this.run = fire
        this.timer = setInterval(() => {
            this.tick()
        }, 1000)
    }

}