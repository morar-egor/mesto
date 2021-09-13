import Card  from './Card.js';
import FormValidator  from './FormValidator.js';
import { initialCards } from './initialCards.js';


//Объявление переменной
const popups = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddContent = document.querySelector('.popup_type_add-content');
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
const popupPicture = document.querySelector('.popup_type_picture');

const object = {
  //formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClassActive: 'popup__input-error_active',
};

const formValidatorEditProfile = new FormValidator(object, popupEditProfile);
const formValidatorAddContent = new FormValidator(object, popupAddContent);

//создаем форму карточки контента
const createCard = (name, link, content) => {
  const card = new Card(name, link, content);
  const cardElement = card.generateCard();
  document.querySelector('.content__list').prepend(cardElement);
};

//дефолтный загрузчик контента
initialCards.forEach((content) => {
  createCard(content.name, content.link, '.content__template');
});

//добавление контента в popup
const handleContentFormSubmit = (e) => {
  e.preventDefault();
  createCard(placeInput.value, pictureInput.value, '.content__template');
  closePopup(popupAddContent);
};

//редактирование имени и информации о себе
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

//импут -> open popup profile
const openPopupEditProfile = () => {
  jobInput.value = profileBio.textContent;
  nameInput.value = profileName.textContent;
  formValidatorEditProfile.resetForm();
  openPopup(popupEditProfile);
};

//popup контент open
const openPopupAddContent = () => {
  placeInput.value = '';
  pictureInput.value = '';
  formValidatorAddContent.resetForm();
  openPopup(popupAddContent);
}

//открытие popup
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHanlker);
};

//закрытие popup
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHanlker);
};

//закрытие popup ecs
const keyHanlker = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
};

//закрытие popup overlay
const closeOverlay = (popup) =>{
  if (popup.target.classList.contains('popup_opened')) {
    closePopup(popup.target);
  };
};


popupEditProfile.addEventListener('mousedown', closeOverlay);
popupPicture.addEventListener('mousedown', closeOverlay);
popupAddContent.addEventListener('mousedown', closeOverlay);

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

formValidatorEditProfile.enableValidation();
formValidatorAddContent.enableValidation();