let points = []


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
  points[0] = createVector(0, -30, 0)
  points[1] = createVector(-30, 30, 30)
  points[2] = createVector(30, 30, 30)

  points[3] = createVector(-30, 30, -30)
  points[4] = createVector(30, 30, -30)

  createCanvas(500, 500)
}

function draw() {
  background(0)
  stroke(255)
  strokeWeight(10)
  translate(width / 2, height / 2)

  Promise.resolve(points)
    .then(myRotateX)
    .then(myRotateY)
    .then(myRotateZ)
    .then(project)
    .then(newPoints => {

      for (let i = 0; i < newPoints.length; i++) {
        point(newPoints[i].x, newPoints[i].y)
      }

      connectPoints(newPoints[0], newPoints[1])
      connectPoints(newPoints[0], newPoints[2])
      connectPoints(newPoints[1], newPoints[2])

      connectPoints(newPoints[0], newPoints[3])
      connectPoints(newPoints[0], newPoints[4])


      connectPoints(newPoints[3], newPoints[4])
      connectPoints(newPoints[2], newPoints[4])
      connectPoints(newPoints[1], newPoints[3])


    })

  angle += 0.009;
}
