
// Tetris Remake 
// Created By Anthony Burnett



function Grid(rows, cols, cwidth) {

    this.rows = rows;
    this.cols = cols;
    this.cwidth = cwidth;
    this.strokeColor = "#003fcd";
    this.color = "#87ceeb";
    this.cells = [];
    this.blocks = [];
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

    this.removeRow = function(rowFilled){

        // change that row to zeros 
        for(var j = 0; j < this.cols; j++){

            this.cells[rowFilled][j] = 0;
            
            // delete all blocks 
            for(var k = 0; k < this.blocks.length; k++){

                if(this.blocks[k].i == rowFilled && this.blocks[k].j == j){

                    // remove kth block from array
                    this.blocks.splice(k,1);

                }

            }


        }

        // shift everything above, down 

        // for every col
        for (var j = 0; j < this.cols; j++){

            // everything up until rowFilled
            var column = [];

            // for every elem in the col above shift level
            // done from bottom up to ensure no bugs 
            for(var i = 0; i < rowFilled; i++){

                column.push(this.cells[i][j]);

            }

            column.unshift(0);

            for(var i = 0; i <= rowFilled; i++){

                this.cells[i][j] = column[i];

            }

        

        }

        // shift
        for(var k = 0; k < this.blocks.length; k++){

            // if block is above removed row 
            if(this.blocks[k].i < rowFilled) { 

                // move block down
                this.blocks[k].i++;

            }

        }

    }

    // the constant falling of the current falling block 
    // returns true if successful, false otherwise 
    this.update = function () {

        var check = true;

        // attempt to move down, if cant 
        if (!this.moveDown()){

            // check whether there is a filled row or not
            var rowFilled = this.filledRow();

            // if a row is filled 
            if(rowFilled != -1){

                this.removeRow(rowFilled);

            } 

            // else if a row is not filled
            else { 
                // create new shape
                check = this.createShape();
            }
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

    // returns the i of the filled row or -1 if none
    this.filledRow = function(){

        for(var i = 0; i < this.rows; i++){

            var isRowFilled = true;

            for(var j = 0; j < this.cols; j++){

                // if there is an empty space, then the current row is not filled
                if(this.cells[i][j] == 0){

                    isRowFilled = false;
                    break;

                }


            }

            console.log(isRowFilled);
            if(isRowFilled){

                return i;

            }

        }

        return -1;

    }

    // INSERTING BLOCK 
    // ==================================================================================================

    // returns true or false depending on if shape could be made or not 
    this.createShape = function () {

        console.log("attempting to create new shape");

        var options = [ONE, FOURXONE, TWOXTWO, TWOZ, _TWOZ, HOOK_L, HOOK, TEE, U];

        this.currentShape = new shape(options[floor(random(options.length))]);

        // for each block in the shape
        for(var k = 0; k < this.currentShape.blocks.length; k++){

            this.blocks.push(this.currentShape.blocks[k]);
            console.log(this.currentShape.blocks[k]);

        }
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
        console.clear();
        console.log(str);
    }


    this.show = function(){

        // show grid style 
        stroke(this.strokeColor);
        strokeWeight(4);
        fill(this.color);
        rect(2, 2, this.cols * this.cwidth + 4, this.rows * this.cwidth + 4);

        // for each block on the board
        for(var k = 0; k < this.blocks.length; k++){

                // grab data to print 
                var i = this.blocks[k].i;
                var j = this.blocks[k].j;
                var color = this.blocks[k].color;
                console.log(this.blocks.length);

                stroke(0);
                strokeWeight(3);
                fill(color);
                rect(j * this.cwidth + 5, i * this.cwidth + 5, cwidth - 2, cwidth - 2);


        }  


    }

}

