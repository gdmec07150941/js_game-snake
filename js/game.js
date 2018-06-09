"use strict";

;
(function () {
  /**
   * 游戏构造函数
   * @param {HTMLElement} map
   */
  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }

  /**
   * start 把食物和蛇渲染到map
   */
  Game.prototype.start = function () {
    this.food.render(this.map);
    this.snake.render(this.map);

    // 让蛇移动起来
    runSnake.call(this); // call改变this指向为Game

    // 通过键盘控制蛇的移动方向
    bindKey.call(this);
  }

  function runSnake() { // this -> window
    // 开启定时器, 让蛇自动移动
    var timerId = setInterval(function () {
      this.snake.move(this.food, this.map);
      this.snake.render(this.map);
      // 判断蛇是否移出边界 x>=(map.offsetWidth/this.width - 1) * this.width
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      var mapX = this.map.offsetWidth / this.snake.width;
      var mapY = this.map.offsetHeight / this.snake.height;
      // 蛇头遇到边界
      if (headX < 0 || headX > mapX -1 || headY < 0 || headY > mapY - 1) {
        clearInterval(timerId);
        timerId = null;
        alert("游戏结束");
        //var dialog = document.createElement("div");
        //dialog.innerHTML = "游戏结束";
        //dialog.className = "gameover";
        //this.map.appendChild(dialog);
      }
    }.bind(this), 150); // bind: this -> Game
  }

  function bindKey() { // this -> window
    // document.onkeydown = function () {}
    document.addEventListener("keydown",
      function (e) { // this -> document
        switch (e.keyCode) {
          case 37: // 左
            this.snake.direction = "left";
            break;
          case 38: // 上
            this.snake.direction = "top";
            break;
          case 39: // 右
            this.snake.direction = "right";
            break;
          case 40: // 下
            this.snake.direction = "bottom";
            break;
        }
    }.bind(this));
  }


  // 通过window暴露Game对象
  window.Game = Game;
})()