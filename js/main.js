var gussesMade = 0;
var inventoryBlockList = new Array(36);
//stores correctRecipes
var correctRecipes = [["blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png",null,null,null],[null,null,null,"blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png"]];
var nameRecipe = "Bed";
//stores list of all block paths
var blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png", "blocks/white_wool.png", "blocks/stick.png", "blocks/coal.png", "blocks/wood_log.png", "blocks/stone.png", "blocks/glowstone_dust.png", "blocks/snow_ball.png", "blocks/sand.png", "blocks/gunpowder.png", "blocks/clay_ball.png", "blocks/brick.png", "blocks/book.png", "blocks/sandstone.png", "blocks/sandstone_slab.png", "blocks/redstone_dust.png", "blocks/torch.png", "blocks/pumpkin.png", "blocks/lapis_lazuli.png", "blocks/diamond.png", "blocks/gold_ingot.png", "blocks/iron_ingot.png", "blocks/emerald.png", "blocks/nether_quartz.png", "blocks/quartz_slab.png", "blocks/quartz_block.png", "blocks/wheat.png");
var isGameOn=false;
openPage();
startGame();
//starts game
function openPage(){
  document.addEventListener("DOMContentLoaded", () => {
    createCraftingSquares();
    createInventorySquares();
    inventoryBlockList = createInventoryBlocks(); 
    createGuessSquares();
  });
}

//checks which button is pressed
function handleMouseClick(e) {
  if(e.target.matches("[id='recipe-book-img']")) {
    openModal();
  }
  if(e.target.matches("[id='newGameButton']")) {
    newGame();
  }
}
function handleCrafting(e) {
  if(e.target.matches("[id='submitButton']")) {
    submitGuess(); 
  }
}

//creats new game
function newGame(){
  for (let index = 9; index <45; index++) {
    let oldBlock = document.getElementById("block-"+(index + 1));
    oldBlock.parentNode.removeChild(oldBlock);
    let oldInventorySquare = document.getElementById(index + 1);
    oldInventorySquare.parentNode.removeChild(oldInventorySquare);
  }
  for (let index = 46; index <=81; index++) {
    let oldGuessSquare = document.getElementById(index);
    if(oldGuessSquare.childNodes>=1){
      oldGuessSquare.removeChild(oldBlock);
    }
    oldGuessSquare.parentNode.removeChild(oldGuessSquare);
  }
  for (let index = 1; index <=4; index++) {
    let oldGuessParentSquare = document.getElementById("guess"+index);
    oldGuessParentSquare.parentNode.removeChild(oldGuessParentSquare);
  }
  gussesMade = 0;
  correctRecipes = [["blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png",null,null,null],[null,null,null,"blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png"]];
  nameRecipe = "Bed";
  blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png", "blocks/white_wool.png", "blocks/stick.png", "blocks/coal.png", "blocks/wood_log.png", "blocks/stone.png", "blocks/glowstone_dust.png", "blocks/snow_ball.png", "blocks/sand.png", "blocks/gunpowder.png", "blocks/clay_ball.png", "blocks/brick.png", "blocks/book.png", "blocks/sandstone.png", "blocks/sandstone_slab.png", "blocks/redstone_dust.png", "blocks/torch.png", "blocks/pumpkin.png", "blocks/lapis_lazuli.png", "blocks/diamond.png", "blocks/gold_ingot.png", "blocks/iron_ingot.png", "blocks/emerald.png", "blocks/nether_quartz.png", "blocks/quartz_slab.png", "blocks/quartz_block.png", "blocks/wheat.png");
  inventoryBlockList=[];
  createInventorySquares();
  inventoryBlockList = createInventoryBlocks();
  createGuessSquares();
  startGame();
}

function startGame() {
  isGameOn=true;
  document.addEventListener("click", handleCrafting);
  document.addEventListener("click", handleMouseClick);
}

//ends game
function stopGame() {
  isGameOn=false;
  document.removeEventListener("click", handleCrafting);
}

//creates crafting grid where blocks can be dropped
 function createCraftingSquares() {
  const gameCraftBoard = document.getElementById("crafting-board");
  for (let index = 0; index < 9; index++) {
    let squareCrafting = document.createElement("div");
    squareCrafting.classList.add("squareCrafting");
    squareCrafting.classList.add("animate__animated");
    squareCrafting.classList.add("dropzone");
    squareCrafting.setAttribute("id",index + 1);
    squareCrafting.setAttribute("ondragover","onDragOver(event)");
    squareCrafting.setAttribute("ondrop","onDrop(event)");
    gameCraftBoard.appendChild(squareCrafting);
  }
}

