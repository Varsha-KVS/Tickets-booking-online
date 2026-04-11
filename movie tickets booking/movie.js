let theater = document.getElementById("theater");
let priceDisplay = document.getElementById("price");
let movie = document.getElementById("movie");
let timing = document.getElementById("timing");

let selectedSeats = [];
let bookedSeats = [];


function getKey() {
  return movie.value + "_" + timing.value;
}


function loadSeats() {
  theater.innerHTML = "";
  selectedSeats = [];

  bookedSeats = JSON.parse(localStorage.getItem(getKey())) || [];

  let rows = ["A", "B", "C", "D","E","F","G","H","I","J","K"];

  rows.forEach(row => {

    // LEFT BLOCK (1–7)
    for (let i = 1; i <= 7; i++) {
      createSeat(row + i);
    }

    createGap(); 

    // MIDDLE BLOCK (8–15)
    for (let i = 8; i <= 15; i++) {
      createSeat(row + i);
    }

    createGap(); 

    // RIGHT BLOCK (16–21)
    for (let i = 16; i <= 21; i++) {
      createSeat(row + i);
    }
  });

  updatePrice();
}



function selectSeat(seat, seatId) {
  if (seat.classList.contains("booked")) return;

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    seat.classList.add("available");
    selectedSeats = selectedSeats.filter(s => s !== seatId);
  } else {
    seat.classList.remove("available");
    seat.classList.add("selected");
    selectedSeats.push(seatId);
  }

  updatePrice();
}


function updatePrice() {
  let total = selectedSeats.length * +movie.value;
  priceDisplay.innerText = total;
}


document.getElementById("payBtn").onclick = () => {
  if (selectedSeats.length === 0) {
    alert("Select seats first!");
    return;
  }

  document.getElementById("payment").classList.remove("hidden");
  document.getElementById("final").innerText = priceDisplay.innerText;
};

function confirmBooking() {
  bookedSeats.push(...selectedSeats);

  localStorage.setItem(getKey(), JSON.stringify(bookedSeats));

  alert("🎉 Booking Confirmed!");

  loadSeats(); // refresh seats
  document.getElementById("payment").classList.add("hidden");
}


movie.addEventListener("change", loadSeats);
timing.addEventListener("change", loadSeats);


function createSeat(seatId) {
  let seat = document.createElement("div");

  seat.classList.add("seat");
  seat.innerText = seatId;

  if (bookedSeats.includes(seatId)) {
    seat.classList.add("booked");
  } else {
    seat.classList.add("available");
  }

  seat.addEventListener("click", () => selectSeat(seat, seatId));

  theater.appendChild(seat); 
}
function createGap() {
  let gap = document.createElement("div");
  gap.classList.add("gap");

  theater.appendChild(gap); 
}
loadSeats();