var Doge = {
    show: function() {
        if (Doge.shown) return !1;
        Doge.shown = !0;
        var i = ge("vk_doge");
        if (!i) {
            var e = "/images/pics/nichosi" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".png",
                o = "/images/pics/nichosi_str" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".png",
                i = ce("a", {
                    id: "vk_doge",
                    innerHTML: '<div style="font-family: \'Comic Sans MS\', cursive; font-size: 24px; position: absolute; margin-top: -56px; width: 150px; text-align: center; opacity: 0;filter: alpha(opacity=0);">WOW</div><img id="nichosi_str" style="position: absolute;" src="' + o + '" width="150" height=37"><img src="' + e + '" width="150" height=150">'
                }, {
                    position: "fixed",
                    bottom: -150,
                    right: 50,
                    width: 150,
                    height: 150,
                    padding: "35px 35px 0px 35px",
                    zIndex: 110
                });
            utilsNode.appendChild(i)
        }
        debugLog(i), show(i), animate(i, {
            bottom: 0
        }, {
            duration: 150
        });
        var n = ge("nichosi_str");
        setStyle(n, {
            marginTop: 0
        }), setTimeout(function() {
            animate(n, {
                marginTop: -20
            }, {
                duration: 300,
                transition: function(i, e, o, n) {
                    return o * cubicBezier(.47, 4.29, .51, .3, i / n, 4 / n) + e
                }
            })
        }, 150), setTimeout(Doge.hide, 1e3)
    },
    hide: function() {
        var i = ge("vk_doge"),
            e = ge("nichosi_str");
        animate(e, {
            marginTop: -180
        }, {
            duration: 200
        }), animate(i, {
            bottom: -150
        }, 200, function() {
            animate(e, {
                marginTop: 0
            }, {
                duration: 150,
                transition: Fx.Transitions.swiftOut,
                onComplete: function() {
                    hide(i), Doge.shown = !1
                }
            })
        })
    },
    updateLikes: function() {
        var i = geByClass("post_like_link");
        for (var e in i) i[e].innerHTML = "Such Like";
        var o = geByClass("online");
        for (var e in o) "SPAN" == o[e].tagName && (o[e].innerHTML = "So Online")
    },
    initSound: function(i) {
        window.Sound ? cur.sound = new Sound(i, {
            forceMp3: !0,
            forcePath: i
        }) : cur.sound = {
            play: function() {},
            stop: function() {}
        }
    },
    blowTimer: function(i) {
        if (cur.blowing) return !1;
        if (cur.blowed) return nav.go(i);
        Doge.initSound("mp3/boom.mp3"), cur.blowing = !0;
        var e = 'style="font-size: 2em; text-align: center; font-weight: bold;"';
        showDoneBox("<div " + e + ">3</div>", {
            w: 20,
            out: 3e3
        });
        var o = (new Date).getTime(),
            i = geByClass1("top_result_baloon"),
            n = setInterval(function() {
                var t = 3e3 - ((new Date).getTime() - o);
                0 >= t ? (clearInterval(n), Doge.blowImages()) : i.innerHTML = "<div " + e + ">" + Math.ceil(t / 1e3) + "</div>"
            }, 100)
    },
    blowImages: function() {
        var i = geByTag("img", bodyNode);
        cur.sound.play(), each(i, function(i, e) {
            if (e.parentNode !== bodyNode && isVisible(e)) {
                var o, n = getSize(e),
                    t = getXY(e),
                    a = [lastWindowWidth / 2, scrollGetY() + lastWindowHeight / 2],
                    r = [0, 0],
                    s = 1500;
                if (n[0] && n[1]) {
                    o = ce("div", {}, {
                        width: n[0],
                        height: n[1],
                        backgroundColor: "#f1f1f1",
                        display: "inline-block",
                        border: "0px",
                        margin: "0px",
                        padding: "0px"
                    }), e.parentNode.insertBefore(o, e), bodyNode.insertBefore(e, domFC(bodyNode)), setStyle(e, {
                        position: "absolute",
                        left: t[0],
                        top: t[1],
                        width: n[0],
                        height: n[1],
                        zIndex: 100
                    });
                    var d = t[0] - a[0] + (n[0] - r[0]) / 2,
                        g = t[1] - a[1] + (n[1] - r[1]) / 2;
                    animate(e, {
                        left: t[0] + s * d / Math.abs(d),
                        top: s * g / Math.abs(d)
                    }, {
                        duration: 1e3,
                        transition: Fx.Transitions.linear,
                        onComplete: function() {
                            re(e), cur.blowing = !1, cur.blowed = !0
                        }
                    })
                }
            }
        })
    },
    eof: 1
};
try {
    stManager.done("doge.js")
} catch (e) {}