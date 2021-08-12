// JavaScript source code
const btnContainers = document.querySelectorAll(".container")
const paragraphEnd = document.getElementById("report-end")
const newGameWithFriendBtn = document.getElementById("new-game-with-friend")
const easyGameBtn = document.getElementById("easy")
const mediumGameBtn = document.getElementById("medium")
const hardGameBtn = document.getElementById("hard")
const impossibleGameBtn = document.getElementById("impossible")

let clickBtnContainer = null
let someoneWin = null
let tie = null

let xIsOnTurn = true
let thereIsNoWinner = true
let count = 0
//let table = null

newGameWithFriendBtn.addEventListener("click", function () {
    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

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

mediumGameBtn.addEventListener("click", function () {
    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]


    clickBtnContainer = function (e) {
        if (count < 2) {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })
            checkIfSomeoneWinOrTie()

            if (thereIsNoWinner) {
                let num = Math.floor(Math.random() * btnContainers.length)

                if (num % 2 == 0) {
                    num = 4
                }

                while (btnContainers[num].textContent !== "") {
                    num = Math.floor(Math.random() * btnContainers.length)
                }
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
        } else {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            checkIfSomeoneWinOrTie()

            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })

            if (thereIsNoWinner && count <= 8) {
                let num = miniMax(table, false).key
                console.log("num is " + num)
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
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
            paragraphEnd.textContent = `Вие печелите!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })
    }

    prepareForNewGame()

})

hardGameBtn.addEventListener("click", function () {
    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]


    clickBtnContainer = function (e) {
        if (count < 2) {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })
            checkIfSomeoneWinOrTie()

            if (thereIsNoWinner) {
                let num = 4

                while (btnContainers[num].textContent !== "") {
                    num = Math.floor(Math.random() * btnContainers.length)
                }
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
        } else {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            checkIfSomeoneWinOrTie()

            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })

            if (thereIsNoWinner && count <= 8) {
                let num = miniMax(table, false).key
                console.log("num is " + num)
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
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
            paragraphEnd.textContent = `Вие печелите!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })
    }

    prepareForNewGame()

})

hardGameBtn.addEventListener("click", function () {
    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]


    clickBtnContainer = function (e) {
        if (count < 1) {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })
            checkIfSomeoneWinOrTie()

            if (thereIsNoWinner) {
                let num = 4

                while (btnContainers[num].textContent !== "") {
                    num = Math.floor(Math.random() * btnContainers.length)
                }
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
        } else {
            e.currentTarget.textContent = "X"
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            checkIfSomeoneWinOrTie()

            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = "x"
                }
            })

            if (thereIsNoWinner && count <= 8) {
                let num = miniMax(table, false).key
                console.log("num is " + num)
                table[num] = 'o'
                btnContainers[num].textContent = "O"
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
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
            paragraphEnd.textContent = `Вие печелите!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })
    }

    prepareForNewGame()

})

impossibleGameBtn.addEventListener("click", function () {

    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
                0, 0, 0,
                0, 0, 0]


    clickBtnContainer = function (e) {

        e.currentTarget.textContent = "X"
        count++
        e.currentTarget.removeEventListener("click", clickBtnContainer)
        checkIfSomeoneWinOrTie()

        btnContainers.forEach(function (item, i) {
            if (item === e.currentTarget) {
                table[i] = "x"
            }
        })

        if (thereIsNoWinner && count <= 8) {
            let num = miniMax(table, false).key
            console.log("num is " + num)
            table[num] = 'o'
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
            paragraphEnd.textContent = `Вие печелите!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
        btnContainers.forEach(function (btn) {
            btn.removeEventListener("click", clickBtnContainer)
        })
    }

    prepareForNewGame()
})

function miniMax(table, xTurn, deep=1) {
    const end = isEnd(table)
    
    if (end.isEnd) {
        if (end.xWins) {
            //console.log("X wins")
            return { value: -10 }
        } else if (end.oWins) {
            //console.log("O wins")
            return { value: 10 }
        } else if (end.isTie) {
            //console.log("Tie")
            return { value: 0 }
        } else {
            return { value: -100 }
        }
    } else {

        let data = []

        table.forEach(function (item, i) {
            if (item === 0) {
                let newTable = table.slice()

                if (xTurn) {
                    newTable[i] = "x"
                } else {
                    newTable[i] = "o"
                }

                if (deep === 1) {
                    console.log(newTable)
                }

                //console.log(miniMax(newTable.slice()).value)
                data.push({ key: i, value: miniMax(newTable.slice(), !xTurn, deep + 1).value })
            }
        })

        //console.log(data)
        if (xTurn) {
            let minValue = Infinity
            let neededKey = null

            for (let i = 0; i < data.length; i++) {
                if (minValue > data[i].value) {
                    minValue = data[i].value
                    neededKey = data[i].key
                }
            }


            return { key: neededKey, value: minValue }
        } else {
            let maxValue = -Infinity
            let neededKey = null

            for (let i = 0; i < data.length; i++) {
                if (maxValue < data[i].value) {
                    maxValue = data[i].value
                    neededKey = data[i].key
                }
            }

            return { key: neededKey, value: maxValue }
        }
    }
}

function isEnd(table) {
    let end = { isEnd: false, xWins: false, oWins: false, isTie: false }

    let thereIsNoWinner = true

    if (table[0] && table[0] === table[1] && table[1] === table[2]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }

    } else if (table[3] && table[3] === table[4] && table[4] === table[5]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[3] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[6] && table[6] === table[7] && table[7] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[6] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[0] && table[0] === table[3] && table[3] === table[6]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[1] && table[1] === table[4] && table[4] === table[7]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[1] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[2] && table[2] === table[5] && table[5] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[2] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[0] && table[0] === table[4] && table[0] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    } else if (table[2] && table[2] === table[4] && table[4] === table[6]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[2] === "x") {
            end.xWins = true
        } else {
            end.oWins = true
        }
    }

    if (thereIsNoWinner) {
        let isTie = true

        table.forEach(function (item) {
            if (!item) {
                isTie = false
            }
        })


        if (isTie) {
            end.isEnd = true
            end.isTie = true
        }
    }

    return end
}


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
    table = null
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