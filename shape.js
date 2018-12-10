

// Tetris Remake 
// Groups of blocks
// Created By Anthony Burnett

function shape(data) {

    this.type;
    this.color = data.color;
    this.rotation = [];
    this.curRot;
    this.curRotIndex = 0;
    this.blocks = [];
    this.posUnder = [];
    this.posLeft = [];
    this.posRight = [];
    this.posRot = [];


    // for each rotation state
    for (var r = 0; r < data.rotation.length; r++) {

        this.rotation.push({
            blocks: [],
            posUnder: [],
            posLeft: [],
            posRight: [],
            posRot: [],
        });

        // for each block in data
        for (var k = 0; k < data.rotation[r].blockLocations.length; k++) {

            this.rotation[r].blocks.push(new Block(data.rotation[r].blockLocations[k].i, data.rotation[r].blockLocations[k].j, this.color));

        }

        // for each under location 
        for (var k = 0; k < data.rotation[r].underLocations.length; k++) {

            this.rotation[r].posUnder.push(new Block(data.rotation[r].underLocations[k].i, data.rotation[r].underLocations[k].j, this.color));

        }

        // for each left location 
        for (var k = 0; k < data.rotation[r].leftLocations.length; k++) {

            this.rotation[r].posLeft.push(new Block(data.rotation[r].leftLocations[k].i, data.rotation[r].leftLocations[k].j, this.color));

        }

        // for each right location 
        for (var k = 0; k < data.rotation[r].rightLocations.length; k++) {

            this.rotation[r].posRight.push(new Block(data.rotation[r].rightLocations[k].i, data.rotation[r].rightLocations[k].j, this.color));

        }

        // for each rotation location 
        for (var k = 0; k < data.rotation[r].rotationLocations.length; k++) {

            this.rotation[r].posRot.push(new Block(data.rotation[r].rotationLocations[k].i, data.rotation[r].rotationLocations[k].j, this.color));

        }

    }

    this.curRot = this.rotation[this.curRotIndex];

    // MOVING BLOCKS DOWN 
    // ==================================================================================================

    this.moveDown = function () {
        // for each rotation state
        for (var r = 0; r < data.rotation.length; r++) {
            // note: 
            // down is ++ because the grid starts with the top being 0,0

            // move each block down 
            for (var k = 0; k < this.rotation[r].blocks.length; k++) {

                // move block down
                this.rotation[r].blocks[k].i++;

            }

            // ensure pos under is moved down 1
            for (var k = 0; k < this.rotation[r].posUnder.length; k++) {

                // move pos down
                this.rotation[r].posUnder[k].i++;

            }

            // ensure pos left is moved down 1
            for (var k = 0; k < this.rotation[r].posLeft.length; k++) {

                // move pos down
                this.rotation[r].posLeft[k].i++;

            }

            // ensure pos right is moved down 1
            for (var k = 0; k < this.rotation[r].posRight.length; k++) {

                // move pos down
                this.rotation[r].posRight[k].i++;

            }

            // ensure pos rot is moved down 1
            for (var k = 0; k < this.rotation[r].posRot.length; k++) {

                // move pos down
                this.rotation[r].posRot[k].i++;

            }
        }

    }

    this.moveLeft = function () {
        // for each rotation state
        for (var r = 0; r < data.rotation.length; r++) {
            // move each block left 
            for (var k = 0; k < this.rotation[r].blocks.length; k++) {

                // move block left
                this.rotation[r].blocks[k].j--;

            }

            // ensure pos under is moved left 1
            for (var k = 0; k < this.rotation[r].posUnder.length; k++) {

                // move pos left
                this.rotation[r].posUnder[k].j--;

            }

            // ensure pos left is moved left 1
            for (var k = 0; k < this.rotation[r].posLeft.length; k++) {

                // move pos left
                this.rotation[r].posLeft[k].j--;

            }

            // ensure pos right is moved left 1
            for (var k = 0; k < this.rotation[r].posRight.length; k++) {

                // move pos left
                this.rotation[r].posRight[k].j--;

            }

            // ensure pos rot is moved left 1
            for (var k = 0; k < this.rotation[r].posRot.length; k++) {

                // move pos left
                this.rotation[r].posRot[k].j--;

            }
        }

    }

    this.moveRight = function () {
        // for each rotation state
        for (var r = 0; r < data.rotation.length; r++) {
            // move each block right 
            for (var k = 0; k < this.rotation[r].blocks.length; k++) {

                // move block right
                this.rotation[r].blocks[k].j++;

            }

            // ensure pos under is moved right 1
            for (var k = 0; k < this.rotation[r].posUnder.length; k++) {

                // move pos right
                this.rotation[r].posUnder[k].j++;

            }

            // ensure pos left is moved right 1
            for (var k = 0; k < this.rotation[r].posLeft.length; k++) {

                // move pos right
                this.rotation[r].posLeft[k].j++;

            }

            // ensure pos right is moved right 1
            for (var k = 0; k < this.rotation[r].posRight.length; k++) {

                // move pos right
                this.rotation[r].posRight[k].j++;

            }

            // ensure pos rot is moved right 1
            for (var k = 0; k < this.rotation[r].posRot.length; k++) {

                // move pos right
                this.rotation[r].posRot[k].j++;

            }
        }

    }


    // ROTATION
    // ===================================================================================

    this.rotate = function(){

        if(this.rotation.length - 1 == this.curRotIndex){

            this.curRotIndex = 0;
            this.curRot = this.rotation[0];

        } else {

            console.log("rotated");
            this.curRotIndex++;
            this.curRot = this.rotation[this.curRotIndex];
            console.log(this.curRot);

        }


    }


}

