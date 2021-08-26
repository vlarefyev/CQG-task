import { changePositionGardener } from "./model"

document.addEventListener("keydown", event => {
    changePositionGardener(event.code)
})