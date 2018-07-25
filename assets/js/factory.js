class Factory{
    // constructor(){
    //     if(new.target === Factory)
    //         throw TypeError("You cannot create the abstract class Factory.");
    // }
    static paint(x, y, width, height, hide = false){
        return new PaintCanvas(x, y, width, height, hide);
    }

    create(x, y, width, height=width, top=10, right=top, bottom=top, left=right){

        let control = this.createControl();

        control.Geometric = this.createGeometric(control, x, y, width, height, top, right, bottom, left);
        control.Lineage = this.createLineage(control);
        control.Input = this.createInput(control);
        control.paint = this.createPaint(x, y, width, height);

        control.initialize();

        return control;
    }
    
    createControl(){ return new Control(); }
    createPaint(x, y, width, height, hide = false){ return null; }
    // createControl(x, y, width, height){ throw TypeError("You cannot use the function createControl of the abstract class Factory."); }
    // createForm(x, y, width, height){ throw TypeError("You cannot use the function createForm of the abstract class Factory."); }
    // createPaint(x, y, width, height, hide = false){ throw TypeError("You cannot use the function createPaint of the abstract class Factory."); }
    createGeometric(control, x, y, width, height, top, right, bottom, left){
        let geometric = new Geometric(control);
        geometric.Figure = this.createFigure(control, x, y, width, height, top, right, bottom, left);
        geometric.Transformation = this.createTransformation(control);
        geometric.Draw = this.createDraw(control);
        return geometric;
    }
    createFigure(control, x, y, width, height, top, right, bottom, left){
        let figure = new Rectangle(control);
        figure.Location = this.createLocation(x, y);     //location in the canvas
        figure.Inside = this.createLocation(x, y);       //location inside the control parent
        figure.Size = this.createSize(width, height);
        figure.Border = this.createBorder(top, right, bottom, left);
        return figure;
    }
    createLocation(x, y){ return new Location(x, y); }
    createSize(width, height){ return new Size(width, height); }
    createBorder(top, right, bottom, left){ return new Border(top, right, bottom, left); }

    createTransformation(control){
        let transformation = new Transformation(control);
        transformation.Move = this.createMove(control);
        transformation.Resize = this.createResize(control);
        transformation.Scale = this.createScale(control);
        return transformation;
    }    
    createMove(control){return new Move(control); }
    createResize(control){return new Resize(control); }
    createScale(control){return new Scale(control); }

    createDraw(control){ return new Draw(control); }

    createLineage(control){
        let lineage = new Lineage(control);
        lineage.DragDrop = this.createDragDrop(control);
        return lineage;
    }
    createDragDrop(control){ return new DragDrop(control); }
    
    createInput(control){
        let input = new Input(control);
        input.Mouse = this.createMouse(control);
        input.Keyboard = this.createKeyboard(control);
        return input;
    }
    createMouse(control){ return new Mouse(control); }
    createKeyboard(control){ return new Keyboard(control); }

}



class FactoryForm extends Factory{  
    createControl(){return new Form(); }
    createPaint(x, y, width, height, hide = false){ return Factory.paint(x, y, width, height, hide); }

    createDraw(control){ return new DrawForm(control); }
    createMove(control){return new MoveForm(control); }
    createResize(control){return new ResizeForm(control); }
    createScale(control){return new ScaleForm(control); }
}