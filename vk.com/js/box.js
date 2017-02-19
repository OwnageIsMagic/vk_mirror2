var buttonFunc;
var faderTimer = 0;
var hideFunc;

function showBoxOld(button1_func, button2_func, button3_func) {
    if (faderTimer > 0) {
        clearInterval(faderTimer);
        if (hideFunc)
            hideFunc();
    }
    hideFunc = null;
    buttonFunc = [null, null, null];
    buttonFunc[0] = button1_func;
    buttonFunc[1] = button2_func;
    buttonFunc[2] = button3_func;

    var sctop = 0;
    var fw = 0,
        fh = 0;
    var bb = ge('boxBody'),
        bgf = ge('boxGoodFrame'),
        bw = ge('boxWrap'),
        bf = ge('boxFader');

    show('boxFader');
    bf.style.opacity = 1;
    bf.style.filter = "alpha(opacity=100)";

    if (self.innerWidth) {
        fw = self.innerWidth;
        fh = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) {
        de = document.documentElement;
        fw = de.clientWidth;
        fh = de.clientHeight;
        bf.style.position = "absolute";
        bf.style.height = bf.clientHeight;
        sctop = document.documentElement.scrollTop;
        show('boxGoodFrame');
    }

    bf.style.left = fw / 2 - bb.clientWidth / 2 + "px";
    bf.style.top = sctop + fh / 2 - bb.clientHeight / 2 - 50 + "px";
}

function hideBoxOld(hideFunction) {
    hideFunc = hideFunction;
    faderTimer = setInterval(fadeBox(ge('boxFader')), 5);
    fadeBox(ge('boxFader'));
    return false;
}

function fadeBox(boxfader) {
    return function() {
        if (boxfader.style.opacity <= 0.0) {
            hide('boxFader');
            hide('boxGoodFrame');
            clearInterval(faderTimer);
            faderTimer = 0;
            if (hideFunc)
                hideFunc();
        }
        boxfader.style.opacity = boxfader.style.opacity - 0.28;
        boxfader.style.filter = 'alpha(opacity=' + boxfader.style.opacity * 100 + ')';
    }
}


function callBoxFunc(func) {
    if (func == null) {
        return hideBoxOld();
    } else {
        return func();
    }
};