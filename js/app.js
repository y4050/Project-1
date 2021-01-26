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
            document.querySelector("form").style.opacity = 0
        } else if (hungrinessCount >= 100) {
            console.log("game over")
            clearInterval(timer)
            document.querySelector("form").style.opacity = 0
        } else if (hungrinessCount >= 85) {
            document.getElementById("hungriness").style.color = "red"
            hungrinessCount ++
        } else if (hungrinessCount > 70) {
            document.getElementById("hungriness").style.color = "orange"
            hungrinessCount ++
        } else {
            document.getElementById("hungriness").style.color = "white"
            hungrinessCount ++
        }
        hungriness.innerText = "Hungriness: " + hungrinessCount
    }, 300)}

petHungriness()


// making 10s timer
let theTime = 10
const tenSec = (theButton) => {
    const timer = setInterval(() => {
        if (theTime > 0) {
            theTime--
            document.querySelector(theButton).classList.add("disabled")
            document.querySelector(theButton).style.opacity = .4
            document.querySelector(theButton).innerText = theTime
        } else {
            document.querySelector(theButton).classList.remove("disabled")
            document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            document.querySelector(theButton).style.opacity = 1
            theTime = 10
            clearInterval(timer)
        }
    }, 1000)
}

console.log(tenSec("#feed"))




// feed button
const feedPet = document.getElementById("feed").addEventListener("click", (event) => {
    event.preventDefault()
    //set timer for button cd
    if (hungrinessCount < 50) {
        hungrinessCount = 0
    } else {
        hungrinessCount-=50
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
    } else if (hungrinessCount < 70 && growthCount >= 90) {
        console.log("Pet evolved")
        // switch to second set of pet
        document.getElementById("thePet").src = "assets/123.gif"
        // reset growth
        evolved += 1
        growthCount = 0
    } else if (hungrinessCount < 70) {
        hungrinessCount += 20
        growthCount += 50
    } else {
        console.log("You can not train your pet when its hungriness is above 70")
    }
    growth.innerText = "Growth: " + growthCount
})


