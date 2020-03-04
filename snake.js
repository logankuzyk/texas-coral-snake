var request = {}

function possibleMoves (x, y) {
    possibilities = ['up', 'right', 'down', 'left']

    // Checks surround blocks to see if occupied by snake bodies.
    for (let snake in request.snakes) {
        for (let i = 0; i < request.snake.body.length; i++) {
            if (snake.body.x == x + 1) {
                let rem = possibilities.indexOf('right')
                if (rem >= 0) {
                    possibilities.splice(rem, 1)
                }
            }
            if (snake.body.x == x - 1) {
                let rem = possibilities.indexOf('left')
                if (rem >= 0) {
                    possibilities.splice(rem, 1)
                }
            }
            if (snake.body.y == y + 1) {
                let rem = possibilities.indexOf('up')
                if (rem >= 0) {
                    possibilities.splice(rem, 1)
                }
            }
            if (snake.body.y == y - 1) {
                let rem = possibilities.indexOf('down')
                if (rem >= 0) {
                    possibilities.splice(rem, 1)
                }
            }
        }
    }
    
    if (x == 0) {
        let rem = possibilities.indexOf('left')
        if (rem >= 0) {
            possibilities.splice(rem, 1)
        }
    } else if (x == request.board.width - 1) {
        let rem = possibilities.indexOf('right')
        if (rem >= 0) {
            possibilities.splice(rem, 1)
        }
    }

    if (y == 0) {
        let rem = possibilities.indexOf('down')
        if (rem >= 0) {
            possibilities.splice(rem, 1)
        }
    } else if (y == request.board.height - 1) {
        let rem = possibilities.indexOf('up')
        if (rem >= 0) {
            possibilities.splice(rem, 1)
        }
    }
    
    return possibilities
}

function decide () {
    let options = possibleMoves()
    let want = []

    for (let nug of request.board.food) {
        if (request.you.body[0].x < nug.x) {
            console.log('want to move right')
            if (want.indexOf('right') < 0) {
                want.push('right')
            }
        } else if (request.you.body[0].x > nug.x) {
            console.log('want to move left')
            if (want.indexOf('left') < 0) {
                want.push('left')
            }
        }

        if (request.you.body[0].y < nug.y) {
            if (want.indexOf('up') < 0) {
                want.push('up')
            }
        } else if (request.you.body[0].y > nug.y){
            if (want.indexOf('down') < 0) {
                want.push('down')
            }
        }
    }

    for (let dir of options) {
        if (want.indexOf(dir) >= 0) {
            return dir
        }
    }

    return 'up'
}

module.exports = function (apiRequest) {
    request = apiRequest
    let move = decide()
    return move
}