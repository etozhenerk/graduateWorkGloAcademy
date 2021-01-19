const upButton = () => {
  const up = document.querySelector('.up');

  up.style.display = "none";

  up.addEventListener('click', () => {
    document.querySelector('body').scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  window.addEventListener('scroll', () => {
    if(pageYOffset < 600){
      up.style.display = "none";
    }else{
      up.style.display = "block";
    }
  });
};

export default upButton;