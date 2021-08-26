export const generateRandomCoordinate = () => {
    let randomCoordinate = []
    for (let i = 0; i < 2; i++) {
        randomCoordinate.push(Math.floor(Math.random() * 8))
    }
    return randomCoordinate
}

export const getFieldByCoordinates = (coordinate) => `[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`

export const checkIdenticalCoordinate = (data, arr) => {
    for ( let i = 0; i < arr.length; i++ ) {
        if (arr[i].posX === data[0]) {
            if (arr[i].posY === data[1]) {
                return arr[i]
            }
        }
    }
}
