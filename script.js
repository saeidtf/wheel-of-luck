var circles = [
  { name: "Luck 1", id: 1, percentage: 3 },
  { name: "Empty", id: 12, percentage: 2 },
  { name: "Discount code 1", id: 11, percentage: 4 },
  { name: "Luck 2", id: 10, percentage: 0 },
  { name: "Discount code 2", id: 9, percentage: 2 },
  { name: "Empty", id: 8, percentage: 4 },
  { name: "Luck 3", id: 7, percentage: 1 },
  { name: "Discount code 3", id: 6, percentage: 2 },
  { name: "$10 Price", id: 5, percentage: 1 },
  { name: "Empty", id: 4, percentage: 5 },
  { name: "Discount code 4", id: 3, percentage: 4 },
  { name: "20$ Price", id: 2, percentage: 1 },
];

const wheel = document.getElementById("wheel");
const wheel_box = document.getElementById("wheel_box");
var rotateButton = document.getElementById("rotate-button");

circles.forEach((circle, index) => {
  const piece = document.createElement("div");
  piece.innerHTML = circle.name + " " + circle.id;
  piece.classList.add("piece");
  wheel.appendChild(piece);
});

var rotation = 0;
var rotateInterval;
function calculateSection(rotation) {
  var sectionSize = 360 / 12;
  var sectionIndex = Math.round((rotation % 360) / sectionSize);
  return sectionIndex + 1;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function rotateImage(degrees) {
  rotation += degrees;

  wheel.style.transform = "rotate(" + rotation + "deg)";

  wheel_box.classList.add("blur");

  var currentSection = calculateSection(rotation);
  const circle = circles.find((circle) => circle.id === currentSection);
  const top_circle = [];
  circles
    .filter((circle) => circle.percentage > 0)
    .forEach((circle) => {
      for (let i = 0; i < circle.percentage; i++) {
        top_circle.push(circle);
      }
    });

  shuffleArray(top_circle);

  const random_number = Math.floor(Math.random() * top_circle.length);
  const random_circle = top_circle[random_number];

  if (
    circle &&
    circle.id === random_circle.id &&
    rotation > Math.floor(Math.random() * 50000) + 1000
  ) {
    rotation = rotation > 30 ? Math.round(rotation / 30) * 30 : rotation;
    wheel.style.transform = "rotate(" + rotation + "deg)";

    console.log("Current section:", currentSection);
    console.log(random_number);
    console.log(rotation);

    clearInterval(rotateInterval);
    wheel_box.classList.remove("blur");
    rotateButton.innerHTML = "Animate";
  }
}

function startStopRotation() {
  rotation = 0;
  rotateButton.innerHTML = "Stop Rotation";
  rotateInterval = setInterval(function () {
    rotateImage(10);
  }, 2);
}

rotateButton.addEventListener("click", startStopRotation);
