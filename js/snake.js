"use strict";

;
(function () {
  var position = "absolute";
  var elements = []; // 保存创建的蛇对象

  /**
   * 蛇对象的构造函数
   * @param {Object} options
   */
  function Snake(options) {
    options = options || {};
    // 蛇节的大小
    this.width = options.width || 20;
    this.height = options.height || 20;
    // 蛇移动的方向
    this.direction = options.direction || "right";
    // 蛇的身体(蛇节), 第一个是蛇头
    this.body = [
      {x: 3, y: 2, color: "rgb(205, 104, 57)"},
      {x: 2, y: 2, color: "rgb(139, 115, 85)"},
      {x: 1, y: 2, color: "rgb(139, 115, 85)"}
    ];
  }
  /**
   * 将蛇对象的渲染到map的方法
   * @param {HTMLElement} map
   */
  Snake.prototype.render = function (map) {
    // 先删除之前生成的蛇
    removeSnake();
    // 把每一个蛇节渲染到map上
    this.body.forEach(function (item) {
      // 创建蛇节
      var div = document.createElement("div");

      // 保存蛇节
      elements.push(div);

      // 样式
      div.style.position = position;
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.left = item.x * this.width + "px";
      div.style.top = item.y * this.height + "px";
      div.style.backgroundColor = item.color;

      // 追加到map上
      map.appendChild(div);

    }.bind(this));
  }

  // 控制蛇的移动
  Snake.prototype.move = function (food, map) {
    // 控制蛇的身体移动 => 当前蛇节移动到上一个蛇节位置
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    // 控制蛇头的移动 => 蛇头移动方向
    var head = this.body[0];
    switch(this.direction) {
      case "right":
        head.x += 1;
        break;
      case "left":
        head.x -= 1;
        break;
      case "top":
        head.y -= 1;
        break;
      case "bottom":
        head.y += 1;
        break;
    }

    // 蛇头是否与食物坐标重合
    var headX = head.x * this.width;
    var headY = head.y * this.height;
    if (headX === food.x && headY === food.y) {
      // 在蛇末尾增加一节 => 取出蛇最后一节添加到末尾
      var last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      // 重新生成一个食物
      food.render(map);
    }
  }

  // 删除之前创建的蛇对象
  function removeSnake() {
    for (var i = elements.length - 1; i >= 0; i--) {
      // 删除div
      elements[i].parentNode.removeChild(elements[i]);
      // 删除数组中的元素
      elements.splice(i, 1);
    }
  }

  // 通过window暴露Snake对象
  window.Snake = Snake;
})()