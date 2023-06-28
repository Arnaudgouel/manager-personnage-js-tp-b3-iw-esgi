
class Personnage {
  
  name;

  img;

  populace;

  weapons = [];

  constructor(name, img, populace, weapons) {
    this.name = name;
    this.img = img;
    this.populace = populace;
    this.weapons = weapons;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getImg() {
    return this.img;
  }

  setImg(img) {
    this.img = img;
  }

  getPopulace() {
    return this.populace;
  }

  setPopulace(populace) {
    this.populace = populace;
  }

  getWeapons() {
    return this.weapons;
  }

  setWeapons(weapons) {
    this.weapons = weapons;
  }
}


const addPerso = document.querySelector('#add');
const deletePerso = document.querySelector('#delete');
const editPerso = document.querySelector('#edit');
const team = document.querySelector('#team');
const form = document.querySelector('#form');
const persoSection = document.querySelector('#perso');
const persoName = document.querySelector('#perso h3');
const persoImg = document.querySelector('#perso article img');
const persoPopulace = document.querySelector('#perso small');
const persoWeapons = document.querySelector('#perso ul');
let selectedPerso = null;

let persos = [];

if (localStorage.getItem('persos')) {
  persos = JSON.parse(localStorage.getItem('persos'));
  renderPersos();
}

function renderPersos(){
  team.innerHTML = '';
  persos.forEach((perso) => {
    console.log(perso);
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${perso.img}" alt="${perso.name}">
      <h3>${perso.name}</h3>
      <p>${perso.populace}</p>
    `;
    li.addEventListener('click', () => {
      selectedPerso = perso;
      displayPersoDetails();
      persoSection.classList.remove('out');
    });
    team.appendChild(li);
  });
}

function displayPersoDetails() {
  persoName.textContent = selectedPerso.name;
  persoImg.src = selectedPerso.img;
  persoPopulace.textContent = selectedPerso.populace;
  persoWeapons.innerHTML = '';
  selectedPerso.weapons.forEach((weapon) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${weapon.img}" alt="${weapon.name}">
      <h3>${weapon.name}</h3>
    `;
    persoWeapons.appendChild(li);
  });
}

addPerso.addEventListener('click', () => {
  form.classList.remove('hide');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const img = document.querySelector('#img').value;
  const populace = document.querySelector('#people').value;
  const weaponsInput = document.querySelectorAll('input[name="weapon[]"]');
  let weapons = [];
  weaponsInput.forEach((weapon) => {
    if (!weapon.checked) {
      return;
    }
    weapons.push({
      name: weapon.value,
      img: weapon.nextSibling.firstChild.src,
    });
    console.log(weapon.nextSibling);
  });
  const newPerso = new Personnage(name, img, populace, weapons);
  if (form.dataset.mode === 'edit') {
    const index = persos.indexOf(selectedPerso);
    persos[index] = newPerso;
  } else {
    persos.push(newPerso);
  }
  console.log(persos);
  form.classList.add('hide');
  form.reset();
  form.dataset.mode = 'add';
  renderPersos();
  localStorage.setItem('persos', JSON.stringify(persos));
});

persoSection.querySelector('img[title="Fermer"]').addEventListener('click', () => {
  persoSection.classList.add('out');
});

deletePerso.addEventListener('click', () => {
  if (selectedPerso) {
    const index = persos.indexOf(selectedPerso);
    persos.splice(index, 1);
    localStorage.setItem('persos', JSON.stringify(persos));
    renderPersos();
    persoSection.classList.add('out');
  }
});

editPerso.addEventListener('click', () => {
  if (selectedPerso) {
    persoSection.classList.add('out');
    form.classList.remove('hide');
    form.dataset.mode = 'edit';
    document.querySelector('#name').value = selectedPerso.name;
    document.querySelector('#img').value = selectedPerso.img;
    document.querySelector('#people').value = selectedPerso.populace;
    const weaponsInput = document.querySelectorAll('input[name="weapon[]"]');
    weaponsInput.forEach((weapon) => {
      weapon.checked = false;
    });
    selectedPerso.weapons.forEach((weapon) => {
      const input = document.querySelector(`input[value="${weapon.name}"]`);
      input.checked = true;
    });
  }
});





