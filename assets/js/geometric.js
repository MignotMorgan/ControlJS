
class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Border {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
}

class Rectangle {
    constructor(control){
        this.control = control;
        this.Location;
        this.Inside;
        this.Size;
        this.Border;
    }
    containMouse(){
        return this.contains(mouse.x, mouse.y);
    }
    contains(x, y){
        return ( x > this.control.form.Inside.x +  this.Location.x && x < this.control.form.Inside.x + this.Location.x + this.Size.width 
            && y > this.control.form.Inside.y + this.Location.y && y < this.control.form.Inside.y + this.Location.y + this.Size.height );
    }
}

class Geometric{
    constructor(control){
        this.control = control;
        this.Figure;
        this.Transformation;
        this.Draw;
    }
}
