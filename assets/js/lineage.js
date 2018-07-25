
class Lineage {
    constructor(control) {
        this.control = control;
        this.DragDrop;
        this.controls = null;
        this.max = -1; // -1 = unlimited; 0 = none;
        this.index = 0;
        this.parent = null;
        this.form = null;
    }
    unlimited() {
        this.max = -1;
    }
    none(){
        this.max = 0;
    }
    get Max(){
        return this.max;
    }
    set Max(value){
        this.max = value;
    }
    get Index(){
        return this.index;
    }
    set Index(value){
        this.index = value;
    }
    get Parent(){
        return this.parent;
    }
    set Parent(value){
        this.parent = value;
    }

    add(control) {
        if(this.max === 0) return false;
        if(this.controls === null) this.controls = [];
        if(this.max > -1 && this.max <= this.controls.length) return false;

        control.Lineage.parent = this.control;
        control.Lineage.index = this.controls.length;
        this.controls[this.controls.length] = control;
        control.Lineage.changedParent();

        return true;
    }
    changedParent(){
        this.form = this.Parent.Lineage.form;
        if(this.controls != null)
            for(let i = 0; i < this.controls.length; i++)
                this.controls[i].Lineage.changedParent();
        this.control.Transformation.Move.to(this.control.parent.x + this.control.parent.Border.left + this.control.Inside.x, this.control.parent.y + this.control.parent.Border.top + this.control.Inside.y);
    }
    firstPosition(control)
    {
        if(control != null && control.Lineage.index > 0)
        {
            for( let i = control.Lineage.index; i > 0; i-- )
            {
                if(!control.canMove && this.controls[i-1].canMove)return;
                this.controls[i] = this.controls[i-1];
                this.controls[i].Lineage.index = i;
                this.controls[i-1] = control;
                this.controls[i-1].Lineage.index = i-1;
            }
        }
        if(this.parent != null) this.parent.Lineage.firstPosition(this.control);
    }
}

class DragDrop {
    constructor(control) {
        this.control = control;
    }
    enter(){}
    leave(){}
}
