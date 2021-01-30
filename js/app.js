// Set up the game variables 
let growthCount = 0
let hungerCount = 0
let time = 0
let evolved = 0
let gameover = false
let sleeping = false
const growth = document.querySelector("#growth")
const hunger = document.getElementById("hunger")
const sMessage = document.getElementById("someMessage")
const mainMessage = document.getElementById("mainMessage")
const form = document.querySelector("form")
const thePet = document.getElementById("thePet")
const action = document.getElementById("action")
const growthBar = document.getElementById("growthBar")
const hungerBar = document.getElementById("hungerBar")
const trainButton = document.getElementById("train")

const checking = () => {
    const timer = setInterval (() => {
        if (gameover !== true){
            if (hungerCount < 0) {
                hungerCount = 0
            } else if (growthCount > 100) {
                growthCount = 100
            }
    }
    }, 100)
}
// Making action img random
const randImg = (numbOfImg) => {
    let randNumber = Math.floor((Math.random()* numbOfImg) + 1)
    return randNumber
    // if (whichToChange == "train"){
    //     thePet.src = "training" + whichImg + ".gif"
    // } else if (whichToChange == "feed") {
    //     thePet.src = "eating" + whichImg + ".gif"
    // }
}

// switching img L & R
// let compare = thePet.src.split("/").pop()
const switchImg = () => {
    const timer = setInterval(() => {
        if (gameover == true) {
            thePet.style.opacity = 0
        } else if (thePet.src.split("/").pop() == "1l.gif") { // 1st pet
            thePet.src = "assets/1r.gif"
        } else if (thePet.src.split("/").pop() == "1r.gif") {
            thePet.src = "assets/1l.gif"
        } else if (thePet.src.split("/").pop() == "1_2l.gif") {
            thePet.src = "assets/1_2r.gif"
        } else if (thePet.src.split("/").pop() == "1_2r.gif") {
            thePet.src = "assets/1_2l.gif"
        } else if (thePet.src.split("/").pop() == "2l.gif") { // 2nd pet
            thePet.src = "assets/2r.gif"
        } else if (thePet.src.split("/").pop() == "2r.gif") {
            thePet.src = "assets/2l.gif"
        } else if (thePet.src.split("/").pop() == "2_2l.gif") {
            thePet.src = "assets/2_2r.gif"
        } else if (thePet.src.split("/").pop() == "2_2r.gif") {
            thePet.src = "assets/2_2l.gif"
        } else if (thePet.src.split("/").pop() == "3l.gif") { // 3rd pet
            thePet.src = "assets/3r.gif"
        } else if (thePet.src.split("/").pop() == "3r.gif") {
            thePet.src = "assets/3l.gif"
        } else if (thePet.src.split("/").pop() == "3_2l.gif") {
            thePet.src = "assets/3_2r.gif"
        } else if (thePet.src.split("/").pop() == "3_2r.gif") {
            thePet.src = "assets/3_2l.gif"
        } 
    }, 5000)
}

// set the hungriness timer so it increase over time, and change font when reaching different values
const petHungriness = () => {
    const timer = setInterval(() => {
        if (sleeping == true) { 
            hungerCount += 0
        } else if (gameover == true) {
            clearInterval(timer)
            disableButtons()
        } else if (hungerCount >= 100) {
            mainMessage.innerText = "GAME OVER"
            mainMessage.style.opacity = 1
            sMessage.innerText = "Reached Max Hunger"
            sMessage.style.color = "red"
            sMessage.style.opacity = 1
            thePet.style.opacity = 0
            console.log("game over")
            clearInterval(timer)
            form.classList.add("grayOut")
            disableButtons()
        } else if (hungerCount >= 85) {
            hunger.style.color = "red"
            hungerBar.style.backgroundColor = "red"
            hungerCount ++
            sMessage.innerText = "Pet is starving"
            sMessage.style.color = "red"
            sMessage.style.opacity = 1
        } else if (hungerCount >= 70) {
            hunger.style.color = "orange"
            hungerBar.style.backgroundColor = "orange"
            sMessage.style.color = "yellow"
            hungerCount ++
        } else if (hungerCount >= 50) {
            hunger.style.color = "yellow"
            hungerBar.style.backgroundColor = "yellow"
            sMessage.style.color = "yellow"
            hungerCount ++
        } else if (hungerCount >= 30) {
            hunger.style.color = "white"
            hungerBar.style.backgroundColor = "white"
            sMessage.style.color = "yellow"
            hungerCount ++
        } else {
            hunger.style.color = "green"
            hungerBar.style.backgroundColor = "green"
            sMessage.style.color = "yellow"
            hungerCount ++
        }
        hunger.innerText = "Hunger: " + hungerCount+"%"
        hungerBar.style.width = hungerCount+ "%"
    }, 500)}

