"use strict";

;
(function () {
  var position = "absolute";
  var elements = []; // ���洴�����߶���

  /**
   * �߶���Ĺ��캯��
   * @param {Object} options
   */
  function Snake(options) {
    options = options || {};
    // �߽ڵĴ�С
    this.width = options.width || 20;
    this.height = options.height || 20;
    // ���ƶ��ķ���
    this.direction = options.direction || "right";
    // �ߵ�����(�߽�), ��һ������ͷ
    this.body = [
      {x: 3, y: 2, color: "rgb(205, 104, 57)"},
      {x: 2, y: 2, color: "rgb(139, 115, 85)"},
      {x: 1, y: 2, color: "rgb(139, 115, 85)"}
    ];
  }
  /**
   * ���߶������Ⱦ��map�ķ���
   * @param {HTMLElement} map
   */
  Snake.prototype.render = function (map) {
    // ��ɾ��֮ǰ���ɵ���
    removeSnake();
    // ��ÿһ���߽���Ⱦ��map��
    this.body.forEach(function (item) {
      // �����߽�
      var div = document.createElement("div");

      // �����߽�
      elements.push(div);

      // ��ʽ
      div.style.position = position;
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      div.style.left = item.x * this.width + "px";
      div.style.top = item.y * this.height + "px";
      div.style.backgroundColor = item.color;

      // ׷�ӵ�map��
      map.appendChild(div);

    }.bind(this));
  }

  // �����ߵ��ƶ�
  Snake.prototype.move = function (food, map) {
    // �����ߵ������ƶ� => ��ǰ�߽��ƶ�����һ���߽�λ��
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }
    // ������ͷ���ƶ� => ��ͷ�ƶ�����
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

    // ��ͷ�Ƿ���ʳ�������غ�
    var headX = head.x * this.width;
    var headY = head.y * this.height;
    if (headX === food.x && headY === food.y) {
      // ����ĩβ����һ�� => ȡ�������һ����ӵ�ĩβ
      var last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });
      // ��������һ��ʳ��
      food.render(map);
    }
  }

  // ɾ��֮ǰ�������߶���
  function removeSnake() {
    for (var i = elements.length - 1; i >= 0; i--) {
      // ɾ��div
      elements[i].parentNode.removeChild(elements[i]);
      // ɾ�������е�Ԫ��
      elements.splice(i, 1);
    }
  }

  // ͨ��window��¶Snake����
  window.Snake = Snake;
})()