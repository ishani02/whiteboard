let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let sticky = document.querySelector("#sticky");
let uploadImage = document.querySelector("#upload-img");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let black = document.querySelector("#black");
let red = document.querySelector("#red");
let blue = document.querySelector("#blue");
let yellow = document.querySelector("#yellow");
let pencilSlider = document.querySelector("#pencil-size");
let eraserSlider = document.querySelector("#eraser-size");

let activeTool = "pencil";

pencil.addEventListener("click", function () {
  console.log("clicked on pencil");
  if (activeTool == "pencil") {
    if (pencilOptions.classList.contains("active")) {
      pencilOptions.classList.remove("active");
    } else {
      pencilOptions.classList.add("active");
    }
  } else {
    activeTool = "pencil";
    ctx.lineWidth = pencilWidth;
    ctx.strokeStyle = "black";
    pencil.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    sticky.classList.remove("active-tool");
    uploadImage.classList.remove("active-tool");
    eraserOptions.classList.remove("active");
    undo.classList.remove("active-tool");
    socket.emit("pencil", "black");
  }
});

eraser.addEventListener("click", function () {
  console.log("clicked on eraser");
  if (activeTool == "eraser") {
    if (eraserOptions.classList.contains("active")) {
      eraserOptions.classList.remove("active");
    } else {
      eraserOptions.classList.add("active");
    }
  } else {
    activeTool = "eraser";
    ctx.strokeStyle = "white";
    ctx.lineWidth = eraserWidth;
    eraser.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    sticky.classList.remove("active-tool");
    redo.classList.remove("active-tool");
    undo.classList.remove("active-tool");
    uploadImage.classList.remove("active-tool");
    pencilOptions.classList.remove("active");
  }
});
sticky.addEventListener("click", function () {
  if (activeTool != "sticky") {
    activeTool = "sticky";
    sticky.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    pencil.classList.remove("active-tool");
    uploadImage.classList.remove("active-tool");
    undo.classList.remove("active-tool");
    redo.classList.remove("active-tool");
  }
});
uploadImage.addEventListener("click", function () {
  if (activeTool != "uploadImage") {
    activeTool = "uploadImage";
    uploadImage.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    pencil.classList.remove("active-tool");
    sticky.classList.remove("active-tool");
    undo.classList.remove("active-tool");
    redo.classList.remove("active-tool");
  }
});

undo.addEventListener("click", function () {
  if (activeTool != "undo") {
    activeTool = "undo";
    undo.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    pencil.classList.remove("active-tool");
    sticky.classList.remove("active-tool");
    uploadImage.classList.remove("active-tool");
    redo.classList.remove("active-tool");
    undoPoints();
  }
});

redo.addEventListener("click", function () {
  if (activeTool != "redo") {
    activeTool = "redo";
    redo.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    pencil.classList.remove("active-tool");
    sticky.classList.remove("active-tool");
    uploadImage.classList.remove("active-tool");
    undo.classList.remove("active-tool");
    redoLines();
  }
});

black.addEventListener("click", function () {
  ctx.strokeStyle = "black";
});

blue.addEventListener("click", function () {
  ctx.strokeStyle = "blue";
});
red.addEventListener("click", function () {
  ctx.strokeStyle = "red";
});
yellow.addEventListener("click", function () {
  ctx.strokeStyle = "yellow";
});

let eraserWidth = 1;
let pencilWidth = 1;

pencilSlider.addEventListener("change", function () {
  ctx.lineWidth = pencilSlider.value;
  pencilWidth = pencilSlider.value;
});

eraserSlider.addEventListener("change", function () {
  ctx.lineWidth = eraserSlider.value;
  eraserWidth = eraserSlider.value;
});
