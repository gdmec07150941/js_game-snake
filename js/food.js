"use strict";

;
(function () {
  var position = "absolute";
  var elements = []; // 保存之前创建的食物div
  /**
   * 食物对象的构造函数
   * @param {Object} options
   */
  function Food(options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || "rgb(60, 218, 247)";
  }

  /**
   * 将食物对象的渲染到map的方法
   * @param {HTMLElement} map
   */
  Food.prototype.render = function (map) {
    // 删除之前创建的食物
    removeFood();
    // 随机生成食物的x,y坐标
    this.x = Tool.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
    this.y = Tool.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
    // 动态生成一个食物div
    var div = document.createElement("div");
    // 将生成的食物div添加到elemens中
    elements.push(div);
    // 样式
    div.style.position = position;
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    div.style.backgroundColor = this.color;
    // 添加到map
    map.appendChild(div);
  }

  function removeFood() { // 删除食物
    for (var i = elements.length - 1; i >= 0; i--) {
      // 删除食物
      elements[i].parentNode.removeChild(elements[i]);
      // 删除elements数组中的元素
      elements.splice(i, 1);
    }
  }

  // 通过window暴露Food对象
  window.Food = Food;
})()