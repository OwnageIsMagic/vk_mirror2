var Pads = {
    coords: {
        fr: {
            w: 378
        },
        ph: {
            w: 378
        },
        vid: {
            w: 378
        },
        msg: {
            w: 470
        },
        gr: {
            w: 470
        },
        nws: {
            w: 470
        },
        ap: {
            w: 378
        },
        mus: {
            w: 629
        },
        game: {
            w: 456,
            bottom: 1
        }
    },
    getCache: function(a, e) {
        var s = _pads.cache[a],
            d = vkNow();
        return (s || {}).tim && d - s.tim < 864e5 || d - intval(s) < 2e4 ? s : (e && (_pads.cache[a] = d), !1)
    },
    preload: function(id) {
        if (_pads.shown != id && !Pads.getCache(id, !0) && !vk.isBanned) {
            "msg" == id && stManager.add(["pads_im.css", "pads_im.js", "page.css", "page.js"]);
            var query = {
                act: "pad",
                pad_id: id
            };
            "mus" == id && (padAudioPlaylist() || (query.playlist = 1), Pads.audioInited || (query.init = 1)), ajax.post("pads.php", query, {
                onDone: function(html, script, data, cnt) {
                    void 0 !== cnt && null !== cnt && cnt > -1 && handlePageCount(id, cnt), data.onLoadScript && (eval(data.onLoadScript), delete data.onLoadScript), _pads.cache[id] = {
                        html: html,
                        script: script,
                        data: data,
                        tim: vkNow()
                    }, _pads.shown == id && hasClass(_pads.cont, "pad_loading") && Pads.show(id, !0)
                }
            })
        }
    },
    go: function(a, e) {
        return checkEvent(e) === !1 && Pads.hide(), nav.go(a, e)
    },
    decr: function(a, e) {
        if (!(vk.counts[a] <= 0)) {
            var s = {
                fr: "friends",
                ph: "albums" + vk.id,
                vid: "video",
                gr: "groups"
            };
            handlePageCount(a, e ? 0 : vk.counts[a] - 1, s[a], 1)
        }
    },
    reposition: function() {
        _pads.shown && setStyle(_pads.wrap, {
            left: getXY(ge("l_" + _pads.shown), !0)[0] + (vk.rtl ? -Pads.coords[_pads.shown].w - 7 : 168)
        })
    },
    getEl: function(a) {
        var e;
        switch (a) {
            case "mus":
                e = ge("head_play_btn");
                break;
            case "game":
                e = ge("head_games");
                break;
            default:
                e = ge("l_" + a)
        }
        return e
    },
    setPos: function(a) {
        var e = Pads.coords[a],
            s = _pads.cache[a],
            d = Pads.getEl(a),
            t = getXY(d, !0),
            o = getXY("page_layout")[1],
            i = 33 + o,
            r = getSize(ge("page_header"))[1] + 6;
        if ("mus" == a) {
            var p, n, l, _, c = ge("wrap3"),
                u = getStyle(ge("page_header"), "position"),
                g = scrollGetY(),
                h = ge("head_play_btn"),
                f = ge("gp"),
                m = isVisible(f) && hasClass(f, "reverse"),
                v = "fixed" == u || "fixed" != u && g >= i && isVisible(f) || m || !ge("head_play_btn");
            ("im" == cur.module || "audio" == cur.module) && (v = 1), p = vk.rtl ? m ? getXY(c)[0] + getSize(c)[0] - e.w - 1 : getXY(c)[0] + 1 : m ? getXY(c)[0] + 1 : getXY(c)[0] + getSize(c)[0] - e.w - 1, l = m ? "auto" : (g >= i && isVisible(f) || !h ? 12 : r) + o, _ = m ? 15 : "auto", setStyle(_pads.wrap, {
                left: p,
                top: l,
                bottom: _
            }), toggleClass(_pads.wrap, "fixed", v), toggleClass(_pads.wrap, "pad_no_fixed", !v), v || m || !browser.mac || setTimeout(function() {
                var a = intval(_pads.wrap.style.top);
                _pads.wrap.style.top = a - scrollGetY() + "px", _pads.wrap.style.position = "fixed", setTimeout(function() {
                    _pads.wrap.style.position = "", _pads.wrap.style.top = a + "px"
                }, 0)
            }, 0), toggleClass(_pads.arrow, "head", (i > g || !isVisible(f)) && h && !_pads.gpClicked), toggleClass(f, "head", (i > g || !isVisible(f)) && h && !_pads.gpClicked), toggleClass(_pads.arrow, "right", (g >= i && isVisible(f) || !h) && !hasClass(f, "reverse")), toggleClass(_pads.arrow, "left", (g >= i && isVisible(f) || !h) && hasClass(f, "reverse"));
            var w = (i > g || !isVisible(f)) && h && !_pads.gpClicked;
            vk.rtl ? (p = m ? "auto" : w ? getXY(h)[0] - getXY(c)[0] + 1 : -10, n = m ? -10 : "auto") : (p = m ? -10 : "auto", n = m ? "auto" : w ? getSize(c)[0] + getXY(c)[0] - getXY(h)[0] - 20 : -10), l = m ? "auto" : w ? -10 : 17, _ = m ? 15 : "auto", setStyle(_pads.arrow, {
                top: l,
                bottom: _,
                left: p,
                right: n
            })
        } else {
            var s = {},
                P = isVisible(_stlSide),
                b = Pads.coords[a];
            if (P || show(_stlSide), s.fixpos = 0, P || hide(_stlSide), s.menuh = d.offsetHeight, s.middle = Math.floor((_pads.restrict[1] + _pads.restrict[0] - s.menuh) / 2), s.fixtop = Math.max(s.fixpos - s.middle, 4), s.fixbot = 7, s.justarrtop = t[1], s.basearrtop = t[1] - s.fixtop, s.basetop = t[1] - s.middle, extend(_pads.cur, s), removeClass(_pads.arrow, "left"), removeClass(_pads.arrow, "right"), b.bottom) {
                var c = ge("wrap3");
                addClass(_pads.arrow, "head"), addClass(f, "head");
                var C = d.offsetWidth,
                    y = b.w / 2,
                    x = getXY(c)[0] + getSize(c)[0] - 1;
                t[0] + C / 2 + y - x;
                y -= r + o;
                var p = t[0] + C / 2 - y;
                _pads.wrap.style.left = p + "px", _pads.wrap.style.top = r + o + "px", setStyle(_pads.arrow, {
                    top: "-10px",
                    left: y - 8 + "px"
                }), ("im" == cur.module || "audio" == cur.module) && (v = 1), toggleClass(_pads.wrap, "fixed", v), toggleClass(_pads.wrap, "pad_no_fixed", !v)
            } else removeClass(_pads.arrow, "head"), removeClass(f, "head"), _pads.wrap.style.left = t[0] + (vk.rtl ? -e.w - 7 : 168) + "px", _pads.wrap.style.bottom = "auto"
        }
        Pads.onScroll(!0, a)
    },
    onScroll: function(a, e) {
        var s = scrollGetY(),
            d = getXY("page_layout")[1],
            t = 33 + d,
            o = getSize(ge("page_header"))[1] + 6;
        if ("mus" == (e || _pads.shown)) {
            var i = ge("head_play_btn"),
                r = ge("gp"),
                p = "fixed" == getStyle(ge("page_header"), "position") || !i,
                n = isVisible(r) && hasClass(r, "reverse");
            if (n) {
                var p = "fixed" == getStyle(_pads.wrap, "position");
                toggleClass(_pads.arrow, "left", p), removeClass(_pads.arrow, "right"), toggleClass(_pads.arrow, "head", !p && !_pads.gpClicked), toggleClass(r, "head", !p && !_pads.gpClicked), setStyle(_pads.wrap, {
                    bottom: p ? "15px" : "auto",
                    top: p ? "auto" : o + d
                }), toggleClass(_pads.wrap, "fixed", p), toggleClass(_pads.wrap, "pad_no_fixed", !p)
            } else if (s >= t && isVisible(r) && !p || !i) addClass(_pads.arrow, "right"), removeClass(_pads.arrow, "left"), removeClass(_pads.arrow, "head"), removeClass(r, "head"), setStyle(_pads.wrap, {
                top: "12px",
                bottom: "auto"
            }), addClass(_pads.wrap, "fixed"), removeClass(_pads.wrap, "pad_no_fixed"), vk.rtl ? setStyle(_pads.arrow, {
                top: "17px",
                left: "-10px"
            }) : setStyle(_pads.arrow, {
                top: "17px",
                right: "-10px"
            });
            else if (removeClass(_pads.arrow, "left"), toggleClass(_pads.arrow, "right", _pads.gpClicked), toggleClass(_pads.arrow, "head", !_pads.gpClicked), toggleClass(r, "head", !_pads.gpClicked), toggleClass(_pads.wrap, "fixed", p), toggleClass(_pads.wrap, "pad_no_fixed", !p), setStyle(_pads.wrap, {
                    top: o + d,
                    bottom: "auto"
                }), _pads.gpClicked) vk.rtl ? setStyle(_pads.arrow, {
                top: "17px",
                left: "-10px"
            }) : setStyle(_pads.arrow, {
                top: "17px",
                right: "-10px"
            });
            else {
                var l = ge("wrap3");
                if (vk.rtl) {
                    var _ = getXY(i)[0] - getXY(l)[0] + 1;
                    setStyle(_pads.arrow, {
                        top: "-10px",
                        left: _ + "px",
                        right: "auto"
                    })
                } else {
                    var c = getSize(l)[0] + getXY(l)[0] - getXY(i)[0] - 20;
                    setStyle(_pads.arrow, {
                        top: "-10px",
                        right: c + "px"
                    })
                }
            }
        } else {
            if (Pads.coords[e || _pads.shown].bottom) return !1;
            _fixedNav && (s = 0);
            var u = _pads.cur.fixtop,
                g = _pads.cur.basearrtop - s,
                h = a === !0;
            g > _pads.cur.middle && (u += g - _pads.cur.middle, g = _pads.cur.middle), g > _pads.restrict[1] - _pads.cur.menuh && (u = _pads.cur.basetop - s), u + _pads.height > lastWindowHeight - _pads.cur_fixbot && (u = lastWindowHeight - _pads.cur_fixbot - _pads.height, 4 > u && (u = 4)), 7 > u + s && (u = 7 - s), g = _pads.cur.justarrtop - s - u, u > _pads.cur.fixtop && u > 7 && "im" != cur.module && "audio" != cur.module ? (u += s, (h || _pads.cur.fixed !== !1) && (removeClass(_pads.wrap, "fixed"), addClass(_pads.wrap, "pad_no_fixed"), _pads.cur.fixed = !1)) : (h || _pads.cur.fixed !== !0) && (removeClass(_pads.wrap, "pad_no_fixed"), addClass(_pads.wrap, "fixed"), _pads.cur.fixed = !0), _pads.wrap.style.top = u + "px", g < _pads.restrict[0] - _pads.cur.menuh && g > 0 ? (h || "blue" !== _pads.cur.arrshown) && (show(_pads.arrow), addClass(_pads.arrow, "blue"), _pads.cur.arrshown = "blue") : g > _pads.restrict[1] - _pads.cur.menuh || g < _pads.restrict[0] ? (h || _pads.cur.arrshown !== !1) && (hide(_pads.arrow), _pads.cur.arrshown = !1) : (h || _pads.cur.arrshown !== !0) && (show(_pads.arrow), removeClass(_pads.arrow, "blue"), _pads.cur.arrshown = !0), _pads.cur.arrshown && (_pads.arrow.style.top = Math.ceil(g + (_pads.cur.menuh - 17) / 2) + "px")
        }
    },
    show: function(id, ev) {
        if (checkEvent(ev) !== !0 && !browser.msie6 && !vk.isBanned) {
            if (_pads.shown == id && ev !== !0) return Pads.hide(), cancelEvent(ev);
            _pads.shown && _pads.topLoad && removeClass(ge("head_" + ("mus" == _pads.shown ? "music" : "games")), "over"), _pads.topLoad = !1, "msg" == id && stManager.add(["pads_im.css", "pads_im.js", "page.css", "page.js"]), "mus" != id || padAudioPlaylist() || Pads.invalidate(id), "mus" != id && _pads.gpClicked && (_pads.gpClicked = !1), _pads.gpClicked = !!_pads.gpClicked;
            var d = Pads.coords[id],
                el = Pads.getEl(id),
                c = _pads.cache[id],
                bd = browser.msie && browser.version < 9,
                playBtn = ge("head_play_btn");
            if (c ? c.tim || (c = 0) : Pads.preload(id), _pads.wrap || (_pads.cont = domLC(_pads.wrap = bodyNode.appendChild(ce("div", {
                    id: "pad_wrap",
                    className: "fixed",
                    innerHTML: '<div id="pad_arrow"></div><div id="pad_cont"></div>'
                }, {
                    opacity: bd ? "" : 0
                }))), _pads.arrow = ge("pad_arrow")), ge("gp")) {
                var topOffset = 33 + getXY("page_layout")[1];
                toggleClass(ge("gp"), "head", "mus" == id && scrollGetY() < topOffset && !hasClass(ge("gp"), "reverse") && !_pads.gpClicked), toggleClass(ge("gp").firstChild, "active", "mus" == id)
            }
            if ("mus" == id && (c || addClass(_pads.arrow, "no_data")), "game" == id || "mus" == id && !_pads.gpClicked) {
                if ("mus" == id) var wDiff = 0,
                    loadEl = ge("head_music_text");
                else var wDiff = -20,
                    loadEl = el;
                if (loadEl)
                    if (c) loadEl.padLoad && (loadEl.innerHTML = loadEl.padLoad, delete loadEl.padLoad), animate(_pads.wrap, {
                        opacity: 1
                    }, 200);
                    else {
                        var s = getSize(loadEl);
                        setStyle(loadEl, {
                            width: s[0] + wDiff,
                            display: "inline-block"
                        }), loadEl.padLoad = loadEl.innerHTML, loadEl.innerHTML = '<img style="position: absolute; margin-top: 3px; margin-left: ' + ((s[0] + wDiff) / 2 - 16) + 'px;" src="/images/upload_inv' + (window.devicePixelRatio >= 2 ? "_2x" : "") + '.gif" width="32" height="8"/>&nbsp;'
                    }
                addClass(ge("head_" + ("mus" == id ? "music" : "games")), "over"), _pads.topLoad = !0
            }
            if (setStyle(_pads.cont, {
                    width: c ? d.w : d.w - 2
                }), (c ? removeClass : addClass)(_pads.cont, "pad_loading"), val(_pads.cont, (c || {}).html || ""), _pads.shown) {
                if (_pads.shown != id) {
                    var lnk = ge("l_" + _pads.shown);
                    removeClass(domFC(lnk), "left_nav_over"), vk.counts[_pads.shown] < 0 && hide(lnk)
                }
            } else bd ? show(_pads.wrap) : (isVisible(_pads.wrap) || (setStyle(_pads.wrap, {
                opacity: 0
            }), show(_pads.wrap)), _pads.topLoad || animate(_pads.wrap, {
                opacity: 1
            }, 200));
            if (cur.hideGifts && cur.hideGifts(), addClass(domFC(el), "left_nav_over"), Pads.deinit(), _pads.wrap.style.position = _pads.arrow.style.left = _pads.arrow.style.right = _pads.arrow.style.bottom = "", removeClass(_pads.arrow, "blue"), _pads.cur = {}, _pads.content = ge("pad_content"), c && c.script && eval("(function(id){" + c.script + "})('" + id + "')"), "msg" == id && window.PadsIm && ge("pad_im_hrows")) PadsIm.init();
            else if (_pads.content) {
                var scrollElements = [];
                "mus" == id && scrollElements.push(ge("pad_side_filters_wrap")), _pads.scroll = new Scrollbar(_pads.content, {
                    prefix: "pad_",
                    shadows: "game" == id,
                    nomargin: !0,
                    global: !0,
                    nokeys: !0,
                    right: vk.rtl ? "auto" : "mus" == id ? 0 : 1,
                    left: vk.rtl ? "mus" == id ? 0 : 1 : "auto",
                    forceCancelEvent: "mus" == id,
                    scrollElements: scrollElements,
                    wheelObj: _pads.content
                }), _pads.content.onscroll = Pads.scroll, _pads.scroll.scrollTop(0)
            } else _pads.scroll = 0;
            var row = domFC(ge("pad_rows")),
                needClean = "nws" == id && vk.counts[id] > 0;
            return Pads.init(id), Pads.setPos(id), _pads.shown = id, row ? vkNow() - c.tim > 3e3 ? ajax.post("pads.php", {
                act: "pad",
                offset: 0,
                pad_id: id,
                till: row.id.replace("pad_" + id, "")
            }, {
                onDone: function(a, e, s) {
                    void 0 !== s && null !== s && s > -1 && handlePageCount(id, s), _pads.shown == id && (a || Pads.invalidate(), Pads.feed(a, e, !0), needClean && ajax.post("pads.php", {
                        act: "clean",
                        pad_id: id,
                        hash: _pads.hash
                    }))
                }
            }) : needClean && ajax.post("pads.php", {
                act: "clean",
                pad_id: id,
                hash: _pads.hash
            }) : Pads.invalidate(), ev ? cancelEvent(ev) : !1
        }
    },
    deinit: function() {
        _pads.cur && ("msg" == _pads.shown && window.PadsIm && ge("pad_im_hrows") && PadsIm.destroy(), ((_pads.cur.tipEl || {}).tt || {}).destroy && _pads.cur.tipEl.tt.destroy(), _pads.cur = 0)
    },
    hide: function() {
        if (!_pads.shown || _pads.cont && hasClass(_pads.cont, "pad_loading")) return !0;
        "mus" == _pads.shown && (ge("gp") && (removeClass(ge("gp").firstChild, "active"), _pads.gpClicked = !1), window.audioPlayer && audioPlayer.controls && audioPlayer.controls.pd && audioPlayer.controls.pd.status && audioPlayer.controls.pd.status.tt && hide(audioPlayer.controls.pd.status.tt.container), window.Audio && Audio.stopPadEvents()), _pads.topLoad && removeClass(ge("head_" + ("mus" == _pads.shown ? "music" : "games")), "over"), _pads.layerBG && (re(_pads.layerBG), _pads.layerBG = 0);
        var a = ge("l_" + _pads.shown);
        return removeClass(domFC(a), "left_nav_over"), vk.counts[_pads.shown] < 0 && hide(a), _pads.shown = 0, updGlobalPlayer(), browser.msie && browser.version < 9 ? Pads.hidden() : animate(_pads.wrap, {
            opacity: 0
        }, 200, Pads.hidden), !0
    },
    boxHide: function() {
        curBox().hide(), Pads.hide()
    },
    hidden: function() {
        Pads.deinit(), re(_pads.wrap), _pads.scroll && _pads.scroll.destroy(), _pads.scroll = _pads.cont = _pads.content = _pads.wrap = 0
    },
    lock: function(a) {
        "A" == a.tagName ? (a.saved = val(a), val(a, '<span class="progress_inline"></span>')) : "button" == a.className ? addClass(domPN(a), "pad_btn_prg") : lockButton(a)
    },
    unlock: function(a) {
        a.saved ? (val(a, a.saved), a.saved = !1) : "button" == a.className ? removeClass(domPN(a), "pad_btn_prg") : unlockButton(a)
    },
    invalidate: function(a) {
        delete _pads.cache[a || _pads.shown]
    },
    preloadMore: function() {
        if (void 0 === _pads.cur.more && isVisible("pad_more")) {
            _pads.cur.more = "load";
            var a = _pads.shown;
            ajax.post("pads.php", {
                act: "pad",
                offset: _pads.cur.offset,
                pad_id: _pads.shown,
                pad_section: _pads.cur.sect || 0
            }, {
                onDone: function(e, s, d) {
                    void 0 !== d && null !== d && d > -1 && handlePageCount(a, d);
                    var t = "show" == _pads.cur.more;
                    _pads.cur.more = e, _pads.cur.all = s, t && Pads.more()
                }
            })
        }
    },
    feed: function(a, e, s) {
        var d = ce("div", {
                innerHTML: a
            }),
            t = [],
            o = ge("pad_rows"),
            i = o.firstChild;
        if ((!a || e) && hide("pad_more"), s && !ge(domLC(d).id)) return val(o, a), void Pads.init(_pads.shown);
        for (var r = domFC(d); r; r = domFC(d))
            if (++_pads.cur.offset, ge(r.id)) {
                if (s) {
                    --_pads.cur.offset;
                    break
                }
                re(r)
            } else s ? (o.insertBefore(r, i), Pads.invalidate()) : o.appendChild(r), hasClass(r, "pad_msg_new") ? t.push(r.id.replace("pad_msg", "")) : hasClass(r, "pad_ap_new") && t.push(r.id.replace(/pad_apn_\d+_/, ""));
        Pads.updateHeight(), "msg" == _pads.shown ? Pads.msgMark(t) : "ap" == _pads.shown && Pads.apMark(t)
    },
    more: function(a) {
        return checkEvent(a) !== !0 ? (void 0 !== _pads.cur.more ? "load" == _pads.cur.more ? _pads.cur.more = "show" : "show" != _pads.cur.more && (Pads.feed(_pads.cur.more, _pads.cur.all), delete _pads.cur.more, Pads.preloadMore()) : (_pads.cur.more = "show", Pads.preloadMore()), a ? cancelEvent(a) : !1) : void 0
    },
    handleFilterPos: function() {
        var a, e = ge("pad_side_filters"),
            s = ge("pad_side_filters_wrap"),
            d = _pads.cur.filterLastPos || 0,
            t = _pads.cur.lastSt || 0,
            o = _pads.content.scrollTop,
            i = getSize(e)[1],
            r = getSize(s)[1];
        a = Math.min(0, Math.max(d + t - o, r - i - 10)), setStyle(e, {
            top: a
        }), _pads.cur.filterLastPos = a, _pads.cur.lastSt = o
    },
    scroll: function() {
        if ("mus" == _pads.shown) {
            var a = ge("pad_more_audio"),
                e = ge("pad_more_search_link");
            if (Pads.handleFilterPos(), !window.Audio || !Audio.showRows) return;
            return a && isVisible(a) && _pads.content.scrollTop + _pads.content.offsetHeight + 400 > a.offsetTop && Audio.showRows({
                from_pad: !0
            }), void(e && isVisible(e) && _pads.content.scrollTop + _pads.content.offsetHeight + 400 > e.offsetTop && Audio.loadRows(!0))
        }
        var a = ge("pad_more");
        a && isVisible(a) && (_pads.content.scrollTop > 0 && Pads.preloadMore(), _pads.content.scrollTop + _pads.content.offsetHeight > a.offsetTop && Pads.more())
    },
    init: function(a) {
        var e = ge("pad_rows");
        e && domFC(e) && (extend(_pads.cur, {
            processed: {},
            savedcnts: {},
            offset: e.childNodes.length
        }), extend(_pads, {
            editing: {}
        })), Pads.updateHeight(a)
    },
    update: function() {
        _pads.scroll && _pads.scroll.update(!1, !0)
    },
    showTip: function(a, e) {
        var s = geByClass1("pad_" + _pads.shown + "_btns"),
            d = _pads.cur.tipEl;
        if (s && d) return e ? (domPN(d) != s && s.insertBefore(d, domFC(d)), (d.tt || {}).show ? void d.tt.show() : void showTooltip(d, {
            text: _pads.cur.tip,
            className: "pad_submit_tt rich wall_tt",
            shift: [3, 15, 13],
            forcetodown: 1,
            slide: 15,
            showdt: 400,
            hidedt: 400,
            hasover: 1,
            onCreate: function() {
                var a = Array.prototype.slice.apply(geByClass("radiobtn", ge("pad_submit_hint_opts"))),
                    e = _pads.cur.subm ? 1 : 0;
                addClass(a[e], "on"), removeClass(a[1 - e], "on"), radioBtns.pad_submit = {
                    els: a,
                    val: e
                }
            }
        })) : void(((d || {}).tt || {}).hide && d.tt.hide())
    },
    submitChange: function(a) {
        _pads.cur.subm = a, _pads.cache[_pads.shown] && (_pads.cache[_pads.shown].subm = a);
        var e = "msg" == _pads.shown ? "al_im.php" : "al_wall.php";
        ajax.post(e, {
            act: "a_save_ctrl_submit",
            value: a,
            hash: _pads.hash
        })
    },
    onSubmit: function(a, e, s) {
        if (e = e || window.event, (e.keyCode == KEY.RETURN || 10 == e.keyCode) && (_pads.cur.subm && (e.ctrlKey || browser.mac && e.metaKey) || !_pads.cur.subm && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey))) return s(), cancelEvent(e);
        if (e.ctrlKey && e.keyCode == KEY.RETURN) {
            var d = val(a);
            if ("number" == typeof a.selectionStart && "number" == typeof a.selectionEnd) {
                var t = a.selectionStart;
                a.value = d.slice(0, t) + "\n" + d.slice(a.selectionEnd), a.selectionStart = a.selectionEnd = t + 1
            } else if (document.selection && document.selection.createRange) {
                a.focus();
                var o = document.selection.createRange();
                o.text = "\r\n", o.collapse(!1), browser.opera && (o.moveEnd("character", 0), o.moveStart("character", 0)), o.select()
            }
            return a.autosize.update(), setTimeout(function() {
                a.autosize.update()
            }, 0), !1
        }
    },
    updateHeight: function(a) {
        var e = ge("pad_rows"),
            s = intval(window.lastWindowHeight);
        if (!e) return void(_pads.restrict = [0, _pads.height = _pads.wrap.offsetHeight]);
        var d, t = _pads.content.offsetTop,
            o = _pads.content.offsetHeight;
        switch (a || _pads.shown) {
            case "fr":
            case "gr":
                var i = e.childNodes,
                    r = i.length,
                    p = Math.min(2, r - 1);
                d = i[p].offsetTop + i[p].offsetHeight - (r > 3 ? 1 : 0);
                break;
            case "ph":
            case "vid":
                d = 520;
                break;
            case "mus":
                d = 430;
                var n = getXY("page_layout")[1],
                    l = getSize(ge("page_header"))[1] + 6;
                s && (d = Math.max(Math.min(d, s - 104 - l + n), 200));
                break;
            case "msg":
                d = 520, extend(_pads, {
                    editing: _pads.editing || {}
                });
                for (var _ = [], p = domFC(e); p; p = domNS(p)) hasClass(p, "pad_msg_new") && _.push(p.id.replace("pad_msg", ""));
                Pads.msgMark(_);
                break;
            case "nws":
                d = 520, extend(_pads, {
                    editing: _pads.editing || {}
                }), handlePageCount("nws", 0, "feed" + (ge("l_nwsf") ? "?section=notifications" : ""), ge("l_nwsf") ? "" : "section=notifications");
                break;
            case "ap":
                var i = e.childNodes,
                    r = i.length,
                    p = Math.min(3, r - 1);
                d = i[p].offsetTop + i[p].offsetHeight - (r > 4 ? 1 : 0);
                for (var _ = [], p = domFC(e); p; p = domNS(p)) hasClass(p, "pad_ap_new") && _.push(p.id.replace(/pad_apn_\d+_/, ""));
                Pads.apMark(_)
        }
        _pads.height = _pads.wrap.offsetHeight, s && "mus" != (a || _pads.shown) && (d = Math.max(Math.min(d, s - (_pads.height - o) - 11), 150)), d = Math.min(e.offsetHeight, d), setStyle(_pads.content, {
            height: d
        }), _pads.height += d - o, _pads.restrict = [t, t + d], Pads.update()
    },
    frDone: function(a, e, s) {
        if (e) s = '<span class="pad_error">' + s + "</span>", _pads.cur.processed[a] > 0 && delete _pads.cur.processed[a];
        else if (_pads.cur.processed[a] > 0 && vk.counts.fr >= _pads.cur.savedcnts[a]) {
            Pads.decr("fr");
            for (var d in _pads.cur.savedcnts) --_pads.cur.savedcnts[d]
        }
        delete _pads.cur.savedcnts[a];
        var t = ge("pad_fr" + a),
            o = geByClass1("pad_fr_btns", t) || geByClass1("pad_fr_result", t);
        return domPN(o).replaceChild(ce("div", {
            innerHTML: s,
            className: "pad_fr_result"
        }), o), !0
    },
    frProcess: function(a, e, s) {
        if (_pads.cur.processed[e]) {
            if (-2 != s) return;
            _pads.cur.processed[e] = -1
        } else _pads.cur.processed[e] = 1, _pads.cur.savedcnts[e] = vk.counts.fr, --_pads.cur.offset;
        var d = -2 == s ? "report_spam" : -1 == s ? "hide_suggestion" : s ? "add" : "remove";
        ajax.post("al_friends.php", {
            act: d,
            mid: e,
            from: "pad",
            hash: _pads.hash
        }, {
            onDone: Pads.frDone.pbind(e, !1),
            onFail: Pads.frDone.pbind(e, !0),
            showProgress: Pads.lock.pbind(a),
            hideProgress: Pads.unlock.pbind(a)
        }), Pads.invalidate()
    },
    frPhotoOut: function(a) {
        var e = domFC(a);
        e && "A" == e.tagName && "pad_fr_phbig" == e.className && (clearTimeout(e.hideTO), e.hideTO = setTimeout(function() {
            animate(e, {
                marginTop: 75
            }, 200), delete _pads.frPhotoShown[e._uid]
        }, 150))
    },
    frPhotoClick: function(a, e) {
        if (checkEvent(e) === !1) {
            var s = _pads.frPhotoCache[a];
            if ("load" == s || "show" == s) return _pads.frPhotoCache[a] = "show", cancelEvent(e);
            if (s) return showPhoto(s._id, "album" + a + "_0/rev", extend({
                jumpTo: {
                    z: "albums" + a
                }
            }, s), e)
        }
    },
    frPhotoOver: function(a, e) {
        if (window.lang && lang.global_photo_full_size && !browser.mobile) {
            _pads.frPhotoCache || extend(_pads, {
                frPhotoCache: {},
                frPhotoShown: {}
            });
            var s = domFC(a),
                d = _pads.frPhotoCache[e];
            ("A" != s.tagName || "pad_fr_phbig" != s.className) && ((s = a.insertBefore(ce("a", {
                className: "pad_fr_phbig",
                href: d && d._id ? "/photo" + d._id + "?all=1" : "/albums" + e,
                innerHTML: '<span class="pad_fr_phlabel">' + getLang("global_photo_full_size") + "</span>"
            }), a.firstChild)).onclick = Pads.frPhotoClick.pbind(e), s._uid = e), clearTimeout(s.hideTO), animate(s, {
                marginTop: 50
            }, {
                duration: 200,
                transition: Fx.Transitions.easeOutCirc
            }), _pads.frPhotoShown[e] = s, void 0 === d && (_pads.frPhotoCache[e] = "load", ajax.post("al_photos.php", {
                act: "fast_get_photo",
                oid: e
            }, {
                onDone: function(d) {
                    if (!d) return a.onmouseover = function() {}, void re(a.firstChild);
                    var t = "show" == _pads.frPhotoCache[e];
                    _pads.frPhotoCache[e] = d, s.href = "/photo" + d._id + "?all=1", t && Pads.frPhotoClick(e)
                },
                onFail: function() {
                    return a.onmouseover = function() {}, re(a.firstChild), !0
                }
            })), a.onmouseout || (a.onmouseout = Pads.frPhotoOut.pbind(a))
        }
    },
    phDone: function(a, e, s) {
        if (e) s = '<span class="pad_error">' + s + "</span>", _pads.cur.processed[a] > 0 && delete _pads.cur.processed[a];
        else if (_pads.cur.processed[a] > 0 && vk.counts.ph >= _pads.cur.savedcnts[a]) {
            Pads.decr("ph");
            for (var d in _pads.cur.savedcnts) --_pads.cur.savedcnts[d]
        }
        delete _pads.cur.savedcnts[a];
        var t = ge("pad_ph" + a),
            o = geByClass1("pad_ph_btns", t) || geByClass1("pad_ph_result", t);
        if (t) return geByClass1("pad_ph_lnk", t).href = "/photo" + a, domPN(o).replaceChild(ce("div", {
            innerHTML: s,
            className: "pad_ph_result"
        }), o), !0
    },
    phProcess: function(a, e, s) {
        if (_pads.cur.processed[e]) {
            if (-2 != s) return;
            _pads.cur.processed[e] = -1
        } else _pads.cur.processed[e] = 1, _pads.cur.savedcnts[e] = vk.counts.ph, --_pads.cur.offset;
        var d = -2 == s ? "spam_photo" : s ? "confirm_tag" : "delete_tag";
        ajax.post("al_photos.php", {
            act: d,
            photo: e,
            from: "pad",
            hash: _pads.hash
        }, {
            onDone: Pads.phDone.pbind(e, !1),
            onFail: Pads.phDone.pbind(e, !0),
            showProgress: Pads.lock.pbind(a),
            hideProgress: Pads.unlock.pbind(a)
        }), Pads.invalidate();
        for (var t in cur.pvData || {}) t.match(/^[a-f0-9]+$/) && delete cur.pvData[t];
        for (var t in ajaxCache) t.match(/\/al_photos\.php\#act\=show\&list=[a-f0-9]+\&/) && delete ajaxCache[t]
    },
    vidDone: function(a, e, s) {
        if (e) s = '<span class="pad_error">' + s + "</span>", _pads.cur.processed[a] > 0 && delete _pads.cur.processed[a];
        else if (_pads.cur.processed[a] > 0 && vk.counts.vid >= _pads.cur.savedcnts[a]) {
            Pads.decr("vid");
            for (var d in _pads.cur.savedcnts) --_pads.cur.savedcnts[d]
        }
        delete _pads.cur.savedcnts[a];
        var t = ge("pad_vid" + a),
            o = geByClass1("pad_vid_btns", t) || geByClass1("pad_vid_result", t);
        if (t) return domPN(o).replaceChild(ce("div", {
            innerHTML: s,
            className: "pad_vid_result"
        }), o), !0
    },
    vidProcess: function(a, e, s) {
        if (_pads.cur.processed[e]) {
            if (-2 != s) return;
            _pads.cur.processed[e] = -1
        } else _pads.cur.processed[e] = 1, _pads.cur.savedcnts[e] = vk.counts.vid, --_pads.cur.offset;
        var d = -2 == s ? "spam_video" : s ? "confirm_tag" : "delete_tag";
        ajax.post("al_video.php", {
            act: d,
            video: e,
            from: "pad",
            hash: _pads.hash
        }, {
            onDone: Pads.vidDone.pbind(e, !1),
            onFail: Pads.vidDone.pbind(e, !0),
            showProgress: Pads.lock.pbind(a),
            hideProgress: Pads.unlock.pbind(a)
        }), Pads.invalidate(), window.mvcur && !mvcur.mvShown && (mvcur.mvData = !1);
        for (var t in ajaxCache) t.match(/\/al_video\.php\#act\=show\&autoplay=1\&list=[a-f0-9]+\&/) && delete ajaxCache[t]
    },
    grShowMapBox: function(a) {
        window.showZeroZoneBox && showZeroZoneBox("places", function() {
            Pads.grShowMapBox(a)
        }) || showTabbedBox("/al_places.php", {
            act: "show_photo_place",
            place_id: a
        }, {
            stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js"]
        })
    },
    grDone: function(a, e, s, d, t) {
        if (e) t = '<span class="pad_error">' + t + "</span>", _pads.cur.processed[a] > 0 && delete _pads.cur.processed[a];
        else {
            if (_pads.cur.processed[a] > 0 && vk.counts.gr >= _pads.cur.savedcnts[a]) {
                Pads.decr("gr");
                for (var o in _pads.cur.savedcnts) --_pads.cur.savedcnts[o]
            }
            d > 0 ? (t = '<div class="pads_gr_clubinv_block">' + t.replace("{club}", "<b>" + val(domPS(ge("pads_clubinv" + a))) + "</b>") + "</div>", t += '<div class="pads_gr_clubinv_block"><a onclick="Pads.grProcess(this, ' + a + ', -2, -1)">' + getLang("global_cancel") + "</a></div>") : !d && 0 > s && ge("pads_clubinv" + a) && (t += '<div class="pads_gr_clubinv_block"><a onclick="Pads.grProcess(this, ' + a + ', -2, 1)">' + val("groups_block_clubinv").replace("{club}", "<b>" + val(domPS(ge("pads_clubinv" + a))) + "</b>") + "</a></div>")
        }
        delete _pads.cur.savedcnts[a];
        var i = ge("pad_gr" + a),
            r = geByClass1("pad_gr_btns", i) || geByClass1("pad_gr_result", i);
        return !e && 0 > d && (t = r.oldtext), domPN(r).replaceChild(ce("div", {
            innerHTML: t,
            className: "pad_gr_result",
            oldtext: val(r)
        }), r), !0
    },
    grProcess: function(a, e, s, d) {
        if (_pads.cur.processed[e]) {
            if (-2 != s) return;
            _pads.cur.processed[e] = -1
        } else _pads.cur.processed[e] = 1, _pads.cur.savedcnts[e] = vk.counts.gr, --_pads.cur.offset;
        var t = -2 == s ? "spam" : s ? "enter" : "leave",
            o = -1 == s ? "_decline" : 2 == s ? "_unsure" : "";
        ajax.post("al_groups.php", {
            act: t,
            gid: e,
            from: "pad",
            context: o,
            hash: _pads.hash,
            block: d
        }, {
            onDone: Pads.grDone.pbind(e, !1, s, d),
            onFail: Pads.grDone.pbind(e, !0, s, d),
            showProgress: Pads.lock.pbind(a),
            hideProgress: Pads.unlock.pbind(a)
        }), Pads.invalidate()
    },
    msgAnswer: function(a, e, s) {
        var d = ge("pad_msg_field" + e),
            t = val("pad_msgd" + e).split("/"),
            o = "";
        if (s === !1 || s === !0) {
            if (!d) return
        } else {
            s = s || window.event;
            for (var i = s.target || s.srcElement; i; i = domPN(i))
                if ("A" == i.tagName || (i.className || "").match(/(\s|^)pad_msgr(\s|$)/)) return;
            if (trim((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || document.selection && document.selection.createRange().text || "").toString()).length) return
        }
        if (d) {
            if (s !== !1 && trim(val(d))) return s === !0 ? !0 : elfocus(d);
            re(geByClass1("pad_msgr", a)), removeClass(a, "pad_msg_reply"), delete _pads.editing[e], s !== !0 && (isEmpty(_pads.editing) && _pads.layerBG && (re(_pads.layerBG), _pads.layerBG = 0), Pads.update())
        } else {
            for (var r in _pads.editing) Pads.msgAnswer(ge("pad_msg" + r), r, !0);
            t[1] && (o = "<a onclick=\"showBox('al_im.php', {act: 'a_show_members_box', chat: " + (intval(t[0]) - 2e9) + "}, {stat: ['im.css', 'boxes.css'], params: {dark: 1}})\" class=\"pad_msg_rcpts fl_l\">" + getLang("mail_chat_X_rcpts", intval(t[1])) + "</a>");
            var p = geByClass1("pad_msg_wrap", a).appendChild(ce("div", {
                className: "pad_msga pad_msgr",
                innerHTML: val("pad_msg_reply_tpl").replace("{field}", "<textarea onkeydown=\"Pads.onSubmit(this, event, Pads.msgSend.pbind(geByTag1('button', this.parentNode), " + e + '))" id="pad_msg_field' + e + '" class="pad_msg_field"></textarea><div class="pad_msg_btns clear_fix">  <div class="pad_msg_btn button_blue fl_l">    <button onclick="Pads.msgSend(this, ' + e + ')" onmouseover="Pads.showTip(' + e + ', 1)" onmouseout="Pads.showTip(' + e + ', 0)">' + getLang("global_send") + "</button>  </div>" + o + "</div>")
            }));
            d = ge("pad_msg_field" + e), addClass(a, "pad_msg_reply"), autosizeSetup(d, {
                minHeight: 31,
                onResize: Pads.update
            }), _pads.editing[e] = 1, _pads.layerBG || (_pads.layerBG = bodyNode.appendChild(ce("div", {
                id: "pad_layer_bg",
                className: "fixed",
                onclick: Pads.msgHide
            })));
            var n = p.offsetTop + p.offsetHeight - _pads.content.scrollTop - _pads.content.offsetHeight + 15,
                t = function() {
                    Pads.update(), elfocus(d)
                };
            n > 0 ? animate(_pads.content, {
                scrollTop: _pads.content.scrollTop + n
            }, 200, t) : t()
        }
    },
    msgHide: function(a) {
        if (a = a || window.event, a.target == ge("pad_layer_bg")) {
            for (var e in _pads.editing)
                if (trim(val("pad_msg_field" + e))) return showFastBox(getLang("global_warning"), getLang("mail_are_sure_close"), getLang("mail_pad_cancel"), Pads.boxHide, getLang("global_cancel"));
            Pads.hide()
        }
    },
    msgMark: function(a) {
        a.length && ajax.post("al_mail.php", {
            act: "a_mark",
            mark: "read",
            msgs_ids: a.join(","),
            hash: _pads.hash
        }, {
            onDone: function(a, e) {
                handlePageCount("msg", e)
            }
        })
    },
    msgDone: function(a, e, s) {
        var d = ge("pad_msg" + a);
        if (e) {
            var t = geByClass1("pad_msg_error", d),
                o = 0;
            if (t) o -= t.offsetHeight;
            else {
                var i = geByClass1("pad_msga_wrap", geByClass1("pad_msgr", d));
                if (!i) return;
                t = i.insertBefore(ce("div", {
                    className: "pad_msg_error msg"
                }), domFC(i)), o = 8
            }
            val(t, s), o += t.offsetHeight, o && (_pads.content.scrollTop += o, Pads.update()), setStyle(t, {
                backgroundColor: "#F4EBBD"
            }), animate(t, {
                backgroundColor: "#F9F6E7"
            }, 2e3), setTimeout(elfocus.pbind("pad_msg_field" + a), 0)
        } else {
            ge("pad_msg_field" + a) && Pads.msgAnswer(ge("pad_msg" + a), a, !1);
            var i = geByClass1("pad_msg_wrap", d),
                r = geByClass1("pad_msga", d),
                p = se(s);
            r ? i.replaceChild(p, r) : i.appendChild(p)
        }
        return !0
    },
    msgSend: function(a, e) {
        if (!buttonLocked(a)) {
            var s = trim(val("pad_msg_field" + e));
            if (!s) return elfocus("pad_msg_field" + e);
            ajax.post("al_mail.php", {
                act: "a_send",
                to_id: intval(val("pad_msgd" + e)),
                from: "pad",
                hash: _pads.hash,
                message: s
            }, {
                onDone: Pads.msgDone.pbind(e, !1),
                onFail: Pads.msgDone.pbind(e, !0),
                showProgress: Pads.lock.pbind(a),
                hideProgress: Pads.unlock.pbind(a)
            }), Pads.invalidate()
        }
    },
    nwsAnswer: function(a, e, s) {
        var d = _pads.editing[a],
            t = ge("pad_nws_field" + a),
            o = val("pad_nwsd" + a).split("/"),
            i = ge("pad_nws" + a);
        if (e === !1 || e === !0) {
            if (!d) return
        } else {
            e = e || window.event;
            for (var r = e.target || e.srcElement; r; r = domPN(r))
                if ("A" == r.tagName || (r.className || "").match(/(\s|^)pad_nwsr(\s|$)/)) return;
            if (trim((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || document.selection && document.selection.createRange().text || "").toString()).length) return
        }
        if (d) {
            if (e !== !1) {
                var p = t ? val(t) : "";
                if (trim(p) && 0 !== d.greet.indexOf(p)) return e === !0 ? !0 : elfocus(t)
            }
            t && cleanElems(t), re(geByClass1("pad_nwsr", i)), removeClass(i, "pad_nws_reply"), delete _pads.editing[a], e !== !0 && (isEmpty(_pads.editing) && _pads.layerBG && (re(_pads.layerBG), _pads.layerBG = 0), Pads.update())
        } else {
            for (var n in _pads.editing) Pads.nwsAnswer(n, !0, _pads.editing[n]);
            if (addClass(i, "pad_nws_reply"), _pads.editing[a] = s, s.disabled) var l = geByClass1("pad_nws_cont", i).appendChild(ce("div", {
                className: "pad_nwsa pad_nwsr",
                innerHTML: val("pad_nws_dis_tpl").replace("{text}", s.disabled)
            }));
            else {
                var l = geByClass1("pad_nws_cont", i).appendChild(ce("div", {
                    className: "pad_nwsa pad_nwsr",
                    innerHTML: val("pad_nws_reply_tpl").replace("{field}", "<textarea onkeydown=\"Pads.onSubmit(this, event, Pads.nwsSend.pbind(geByTag1('button', this.parentNode), '" + a + '\'))" id="pad_nws_field' + a + '" class="pad_nws_field" placeholder="' + s.ph + '">' + s.greet + '</textarea><div class="pad_nws_btns clear_fix">  <div class="pad_nws_btn button_blue fl_l">    <button onclick="Pads.nwsSend(this, \'' + a + "')\" onmouseover=\"Pads.showTip('" + a + "', 1)\" onmouseout=\"Pads.showTip('" + a + "', 0)\">" + s.btn + "</button>  </div></div>")
                }));
                t = ge("pad_nws_field" + a), placeholderSetup(t, {
                    back: !0
                }), autosizeSetup(t, {
                    minHeight: 31,
                    onResize: Pads.update
                })
            }
            _pads.layerBG || (_pads.layerBG = bodyNode.appendChild(ce("div", {
                id: "pad_layer_bg",
                className: "fixed",
                onclick: Pads.nwsHide
            })));
            var _ = l.offsetTop + l.offsetHeight - _pads.content.scrollTop - _pads.content.offsetHeight + 15,
                o = function() {
                    Pads.update(), t && elfocus(t)
                };
            _ > 0 ? animate(_pads.content, {
                scrollTop: _pads.content.scrollTop + _
            }, 200, o) : o()
        }
    },
    nwsHide: function(a) {
        if (a = a || window.event, a.target == ge("pad_layer_bg")) {
            for (var e in _pads.editing) {
                var s = val("pad_nws_field" + e);
                if (trim(s) && 0 !== _pads.editing[e].greet.indexOf(s)) return showFastBox(getLang("global_warning"), getLang("news_are_sure_close"), getLang("news_pad_cancel"), Pads.boxHide, getLang("global_cancel"))
            }
            Pads.hide()
        }
    },
    nwsDone: function(a, e, s) {
        var d = ge("pad_nws" + a);
        if (e) {
            var t = geByClass1("pad_nws_error", d),
                o = 0;
            if (t) o -= t.offsetHeight;
            else {
                var i = geByClass1("pad_nwsa_wrap", geByClass1("pad_nwsr", d));
                if (!i) return;
                t = i.insertBefore(ce("div", {
                    className: "pad_nws_error nws"
                }), domFC(i)), o = 8
            }
            val(t, s), o += t.offsetHeight, o && (_pads.content.scrollTop += o, Pads.update()), setStyle(t, {
                backgroundColor: "#F4EBBD"
            }), animate(t, {
                backgroundColor: "#F9F6E7"
            }, 2e3), setTimeout(elfocus.pbind("pad_nws_field" + a), 0)
        } else {
            ge("pad_nws_field" + a) && Pads.nwsAnswer(a, !1);
            var i = geByClass1("pad_nws_cont", d),
                r = geByClass1("pad_nwsa", d),
                p = se(s);
            r ? i.replaceChild(p, r) : i.appendChild(p)
        }
        return !0
    },
    nwsSend: function(a, e) {
        if (!buttonLocked(a)) {
            var s = _pads.editing[e],
                d = val("pad_nwsd" + e),
                t = trim(val("pad_nws_field" + e));
            if (!t || 0 === s.greet.indexOf(t)) return elfocus("pad_nws_field" + e);
            var o = extend({
                act: "post",
                message: t,
                from: "pad",
                item: d
            }, s.params || {});
            ajax.post("al_wall.php", o, {
                onDone: Pads.nwsDone.pbind(e, !1),
                onFail: Pads.nwsDone.pbind(e, !0),
                showProgress: Pads.lock.pbind(a),
                hideProgress: Pads.unlock.pbind(a)
            }), Pads.invalidate()
        }
    },
    nwsTooltip: function(a, e) {
        var s = "al_wall.php";
        e.indexOf("topic_comment") ? e = e.replace("wall_reply", "").replace("wall", "") : (s = "al_board.php", e = e.replace("topic_comment", "")), showTooltip(a, {
            url: s,
            params: extend({
                act: "post_tt",
                post: e,
                self: 1,
                from: "pad"
            }),
            slide: 15,
            shift: [35, -3, 0],
            ajaxdt: 100,
            showdt: 400,
            hidedt: 200,
            dir: "auto",
            className: "rich wall_tt"
        })
    },
    showAppStandalone: function(a, e, s, d, t, o, i) {
        return o && o.request_id && this.apMark([o.request_id], i), showApp.apply(null, Array.prototype.slice.call(arguments)), !1
    },
    apMark: function(a, e) {
        a.length && ajax.post("al_apps.php", {
            act: "a_mark",
            mark: "read",
            notif_ids: a.join(","),
            hash: e || _pads.hash
        }, {
            onDone: function(a, e) {
                handlePageCount("ap", e)
            }
        })
    },
    apDone: function(a, e, s, d) {
        if (e) s = '<span class="pad_error">' + s + "</span>", _pads.cur.processed[a] > 0 && delete _pads.cur.processed[a];
        else if (_pads.cur.processed[a] > 0 && vk.counts.ap >= _pads.cur.savedcnts[a]) {
            void 0 !== d && null !== d && d > -1 ? handlePageCount("ap", d) : Pads.decr("ap");
            for (var t in _pads.cur.savedcnts) --_pads.cur.savedcnts[t]
        }
        delete _pads.cur.savedcnts[a];
        var o = ge("pad_ap" + a),
            i = geByClass1("pad_ap_btns", o) || geByClass1("pad_ap_result", o);
        return domPN(i).replaceChild(ce("div", {
            innerHTML: s,
            className: "pad_ap_result"
        }), i), !0
    },
    apProcess: function(a, e, s) {
        if (_pads.cur.processed[e]) {
            if (-3 != s && -4 != s) return;
            _pads.cur.processed[e] = -1
        } else _pads.cur.processed[e] = 1, _pads.cur.savedcnts[e] = vk.counts.ap, --_pads.cur.offset;
        var d = -1 == s ? "a_reject_request" : -3 == s ? "a_request_ban_user" : -4 == s ? "deny_notifications" : "delete_notif";
        ajax.post("al_apps.php", {
            act: d,
            nid: e,
            from: "pad",
            hash: _pads.hash
        }, {
            onDone: Pads.apDone.pbind(e, !1),
            onFail: Pads.apDone.pbind(e, !0),
            showProgress: Pads.lock.pbind(a),
            hideProgress: Pads.unlock.pbind(a)
        }), Pads.invalidate()
    },
    apRemoveAll: function(a) {
        ajax.post("apps", {
            act: "a_remove_all_notifies",
            hash: a,
            requests: 1
        }, {
            onDone: function() {
                Pads.decr("ap", !0)
            }
        })
    },
    loadAudioRecommendations: function(a, e) {
        a.tt && a.tt.hide(), stManager.add("audioplayer.js", function() {
            window.audioPlayer && audioPlayer.showRec(e, !0)
        })
    },
    addAudio: function(el, aid, oid) {
        if (cur.addedIds && cur.addedIds[oid + "_" + aid]) return !1;
        if (el.tt && el.tt.hide(), window.Audio) {
            var oldEl = el;
            el = Audio.animateAdded(el, 200);
            var addEl = ge("audio" + oid + "_" + aid) && geByClass1("audio_add_wrap", ge("audio" + oid + "_" + aid));
            addEl && !hasClass(addEl, "anim") && Audio.animateAdded(addEl, 200)
        } else {
            var c = se('<div class="audio_add_wrap added fl_r" onclick="return cancelEvent(event);"><div class="audio_add"></div></div>');
            el.parentNode.replaceChild(c, el)
        }
        var _a = window.audioPlayer,
            query = {
                act: "add",
                aid: aid,
                oid: oid,
                hash: window._pads && _pads.addHash || _a && _a.addHash
            };
        _a && (_a.top || _a.playbackParams && (_a.playbackParams.top_audio || _a.playbackParams.top)) && (query.top = 1), ajax.post(Audio.address, query, {
            onDone: function(data, res) {
                if (data && window.Audio) {
                    var aobj = eval("(" + data + ")"),
                        all_list;
                    aobj = aobj.all[0], setTimeout(function() {
                        cur.id == vk.id && cur.audiosIndex && cur.audiosList && cur.audiosList.all && cur.aSearch && (all_list = cur.audiosList.all, all_list && all_list.length ? (aobj._order = all_list[0]._order - 1, cur.audiosList.all.splice(0, 0, aobj)) : (aobj._order = 0, cur.audiosList.all = [aobj]), cur.audios[aobj[1]] = aobj, cur.audiosIndex.add(aobj)), window._pads && _pads.cur && _pads.cur.audiosIndex && _pads.cur.audiosList && (all_list = _pads.cur.audiosList.all, all_list && all_list.length ? (aobj._order = all_list[0]._order - 1, _pads.cur.audiosList.all.splice(0, 0, aobj)) : (aobj._order = 0, _pads.cur.audiosList.all = [aobj]), _pads.cur.audios && (_pads.cur.audios[aobj[1]] = aobj), "all" == _pads.cur.allAudiosIndex && _pads.cur.audiosIndex.add(aobj)), Pads.clearAudioLoadCache()
                    }, 0), cur.addedAudios || (cur.addedAudios = []), cur.addedAudios[res.audio] = oldEl, addEvent(el, "click", function(a) {
                        return Audio.deleteAddedAudio({
                            id: res.audio,
                            added_oid: oid,
                            added_aid: aid,
                            el: el,
                            hash: res.delete_hash
                        }), cancelEvent(a)
                    }), addEvent(el, "mouseover", showTooltip.pbind(el, {
                        text: res.delete_msg,
                        showdt: 0,
                        black: 1,
                        shift: [11, 5, 0]
                    }))
                }
                if (cur.addedIds = cur.addedIds || {}, cur.addedIds[oid + "_" + aid] = 1, window.audioPlayer && currentAudioId()) {
                    var cur_aids = currentAudioId().split("_");
                    cur_aids[0] == oid && cur_aids[1] == aid && audioPlayer.showCurrentAdded()
                }
            }
        })
    },
    onAudioReorder: function(a, e, s) {
        var d = a.id.substr(5),
            t = (e && e.id || "").substr(5),
            o = (s && s.id || "").substr(5),
            i = padAudioPlaylist();
        if (d && i && !i[d] && (d = d.replace("_pad", ""), t = t.replace("_pad", ""), o = o.replace("_pad", "")), d && i && i[d]) {
            !t && o && i[o] ? t = i[o]._next : !o && t && i[t] && (o = i[t]._prev);
            var r = ge("pad_playlist");
            if (r && r.sorter && r.sorter.elems) {
                var p = (r.sorter.elems[0].id || "").substr(5);
                p && !i[p] && (p = p.replace("_pad", "")), i.start = p
            }
            var n = i[d]._prev,
                l = i[d]._next;
            n && i[n] && l && i[l] && t && i[t] && o && i[o] && o != d && t != d && (i[n]._next = l, i[l]._prev = n, i[d]._prev = o, i[o]._next = d, i[d]._next = t, i[t]._prev = d), window.audioPlaylist && audioPlaylist[d] && (window.audioPlaylist = i), ls.set("pad_playlist", i), ls.set("pad_pltime", vkNow())
        }
    },
    setAudioCurPos: function(a) {
        var e = window.audioPlayer,
            s = e && e.isPlaylistGlobal() ? ls.get("audio_id") || currentAudioId() : currentAudioId(),
            d = getSize(ge("page_header"))[1] + 6;
        if (s && ("_pad" != s.substr(-4) && (s += "_pad"), ge("audio" + s))) {
            var t = 430;
            window.lastWindowHeight && (t = Math.min(t, lastWindowHeight - 104 - (hasClass(ge("pad_arrow"), "right") ? 13 : d)), 200 > t && (t = 200));
            var o = ge("audio" + s).offsetTop + ge("pad_playlist").offsetTop - Math.min(ge("pad_cont").offsetHeight, t) / 2 + 17;
            ge("pad_content") && o > 0 && (a ? animate(ge("pad_content"), {
                scrollTop: o
            }, a, function() {
                Pads.update()
            }) : (ge("pad_content").scrollTop = o, Pads.update()))
        }
    },
    playLastStatus: function() {
        var a = audioPlayer,
            e = ge("pad_playlist");
        if (cur.nextPlaylist && cur.nextPlaylist.start) {
            var s = cur.nextPlaylist.start.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
            if (s && s[1] && a.statusData && a.statusData[s[1]]) {
                var d = a.statusData[s[1]];
                window.audioPlaylist = clone(cur.nextPlaylist), window.audioPlayer && audioPlayer.setPadPlaylist(audioPlaylist), playAudioNew(audioPlaylist.start), e.innerHTML = '<div class="pad_audio_status">' + d.audio_litening_to_user + "</div>", ge("pad_footer_text").innerHTML = d.audio_goto_user, hide("pad_more_audio")
            }
        }
    },
    audioRow: function(a, e) {
        e = e || {};
        var s = a.full_id || a[0] + "_" + a[1],
            d = "",
            t = a[5].replace(/\\$/g, "\\&#36;"),
            o = window.audioPlayer,
            i = o && o.isPlaylistGlobal() ? ls.get("audio_id") || currentAudioId() : currentAudioId();
        if (vk.id != a[0] || a[9] && intval(a[9]))
            if (cur.addedIds && cur.addedIds[a[0] + "_" + a[1]]) d += '<div class="audio_add_wrap added fl_r" onclick="return cancelEvent(event);"><div class="audio_add"></div></div>';
            else {
                var r = "Pads.addAudio(this, " + a[1] + ", " + a[0] + "); return cancelEvent(event);";
                d += rs(_pads.addBtnTpl, {
                    aid: s,
                    label: getLang("audio_add_to_audio"),
                    onclick: r
                })
            }
        return d += rs(_pads.recommendBtnTpl, {
            aid: s,
            from_pad: 1
        }), rs(_pads.audioPadTpl, {
            audio_id: "_pad" == s.substr(-4) ? s : s + "_pad",
            performer: t,
            title: a[6].replace(/\\$/g, "\\&#36;"),
            url: a[2],
            playtime: a[3],
            duration: a[4],
            attr: 'href="/search?c[q]=' + encodeURIComponent(t.replace(/(<span>|<\/span>)/g, "")) + '&c[section]=audio&c[performer]=1" onclick="if (checkEvent(event)) return; Audio.selectPerformer({from_pad: true, event: event, name: \'' + clean(t.replace(/(<span>|<\/span>)/g, "")) + "'}); return false\"",
            actions: d,
            author: "",
            onclick: "window.padPlClicked = true; playAudioNew('" + s + "')",
            rowclass: (d ? "" : "no_actions") + (i == s ? e.thisTab && currentAudioId() == s ? " current" : " tab_current" : "")
        })
    },
    showAudios: function() {
        var a = window._pads && _pads.cur,
            e = ge("pad_playlist"),
            s = window.audioPlayer,
            d = s.recsLoaded && cur.nextPlaylist ? cur.nextPlaylist || {} : !window.audioPlaylist || window.curNotifier && (padPlData = ls.get("pad_pldata")) && padPlData.source == curNotifier.instance_id ? ls.get("pad_playlist") || window.audioPlaylist : padAudioPlaylist();
        if (!a.allLoading && d) {
            var s, t = domLC(e),
                o = "",
                i = "",
                r = 25,
                p = (geByClass("audio", e).length, (s = window.audioPlayer) && s.isPlaylistGlobal() ? ls.get("audio_id") || currentAudioId() : currentAudioId());
            if (t) {
                i = geByClass1("audio", e).id.substr(5).replace("_pad", "");
                var n = t.id.substr(5).replace("_pad", "");
                d[n] && d[n]._next && (o = d[n]._next)
            } else if (p && d[p]) {
                o = p;
                for (var l = 0; 100 > l && (o && o != d.start); l++) o = d[o]._prev, r++;
                i = o
            } else o = i = d.start;
            if (i) {
                if (i) {
                    var _ = i.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
                    if (_ && _[1] && (d.statusData || s.statusData && s.statusData[_[1]]) && !d[i]._next) {
                        var c = d.statusData || s.statusData[_[1]],
                            t = se('<div class="pad_audio_status">' + (i != p ? c.audio_listen_to_user : c.audio_litening_to_user) + "</div>");
                        return e.appendChild(t), setTimeout(function() {
                            setStyle(t, {
                                height: getSize(_pads.content)[1] - 110 - ge("pad_playlist").offsetTop
                            })
                        }, 0), ge("pad_footer_text").innerHTML = c.audio_goto_user, void hide("pad_more_audio")
                    }
                }
                var u = 0;
                if (o) {
                    var g = d && window.curNotifier && d.instance == curNotifier.instance_id;
                    do {
                        var h = se(Pads.audioRow(d[o], {
                            thisTab: g
                        }));
                        e.appendChild(h), d[o]._next && (o = d[o]._next), u++
                    } while (o && o !== i && r > u)
                }
                if (o == i) {
                    var f = ge("pad_more_audio");
                    d.has_more ? (a.allLoading = !0, a.allLoadedCallback = function() {
                        a.allLoading = !1, Audio.showRows({
                            from_pad: !0
                        })
                    }, Audio.loadFriendsAudios({
                        from_pad: !0,
                        id: vk.id,
                        index: "all"
                    })) : hide(f)
                }
                window._pads && _pads.currentShown && !browser.mobile && (t && e.sorter ? setTimeout(sorter.added.pbind(e), 0) : setTimeout(function() {
                    sorter.init(e, {
                        scrollNode: ge("pad_content"),
                        onReorder: Pads.onAudioReorder,
                        noMoveCursor: 1
                    }), t || s.recsLoaded || Pads.setAudioCurPos()
                }, 0)), d.htitle && (ge("pad_footer_text").innerHTML = '<span class="audio_album_length">' + d.htitle + "</span>"), t || s.recsLoaded || Pads.setAudioCurPos()
            } else {
                if (p) {
                    var _ = p.match(/^-?\d+_\d+_s(-?\d+)(?:_|$)/);
                    if (_ && _[1] && (d.statusData || s.statusData && s.statusData[_[1]])) {
                        var c = d.statusData || s.statusData[_[1]],
                            t = se('<div class="pad_audio_status">' + (i != p ? c.audio_listen_to_user : c.audio_litening_to_user) + "</div>");
                        e.appendChild(t), setTimeout(function() {
                            setStyle(t, {
                                height: getSize(_pads.content)[1] - 110 - ge("pad_playlist").offsetTop
                            })
                        }, 0), ge("pad_footer_text").innerHTML = c.audio_goto_user
                    }
                }
                hide("pad_more_audio")
            }
            Pads.update()
        }
    },
    clearAudioLoadCache: function() {
        if (window._pads && (Pads.invalidate(), window.ajaxCache))
            for (var a in window.ajaxCache) {
                var e = a.split("#"),
                    s = e[1] && q2ajx(e[1]);
                "/audio" != e[0] && "audio" != e[0] || "load_audios_silent" != s.act || intval(s.id) != vk.id || delete ajaxCache[a]
            }
    }
};
try {
    stManager.done("pads.js")
} catch (e) {}