function adicionaTarefaNaLista() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa.trim() === '') {
        // Se estiver vazio, exibe uma mensagem de alerta e não faz nada
        alert('Por favor, Insira um texto na tarefa.');
        return; // Sai da função sem adicionar a tarefa
    }
    
    // Se o campo de texto não estiver vazio, cria a nova tarefa
    criaNovoItemDaLista(novaTarefa);
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
    });
    novoItem.appendChild(spanTexto);
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
    
    // Verifica se o texto está riscado
    if (spanTexto.style.textDecoration === 'line-through') {
        // Se estiver riscado, remove o risco
        spanTexto.style.textDecoration = 'none';
    } else {
        // Se não estiver riscado, adiciona o risco
        spanTexto.style.textDecoration = 'line-through';
    }
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
        
    }
}

function criaBotaoExcluirTarefa(idTarefa) {
    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerText = '❌    ';
    botaoExcluir.id = `botaoexcluir`;
    botaoExcluir.setAttribute('onclick', `excluirTarefa('${idTarefa}')`);
    return botaoExcluir;
}

function excluirTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    tarefaSelecionada.remove();
}