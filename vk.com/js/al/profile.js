var Profile = {
        toggleInfo: function(e) {
            var i = ge("profile_full");
            return toggle(i), toggleClass(e, "info_shown", isVisible(i)), !1
        },
        showGroups: function(e) {
            if (checkEvent(e) === !1) {
                var i = ge("profile_groups_link");
                return i.oldText = val(i), ajax.post("al_profile.php", {
                    act: "groups",
                    id: cur.oid
                }, {
                    onDone: function(e, o) {
                        if (o) {
                            val(i, e), i.onclick = Profile.hideGroups;
                            var t = ge("profile_all_groups");
                            val(t, o), show(t.parentNode)
                        } else hide(i)
                    },
                    showProgress: function() {
                        val(i, '<div class="progress" id="profile_groups_prg"></div>')
                    },
                    hideProgress: function() {
                        val(i, i.oldText)
                    },
                    cache: 1
                }), cancelEvent(e)
            }
        },
        hideGroups: function(e) {
            if (checkEvent(e) === !1) {
                var i = ge("profile_groups_link");
                return val(i, i.oldText), i.onclick = Profile.showGroups, hide(ge("profile_all_groups").parentNode), cancelEvent(e)
            }
        },
        photoRemove: function(e, i, o) {
            return cur.viewAsBox ? (cur.viewAsBox(), cancelEvent(o)) : (cur.hidingPh || (cur.hidingPh = {}), cur.hidingPh[i] ? cancelEvent(o) : (ajax.post("al_profile.php", {
                act: "remove_photo",
                photo_id: i,
                hash: cur.options.profph_hash
            }, {
                onDone: function(e, i) {
                    var o = ge("profile_photos_about") || ge("profile_photos_module").insertBefore(se('<div class="info_msg" id="profile_photos_about"><div class="msg_text"></div></div>'), ge("page_photos_module"));
                    val(domFC(o), e), each(geByClass("ui_thumb_x_button", ge("page_photos_module")), function() {
                        this.tt && this.tt.destroy && this.tt.destroy()
                    }), val("page_photos_module", i), i || hide("profile_photos_module")
                },
                showProgress: function() {
                    cur.hidingPh[i] = 1
                },
                hideProgress: function() {
                    cur.hidingPh[i] = 0
                }
            }), cancelEvent(o)))
        },
        photoReturn: function(e, i) {
            return cur.viewAsBox ? cur.viewAsBox() : void ajax.post("al_profile.php", {
                act: "return_photo",
                photo_id: i,
                hash: cur.options.profph_hash
            }, {
                onDone: function(e) {
                    each(geByClass("ui_thumb_x_button", ge("page_photos_module")), function() {
                        this.tt && this.tt.destroy && this.tt.destroy()
                    }), val("page_photos_module", e), re("profile_photos_about")
                },
                showProgress: addClass.pbind("profile_photos_about", "loading"),
                hideProgress: removeClass.pbind("profile_photos_about", "loading")
            })
        },
        editPhoto: function(e) {
            return cur.viewAsBox ? cur.viewAsBox() : void showBox("/al_profile.php", extend(e || {}, {
                act: "edit_photo"
            }), {
                params: {
                    bodyStyle: "padding: 16px 7px"
                },
                stat: ["tagger.js", "tagger.css"]
            })
        },
        deletePhoto: function() {
            return cur.viewAsBox ? cur.viewAsBox() : void showBox("al_profile.php", {
                act: "delete_photo_box"
            })
        },
        toggleFan: function(e, i, o, t) {
            return cur.viewAsBox ? cur.viewAsBox() : (void 0 != cur.toggleFanAct && (o = cur.toggleFanAct), ajax.post("al_fans.php", {
                act: o ? "be_fan" : "not_fan",
                mid: cur.oid,
                hash: i
            }, {
                onDone: function(i) {
                    e.firstChild.nextSibling.innerHTML = i, cur.toggleFanAct = !o
                },
                progress: e.firstChild
            }), void cancelEvent(t))
        },
        toggleFave: function(e, i, o, t) {
            return cur.viewAsBox ? cur.viewAsBox() : (void 0 != cur.toggleFaveAct && (o = cur.toggleFaveAct), ajax.post("fave.php", {
                act: o ? "addPerson" : "deletePerson",
                mid: cur.oid,
                hash: i
            }, {
                onDone: function(i) {
                    val(e, i), cur.toggleFaveAct = !o
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
            }), void cancelEvent(t))
        },
        toggleFriend: function(e, i, o, t, s) {
            if (cur.viewAsBox) return cur.viewAsBox();
            if (o) {
                if (s !== !0 && cur.options.bannedhim) return showBox("al_profile.php", {
                    act: "banned_him",
                    action: "friend",
                    mid: cur.oid
                }).onContinue = Profile.toggleFriend.pbind(e, i, o, !1, !0), cancelEvent(t);
                stManager.add(["tooltips.css", "tooltips.js"])
            }
            var n = ce("img", {
                    src: "/images/upload" + (window.devicePixelRatio >= 2 ? "_2x" : "") + ".gif"
                }, {
                    width: 32
                }),
                r = e;
            ajax.post("al_friends.php", {
                act: o ? "add" : "remove",
                mid: cur.oid,
                hash: i,
                from: "profile"
            }, {
                onDone: function(e, i, t, s, n) {
                    if (o && cur.onFriendAdd && cur.onFriendAdd(), !e) return nav.reload();
                    var r = (ge("profile_am_subscribed") || {}).tt;
                    r && r.hide && (r.hide({
                        fasthide: 1
                    }), r.destroy());
                    var a = ge("friend_status");
                    cleanElems(a.firstChild), e ? (show(a), val(a, e)) : hide(a), (i ? show : hide)("friend_remove"), n || cur.options.bannedhim ? nav.reload({
                        noscroll: !0
                    }) : t && (ajax.preload("al_friends.php", {
                        act: "friend_tt",
                        mid: cur.oid
                    }, [t, s]), setTimeout(Profile.friendTooltip, 0)), Profile.frDropdownClear()
                },
                showProgress: function() {
                    "BUTTON" == e.tagName ? lockButton(e) : hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownLock(e) : hasClass(domFC(e), "progress") ? show(domFC(e)) : r.replaceChild(n, r.firstChild)
                },
                hideProgress: function() {
                    "BUTTON" == e.tagName ? unlockButton(e) : hasClass(e, "page_actions_item") ? window.Page && Page.actionsDropdownUnlock(e) : hasClass(domFC(e), "progress") ? hide(domFC(e)) : r.replaceChild(r.firstChild, n)
                },
                onFail: function(e) {
                    return e ? (showFastBox({
                        title: getLang("global_error"),
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, e), !0) : void 0
                }
            }), cancelEvent(t)
        },
        friendTTHide: function(e) {
            var i = (ge("profile_am_subscribed") || {}).tt;
            if (e)
                for (var o = e.target; o; o = domPN(o))
                    if (o.tagName && hasClass(o, "preq_tt")) return;
            i && i.hide && i.hide({
                fasthide: 1
            }), removeEvent(document, "click", Profile.friendTTHide)
        },
        friendTooltip: function(e) {
            if (!cur.viewAsBox) {
                if (e) setTimeout(function() {
                    removeEvent(document, "click", Profile.friendTTHide), addEvent(document, "click", Profile.friendTTHide)
                }, 0);
                else {
                    var i = (ge("profile_am_subscribed") || {}).tt;
                    if (i && i.hide && isVisible(i.container)) return i.hide({
                        fasthide: 1
                    }), void removeClass("profile_am_subscribed", "profile_frdd_active");
                    addClass("profile_am_subscribed", "profile_frdd_active")
                }
                return showTooltip(ge("profile_am_subscribed"), {
                    url: "al_friends.php",
                    params: {
                        act: "friend_tt",
                        mid: cur.oid
                    },
                    cache: 1,
                    slide: 15,
                    hidedt: 1e3,
                    shift: [27, -1, e ? 3 : 1],
                    className: "preq_tt",
                    forcetodown: !0,
                    onHide: removeClass.pbind("profile_am_subscribed", "profile_frdd_active")
                })
            }
        },
        addRequestMessage: function(e, i) {
            return !showBox("al_friends.php", {
                act: "request_box",
                mid: cur.oid
            }, {
                params: {
                    bodyStyle: "padding: 0px",
                    width: 502,
                    hideButtons: 1
                }
            }, i)
        },
        frDropdownPreload: function(el, sh) {
            !cur.viewAsBox && cur.oid && ajax.post("al_friends.php", {
                act: "friend_dd",
                mid: cur.oid
            }, {
                onDone: function(html, js) {
                    sh && (ge("page_actions_wrap") || (html && domPN(el).appendChild(se(html)), eval(js)))
                },
                cache: 1
            })
        },
        frDropdownClear: function() {
            ajax.preload("al_friends.php", {
                act: "friend_dd",
                mid: cur.oid
            }, !1)
        },
        frListsDDShow: function(e) {
            var i = ge("page_actions_item_lists");
            if (addClass(i, "page_actions_item_unfolded"), ge("page_actions_sublist")) return clearTimeout(cur.frListsDDHide), void show("page_actions_sublist");
            cur.frListsCats || (cur.frListsCats = cur.options.curCats);
            for (var o, t = [], s = cur.frListsCats, n = [28, 29, 27, 25, 26], r = 0; 5 > r; ++r) o = n[r], cur.options.publicLists[o] && t.push('<a class="page_actions_item page_actions_subitem' + (s & 1 << parseInt(o) ? " checked" : "") + '" onclick="Profile.frListsCheck(this, ' + o + ');">' + cur.options.publicLists[o] + "</a>");
            for (var o in cur.options.userLists)
                if (25 > o) {
                    var a = cur.options.userLists[o];
                    a.length > 20 && (a = trim(a.substr(0, 18)) + "..."), t.push('<a class="page_actions_item page_actions_subitem' + (s & 1 << parseInt(o) ? " checked" : "") + '" onclick="Profile.frListsCheck(this, ' + o + ');">' + a + "</a>")
                }
            t = se('<div id="page_actions_sublist" onmouseover="Profile.frListsDDShow(event);">' + t.join("") + "</div>"), i.parentNode.appendChild(t)
        },
        frListsDDHide: function() {
            clearTimeout(cur.frListsDDHide), cur.frListsDDHide = setTimeout(function() {
                hide("page_actions_sublist"), removeClass("page_actions_item_lists", "page_actions_item_unfolded")
            }, 150)
        },
        frListsCheck: function(e, i) {
            var o = hasClass(e, "checked"),
                t = parseInt(cur.frListsCats);
            o ? t & 1 << i && (t -= 1 << i) : t & 1 << i || (t += 1 << i), cur.frListsCats = t, (o ? removeClass : addClass)(e, "checked"), cur.frListsTO && clearTimeout(cur.frListsTO), cur.frListsTO = setTimeout(function() {
                ajax.post("al_friends.php", {
                    act: "save_cats",
                    uid: cur.oid,
                    cats: t,
                    hash: cur.options.catsHash
                })
            })
        },
        submitReqText: function() {
            var e = trim(val("preq_input"));
            if (!e) return elfocus("preq_input");
            var i = cur.mfid ? cur.mfid : cur.oid;
            ajax.post("al_friends.php", {
                act: "request_text",
                mid: i,
                message: e,
                hash: cur.reqHash
            }, {
                onDone: function(e) {
                    if (curBox() && curBox().hide(), e) {
                        var i = ge("preq_text");
                        val(i, e), show(i.parentNode), hide(ge("preq_input").parentNode)
                    }
                },
                showProgress: lockButton.pbind("preq_submit"),
                hideProgress: unlockButton.pbind("preq_submit")
            })
        },
        reqTextChanged: function(e) {
            onCtrlEnter(e, Profile.submitReqText);
            var i = ge("preq_input"),
                o = trim(val(i)).replace(/\n\n\n+/g, "\n\n");
            if (i.lastLen !== o.length) {
                i.lastLen = o.length;
                var t = function(e, i, o) {
                        for (var t = {
                                "&": 5,
                                "<": 4,
                                ">": 4,
                                '"': 6,
                                "\n": 4,
                                "\r": 0,
                                "!": 5,
                                "'": 5
                            }, s = 0, n = 0, r = !1, a = 0, c = e.length; c > a; a++) {
                            var d = t[e.charAt(a)],
                                l = e.charCodeAt(a);
                            10 == l && ++n, s += void 0 !== d ? d : l > 128 && 192 > l || l > 1280 ? ("&#" + l + ";").length : 1, r === !1 && (i && s > i || o && n > o) && (r = a ? e.substr(0, a) : "")
                        }
                        return [s, n, r === !1 ? e : r]
                    },
                    s = 240,
                    n = 4,
                    r = t(o, s, n),
                    a = r[0],
                    c = r[1],
                    d = ge("preq_warn");
                r[2] !== o && (a > s ? a = s : c > 4 && (c = 4), val(i, r[2]), i.lastLen = trim(r[2]).length), a > s - 40 || c > n ? (a > s ? d.innerHTML = getLang("friends_exceeds_symbol_limit", a - s) : c > 4 ? d.innerHTML = getLang("friends_exceeds_lines_limit", c - 4) : d.innerHTML = getLang("text_N_symbols_remain", s - a), show(d)) : hide(d)
            }
        },
        toggleBlacklist: function(e, i, o) {
            return cur.viewAsBox ? cur.viewAsBox() : (ajax.post("al_settings.php", {
                act: cur.options.bannedhim ? "a_del_from_bl" : "a_add_to_bl",
                id: cur.oid,
                hash: i,
                from: "profile"
            }, {
                onDone: function(i) {
                    val(e, i), cur.options.bannedhim = !cur.options.bannedhim
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
            }), void cancelEvent(o))
        },
        toggleFeedIgnored: function(e, i, o) {
            return cur.viewAsBox ? cur.viewAsBox() : (ajax.post("al_feed.php", {
                act: cur.options.ignoredhim ? "a_unignore_owner" : "a_ignore_owner",
                owner_id: cur.oid,
                hash: i,
                from: "profile"
            }, {
                onDone: function(i) {
                    val(e, i), cur.options.ignoredhim = !cur.options.ignoredhim
                },
                showProgress: window.Page && Page.actionsDropdownLock.pbind(e),
                hideProgress: window.Page && Page.actionsDropdownUnlock.pbind(e)
            }), void cancelEvent(o))
        },
        showGiftBox: function(e, i) {
            return cur.gftbxWasScroll = boxLayerWrap.scrollTop, boxLayerWrap.scrollTop = 0, cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
                act: "get_gift_box",
                mid: e,
                fr: e == vk.id ? 1 : 0
            }, {
                stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                cache: 1
            }, i)
        },
        showHideGiftsBox: function(e) {
            if (cur.viewAsBox) return cur.viewAsBox();
            var i = getLang("profile_sure_hide_gifts").replace("{link}", '<a href="/settings">').replace("{/link}", "</a>").replace("{link1}", '<a href="/settings?act=privacy">').replace("{/link1}", "</a>"),
                o = showFastBox({
                    title: getLang("global_warning"),
                    bodyStyle: "line-height: 160%;",
                    width: 350
                }, i, getLang("profile_gifts_hide_button"), function() {
                    ajax.post("al_profile.php", {
                        act: "hide_gifts",
                        hash: cur.options.gifts_hash
                    }, {
                        onDone: function() {
                            slideUp("profile_gifts", 200), o.hide()
                        },
                        progress: o.progress
                    })
                }, getLang("global_cancel"));
            return cancelEvent(e), !1
        },
        showNewGift: function(e, i) {
            var o = ge("profile_gifts");
            if (o && e) {
                var t = geByTag("img", geByClass1("module_body", o)),
                    s = vkImage();
                s.src = i || "/images/gift/" + e + "/" + (window.devicePixelRatio >= 2, "96") + ".png";
                var n = function() {
                    var e = t[0],
                        i = e.parentNode,
                        o = t.length;
                    e && (addClass(s, "profile_gift_img"), e.parentNode.insertBefore(s, e), i.scrollLeft = e.offsetLeft, animate(i, {
                        scrollLeft: 0
                    }, 200, function() {
                        o >= 3 && re(t[t.length - 1])
                    }))
                };
                s.width ? n() : addEvent(s, "load", n)
            }
        },
        declineFriend: function(e) {
            return cur.viewAsBox ? cur.viewAsBox() : void ajax.post("al_friends.php", {
                act: "remove",
                mid: cur.oid,
                hash: e
            }, {
                onDone: function(e) {
                    hide("friend_request_actions")
                }
            })
        },
        processRelation: function(e, i, o, t) {
            if (cur.viewAsBox) return cur.viewAsBox();
            var s = (getXY(e), getXY(e.parentNode), ge("relation_progress" + i));
            ajax.post("al_profile.php", {
                act: "process_relation",
                mid: i,
                accept: t ? 1 : "",
                full_shown: "",
                hash: o
            }, {
                onDone: function(e) {
                    val("relations_wrap", e)
                },
                showProgress: function() {
                    s.style.left = e.offsetLeft + Math.floor((e.offsetWidth - 32) / 2) + "px", show(s), e.style.visibility = "hidden"
                },
                hideProgress: function() {
                    e.style.visibility = "visible", hide(s)
                }
            })
        },
        fansBox: function(e, i, o) {
            return cur.viewAsBox ? cur.viewAsBox() : !showBox("al_fans.php", {
                act: "box",
                tab: o || "fans",
                oid: e
            }, {
                cache: 1,
                stat: ["page_help.css", "fansbox.js"]
            }, i)
        },
        giftsBox: function(e, i, o) {
            return cur.viewAsBox ? cur.viewAsBox() : !showBox("al_gifts.php", {
                act: "box",
                tab: o || "received",
                mid: e
            }, {
                cache: 1,
                stat: ["gifts.css", "gifts.js"]
            }, i)
        },
        idolsBox: function(e, i) {
            return Profile.fansBox(e, i, "idols")
        },
        showClassHint: function(e) {
            var i = ge("profile_class");
            if (i) {
                var o = cur.classhint = bodyNode.appendChild(ce("div", {
                        id: "profile_class_hint",
                        innerHTML: '<table cellspacing="0" cellpadding="0">  <tr>    <td rowspan="2"><div class="pointer"></div></td>    <td><div class="content">' + e + '</div></td>  </tr>  <tr><td><div class="bottom"></div></td></tr></table>'
                    }, {
                        display: "none"
                    })),
                    t = getXY(i),
                    s = getSize(i);
                o.style.opacity = 0, show(o);
                var n = getSize(o),
                    r = t[1] - Math.floor((n[1] - s[1]) / 2),
                    a = t[0] + (vk.rtl ? -(n[0] + 10) : s[0] + 10);
                o.style.left = a + (vk.rtl ? -10 : 10) + "px", o.style.top = r + "px";
                var c = animate.pbind(o, {
                        left: a,
                        opacity: 1
                    }, 500, !1),
                    d = vkImage();
                d.onload = c, d.src = "/images/classhint.gif", cur.destroy.push(function(e) {
                    e.classhint && e.classhint.parentNode && (e.classhint.parentNode.removeChild(e.classhint), e.classhint = !1)
                }), cur._back && cur._back.hide.push(function() {
                    cur.classhint && cur.classhint.parentNode && (cur.classhint.parentNode.removeChild(cur.classhint), cur.classhint = !1)
                })
            }
        },
        init: function(e) {
            extend(cur, {
                module: "profile",
                options: e,
                oid: e.user_id,
                postTo: e.user_id,
                editing: !1,
                viewAsWarn: e.view_as_warn,
                viewAsBox: e.view_as ? function() {
                    return setTimeout(showFastBox({
                        title: getLang("global_warning"),
                        bodyStyle: "padding: 20px; line-height: 160%;"
                    }, cur.options.view_as).hide, 2e3), !1
                } : !1,
                _back: e.view_as ? !1 : {
                    loc: e.loc,
                    show: [],
                    hide: [],
                    text: e.back
                }
            }), e.view_as && cur.nav.push(function(e, i, o, t) {
                return cur._leave ? void(cur._leave = !1) : (showFastBox({
                    title: getLang("global_warning"),
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, cur.viewAsWarn, getLang("global_continue"), function() {
                    cur._leave = !0, nav.go(o)
                }, getLang("global_cancel")), !1)
            }), e.mail_cache && ajax.preload("al_mail.php", {
                act: "write_box",
                to: cur.oid
            }, e.mail_cache), ge("profile_wall") && wall.init(extend(e, {
                automore: 1
            })), e.class_hint && (cur.clHintTimer = setTimeout(Profile.showClassHint.pbind(e.class_hint), 1e3)), e.invite_hint && (cur.invHintTimer = setTimeout(function() {
                var i = ge("top_invite_hint");
                showTooltip(i, {
                    text: e.invite_hint,
                    slide: 30,
                    shift: [vk.rtl ? -220 : 0, 0, 0],
                    showdt: 0,
                    showsp: 500,
                    forcetodown: !0,
                    className: "invite_tt"
                }), cur.tsUpdated = Profile.inviteHintUpdate, stManager.add(["tooltips.css", "tooltips.js"], cur.tsUpdated)
            }, 1e3)), (cur._back ? cur._back.hide : cur.destroy).push(function(e) {
                clearTimeout((e || cur).clHintTimer), clearTimeout((e || cur).invHintTimer), Profile.friendTTHide(!0)
            }), nav.objLoc.suggest && (delete nav.objLoc.suggest, Profile.suggestFriends()), setTimeout(function() {
                window.FastChat && (window.curFastChat && curFastChat.inited || window.curNotifier && void 0 !== curNotifier.fc) && show("profile_fast_chat")
            }, 100);
            var i = window.audioPlayer,
                o = currentAudioId();
            i && o && i.showCurrentTrack && i.showCurrentTrack(), cur.onPeerStatusChanged = function(e, i, o) {
                if (e == cur.oid) {
                    var t = ge("profile_online_lv"),
                        s = ge("profile_time_lv");
                    "online" == i ? (o = intval(o), setStyle("profile_mobile_online", {
                        display: o && 1 != o ? "inline" : "none"
                    }), isVisible(t) || (hide(s), show(t))) : "offline" == i && (hide(t), show(s))
                }
            }
        },
        inviteHintUpdate: function() {
            var e = ge("top_invite_hint");
            if (e && e.tt && e.tt.container) {
                var i = isVisible("ts_wrap") ? ge("ts_settings") : ge("top_invite_link"),
                    o = 0,
                    t = 0;
                vk.rtl ? t = 413 - i.parentNode.parentNode.offsetLeft - i.offsetWidth / 2 + "px" : o = i.parentNode.parentNode.offsetLeft + i.offsetWidth / 2 - 370 + "px", geByClass1("top_pointer", e.tt.container).style.margin = "0px " + t + " 0px " + o
            }
        },
        appStatusUpdate: function(e) {
            if (cur.ciApp) {
                var i = isChecked("currinfo_app");
                ajax.post("al_apps.php", {
                    act: "toggle_currinfo",
                    hash: e,
                    exp: i,
                    id: cur.ciApp
                }, {
                    onDone: function(e) {
                        vk.id == cur.oid && e && val("current_info", e)
                    }
                })
            }
        },
        suggestFriends: function() {
            if (cur.viewAsBox) return cur.viewAsBox();
            var e = showBox("al_friends.php", {
                act: "select_friends_box",
                from: "suggest_friends",
                friend_id: cur.oid
            }, {
                stat: ["privacy.js", "privacy.css", "indexer.js"]
            });
            e.leaveOnSave = !0, cur.onFlistSave = function(i, o, t) {
                ajax.post("al_friends.php", {
                    act: "a_suggest_friends",
                    mid: cur.oid,
                    ids: i.join(","),
                    hash: t
                }, {
                    onDone: function(i) {
                        e.hide(), showDoneBox(i)
                    },
                    showProgress: e.showProgress,
                    hideProgress: e.hideProgress
                })
            }
        },
        uploadPhotos: function(e, i) {
            var o = (window.XMLHttpRequest || window.XDomainRequest) && (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary || window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
            if (!o || !i) return nav.go(e, i);
            if (checkEvent(i)) return !0;
            cur.onPhotoInputChange = function(o) {
                return window.filesToUpload = o, nav.go(e, i)
            };
            var t = ge("page_upload_photos_input");
            return t || (t = se('<input id="page_upload_photos_input" class="file page_upload_photos_input" type="file" onchange="cur.onPhotoInputChange(this.files);" multiple="true" accept="image/jpeg,image/png,image/gif" name="photo" />')), t.click(i), !1
        },
        hideFillBlock: function(e, i, o, t) {
            e.tt && e.tt.hide && e.tt.hide();
            var s = gpeByClass("page_block", e);
            return s && slideUp(s, 200, re.pbind(s)), ajax.post("/al_profile.php", {
                act: "hide_rate_block",
                type: o,
                hash: t
            }), cancelEvent(i), !1
        },
        showProfileBox: function(e, i) {
            return showBox("al_places.php", {
                act: "photos_box",
                uid: e
            }, {
                stat: ["maps.js", "places.js", "places.css", "ui_controls.js", "ui_controls.css"]
            }), cancelEvent(i), !1
        }
    },
    profile = Profile;
try {
    stManager.done("profile.js")
} catch (e) {}