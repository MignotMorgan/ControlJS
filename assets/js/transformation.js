
class Move {
    constructor(control) {
        this.control = control;
        this.active = false;
    }
    on()
    {
        let x = mouse.x - this.control.form.Inside.x - transformation.x;
        let y = mouse.y - this.control.form.Inside.y - transformation.y;

        if( this.control.parent !== null && this.control.parent.Draw.clip === null)// && !this.control.parent.IsInherit("Form") )
        {
            // if(Modifiers.Ctrl)
            //     this.MoveToOut(x, y);
            // else
                this.control.Transformation.Move.toIn(x, y);
        }
        else
        {
            this.to(x, y);
            // this.control.Transformation.Move.to(x, y);
        }
    };
    to(x, y,){
        this.control.Inside.x = this.control.parent === null ? x : x - this.control.parent.x - this.control.parent.Border.left;
        this.control.Inside.y = this.control.parent === null ? y : y - this.control.parent.y - this.control.parent.Border.top;
        this.control.x = x;
        this.control.y = y;

        if( this.control.children !== null )
            for(let i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Move.parentMove();
    }
    toIn(x, y)
    {
        if( x > this.control.parent.right - this.control.parent.Border.right - this.control.width ) x = this.control.parent.right - this.control.width - this.control.parent.Border.right;
        if( y > this.control.parent.bottom - this.control.parent.Border.bottom - this.control.height ) y = this.control.parent.bottom - this.control.height - this.control.parent.Border.bottom;
        if( x < this.control.parent.x + this.control.parent.Border.left ) x = this.control.parent.x + this.control.parent.Border.left;
        if( y < this.control.parent.y + this.control.parent.Border.top ) y = this.control.parent.y + this.control.parent.Border.top;
        this.to(x, y);
    };
    toOut(x, y)
    {
        if( x > this.control.parent.right - this.width ) x = this.control.parent.right - this.width;
        if( y > this.control.parent.bottom - this.height ) y = this.control.parent.bottom - this.height;
        if( x < this.control.parent.x  ) x = this.control.parent.x;
        if( y < this.control.parent.y ) y = this.control.parent.y;
        this.to(x, y);
    };
    parentMove()//supprimer!!!
    {
        this.to(this.control.parent.x + this.control.parent.Border.left + this.control.Inside.x, this.control.parent.y + this.control.parent.Border.top + this.control.Inside.y);
    };
}
class MoveForm extends Move{
    constructor(control){
        super(control);
    }
    
