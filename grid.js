
// Tetris Remake 
// Created By Anthony Burnett



function Grid(rows, cols, cwidth) {

    this.rows = rows;
    this.cols = cols;
    this.cwidth = cwidth;
    this.strokeColor = "#003fcd";
    this.color = "#87ceeb";
    this.cells = [];
    this.shapes = [];
    this.currentShape;
    this.nextShape;

    for (var i = 0; i < rows; i++) {

        this.cells[i] = [];
        for (var j = 0; j < cols; j++) {

            this.cells[i][j] = 0;

        }

    }

    // UPDATE/MOVE BLOCK 
    // ==================================================================================================

    // the constant falling of the current falling block 
    // returns true if successful, false otherwise 
    this.update = function () {

        var check = true;

        // attempt to move down, if cant 
        if (!this.moveDown()){

            // create new shape
            check = this.createShape();

        }

        if(!check) {
            console.log("failed to update board");

        }

        return check;

    }

    this.canMoveDown = function(){

        var posUnder = this.currentShape.posUnder;

        // ensure it can move down 
        for (var k = 0; k < posUnder.length; k++){

            // it cannot move down if at least one space has an element or is the wall
            if(posUnder[k].i >= this.rows || this.cells[posUnder[k].i][posUnder[k].j] != 0){

                return false;

            }

        }

        return true;


    }

    this.canMoveLeft = function(){

        var posLeft = this.currentShape.posLeft;

        // ensure it can move left 
        for (var k = 0; k < posLeft.length; k++){

            // it cannot move left if at least one space has an element or is the wall
            if(posLeft[k].j < 0 || this.cells[posLeft[k].i][posLeft[k].j] != 0){

                return false;

            }

        }

        return true;


    }

    this.canMoveRight = function(){

        var posRight = this.currentShape.posRight;

        // ensure it can move right 
        for (var k = 0; k < posRight.length; k++){

            // it cannot move right if at least one space has an element or is the wall
            console.log(this.cells[posRight[k].i][posRight[k].j] != 0);
            if(posRight[k].j >= this.cols || this.cells[posRight[k].i][posRight[k].j] != 0){

                return false;

            }

        }

        return true;


    }

    this.moveDown = function(){

        if(this.canMoveDown()){

            this.removeShape();

            this.currentShape.moveDown();

            this.addShape();

        } else {

            return false;

        }

        return true;

    }

    this.moveLeft = function(){

        if(this.canMoveLeft()){

            this.removeShape();

            this.currentShape.moveLeft();

            this.addShape();

        }

    }

    this.moveRight = function(){

        if (this.canMoveRight()) {

            this.removeShape();

            this.currentShape.moveRight();

            this.addShape();

        }

    }

    // INSERTING BLOCK 
    // ==================================================================================================

    // returns true or false depending on if shape could be made or not 
    this.createShape = function () {

        console.log("attempting to create new shape");

        var options = [ONE, FOURXONE, TWOXTWO, TWOZ, _TWOZ, HOOK_L, HOOK, TEE, U];

        this.currentShape = new shape(options[floor(random(options.length))]);
        this.shapes.push(this.currentShape);
        var check = this.addShape();
        
        if (!check){

            console.log("creating new shape failed");

        }
        return check;

    }

    this.removeShape = function(){

        // for each block in the current shape 
        for (var k = 0; k < this.currentShape.blocks.length; k++){

            // put a 1 at the block's position on the grid
            this.cells[this.currentShape.blocks[k].i][this.currentShape.blocks[k].j] = 0;

        }

    }

    // returns true or false depending on if it successfully adds or not 
    this.addShape = function(){

        // for each block in the current shape 
        for (var k = 0; k < this.currentShape.blocks.length; k++){

            // ensure the position to add doesnt already have something, then game is over 
            if (this.cells[this.currentShape.blocks[k].i][this.currentShape.blocks[k].j] == 1)
                return false;

            // put a 1 at the block's position on the grid
            this.cells[this.currentShape.blocks[k].i][this.currentShape.blocks[k].j] = 1;

        }

        return true;

    }



    // VISUALIZATION 
    // ==================================================================================================

    this.print = function () {

        var str = "";

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {

                str += this.cells[i][j] + " ";

            }

            str += "\n";

        }

        console.log(str);
    }


    this.show = function(){

        // show grid style 
        stroke(this.strokeColor);
        strokeWeight(4);
        fill(this.color);
        rect(2, 2, this.cols * this.cwidth + 4, this.rows * this.cwidth + 4);

        // for each shape
        for(var k = 0; k < this.shapes.length; k++){

            // for each block of the shape 
            for (var l = 0; l < this.shapes[k].blocks.length; l++){

                // grab data to print 
                var i = this.shapes[k].blocks[l].i;
                var j = this.shapes[k].blocks[l].j;
                var color = this.shapes[k].blocks[l].color;

                stroke(0);
                strokeWeight(3);
                fill(color);
                rect(j * this.cwidth + 5, i * this.cwidth + 5, cwidth - 2, cwidth - 2);


            }

        }  


    }

}

