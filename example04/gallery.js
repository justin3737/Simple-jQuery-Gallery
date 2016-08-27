var _setting = {
    "padding"     : 10,
    "containerGap": [1024, 768],
    "rowGap"      : [5, 3, 2],
    "row"         : 5,
    "wrapWidth"   : 0,
    "imgWidth"    : 0
};

$(function(){

    function onresize() {
        window.setTimeout(function(){
            getRow();
            setLayout();
        }, 300);
    }

    function getRow() {
        var containerW = parseInt($('#ThumbViewer').css('width'),10);
        if (containerW > _setting["containerGap"][0]){
            _setting["row"] = _setting["rowGap"][0];
        } else if (containerW > _setting["containerGap"][1] && containerW < _setting["containerGap"][0]){
            _setting["row"] = _setting["rowGap"][1];
        } else {
            _setting["row"] = _setting["rowGap"][2];
        }
        _setting["wrapWidth"] = (containerW - (_setting["padding"] * _setting["row"]));
        _setting["imgWidth"]  = _setting["wrapWidth"] / _setting["row"];
        $('.wrap').css({'width': _setting["wrapWidth"]});
    }   

    function setLayout() {
        $('.wrap a').each(function(idx){
            var $elm    = $(this),
                $img    = $elm.find('img'),
                $scaler = $elm.find('.scaler'),
                _objectStyle = {
                    "width" : $img.css('width').replace('px',''),
                    "height": $img.css('height').replace('px',''),
                    "idx"   : idx
                },
                _style = posGen(_objectStyle);
            $elm.css({
                "position": "absolute",
                "top"     : _style["top"],
                "left"    : _style["left"],
            });
        });
    }

    function getLastRowElmTop(css) {
        var _top = 0;
        if (css['idx'] >= _setting["row"]) {
            var _elm = $('.wrap a').eq(css['idx'] - _setting["row"]);
            _top = parseInt(_elm.css('top'),10) + parseInt(_elm.css('height'),10);
        }
        return _top;
    }

    function posGen(css) {
        var row  = Math.floor(css['idx']/_setting["row"]),
            top  = getLastRowElmTop(css),
            left = Math.floor(css['idx']%_setting["row"]) * (parseInt(css['width'],10) + _setting["padding"]),
            styles = Object.assign({}, css, {
                "top" : top,
                "left": left
            });
        return styles;
    }

    onresize();
    $(window).resize(onresize);
});

