let controls = [];
let mouse = {x:0, y:0, down:Date.now(), up:Date.now(), time:0};
let mousehover = {control:null, selected:null};
let dragdrop = {control:null, element:null};
let transformation = {control:null, x:0, y:0, resize:false, border:5, left:false, top:false, right:false, bottom:false, lock:false};
let focus = null;

class Control {
    constructor() {
        this.Geometric;
        this.Lineage;
        this.Input;

        this.id = "";
        this.enable = true;
        this.visible = true;
        this.canFocus = true;
    }
    initialize(){}

    get Figure(){ return this.Geometric.Figure; }
    get Inside(){ return this.Geometric.Figure.Inside; }
    get Border(){ return this.Geometric.Figure.Border; }
    get Draw(){ return this.Geometric.Draw; }
    get Transformation(){ return this.Geometric.Transformation; }
    get Mouse(){ return this.Input.Mouse; }
    get Keyboard(){ return this.Input.Keyboard; }

    get x(){return this.Geometric.Figure.Location.x;}
    set x(value){this.Geometric.Figure.Location.x = value;}
    get y(){return this.Geometric.Figure.Location.y;}
    set y(value){this.Geometric.Figure.Location.y = value;}
    get width(){return this.Geometric.Figure.Size.width;}
    set width(value){this.Geometric.Figure.Size.width = value;}
    get height(){return this.Geometric.Figure.Size.height;}
    set height(value){this.Geometric.Figure.Size.height = value;}

    get parent(){ return this.Lineage.parent; }
    get form(){ return this.Lineage.form; }

    get canMove(){return this.Geometric.Transformation.Move.active;}
    set canMove(value){this.Geometric.Transformation.Move.active = value;}
    get canResize(){return this.Geometric.Transformation.Resize.active;}
    set canResize(value){this.Geometric.Transformation.Resize.active = value;}
    get canScale(){return this.Geometric.Transformation.Scale.active;}
    set canScale(value){this.Geometric.Transformation.Scale.active = value;}

    get form(){return this.Lineage.form;}
    get parent(){return this.Lineage.parent;}
    get children(){return this.Lineage.controls;}   
    get right(){return this.x + this.width;};
    get bottom(){return this.y + this.height;};

    containMouse(){
        return this.Geometric.Figure.containMouse();
    }
    contains(x, y){
        return this.Geometric.Figure.contains(x, y);
    }

    add(control){
        this.Lineage.add(control);
    }

    onDraw(x, y, context){
        this.Geometric.Draw.execute(x, y, context);
    }

    onFocus()
    {
        if( this.canFocus ){ focus = this; this.Lineage.firstPosition(null); }
        else if ( this.parent != null ) this.parent.onFocus();
    };
}

class Form extends Control {
    constructor() {
        super();
    
        controls[controls.length] = this;

        this.paint = null;
    }
    initialize(){
        super.initialize();
        this.Lineage.form = this;        
        this.x = 0;
        this.y = 0;        
    }    
}

//timer loop
let cjsLoop = () =>{
    for(let i = 0; i < controls.length; i++){
        controls[i].paint.clear();
        controls[i].onDraw(undefined);
    }

    queueNewFrame();    
};
let cjs_loop = -1;
let queueNewFrame = () => {

    if (window.requestAnimationFrame)
        cjs_loop = window.requestAnimationFrame(cjsLoop);
    else if (window.msRequestAnimationFrame)
        cjs_loop = window.msRequestAnimationFrame(cjsLoop);
    else if (window.webkitRequestAnimationFrame)
        cjs_loop = window.webkitRequestAnimationFrame(cjsLoop);
    else if (window.mozRequestAnimationFrame)
        cjs_loop = window.mozRequestAnimationFrame(cjsLoop);
    else if (window.oRequestAnimationFrame)
        cjs_loop = window.oRequestAnimationFrame(cjsLoop);
    else {
        queueNewFrame = function() { };
        cjs_loop = window.setInterval(cjsLoop, 16.7);
    }
};
queueNewFrame();

