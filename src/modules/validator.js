class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter((item) => {
      return item.tagName.toLowerCase() !== "button" && item.type !== "button" && item.type !== "submit";
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach((elem) =>
      elem.addEventListener("change", this.checkIt.bind(this))
    );
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.form.lastElementChild.classList.contains("statusMessage")) {
        this.form.lastChild.remove();
      }
      this.elementsForm.forEach((elem) => this.checkIt({ target: elem }));
      if (!this.error.size) {
        this.sendForm("Загрузка...");
        const formData = new FormData(this.form);
        let body = {};

        formData.forEach((val, key) => {
          body[key] = val;
        });
        this.postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network not 200");
            }
            this.sendForm("Спасибо! Мы скоро с вами свяжемся!");
          })
          .catch((error) => {
            this.sendForm("Что-то пошло не так...");
            console.error(error);
          });
        this.elementsForm.forEach((elem) => {
          elem.value = "";
        });
       
      }
    });
  }

  postData(body) {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  sendForm(message) {
    if (this.form.lastElementChild.classList.contains("statusMessage")) {
      this.form.lastChild.textContent = message;
      setTimeout(() => {
        this.form.lastChild.remove();
      }, 5000);
    } else {
      const statusMessage = document.createElement("div");
      statusMessage.classList.add("statusMessage");
      statusMessage.style.cssText = `
      font-size: 2rem;
      color:green`;

      this.form.appendChild(statusMessage);
      statusMessage.textContent = message;
    }

    

  }
  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value === "") {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };
    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every((item) =>
          validatorMethod[item[0]](elem, this.pattern[item[1]])
        );
      } else {
        console.warn(
          "Необъодимо передать id полей ввода и методы проверки этих полей"
        );
      }
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSeccess(target);
      this.error.delete(target);
    } else {
      this.showEror(target);
      this.error.add(target);
    }
  }

  showEror(elem) {
    elem.classList.remove("seccess");
    elem.classList.add("error");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Ошибка в этом поле";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }

  showSeccess(elem) {
    elem.classList.remove("error");
    elem.classList.add("seccess");
    if (
      elem.nextElementSibling &&
      elem.nextElementSibling.classList.contains("validator-error")
    ) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
    input.seccess {
      border: 2px solid green !important;
    }
    input.error {
      border: 2px solid red !important;
    }
    .validator-error {
      font-size: 12px ;
      font-family: sans-serif;
      color: red;
    }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}


export default Validator;