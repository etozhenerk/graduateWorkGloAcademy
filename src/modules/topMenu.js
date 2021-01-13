const animateTopMenu = () => {
  const topMenu = document.querySelector(".top-menu");
  topMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target.matches("a")) {
      e.preventDefault();
      const blockID = target.getAttribute("href");
      const block = document.querySelector(blockID);
      block.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
};
export default animateTopMenu;
