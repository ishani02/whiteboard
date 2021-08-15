const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let points = []; //db
let redoPoints = []; //array to contain points for redo
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  redraw(); //when size of window changes call redraw function to prevent data loss
});

ctx.lineWidth = 10;

let isPenDown = false;
canvas.addEventListener("mousedown", function (e) {
  let { top } = canvas.getBoundingClientRect();
  let x = e.clientX;
  let y = e.clientY - top;
  let point = {
    id: "md",
    x: x,
    y: y,
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };

  points.push(point);
  ctx.beginPath();
  ctx.moveTo(x, y);
  isPenDown = true;
  socket.emit("md", point);
});

canvas.addEventListener("mousemove", function (e) {
  if (isPenDown == true) {
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    let point = {
      x: x,
      y: y,
      id: "mm",
    };
    points.push(point);

    ctx.lineTo(x, y);
    ctx.stroke();
    socket.emit("mm", point);
  }
});

canvas.addEventListener("mouseup", function (e) {
  isPenDown = false;
  ctx.closePath();
});

function redraw() {
  for (let i = 0; i < points.length; i++) {
    //loop on "points" db to get all points
    let point = points[i];
    ctx.lineWidth = point.width; //note this for redo function
    ctx.strokeStyle = point.color; //for redo function
    if (point.id == "md") {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }
}

function undoPoints() {
  let redoPoint = [];
  //1. remove point from points
  if (points.length >= 2) {
    //atleast 1 md and 1 mm present
    let idx = points.length - 1; //ulta loop
    while (points[idx].id != "md") {
      //remove points till md is encountered
      redoPoint.unshift(points.pop()); //store the points removed to use for redo
      idx--;
    }
    redoPoint.unshift(points.pop()); //for md as loop terminates as md is encountered
  }
  redoPoints.push(redoPoint);
  // 2. clear canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // 3. redraw points
  redraw();
}

function redoLines() {
  if (redoPoints.length >= 1) {
    let redoPoint = redoPoints.pop();
    for (let i = 0; i < redoPoint.length; i++) {
      points.push(redoPoint[i]);
    }
    // 2. clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // 3. redraw points
    redraw();
  }
}
