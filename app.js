//Creating Cells (We can also use Canvas tag)
let start = false;
let foodif = false;
let currid;
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

gameover(); //initailly no movement 

//track the start of the game (Keyboard key)
document.addEventListener("keydown",()=>{
 if(start == false){
   start == true;
   document.querySelector(".cover").style.display = "none"; 
   currid = loopgame();
 }
})

// track the start of the game (mouse-click)
document.querySelector(".game-screen").addEventListener("click",()=>{
 if(start == false){
   start = true;
  document.querySelector(".cover").style.display = "none"; 
  currid = loopgame();
 }
})

//gameover
function gameover(){
  console.log("game over,id is" , currid);
    clearInterval(currid);
    document.querySelector(".cover").style.display = "block"; 
    start = false;
  }

// loop
function loopgame(){
let id = setInterval(() => {
  work();
}, 250);
return id;
}

//Create a initial snake
cells[12][12].setAttribute("class","snake-head");
cells[12][13].setAttribute("class","snake-body");
cells[12][14].setAttribute("class","snake-body");
cells[12][15].setAttribute("class","snake-tail");
// Generate a initial Food
cells[17][18].setAttribute("class","apple cell");


// Movement Tracker
let currentmove = {x:-1,y:0};
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

//Main logic (How snake moves)
function work(){
    for(let i=snake.length-1;i>=0;i--){
     if(i==0){ //heads
       snake[0].x = snake[0].x + currentmove.x;
       snake[0].y = snake[0].y + currentmove.y;

      cells[snake[0].x][snake[0].y].setAttribute("class","snake-head");
    } else if(i==snake.length-1){ //tails
                if(foodif == true){ //if food eaten
                  foodif = false;
                  let newtail = { x:`${snake[i].x}`,y:`${snake[i].y}`};
                snake.push(newtail);

                 
                cells[snake[i].x][snake[i].y].setAttribute("class","snake-body");
                snake[i].x = snake[i-1].x;
                snake[i].y = snake[i-1].y;
               cells[snake[i].x][snake[i].y].setAttribute("class","snake-tail");
                }
                else { //if food not eaten
                  cells[snake[i].x][snake[i].y].removeAttribute("class");
                   cells[snake[i].x][snake[i].y].setAttribute("class","cell");
                  
    
                    snake[i].x = snake[i-1].x;
                     snake[i].y = snake[i-1].y;

                  cells[snake[i].x][snake[i].y].setAttribute("class","snake-tail");
                }

    }else { //rest body parts
     snake[i].x = snake[i-1].x;
     snake[i].y = snake[i-1].y;

     cells[snake[i].x][snake[i].y].classList.add("snake-body");
    }
   }

  if (snake[0].x == foodX && snake[0].y == foodY){ //generates food
     foodController();
     foodif = true;
  }
  if(snake[0].x == 0 || snake[0].x == 23 || snake[0].y == 0|| snake[0].y == 23){
     gameover();
     console.log("calling gameover")
  }if(checkbite()){
     console.log("bite");
  }
console.log("after:", snake);
}


// Food Spawn Controller
//Variables
let foodX = 17;
let foodY = 18;
let food = "apple";
//Main food Spawn Function
function foodController(){
  cells[foodX][foodY].classList.remove(`${food}`); //Remove old Food

  //picks a food between Apple, cherry and banana
    let num1 = Math.floor((Math.random() * 3)+1);
    if (num1 == 3){
    food = "apple";
    } else if (num1 == 2){
        food = "banana";
    } else if(num1 == 1){
        food = "cherry";
    }
  
   foodCoordinate(); // Generates co-ordinates

  //Controls whether food generates on map (not on snake)
   for (let i=0;true;i++){
        if(foodCheck() == false){
         break;
     } else {
       foodCoordinate();
      }
    }
  console.log(foodX,foodY);
  cells[foodX][foodY].classList.add(`${food}`); //Spawn food on map

  //Some food controller functions,
  function foodCoordinate(){ //Co-ordinate generator
   foodX =  Math.floor((Math.random() * 23)+1);
   foodY =  Math.floor((Math.random() * 23)+1);
  }
  function foodCheck(){ //Checks if food generates on snake
     for(let i=0; i<=snake.length;i++){
         if(foodX == snake[i].x && foodY == snake[i].y){
          foodCoordinate();
           return true;
         } else return false;
    }
  }
}

function checkbite(){
  for(let i=1; i<=snake.length;i++){
    if((snake[0].x===snake[i].x) && (snake[0].y===snake[i].y) ){
      return true;
    }else 
      {return false;}
  }
}

// function sizecontroller(a,b){
//  snake.shift(`{x:${a},y:${b}}`)
// }


