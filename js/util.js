"use strict";

;
(function () {
  var Tool = {
    // 获取min-max之间的随机整数
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
  }

  window.Tool = Tool;
})()
