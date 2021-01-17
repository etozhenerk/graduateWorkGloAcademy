(()=>{"use strict";function e(e,n){if(e){if("string"==typeof e)return t(e,n);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}const o=function(){function o(e){var t=e.main,n=e.wrap,r=e.prev,i=e.next,s=e.infinity,a=void 0!==s&&s,l=e.position,c=void 0===l?0:l,d=e.slidesToShow,u=void 0===d?3:d,h=e.responsive,m=void 0===h?[]:h;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),t&&n||console.warn('slider-carouser: Необходимо 2 свойства,  "main" и "wrap"!'),this.main=document.querySelector(t),this.wrap=document.querySelector(n),this.slides=document.querySelector(n).children,this.next=document.querySelector(i),this.prev=document.querySelector(r),this.slidesToShow=u,this.options={position:c,infinity:a,widthSlide:Math.floor(100/this.slidesToShow),maxPosition:this.slides.length-this.slidesToShow},this.responsive=m}var r,i;return r=o,(i=[{key:"init",value:function(){this.addGloClass(),this.addStyle(),this.responsive&&this.responseInit(),this.prev&&this.next||this.addArrow(),this.controlSlider()}},{key:"addGloClass",value:function(){this.main.classList.add("glo-slider"),this.wrap.classList.add("glo-slider__wrap");var t,n=function(t,n){var o;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(o=e(t))){o&&(t=o);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,l=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var e=o.next();return a=e.done,e},e:function(e){l=!0,s=e},f:function(){try{a||null==o.return||o.return()}finally{if(l)throw s}}}}(this.slides);try{for(n.s();!(t=n.n()).done;)t.value.classList.add("glo-slider__item")}catch(e){n.e(e)}finally{n.f()}}},{key:"addStyle",value:function(){var e=document.getElementById("sliderCarousel-style");e||((e=document.createElement("style")).id="sliderCarousel-style"),e.textContent="\n      .glo-slider {\n        overflow: hidden !important;\n      }\n      .glo-slider__wrap {\n        display: flex !important;\n        transition: transform 0.5s !important;\n        will-change: transform !important;\n      }\n      .glo-slider__item {\n        display: flex !important;\n        align-items: center !important;\n        justify-content: center !important;\n        flex: 0 0 ".concat(this.options.widthSlide,"% !important;\n        margin: auto 0 !important;\n      }\n    "),document.head.appendChild(e)}},{key:"controlSlider",value:function(){this.prev.addEventListener("click",this.prevSlider.bind(this)),this.next.addEventListener("click",this.nextSlider.bind(this))}},{key:"prevSlider",value:function(){(this.options.infinity||this.options.position>0)&&(--this.options.position,this.options.position<0&&(this.options.position=this.options.maxPosition),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"nextSlider",value:function(){(this.options.infinity||this.options.position<this.options.maxPosition)&&(++this.options.position,this.options.position>this.options.maxPosition&&(this.options.position=0),this.wrap.style.transform="translateX(-".concat(this.options.position*this.options.widthSlide,"%)"))}},{key:"addArrow",value:function(){this.prev=document.createElement("button"),this.next=document.createElement("button"),this.prev.className="glo-slider__prev",this.next.className="glo-slider__next",this.main.appendChild(this.prev),this.main.appendChild(this.next);var e=document.createElement("style");e.textContent="\n      .glo-slider__prev,\n      .glo-slider__next {\n        margin: 0 10px;\n        border: 20px solid transparent;\n        background-color: transparent;\n        cursor: pointer;\n      }\n      .glo-slider__next {\n        border-left-color: #19b5fe;\n      }\n      .glo-slider__prev {\n        border-right-color: #19b5fe;\n      }\n      .glo-slider__prev:hover,\n      .glo-slider__next:hover,\n      .glo-slider__prev:focus,\n      .glo-slider__next:focus {\n        background: transpatent;\n        outline: transparent;\n      }\n    ",document.head.appendChild(e)}},{key:"responseInit",value:function(){var n,o=this,r=this.slidesToShow,i=this.responsive.map((function(e){return e.breakpoint})),s=Math.max.apply(Math,function(e){if(Array.isArray(e))return t(e)}(n=i)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(n)||e(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=function(){var e=document.documentElement.clientWidth;if(e<s)for(var t=0;t<i.length;t++)e<i[t]&&(o.slidesToShow=o.responsive[t].slideToShow,o.options.widthSlide=Math.floor(100/o.slidesToShow),o.options.maxPosition=o.slides.length-o.slidesToShow,o.addStyle());else o.slidesToShow=r,o.options.widthSlide=Math.floor(100/o.slidesToShow),o.options.maxPosition=o.slides.length-o.slidesToShow,o.addStyle()};a(),window.addEventListener("resize",a)}}])&&n(r.prototype,i),o}();function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}const s=function(){function e(t){var n,o=t.selector,i=t.pattern,s=void 0===i?{}:i,a=t.method;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.form=document.querySelector(o),this.pattern=s,this.method=a,this.elementsForm=(n=this.form.elements,function(e){if(Array.isArray(e))return r(e)}(n)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(n)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).filter((function(e){return"button"!==e.tagName.toLowerCase()&&"button"!==e.type&&"submit"!==e.type})),this.error=new Set}var t,n;return t=e,(n=[{key:"init",value:function(){var e=this;this.applyStyle(),this.setPattern(),this.elementsForm.forEach((function(t){return t.addEventListener("change",e.checkIt.bind(e))})),this.form.addEventListener("submit",(function(t){if(t.preventDefault(),e.form.lastElementChild.classList.contains("statusMessage")&&e.form.lastChild.remove(),e.elementsForm.forEach((function(t){return e.checkIt({target:t})})),!e.error.size){e.sendForm("Загрузка...");var n=new FormData(e.form),o={};n.forEach((function(e,t){o[t]=e})),e.postData(o).then((function(t){if(200!==t.status)throw new Error("status network not 200");e.sendForm("Спасибо! Мы скоро с вами свяжемся!")})).catch((function(t){e.sendForm("Что-то пошло не так..."),console.error(t)})),e.elementsForm.forEach((function(e){e.value=""}))}}))}},{key:"postData",value:function(e){return fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}},{key:"sendForm",value:function(e){var t=this;if(this.form.lastElementChild.classList.contains("statusMessage"))this.form.lastChild.textContent=e,setTimeout((function(){t.form.lastChild.remove()}),5e3);else{var n=document.createElement("div");n.classList.add("statusMessage"),n.style.cssText="\n      font-size: 2rem;\n      color:green",this.form.appendChild(n),n.textContent=e}}},{key:"isValid",value:function(e){var t=this,n={notEmpty:function(e){return""!==e.value},pattern:function(e,t){return t.test(e.value)}};if(this.method){var o=this.method[e.id];if(o)return o.every((function(o){return n[o[0]](e,t.pattern[o[1]])}));console.warn("Необъодимо передать id полей ввода и методы проверки этих полей")}return!0}},{key:"checkIt",value:function(e){var t=e.target;this.isValid(t)?(this.showSeccess(t),this.error.delete(t)):(this.showEror(t),this.error.add(t))}},{key:"showEror",value:function(e){if(e.classList.remove("seccess"),e.classList.add("error"),!e.nextElementSibling||!e.nextElementSibling.classList.contains("validator-error")){var t=document.createElement("div");t.textContent="Ошибка в этом поле",t.classList.add("validator-error"),e.insertAdjacentElement("afterend",t)}}},{key:"showSeccess",value:function(e){e.classList.remove("error"),e.classList.add("seccess"),e.nextElementSibling&&e.nextElementSibling.classList.contains("validator-error")&&e.nextElementSibling.remove()}},{key:"applyStyle",value:function(){var e=document.createElement("style");e.textContent="\n    input.seccess {\n      border: 2px solid green !important;\n    }\n    input.error {\n      border: 2px solid red !important;\n    }\n    .validator-error {\n      font-size: 12px ;\n      font-family: sans-serif;\n      color: red;\n    }\n    ",document.head.appendChild(e)}},{key:"setPattern",value:function(){this.pattern.phone||(this.pattern.phone=/^\+?[78]([-()]*\d){10}$/),this.pattern.email||(this.pattern.email=/^\w+@\w+\.\w{2,}$/)}}])&&i(t.prototype,n),e}();var a,l,c,d,u,h;u=document.querySelector(".modal-overlay"),h=document.querySelector(".modal-callback"),document.querySelector("body").addEventListener("click",(function(e){var t=e.target;(t.closest(".modal-close")||t.matches(".modal-overlay"))&&(u.style.display="none",h.style.display="none"),(t.closest(".services-elements .element")||t.matches(".button-services")||t.matches(".callback-btn"))&&(e.preventDefault(),u.style.display="block",h.style.display="block")})),document.querySelector(".top-menu").addEventListener("click",(function(e){var t=e.target;if(t.matches("a")){e.preventDefault();var n=t.getAttribute("href");document.querySelector(n).scrollIntoView({behavior:"smooth",block:"start"})}})),function(){var e=document.querySelectorAll(".item"),t=document.querySelector(".top-slider"),n=document.createElement("div");n.classList.add("slick-dots"),t.append(n);for(var o=0;o<e.length;o++){var r=document.createElement("li");0===o&&r.classList.add("slick-active"),n.append(r)}var i,s=n.querySelectorAll("li"),a=0,l=function(e,t,n){n?e[t].classList.remove(n):e[t].style.display="none"},c=function(e,t,n){n?e[t].classList.add(n):e[t].style.display="block"},d=function(){l(e,a),l(s,a,"slick-active"),++a>=e.length&&(a=0),c(e,a),c(s,a,"slick-active")},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3e3;i=setInterval(d,e)};t.addEventListener("click",(function(t){var n=t.target;"LI"===n.tagName&&(l(e,a),l(s,a,"slick-active"),s.forEach((function(e,t){e===n&&(a=t)})),a>=e.length&&(a=0),a<0&&(a=e.length-1),c(e,a),c(s,a,"slick-active"))})),t.addEventListener("mouseover",(function(e){"LI"===e.target.tagName&&clearInterval(i)})),t.addEventListener("mouseout",(function(e){"LI"===e.target.tagName&&u()})),u()}(),l=document.querySelector(".accordeon"),c=l.querySelectorAll(".element"),d=l.querySelectorAll(".element-content"),l.addEventListener("click",(function(e){var t=e.target.closest(".element");t&&(t.classList.contains("active")?(t.classList.remove("active"),t.querySelector(".element-content").style.display="none"):c.forEach((function(e,n){e.classList.remove("active"),d[n].style.display="none",e===t&&(e.classList.add("active"),d[n].style.display="block")})))})),(a=document.querySelector(".up")).addEventListener("click",(function(){document.querySelector("body").scrollIntoView({behavior:"smooth",block:"start"})})),window.addEventListener("scroll",(function(){pageYOffset<600?a.style.display="none":a.style.display="block"})),new o({main:".services-elements",wrap:".services-carousel",prev:".arrow-left",next:".arrow-right",slidesToShow:3,infinity:!0,responsive:[{breakpoint:1024,slideToShow:2},{breakpoint:576,slideToShow:1}]}).init(),new s({selector:"form[name=form-callback]",pattern:{name:/^[а-я]+$/i},method:{"form-tel":[["notEmpty"],["pattern","phone"]],"form-name":[["notEmpty"],["pattern","name"]]}}).init()})();