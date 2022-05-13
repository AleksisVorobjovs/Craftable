document.addEventListener("DOMContentLoaded", () => {
    createCraftingSquares();
    createInventorySquares();
  
    function createCraftingSquares() {
      const gameBoard = document.getElementById("crafting-board");
  
      for (let index = 0; index < 9; index++) {
        let squareCrafting = document.createElement("div");
        squareCrafting.classList.add("squareCrafting");
        squareCrafting.classList.add("animate__animated");
        squareCrafting.setAttribute("id", index + 1);
        gameBoard.appendChild(squareCrafting);
      }
    }
    function createInventorySquares() {
        const gameBoard = document.getElementById("inventory-board");
    
        for (let index = 0; index < 36; index++) {
          let squareInventory = document.createElement("div");
          squareInventory.classList.add("squareInventory");
          squareInventory.classList.add("animate__animated");
          squareInventory.setAttribute("id_inventory", index + 1);
          gameBoard.appendChild(squareInventory);
        }
      }
});
    
  