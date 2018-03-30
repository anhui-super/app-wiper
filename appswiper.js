
(function (global) {
	var Juooo = function () {
		Juooo.prototype.creatJuoo = function (classname) {
			var elem = document.getElementsByClassName(classname)[0];
			var flag = true; // 标记值
			global.addEventListener('touchstart', thouch);
			global.addEventListener('touchmove', thouch);
			global.addEventListener('touchend', thouch);
			elem.addEventListener('transitionend', function () {
				flag = true;
			});
			var oheight = document.body.clientHeight;
			var olen = elem.getElementsByClassName('juo_item').length;
			var move_Y, start_Y, start, ostart_Y, otop, Y_START;

			function thouch(e) {
				if (!flag) {
					return;
				}
				switch (e.type) {
					case 'touchstart':
						Y_START = '';
						start_Y = e.changedTouches[0].pageY;
						break;
					case 'touchmove':
						otop = elem.offsetTop;
						move_Y = e.changedTouches[0].pageY;
						if (move_Y - start_Y < 0) { //方向向上滑动
							start = 0
							if (otop - oheight == -(olen) * oheight) {
								Y_START = ostart_Y + (move_Y - start_Y) * 3;
							}
						} else if (move_Y - start_Y > 0) {  //方向向下滑动
							if (otop == 0) {
								if (ostart_Y == undefined) {
									ostart_Y = 0
								}
								Y_START = ostart_Y + (move_Y - start_Y) * 3
							}
							start = 1
						}

						//第一屏向下滑，最后一屏向上滑的缓冲
						elem.style.top = Y_START + 'px'; // move事件改变页面的定位的话 和 transition 一起会让页面看起开卡卡的 但是这行代码没有起作用
						break;
					case 'touchend':
						otop = elem.offsetTop;
						if (start == 0) { //方向向上滑动离开
							if (otop - oheight >= -(olen - 1) * oheight) {
								ostart_Y = otop - oheight
								flag = false;
							}
						} else { //方向向下滑动离开
							if (oheight + otop <= 0) {
								ostart_Y = oheight + otop
								flag = false;
							}
						}
						elem.style.top = ostart_Y + 'px';
						break;
				}
			}
		}
	}
	global.Juooo = Juooo;
}(window))