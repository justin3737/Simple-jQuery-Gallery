var _setting = {
    "containerW"  : 0,
    "padding"     : 10,
    "containerGap": [1024, 768],
    "rowGap"      : [5, 3, 2],
    "row"         : 5,
    "imgWidth"    : 0
};

$(function(){

    function onresize() {
        window.setTimeout(function(){
            setLayout(initSetting(_setting));
        }, 300);
    }

    function initSetting(options) {
        var containerW = parseInt($('#ThumbViewer').css('width'),10);
        /* setting row's amount */
        if (containerW > options["containerGap"][0]){
            options["row"] = options["rowGap"][0];
        } else if (containerW > options["containerGap"][1] && containerW < options["containerGap"][0]){
            options["row"] = options["rowGap"][1];
        } else {
            options["row"] = options["rowGap"][2];
        }
        /* setting image's width */
        options["imgWidth"]  = options["wrapWidth"] / options["row"];
        options["containerW"] = containerW;
        return options;
    }   

    function setLayout(options) {
        $('.wrap').css({'width': options["containerW"]});
        $('.wrap a').each(function(idx){
            var $elm    = $(this),
                $img    = $elm.find('img'),
                $scaler = $elm.find('.scaler'),
                _objectStyle = {
                    "width" : $img.css('width').replace('px',''),
                    "height": $img.css('height').replace('px',''),
                    "idx"   : idx
                },
                _style = posGen(_objectStyle, options);
            $elm.css({
                "position": "absolute",
                "top"     : _style["top"],
                "left"    : _style["left"],
            });
        });
    }

    function getLastRowElmTop(css, options) {
        var _top = 0;
        if (css['idx'] >= options["row"]) {
            var _elm = $('.wrap a').eq(css['idx'] - options["row"]);
            _top = parseInt(_elm.css('top'),10) + parseInt(_elm.css('height'),10);
        }
        return _top;
    }

    function posGen(css, options) {
        var row  = Math.floor(css['idx']/options["row"]),
            top  = getLastRowElmTop(css, options),
            left = Math.floor(css['idx']%options["row"]) * (parseInt(css['width'],10) + options["padding"]),
            styles = Object.assign({}, css, {
                "top" : top,
                "left": left
            });
        return styles;
    }

    onresize();
    $(window).resize(onresize);
});
