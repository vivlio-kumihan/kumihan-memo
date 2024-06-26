"use strict";

class Main {
  constructor() {
    this.nextBtn = document.querySelector(".order__confirm");
    this.backBtn = document.querySelector(".order__back-to-cart");
    this.orderContainer = document.querySelector(".order-container");
    this.formData = this._getFormDataFromLS();
    this.inputEls = document.querySelectorAll(".order-form__input");
    this._init();
  }

  _init() {
    this._toggleOrderForm();
    this._initializeForm();
    this._handleFormInput();
  }
  
  _toggleOrderForm() {
    this.nextBtn.addEventListener("click", () => {
      this.orderContainer.classList.add("active");
    });
    this.backBtn.addEventListener("click", () => {
      this.orderContainer.classList.remove("active");
    });
  }

  _initializeForm() {
    this.inputEls.forEach(el => {

      el.value = this.formData[el.name] && this.formData[el.name];
    });
  }

  _handleFormInput() {
    this.inputEls.forEach(el => {
      el.addEventListener("input", () => {
        this.formData[el.name] = el.value;
        this._saveFormDataToLS();
      });
    });
  }

  _getFormDataFromLS() {
  let formData = {};
  try {
    const data = localStorage.getItem("localStorageForm");
      formData = data && JSON.parse(data);
    } catch (e) {
      console.error("Error parsing localStorage data", e);
    }
    return formData;
  }

  _saveFormDataToLS() {
    localStorage.setItem("localStorageForm", JSON.stringify(this.formData));
  }
}

// インスタンスの作成
document.addEventListener("DOMContentLoaded", () => {
  new Main();
});



// "use strict";

// class Main {
//   constructor() {
//     this.formDataOnLSIns = JSON.parse(localStorage.getItem("localStorageForm")) || {};    
//     this.nextBtn = document.querySelector(".order__confirm");
//     this.backBtn = document.querySelector(".order__back-to-cart")
//     this.orderContainer = document.querySelector(".order-container");
//     this.inputEls = document.querySelectorAll(".order-form__input");    
//     this._init();
//   }

//   _init() {
//     this._toggleOrderForm();
//     this._inputItems()
//     // console.log(this._inputItems());
//   }
  
//   _toggleOrderForm() {
//     this.nextBtn.addEventListener("click", () => {
//       this.orderContainer.classList.add("active");
//     });
//     this.backBtn.addEventListener("click", () => {
//       this.orderContainer.classList.remove("active");
//     });
//   }

//   _inputItems() {
//     this.inputEls.forEach(el => {
//       // 既存のデータをフォームに反映
//       if (this.formDataOnLSIns[el.name]) {
//         el.value = this.formDataOnLSIns[el.name];
//       }

//       // イベントリスナーを追加
//       el.addEventListener("input", () => {
//         this.formDataOnLSIns[el.name] = el.value;
//         this._saveFormDataLS();
//       });
//     });
//   }  

//   // フォームのデータの追加・変化をlocalStorageへ保存。
//   _saveFormDataLS() {
//     localStorage.setItem("localStorageForm", JSON.stringify(this.cartOnLSIns));
//   }

//   _getFormDataFromLS() {
//     let formData = {};
//     try {
  //       formData = JSON.parse(localStorage.getItem("localStorageForm")) || {};
//     } catch (e) {
//       console.error("Error parsing localStorage data", e);
//     }
//     return formData;
//   }  
// }

// // インスタンスの作成
// document.addEventListener("DOMContentLoaded", () => {
//   new Main();
// });



//   // _inputItems() {
//   //   const formData = Array.from(inputEls).reduce((acc, el) => {
//   //     el.addEventListener("input", () => {
//   //       acc[el.name] = el.value;
//   //     });
//   //     return acc;
//   //   }, {})
//   //   this.formDataOnLSIns = formData;
//   //   return formData;
//   // }