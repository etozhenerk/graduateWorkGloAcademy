
const togglePopUp = () => {
  const callbackBtn = document.querySelectorAll(".callback-btn"),
    modalOverlay = document.querySelector(".modal-overlay"),
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

  callbackBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".modal-close") || target.matches(".modal-overlay")) {
      closePopup();
    }
    if(target.closest('.services-elements .element')){
      e.preventDefault();
      openPopup();
    }
  });
};


export default togglePopUp;