var FiltersPE = {
    updateActionButtonsEnabled: function() {
        var e = geByClass("pe_action");
        each(e, function(e, t) {
            var r = !1;
            switch (t.getAttribute("id")) {
                case "pe_text":
                    var a = cur.pe.getText();
                    a && (r = !!a.text);
                    break;
                case "pe_crop":
                    var o = cur.pe.getLastCrop();
                    r = o.l + o.t + o.r + o.b > 0;
                    break;
                case "pe_blur":
                    var i = cur.pe.getBlur();
                    i && (r = i.size > 0);
                    break;
                case "pe_rotate":
                    r = cur.pe.getRotation() > 0;
                    break;
                case "pe_auto":
                    r = cur.pe.isAuto()
            }
            toggleClass(t, "enabled", r)
        })
    },
    updateUndo: function() {
        var e = FiltersPE.toStr();
        void 0 !== FiltersPE.initialSettings && e !== FiltersPE.initialSettings ? (addClass("pe_undo", "enabled"), FiltersPE.showQuitConfirm = !0) : (removeClass("pe_undo", "enabled"), FiltersPE.showQuitConfirm = !1), FiltersPE.updateActionButtonsEnabled()
    },
    onUndo: function() {
        FiltersPE.fromStr(FiltersPE.initialSettings), FiltersPE.updateUndo()
    },
    onActionRotate: function(e, t) {
        cur.filterParams.disableCrop || (cur.pe.rotate(), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo())
    },
    onActionAuto: function(e, t) {
        cur.pe.applyAuto(), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo()
    },
    hideCropArea: function(e) {
        var t = geByClass1("pe_crop_area");
        return t ? (e ? re(t) : (removeClass(t, "visible"), setTimeout(re.pbind(t), 300)), !0) : !1
    },
    applyCrop: function(e) {
        var t = cur._peCrop;
        if (!e) {
            var r = cur.pe.getSize();
            t.l = t.l / r[0], t.r = t.r / r[0], t.t = t.t / r[1], t.b = t.b / r[1]
        }
        cur.pe.crop(t.l, t.r, t.t, t.b, !1, !0), FiltersPE.hideCropArea(!0), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo()
    },
    resetCrop: function() {
        cur.pe.crop(0, 0, 0, 0), FiltersPE.hideCropArea(), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo()
    },
    onActionCrop: function(e, t) {
        function r() {
            setStyle(cropAreaEl, {
                borderLeftWidth: cur._peCrop.l
            }), setStyle(cropAreaEl, {
                borderRightWidth: cur._peCrop.r
            }), setStyle(cropAreaEl, {
                borderTopWidth: cur._peCrop.t
            }), setStyle(cropAreaEl, {
                borderBottomWidth: cur._peCrop.b
            }), o()
        }

        function a() {
            cur._peCrop.h = cur._peCrop.r - cur._peCrop.l + 1, cur._peCrop.w = cur._peCrop.b - cur._peCrop.t + 1
        }

        function o() {
            each("top left bottom right top_left top_right bottom_left bottom_right".split(" "), function(e, t) {
                var r = ge("pe_crop_side_handle_" + t),
                    a = parseInt(getStyle(r, "marginBottom"));
                setStyle(r, {
                    marginBottom: a + .1 * Math.random()
                })
            }), setStyle(h, {
                marginBottom: .1 * Math.random()
            })
        }

        function i(e) {
            return removeEvent(window, "mousemove", s), removeEvent(window, "mouseup", i), removeClass(cropAreaEl, "no_actions"), cancelEvent(e), !1
        }

        function s(e) {
            var t = (v.split("_"), getXY(c));
            return each(v.split("_"), function(r, a) {
                switch (a) {
                    case "top":
                        var o = Math.max(e.pageY, t[1]);
                        o = Math.min(o, t[1] + u[1]), o = Math.min(o, t[1] + u[1] - cur._peCrop.b - 100), setStyle(cropAreaEl, {
                            borderTopWidth: o - t[1]
                        }), cur._peCrop.t = o - t[1];
                        break;
                    case "left":
                        var i = Math.max(e.pageX, t[0]);
                        i = Math.min(i, t[0] + u[0]), i = Math.min(i, t[0] + u[0] - cur._peCrop.r - 100), setStyle(cropAreaEl, {
                            borderLeftWidth: i - t[0]
                        }), cur._peCrop.l = i - t[0];
                        break;
                    case "right":
                        var i = Math.max(e.pageX, t[0]);
                        i = Math.min(i, t[0] + u[0]), i = Math.max(i, t[0] + cur._peCrop.l + 100), setStyle(cropAreaEl, {
                            borderRightWidth: i - t[0] - u[0]
                        }), cur._peCrop.r = u[0] - (i - t[0]);
                        break;
                    case "bottom":
                        var o = Math.max(e.pageY, t[1]);
                        o = Math.min(o, t[1] + u[1]), o = Math.max(o, t[1] + cur._peCrop.t + 100), setStyle(cropAreaEl, {
                            borderBottomWidth: o - t[1] - u[1]
                        }), cur._peCrop.b = u[1] - (o - t[1])
                }
            }), a(), o(), cancelEvent(e), !1
        }

        function n(e) {
            f = e.pageX, g = e.pageY, m = cur._peCrop.l, E = cur._peCrop.r, b = cur._peCrop.t, C = cur._peCrop.b, addEvent(window, "mousemove", l), addEvent(window, "mouseup", p), addClass(cropAreaEl, "active"), addClass(cropAreaEl, "no_actions")
        }

        function p(e) {
            removeEvent(window, "mousemove", l), removeEvent(window, "mouseup", p), removeClass(cropAreaEl, "active"), removeClass(cropAreaEl, "no_actions")
        }

        function l(e) {
            var t = m + e.pageX - f;
            t = Math.max(0, t), t = Math.min(t, u[0] - cur._peCrop.r - 100);
            var o = E - e.pageX + f;
            o = Math.max(0, o), o = Math.min(o, u[0] - cur._peCrop.l - 100);
            var i = b + e.pageY - g;
            i = Math.max(0, i), i = Math.min(i, u[1] - cur._peCrop.b - 100);
            var s = C - e.pageY + g;
            return s = Math.max(0, s), s = Math.min(s, u[1] - cur._peCrop.t - 100), cur._peCrop.r = o, cur._peCrop.l = t, cur._peCrop.t = i, cur._peCrop.b = s, a(), r(), cancelEvent(e), !1
        }
        if (FiltersPE.hideCropArea()) return cur._minCropSet ? FiltersPE.resetCrop() : FiltersPE.applyCrop(), void FiltersPE.updateActionButtonsEnabled();
        cur.pe.resetCrop();
        var c = geByClass1("pe_canvas_wrap");
        cropAreaEl = '<div class="pe_crop_area">', each("top left bottom right top_left top_right bottom_left bottom_right".split(" "), function(e, t) {
            cropAreaEl += '<div class="pe_side_handle" id="pe_crop_side_handle_' + t + '"></div>'
        }), cropAreaEl += '<div class="pe_crop_apply_wrap"><div class="pe_crop_apply_button" id="crop_apply" onclick="FiltersPE.applyCrop()"></div><div class="pe_crop_apply_button" id="crop_reset" onclick="FiltersPE.resetCrop()"></div></div>', cropAreaEl += "</div>", cropAreaEl = se(cropAreaEl), c.appendChild(cropAreaEl);
        var u = getSize("pe_main");
        setStyle(cropAreaEl, {
            width: u[0],
            height: u[1]
        });
        var d = cur.pe.getLastCrop();
        d.l + d.r + d.b + d.t == 0 ? (d.l = d.r = d.b = d.t = .05, cur._minCropSet = !0) : cur._minCropSet = !1;
        var u = cur.pe.getSize();
        cur._peCrop = {
            l: d.l * u[0],
            t: d.t * u[1],
            r: d.r * u[0],
            b: d.b * u[1]
        };
        var h = geByClass1("pe_crop_apply_wrap", c);
        each("Top Left Right Bottom".split(" "), function(e, t) {
            setStyle(cropAreaEl, {
                bname: cur._peCrop[t.toLowerCase()[0]]
            })
        });
        var v, _;
        each("top left bottom right top_left top_right bottom_left bottom_right".split(" "), function(e, t) {
            var r = ge("pe_crop_side_handle_" + t);
            addEvent(r, "mousedown", function(e) {
                return _ = e.target, v = _.getAttribute("id").split("_").slice(4).join("_"), addEvent(window, "mousemove", s), addEvent(window, "mouseup", i), addClass(cropAreaEl, "no_actions"), cancelEvent(e), !1
            })
        });
        var f, g, m, E, b, C;
        addEvent(cropAreaEl, "mousedown", n), r(), addClass(cropAreaEl, "visible")
    },
    _hideActionBar: function(e, t) {
        if (FiltersPE.actionBars = FiltersPE.actionBars || {}, !Object.keys(FiltersPE.actionBars).length) return !1;
        if (e && e.target)
            for (var r = e.target, a = 10; r && a--;) {
                if (hasClass(r, "pe_action_bar")) return;
                r = r.parentNode
            }
        var o, i = !0;
        if (each(FiltersPE.actionBars, function(t, r) {
                return o = t, "blur" == o && e && "pe_main" == e.target.getAttribute("id") ? i = !1 : void cssAnim(r, {
                    marginLeft: -5,
                    opacity: 0
                }, {
                    duration: 100
                }, function() {
                    re(r), delete FiltersPE.actionBars[t]
                })
            }), i && (removeEvent(window, "click", FiltersPE._hideActionBar), removeClass(geByClass1("pe_actions"), "active"), "blur" == o)) {
            var s = geByClass1("pe_canvas_wrap");
            removeClass(s, "blur_pos"), removeEvent(s, "click")
        }
        return FiltersPE.updateActionButtonsEnabled(), o == t
    },
    onActionBlur: function(e, t) {
        if (!FiltersPE._hideActionBar(null, "blur")) {
            var r = FiltersPE.actionBars.blur = se('<div class="pe_blur_input pe_action_bar" id="blur"> <div class="pe_blur_slider"></div> <div class="pe_blurtype_changer" onmouseover="showTooltip(this, {text: \'' + cur.lang.photos_pe_change_blur_type + "', shift: [11,4,4], showdt: 0, black: 1, showsp: 110});\"></div> </div>"),
                a = geByClass1("pe_wrap");
            a.parentNode.insertBefore(r, a.nextSibling);
            var o = getXY(curBox().bodyNode),
                i = getXY(t),
                s = getSize(t);
            setStyle(r, {
                left: i[0] - o[0] + s[0] + 10,
                top: i[1] - o[1]
            }), addClass(geByClass1("pe_actions"), "active"), cssAnim(r, {
                marginLeft: 0,
                opacity: .9
            }, {
                duration: 200
            });
            var n = cur.pe.getBlur();
            void 0 === n && (cur.pe.setBlur(.5, [.5, .5], 1), n = cur.pe.getBlur()), new Slider(geByClass1("pe_blur_slider", r), {
                width: 100,
                size: 1,
                debounce: 10,
                value: n.size || .5,
                onChange: function(e) {
                    var t = cur.pe.getBlur();
                    t && cur.pe.setBlur(e, t.position, t.type), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo()
                }
            });
            var p = this;
            addEvent(window, "click", function(e) {
                if ("pe_main" != e.target.id) {
                    for (var t = e.target, r = 0; 10 > r && t; r++) {
                        if (hasClass(t, "pe_action_bar")) return;
                        t = t.parentNode
                    }
                    removeEvent(window, "mousemove", p.onMouseMoveBlur), removeEvent(window, "mouseup", p.onMouseUpBlur), removeEvent(c, "mousedown", this.onMouseDownBlur), FiltersPE._hideActionBar()
                }
            });
            var l = geByClass1("pe_blurtype_changer", r);
            addEvent(l, "click", function() {
                var e = toggleClass(l, "linear"),
                    t = cur.pe.getBlur();
                cur.pe.setBlur(t.size, t.position, e ? 2 : 1)
            }), toggleClass(l, "linear", 2 == n.type);
            var c = geByClass1("pe_canvas_wrap");
            getXY(c), getSize(c);
            return addClass(c, "blur_pos"), this.onMouseMoveBlur = function(e) {
                var t = getXY(c),
                    r = getSize(c),
                    a = [(e.pageX - t[0]) / r[0], (e.pageY - t[1]) / r[1]];
                a[0] = Math.max(0, Math.min(a[0], 1)), a[1] = Math.max(0, Math.min(a[1], 1));
                var o = cur.pe.getBlur();
                cur.pe.setBlur(o.size, a, o.type), cancelEvent(e)
            }, this.onMouseUpBlur = function(e) {
                removeEvent(window, "mousemove", p.onMouseMoveBlur), removeEvent(window, "mouseup", p.onMouseUpBlur), cancelEvent(e)
            }, this.onMouseDownBlur = function() {
                addEvent(window, "mousemove", p.onMouseMoveBlur), addEvent(window, "mouseup", p.onMouseUpBlur)
            }, addEvent(c, "mousedown", this.onMouseDownBlur), cancelEvent(e), !1
        }
    },
    onActionText: function(e, t) {
        function r() {
            var e = val(p),
                t = ce("div", {
                    className: "pe_text_input_tester",
                    innerHTML: clean(e).split(/\r\n|\r|\n/).join("<br>") + "&nbsp;"
                });
            document.body.appendChild(t), setStyle(p, {
                height: t.offsetHeight
            }), re(t)
        }
        if (!FiltersPE._hideActionBar(null, "text")) {
            var a = FiltersPE.actionBars.text = se('<div class="pe_text_input pe_action_bar" id="text"><textarea></textarea> <div class="pe_text_font_changer" onmouseover="showTooltip(this, {text: \'' + cur.lang.photos_pe_change_font + "', shift: [11,4,4], showdt: 0, black: 1, showsp: 110});\"></div> </div>"),
                o = geByClass1("pe_wrap");
            o.parentNode.insertBefore(a, o.nextSibling);
            var i = getXY(curBox().bodyNode),
                s = getXY(t),
                n = getSize(t);
            setStyle(a, {
                left: s[0] - i[0] + n[0] + 11,
                top: s[1] - i[1] - 2
            });
            var p = geByTag1("textarea", a),
                l = geByClass1("pe_text_font_changer", a),
                c = cur.pe.getText();
            return val(p, c.text), toggleClass(l, "impact", 0 == c.font), r(), addEvent(p, "keydown input", function(e) {
                if (27 == e.keyCode) return cur.pe.setText(c.text, c.font), FiltersPE._hideActionBar(null, "text"), cancelEvent(e), !1;
                r();
                var t = cur.pe.setText(val(p), hasClass(l, "impact") ? 0 : 1);
                val(p, t), FiltersPE.updateActionButtonsEnabled(), FiltersPE.updateUndo()
            }), addEvent(window, "click", FiltersPE._hideActionBar), addClass(geByClass1("pe_actions"), "active"), cssAnim(a, {
                marginLeft: 0,
                opacity: .9
            }, {
                duration: 200
            }), p.select(), addEvent(l, "click", function() {
                var e = toggleClass(l, "impact");
                cur.pe.setText(val(p), e ? 0 : 1)
            }), cancelEvent(e), !1
        }
    },
    _selectTab: function(e) {
        if (e = ge(e), !hasClass(e, "selected")) {
            for (var t = geByClass1("pe_type_chooser"), r = t.children, a = 0; a < r.length; a++) removeClass(r[a], "selected"), hide(r[a].id + "_tab");
            addClass(e, "selected"), show(e.id + "_tab")
        }
        this._initPE()
    },
    switchToFilters: function() {
        cur.pe.setFadeImage(), this._selectTab(ge("pe_type_filters")), cur.pe.applyFilter(), cur.pe.removeFadeImage(), FiltersPE.updateUndo()
    },
    switchToParameters: function() {
        cur.pe.setFadeImage(), this._selectTab("pe_type_parameters"), this._initParameters(), cur.pe.applyParameters(), cur.pe.removeFadeImage(), FiltersPE.updateUndo()
    },
    _initPE: function(e, t, r) {
        if (!cur.pe) {
            var a = ge("pe_loader"),
                o = t.pe_height,
                i = t.pe_width;
            i > o ? (i = Math.min(i, 700), o = Math.round(t.pe_height / t.pe_width * i)) : o = Math.min(o, 700), setStyle(a, {
                height: o
            }), cur.pe = new PhotoEdit(geByClass1("pe_canvas_wrap"), e.src_pe, e.src_pe_big, {}, r, function() {
                var e = geByClass1("pe_canvas_wrap"),
                    t = geByTag1("canvas", e);
                t && t.offsetHeight && setStyle(e, "marginTop", Math.round(e.offsetHeight / 2 - t.offsetHeight / 2))
            }), addEvent(window, "keydown", FiltersPE.onEditorKeypress)
        }
    },
    onEditorKeypress: function(e) {
        if (!e.metaKey && !e.ctrlKey && "textarea" != e.target.nodeName.toLowerCase()) switch (e.which) {
            case 82:
                FiltersPE.onActionRotate();
                break;
            case 65:
                FiltersPE.onActionAuto()
        }
    },
    init: function(e, t, r, a, o, i, s, n) {
        cur.filterApplied = null, cur.pe && (cur.pe.clean(), delete cur.pe, cur.pe = null), cur.filterHash = s, cur.filterPhoto = i, cur.filterSaveOptions = r, cur.filterParams = a, cur.peDesc = n.replace(/<br>/g, "\n");
        var p = ce("div", {
                className: "pe_white_fade"
            }),
            l = geByClass1("pe_canvas_wrap");
        l.appendChild(p), FiltersPE._initPE(t, o, function() {
            FiltersPE.fromStr(a.settings), hide("pe_loader"), cur.pe.show();
            var e = geByClass1("pe_actions");
            a.disableCrop && (re("pe_rotate"), re("pe_crop")), (o.pe_height < 110 || o.pe_width < 110) && re("pe_crop"), cssAnim(e, {
                opacity: 1
            }, {
                duration: 200
            });
            var t = ge("pe_tabs_panel");
            show(t), cssAnim(t, {
                opacity: 1
            }, {
                duration: 200
            });
            var r = geByClass1("pe_filter_buttons");
            show(r), cssAnim(r, {
                opacity: 1
            }, {
                duration: 200
            }), cssAnim(p, {
                opacity: 0
            }, {
                duration: 200
            }, function() {
                re(p), p = null
            })
        })
    },
    clear: function() {
        FiltersPE.showQuitConfirm = !1, delete FiltersPE.initialSettings, this._parametersInited = !1, cur.filterApplied = void 0, cur.pe.clean(), FiltersPE.actionBars && (each(FiltersPE.actionBars, function(e, t) {
            re(t)
        }), FiltersPE.actionBars = null), removeEvent(window, "keydown", FiltersPE.onEditorKeypress)
    },
    _initParameters: function() {
        if (!this._parametersInited) {
            this._parametersInited = !0;
            var e = geByClass("pe_params_slider");
            each(e, function(e, t) {
                new Slider(t, {
                    width: 200,
                    debounce: 10,
                    size: 2,
                    value: t.getAttribute("data-default") || 0,
                    onChange: function(e) {
                        var r = t.getAttribute("id").split("_")[2];
                        r = r[0].toUpperCase() + r.substr(1), cur.pe["set" + r](e), FiltersPE.updateUndo()
                    },
                    formatHint: function(e) {
                        return Math.round(100 * e) + "%"
                    }
                })
            })
        }
    },
    fromStr: function(e) {
        "f//////" == e && (e = ""), cur.pe.restoreAll();
        var t = e.split("/");
        switch (t.shift()) {
            case "f":
                var r = t.shift().split(",");
                cur.FiltersPEAmount = parseInt(r[1]) / 100 || 0, FiltersPE.switchToFilters(), FiltersPE.applyFilter(r[0] || "original");
                break;
            case "p":
                var r = t.shift().split(",");
                FiltersPE.switchToParameters(), cur.pe.disableParametersUpdate(!0), each("exposure contrast saturation vignette sharpness sepia".split(" "), function(e, t) {
                    var a = data(ge("pe_param_" + t), "slider");
                    a.setValue(parseInt(r[e]) / 100)
                }), cur.pe.disableParametersUpdate(!1), cur.pe.updateTexture();
                break;
            default:
                return FiltersPE.switchToFilters(), FiltersPE.applyFilter("original"), void(FiltersPE.initialSettings = e)
        }
        for (var a = parseInt(t.shift()), o = parseInt(t.shift()), i = 0; o > i; i++) cur.pe.rotate();
        var s = t.shift();
        if (s) {
            s = s.split(",");
            var n = parseFloat(s[0]) / 100,
                p = parseInt(s[1]),
                l = [parseFloat(s[2]) / 100, parseFloat(s[3]) / 100];
            cur.pe.setBlur(n, l, p)
        }
        var c = t.shift();
        c && (c = c.split(","), cur._peCrop = {
            t: parseFloat(c[0]) / 100,
            l: parseFloat(c[1]) / 100,
            r: parseFloat(c[2]) / 100,
            b: parseFloat(c[3]) / 100
        }, FiltersPE.applyCrop(!0)), cur.pe.applyAuto(a);
        var u = t.shift();
        if (u) {
            u = u.split(",");
            var d = u[u.length - 1];
            u = u.slice(0, -1).join(","), u = replaceEntities(u), cur.pe.setText(u, d)
        }
        FiltersPE.updateActionButtonsEnabled(), FiltersPE.initialSettings = e
    },
    toStr: function() {
        var e = "";
        switch (cur.pe.getMode()) {
            case "filter":
                e += "f/";
                var t = cur.pe.getCurrentFilter();
                "original" != t.name && t.name && (e += t.name + "," + intval(100 * t.amount));
                break;
            case "params":
                e += "p/";
                var r = [];
                r.push(intval(100 * cur.pe.getExposure())), r.push(intval(100 * cur.pe.getContrast())), r.push(intval(100 * cur.pe.getSaturation())), r.push(intval(100 * cur.pe.getVignette())), r.push(intval(100 * cur.pe.getSharpness())), r.push(intval(100 * cur.pe.getSepia())), e += r.join(",")
        }
        e += "/", e += (cur.pe.isAuto() ? 1 : "") + "/";
        var a = cur.pe.getRotation();
        e += a ? a : "", e += "/";
        var o = cur.pe.getBlur();
        o && o.size > 0 && (e += intval(100 * o.size) + "," + intval(o.type || 1) + "," + intval(100 * o.position[0]) + "," + intval(100 * o.position[1])), e += "/";
        var i = cur.pe.getLastCrop();
        i && i.l + i.r + i.b + i.t && (e += Math.round(100 * i.t) + "," + Math.round(100 * i.l) + "," + Math.round(100 * i.r) + "," + Math.round(100 * i.b)), e += "/";
        var s = cur.pe.getText();
        return s && s.text && (e += s.text.replace(/\//g, "&#47;") + "," + intval(s.font)), e.match(/^\/*$/) && (e = ""), "f//////" == e && (e = ""), e
    },
    applyFilter: function(e) {
        var t = ge("pe_filter_" + e),
            r = cur.pe.getCurrentFilter();
        if (cur.FiltersPEAmount = void 0 === cur.FiltersPEAmount ? .75 : cur.FiltersPEAmount, e != r.name) {
            var a = geByClass1("pe_filter_selected", t.parentElement);
            removeClass(a, "pe_filter_selected"), re(geByClass1("pe_filter_amount_slider", a)), addClass(t, "pe_filter_selected");
            var o = geByClass1("pe_thumb_filter_name", t);
            if (re(o), "original" != e) {
                var i = se('<div class="pe_filter_amount_slider"> <div class="slider"></div> </div>');
                t.appendChild(i), new Slider(geByClass1("slider", i), {
                    width: 68,
                    size: 1,
                    debounce: 5,
                    value: .75,
                    color: "#ffffff",
                    backColor: "#3D3D3D",
                    value: cur.FiltersPEAmount || .75,
                    fireChangeEventOnInit: !0,
                    onChange: function(t) {
                        cur.FiltersPEAmount = t, cur.pe.applyFilter(e, t), FiltersPE.updateUndo()
                    }
                })
            } else cur.pe.applyFilter(e, cur.FiltersPEAmount), FiltersPE.updateUndo()
        }
    },
    savePhotoFilter: function(e) {
        e = e || ge("pe_filter_save"), addClass("pe_pointer_events_wrap", "pe_pointer_events_wrap"), lockButton(e), cur.pe.save()
    },
    changeThumbs: function(e, t) {
        if (e) {
            var r = [ge("photo_row" + cur.filterPhoto), ge("photos_add_thumb" + cur.filterPhoto)],
                a = geByClass("page_post_thumb_wrap");
            a.push.apply(a, geByClass("page_preview_photo")), a.push.apply(a, geByClass("im_preview_photo")), a.push.apply(a, geByClass("photo")), a.push.apply(a, geByClass("page_square_photo")), a.push.apply(a, geByClass("photos_row"));
            for (var o in a) {
                var i = a[o].getAttribute("onclick");
                if (!i) {
                    var s = domFC(a[o]);
                    i = s ? s.getAttribute("onclick") : !1
                }
                i && -1 != i.indexOf("'" + cur.filterPhoto + "'") && r.push(a[o])
            }
            for (var o in r)
                if (r[o]) {
                    if (hasClass(r[o], "page_square_photo") || r[o].style.backgroundImage) {
                        setStyle(r[o], {
                            backgroundImage: "url(" + e + ")"
                        });
                        continue
                    }
                    var n = geByTag1("img", r[o]);
                    n && (n.src = e, setStyle(n, {
                        height: "auto"
                    }))
                }
            if (cur.pvNoTemp || (cur.pvNoTemp = {}), cur.pvNoTemp[cur.filterPhoto] = !0, window.ThumbsEdit && t) {
                var s = ThumbsEdit.cache();
                for (var o in s) {
                    var p = s[o].previews || [],
                        l = !1;
                    for (var c in p) "photo" == p[c].type && p[c].photo.id == "photo" + cur.filterPhoto && (p[c].photo.sizes = t, l = !0);
                    l && ThumbsEdit.refresh(o)
                }
            }
        }
    },
    save: function(e) {
        FiltersPE.showQuitConfirm = !1;
        var t = {
            act: "save_desc",
            photo: cur.filterPhoto,
            hash: cur.filterHash,
            filter_num: cur.filterApplied,
            conf: FiltersPE.toStr(),
            text: cur.peDesc
        };
        e && (e.hash ? extend(t, {
            filter_hash: e.hash,
            filter_aid: e.aid,
            filter_server: e.server,
            filter_photo: e.photos_list
        }) : t._query = e), ajax.post("al_photos.php", t, {
            onDone: function(e, r, a, o, i) {
                if (cur.webcamPhotoMedia) {
                    o && i && (cur.uploadPhotoData.editable.sizes = i, cur.uploadPhotoData.thumb_m = cur.uploadPhotoData.thumb_s = o), photos.onFiltersSave();
                    var s = curBox();
                    return void(s && s.hide())
                }
                if (cur.onPESave && cur.onPESave(o, i), cur.pvListId) {
                    var n = cur.pvListId,
                        p = cur.pvIndex,
                        l = cur.pvData[n];
                    if (!l) return nav.reload();
                    var c = l[p];
                    unlockButton(ge("pe_filter_save"));
                    var s = curBox();
                    if (s && s.hide(), c.desc = e, r && (c.album = r), "album" == n.substr(0, 5)) {
                        var u = intval(n.split("_")[1]);
                        c.moved = t.aid != u
                    }
                    c.pe_type = Photoview.PE_V2;
                    var d = cur.pvShown && n == cur.pvListId && p == cur.pvIndex;
                    if (a && o && (FiltersPE.changeThumbs(o, i), delete c.x_, delete c.x_src, delete c.y_, delete c.y_src, delete c.z_, delete c.z_src, extend(c, a)), d) {
                        var h = domFC(cur.pvDesc);
                        val(h, e || '<span class="pe_desc_edit">' + getLang("photos_edit_desc") + "</span>"), h.onmouseover = e ? Photoview.descTT.pbind(h) : function() {}, r && ge("pe_album") && (ge("pe_album").innerHTML = r), cur.pvCurData = Photoview.genData(c, vk.pvbig ? cur.pvVeryBig ? (cur.pvVeryBig > 1, "z") : "y" : "x"), domFC(cur.pvPhoto).src = Photoview.blank, setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0)
                    }
                }
            }
        })
    },
    restoreOriginal: function(e, t, r, a) {
        FiltersPE.showQuitConfirm = !1, ajax.post("al_photos.php", {
            act: "restore_original",
            oid: t,
            pid: r,
            hash: a
        }, {
            onDone: function(e, t, r) {
                if (cur.onPESave && cur.onPESave(t, r), cur.pvData) {
                    var a = cur.pvListId,
                        o = cur.pvIndex,
                        i = cur.pvData[a][o],
                        s = cur.pvShown && a == cur.pvListId && o == cur.pvIndex;
                    extend(i, e), i.pe_type && (i.pe_type = Photoview.PE_V1 | Photoview.PE_V2 | Photoview.PE_V3);
                    var n = curBox();
                    n && n.hide(), FiltersPE.changeThumbs(t, r), s && (cur.pvCurData = Photoview.genData(i, vk.pvbig ? cur.pvVeryBig ? (cur.pvVeryBig > 1, "z") : "y" : "x"), cur.pvPhoto.firstChild.src = cur.pvCurData.src, setTimeout(Photoview.show.pbind(cur.pvListId, cur.pvIndex), 0))
                }
            },
            loader: 1
        })
    },
    hideName: function(e) {
        var t = geByClass1("pe_thumb_filter_name", e);
        cssAnim(t, {
            opacity: 0
        }, {
            duration: 200
        }, function() {
            re(t)
        })
    },
    showName: function(e, t) {
        var r = cur.pe.getCurrentFilter();
        if (r.name != t.toLowerCase()) {
            var a = getSize(e),
                o = geByClass1("pe_thumb_filter_name", e);
            o && re(o), o = se('<div class="pe_thumb_filter_name">' + t + "</div>"), e.appendChild(o), setStyle(o, {
                width: a[0] - 12
            }), cssAnim(o, {
                opacity: .7
            }, {
                duration: 100
            })
        }
    },
    onHide: function() {
        cur.fromWebcam && !cur.confirmBoxShown && (delete cur.fromWebcam, setTimeout(function() {
            boxQueue.hideLast()
        })), cur.confirmBoxShown || delete cur.pe
    },
    onHideAttempt: function() {
        if (!FiltersPE.showQuitConfirm) return !0;
        var e = FiltersPE.toStr();
        if ("f//////" == e && (e = ""), e !== FiltersPE.initialSettings) {
            cur.confirmBoxShown = !0;
            showFastBox({
                title: getLang("photos_pe_onhide_title"),
                dark: 1,
                forceNoBtn: !0,
                bodyStyle: "padding: 20px; line-height: 160%;"
            }, getLang("photos_pe_onhide_text"), getLang("photos_pe_onhide_yes"), function(e) {
                FiltersPE.showQuitConfirm = cur.confirmBoxShown = !1, boxQueue.hideLast(), setTimeout(function() {
                    FiltersPE.savePhotoFilter()
                }, 100)
            }, getLang("photos_pe_onhide_no"), function() {
                FiltersPE.showQuitConfirm = cur.confirmBoxShown = !1, boxQueue.hideLast(), boxQueue.hideLast()
            });
            return !1
        }
        return !0
    },
    eof: 1
};
try {
    stManager.done("filters_pe.js")
} catch (e) {}