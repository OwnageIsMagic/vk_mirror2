FAQ = {
    getSectionExtend: function() {
        if (nav.objLoc.hasOwnProperty("section")) return {
            section: nav.objLoc.section
        };
        var e = ge("current_section");
        return e ? {
            section: val(e)
        } : {}
    },
    showError: function(e) {
        var t = ge("faq_error");
        if (!t) {
            var i;
            switch (cur.page) {
                case "all":
                    i = ge("faq_list");
                    break;
                case "new":
                case "edit":
                    i = ge("faq_msg_p"), show("faq_msg_p")
            }
            t = i.insertBefore(ce("div", {
                id: "faq_error",
                className: "error"
            }), i.firstChild)
        }
        return re("faq_msg"), hide("faq_progress"), t.innerHTML = e, t.style.backgroundColor = "#FACEBB", animate(t, {
            backgroundColor: "#FFEFE8"
        }, 2e3), scrollToTop(200), !0
    },
    checkTextLength: function(e, t, i) {
        var o = trim(e.value).replace(/\n\n\n+/g, "\n\n");
        if (e.lastLen !== o.length) {
            var a = e.lastLen = o.length,
                r = a - o.replace(/\n/g, "").length;
            i = ge(i), a > t - 100 || r > 10 ? (show(i), a > t ? i.innerHTML = getLang("global_recommended_exceeded", a - t) : r > 10 ? i.innerHTML = getLang("global_recommended_lines", r - 10) : i.innerHTML = getLang("text_N_symbols_remain", t - a)) : hide(i)
        }
    },
    appendExtraField: function(e) {
        var t = ge("faq_optional_extra_fields_list"),
            i = ge("faq_optional_extra_field_example");
        if (t) {
            for (var o = i.cloneNode(!0), a = 0; ge("faq_optional_extra_field_" + a);) a++;
            o.id = "faq_optional_extra_field_" + a, t.appendChild(o);
            var r = geByClass1("faq_optional_extra_field_type__inp", o);
            r.id = o.id + "_type";
            var s = geByClass1("faq_optional_extra_field__title", o);
            s.id = o.id + "_title", placeholderSetup(s, {
                back: !0
            });
            var n = geByClass1("faq_optional_extra_field__note", o);
            n.id = o.id + "_note", placeholderSetup(n, {
                back: !0
            });
            var l = geByClass1("faq_optional_extra_field_required__inp", o);
            l.id = o.id + "_required", t.children.length >= 10 && hide(e), FAQ.prepareExtraField(o, r, l, s, n)
        }
    },
    prepareExtraField: function(e, t, i, o, a) {
        var r = new Dropdown(t, cur.selData.extra_field_types, {
            width: 191,
            introText: "",
            noResult: "",
            multiselect: !1,
            autocomplete: !1,
            big: 1
        });
        data(e, "typeSelector", r), placeholderSetup(o, {
            back: !0
        }), placeholderSetup(a, {
            back: !0
        });
        var s = new Dropdown(i, cur.selData.extra_field_required_types, {
            width: 191,
            introText: "",
            noResult: "",
            multiselect: !1,
            autocomplete: !1,
            big: 1
        });
        data(e, "requiredSelector", s);
        var n = geByClass1("faq_optional_extra_field__close", e);
        addEvent(n, "click", FAQ.removeExtraField.pbind(e))
    },
    removeExtraField: function(e) {
        var t = data(e, "typeSelector");
        t.destroy.bind(t)(), re(e), show("faq_optional_extra_field_add")
    },
    destroyExtraFields: function() {
        for (var e = 0; 10 > e; e++) {
            var t = ge("faq_optional_extra_field_" + e);
            if (t) {
                var i = data(t, "typeSelector"),
                    o = data(t, "requiredSelector");
                i.destroy.bind(i)(), o.destroy.bind(o)()
            }
        }
    },
    checkContentChanged: function() {
        cur.faqText != val("faq_text") || cur.faqTitle != val("faq_title") ? show("faq_ed_notify_translators") : hide("faq_ed_notify_translators")
    },
    saveFAQText: function(e) {
        for (var t = e, i = "", o = {}; t;) o["text" + i] = t.substring(0, 4e3), t = t.substring(4e3), i = "" === i ? "1" : parseInt(i) + 1;
        return o
    },
    saveFAQ: function(e, t, i) {
        var o = trim(val("faq_title")),
            a = trim(val("faq_text")),
            r = trim(val("faq_keywords")),
            s = trim(val("faq_description"));
        if (!o) return notaBene("faq_title");
        var n = [];
        if (cur.screens)
            for (var l in cur.screens) n.push(cur.screens[l][0]);
        if (!a && !n.length) return notaBene("faq_text");
        var _ = cur.langsDD && cur.langsDD.val() || 0,
            d = {
                act: "save",
                title: o,
                keywords: r,
                description: s,
                hash: t,
                imgs: n,
                faq_id: cur.id,
                fixed: isChecked("fix_faq"),
                urgent: isChecked("urgent_faq"),
                server: trim(val("faq_server")),
                id_mask: trim(val("faq_id_mask")),
                cdn: trim(val("faq_cdn")),
                language: _,
                parent_id: _ ? cur.parentId : 0,
                about_phone: isChecked("faq_about_phone"),
                about_profile: isChecked("faq_about_profile"),
                about_group: isChecked("faq_about_group"),
                about_email: isChecked("faq_about_email"),
                hidden: isChecked("hidden_faq"),
                disable_have_question: isChecked("disable_have_question_faq"),
                save_exit: i ? 1 : 0,
                notify_translators: isChecked("faq_ed_notify_translators") ? 1 : 0,
                is_wiki: isChecked("faq_is_wiki") ? 1 : 0,
                landing: cur.adsCategoryLandingSelector.val()
            },
            c = FAQ.saveFAQText(a);
        if (each(c, function(e, t) {
                d[e] = t
            }), d.section = intval(cur.sectionSelector.val()), 0 == d.section || 39 == d.section) {
            var u = cur.desktopCategorySelector.val();
            d.categories = u, d.spec_section = cur.specSectionSelector.val()
        } else if (31 == d.section) {
            var f = cur.platformSelector.val();
            if (!f) return elfocus(cur.platformSelector.input), notaBene(cur.platformSelector.selector);
            d.platforms = f;
            var u = cur.categorySelector.val();
            if (!u) return elfocus(cur.categorySelector.input), notaBene(cur.categorySelector.selector);
            d.categories = u
        }
        if (1 == d.section && (d.categories = cur.adsCategorySelector.val()), cur.actionButtonSelector && (d.action_id = intval(cur.actionButtonSelector.val()), 0 != d.action_id && (d.action_label = ge("faq_action_btn_label").value.trim()), 7 == d.action_id)) {
            if (!d.action_label) return elfocus("faq_action_btn_label"), notaBene("faq_action_btn_label");
            if (d.action_url = ge("faq_action_btn_url").value.trim(), !d.action_url) return elfocus("faq_action_btn_url"), notaBene("faq_action_btn_url")
        }
        if (ge("faq_optional_extra_field_add") && (!cur.sectionSelector || 0 == cur.sectionSelector.val() || 39 == cur.sectionSelector.val()) || 1 == cur.sectionSelector.val()) {
            for (var p = {}, g = ge("faq_optional_extra_fields_list").children, l = 0; l < g.length; l++) {
                var h = g[l];
                p["ef_" + l + "_type"] = data(h, "typeSelector").val(), p["ef_" + l + "_title"] = geByClass1("faq_optional_extra_field__title", h).value, p["ef_" + l + "_note"] = geByClass1("faq_optional_extra_field__note", h).value, p["ef_" + l + "_required"] = data(h, "requiredSelector").val()
            }
            d = extend(d, p)
        }
        ge("description_not_needed") && (d.descr_not_needed = isChecked("description_not_needed")), ge("description_placeholder_key") && (d.description_placeholder_key = val("description_placeholder_key")), ge("description_tooltip_key") && (d.description_tooltip_key = val("description_tooltip_key"));
        var v = [],
            m = isChecked("faq_from_chb__all") ? "_all" : 0;
        m ? v.push(m) : each(geByClass("checkbox", "faq_from_chb_list_other"), function(e, t) {
            isChecked(t) && v.push(attr(t, "v"))
        }), d.from_list = v.join(","), e || (e = ge("faq_send")), ajax.post(nav.objLoc[0], d, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    toggleUrgent: function(e) {
        checkbox(e), slideToggle("faq_urgent_details", 300, isChecked(e))
    },
    addScreen: function(e) {
        showFastBox({
            title: getLang("support_adding_screen"),
            width: 440,
            bodyStyle: "padding: 0px"
        }, '<div class="fis_box">  <div class="info_msg fis_about msg_multiline">' + getLang("support_screen_you_can") + '</div>  <div id="fis_add_data"></div>  <div class="fis_warn_text">' + getLang("support_screen_warn") + '</div>  <div id="fis_dropbox" class="dropbox">    <div class="dropbox_wrap">      <div class="dropbox_area">' + getLang("drop_files_here") + "</div>    </div>  </div></div>  "), stManager.add("upload.js", FAQ.initUpload.pbind(e))
    },
    attachCount: function(e) {
        var t = ge("fis_preview" + (e ? "_edit" : "")),
            i = ge("fis_prg_preview" + (e ? "_edit" : ""));
        return t.childNodes.length + i.childNodes.length
    },
    unchoose: function(e, t, i) {
        e && e.tt && tooltips && tooltips.destroy(e), re("fis_preview" + t), i ? delete cur.screensEdit[t] : delete cur.screens[t], toggle("fis_add_lnk" + (i ? "_edit" : ""), FAQ.attachCount(i) < 5)
    },
    choose: function(e, t, i, o) {
        var a = "",
            r = ge("fis_preview" + (t ? "_edit" : ""));
        ge("fis_prg_preview" + (t ? "_edit" : ""));
        isObject(o) || (o = {
            thumb_m: o[0] || "",
            thumb_s: o[1] || "",
            list: o[2] || "",
            view_opts: o[3] || "",
            upload_ind: o.upload_ind || void 0
        }), vkImage().src = o.thumb_s, a = "<div onclick=\"return showPhoto('" + i + "', '" + o.list + "', " + o.view_opts.replace(/"/g, "&quot;") + ');" class="fl_l fis_preview"><img class="fis_photo" src="' + o.thumb_s + '" /></div>';
        var s = ce("div", {
            innerHTML: '<div id="fis_preview' + e + '" class="fis_preview_wrap">' + a + '<div class="fis_x fl_l" ' + (browser.msie ? "title" : "tooltip") + '="' + getLang("dont_attach") + "\" onmouseover=\"if (browser.msie) return; showTooltip(this, {text: this.getAttribute('tooltip'), shift: [12, 5, 3], dir:'bottom', typeClass:'tt_black'})\" onclick=\"FAQ.unchoose(this, '" + e + "'" + (t ? ", 1" : "") + ')"></div></div>'
        }).firstChild;
        addClass(s, "fl_l"), re("upload" + e + "_progress_wrap"), r.appendChild(s), t ? cur.screensEdit[e] = [i, s] : cur.screens[e] = [i, s], cur.fileApiUploadStarted || boxQueue.hideLast(), toggle("fis_add_lnk" + (t ? "_edit" : ""), FAQ.attachCount(t) < 5)
    },
    chooseUploaded: function(e, t) {
        var i = void 0 !== e.ind ? e.ind : e,
            o = (e.fileName ? e.fileName : e, e.fileName ? i + "_" + e.fileName : e);
        if (ge("upload" + o + "_progress_wrap")) {
            var a = geByClass1("fis_prg_x", ge("upload" + o + "_progress_wrap"));
            a && hide(a)
        }
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded_support"
        }, t), {
            onDone: FAQ.choose.pbind(o, Upload.options[i].forEdit),
            onFail: FAQ.chooseFail.pbind(e),
            progress: "form" == Upload.types[i] && curBox() ? curBox().progress : null
        })
    },
    chooseFail: function(e, t) {
        var i = void 0 !== e.ind ? e.ind : e,
            o = (e.fileName ? e.fileName : e, Upload.options[i].forEdit);
        if ("fileApi" == Upload.types[i]) {
            var a = e.fileName ? i + "_" + e.fileName : e;
            re("upload" + a + "_progress_wrap"), FAQ.unchoose(null, a, o)
        }
        curBox() && hide(curBox().progress), topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + i) || {}).action
        }), Upload.embed(i), toggle("fis_add_lnk" + (o ? "_edit" : ""), FAQ.attachCount(o) < 5)
    },
    showScreenProgress: function(e, t) {
        var i = Upload.options[e].forEdit,
            o = ge("fis_prg_preview" + (i ? "_edit" : "")),
            a = intval(t.loaded / t.total * 100),
            r = t.fileName || t.name || "",
            s = r ? e + "_" + r : e,
            n = r ? r.length > 33 ? r.substr(0, 30) + "..." : r : "";
        if (o) {
            if (ge("upload" + s + "_progress_wrap")) setStyle(ge("upload" + s + "_progress"), {
                width: a + "%"
            }), show("upload" + s + "_progress");
            else {
                var l = '<div class="fis_progress_wrap">  <div id="upload' + s + '_progress" class="fis_progress" style="width: ' + a + '%;"></div></div></div>',
                    _ = ce("div", {
                        id: "upload" + s + "_progress_wrap",
                        innerHTML: '<div class="fl_l">' + l + "</div>" + (n ? '<div class="fis_label fl_l">' + n + "</div>" : "") + '<div class="fis_prg_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang("dont_attach") + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + e + ", '" + (r || e) + "');\"></div>",
                        className: "clear_fix"
                    }, {
                        marginTop: "6px"
                    });
                o.appendChild(_), show(o), toggle("fis_add_lnk" + (i ? "_edit" : ""), FAQ.attachCount(i) < 5), a || hide("upload" + s + "_progress")
            }
            return !1
        }
    },
    initUpload: function(forEdit) {
        if (ge("fis_add_data")) {
            cur.screens || (cur.screens = {});
            var opts = cur.uploadData.options;
            Upload.init("fis_add_data", cur.uploadData.url, cur.uploadData.vars, {
                file_name: "photo",
                file_size_limit: 5242880,
                file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF",
                accept: "image/jpeg,image/png,image/gif",
                file_match: ".(gif|jpg|png)$",
                lang: opts.lang,
                onUploadStart: function(e, t) {
                    var i = void 0 !== e.ind ? e.ind : e,
                        o = Upload.options[i];
                    "form" == Upload.types[i] && (curBox() && show(curBox().progress), geByClass1("file", ge("fis_add_data")).disabled = !0), "fileApi" == Upload.types[i] && (cur.notStarted && (curBox().hide(), delete cur.notStarted), o.multi_progress && this.onUploadProgress(e, 0, 0))
                },
                onUploadComplete: function(info, res) {
                    var params, i = void 0 !== info.ind ? info.ind : info,
                        fileName = info.fileName ? info.fileName : info;
                    try {
                        params = eval("(" + res + ")")
                    } catch (e) {
                        params = q2ajx(res)
                    }
                    if (!params.photos) return void Upload.onUploadError(info);
                    var options = Upload.options[i];
                    FAQ.chooseUploaded(info, params)
                },
                onUploadProgress: function(e, t, i) {
                    var o = void 0 !== e.ind ? e.ind : e;
                    if ("fileApi" == Upload.types[o]) {
                        var a = {
                            loaded: t,
                            total: i
                        };
                        e.fileName && (a.fileName = e.fileName), FAQ.showScreenProgress(o, a)
                    }
                },
                onUploadError: FAQ.chooseFail,
                noFlash: 1,
                multiple: 1,
                multi_progress: 1,
                max_files: 5 - FAQ.attachCount(forEdit),
                clear: 1,
                type: "photo",
                max_attempts: 3,
                server: opts.server,
                error: opts.default_error,
                error_hash: opts.error_hash,
                dropbox: "fis_dropbox",
                forEdit: forEdit
            })
        }
    },
    deleteFAQ: function(e, t) {
        var i = showFastBox({
            title: getLang("support_delete_title"),
            width: 430
        }, getLang("support_delete_confirm"), getLang("support_delete_button"), function() {
            ajax.post(nav.objLoc[0], {
                act: "delete",
                faq_id: e,
                hash: t
            }, {
                progress: i.progress,
                onFail: function(e) {
                    return i.hide(), FAQ.showError(e), !0
                }
            })
        }, getLang("global_cancel"));
        return !1
    },
    toggleRow: function(e, t, i) {
        return i.target || (i.target = i.srcElement || document), "a" == i.target.tagName.toLowerCase() ? !0 : (toggle("faq_short_text" + e, !isVisible("faq_short_text" + e)), toggle("faq_full_text" + e, !isVisible("faq_full_text" + e)), isVisible("faq_full_text" + e) ? addClass(t, "detailed") : removeClass(t, "detailed"), !1)
    },
    setSearchString: function(e, t, i) {
        FAQ.updateSearchString(t, i, !0)
    },
    updateSearchString: function(e, t, i) {
        cur.prevSearch = cur.prevSearch || "", e = trim(e), (cur.prevSearch != e || !e || i) && (clearTimeout(cur.searchTimeout), i ? (cur.prevSearch = e, FAQ.updateSearch(e)) : cur.searchTimeout = setTimeout(function() {
            cur.prevSearch = e, FAQ.updateSearch(e)
        }, 350))
    },
    updateSearchCheckbox: function() {
        FAQ.updateSearch(trim(val("faq_content_search__text")))
    },
    updateSearch: function(e) {
        var t = nav.objLoc;
        e ? t.q = e : delete t.q, isChecked("search_disabled") ? t.disabled = 1 : delete t.disabled, isChecked("search_expired") ? t.expired = 1 : delete t.expired, isChecked("search_with_action") ? t.with_action = 1 : delete t.with_action, isChecked("search_with_ef") ? t.with_ef = 1 : delete t.with_ef, nav.setLoc(t);
        var i = extend({}, t);
        i.act = "load_list", delete i[0], ajax.post(nav.objLoc[0], i, {
            showProgress: uiSearch.showProgress.pbind("faq_content_search__text"),
            hideProgress: uiSearch.hideProgress.pbind("faq_content_search__text"),
            onDone: function(e) {
                var t = se(e),
                    i = ge("faq_list");
                i.parentNode.replaceChild(t, i)
            }
        })
    },
    saveTilesTop: function(e, t, i) {
        var o = {
            act: "save_tiles",
            lang: t,
            hash: i,
            section: cur.section
        };
        each(geByClass("faq_tiles_editor_tile__questions", ge("faq_tiles_editor__tiles")), function(e, t) {
            var i = [];
            each(t.children, function(e, t) {
                i.push(t.id.replace("faq_tiles_editor_tile_question", ""))
            });
            var a = t.id.replace("faq_tiles_editor_tile__questions", "");
            o["faq" + a] = i.join(",")
        }), ajax.post(nav.objLoc[0], o, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    tilesShowSearch: function(e, t) {
        hide(e.target);
        var i = ge("faq_tiles_editor_tile_search__input" + t);
        return show(i), geByClass1("selector_input", i).focus(), !1
    },
    tilesQuestionRemove: function(e, t) {
        var i = ge("faq_tiles_editor_tile_question" + e),
            o = i.parentNode,
            a = o.id.replace("faq_tiles_editor_tile__questions", "");
        FAQ.tilesSorterDestroy(o), re(i), sorter.init(o, {}), o.hasChildNodes() || hide(o), geByClass("faq_tiles_editor_tile_question", o).length < cur.perCategoryLimit && show("faq_tiles_editor_tile_search" + a), t && t.stopPropagation()
    },
    tilesQuestionAdd: function(e, t, i) {
        if (t) {
            var o = ge("faq_tiles_editor_tile_question" + t);
            o && FAQ.tilesQuestionRemove(t);
            var o = ce("div", {
                className: "faq_tiles_editor_tile_question",
                id: "faq_tiles_editor_tile_question" + t
            });
            o.innerHTML = '<span class="faq_tiles_editor_tile_question__title">' + i + '</span>    <span class="faq_tiles_editor_tile_question__remove" onclick="FAQ.tilesQuestionRemove(' + t + ', event);"></span>';
            var a = ge("faq_tiles_editor_tile__questions" + e);
            show(a), FAQ.tilesSorterDestroy(a), a.appendChild(o), sorter.init(a, {}), geByClass("faq_tiles_editor_tile_question", a).length >= cur.perCategoryLimit && hide("faq_tiles_editor_tile_search" + e)
        }
    },
    tilesSorterDestroy: function(e) {
        e.sorter.destroy(), each(geByClass("faq_tiles_editor_tile_question", e), function(e, t) {
            t.removeAttribute("style")
        })
    },
    saveQuestionsSort: function(e, t, i, o, a) {
        var r = {
                act: "save_sort",
                lang: t,
                category: i,
                hash: o,
                section: cur.section
            },
            s = [];
        a || each(geByClass("faq_sort_editor_question", ge("faq_sort_editor__questions")), function(e, t) {
            s.push(t.id.replace("faq", ""))
        }), r.ids = s.join(","), ajax.post(nav.objLoc[0], r, {
            showProgress: lockButton.pbind(e),
            hideProgress: unlockButton.pbind(e)
        })
    },
    sortQuestionsReorder: function(e) {
        var t = e.getAttribute("position"),
            i = FAQ.sortQuestionsGetPosition(e);
        t != i ? addClass(e, "faq_sort_editor_question_moved") : removeClass(e, "faq_sort_editor_question_moved"), each(geByClass("faq_sort_editor_question_moved", ge("faq_sort_editor_question")), function(e, t) {
            var i = t.getAttribute("position"),
                o = FAQ.sortQuestionsGetPosition(t);
            i == o && removeClass(t, "faq_sort_editor_question_moved")
        })
    },
    sortQuestionsGetPosition: function(e) {
        for (var t = 0, i = e; i;) t++, i = i.previousSibling;
        return Math.floor(t / 2) - 1
    },
    saveDictionary: function(e, t, i) {
        hide("faq_dictionary__submit_note"), ajax.post(nav.objLoc[0], {
            act: "dictionary_save",
            lang: t,
            hash: i,
            beginning_words: val("faq_dictionary__beginning_words"),
            middle_words: val("faq_dictionary__middle_words")
        }, {
            onDone: function(e, t) {
                val("faq_dictionary__beginning_words", e), val("faq_dictionary__middle_words", t), show("faq_dictionary__submit_note"), setTimeout(function() {
                    fadeOut("faq_dictionary__submit_note", 500)
                }, 3e3)
            },
            showProgress: function() {
                addClass(e, "processing")
            },
            hideProgress: function() {
                removeClass(e, "processing")
            }
        })
    },
    showHistory: function(e, t, i) {
        return !showBox(nav.objLoc[0], {
            act: "show_history",
            id: e,
            faq_id: t,
            hash: i
        }, {
            params: {
                bodyStyle: "padding: 0px",
                width: 650
            }
        })
    },
    updateFAQ: function(e, t) {
        clearTimeout(cur.faqTimeout), cur.faqTimeout = setTimeout(function() {
            var e = t.value,
                i = trim(e),
                o = i.split(" "),
                a = ge("tickets_text");
            e.length >= 70 && a && !a.value && !cur.flood && (isVisible("tickets_detailed_form") || FAQ.toggleDetailedForm(), t.value = "", a.focus(), a.value = e), isVisible("tickets_detailed_form") || i == cur.searchStr && (o.length < 4 || 4 == o.length && " " != e[e.length - 1]) || (i ? addClass(ge("tickets_search_reset"), "shown") : removeClass(ge("tickets_search_reset"), "shown"), cur.searchStr = i, clearTimeout(cur.searchFAQTimeout), cur.searchFAQTimeout = setTimeout(function() {
                FAQ.searchFAQ(cur.searchStr)
            }.bind(this), 300), browser.mobile || scrollToTop())
        }.bind(this), 10)
    },
    searchFAQ: function(e) {
        " " == e[e.length - 1] && (e[e.length - 1] = "_"), addClass(ge("tickets_search"), "loading"), setStyle(ge("tickets_search_reset"), {
            opacity: .6
        });
        var t = {
            act: "get_faq",
            q: e,
            from: nav.objLoc.act
        };
        nav.objLoc.gid && (t.gid = nav.objLoc.gid), nav.objLoc.app_id && (t.app_id = nav.objLoc.app_id), nav.objLoc.union_id && (t.union_id = nav.objLoc.union_id), ajax.post("tlmd", t, {
            cache: 1,
            hideProgress: removeClass.pbind("tickets_search", "loading"),
            onDone: function(e, t) {
                var i = ge("tickets_title").value,
                    o = trim(i).split(" "),
                    a = o.length > 4 || 4 == o.length && " " == i[i.length - 1];
                e ? ge("tlmd_found_list").innerHTML = se(e).innerHTML : (t && (ge("tickets_faq_button").innerHTML = t), a && (cur.toggled = !0, FAQ.toggleDetailedForm()))
            }
        })
    },
    toggleDetailedForm: function(e) {
        var t = ge("tickets_title");
        if (toggleClass(ge("tickets_content"), "detailed"), isVisible("tickets_detailed_form")) t.setAttribute("placeholder", cur.lang.placeholder_title), removeClass(ge("tickets_search_reset"), "shown"), e && ge("tickets_text").focus();
        else {
            t.setAttribute("placeholder", cur.lang.placeholder_default);
            var i = trim(ge("tickets_title").value);
            i && addClass(ge("tickets_search_reset"), "shown"), cur.toggleCanceled = !0, delete cur.toggled, FAQ.searchFAQ(i), t.focus()
        }
        placeholderSetup(ge("tickets_title"), {
            back: !0,
            reload: !0
        })
    },
    clearSearch: function(e, t) {
        var i = ge("tickets_title");
        setStyle(e, {
            opacity: .6
        }), i.value = "", ge("tickets_title").focus(), FAQ.updateFAQ(t, i)
    },
    goSectionTab: function(e, t) {
        var i = geByClass1("ui_tab_sel", gpeByClass("ui_tabs", e));
        return uiTabs.switchTab(e, {
            noAnim: 1
        }), addClass(i, "ui_tab_sel"), removeClass(gpeByClass("ui_tab_group", e), "ui_tab_group_sel"), nav.go(e, t), !1
    },
    acUrl: function(e, t) {
        return "faq?act=get_faq&section=" + e + (void 0 !== t ? "&ignore_id=" + t : "")
    },
    editorBlockToggle: function(e, t) {
        var i = gpeByClass("_slide_block", e),
            o = geByClass1("_slide_content", i);
        slideToggle(o, 300, t), toggleClass(i, "faq_ed_block_unslided", t)
    },
    _eof: 1
};
try {
    stManager.done("faq.js")
} catch (e) {}