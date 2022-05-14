function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style;
    return false;
  }
  

  function onDragOver(event) {
    event.preventDefault();
    return false;
  }

  function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
    
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    return false;
  }
  