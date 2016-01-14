window.onload = function() {
    waterfall('main', 'box');
    var dataInt = {"data":[{"src":'0.jpg'}, {"src":'2.jpg'}, {"src":'3.jpg'}, {"src":'4.jpg'}]};
    window.onscroll = function() {
        if(checkScrollSlide) {
            var oParent = document.getElementById('main');

            // 将数据块渲染到当前页面的尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg =document.createElement('img');
                oImg.src='../images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
};

function waterfall(parent, box) {

    // 将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxes = getByClass(oParent, box);

    // 计算整个页面显示的列数（页面宽/box的宽）
    var oBoxWidth = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);

    // 设置main的宽度，并将其居中
    oParent.style.cssText = 'width:' + oBoxWidth * cols + 'px; margin:0 auto';

    var heightArray = [];
    for (var i = 0; i < oBoxes.length; i++) {
        if (i < cols) {
            heightArray.push(oBoxes[i].offsetHeight);
        } else {
            var minHeight = Math.min.apply(null, heightArray);
            var index = getIndex(heightArray, minHeight);
            oBoxes[i].style.position = 'absolute';
            oBoxes[i].style.top = minHeight + 'px';
            oBoxes[i].style.left = oBoxWidth * index + 'px';

            heightArray[index] += oBoxes[i].offsetHeight;
        }
    }
}

// 根据class获取元素
function getByClass(parent, className) {
    var boxArray = [];      // 用来存储获取到的所有class为box的元素
    var oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if(oElements[i].className == className) {
            boxArray.push(oElements[i]);
        }
    }
    return boxArray;
}

// 获得数组中某个值得索引
function getIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

// 检测是否具备了加载数据块的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxes = getByClass(oParent, 'box');
    // 最后一个数据块距离页面顶部的距离
    var lastBoxHeight = oBoxes[oBoxes.length-1].offsetTop + Math.floor(oBoxes[oBoxes.length-1].offsetHeight / 2);
    // 滚动条顶部的距离
    var scrollTop = document.body.scrollTop || document.documentElement.scrollHeight;
    //console.log(scrollTop);
    // 页面可视区域的高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxHeight < scrollTop + height);
}


