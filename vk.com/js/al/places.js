var Places = {
    initPhotoMap: function(o) {
        function e(o, t) {
            if (!o.expanded) return !1;
            t || (f ? u.addLayer(o.overlay) : o.overlay.setMap(u)), o.expanded = !1;
            var n = o.points;
            if (n)
                for (i in n) {
                    var a = n[i];
                    a.overlay && (f ? u.removeLayer(a.overlay) : a.overlay.setMap(null), e(a, !0))
                }
        }

        function t(o, e) {
            if (o.loading || !o.points || o.expanded || e) return !1;
            for (var t = o.points, n = t.length; n--;) {
                var a = t[n];
                if (a.overlay) f ? u.addLayer(a.overlay) : a.overlay.setMap(u);
                else if (f) {
                    var i = new L.LatLng(a.lat, a.lng);
                    a.overlay = g(i, u, a.src, a.count, a.diff), a.overlay.on("click", s.pbind(a))
                } else a.overlay = new h([a.lat, a.lng], u, a.src, a.count, a.diff, function(o) {
                    s(o)
                }.pbind(a))
            }
            f ? u.removeLayer(o.overlay) : o.overlay.setMap(null), o.expanded = !0
        }

        function n(t, a, i) {
            if (!t) return !1;
            i || (o.diff = Math.max(a.neLat - a.swLat, a.neLng - a.swLng), i = {});
            for (var s = t.length; s--;)
                if (!(t[s].loading || t[s].count <= 1)) {
                    var r = t[s],
                        l = 20 * r.diff;
                    l > o.diff && r.lat >= a.swLat - l && r.lat <= a.neLat + l && r.lng >= a.swLng - l && r.lng <= a.neLng + l ? r.expanded ? n(r.points, a, i) : i[r.photo.split("_")[1]] = r : r.expanded && e(r)
                }
            return i
        }

        function a() {
            var e = n(o.points, r()),
                a = null,
                i = {
                    uid: o.uid,
                    act: "a_get_points",
                    points: [],
                    ids: [],
                    diffs: []
                };
            for (a in e) e[a].loading = !0, i.points.push(a), i.ids.push(e[a].ids), i.diffs.push(e[a].diff);
            0 !== i.points.length && (o.diff ? (delete i.diffs, i.diff = o.diff) : i.diffs = i.diffs.join(","), i.points = i.points.join(","), i.ids = i.ids.join(","), ajax.post("al_places.php", i, {
                onDone: function(o, e) {
                    for (var n in e) o[n] && (o[n].loading = !1, e[n].length && (o[n].points = e[n], t(o[n])))
                }.pbind(e),
                onFail: function(o) {
                    for (var e in o) o[e].loading = !1
                }.pbind(e)
            }))
        }

        function s(e) {
            if (!o.box) return showBox("al_places.php", {
                act: "photos_box",
                lat: e.lat,
                lng: e.lng,
                diff: o.diffZone,
                uid: o.uid
            }, {
                stat: ["maps.js", "places.js", "places.css", "ui_controls.js", "ui_controls.css"]
            }), !1;
            e.photo.split("_");
            if (e.overlay) {
                var t = ge("profile_map_icon_" + e.overlay.iconNum),
                    n = geByClass1("profile_map_first", t) || t,
                    a = geByClass1("profile_map_photo_count", n);
                a && hide(a), showProgress(n, "profile_map_photo_loader")
            }
            var i = e.diff || 1e-6,
                s = "map" + o.uid + "_" + (e.lat - i) + "_" + (e.lng - i) + "_" + (e.lat + i) + "_" + (e.lng + i);
            return o.showPlacePhoto(e.photo, s, {})
        }

        function r() {
            var o = u.getBounds(),
                e = u.getZoom();
            if (3 > e) var t = {
                swLat: -90,
                swLng: -90,
                neLat: 90,
                neLng: 90
            };
            else if (f) var n = o.getNorthEast(),
                a = o.getSouthWest(),
                t = {
                    swLat: a.lat,
                    swLng: a.lng,
                    neLat: n.lat,
                    neLng: n.lng
                };
            else var t = {
                swLat: o[0][0],
                swLng: o[0][1],
                neLat: o[1][0],
                neLng: o[1][1]
            };
            return t
        }

        function l() {
            var e = r();
            ajax.post("al_places.php", {
                act: "update_photos_list",
                uid: o.uid,
                sw_lat: e.swLat,
                sw_lng: e.swLng,
                ne_lat: e.neLat,
                ne_lng: e.neLng
            }, {
                onDone: function(o) {
                    ge("place_map_other") && (ge("place_map_other").innerHTML = o, window.tooltips && tooltips.destroyAll())
                }
            }), n(o.points, e)
        }

        function p(e) {
            o.box ? (cur.placeBoxMap = e, cur.placeBoxOpts = o) : (cur.placesPhotoMap = e, cur.placesPhotoOpts = o)
        }

        function c(e) {
            return cur.editPhotosPlace && fadeOut(ge("places_photo_hint_cont"), 200), cur.mapMoveTimeout && clearTimeout(cur.mapMoveTimeout), cur.mapMoveTimeout = setTimeout(a, e ? 0 : 200), _ ? (_ = !1, !1) : void(o.box && (cur.mapMoveServerTimeout && clearTimeout(cur.mapMoveServerTimeout), cur.mapMoveServerTimeout = setTimeout(l, 500)))
        }

        function d(o, e, t, n, a) {
            var i = "";
            e > 1 && t && (i = '<span class="profile_map_photo_count">' + (e > 99 ? "99+" : e) + "</span>");
            var s = Math.min(e - 1, 3);
            for (i = "<div" + (s ? "" : ' id="profile_map_icon_' + n + '"') + ' class="profile_map_photo profile_map_first" style="background: url(' + o + ") center center no-repeat;" + (s ? " margin-left: -2px; margin-top: -4px;" : "") + '">' + i + "</div>"; s--;) i = "<div" + (s ? "" : ' id="profile_map_icon_' + n + '"') + ' class="profile_map_photo"' + (s ? ' style="margin-left: -2px; margin-top: -4px;"' : "") + ">" + i + "</div>";
            return i
        }
        var u, f, h, g;
        if (cur.iconLastNum || (cur.iconLastNum = 0), "mapbox" == o.provider) {
            if (cur.provider = "mapbox", cur.providerId = 3, f = 1, !window.L || !window.L.mapbox) {
                var v = ["mapbox.css", "mapbox.js"];
                return browser.msie && browser.version < 8 && v.push("mapbox_ie.css"), stManager.add(v, function() {
                    Places.initPhotoMap(o)
                }), !1
            }
        } else if ("yandex2" == o.provider && !window.yandexMapsInited) {
            window.yandexMapInit = function() {
                ymaps.modules.require(["package.standard"], function(e, t) {
                    window.yandexMapsInited = !0, Places.initPhotoMap(o)
                })
            };
            var m = "en_US";
            return "UA" == o.countryCode ? m = ("uk" == cur.vkLngCode ? "uk" : "ru") + "_UA" : "ru" == cur.vkLngCode && (m = "ru_RU"), headNode.appendChild(ce("script", {
                type: "text/javascript",
                src: (window.locProtocol || "http:") + "//api-maps.yandex.ru/2.1/?lang=" + m + "&onload=yandexMapInit&load=package.standard"
            })), !1
        }
        cur.photoMapOpts = o, cur.editPhotosPlace = !1;
        var _ = !0;
        if (f) {
            g = function(o, e, t, n, a) {
                var i = new L.HtmlIcon({
                    html: d(t, n, a, cur.iconLastNum)
                });
                cur.icon = i;
                var s = new L.Marker(o, {
                    draggable: !1,
                    icon: i
                });
                return e ? u.addLayer(s) : u.removeLayer(s), s.iconNum = cur.iconLastNum++, s
            };
            var w = "vkmaps.map-an1xcr4f",
                x = "vkmaps.map-40lc3e3w";
            if (o.map ? u = o.map : (u = L.mapbox.map(o.cont, !1, {
                    zoomControl: !1,
                    scrollWheelZoom: !1,
                    touchZoom: !1
                }), L.mapbox.tileLayer(w, {
                    detectRetina: !0,
                    retinaVersion: x
                }).addTo(u)), p(u), o.bounds ? u.fitBounds([
                    [o.bounds.swlat, o.bounds.swlng],
                    [o.bounds.nelat, o.bounds.nelng]
                ]) : (o.lat || o.lng || (o.lat = 30), u.setView([o.lat, o.lng], 1)), o.nowheel || (u.on("moveend", c.pbind(!0)), u.on("zoomend", c.pbind(!0))), o.points)
                for (var b = o.points.length; b--;) {
                    var y = o.points[b],
                        P = new L.LatLng(y.lat, y.lng);
                    y.overlay = g(P, y.points ? !1 : !0, y.src, y.count, y.diff), y.overlay.on("click", s.pbind(y)), y.points && t(y)
                }
            u.on("click", function(e) {
                o.box || Places.showProfileBox(o.uid)
            }.bind(this))
        } else {
            h = function(o, e, t, n, a, i) {
                this.latlng = o, this.photoSrc = t, this.photoCount = n, this.photoDiff = a;
                var s = d(this.photoSrc, this.photoCount, this.photoDiff, cur.iconLastNum);
                this.iconNum = cur.iconLastNum++;
                var r = new ymaps.Placemark(o, {
                    iconContent: s
                }, {
                    preset: "islands#circleIcon",
                    iconColor: "#FFFFFF"
                });
                i && r.events.add("click", i), this.p = r, this.setMap(e)
            }, h.prototype.remove = function() {
                this.photoDiv && (this.photoDiv.parentNode.removeChild(this.photoDiv), this.photoDiv = null)
            }, h.prototype.getPosition = function() {
                return this.latlng
            }, h.prototype.setMap = function(o) {
                o ? (o.geoObjects.add(this.p), this.map = o) : this.map && (this.map.geoObjects.remove(this.p), this.map = null)
            };
            var M = {
                center: [o.lat, o.lng],
                controls: []
            };
            if (o.nowheel && (M.scrollwheel = !1, M.disableDoubleClickZoom = !0), u = o.map ? o.map : new ymaps.Map(o.cont, M, {
                    suppressMapOpenBlock: !0,
                    suppressObsoleteBrowserNotifier: !0
                }), p(u), o.bounds ? (cur.a = u, u.setBounds([
                    [o.bounds.swlat, o.bounds.swlng],
                    [o.bounds.nelat, o.bounds.nelng]
                ])) : (o.lat || o.lng || (o.lat = 30), u.setCenter([o.lat, o.lng], 1)), o.nowheel ? (u.behaviors.disable("drag"), u.behaviors.disable("scrollZoom")) : u.events.add("boundschange", c.pbind(!1)), o.points)
                for (var b = o.points.length; b--;) {
                    var y = o.points[b];
                    y.overlay = new h([y.lat, y.lng], y.points ? null : u, y.src, y.count, y.diff, function(e) {
                        o.box ? s(e) : Places.showProfileBox(o.uid)
                    }.pbind(y))
                }
            u.events.add("click", function(e) {
                o.box || Places.showProfileBox(o.uid)
            }.bind(this))
        }
    },
    showProfileBox: function(o) {
        return showBox("al_places.php", {
            act: "photos_box",
            uid: o
        }, {
            stat: ["maps.js", "places.js", "places.css", "ui_controls.js", "ui_controls.css"]
        }), !1
    },
    showMorePhotos: function(o, e) {
        return !cur.addPhotosOffset || buttonLocked(o) ? !1 : void ajax.post("al_places.php", {
            act: "a_edit_photos",
            uid: e,
            offset: cur.addPhotosOffset
        }, {
            onDone: function(e, t, n) {
                cur.addPhotosOffset = t, n || hide(o), ge("places_map_add_list") && ge("places_map_add_list").appendChild(cf(e))
            },
            showProgress: lockButton.pbind(o),
            hideProgress: unlockButton.pbind(o)
        })
    },
    addPhotos: function(o, e) {
        showBox("al_places.php", {
            act: "a_edit_photos",
            uid: e
        })
    },
    selectPhoto: function(o, e) {
        return showBox("/al_places.php", {
            act: "show_photo_place",
            edit: 1,
            geohash: e || "",
            photo: o
        }), !1
    },
    savePhotos: function(o, e) {
        var t = cur.placeMarker.location,
            n = {
                act: "save_photos_places",
                pids: cur.mapPids,
                lat: t.lat,
                lng: t.lon,
                hash: e
            };
        if (cur.lastSelectedPlace) {
            var a = cur.lastSelectedPlace;
            extend(n, {
                geo_country: a.country,
                geo_locality: a.locality,
                geo_region: a.region,
                geo_street: a.street,
                geo_place: a.place,
                geo_lang: cur.vkLngCode,
                geo_code: a.countryCode
            })
        }
        ajax.post("al_places.php", n, {
            onDone: function() {
                Places.updateBox()
            },
            showProgress: function() {
                lockButton(o)
            },
            hideProgress: function() {
                unlockButton(o)
            }
        })
    },
    updateBox: function() {
        var o = curBox();
        o.hide(), showBox("al_places.php", {
            act: "photos_box",
            add_more: "1",
            lat: cur.placeBoxOpts.lat,
            lng: cur.placeBoxOpts.lng,
            diff: cur.placeBoxOpts.diffZone,
            uid: cur.placeBoxOpts.uid
        })
    },
    showPlaceTT: function(o, e) {
        showTooltip(o, {
            black: 1,
            text: e,
            center: 1,
            shift: [0, 6, 6]
        })
    },
    showPhotoPlace: function(o, e, t) {
        var n = cur.placeBoxMap;
        n.setCenter([o, e], 16), animate(boxLayerWrap, {
            scrollTop: 0
        }, 200), t && cancelEvent(t)
    }
};
try {
    stManager.done("places.js")
} catch (e) {}