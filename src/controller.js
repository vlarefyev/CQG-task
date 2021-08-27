import { changePositionGardener, startGame } from "./model"

startGame( 10 )

document.addEventListener("keydown", event => {
    changePositionGardener(event.code)
})