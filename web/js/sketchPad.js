class SketchPad {
    // 헐 이런식으로 html이 아닌 js에서 canvas를 생성할 수도 있구만!
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;`;
        container.appendChild(this.canvas);

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.ctx = this.canvas.getContext("2d");
        
        // this.path = [];
        // this.paths = [];
        // this.isDrawing = false;
        // this.#redraw();
        this.reset();

        this.#addEventListeners();
    }

    

    reset(){
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();

    }

    #addEventListeners(){
        this.canvas.onmousedown = (evt) => {
            // 마우스 클릭 위치를 상대적으로 찾아내기
            const mouse = this.#getMouse(evt);
            // const rect = this.canvas.getBoundingClientRect();
            // const mouse = [
            //     // evt.clientX - rect.left,
            //     // evt.clientY - rect.top
            //     Math.round(evt.clientX - rect.left),
            //     Math.round(evt.clientY - rect.top)
            // ];
            // console.log(mouse);

            // this.path = [mouse]; // 마우스를 뗄때마다 다시 초기화
            this.paths.push([mouse]); // ?
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {

                const mouse = this.#getMouse(evt);
                // const rect = this.canvas.getBoundingClientRect();
                // const mouse = [
                //     Math.round(evt.clientX - rect.left),
                //     Math.round(evt.clientY - rect.top)
                // ];

                const lastPath = this.paths[this.paths.length-1];
                // this.path.push(mouse);
                lastPath.push(mouse)

                // console.log(this.path.length);
                this.#redraw();
            }
        }

        document.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc); // onmousedown을 재활용하는겨
        }

        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        document.ontouchend = () => {
            document.onmouseup();
        }

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
    }

    #redraw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw.path(this.ctx, this.path);
        draw.paths(this.ctx, this.paths);

        if (this.paths.length > 0) {
            this.undoBtn.disabled = false;
        } else {
            this.undoBtn.disabled = true;
        }
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }

}

