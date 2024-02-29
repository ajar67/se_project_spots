const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const editButton = document.querySelector(".profile__edit-button");
const profileModal = document.getElementById("profile-popup");
const closeModal = profileModal.querySelector(".modal__button-reset");
const nameInput = profileModal.querySelector("#name");
const descriptionInput = profileModal.querySelector("#description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formSubmit = profileModal.querySelector(".modal__form");
const template = document.getElementById("template").content;
const cardsList = document.querySelector(".cards__list");

function handleOpenModal() {
  profileModal.classList.add("modal_opened");
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleCloseModal() {
  profileModal.classList.remove("modal_opened");
}

editButton.addEventListener("click", handleOpenModal);
closeModal.addEventListener("click", handleCloseModal);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  handleCloseModal();
}

formSubmit.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;
  return cardElement;
}
initialCards.forEach((card) => {
  const newCard = getCardElement(card);
  cardsList.appendChild(newCard);
});
