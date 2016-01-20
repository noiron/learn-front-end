window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');     // 获取图片列表
    var buttons = document.getElementById('buttons').getElementsByTagName('span');  // 获得圆点按钮
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 0;      // 当前显示的是第几张图片
    var animating = false;      // 当前是否处于动画状态
    var timer;

    // 显示与当前图片相对应的圆点
    function showButton() {
        // 先将按钮状态设置为未选中
        for(var i = 0; i <buttons.length; i++) {
            if(buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index].className = 'on';
    }

    // 将图片移动 offset 参数指定的距离
    function animate(offset) {
        animating = true;
        // 到达目标位置时，图片左侧的位置
        var newLeft = parseInt(list.style.left) + offset;  // 用parseInt去掉'px'
        // 移动一张图片所需要的总时间
        var time = 300;
        // 每次位移间隔的时间
        var interval = 10;
        // 移动速度 = 移动的总距离 / 移动的次数
        var speed = offset / (time / interval);

        // 移动时的动画效果，每次移动一小段距离
        function go() {
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || // 显示下一张图片，需要向左移动，未到达指定位置
                (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            } else {
                // 到达目标位置
                animating = false;
                list.style.left = newLeft + 'px';
                // 循环显示
                if(newLeft > -600) {
                    list.style.left = -3000 + 'px';
                } else if(newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
            }
        }
        go();
    }

    // 自动播放下一张图片
    function play() {
        timer = setInterval(function() {
            next.onclick();
        }, 3000);
        console.log(animating)
    }

    // 下一张按钮点击事件
    next.onclick = function() {
        // 只有当前图片不处于移动状态时，才移动图片
        if (!animating) {
            animate(-600);
        }
        index++;
        if (index >= 5) {
            index = 0;
        }
        showButton();
    };

    prev.onclick = function() {
        if (!animating) {
            animate(600);
        }
        index--;
        if (index < 0) {
            index = 4;
        }
        showButton();
    };

    // 圆点按钮的点击事件，点击后转到对应图片
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            // 当前处于移动状态或点击当前图片，则无操作
            if (animating || this.className == 'on') {
                return;
            }
            // 获得自定义的'index'属性
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index);
            animate(offset);
            index = myIndex;
            console.log(index);
            showButton();
        }
    }

    // 鼠标移出容器时，自动播放
    container.onmouseout = play;
    // 鼠标移入容器，停止自动播放
    container.onmouseover = stop;
    function stop() {
        clearInterval(timer);
    }
};