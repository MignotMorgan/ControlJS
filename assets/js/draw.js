
class Draw {
    constructor(control) {
        this.control = control;
        this.clip = null;
    }
    execute(paint, x, y) {
        if(paint === undefined)
            this.draw(this.control.form.paint, this.control.x, this.control.y, this.control.width, this.control.height);
        else
            this.draw(paint, this.control.x-x, this.control.y-y, this.control.width, this.control.height);
  
        if(this.clip != null){
            this.clip.clear();
            this.drawChildren(this.clip, this.control.x+this.control.Border.left, this.control.y+this.control.Border.top);
            if(paint === undefined)
                this.control.form.paint.drawPaint(this.clip, this.control.x+this.control.Border.left, this.control.y+this.control.Border.top);
            else
                paint.drawPaint(this.clip, this.control.x+this.control.Border.left-x, this.control.y+this.control.Border.top-y);
        }
        else{
            this.drawChildren(paint, x, y);
        }
    }
    drawChildren(paint, x, y)
    {
        if(this.control.children != null)
            for(let i = 0; i < this.control.children.length; i++)
                this.control.children[i].Draw.execute(paint, x, y);
    }
    cliped(){
        this.clip = Factory.paint(0, 0, this.control.width-this.control.Border.left-this.control.Border.right, this.control.height-this.control.Border.top-this.control.Border.bottom, true);
    }
    clipResize(width, height){
        if(this.clip !== null)
            this.clip.resize(width, height);
    }
    draw(paint, x, y, width, height){
        if(mousehover.control != null && mousehover.control === this.control)
            paint.borderRectangle(x, y, width, height, "red");
        else
            paint.borderRectangle(x, y, width, height);

        paint.drawRectangle(x, y, width, height, "white");

        paint.borderRectangle(x+this.control.Border.left, y+this.control.Border.top, this.control.width-this.control.Border.left-this.control.Border.right, this.control.height-this.control.Border.top-this.control.Border.bottom, "grey" );



    }
}

class DrawForm extends Draw{
    constructor(control){
        super(control);
    }
    draw(paint, x, y, width, height){
        super.draw(paint, x+1, y+1, width-2, height-2);
        paint.drawText(10, 10, "mouse : " + mouse.x +" : "+ mouse.y +" time : "+ mouse.time);
        if(mousehover.control != null && mousehover.selected != null)
        {
            paint.drawText(10, 30, "mouse In : " + (mouse.x-mousehover.control.form.Inside.x-mousehover.control.x) +" : "+ (mouse.y-mousehover.control.form.Inside.y-mousehover.control.y));
            paint.drawText(10, 50, "mousehover : " + mousehover.control.id +" X: "+mousehover.control.Inside.x +" Y: "+ mousehover.control.Inside.y +" width: "+ mousehover.control.width +" height: "+ mousehover.control.height +" parent: "+ (mousehover.control.parent === null ? mousehover.control.parent : mousehover.control.parent.id));
        }
        if(transformation.control != null)
            paint.drawText(10, 70, "transformation : " + transformation.control.id +" resize: "+transformation.resize +" left: "+transformation.left +" top: "+transformation.top +" right: "+transformation.right +" bottom: "+transformation.bottom);    
        else
            paint.drawText(10, 70, "transformation : null");
    }
    drawChildren(paint, x, y)
    {
        // this.OnDrawing(this.Rectangle.X, this.Rectangle.Y, this.Rectangle.Width, this.Rectangle.Height, this.Context);

        if( this.control.children != null )
            for(let i = this.control.children.length; i >= 0 ; i--)
                if ( this.control.children[i] != null && this.control.children[i].visible )
                    this.control.children[i].Draw.execute(paint, x, y);
                    
        // this.DrawUp(this.Rectangle.X, this.Rectangle.Y, this.Rectangle.Width, this.Rectangle.Height, this.Context);
    };
}

