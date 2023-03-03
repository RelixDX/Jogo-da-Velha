// Theme

let tema = document.querySelector('.light')
let button = document.querySelector('.theme')

button.addEventListener('click', () => {
    if(tema.classList.contains('light')) {
        tema.classList.replace('light', 'dark')
    } else {
        tema.classList.replace('dark', 'light')
    }
})

// Jogo da Velha

// initial datas

let turn = document.querySelector('.turn')
let win = document.querySelector('.winner')
let reset = document.querySelector('.reset')

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}
let player = ''
let warning = ''
let playing = false

// Events

reset.addEventListener('click', resetFunc)
document.querySelectorAll('.box').forEach(item => {
    item.addEventListener('click', onClick)
})
// Functions

function onClick(event) {
    let item = event.target.getAttribute('data-key')
    if(playing && square[item] === '') {
        square[item] = player
        renderSquare()
        togglePlayer()
    }
}
function resetFunc() {
    warning = ''

    let random = Math.floor(Math.random() * 2)
    player = (random === 0) ? 'X' : 'O'

    for(let i in square) {
        square[i] = ''
    }

    playing = true

    renderSquare()
    renderInfo()
}
function togglePlayer() {
    player = (player === 'X') ? 'O' : 'X'
    renderInfo()
}
function renderSquare() {
    for(let i in square) {
        let item = document.querySelector(`div[data-key=${i}]`)
        item.innerHTML = square[i]
    }

    checkGame()
}
function renderInfo() {
    turn.innerHTML = `<span>VEZ DE:</span> ${player}`
    win.innerHTML = warning
}
function checkGame() {
    if(checkWinnerFor('X')) {
        warning = `O "X" venceu!`
        playing = false
    } else if(checkWinnerFor('O')) {
        warning = `O "O" venceu!`
        playing = false
    } else if(isFull()) {
        warning = 'Deu Empate!'
        playing = false
    }
}
function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in pos) {
        let pArray = pos[w].split(',')
        let hesWon = pArray.every(option => square[option] === player)
        if(hesWon) {
            return true
        }
    }

    return false
}
function isFull() {
    for(let i in square) {
        if(square[i] === '') {
            return false
        }
    }

    return true
}

resetFunc()