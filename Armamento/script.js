// script.js
document.getElementById('search-input').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let names = document.querySelectorAll('#name-list li');

    names.forEach(function(name) {
        if (name.textContent.toLowerCase().includes(filter)) {
            name.classList.remove('hidden');
        } else {
            name.classList.add('hidden');
        }
    });
});

// script.js
document.getElementById('add-name-btn').addEventListener('click', function() {
    let newName = document.getElementById('new-name').value;
    if (newName) {
        let newLi = document.createElement('li');
        newLi.textContent = newName;
        document.getElementById('name-list').appendChild(newLi);
        document.getElementById('new-name').value = '';
    }
});

// Adicionar ao final da função de busca
let anyVisible = Array.from(names).some(name => !name.classList.contains('hidden'));
document.getElementById('no-results').style.display = anyVisible ? 'none' : 'block';

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.getElementById('search-input').addEventListener('keyup', function() {
    let filter = removeAccents(this.value.toLowerCase());
    let names = document.querySelectorAll('#name-list li');

    names.forEach(function(name) {
        let nameText = removeAccents(name.textContent.toLowerCase());
        if (nameText.includes(filter)) {
            name.classList.remove('hidden');
        } else {
            name.classList.add('hidden');
        }
    });
});


// Save to localStorage
function saveNameToStorage(newName) {
    let names = JSON.parse(localStorage.getItem('namesList')) || [];
    names.push(newName);
    localStorage.setItem('namesList', JSON.stringify(names));
}

// Load from localStorage
function loadNamesFromStorage() {
    let storedNames = JSON.parse(localStorage.getItem('namesList')) || [];
    storedNames.forEach(function(name) {
        let newLi = document.createElement('li');
        newLi.textContent = name;
        document.getElementById('name-list').appendChild(newLi);
    });
}

window.onload = loadNamesFromStorage;

document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
        let li = this.parentElement;
        li.parentElement.removeChild(li);
        updateStorage();
    });
});



function salvar(botao) {
  const li = botao.closest("li");
  const id = li.dataset.id;

  const inputs = li.querySelectorAll("input");

  const dados = {
    nome: inputs[0].value,
    data: inputs[1].value,
    obs: inputs[2].value
  };

  localStorage.setItem(id, JSON.stringify(dados));
  alert("Anotação salva");
}



window.onload = function () {
  document.querySelectorAll("li[data-id]").forEach(li => {
    const id = li.dataset.id;
    const salvo = localStorage.getItem(id);

    if (salvo) {
      const dados = JSON.parse(salvo);
      const inputs = li.querySelectorAll("input");

      inputs[0].value = dados.nome;
      inputs[1].value = dados.data;
      inputs[2].value = dados.obs;
    }
  });
};
