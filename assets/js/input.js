
class Mouse {
    constructor(control) {
        this.control = control;
    }
    hover(){
        mousehover.selected = this.control;

        if(this.control.Draw.clip === null || (mouse.x >= this.control.form.Inside.x + this.control.x+this.control.Border.left 
            && mouse.x <= this.control.form.Inside.x + this.control.right-this.control.Border.right 
            && mouse.y >= this.control.form.Inside.y + this.control.y+this.control.Border.top 
            && mouse.y <= this.control.form.Inside.y + this.control.bottom-this.control.Border.bottom
        ))
        {
            if( this.control.children !== null )
                for(var i = 0; i < this.control.children.length; i++)
                {       
                    if ( this.control.children[i].enable && this.control.children[i].containMouse() )
                    {
                        this.control.children[i].Mouse.hover();
                        return;
                    }
                }
        }
    }
    enter(){}
    leave(){}
    clickLeft(){};
    clickLeftUp(){};
    clickRight(){};
    clickRightUp(){};
}

class Keyboard {
    constructor() {

    }
}
class Input {
    constructor(control) {
        this.control = control;
        this.Mouse;
        this.Keyboard;
    }
}
