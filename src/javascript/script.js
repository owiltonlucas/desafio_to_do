const button = document.getElementById("button")
const menu = document.getElementById("menu")

function addTask() {
    button.addEventListener('click', function() {
        menu.classList.add("opened")
    })
}

addTask();