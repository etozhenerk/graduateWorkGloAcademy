class Validator {
  constructor({ selector, popupSelector, overlay, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.popup = document.querySelector(popupSelector);
    this.overlay = document.querySelector(overlay);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter((item) => {
      return (
        item.tagName.toLowerCase() !== "button" &&
        item.type !== "button" &&
        item.type !== "submit"
      );
    });
    this.oauthData = JSON.parse(localStorage.getItem("oauthData"));
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
        const contactData = {};
        formData.forEach((val, key) => {
          contactData[key] = val;
        });
        const url = "https://etozhenerkv14.amocrm.ru/oauth2/access_token";
        const body = {
          client_id: "6ec7e050-6047-4a3a-be76-e85485ec9c2b",
          client_secret:
            "R0Uky8HzMxUSY6y4kv0YN3N5KZqnmDzcCwbfXskJjNmyupJDrbG9jHWp7HCuECA9",
          grant_type: "refresh_token",
          refresh_token: this.oauthData.refresh_token,
          redirect_uri: "https://google.com",
        };

        this.postData(url, body)
          .then((response) => response.json())
          .then((data) => {
            this.oauthData = data;
            localStorage.setItem("oauthData", JSON.stringify(data));
          })
          .then(() => {
            const url = "https://etozhenerkv14.amocrm.ru/api/v4/leads/complex";
            const body = [
              {
                name: "Заявка с сайта",
                _embedded: {
                  contacts: [
                    {
                      first_name: `${contactData.firstname}`,
                      last_name: `${contactData.surname}`,
                      responsible_user_id: 6640342,
                      custom_fields_values: [
                        {
                          field_id: 670587,
                          values: [
                            {
                              enum_id: 984107,
                              value: `${contactData.email}`,
                            },
                          ],
                        },
                        {
                          field_id: 670585,
                          values: [
                            {
                              enum_id: 984095,
                              value: `${contactData.tel}`,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                responsible_user_id: 6640342,
                status_id: 40243642,
                pipeline_id: 3870481,
              },
            ];
            return this.postData(url, body, this.oauthData.access_token);
          })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network not 200");
            }
            this.sendForm("Спасибо! Мы скоро с вами свяжемся!");
            return response.json();
          })
          .then((data) => {
            const urlTask = "https://etozhenerkv14.amocrm.ru/api/v4/tasks";
            const dateNow = new Date();
            if (dateNow.getHours >= 18) {
              dateNow.setHours(9);
            }
            const completeTill = Math.floor((+dateNow + 345600000 )/ 1000);
            const bodyTask = [
              {
                task_type_id: 1,
                text: `Связаться с клиентом ${contactData.firstname} ${contactData.surname} по номеру ${contactData.tel}`,
                complete_till: completeTill,
                entity_id: data[0].contact_id,
                entity_type: "contacts",
                request_id: "example",
              },
            ];

            const productId = +this.popup.dataset.id;
            if(productId){
              const urlProduct = `https://etozhenerkv14.amocrm.ru/api/v4/leads/${data[0].id}/link`;
              const bodyProduct = [
                {
                  to_entity_id: productId,
                  to_entity_type: "catalog_elements",
                  metadata: {
                    quantity: 1,
                    catalog_id: 15211,
                  },
                },
              ];

              this.postData(urlProduct, bodyProduct, this.oauthData.access_token)
              .then((response) => {
                if (response.status !== 200) {
                  throw new Error("status network not 200");
                }
              })
              .catch((err) => console.log(err));
            }
            


            this.postData(urlTask, bodyTask, this.oauthData.access_token)
              .then((response) => {
                if (response.status !== 200) {
                  throw new Error("status network not 200");
                }
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            this.sendForm("Что-то пошло не так...");
            console.error(error);
          });
        this.elementsForm.forEach((elem) => {
          elem.value = "";
        });
        setTimeout(() => {
          this.overlay.style.display = "none";
          this.popup.style.display = "none";
        }, 4000);
      }
    });
  }

  postData(url, body, token) {
    if (token) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
    } else {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
  }
  sendForm(message) {
    if (this.form.lastElementChild.classList.contains("statusMessage")) {
      this.form.lastChild.textContent = message;
      setTimeout(() => {
        this.form.lastChild.remove();
        this.elementsForm.forEach((elem) => elem.classList.remove("seccess"));
      }, 4000);
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
