// Tetris Remake 
// Created By Anthony Burnett

var board;
var canvas;
var nextShapeGrid;
var score;

function setup(){

    var canvas = createCanvas(400, 400);
    canvas.parent (document.getElementById ('canvas'));
    background('#679aca');
    frameRate(1);

    board = new Grid(18, 10, 20);
    nextShapeGrid = new Grid(6, 8, 20);
    // use dis guy to get next frame
    // but need to be able to see what the next block is 

    score = 0;

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
    
    showScore();

}

function keyPressed(){

    if(keyCode == LEFT_ARROW){

        board.moveLeft();
        board.print();
        background('#679aca');
        board.show();
        showScore()

    } else if(keyCode == RIGHT_ARROW){

        board.moveRight();
        board.print();
        background('#679aca');
        board.show();
        showScore()

    } else if(keyCode == DOWN_ARROW){

        board.moveDown();
        board.print();
        background('#679aca');
        board.show();
        showScore()

    } else if(keyCode == UP_ARROW){

        console.log("rotating");
        board.rotateShape();
        board.print();
        background('#679aca');
        board.show();
        showScore()

    }

}

function showScore(){

    document.getElementById ('score').innerHTML = board.score;

}