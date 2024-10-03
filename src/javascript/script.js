const button = document.getElementById("button");
const menu = document.getElementById("menu");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");
const closed = document.getElementById("closed");
const nome = document.getElementById("nome_content");
const desc = document.getElementById("desc_content")
const span1 = document.querySelector('.span-1');
const span2 = document.querySelector('.span-2');
const editar = document.getElementById('button-edit');
const deletar = document.getElementById('button-delete');
const emptystate = document.querySelector('.empty-state')

function openForm() {
    menu.classList.add("opened")
}

function closeForm() {
    menu.classList.remove("opened");
}

function closeFormButton() {
    menu.classList.remove("opened");
}

let arrayObject = []
let usedIds = new Set(); 

function salvarTask() {
    const name = nome.value;
    const descricao = desc.value;
    let idAleatorio;
    do {
        idAleatorio = Date.now();
    } while (usedIds.has(idAleatorio)); 

    usedIds.add(idAleatorio);
    
    const objetoTarefa = {
        name,
        descricao, 
        id: idAleatorio,
        selected: false
    };

    arrayObject.push(objetoTarefa)

    const emptyStateContainer = document.querySelector('.empty-state-container'); 

    if (arrayObject.length === 0) {
        emptyStateContainer.style.display = 'block';
    } else {
        emptyStateContainer.style.display = 'none';         
        
        emptyStateContainer.innerHTML = '';

        const taskList = document.createElement('ul');
        arrayObject.forEach(function(item) {
            const itemLista = document.createElement('li'); 
            itemLista.textContent = `${item.name} - ${item.descricao}`;
            taskList.appendChild(itemLista);
        });

        emptyStateContainer.appendChild(taskList); 
        emptyStateContainer.style.display = 'block'; 
    }
}