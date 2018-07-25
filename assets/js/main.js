window.onload = ()=>{
    let factory = new Factory();
    let form = (new FactoryForm).create(100, 10, 750, 750);
    form.id = "00";
    form.canMove = true;
    form.canResize = true;
    form.canScale = true;

    let control = factory.create(200, 100, 250, 250);
    control.id = "01";
    control.Draw.cliped();
    form.add(control);

    let control_2 = factory.create(-25, -5, 150, 150);
    control_2.id = "02";
    control_2.canMove = true;
    control.add(control_2);
    
    let control_25 = factory.create(20, 0, 100, 100);
    control_25.id = "25";
    control_25.canMove = true;
    control_2.add(control_25);

    let control_3 = factory.create(10, 400, 250, 250);
    control_3.id = "03";
    control_3.canMove = true;
    control_3.canResize = true;
    // control_3.canScale = true;
    form.add(control_3);

    let control_4 = factory.create(0, 0, 150, 150);
    control_4.id = "04";
    control_3.add(control_4);

    let control_5 = factory.create(5, 5, 50, 50);
    control_5.id = "05";
    control_5.canMove = true;
    control_4.add(control_5);

    let control_6 = factory.create(500,500, 200, 200);
    form.add(control_6);
};