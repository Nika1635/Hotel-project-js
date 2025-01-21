let burgerbar = document.querySelector(".burgerbar")
let display = document.querySelector("nav")
let table = document.querySelector("table")

function toBooks() {
    window.location.href = "./booked.html";
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

function hotelIdSave(id){
    sessionStorage.setItem("hotelId", id)
    window.location.href = "./rooms.html";
}

burgerbar.addEventListener("click", () => {
    display.classList.toggle("none");
    
})


function draw(){
    fetch("https://hotelbooking.stepprojects.ge/api/Booking")
    .then(data => data.json())
    .then(bookings => {
        table.innerHTML= ""
        table.innerHTML += `<tr class="head-table">
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>`
        bookings.forEach(element => {
            table.innerHTML += `<tr>
                        <td>
                            <p>Name: ${element.customerName}</p>
                            <p>Phone: ${element.customerPhone}</p>
                        </td>
                        <td>
                            <p>Booked</p>
                        </td>
                        <td>
                            <p>${element.checkInDate}</p>
                        </td>
                        <td>
                            <p>${element.checkOutDate}</p>
                        </td>
                        <td>                        
                            <p>${element.totalPrice}€</p>
                        </td>
                        <td>
                            <button onclick = "deleteBooking(${element.id})">Cancel Booking</button>
                        </td>
                    </tr>`

        })
    })
}

draw()


async function deleteBooking(idd) {
    try {
        let response = await fetch(`https://hotelbooking.stepprojects.ge/api/Booking/${idd}`, {
            method: "DELETE",
            headers: {
                accept: "*/*"
            }
        })

        if (!response.ok) {
            throw new Error("ჯავშანი ვერ წაიშალა")
        }

        let text = await response.text()
        console.log(text)
        alert("ჯავშანი წარმატებით წაიშალა")
        draw()
        console.log(response.ok)
    } catch (error) {
        console.error(error)
        alert("ჯავშანი ვერ წაიშალა")
    }
}
