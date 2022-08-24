const buttonMen = document.querySelector('.header__button-gender_men'),
  buttonWomen = document.querySelector('.header__button-gender_women'),
  cardImage = document.querySelector('.card__image'),
  cardText = document.querySelector('.card-text'),
  buttonText = document.querySelector('.header__button-change-text'),
  buttonImage = document.querySelector('.header__button-change-image'),
  body = document.body;
const state = {
  gender: body.classList.contains('women') ? 'women' : 'men',
};

const getRandomFoArr = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber]
}

const getData = () => fetch('db.json').then(response => response.json())

const changeDOM = () => {
  if (state.photo.includes ('black')) {
    cardText.style.color = '#fff';
  } else {
    cardText.style.color = '';
  }
  cardImage.src = `img/${state.photo}`;
  cardText.innerHTML = state.text.replaceAll('\n' , '<br>');
}

const getDataToCard = () => {
  getData().then(data => {
    state.text = (getRandomFoArr(data.text[state.gender]));
    state.photo = (getRandomFoArr(data.photo[state.gender]));
    changeDOM();
  })
}

const changeToMen = () => {
  if (state.gender !== 'men') {
    body.classList.add('men');
    body.classList.remove('women');
    state.gender = 'men';
    getDataToCard();
  }
};

const changeToWomen = () => {
  if (state.gender !== 'women') {
    body.classList.add('women');
    body.classList.remove('men');
    state.gender = 'women';
    getDataToCard();
  }
};

const changeText = () => {
  getData().then(data => {
    state.text = (getRandomFoArr(data.text[state.gender]));
    changeDOM();
  });
};

const changeImage = () => {
  getData().then(data => {
    state.photo = (getRandomFoArr(data.photo[state.gender]));
    changeDOM();
  });
};


buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);
getDataToCard();
