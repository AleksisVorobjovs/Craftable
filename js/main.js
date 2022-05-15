var inventoryBlockList = new Array(36);
var CorrectRecipes = [["blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png",null,null,null],[null,null,null,"blocks/white_wool.png","blocks/white_wool.png","blocks/white_wool.png","blocks/wood_plank.png","blocks/wood_plank.png","blocks/wood_plank.png"]];
document.addEventListener("DOMContentLoaded", () => {
  createCraftingSquares();
  createInventorySquares();
  var blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png", "blocks/white_wool.png");
  inventoryBlockList = createInventoryBlocks(); 
  createGuessSquares();

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
    for(let i = 0; i <=9; i++){
      minNeeded = CorrectRecipes[0][i];
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

});
startGame();
function startGame() {
  document.addEventListener("click", handleMouseClick);
}

//checks which button is pressed
function handleMouseClick(e) {
  if (e.target.matches("[id='recipe-book-img']")) {
    openModal();
  }
  if (e.target.matches("[id='submitButton']")) {
    submitGuess();
    refresh();
  }
  if (e.target.matches("[id='newGameButton']")) {
    createCraftingSquares();
    createInventorySquares();
    inventoryBlockList = createInventoryBlocks(); 
    createGuessSquares();
  }
  }

function openModal(){
  // Get the modal
  var modal = document.getElementById("rulesModal");

  // Get the button that opens the modal
  var img = document.getElementById("recipe-book-img");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  img.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
//creates list with paths to images
var blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png", "blocks/white_wool.png");
//creats a list of objectsa placed in crafting table
function submitGuess(){
  const gameCraftBoard = document.getElementById("crafting-board");
  var guessList = [];
  for (let index = 0; index < 9; index++) {
    var guessedSquare = document.getElementById(index + 1);
    if(guessedSquare.childNodes.length==1){
      var guessedBlock = guessedSquare.childNodes[0];
      guessList.push(guessedBlock.src.substring(guessedBlock.src.search("blocks/")));
    }else{
      guessList.push(null);
    }
  }
  //creats a list with colors based on placed blocks
  var colorlist= new Array(9);
  for (let i = 0; i < CorrectRecipes.length; i++) {
    var subArray = CorrectRecipes[i];
    for (let j = 0; j < guessList.length; j++) {
      if(guessList[j]==CorrectRecipes[i][j]&&guessList[j]!=null){
        colorlist[j]= "green";
      }else if(CorrectRecipes[i].includes(guessList[j]) && guessList[j]!=null && colorlist[j]!="green"){
          colorlist[j]= "yellow";
      }else if(colorlist[j]!="green" && colorlist[j]!="yellow"){
        colorlist[j]= "gray";
      }
    }
  }
  console.log(colorlist)
}
//refreshes inventory by creating new blocks with the same layout as before
function refresh(){
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
  }
}
