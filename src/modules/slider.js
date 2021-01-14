const slider = () => {
  const slides = document.querySelectorAll(".item"),
    slider = document.querySelector(".top-slider");

    let dots = document.createElement("div");
    dots.classList.add("slick-dots");
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement("li");
    if(i === 0){
      dot.classList.add("slick-active");
    }
    dots.append(dot);
    }
  const dot = dots.querySelectorAll("li");
  let currentSlide = 0,
    interval;

  const prevSlide = (elem, index, strSlide) => {
    if(strSlide){
      elem[index].classList.remove(strSlide);
    }else{
      elem[index].style.display = "none";
    }
 
  };
  const nextSlide = (elem, index, strSlide) => {
    if(strSlide){
      elem[index].classList.add(strSlide);
    }else{
    elem[index].style.display = "block";
    }
  };
  const autoPlaySlide = () => {
    prevSlide(slides, currentSlide);
    prevSlide(dot, currentSlide, "slick-active");
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }
    nextSlide(slides, currentSlide);
    nextSlide(dot, currentSlide, "slick-active");
  };
  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };
  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (e) => {
  
    let target = e.target;

    if (target.tagName === "LI") {
      prevSlide(slides, currentSlide);
      prevSlide(dot, currentSlide, "slick-active");

        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });

      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }
      nextSlide(slides, currentSlide);
      nextSlide(dot, currentSlide, "slick-active");
    }
  });

  slider.addEventListener("mouseover", (e) => {
    if (
      e.target.tagName === "LI"
    ) {
      stopSlide();
    }
  });
  slider.addEventListener("mouseout", (e) => {
    if (
      e.target.tagName === "LI"
    ) {
      startSlide();
    }
  });

  startSlide();
};

export default slider;
