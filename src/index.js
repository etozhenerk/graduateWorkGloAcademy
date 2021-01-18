"use strict";
import togglePopUp from './modules/togglePopUp';
import animateTopMenu from './modules/topMenu';
import slider from './modules/slider';
import accordeon from './modules/accordeon';
import servicesCarousel from './modules/servicesCarousel';
import upButton from './modules/upButton';
import Validator from './modules/validator';

togglePopUp();
animateTopMenu();
slider();
accordeon();
upButton();


const options = {
  main: '.services-elements', 
  wrap: '.services-carousel',
  prev: '.arrow-left',
  next: '.arrow-right',
  slidesToShow: 3,
  infinity: true,
  responsive: [{
    breakpoint: 1024,
    slideToShow: 2
  },
  {
    breakpoint: 576,
    slideToShow: 1
  }]
}

const carousel = new servicesCarousel(options);

carousel.init();

const validForm = new Validator({
  selector: "form[name=form-callback]",
  popupSelector: ".modal-callback",
  overlay: ".modal-overlay",
  pattern: {
    name: /^[а-я]+$/i
  },
  method: {
    'form-tel': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'form-name': [
      ['notEmpty'],
      ['pattern', 'name']
    ]
  }
});

validForm.init();