//creates inventory grid where blocks are stored
function createInventorySquares() {
  const gameInventoryBoard = document.getElementById("inventory-board");
  for (let index = 9; index <45; index++) {
    let squareInventory = document.createElement("div");
    squareInventory.classList.add("squareInventory");
    squareInventory.classList.add("animate__animated");
    squareInventory.setAttribute("id", index + 1);
    squareInventory.setAttribute("ondragover","onDragOver(event)");
    squareInventory.setAttribute("ondrop","onDrop(event)");
    gameInventoryBoard.appendChild(squareInventory);
    if(index >= 36){
      squareInventory.classList.add("lastInventoryLine");
    }
  }
}
//creates grids for previous guesses
function createGuessSquares(){
  const guessHistory = document.getElementById("guesses"); 
  let totalIndex = 45;
  for(let count = 0; count <4; count ++) {
    const guess = document.createElement("div")
    guess.classList.add("guess")
    guess.classList.add("col-3")
    guess.setAttribute("id", "guess" + (count + 1))
    for (let localIndex = 0; localIndex<9; localIndex++) {
      let squareGuess = document.createElement("div");
      squareGuess.classList.add("squareGuess");
      squareGuess.setAttribute("id", totalIndex + 1);
      totalIndex++;
      guess.appendChild(squareGuess);
    }
    guessHistory.appendChild(guess);
  }
}
//creats randomly selected blocks that are image elements
function createInventoryBlocks() {
  var rng;
  var rngList = [];
  var inventoryBlockList = [];

  //first create blocks that are need to complete the game
  for(let i = 0; i <=9; i++){
    minNeeded = correctRecipes[0][i];
    if(minNeeded==null){
    }else{
      for(let j = 0; j <blockList.length; j++){
        if(minNeeded==blockList[j]){
          do{
            rng = Math.floor((Math.random() * 36)+10);
          }while(rngList.includes(rng));
            rngList.push(rng);
            let block = document.createElement("img");
            block.classList.add("block");
            block.classList.add("draggable");
            block.setAttribute("id", "block-"+rng);
            block.setAttribute("draggable", "true");
            block.setAttribute("ondragstart","onDragStart(event)");
            block.setAttribute("src",blockList[j]);
            let square = document.getElementById(rng);
            square.appendChild(block);
            inventoryBlockList[rng-10]= block;
          }
        }
      }
    }

  //second add random blocks
  for (let index = 9; index <45; index++) {
    if(rngList.includes(index+1)==false){
      let block = document.createElement("img");
      block.classList.add("block");
      block.classList.add("draggable");
      block.setAttribute("id", "block-"+(index + 1));
      block.setAttribute("draggable", "true");
      block.setAttribute("ondragstart","onDragStart(event)");
      rng = Math.floor(Math.random() * blockList.length);
      block.setAttribute("src",blockList[rng]);
      let square = document.getElementById(index + 1);
      square.appendChild(block);
      inventoryBlockList[index-9]=block;
    }
  }
  return inventoryBlockList;
}

//adds dragging functionality
function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
  
  event
    .currentTarget
    .style;
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');
    
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  if(dropzone.childNodes.length!=1 && dropzone.classList.contains("draggable")==false){
    dropzone.appendChild(draggableElement);
  }
}

