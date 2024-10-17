const button = document.getElementById("button");
const menu = document.getElementById("menu");
const fechar = document.getElementById("fechar");
const salvar = document.getElementById("salvar");
const nome = document.getElementById("nome-content");
const desc = document.getElementById("desc-content");
const emptystateContainer = document.querySelector('.empty-state-container'); 

let arrayObject = [];
let usedIds = new Set();

function alterColor(){
    document.body.style.background = "rgba(0, 0, 0, 0.9)"; 
    document.body.style.backdropFilter = "blur(6px)";
}

function originColor() {
    document.body.style.backgroundColor = "#2B2D31";
}

function openForm() {
    menu.classList.add("opened");
    alterColor();
}

function closeForm() {
    menu.classList.remove("opened");
    originColor();
}

function closeFormButton() {
    menu.classList.remove("opened");
    originColor();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(arrayObject));
}

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        arrayObject = JSON.parse(savedTasks);
    }
}

function salvarTask() {
    const name = nome.value;
    const descricao = desc.value;

    if (name === null || name === '') {
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

    arrayObject.push(objetoTarefa);

    saveToLocalStorage();
    renderTasks();
    closeForm();
    originColor();
    nome.value = '';
    desc.value = '';
}

function editarTask(index) {
    const tarefa = arrayObject[index];

    nome.value = tarefa.name;
    desc.value = tarefa.descricao;

    openForm();

    salvar.onclick = function () {
        const novoNome = nome.value;
        const novaDescricao = desc.value;

        if (novoNome === null || novoNome === '') {
            return;
        }

        arrayObject[index].name = novoNome;
        arrayObject[index].descricao = novaDescricao;

        saveToLocalStorage();

        renderTasks();
        closeForm();
        nome.value = '';
        desc.value = '';
        salvar.onclick = salvarTask;
    };
}

function deletarTask(index) {
    arrayObject.splice(index, 1);
    saveToLocalStorage();
    renderTasks();
    salvar.onclick = salvarTask;
    nome.value = '';
    desc.value = '';
}

function renderTasks() {
    const emptyStateContainer = document.querySelector('.empty-state-container'); 
    emptyStateContainer.innerHTML = '';
    
    if (arrayObject.length === 0) {
        emptyStateContainer.innerHTML = '<div class="empty_state_new"><span class="span_1">Você ainda não criou nenhuma tarefa</span><br><span class="span_2">Não se preocupe, suas novas tarefas irão aparecer aqui.</span></div>';
    } else {
        arrayObject.forEach(function(item, index) {
            console.log(index);
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task-container');

            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('checkbox-container');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.selected;
            checkbox.onchange = function () {
                item.selected = checkbox.checked;
                saveToLocalStorage();
            };
            checkboxContainer.appendChild(checkbox);

            const taskInfoContainer = document.createElement('div');
            taskInfoContainer.classList.add('task-info-container');
            
            const taskName = document.createElement('span');
            taskName.textContent = item.name;
            taskName.classList.add('task-name');
            
            const taskDescription = document.createElement('span');
            taskDescription.textContent = item.descricao;
            taskDescription.classList.add('task-descricao');
            
            taskInfoContainer.appendChild(taskName);
            taskInfoContainer.appendChild(taskDescription);

            
            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');
            
            const editButton = document.createElement('button');
            editButton.classList.add('button-1')
            editButton.innerHTML = `<img src="./src/images/edit.svg">`;
            editButton.onclick = function () {
                editarTask(index);
            };
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('button-2')
            deleteButton.innerHTML = `<img src="./src/images/delete.svg">`;
            deleteButton.onclick = function () {
                deletarTask(index);
            };

            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(deleteButton);

            taskContainer.appendChild(checkboxContainer);
            taskContainer.appendChild(taskInfoContainer);
            taskContainer.appendChild(buttonsContainer);

            emptyStateContainer.appendChild(taskContainer);
        });
    }
}

window.onload = function() {
    loadFromLocalStorage();
    renderTasks();
};