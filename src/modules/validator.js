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
            custom_fields_values: [
              {
                field_id: 1170789,
                values: [
                  {
                    value: "Поле текст",
                  },
                ],
              },
            ],
            status_id: 40243642,
            pipeline_id: 3870481,
            request_id: "qweasd",
          },
        ];

        this.postData(url, body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("status network not 200");
            }
            this.sendForm("Спасибо! Мы скоро с вами свяжемся!");
            return response.json();
          })
          .then((data) => {
            const url = "https://etozhenerkv14.amocrm.ru/api/v4/tasks";
            const body = [
              {
                task_type_id: 1,
                text: `Связаться с клиентом ${contactData.firstname} ${contactData.surname} по номеру ${contactData.tel}`,
                complete_till: Math.floor(Date.now() / 1000) + 14400,
                entity_id: data[0].contact_id,
                entity_type: "contacts",
                request_id: "example",
              },
            ];

            this.postData(url, body)
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
        }, 8000);
      }
    });
  }

  postData(url, body) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc0NGNmZDBhOWZlMDc1MGRhZjExODFiZDI5Y2IzODBkMjdiZDI3NzdmYTFmZGVkNWY3YTE3OGM4MWZiMDI2NmVjNTExOWMxM2UzYjdjMDQ3In0.eyJhdWQiOiI2ZWM3ZTA1MC02MDQ3LTRhM2EtYmU3Ni1lODU0ODVlYzljMmIiLCJqdGkiOiI3NDRjZmQwYTlmZTA3NTBkYWYxMTgxYmQyOWNiMzgwZDI3YmQyNzc3ZmExZmRlZDVmN2ExNzhjODFmYjAyNjZlYzUxMTljMTNlM2I3YzA0NyIsImlhdCI6MTYyNzk5MTE1NywibmJmIjoxNjI3OTkxMTU3LCJleHAiOjE2MjgwNzc1NTcsInN1YiI6IjY2NDAzNDIiLCJhY2NvdW50X2lkIjoyOTIyMzI3Nywic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImNybSIsIm5vdGlmaWNhdGlvbnMiXX0.OwLyYD0N5jqfkph4HjWzUFLrEHIWf2pe2zwX_4N6GYZ0_8EXTraFEddbGvYggzHXNPZPElPOb8AfhvZkEPAkfnzLhZvPI3VsnzJbij1BEEnRWoNqD30JQw5YayfeRzfalEzaZ6caHw90dM865RyVkG-XFhwQsGW-ohvVczZBgo8iLm6NEnYy-KBbAbd9snvE4avOlFUSYbdxPW9ujEbIoamV9TtJc-l9ph_RdyaTCJkNwpW2Bo6f96lOZykboIAQwjlWUFp8sgoVOx_Zw_veTtID9QTeMyd8Jqms8ATX0dw4hnI9oP7dPsL4koxRTIm2TSKgSxppdoIpRLcU5h-5HQ",
      },
      body: JSON.stringify(body),
    });
  }
  sendForm(message) {
    if (this.form.lastElementChild.classList.contains("statusMessage")) {
      this.form.lastChild.textContent = message;
      setTimeout(() => {
        this.form.lastChild.remove();
        this.elementsForm.forEach((elem) => elem.classList.remove("seccess"));
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
