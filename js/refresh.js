//not working yet
//removes block from craftingSqures and puts it back in InventorySquares
function deleteCrafting(inventoryBlockList){
    let blockList = inventoryBlockList;
    for (let index = 9; index <45; index++) {
      var oldBlock = document.getElementById( "block-"+(index + 1));
      oldBlock.parentNode.removeChild(block);
      var newBlock = document.createElement(blockList[index-9]);
      let square = document.getElementById(index + 1);
      square.appendChild(block);

  }
}
