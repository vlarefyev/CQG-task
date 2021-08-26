import { changePositionGardener, startGame, startLavel } from "./model"

startLavel()

document.addEventListener("keydown", event => {
    changePositionGardener(event.code)
})