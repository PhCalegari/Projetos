window.onload = function() {
    carregarTarefas();
};

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(function(tarefa) {
        criaNovoItemDaLista(tarefa.texto, tarefa.concluida);
    });
}

function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() === '') {
        alert('Por favor, Insira um texto na tarefa.');
        return;
    }
    criaNovoItemDaLista(novaTarefa);
    salvarTarefas();
}

function criaNovoItemDaLista(textoDaTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let qtdTarefas = listaTarefas.children.length;
    const novoItem = document.createElement('li');
    novoItem.id = `tarefa_id_${qtdTarefas}`;
    const spanTexto = document.createElement('span');
    spanTexto.innerText = textoDaTarefa;
    novoItem.appendChild(spanTexto);
    novoItem.addEventListener('click', function() {
        this.classList.toggle('completed');
        salvarTarefas(); // Salva as tarefas sempre que houver uma mudança
    });
    novoItem.appendChild(criaBotaoEditarTarefa(novoItem.id));
    novoItem.appendChild(criaBotaoExcluirTarefa(novoItem.id));
    listaTarefas.appendChild(novoItem);
    if (qtdTarefas > 0) {
        const hr = document.createElement('hr');
        listaTarefas.insertBefore(hr, novoItem);
    }
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.id = `checkbox`;
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    const spanTexto = tarefaSelecionada.querySelector('span');
    
    if (spanTexto.style.textDecoration === 'line-through') {
        spanTexto.style.textDecoration = 'none';
    } else {
        spanTexto.style.textDecoration = 'line-through';
    }
    salvarTarefas(); // Salva as tarefas sempre que houver uma mudança
}

function criaBotaoEditarTarefa(idTarefa) {
    const botaoEditar = document.createElement('button');
    botaoEditar.innerText = '✏️';
    botaoEditar.id = `botaoeditar`;
    botaoEditar.setAttribute('onclick', `editarTarefa('${idTarefa}')`);
    return botaoEditar;
}

function editarTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    const spanTexto = tarefaSelecionada.querySelector('span');
    const novoTexto = prompt('Digite o novo texto da tarefa:', spanTexto.innerText);
    if (novoTexto != null) {
        spanTexto.innerText = novoTexto;
        salvarTarefas();
    }
}

function criaBotaoExcluirTarefa(idTarefa) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = '❌';
    botaoExcluir.id = `botaoexcluir`;
    botaoExcluir.setAttribute('onclick', `excluirTarefa('${idTarefa}')`);
    return botaoExcluir;
}

function excluirTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    tarefaSelecionada.style.display="none";
    salvarTarefas();
}
function exibirTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    listaTarefas.childNodes.forEach(function(item) {
        if (item.tagName === 'LI' && item.style.display === "none") {
            item.style.display = "block";
        }
    });
    salvarTarefas();
}

function salvarTarefas() {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    const tarefas = [];
    listaTarefas.childNodes.forEach(function(item) {
        if (item.tagName === 'LI') {
            const texto = item.querySelector('span').innerText;
            const concluida = item.querySelector('span').style.textDecoration === 'line-through';
            tarefas.push({ texto, concluida });
        }
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
