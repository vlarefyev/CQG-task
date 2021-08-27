import {
    drawField,
    drawHomeGardener,
    drawCarrots,
    drawGardener,
    moveGardener,
    eraseCarrot,
    drawTimerBar,
    clearTimerBar,
    dwawUserBar,
    clearField,
    updateUserBar
} from "./view"
import {
    generateRandomCoordinate,
    checkIdenticalCoordinate
} from "./utils"

const garden = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

const collection = {
    gameTime: 0,
    home: {},
    carrot: {
        quantity: 10,
        allCarrots: []
    },
    gardener: {
        level: 1,
        position: {}
    }
}

let timeoutId

export const startGame = (gameTime) => {
    collection.gameTime = gameTime
    drawField(garden)
    dwawUserBar(collection.gardener.level)
    startLevel()
}

const startLevel = () => {
    createHomeGardener()
    createCarrot(collection.carrot.quantity)
    createGardener()
    createTimer()
}

const createTimer = () => {
    drawTimerBar(collection.gameTime)
    timeoutId = setTimeout(gameOwer, collection.gameTime * 1000)
}

const stopTimer = () => {
    clearTimerBar()
    clearTimeout(timeoutId)
}

const createHomeGardener = () => {
    const coordinate = generateRandomCoordinate()
    collection.home = {
        posX: coordinate[0],
        posY: coordinate[1]
    }
    drawHomeGardener(collection.home)
}

const createCarrot = (quantity) => {
    collection.carrot.quantity = quantity
    for (let i = 0; i < quantity; i++) {
        let coordinate = generateRandomCoordinate()
        if (coordinate[0] === collection.home.posX && coordinate[1] === collection.home.posY) {
            i--
            continue
        } else if (checkIdenticalCoordinate(coordinate, collection.carrot.allCarrots)) {
            i--
            continue
        } else {
            collection.carrot.allCarrots.push({
                posX: coordinate[0],
                posY: coordinate[1]
            })

        }
    }
    drawCarrots(collection.carrot.allCarrots)
}

const createGardener = () => {
    Object.assign(collection.gardener.position, collection.home)
    drawGardener()
}

export const changePositionGardener = (keycode) => {
    if (keycode === "ArrowUp") {
        if (collection.gardener.position.posY > 0) {
            collection.gardener.position.posY--
        }
    } else if (keycode === "ArrowDown") {
        if (collection.gardener.position.posY < 7) {
            collection.gardener.position.posY++
        }
    } else if (keycode === "ArrowLeft") {
        if (collection.gardener.position.posX > 0) {
            collection.gardener.position.posX--
        }
    } else if (keycode === "ArrowRight") {
        if (collection.gardener.position.posX < 7) {
            collection.gardener.position.posX++
        }
    }
    moveGardener(collection.gardener.position)
    raiseCarrot(collection.gardener.position, collection.carrot.allCarrots)
    if (collection.carrot.allCarrots.length === 0 || collection.gardener.level === 0) {
        movingNextRound(collection.home, collection.gardener.position)
    }
}

export const raiseCarrot = (gardenerPos, carrotsPos) => {
    const idCarrot = carrotsPos.indexOf(checkIdenticalCoordinate([gardenerPos.posX, gardenerPos.posY], carrotsPos))
    if (idCarrot > -1) {
        eraseCarrot([carrotsPos[idCarrot].posX, carrotsPos[idCarrot].posY])
        carrotsPos.splice(idCarrot, 1)
    }
}

const movingNextRound = (home, gardener) => {
    if (home.posX === gardener.posX && home.posY === gardener.posY) {
        collection.gardener.level++
        collection.carrot.allCarrots = []
        stopTimer()
        clearField()
        updateUserBar(collection.gardener.level)
        startLevel()
    }
}

const gameOwer = () => {
    collection.gardener.level = 0
    updateUserBar(collection.gardener.level)
}