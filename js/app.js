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

// set the variables' initial value
let time = 0
let evolved = 0
let gameover = false
let sleeping = false

// set the hungriness timer so it increase over time, and change font when reaching different values
const petHungriness = () => {
    const timer = setInterval(() => {
        if (sleeping == true) { 
            hungrinessCount += 0
        } else if (gameover == true) {
            clearInterval(timer)
            disableButtons()
        } else if (hungrinessCount >= 100) {
            console.log("game over")
            clearInterval(timer)
            disableButtons()
        } else if (hungrinessCount >= 85) {
            document.getElementById("hungriness").style.color = "red"
            hungrinessCount ++
        } else if (hungrinessCount >= 70) {
            document.getElementById("hungriness").style.color = "orange"
            hungrinessCount ++
        } else if (hungrinessCount >= 50) {
            document.getElementById("hungriness").style.color = "yellow"
            hungrinessCount ++
        } else if (hungrinessCount >= 30) {
            document.getElementById("hungriness").style.color = "white"
            hungrinessCount ++
        } else {
            document.getElementById("hungriness").style.color = "green"
            hungrinessCount ++
        }
        hungriness.innerText = "Hungriness: " + hungrinessCount
    }, 300)}

petHungriness()

// setTimer takes two required and an optional parameters
// theButton is for the button that it is using with, chooseTime for desired time duration, and sleepornot, type in "yes" for third parameter when using with sleep function
const setTimer = (theButton, chooseTime, sleepornot) => {
    let tempTime = chooseTime
    const timer = setInterval(() => {
        document.querySelector(theButton).classList.add("disabled")
        document.querySelector(theButton).style.opacity = .5
        // end of sleep timer
        if(sleepornot == "yes" && tempTime <= 0) {
            sleeping = false
            // hide sleeping pet 
            document.getElementById("theSleeping").style.opacity = 0
                // show the correct pet (if evolved)
                if (evolved == 1) {
                    document.getElementById("theSecondPet").style.opacity = 1
                } else {
                    document.getElementById("thePet").style.opacity = 1
                }
            resetButtons()
            clearInterval(timer)
            document.querySelector(theButton).classList.remove("disabled")
            document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            document.querySelector(theButton).style.opacity = 1
        // start of sleeping
        } else if (sleepornot == "yes" && tempTime > 0) {
            // hide the current pet
            document.getElementById("theSecondPet").style.opacity = 0
            document.getElementById("thePet").style.opacity = 0
            // switch to sleeping pet
            document.getElementById("theSleeping").style.opacity = 1
            document.querySelector(theButton).innerText = tempTime
            tempTime -= 1
            disableButtons()
            document.querySelector("form").style.opacity = .5
            sleeping = true
        // start of buttons
        } else if (tempTime > 0) {
            document.querySelector(theButton).innerText = tempTime
            tempTime -= 1
        // end of buttons
        } else {
            clearInterval(timer)
            document.querySelector(theButton).classList.remove("disabled")
            document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            document.querySelector(theButton).style.opacity = 1
        }
    }, 800)
}


// Feed button
// if the hungriness is less than feed amount, set to 0, otherwise decrease hungriness by set value
const feedPet = document.getElementById("feed").addEventListener("click", (event) => {
    event.preventDefault()
    //set timer for button cd
    if (hungrinessCount < 30) {
        hungrinessCount = 0
        setTimer("#feed", 5)
    } else {
        hungrinessCount-=30
        setTimer("#feed", 5)
    }
})


// Train pet button
// It will not be availble if hungriness is over a certain amount, else increase growth valuse & hungriness with train
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
        document.getElementById("theSecondPet").style.trasition = 1
        document.getElementById("theSecondPet").style.opacity = 1
        // hide the first pet
        document.getElementById("thePet").style.opacity = 0
        // reset growth
        evolved += 1
        growthCount = 0
        document.getElementById("growth").style.color = "white"
        setTimer("#train", 5)
    } else if (hungrinessCount < 70) {
        hungrinessCount += 20
        growthCount += 10
            if (growthCount >= 80) {
                document.getElementById("growth").style.color = "blue"
            } else if (growthCount >= 50) {
                document.getElementById("growth").style.color = "green"
            } else if (growthCount >= 30) {
                document.getElementById("growth").style.color = "yellow"
            } else {
                document.getElementById("growth").style.color = "white"
            }
        setTimer("#train", 5)
    } else {
        console.log("You can not train your pet when its hungriness is above 70")
    }
    growth.innerText = "Growth: " + growthCount
})

const letSleep = document.getElementById("sleep").addEventListener("click", (event) => {
    event.preventDefault()
    setTimer("#sleep", 5, "yes")
})


// make all button disabled
const disableButtons = () => {
    document.querySelector("form").style.opacity = .2
    document.querySelector("#feed").classList.add("disabled")
    document.querySelector("#train").classList.add("disabled")
    document.querySelector("#sleep").classList.add("disabled")
}

// opposite of disableButtons function
const resetButtons = () => {
    document.querySelector("form").style.opacity = 1
    document.querySelector("#feed").classList.remove("disabled")
    document.querySelector("#train").classList.remove("disabled")
}