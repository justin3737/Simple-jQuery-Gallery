$(function(){
    //--init--
    var $imgItems = $('.gallery__items').children(),
        $prevBtn  = $('.gallery__navIcon--prev'),
        $nextBtn  = $('.gallery__navIcon--next'),
        _len      = $imgItems.length,
        _currIdx  = 0;

    //--helper--
    function isPrev(id) {

    }

    function isNext(id) {
        
    }

    function isActive(id) {
        
    }

    function hasNext() {
        return _currIdx < _len;
    }

    function hasPrev() {
        return _currIdx > 0;
    }

    function nextPage() {
        if(_currIdx < _len) {
            _currIdx++;
        } else {
            _currIdx = 0;
        }
        return;
    }

    function prevPage() {
        if(_currIdx > 0) {
            _currIdx--;
        } else {
            _currIdx = _len;
        }
        return;
    }

    function renderView() {
        //render btns 
        if (!hasNext()) {
            $nextBtn.hide();
        } else if (!hasPrev()) {
            $prevBtn.hide();
        } else {
            $nextBtn.show();
            $prevBtn.show();
        }
        //render gallery

    }
    
    function init() {
        renderView();
    }

    //--event--
    $nextBtn.on('click', function(){
        nextPage();
        renderView();
    });
    $prevBtn.on('click', function(){
        prevPage();
        renderView();
    });

    init();
});