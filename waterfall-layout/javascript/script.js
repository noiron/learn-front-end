window.onload = function() {
    waterfall('main', 'box');
    var dataInt = {"data":[{"src":'0.jpg'}, {"src":'2.jpg'}, {"src":'3.jpg'}, {"src":'4.jpg'}]};
    window.onscroll = function() {
        if(checkScrollSlide) {
            var oParent = document.getElementById('main');

            // �����ݿ���Ⱦ����ǰҳ���β��
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

    // ��main�µ�����classΪbox��Ԫ��ȡ����
    var oParent = document.getElementById(parent);
    var oBoxes = getByClass(oParent, box);

    // ��������ҳ����ʾ��������ҳ���/box�Ŀ�
    var oBoxWidth = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);

    // ����main�Ŀ�ȣ����������
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

// ����class��ȡԪ��
function getByClass(parent, className) {
    var boxArray = [];      // �����洢��ȡ��������classΪbox��Ԫ��
    var oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if(oElements[i].className == className) {
            boxArray.push(oElements[i]);
        }
    }
    return boxArray;
}

// ���������ĳ��ֵ������
function getIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

// ����Ƿ�߱��˼������ݿ������
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxes = getByClass(oParent, 'box');
    // ���һ�����ݿ����ҳ�涥���ľ���
    var lastBoxHeight = oBoxes[oBoxes.length-1].offsetTop + Math.floor(oBoxes[oBoxes.length-1].offsetHeight / 2);
    // �����������ľ���
    var scrollTop = document.body.scrollTop || document.documentElement.scrollHeight;
    //console.log(scrollTop);
    // ҳ���������ĸ߶�
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxHeight < scrollTop + height);
}


