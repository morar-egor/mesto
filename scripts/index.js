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
  const card = contentTemplate.content.querySelector('.content__info').cloneNode(true);
  card.querySelector('.content__name').textContent = name;
  card.querySelector('.content__picture').src = link;
  card.querySelector('.content__picture').alt = name;
  removeCard(card);
  openPicture(card);
  likeCard(card);
  return card;
};

//удаление контента
removeCard = (content) => {
  content.querySelector('.content__remove').addEventListener('click', (e) => {
    const cardItem = e.target.closest('.content__info');
    cardItem.remove(card);
  });
};

//просмотр картиник
openPicture = (content) => {
  content.querySelector('.content__picture').addEventListener('click', (e) => {
    viewingPicture.src = e.target.getAttribute('src');
    viewingPicture.alt = e.target.getAttribute('alt');
    pictureDescription.textContent = viewingPicture.alt;
    openPopup(popupPicture);
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
  card = createCard(content.name, content.link);
  contentList.append(card);
});


//редактирование имени и информации о себе
handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//импут -> open popup profile
openPopupEditProfile = () => {
  jobInput.value = profileBio.textContent;
  nameInput.value = profileName.textContent;
  openPopup(popupEditProfile);
};


//popup контент open
openPopupAddContent = () => {
  placeInput.value = '';
  pictureInput.value = '';
  openPopup(popupAddContent);
}


//добавление контента в popup
handleContentFormSubmit = (e) => {
  e.preventDefault();
  const card = createCard(placeInput.value, pictureInput.value);
  contentList.prepend(card)
  closePopup(popupAddContent);
};

//открытие popup
openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//закрытие popup
closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};


popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
profileButton.addEventListener('click', openPopupEditProfile);
popupAddContent.addEventListener('submit',  handleContentFormSubmit);
contentButton.addEventListener('click', openPopupAddContent);
closeButtonProfile.addEventListener('click',() => {
  closePopup(popupEditProfile);
});
closeButtonContent.addEventListener('click',() => {
  closePopup(popupAddContent);
});
closeButtonPicture.addEventListener('click',() => {
  closePopup(popupPicture);
});