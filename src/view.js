import {
    getFieldByCoordinates
} from "./utils"

export { drawField, drawHomeGardener, drawCarrots, drawGardener, moveGardener }

const field = document.querySelector("#field")

const drawElement = (position, className) => document.querySelector(getFieldByCoordinates(position)).classList.add(className)

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



