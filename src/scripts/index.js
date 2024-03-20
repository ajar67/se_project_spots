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

////////////////////////////////////////////CONSTANTS/////////////////////////////////////////////////////////////

function initializeModals(modalID) {
  const modal = document.getElementById(modalID);
  const formSubmit = modal.querySelector(".modal__form");
  if (modalID === "profile-popup") {
    const descriptionInput = modal.querySelector("#description");
    const nameInput = modal.querySelector("#name");
    return { modal, descriptionInput, nameInput, formSubmit };
  }
  if (modalID === "card-popup") {
    const linkInput = modal.querySelector("#link");
    const captionInput = modal.querySelector("#caption");
    return { modal, linkInput, captionInput, formSubmit };
  }
}
const profileModal = initializeModals("profile-popup");
const cardModal = initializeModals("card-popup");

//////////////////////////this is all query selectors on the document itself///////////////////////////////////////
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".cards__list");
const template = document.getElementById("template").content;

const resetButtons = document.querySelectorAll(".modal__button-reset");

//////////////////////////////////////FUNCTIONS////////////////////////////////////////////////////////////////////

function getCardElement(data) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteCardButton = cardElement.querySelector(".card__trash-button");
  const likeCardButton = cardElement.querySelector(".card__button");
  deleteCardButton.addEventListener("click", () => cardElement.remove());
  //likeCardButton.addEventListener("click", () => cardElement.classList.add(".card__button-liked")); if/else to take care of functionality
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;
  return cardElement;
}

initialCards.forEach((card) => {
  const newCard = getCardElement(card);
  cardsList.appendChild(newCard);
});

function handleOpenModal(modal) {
  modal.classList.add("modal_opened");
}

function handleCloseModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleOpenProfileModal() {
  handleOpenModal(profileModal.modal);
  profileModal.nameInput.value = profileTitle.textContent;
  profileModal.descriptionInput.value = profileDescription.textContent;
}

////////////////////////////////////////////EVENT LISTENERS//////////////////////////////////////////////////////////

editButton.addEventListener("click", () =>
  handleOpenProfileModal(profileModal.modal)
);
addButton.addEventListener("click", () => handleOpenModal(cardModal.modal));

resetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleCloseModal(profileModal.modal);
    handleCloseModal(cardModal.modal);
  });
});

///////////////////////////////////////////FUNCTIONS FOR ALL FORM SUBMISSIONS/////////////////////////////////////////

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModal.nameInput.value;
  profileDescription.textContent = profileModal.descriptionInput.value;
  handleCloseModal(profileModal.modal);
}
profileModal.formSubmit.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const addingCard = getCardElement({
    link: cardModal.linkInput.value,
    name: cardModal.captionInput.value,
  });
  cardsList.prepend(addingCard);
  handleCloseModal(cardModal.modal);
}
cardModal.formSubmit.addEventListener("submit", handleAddCardFormSubmit);

/////////////////////////////////////FUNCTIONS FOR LIKE BUTTON AND TRASH BUTTON////////////////////////////////////////