// setTimer takes two required and an optional parameters
// theButton is for the button that it is using with, chooseTime for desired time duration, and sleepornot, type in "yes" for third parameter when using with sleep function
// add method so Train turns to evolve/ascend when reaching 100
const setTimer = (theButton, chooseTime, sleepornot) => {
    let tempTime = chooseTime
    const timer = setInterval(() => {
        document.querySelector(theButton).classList.add("disabled")

        // end of sleep timer
        if(sleepornot == "yes" && tempTime <= 0) {
            sleeping = false
            // hide sleeping pet 
            thePet.style.opacity = 1
            action.style.opacity = 0
            form.classList.remove("grayOut")
            resetButtons()
            clearInterval(timer)
            document.querySelector(theButton).classList.remove("disabled")
            document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            sMessage.style.opacity = 0
            document.getElementById("paused").style.opacity = 0
        // start of sleeping
        } else if (sleepornot == "yes" && tempTime > 0) {
            // hide the current pet
            thePet.style.opacity = 0
            action.src = "assets/sleeping.gif"
            action.style.opacity = 1
            form.classList.add("grayOut")
            document.getElementById("sleep").style.opacity = 1
            // switch to sleeping pet
            document.querySelector(theButton).innerText = tempTime
            tempTime -= 1
            disableButtons()
            document.getElementById("paused").style.opacity = 1
            sMessage.style.opacity = 1
            sMessage.innerText = "Hunger meter paused"
            sleeping = true
        // start of buttons
        } else if (tempTime > 0) {
            document.querySelector(theButton).innerText = tempTime
            tempTime -= 1
        // end of buttons
        } else {
            clearInterval(timer)
            if (theButton == "#train" && growthCount == 100 && evolved == 0) {
                // change button text and color when it reach 100
                trainButton.innerText = "EVOLVE"
                trainButton.style.backgroundColor = "yellow"
                trainButton.style.color = "black"
                trainButton.style.fontWeight = "bold"
            } else if(theButton == "#train" && growthCount == 100 && evolved == 1) {
                trainButton.innerText = "ASCEND"
                trainButton.style.backgroundColor = "orange"
                trainButton.style.color = "black"
                trainButton.style.fontWeight = "bold"
            } else {
                document.querySelector(theButton).style.color = "white"
                document.querySelector(theButton).style.backgroundColor = "rgb(125, 125, 196)"
                document.querySelector(theButton).style.fontWeight = "normal"
                document.querySelector(theButton).innerText = theButton.substring(1).toUpperCase()
            }
            document.querySelector(theButton).classList.remove("disabled")
        }
    }, 1000)
}

// Feed button
// if the hungriness is less than feed amount, set to 0, otherwise decrease hungriness by set value
const feedPet = document.getElementById("feed").addEventListener("click", (event) => {
    event.preventDefault()
    //set timer for button cd
    randFeed = Math.floor((Math.random()*100)/2)
    hungerCount -= randFeed
    // if ((hungerCount -= randFeed) <= 0) {
    //     hungerCount = 0
    // } else {
    //     hungerCount -= randFeed
    // }
    imgTimer(3, "eating")
    setTimer("#feed", 5)
    // if (hungerCount < 30) {
    //     hungerCount = 0
    //     setTimer("#feed", 5)
    //     imgTimer(3, "eating")
    // } else {
    //     hungerCount-=30
    //     setTimer("#feed", 5)
    //     imgTimer(3, "eating")
    // }
})

