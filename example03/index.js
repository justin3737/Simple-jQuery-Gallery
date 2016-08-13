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
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center '; 
}