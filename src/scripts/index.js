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

////////////////////////////////////////////////////////CONSTANTS////////////////////////////////////////////////////////////////////

////////////////initializes all modals///////////////////////

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
  if (modalID === "picture-popup") {
    const imagePopup = modal.querySelector(".modal__image-clicked");
    const textPopup = modal.querySelector(".modal__image-text");
    return { modal, imagePopup, textPopup };
  }
}
const profileModal = initializeModals("profile-popup");
const cardModal = initializeModals("card-popup");
const pictureModal = initializeModals("picture-popup");

/////////////this is all query selectors on the document itself//////////////
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const cardsList = document.querySelector(".cards__list");
const template = document.getElementById("template").content;
const resetButtons = document.querySelectorAll("#reset-button");

/////////////////////////////////////////////FUNCTIONS////////////////////////////////////////////////////////////////////

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

function getCardElement(data) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteCardButton = cardElement.querySelector(".card__trash-button");
  const likeCardButton = cardElement.querySelector(".card__button");
  cardImage.addEventListener("click", (evt) => {
    pictureModal.imagePopup.src = evt.target.src;
    pictureModal.imagePopup.alt = evt.target.alt;
    pictureModal.textPopup.textContent = evt.target.alt;
    handleOpenModal(pictureModal.modal);
  });
  deleteCardButton.addEventListener("click", () => cardElement.remove());
  likeCardButton.addEventListener("click", () =>
    likeCardButton.classList.toggle("card__button-liked")
  );
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;
  return cardElement;
}

function renderCard(card, method = "prepend") {
  const newCard = getCardElement(card);
  cardsList[method](newCard);
}

initialCards.forEach((card) => {
  renderCard(card, "append");
});

////////////////////////////////////////////EVENT LISTENERS//////////////////////////////////////////////////////////

editButton.addEventListener("click", () =>
  handleOpenProfileModal(profileModal.modal)
);
addButton.addEventListener("click", () => handleOpenModal(cardModal.modal));

resetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".modal");
    handleCloseModal(popup);
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
  renderCard({
    link: cardModal.linkInput.value,
    name: cardModal.captionInput.value,
  });
  cardModal.linkInput.value = "";
  cardModal.captionInput.value = "";
  handleCloseModal(cardModal.modal);
}
cardModal.formSubmit.addEventListener("submit", handleAddCardFormSubmit);
