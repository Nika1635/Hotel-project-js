let burgerbar = document.querySelector(".burgerbar")
let display = document.querySelector("nav")
let roomId = sessionStorage.getItem("roomId")
let roomPhotos = document.getElementById("roomPhotos")
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let photo = document.getElementById("photo")
let roomprice = document.getElementById("roomPrice")
let checkInDate = document.getElementById("checkInDate").value
let checkOutDate = document.getElementById("checkOutDate").value
let bookForm = document.getElementById("book")
let roomtotal = document.getElementById("roomTotal")
let tabs = document.querySelectorAll('.tab');
let tabContents = document.querySelectorAll('[data-tab-content]');
let otherrooms = document.querySelector('.room-cards')

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


burgerbar.addEventListener("click", () => {
    display.classList.toggle("none");
    
})

function toDetails(id) {
    sessionStorage.setItem("roomId", id)
    window.location.href = "./details.html";
  }


  fetch(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${roomId}`)
    .then((data) => data.json())
    .then((data) => {
        let id = 0
        let photos = []
        data.images.forEach((element) => photos.push(element.source))
        photo.src = photos[0]
        
        previous.addEventListener("click", function () {
            if (id === 0) {
                id = photos.length
            }
            id--
            photo.src = photos[id]
        })

        next.addEventListener("click", function () {
            id++
            if (id === photos.length) {
                id = 0
            }
            photo.src = photos[id]
        })

        roomprice.innerHTML = `<p class="roomname">${data.name}</p>
            <p class="price">€${data.pricePerNight} <span>a night</span></p>`

        setInterval(() => {
            let checkInDate = document.getElementById("checkInDate").value
            let checkOutDate = document.getElementById("checkOutDate").value

            if (checkInDate && checkOutDate) {
                let startTimestamp = new Date(checkInDate).getTime()
                let endTimestamp = new Date(checkOutDate).getTime()           
                let difference = endTimestamp - startTimestamp
                let differenceInDays = Math.round(difference / (1000 * 60 * 60 * 24))
                roomtotal.innerHTML = `<p class="roomname">Total Price:</p>
                    <p class="totalprice">€${differenceInDays * data.pricePerNight}</p>`

            }
        }, 1000)

        bookForm.addEventListener("submit", function (e) {
            e.preventDefault()

            let checkInDate = document.getElementById("checkInDate").value
            let checkOutDate = document.getElementById("checkOutDate").value

            let startTimestamp = new Date(checkInDate).getTime()
            let endTimestamp = new Date(checkOutDate).getTime()

            let difference = endTimestamp - startTimestamp
            let differenceInDays = Math.round(difference / (1000 * 60 * 60 * 24))

            let total = differenceInDays * data.pricePerNight
            roomtotal.innerHTML = `<p class="roomname">Total Price:</p>
                        <p class="totalprice">€${total}</p>`

            let formData = new FormData(bookForm)
            let finalBookData = Object.fromEntries(formData)

            finalBookData.roomId = roomId
            finalBookData.totalPrice = total

            fetch("https://hotelbooking.stepprojects.ge/api/Booking", {
                method: "POST",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalBookData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                
            })
            .then(data => {
                alert(`ოთახი წარმატებით დაიჯავშნა`)
            })
            .catch(error => {
                alert(`დაჯავშნა ვერ მოხერდა`)
            })
        })
    })


tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    let target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})



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
})
