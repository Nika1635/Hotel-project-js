let burgerbar = document.querySelector(".burgerbar")
let display = document.querySelector("nav")
const range = document.querySelector(".range-selected")
const rangeInput = document.querySelectorAll(".range-input input")
const rangePrice = document.querySelectorAll(".range-price input")
let roomcards = document.querySelector(".room-cards")
let roomtypes = document.getElementById("roomtype-list")
let filter = document.querySelector("#filter")
let hotel = sessionStorage.getItem("hotelId")


burgerbar.addEventListener("click", () => {
    display.classList.toggle("none");
    
})

function toHome() {
    window.location.href = "./index.html"
}

function toRooms() {
  window.location.href = "./rooms.html"
}

function toHotels() {
  window.location.href = "./hotels.html"
}

function toDetails(id) {
  sessionStorage.setItem("roomId", id)
  window.location.href = "./details.html";
}

function toBooks() {
  window.location.href = "./booked.html";
}






fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes")
.then(typedata => typedata.json())
.then(types => {
    types.forEach(buttons => {
        
        roomtypes.innerHTML += `<button class="roomtype" onclick = "byroomtype(${buttons.id})">${buttons.name}</button>`
    })
})

let roomarr = []

fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
.then(roomListData => roomListData.json())
.then(roomList => {
  roomcards.innerHTML = ""
    
  if(hotel == null){
    roomList.forEach(card => {
      console.log(card);
      roomcards.innerHTML += `<div class="room-card">
                  <img src="${card.images[0].source}" alt="">
                  <div class="cover-info">
                      <p>${card.name}</p>
                      <p class="price">€ ${card.pricePerNight}</p>
                  </div>
                  <button onclick="toDetails(${card.id})">Book Now</button>
              </div>`
  })
  }else{
    roomList.forEach(card => {
      roomarr.push(card)
    })
    

    let filteredrooms = roomarr.filter(element => element.hotelId == hotel)
    console.log(filteredrooms)

    filteredrooms.forEach(element => 
      roomcards.innerHTML += `<div class="room-card">
                  <img src="${element.images[0].source}" alt="">
                  <div class="cover-info">
                      <p>${element.name}</p>
                      <p class="price">€ ${element.pricePerNight}</p>
                  </div>
                  <button onclick="toDetails(${element.id})">Book Now</button>
              </div>`
    )
    sessionStorage.clear("hotelId")
  }

    
})


function byroomtype(id){
    fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
    .then(roomListData => roomListData.json())
    .then(roomList => {
        let filterrooms = roomList.filter(element => element.roomTypeId == id)
        
        roomcards.innerHTML = ""

        filterrooms.forEach(card => {
            roomcards.innerHTML += `<div class="room-card">
                    <img src="${card.images[0]?.source || ''}" alt="Room Image">
                    <div class="cover-info">
                        <p>${card.name}</p>
                        <p class="price">€ ${card.pricePerNight}</p>
                    </div>
                    <button>Book Now</button>
                </div>`;
        })


        })  
}

function diplayall() {
    fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
    .then(roomListData => roomListData.json())
    .then(roomList => {
        roomcards.innerHTML = ""
        roomList.forEach(card => {
            roomcards.innerHTML += `<div class="room-card">
                        <img src="${card.images[0].source}" alt="">
                        <div class="cover-info">
                            <p>${card.name}</p>
                            <p class="price">€ ${card.pricePerNight}</p>
                        </div>
                        <button>Book Now</button>
                    </div>`
        })
    })
}

let rangeMin = 100;

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(rangeInput[0].value);
      let maxRange = parseInt(rangeInput[1].value);
      if (maxRange - minRange < rangeMin) {     
        if (e.target.className === "min") {
          rangeInput[0].value = maxRange - rangeMin;        
        } else {
          rangeInput[1].value = minRange + rangeMin;        
        }
      } else {
        rangePrice[0].value = minRange;
        rangePrice[1].value = maxRange;
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
      }
    });
  });

  rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = rangePrice[0].value;
      let maxPrice = rangePrice[1].value;
      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });


filter.addEventListener("submit", function(e){
    e.preventDefault()

    let filterData = new FormData(filter)
    let finalFilter = Object.fromEntries(filterData)
    
    fetch('https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered', {
        method: "POST",
        headers: {
            accept: "text/plain",
            "Content-Type": "application/Json"
        },
        body: JSON.stringify(finalFilter),
    })
    .then(data => data.json())
    .then(final => {
        roomcards.innerHTML = ""

        final.forEach(card => {
            roomcards.innerHTML += `<div class="room-card">
            <img src="${card.images[0].source}" alt="">
            <div class="cover-info">
                <p>${card.name}</p>
                <p class="price">€ ${card.pricePerNight}</p>
            </div>
            <button onclick="toDetails(${card.id})">Book Now</button>
        </div>`
        })

    })
    
})