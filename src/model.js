import { drawField, drawHomeGardener, drawCarrots, drawGardener, moveGardener, eraseCarrot } from "./view"
import { generateRandomCoordinate, checkIdenticalCoordinate } from "./utils"

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
    home: {},
    carrot: {
        quantity: 0,
        allCarrots: []
    },
    gardener: {
        point: 0,
        position: []
    }
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
    for (let key in collection.home) {
        collection.gardener.position[key] = collection.home[key];
    }
    drawGardener()
}

drawField(garden)
createHomeGardener()
createCarrot(10)
createGardener()

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
    moveGardener( collection.gardener.position )
    raiseCarrot( collection.gardener.position, collection.carrot.allCarrots )
}

export const raiseCarrot = ( gardenerPos, carrotsPos) => {
    const idCarrot = carrotsPos.indexOf(checkIdenticalCoordinate([gardenerPos.posX, gardenerPos.posY], carrotsPos)) 
    if ( idCarrot > -1 ) {
        eraseCarrot([carrotsPos[idCarrot].posX, carrotsPos[idCarrot].posY])
        carrotsPos.splice( idCarrot, 1)
        console.log( carrotsPos.length );
    } 
}