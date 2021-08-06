//Объявление переменной
const page = document.querySelector('.page');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddContent = document.querySelector('.popup_type_add-content');
const popupPicture = document.querySelector('.popup_type_picture');
const viewingPicture = document.querySelector('.popup__image');
const profileButton = document.querySelector('.profile__button');
const contentButton = document.querySelector('.profile__content');
const closeButtonProfile = document.querySelector('.popup__close_type_edit-profile');
const closeButtonContent = document.querySelector('.popup__close_type_add-content');
const closeButtonPicture = document.querySelector('.popup__close_type_picture');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const placeInput = document.querySelector('.popup__input_type_place');
const pictureInput = document.querySelector('.popup__input_type_picture');
const contentTemplate = document.querySelector('#content__template');
const contentList = document.querySelector('.content__list');
const pictureDescription = document.querySelector('.popup__picture-description');

//контент при открытии страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
  likeCard(cardContent);
  return cardContent;
};

//удаление контента
removeCard = (content) => {
  content.querySelector('.content__remove').addEventListener('click', (e) => {
    const cardItem = e.target.closest('.content__info');
    cardItem.remove(cardContent);
  });
};

//просмотр картиник
openPicture = (content) => {
  content.querySelector('.content__picture').addEventListener('click', (e) => {
    viewingPicture.src = e.target.getAttribute('src');
    viewingPicture.alt = e.target.getAttribute('alt');
    pictureDescription.textContent = viewingPicture.alt;
    buttonOpen(popupPicture);
  });
};

//поставить и убрать лайк
likeCard = (content) => {
  content.querySelector('.content__like').addEventListener('click', (e) => {
    e.target.classList.toggle('content__like_active');
  });
};

//дефолтный загрузчик контента
initialCards.forEach((content) => {
  cardContent = createCard(content.name, content.link);
  contentList.append(cardContent);
});


//редактирование имени и информации о себе
formSubmitProfile = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  buttonClose(popupEditProfile);
};

//импут в popup профиля
popupProfile = () => {
  buttonOpen(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
};


//popup контент open
popupContent = () => {
  placeInput.value = '';
  pictureInput.value = '';
  buttonOpen(popupAddContent);
}


//добавление контента в popup
formContent = (e) => {
  e.preventDefault();
  const cardContent = createCard(placeInput.value, pictureInput.value);
  contentList.prepend(cardContent)
  buttonClose(popupAddContent);
};

//открытие popup
buttonOpen = (popup) => {
  popup.classList.add('popup_opened');
};

//закрытие popup
buttonClose = (popup) => {
  popup.classList.remove('popup_opened');
};


popupEditProfile.addEventListener('submit', formSubmitProfile);
profileButton.addEventListener('click', popupProfile);
popupAddContent.addEventListener('submit', formContent);
contentButton.addEventListener('click', popupContent);
closeButtonProfile.addEventListener('click',() => {
  buttonClose(popupEditProfile);
});
closeButtonContent.addEventListener('click',() => {
  buttonClose(popupAddContent);
});
closeButtonPicture.addEventListener('click',() => {
  buttonClose(popupPicture);
});