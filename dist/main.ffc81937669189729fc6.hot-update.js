/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdategraduateWork"]("main",{

/***/ "./src/modules/topMenu.js":
/*!********************************!*\
  !*** ./src/modules/topMenu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar animateTopMenu = function animateTopMenu() {\n  var topMenu = document.querySelector(\".top-menu\");\n  topMenu.addEventListener(\"click\", function (e) {\n    var target = e.target;\n\n    if (target.matches(\"a\")) {\n      e.preventDefault();\n      var blockID = target.getAttribute(\"href\");\n      var block = document.querySelector(blockID);\n      block.scrollIntoView({\n        behavior: \"smooth\",\n        block: \"start\"\n      });\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animateTopMenu);\n\n//# sourceURL=webpack://graduateWork/./src/modules/topMenu.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "730de07dc1b7d52a9def"
/******/ 	})();
/******/ 	
/******/ }
);