// for the random growth to add in train button and log in ImgTimer
let randGrowth = 0
let randFeed = 0
let randTrainCost = 0
// Train pet button
// It will not be availble if hungriness is over a certain amount, else increase growth valuse & hungriness with train
const trainPet = document.getElementById("train").addEventListener("click", (event) => {
    event.preventDefault()
    if (hungerCount < 70 && growthCount >= 100 && evolved == 1) {
        console.log("You won!")
        mainMessage.innerText = "You Won!"
        mainMessage.style.opacity = 1
        hungerCount = 0
        growthCount = 0
        gameover = true
        thePet.style.opacity = 0
        disableButtons()
        action.src = "assets/ending.gif"
        action.style.opacity = 1
        document.getElementById("restart").style.opacity = 1
    } else if (hungerCount < 70 && growthCount >= 100) {
// problem: switch img to fast evolve img not showing on time
        thePet.style.opacity = 0
        imgTimer(2, "evolving")
        // swtich img to second
        if (thePet.src.split("/").pop() == "1l.gif") { // 1st pet
            thePet.src = "assets/1_2l.gif"
        } else if (thePet.src.split("/").pop() == "1r.gif") {
            thePet.src = "assets/1_2r.gif"
        } else if (thePet.src.split("/").pop() == "2l.gif") { // 2nd pet
            thePet.src = "assets/2_2l.gif"
        } else if (thePet.src.split("/").pop() == "2r.gif") {
            thePet.src = "assets/2_2r.gif"
        } else if (thePet.src.split("/").pop() == "3l.gif") { // 3rd pet
            thePet.src = "assets/3_2l.gif"
        } else if (thePet.src.split("/").pop() == "3r.gif") {
            thePet.src = "assets/3_2r.gif"
        }
        // reset growth
        document.getElementById("maxed").style.opacity = 0
        evolved += 1
        growthCount = 0
        document.getElementById("growth").style.color = "white"
        setTimer("#train", 5)
    } else if (hungerCount < 70) {
        // added random element with JC's advice
        randGrowth = Math.floor((Math.random()*100)/2)
        randTrainCost = Math.floor((Math.random()*100)/2)
        hungerCount += randTrainCost
        growthCount += randGrowth
        // if ((growthCount += randGrowth) > 100) {
        //     growthCount = 100
        // } else{
        //     growthCount += randGrowth
        // }
            if (growthCount >= 100) {
                document.getElementById("growth").style.color = "blue"
                growthBar.style.backgroundColor = "blue"
                document.getElementById("maxed").style.opacity = 1
            } else if (growthCount >= 50) {
                document.getElementById("growth").style.color = "green"
                growthBar.style.backgroundColor = "green"
            } else if (growthCount >= 30) {
                document.getElementById("growth").style.color = "yellow"
                growthBar.style.backgroundColor = "yellow"
            } else {
                document.getElementById("growth").style.color = "white"
                growthBar.style.backgroundColor = "white"
                document.getElementById("maxed").style.opacity = 0
            }
        setTimer("#train", 5)
        imgTimer(3, "training")
    } else {
        if (gameover !== true) {
        alert("Cannot Train when hunger is above 70")
        }
        
    }
    growth.innerText = "Growth: " + growthCount + "%"
    growthBar.style.width = growthCount + "%"
    
})

const letSleep = document.getElementById("sleep").addEventListener("click", (event) => {
    event.preventDefault()
    setTimer("#sleep", 5, "yes")
})

// make all button disabled
const disableButtons = () => {
    document.querySelector("#feed").classList.add("disabled")
    document.querySelector("#train").classList.add("disabled")
    document.querySelector("#sleep").classList.add("disabled")
    document.querySelector("#feed").classList.add("grayOut")
    document.querySelector("#train").classList.add("grayOut")
    document.querySelector("#sleep").classList.add("grayOut")
    document.getElementById("selection-text").classList.add("grayOut")
}

