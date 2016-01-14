$(window).on('load', function() {
    waterfall();
    var dataInt = {"data":[{"src":'0.jpg'}, {"src":'2.jpg'}, {"src":'3.jpg'}, {"src":'4.jpg'}]};
    $(window).on('scroll', function() {
        if(checkScrollSlide()){
            $.each(dataInt.data, function(key, value) {
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                $('<img>').attr('src', '../images/' + $(value).attr('src')).appendTo($(oPic));
            });
            waterfall();
        }
    })
});


function waterfall() {
    var $boxes = $('#main>div');
    var w = $boxes.eq(0).outerWidth();   // 第一个div的宽度
    var cols = Math.floor($(window).width() / w);
    $('#main').width(w*cols).css('margin', '0 auto');
    var heightArray = [];
    $boxes.each(function(index, value) {    // value是一个DOM元素
        var h = $boxes.eq(index).outerHeight();
        if(index < cols) {
            heightArray[index] = h;
        } else {
            var minHeight = Math.min.apply(null, heightArray);
            var minHeightIndex = $.inArray(minHeight, heightArray);
            $(value).css({
                'position': 'absolute',
                'top': minHeight + 'px',
                'left': minHeightIndex * w + 'px'
            });
            heightArray[minHeightIndex] += $boxes.eq(index).outerHeight();
        }
    });
}

function checkScrollSlide() {
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentHeight = $(window).height();
    console.log(lastBoxDis < scrollTop + documentHeight);
    return (lastBoxDis < scrollTop + documentHeight);
}



