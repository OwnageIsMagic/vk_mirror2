var PhotoCaptcha = {
    init: function(c, t) {
        c.setOptions({
            hideButtons: !0,
            width: 647,
            bodyStyle: "padding: 0px; border: 0px;"
        }), c.removeButtons(), cur.lang = extend(cur.lang || {}, t.lang), extend(cur, {
            pcPhotos: t.photos,
            pcCur: 0,
            pcWrapEl: ge("pcpt_wrap"),
            pcContEl: ge("pcpt_cont")
        });
        for (var p in cur.pcPhotos) vkImage().src = cur.pcPhotos[p]
    },
    show: function(c) {
        if (void 0 !== c || cur.pcShowing || (c = (cur.pcCur + 1) % cur.pcPhotos.length), cur.pcPhotos[c]) {
            if (cur.pcShowing) return void(cur.pcShowing = c + 1);
            if (c != cur.pcCur) {
                removeClass(ge("pcpt_ph" + cur.pcCur), "pcpt_sel"), addClass(ge("pcpt_ph" + c), "pcpt_sel"), cur.pcShowing = !0;
                var t, p = cur.pcWrapEl.appendChild(domFC(ce("div", {
                    innerHTML: '<table class="pcpt_photo" cellspacing="0" cellpadding="0" style="position: absolute; opacity: 0;">  <tr><td class="pcpt_cell" onclick="PhotoCaptcha.show()"><img src="' + cur.pcPhotos[c] + '" class="pcpt_big_img" /></td></tr></table>'
                })));
                setStyle(domPS(p), {
                    position: "absolute",
                    marginLeft: 0
                }), c > cur.pcCur ? (setStyle(p, {
                    marginLeft: 608
                }), t = -608) : (setStyle(p, {
                    marginLeft: -608
                }), t = 608), animate(p, {
                    opacity: 1,
                    marginLeft: 0
                }, {
                    duration: 200,
                    transition: Fx.Transitions.sineInOut
                }), animate(domPS(p), {
                    opacity: 0,
                    marginLeft: t
                }, {
                    duration: 200,
                    transition: Fx.Transitions.sineInOut,
                    onComplete: PhotoCaptcha.done
                }), cur.pcCur = c
            }
        }
    },
    done: function() {
        cur.pcShowing && (re(domFC(cur.pcWrapEl)), setStyle(domFC(cur.pcWrapEl), {
            position: "static",
            marginLeft: 0
        }), cur.pcShowing !== !0 && setTimeout(PhotoCaptcha.show.pbind(cur.pcShowing - 1), 0), cur.pcShowing = !1)
    },
    select: function(c) {
        c !== cur.pcSel && (void 0 !== cur.pcSel && removeClass(ge("pcpt_user" + cur.pcSel), "pcpt_user_sel"), addClass(ge("pcpt_user" + c), "pcpt_user_sel"), cur.pcSel = c)
    },
    other: function() {
        ajax.post("pcaptcha.php", {
            act: "box",
            part: 1
        }, {
            onDone: function(c, t, p) {
                delete cur.pcSel, extend(cur, {
                    pcCur: 0,
                    pcShowing: !1,
                    pcPhotos: c
                }), val(cur.pcWrapEl, '<table class="pcpt_photo" cellspacing="0" cellpadding="0">  <tr><td class="pcpt_cell" onclick="PhotoCaptcha.show()"><img src="' + cur.pcPhotos[0] + '" class="pcpt_big_img" /></td></tr></table>'), val(ge("pcpt_thumbs"), t), val(ge("pcpt_names"), p)
            }
        })
    }
};
try {
    stManager.done("pcaptcha.js")
} catch (e) {}