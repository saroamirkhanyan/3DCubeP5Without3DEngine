let points = []

let projection = [
  [1, 0, 0],
  [0, 1, 0],
]

let angle = 0;

function vectorToArr(vector) {
  return Object.values(vector).slice(1)
}

function multMatrix(matrix, vector) {
  vector = vectorToArr(vector)
  return createVector(
    ...matrix.map(row => row.reduce(
      (acc, curr, idx) => acc + curr * vector[idx], 0)
    )
  )
}

function connectPoints(point1, point2) {
  line(point1.x, point1.y, point2.x, point2.y)
}


function setup() {
  points[0] = createVector(-50, -50, -50)
  points[1] = createVector(50, 50, -50)
  points[2] = createVector(-50, 50, -50)
  points[3] = createVector(50, -50, -50)

  points[4] = createVector(-50, -50, 50)
  points[5] = createVector(50, 50, 50)
  points[6] = createVector(-50, 50, 50)
  points[7] = createVector(50, -50, 50)


  createCanvas(500, 500)
}

function draw() {
  background(0)
  stroke(255)
  strokeWeight(5)
  translate(width / 2, height / 2)
  let rotation = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
  ]

  let rotationX = [
    [1, 0, 0,],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)],
  ]

  let rotationY = [
    [cos(angle), 0, -sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
  ]

  let projected = []

  for (let i = 0; i < points.length; i++) {
    let rotatedByX = multMatrix(rotationX, points[i])
    let rotatedByY = multMatrix(rotationY, rotatedByX);
    projected.push(multMatrix(projection, rotatedByY))
  }
  for (let i = 0; i < projected.length; i++) {
    point(projected[i].x, projected[i].y)
  }
  connectPoints(projected[0], projected[3])
  connectPoints(projected[1], projected[2])
  connectPoints(projected[0], projected[2])
  connectPoints(projected[1], projected[3])

  connectPoints(projected[4], projected[0])
  connectPoints(projected[5], projected[1])
  connectPoints(projected[6], projected[2])
  connectPoints(projected[7], projected[3])

  connectPoints(projected[4], projected[6])
  connectPoints(projected[5], projected[6])
  connectPoints(projected[7], projected[4])
  connectPoints(projected[7], projected[5])
  angle += 0.01;
}