//funcionality for discription pop up
function openModal(){
  var modal = document.getElementById("rulesModal");
  var img = document.getElementById("recipe-book-img");
  var span = document.getElementsByClassName("close")[0];

  //open the modal
  img.onclick = function() {
    modal.style.display = "block";
  }

  //close the modal button
  span.onclick = function() {
    modal.style.display = "none";
  }

  //close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//creats a list of objects that were placed in crafting table
function submitGuess(){
  const gameCraftBoard = document.getElementById("crafting-board");
  var guessList = [];
  var notEmpty = false;
  for (let index = 0; index < 9; index++) {
    var guessedSquare = document.getElementById(index + 1);
    if(guessedSquare.childNodes.length==1){
      notEmpty = true;
      var guessedBlock = guessedSquare.childNodes[0];
      guessList.push(guessedBlock.src.substring(guessedBlock.src.search("blocks/")));
    }else{
      guessList.push(null);
    }
  }
  //if crafting table not null then submit guess
  if(notEmpty == true){
    gussesMade++;
    //if recipe is correct
    for (let i = 0; i < correctRecipes.length; i++) {
      if(guessList.every((val, index) => val === correctRecipes[i][index])){
        openVictoryScreen();
        stopGame();
        return
      }
    }

    //if don't guess in 4 tries you lose :(
    if(gussesMade>4){
      openFailureScreen();
      stopGame();
      return
    }
    //creats a list with colors based on placed blocks
    var colorlist= new Array(9);
    for (let i = 0; i < correctRecipes.length; i++) {
      for (let j = 0; j < guessList.length; j++) {
        if(guessList[j]==correctRecipes[i][j]&&guessList[j]!=null){
          colorlist[j]= "green";
        }else if(correctRecipes[i].includes(guessList[j]) && guessList[j]!=null && colorlist[j]!="green"){
          colorlist[j]= "yellow";
        }else if(colorlist[j]!="green" && colorlist[j]!="yellow"){
          colorlist[j]= "black";
        }
      }
    }

    //refreshes inventory by creating new blocks with the same layout as before but now with colors
    var inventory = inventoryBlockList;
    for (let index = 9; index <45; index++) {
      let block = document.getElementById("block-"+(index + 1));
      block.parentNode.removeChild(block);
      let newblock = document.createElement("img");
      block.classList.add("block");
      block.classList.add("draggable");
      block.setAttribute("id", "block-"+(index + 1));
      block.setAttribute("draggable", "true");
      block.setAttribute("ondragstart","onDragStart(event)");
      block.setAttribute("src",inventory[index-9].src.substring(inventory[index-9].src.search("blocks/")));
      let square = document.getElementById(index + 1);
      square.appendChild(block);
      for(let i = 0; i<guessList.length; i++){
        if(guessList[i]==inventory[index-9].src.substring(inventory[index-9].src.search("blocks/"))){
          if(square.classList.contains("green")){
            continue;
          }else if(square.classList.contains("yellow")){
            square.classList.remove("yellow");
            square.classList.add(colorlist[i]);
          }
          square.classList.add(colorlist[i]);
        }
      }
    }
    firstGuessGrid = document.getElementById("guess1");
    secondGuessGrid = document.getElementById("guess2");
    thirdGuessGrid = document.getElementById("guess3");
    fourthGuessGrid = document.getElementById("guess4");
    let idvar;
    if(!(firstGuessGrid.classList.contains("guessMade"))){
      currentGuess = firstGuessGrid;
      idvar = 46;
    }else if(!(secondGuessGrid.classList.contains("guessMade"))){
      currentGuess = secondGuessGrid;
      idvar = 55;
    }else if(!(thirdGuessGrid.classList.contains("guessMade"))){ 
      currentGuess = thirdGuessGrid;
      idvar = 64;
    }else if(!(fourthGuessGrid.classList.contains("guessMade"))){ 
      currentGuess = fourthGuessGrid;
      idvar = 73;
    }

    //create guess table with colors
    for(let k = 0; k < 9; k++){
      if(!(guessList[k]==null)){
        square = document.getElementById(k+idvar);
        let block = document.createElement("img");
        block.classList.add("guessedBlock");
        square.classList.add(colorlist[k]);
        block.setAttribute("src", guessList[k]);
        square.appendChild(block);
      }
    }
    currentGuess.classList.add("guessMade");
  }
}

//victory pop up
function openVictoryScreen() {
  var modal = document.getElementById("victoryModal");
  var span = document.getElementsByClassName("close")[1];
  
  //open model
  modal.style.display = "block";
  var victoryText = document.getElementById('victory-text');
  victoryText.innerHTML += "<p id='victory-guessMade'>You correctly guessed the recipe in "+gussesMade+" guesses.</p>";
  victoryText.innerHTML += "<p id='victory-nameRecipe'>The answer was "+nameRecipe+".</p>";
  
  var victoryGuessMade = document.getElementById('victory-guessMade');
  var victoryNameRecipe = document.getElementById('victory-nameRecipe');
  //close model
  span.onclick = function() {
    victoryGuessMade.parentNode.removeChild(victoryGuessMade);
    victoryNameRecipe.parentNode.removeChild(victoryNameRecipe);
    modal.style.display = "none";
  }
  
  //When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      victoryGuessMade.parentNode.removeChild(victoryGuessMade);
      victoryNameRecipe.parentNode.removeChild(victoryNameRecipe);
      modal.style.display = "none";
    }
  }
}
//lose pop up
function openFailureScreen() {
  var modal = document.getElementById("failureModal");
  var span = document.getElementsByClassName("close")[2];

  //open model
  modal.style.display = "block";
  var failureText = document.getElementById('failure-text');
  failureText.innerHTML += "<p id='failure-guessMade'>You couldn't correctly guess the recipe.</p>"
  failureText.innerHTML +="<p id='failure-nameRecipe'>The answer was "+nameRecipe+".</p>";

  var failureGuessMade = document.getElementById('failure-guessMade');
  var failureNameRecipe = document.getElementById('failure-nameRecipe');
  //close model
  span.onclick = function() {
    failureGuessMade.parentNode.removeChild(failureGuessMade);
    failureNameRecipe.parentNode.removeChild(failureNameRecipe);
    modal.style.display = "none";
  }

  //When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      failureGuessMade.parentNode.removeChild(failureGuessMade);
      failureNameRecipe.parentNode.removeChild(failureNameRecipe);
      modal.style.display = "none";
    }
  }
}