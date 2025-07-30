//Creating Cells (We can also use Canvas tag)
let cells = [];
let snake = [ {x:12,y:12},{x:12,y:13},{x:12,y:14},{x:12,y:15}];
for(let i=1;i<=24;i++){
    let row = [];
    for(let j= 1;j<=24;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell");
        document.querySelector(".game-screen").appendChild(cell);
        row.push(cell);
    }
    cells.push(row);
}
// loops
// setInterval(() => {
//     work();
// }, 250);

//Create snake (initially)
cells[12][12].setAttribute("class","snake-head");
cells[12][13].setAttribute("class","snake-body");
cells[12][14].setAttribute("class","snake-body");
cells[12][15].setAttribute("class","snake-tail");



let currentmove = {x:-1,y:0};
// Movement Tracker
document.addEventListener("keydown",(e)=>{
    console.log(e)
if(e.key == "ArrowUp"){
 currentmove = {x:-1,y:0};
} else if(e.key == "ArrowDown"){
 currentmove = {x:1,y:0};
} else if(e.key == "ArrowLeft"){
 currentmove = {x:0,y:-1};
} else if(e.key == "ArrowRight"){
 currentmove = {x:0,y:1};
}
})

console.log(currentmove)
console.log("before", snake);

function work(){ //main logic
    console.log(currentmove)
    for(let i=snake.length-1;i>=0;i--){
     if(i==0){ //heads
       snake[0].x = snake[0].x + currentmove.x;
       snake[0].y = snake[0].y + currentmove.y;

      cells[snake[0].x][snake[0].y].setAttribute("class","snake-head");
    } else if(i==snake.length-1){ //tails
      cells[snake[i].x][snake[i].y].removeAttribute("class");
      cells[snake[i].x][snake[i].y].setAttribute("class","cell");
    
        snake[i].x = snake[i-1].x;
        snake[i].y = snake[i-1].y;

     cells[snake[i].x][snake[i].y].setAttribute("class","snake-tail");
    }else{ //rest body parts
     snake[i].x = snake[i-1].x;
     snake[i].y = snake[i-1].y;

     cells[snake[i].x][snake[i].y].setAttribute("class","snake-body");
    }
   }
console.log("after", snake);
}


