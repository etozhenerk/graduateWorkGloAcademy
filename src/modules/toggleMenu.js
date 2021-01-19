const toggleMenu = () => {
  const mobileMenu = document.querySelector(".mobile-menu"),
    body = document.querySelector("body");

  const handlerMenu = () => {
    mobileMenu.classList.toggle("open");
  };

  body.addEventListener("click", (event) => {
    let target = event.target;
    target = target.closest(".mob-menu-btn");
    if (target) {
      handlerMenu();
    } else {
      target = event.target;
      if (
        (target.classList.contains("mobile-menu-close") ||
          target.classList.contains("callback-btn") ||
          !target.closest(".mobile-menu")) &&
        mobileMenu.classList.contains("open")
      ) {
        handlerMenu();
      } else {
        target = target.closest(".mobile-menu li");
        if (target) {
          handlerMenu();
          event.preventDefault();
          const blockID = target.firstChild.getAttribute("href");
          const block = document.querySelector(blockID);
          block.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  });
};

export default toggleMenu;
