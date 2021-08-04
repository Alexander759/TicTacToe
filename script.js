// JavaScript source code
const btnContainers = document.querySelectorAll(".container")
const paragraphEnd = document.getElementById("report-end")
const newGameBtn = document.getElementById("new-game")

let xIsOnTurn = true

btnContainers.forEach(function (item) {
    item.addEventListener("click", clickBtnContainer)
})

function clickBtnContainer(e) {
    if (xIsOnTurn) {
        e.currentTarget.textContent = "X"
        xIsOnTurn = false
    } else {
        e.currentTarget.textContent = "O"
        xIsOnTurn = true
    }

    e.currentTarget.removeEventListener("click", clickBtnContainer)
    checkIfSomeoneWin()
}

newGameBtn.addEventListener("click", function () {
    btnContainers.forEach(function (item) {
        item.addEventListener("click", clickBtnContainer)
        item.style.background = "rgba(0, 255, 255, 0.5)"
        xIsOnTurn = true;
        item.textContent = ""
        paragraphEnd.textContent = ""
    })
})

function checkIfSomeoneWin() {
    if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[1].textContent && btnContainers[1].textContent === btnContainers[2].textContent) {
        Win([btnContainers[0], btnContainers[1], btnContainers[2]])
    } else if (btnContainers[3].textContent && btnContainers[3].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[5].textContent) {
        Win([btnContainers[3], btnContainers[4], btnContainers[5]])
    } else if (btnContainers[6].textContent && btnContainers[6].textContent === btnContainers[7].textContent && btnContainers[7].textContent === btnContainers[8].textContent) {
        Win([btnContainers[6], btnContainers[7], btnContainers[8]])
    } else if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[3].textContent && btnContainers[3].textContent === btnContainers[6].textContent) {
        Win([btnContainers[0], btnContainers[3], btnContainers[6]])
    } else if (btnContainers[1].textContent && btnContainers[1].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[7].textContent) {
        Win([btnContainers[1], btnContainers[4], btnContainers[7]])
    } else if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[5].textContent && btnContainers[5].textContent === btnContainers[8].textContent) {
        Win([btnContainers[2], btnContainers[5], btnContainers[8]])
    } else if (btnContainers[0].textContent && btnContainers[0].textContent === btnContainers[4].textContent && btnContainers[0].textContent === btnContainers[8].textContent) {
        if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[6].textContent) {
            Win([btnContainers[0], btnContainers[2], btnContainers[4], btnContainers[6], btnContainers[8]])
        } else {
            Win([btnContainers[0], btnContainers[4], btnContainers[8]])
        }
    } else if (btnContainers[2].textContent && btnContainers[2].textContent === btnContainers[4].textContent && btnContainers[4].textContent === btnContainers[6].textContent) {
        Win([btnContainers[2], btnContainers[4], btnContainers[6]])
    }
}

function Win(btns) {
    btns.forEach(function (item) {
        item.style.background = "lightgreen"
    })

    btnContainers.forEach(function (btn) {
        btn.removeEventListener("click", clickBtnContainer)
    })

    paragraphEnd.textContent = `Играч ${btns[0].textContent} печели!!!`
}
