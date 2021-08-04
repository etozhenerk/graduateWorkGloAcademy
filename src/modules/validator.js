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
    this.oauthData = JSON.parse(localStorage.getItem("oauthData")) || {
      access_token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk0Y2NiYzEzZTA5NzQ3ZDZiNzI0ZmNiOTdiMWNkODU4MTE5MzQ3YzQ4MzVjOTU1NGZmMjgxYTAyMDE1ZmNlM2Q4ZDUyNWI0ZjRiNmQxNDVjIn0.eyJhdWQiOiI2ZWM3ZTA1MC02MDQ3LTRhM2EtYmU3Ni1lODU0ODVlYzljMmIiLCJqdGkiOiI5NGNjYmMxM2UwOTc0N2Q2YjcyNGZjYjk3YjFjZDg1ODExOTM0N2M0ODM1Yzk1NTRmZjI4MWEwMjAxNWZjZTNkOGQ1MjViNGY0YjZkMTQ1YyIsImlhdCI6MTYyODA3MTEzOSwibmJmIjoxNjI4MDcxMTM5LCJleHAiOjE2MjgxNTc1MzksInN1YiI6IjY2NDAzNDIiLCJhY2NvdW50X2lkIjoyOTIyMzI3Nywic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImNybSIsIm5vdGlmaWNhdGlvbnMiXX0.S7rTpi6UaDCYPe6W9xZlGAv6zjezYMju1Jk9n_u4ihXpKhp5H3kgWo2NYWfioFVrpwzNzP9MNyoG13LkRKPG1W26B_FsOQzPUj8ope6u0FRsWuA6ltmTWxpun-zciSTFw8YU5wILlqMQd6_Q4cNfSfJv4PXUg6MPu2f-zpg7FUv4lpiSIQk8W6XMmRduUxd_n17n1hVtwKQSB_1YYye2IZ71wlCvKuOf6I7tiDjMq_LFUaSTpsJ-dEkCkdAI7du1o-Tr9RHQzMa01PJMBW6Ka3lUn7SFhXTTQa13i4hiRSMw_iw7uIdrNO2PCVL4T9ugxbxLODxBh_qLjt3wwhWnTw",
      expires_in: 86400,
      refresh_token:
        "def502001899bb7a85f842ffd9cc70eb00c0e40686f4b264047c15f023d28343629bff906b1deb9c528777bf168b7ba14df8cf738f24be6befe331720b755ab57fb75887b5355826469b2e3c949698b36cb51bee3c2e8e65fae80ceedff155719147154dc909796c28fe785fbe16c01b8a13e39c9f8cb080f7078cade719dcc4bf0652625a73bb8aae5039c963beaabc34044175c5241ec1331a19ee8faaeb20bc661b337ff57ff1e09129ac0826b7d70b1646c9830d21709588ac87f5594bf2822ec5103c97f0e392e9ca6559848fe2652c72e11dbf3b55268ec357d4d5b5f81fe63ea7f080b1c8bb5135ed0e346a2f1c7121fa18bab659683950e6819623d2e8f75d1c608dbe79a37e4a793a49004017c8c8e0146a3a90cf1a4c96838fa83ce29702c60118efdfc266ac8a8ea17a6bbe70fb194df720e523a6e53eeae152ac27167b2417a271db2d60d00435754e0f0c172b7941948ff8cca8d9c196deb9c68e064ee845bde46c6e453fab4a3b242534480386cb7b8e8a6b27ce4e37c51dc75df30a356259f1bd81beab9ed072ae13c1db973693f0a9254583bfb03e059d78bc471793da6eebefb22ffebee87caa8f867a93f5158d7c3cbbad78d4922e8597f6f083b7fc74184914f9",
      token_type: "Bearer",
    };
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
