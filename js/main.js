document.addEventListener("DOMContentLoaded", () => {
  createCraftingSquares();
  createInventorySquares();
  var blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png");
  createInventoryBlocks();
  //createGuessSquares();

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
    }
  }

  //creats randomly selected blocks that are image elements
  function createInventoryBlocks() {
    var rng;
    for (let index = 9; index <45; index++) {
      let block = document.createElement("img");
      block.classList.add("block");
      block.classList.add("draggable");
      block.setAttribute("id", "block-"+(index + 1));
      block.setAttribute("draggable", "true");
      block.setAttribute("ondragstart","onDragStart(event)");
      rng = Math.floor(Math.random() * blockList.length);
      block.setAttribute("src",blockList[rng])
      let square = document.getElementById(index + 1);
      square.appendChild(block);
    }
  }

  function createGuessSquares() {
    const gameGuesses = document.getElementById("guessSquares");
    for(let count = 0; count < 4; count++) {
      for (let index = 0; index < 9; index++) {
        let squareCrafting = document.createElement("div");
        squareCrafting.classList.add("guessSquare");
        gameGuesses.appendChild(squareCrafting);
      }
    }
  }
});
    
  