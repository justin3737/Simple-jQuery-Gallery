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

function g(selector) {
    var method = selector.substr(0,1) === '.'?
        'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
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
}

addPhotos();