let OnMouseMove = (e) =>
{
	let x = 0;
	let y = 0;
	if(document.all){x = window.event.x; y = window.event.y;}   // IE
	else{x = e.clientX; y = e.clientY;}                         // Mozilla
	x += document.documentElement.scrollLeft;
	y += document.documentElement.scrollTop;
	
	mouse.x = x;
	mouse.y = y;
	
	// PageMap_OnMouseMove();
    // OnMouseMove_Control();
    // MouseMove(e);

    mousehover.selected = null;
    for(var i = 0; i < controls.length; i++)
        if( controls[i].contains(mouse.x, mouse.y) )
            controls[i].Mouse.hover();

    if( mousehover.control != mousehover.selected )
    {
        if( mousehover.control != null )
        {
            if(dragdrop.control != null)
                dragdrop.control.drag.leave();
            mousehover.control.Mouse.leave();
        }
        if( mousehover.selected != null )
        {
            mousehover.selected.Mouse.enter();
            if(dragdrop.control != null)
                dragdrop.control.drag.enter();
        }
        mousehover.control = mousehover.selected;
    }
    if(transformation.control == null)//+FullScreen
    {
        transformation.left = false;
        transformation.right = false;
        transformation.top = false;
        transformation.bottom = false;
        
        if( mousehover.control != null && mousehover.control.canResize )
        {
            if(mouse.x <= mousehover.control.form.Inside.x + mousehover.control.x + transformation.border)transformation.left = true;
            if(mouse.y <= mousehover.control.form.Inside.y + mousehover.control.y + transformation.border)transformation.top = true;
            if(mouse.x >= mousehover.control.form.Inside.x + mousehover.control.x + mousehover.control.width - transformation.border)transformation.right = true;
            if(mouse.y >= mousehover.control.form.Inside.y + mousehover.control.y + mousehover.control.height - transformation.border)transformation.bottom = true;
        }
    }
    else if( transformation.resize ) 
    {
        if(transformation.lock)return;
        transformation.lock = true;
        transformation.control.Transformation.Resize.on();
        transformation.lock = false;
    }
    else { transformation.control.Transformation.Move.on(); }
    
    // if(mousehover.control != null)mousehover.control.mouseMove();

};


let OnMouseDownLeft = (e) =>
{
    if( mousehover.control != null)
    {
        mousehover.control.onFocus();
        mousehover.control.Mouse.clickLeft();
        // Control_OnDrag();
        // if( !mousehover.control.IsInherit("Form") )return false;
    }
    // return MouseDownLeft(e);
    return false;
};
let OnMouseUpLeft = (e) =>
{
    transformation.control = null;
    transformation.resize = false;
    if( mousehover.control != null)
        mousehover.control.Mouse.clickLeftUp();
    // Control_OnDrop();
    // return MouseUpLeft(e);
    return false;
};
let OnMouseDownRight = (e) =>
{
    if( mousehover.control != null)
    {
        mousehover.control.onFocus();
        mousehover.control.Mouse.clickRight();
        mousehover.control.Transformation.on();
        // if( !mousehover.control.IsInherit("Form") )return false;
        return false;
    }
    // return MouseDownRight(e);
    return false;
};
let OnMouseUpRight = (e) =>
{
    if( mousehover.control != null)
        mousehover.control.Mouse.clickRightUp();
    OnClear();
    // return MouseUpRight(e);
    return false;
};

let OnMouseDown = (e) =>
{
    // if(ScreenAnimation != null &&  ScreenAnimation.CanInterrupt)
    //     { ScreenAnimation = null; return; }

    mouse.down = Date.now();

 	if ( (!document.all && e.which == 3) || (document.all && e.button==2) ) { OnMouseDownRight(e); }
	else { OnMouseDownLeft(e); }
};
let OnMouseUp = (e) =>
{
    mouse.up = Date.now();
    mouse.time = mouse.up - mouse.down;

 	if ( (!document.all && e.which == 3) || (document.all && e.button==2) ){ OnMouseUpRight(e); }
	else { OnMouseUpLeft(e); }
};
OnClear = () =>
{
//     Modifiers.Keycode = 0;
//     Modifiers.Value = "";
// //    Focus = null;
    // if(transformation.control != null)
    // {
    //     if(transformation.resize && transformation.control.canScale)transformation.control.Transformation.Scale.end();
    //     else if(transformation.resize)transformation.control.Transformation.resize.end();
    //     else transformation.control.Transformation.Move.end();
    // }
    transformation.control = null;
    transformation.resize = false;
    transformation.lock = false;
};
// let OnContextMenu = ()=> { return false; };

window.addEventListener("load", () => {
    window.document.addEventListener("mousemove", OnMouseMove);
    window.document.addEventListener("mouseup", OnMouseUp);
    window.document.addEventListener("mousedown", OnMouseDown);
    // window.document.onmousemove = OnMouseMove;
    // window.document.onmouseup = OnMouseUp;
    // window.document.onmousedown = OnMouseDown;
    // window.document.oncontextmenu = OnContextMenu;
});