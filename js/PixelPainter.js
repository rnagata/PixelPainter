let pixelPainter = (function(){
  let width = 30;
  let height = 30;
  
  const pixelPainterDiv= document.getElementById('pixelPainter');
  const myColors = ['red', 'green', 'blue', 'yellow', 'orange',
  'black', 'red', 'purple', 'white', 'brown', ];
  let randomColorCount = 50;
  let selectedColor;
  let mouseButtonIsDown = false;
  let drawBoxShape = false;
  let drawBoxShapeStep = 1;
  let drawBoxShapeStart;
  let drawBoxShapeEnd;

  
  

  const colorSwatch = (function (){
    const colorSwatchDiv = document.createElement("div");
    pixelPainterDiv.appendChild(colorSwatchDiv);
    colorSwatchDiv.id = 'color-swatch';

    const colorSelection = document.createElement("div");
    colorSwatchDiv.appendChild(colorSelection);
    colorSelection. id = 'swatch-colors';

    let totalColors = myColors.length + randomColorCount;
    for (let i = 0; i < totalColors; i++){
      let color = document.createElement("div");
      colorSelection.appendChild(color);
      color.addEventListener('click', function(){
        selectedColor = this.style.background;
      });
      color.className = 'color-choice';
      if (i < myColors.length){
        color.style.background = myColors[i];
        console.log('reached');
        continue;
      }
      let rValue = Math.floor(Math.random() * 255);
      let gValue = Math.floor(Math.random() * 255);
      let bValue = Math.floor(Math.random() * 255);
      color.style.background = 'rgb(' + rValue + ', ' + gValue + ' ,' + bValue + ')';
    }
    
    const buttonSelection = document.createElement("div");
    colorSwatchDiv.appendChild(buttonSelection);
    buttonSelection.id = "swatch-buttons";
    
    const clear = (function(){
      const button = document.createElement("button");
      buttonSelection.appendChild(button);
      button.addEventListener('click', function(){
        const canvasCells = document.getElementsByClassName('canvas-cell');
        for (let i = 0; i < canvasCells.length; i++){
          canvasCells[i].style.background = 'transparent';
        }
      });
      button.className = "swatch-button";
      button.innerHTML = "Clear";
    })();
    
    const erase = document.createElement("button");
    buttonSelection.appendChild(erase);
    erase.addEventListener('click', function(){
      selectedColor = 'transparent';
    });
    erase.className = "swatch-button";
    erase.innerHTML = "Erase";
    
    const drawBoxModule = (function(){
      const moduleButton = document.createElement('button');
      moduleButton.className = 'swatch-button';
      moduleButton.textContent = 'Draw Box';
      buttonSelection.appendChild(moduleButton);
      
      moduleButton.addEventListener('click', function(){
        drawBoxShape = !drawBoxShape;
        console.log(drawBoxShape);
      });
    })();
  })();

  
  
  const canvas = function(){
    const canvasDiv = document.createElement("div");
    pixelPainterDiv.appendChild(canvasDiv);
    canvasDiv.id = "canvas-container";
    canvasDiv.onmouseenter = function(){
      mouseButtonIsDown = false;
    }
    const canvas = document.createElement("table");
    canvas.id = 'canvas';
    canvasDiv.appendChild(canvas);
    for (let rowCount = 0; rowCount < height; rowCount++){
      let rowElement = document.createElement("tr");
      canvas.appendChild(rowElement);
      for (let cellCount = 0; cellCount < width; cellCount++){
        let cellElement = document.createElement("td");
        cellElement.className = 'canvas-cell';
        rowElement.appendChild(cellElement);
        cellElement.ondragstart = function(){
          return false;
        }
        cellElement.ondrop = function(){
          return false;
        }
        cellElement.onmousedown = function(){
          mouseButtonIsDown = true;
          if (drawBoxShape && drawBoxShapeStep === 1){
            drawBoxShapeStart = this;
          }
          if (drawBoxShape && drawBoxShapeStep === 2){
            drawBoxShapeEnd = this;
            for (let i = drawBoxShapeStart.cellIndex; i < drawBoxShapeEnd.cellIndex; i++){
              canvas.rows[drawBoxShapeEnd.parentElement.rowIndex].cells[i].style.background = selectedColor;
              canvas.rows[drawBoxShapeStart.parentElement.rowIndex].cells[i].style.background = selectedColor;  
            }
            for (let i = drawBoxShapeStart.parentElement.rowIndex; i < drawBoxShapeEnd.parentElement.rowIndex; i++){
              canvas.rows[i].cells[drawBoxShapeStart.cellIndex].style.background = selectedColor;
              canvas.rows[i].cells[drawBoxShapeEnd.cellIndex].style.background = selectedColor;
            }
          }
          this.style.background = selectedColor;
        }
        cellElement.onmouseenter = function(){
          if (mouseButtonIsDown === true){
            this.style.background = selectedColor;
          }
        }
        cellElement.onmouseup = function(){
          mouseButtonIsDown = false;
          if (drawBoxShape){
            drawBoxShapeStep++;
          }
          if (drawBoxShapeStep > 2){
            drawBoxShapeStep = 1;
          }
        }
      }
    }
  }();

  return {
    width,
    height,
  }
})();

