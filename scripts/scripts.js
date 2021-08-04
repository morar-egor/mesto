//Объявление переменной
const page = document.querySelector('.page');
const formEditProfile = page.querySelector('.popup__edit_profile');
const formAddContent = page.querySelector('.popup__add_content');
const contentOpenPicture = page.querySelector('.popup__open_picture');
const viewingPicture = page.querySelector('.popup__image');
const profileButton = page.querySelector('.profile__button');
const contentButton = page.querySelector('.profile__content');
const closeButtonProfile = page.querySelector('.popup__close_type_edit_profile');
const closeButtonContent = page.querySelector('.popup__close_type_add_content');
const closeButtonPicture = page.querySelector('.popup__close_open_picture');
const nameInput = page.querySelector('.popup__input_type_name');
const jobInput = page.querySelector('.popup__input_type_about');
const profileName = page.querySelector('.profile__name');
const profileBio = page.querySelector('.profile__bio');
const placeInput = page.querySelector('.popup__input_type_place');
const pictureInput = page.querySelector('.popup__input_type_picture');
const contentTemplate = page.querySelector('#content-template');
const contentList = page.querySelector('.content__list');
const pictureDescription = page.querySelector('.popup__picture-description');

//контент при открытии страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];

//создаем фурму карточки контента
createCard = (name, link) => {
  const cardContent = contentTemplate.content.querySelector('.content__info').cloneNode(true);
  cardContent.querySelector('.content__name').textContent = name;
  cardContent.querySelector('.content__picture').src = link;
  cardContent.querySelector('.content__picture').alt = name;
  removeCard(cardContent);
  openPicture(cardContent);
  buttontLike(cardContent);
  return cardContent;
};

//удаление контента
removeCard = (content) => {
  const cardContent = page.querySelector('.content__remove');
  content.querySelector('.content__remove').addEventListener('click', (e) => {
    const cardItem = e.target.closest('.content__info');
    cardItem.remove(cardContent);
  });
};

//просмотр картиник
openPicture = (content) => {
  content.querySelector('.content__picture').addEventListener('click', (e) => {
    buttonOpen(contentOpenPicture);
    viewingPicture.src = e.target.getAttribute('src');
    viewingPicture.alt = e.target.getAttribute('alt');
    pictureDescription.textContent = content.textContent;
  });
};

//поставить и убрать лайк
buttontLike = (content) => {
  content.querySelector('.content__like').addEventListener('click', (e) => {
  e.target.classList.toggle('content__like_active');
});
};

//дефолтный загрузчик контента
initialCards.forEach( (content) => {
  cardContent = createCard(content.name, content.link);
  contentList.append(cardContent);
});


//редактирование имени и информации о себе
formSubmitHandler = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  buttonClose(formEditProfile);
};

//загрузчик popup, профильное описание
profileOpen = () => {
  buttonOpen(formEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
};


//popup контент open
contentOpen = () => {
  buttonOpen(formAddContent);
  placeInput.value = '';
  pictureInput.value = '';
}


//добавление контента в popap
formContent = (e) => {
  e.preventDefault();
  const cardContent = createCard(placeInput.value, pictureInput.value);
  contentList.prepend(cardContent)
  buttonClose(formAddContent);
};

//открытие popup
buttonOpen = (popup) => {
  popup.classList.add('popup_opened');
};

//закрытие popup
buttonClose = (popup) => {
  popup.classList.remove('popup_opened');
};


formEditProfile.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', profileOpen);
formAddContent.addEventListener('submit', formContent);
contentButton.addEventListener('click', contentOpen);
closeButtonProfile.addEventListener('click',() => {
  buttonClose(formEditProfile);
  });
closeButtonContent.addEventListener('click',() => {
  buttonClose(formAddContent);
  });
closeButtonPicture.addEventListener('click',() => {
  buttonClose(contentOpenPicture);
});