var GroupsList = {
    showCreateBox: function() {
        return !showBox("/al_groups.php", {
            act: "create_box"
        })
    },
    createGroup: function(s, r) {
        var e = ge("group_create_title");
        return trim(val(e)) ? void ajax.post("al_groups.php", {
            act: "create",
            title: trim(val(e)),
            cls: radioval("club_type"),
            hash: s
        }, {
            onDone: function(s) {
                "title" == s && notaBene(ge("group_create_title"))
            },
            onFail: function(s) {
                return s ? (setTimeout(showFastBox({
                    title: getLang("global_error"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, s).hide, 3e3), !0) : void 0
            },
            showProgress: lockButton.pbind(r),
            hideProgress: unlockButton.pbind(r)
        }) : notaBene(e)
    },
    rand: function() {
        return Math.floor(1e4 * Math.random())
    },
    toggleFave: function(s, r, e, o) {
        var t = parseInt(s.getAttribute("data-value")) ? 1 : 0;
        ajax.post("fave.php", {
            act: t ? "a_delete_group" : "a_add_group",
            gid: r,
            hash: e
        }, {
            onDone: function(e) {
                val(s, e), s.setAttribute("data-value", 1 - t), GroupsList.updateGroupField(r, 12, 1 - t)
            },
            showProgress: lockActionsMenuItem.pbind(s),
            hideProgress: unlockActionsMenuItem.pbind(s)
        }), cancelEvent(o)
    },
    toggleSubscription: function(s, r, e, o) {
        var t = parseInt(s.getAttribute("data-value")) ? 1 : 0;
        ajax.post("al_wall.php", {
            act: "a_toggle_posts_subscription",
            subscribe: t ? 0 : 1,
            oid: -r,
            hash: e
        }, {
            onDone: function(e) {
                val(s, e), s.setAttribute("data-value", 1 - t), GroupsList.updateGroupField(r, 13, 1 - t)
            },
            showProgress: lockActionsMenuItem.pbind(s),
            hideProgress: unlockActionsMenuItem.pbind(s)
        }), cancelEvent(o)
    },
    subscribe: function(s, r, e, o) {
        var t = hasClass(s, "flat_button");
        if (!(t && buttonLocked(s) || actionsMenuItemLocked(s))) {
            var i = t ? hasClass(s, "secondary") : !cur.scrollList.deleted[r],
                c = function(o) {
                    ajax.post("al_groups.php", {
                        act: i ? "list_leave" : "list_enter",
                        gid: r,
                        hash: e,
                        confirm: o
                    }, {
                        showProgress: (t ? lockButton : lockActionsMenuItem).pbind(s),
                        hideProgress: (t ? unlockButton : unlockActionsMenuItem).pbind(s),
                        onDone: function(e, o, l) {
                            if (o) {
                                var n = showFastBox(getLang("global_warning"), o, getLang("group_leave_group"), function() {
                                    n.hide(), c(1)
                                }, getLang("global_cancel"));
                                return !0
                            }
                            if (val(s, e), cur.scrollList.deleted[r] = i, t) toggleClass(s, "secondary", !i);
                            else {
                                var a = domClosest("_gl_row", s);
                                toggleClass(a, "deleted", i), l && addClass(a, "closed")
                            }
                        },
                        onFail: function(s) {
                            setTimeout(showFastBox(getLang("global_error"), s).hide, 3e3)
                        }
                    })
                };
            c()
        }
    },
    updateGroupField: function(s, r, e) {
        cur.scrollList && cur.scrollList.lists && each(cur.scrollList.lists, function() {
            if (this && this.length)
                for (var o = 0, t = this.length; t > o; ++o)
                    if (this[o][2] == s) {
                        this[o][r] = e;
                        break
                    }
        })
    },
    enter: function(s, r, e, o, t) {
        if (cur.invSwitching) return setTimeout(GroupsList.enter.pbind(s, r, e, o, t), 100), !1;
        var i, c, l = cur.scrollList.tab;
        "button" != s.tagName.toLowerCase() ? (s.backhtml || (s.backhtml = s.innerHTML), i = function() {
            var r = getSize(s)[0];
            s.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(s), {
                width: r
            })
        }, c = function() {
            s.innerHTML = s.backhtml
        }) : (i = lockButton.pbind(s), c = unlockButton.pbind(s));
        var n = GroupsList.rand(),
            a = GroupsList.rand();
        cur.scrollList[n] = a, cur.invSwitching = !0, ajax.post("/al_groups.php", {
            act: "enter",
            gid: r,
            hash: e,
            context: "2" + (o ? "_" + o : "")
        }, {
            onDone: function(s, e) {
                if (cur.invSwitching = !1, cur.scrollList && cur.scrollList[n] == a) {
                    var i = cur.scrollList.lists[l],
                        c = t ? 5 : 1;
                    if ("unsure" == o ? c = t ? 5 : 3 : "decline" == o ? c = t ? -3 : -1 : "undecided" == o && (c = 4), i && "loading" != i && "update" != i)
                        for (var u = 0, p = i.length; p > u; ++u) i[u][2] == r && (i[u][1] = c);
                    else cur.scrollList.processed[l][r] = c;
                    if (s && cur.scrollList.lists.groups) {
                        var h = cur.scrollList.lists.groups;
                        if ("join" != o && "unsure" != o && o) {
                            if ("undecided" == o)
                                for (var u in h) h[u][2] == s[2] && (h.splice(u, 1), cur.scrollList.counts.groups--)
                        } else h.unshift(s), cur.scrollList.counts.groups++;
                        GroupsList.updateIndexer(h), GroupsList.showMore(!0)
                    }
                    TopNotifier && !TopNotifier.shown() && TopNotifier.invalidate();
                    var d = ge("gl_inv" + r),
                        g = d && geByClass1("group_row_status", d);
                    d && (g.basehtml = g.innerHTML, g.innerHTML = e)
                }
            },
            onFail: function(s) {
                return s ? (setTimeout(showFastBox(getLang("global_error"), s).hide, 3e3), !0) : void 0
            },
            showProgress: i,
            hideProgress: c
        })
    },
    leave: function(s, r, e, o) {
        if (cur.invSwitching) return setTimeout(GroupsList.leave.pbind(s, r, e, o), 100), !1;
        if (!s.firstChild || "progress_inline" != s.firstChild.className) {
            var t, i, c = GroupsList.rand(),
                l = GroupsList.rand(),
                n = cur.scrollList.tab;
            cur.scrollList[c] = l, "button" != s.tagName.toLowerCase() ? (s.backhtml || (s.backhtml = s.innerHTML), t = function() {
                var r = getSize(s)[0];
                s.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(s), {
                    width: r
                })
            }, i = function() {
                s.innerHTML = s.backhtml
            }) : (t = lockButton.pbind(s), i = unlockButton.pbind(s)), cur.invSwitching = !0, ajax.post("/al_groups.php", {
                act: "leave",
                gid: r,
                hash: e,
                context: 2
            }, {
                onDone: function(s, e) {
                    if (cur.invSwitching = !1, cur.scrollList && cur.scrollList[c] == l) {
                        var o = cur.scrollList.lists[n];
                        if (o && "loading" != o && "update" != o)
                            for (var t = 0, i = o.length; i > t; ++t) o[t][2] == r && (o[t][1] = -1);
                        else cur.scrollList.processed[n][r] = -1;
                        TopNotifier && !TopNotifier.shown() && TopNotifier.invalidate();
                        var a = ge("gl_inv" + r),
                            u = a && geByClass1("group_row_status", a);
                        a && (u.basehtml = u.innerHTML, u.innerHTML = e)
                    }
                },
                showProgress: t,
                hideProgress: i
            })
        }
    },
    spam: function(s, r, e) {
        if (!domFC(s) || "progress_inline" != domFC(s)) {
            var o = GroupsList.rand(),
                t = GroupsList.rand(),
                i = cur.scrollList.tab;
            cur.scrollList[o] = t, ajax.post("/al_groups.php", {
                act: "spam",
                gid: r,
                hash: e,
                context: 1
            }, {
                onDone: function(s) {
                    if (cur.scrollList && cur.scrollList[o] == t) {
                        var e = cur.scrollList.lists[i];
                        if (e && "loading" != e && "update" != e)
                            for (var c = 0, l = e.length; l > c; ++c) e[c][2] == r && (e[c][1] = -2);
                        else cur.scrollList.processed[i][r] = -2;
                        var n = ge("gl_inv" + r),
                            a = n && geByClass1("group_row_status", n);
                        n && (a.innerHTML = s)
                    }
                },
                showProgress: function() {
                    s.oldhtml = s.innerHTML;
                    var r = getSize(s)[0];
                    s.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(s), {
                        width: r
                    })
                },
                hideProgress: function() {
                    s.innerHTML = s.oldhtml
                }
            })
        }
    },
    cancel: function(s, r, e) {
        if (!domFC(s) || "progress_inline" != domFC(s).className) {
            var o = GroupsList.rand(),
                t = GroupsList.rand(),
                i = cur.scrollList.tab;
            cur.scrollList[o] = t, ajax.post("/al_groups.php", {
                act: "cancel",
                gid: r,
                hash: e,
                context: 1
            }, {
                onDone: function() {
                    if (cur.scrollList && cur.scrollList[o] == t) {
                        var s = cur.scrollList.lists[i];
                        if (s && "loading" != s && "update" != s) {
                            for (var e in s) s[e][2] == r && (s.splice(e, 1), cur.scrollList.counts.groups--);
                            GroupsList.updateIndexer(s), GroupsList.showMore(!0)
                        } else cur.scrollList.processed[i][r] = 0;
                        var c = ge("gl_inv" + r),
                            l = c && geByClass1("group_row_status", c);
                        c && l && l.basehtml && (l.innerHTML = l.basehtml)
                    }
                },
                showProgress: function() {
                    s.oldhtml = s.innerHTML;
                    var r = getSize(s)[0];
                    s.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(s), {
                        width: r
                    })
                },
                hideProgress: function() {
                    s.innerHTML = s.oldhtml
                }
            })
        }
    },
    updateIndexer: function(s) {
        cur.scrollList.cache.groups = {
            all: []
        };
        var r = cur.scrollList.cache.groups;
        for (var e in s) r.all.push(e);
        cur.scrollList.index.groups = new vkIndexer(r.all, function(r) {
            return s[r][0]
        })
    },
    rejectAll: function(s, r) {
        showFastBox(getLang("global_warning"), getLang("groups_sure_reject_all"), getLang("groups_reject_all_inv"), function(s) {
            ajax.post("/al_groups.php", {
                act: "reject_all",
                hash: r
            }, {
                showProgress: lockButton.pbind(s),
                hideProgress: unlockButton.pbind(s)
            })
        }, getLang("global_cancel"))
    },
    scrollCheck: function() {
        if (!browser.mobile && cur.scrollList) {
            var s = ge("ui_" + cur.scrollList.tab + "_load_more"),
                r = ge("ui_search_load_more");
            if (isVisible(s) || (s = r, isVisible(s))) {
                var e = document.documentElement,
                    o = window.innerHeight || e.clientHeight || bodyNode.clientHeight,
                    t = scrollGetY();
                (t + o > s.offsetTop || cur.searchOffset && t + 2 * o > s.offsetTop) && GroupsList.showMore()
            }
        }
    },
    initScroll: function() {
        GroupsList.destroyScroll(), addEvent(window, "scroll", GroupsList.scrollCheck), addEvent(window, "resize", GroupsList.scrollCheck)
    },
    destroyScroll: function() {
        removeEvent(window, "scroll", GroupsList.scrollCheck), removeEvent(window, "resize", GroupsList.scrollCheck)
    },
    locNav: function(s, r, e) {
        var o = s.tab,
            t = o || ("events" == e.act ? "future" : "groups");
        return delete s.tab, isEmpty(s) && void 0 !== o ? (hide("groups_list_tab_" + cur.scrollList.tab), GroupsList.updateSummary(cur.scrollList.counts[cur.scrollList.tab]), cur.scrollList.tab = t, cur.scrollList.summary = geByClass1("ui_tab_count", ge("groups_" + t + "_tab")), show("groups_list_tab_" + t), checkPageBlocks(), nav.setLoc(e), window.uiSearch && uiSearch.reset(cur.scrollList.query, !0), elfocus(cur.scrollList.query), GroupsList.updateSummary(cur.scrollList.counts[t]), cur.scrollList.offset = ge("groups_list_" + t).childNodes.length, GroupsList.showMore(!0), window.uiTabs && uiTabs.hideProgress(ge("groups_" + t + "_tab")), !1) : void 0
    },
    init: function(s) {
        extend(cur, {
            module: "groups_list",
            _back: {
                text: getLang("groups_back_to_list"),
                show: [GroupsList.initScroll, elfocus.pbind("groups_list_search")],
                hide: [GroupsList.destroyScroll]
            },
            scrollList: {
                tab: s.tab,
                url: "al_groups.php",
                params: {
                    act: "get_list",
                    mid: s.mid
                },
                prefix: "groups_list_",
                query: ge("groups_list_search"),
                queryCont: gpeByClass("_wrap", ge("groups_list_search")),
                queryWrap: ge("group_u_search_input_wrap"),
                summary: geByClass1("ui_tab_count", ge("groups_" + (s.tab || "groups") + "_tab")),
                searchSummary: ge("groups_search_summary"),
                invites: ge("groups_invites_wrap"),
                invitesPreload: ge("groups_invites_preload"),
                invitesMoreLnk: ge("ui_invites_load_more"),
                searchWrap: ge("groups_list_search_wrap"),
                searchCont: ge("groups_list_search_cont"),
                eventsPopular: ge("events_popular_list"),
                perpage: 20,
                offset: ge("groups_list_" + s.tab).childNodes.length,
                lists: {},
                cache: {},
                index: {},
                deleted: {},
                processed: {
                    groups: {},
                    admin: {},
                    inv: {},
                    future: {},
                    past: {},
                    events_concerts: {}
                },
                filtered: {},
                queries: {},
                counts: s.counts,
                genEmpty: s.genEmpty,
                genRow: s.genRow,
                genSummary: s.genSummary,
                genGroupsSummary: s.genGroupsSummary,
                invShown: s.invShown
            },
            filter: s.filter
        }), setTimeout(elfocus.pbind(cur.scrollList.query), 0), cur.nav.push(GroupsList.locNav), setTimeout(GroupsList.load, 0), vk.version ? addEvent(window, "load", GroupsList.initScroll) : GroupsList.initScroll(), cur.destroy.push(function(s) {
            s == cur && GroupsList.destroyScroll()
        })
    },
    updateSummary: function(s, r) {
        val(r ? cur.scrollList.searchSummary : cur.scrollList.summary, s ? langNumeric(s, "%s", !0) : "")
    },
    load: function(s, r) {
        var e = r || cur.scrollList.tab;
        if (!cur.scrollList.lists[e]) {
            var o = GroupsList.rand(),
                t = GroupsList.rand();
            cur.scrollList[o] = t, cur.scrollList.lists[e] = "loading", ajax.post(cur.scrollList.url, extend(cur.scrollList.params, {
                tab: e
            }), {
                onDone: function(r) {
                    if (cur.scrollList && cur.scrollList[o] == t) {
                        var i = "update" == cur.scrollList.lists[e];
                        if (i || "loading" == cur.scrollList.lists[e]) {
                            cur.scrollList.cache[e] = {
                                all: []
                            };
                            for (var c = cur.scrollList.processed[e], l = 0, n = r.length; n > l; ++l) res = c[r[l][2]], res && (r[l][1] = res), cur.scrollList.cache[e].all.push(l);
                            cur.scrollList.lists[e] = r;
                            var a = i ? function() {
                                cur.scrollList && cur.scrollList[o] == t && cur.scrollList.tab == e && GroupsList.showMore(s)
                            } : function() {};
                            cur.scrollList.index[e] = new vkIndexer(cur.scrollList.cache[e].all, function(s) {
                                return cur.scrollList.lists[e][s][0]
                            }, a)
                        }
                    }
                },
                local: 1
            })
        }
    },
    getHighlight: function(s) {
        var r = cur.scrollList.index[cur.scrollList.tab],
            e = r.delimiter,
            o = r.trimmer;
        return s += " " + (parseLatin(s) || ""), s = escapeRE(s).replace(/&/g, "&amp;"), s = s.replace(o, "").replace(e, "|").replace(/(^\||\|$)/g, ""), {
            re: new RegExp("(" + s + ")", "gi"),
            val: '<span class="highlight">$1</span>'
        }
    },
    onSearchChange: function(s, r) {
        delete cur.exactSearch, GroupsList.showMore(!1)
    },
    onSearchEnter: function(s, r) {
        cur.exactSearch = 1, GroupsList.showMore(!0)
    },
    showMore: function(s) {
        var r = cur.scrollList.tab,
            e = cur.scrollList.lists[r];
        if (!e || "loading" == e || "update" == e) return e || GroupsList.load(s), void(cur.scrollList.lists[r] = "update");
        var r = cur.scrollList.tab,
            e = cur.scrollList.cache[r].all,
            o = trim(cur.scrollList.query.value);
        cur.searchStr = o, void 0 === cur.scrollList.queries[r] && (cur.scrollList.queries[r] = "");
        var t = s || o != cur.scrollList.queries[r];
        if (t || s !== !1) {
            cur.scrollList.queries[r] = o;
            var i = !1;
            if (o) {
                if (e = cur.scrollList.cache[r]["_" + o], void 0 === e) {
                    var c = cur.scrollList.index[r].search(o),
                        l = {};
                    e = [];
                    for (var n = 0, a = c.length; a > n; ++n) l[c[n]] || (l[c[n]] = !0, e.push(c[n]));
                    e.sort(function(s, r) {
                        return s - r
                    }), cur.scrollList.cache[r]["_" + o] = e
                }
                i = GroupsList.getHighlight(o)
            }
            var u = e.length,
                p = ge(cur.scrollList.prefix + r),
                h = ge("ui_" + r + "_load_more");
            if (GroupsList.updateSummary(u), !u) return p.innerHTML = cur.scrollList.genEmpty(o), void(o && GroupsList.needSearch(r) ? t ? (GroupsList.serverSearch(p, o), hide(h)) : cur.searchOffset && GroupsList.serverSearchMore(p, o) : (hide(h), hide(cur.scrollList.searchWrap), show(cur.scrollList.eventsPopular), cur.searchOffset = 0));
            for (var d = t ? 0 : cur.scrollList.offset, g = Math.min(u, d + cur.scrollList.perpage), L = [], n = d; g > n; ++n) {
                var f = cur.scrollList.lists[r][e[n]];
                if (f) {
                    var _ = f[0];
                    i && (_ = _.replace(i.re, i.val)), L.push(cur.scrollList.genRow(f, _))
                }
            }
            if (o || d && !t || (hide(cur.scrollList.searchWrap), show(cur.scrollList.eventsPopular), cur.searchOffset = 0), t)
                if (hasClass(cur.scrollList.queryCont, "ui_search_fixed") && scrollToY(getXY(cur.scrollList.queryWrap)[1] + 1, 0), p.innerHTML = L.join(""), checkPageBlocks(), cur.searchOffset = !1, e.length < 5 && o && GroupsList.needSearch(r)) {
                    var v = [];
                    for (var n in e) {
                        var m = cur.scrollList.lists[r][e[n]];
                        v.push(m[2])
                    }
                    GroupsList.serverSearch(p, o, v)
                } else hide(cur.scrollList.searchWrap), show(cur.scrollList.eventsPopular), cur.searchOffset = 0;
            else p.innerHTML += L.join(""), cur.searchOffset && GroupsList.serverSearchMore(p, o);
            cur.scrollList.offset = g, cur.searchOffset || (u > g ? show : hide)(h)
        }
    },
    showMoreInvites: function(s) {
        if (!cur.loadingInvites) {
            for (var r = cur.scrollList.invites && geByClass1("groups_list", cur.scrollList.invites), e = cur.scrollList.invitesPreload, o = cur.scrollList.invitesMoreLnk; domFC(e);) r.appendChild(domFC(e)), cur.scrollList.invShown++;
            toggle(o, cur.scrollList.counts.invite > cur.scrollList.invShown), isVisible(o) && ajax.post("/al_groups.php", {
                act: "more_invites",
                offset: cur.scrollList.invShown
            }, {
                onDone: function(s, r) {
                    e.innerHTML = s, r && (cur.scrollList.counts.invite -= r)
                },
                showProgress: function() {
                    cur.loadingInvites = !0
                },
                hideProgress: function() {
                    cur.loadingInvites = !1
                }
            })
        }
    },
    serverSearchMore: function(s, r) {
        if (!cur.searchLoadingMore) {
            cur.searchLoadingMore = 1;
            var e = ge("ui_search_load_more");
            e.innerHTML;
            ajax.post("/al_groups.php", {
                act: "server_search",
                q: r,
                offset: cur.searchOffset,
                exact: cur.exactSearch,
                exclude: cur.searchExclude.join(",")
            }, {
                onDone: function(s, r, e) {
                    cur.searchLoadingMore = 0, s ? (cur.searchOffset = e, cur.scrollList.searchCont.appendChild(cf(r))) : cur.searchOffset = 0, (!r || e >= s ? hide : show)("ui_search_load_more")
                },
                onFail: function() {
                    cur.searchLoadingMore = 0
                },
                showProgress: lockButton.pbind(e),
                hideProgress: unlockButton.pbind(e)
            })
        }
    },
    extendedSearch: function(s) {
        clearTimeout(cur.searchTimeout), cur.searchTimeout = setTimeout(function() {
            var r = geByClass1("groups_section_search");
            window.searcher && r ? hasClass(r, "ui_rmenu_item_sel") ? searcher.onEnter() : (uiRightMenu.switchMenu(r), uiRightMenu.showProgress(r), nav.go(r.href + "&c[like_hints]=1&c[q]=" + s)) : nav.go("/groups?act=catalog&c[q]=" + s)
        }, 500)
    },
    onExtendedSearchChange: function(s, r) {
        val("c[like_hints]", 1), GroupsList.extendedSearch(s)
    },
    onExtendedSearchEnter: function(s, r, e) {
        val("c[like_hints]", ""), GroupsList.extendedSearch(r)
    },
    needSearch: function(s) {
        return "groups" == s || "future" == s || "past" == s
    },
    serverSearch: function(s, r, e) {
        return GroupsList.needSearch(cur.scrollList.tab) ? (clearTimeout(cur.searchTimeout), void(cur.searchTimeout = setTimeout(function() {
            cur.searchStr == r && (cur.searchExclude = e || [], ajax.post("/al_groups.php", {
                act: "server_search",
                q: r,
                exact: cur.exactSearch,
                exclude: cur.searchExclude.join(",")
            }, {
                onDone: function(s, e, o) {
                    cur.searchStr == r && (s ? (cur.scrollList.searchCont.innerHTML = e, show(cur.scrollList.searchWrap), hide(cur.scrollList.eventsPopular), (s > o || !e) && show("ui_search_load_more")) : (cur.scrollList.searchCont.innerHTML = "", hide(cur.scrollList.searchWrap), show(cur.scrollList.eventsPopular)), checkPageBlocks(), GroupsList.updateSummary(s, !0), cur.searchOffset = o)
                },
                showProgress: uiSearch.showProgress.pbind(cur.scrollList.query),
                hideProgress: uiSearch.hideProgress.pbind(cur.scrollList.query)
            }))
        }, 300))) : !1
    },
    showMapBox: function(s, r, e) {
        window.showZeroZoneBox && showZeroZoneBox("places", function() {
            GroupsList.showMapBox(s, r, e)
        }) || showTabbedBox("/al_places.php", {
            act: "show_photo_place",
            place_id: s
        }, {
            stat: ["places.css", "map.css", "maps.js", "ui_controls.css", "ui_controls.js"]
        })
    },
    feedbanGroup: function(s, r, e) {
        var o = -r;
        ajax.post("/al_fans.php", {
            act: "feedtgl",
            oid: o,
            hash: e
        }, {
            onDone: function(e, o) {
                s.innerHTML = o, GroupsList.updateGroupField(r, 9, e)
            },
            showProgress: function() {
                s.innerHTML = '<span class="progress_inline"></span>'
            }
        })
    }
};
try {
    stManager.done("groups_list.js")
} catch (e) {}