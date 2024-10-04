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

    if (name === null || name === ''){
        return;
    }

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

       
        arrayObject.forEach(function(item, index) {
        
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

       
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.selected;
        checkbox.onchange = function () {
            item.selected = checkbox.checked; // Marca ou desmarca a tarefa
        };

       
        const taskText = document.createElement('span');
        taskText.textContent = `${item.name} ${item.descricao}`;


        const editButton = document.createElement('button');
        editButton.innerHTML = `<img src="./src/images/edit.svg">`;
        editButton.onclick = function () {
            editarTask(index); 
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src="./src/images/delete.svg">`;
        deleteButton.onclick = function () {
            deletarTask(index); 
        };

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(editButton);
        taskContainer.appendChild(deleteButton);

      
        emptyStateContainer.appendChild(taskContainer);
    });

    emptyStateContainer.style.display = 'block';
}
    closeForm();
    nome.value = '';
    desc.value = '';
}
