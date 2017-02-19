var ThumbsEdit = {
    cache: function() {
        return cur._thEdCache || (cur._thEdCache = {}), cur._thEdCache
    },
    loaded: function() {
        return cur._thEdLoaded || (cur._thEdLoaded = {}), cur._thEdLoaded
    },
    cur: function() {
        return cur._thEdCur || (cur._thEdCur = {}), cur._thEdCur
    },
    convert: function(e, t, i) {
        var a = {
                type: e,
                remove: i.remove,
                click: i.click
            },
            n = t.split("_");
        switch (e) {
            case "photo":
                a.photo = {
                    owner_id: n[0],
                    pid: n[1],
                    sizes: i.sizes
                };
                break;
            case "video":
                a.video = {
                    owner_id: n[0],
                    vid: n[1],
                    duration: i.duration,
                    sizes: i.sizes,
                    name: i.name
                };
                break;
            case "album":
                a.album = {
                    owner_id: n[0],
                    aid: n[1],
                    title: i.title,
                    size: i.size,
                    thumb: {
                        sizes: i.sizes
                    }
                };
                break;
            case "market_album":
                a.market_album = {
                    owner_id: n[0],
                    aid: n[1],
                    title: i.title,
                    msize: i.msize,
                    thumb: {
                        sizes: i.sizes
                    }
                }
        }
        return a
    },
    getMedias: function(e) {
        var t = [];
        if (e = ge(e), !e) return t;
        for (var i = (ThumbsEdit.cache()[e.id] || {}).previews || [], a = 0, n = i.length; n > a; ++a) switch (i[a].type) {
            case "photo":
                t.push(["photo", i[a].photo.owner_id + "_" + i[a].photo.pid]);
                break;
            case "video":
                t.push(["video", i[a].video.owner_id + "_" + i[a].video.vid]);
                break;
            case "album":
                t.push(["album", i[a].album.owner_id + "_" + i[a].album.aid]);
                break;
            case "market_album":
                t.push(["market_album", i[a].market_album.owner_id + "_" + i[a].market_album.aid])
        }
        return t
    },
    init: function(e, t, i) {
        if (e = ge(e)) {
            i = i === !0 || i === !1 ? {
                wide: i
            } : i || {};
            var a = clone(i),
                n = a.wide,
                s = a.width,
                o = a.height;
            s && o ? a.force = !0 : (s = e.parentNode.offsetWidth, o = .666 * s), void 0 === n && (i.wide = a.wide = n = !1);
            var r = ThumbsEdit,
                d = r.processThumbs(s, o, t, a),
                h = [];
            each(t, function(e, t) {
                ("photo" == t.type || "video" == t.type || "album" == t.type || "market_album" == t.type) && (h[h.length] = t)
            }), r.cache()[e.id] = {
                previews: h,
                thumbs: d.thumbs,
                height: d.height,
                opts: i,
                wide: n
            }, (n ? addClass : removeClass)(e, "wide"), e.innerHTML = "", each(d.thumbs, function(t, i) {
                e.appendChild(r.thumbElement(i, t))
            }), setStyle(e, {
                width: d.width,
                height: d.height
            })
        }
    },
    getParent: function(e, t) {
        for (var i = e; !hasClass(i, t) && i.parentNode;) i = i.parentNode;
        return i.parentNode ? i : null
    },
    getParentTooltipCls: function(e) {
        return gpeByClass("_im_text_input", e) ? "_im_text_input" : "thumb_wrap"
    },
    thumbElement: function(e, t) {
        var i = {
                width: intval(e.width),
                height: intval(e.height)
            },
            a = ce("div", {
                className: "thumb_wrap fl_l" + (e.lastColumn ? " last_column" : "") + (e.lastRow ? " last_row" : "") + (e.msize ? " thumb_market_album_wrap" : "") + (e.image.src.match(/^\/images\//) ? " page_album_nocover" : "")
            }, i),
            n = ce("img", {
                className: "preview"
            }),
            s = ce("div", {
                className: "overlay"
            }),
            o = ce("div", {
                className: "ui_thumb_x_button",
                innerHTML: '<div class="ui_thumb_x"></div>'
            }),
            r = ce("div", {
                className: "draggable_thumb clear_fix" + (e.unsized ? " unsized" + (e.single ? " unsized_single" : "") : "")
            }, i);
        e.name && a.setAttribute("aria-label", e.name);
        var d = isPhotoeditor3Available() && !vk.widget ? '<div class="ui_extra_btn ui_extra_btn_pe _ui_extra_btn_pe" id="ui_btn_pe"></div>' : "",
            h = se('<div class="ui_thumb_extra">       <div class="ui_extra_btn ui_extra_btn_show _ui_extra_btn_show" id="ui_btn_show"></div>' + d + "     </div>"),
            l = geByClass1("_ui_extra_btn_pe", h),
            u = geByClass1("_ui_extra_btn_show", h);
        addEvent(r, "click", function(e) {
            if (!ThumbsEdit.cur().updating && !domClosest("ui_thumb_x_button", e.target)) {
                var t = ThumbsEdit.getParent(e.target, "thumb_wrap"),
                    i = ThumbsEdit.cache()[t.parentNode.id].previews[t.getAttribute("index")].click;
                cur.openEditor = !!ThumbsEdit.getParent(e.target, "ui_extra_btn_pe"), i && i()
            }
        }), addEvent(o, "click", function(e) {
            var t = ThumbsEdit.getParent(e.target, "thumb_wrap");
            hide(t.firstChild), ThumbsEdit.removeMedia(t.parentNode.id, t.getAttribute("index"))
        }), browser.msie && browser.version < 9 ? o.setAttribute("title", getLang("dont_attach")) : addEvent(o, "mouseover", function() {
            showTooltip(this, {
                text: getLang("dont_attach"),
                shift: [11, 8],
                black: 1
            })
        }), o.setAttribute("aria-label", getLang("dont_attach")), o.setAttribute("role", "link"), l && addEvent(l, "mouseover", function() {
            var e = ThumbsEdit.getParentTooltipCls(r);
            showTooltip(this, {
                text: getLang("global_pe_edit"),
                shift: [9, 8],
                black: 1,
                appendParentCls: e
            })
        }), addEvent(u, "mouseover", function() {
            var e = ThumbsEdit.getParentTooltipCls(r);
            showTooltip(this, {
                text: getLang("global_photo_attach_show"),
                shift: [10, 8],
                black: 1,
                appendParentCls: e
            })
        }), addEvent(r, "mousedown touchstart", ThumbsEdit.startDrag);
        var c = e.old_image ? e.old_image : e.image,
            m = ThumbsEdit.crop(e, e.width, e.height);
        if (e.unsized ? setStyle(r, "backgroundImage", "url(" + c.src + ")") : (extend(n, {
                width: m.width,
                height: m.height
            }), setStyle(n, {
                marginLeft: m.marginLeft,
                marginTop: m.marginTop
            }), n.src = c.src), e.old_image && ThumbsEdit.loadAndDisplayImage(n, e), e.unsized || r.appendChild(n), r.appendChild(s), !e.isAlbum && !e.duration && intval(e.height) > 55 && r.appendChild(h), r.appendChild(o), a.appendChild(r), a.setAttribute("index", t), a.setAttribute("attachment", e.id), e.duration && (e.single && r.appendChild(ce("div", {
                className: "page_post_video_play_inline"
            })), r.appendChild(ce("div", {
                className: "duration",
                innerHTML: e.duration
            }))), (e.title || e.thumb) && !e.duration) {
            var v = ce("div", {
                className: "page_album_title"
            });
            v.appendChild(ce("div", {
                innerHTML: e.msize || e.size,
                className: "page_album_size"
            })), v.appendChild(ce("div", {
                innerHTML: e.title,
                className: "page_album_title_text"
            })), r.appendChild(v)
        }
        return a
    },
    loadAndDisplayImage: function(e, t) {
        if (e) {
            var i = new Image,
                a = t.image,
                n = t.old_image;
            if (n) {
                if (ThumbsEdit.loaded()[a.src] && e.src != a.src) return e.src = a.src, void(t.old_image = null);
                var s = function() {
                    e.src == n.src && (e.src = a.src, t.old_image = null, ThumbsEdit.loaded()[a.src] = !0), removeEvent(i, "load", s)
                };
                addEvent(i, "load", s), i.src = a.src
            }
        }
    },
    move: function(e, t, i) {
        if (i >= e.length)
            for (var a = i - e.length; a-- + 1;) e.push(void 0);
        return e.splice(i, 0, e.splice(t, 1)[0]), e
    },
    scale: function(e, t, i, a, n) {
        var s = intval(e),
            o = intval(t);
        return a || (a = i), e >= t && e > i ? (s = i, o = intval(t / (e / i))) : t > e && t > a && (o = a, s = intval(e / (t / a))), [s, o]
    },
    crop: function(e, t, i) {
        if (e.vid) return {
            width: t,
            height: i
        };
        var a = e.single,
            n = e.image,
            s = t,
            o = i,
            r = 0,
            d = 0;
        if (n.width && n.height) {
            var h = n.width / n.height;
            t / i > h ? (a && n.width < t && (t = n.width, i = Math.min(i, n.height)), s = t, o = s / h, o > i && (d = -intval((o - i) / 2))) : (a && n.height < i && (i = n.height, t = Math.min(t, n.width)), o = i, s = o * h, s > t && (r = -intval((s - t) / 2)))
        }
        return {
            width: s,
            height: o,
            marginLeft: r,
            marginTop: e.isAlbum && e.single ? 0 : d
        }
    },
    getCoords: function(e, t) {
        var i = [],
            a = t || getXY(e);
        return each(e.childNodes, function(e, t) {
            if (hasClass(t, "thumb_wrap")) {
                var n = getXY(t);
                i[i.length] = {
                    id: t.getAttribute("attachment"),
                    x: intval(n[0] - a[0]),
                    y: intval(n[1] - a[1]),
                    width: intval(t.offsetWidth),
                    height: intval(t.offsetHeight),
                    index: intval(t.getAttribute("index")),
                    node: t
                }
            }
        }), i
    },
    startDrag: function(e) {
        var t = e.touches && 1 == e.touches.length,
            i = void 0 == e.button || 0 != e.button && !(1 == e.button && browser.msie8);
        if (domClosest("ui_extra_btn_show", e.target) || domClosest("ui_extra_btn_pe", e.target)) return cancelEvent(e);
        if (!(i && !t || domClosest("ui_thumb_x_button", e.target) || ThumbsEdit.cur().updating)) {
            var a = ThumbsEdit.getParent(e.target, "draggable_thumb"),
                n = ThumbsEdit.getParent(a, "editable_thumbs"),
                s = ThumbsEdit.cache()[n.id];
            if (s && !((s.previews || []).length < 2)) return ThumbsEdit.cur().el = a, addEvent(window, "mousemove touchmove", ThumbsEdit.drag), addEvent(window, "mouseup touchend touchcancel", ThumbsEdit.drop), t || cancelEvent(e)
        }
    },
    drag: function(e) {
        var t = ThumbsEdit,
            i = t.cur().el;
        if (e.touches && e.touches.length > 1) return t.drop();
        var a = browser.android ? e.touches[0].pageX + (e.pageX || 0) : e.pageX,
            n = browser.android ? e.touches[0].pageY + (e.pageY || 0) : e.pageY,
            s = t.cur();
        if (hasClass(i, "moving")) {
            var o = a - (s.pos[0] + s.x),
                r = n - (s.pos[1] + s.y);
            setStyle(i, {
                left: o,
                top: r
            });
            var d = s.wpos;
            o = s.pos[0] + intval(i.style.marginLeft) + o - d[0], r = s.pos[1] + intval(i.style.marginTop) + r - d[1];
            var h = {
                    x: o,
                    y: r,
                    offsetX: i.offsetWidth,
                    offsetY: i.offsetHeight,
                    index: s.i,
                    node: i
                },
                l = !1,
                u = s.i,
                c = -1,
                m = 5;
            each(s.coords, function(e, t) {
                if (e != s.i && e != c) {
                    t.offsetX = t.node.offsetWidth + m, t.offsetY = t.node.offsetHeight + m;
                    var i = s.coords[e - 1],
                        a = s.coords[e + 1],
                        n = h.x + h.offsetX / 2,
                        o = h.y + h.offsetY / 2,
                        r = t.x + t.offsetX / 2,
                        d = t.y + t.offsetY / 2,
                        v = (h.x + h.offsetX, h.y + h.offsetY, t.x + t.offsetX),
                        g = t.y + t.offsetY,
                        p = (i && i.x == t.x && i.y != t.y && 0 != t.y || a && a.x == t.x && a.y != t.y) && 0 != t.x,
                        f = n >= r && (a && (n <= a.x + a.offsetX / 2 && (a.offsetY == t.offsetY || v > n) || a.y != t.y) || !a && h.x <= v) && o > t.y && g > o,
                        b = r > n && n >= t.x && (!i || i.y != t.y && !(i.x == t.x && !a)) && o > t.y && g > o,
                        w = p && o >= d && g > o && n > t.x && v > n,
                        _ = p && d > o && o >= t.y && n > t.x && v > n;
                    f = f && !p, b = b && !p && !f;
                    var y = f || b || w || _;
                    y && (l = !0, u = t.index < s.i && (f || w) ? t.index + 1 : h.index < t.index && (_ || b) ? t.index - 1 : t.index), u != s.i ? setStyle(t.node, {
                        left: f ? -2 : b ? 2 : 0,
                        top: w ? -2 : _ ? 2 : 0
                    }) : setStyle(t.node, {
                        left: 0,
                        top: 0
                    }), f && a && a.y == t.y && a.x > t.x && h.index > t.index && (setStyle(t.node, {
                        left: 0,
                        top: 0
                    }), setStyle(a.node, {
                        left: 2,
                        top: 0
                    }), c = e + 1), w && a && a.x == t.x && a.y > t.y && d >= o && (setStyle(a.node, {
                        left: 0,
                        top: 0
                    }), c = e + 1), _ && i && i.x == t.x && i.y < t.y && d >= o && (setStyle(i.node, {
                        left: 0,
                        top: -2
                    }), setStyle(t.node, {
                        left: 0,
                        top: 0
                    }))
                }
            }), s.to_i = l ? u : s.i
        } else {
            var v = i.parentNode.parentNode,
                g = geByClass("overlay", i)[0],
                p = geByClass("preview", i)[0],
                f = intval(i.parentNode.getAttribute("index")),
                b = t.cache()[v.id].thumbs[f],
                d = getXY(v),
                w = getXY(i.parentNode),
                _ = t.getCoords(v, d);
            s.id = v.id, s.i = f, s.to_i = f, s.x = a - w[0], s.y = n - w[1], s.t = b, s.w = b.width, s.h = b.height, s.pos = w, s.wpos = d, s.crop = t.crop(b, b.width, b.height), s.coords = _;
            var y = t.scale(b.width, b.height, 75),
                x = y[0],
                C = y[1],
                o = intval((b.width - x) * (browser.android ? .5 : s.x / b.width)),
                r = intval((b.height - C) * (browser.android ? .5 : s.y / b.height));
            addClass(i, "moving"), setStyle(i, "zIndex", 100);
            var E = {
                    duration: 120,
                    transition: Fx.Transitions.easeOutCubic
                },
                T = t.crop(b, x, C);
            animate(i, {
                opacity: .85,
                width: x,
                height: C,
                marginLeft: o,
                marginTop: r
            }, E), animate(g, {
                opacity: 1
            }, E), p && animate(p, T, E)
        }
        return cancelEvent(e)
    },
    drop: function(e) {
        var t = ThumbsEdit,
            i = t.cur();
        i.updating = !0;
        var a = i.el,
            n = geByClass("overlay", a)[0],
            s = geByClass("preview", a)[0];
        if (removeEvent(window, "mousemove touchmove", ThumbsEdit.drag), removeEvent(window, "mouseup touchend touchcancel", ThumbsEdit.drop), !hasClass(a, "moving")) return i.updating = !1, cancelEvent(e);
        if (i.to_i == i.i) {
            var o = (i.t, i.crop),
                r = {
                    duration: 120,
                    transition: Fx.Transitions.easeOutCubic
                };
            animate(a, {
                marginTop: 0,
                marginLeft: 0,
                top: 0,
                left: 0,
                width: i.w,
                height: i.h,
                opacity: 1
            }, extend(r, {
                onComplete: function() {
                    setStyle(a, "zIndex", null), i.updating = !1
                }
            })), animate(n, {
                opacity: 0
            }, r), s && animate(s, o, r)
        } else {
            var d = t.cache()[i.id].previews;
            d = t.move(d, i.i, i.to_i), t.update(i.id, d), (t.cache()[i.id].opts || {}).onMove && t.cache()[i.id].opts.onMove()
        }
        return removeClass(a, "moving"), cancelEvent(e)
    },
    update: function(e, t) {
        if (e = ge(e)) {
            var i = e.id,
                a = ThumbsEdit,
                n = ge(i),
                s = a.cache()[n.id],
                o = s.thumbs,
                r = s.height,
                d = s.opts,
                h = d === !0 || d === !1 ? {
                    wide: d
                } : clone(d || {}),
                l = h.width,
                u = h.height;
            l && u ? h.force = !0 : (l = e.parentNode.offsetWidth, u = .666 * l);
            var c = a.processThumbs(l, u, t, h),
                m = ce("div"),
                v = ce("div", {
                    className: "editable_thumbs" + (s.wide ? " wide" : "")
                });
            each(c.thumbs, function(e, t) {
                v.appendChild(a.thumbElement(t, e))
            }), setStyle(v, {
                width: c.width,
                height: c.height
            }), setStyle(m, {
                height: 0,
                overflow: "hidden"
            }), m.appendChild(v), n.parentNode.appendChild(m);
            var g = (getXY(v), a.getCoords(v));
            each(g, function(e, t) {
                for (var i = null, n = a.cur().coords, s = 0, r = n.length; r > s; ++s)
                    if (n[s].id == t.id) {
                        i = n[s];
                        break
                    }
                if (null != i) {
                    var d = geByClass("draggable_thumb", i.node)[0],
                        h = geByClass("overlay", d)[0],
                        l = geByClass("preview", d)[0],
                        u = (geByClass("title_text", d)[0], o[i.index]),
                        m = null;
                    each(c.thumbs, function(e, t) {
                        t.id == u.id && (a.loaded()[t.image.src] || (t.old_image = u.image), m = t)
                    }), setStyle(i.node, {
                        left: 0,
                        top: 0
                    }), (i.height != t.height || i.width != i.width || t.x != i.x || t.y != i.y || i.index == a.cur().i) && (hasClass(d, "moving") && fadeOut(h, 150), setTimeout(function() {
                        animate(d, {
                            top: t.y - i.y,
                            left: t.x - i.x,
                            marginLeft: 0,
                            marginTop: 0,
                            height: t.height,
                            width: t.width,
                            opacity: 1
                        }, 150);
                        var e = a.crop(m, t.width, t.height);
                        l && animate(l, e, 150), (m.unsized && m.single ? addClass : removeClass)(d, "unsized_single")
                    }, 4))
                }
            }), r != c.height && setTimeout(function() {
                animate(n, {
                    height: c.height
                }, 150)
            }, 4), setTimeout(function() {
                h.onUpdate && h.onUpdate(), setStyle(n, {
                    height: c.height,
                    width: c.width
                }), n.innerHTML = "", a.cache()[i].thumbs = c.thumbs, a.cache()[i].previews = t, a.cache()[i].height = c.height, each(c.thumbs, function(e, t) {
                    n.appendChild(a.thumbElement(t, e))
                }), m.parentNode.removeChild(m), a.cur().updating = !1
            }, 150)
        }
    },
    setWide: function(e, t, i) {
        if (e = ge(e)) {
            var a = ThumbsEdit.cache()[e.id],
                n = clone(i || {});
            void 0 === t && (t = !1), n.wide = t, a.wide != t && ThumbsEdit.init(e, a.previews, n)
        }
    },
    hasMedia: function(e, t) {
        if (e = ge(e)) {
            var i = e.id,
                a = !1,
                n = ThumbsEdit.cache()[i];
            if (n)
                for (var s = n.previews, o = 0; o < s.length; o++) {
                    var r = s[o];
                    if (r[r.type].id == t) {
                        a = !0;
                        break
                    }
                }
            return a
        }
    },
    addMedia: function(e, t) {
        if ((e = ge(e)) && t) {
            var i = ThumbsEdit,
                a = e.id,
                n = i.cache()[a];
            if (n) {
                var s = clone(n.opts),
                    o = clone(n.previews);
                i.hasMedia(e, t[t.type].id) || 10 != o.length && (o[o.length] = t, i.cache()[a] = null, i.init(a, o, s))
            }
        }
    },
    refresh: function(e) {
        if (e = ge(e)) {
            var t = ThumbsEdit,
                i = e.id,
                a = t.cache()[i];
            if (a) {
                var n = clone(a.opts),
                    s = clone(a.previews);
                t.cache()[i] = null, t.init(i, s, n)
            }
        }
    },
    removeAll: function(e) {
        if (e = ge(e)) {
            var t = ThumbsEdit,
                i = e.id,
                a = t.cache()[i];
            a && (t.cache()[i] = null, t.init(i, [], a.opts))
        }
    },
    removeMedia: function(e, t) {
        if (!(e = ge(e))) return null;
        t = intval(t);
        var i = ThumbsEdit.cache()[e.id];
        if (i) {
            var a = i.previews.splice(t, 1),
                n = a[0][a[0].type].id;
            return each(e.childNodes, function(e, t) {
                if (t.getAttribute && t.getAttribute("attachment") == n) {
                    var i = (geByClass1("ui_thumb_x_button", t) || {}).tt;
                    i && i.destroy && i.destroy()
                }
            }), ThumbsEdit.cur().coords = ThumbsEdit.getCoords(e), 0 == i.previews.length ? ThumbsEdit.init(e, [], i.opts) : ThumbsEdit.update(e, i.previews), a[0] && a[0].remove && a[0].remove(), a
        }
    },
    removeById: function(e, t) {
        if (!(e = ge(e))) return null;
        for (var i = (ThumbsEdit.cache()[e.id] || {}).previews || [], a = 0, n = i.length; n > a; ++a)
            if ("photo" == i[a].type && i[a].photo.id == t || "video" == i[a].type && i[a].video.id == t || "album" == i[a].type && i[a].album.id == t || "market_album" == i[a].type && i[a].market_album.id == t) return ThumbsEdit.removeMedia(e, a);
        return null
    },
    getRatio: function(e) {
        if (e.vid) return 1.8;
        if (e.thumb) return 279 / 185;
        var t = e.sizes.x,
            i = 0 == t[1] || 0 == t[2] ? 1 : t[1] / t[2];
        return i
    },
    getSize: function(e, t, i, a) {
        if (!e) return {};
        if (e.vid) {
            var n = "",
                s = intval(t * (window.devicePixelRatio || 1)),
                o = intval(i * (window.devicePixelRatio || 1)),
                r = !!e.sizes.l,
                d = !!e.sizes.y,
                h = 0,
                l = 0;
            return 130 >= s && 98 >= o ? (n = "s", h = 130, l = 98) : 320 >= s && 240 >= o ? (n = r ? "l" : "m", h = 320, l = 240) : (n = d ? "y" : r ? "l" : "m", h = 640, l = 480), {
                width: h,
                height: l,
                src: e.sizes[n][0]
            }
        }
        var u = !!e.thumb,
            c = u ? e.thumb.sizes : e.sizes,
            m = window.devicePixelRatio || 1,
            v = c.x || {},
            g = (v[1] || 1) / (v[2] || 1),
            p = 0;
        g > t / i ? (p = i, g > 1 && (p *= g)) : (p = t, 1 > g && (p /= g)), i *= m, t *= m;
        var f = !a && !!c.o,
            b = "",
            w = null;
        b = 75 > p ? "s" : 130 > p ? "m" : f && (w = c.o) && w[1] >= t && w[2] >= i ? "o" : f && (w = c.p) && w[1] >= t && w[2] >= i ? "p" : f && (w = c.q) && w[1] >= t && w[2] >= i ? "q" : f && (w = c.r) && w[1] >= t && w[2] >= i ? "r" : "x";
        var _ = c[b];
        return _[1] && _[2] || (e.unsized = !0), {
            src: _[0],
            width: _[1],
            height: _[2]
        }
    },
    compute: function(e, t, i, a) {
        e.id = e.vid ? "video" + e.owner_id + "_" + e.vid : e.pid ? "photo" + e.owner_id + "_" + e.pid : e.msize ? "market_album" + e.owner_id + "_" + e.aid : "album" + e.owner_id + "_" + e.aid;
        var n = {
            id: e.id,
            width: intval(t),
            height: intval(i),
            lastColumn: a.lastColumn,
            lastRow: a.lastRow,
            single: a.single,
            image: ThumbsEdit.getSize(e, t, i, a.single),
            unsized: e.unsized,
            orig: e
        };
        if (e.title && void 0 != e.size ? extend(n, {
                title: e.title,
                size: e.size,
                isAlbum: !0
            }) : e.title && void 0 != e.msize ? extend(n, {
                title: e.title,
                msize: e.msize,
                isAlbum: !0
            }) : e.vid && e.name && void 0 != e.name && extend(n, {
                name: e.name
            }), e.duration) {
            var s = intval(e.duration / 60),
                i = intval(s / 60),
                o = e.duration - 60 * s;
            s -= 60 * i, n.duration = (i ? i + ":" : "") + (1 > i || s >= 10 ? s : "0" + s) + ":" + (o >= 10 ? o : "0" + o)
        }
        return n.unsized ? n.ratio = 1 : n.ratio = n.image.width / n.image.height, n
    },
    processThumbs: function(e, t, i, a) {
        var n = ThumbsEdit,
            s = n.getRatio,
            o = n.compute,
            r = function(e) {
                return "n" == e ? 1 : "q" == e ? 2 : 0
            },
            d = function(e) {
                var t = 0;
                return each(e, function(e, i) {
                    t += i
                }), t
            },
            h = function(e, t, i) {
                return (t - (e.length - 1) * i) / d(e)
            };
        a = isObject(a) ? a : {};
        var l = a.wide,
            u = [],
            c = 0,
            m = [],
            v = [];
        each(i, function(e, t) {
            ("photo" == t.type || "video" == t.type || "album" == t.type || "market_album" == t.type) && (m[m.length] = t[t.type]), "video" == t.type && u.push(c), c++
        });
        var g = "",
            p = [0, 0, 0, 0],
            f = [],
            b = m.length;
        each(m, function(e, t) {
            var i = s(t),
                a = i > 1.2 ? "w" : .8 > i ? "v" : "q";
            g += a, p[r(a)]++, f[f.length] = i
        });
        var w, _, y = f.length > 0 ? d(f) / f.length : 1,
            x = 5,
            C = x;
        a.force ? (w = e, _ = t) : (l ? (w = 537, _ = 343) : e >= 381 ? (w = 381, _ = 1 == b ? 361 : 237) : (w = 337, _ = 1 == b ? 320 : 214), w > e && (w = e, _ = t));
        var E = w / _,
            T = 0,
            z = 0;
        if (1 == b) {
            var M = {
                lastColumn: 1,
                lastRow: 1,
                single: 1
            };
            m[0].thumb ? (T = 279, z = 185) : f[0] >= 1 * E ? (T = w, z = Math.min(T / f[0], _)) : (z = _, T = Math.min(z * f[0], w));
            var k = o(m[0], T, z, M);
            !k.unsized && (k.image.width < T && k.image.height <= _ || k.image.height < z && k.image.width <= w) && (T = k.image.width, z = k.image.height, k = o(m[0], T, z, M)), v[0] = k
        } else if (2 == b) switch (g) {
            case "ww":
                if (y > 1.4 * E && f[1] - f[0] < .2) {
                    var N = w,
                        R = Math.min(N / f[0], N / f[1], (_ - C) / 2);
                    v[0] = o(m[0], N, R, {
                        lastColumn: 1
                    }), v[1] = o(m[1], N, R, {
                        lastColumn: 1,
                        lastRow: 1
                    }), T = w, z = 2 * R + C;
                    break
                }
            case "vv":
            case "qv":
            case "vq":
            case "qq":
                N = (w - x) / 2, R = Math.min(N / f[0], N / f[1], _), v[0] = o(m[0], N, R, {
                    lastRow: 1
                }), v[1] = o(m[1], N, R, {
                    lastRow: 1,
                    lastColumn: 1
                }), T = w, z = R;
                break;
            default:
                var A = intval((w - x) / f[1] / (1 / f[0] + 1 / f[1])),
                    L = w - A - x,
                    R = Math.min(_, A / f[0], L / f[1]);
                v[0] = o(m[0], A, R, {
                    lastRow: 1
                }), v[1] = o(m[1], L, R, {
                    lastColumn: 1,
                    lastRow: 1
                }), T = w, z = R
        } else if (3 == b)
            if ((f[0] > 1.2 * E || y > 1.5 * E) && "www" == g) {
                var N = w,
                    S = Math.min(N / f[0], .66 * (_ - C));
                if (v[0] = o(m[0], N, S, {
                        lastColumn: 1
                    }), "www" == g) {
                    var N = intval(w - x) / 2,
                        R = Math.min(_ - S - C, N / f[1], N / f[2]);
                    v[1] = o(m[1], N, R, {
                        lastRow: 1
                    }), v[2] = o(m[2], w - N - x, R, {
                        lastColumn: 1,
                        lastRow: 1
                    })
                } else {
                    var A = intval((w - x) / f[2] / (1 / f[1] + 1 / f[2])),
                        L = w - A - x,
                        R = Math.min(_ - S - C, A / f[2], L / f[1]);
                    v[1] = o(m[1], A, R, {
                        lastRow: 1
                    }), v[2] = o(m[2], A, R, {
                        lastRow: 1,
                        lastColumn: 1
                    })
                }
                T = w, z = S + R + C
            } else {
                var R = _,
                    Y = intval(Math.min(R * f[0], .75 * (w - x)));
                v[0] = o(m[0], Y, R, {
                    lastRow: 1
                });
                var P = f[1] * (_ - C) / (f[2] + f[1]),
                    X = _ - P - C,
                    N = Math.min(w - Y - x, intval(P * f[2]), intval(X * f[1]));
                v[1] = o(m[1], N, X, {
                    lastColumn: 1
                }), v[2] = o(m[2], N, P, {
                    lastColumn: 1,
                    lastRow: 1
                });
                var T = Y + N + x,
                    z = _
            }
        else if (4 == b)
            if ((f[0] > 1.2 * E || y > 1.5 * E) && "wwww" == g) {
                var N = w,
                    S = Math.min(N / f[0], .66 * (_ - C));
                v[0] = o(m[0], N, S, {
                    lastColumn: 1
                });
                var R = (w - 2 * x) / (f[1] + f[2] + f[3]),
                    A = intval(R * f[1]),
                    L = intval(R * f[2]),
                    B = N - A - L - 2 * x,
                    R = Math.min(_ - S - C, R);
                v[1] = o(m[1], A, R, {
                    lastRow: 1
                }), v[2] = o(m[2], L, R, {
                    lastRow: 1
                }), v[3] = o(m[3], B, R, {
                    lastColumn: 1,
                    lastRow: 1
                }), T = w, z = S + R + C
            } else {
                var R = _,
                    Y = Math.min(R * f[0], .66 * (w - x));
                v[0] = o(m[0], Y, R, {
                    lastRow: 1
                });
                var N = (_ - 2 * C) / (1 / f[1] + 1 / f[2] + 1 / f[3]),
                    X = intval(N / f[1]),
                    P = intval(N / f[2]),
                    H = R - X - P - 2 * C,
                    N = Math.min(w - Y - x, N);
                v[1] = o(m[1], N, X, {
                    lastColumn: 1
                }), v[2] = o(m[2], N, P, {
                    lastColumn: 1
                }), v[3] = o(m[3], N, H, {
                    lastColumn: 1,
                    lastRow: 1
                }), T = Y + N + x, z = _
            }
        else {
            var q = [],
                I = 0;
            y > (u.length ? 1.3 : 1.1) ? each(f, function(e, t) {
                q[q.length] = Math.max(1, t)
            }) : each(f, function(e, t) {
                -1 != indexOf(u, I) ? q[q.length] = t : q[q.length] = Math.min(1, t), I++
            });
            var O, W, D, j = {};
            for (j[(O = b) + ""] = [h(q, w, x)], O = 1; b - 1 >= O; O++) j[O + "," + (secont_line = b - O)] = [h(q.slice(0, O), w, x), h(q.slice(O), w, x)];
            for (O = 1; b - 2 >= O; O++)
                for (W = 1; b - O - 1 >= W; W++) j[O + "," + W + "," + (D = b - O - W)] = [h(q.slice(0, O), w, x), h(q.slice(O, O + W), w, x), h(q.slice(O + W), w, x)];
            var F, U = null,
                G = 0;
            for (var J in j) {
                var K = j[J],
                    Q = d(K) + C * (K.length - 1),
                    V = Math.abs(Q - _);
                if (-1 != J.indexOf(",")) {
                    for (var Z = J.split(","), I = 0; I < Z.length; I++) Z[I] = intval(Z[I]);
                    (Z[0] > Z[1] || Z[2] && Z[1] > Z[2]) && (V += 50, V *= 1.5)
                }(null == U || G > V) && (U = J, G = V, F = Q)
            }
            for (var $ = clone(m), ee = clone(q), te = U.split(","), ie = j[U], ae = te.length - 1, I = 0; I < te.length; I++) {
                var ne = parseInt(te[I]),
                    se = $.splice(0, ne),
                    oe = ie.shift(),
                    re = se.length - 1,
                    a = {};
                ae == I && (a.lastRow = !0);
                for (var de = w, he = 0; he < se.length; he++) {
                    var le = se[he],
                        ue = ee.shift(),
                        ce = a;
                    re == he ? (thumb_width = Math.ceil(de), ce.lastColumn = !0) : (thumb_width = intval(ue * oe), de -= thumb_width + x), v[v.length] = o(le, thumb_width, oe, ce)
                }
            }
            T = w, z = F
        }
        return {
            width: intval(T),
            height: intval(z),
            thumbs: v
        }
    }
};
try {
    stManager.done("thumbs_edit.js")
} catch (e) {}