    on()
    {
        // if(Control_IsFullScreen())return;
        let x = mouse.x - transformation.x;
        let y = mouse.y - transformation.y;
        this.to(x, y);
    };
    to(x, y)
    {
        // if(Control_IsFullScreen())return;
    	// this.control.paint.container.style.top = y+"px";
    	// this.control.paint.container.style.left = x+"px";
    	// this.Frame.X = x;
    	// this.Frame.Y = y;
    	// this.control.x = 0;
        // this.control.y = 0;
        this.control.paint.move(x, y);
    	this.control.Inside.x = x;
    	this.control.Inside.y = y;
    	

        if( this.control.children !== null )
            for(let i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Move.parentMove();
        // this.Moved();
    }
}
class Resize {
    constructor(control) {
        this.control = control;
        this.active = false;
    }
    on()
    {
        let left = this.control.x;
        let top = this.control.y;
        let right = this.control.x + this.control.width;
        let bottom = this.control.y + this.control.height;
//        let minsize =  transformation.border*2;
        let minsizeWidth = this.control.Border.left+this.control.Border.right+1 > transformation.border*2 ? this.control.Border.left+this.control.Border.right+1 : transformation.border*2;
        let minsizeHeight = this.control.Border.top+this.control.Border.bottom+1 > transformation.border*2 ? this.control.Border.top+this.control.Border.bottom+1 : transformation.border*2;
        if( transformation.left )
        {
            left = mouse.x - this.control.form.Inside.x;
            if( this.control.parent !== null && this.control.parent.Draw.clip === null /*&& !this.control.parent.IsInherit("Form")*/ && left < this.control.parent.x + this.control.parent.Border.left )left = this.control.parent.x + this.control.parent.Border.left;
            if( left > this.control.right - minsizeWidth )left = this.control.right - minsizeWidth;

            if( this.control.children !== null && !this.control.canScale && this.control.Draw.clip === null )
                for(let l = 0; l < this.control.children.length; l++)
                    if( left + this.control.children[l].Inside.x + this.control.children[l].width + this.control.Border.left + this.control.Border.right > right )
                        left = right - this.control.children[l].Inside.x - this.control.children[l].width - this.control.Border.left - this.control.Border.right;
        }
        if( transformation.top )
        {
            top = mouse.y - this.control.form.Inside.y;
            if( this.control.parent !== null && this.control.parent.Draw.clip === null /*&& !this.control.parent.IsInherit("Form")*/ && top < this.control.parent.y + this.control.parent.Border.top ) top = this.control.parent.y + this.control.parent.Border.top;
            if( top > this.control.bottom - minsizeHeight )top = this.control.bottom - minsizeHeight;

            if( this.control.children !== null && !this.control.canScale && this.control.Draw.clip === null )
                for(let t = 0; t < this.control.children.length; t++)
                    if( top + this.control.children[t].Inside.y + this.control.children[t].height + this.control.Border.top + this.control.Border.bottom > bottom )
                        top = bottom - this.control.children[t].Inside.y - this.control.children[t].height - this.control.Border.top - this.control.Border.bottom;
        }
        if( transformation.right )
        {
            right = mouse.x - this.control.form.Inside.x;
            if( this.control.parent !== null && this.control.parent.Draw.clip === null /*&& !this.control.parent.IsInherit("Form")*/ && right > this.control.parent.x + this.control.parent.width - this.control.parent.Border.right ) right =  this.control.parent.x + this.control.parent.width - this.control.parent.Border.right;
            if( right < this.control.x + minsizeWidth )right = this.control.x + minsizeWidth;

            if( this.control.children !== null && !this.control.canScale && this.control.Draw.clip === null )
                for(let r = 0; r < this.control.children.length; r++)
                    if( left + this.control.children[r].Inside.x + this.control.children[r].width + this.control.Border.left + this.control.Border.right > right )
                        right = left + this.control.children[r].Inside.x + this.control.children[r].width + this.control.Border.left + this.control.Border.right;
        }
        if( transformation.bottom )
        {
            bottom = mouse.y - this.control.form.Inside.y;
            if( this.control.parent !== null && this.control.parent.Draw.clip === null /*&& !this.control.parent.IsInherit("Form")*/ && bottom > this.control.parent.y + this.control.parent.height - this.control.parent.Border.bottom ) bottom = this.control.parent.y + this.control.parent.height - this.control.parent.Border.bottom;
            if( bottom < this.control.y + minsizeHeight )bottom = this.control.y + minsizeHeight;

            if( this.control.children !== null && !this.control.canScale && this.control.Draw.clip === null )
                for(let b = 0; b < this.control.children.length; b++)
                    if( top + this.control.children[b].Inside.y + this.control.children[b].height + this.control.Border.top + this.control.Border.bottom > bottom )
                        bottom = top + this.control.children[b].Inside.y + this.control.children[b].height + this.control.Border.top + this.control.Border.bottom;
        }
        if(this.control.Draw.clip !== null)
        {
            if( right - left -this.control.Border.left-this.control.Border.right < 2)
            {
                if( transformation.left )left = this.control.x;
                if( transformation.right )right = this.control.x + this.control.width;
            }
            if( bottom - top -this.control.Border.top-this.control.Border.bottom < 2)
            {
                if( transformation.top )top = this.control.y;
                if( transformation.bottom )bottom = this.control.y + this.control.height;
            }
        }
        if(this.control.canScale)
        {
            let width = right - left;
            let height = bottom - top;
            let ratio_width = width / this.control.width;
            let ratio_height = height / this.control.height;

            let ratio_size = this.control.Transformation.Scale.minimumScale( {width:ratio_width, height:ratio_height} );
            if(transformation.left && ratio_size.width === 1)left = this.control.x;
            if(transformation.top && ratio_size.height === 1)top = this.control.y;
            if(transformation.left || transformation.Top)
                this.control.Transformation.Scale.moveToScale(left, top);
            this.control.Transformation.Scale.to(ratio_size.width, ratio_size.height);
        }
        else
        {
            if(transformation.left || transformation.top)
                this.control.Transformation.Move.to(left, top);
            this.to(right - left, bottom - top);
            // this.control.Transformation.Resize.to(right - left, bottom - top);
        }
    }
    to(width, height=width)
    {
        this.control.width = width;
        this.control.height = height;

        if(this.control.Draw.clip !== null)
        {
            // this.control.Draw.clip.width = this.control.width-this.control.Border.left-this.control.Border.right;
            // this.control.Draw.clip.height = this.control.height-this.control.Border.top-this.control.Border.bottom;
            this.control.Draw.clipResize(this.control.width-this.control.Border.left-this.control.Border.right, this.control.height-this.control.Border.top-this.control.Border.bottom);
        }

        if( this.control.children !== null )
            for(let i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Resize.parentResize();
    
        // this.Resized();
    }
    parentResize(){}
}

class ResizeForm extends Resize{
    constructor(control){
        super(control);
    }
    on()
    {
        // if(Control_IsFullScreen())return;
        var left = this.control.Inside.x;
        var top = this.control.Inside.y;
        var right = this.control.Inside.x + this.control.width;
        var bottom = this.control.Inside.y + this.control.height;

        if( transformation.left )left = mouse.x;
        if( transformation.top )top = mouse.y;
        if( transformation.right )right = mouse.x;
        if( transformation.bottom )bottom = mouse.y;

        if(this.control.canScale)
        {
            var width = right - left;
            var height = bottom - top;
            var ratio_width = width / this.control.width;
            var ratio_height = height / this.control.height;

            var ratio_size = this.control.Transformation.Scale.minimumScale( {width:ratio_width, height:ratio_height} );
            if(transformation.left && ratio_size.width == 1)left = this.control.Inside.x;
            if(transformation.top && ratio_size.height == 1)top = this.control.Inside.y;
            if(transformation.left || transformation.top)
                this.control.Transformation.Scale.moveToScale(left, top);
            this.control.Transformation.Scale.to(ratio_size.width, ratio_size.height);
        }
        else
        {
            if(transformation.left || transformation.top)
                this.control.Transformation.Move.to(left, top);
            this.to(right - left, bottom - top);
            // this.control.Transformation.Resize.to(right - left, bottom - top);
        }
    };
    to(width, height)
    {
        // if(Control_IsFullScreen())return;
    	// this.Canvas.width = width;
    	// this.Canvas.height = height;

        // this.Frame.Width = width;
        // this.Frame.Height = height;
        this.control.paint.resize(width, height);

        this.control.width = width;
        this.control.height = height;

        if( this.control.children != null )
            for(var i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Resize.parentResize();

        // this.Resized();
    };
}

class Scale {
    constructor(control) {
        this.control = control;
        this.active = false;
    }
    to(ratio_width, ratio_height)
    {
        this.control.width = this.control.width * ratio_width;
        this.control.height = this.control.height * ratio_height;

        this.control.Border.left = this.control.Border.left * ratio_width;
        this.control.Border.right = this.control.Border.right * ratio_width;
        this.control.Border.top = this.control.Border.top * ratio_height;
        this.control.Border.bottom = this.control.Border.bottom * ratio_height;

        if(this.control.Draw.clip !== null)
        {
            // this.control.Draw.clip.width = this.control.width-this.control.Border.left-this.control.Border.right;
            // this.control.Draw.clip.height = this.control.height-this.control.Border.top-this.control.Border.bottom;
            this.control.Draw.clipResize(this.control.width-this.control.Border.left-this.control.Border.right, this.control.height-this.control.Border.top-this.control.Border.bottom);
            
        }

        if( this.control.children !== null )
            for(let i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Scale.parentScale(ratio_width, ratio_height);

        // this.Scaled(ratio_width, ratio_height);
    }
    moveToScale(x, y)
    {
        this.control.Inside.x = this.control.parent === null ? x : x - this.control.parent.x-this.control.parent.Border.left;
        this.control.Inside.y = this.control.parent === null ? y : y - this.control.parent.y-this.control.parent.Border.top;
        this.control.x = x;
        this.control.y = y;
    }
    parentScale(ratio_width, ratio_height)//supprimer!!!
    {
        this.moveToScale(this.control.parent.x+this.control.parent.Border.left+(this.control.Inside.x*ratio_width), this.control.parent.y+this.control.parent.Border.top+(this.control.Inside.y*ratio_height) );
        this.to(ratio_width, ratio_height);
    }
    minimumScale(ratio_size)
    {
        if(this.control.Draw.clip !== null)
        {
            if( (this.control.width-this.control.Border.left-this.control.Border.right) * ratio_size.width < 2)ratio_size.width = 1;
            if( (this.control.height-this.control.Border.top-this.control.Border.bottom) * ratio_size.height < 2)ratio_size.height = 1;
        }
        if(this.control.canResize && this.control.width * ratio_size.width < transformation.border*2)ratio_size.width = 1;
        else if(this.control.width * ratio_size.width < 2)ratio_size.width = 1;
        if(this.control.canResize && this.control.height * ratio_size.height < transformation.border*2)ratio_size.height = 1;
        else if(this.control.height * ratio_size.height < 2)ratio_size.height = 1;
        if( this.control.children !== null )
            for(let i = 0; i < this.control.children.length; i++)
                ratio_size = this.control.children[i].Transformation.Scale.minimumScale(ratio_size);
        return ratio_size;
    }

}
class ScaleForm extends Scale{
    constructor(control){
        super(control);
    }
    to(ratio_width, ratio_height)
    {
        // if(Control_IsFullScreen())return;
    	// this.Canvas.width = this.Rectangle.Width * ratio_width;
        // this.Canvas.height = this.Rectangle.Height * ratio_height;
        this.control.paint.resize(this.control.width*ratio_width, this.control.height*ratio_height);

        // this.Frame.Width = this.Rectangle.Width * ratio_width;
        // this.Frame.Height = this.Rectangle.Height * ratio_height;
        this.control.width = this.control.width * ratio_width;
        this.control.height = this.control.height * ratio_height;

        this.control.Border.left = this.control.Border.left * ratio_width;
        this.control.Border.right = this.control.Border.right * ratio_width;
        this.control.Border.top = this.control.Border.top * ratio_height;
        this.control.Border.bottom = this.control.Border.bottom * ratio_height;

        if( this.control.children != null )
            for(var i = 0; i < this.control.children.length; i++)
                this.control.children[i].Transformation.Scale.parentScale(ratio_width, ratio_height);

        // this.Scaled(ratio_width, ratio_height);
    };
    moveToScale(x, y)
    {
    	// this.Canvas.style.top = y+"px";
    	// this.Canvas.style.left = x+"px";
    	// this.Frame.X = x;
    	// this.Frame.Y = y;
    	// this.Position.X = x;
    	// this.Position.Y = y;
    	// this.Location.X = x;
        // this.Location.Y = y;

        this.control.Inside.x = this.control.parent === null ? x : x - this.control.parent.x-this.control.parent.Border.left;
        this.control.Inside.y = this.control.parent === null ? y : y - this.control.parent.y-this.control.parent.Border.top;
        this.control.paint.move(x, y);
    };

}
class Transformation {
    constructor(control) {
        this.control = control;
        this.Move;
        this.Resize;
        this.Scale;
    }
    on()
    {
        if(  transformation.left || transformation.top || transformation.right || transformation.bottom )
        {
            transformation.control = this.control;
            transformation.resize = true;
        }
        else if( this.control.canMove )
        {
            // if( this.control.form === null )this.control.form = this.FindForm();
            transformation.control = this.control;
            transformation.x = mouse.x - this.control.form.Inside.x - this.control.x;
            transformation.y = mouse.y - this.control.form.Inside.y - this.control.y;
        }
        else if ( this.control.parent !== null )
            this.control.parent.Transformation.on();
    }
}