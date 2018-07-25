
class Paint{
    constructor(x, y, width, height, hide = false){
        this.hide = hide;
        this.container = null;
        this.graphic = null;
    }
    clear(){}
    default(){}
    move(x, y){}
    resize(width, height){}
    cutText(text, width){}
    drawPaint(paint, x, y){}
    borderRectangle(x, y, width, height, color = "black"){}
    drawRectangle(x, y, width, height, color = "black"){}
    borderCircle(x, y, radius, color = "black"){}
    drawCircle(x, y, radius, color = "black"){}
    borderText(x, y, text, color = "black"){}
    drawText(x, y, text, color = "black"){}
}

class PaintCanvas extends Paint{
    constructor(x, y, width, height, hide = false){
        super(x, y, width, height, hide);
        //create canvas
        this.container = document.createElement('canvas');
        if(this.hide)
            this.container.style.display = 'none';
        this.container.style.position = 'absolute';
        this.container.style.left = x+"px";
        this.container.style.top = y+"px";
        this.container.width = width;
        this.container.height = height;
        this.container.oncontextmenu = ()=> { return false; };
        this.graphic = this.container.getContext("2d");
        document.body.appendChild(this.container);
    }
    clear(){
        this.graphic.clearRect(0, 0, this.container.width, this.container.height);
    }
    default(){
        this.graphic.fillStyle = "#000000";
        this.graphic.filter = "none";
        this.graphic.font = "10px sans-serif";
        this.graphic.globalAlpha = 1;
        this.graphic.globalCompositeOperation = "source-over";
        this.graphic.imageSmoothingEnabled = true;
        this.graphic.lineCap = "butt";
        this.graphic.lineDashOffset = 0;
        this.graphic.lineJoin = "miter";
        this.graphic.lineWidth = 1;
        this.graphic.miterLimit = 10;
        // this.graphic.mozCurrentTransform = Array [ 1, 0, 0, 1, 0, 0 ];
        // this.graphic.mozCurrentTransformInverse = Array [ 1, -0, -0, 1, 0, 0 ];
        // this.graphic.mozImageSmoothingEnabled = true;
        // this.graphic.mozTextStyle = "10px sans-serif";
        this.graphic.shadowBlur = 0;
        this.graphic.shadowColor = "rgba(0, 0, 0, 0)";
        this.graphic.shadowOffsetX = 0;
        this.graphic.shadowOffsetY = 0;
        this.graphic.strokeStyle = "#000000";
        this.graphic.textAlign = "start";
        this.graphic.textBaseline = "alphabetic";
    }
    move(x, y){
        this.container.style.left = x+"px";
        this.container.style.top = y+"px";
    }    
    resize(width, height){
        this.container.width = width;
        this.container.height = height;
        // this.container.style.width = width;
        // this.container.style.height = height;
        // this.graphic = this.container.getContext("2d");
        // this.graphic.width = width;
        // this.graphic.height = height;
        
    }
    cutText(text, width){
        if(text === "" || text.length === 0) return ["",""];
        let tempwidth = 0;
        for(let i = 1; i < text.length; i++)
        {
            tempwidth = this.graphic.measureText(text.substr(0, i)).width;
            if (tempwidth > width)
                return [text.substr(0, i), text.substr(i)];
        }
        return [text, ""];
    }
    drawPaint(paint, x, y){
        this.graphic.drawImage(paint.container, x, y);        
    }
    borderRectangle(x, y, width, height, color = "black"){
        this.graphic.strokeStyle = color;
        this.graphic.strokeRect(x, y, width, height);
    }
    drawRectangle(x, y, width, height, color = "black"){
        this.graphic.fillStyle = color;
        this.graphic.fillRect(x, y, width, height);
    }
    borderCircle(x, y, radius, color = "black"){
        this.graphic.beginPath();
        this.graphic.lineWidth=2;
        this.graphic.arc(x, y, radius, 0, 2 * Math.PI);
        this.graphic.strokeStyle = color;
        this.graphic.stroke();
    }
    drawCircle(x, y, radius, color = "black"){
        this.graphic.beginPath();
        this.graphic.lineWidth=2;
        this.graphic.arc(x, y, radius, 0, 2 * Math.PI);
        this.graphic.fillStyle = color;
        this.graphic.fill();
    }
    borderText(x, y, text, color = "black"){
        this.graphic.strokeStyle = color;
        this.graphic.strokeText(text, x, y);
    }
    drawText(x, y, text, color = "black"){
        this.graphic.fillStyle = color;
        this.graphic.fillText(text, x, y);
    }
}