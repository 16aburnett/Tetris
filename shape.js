

// Tetris Remake 
// Groups of blocks
// Created By Anthony Burnett

function shape(data){

    this.type;
    this.color = data.color;
    this.blocks = [];
    this.posUnder = [];
    this.posLeft= [];
    this.posRight = [];
    

    // for each block in data
    for(var k = 0; k < data.blockLocations.length; k++){

        this.blocks.push(new Block(data.blockLocations[k].i, data.blockLocations[k].j, this.color));

    }

    // for each under location 
    for(var k = 0; k < data.underLocations.length; k++){

        this.posUnder.push(new Block(data.underLocations[k].i, data.underLocations[k].j, this.color));

    }

    // for each left location 
    for(var k = 0; k < data.leftLocations.length; k++){

        this.posLeft.push(new Block(data.leftLocations[k].i, data.leftLocations[k].j, this.color));

    }

    // for each right location 
    for(var k = 0; k < data.rightLocations.length; k++){

        this.posRight.push(new Block(data.rightLocations[k].i, data.rightLocations[k].j, this.color));

    }


    console.log(this.posRight);

    // MOVING BLOCKS DOWN 
    // ==================================================================================================

    this.moveDown = function(){

        // note: 
        // down is ++ because the grid starts with the top being 0,0

        // move each block down 
        for(var k = 0; k < this.blocks.length; k++){

            // move block down
            this.blocks[k].i++;

        }

        // ensure pos under is moved down 1
        for(var k = 0; k < this.posUnder.length; k++){

            // move pos down
            this.posUnder[k].i++;

        }

        // ensure pos left is moved down 1
        for(var k = 0; k < this.posLeft.length; k++){

            // move pos down
            this.posLeft[k].i++;

        }

        // ensure pos right is moved down 1
        for(var k = 0; k < this.posRight.length; k++){

            // move pos down
            this.posRight[k].i++;

        }

    }
    
    this.moveLeft = function(){

        // move each block left 
        for(var k = 0; k < this.blocks.length; k++){

            // move block left
            this.blocks[k].j--;

        }

        // ensure pos under is moved left 1
        for(var k = 0; k < this.posUnder.length; k++){

            // move pos left
            this.posUnder[k].j--;

        }

        // ensure pos left is moved left 1
        for(var k = 0; k < this.posLeft.length; k++){

            // move pos left
            this.posLeft[k].j--;

        }

        // ensure pos right is moved left 1
        for(var k = 0; k < this.posRight.length; k++){

            // move pos left
            this.posRight[k].j--;

        }

    }

    this.moveRight = function(){

        // move each block right 
        for(var k = 0; k < this.blocks.length; k++){

            // move block right
            this.blocks[k].j++;

        }

        // ensure pos under is moved right 1
        for(var k = 0; k < this.posUnder.length; k++){

            // move pos right
            this.posUnder[k].j++;

        }

        // ensure pos left is moved right 1
        for(var k = 0; k < this.posLeft.length; k++){

            // move pos right
            this.posLeft[k].j++;

        }

        // ensure pos right is moved right 1
        for(var k = 0; k < this.posRight.length; k++){

            // move pos right
            this.posRight[k].j++;

        }

    }

}

