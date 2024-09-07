const button = document.getElementById("button");
const menu = document.getElementById("menu");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");
const closed = document.getElementById("closed");
const nome = document.getElementById("nome_content");
const desc = document.getElementById("desc_content")

function addTask() {
    button.addEventListener('click', function() {
        menu.classList.add("opened")
    })
    
    fechar.addEventListener('click', function() {
        menu.classList.remove("opened")
    })
}

addTask();

function salvarTask() {
    salvar.addEventListener('click', function() {
        menu.classList.remove("opened")
    })
}

salvarTask();

closed.addEventListener('click', function() {
    menu.classList.remove("opened")
})

salvar.addEventListener('click', function(e) {
    e.preventDefault()
    const name = nome.value
    const descricao = desc.value
    console.log(name)
    console.log(descricao)
})