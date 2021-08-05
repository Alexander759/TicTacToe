// JavaScript source code
const btnContainers = document.querySelectorAll(".container")
const paragraphEnd = document.getElementById("report-end")
const newGameBtn = document.getElementById("new-game-with-friend")
const easyGameBtn = document.getElementById("easy")
const mediumCameBtn = document.getElementById("medioum")


let clickBtnContainer = null
let someoneWin = null
let tie = null

let xIsOnTurn = true
let thereIsNoWinner = true
let count = 0

newGameBtn.addEventListener("click", function () {

    clickBtnContainer = function (e) {
        if (xIsOnTurn) {
            e.currentTarget.textContent = "X"
            xIsOnTurn = false
        } else {
            e.currentTarget.textContent = "O"
            xIsOnTurn = true
        }

        e.currentTarget.removeEventListener("click", clickBtnContainer)
        checkIfSomeoneWinOrTie()
    }

    someoneWin = function (btns) {
        btns.forEach(function (item) {
            item.style.background = "lightgreen"
        })

        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })

        paragraphEnd.textContent = `Играч ${btns[0].textContent} печели!!!`
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
    }

    prepareForNewGame()
})

easyGameBtn.addEventListener("click", function () {
    

    clickBtnContainer = function (e) {
        e.currentTarget.textContent = "X"
        count++
        e.currentTarget.removeEventListener("click", clickBtnContainer)
        checkIfSomeoneWinOrTie()

        if (thereIsNoWinner && count <= 8) {
            let num = Math.floor(Math.random() * btnContainers.length)

            while (btnContainers[num].textContent !== "") {
                num = Math.floor(Math.random() * btnContainers.length)
            }

            console.log(num)
            btnContainers[num].textContent = "O"
            btnContainers[num].removeEventListener("click", clickBtnContainer)
            count++
            checkIfSomeoneWinOrTie()
        }
    }

    someoneWin = function (btns) {
        thereIsNoWinner = false

        btns.forEach(function (item) {
            item.style.background = "lightgreen"
        })

        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })

        if (btns[0].textContent === "X") {
            paragraphEnd.textContent = `Играчът печели!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
    }

    prepareForNewGame()
})


function prepareForNewGame() {
    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
        item.addEventListener("click", clickBtnContainer)
        item.style.background = "rgba(0, 255, 255, 0.5)"
        xIsOnTurn = true;
        item.textContent = ""
    })

    paragraphEnd.textContent = ""
    thereIsNoWinner = true
    count = 0
    xIsOnTurn = true
}

let checkIfSomeoneWinOrTie = function () {
    let thereIsNoWinner = true

    if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[1].textContent && btnContainers[1].textContent === btnContainers[2].textContent) {
        someoneWin([btnContainers[0], btnContainers[1], btnContainers[2]])
        thereIsNoWinner = false
    } else if (btnContainers[3].textContent && btnContainers[3].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[5].textContent) {
        someoneWin([btnContainers[3], btnContainers[4], btnContainers[5]])
        thereIsNoWinner = false
    } else if (btnContainers[6].textContent && btnContainers[6].textContent === btnContainers[7].textContent && btnContainers[7].textContent === btnContainers[8].textContent) {
        someoneWin([btnContainers[6], btnContainers[7], btnContainers[8]])
        thereIsNoWinner = false
    } else if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[3].textContent && btnContainers[3].textContent === btnContainers[6].textContent) {
        someoneWin([btnContainers[0], btnContainers[3], btnContainers[6]])
        thereIsNoWinner = false
    } else if (btnContainers[1].textContent && btnContainers[1].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[7].textContent) {
        someoneWin([btnContainers[1], btnContainers[4], btnContainers[7]])
        thereIsNoWinner = false
    } else if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[5].textContent && btnContainers[5].textContent === btnContainers[8].textContent) {
        someoneWin([btnContainers[2], btnContainers[5], btnContainers[8]])
        thereIsNoWinner = false
    } else if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[4].textContent && btnContainers[0].textContent === btnContainers[8].textContent) {
        if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[6].textContent) {
            someoneWin([btnContainers[0], btnContainers[2], btnContainers[4], btnContainers[6], btnContainers[8]])
        } else {
            someoneWin([btnContainers[0], btnContainers[4], btnContainers[8]])
        }
        thereIsNoWinner = false
    } else if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[6].textContent) {
        someoneWin([btnContainers[2], btnContainers[4], btnContainers[6]])
        thereIsNoWinner = false
    }

    if (thereIsNoWinner) {
        let isTie = true

        btnContainers.forEach(function (item) {
            if (!item.textContent) {
                isTie = false
            }
        })


        if (isTie) {
            tie()
        }
    }
}