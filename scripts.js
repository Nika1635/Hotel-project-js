let burgerbar = document.querySelector(".burgerbar")
let display = document.querySelector("nav")
let otherrooms = document.querySelector('.room-cards')


burgerbar.addEventListener("click", () => {
    display.classList.toggle("none");
    
})

function toDetails(id) {
    sessionStorage.setItem("roomId", id)
    window.location.href = "./details.html";
}

function toHome() {
    window.location.href = "./index.html";
}

function toRooms() {
  window.location.href = "./rooms.html";
}

function toHotels() {
    window.location.href = "./hotels.html";
}

function toBooks() {
    window.location.href = "./booked.html";
}


fetch("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll")
.then(roomListData => roomListData.json())
.then(roomList => {
    console.log(roomList);
    function other(id){
        otherrooms.innerHTML += `<div class="room-card">
                        <img src="${roomList[id].images[0].source }" alt="">
                        <div class="cover-info">
                            <p>${roomList[id].name}</p>
                            <p class="price">€${roomList[id].pricePerNight}</p>
                        </div>
                        <button onclick="toDetails(${roomList[id].id})">Book Now</button>
                    </div>`
    }
    other(0)
    other(1)
    other(2)
    other(3)
    other(4)
    other(5)
})
