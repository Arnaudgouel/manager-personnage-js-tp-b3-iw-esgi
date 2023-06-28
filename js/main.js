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

const formName = document.querySelector('#name');
const formImg = document.querySelector('#img');
const formPopulace = document.querySelector('#people');
const weaponsInput = document.querySelectorAll('input[name="weapon[]"]');
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

  renderPerso() {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${this.getImg()}" alt="${this.getName()}">
      <h3>${this.getName()}</h3>
      <p>${this.getPopulace()}</p>
    `;
    li.addEventListener('click', () => {
      selectedPerso = this;
      this.displayPersoDetails();
      persoSection.classList.remove('out');
    });
    team.appendChild(li);
  }

  displayPersoDetails() {
    persoName.textContent = this.getName();
    persoImg.src = this.getImg();
    persoPopulace.textContent = this.getPopulace();
    persoWeapons.innerHTML = '';
    this.getWeapons().forEach((weapon) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${weapon.img}" alt="${weapon.name}">
        <h3>${weapon.name}</h3>
      `;
      persoWeapons.appendChild(li);
    });
  }

  editPerso() {
    form.classList.remove('hide');
    persoSection.classList.add('out');
    form.dataset.mode = 'edit';
    formName.value = this.getName();
    formImg.value = this.getImg();
    formPopulace.value = this.getPopulace();
    weaponsInput.forEach((weapon) => {
      weapon.checked = false;
    });
    this.getWeapons().forEach((weapon) => {
      const input = document.querySelector(`input[value="${weapon.name}"]`);
      input.checked = true;
    });
  }
}



let persos = [];

if (localStorage.getItem('persos')) {
  persos = JSON.parse(localStorage.getItem('persos'));
  let tempPersos = [];
  persos.forEach((perso) => {
    tempPersos.push(new Personnage(perso.name, perso.img, perso.populace, perso.weapons));
  });
  persos = tempPersos;
  renderPersos();
}

function renderPersos(){
  team.innerHTML = '';
  persos.forEach((perso) => {
    perso.renderPerso();
  });
}

function displayPersoDetails() {
  selectedPerso.displayPersoDetails();
}

addPerso.addEventListener('click', () => {
  form.classList.remove('hide');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let weapons = [];
  weaponsInput.forEach((weapon) => {
    if (!weapon.checked) {
      return;
    }
    weapons.push({
      name: weapon.value,
      img: weapon.nextSibling.firstChild.src,
    });
  });
  if (form.dataset.mode === 'edit') {
    const index = persos.indexOf(selectedPerso);
    persos[index].setName(formName.value);
    persos[index].setImg(formImg.value);
    persos[index].setPopulace(formPopulace.value);
    persos[index].setWeapons(weapons);
  } else {
    const newPerso = new Personnage(formName.value, formImg.value, formPopulace.value, weapons);
    persos.push(newPerso);
  }
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
    selectedPerso.editPerso();
  }
});





