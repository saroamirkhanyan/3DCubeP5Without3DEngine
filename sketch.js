let points = []


let angle = 30;

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
  strokeWeight(5)
  line(point1.x, point1.y, point2.x, point2.y)
}


function myRotateX(points) {
  let rotationX = [
    [1, 0, 0,],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)],
  ]
  return points.map(point => {
    return multMatrix(rotationX, point)
  })
}

function myRotateY(points) {
  let rotationY = [
    [cos(angle), 0, -sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
  ]

  return points.map(point => {
    return multMatrix(rotationY, point)
  })
}

function myRotateZ(points) {
  let rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
  ]
  return points.map(point => {
    return multMatrix(rotationZ, point)
  })
}

function project(points) {
  let projection = [
    [1, 0, 0],
    [0, 1, 0],
  ]
  return points.map(point => {
    return multMatrix(projection, point)
  })
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
  strokeWeight(10)
  translate(width / 2, height / 2)

  Promise.resolve(points)
    // .then(myRotateX)
    // .then(myRotateY)
    // .then(myRotateZ)
    .then(project)
    .then(newPoints => {

      for (let i = 0; i < newPoints.length; i++) {
        point(newPoints[i].x, newPoints[i].y)
      }

      connectPoints(newPoints[0], newPoints[3])
      connectPoints(newPoints[1], newPoints[2])
      connectPoints(newPoints[0], newPoints[2])
      connectPoints(newPoints[1], newPoints[3])

      connectPoints(newPoints[4], newPoints[0])
      connectPoints(newPoints[5], newPoints[1])
      connectPoints(newPoints[6], newPoints[2])
      connectPoints(newPoints[7], newPoints[3])

      connectPoints(newPoints[4], newPoints[6])
      connectPoints(newPoints[5], newPoints[6])
      connectPoints(newPoints[7], newPoints[4])
      connectPoints(newPoints[7], newPoints[5])

    })

  // angle += 0.009;
}
