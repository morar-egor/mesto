//Находим форму
let page = document.querySelector('.page');
let formElement = page.querySelector('.popup__form');
let popup = page.querySelector('.popup');
//Находим поля
let profileButton = page.querySelector('.profile__button');
let closeButton = page.querySelector('.popup__close');
let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_about');
let profileName = page.querySelector('.profile__name');
let profileBio = page.querySelector('.profile__bio');


//открытие popup->input
function buttonOpen () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
}


//закрытие popup
function buttonClose () {
  popup.classList.remove('popup_opened');
}


//редактирование имени и информации о себе
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  buttonClose ();
}

formElement.addEventListener('submit', formSubmitHandler);
profileButton.addEventListener('click', buttonOpen);
closeButton.addEventListener('click', buttonClose);