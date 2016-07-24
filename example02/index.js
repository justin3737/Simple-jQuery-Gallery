//數據資料 應由後台取得
var data = [
    {img:1 ,h1: 'Creative',h2:'DUET'},
    {img:2 ,h1: 'Friendly',h2:'DEVIL'},
    {img:3 ,h1: 'Tranquilent',h2:'COMPATRIOT'},
    {img:4 ,h1: 'Insecure',h2:'HUSSLER'},
    {img:5 ,h1: 'Loving',h2:'REBEL'},
    {img:6 ,h1: 'Passionate',h2:'SEEKER'},
    {img:7 ,h1: 'Crazy',h2:'FRIEND'},
];

// 獲取DOM
var g = function (id) {
    if (id.substr(0,1) == '.') {
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
}

// 添加幻燈片的操作
function addSliders() {
    //獲取模板
    var tpl_main = g('template_main').innerHTML
                    .replace(/^\s*/,'')
                    .replace(/\s*$/,'');
    var tpl_ctrl = g('template_ctrl').innerHTML
                    .replace(/^\s*/,'')
                    .replace(/\s*$/,'');
    // 定義最終輸出HTML的變數
    var out_main = [];
    var out_ctrl = [];

    // 透過loop 方式產生最終輸出的HTML
    for (i in data) {
        var _html_main = tpl_main
                .replace(/{{index}}/g, data[i].img)
                .replace(/{{h2}}/g, data[i].h1)
                .replace(/{{h3}}/g, data[i].h2)
                .replace(/{{css}}/g, ['','main-i_right'][i%2]);
        var _html_ctrl = tpl_ctrl
                .replace(/{{index}}/g, data[i].img);
        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }

    // 回寫到 HTML
    g('template_main').innerHTML = out_main.join('');
    g('template_ctrl').innerHTML = out_ctrl.join('');

    // 增加#main_background
    g('template_main').innerHTML += tpl_main
                .replace(/{{index}}/g, '{{index}}')
                .replace(/{{h2}}/g, data[i].h1)
                .replace(/{{h3}}/g, data[i].h2);
    g('main_{{index}}').id = 'main_background';

}

// 幻燈片切換
function switchSlider(id) {
    var main = g('main_' + id);
    var ctrl = g('ctrl_' + id);

    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');
    
    for (var i=0; i< clear_main.length; i++) {
        clear_main[i].className = clear_main[i].className.replace(' main-i_active','');
        clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active','');
    }
    main.className += ' main-i_active';
    ctrl.className += ' ctrl-i_active';

    //切換時複製上一張到#main_background
    setTimeout(function(){
        g('main_background').innerHTML = main.innerHTML;
    },1000)
}

// 動態調整圖片margin-top 使其垂直居中

function movePictures() {
    var pictures = g('.picture');
    for (var i=0; i< pictures.length; i++) {
        pictures[i].style.marginTop = -1 * (pictures[i].clientHeight/2) + 'px';
    }
}

window.onload = function() {
    addSliders();
    switchSlider(2);
    setTimeout(function(){
        movePictures()
    },100);
}
