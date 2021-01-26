// Create the structure for the HTML

// Create container for the status

// create container for pet display

// create container, form, for user to click on buttons for Feed and Train buttons

// set the initial value for Growth and Hungriness status

// write the methods for buttons
// when Feed button is clicked: Hungriness should go down by 50%, max should be 100%. It should increase over time. When it reaches 100%, pet dies and log gameover. When Hungriness is higher than 80%, turn the Hungriness to diplay red font. Feed should have a cooldown so it can only be pressed after set duration.

// when Train button is clicked: Growth goes up by 10% and Hungriness increase by 50%, when it reaches 100% it evolves, the Growth should be reset to 0 and Hungriness back to default.

// set background img

// set pet img

// figure out a way to move the pet through the array, maybe with setInverval, and the location of the pet img is depended on the time value. *** use css animation/transition

let growthCount = 0
const growth = document.querySelector("#growth")
growth.innerText = "Growth: " + growthCount

let hungrinessCount = 0
const hungriness = document.querySelector("#hungriness")
hungriness.innerText = "Hungriness: " + hungrinessCount

let time = 0
let evolved = 0
let gameover = false
// const setTimer = () => {
//     const timer = setInterval(() => {
//       time++; 
//       console.log(time)
//     }, 1000)
//   }

//   setTimer()

const petHungriness = () => {
    const timer = setInterval(() => {
        if (gameover == true) {
            clearInterval(timer)
            disableButtons()
        } else if (hungrinessCount >= 100) {
            console.log("game over")
            clearInterval(timer)
            disableButtons()
        } else if (hungrinessCount >= 85) {
            document.getElementById("hungriness").style.color = "red"
            hungrinessCount ++
        } else if (hungrinessCount > 70) {
            document.getElementById("hungriness").style.color = "orange"
            hungrinessCount ++
        } else if (hungrinessCount > 50) {
            document.getElementById("hungriness").style.color = "yellow"
            hungrinessCount ++
        } else {
            document.getElementById("hungriness").style.color = "white"
            hungrinessCount ++
        }
        hungriness.innerText = "Hungriness: " + hungrinessCount
    }, 300)}

petHungriness()


// // making 10s timer
// let timeTen = 10
// // parameter for the button to implement the timer
// const tenSec = (theButton) => {
//     const timer = setInterval(() => {
//         if (timeTen > 0) {
//             timeTen--
//             document.querySelector(theButton).classList.add("disabled")
//             document.querySelector(theButton).style.opacity = .4
//             document.querySelector(theButton).innerText = timeTen
//         } else {
//             document.querySelector(theButton).classList.remove("disabled")
//             document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
//             document.querySelector(theButton).style.opacity = 1
//             timeTen = 10
//             clearInterval(timer)
//         }
//     }, 800)
// }


// making 10s timer
// parameter for the button to implement the timer, and the desired time duration
const setTimer = (theButton, chooseTime) => {
    let tempTime = chooseTime
    const timer = setInterval(() => {
        document.querySelector(theButton).classList.add("disabled")
        document.querySelector(theButton).style.opacity = .5
        if (tempTime > 0) {
            document.querySelector(theButton).innerText = tempTime
            tempTime -= 1
        } else {
            clearInterval(timer)
            document.querySelector(theButton).classList.remove("disabled")
            document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            document.querySelector(theButton).style.opacity = 1
        }
    }, 800)
}

// feed button
const feedPet = document.getElementById("feed").addEventListener("click", (event) => {
    event.preventDefault()
    //set timer for button cd
    if (hungrinessCount < 30) {
        hungrinessCount = 0
        setTimer("#feed", 10)
    } else {
        hungrinessCount-=30
        setTimer("#feed", 10)
    }
})


// Train pet button
const trainPet = document.getElementById("train").addEventListener("click", (event) => {
    event.preventDefault()
    if (hungrinessCount < 70 && growthCount >= 90 && evolved == 1) {
        console.log("You won!")
        hungrinessCount = 0
        growthCount = 0
        gameover = true
        disableButtons()
    } else if (hungrinessCount < 70 && growthCount >= 90) {
        console.log("Pet evolved")
        // switch to second set of pet
        document.getElementById("thePet").src = "assets/123.gif"
        // reset growth
        evolved += 1
        growthCount = 0
        setTimer("#train", 15)
    } else if (hungrinessCount < 70) {
        hungrinessCount += 20
        growthCount += 50
        setTimer("#train", 15)
    } else {
        console.log("You can not train your pet when its hungriness is above 70")
    }
    growth.innerText = "Growth: " + growthCount
})


const disableButtons = () => {
    document.querySelector("form").style.opacity = .1
    document.querySelector("#feed").classList.add("disabled")
    document.querySelector("#train").classList.add("disabled")
    document.querySelector("#sleep").classList.add("disabled")
    document.querySelector("#ff").classList.add("disabled")
}