let pixelPainter = function(width, height){
  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.href = "https://use.fontawesome.com/releases/v5.8.1/css/all.css";
  document.getElementsByTagName("head")[0].appendChild(fontAwesomeLink);
  
  
  const pixelPainterDiv= document.getElementById('pixelPainter');
  const myColors = ['red', 'green', 'blue', 'yellow', 'orange',
  'black', 'red', 'purple', 'white', 'brown', ];
  let randomColorCount = 50;
  let selectedColor;
  let mouseButtonIsDown = false;
  let drawBoxShape = false;

  function colorSwatch() {
    const colorSwatch = document.createElement("div");
    colorSwatch.id = 'color-swatch';
    pixelPainterDiv.appendChild(colorSwatch);
    const choiceDiv = document.createElement("div");
    choiceDiv. id = 'swatch-colors';
    colorSwatch.appendChild(choiceDiv);

    for (let divCount = 0; divCount < myColors.length; divCount++){
      let colorSwatchDiv = document.createElement("div");
      colorSwatchDiv.className = 'color-choice'
      colorSwatchDiv.style.background = myColors[divCount];
      colorSwatchDiv.addEventListener('click', function(){
        selectedColor = this.style.background;
      })
      choiceDiv.appendChild(colorSwatchDiv);
    }

    for (divCount = 1; divCount < randomColorCount; divCount++){
      colorSwatchDiv = document.createElement("div");
      colorSwatchDiv.className = 'color-choice';
      let rValue = Math.floor(Math.random() * 255);
      let gValue = Math.floor(Math.random() * 255);
      let bValue = Math.floor(Math.random() * 255);
      colorSwatchDiv.style.background = 'rgb(' + rValue.toString() + ', ' + gValue.toString() + ' ,' + bValue.toString() + ')';
      colorSwatchDiv.addEventListener('click', function(){
        selectedColor = this.style.background;
      })
      choiceDiv.appendChild(colorSwatchDiv);
    }
    
    let buttonDiv = document.createElement("button-div");
    buttonDiv.id = "swatch-buttons";
    colorSwatch.appendChild(buttonDiv);
    let buttonElement = document.createElement("button");
    buttonDiv.appendChild(buttonElement);
    buttonElement.className = "swatch-button";
    buttonElement.innerHTML = "Clear";
    buttonElement.addEventListener('click', function(){
      const allCanvasCells = document.getElementsByClassName('canvas-cell');
      for (let currentCanvasCell = 0; currentCanvasCell < allCanvasCells.length; currentCanvasCell++){
        allCanvasCells[currentCanvasCell].style.background = 'transparent';
      }
    })

    buttonElement = document.createElement("button");
    buttonDiv.appendChild(buttonElement);
    buttonElement.className = "swatch-button";
    buttonElement.innerHTML = "Erase";
    buttonElement.addEventListener('click', function(){
      selectedColor = 'transparent';
    })
  }

  // let boxShape = function(){
  //   const boxShapeButton = document.createElement('button');
  //   let myState = false;

  //   boxShapeButton.className = 'swatch-button';
  //   boxShapeButton.textContent = 'Draw Boxes: OFF';
  //   pixelPainterDiv.appendChild(boxShapeButton);
  //   boxShapeButton.addEventListener('click', function(){
  //     myState = !myState;
  //   })
  // }();
  
  function canvas(){
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
          this.style.background = selectedColor;
        }
        cellElement.onmouseenter = function(){
          if (mouseButtonIsDown === true){
            this.style.background = selectedColor;
          }
        }
        cellElement.onmouseup = function(){
          mouseButtonIsDown = false;
        }
      }
    }
  }

  return {
    colorSwatch,
    canvas,
  }
}

myPixelPainter = pixelPainter(30, 30);
myPixelPainter.colorSwatch();
myPixelPainter.canvas();