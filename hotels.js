let burgerbar = document.querySelector(".burgerbar")
let display = document.querySelector("nav")
let hotelcards = document.querySelector(".hotel-cards")
let citytypes = document.getElementById("hoteltype-list")

function toHome() {
    window.location.href = "./index.html";
}

function toBooks() {
    window.location.href = "./booked.html";
}


function toRooms() {
    window.location.href = "./rooms.html";
}

function toHotels() {
    window.location.href = "./hotels.html";
}

function hotelIdSave(id){
    sessionStorage.setItem("hotelId", id)
    window.location.href = "./rooms.html";
}

burgerbar.addEventListener("click", () => {
    display.classList.toggle("none");
    
})


fetch("https://hotelbooking.stepprojects.ge/api/Hotels/GetCities")
.then(data => data.json())
.then(cities => {
    cities.forEach(element => {
        citytypes.innerHTML += `<button class="hoteltype">${element}</button>`
    })
})


fetch("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll")
.then(data => data.json())
.then(hotels => {
    console.log(hotels);

    hotels.forEach(element =>{
        hotelcards.innerHTML += `<div class="hotel-card">
                    <img src="${element.featuredImage}" alt="">
                    <div class="cover-info">
                        <p>${element.name}</p>
                    </div>
                    <button onclick="hotelIdSave(${element.id})">View Rooms</button>
                </div>`
    })
})
