// Tetris Remake 
// Created By Anthony Burnett

var board;

function setup(){

    createCanvas(800, 800);
    background('#679aca');
    frameRate(1);

    board = new Grid(18, 10, 40);

    board.print();
    board.createShape();
    board.print();

}

function draw(){
    
    var check = board.update();

    if(check){

        background('#679aca');
        board.print();
        board.show();

    } else {

        console.log("game over");
        noLoop();

    }

}

function keyPressed(){

    if(keyCode == LEFT_ARROW){

        board.moveLeft();
        board.print();
        background('#679aca');
        board.show();

    } else if(keyCode == RIGHT_ARROW){

        board.moveRight();
        board.print();
        background('#679aca');
        board.show();

    } else if(keyCode == DOWN_ARROW){

        board.moveDown();
        board.print();
        background('#679aca');
        board.show();

    }

}