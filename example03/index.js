//翻面控制
function turn(elem) {
    var cls = elem.className;
    if (/photo_front/.test(cls)) {
        cls = cls.replace(/photo_front/, 'photo_back');
    } else {
        cls = cls.replace(/photo_back/, 'photo_front');
    }
    return elem.className = cls;
}

//通用函數
function g(selector) {
    var method = selector.substr(0,1) === '.'?
        'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}

//隨機生成一個值
function random(range) {
    var max = Math.max(range[0], range[1]);
    var min = Math.min(range[0], range[1]);
    var diff = max - min;
    var number = Math.ceil(Math.random()* diff + min);
    return number;
}

//計算左右分區的範圍 { left:{x:[min,max], y:[]}, right: {} }
function rangePos() {
    var range = { left:  { x:[], y:[] }, right: { x:[], y:[] } };
    var wrap = {
        w:g('#wrap').clientWidth,
        h:g('#wrap').clientHeight
    }

    var photo = {
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight 
    }

    range.left.x = [ 0-photo.w, wrap.w/2 - photo.w/2 ];
    range.left.y = [ 0-photo.h, wrap.h ];
    
    range.right.x = [ wrap.w/2 + photo.w/2, wrap.w + photo.w ];
    range.right.y = range.left.y;   

    return range;
}   

var data = data;

function addPhotos() {
    var template = g('#wrap').innerHTML;
    var html = [];

    for (s in data) {
        var _html = template
                    .replace('{{index}}', s)
                    .replace('{{img}}', data[s].fileName)
                    .replace('{{caption}}', data[s].title)
                    .replace('{{desc}}', data[s].desc);
        html.push(_html);
    }
    g('#wrap').innerHTML = html.join('');

    rsort(random([0, data.length]));
}

addPhotos();

//排序海報
function rsort( n ) {
    var _photo = g('.photo');
    var photos = [];
    for (s = 0; s < _photo.length; s++ ) {
        _photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/," ");
        photos.push(_photo[s]);
    }
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center '; 
    photo_center = photos.splice(n, 1);
    
    //海報一分為二, 左右兩區
    var photos_left = photos.splice(0, Math.ceil(photos.length/2));
    var photos_right = photos;
    var ranges = rangePos();

    for (var s in photos_left) {
        var photos = photos_left[s];
        photos.style.left =  random(ranges.left.x) +'px';
        photos.style.top  =  random(ranges.left.y) +'px'; 
        photos.style['-webkit-transform'] = 'rotate(' + random([-150, 150])+ 'deg)';
    }

    for (var s in photos_right) {
        var photos = photos_right[s];
        photos.style.left =  random(ranges.right.x) +'px';
        photos.style.top  =  random(ranges.right.y) +'px'; 
        photos.style['-webkit-transform'] = 'rotate(' + random([-150, 150])+ 'deg)';
    }
}