
const togglePopUp = () => {
  const callbackBtn = document.querySelectorAll(".callback-btn"),
    modalOverlay = document.querySelector(".modal-overlay"),
    modalCallback = document.querySelector(".modal-callback"),
    body = document.querySelector("body");

  callbackBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modalOverlay.style.display = "block";
      modalCallback.style.display = "block";
    });
  });

  body.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".modal-close") || target.matches(".modal-overlay")) {
      modalOverlay.style.display = "none";
      modalCallback.style.display = "none";
    }
  });
};


export default togglePopUp;