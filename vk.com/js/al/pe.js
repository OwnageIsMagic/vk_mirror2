function PhotoEdit(t, e, r, i, a, o) {
    function n() {
        if (d._imageLoaded) {
            var t = x.width / f,
                e = x.height / f;
            if (t > e ? (i.width = Math.min(t, i.maxEditorSizeWidth), i.height = Math.round(e / t * i.width)) : (i.height = Math.min(e, i.maxEditorSizeWidth), i.width = Math.round(t / e * i.height)), m || (E = d._initCanvas("pe_main"), d._setCurrentContext("pe_main"), m = !0), v || (v = document.createElement("canvas"), v.width = x.width * f, v.height = x.height * f, v.getContext("2d").drawImage(x, 0, 0, x.width * f, x.height * f)), d._initCanvas("pe_main"), x.width != i.width || x.height != i.height) {
                var r = document.createElement("canvas");
                r.width = i.width * f, r.height = i.height * f;
                var a = r.getContext("2d");
                a.drawImage(x, 0, 0, i.width * f, i.height * f), delete x, x = r
            }
            o && o();
            var n = A;
            n.currTexture && n.currTexture.destroy(), n.cleanCurrentTexture && n.cleanCurrentTexture.destroy(), d._initialize(), s(x), d.setText(), d.applyChanges()
        }
    }

    function s(t) {
        var e = A;
        e.currTexture && e.currTexture.destroy(), e.currTexture = y.fromElement(t), e.texture.ensureFormat(e.currTexture), e.currTexture.use(), e.texture.drawTo(function() {
            F.getDefaultShader().drawRect()
        }), e.spareTexture.ensureFormat(e.texture)
    }

    function h() {
        _++, 2 == _ && setTimeout(function() {
            d._imageLoaded = !0, n(), a()
        }, 200)
    }

    function l(t, e) {
        A.texture.use(), A.spareTexture.drawTo(function() {
            t.uniforms(e).drawRect()
        }), A.spareTexture.swapWith(A.texture)
    }

    function u(t, e) {
        function r(r) {
            d.loadedImages[t[r.index]] = r, a[r.index] = r, i--, 0 == i && e(a)
        }
        if (!t) return e([]);
        for (var i = t.length, a = new Array(i), o = 0; o < t.length; o++) {
            var n = d.loadedImages[t[o]];
            if (n) n.index = o, r(n);
            else {
                var n = new Image;
                n.index = o, n.onload = function() {
                    r(this)
                }, n.src = t[o]
            }
        }
    }

    function g(t, e) {
        var r, i, a, o, n, s = function() {
            var h = (new Date).getTime() - o;
            e > h && h > 0 ? r = setTimeout(s, e - h) : (r = null, n = t.apply(a, i), r || (a = i = null))
        };
        return function() {
            a = this, i = arguments, o = (new Date).getTime();
            var h = !r;
            return r || (r = setTimeout(s, e)), h && (n = t.apply(a, i), a = i = null), n
        }
    }
    i = i || {}, i.maxEditorSizeWidth = i.maxEditorSizeWidth || 700;
    var d = this,
        c = {},
        f = window.devicePixelRatio || 1,
        m = !1;
    cur.pe = this;
    var x, p, v, w, T, E, C = new Image,
        b = new Image;
    this.clean = function() {
        var t = A;
        t.currTexture && t.currTexture.destroy(), t.cleanCurrentTexture && t.cleanCurrentTexture.destroy(), x = null, p = null, v = null, T = null, w = null, re(t.canvasEl), t.canvasEl = null
    };
    var _ = 0;
    C.onload = function() {
        x = document.createElement("canvas"), x.width = this.width * f, x.height = this.height * f;
        var t = x.getContext("2d");
        t.drawImage(C, 0, 0, this.width * f, this.height * f), h()
    }, b.onload = function() {
        w = document.createElement("canvas"), w.width = b.width, w.height = b.height;
        var t = w.getContext("2d");
        t.drawImage(b, 0, 0, b.width, b.height), h()
    }, C.crossOrigin = "Anonymous", C.src = e, b.crossOrigin = "Anonymous", b.src = r, this.restoreAll = function() {
        if (this._mode) {
            this.revert(), delete this.saturation, delete this.exposure, delete this.sepia, delete this.saturation, delete this.unsharpAmount, delete this.blurSize, delete this.blurPosition, delete this.blurType, delete this._text, delete this._fontType, delete this._mode, delete this._currentFilter, delete this._currentFilterAmount, this.setText("", 0), this.applyAuto(!1), this.resetCrop(), delete this.lastCrop;
            var t = this.getRotation();
            if (t)
                for (t = 4 - t; t--;) this.rotate()
        }
    }, this.revert = function() {
        A.texture.ensureFormat(A.currTexture), A.currTexture.use(), A.texture.drawTo(function() {
            F.getDefaultShader().drawRect()
        })
    }, this.getMode = function() {
        return this._mode
    }, this.applyChanges = function() {
        switch (this._mode) {
            case "params":
                this.applyParameters();
                break;
            case "filter":
                this.applyFilter()
        }
    }, this.loadedImages = {}, this.getLastCrop = function() {
        return this.lastCrop || (this.lastCrop = {
            l: 0,
            t: 0,
            r: 0,
            b: 0
        }), {
            t: this.lastCrop.t,
            l: this.lastCrop.l,
            r: this.lastCrop.r,
            b: this.lastCrop.b
        }
    }, this.getCanvasEl = function() {
        return E
    }, this.getSize = function() {
        return [x.width / f, x.height / f]
    }, this.resetCrop = function() {
        this.crop(0, 0, 0, 0, !0)
    }, this.getRotation = function() {
        return this._rotation || 0
    }, this.rotate = function() {
        var t = 1;
        this._rotation = ((this._rotation || 0) + t) % 4;
        var e = i.width,
            r = i.height,
            a = document.createElement("canvas");
        a.width = r * f, a.height = e * f;
        var o = a.getContext("2d");
        if (t > 0 ? o.translate(a.width, 0) : o.translate(0, a.height), o.rotate(t * Math.PI / 2), o.drawImage(x, 0, 0, a.height, a.width), delete x, x = a, p) {
            a = document.createElement("canvas"), a.width = p.height, a.height = p.width;
            var o = a.getContext("2d");
            t > 0 ? o.translate(a.width, 0) : o.translate(0, a.height), o.rotate(t * Math.PI / 2), o.drawImage(p, 0, 0, a.height, a.width), delete p, p = a
        }
        if (T) {
            a = document.createElement("canvas"), a.width = T.height, a.height = T.width, a.style.width = T.height + "px", a.style.height = T.width + "px";
            var o = a.getContext("2d");
            t > 0 ? o.translate(a.width, 0) : o.translate(0, a.height), o.rotate(t * Math.PI / 2), o.drawImage(T, 0, 0, a.height, a.width), delete T, T = a
        }
        if (w) {
            a = document.createElement("canvas"), a.width = w.height, a.height = w.width;
            var o = a.getContext("2d");
            t > 0 ? o.translate(a.width, 0) : o.translate(0, a.height), o.rotate(t * Math.PI / 2), o.drawImage(w, 0, 0, a.height, a.width), delete w, w = a
        }
        a = document.createElement("canvas"), a.width = v.height, a.height = v.width;
        var o = a.getContext("2d");
        t > 0 ? o.translate(a.width, 0) : o.translate(0, a.height), o.rotate(t * Math.PI / 2), o.drawImage(v, 0, 0, a.height, a.width), delete v, v = a;
        var s = this.getLastCrop();
        this.lastCrop.t = s.l, this.lastCrop.l = s.b, this.lastCrop.b = s.r, this.lastCrop.r = s.t, FiltersPE.hideCropArea(), n()
    }, this.show = function() {
        t.appendChild(E), o && o()
    }, this.crop = function(t, e, r, a, o, s) {
        var h = this.getLastCrop(),
            l = !!s;
        if (this.isCroppedBig = this.isCroppedBig || !1, !o || h.l == t && h.t == r && h.r == e && h.b == a || (l = !0), this._inResetMode && t + e + r + a && (l = !0), l && v) {
            T = null;
            var u = w.width * t,
                g = w.height * r,
                d = w.width * (1 - e - t),
                c = w.height * (1 - a - r),
                f = v.width * t,
                m = v.height * r,
                p = v.width * (1 - e - t),
                E = v.height * (1 - a - r);
            this.isCroppedBig = !0;
            var C = w;
            (p >= i.maxEditorSizeWidth || E >= i.maxEditorSizeWidth) && (C = v, d = p, c = E, u = f, g = m, this.isCroppedBig = !1);
            var b = document.createElement("canvas");
            b.width = d, b.height = c;
            var _ = b.getContext("2d");
            _.drawImage(C, u, g, d, c, 0, 0, d, c), delete x, x = b
        }
        this.isAuto() && this._auto(), o || (this.lastCrop = {
            t: r,
            l: t,
            b: a,
            r: e
        }), this._inResetMode = !!o, n()
    }, this.setBlur = function(t, e, r) {
        this.blurSize = t, this.blurPosition = e, this.blurType = r || 1, this.applyChanges()
    }, this.getBlur = function() {
        return void 0 !== this.blurSize ? {
            size: this.blurSize,
            position: this.blurPosition,
            type: this.blurType
        } : void 0
    }, this._applyBlur = function() {
        return this.blurSize ? (A.extraTexture.ensureFormat(A.texture), A.texture.use(), A.extraTexture.drawTo(function() {
            F.getDefaultShader().drawRect()
        }), A.extraTexture.use(1), this.triangleBlur(10 * this.blurSize), this.blurExclusion(), A.extraTexture.unuse(1), this) : void 0
    }, this.setFadeImage = function() {
        if (this.fadeRemoving) return !1;
        var t = A.canvasEl;
        if (t.parentElement) {
            re("pe_fade_image_temp");
            var e = (A.gl.canvas.toDataURL("image/jpeg", .8), document.createElement("canvas"));
            e.width = i.width * f, e.height = i.height * f, e.style.width = i.width + "px", e.style.height = i.height + "px", e.id = "pe_fade_image_temp";
            var r = e.getContext("2d");
            r.drawImage(A.gl.canvas, 0, 0, e.width, e.height), t.parentElement.appendChild(e), setStyle(e, {
                position: "absolute",
                left: 0,
                top: 0
            })
        }
    }, this.removeFadeImage = function() {
        if (this.fadeRemoving) return !1;
        var t = ge("pe_fade_image_temp");
        t && (cssAnim(t, {
            opacity: 0
        }, {
            duration: 200
        }), this.fadeRemoving = !0, setTimeout(function() {
            re(t), t = null, d.fadeRemoving = !1
        }, 200))
    }, this.getCurrentFilter = function() {
        return {
            name: this._currentFilter,
            amount: this._currentFilterAmount
        }
    }, this.applyFilter = function(t, e) {
        return this._mode = "filter", void 0 !== t && t != this._currentFilter && this.setFadeImage(), void 0 == t ? (t = this._currentFilter, e = this._currentFilterAmount) : (this._currentFilter = t, this._currentFilterAmount = e), t && "original" != t ? (void 0 == e && (e = 1), void this._applyFilter(t, e)) : (this.revert(), this._applyBlur(), this._drawText(), this.update(), void this.removeFadeImage())
    }, this._applyFilter = function(t, e) {
        var r = this,
            i = cur.filtersConfig[t];
        i && u(i.maps, function(a) {
            r.revert(), A.gl[t] = A.gl[t] || new F(null, i.glsl), A.texture.use();
            for (var o, n = [], s = {}, h = 0; h < a.length; h++) n.push(o = y.fromElement(a[h]));
            for (var h = 0; h < a.length; h++) n[h].use(h + 1), s["inputImageTexture" + (h + 1)] = h + 1;
            A.gl[t].textures(s), l.call(r, A.gl[t], {
                amount: e
            }), r._applyBlur(), r._drawText(), r.update();
            for (var h = 0; h < a.length; h++) n[h].unuse(h + 1), n[h].destroy();
            r.removeFadeImage()
        })
    }, this.triangleBlur = function(t) {
        return A.gl.triangleBlur = A.gl.triangleBlur || new F(null, "      uniform sampler2D texture;      uniform vec2 delta;      varying vec2 texCoord;      void main() {        vec4 color = vec4(0.0);        float total = 0.0;        float offset = fract(sin(dot(gl_FragCoord.xyz, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);                for (float t = -30.0; t <= 30.0; t++) {          float percent = (t + offset - 0.5) / 30.0;          float weight = 1.0 - abs(percent);          vec4 sample = texture2D(texture, texCoord + delta * percent);                    sample.rgb *= sample.a;                    color += sample * weight;          total += weight;        }                color = color / total;        color.rgb /= color.a + 0.00001;         gl_FragColor = color;       }    "), l.call(this, A.gl.triangleBlur, {
            delta: [t / i.width, 0]
        }), l.call(this, A.gl.triangleBlur, {
            delta: [0, t / i.height]
        }), this
    }, this.blurExclusion = function() {
        return A.gl.blurExclusion = A.gl.blurExclusion || new F(null, "      uniform sampler2D texture;      uniform sampler2D texture1;      uniform vec2 position;      varying vec2 texCoord;      void main() {        vec4 color = texture2D(texture, texCoord);         vec2 textureCoordinateToUse = vec2(texCoord.x, texCoord.y);        float distanceFromCenter = distance(position, textureCoordinateToUse);         color = mix(texture2D(texture1, texCoord), color, clamp(smoothstep(0.3 - 0.2, 0.3, distanceFromCenter), 0.0, 1.0));         gl_FragColor = color;               }    ").textures({
            texture1: 1
        }), A.gl.blurExclusionTiltShift = A.gl.blurExclusionTiltShift || new F(null, "      uniform sampler2D texture;      uniform sampler2D texture1;      uniform vec2 position;      varying vec2 texCoord;      void main() {        vec4 color = texture2D(texture, texCoord);         vec2 textureCoordinateToUse = vec2(texCoord.x, texCoord.y);         vec2 realPosition = position;         realPosition.x = texCoord.x;         float distanceFromCenter = distance(realPosition, textureCoordinateToUse);         color = mix(texture2D(texture1, texCoord), color, clamp(smoothstep(0.2 - 0.1, 0.2, distanceFromCenter), 0.0, 1.0));         gl_FragColor = color;               }    ").textures({
            texture1: 1
        }), this.blurPosition = this.blurPosition || [.5, .5], 2 == this.blurType ? l.call(this, A.gl.blurExclusionTiltShift, {
            position: this.blurPosition
        }) : l.call(this, A.gl.blurExclusion, {
            position: this.blurPosition
        }), this
    }, this._revertAuto = function() {
        "auto" == this._mode && (x = p, s(x))
    }, this.applyParameters = function() {
        this._mode = "params", this.updateTexture()
    }, this.getExposure = function() {
        return void 0 === this.exposure && (this.exposure = .5), this.exposure
    }, this.getContrast = function() {
        return void 0 === this.contrast && (this.contrast = .5), this.contrast
    }, this.getSaturation = function() {
        return void 0 === this.saturation && (this.saturation = .5), this.saturation
    }, this.getSepia = function() {
        return void 0 === this.sepiaAmount && (this.sepiaAmount = .5), this.sepiaAmount
    }, this.getVignette = function() {
        return this.vignetteAmount || 0
    }, this.getSharpness = function() {
        return this.unsharpAmount || 0
    }, this.disableParametersUpdate = function(t) {
        this._disableParametersUpdate = t
    }, this.setExposure = function(t) {
        this.exposure = t, this._disableParametersUpdate || this.updateTexture()
    }, this.setContrast = function(t) {
        this.contrast = t, this._disableParametersUpdate || this.updateTexture()
    }, this.setSaturation = function(t) {
        t = Math.min(.8, t), this.saturation = t, this._disableParametersUpdate || this.updateTexture()
    }, this.setVignette = function(t) {
        this.vignetteAmount = t, this._disableParametersUpdate || this.updateTexture()
    }, this.setSharpness = function(t) {
        this.unsharpRadius = 3, this.unsharpAmount = t, this._disableParametersUpdate || this.updateTexture()
    }, this.setSepia = function(t) {
        this.sepiaAmount = t, this._disableParametersUpdate || this.updateTexture()
    }, this.updateFilters = function() {
        "_params" == this._currentFilter ? this.updateTexture() : "_auto" == this._currentFilter || this.applyFilter()
    }, this.save = function() {
        var t = this,
            e = new Image;
        e.onload = function() {
            var r = document.createElement("canvas");
            r.width = e.width, r.height = e.height;
            var a = r.getContext("2d");
            a.drawImage(e, 0, 0);
            for (var o = 0; o < t.getRotation(); o++) {
                rotateCanvas = document.createElement("canvas"), rotateCanvas.width = r.height, rotateCanvas.height = r.width;
                var a = rotateCanvas.getContext("2d");
                a.translate(rotateCanvas.width, 0), a.rotate(Math.PI / 2), a.drawImage(r, 0, 0, rotateCanvas.height, rotateCanvas.width), delete r, r = rotateCanvas
            }
            var n = t.getLastCrop(),
                h = n.l * r.width,
                l = n.r * r.width,
                u = n.t * r.height,
                g = n.b * r.height,
                d = r.width - h - l,
                c = r.height - u - g,
                f = n.l * w.width,
                m = n.r * w.width,
                p = n.t * w.height,
                v = n.b * w.height,
                E = w.width - f - m,
                C = w.height - p - v;
            (E > d && i.width > d || C > c && i.height > c) && (r = w, h = f, l = m, u = p, g = v, d = E, c = C);
            t._initCanvas("pe_big_save", d, c);
            x = document.createElement("canvas"), x.width = d, x.height = c, a = x.getContext("2d"), browser.safari && parseInt(browser.version) >= 8 && (a.translate(0, x.height), a.scale(1, -1)), a.drawImage(r, h, u, d, c, 0, 0, d, c), t.isSaving = !0, t._setCurrentContext("pe_big_save"), t._initialize(), T = null, t.isAuto() && t._auto(), s(x), t.setText(), t.applyChanges(), A.gl.canvas.toBlob(function(t) {
                var e = new FormData;
                e.append("file0", t, encodeURIComponent("Filtered.jpg"));
                var r = cur.filterSaveOptions.upload_url + "?" + cur.filterSaveOptions.post_data,
                    i = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
                    a = new i;
                a.open("POST", r, !0), a.onload = function(t) {
                    t = t.target.responseText;
                    var e = parseJSON(t);
                    e && ("album_photo" == e.bwact ? FiltersPE.save(t) : FiltersPE.save(e))
                }, a.send(e)
            }, "image/jpeg")
        }, e.crossOrigin = "Anonymous", e.src = r
    }, this.getText = function() {
        return {
            text: this._text,
            font: this._fontType
        }
    }, this.setText = function(t, e) {
        if (!(void 0 == t && void 0 == this._text || t == this._text && this._fontType == e)) {
            void 0 == t && (t = this._text, e = this._fontType), this._text = t.substr(0, 200), this._fontType = e, this.textCanvasEl = this.textCanvasEl || document.createElement("canvas"), this.textCanvasEl.width = x.width, this.textCanvasEl.height = x.height;
            var r = this.textCanvasEl.getContext("2d");
            if (this.isSaving && browser.safari && parseInt(browser.version) >= 8 && (r.translate(0, this.textCanvasEl.height), r.scale(1, -1)), 1 == e) {
                r.rect(0, 0, x.width, x.height);
                var i = r.createLinearGradient(0, x.height - .07 * x.width, 0, x.height);
                i.addColorStop(0, "rgba(0, 0, 0, 0)"), i.addColorStop(1, "rgba(0, 0, 0, 0.3)"), r.fillStyle = i, r.fill(), r.shadowColor = "rgba(0, 0, 0, 1)", r.shadowOffsetX = 0, r.shadowOffsetY = 0, r.shadowBlur = .006 * x.width
            }
            var a = .3 * Math.max(x.width, x.height),
                o = 0;
            0 == e ? (o = .1 * a, r.font = "normal " + o + "px 'ImpactPE'") : (o = .17 * a, r.font = "normal " + o + "px 'Lobster'");
            var n = .8 * x.width,
                s = 0 == this._fontType ? this._text.toUpperCase() : this._text;
            s = s.split("\n"), compiledText = [];
            for (var h = !1, l = 0; l < s.length || h; l++) {
                var u = "";
                l < s.length && (u = s[l]), h && (l--, u = h, h = !1);
                var g = r.measureText(u);
                if (g.width > n)
                    for (var d = "", c = 0, f = -1; c < u.length;) {
                        for (; c < u.length;) {
                            var m = r.measureText(d).width < n;
                            d += u[c], c++, m && " " == u[c] && (f = c)
                        }
                        f > 0 ? (compiledText.push(d.substr(0, f)), h = d.substr(f + 1)) : (compiledText.push(d), h = !1), d = ""
                    } else compiledText.push(u)
            }
            s = compiledText;
            var p = 9999,
                v = 9999;
            if (0 == e) {
                for (var w = [], l = 1; 100 >= l; l += 5) w.push(l * a * .0035);
                for (var l = s.length - 1; l >= 0; l--) {
                    var T = 0;
                    ! function b(t, e, i) {
                        var a = Math.floor((e + i) / 2);
                        T = t[a], r.font = T + "px 'ImpactPE'";
                        var o = r.measureText(s[l]).width;
                        return e > i ? o : o > .9 * x.width ? b(t, e, a - 1) : b(t, a + 1, i)
                    }(w, 0, w.length - 1), s.length > 1 && 0 == l ? p = Math.min(T, p) : v = Math.min(T, v)
                }
            }
            var E;
            E = 0 == e ? x.height - .2 * v - .04 * x.height : x.height - .7 * o, r.strokeStyle = "#000", r.fillStyle = "#fff";
            for (var l = s.length - 1; l >= 0; l--) {
                if (0 == e) {
                    var C = 0;
                    0 == l && s.length > 1 ? (C = p, E = 1.1 * p + .04 * x.height) : C = v, lineHeight = 1.1 * C, r.font = C + "px 'ImpactPE'", 9999 == p && (p = v), r.lineWidth = .08 * Math.max(v, p)
                } else r.font = .2 * a + "px 'Lobster'", lineHeight = .22 * a;
                r.lineJoin = "round";
                var g = r.measureText(s[l]);
                0 == e ? (r.strokeText(s[l], (x.width - g.width) / 2, E), r.fillText(s[l], (x.width - g.width) / 2, E)) : r.fillText(s[l], x.width / 2 - g.width / 2, E), E -= lineHeight
            }
            return A.textTexture = y.fromElement(r.canvas), this.applyChanges(), this._text
        }
    }, this.updateTexture = function() {
        function t(t, e, r, i, a) {
            return (t - e) * (a - i) / (r - e) + i
        }
        if (A.isInited) {
            A.gl.updateTexture = A.gl.updateTexture || new F(null, "        uniform sampler2D originalTexture;        uniform sampler2D blurredTexture;        uniform float exposure;        uniform float contrast;        uniform float saturation;        uniform float vignetteSize;        uniform float vignetteAmount;        uniform float unsharpAmount;        uniform float sepiaAmount;        uniform float ratio;        varying vec2 texCoord;                float random(vec3 scale, float seed) {          return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);        }                void main() {            vec4 color = texture2D(originalTexture, texCoord);                        vec4 blurred = texture2D(blurredTexture, texCoord);            color = mix(blurred, color, 1.0 + unsharpAmount);                        if (contrast > 0.0) {                 color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;             } else {                 color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5;             }             color = vec4(color.rgb * pow(2.0, exposure), color.w);                         /* saturation adjustment */            float average = (color.r + color.g + color.b) / 3.0;            if (saturation > 0.0) {                color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));            } else {                color.rgb += (average - color.rgb) * (-saturation);            }                        /*sepia*/             float r = color.r;            float g = color.g;            float b = color.b;            color.r = min(1.0, (r * (1.0 - (0.607 * sepiaAmount))) + (g * (0.769 * sepiaAmount)) + (b * (0.189 * sepiaAmount)));            color.g = min(1.0, (r * 0.349 * sepiaAmount) + (g * (1.0 - (0.314 * sepiaAmount))) + (b * 0.168 * sepiaAmount));            color.b = min(1.0, (r * 0.272 * sepiaAmount) + (g * 0.534 * sepiaAmount) + (b * (1.0 - (0.869 * sepiaAmount))));                        /* vignette */                         float dist = distance(texCoord, vec2(0.5, 0.5));            color.rgb *= smoothstep(0.8, vignetteSize * 0.799, dist * (vignetteAmount + vignetteSize));                        gl_FragColor = color;        }    "), this.revert(), this.unsharpAmount >= 0 && (A.extraTexture.ensureFormat(A.texture), A.texture.use(), A.extraTexture.drawTo(function() {
                F.getDefaultShader().drawRect()
            }), this.triangleBlur(this.unsharpRadius), A.extraTexture.use(1), A.gl.updateTexture.textures({
                originalTexture: 1
            }), A.extraTexture.unuse(1)), A.extraTexture.use(1);
            var e = this.sepiaAmount;
            e = 2 * e - 1;
            var r = this.exposure;
            r = 2 * r - 1;
            var i = this.contrast;
            i = t(2 * i - 1, -1, 1, -.9, .9);
            var a = this.saturation;
            a = 2 * a - 1, this.vignetteAmount = this.vignetteAmount || 0;
            var o = .5 - .4 * this.vignetteAmount,
                n = this.vignetteAmount * this.vignetteAmount * .1 + .5 * this.vignetteAmount;
            l.call(this, A.gl.updateTexture, {
                unsharpAmount: this.unsharpAmount || 0,
                exposure: r || 0,
                contrast: i || 0,
                saturation: a || 0,
                vignetteSize: o,
                vignetteAmount: n,
                sepiaAmount: e || 0,
                blurSize: this.blurSize || 0,
                ratio: x.width / x.height
            }), A.extraTexture.unuse(1), this.blurSize > 0 && (A.extraTexture.ensureFormat(A.texture), A.texture.use(), A.extraTexture.drawTo(function() {
                F.getDefaultShader().drawRect()
            }), A.extraTexture.use(1), this.triangleBlur(12 * this.blurSize), this.blurExclusion(), A.extraTexture.unuse(1)), this._drawText(), this.update()
        }
    }, this._drawText = function() {
        this._text && (A.gl.textShader = A.gl.textShader || new F(null, "        uniform sampler2D originalTexture;        uniform sampler2D textTexture;        varying vec2 texCoord;        void main() {            vec4 color = texture2D(originalTexture, texCoord);            vec4 tc = texture2D(textTexture, texCoord);            color = mix(color, tc, tc.a); color.a = 1.0;             gl_FragColor = color;        }      "), A.textTexture.use(10), A.gl.textShader.textures({
            textTexture: 10
        }), l.call(this, A.gl.textShader, {}), A.textTexture.unuse(10))
    }, this._initCanvas = function(t, e, r) {
        var a = c[t] = c[t] || {},
            o = c[t].canvasEl;
        if (o) o.width = f * (e || i.width), o.height = f * (r || i.height), o.style.width = i.width + "px", o.style.height = i.height + "px";
        else {
            a.canvasEl = ge(t), a.canvasEl || (a.canvasEl = document.createElement("canvas"), a.canvasEl.id = t, a.canvasEl.width = e || i.width * f, a.canvasEl.height = r || i.height * f, a.canvasEl.style.width = i.width + "px", a.canvasEl.style.height = i.height + "px");
            try {
                var n = {
                    preserveDrawingBuffer: !0,
                    premultipliedAlpha: !1
                };
                a.gl = a.canvasEl.getContext("webgl", n) || a.canvasEl.getContext("experimental-webgl", n)
            } catch (s) {}
            if (!a.gl) throw "Couldn't init webgl";
            o = a.canvasEl, c[t] = a
        }
        return o
    }, this.update = function() {
        return A.texture.use(), A.flippedShader.drawRect(), this
    };
    var A = null;
    this._setCurrentContext = function(t) {
        A = c[t]
    }, this._initialize = function() {
        var t = A;
        if (!t.isInited) {
            var e = t.gl.UNSIGNED_BYTE;
            t.texture && t.texture.destroy(), t.spareTexture && t.spareTexture.destroy(), t.extraTexture && t.extraTexture.destroy(), t.texture = new y(t.canvasEl.width, t.canvasEl.height, t.gl.RGBA, e), t.spareTexture = new y(t.canvasEl.width, t.canvasEl.height, t.gl.RGBA, e), t.extraTexture = new y(0, 0, t.gl.RGBA, e), t.textTexture = new y(0, 0, t.gl.RGBA, e), t.flippedShader = new F(null, "          uniform sampler2D texture;          varying vec2 texCoord;          void main() {              vec4 color = texture2D(texture, vec2(texCoord.x, 1.0 - texCoord.y));               gl_FragColor = color;           }      "), t.isInited = !0
        }
    };
    var y = function() {
            function t(t, e, r, i) {
                var a = A;
                this.id = a.gl.createTexture(), this.width = t, this.height = e, this.format = r, this.type = i, a.gl.bindTexture(a.gl.TEXTURE_2D, this.id), a.gl.texParameteri(a.gl.TEXTURE_2D, a.gl.TEXTURE_MAG_FILTER, a.gl.LINEAR), a.gl.texParameteri(a.gl.TEXTURE_2D, a.gl.TEXTURE_MIN_FILTER, a.gl.LINEAR), a.gl.texParameteri(a.gl.TEXTURE_2D, a.gl.TEXTURE_WRAP_S, a.gl.CLAMP_TO_EDGE), a.gl.texParameteri(a.gl.TEXTURE_2D, a.gl.TEXTURE_WRAP_T, a.gl.CLAMP_TO_EDGE), t && e && a.gl.texImage2D(a.gl.TEXTURE_2D, 0, this.format, t, e, 0, this.format, this.type, null)
            }
            t.fromElement = function(e) {
                var r = A,
                    i = new t(0, 0, r.gl.RGBA, r.gl.UNSIGNED_BYTE);
                return i.loadContentsOf(e), i
            }, t.prototype.loadContentsOf = function(t) {
                var e = A;
                this.width = t.width || t.videoWidth, this.height = t.height || t.videoHeight, e.gl.bindTexture(e.gl.TEXTURE_2D, this.id), e.gl.texImage2D(e.gl.TEXTURE_2D, 0, this.format, this.format, this.type, t)
            }, t.prototype.destroy = function() {
                A.gl.deleteTexture(this.id), this.id = null
            }, t.prototype.use = function(t) {
                A.gl.activeTexture(A.gl.TEXTURE0 + (t || 0)), A.gl.bindTexture(A.gl.TEXTURE_2D, this.id)
            }, t.prototype.unuse = function(t) {
                A.gl.activeTexture(A.gl.TEXTURE0 + (t || 0)), A.gl.bindTexture(A.gl.TEXTURE_2D, null)
            }, t.prototype.ensureFormat = function(t, e, r, i) {
                if (1 == arguments.length) {
                    var a = arguments[0];
                    t = a.width, e = a.height, r = a.format, i = a.type
                }(t != this.width || e != this.height || r != this.format || i != this.type) && (this.width = t, this.height = e, this.format = r, this.type = i, A.gl.bindTexture(A.gl.TEXTURE_2D, this.id), A.gl.texImage2D(A.gl.TEXTURE_2D, 0, this.format, t, e, 0, this.format, this.type, null))
            }, t.prototype.drawTo = function(t) {
                if (A.gl.framebuffer = A.gl.framebuffer || A.gl.createFramebuffer(), A.gl.bindFramebuffer(A.gl.FRAMEBUFFER, A.gl.framebuffer), A.gl.framebufferTexture2D(A.gl.FRAMEBUFFER, A.gl.COLOR_ATTACHMENT0, A.gl.TEXTURE_2D, this.id, 0), A.gl.checkFramebufferStatus(A.gl.FRAMEBUFFER) !== A.gl.FRAMEBUFFER_COMPLETE) throw new Error("incomplete framebuffer");
                A.gl.viewport(0, 0, this.width, this.height), t(), A.gl.bindFramebuffer(A.gl.FRAMEBUFFER, null)
            };
            return t.prototype.swapWith = function(t) {
                var e;
                e = t.id, t.id = this.id, this.id = e, e = t.width, t.width = this.width, this.width = e, e = t.height, t.height = this.height, this.height = e, e = t.format, t.format = this.format, this.format = e
            }, t
        }(),
        F = function() {
            function t(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }

            function e(t) {
                return "[object Number]" == Object.prototype.toString.call(t)
            }

            function r(t, e) {
                var r = A,
                    i = r.gl.createShader(t);
                if (r.gl.shaderSource(i, e), r.gl.compileShader(i), !r.gl.getShaderParameter(i, r.gl.COMPILE_STATUS)) throw "compile error: " + r.gl.getShaderInfoLog(i);
                return i
            }

            function i(t, e) {
                var i = A;
                if (this.vertexAttribute = null, this.texCoordAttribute = null, this.program = i.gl.createProgram(), t = t || a, e = e || o, e = "precision highp float;" + e, i.gl.attachShader(this.program, r(i.gl.VERTEX_SHADER, t)), i.gl.attachShader(this.program, r(i.gl.FRAGMENT_SHADER, e)), i.gl.linkProgram(this.program), !i.gl.getProgramParameter(this.program, i.gl.LINK_STATUS)) throw "link error: " + i.gl.getProgramInfoLog(this.program)
            }
            var a = "      attribute vec2 vertex;      attribute vec2 _texCoord;      varying vec2 texCoord;      void main() {          texCoord = _texCoord;          gl_Position = vec4(vertex * 2.0 - 1.0, 0.0, 1.0);      }",
                o = "      uniform sampler2D texture;      varying vec2 texCoord;      void main() {          vec4 color = texture2D(texture, texCoord);          gl_FragColor = color;      }";
            return i.prototype.destroy = function() {
                A.gl.deleteProgram(this.program), this.program = null
            }, i.prototype.uniforms = function(r) {
                var i = A;
                i.gl.useProgram(this.program);
                for (var a in r)
                    if (r.hasOwnProperty(a)) {
                        var o = i.gl.getUniformLocation(this.program, a);
                        if (null !== o) {
                            var n = r[a];
                            if (t(n)) switch (n.length) {
                                case 1:
                                    i.gl.uniform1fv(o, new Float32Array(n));
                                    break;
                                case 2:
                                    i.gl.uniform2fv(o, new Float32Array(n));
                                    break;
                                case 3:
                                    i.gl.uniform3fv(o, new Float32Array(n));
                                    break;
                                case 4:
                                    i.gl.uniform4fv(o, new Float32Array(n));
                                    break;
                                case 9:
                                    i.gl.uniformMatrix3fv(o, !1, new Float32Array(n));
                                    break;
                                case 16:
                                    i.gl.uniformMatrix4fv(o, !1, new Float32Array(n));
                                    break;
                                default:
                                    throw 'erro while loading uniform "' + a + '" of length ' + n.length
                            } else {
                                if (!e(n)) throw 'attempted to set uniform "' + a + '" to invalid value ' + (n || "undefined").toString();
                                i.gl.uniform1f(o, n)
                            }
                        }
                    }
                return this
            }, i.prototype.textures = function(t) {
                var e = A;
                e.gl.useProgram(this.program);
                for (var r in t) t.hasOwnProperty(r) && e.gl.uniform1i(e.gl.getUniformLocation(this.program, r), t[r]);
                return this
            }, i.prototype.drawRect = function(t, e, r, i) {
                var a, o = A,
                    n = o.gl.getParameter(o.gl.VIEWPORT);
                e = e !== a ? (e - n[1]) / n[3] : 0, t = t !== a ? (t - n[0]) / n[2] : 0, r = r !== a ? (r - n[0]) / n[2] : 1, i = i !== a ? (i - n[1]) / n[3] : 1, o.gl.vertexBuffer || (o.gl.vertexBuffer = o.gl.createBuffer()), o.gl.bindBuffer(o.gl.ARRAY_BUFFER, o.gl.vertexBuffer), o.gl.bufferData(o.gl.ARRAY_BUFFER, new Float32Array([t, e, t, i, r, e, r, i]), o.gl.STATIC_DRAW), o.gl.texCoordBuffer || (o.gl.texCoordBuffer = o.gl.createBuffer(), o.gl.bindBuffer(o.gl.ARRAY_BUFFER, o.gl.texCoordBuffer), o.gl.bufferData(o.gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), o.gl.STATIC_DRAW)), this.vertexAttribute || (this.vertexAttribute = o.gl.getAttribLocation(this.program, "vertex"), o.gl.enableVertexAttribArray(this.vertexAttribute)), this.texCoordAttribute || (this.texCoordAttribute = o.gl.getAttribLocation(this.program, "_texCoord"), o.gl.enableVertexAttribArray(this.texCoordAttribute)), o.gl.useProgram(this.program), o.gl.bindBuffer(o.gl.ARRAY_BUFFER, o.gl.vertexBuffer), o.gl.vertexAttribPointer(this.vertexAttribute, 2, o.gl.FLOAT, !1, 0, 0), o.gl.bindBuffer(o.gl.ARRAY_BUFFER, o.gl.texCoordBuffer), o.gl.vertexAttribPointer(this.texCoordAttribute, 2, o.gl.FLOAT, !1, 0, 0), o.gl.drawArrays(o.gl.TRIANGLE_STRIP, 0, 4)
            }, i.getDefaultShader = function() {
                var t = A;
                return t.gl.defaultShader = t.gl.defaultShader || new i, t.gl.defaultShader
            }, i
        }();
    this.applyAuto = function(t) {
        this.autoEnabled = void 0 === t ? !this.autoEnabled : t, this.autoEnabled ? this._auto() : p && (delete x, x = p, p = null), x && n()
    }, this.isAuto = function() {
        return !!this.autoEnabled
    }, this._auto = function(t, e) {
        function r(t, e, r, i) {
            for (var a = g + 1, o = [], n = 0; g + 1 > n; n++) o.push(0);
            var n, s = 0;
            for (n = 0; t > n; n++) s = 4 * n, o[c[s + i]] += 1;
            for (n = 1; a > n; n++) o[n] += o[n - 1];
            var h = {};
            for (n = 0; a > n && o[n] <= e;) n++;
            for (h.min = n, n = a - 1; a > n && o[n] > t - r;) n--;
            return a - 1 > n && n++, h.max = n, h
        }

        function i(t, e, r, i) {
            var a;
            if (e >= r)
                for (a = 0; t > a; a++) pi = 4 * a, c[pi + i] = g / 2;
            else {
                var o = new Array(g + 1);
                for (a = 0; e > a; a++) o[a] = 0;
                for (a = e; r > a; a++) o[a] = (a - e) * g / (r - e) + .5;
                for (a = r; g + 1 > a; a++) o[a] = g;
                for (a = 0; t > a; a++) pi = 4 * a, c[pi + i] = o[c[pi + i]]
            }
        }

        function a(t, e, a, o) {
            var n, s;
            if (e + a >= t && (e = (t - 1) / 2, a = (t - 1) / 2), 0 != e || 0 != a) {
                var h = r(t, e, a, o);
                n = h.min, s = h.max
            } else {
                var h = minmax_u8(t, o);
                n = h.min, s = h.max
            }
            i(t, n, s, o)
        }

        function o(t, e, r) {
            a(t, e, r, 0), a(t, e, r, 1), a(t, e, r, 2)
        }
        if (t || (t = e = 1), e = t, T) return p || (p = x), void(x = T);
        var n = document.createElement("canvas");
        n.width = x.width, n.height = x.height;
        var s = n.getContext("2d");
        s.drawImage(x, 0, 0, x.width, x.height);
        var h = x.width,
            l = x.height,
            u = h * l,
            g = 255,
            d = s.getImageData(0, 0, x.width, x.height),
            c = d.data;
        o(u, u * (t / 100), u * (e / 100)), s.putImageData(d, 0, 0), T = document.createElement("canvas"), T.width = x.width, T.height = x.height;
        var s = T.getContext("2d");
        s.drawImage(n, 0, 0, n.width, n.height), p = x, x = n
    }, this._applyFilter = g(this._applyFilter, 10)
}
try {
    stManager.done("pe.js")
} catch (e) {}