// opposite of disableButtons function
const resetButtons = () => {
    document.querySelector("#feed").classList.remove("disabled")
    document.querySelector("#train").classList.remove("disabled")
    document.querySelector("#sleep").classList.remove("disabled")
    document.querySelector("#feed").classList.remove("grayOut")
    document.querySelector("#train").classList.remove("grayOut")
    document.querySelector("#sleep").classList.remove("grayOut")
    document.getElementById("selection-text").classList.remove("grayOut")
}

const imgTimer = (time, theAction) => {
    let tempTime = time
    const timer = setInterval(() => {
        if (tempTime > 0 && action.style.opacity == 1) {
        } else if (sleeping == true) {
        } else if (tempTime > 0) {     
            action.src = "assets/" + theAction + randImg(3) + ".gif"
            thePet.style.opacity = 0
            action.style.opacity = 1
            if (theAction == "eating") {
                sMessage.innerText = "Hunger - " + randFeed + "%"
                sMessage.style.opacity = 1
            } else if (theAction == "training") {
                sMessage.innerText = "Growth + " + randGrowth + "% & Hunger + " + randTrainCost + "%"
                sMessage.style.opacity = 1
            }
        } else {
            clearInterval(timer)
            action.style.opacity = 0
            sMessage.style.opacity = 0
            thePet.style.opacity = 1
        }
        tempTime--
}, 1000)}


// Starting
const modal = document.getElementById("modal")
// const confirm = document.getElementById("start")
modal.style.display = "block"
form.style.display = "none"
thePet.style.opacity = 0
switchImg();

// const firstPet = document.getElementById("first")
// const secondPet = document.getElementById("second")
// const thirdPet = document.getElementById("third")

// firstPet.addEventListener("click", function() {
//   modal.style.display = "none"
//   thePet.style.opacity = 1
//   form.style.display = "flex"
//   petHungriness();
// })

// secondPet.addEventListener("click", function() {
//     if (thePet.src.split("/").pop() == "1r.gif") {
//         thePet.src = "assets/2r.gif"
//     } else if (thePet.src.split("/").pop() == "1l.gif") {
//         thePet.src = "assets/2l.gif"
//     }
//     modal.style.display = "none";
//     thePet.style.opacity = 1
//     form.style.display = "flex"
//     petHungriness();
// })

// thirdPet.addEventListener("click", function() {
//     if (thePet.src.split("/").pop() == "1r.gif") {
//         thePet.src = "assets/3r.gif"
//     } else if (thePet.src.split("/").pop() == "1l.gif") {
//         thePet.src = "assets/3l.gif"
//     }
//     modal.style.display = "none";
//     thePet.style.opacity = 1
//     form.style.display = "flex"
//     petHungriness();
// })

const preview = document.getElementById("preview")
const petSelection = document.getElementById("petSelection")
petSelection.addEventListener("mouseover", function(e) {
    if (e.target.innerText == "#1") {
        preview.src = "assets/1r.gif"
        preview.style.opacity = 1
    } else if (e.target.innerText == "#2") {
        preview.src = "assets/2r.gif"
        preview.style.opacity = 1
    } else if (e.target.innerText == "#3") {
        preview.src = "assets/3r.gif"
        preview.style.opacity = 1
    }
})


petSelection.addEventListener("click", function(e) {
    if (e.target.innerText == "#1") {

    } else if (e.target.innerText == "#2") {
        if (thePet.src.split("/").pop() == "1r.gif") {
            thePet.src = "assets/2r.gif"
        } else if (thePet.src.split("/").pop() == "1l.gif") {
            thePet.src = "assets/2l.gif"
        }
    } else if (e.target.innerText == "#3") {
        if (thePet.src.split("/").pop() == "1r.gif") {
            thePet.src = "assets/3r.gif"
        } else if (thePet.src.split("/").pop() == "1l.gif") {
            thePet.src = "assets/3l.gif"
        }
    }
    modal.style.display = "none"
    thePet.style.opacity = 1
    form.style.display = "flex"
    petHungriness()
    checking()
})
