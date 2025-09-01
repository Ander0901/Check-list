// Seleciona todos os radios de usuário e o ícone do summary
const radios = document.querySelectorAll('.caixaUser input[type="radio"]');
const iconeResumo = document.getElementById('iconeResumo');

// Atualiza ícone do usuário no summary
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            const img = radio.closest('label').querySelector('img');
            iconeResumo.src = img.src;
            iconeResumo.alt = img.alt;
        }
    });
});

// Retorna a imagem do usuário selecionado
function getUserSelecionado() {
    const user = document.querySelector('input[name="user"]:checked');
    return user?.closest("label").querySelector("img") || null;
}

// Marca/desmarca checkbox e atualiza horário e usuário
document.addEventListener("change", e => {
    if (e.target.type !== "checkbox") return;

    const li = e.target.closest("li");
    const span = li.querySelector(".userIcon");
    const horario = li.querySelector('p');

    if (e.target.checked) {
        const now = new Date();
        horario.textContent = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} `;

        const imgRelogio = document.createElement('img');
        imgRelogio.src = './assets/img/page/index/relogio.png';
        imgRelogio.alt = 'relogio';
        imgRelogio.style.width = '18px';
        imgRelogio.style.height = '18px';
        horario.appendChild(imgRelogio);

        const userImg = getUserSelecionado();
        if (userImg) {
            span.innerHTML = "";
            span.appendChild(createUserImg(userImg.src, userImg.alt));
        }
    } else {
        horario.textContent = "";
        span.innerHTML = "";
    }
});

// Cria elemento de imagem de usuário estilizado
function createUserImg(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.style.width = img.style.height = "25px";
    img.style.borderRadius = "50%";
    return img;
}

// Menu do cabeçalho
function toggleMenu() {
    document.querySelector(".menu").classList.toggle("ativo");
}

// Excluir item
function excluir(botao) {
    botao.closest("li")?.remove();
}

// Adicionar item à checklist
function adicionarItem(botao) {
    const containerChecklist = botao.closest('.checkList');
    const inputItem = containerChecklist.querySelector('.novoItem');
    const nomeItem = inputItem.value.trim();
    if (!nomeItem) return;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="conteinerItens">
        <button class="excluirItens" onclick="excluir(this)">
          <img src="./assets/img/page/index/lixeira-de-reciclagem.png">
        </button>
        <input type="checkbox" id="${nomeItem}_${Date.now()}">
        <label for="${nomeItem}_${Date.now()}">${nomeItem}</label>
        <p id='${nomeItem}_${Date.now()}_hora'></p>
        <span class="userIcon"></span>
        <button class="adicionarUser" onclick="adicionarMembros(this)">
          <img src="./assets/img/page/index/mais.png" alt="Mais">
        </button>
        <details><summary>Obs</summary><textarea rows="3"></textarea></details>
      </div>
    `;
    containerChecklist.querySelector('.tarefas').appendChild(li);
    inputItem.value = "";
}

// Criar nova checklist
function duplicarChecklist() {
    const nomeItem = document.getElementById("text").value.trim();
    if (!nomeItem) return;

    const section = document.querySelector(".section1");
    const checklist = document.createElement("div");
    checklist.classList.add("checkList");
    checklist.innerHTML = `
      <h2>${nomeItem}</h2>
      <ul class="tarefas"></ul>
      <details class="adicionar">
        <summary>+ Adicionar item a lista</summary>
        <input type="text" class="novoItem" placeholder="Nova tarefa">
        <button onclick="adicionarItem(this)">Adicionar</button>
      </details>
      <button onclick="limpar(this)">Limpar lista</button>
    `;
    section.appendChild(checklist);
    document.getElementById("text").value = "";
}

// Limpar checklist específica
function limpar(botao) {
    const containerChecklist = botao.closest('.checkList');
    containerChecklist.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
        const div = cb.closest('div');
        if (!div) return;
        const p = div.querySelector('p');
        const userIcon = div.querySelector('.userIcon');
        if (p) p.textContent = '';
        if (userIcon) userIcon.innerHTML = '';
    });
}

// Adicionar múltiplos membros
function adicionarMembros(botao) {
    const li = botao.closest("li");
    const container = li.querySelector(".userIcon");
    const userImg = getUserSelecionado();

    if (!userImg) return alert("Selecione um usuário antes de adicionar!");
    const novaImg = createUserImg(userImg.src, userImg.alt);
    novaImg.style.marginLeft = "3px";
    container.appendChild(novaImg);
}
