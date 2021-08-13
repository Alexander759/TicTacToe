// JavaScript source code
const btnContainers = document.querySelectorAll(".container")
const paragraphEnd = document.getElementById("report-end")
const newGameWithFriendBtn = document.getElementById("new-game-with-friend")
const easyGameBtn = document.getElementById("easy")
const mediumGameBtn = document.getElementById("medium")
const hardGameBtn = document.getElementById("hard")
const impossibleGameBtn = document.getElementById("impossible")
const playWithX = document.getElementById("play-with-x")
const playWithO = document.getElementById("play-with-o")
const continerBtnChoosing = document.getElementById("continer-btn-choosing")

let clickBtnContainer = null
let someoneWin = null
let tie = null
let xIsOnTurn = true
let thereIsNoWinner = true
let XIsPlayer = true
let count = 0
let plusMaxCount = 0
let humanPlayer = "X"
let aiPlayer = "O"
let lastClickedBtn = null

newGameWithFriendBtn.addEventListener("click", function () {

    continerBtnChoosing.classList.add("make-invisible")

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

easyGameBtn.addEventListener("click", function () {
    lastClickedBtn = easyGameBtn

    continerBtnChoosing.classList.remove("make-invisible")

    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    clickBtnContainer = function (e) {
        e.currentTarget.textContent = humanPlayer
        count++
        e.currentTarget.removeEventListener("click", clickBtnContainer)
        checkIfSomeoneWinOrTie()
        if (thereIsNoWinner && count <= 8 + plusMaxCount) {
            let num = Math.floor(Math.random() * btnContainers.length)
            while (btnContainers[num].textContent !== "") {
                num = Math.floor(Math.random() * btnContainers.length)
            }

            btnContainers[num].textContent = aiPlayer
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

        if (btns[0].textContent === humanPlayer) {
            paragraphEnd.textContent = `Вие печелите!!!`
        } else {
            paragraphEnd.textContent = `Компютърът печели`
        }
    }

    tie = function () {
        paragraphEnd.textContent = "Равенство"
    }

    prepareForNewGame()
})

mediumGameBtn.addEventListener("click", function () {
    lastClickedBtn = mediumGameBtn

    continerBtnChoosing.classList.remove("make-invisible")

    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]


    clickBtnContainer = function (e) {
        if (count < 2 + plusMaxCount * 2) {
            e.currentTarget.textContent = humanPlayer
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = humanPlayer
                }
            })
            checkIfSomeoneWinOrTie()

            if (thereIsNoWinner) {
                let num = Math.floor(Math.random() * btnContainers.length)

                if (num == 2) {
                    while (num % 2 == 0 && btnContainers[num].textContent !== "") {
                        num = Math.floor(Math.random() * btnContainers.length)
                    }
                }

                while (btnContainers[num].textContent !== "") {
                    num = Math.floor(Math.random() * btnContainers.length)
                }
                table[num] = aiPlayer
                btnContainers[num].textContent = aiPlayer
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
        } else {
            e.currentTarget.textContent = humanPlayer
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            checkIfSomeoneWinOrTie()

            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = humanPlayer
                }
            })

            if (thereIsNoWinner && count <= 8 + plusMaxCount) {
                let num = miniMax(table, false).key
                table[num] = aiPlayer
                btnContainers[num].textContent = aiPlayer
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

        if (btns[0].textContent === humanPlayer) {
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

    if (!XIsPlayer) {
        let num = Math.floor(Math.random() * btnContainers.length)

        while (num %  2 == 0) {
            num = Math.floor(Math.random() * btnContainers.length)
        }

        table[num] = aiPlayer
        btnContainers[num].textContent = aiPlayer
        btnContainers[num].removeEventListener("click", clickBtnContainer)
        count++
    }
})

hardGameBtn.addEventListener("click", function () {
    lastClickedBtn = hardGameBtn

    continerBtnChoosing.classList.remove("make-invisible")

    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
        0, 0, 0,
        0, 0, 0]

    clickBtnContainer = function (e) {
        if (count < 1 + plusMaxCount * 2) {
            e.currentTarget.textContent = humanPlayer
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = humanPlayer
                }
            })
            checkIfSomeoneWinOrTie()

            if (thereIsNoWinner) {
                let num = Math.floor(Math.random() * btnContainers.length)

                if (num == 2) {
                    while (num % 2 == 0 && btnContainers[num].textContent !== "") {
                        num = Math.floor(Math.random() * btnContainers.length)
                    }
                }

                while (btnContainers[num].textContent !== "") {
                    num = Math.floor(Math.random() * btnContainers.length)
                }
                table[num] = aiPlayer
                btnContainers[num].textContent = aiPlayer
                btnContainers[num].removeEventListener("click", clickBtnContainer)
                count++
                checkIfSomeoneWinOrTie()
            }
        } else {
            e.currentTarget.textContent = humanPlayer
            count++
            e.currentTarget.removeEventListener("click", clickBtnContainer)
            checkIfSomeoneWinOrTie()

            btnContainers.forEach(function (item, i) {
                if (item === e.currentTarget) {
                    table[i] = humanPlayer
                }
            })

            if (thereIsNoWinner && count <= 8 + plusMaxCount) {
                let num = miniMax(table, false).key

                table[num] = aiPlayer
                btnContainers[num].textContent = aiPlayer
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

        if (btns[0].textContent === humanPlayer) {
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

    if (!XIsPlayer) {
        let num = Math.floor(Math.random() * btnContainers.length)

        while (num % 2 == 0) {
            num = Math.floor(Math.random() * btnContainers.length)
        }

        table[num] = aiPlayer
        btnContainers[num].textContent = aiPlayer
        btnContainers[num].removeEventListener("click", clickBtnContainer)
        count++
    }

})

impossibleGameBtn.addEventListener("click", function () {
    lastClickedBtn = impossibleGameBtn

    continerBtnChoosing.classList.remove("make-invisible")


    btnContainers.forEach(function (item) {
        item.removeEventListener("click", clickBtnContainer)
    })

    var table = [0, 0, 0,
                0, 0, 0,
                0, 0, 0]

    clickBtnContainer = function (e) {

        e.currentTarget.textContent = humanPlayer
        count++
        e.currentTarget.removeEventListener("click", clickBtnContainer)
        checkIfSomeoneWinOrTie()

        btnContainers.forEach(function (item, i) {
            if (item === e.currentTarget) {
                table[i] = humanPlayer
            }
        })

        if (thereIsNoWinner && count <= 8 + plusMaxCount) {
            let num = miniMax(table, false).key
            table[num] = aiPlayer
            btnContainers[num].textContent = aiPlayer
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

        if (btns[0].textContent === humanPlayer) {
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

    if (!XIsPlayer) {
        let num = Math.floor(Math.random() * table.length)
        table[num] = aiPlayer
        btnContainers[num].textContent = aiPlayer
        btnContainers[num].removeEventListener("click", clickBtnContainer)
        count++
    }
})

playWithX.addEventListener("click", function () {
    playWithX.classList.add("is-choosen")
    playWithO.classList.remove("is-choosen")
    humanPlayer = "X"
    aiPlayer = "O"
    XIsPlayer = true
    plusMaxCount = 0
    lastClickedBtn.click()
})

playWithO.addEventListener("click", function () {
    playWithO.classList.add("is-choosen")
    playWithX.classList.remove("is-choosen")
    humanPlayer = "O"
    aiPlayer = "X"
    XIsPlayer = false
    plusMaxCount = 1
    lastClickedBtn.click()
})

function miniMax(table, humanTurn, deep=1) {
    const end = isEnd(table)
    
    if (end.isEnd) {
        if (end.humanWins) {
            return { value: -10 }
        } else if (end.aiWins) {
            return { value: 10 }
        } else if (end.isTie) {
            return { value: 0 }
        } else {
            return { value: -100 }
        }
    } else {

        let data = []

        table.forEach(function (item, i) {
            if (item === 0) {
                let newTable = table.slice()

                if (humanTurn) {
                    if (XIsPlayer) {
                        newTable[i] = "X"
                    } else {
                        newTable[i] = "O"
                    }
                } else {
                    if (XIsPlayer) {
                        newTable[i] = "O"
                    } else {
                        newTable[i] = "X"
                    }
                }

                data.push({ key: i, value: miniMax(newTable.slice(), !humanTurn, deep + 1).value })
            }
        })

        if (humanTurn) {
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
    let end = { isEnd: false, humanWins: false, aiWins: false, isTie: false }

    let thereIsNoWinner = true

    if (table[0] && table[0] === table[1] && table[1] === table[2]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }

    } else if (table[3] && table[3] === table[4] && table[4] === table[5]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[3] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[6] && table[6] === table[7] && table[7] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[6] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[0] && table[0] === table[3] && table[3] === table[6]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[1] && table[1] === table[4] && table[4] === table[7]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[1] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[2] && table[2] === table[5] && table[5] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[2] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[0] && table[0] === table[4] && table[0] === table[8]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[0] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
        }
    } else if (table[2] && table[2] === table[4] && table[4] === table[6]) {
        end.isEnd = true
        thereIsNoWinner = false
        if (table[2] === humanPlayer) {
            end.humanWins = true
        } else {
            end.aiWins = true
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
    delete table
    xIsOnTurn = true
}

function checkIfSomeoneWinOrTie() {
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

easyGameBtn.click()