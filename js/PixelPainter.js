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
        const canvasCells = document.getElementsByClassName('grid-cell');
        for (let i = 0; i < canvasCells.length; i++){
          canvasCells[i].style.background = 'transparent';
        }
      });
      button.className = "swatch-button";
      button.innerHTML = "Clear";
    })();
    
    const erase = (function(){
      const button = document.createElement("button");
      buttonSelection.appendChild(button);
      button.addEventListener('click', function(){
        selectedColor = 'transparent';
      });
      button.className = "swatch-button";
      button.innerHTML = "Erase";
    })();
    
    const drawBox = (function(){
      const button = document.createElement('button');
      buttonSelection.appendChild(button);
      button.addEventListener('click', function(){
        drawBoxShape = !drawBoxShape;
      });
      button.className = 'swatch-button';
      button.innerHTML = "Draw Box";
    })();
  })();

  
  
  const canvas = (function(){
    const canvasDiv = document.createElement("div");
    pixelPainterDiv.appendChild(canvasDiv);
    canvasDiv.id = "canvas-container";
    canvasDiv.onmouseenter = function(){
      mouseButtonIsDown = false;
    };

    const grid = (function(){
      const table = document.createElement("table");
      canvasDiv.appendChild(table);
      table.id = 'grid';

      for (let ir = 0; ir < height; ir++){
        let row = document.createElement("tr");
        table.appendChild(row);
        for (let ic = 0; ic < width; ic++){
          let cell = document.createElement("td");
          row.appendChild(cell);
          cell.className = 'grid-cell';
          cell.ondragstart = function(){return false;};
          cell.ondrop = function(){return false;};
          cell.onmousedown = function(){
            mouseButtonIsDown = true;
            if (drawBoxShape && drawBoxShapeStep === 1){
              drawBoxShapeStart = this;
            }
            if (drawBoxShape && drawBoxShapeStep === 2){
              drawBoxShapeEnd = this;
              for (let i = drawBoxShapeStart.cellIndex; i < drawBoxShapeEnd.cellIndex; i++){
                table.rows[drawBoxShapeEnd.parentElement.rowIndex].cells[i].style.background = selectedColor;
                table.rows[drawBoxShapeStart.parentElement.rowIndex].cells[i].style.background = selectedColor;  
              }
              for (let i = drawBoxShapeStart.parentElement.rowIndex; i < drawBoxShapeEnd.parentElement.rowIndex; i++){
                table.rows[i].cells[drawBoxShapeStart.cellIndex].style.background = selectedColor;
                table.rows[i].cells[drawBoxShapeEnd.cellIndex].style.background = selectedColor;
              }
            }
            this.style.background = selectedColor;
          }
          cell.onmouseenter = function(){
            if (mouseButtonIsDown){
              this.style.background = selectedColor;
            }
          }
          cell.onmouseup = function(){
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
    })();
  })();
})();