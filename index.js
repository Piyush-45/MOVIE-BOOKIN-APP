const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// const ticketPrice =  parseInt(movieSelect.value);  //**you can convert string into number either by using parseInt method or just by adding +prefix before  */
let ticketPrice =  +movieSelect.value

populateUI()

// ** save selected movie index and price
function setMovieData(moiveIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', moiveIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// **++ step-2: update total and count (

function updateSelectedCount(){
   
const selectedSeats = document.querySelectorAll(".row .seat.selected");

 // ** step:3 local storage

//  **=> copy selected seats into arr(using spread)
// ** =>  map through array
// ** => return a new array

const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    // console.log(seatsIndex)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))



    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    // console.log(selectedSeatsCount)
}

// ** step:4 GET DATA FORM localstorage and populate ui

function populateUI(){
    const selectedSeats =JSON.parse( localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }


    // console.log(selectedSeats)
}

// ** +++ STEP:3 MOVIE SELECT EVENT

movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value;
    // console.log(e.target.selectedIndex, e.target.value)
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

// **++ step:1 selecting the seats, adding event listners to toggle the selected class    (SEAT SELECT EVENT) ++**/

container.addEventListener('click', function(e){
    if(
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ){
        e.target.classList.toggle('selected')

        updateSelectedCount()

    }
   
});

// ** initial count and total set
updateSelectedCount();





// ** step:4 populate UI with movie data