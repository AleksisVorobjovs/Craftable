document.addEventListener("DOMContentLoaded", () => {
  createCraftingSquares();
  createInventorySquares();
  createInventoryBlocks();

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

  function createInventorySquares() {
    const gameInventoryBoard = document.getElementById("inventory-board");
    for (let index = 9; index <45; index++) {
      let squareInventory = document.createElement("div");
      squareInventory.classList.add("squareInventory");
      squareInventory.classList.add("animate__animated");
      squareInventory.setAttribute("id", index + 1);
      gameInventoryBoard.appendChild(squareInventory);
    }
  }

  function createInventoryBlocks() {
    for (let index = 9; index <45; index++) {
      let block = document.createElement("div");
      block.classList.add("block");
      block.classList.add("draggable");
      block.setAttribute("id", "block-"+(index + 1));
      block.setAttribute("draggable", "true");
      block.setAttribute("ondragstart","onDragStart(event)");
      let square = document.getElementById(index + 1);
      square.appendChild(block);
    }
  }

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
    dropzone.appendChild(draggableElement);
  }
});
    
  