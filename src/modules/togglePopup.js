const togglePopUp = () => {
  const modalOverlay = document.querySelector(".modal-overlay"),
    modalCallback = document.querySelector(".modal-callback"),
    body = document.querySelector("body");

  const openPopup = () => {
    modalOverlay.style.display = "block";
    modalCallback.style.display = "block";
  };

  const closePopup = () => {
    modalOverlay.style.display = "none";
    modalCallback.style.display = "none";
  };

  body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".modal-close") || target.matches(".modal-overlay")) {
      closePopup();
    }
    if (
      target.closest(".services-elements .element") ||
      target.matches(".button-services") ||
      target.matches(".callback-btn")
    ) {
      e.preventDefault();
      openPopup();
    }
  });
};

export default togglePopUp;
