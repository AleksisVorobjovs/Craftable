var inventoryBlockList;
document.addEventListener("DOMContentLoaded", () => {
  createCraftingSquares();
  createInventorySquares();
  var blockList = new Array("blocks/cobblestone.png","blocks/wood_plank.png", "blocks/white_wool.png");
  inventoryBlockList = createInventoryBlocks(); 

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

  //creats randomly selected blocks that are image elements
  function createInventoryBlocks() {
    var rng;
    var inventoryBlockList = [];
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
      inventoryBlockList.push(block);
    }
    return inventoryBlockList;
  }

});
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