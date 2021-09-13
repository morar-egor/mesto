import openPopup  from './index.js';
export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.content__info')
    .cloneNode(true);
    return cardElement;
  }

  generateCard = () => {
    this._content = this._getTemplate();
    this._content.querySelector('.content__picture').alt = this._name;
    this._content.querySelector('.content__picture').src = this._link;
    this._content.querySelector('.content__name').textContent = this._name;
    this._likeCard = this._content.querySelector('.content__like');
    this._setEventListeners();
    return this._content;
  }

  _likeCard = () => {
    this._likeCard.classList.toggle('content__like_active');
  }

  _removeCard = () => {
    this._content.remove();
  }

  _openPicture = () => {
    const popupPicture = document.querySelector('.popup_type_picture');
    const viewingPicture = document.querySelector('.popup__image');
    viewingPicture.src = this._link;
    viewingPicture.alt = this._name;
    document.querySelector('.popup__picture-description').textContent = this._name;
    openPopup(popupPicture);
  }

  _setEventListeners() {
    this._likeCard.addEventListener('click', () => {
      this._likeCard();
    });

    this._content.querySelector('.content__remove').addEventListener('click', this._removeCard);

    this._content.querySelector('.content__picture').addEventListener('click', () => {
      this._openPicture();
    });
  }
};