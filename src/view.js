import {
    getFieldByCoordinates
} from "./utils"

export { 
    drawField,
    clearField, 
    drawHomeGardener, 
    drawCarrots, 
    drawGardener, 
    moveGardener, 
    eraseCarrot, 
    drawTimerBar, 
    clearTimerBar, 
    dwawUserBar,
    updateUserBar,
}

const field = document.querySelector(".field")
const timerProgress = document.querySelector(".progress")
const userBar = document.querySelector(".user-bar")
let progress = 0
let idInterval

const drawTimerBar = (gameTime) => idInterval = setInterval(startTimerBar, gameTime * 10)

const startTimerBar = () => {
    if (progress >= 100) {
        progress = 0
        clearTimerBar()
    } else {
        progress++
        timerProgress.style.width = progress + "%"
    }
}

const clearTimerBar = () => {
    progress = 0
    clearInterval(idInterval)
}

const drawElement = (position, className) => document.querySelector(getFieldByCoordinates(position)).classList.add(className)

const dwawUserBar = ( userLevel ) => {
    const level = document.createElement("p")
    level.classList.add("level")
    level.textContent = `Уровень ${ userLevel }`
    userBar.appendChild(level)
}

const updateUserBar = ( userLevel ) => {
    const level = document.querySelector(".level")
    
    if ( userLevel > 0) {
    level.textContent = `Уровень ${ userLevel }`
    } else {
    level.textContent = "Не успел :) Чтобы начать игру заново вернись в дом."
    }
}

const drawField = (garden) => {
    let out = ''
    for (let i = 0; i < garden.length; i++) {
        let arr = garden[i]

        for (let k = 0; k < arr.length; k++) {
            out += `<div class="garden-block" data-x="${k}" data-y="${i}"></div>`
        }
    }
    field.innerHTML = out
}

const clearField = () => {
    document.querySelector(".home-gardener").classList.remove("home-gardener")
    field.removeChild( document.querySelector(".gardener") )
}

const drawHomeGardener = (home) => drawElement([home.posX, home.posY], "home-gardener")

const drawCarrots = (carrots) => carrots.forEach(elem => drawElement([elem.posX, elem.posY], "carrot"))

const drawGardener = () => {
    let checkPosField = field.getBoundingClientRect()
    let checkPosHome = document.querySelector(".home-gardener").getBoundingClientRect()

    let homeY = checkPosHome.top
    let homeX = checkPosHome.left

    let fieldY = checkPosField.top
    let fieldX = checkPosField.left

    let gardener = document.createElement("div")
    gardener.classList.add("gardener")
    gardener.style.top = Math.trunc(homeY - fieldY - 1) + "px"
    gardener.style.left = Math.trunc(homeX - fieldX - 1) + "px"
    field.appendChild(gardener)
}

const moveGardener = (position) => {
    const gardener = field.querySelector(".gardener")
    gardener.style.top = (position.posY * 80) + "px"
    gardener.style.left = (position.posX * 80) + "px"
}

const eraseCarrot = (position) => document.querySelector(getFieldByCoordinates(position)).classList.remove("carrot")