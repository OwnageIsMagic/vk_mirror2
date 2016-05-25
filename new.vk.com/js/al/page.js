var Page = {
  buildMediaLinkEl: function(url) {
    return '<div class="page_media_link_url"><div class="page_media_link_icon"></div><div class="page_media_link_text">' + url + '</div></div>';
  },
  showManyPhoto: function(el, photoId, listId, opts) {
    var m = allPhotos = [];
    each(domPN(el).childNodes, function(k, v) {
      var cl = v && v.getAttribute && v.getAttribute('onclick'), m = cl.match(/'(-?\d+_\d+)'\s*,\s*'([a-f0-9]{18})'/i);
      if (m) {
        allPhotos.push(m[1] + '/' + m[2]);
      }
    });
    opts.additional = {draft_photos: allPhotos.join(';')};
    return showPhoto(photoId, listId, extend(opts, {queue: 1}));
  },
  inviteToGroup: function(el, gid, mid, invited, hash) {
    var actions = domPN(el),
        row = domPN(domPN(el))
    var setInvited = function(invited) {
      var newInv = invited ? 1 : 0,
          label = invited ? getLang('friends_cancel_event_invite') : getLang('friends_send_event_invite');
      actions.innerHTML = '<a onclick="return page.inviteToGroup(this, ' + gid + ', ' + mid + ', ' + newInv + ', \'' + hash + '\')">' + label + '</a>';
    }
    if (invited) {
      ajax.post('/al_page.php', {act: 'a_cancel_invite', mid: mid, gid: gid, hash: hash});
      setInvited(0);
    } else {
      ajax.post('/al_page.php', {act: 'a_invite', mid: mid, gid: gid, hash: hash}, {
        onDone: function(res, message) {
          if (!res) {
            setInvited(0);
            hide(actions);
            var error = geByClass1('error', row),
                newErr = se('<div class="page_members_box_error msg"><div class="msg_text">' + message + '</div></div>');
            if (!error) {
              row.insertBefore(newErr, row.firstChild);
            } else {
              row.replaceChild(newErr, error);
            }
          }
        }
      });
      setInvited(1);
    }
    return false;
  },
  toggleSubscription: function(btn, hash, act, ev) {
    if (cur.toggleSubscriptionAct != undefined) {
      act = cur.toggleSubscriptionAct;
    }
    ajax.post('al_wall.php', {act: 'a_toggle_posts_subscription', subscribe: act ? 1 : 0, oid: cur.oid, hash: hash}, {
      onDone: function(text) {
        val(btn, text);
        cur.toggleSubscriptionAct = !act;
      },
      showProgress: Page.actionsDropdownLock.pbind(btn),
      hideProgress: Page.actionsDropdownUnlock.pbind(btn)
    });
    cancelEvent(ev);
  },
  showPageMembers: function(ev, oid, tab) {
    if (cur.viewAsBox) {
      cur.viewAsBox();
      return cancelEvent(ev);
    }
    return !showTabbedBox('al_page.php', {act: 'box', oid: oid, tab: tab}, {cache: 1}, ev);
  },
  showPageVideos: function(ev, oid) {
    if (cur.viewAsBox) {
      cur.viewAsBox();
      return cancelEvent(ev);
    }
    return !showBox('al_video.php', {act: 'a_choose_video_box', review: 1, to_id: oid}, {cache: 1, grey: 1});
  },
  showPageAudios: function(ev, oid) {
    if (cur.viewAsBox) {
      cur.viewAsBox();
      return cancelEvent(ev);
    }
    return !showBox('/al_audio.php', {act: 'audios_box', oid: oid}, {cache: 1, params: {width: 638}}, ev);
  },
  ownerPhotoFast: function() {
    var inp = ge('owner_photo_bubble_input');
    if (!inp) inp = ge('owner_photo_wrap').appendChild(ce('input', {
      type: 'file',
      id: 'owner_photo_bubble_input',
      onchange: function() {
        data(this, 'changed', true);
        showBox('al_page.php', {act: 'owner_photo_box', oid: cur.oid}).inp = this;
      }
    }));
    inp.click();
  },
  ownerPhoto: function(oid) {
    showBox('al_page.php', {
      act: 'owner_photo_box',
      oid: oid || cur.oid
    }, {stat: ['owner_photo.css', 'owner_photo.js']});
  },
  ownerCrop: function(oid) {
    showBox('al_page.php', {
      act: 'owner_photo_crop',
      oid: oid || cur.oid
    }, {stat: ['owner_photo.css', 'owner_photo.js']});
  },
  editPhoto: function(newph) {
    cur.hideOther();
    showBox('al_page.php', extend(newph || {}, {act: 'a_edit_photo'}), {
      params: {bodyStyle: 'padding: 16px 7px'},
      stat: ['tagger.js', 'tagger.css']
    });
  },
  deletePhoto: function(oid, hash) {
    cur.hideOther();
    var box = showFastBox({title: getLang('global_warning')}, getLang('sure_delete_photo'), getLang('global_delete'), function() {
      ajax.post('al_page.php', {
        act: 'a_delete_photo',
        hash: hash,
        oid: oid
      }, {
        showProgress: box.showProgress,
        hideProgress: box.hideProgress
      });
    }, getLang('global_cancel'));
  },
  shareCurrent: function() {
    var curAudio = geByClass1('current_audio', ge('page_current_info'));
    if (!curAudio) nav.reload(); // :(

    curAudio = curAudio.getAttribute('data-audio');
    if (!curAudio) nav.reload(); // :(

    curAudio = curAudio.split('_');
    if (curAudio.length < 3 || curAudio[2].substr(0, 1) != 's') nav.reload(); // :(

    return !showBox('like.php', {act: 'publish_box', object: 'audio' + curAudio[0] + '_' + curAudio[1], list: curAudio[2] + ((curAudio[3] && curAudio[3].charAt(0) == 'h') ? '_' + curAudio[3] : '')}, {stat: ['page.js', 'page.css', 'wide_dd.js', 'wide_dd.css', 'sharebox.js']});
  },

  playCurrent: function(el, liveInfo) {
    var parent = el.parentNode;

    return Page.playLive(liveInfo, {
      showProgress: function() {
        showProgress(parent);
      },
      hideProgress: function() {
        hideProgress(parent);
      }
    });
  },

  playLive: function(liveInfo, ajaxOpts) {
    getAudioPlayer().playLive(liveInfo, ajaxOpts);
  },

  audioStatusUpdate: function(hash) {
    var exp = isChecked('currinfo_audio');
    var ap = getAudioPlayer();

    var currAudio = AudioUtils.asObject(ap.getCurrentAudio());
    if (currAudio && !ap.isPlaying()) {
      currAudio = '';
    }

    var currPlaylist = currAudio ? ap.getCurrentPlaylist() : false;
    var playbackParams = currPlaylist ? currPlaylist.getPlaybackParams() : false;
    var isTop = 0;
    if (currPlaylist && playbackParams) {
      isTop = intval(playbackParams.top_audio || playbackParams.top);
    }

    ajax.post('al_audio.php', {
      act: 'toggle_status',
      hash: hash,
      exp: exp,
      id: (currAudio ? currAudio.fullId : ''),
      oid: vk.id,
      top: isTop
    }, {
      onDone: function(text, expStatus) {
        if (vk.id != cur.oid || !text) return;
        val('current_info', text);

        ap.setStatusExportInfo(expStatus);
      }
    });
  },

  audioListenersOver: function(el, oid) {
    showTooltip(el, {
      url: 'al_audio.php',
      params: {act: 'listeners_tt', 'oid': oid},
      slide: 15,
      shift: [24, 10, 10],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      asrtl: 1,
      dir: 'auto',
      typeClass: 'audio_tt',
      appendParentCls: 'scroll_fix_wrap'
    });
  },
  showAudioListeners: function(oid, ev) {
    function onBoxScroll() {
      var moreLink = ge('listeners_more_link');
      var moreLinkTrigger = ge('listeners_more_link_trigger');
      if (isVisible(moreLinkTrigger) && boxLayerWrap.scrollHeight - 500 < (boxLayerWrap.scrollTop + boxLayerWrap.offsetHeight)) {
        hide(moreLinkTrigger);
        moreLink.click();
      }
    }

    ev.cancelBubble = true;

    cur.audioListenersOnDone = {
      onHide:  function() {
        removeEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
      },
      onDone: function(box, needMore) {
        window.audioListenersOffset = 0;

        if (!needMore) {
          re('listeners_more_link');
          re('listeners_more_link_trigger');
        } else {
          addEvent(window.boxLayerWrap, 'scroll', onBoxScroll);
        }
      }
    };

    return !showBox('/al_audio.php', {act: 'listeners_box', oid: oid}, extend(cur.audioListenersOnDone, { cache: 1 }));
  },
  moreAudioListeners: function(oid) {
    window.audioListenersOffset += 50;
    var content = geByClass1('fans_rows'),
        moreBtn = ge('listeners_more_link');

    ajax.post("/al_audio.php", {act: 'listeners_box', oid: oid, offset: window.audioListenersOffset}, {
      onDone: function(rows, needMore) {

        var newRows = ce('div', { innerHTML: rows });

        for (var e = domFC(newRows); e; e = domFC(newRows)) {
          content.appendChild(e);
        }

        if (!needMore) {
          re(moreBtn);
          re('listeners_more_link_trigger');
        } else {
          var moreLink = ge('listeners_more_link_trigger');
          show(moreLink);
        }
      },
      showProgress: lockButton.pbind(moreBtn),
      hideProgress: unlockButton.pbind(moreBtn)
    });
  },
  postsUnseen: function(posts) {
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    var now = vkNow();
    var ch = false;
    for (i in posts) {
      for (j in posts[i]) {
        if (j == 'module' || j == 'index' || j == 'q') continue;
        var pdict = _postsExtras[j];
        if (pdict && pdict.diff == -1) {
          pdict.diff = now - pdict.start;
          ch = true;
        }
      }
    }
    if (ch) {
      Page.postsClearTimeouts();
    }
  },
  postsSeen: function(posts) {
    var i, j, ch, p, se, sa, module, query;
    if (!vk.id || !posts.length || vk.pd) return;

    if (!window._postsSeenModules) _postsSeenModules = {};
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    var now = vkNow();
    for (i in posts) {
      module = Page.getPostModuleCode(posts[i].module ? posts[i].module : '');
      index = posts[i].index;
      query = posts[i].q;
      for (j in posts[i]) {
        if (j == 'module' || j == 'index' || j == 'q') continue;

        _postsSeenModules[j] = module;

        p = posts[i][j];
        se = _postsSeen[j];
        sa = _postsSaved[j];
        if (sa == -1 || se == -1 || p == 1 && (sa || se)) continue;
        ch = _postsSeen[j] = p;
        _postsExtras[j] = {start: now, diff: -1, index: index, q: query};
        _postsExtras[j]['session_id'] = cur.feed_session_id ? cur.feed_session_id : 'na'
      }
    }
    if (ch) {
      Page.postsClearTimeouts();
    }
  },
  postsClearTimeouts: function() {
    clearTimeout(_postsSaveTimer);
    _postsSaveTimer = setTimeout(Page.postsSave, 2500);
    clearTimeout(_postsSendTimer);
    _postsSendTimer = setTimeout(Page.postsSend, 5000);
  },
  postsSave: function() {
    if (!ls.checkVersion() || isEmpty(_postsSeen)) return _postsSeen;

    var sent = ls.get('posts_sent') || {};
    var seen = ls.get('posts_seen') || {};
    var modules = ls.get('posts_seen_modules') || {};
    var extras = ls.get('posts_extras') || {};
    var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
    var ch, i, p, snt, sn;
    if (!window._postsExtras) {
      _postsExtras = {};
    }
    for (i in _postsSeen) {
      sn = _postsSeen[i];
      if (_postsExtras[i]) {
        extras[i] = {
            diff: _postsExtras[i].diff, index: _postsExtras[i].index,
            q: _postsExtras[i].q, session_id: _postsExtras[i].session_id ? _postsExtras[i].session_id : 'na'};
        delete _postsExtras[i];
      }
      p = i.split('_');
      if (p[0] !== 'ad' && p[0] !== 'posthashtag') {
        p[0] = intval(p[0]);
        p[1] = intval(p[1]);
      }
      snt = (sent[p[0]] || {})[p[1]];
      if (p[0] != vk.id && (!snt || sn == -1 && snt > 0)) {
        if (!seen[p[0]]) {
          seen[p[0]] = {};
          delete modules[i];
        }
        if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
          ch = seen[p[0]][p[1]] = t * sn;
          modules[i] = _postsSeenModules[i];
        }
      }
      _postsSaved[i] = sn;
    }
    _postsSeen = {};
    _postsSeenModules = {};
    if (ch) {
      ls.set('posts_seen', seen);
      ls.set('posts_seen_modules', modules);
      ls.set('posts_extras', extras);
    }
  },
  getPostModuleCode: function(module) {
    switch(module) {
      case 'feed': return 'f';
      case 'public': return 'c';
      case 'profile': return 'p';
      case 'feed_search': return 's';
      case 'feed_news_recent': return 'r';
      case 'feed_news': return 'r';
      case 'feed_news_top': return 't';
      case 'feed_other': return 'o';
      default: return '';
    }
  },
  postsSend: function() {
    var seen = {};
    var modules = {};
    var extras = {};
    var data = [];
    var i, j, r, m;
    if (ls.checkVersion()) {
      seen = ls.get('posts_seen');
      modules = ls.get('posts_seen_modules') || {};
      extras = ls.get('posts_extras') || {};
    } else {
      r = Page.postsSave();
      for (i in r) {
        sn = r[i];
        p = i.split('_');
        if (p[0] !== 'ad' && p[0] !== 'posthashtag') {
          p[0] = intval(p[0]);
          p[1] = intval(p[1]);
        }
        if (!seen[p[0]]) {
          seen[p[0]] = {};
        }
        if (!seen[p[0]][p[1]] || sn == -1 && seen[p[0]][p[1]] > 0) {
          seen[p[0]][p[1]] = sn;
        }
      }
    }
    for (i in seen) {
      r = [];
      for (j in seen[i]) {
        var full_id = i + '_' + j;
        m = modules[full_id] || '';
        var extra = extras[full_id];
        var query_str = (m == 's' && extra.q) ? extra.q : '';
        query_str = query_str.replace(/[,;:]/g, '');
        if (query_str) {
          query_str = ':' + query_str;
        }
        var session_id_str = extra && extra.session_id ? extra.session_id : 'na';
        var extra_str = (extra && i != 'ad' && i != 'posthashtag') ? (':' + extra.diff + ':' + extra.index + ':' + session_id_str + query_str) : '';
        r.push(m + ((seen[i][j] > 0) ? j : -j) + extra_str);
      }
      if (r.length) {
        data.push(i + '_' + r.join(','));
      }
    }
    if (!data.length) return;
    if (!vk.id) return Page.postsClear();

    ajax.post('al_page.php', {act: 'seen', data: data.join(';')}, {onDone: function() {
      if (!ls.checkVersion()) {
        return extend(_postsSaved, _postsSeen);
      }
      var cseen = ls.get('posts_seen') || {}, sent = ls.get('posts_sent') || {}, smodules = ls.get('posts_seen_modules'), i, j;
      for (i in seen) {
        for (j in seen[i]) {
          if (!sent[i]) {
            sent[i] = {};
          }
          if (sent[i][j] != -1) {
            sent[i][j] = seen[i][j];
          }
          if ((cseen[i] || {})[j]) {
            delete(cseen[i][j]);
            delete smodules[i + '_' + j];
          }
        }
        if (cseen[i] && isEmpty(cseen[i])) {
          delete(cseen[i]);
          delete smodules[i + '_' + j];
        }
      }
      ls.set('posts_seen', cseen);
      ls.set('posts_sent', sent);
      ls.set('posts_seen_modules', smodules);

      clearTimeout(_postsCleanTimer);
      _postsCleanTimer = setTimeout(Page.postsClean, 10000);
    }});
  },
  postsClean: function() {
    if (window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle) {
      debugLog('waiting ls clean..');
      clearTimeout(_postsCleanTimer);
      _postsCleanTimer = setTimeout(Page.postsClean, 10000);
      return;
    }

    debugLog('cleaning ls..');
    var t = Math.floor((vk.ts + Math.floor((vkNow() - vk.started) / 1000)) / 3600);
    var sent = ls.get('posts_sent') || {}, i, j, k, ch = 0;
    for (i in sent) {
      for (j in sent[i]) {
        k = sent[i][j];
        if (t - ((k > 0) ? k : -k) > 24) {
          delete(sent[i][j]);
          ch = 1;
        }
      }
      if (isEmpty(sent[i])) {
        delete(sent[i]);
        ch = 1;
      }
    }
    ls.set('posts_sent', sent);
  },
  postsClear: function() {
    ls.set('posts_seen', {});
    ls.set('posts_extras', {});
    ls.set('posts_sent', _postsSaved = _postsSeen = _postsSeenModules = _postsExtras = {});
  },
  showContacts: function(oid, edit, callback) {
    var b = showBox('/al_page.php', {act: 'a_get_contacts', oid: oid, edit: edit});
    b.setOptions({onHideAttempt: function() {
      if (cur.reloadAfterClose) {
        if (callback) {
          callback();
        } else {
          nav.reload({noscroll: true});
          cur.reloadAfterClose = false;
        }
      }
      return true;
    }});
  },
  showContactTT: function(el, text) {
    showTooltip(el, {
      text: function() {return text;},
      slideX: 15,
      className: 'pedit_tt',
      hasover: 1,
      shift: [-getSize(el)[0] - 10, -15, -15],
      dir: 'left',
      appendParentCls: 'scroll_fix_wrap',
      onCreate: function () {
        if (el.tt) {
          setTimeout(el.tt.hide, 3000);
        }
      }
    });
  },
  editContact: function(oid, mid, hash, callback) {
    var b = showBox('al_page.php', {act: 'a_edit_contact_box', mid: mid, oid: oid}).setButtons(getLang('global_save'), function(btn) {
      cur.reloadAfterClose = true;
      function onSearch() {
        var params = {act: 'a_add_contact', mid: mid, oid: oid};
        params.hash = hash;
        if (!hash) params.hash = ge('group_contact_hash').value;
        params.title = val('group_contact_position');
        params.phone = val('group_contact_phone');
        params.email = val('group_contact_email');
        if (!mid && ge('group_contact_memlink')) {
          params.page = val('group_contact_memlink');
          if (!params.page && !params.phone && !params.email) {
            b.hide();
            return;
          }
        }
        ajax.post('al_page.php', params, {
          onDone: function(res, script) {
            b.hide();
            var box = curBox();
            if (box) {
              box.content(res);
              if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
                ge('public_contacts_list').sorter.destroy();
              }
              if (script) {
                eval(script);
              }
              toggle('group_add_contact', ge('public_contacts_list').childNodes.length < 30);
            } else {
              page.showContacts(oid, 1, callback);
            }
          },
          onFail: function(error) {
            if (ge('group_contact_error')) {
              ge('group_contact_error').innerHTML = error;
              show('group_contact_error_wrap');
              return true;
            }
          },
          showProgress: lockButton.pbind(btn),
          hideProgress: unlockButton.pbind(btn)
        });
      }
      if (!mid && cur.lastContact != val('group_contact_memlink')) {
        page.searchContact(oid, val('group_contact_memlink'), onSearch);
      } else {
        onSearch();
      }
    }, getLang('global_cancel'));
    return false;
  },
  searchContact: function(oid, page, onSearch) {
    if (!trim(page)) {
      cur.lastContact = '';
      if (onSearch) onSearch();
      return;
    }
    if (page == cur.lastContact) return;
    ajax.post('al_page.php', {act: 'a_search_contact', oid: oid, page: page}, {onDone: function(uid, img, name, hash) {
      cur.lastContact = page;
      ge('group_contact_name').innerHTML = name;
      ge('group_contact_image').innerHTML = img;
      ge('group_contact_hash').value = hash;
      if (!uid) {
        notaBene('group_contact_memlink', '', true);
        hide('group_contact_error_wrap');
      } else {
        if (onSearch) {
          onSearch();
        } else {
          hide('group_contact_error_wrap');
        }
      }
    }});
  },
  deleteContact: function(oid, mid, hash) {
    cur.reloadAfterClose = true;
    ajax.post('al_page.php', {act: 'a_delete_contact', oid: oid, mid: mid, hash:hash}, {onDone: function(res, script){
      var box = curBox();
      box.content(res);
      if (ge('public_contacts_list') && ge('public_contacts_list').sorter) {
        ge('public_contacts_list').sorter.destroy();
      }
      if (script) {
        eval(script);
      }
      toggle('group_add_contact', ge('public_contacts_list').childNodes.length < 30);
    }});
    return false;
  },
  reorderContacts: function(oid, hash, user, before, after) {
    var mid = user.id.replace('group_contact_cell', '');
    var before_id = (before && before.id || '').replace('group_contact_cell', '');
    var after_id = (after && after.id || '').replace('group_contact_cell', '');
    cur.reloadAfterClose = true;
    ajax.post('/al_page.php', {act: 'a_reorder_contacts', oid: oid, mid: mid, before: before_id, after: after_id, hash: hash});
  },

  initStatusEditable: function(txt) {
    if (txt.emojiInited) {
      return false;
    }
    txt.emojiInited = true;
    stManager.add(['emoji.js', 'notifier.css'], function() {
      var optId = Emoji.init(txt, {
        ttDiff: -48,
        rPointer: true,
        controlsCont: domPN(txt),
        noStickers: true,
        forceEnterSend: true,
        onSend: Page.infoSave,
        checkEditable: function() {
          var msg = Emoji.editableVal(txt), maxLen = 140;
          if (msg.length > maxLen) {
            Emoji.val(txt, clean(msg.substr(0, maxLen)));
            Emoji.editableFocus(txt, false, true);
          }
        }
      });
    });
  },
  infoEdit: function(audio) {
    if (cur.viewAsBox) return cur.viewAsBox();

    var tt = ge('current_info').tt;
    if (tt && tt.hide) {
      tt.hide({fasthide: true});
    }
    show('currinfo_editor', 'currinfo_fake');
    hide('currinfo_wrap');
    if (isVisible('currinfo_app') && !cur.ciApp) {
      show('currinfo_audio');
      hide('currinfo_app');
    } else if (cur.ciApp) {
      hide('currinfo_audio');
      show('currinfo_app');
    }
    var info = ge('current_info').firstChild, input = ge('currinfo_input'), link = geByTag1('a', info);
    Page.initStatusEditable(input, cur.infoOld);
    cur.infoEditing = (info.className == 'my_current_info');
    if (cur.infoEditing) {
      var infoHtml = link ? link.innerHTML : info.innerHTML;
      infoHtml = infoHtml.replace(/<img[^>]+alt="([^"]+)"[^>]*>/g, '$1');
      cur.infoOld = trim(clean(stripHTML(infoHtml)));
    } else {
      cur.infoOld = '';
    }
    if (window.Emoji) {
      Emoji.val(input, winToUtf(cur.infoOld));
      Emoji.editableFocus(input, false, true, true);
    } else {
      val(input, winToUtf(cur.infoOld));
      elfocus(input);
    }
    addEvent(window, 'keydown', Page.infoKeydown);
    addEvent(document, 'mousedown', Page.infoMousedown);
    ge('currinfo_save').onclick = Page.infoSave;
  },
  infoCancel: function() {
    hide('currinfo_editor', 'currinfo_fake');
    show('currinfo_wrap');
    cleanElems('currinfo_save', 'currinfo_cancel');
    removeEvent(window, 'keydown', Page.infoKeydown);
    removeEvent(document, 'mousedown', Page.infoMousedown);
    cur.ciApp = false;
  },
  infoShowShare: function() {
    if (cur.viewAsBox) return cur.viewAsBox();

    var el = ge('current_info'), label = getLang('share_current_info');
    showTooltip(el, {
      content: '<div class="content"><div class="checkbox">' + label + '</div></div>',
      className: 'share_tt',
      init: function() {
        addEvent(geByClass1('checkbox', el.tt.container), 'click', function() {
          checkbox(this);
          ajax.post('al_page.php', {act: 'share_currinfo', hash: cur.options.info_hash, oid: cur.oid, checked: isChecked(this)}, {onDone: Wall.receive});
        });
      },
      toup: false,
      showdt: 0,
      slide: 10,
      shift: [6, 8, 8],
      dir: 'auto',
      hidedt: 200,
      onClean: function() {
        cleanElems(geByClass1('checkbox', el.tt.container));
      }
    });
  },
  infoKeydown: function(e) {
    if (e.keyCode == KEY.ESC) {
      Page.infoCancel();
    }
  },
  infoMousedown: function(e) {
    var t = e.target;
    while (t.parentNode) {
      if (t.id == 'currinfo_editor') {
        return;
      }
      t = t.parentNode;
    }
    Page.infoCancel();
  },
  infoSave: function() {
    if (cur.viewAsBox) return cur.viewAsBox();

    var input = ge('currinfo_input'),
        txt = trim((window.Emoji ? Emoji.editableVal : val)(input)).replace(/\n/g, ' ');

    if (txt == cur.infoOld || txt == winToUtf(cur.infoOld)) {
      return Page.infoCancel();
    }
    txt = trim(txt).substr(0, 140);
    ajax.post('al_page.php', {act: 'current_info', oid: cur.oid, info: txt, hash: cur.options.info_hash}, {onDone: function() {
      var c = txt ? 'my' : 'no', t = txt ? ('<span class="current_text">' + Emoji.emojiToHTML(txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'), true) + '</span>') : getLang('change_current_info');
      ge('current_info').innerHTML = ge('currinfo_fake').innerHTML = '<span class="' + c + '_current_info">' + t + '</span>';
      Page.infoCancel();
      var el = ge('current_info'), tt = el.tt;
      if (tt && tt.el) {
        tt.destroy();
        removeEvent(el, 'mouseover');
      }
      if (txt) {
        addEvent(el, 'mouseover', Page.infoShowShare);
        Page.infoShowShare();
      }
    }, onFail: function(t) {
      if (!t) {
        return true;
      }
    }, showProgress: lockButton.pbind('currinfo_save'), hideProgress: unlockButton.pbind('currinfo_save'), stat: ['tooltips.js', 'tooltips.css', 'emoji.js']});
  },
  mentionInit: function (el) {
  },
  showGif: function(obj, ev, dontHideActive) {
    if (ev && (ev.ctrlKey || ev.metaKey)) {
      return true;
    }

    cur.gifAdded = cur.gifAdded || {};
    if (cur.activeGif && domPN(domPN(cur.activeGif)) == domPN(domPN(obj)) || hasClass(domPN(cur.activeGif), 'page_gif_large') && !dontHideActive) {
      Page.hideGif(cur.activeGif, false);
    }

    var doc = obj.getAttribute('data-doc')
    var hash = obj.getAttribute('data-hash');
    var addTxt = obj.getAttribute('data-add-txt') || '';
    var addHash = obj.getAttribute('data-add-hash');
    var shareTxt = obj.getAttribute('data-share-txt') || '';
    var postRaw = obj.getAttribute('data-post');
    var replyRaw = obj.getAttribute('data-reply');
    var hasPreview = obj.getAttribute('data-preview');
    var previewWidth = obj.getAttribute('data-width');
    var previewHeight = obj.getAttribute('data-height');
    var canPlayVideo = false;
    var largeGif = hasClass(domPN(obj), 'page_gif_large');
    var isAutoplay = !ev;
    var el;

    if (postRaw) {
      var oid, post_id, ids;
      ids = postRaw.split('_');
      oid = ids[0];
      post_id = ids[1];
      statlogsValueEvent('show_post_gif', 1, oid, post_id);
    }

    if (hasPreview) {
      var v = ce('video');
      if (v.canPlayType && v.canPlayType('video/mp4').replace('no', '')) {
        canPlayVideo = true;
      }
    }

    var el_src = obj.href + '&wnd=1&module=' + cur.module;

    if (canPlayVideo) {
      el = ce('video', {
        autoplay: true,
        loop: 'loop',
        poster: obj.getAttribute('data-thumb'),
        className: 'pages_gif_img page_gif_big'
      }, {
        width: previewWidth ? previewWidth + 'px' : null,
        height: previewHeight ? previewHeight + 'px' : null,
        background: largeGif ? 'transparent url(' + obj.getAttribute('data-thumb') + ') no-repeat 0 0' : '',
        backgroundSize: 'cover'
      });
      el.appendChild(ce('source', {
        type: 'video/mp4',
        src: el_src + '&mp4=1'
      }));
    } else {
      el = ce('img', {
        src: el_src,
        className: 'pages_gif_img'
      }, {
        width: previewWidth ? previewWidth + 'px' : null,
        height: previewHeight ? previewHeight + 'px' : null
      });
    }

    var acts = '<div class="page_gif_share" onmouseover="showTooltip(this, {text: \'' + shareTxt + '\', black: 1, shift: [7, 6, 6], toup: 0, needLeft: 1})" onclick="return Page.shareGif(this, \''+doc+'\', \''+hash+'\', event)"><div class="page_gif_share_icon"></div></div>';;
    if (addHash) {
      acts += '<div class="page_gif_add" onmouseover="return Page.overGifAdd(this, \'' + addTxt + '\', \''+doc+'\', event);" onclick="return Page.addGif(this, \''+doc+'\', \''+hash+'\', \''+addHash+'\', event);"><div class="page_gif_add_icon"></div></div>';
    }
    acts = '<div class="page_gif_actions">' + acts + '</div>';

    var progressIcon = '<div class="page_gif_progress_icon" style="display:none;">' + rs(vk.pr_tpl, {id: '', cls: ''}) + '</div>';

    var imgCont = ce('a', {
      href: obj.href,
      className: 'page_gif_preview' + (cur.gifAdded[doc] ? ' page_gif_added' : ''),
      innerHTML: progressIcon + (largeGif ? '<div class="page_gif_label">gif</div>' : '') + acts,
      onclick: cancelEvent
    }, {
      background: canPlayVideo ? '' : (getStyle(domFC(obj), 'background') || '').replace(/"/g, '\''),
      width: previewWidth ? previewWidth + 'px' : '',
      height: previewHeight ? previewHeight + 'px' : ''
    });

    imgCont.appendChild(el);
    cur.activeGif = imgCont;
    domPN(obj).insertBefore(imgCont, obj);
    hide(obj);

    var isLoaded = false;

    var onLoaded = function() {
      if (getSize(el)[0] || getSize(el)[1]) {
        clearInterval(loadingInterval);
        el.onload = el.onloadeddata = null;
        isLoaded = true;

        // if (!cur.activeGif) return;
        hide(domFC(imgCont));
        imgCont.style.background = '';
        imgCont.setAttribute('onclick', "return Page.hideGif(this, event);");
        addClass(el, 'page_gif_big');
        addClass(imgCont, 'page_gif_loaded');
        statlogsValueEvent('gif_play', 0, canPlayVideo ? 'mp4' : 'gif');
      }
    };

    if (ev) { // clicked by user
      show(domFC(imgCont));
    } else {
      setTimeout(function() {
        if (!isLoaded) {
          show(domFC(imgCont));
        }
      }, 300);
    }

    if (canPlayVideo) {
      el.onloadeddata = onLoaded;
    } else {
      var loadingInterval = setInterval(onLoaded, 10);
      el.onload = onLoaded;
    }

    domPN(obj).setAttribute('data-playing', 1);

    var statsMode = isAutoplay? 'autoplay' : 'manual';
    var statsModule = cur.module || 'other';
    var statsFrom = postRaw ? 'post' : (replyRaw ? 'reply' : '');
    statlogsValueEvent('gif_show', statsMode, statsModule, statsFrom);

    return cancelEvent(ev);
  },
  hideGif: function(obj, ev) {
    if (ev && (ev.ctrlKey || ev.metaKey)) {
      return true;
    }

    var wrap = domPN(obj);
    var thumb = domNS(obj);

    wrap.removeAttribute('data-playing');
    if (ev) {
      removeClass(wrap, 'page_gif_autoplay');
    }
    re(obj);
    show(thumb);
    delete cur.activeGif;
    return false;
  },
  overGifAdd: function(obj, txt, doc, ev) {
    cur.gifAdded = cur.gifAdded || {};
    if (cur.gifAdded[doc]) {
      txt = cur.gifAdded[doc].tooltip;
      if (!txt) return false;
    }

    showTooltip(obj, {text: txt, black: 1, shift: [7, 6, 6], toup: 0, needLeft: 1});
    return false;
  },
  addGif: function(obj, doc, hash, addHash, ev) {
    cur.gifAdded = cur.gifAdded || {};
    if (obj.tt) obj.tt.hide();

    var wrap = gpeByClass('page_gif_large', obj) || domPN(obj);

    if (!cur.gifAdded[doc]) {
      addClass(obj, 'page_gif_adding');
      ajax.post('docs.php', {act: 'a_add', doc: doc, hash: hash, add_hash: addHash}, {
        onDone: function(text, tooltip, docObj, hash) {
          showDoneBox(text);
          addClass(wrap, 'page_gif_added');
          if (obj.tt && obj.tt.el) obj.tt.destroy();
          cur.gifAdded[doc] = {
            tooltip: tooltip,
            did: docObj[0],
            hash: hash
          };
        }
      });
    } else {
      ajax.post('docs.php', {act: 'a_delete', oid: vk.id, did: cur.gifAdded[doc].did, hash: cur.gifAdded[doc].hash}, {
        onDone: function() {
          removeClass(wrap, 'page_gif_added');
          if (obj.tt && obj.tt.el) obj.tt.destroy();
          delete cur.gifAdded[doc];
        }
      });
    }
    return cancelEvent(ev);
  },

  shareGif: function(obj, doc, hash, ev) {
    if (obj.tt) obj.tt.hide();
    showBox('like.php', {
      act: 'publish_box',
      object: 'doc' + doc,
      list: hash,
    }, {
      stat: ['wide_dd.js', 'wide_dd.css', 'sharebox.js']
    });

    return cancelEvent(ev);
  },

  autoplayPinnedVideo: function(postId, videoRaw, videoHash) {
    var thumb = domByClass(ge('post'+postId), 'page_post_thumb_video');
    if (!thumb || browser.mobile || nav.objLoc.z || window.mvcur && mvcur.mvShown) return;

    showInlineVideo(videoRaw, videoHash, {autoplay: 1, addParams: { post_id: postId, from_autoplay: 1 }}, null, thumb);

    cur.pinnedVideo = videoRaw;
    cur.pinnedVideoInitHandlers = function() {
      var post = ge('post'+postId);
      var playerEl = ge('video_player') || ge('html5_player');
      if (post && playerEl && isAncestor(playerEl, post)) {
        addEvent(window, 'scroll', cur.pinnedVideoScrollHandler);
        cur.destroy.push(cur.pinnedVideoDestroyHandlers);
        cur.pinnedVideoScrollHandler();
      }
      delete cur.pinnedVideoInitHandlers;
    };

    cur.pinnedVideoScrollHandler = (function pinnedVideoScrollHandler(evt) {
      var post = ge('post'+postId);
      var playerEl = ge('video_player') || ge('html5_player');
      var playerObj = ge('video_player') || window.html5video;
      if (!post || !playerEl || !isAncestor(playerEl, post) || (playerObj.isTouchedByUser && playerObj.isTouchedByUser())) {
        if (cur.pinnedVideoDestroyHandlers) {
          cur.pinnedVideoDestroyHandlers();
        } else { // for some reason cur.destroy functions hadn't been called but cur had been rewritten
          removeEvent(window, 'scroll', pinnedVideoScrollHandler);
        }
        return;
      }

      var playerY = getXY(playerEl)[1];
      var playerHeight = getSize(playerEl)[1];
      var scrollY = scrollGetY();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      var inViewport = (playerY + playerHeight/2 > scrollY) && (playerY + playerHeight/2 < scrollY + viewportHeight);

      if (inViewport != cur.pinnedVideoPrevInViewport) {
        window.Videoview && Videoview.togglePlay(inViewport);
        cur.pinnedVideoPrevInViewport = inViewport;
      }
    });

    cur.pinnedVideoDestroyHandlers = function() {
      removeEvent(window, 'scroll', cur.pinnedVideoScrollHandler);
      delete cur.pinnedVideo;
      delete cur.pinnedVideoScrollHandler;
      delete cur.pinnedVideoDestroyHandlers;
      delete cur.pinnedVideoPrevInViewport;
    };
  },

  actionsDropdown: function(el, preloadClbk) {
    if (!el && preloadClbk) {
      preloadClbk();
      return;
    }

    show(el);
  },
  actionsDropdownHide: function(el, force) {
    if (force === 1) return hide(el);
    clearTimeout(cur.actDdHide);
    cur.actDdHide = setTimeout(function() {
      fadeOut(el, 200, hide.pbind('page_actions_sublist'));
    }, 150);
  },
  actionsDropdownUnhide: function() {
    clearTimeout(cur.actDdHide);
  },
  actionsDropdownLocked: function(el) {
    if (!(el = ge(el))) return;
    return hasClass(el, 'page_actions_item_lock');
  },
  actionsDropdownLock: function(el) {
    if (
      (el = ge(el)) &&
      hasClass(el, 'page_actions_item') &&
      !hasClass(el, 'page_actions_item_lock')
    ) {
      data(el, 'inner', el.innerHTML);
      addClass(el, 'page_actions_item_lock');
      var lockText = ce('div', {className: 'page_actions_item_lock_text'});
      val(lockText, el.innerHTML);
      el.appendChild(lockText);
      showProgress(el);
    }
  },
  actionsDropdownUnlock: function(el) {
    if (
      (el = ge(el)) &&
      hasClass(el, 'page_actions_item') &&
      hasClass(el, 'page_actions_item_lock')
    ) {
      removeClass(el, 'page_actions_item_lock');
      el.innerHTML = data(el, 'inner');
    }
  },
  actionsPreloadFeedLists: function(el, sh) {
    ajax.post('al_feed.php', {act: 'a_get_lists_by_item', item_id: cur.oid}, {
      onDone: function(html, js) {
        if (!sh) return;

        if (!ge('page_actions_wrap'))  {
          domPN(el).insertBefore(se(html), el);
          eval(js);
        }
      },
      cache: 1
    });
  },
  feedListsDDShow: function() {
    var obj = ge('page_actions_item_lists');
    addClass(obj, 'page_actions_item_unfolded');
    if (ge('page_actions_sublist')) {
      clearTimeout(cur.feedListsDDHide);
      show('page_actions_sublist');
      return;
    }

    var elems = [];
    for (var i in cur.options.feedLists) {
      var lname = cur.options.feedLists[i];
      if (lname.length > 20) {
        lname = trim(lname.substr(0, 18))+'...';
      }
      elems.push('<a id="page_feed_item'+i+'" class="page_actions_item page_actions_subitem'+(cur.options.feedListsSet && cur.options.feedListsSet[i] ? ' checked' : '')+'" onclick="Page.feedListsCheck(this, '+i+');">'+lname+'</a>');
    }
    elems = se('<div id="page_actions_sublist" onmouseover="Page.feedListsDDShow();">'+elems.join('')+'</div>');
    domPN(obj).appendChild(elems);
  },
  feedListsDDHide: function() {
    clearTimeout(cur.feedListsDDHide);
    cur.feedListsDDHide = setTimeout(function() {
      hide('page_actions_sublist');
      removeClass('page_actions_item_lists', 'page_actions_item_unfolded');
    }, 150);
  },
  feedListsCheck: function(obj, listId) {
    var checked = hasClass(obj, 'checked');
    if (checked) {
      cur.options.feedListsSet[listId] = 0;
      cur.options.feedListsChanges[listId] = -1;
    } else {
      cur.options.feedListsSet[listId] = 1;
      cur.options.feedListsChanges[listId] = 1;
    }

    toggleClass(obj, 'checked', !checked);
    if (cur.feedListsTO) {
      clearTimeout(cur.feedListsTO);
    }
    var ids = [];
    for (var i in cur.options.feedListsChanges) {
      ids.push(cur.options.feedListsChanges[i] * i);
    }
    if (!ids.length) return;
    cur.feedListsTO = setTimeout(function() {
      ajax.post('al_feed.php', {act: 'a_toggle_lists', item_id: cur.oid, lists_ids: ids.join(','), hash: cur.options.feedListsHash}, {onDone: function() {
        cur.options.feedListsChanges = {};
      }});
    });
  },

  addAudioPreview: function(media, data) {
    stManager.add(['audioplayer.css', 'audioplayer.js']);

    if (isObject(data)) {
      var aid = media.split('_');
      var info = data.info.split(',');
      data = [
        aid[1],
        aid[0],
        info[0],
        data.title,
        data.performer,
        intval(info.length > 1 ? info[1] : data.duration),
        0, 0, '', 0, 0, 0, 0
      ];
    }
    return AudioUtils.drawAudio(data, true);
  }
}, page = Page;

var Wall = {
  deleteAll: function(el, post, hash) {
    ajax.post('al_wall.php', {act: 'delete_all', post: post, hash: hash}, {onDone: function(text) {
      var p = domPN(domPN(el));
      p.oldt = val(p);
      val(p, text);
    }, showProgress: function() {
      hide(el);
      show(domNS(el) || domPN(el).appendChild(ce('div', {className: 'progress'})));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  restoreAll: function(el, post, hash) {
    var rnd = cur.wallRnd = Math.floor(Math.random() * 100000);
    ajax.post('al_wall.php', {act: 'restore_all', post: post, hash: hash, rnd: rnd}, {onDone: function(text) {
      var p = domPN(el);
      val(p, p.oldt);
    }, showProgress: function() {
      hide(el);
      show(domNS(el) || domPN(el).appendChild(ce('span', {className: 'progress_inline'})));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  block: function(el, post, hash, bl) {
    ajax.post('al_wall.php', {act: 'block', post: post, hash: hash, bl: bl}, {onDone: function(text) {
      if (bl) {
        domPN(el).insertBefore(ce('div', {innerHTML: text}), el);
        hide(el);
      } else {
        show(domNS(domPN(el)));
        re(domPN(el));
      }
    }, showProgress: function() {
      var prg = bl ? ce('div', {className: 'progress'}) : ce('span', {className: 'progress_inline'});
      hide(el);
      show(domNS(el) || domPN(el).appendChild(prg));
    }, hideProgress: function() {
      show(el);
      re(domNS(el));
    }});
  },
  blockEx: function(gid, mid) {
    showBox('groupsedit.php', {act: 'bl_edit', name: 'id' + mid, gid: gid, auto: 1}, {stat: ['page.css', 'ui_controls.js', 'ui_controls.css'], dark: 1});
  },
  withMentions: !(browser.mozilla && browser.version.match(/^2\./) || browser.mobile),
  editPost: function(el, post, options, onFail, onDone) {
    if (cur.editingPost && ge('wpe_text')) {
      var posts = gpeByClass('wall_posts', ge('wpe_text'));
      if (posts && !isVisible(posts)) {
        Wall.cancelEdit();
      } else {
        onFail && onFail();
        return notaBene('wpe_text');
      }
    }
    cur.editingPost = [post];
    if (Wall.withMentions) {
      stManager.add(['ui_controls.css', 'ui_controls.js', 'mentions.js', 'walledit.js']);
    } else {
      stManager.add(['walledit.js']);
    }
    ajax.post('al_wall.php', extend({act: 'edit', post: post, mention: Wall.withMentions ? 1 : ''}, options), {
      onDone: function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(post);
        WallEdit.editPost.apply(window, args);
        onDone && onDone();
      },
      onFail: function() {
        cur.editingPost = false;
        onFail && onFail();
      },
      showProgress: function() {
        if (hasClass(el, 'ui_actions_menu_item')) {
          lockActionsMenuItem(el);
        } else if (hasClass(el, 'flat_button')) {
          lockButton(el);
        } else {
          addClass(geByClass1('post_actions', 'post' + post), 'post_actions_progress');
        }
      },
      hideProgress: function() {
        if (hasClass(el, 'ui_actions_menu_item')) {
          unlockActionsMenuItem(el);
        } else if (hasClass(el, 'flat_button')) {
          unlockButton(el);
        } else {
          removeClass(geByClass1('post_actions', 'post' + post), 'post_actions_progress');
        }
      }
    });
  },
  fixPost: function (link, post, hash, value) {
    ajax.post('al_wall.php', {act: 'a_fix_post', post: post, hash: hash, value: value}, {
      onDone: function (js) {
        if (js) {
          eval(js);
        }
        var postEl = (cur.wallLayer == post) ? ge('wl_post') : ge('post' + post);
        each(geByClass('post_fixed'), function() {
          removeClass(this, 'post_fixed');
        });
        toggleClass(postEl, 'post_fixed', value);
        if (link) {
          val(link, getLang(value ? 'wall_unfix_post' : 'wall_fix_post'));
          link.onclick = function () {
            return Wall.fixPost(link, post, hash, value ? 0 : 1);
          }
        }
        if (cur.onWKFix) {
          cur.onWKFix(value);
          delete cur.onWKFix;
        }
      },
      showProgress: function() {
        if (hasClass(link, 'ui_actions_menu_item')) {
          lockActionsMenuItem(link);
        } else {
          lockButton.pbind('wpe_fix' + post);
        }
      },
      hideProgress: function() {
        if (hasClass(link, 'ui_actions_menu_item')) {
          unlockActionsMenuItem(link);
        } else {
          unlockButton.pbind('wpe_fix' + post);
        }
      }
    });
    return false;
  },

  cancelEdit: function(layerOnly) {
    if (cur.editingPost) {
      if (layerOnly === true && cur.editingPost[0].match(/^-?\d+_/)) return;
      if (window.WallEdit) {
        WallEdit.cancelEditPost();
      } else {
        cur.editingPost = false;
      }
    }
  },

  searchWall: function() {
    // nav.change({q: false, search: nav.objLoc.day ? false : 1});

  },
  switchTabContent: function(tab) {
    hide('page_wall_posts', 'page_postponed_posts', 'page_suggested_posts', 'page_search_posts');
    switch (tab) {
      case 'own':
      case 'all':
        show('page_wall_posts');
        break;
      case 'postponed':
        show('page_postponed_posts');
        hide('wall_more_link');
        break;
      case 'suggested':
        show('page_suggested_posts');
        break;
      case 'search':
        show('page_search_posts');
        break;
    }
    // checkPageBlocks();
  },
  switchWall: function(el, ev, type) {
    if (ev && checkEvent(ev)) return true;
    var cnts = {all: 0, own: 0}, sw = ge('page_wall_switch');
    if (ge('page_wall_count_all')) cnts.all = intval(ge('page_wall_count_all').value);
    if (ge('page_wall_count_own')) cnts.own = intval(ge('page_wall_count_own').value);
    if (!type) {
      type = (cur.wallType == 'own') ? 'all' : 'own';
    }
    if (ev && ev.type == 'click' && ev.clientX && ev.offsetX && cur.wallTab == type && cur.wallType == type) {
      return nav.go(el, ev);
    }
    if ((!cnts.own/* || cnts.own >= cnts.all*/) && inArray(cur.wallTab, ['all', 'own'])) {
      return cancelEvent(ev);
    }
    if (cur.wallTab == 'postponed') {
      wall.checkPostponedCount();
    }
    replaceClass('page_wall_posts', cur.wallType, type);
    cur.wallType = type;
    Wall.update();
    uiTabs.switchTab(el);
    uiTabs.hideProgress(el);
    wall.switchTabContent(type);
    cur.wallTab = type;
    return cancelEvent(ev);
  },
  showSuggested: function(el, ev, rows, notAll) {
    if (ev && checkEvent(ev)) return true;
    if (!cur.oid) return false;

    uiTabs.switchTab(el);
    cur.wallTab = 'suggested';

    if (rows !== undefined) {
      wall.suggestLoaded(rows, notAll);
    } else {
      if (cur.suggestedLoading) return false;
      var cur_oid = cur.suggestedLoading = cur.oid
      uiTabs.showProgress(el);
      ajax.post('al_wall.php', {act: 'get_suggests', owner_id: cur.oid}, {
        onDone: function(rows, notAll) {
          cur.suggestedLoading = false;
          uiTabs.hideProgress(el);
          if (cur_oid !== cur.oid) return;
          if (cur.wallTab != 'suggested') return;
          wall.suggestLoaded.apply(window, arguments);
        }
      });
    }
    return false;
  },
  suggestLoaded: function(rows, notAll) {
    val('page_suggested_posts', rows);
    toggle('wall_more_link', notAll);
    wall.switchTabContent('suggested');
  },
  suggestMore: function() {
    var cont = ge('page_suggested_posts'), more = ge('wall_more_link');
    if (buttonLocked(more)) return;

    ajax.post('al_wall.php', {
      act: 'get_suggests',
      owner_id: cur.oid,
      offset: geByClass('post', cont).length - geByClass('dld', cont).length
    }, {
      onDone: function(rows, notAll) {
        var el = ce('div', {innerHTML: rows}), fc = domFC(el);
        while (fc) {
          if (ge(fc.id) || !hasClass(fc, 'post')) {
            re(fc);
          } else {
            cont.appendChild(fc);
          }
          fc = domFC(el);
        }
        toggle(more, notAll);
      },
      showProgress: lockButton.pbind(more),
      hideProgress: unlockButton.pbind(more)
    });
  },
  suggestUpdate: function(delta) {
    var c = ge('page_suggests_count'), v = intval(val(c));
    if (c && (delta === -1 || delta === 1)) val(c, v += delta);
  },
  suggestPublished: function(post, text) {
    if (cur.onepost) {
      return nav.go('/wall' + cur.oid);
    }

    Wall.suggestUpdate(-1);
    showDoneBox(text);
    cur.wallMyDeleted[post] = 1;

    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.recache(-1);
      FullWall.updateSummary(cur.pgCount);
    }

    if (!intval(val('page_suggests_count'))) {
      var wallMenu = ge('wall_rmenu');
      if (wallMenu) {
        geByClass1('ui_rmenu_item', wallMenu).click();
        hide(geByClass1('_wall_menu_suggested', wallMenu));
      } else if (ge('wall_tabs')) {
        geByClass1('ui_tab', ge('wall_tabs')).click();
        hide('page_wall_suggest');
      }
    } else {
      re('post' + post);
    }
  },
  showPostponedFull: function(rows) {
    var menu = ge('ui_rmenu_postponed'),
        cont = ge('page_wall_posts');
    if (!menu || !hasClass(menu, 'ui_rmenu_item_sel') || !cont) {
      var nloc = {
        0: nav.objLoc[0],
        postponed: 1
      };
      return nav.go(nloc);
    }

    val(cont, rows);
    FullWall.updateSummary(geByClass('post', cont).length);
  },
  showPostponed: function(el, ev, rows) {
    if (ev && checkEvent(ev)) return true;
    if (!cur.oid) return false;

    uiTabs.switchTab(el);
    cur.wallTab = 'postponed';

    if (rows !== undefined) {
      Wall.postponedLoaded(rows);
    } else {
      if (cur.postponedLoading) return false;
      var cur_oid = cur.postponedLoading = cur.oid;
      uiTabs.showProgress(el);
      ajax.post('al_wall.php', {act: 'get_postponed', owner_id: cur.oid}, {
        onDone: function (rows) {
          cur.postponedLoading = false;
          uiTabs.hideProgress(el);
          if (cur_oid !== cur.oid) return;
          if (cur.wallTab != 'postponed') return;
          Wall.postponedLoaded(rows);
        }
      });
    }
    return false;
  },
  postponedLoaded: function(rows) {
    val('page_postponed_posts', rows);
    wall.postponeUpdateCount();
    wall.switchTabContent('postponed');
  },
  postponeUpdateCount: function() {
    var wrapEl = ge('page_postponed_posts'),
        countEl = ge('page_wall_postponed_cnt'),
        count = wrapEl && geByClass('post', wrapEl).length || 0;
    if (!wrapEl || !countEl) return;

    val(countEl, count ? langNumeric(count, '%s', true) : '');
  },
  checkPostponedCount: function() {
    var posts = geByClass('post', 'page_postponed_posts'), postponedCnt = 0;
    each(posts, function() {
      var postId = this.id.replace('post', '');
      if (!cur.wallMyDeleted[postId]) {
        postponedCnt++;
      }
    });
    if (!postponedCnt) {
      hide('page_wall_postponed');
    }
  },
  postponedPublished: function(post, text) {
    if (cur.onepost) {
      return nav.go('/wall' + cur.oid);
    }

    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.recache(-1);
      FullWall.updateSummary(cur.pgCount);
    }

    text && showDoneBox(text);
    cur.wallMyDeleted[post] = 1;
    var posts = geByClass('post', ge('page_postponed_posts')),
        curPost = ge('post' + post);
    if (posts.length <= 1 && inArray(curPost, posts)) {
      var wallMenu = ge('wall_rmenu');
      if (wallMenu) {
        geByClass1('ui_rmenu_item', wallMenu).click();
        hide(geByClass1('_wall_menu_postponed', wallMenu));
      } else if (ge('wall_tabs')) {
        geByClass1('ui_tab', ge('wall_tabs')).click();
        hide('page_wall_postponed');
      }
    } else {
      re(curPost);
      wall.postponeUpdateCount();
    }
  },
  onWallSearchSend: function(el, value) {
    if (value) {
      Wall.showSearch(value, 0);
    } else {
      Wall.hideSearch();
    }
  },
  showSearch: function(query, offset) {
    if (cur.searchLoading && cur.searchLoading == query || !cur.oid) return false;
    var cur_oid = cur.oid;
    cur.wallQuery = cur.searchLoading = query;
    if (cur.wallTab != 'search') {
      cur.prevWallTab = cur.wallTab;
      cur.wallTab = 'search';
    }

    var more = ge('wall_more_link');
    ajax.post('al_wall.php', {act: 's', search: 1, q: query, owner_id: cur.oid, offset: offset, inline: 1}, {
      onDone: function (rows, newOffset, count) {
        if (cur_oid !== cur.oid) return;
        if (cur.wallTab != 'search') return;

        var postsEl = ge('page_search_posts');
        if (!offset) {
          val(postsEl, '');
        }
        postsEl.appendChild(cf(rows));
        wall.switchTabContent('search');

        toggle(more, newOffset < count);
        more.onclick = Wall.showSearch.pbind(query, newOffset);
      },
      showProgress: function() {
        uiSearch.showProgress('wall_search');
        offset && lockButton(more);
      },
      hideProgress: function() {
        cur.searchLoading = false;
        uiSearch.hideProgress('wall_search');
        offset && unlockButton(more);
      }
    });
    return false;
  },
  hideSearch: function() {
    delete cur.wallQuery;
    if (!cur.prevWallTab) return;

    cur.wallTab = cur.prevWallTab;
    cur.prevWallTab = false;
    wall.switchTabContent(cur.wallTab);
    wall.update();
  },
  publishPostponedPost: function(post, hash, from) {
    showFastBox(getLang('publish_postponed_title'), getLang('publish_postponed_confirm'), getLang('publish_postponed_btn'), function() {
      curBox().hide();
      ajax.post('al_wall.php', {act: 'publish_postponed', post: post, from: from, hash: hash}, {
        onDone: Wall.postponedPublished.pbind(post),
        showProgress: lockButton.pbind('wpe_publish' + post),
        hideProgress: unlockButton.pbind('wpe_publish' + post)
      });
    }, getLang('global_cancel'));
  },
  cmp: function(id1, id2) {
    var l1 = id1.length, l2 = id2.length;
    if (l1 < l2) {
      return -1;
    } else if (l1 > l2) {
      return 1;
    } else if (id1 < id2) {
      return -1;
    } else if (id1 > id2) {
      return 1;
    }
    return 0;
  },
  receive: function(rows, names) {
    var n = ce('div', {innerHTML: rows}), posts = ge('page_wall_posts'), revert = !!cur.options.revert;
    var current = (revert ? posts.firstChild : posts.lastChild), added = 0;
    for (el = (revert ? n.firstChild : n.lastChild); el; el = re(revert ? n.firstChild : n.lastChild)) {
      if (el.tagName.toLowerCase() == 'input') {
        var old = ge(el.id);
        if (old) {
          posts.replaceChild(el, old);
        }
        continue;
      }
      if (hasClass(el, 'post_fixed')) {
        continue;
      }
      while (current && current.tagName && current.tagName.toLowerCase() == 'div' && !hasClass(current, 'post_fixed') && Wall.cmp(current.id, el.id) < 0) {
        current = (revert ? current.nextSibling : current.previousSibling);
      }
      ++added;
      if (!current) {
        if (revert) {
          posts.appendChild(el);
        } else {
          posts.insertBefore(el, posts.firstChild);
        }
      } else if (!Wall.cmp(current.id, el.id)) {
        posts.replaceChild(el, current);
        current = el;
        --added;
      } else {
        if (revert) {
          posts.insertBefore(el, current);
        } else {
          posts.insertBefore(el, current.nextSibling);
        }
      }
      placeholderSetup(geByTag1('textarea', el), {fast: 1});
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.recache(added);
      FullWall.updateSummary(cur.pgCount);
    }
    Wall.update();
    extend(cur.options.reply_names, names);
    Wall.updateMentionsIndex();
  },
  showMore: function(offset) {
    if (cur.viewAsBox) return cur.viewAsBox();
    if (cur.wallLayer) return;
    if (cur.wallTab == 'suggested') return Wall.suggestMore();

    var type = cur.wallType,
        more = ge('wall_more_link'),
        tmp = cur.wallLoading = cur.oid;
    ajax.post('al_wall.php', {act: 'get_wall', owner_id: cur.oid, offset: offset, type: type, fixed: cur.options.fixed_post_id || ''}, {
      onDone: function (rows, names, videos) {
        if (tmp !== cur.oid) return;
        delete(cur.wallLoading);
        setTimeout(Wall.receive.pbind(rows, names), 0);
        if (cur.wallVideos) {
          each(videos, function(playlistId, playlist) {
            if (cur.wallVideos[playlistId]) {
              cur.wallVideos[playlistId].list = cur.wallVideos[playlistId].list.concat(playlist.list);
            }
          });
        }
      },
      showProgress: lockButton.pbind(more),
      hideProgress: unlockButton.pbind(more)
    });
  },
  checkTextLen: function(inp, warn, force) {
    var val =  trim(Emoji.editableVal(inp).replace(/\n\n\n+/g, '\n\n'));
    //var val = trim(inp.value).replace(/\n\n\n+/g, '\n\n');
    if (inp.lastLen === val.length && !force) return;

    var realLen = inp.lastLen = val.length,
        maxLen = (cur.options || {}).max_post_len || (window.mvcur || {}).maxReplyLength,
        brCount = realLen - val.replace(/\n/g, '').length;

    warn = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      show(warn);
      if (realLen > maxLen) {
        warn.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        warn.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        warn.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
    } else {
      hide(warn);
    }
  },
  checkPostLen: function(field, warn, val, force) {
    var pf = ge(field);
    val = trim(val).replace(/\n\n\n+/g, '\n\n');
    if (!pf || pf.lastLen === val.length && !force) return;
    var realLen = pf.lastLen = val.length, maxLen = cur.options.max_post_len;
    var brCount = realLen - val.replace(/\n/g, '').length;
    var pw = ge(warn);
    if (realLen > maxLen - 100 || brCount > 4) {
      if (realLen > maxLen) {
        pw.innerHTML = getLang('global_recommended_exceeded', realLen - maxLen);
      } else if (brCount > 4) {
        pw.innerHTML = getLang('global_recommended_lines', brCount - 4);
      } else {
        pw.innerHTML = getLang('text_N_symbols_remain', maxLen - realLen);
      }
      show(pw);
    } else {
      hide(pw);
    }
  },
  postChanged: function(force) {
    if (!isVisible('submit_post') || !hasClass(ge('submit_post_box'), 'shown')) Wall.showEditPost();
    if (vk.id) {
      clearTimeout(cur.postAutosave);
      var saveCallback = (intval(cur.oid) == vk.id) ? Wall.saveDraft : Wall.saveOwnerDraftText.pbind(cur.oid);
      if (force === true) {
        saveCallback();
      } else {
        cur.postAutosave = setTimeout(saveCallback, (force === 10) ? 10 : 1000);
      }
    }
  },
  ownerDraftKey: function(ownerId) {
    return 'wall_draft' + vk.id + '_' + ownerId;
  },
  ownerDraftData: function() {
    if (!cur.wallDraftData) {
      cur.wallDraftData = {};
    }
    return cur.wallDraftData;
  },
  addOwnerDraftMedia: function(ownerId, info) {
    var data = Wall.ownerDraftData(),
        type = info[0],
        id = info[1],
        object = info[2];

    data._attach_cache = data._attach_cache || {};
    if (object) {
      data._attach_cache[type + id] = object;
    } else {
      object = data._attach_cache[type + id];
    }

    data.attaches = data.attaches || [];
    var lsAttaches = ls.get(Wall.ownerDraftKey(ownerId)) || {};
    if (type !== false) {
      data.attaches.push([type, id, object, data.attaches.length]);
    } else if (type === false && typeof(id) !== 'undefined') {
      data.attaches = data.attaches.filter(function (el) {
        return el[3] !== id;
      });
    }
    ls.set(Wall.ownerDraftKey(ownerId), extend(lsAttaches, {
      txt: clean(Wall.getDraftData().message || ''),
      medias: data.attaches
    }));
  },
  cleanOwnerDraftMedia: function(ownerId) {
    var data = Wall.ownerDraftData(),
        lsAttaches = ls.get(Wall.ownerDraftKey(ownerId)) || {};

    data.attaches = [];
    ls.set(Wall.ownerDraftKey(ownerId), extend({ txt: '' }, lsAttaches, { medias: [] }));
  },
  saveOwnerDraftText: function(ownerId) {
    var data = Wall.ownerDraftData(),
        lsText = ls.get(Wall.ownerDraftKey(ownerId)) || {},
        draftData = Wall.getDraftData(),
        content = clean(draftData.message || '');

    data.txt = content;
    each (lsText.medias || {}, function(i, v) {
      switch (v[0]) {
        case 'postpone':
          if (draftData.postpone) {
            lsText.medias[i][2].date = draftData.postpone;
            lsText.medias[i][2].draft = 1;
          }
        break;
        case 'poll':
        var pollData = (cur.wallAddMedia || {}).pollData(true);
        if (pollData) {
          var pollDraft = {edit: false, question: pollData.media, answers: []}, k = 0;
          if (pollData.anonymous) {
            pollDraft.anon = true;
          }
          while (pollData['answers[' + k + ']'] !== undefined) {
            pollDraft.answers.push([0, pollData['answers[' + k + ']']]);
            k++;
          }
          extend(lsText.medias[i][2], pollDraft);
        }
        break;
      }
    });
    extend(lsText, { txt: content });
    ls.set(Wall.ownerDraftKey(ownerId), lsText);
  },
  getOwnerDraft: function(ownerId) {
    var draft = ls.get(Wall.ownerDraftKey(ownerId)) || {}, res = [];
    return [draft.txt, draft.medias, true];
  },
  saveOwnerDraftMedia: function(ownerId, type, id, object) {
    Wall.cleanOwnerDraftMedia(ownerId);
    var addmedia = cur.wallAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.wallAddMedia ? addmedia.getMedias() : [],
        current = [],
        allmedia = medias.slice().map(function (el) {
      return el.slice(0, 2);
    });

    if (typeof id !== 'undefined' && type) {
      current = [[type, id, object]];
    } else if (!type && typeof id !== 'undefined') {
      allmedia.splice(id, 1);
    }

    allmedia = allmedia.concat(current);
    each (allmedia, function() {
      Wall.addOwnerDraftMedia(ownerId, this);
    });
  },
  saveDraft: function() {
    if (cur.noDraftSave) {
      cur.noDraftSave = false;
      return;
    }
    if (cur.postSent || vk.id != intval(cur.oid)) return;

    var params = Wall.getDraftData();
    if (params.delayed) {
      return;
    }
    ajax.post('al_wall.php', Wall.fixPostParams(extend({
      act: 'save_draft',
      hash: cur.options.post_hash
    }, params)), {onFail: function() {
      return true;
    }});
  },
  getDraftData: function() {
    var addmedia = cur.wallAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.wallAddMedia ? addmedia.getMedias() : [],
        share = (addmedia.shareData || {})
        msg = trim((window.Emoji ? Emoji.editableVal : val)(ge('post_field'))), attachI = 0,
        params = {message: msg};

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if (medias.length) {
      var ret = false;
      each (medias, function (k, v) {
        if (!v) return;

        var type = this[0], attachVal = this[1];
        switch (type) {
          case 'poll':
            var poll = addmedia.pollData(true);
            if (!poll) {
              params.delayed = true;
              return false;
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
          break;
          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                params.delayed = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = (share.user_id && share.photo_id) ? share.user_id + '_' + share.photo_id : '';
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            params = extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            var ts = val('postpone_date' + addmedia.lnkId);
            params = extend(params, {postpone: ts});
            return;
        }
        if (this[3] && trim(msg) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
    }

    return params;
  },
  setDraft: function(data) {
    if (!data[0] && (!data[1] || !data[1].length)) return;
    var field = ge('post_field');
    if (!field) return;

    Emoji.val(field, clean(replaceEntities(data[0] || '')).replace(/\n/g, '<br/>'));
    Wall.showEditPost(function() {
      setTimeout(function() {
        if (data[1] && cur.wallAddMedia) {
          for (var i in data[1]) {
            cur.noDraftSave = true;
            cur.wallAddMedia.chooseMedia.apply(cur.wallAddMedia, data[1][i]);
          }
        }
      }, 0);

    });
    if (data[2]) {
      wall.focusOnEnd();
    }
  },
  initPostEditable: function(draft) {
    var txt = cur.postField;
    if (!txt || txt.emojiInited) {
      return false;
    }
    txt.emojiInited = true;
    stManager.add(['emoji.js', 'notifier.css'], function() {
      Emoji.init(txt, {
        ttDiff: -42,
        rPointer: true,
        controlsCont: domPN(txt),
        noStickers: true,
        onSend: Wall.sendPost,
        noEnterSend: true,
        checkEditable: Wall.postChanged
      });
      addClass(txt, 'submit_post_inited')

      if (draft) {
        setTimeout(Wall.setDraft.pbind(draft), 0);
      }
    });
  },
  showEditPost: function(callback) {
    var input = ge('post_field');
    if (cur.viewAsBox) {
      setTimeout(function() { input.blur() }, 0);
      return cur.viewAsBox();
    }

    if (cur.editing === 0) return;

    setTimeout(function() {
      if (cur.withUpload) {
        if (!cur.uploadAdded) {
          cur.uploadAdded = true;
          if (!window.Upload) {
            stManager.add(['upload.js'], function() {
              WallUpload.init();
            });
          } else {
            WallUpload.init();
          }
        } else {
          WallUpload.show();
        }
      }
    }, 0);

    Wall.initComposer(input, {
      lang: {
        introText: getLang('profile_mention_start_typing'),
        noResult: getLang('profile_mention_not_found')
      },
      checkLen: Wall.postChanged,
      onValueChange: Wall.onPostValChange
    }, callback);

    Wall.hideEditPostReply();
    addClass('submit_post_box', 'shown');
    cur.editing = 0;
  },

  initComposer: function (input, options, callback) {
    if (!data(input, 'composer')) {
      if (!cur.composerAdded) {
        stManager.add(['wide_dd.css', 'wide_dd.js'], function() {
          cur.composerAdded = true;
          composer = Composer.init(input, options);
          callback && callback();
          cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
        });
      } else {
        composer = Composer.init(input, options);
        callback && callback();
        cur.destroy.push(Composer.destroy.bind(Composer).pbind(composer));
      }
    } else {
      callback && callback();
    }
  },
  deinitComposer: function (input) {
    var composer = data(input, 'composer');
    if (composer) {
      Composer.destroy(composer);
    }
    if (input.emojiId && window.Emoji) {
      Emoji.destroy(input.emojiId);
    }
  },
  hasComposerMedia: function (input) {
    var composer = input && data(input, 'composer');
    if (!composer || !composer.addMedia) {
      return false;
    }
    return composer.addMedia.attachCount() > 0;
  },
  composerListShown: function(input) {
    var composer = input && data(input, 'composer');
    if (!composer) return false;

    var controlEvent = composer.wdd, cnt = 0;
    for (var i in controlEvent.shown) {
      cnt += 1;
    }
    if (controlEvent && isVisible(controlEvent.listWrap) && cnt) {
      return true;
    }

    return false;
  },

  onPostValChange: function() {
    if (cur.wallAddMedia) {
      cur.wallAddMedia.checkMessageURLs.apply(window, arguments);
    }
    if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
      Pagination.pageTopUpdated();
    }
  },
  hideEditPost: function(force) {
    cur.editing = false;
    var rf = ge('post_field'),
        addmedia = cur.wallAddMedia || {},
        v = trim((window.Emoji ? Emoji.editableVal : val)(rf)),
        empty = true;

    if (browser.opera_mobile || !rf) return;
    if (!force && (v || addmedia.chosenMedia || (addmedia.attachCount && addmedia.attachCount() > 0))) return;
    removeClass('submit_post_box', 'shown');
    if (rf && !v) {
      if (cur.postMention) {
        cur.postMention.options.minHeight = cur.emptyPostheight || 14;
      }
    }
    cur.onWallSendCancel && cur.onWallSendCancel();
    window.WallUpload && WallUpload.hide();
    if (cur.wallAddMedia) {
      cur.wallAddMedia._hideAddMedia(true);
    }
  },
  clearInput: function() {
    show('page_add_media');

    var rf = ge('post_field');
    if (Wall.withMentions) {
      var mention = data(rf, 'mention');
      if (mention) {
        mention.rtaEl.innerHTML = '';
        hide(mention.cont);
        show(rf);
      }
    }
    val(rf, '');
    rf.blur();
    rf.phonblur();
    Wall.hideEditPost(true);
    if (cur.wallAddMedia) cur.wallAddMedia.unchooseMedia();
    checkbox('export_status', false);
  },
  fixPostParams: function (params) {
    var newParams = clone(params);
    newParams.Message = params.message;
    delete newParams.message;
    return newParams;
  },
  focusOnEnd: function() {
    var el = ge('post_field'),l = el.lastChild || el, len = l.innerHTML ? l.innerHTML.length : l.length;
    el.focus();
    if (document.selection) {
      var sel = document.selection.createRange();
      sel.moveStart('character', len);
      sel.select();
    } else {
      window.getSelection().collapse(l, len);
    }
  },
  saveExport: function(el, service, hash) {
    if (!isChecked('friends_only')) {
      checkbox(el);
    }

    cur.saveExportTO = cur.saveExportTO || {};
    clearTimeout(cur.saveExportTO[service]);
    cur.saveExportTO[service] = setTimeout(function() {
      ajax.post('/al_settings.php', {act: 'a_save_export', service: service, disabled: (isChecked(el) ? 0 : 1), hash: hash});
    }, 300);
  },
  sendPost: function() {
    var addmedia = cur.wallAddMedia || {},
        media = addmedia.chosenMedia || {},
        medias = cur.wallAddMedia ? addmedia.getMedias() : [],
        share = (addmedia.shareData || {})
        msg = trim((window.Emoji ? Emoji.editableVal : val)(ge('post_field'))),
        postponePost = false;

    var pType = cur.options.suggesting ? 'suggest' : cur.wallType, params = {
      act: 'post',
      message: msg,
      to_id: cur.postTo,
      type: pType,
      friends_only: isChecked('friends_only'),
      status_export: isChecked('status_export'),
      facebook_export: ge('facebook_export') ? (isChecked('facebook_export') ? 1 : 0) : '',
      official: isChecked('official'),
      signed: isChecked('signed'),
      hash: cur.options.post_hash,
      from: cur.from ? cur.from : '',
      fixed: cur.options.fixed_post_id || ''
    }, ownmsg = (cur.postTo == vk.id || params.official || cur.options.only_official), attachI = 0;

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    if (medias.length) {
      var ret = false;
      each (medias, function (k, v) {
        if (!v) return;
        var type = this[0], attachVal = this[1];
        switch (type) {
          case 'poll':
            var poll = addmedia.pollData();
            if (!poll) {
              ret = true;
              return false;
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
            break;
          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                ret = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = (!share.noPhoto && share.user_id && share.photo_id) ? share.user_id + '_' + share.photo_id : '';
            if (share.images && share.images.length && !share.share_own_image) {
              addmedia.uploadShare(Wall.sendPost);
              ret = true;
              return false;
            }
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            params = extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              mode: share.mode,
              photo_url: share.noPhoto ? '' : replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(msg) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            var ts = val('postpone_date' + addmedia.lnkId);
            params = extend(params, {postpone: ts});
            cur.postponedLastDate = ts;
            postponePost = true;
            return;
        }
        if (this[3] && trim(msg) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
      if (ret) {
        return;
      }
    }
    if (!attachI && !msg) {
      elfocus('post_field');
      return;
    }

    var sendBtn = ge('send_post');
    if (sendBtn && buttonLocked(sendBtn)) {
      return;
    }

    if (cur.postAutosave) {
      clearTimeout(cur.postAutosave);
    }
    hide('submit_post_error');

    cur.postSent = true;
    setTimeout(function() {
      ajax.post('al_wall.php', Wall.fixPostParams(params), {
        onDone: function(rows, names) {
          Wall.clearInput();
          cur.postSent = false;
          if (postponePost) {
            if (pType == 'feed') {
              showDoneBox(rows, {out: 3000});
            } else if (pType == 'full_own' || pType == 'full_all') {
              return Wall.showPostponedFull(rows);
            }
            show('page_wall_postponed');
            Wall.showPostponed(geByClass1('ui_tab', 'page_wall_postponed'), false, rows);
            if (ge('wall_tabs')) {
              removeClass(ge('wall_tabs'), 'page_tabs_hidden');
            }
            return;
          }
          if ((pType == 'full_own' || pType == 'full_all') && (cur.pgStart || nav.objLoc.postponed)) {
            var nloc = clone(nav.objLoc);
            delete(nloc.offset);
            delete(nloc.postponed);
            if (vk.id != cur.oid) {
              delete(nloc.own);
            }
            return nav.go(nloc);
          }
          if (vk.id != cur.oid && pType == 'full_own') {
            var nloc = clone(nav.objLoc);
            delete(nloc.own);
            return nav.go(nloc);
          }
          if (pType == 'feed') {
            return cur.wallPostCb();
          }
          if (pType == 'suggest') {
            show('page_wall_suggest');
            Wall.showSuggested(geByClass1('ui_tab', 'page_wall_suggest'), false, rows, names);
            return Wall.suggestUpdate();
          } else if (cur.wallTab == 'suggested') {
            Wall.showSuggested(geByClass1('ui_tab', ge('page_wall_suggest')));
          } else if (ge('wall_tabs')) {
            removeClass(ge('wall_tabs'), 'page_tabs_hidden');
            geByClass1('ui_tab', ge('wall_tabs')).click();
          }
          Wall.receive(rows, names);

          if (cur.onWallSendPost) {
            cur.onWallSendPost();
          }
        },
        onFail: function(msg) {
          cur.postSent = false;
          if (!msg) {
            return true;
          }
          ge('submit_post_error').innerHTML = msg;
          if (!isVisible('submit_post_error')) {
            slideDown('submit_post_error', 100);
          }
          return true;
        },
        showProgress: function() {
          lockButton(sendBtn);
        },
        hideProgress: function() {
          unlockButton(sendBtn);
        }
      });
    }, 0);
  },

  _repliesLoaded: function(post, hl, replies, names, data) {
    var r = ge('replies' + post);

    if (!r) return; // fixme: shortcut solution that prevents js error when clicking on name of replied person in comments

    var openEl = r.nextSibling;
    var a = vkNow();
    if (hl) {
      var h = r.offsetHeight;
      r.innerHTML = replies;
      scrollToY(scrollGetY() + (r.offsetHeight - h), 0, undefined, true);
      setTimeout(Wall.scrollHighlightReply.pbind('post' + hl), 0);
    } else {
      r.innerHTML = replies;
    }
    debugLog('render in', vkNow() - a);
    if (openEl && openEl.className == 'replies_open') {
      re(openEl);
    }

    ajax._framenext();

    if (post == cur.wallLayer) {
      var reverse = wkcur.reverse;
      extend(wkcur, {
        offset: !reverse && data.offset || 0,
        loaded: data.num || geByClass('reply', r, 'div').length,
        count: data.count
      });
      extend(wkcur.options.reply_names, names);
      WkView.wallUpdateReplies();
      if (!reverse) {
        wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
        WkView.wallUpdateRepliesOnScroll();
      }
    } else {
      extend(cur.options.reply_names, names);
      Wall.repliesSideSetup(post);
    }
    Wall.updateMentionsIndex();
    setTimeout(function() {
      getAudioPlayer().updateCurrentPlaying();
    }, 10);
  },
  repliesSideSetup: function (post) {
    if (cur.wallLayer == post) {
      WkView.wallUpdateReplies();
      return;
    }
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        h = r && r.offsetHeight || 0,
        ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight,
        side = ge('replies_side' + post);

    if (cur.wallMyOpened[post] && header) {
      if (!side) {
        var sideWrap = se('<div class="replies_side_wrap"><div id="replies_side' + post + '" class="replies_side"></div></div>')
        r.parentNode.insertBefore(sideWrap, r);
        side = sideWrap.firstChild;
        side.onclick = Wall.repliesSideClick.pbind(post);
        side.onmouseover = Wall.repliesSideOver.pbind(post);
        side.onmouseout = Wall.repliesSideOut.pbind(post);
      }
      show(side);
      r.onmouseover = Wall.repliesSideOver.pbind(post);
      r.onmouseout = Wall.repliesSideOut.pbind(post);
      Wall.repliesSideOver(post);
    } else {
      hide(side);
      r.onmouseover = null;
      r.onmouseout = null;
    }
  },
  repliesSideClick: function (post) {
    var postEl = ge('post' + post),
        r = ge('replies' + post),
        header = r && geByClass1('wr_header', r, 'a'),
        st = scrollGetY(),
        pos = getXY(r)[1];

    if (st > pos) {
      scrollToY(pos - 100, 0);
    }
    hide('replies_side' + post);
    return Wall.showReplies(post, 3, false);
  },
  repliesSideOver: function (post) {
    var r = ge('replies' + post),
        side = ge('replies_side' + post);

    var sideTop = getXY(domPN(side))[1],
        sideH = getSize(side)[1],
        repliesTop = getXY(r)[1],
        repliesH = r.offsetHeight,
        wh = window.lastWindowHeight || 0;

    var minOffset = 16,
        minSt = sideTop + sideH - wh + 15,
        maxSt = repliesTop + repliesH - wh;


    cur.wallRepliesSideOver = [
      post,
      side,
      minSt,
      maxSt
    ];
    Wall.repliesSideUpdate();
  },
  repliesSideOut: function (post) {
    if (cur.wallRepliesSideOver && cur.wallRepliesSideOver[0] == post) {
      delete cur.wallRepliesSideOver;
    }
  },

  repliesSideUpdate: function (st) {
    var postData = cur.wallRepliesSideOver;
    if (!postData) return;

    var side = postData[1],
        curStyle = postData[4] || {}, newStyle,
        curClass = postData[5] || '', newClass = 'replies_side';
    if (st === undefined) {
      st = scrollGetY();
    }
    if (st < postData[2]) {
      newStyle = {marginTop: 0, opacity: 1};
    } else if (st < postData[3]) {
      newClass += ' replies_side_fixed';
      newStyle = {opacity: Math.max(0, Math.min(1, (postData[3] - st) / 200))};
    } else {
      newClass += ' replies_side_hidden';
      newStyle = {marginTop: postData[3] - postData[2], opacity: 0};
    }
    if (JSON.stringify(curStyle) !== JSON.stringify(newStyle)) {
      each (curStyle, function(i, k) {
        curStyle[i] = null;
      });
      setStyle(side, extend(curStyle, newStyle));
      postData[4] = newStyle;
    }
    if (curClass != newClass) {
      side.className = newClass;
      postData[5] = newClass;
    }
  },
  highlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    addClass(el, 'reply_highlighted');
    setTimeout(function() {
      removeClass(el, 'reply_highlighted');
    }, 1500);
  },
  scrollHighlightReply: function(el) {
    el = ge(el);
    if (!el) return;

    var hlfunc = function() {
      addClass(el, 'reply_highlighted');
      setTimeout(function() {
        removeClass(el, 'reply_highlighted');
      }, 1500);
    };

    if (cur.wallLayer || el.id.match(/^post-?\d+(photo|video|market)?_\d+$/) && (window.wkcur && wkcur.shown || window.mvcur && mvcur.mvShown || cur.pvShown)) {
      var top = getXY(el, true)[1];
      if (top < 0 || top > lastWindowHeight - 200) {
        animate(wkLayerWrap, {scrollTop: wkLayerWrap.scrollTop + top - 50}, 300, Wall.highlightReply.pbind(el));
      } else {
        Wall.highlightReply(el);
      }
      return;
    }

    var xy = getXY(el), top = xy[1], st = scrollGetY() + getSize('page_header')[1];
    if (top < st) {
      scrollToY(top, 300);
      setTimeout(Wall.highlightReply.pbind(el), 300);
    } else {
      Wall.highlightReply(el);
    }
  },
  showReply: function(el, post, reply, ev) {
    if (cur.viewAsBox) return false;
    if (ev && checkEvent(ev)) return true;
    if (window.mvcur && mvcur.post == post) {
      Videoview.showComment(reply);
      return false;
    }
    var p = ge('post' + reply);
    if (p) {
      Wall.scrollHighlightReply(p);
    } else {
      if (cur.wallLayer == post) {
        WkView.wallShowPreviousReplies(reply);
      } else if (post.match(/market/)) {
        Market.comments(post);
      } else {
        el.tt && el.tt.hide && el.tt.hide();
        Wall.showReplies(post, false, reply);
      }
    }
    return false;
  },
  showReplies: function(post, count, hl, ev) {
    if (checkEvent(ev || window.event)) { return true; }
    if (cur.viewAsBox) return cur.viewAsBox();
    if (cur.wallLayer == post && wkcur.reverse) {
      return;
    }
    cur.wallMyOpened[post] = (count != 3);
    var params = {
      act: 'get_replies',
      post: post,
      count: count
    }, opts = {
      onDone: Wall._repliesLoaded.pbind(post, hl),
      showProgress: lockButton.pbind('wrh' + post),
      hideProgress: unlockButton.pbind('wrh' + post),
      local: 1
    };
    if (!hl && (!count || count > 20)) {
      extend(params, {cont: 'replies' + post});
      extend(opts, {frame: 1});
      cur.onFrameBlocksDone = /*vkLocal(*/function () {
        setTimeout(Wall.repliesSideSetup.pbind(post), browser.msie ? 100 : 10);
      }/*)*/
    }
    ajax.post('al_wall.php', params, opts);

    if (!browser.msie && count > 0 && count < 10) {
      var cont = ge('replies' + post), el = cont && cont.lastChild, slice = [];
      while (slice.length < count && el) {
        if (el.tagName == 'DIV' && hasClass(el, 'reply')) {
          slice.push(el);
        }
        el = el.previousSibling;
      }
      if (slice.length == count) {
        var total = geByClass('reply', cont, 'div').length;
        val(cont, '<a class="wr_header wrh_all"></a>');
        Wall.updateRepliesHeader(post, cont.firstChild, count, total);
        hide('replies_side' + post);
        while (slice.length) {
          cont.appendChild(slice.pop());
        }
        lockButton('wrh' + post);
      }
    }
    return false;
  },
  moreReplies: function(post, offset, count, opts) {
    var params = {act: 'get_replies', offset: offset, post: post, count: count};
    extend(params, {rev: opts.rev, from: opts.from});

    ajax.post('al_wall.php', params, {
      onDone: function(replies, names, data) {
        var r = ge('replies' + post);
        if (opts.clear) {
          // r.removeChild(r.firstChild); // remove header
          r.innerHTML = replies;
        } else if (opts.rev || opts.append) {
          r.appendChild(cf(replies))
        } else {
          // r.removeChild(r.firstChild); // remove header
          r.innerHTML = replies + r.innerHTML;
        }
        extend((post == cur.wallLayer ? wkcur : cur).options.reply_names, names);
        if (opts.onDone) {
          opts.onDone(replies, names, data);
        }
        Wall.updateMentionsIndex();
      },
      showProgress: opts.showProgress,
      hideProgress: opts.hideProgress
    });
    return false;
  },
  emojiOpts: {},
  getReplyName: function (id) {
    if (cur.pvShown && cur.pvReplyNames) {
      return cur.pvReplyNames[id] || [];
    }

    if (window.mvcur && mvcur.mvShown && !mvcur.minimized) {
      return mvcur.mvReplyNames[id] || [];
    }

    var data = {}, options, replyNames;

    if (cur.wallLayer) {
      data = wkcur;
    } else {
      data = cur;
    }

    replyNames = (data.options || {}).reply_names;
    replyNames = replyNames || {};

    return replyNames[id] || [];
  },
  emojiShowTT: function(post, obj, ev) {
    if (Wall.emojiOpts[post] === undefined) {
      return false;
    }
    return Emoji.ttShow(Wall.emojiOpts[post], obj, ev);
  },
  emojiHideTT: function(post, obj, ev) {
    if (Wall.emojiOpts[post] === undefined) {
      return false;
    }
    return Emoji.ttHide(Wall.emojiOpts[post], obj, ev);
  },
  initReplyEditable: function(txt, cont, post, fixed) {
    if (txt.emojiInited) {
      return false;
    }
    txt.emojiInited = true;
    stManager.add(['emoji.js', 'notifier.css'], function() {
      var optId = Emoji.init(txt, {
        ttDiff: fixed ? -40 : -42,
        rPointer: true,
        controlsCont: cont,
        shouldFocus: true,
        onSend: function() {
          Wall.sendReply(post);
          txt.blur();
        },
        ctrlSend: function() {
          return Wall.customCur().wallTpl.reply_multiline || Wall.composerListShown(txt);
        },
        //sharedTT: cur.sharedIm,
        checkEditable: Wall.checkTextLen.pbind(txt, 'reply_warn' + post),
        onStickerSend: function(stNum) {
          Wall.sendReply(post, false, {stickerId: stNum});
        }
      });
      Wall.emojiOpts[post] = optId;
      if (cur.afterEmojiInit && cur.afterEmojiInit[post]) {
        var sm = geByClass1('emoji_smile', Emoji.opts[optId].controlsCont);
        if (isVisible(sm)) {
          cur.afterEmojiInit[post]();
          delete cur.afterEmojiInit[post];
        }
      }
    });
  },
  showEditReply: function(post, ev, fixed) {
    if (cur.viewAsBox) {
      setTimeout(function() { ge('reply_field' + post).blur() }, 0);
      return cur.viewAsBox();
    }

    var rf = ge('reply_field' + post);
    var postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post);
    var fakeBox = ge('reply_fakebox' + post);
    var realBox = ge('reply_box' + post);
    var replyLink;

    if (!postEl && fakeBox) {
      postEl = gpeByClass('_post_wrap', fakeBox);
    } else if (!postEl && realBox) {
      postEl = gpeByClass('_post_wrap', realBox);
    }

    if (fakeBox) {
      var postHash = ge('post_hash' + post),
          canReplyAsGroup = intval(postHash && postHash.getAttribute('can_reply_as_group')) > 0,
          ownerPhoto = fakeBox.getAttribute('data-owner-photo') || (geByClass1('post_img', postEl) || {}).src || '';

      realBox = se(rs(cur.wallTpl.reply_form, {
        add_buttons: canReplyAsGroup ? rs(cur.wallTpl.reply_form_official, {
          post_id: post,
          owner_photo: ownerPhoto
        }) : '',
        post_id: post,
        owner_photo: ownerPhoto
      }));
      fakeBox.parentNode.replaceChild(realBox, fakeBox);
      rf = ge('reply_field' + post);
    }
    Wall.initReplyEditable(rf, realBox, post, fixed);
    if (cur.wallMyOpened) {
      cur.wallMyOpened[post] = false;
    }
    if (cur.editing === post) {
      Emoji.editableFocus(rf, false, true);
      return cancelEvent(ev);
    }
    Wall.hideEditPostReply();
    addClass(postEl, 'reply_box_open');
    setStyle('replies_wrap' + post, {display: ''});

    cur.editing = post;
    if (window.Emoji) {
      setTimeout(Emoji.editableFocus.pbind(rf, false, true), 0);
    }

    if (!data(rf, 'composer')) {
      var mediaTypes = [];
      var rawTypes;
      if (window.mvcur && mvcur.mvShown) {
        rawTypes = mvcur.mvMediaTypes;
      } else if (cur.wallLayer == post) {
        rawTypes = wkcur.options.rmedia_types;
      } else if (window.pvcur && cur.pvShown) {
        rawTypes = pvcur.rmedia_types;
      } else {
        rawTypes = cur.options.rmedia_types;
      }
      each (rawTypes || cur.options.media_types || [], function () {
        if (inArray(this[0], ['photo', 'video', 'audio', 'doc', 'link', 'page'])) {
          mediaTypes.push(this);
        }
      });
      var media;
      if (mediaTypes.length > 0 && post.match(/^-?\d+_(photo|video|topic|market)?\d+(mv)?$/)) {
        media = {
          lnk: ge('reply_add_media_' + post),
          preview: ge('reply_media_preview' + post),
          types: mediaTypes,
          options: {limit: 2, disabledTypes: ['album'], toggleLnk: true}
        };
        if (post.match(/^-?\d+_topic/)) {
          extend(media.options, {
            disabledTypes: ['album', 'share', 'link', 'page'],
            limit: 10,
            editable: 1,
            sortable: 1,
            teWidth: 280,
            teHeight: 200
          });
        }
      } else {
        re('reply_add_media_' + post);
      }
      Wall.initComposer(rf, {
        lang: {
          introText: getLang('profile_mention_start_typing'),
          noResult: getLang('profile_mention_not_found')
        },
        wddClass: 'reply_composer_dd',
        width: getSize(rf.parentNode)[0],
        media: media
      });
    }
    triggerEvent(window, 'scroll');
    if (rf.emojiId !== undefined && cur.afterEmojiInit && cur.afterEmojiInit[post]) {
      cur.afterEmojiInit[post]();
      delete cur.afterEmojiInit[post];
    }

    if (cur.wallTpl && cur.wallTpl.reply_multiline_intro) {
      ajax.post('al_wall.php', {act: 'a_ctrl_submit_intro', hash: cur.wallTpl.poll_hash}, {
        onDone: function (perform) {
          if (perform && cur.editing === post) {
            Wall.replySubmitTooltip(post, 1);
          }
        },
        onFail: function () {
          return true;
        }
      })
    }

    if (window.mvcur && mvcur.post == post) {
      Videoview.onShowEditReply();
    }

    if (cur.onReplyFormSizeUpdate && isFunction(cur.onReplyFormSizeUpdate)) {
      cur.onReplyFormSizeUpdate(rf);
    }

    return cancelEvent(ev);
  },
  hideEditReply: function(post, force) {
    cur.editing = false;

    var rf = ge('reply_field' + post),
        postEl = cur.wallLayer ? ge('wl_reply_form_inner') : ge('post' + post),
        realBox = ge('reply_box' + post),
        replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
        v = trim(window.Emoji ? Emoji.editableVal(rf) : ''),
        hasMedia = Wall.hasComposerMedia(rf),
        replyLink;
    if (!postEl && realBox) {
      postEl = gpeByClass('_post_wrap', realBox);
    }

    if (!rf || hasMedia && !force) return;
    if (replyName && isArray(replyName)) {
      if (!v || !replyName[1].indexOf(v)) {
        val(rf, '');
        v = '';
      }
    }
    if (force && v) {
      var composer = rf && data(rf, 'composer');
      if (composer) {
        Composer.reset(composer);
      } else {
        val(rf, '');
      }
      v = '';
    }
    if (browser.opera_mobile || browser.safari_mobile || v) return;

    removeClass(postEl, 'reply_box_open');
    if (replyLink = ge('reply_link' + post)) {
      hide('replies_wrap' + post);
    }
    rf.blur();
    triggerEvent(window, 'scroll');
    val('reply_to' + post, '');
    hide('reply_to_title' + post);
    cur.reply_to = false;

    cur.onReplyFormSizeUpdate && cur.onReplyFormSizeUpdate();

    var point = cur.replySubmitSettings;
    point && point.tt && point.tt.el && point.tt.destroy();

    if (window.mvcur && mvcur.post == post) {
      Videoview.onHideEditReply();
    }
  },
  replyNamesRE: function() {
    var names = ((cur.wallLayer ? wkcur : cur).options || {}).reply_names;
    if (!names) return false;
    var greetings = [];
    each(names, function() {
      greetings.push(escapeRE(this[1]));
    });
    return new RegExp('^(' + greetings.join('|') + ')');
  },
  replyTo: function(post, toMsgId, toId, event) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    Wall.showEditReply(post, event);
    val('reply_to' + post, toMsgId);
    var replyNameOld = cur.reply_to && Wall.getReplyName(cur.reply_to[0]);
    cur.reply_to = [toId, toMsgId];
    var replyName = Wall.getReplyName(toId);

    var replyAs = ge('reply_as_group' + post);
    var replyParts = post.match(/^(-?\d+)_([a-z]+)?(\d+)([a-z]+)?$/);
    var replyOid = replyParts[1];
    var replyType = replyParts[2] || '';
    var replyAt = replyParts[4] || '';
    var reply = ge('post' + replyOid + replyType + '_' + toMsgId);
    var replyTo = reply && geByClass1('reply_to', reply, 'a');
    var re = Wall.replyNamesRE();

    var replyNameFirst = isArray(replyName) ? replyName[0] : replyName;
    replyNameFirst = '<a class="reply_to_mem" onclick="return wall.showReply(this, \'' + post + '\', \'' + replyOid + replyType + '_' + toMsgId + replyAt + '\', event);">' + replyNameFirst + '</a>';
    var value = '<span class="reply_to_cancel" onclick="return Wall.cancelReplyTo(\'' + post + '\', event);"></span><div class="reply_to_label">' + langStr(getLang('global_reply_to'), 'user', replyNameFirst) + '</div>';
    val('reply_to_title' + post, value);

    if (isArray(replyName) && window.Emoji) {
      var rf = ge('reply_field' + post);
      var v = clean(trim(Emoji.val(rf)));
      v = v.replace(/&nbsp;/g, ' ');
      if (!v || replyNameOld && isArray(replyNameOld) && !winToUtf(replyNameOld[1]).indexOf(v)) {
        Emoji.val(rf, replyName[1]);
      } else if (re) {
        v = v.replace(re, replyName[1]);
        Emoji.val(rf, v);
      }
      Emoji.focus(rf, true);
    }
    show('reply_to_title' + post);

    toggleClass(replyAs, 'on', (replyAs && isVisible(replyAs.parentNode) && replyOid < 0 && replyTo && replyTo.getAttribute('rid') === replyOid) ? true : false);

    cur.onReplyFormSizeUpdate && cur.onReplyFormSizeUpdate();

    stopEvent(event);
    return false;
  },
  cancelReplyTo: function(post, event) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur,
        rf = ge('reply_field' + post),
        replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
        v = trim(window.Emoji ? Emoji.editableVal(rf) : ''),
        re = Wall.replyNamesRE();
    if (isArray(replyName) && window.Emoji) {
      if (!v || !replyName[1].indexOf(v)) {
        v = '';
        Emoji.val(rf, v);
      } else if (re) {
        v = v.replace(re, '');
        Emoji.val(rf, v);
      }
      Emoji.focus(rf, true);
    }
    val('reply_to' + post, '');
    hide('reply_to_title' + post);
    if (window.mvcur && mvcur.post == post) {
      mvcur.mvReplyTo = false;
    } else {
      cur.reply_to = false;
    }

    if (cur.onReplyFormSizeUpdate && isFunction(cur.onReplyFormSizeUpdate)) {
      cur.onReplyFormSizeUpdate(rf);
    }

    stopEvent(event);
    return false;
  },
  replySubmitTooltip: function (post, over, place) {
    var cur = post && window.cur.wallLayer == post ? wkcur : window.cur,
        box = post && ge('reply_box' + post),
        hintPlace = box && geByClass1('button_blue', box, 'div'),
        point = cur.replySubmitSettings;

    if (place && hintPlace && isVisible(hintPlace)) {
      return
    }
    place = place || hintPlace;
    if (hasClass(place, 'flat_button') && buttonLocked(place)) {
      return;
    }


    if (!point) {
      point = cur.replySubmitSettings = ce('div', {className: 'reply_submit_hint_tt_point'});
    }
    if (!over) {
      if (point && point.tt && point.tt.hide) {
        point.tt.hide();
      }
      return;
    }

    if (point.parentNode == place && point.tt && point.tt.show) {
      point.tt.show();
      return;
    }

    point.tt && point.tt.el && point.tt.destroy();
    place.insertBefore(point, place.firstChild);
    var ctrlSubmit = Wall.customCur().wallTpl.reply_multiline ? 1 : 0,
        hint = rs(Wall.customCur().wallTpl.reply_multiline_hint, {
      enabled: ctrlSubmit ? 'on' : '',
      disabled: !ctrlSubmit ? 'on' : ''
    });

    showTooltip(point, {
      text: hint,
      typeClass: 'tt_default_right',
      slide: 15,
      shift: [0, 8],
      asrtl: 1,
      hasover: 1,
      toup: false,
      showdt: 700,
      hidedt: 700,
      dir: 'auto',
      noZIndex: true,
      onCreate: function () {
        radioBtns.reply_submit = {
          els: Array.prototype.slice.apply(geByClass('radiobtn', ge('reply_submit_hint_opts'))),
          val: hint ? 1 : 0
        };
      }
    });
  },
  onReplySubmitChanged: function (value, from) {
    cur.wallTpl.reply_multiline = value;
    if (from) {
      var point = cur.replySubmitSettings;
      point && point.tt && point.tt.el && point.tt.destroy();
    } else {
      ajax.post('al_wall.php', {act: 'a_save_ctrl_submit', value: value, hash: cur.wallTpl.poll_hash})
      window.Notifier && Notifier.lcSend('wall_reply_multiline', {value: value});
    }
  },
  onReplySubmit: function (post, e) {
    var cur = window.cur.wallLayer == post ? wkcur : window.cur;
    var rf = ge('reply_field' + post);
    if (e.keyCode == KEY.RETURN || e.keyCode == 10) {
      var composer = data(rf, 'composer'),
          isListVisible = composer && composer.wdd && composer.wdd.listWrap && isVisible(composer.wdd.listWrap);

      if (Wall.customCur().wallTpl.reply_multiline && (e.ctrlKey || browser.mac && e.metaKey) ||
          !Wall.customCur().wallTpl.reply_multiline && !e.shiftKey && !(e.ctrlKey || browser.mac && e.metaKey) && !isListVisible) {
        Wall.sendReply(post);
        return cancelEvent(e);
      }
    }
    if (e.ctrlKey && e.keyCode == KEY.RETURN) {
      var v = val(rf),
          pos = Composer.getCursorPosition(rf);

      val(rf, v.substr(0, pos) + "\n" + v.substr(pos));
      elfocus(rf, pos + 1, pos + 1);

      rf.autosize.update();
      setTimeout(function () {
        rf.autosize.update();
      }, 0);
      return cancelEvent(e);
    }
  },
  sendReply: function(post, ev, options) {
    options = extend({}, options);

    if (window.mvcur && mvcur.post == post) {
      return Videoview.sendComment(post, ev, options.stickerId);
    }

    var wallLayer = (window.cur.wallLayer == post),
        cur = wallLayer ? wkcur : window.cur,
        rf = ge('reply_field' + post),
        composer = rf && data(rf, 'composer'),
        replyName = cur.reply_to && Wall.getReplyName(cur.reply_to[0]),
        state;

    var _send = rf && data(rf, 'send');
    if (_send && isFunction(_send)) {
      return _send(post, ev, options);
    }

    if (options.stickerId) {
      var params = {message: '', attach1_type: "sticker", attach1: options.stickerId};
    } else {
      var params = composer ? Composer.getSendParams(composer, Wall.sendReply.pbind(post)) : {message: trim(Emoji.editableVal(rf))};
      if (params.delayed) {
        return;
      }

      if (!params.attach1_type) {
        if (!params.message ||
            isArray(replyName) && !replyName[1].indexOf(params.message)) {
          Emoji.editableFocus(ge('reply_field' + post), false, true);
          return;
        }
      }

      if (composer) {
        state = Composer.reset(composer);
      } else if (window.Emoji) {
        Emoji.val(rf, '');
      }
      if (rf.autosize) {
        rf.autosize.update();
      }
    }

    cur.wallMyOpened = cur.wallMyOpened || {};

    cur.wallMyReplied[post] = 1;
    cur.wallMyOpened[post] = 1;
    var post_hash = ge('post_hash' + post) ? ge('post_hash' + post).value : cur.options.post_hash,
        fromGroupEl = ge('reply_as_group' + post),
        newEl = null;

    extend(params, {
      act: 'post',
      type: cur.wallType,
      reply_to: post,
      reply_to_msg: val('reply_to' + post),
      reply_to_user: cur.reply_to && cur.reply_to[0] || 0,
      start_id: val('start_reply' + post),
      from: wallLayer && 'wkview' || '',
      hash: post_hash
    });
    if (cur.reverse) {
      params.rev = 1;
    }
    if (fromGroupEl && isVisible(fromGroupEl.parentNode)) {
      params.from_group = isChecked(fromGroupEl); // else autodetect
    }

    if (browser.mobile) {
      Wall.hideEditReply(post);
    } else {
      Emoji.editableFocus(rf, false, true);
      Wall.cancelReplyTo(post, ev);
    }

    ajax.post('al_wall.php', Wall.fixPostParams(params), {
      onDone: function(reply, replies, names, data) {
        if (cur.wallType == 'full') {
          return FullWall.onReplySent.apply(window, arguments);
        }
        cur.wallMyReplied[post] = 0;
        re('reply_link' + post);
        hide('reply_warn' + post);
        Wall._repliesLoaded(post, false, replies, names, data);
      },
      onFail: function () {
        newEl && re(newEl);
        if (composer) {
          state = Composer.restore(composer, state);
        } else {
          val(rf, params.message);
        }
        if (rf.autosize) rf.autosize.update();
      },
      showProgress: lockButton.pbind(ge('reply_button' + post)),
      hideProgress: unlockButton.pbind(ge('reply_button' + post))
    });

    if (params.from_group || !params.message) return;

    var repliesEl = ge('replies' + post),
        replyId = -(++cur.wallMyRepliesCnt);

    var message = Emoji.emojiToHTML(clean(params.message), true),
        toName = params.reply_to_user < 0 ? getLang('wall_replied_to_group') : cur.options.reply_names[params.reply_to_user] && cur.options.reply_names[params.reply_to_user][0],
        toLnk = toName ? rs(cur.wallTpl.reply_link_to, {to_user: toName}) : '';
    newEl = se(rs(cur.wallTpl.reply_fast, {
      reply_id: '0_' + replyId,
      message: message.replace(/\n/g, '<br/>'),
      to_link: toLnk,
      date: Wall.getNowRelTime(cur)
    }));

    if (repliesEl && !isVisible(repliesEl) || ge('reply_link' + post)) {
      re('reply_link' + post);
      show('replies_wrap' + post);
    } else if (!cur.onepost) {
      var openEl = repliesEl.nextSibling;
      if (openEl && openEl.className == 'replies_open') {
        Wall.openNewComments(post);
      }
      if (!wallLayer) {
        var headerEl = geByClass1('wr_header', repliesEl, 'a'),
            shown = geByClass('reply', repliesEl, 'div').length + 1,
            total = shown;
        if (headerEl) {
          total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
        }
        if (total > 5 || shown < total) {
          if (!headerEl) {
            repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
          }
          Wall.updateRepliesHeader(post, headerEl, shown, total);
        }
      }
    }
    if (cur.reverse) {
      repliesEl.insertBefore(newEl, repliesEl.firstChild);
    } else {
      repliesEl.appendChild(newEl);
    }

    if (wallLayer) {
      WkView.wallUpdateReplies();
      if (!cur.reverse) {
        wkLayerWrap.scrollTop = wkLayerWrap.scrollHeight;
        WkView.wallUpdateRepliesOnScroll();
      }
    }
  },
  postTooltip: function(el, post, opts) {
    if (cur.viewAsBox) return;
    var reply = (opts || {}).reply,
        extraClass = (opts || {}).className || '',
        toRight = (reply && !(reply % 2)) && getXY(el)[0] > 420;

    showTooltip(el, {
      url: 'al_wall.php',
      params: extend({act: 'post_tt', post: post}, opts || {}),
      slide: 15,
      shift: [toRight ? 417 : 27, 6, 6],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      dir: 'auto',
      className: 'rich wall_tt' + extraClass,
      typeClass: (toRight ? 'tt_default_right' : 'tt_default')
    });
  },

  hideEditPostReply: function(e) {
    if (cur.editing === false || isVisible(boxLayerBG) || isVisible(layerBG)) return;
    var el = (e && e.target) ? e.target : {};
    var id = el.id;
    if (cur.editing) {
      if (cur.editingHide) {
        cur.editingHide(cur.editing, el);
      } else if (!e || !hasClass(el, 'reply_link') && id != 'reply_field' + cur.editing && el.className != 'reply_to_link') {
        Wall.hideEditReply(cur.editing);
      }
    } else if (!(cur.wallAddMedia || {}).chosenMedia) {
      if (!e || id != 'post_field') {
        Wall.hideEditPost();
      }
    }
  },
  deletePost: function(el, post, hash, root, force) {
    (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 1;
    var r = ge('post' + post),
        actionsWrap = geByClass1('post_actions', r);
    ajax.post('al_wall.php', {
      act: 'delete',
      post: post,
      hash: hash,
      root: root ? 1 : 0,
      confirm: force ? 1 : 0,
      from: 'wall'
    }, {
      onDone: function(msg, res, need_confirm) {
        if (need_confirm) {
          var box = showFastBox(msg, need_confirm, getLang('global_delete'), function() { box.hide(); wall.deletePost(el, post, hash, root, 1); }, getLang('box_cancel'));
          return;
        }
        var t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
        revertLastInlineVideo(t);
        var pd = ge('post_del' + post);
        if (pd) {
          pd.innerHTML = '<span class="dld_inner">' + msg + '</span>';
          show(pd);
        } else {
          r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: '<span class="dld_inner">' + msg + '</span>'}));
        }
        hide(t);
        if (domNS(t).className == 'post_publish') hide(domNS(t));
        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(-1);
          FullWall.updateSummary(cur.pgCount);
        } else if (cur.wallType == 'full') {
          if (hasClass(r, 'reply')) {
            cur.pgOffset--;
            cur.pgCount--;
            FullWall.repliesSummary(cur.pgCount);
          }
        }

        if (hasClass(r, 'suggest')) {
          Wall.suggestUpdate(-1);
        } else if (hasClass(r, 'postponed')) {
        } else if (cur.wallType == 'own' || cur.wallType == 'all') {
          if (hasClass(r, 'own')) ++cur.deletedCnts.own;
          if (hasClass(r, 'all')) ++cur.deletedCnts.all;
          Wall.update();
        }
      },
      showProgress: function() {
        if (hasClass(el, 'ui_actions_menu_item')) {
          lockActionsMenuItem(el);
        } else if (hasClass(el, 'flat_button')) {
          lockButton(el);
        } else {
          addClass(actionsWrap, 'post_actions_progress');
        }
      },
      hideProgress: function() {
        if (hasClass(el, 'ui_actions_menu_item')) {
          unlockActionsMenuItem(el);
        } else if (hasClass(el, 'flat_button')) {
          unlockButton(el);
        } else {
          removeClass(actionsWrap, 'post_actions_progress');
        }
      }
    });
    var btn = ge('delete_post' + post), myReply;
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  markAsSpam: function(el, post, hash, inline) {
    ajax.post('al_wall.php', {
      act: 'spam',
      post: post,
      hash: hash,
      from: inline ? 'inline' : ''
    }, {
      onDone: function(msg, js) {
        if (inline) {
          domPN(el).replaceChild(ce('div', {innerHTML: msg}), el);
        } else {
          var r = ge('post' + post), t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
          revertLastInlineVideo(r);
          var pd = ge('post_del' + post);
          if (pd) {
            pd.innerHTML = '<span class="dld_inner">' + msg + '</span>';
            show(pd);
          } else {
            r.appendChild(ce('div', {id: 'post_del' + post, className: 'dld', innerHTML: '<span class="dld_inner">' + msg + '</span>'}));
          }
          hide(t);
        }
        if (js) {
          eval(js);
        }
      },
      showProgress: function() {
        if (el && hasClass(el, 'ui_actions_menu_item')) {
          lockActionsMenuItem(el);
        } else if (inline) {
          hide(el);
          show(domNS(el) || domPN(el).appendChild(ce('span', {className: 'progress_inline'})));
        }
      },
      hideProgress: function() {
        if (el && hasClass(el, 'ui_actions_menu_item')) {
          unlockActionsMenuItem(el);
        } else if (inline) {
          show(el);
          re(domNS(el));
        }
      } ,
      stat: ['privacy.js', 'privacy.css']
    });
    var btn = ge('delete_post' + post);
    if (btn && btn.tt && btn.tt.el) {
      btn.tt.destroy();
    }
  },
  restorePost: function(post, hash, root) {
    (cur.wallLayer ? wkcur : cur).wallMyDeleted[post] = 0;
    ajax.post('al_wall.php', {
      act: 'restore',
      post: post,
      hash: hash,
      root: root ? 1 : 0
    }, {
      onDone: function(msg) {
        var pd = ge('post_del' + post);
        if (!pd) return;
        var r = ge('post' + post), t = geByClass1('_post_content', r) || geByClass1('feedback_row_t', r);
        show(t);
        if (domNS(t).className == 'post_publish') show(domNS(t));
        hide(pd);

        if (cur.wallType == 'full_own' || cur.wallType == 'full_all') {
          Pagination.recache(1);
          FullWall.updateSummary(cur.pgCount);
        } else if (cur.wallType == 'full') {
          if (hasClass(r, 'reply')) {
            cur.pgOffset++;
            cur.pgCount++;
            FullWall.repliesSummary(cur.pgCount);
          }
        }

        if (hasClass(r, 'suggest')) {
          Wall.suggestUpdate(1);
        } else if (hasClass(r, 'postponed')) {
        } else if (cur.wallType == 'own' || cur.wallType == 'all') {
          if (hasClass(r, 'own')) --cur.deletedCnts.own;
          if (hasClass(r, 'all')) --cur.deletedCnts.all;
          Wall.update();
        }
      }
    });
  },
  blockPostApp: function(aid, from, hash, obj) {
    ajax.post('al_wall.php', {act: 'block_post_app', aid: aid, from: from, hash: hash}, {
      onDone: function(text) {
        obj.parentNode.parentNode.innerHTML = text;
      },
      showProgress: lockButton.pbind(obj),
      hideProgress: unlockButton.pbind(obj)
    });
  },

  checkPostClick: function (el, event, allowDblclick) {
    event = event || window.event;
    if (!el || !event) return true;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /wall_post_text|published_comment|post_media|page_event_share|page_public_share|page_group_share|feed_friends|feed_videos|feed_explain_list|explain|feed_photos|feedback_row/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) ||
          inArray(target.className, ['play_new', 'page_video_inline_wrap']) ||
          (foundGood = target.className.match && target.className.match(classRE))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return false;
    }

    if (!cur.postClicked) cur.postClicked = {};
    if (!allowDblclick || !cur.postClicked[el]) {
      var sel = trim((
        window.getSelection && window.getSelection() ||
        document.getSelection && document.getSelection() ||
        document.selection && document.selection.createRange().text || ''
      ).toString());
      if (sel) {
        return false;
      }

      if (allowDblclick) {
        cur.postClicked[el] = true;
        setTimeout(function() {cur.postClicked[el] = false;}, 2000);
      }
    }
    return target || true;
  },
  postClick: function (post, event, opts) {
    var matches = (post || '').match(/^(-?\d+)_(wall)?(\d+)$/),
        el = ge('post' + post);
    if (opts && opts.skipCheck) {
      var clickEl = true;
    } else {
      var clickEl = Wall.checkPostClick(el, event);
    }
    if (!clickEl) return;

    if (clickEl !== true) {
      var moreLink = geByClass1('wall_post_more', clickEl, 'a');
      if (moreLink && isVisible(moreLink)) {
        moreLink.onclick();
        if (!matches) removeClass(el, 'wall_post_over');
        return;
      }
    }

    if (!matches) return;

    if (hasClass(el, 'suggest') || cur.onepost) return;
    var url = 'wall' + matches[1] + '_' + matches[3];
    if (browser.mobile && event) {
      nav.go(url);
    } else if (checkEvent(event)) {
      window.open(url, '_blank');
    } else {
      Wall.hideEditPostReply();
      Wall.postFull('wall' + matches[1] + '_' + matches[3], false, opts);
    }
  },
  postClickStat: function(event) {
    event = normEvent(event);
    var elem = event.currentTarget;
    var posts = [];
    if (elem.getAttribute('data-ad-view')) {
      posts.push(Wall.postsGetRaws(elem));
      Page.postsSeen(posts);
      __adsUpdateExternalStats(elem);
    }
  },
  copyHistory: function(ev, el, post, offset) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement,
        i = 8,
        foundGood = false,
        classRE = /published_a_quote/;
    do {
      if (!target ||
          (foundGood = target.className.match(classRE)) ||
          target.onclick ||
          target.onmousedown ||
          inArray(target.tagName, ['A', 'IMG'])
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) return;
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) return;

    ajax.post('al_wall.php', {act: 'copy_history', post: post, offset: offset}, {onDone: function(rows) {
      if (!domPN(el)) return;

      hide(el);
      if (!rows) return;

      var after = hasClass(domPN(el), 'published_by_quote') ? domPN(el) : el;
      domPN(after).insertBefore(cf(rows), domNS(after));
      if (isAncestor(after, 'im_rows')) {
        IM.updateScroll(true);
      } else if (isAncestor(after, 'wl_post')) {
        WkView.wallUpdateReplies();
      }
    }});

    return cancelEvent(ev);
  },
  postFull: function (post, event, opts) {
    if (post.match(/^wall-?\d+_\d+$/) && !(opts || {}).nolist) {
      switch (cur.wallType) {
        case 'all':
        case 'full_all':
          post += '/all';
          break;

        // case 'feed':
        //   if (cur.section == 'news') {
        //     post += '/feed';
        //   }
        //   break;
      }
    }
    return showWiki({w: post}, false, event, opts);
  },
  checkReplyClick: function (el, event) {
    event = event || window.event;
    if (!el || !event) return false;
    var target = event.target || event.srcElement,
        i = 8,
        foundGood = false,
        classRE = /reply_dived/;
    do {
      if (!target ||
          target == el ||
          target.onclick ||
          target.onmousedown ||
          target.tagName == 'A' && !hasClass(target, '_reply_lnk') ||
          inArray(target.tagName, ['IMG', 'TEXTAREA', 'EMBED', 'OBJECT']) && !hasClass(target, 'emoji') ||
          target.id == 'wpe_cont' ||
          (foundGood = hasClass(target, '_reply_content'))
      ) {
        break;
      }
    } while (i-- && (target = target.parentNode));
    if (!foundGood) {
      return true;
    }
    var sel = trim((
      window.getSelection && window.getSelection() ||
      document.getSelection && document.getSelection() ||
      document.selection && document.selection.createRange().text || ''
    ).toString());
    if (sel) {
      return true;
    }
    return false;
  },
  replyClick: function (post, reply, event, answering) {
    var oid_pid = post.split('_');
    var oid = intval(oid_pid[0]), pid_type = oid_pid[1].replace(/-?\d+$/, ''),
        el = ge('post' + oid + pid_type + '_' + reply);
    if (!cur.stickerClicked && Wall.checkReplyClick(el, event)) return;
    (event || {}).cancelBubble = true;

    var moreLink = geByClass1('wall_reply_more', el, 'a');
    if (moreLink && isVisible(moreLink)) {
      removeClass(el, 'reply_moreable');
      moreLink.onclick();
      return;
    }
    if (answering) {
      var productId = cur.stickerClicked || false,
          rf = ge('reply_field' + post);
      cur.stickerClicked = false;
      if (productId && (!rf || !rf.emojiInited)) {
        cur.afterEmojiInit = cur.afterEmojiInit || {};
        cur.afterEmojiInit[post] = function() {
          Emoji.clickSticker(productId, ge('reply_field' + post));
        };
      }
      Wall.replyTo(post, reply, answering, event);
      if (productId && rf && rf.emojiInited) {
        Emoji.clickSticker(productId, rf);
      }
    }
  },
  stickerClick: function(packId, obj, event) {
    (event || {}).cancelBubble = true;
    if (!window.Emoji) {
      stManager.add(['emoji.js', 'notifier.css'], function() {
        Wall.stickerClick(packId, obj);
      });
      return;
    }
    if (!obj) {
      Emoji.clickSticker(packId, false);
      return;
    }

    var en = Emoji.isStickerPackEnabled(packId, Wall.stickerClick.pbind(packId, obj));
    if (en === 0) {
      return;
    } else if (!en) {
      Emoji.clickSticker(packId, false);
    } else {
      var el = obj.parentNode,
          i = 8;
      do {
        if (!el || hasClass(el, 'reply')) {
          break;
        }
      } while (i-- && (el = el.parentNode));
      if (el && el.onclick) {
        cur.stickerClicked = packId;
        el.onclick();
      }
    }
  },

  domPost: function(post_id) {
    return ge('post' + post_id);
  },
  likeFullUpdate: function (el, like_obj, likeData) {
    var matches = like_obj.match(/^(wall|photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(-?\d+_)(\d+)/),
        post = matches ? (matches[2] + (matches[1] == 'wall' ? '' : matches[1]) + matches[3]) : like_obj;

    Wall.likeUpdate(el, post, likeData.like_my, likeData.like_num, likeData.like_title);
    Wall.likeShareUpdate(el, post, likeData.share_my, likeData.share_num, likeData.share_title);
  },
  likeUpdate: function(el, post_id, my, count, title, share) {
    count = intval(count);

    var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_type = matches[3] || 'wall',
        post_raw = matches[1] + '_' + matches[4],
        like_obj = like_type + post_raw;

    var post = el && gpeByClass('_post_content', el) || wall.domPost(post_raw),
        wrap = domByClass(post, share ? '_share_wrap' : '_like_wrap'),
        icon = domByClass(wrap, '_icon'),
        countNode = domByClass(wrap, '_count');
    if (!countNode) {
      return;
    }
    var tt = wrap.tt || {}, opts = clone(tt.opts || {});

    var countInput = domByClass(tt.container, '_value'),
        content = domByClass(tt.container, '_content'),
        titleNode = domByClass(tt.container, '_title');

    if (title && titleNode) {
      val(titleNode, title);
    }
    if (tt) {
      tt.likeInvalidated = true;
    }
    if (countInput) {
      countInput.value = count;
    }
    animateCount(countNode, count);

    toggleClass(wrap, share ? 'my_share' : 'my_like', my);
    toggleClass(wrap, share ? 'no_shares' : 'no_likes', !count);
    toggleClass(content, 'me_hidden', !my);
    if (count) {
      if (tt.el) {
        if (title === false) {
          tt.destroy && tt.destroy();
        } else if (!isVisible(tt.container) && !title && title !== false) {
          tooltips.show(tt.el, extend(opts, {showdt: 0}));
        }
      }
    } else {
      if (tt.el) tt.hide();
    }
  },
  likeShareUpdate: function (el, post_id, my, count, title) {
    return Wall.likeUpdate(el, post_id, my, count, title, true);
  },
  like: function(post_id, hash) {
    if (!vk.id || cur.viewAsBox) return;

    var post = wall.domPost(post_id),
        wrap = domByClass(post, '_like_wrap'),
        icon = domByClass(wrap, '_icon'),
        countNode = domByClass(wrap, '_count'),
        my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like'),
        matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        ref = cur.module;
    if (cur.wallType) {
      if (cur.wallType == 'feed') {
        ref = 'feed_' + ((cur.section == 'news' && cur.subsection) ? cur.subsection : cur.section)
      } else {
        ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'))
      }
    }

    ajax.post('like.php', {act: 'a_do_' + (my ? 'un' : '') + 'like', 'object': like_obj, hash: hash, wall: 2, from: ref}, {
      onDone: Wall.likeFullUpdate.pbind(false, post_id)
    });
    var count = val(ge('like_real_count_wall' + post_id) || countNode);
    Wall.likeUpdate(false, post_id, !my, intval(count) + (my ? -1 : 1));
    if (cur.onWallLike) {
      cur.onWallLike();
    }
  },
  likeShare: function(post_id, hash) {
    if (!vk.id || cur.viewAsBox) return;
    var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4],
        el = ge('like_share_' + like_obj), was = isChecked(el),
        ref = cur.wallType ? (cur.wallType == 'feed' ? 'feed_' + cur.section : ('wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page')))) : cur.module;

    checkbox(el);
    ajax.post('like.php', {act: 'a_do_' + (was ? 'un' : '') + 'publish', object: like_obj, hash: hash, wall: 2, ref: ref}, {
      onDone: Wall.likeFullUpdate.pbind(false, post_id)
    });
    var post = wall.domPost(post_id),
        wrap = domByClass(post, '_like_wrap'),
        icon = domByClass(wrap, '_icon'),
        count = val(ge('like_real_count_wall' + post_id) || domByClass(post, '_count')),
        my = hasClass(icon, 'fw_like_icon') ? hasClass(icon, 'fw_my_like') : hasClass(wrap, 'my_like');
    Wall.likeUpdate(false, post_id, true, intval(count) + (my ? 0 : 1));
  },
  likeShareCustom: function (post, params) {
    var matches = post.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/),
        like_obj = (matches[3] || 'wall') + matches[1] + '_' + matches[4];

    showBox('like.php', extend({act: 'publish_box', object: like_obj}, params));
  },
  likeShareCheckLen: function(inp, warn, maxLen) {
    inp = ge(inp);
    warn = ge(warn);
    maxLen = maxLen || 255;
    var v = trim(val(inp)).replace(/\n\n\n+/g, '\n\n');
    if (inp.lastLen === v.length) return;

    var realLen = inp.lastLen = v.length;
    var brCount = realLen - v.replace(/\n/g, '').length;


    if (realLen > maxLen - 50 || brCount > 4) {
      if (realLen > maxLen) {
        val(warn, getLang('text_exceeds_symbol_limit', realLen - maxLen));
      } else if (brCount > 4) {
        val(warn, getLang('global_recommended_lines', brCount - 4));
      } else {
        val(warn, getLang('text_N_symbols_remain', maxLen - realLen));
      }
      show(warn);
    } else {
      hide(warn);
    }
  },
  showLikesPage: function(like_obj, published, offset) {
    cur.likesBox.loadTabContent('like.php', {act: 'a_get_members', object: like_obj, published: published, offset: offset, wall: 1}, published);
  },
  clearLikesCache: function(like_obj, published) {
    var str = '^/like.php#' + ajx2q({act: 'a_get_members', object: like_obj, published: published, offset: 12345, wall: 1, tab: published, only_content: 1}).replace('12345', '\\d+') + '$',
        re = new RegExp(str, 'i');
    for (var i in ajaxCache) {
      if (re.test(i)) {
        delete(ajaxCache[i]);
      }
    }
  },
  showPhoto: function(to_id, ph, hash, el, ev) {
    return !showBox('al_photos.php', {act: 'photo_box', to_id: to_id, photo: ph, hash: hash}, {cache: 1}, el.href ? ev : false);
  },
  _animDelX: function(opacity, new_active, post, action) {
    return; // need to deprecate
  },
  domFC: function(el) {
    for (el = domFC(el); el && el.id.match(/page_wall_count_/);) {
      el = domNS(el);
    }
    return el;
  },
  domPS: function(el) {
    for (el = domPS(el); el && el.id.match(/page_wall_count_/);) {
      el = domPS(el);
    }
    return el;
  },
  scrollCheck: function (ev, st, noScrollToY) {
    var st = st == undefined ? scrollGetY() : st, top, ntop = 0, el, nel, bits, posts = [], ch = window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight;
    if (window.scrollAnimation) {
      return false;
    }
    Wall.repliesSideUpdate(st);
    if (cur.wallPage) {
      var rowsCont = (cur.wallTab == 'suggested') ? ge('page_suggested_posts') : ge('page_wall_posts');

      if (
        domPN(cur.topRow) != rowsCont ||
        ((cur.topRow || {}).id || '').match(/page_wall_count_/)
      ) {
        cur.topRow = Wall.domFC(rowsCont);
      }
      if (
        vk.id &&
        cur.topRow &&
        !cur.topRow.id.match(/page_wall_count_/) &&
        !((window.curNotifier || {}).idle_manager || {}).is_idle
      ) {
        postsUnseen = [];
        for (el = Wall.domPS(cur.topRow); el ; el = Wall.domPS(el)) {
          if (cur.topRow.offsetTop > st) cur.topRow = el;
          if (!el.unseen) {
            el.unseen = true;
            postsUnseen.push(Wall.postsGetRaws(el));
          }
        }
        Page.postsUnseen(postsUnseen);
        for (el = cur.topRow; el; el = nel) {
          top = ntop ? ntop : el.offsetTop;
          if (top >= st + ch) break;

          nel = domNS(el);
          if (((nel || {}).id || '').match(/page_wall_count_/)) nel = null;

          ntop = nel ? nel.offsetTop : top + el.offsetHeight;
          if (ntop < st && nel) cur.topRow = nel;

          bits = el.bits || 0;
          if (bits >= 3) continue;

          if (bits |= ((top >= st && top < st + ch) ? 1 : 0) | ((ntop >= st && ntop < st + ch) ? 2 : 0)) {
            el.bits = bits;
            if (bits == 3) {
              posts.push(Wall.postsGetRaws(el));
            }
          }
        }
        Page.postsSeen(posts);
      }
    }
    if (!cur.wallAutoMore || cur.wallLoading || cur.viewAsBox) return;
    el = ge('wall_more_link');
    if (!isVisible(el)) return;

    if (st + lastWindowHeight + 1500 > getXY(el)[1]) {
      el.onclick();
    }
  },
  postsGetRaws: function(el) {
    var index = indexOf(domPN(el).children, el);
    var m, res = {};
    if (!el) return res;

    res.module = cur.module;
    res.index = index;

    var dataAdView = el.getAttribute('data-ad-view');
    if (dataAdView) {
      res['ad_' + dataAdView] = 1;
    }

    if (!hasClass(el, 'own')) return res;

    if (m = el.id.match(/^post(-?\d+_\d+)$/)) {
      res[m[1]] = 1;
      if (m = (el.getAttribute('data-copy') || '').match(/^(-?\d+_\d+)$/)) {
        res[m[1]] = -1;
      }
    }
    return res;
  },
  pollVote: function(option, post, params, attachI) {
    if (cur.viewAsBox) return cur.viewAsBox();

    addClass(option, 'on');
    var progress = geByClass1('_poll_progress', option);
    ajax.post('widget_poll.php', extend(params, {
      act: 'a_vote',
      no_widget: 1,
      inline: 1,
      sid: post,
      i: attachI
    }), {
      onDone: function(html, script) {
        val('post_poll' + post, html);
        if (script) {
          eval(script);
        }
      },
      showProgress: showProgress.pbind(progress),
      hideProgress: hideProgress.pbind(progress)
    });
  },
  pollFull: function(v, post, e, opt) {
    stManager.add('wkpoll.js');
    return showWiki({w: 'poll' + post, opt_id: opt}, false, e, {queue: 1});
  },
  pollOver: function(el, post, opt) {
    showTooltip(el, {
      url: 'al_wall.php',
      params: {act: 'poll_opt_stats', post_raw: post, opt_id: opt},
      slide: 15,
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      dir: 'auto',
      typeClass: 'poll_tt',
    });
  },
  foTT: function(el, text, opts) {
    if (opts && opts.oid) {
      if (opts.oid == vk.id) {
        text = getLang('wall_my_friends_only');
      } else {
        text = val('wpfo' + opts.pid);
      }
    }
    showTitle(el, text);
  },
  update: function() {
    if (cur.wallLayer) {
      WkView.wallUpdateReplies();
      return;
    }
    if (cur.wallType != 'all' && cur.wallType != 'own' || cur.wallTab != 'all' && cur.wallTab != 'own') return;
    var cnts = {
      all: intval(val('page_wall_count_all')),
      own: intval(val('page_wall_count_own'))
    };
    var cnt = cnts[cur.wallType];
    if (cur.oid < 0 && cur.options['fixed_post_id']) {
      cnt -= 1;
    }
    if (cur.wallTab != 'suggested') {
      val('page_wall_posts_count', cnt ? langNumeric(cnt, cur.options.wall_counts) : cur.options.wall_no);
    }
    var morelnk = ge('wall_more_link'), del = intval(cur.deletedCnts[cur.wallType]), count = geByClass(cur.wallType, ge('page_wall_posts')).length - del;
    var checkCount = count;
    if (cur.options['fixed_post_id'] && cur.options['wall_oid'] < 0) {
      checkCount += 1;
    }
    if (checkCount >= cnts[cur.wallType] - del) {
      hide(morelnk);
    } else {
      show(morelnk);
      morelnk.onclick = Wall.showMore.pbind(count);
    }
    shortCurrency();
    if (cur.gifAutoplayScrollHandler) {
      cur.gifAutoplayScrollHandler();
    }
  },
  getAbsDate: function(ts, cur) {
    cur = cur || window.cur;
    var date = new Date(ts || vkNow()),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        ampm = '', numhours;
    if (cur.wallTpl.time_system) {
      ampm = cur.wallTpl.time_system[hours > 11 ? 1 : 0];
      hours = (hours % 12) || 12;
    }
    numhours = hours > 9 ? hours : ('0' + hours);
    minutes = minutes > 9 ? minutes : ('0' + minutes);
    return cur.wallTpl.date_format.replace('{am_pm}', ampm).replace('{hour}', hours).replace('{num_hour}', numhours).replace('{minute}', minutes);
  },
  getNowRelTime: function(cur) {
    cur = cur || window.cur;
    var ts = vkNow();
    return '<span class="rel_date rel_date_needs_update" time="' + intval(ts / 1000 - (cur.tsDiff || 0)) + '" abs_time="' + Wall.getAbsDate(ts, cur) + '">' + getLang('wall_just_now') + '</span>';
  },
  getNewPostHTML: function(ev, adminLevel, extendCb, cur) {
    cur = cur || window.cur;
    var acts = [],
        post_id = ev[2],
        oid = post_id.split('_')[0],
        reply_link = '',
        thumbs = ev[4].split('|'),
        repls;

    if (ev[8] == 1) {
      reply_link += cur.wallTpl.reply_link;
    } else if (oid != vk.id) {
      reply_link += cur.wallTpl.own_reply_link;
    }
    var nameStr = ev[3].replace('mem_link', 'author').replace('memLink', 'author');
    if (ev[6].indexOf('id="wpfo') != -1) {
      nameStr += '<span class="page_fronly inl_bl" onmouseover="Wall.foTT(this, false, {oid: \'' + oid + '\', pid: \'' + ev[2] + '\'})"></span>';
    }

    if (cur.wallTpl.custom_del && (adminLevel > (ev[9] == oid ? 1 : 0) || oid == vk.id || ev[9] == vk.id || ev[2].split('_')[0] != ev[4])) {
      acts.push(cur.wallTpl.custom_del);
    }
    if (adminLevel > (ev[9] == oid ? 1 : 0) || oid == vk.id || ev[9] == vk.id) {
      acts.push(cur.wallTpl.del);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam);
    }
    if (adminLevel > 1 && ev[9] == oid || oid == vk.id || ev[9] == vk.id) {
      acts.push(cur.wallTpl.edit);
    }

    repls = {
      oid: oid,
      name: nameStr,
      actions: acts.length ? rs(cur.wallTpl.post_actions, {actions: acts.join('')}) : '',
      replies: '',
      reply_link: reply_link,
      own_reply_link: cur.wallTpl.own_reply_link,
      reply_box: ev[8] == 1 ? cur.wallTpl.reply_box : '',
      photo: psr(thumbs[0]),
      link: ev[5],
      text: psr(ev[6]),
      date: Wall.getNowRelTime(cur),
      post_id: ev[2],
      poll_hash: cur.wallTpl.poll_hash,
      date_postfix: '',
      can_reply_as_group: (oid < 0 && adminLevel > 1) ? 1 : 0,
      post_url: '/wall' + post_id.replace('_wall_reply', '_'),
      owner_photo: psr(thumbs[1] || thumbs[0]),
      online_class: (oid > 0) ? ' online' : ''
    };
    extendCb && extend(repls, extendCb(repls, ev));
    return rs(rs(cur.wallTpl.post, repls), repls);
  },
  getNewReplyHTML: function (ev, adminLevel, extendCb, cur) {
    cur = cur || window.cur;
    var acts = [],
        can_reply = ge('reply_field' + ev[2]) || ge('reply_fakebox' + ev[2]) || ge('fwr_text'),
        className = '', answer = '',
        attr = '', toLnk = ev[10] ? (' ' + ev[10]) : '';

    if (adminLevel > 0 || !ev[2].indexOf(vk.id + '_') || ev[4] == vk.id) {
      acts.push(cur.wallTpl.del_reply);
    } else if (ev[2].split('_')[0] != ev[4]) {
      acts.push(cur.wallTpl.spam_reply);
    }
    if ((adminLevel > 1) && (ev[4] == intval(ev[2])) || ev[4] == vk.id) {
      acts.push(cur.wallTpl.edit_reply);
    }
    if (ev[8].indexOf('class="wall_reply_more"') != -1) {
      className += 'reply_moreable';
    }
    if (can_reply) {
      className += ' reply_replieable';
      answer = cur.wallTpl.reply_link_wrap;
      if (!cur.options.reply_names[ev[4]]) {
        cur.options.reply_names[ev[4]] = [ev[11], ev[12]]; // name link, name greeting
      }
    }
    if (className) {
      attr = ' onclick="Wall.replyClick(\'%post_id%\', %reply_msg_id%, event, %reply_uid%)"';
    }
    acts = rs(cur.wallTpl.reply_actions, {actions: acts.join('')});
    var repls = {
      name: ev[5].replace('mem_link', 'author'),
      photo: psr(ev[6]),
      link: ev[7],
      text: psr(ev[8]),
      classname: className,
      actions: acts,
      attr: attr,
      date: Wall.getNowRelTime(cur),
      to_link: toLnk,
      answer_link: answer,
      post_id: ev[2],
      reply_id: ev[3],
      like_id: ev[3].replace('_', '_wall_reply'),
      reply_msg_id: ev[3].split('_')[1],
      reply_uid: ev[4] || 'false'
    };
    extendCb && extend(repls, extendCb(repls));
    return rs(cur.wallTpl.reply, repls);
  },
  updatePostImages: function(html) {
    return html.replace(/<img[^>]+>/g, function(str) {
      if (str.match(/class=/)) {
        return str.replace('src=', 'data-src=').replace('class="', 'class="__need_img ');
      }
      return str;
    });
  },
  loadPostImages: function(container) {
    each (geByClass('__need_img', container, 'img'), function() {
      var src = this.getAttribute('data-src');
      if (src) {
        this.src = src;
        this.removeAttribute('data-src');
      }
      removeClass(this, '__need_img');
    });
  },
  openNewComments: function (post_raw) {
    var repliesEl = ge('replies' + post_raw),
        openEl = repliesEl.nextSibling,
        headerEl = geByClass1('wr_header', repliesEl, 'a'),
        newCnt = 0,
        shown = geByClass('reply', repliesEl, 'div').length,
        total = shown,
        newTotal = openEl.newCnt;
    Wall.loadPostImages(repliesEl);
    each (clone(geByClass('new_reply', repliesEl, 'div')), function () {
      removeClass(this, 'new_reply');
      nodeUpdated(this);
      newCnt++;
      if (newCnt == 100) return false;
    });
    if (headerEl) {
      total = newCnt + intval(headerEl.getAttribute('offs').split('/')[1]);
    }
    shown += - newTotal + newCnt;
    if (total > 3 || shown < total) {
      if (!headerEl) {
        repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
      }
      Wall.updateRepliesHeader(post_raw, headerEl, shown, total);
    }
    cur.wallMyOpened[post_raw] = 1;
    if (openEl && openEl.className == 'replies_open') {
      if (newTotal > 100) {
        openEl.innerHTML = getLang('news_x_new_replies_more', Math.min(100, newTotal - newCnt));
        openEl.newCnt -= newCnt;
      } else {
        re(openEl);
      }
    }
    Wall.repliesSideSetup(post_raw);
  },
  langWordNumeric: function(num, words, arr) {
    return langWordNumeric(num, words, arr);
  },
  updateTimes: function (cont) {
    if (!(cur.lang || {}).wall_X_seconds_ago_words) {
      return;
    }
    var timeNow = intval(vkNow() / 1000), toClean = [];
    timeNow -= cur.tsDiff;
    each(geByClass('rel_date_needs_update', cont || ge('page_wall_posts'), 'span'), function(k, v) {
      if (!v) return;
      var timeRow = intval(v.getAttribute('time')), diff = timeNow - timeRow, timeText = v.getAttribute('abs_time');
      if (diff < 5) {
        timeText = getLang('wall_just_now');
      } else if (diff < 60) {
        timeText = Wall.langWordNumeric(diff, cur.lang.wall_X_seconds_ago_words, cur.lang.wall_X_seconds_ago);
      } else if (diff < 3600) {
        timeText = Wall.langWordNumeric(intval(diff / 60), cur.lang.wall_X_minutes_ago_words, cur.lang.wall_X_minutes_ago);
      } else if (diff < 4 * 3600) {
        timeText = Wall.langWordNumeric(intval(diff / 3600), cur.lang.wall_X_hours_ago_words, cur.lang.wall_X_hours_ago);
      } else {
        toClean.push(v);
      }
      v.innerHTML = timeText;
    });
    each (toClean, function () {
      removeClass(this, 'rel_date_needs_update');
    });
  },

  updateRepliesHeader: function(post_raw, headerEl, shown, total) {
    if (cur.onepost) return;
    var headerText, href = headerEl.href, matches, showCount = 3, cls = 0;

    if (!href && (matches = post_raw.match(/^(-?\d+)_(photo|video|note|topic|video|)(\d+)$/))) {
      var type = matches[2] || 'wall';
      href = '/' + type + matches[1] + '_' + matches[3];
      switch (type) {
        case 'topic':
          href += '?offset=last&scroll=1';
          break;
        case 'wall':
          href += '?offset=last&f=replies';
          break;
      }
      headerEl.href = href;
    }
    if (total > shown) {
      if (shown < 100) {
        if (total > 100) {
          headerText = getLang('wall_show_n_of_m_last', 100);
          headerText = headerText.replace('{count}', total);
        } else {
          headerText = getLang('wall_show_all_n_replies', total);
        }
        showCount = false;
      } else {
        headerText = getLang('wall_hide_replies');
      }
    } else {
      headerText = getLang('wall_hide_replies');
      cls = 1;
    }
    toggleClass(headerEl, 'wrh_all', cls);
    headerEl.innerHTML = headerText;
    headerEl.onclick = Wall.showReplies.pbind(post_raw, showCount, false);
    headerEl.setAttribute('offs', shown + '/' + total);
  },

  updatePoll: function(post_raw) {
    if (!vk.id) return;
    ajax.post('al_wall.php', {act: 'post_poll', post_raw: post_raw}, {
      onDone: function (html) {
        if (html) {
          var pollWrapEl = ge('post_poll' + post_raw), pollTable = geByTag1('table', pollWrapEl);
          if (pollTable) {
            for (var i = 0; i < pollTable.rows.length; ++i) {
              var t = pollTable.rows[i].tt;
              if (t && t.destroy) t.destroy();
            }
          }
          val(pollWrapEl, html);
        }
      }, onFail: function() { return true; }
    });
  },

  updatePollResults: function (post_raw, newPollDataTxt) {
    var pollWrapEl = ge('post_poll' + post_raw),
        pollTable = geByTag1('table', pollWrapEl),
        pollRaw = val('post_poll_raw' + post_raw);

    if (!pollWrapEl) return;

    var newPollData = eval('(' + newPollDataTxt + ')'),
        totalVotes = 0,
        maxVotes = 0,
        pollStats = '';

    each (newPollData, function () {
      totalVotes += this[1];
      if (this[1] > maxVotes) {
        maxVotes = this[1];
      }
    });

    if (pollTable && pollRaw) {
      each (newPollData, function(i) {
        pollStats += rs(cur.wallTpl.poll_stats, {
          option_text: this[0],
          css_percent: totalVotes ? Math.round(this[1] * 100 / maxVotes) : 0,
          count: langNumeric(this[1], '%s', true),
          percent: totalVotes ? Math.round(this[1] * 1000 / totalVotes) / 10 : 0,
          handlers: val('post_poll_open' + post_raw) ? (' onmouseover="Wall.pollOver(this, \'' + post_raw + '\', ' + i + ')"') : '',
          row_class: ''
        });
      });
      for (var i = 0; i < pollTable.rows.length; ++i) {
        var t = pollTable.rows[i].tt;
        if (t && t.destroy) t.destroy();
      }
      val(pollTable, pollStats);
    }
    var codeLink = geByClass1('page_poll_code', pollWrapEl, 'a'), totalEl = geByClass1('page_poll_total', pollWrapEl);
    val(totalEl, langNumeric(totalVotes, cur.lang.wall_X_people_voted || '%', true));
    if (codeLink) totalEl.insertBefore(codeLink, domFC(totalEl));
  },

  updated: function (layer, key, data) {
    var cur = layer ? wkcur : window.cur;
    if (!cur.wallAddQueue || cur.wallAddQueue.key != key) {
      return;
    }
    if (data.failed) {
      cur.wallAddQueue = false;
      return;
    }
    cur.wallAddQueue.ts = data.ts;
    if (!isArray(data.events) || !data.events.length) {
      return;
    }

    var len = data.events.length,
        startST = layer ? wkLayerWrap.scrollTop : scrollGetY(),
        curST = startST,
        fullWall = !(cur.wallType || '').indexOf('full'),
        onepost = cur.onepost,
        layerpost = layer ? true : false,
        fixed = layer;

    if (fullWall && (nav.objLoc.q || nav.objLoc.search || nav.objLoc.day)) return;

    each(data.events, function () {
      var ev = this.split('<!>'),
          ev_ver = ev[0],
          ev_type = ev[1],
          post_id = ev[2],
          updH = 0,
          updY = 0,
          el = layer && window.cur.wallLayer == post_id && ge('wl_post_body'),
          mt = 15;

      if (!el || ev_type == 'del_reply') {
        el = ge('post' + post_id);
        if (!isAncestor(el, layer ? wkLayerWrap : pageNode)) {
          el = null;
        }
      }

      if (ev_ver != cur.options.qversion) {
        return;
      }
      switch (ev_type) {
        case 'new_post': {
          if (el) break;
          if (fullWall && cur.pgStart > 0) {
            cur.pgOffset++;
            break;
          }
          if (cur.oid == vk.id && vk.id == ev[9]) {
            if (window.curNotifier && curNotifier.idle_manager.is_idle) {
              Wall.clearInput();
            }
          }

          var cont = ge('page_wall_posts'),
              lastPost = cont.lastChild,
              extendCb = fullWall ? FullWall.addTetaTet : false,
              flgs = intval(ev[ev.length - 1]),
              adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
              newEl = se(Wall.getNewPostHTML(ev, adminLevel, extendCb, cur)),
              insBefore = cont.firstChild;

          if (ge('post' + post_id)) break;
          if (lastPost && lastPost != newEl) {
            re(lastPost);
          } else lastPost = false;
          if (!fullWall) {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            addClass(newEl, 'all');
            if (intval(ev[10])) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
              addClass(newEl, 'own');
            }
          } else if (!lastPost) {
            cur.pgOffset++;
          }
          while (insBefore && (insBefore.tagName == 'INPUT' || insBefore.nodeType != 1 || hasClass(insBefore, 'post_fixed'))) {
            insBefore = insBefore.nextSibling;
          }
          cont.insertBefore(newEl, insBefore);
          if (ge('post_poll_id' + post_id)) {
            Wall.updatePoll(post_id);
          }
          updH = newEl.offsetHeight + mt;
          updY = getXY(newEl, fixed)[1];
          nodeUpdated(newEl);
          Wall.updateMentionsIndex();
          break;
        }
        case 'edit_post': {
          var editEl = ge('wpt' + post_id);
          if (!isVisible(el) || !editEl) break;

          var wasExpanded = geByClass1('wall_post_more', editEl);
          if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

          updH = -editEl.offsetHeight;
          updY = getXY(editEl, fixed)[1];
          var text = psr(rs(ev[3], {
            poll_hash: cur.wallTpl.poll_hash
          }));
          val(editEl, text);
          if (wasExpanded) {
            wasExpanded = geByClass1('wall_post_more', editEl);
            if (wasExpanded) wasExpanded.onclick();
          }
          if (ge('post_poll_id' + post_id)) {
            Wall.updatePoll(post_id);
          }
          updH += editEl.offsetHeight;
          nodeUpdated(editEl);
          break;
        }
        case 'edit_reply': {
          var reply_id = ev[3],
              editEl = ge('wpt' + reply_id);
          if (!isVisible('post' + reply_id) || !editEl) break;

          var wasExpanded = geByClass1('wall_reply_more', editEl);
          if (wasExpanded) wasExpanded = isVisible(domNS(wasExpanded));

          updH = -editEl.offsetHeight;
          updY = getXY(editEl, fixed)[1];
          val(editEl, psr(ev[4]));
          if (wasExpanded) {
            wasExpanded = geByClass1('wall_reply_more', editEl);
            if (wasExpanded) wasExpanded.onclick();
          }
          updH += editEl.offsetHeight;
          nodeUpdated(editEl);
          break;
        }
        case 'post_parsed_link': {
          if (!el) break;
          var btnWrap = geByClass1('wall_postlink_preview_btn_disabled', el);
          if (!btnWrap) break;
          if (intval(ev[3])) {
            removeClass(btnWrap, 'wall_postlink_preview_btn_disabled');
          } else {
            re(btnWrap);
          }
          break;
        }
        case 'del_post': {
          if (!isVisible(el)) break;

          if (!cur.wallMyDeleted[post_id] && !onepost) {
            updH -= el.offsetHeight + mt;
            updY = getXY(el, fixed)[1];
            revertLastInlineVideo(el);
            addClass(el, 'unshown');
            if (!fullWall && !layerpost) {
              val('page_wall_count_all', intval(val('page_wall_count_all')) - 1);
              if (ev[3]) {
                val('page_wall_count_own', intval(val('page_wall_count_own')) - 1);
              }
            }
          }
          break;
        }
        case 'res_post': {
          if (!el || isVisible(el)) break;
          if (cur.wallRnd == ev[4]) removeClass(el, 'unshown');

          if (fullWall) {
            cur.pgOffset++;
          } else {
            val('page_wall_count_all', intval(val('page_wall_count_all')) + 1);
            if (ev[3]) {
              val('page_wall_count_own', intval(val('page_wall_count_own')) + 1);
            }
          }
          break;
        }
        case 'new_reply': {
          if (!el || cur.wallMyReplied[post_id] ||
              ge('post' + ev[3]) ||
              (onepost && cur.pgOffset < cur.pgCount) ||
              (layerpost && (!cur.reverse ? cur.offset + cur.loaded < cur.count : cur.offset))
          ) break;

          var repliesEl = ge('replies' + post_id),
              repliesWrap = ge('replies_wrap' + post_id),
              flgs = intval(ev[ev.length - 1]),
              adminLevel = cur.options.is_admin !== undefined ? cur.options.is_admin : (cur.options.wall_oid < 0 ? ((flgs & 8) ? 2 : ((flgs & 2) ? 1 : 0)) : 0),
              newEl = se(Wall.getNewReplyHTML(ev, adminLevel, false, cur)),
              highlight = false,
              startH = layerpost ? repliesEl.offsetHeight : el.offsetHeight;

          if ((!isVisible(repliesEl) || !isVisible(repliesWrap) || isVisible('reply_link' + post_id)) && !domClosest('wall_fixed', repliesWrap)) {
            re('reply_link' + post_id);
            show(repliesWrap, repliesEl);
            highlight = true;
          } else {
            var openEl = repliesEl.nextSibling, newCnt = geByClass('new_reply', repliesEl, 'div').length + 1;
            if (!layerpost && !onepost && !cur.wallMyOpened[post_id]) {
              addClass(newEl, 'new_reply');
              if (!openEl || openEl.className != 'replies_open') {
                openEl = ce('div', {className: 'replies_open', onclick: Wall.openNewComments.pbind(post_id)});
                repliesEl.parentNode.insertBefore(openEl, repliesEl.nextSibling);
              }
              openEl.innerHTML = getLang('wall_x_new_replies_more', Math.min(100, newCnt));
              openEl.newCnt = newCnt;
            } else if (!onepost) {
              if (openEl && openEl.className == 'replies_open') re(openEl);
              highlight = true;
              var headerEl = geByClass1('wr_header', repliesEl, 'a'),
                  shown = geByClass('reply', repliesEl, 'div').length + 1,
                  total = shown;
              if (headerEl) {
                total = intval(headerEl.getAttribute('offs').split('/')[1]) + 1;
              }
              if (total > 5 || shown < total) {
                if (!headerEl) {
                  repliesEl.insertBefore(headerEl = ce('a', {className: 'wr_header'}), repliesEl.firstChild);
                }
                Wall.updateRepliesHeader(post_id, headerEl, shown, total);
              }
            }
          }
          if ((layer ? cur.reverse : false) && repliesEl.firstChild) {
            repliesEl.insertBefore(newEl, repliesEl.firstChild);
          } else {
            repliesEl.appendChild(newEl);
          }
          if (highlight) {
            nodeUpdated(newEl);
          }
          if (layerpost) {
            cur.count++;
            cur.loaded++;
            WkView.wallUpdateReplies();
            updH = repliesEl.offsetHeight - startH;
            updY = getXY(newEl, fixed)[1];
          } else {
            if (onepost) {
              FullWall.repliesSummary(ev[13]);
              cur.pgOffset++;
              cur.pgCount++;
              FullWall.repliesSummary(cur.pgCount);
              Pagination.pageReady(false);
              FullWall.onePostOnScroll(false, false, true);
            }
            updH = el.offsetHeight - startH;
            updY = getXY(highlight ? newEl : openEl)[1];
            Wall.repliesSideSetup(post_id);
          }
          Wall.updateMentionsIndex();
          break;
        }
        case 'del_reply': {
          if (cur.wallMyDeleted[post_id] || !el) break;
          updH -= el.offsetHeight;
          updY = getXY(el, fixed)[1];
          revertLastInlineVideo(el);
          if (cur.layerpost) {
            hide(el);
            cur.count--;
            cur.loaded--;
          } else {
            if (onepost) {
              cur.pgOffset--;
              cur.pgCount--;
              FullWall.repliesSummary(cur.pgCount);
            }
            var post = el.parentNode.id.match(/replies(-?\d+_\d+)/);
            re(el);
            if (post) {
              Wall.repliesSideSetup(post[1]);
            }
          }
          break;
        }
        case 'like_post':
        case 'like_reply': {
          if (layer && post_id == window.cur.wallLayerLike) {
            if (window.WkView) {
              WkView.likeUpdate(hasClass(ge('wk_like_wrap'), 'my_like'), ev[3], false);
            }
            break;
          }

          if (!el) break;
          var likePost = (ev_type == 'like_reply' ? post_id.replace('_', '_wall_reply') : post_id),
              likeWrap = el && domByClass(el, '_like_wrap'),
              shareWrap = el && domByClass(el, '_share_wrap');

          wall.likeFullUpdate(likeWrap, likePost, {
            like_my: likeWrap && hasClass(likeWrap, 'my_like'),
            like_num: ev[3],
            like_title: false,
            share_my: shareWrap && hasClass(shareWrap, 'my_share'),
            share_num: ev[4],
            share_title: false
          });
          break;
        }
        case 'vote_poll': {
          if (!el) break;
          Wall.updatePollResults(post_id, ev[3]);
          break;
        }
        case 'upd_ci': {
          var info = ev[2],
              edit = ge('current_info'),
              el = edit || ge('page_current_info'),
              dataAudio = ' data-audio="' + ev[4] + '"';

          if (!el) {
            break;
          }
          switch (ev[3]) {
            case 'audio':
              var curCntEl = geByClass1('current_audio_cnt');
              if (curCntEl && curCntEl.tt) curCntEl.tt.hide();
              var ci_cnt = intval(ev[5] || ''),
                  ci_cnt_class = ci_cnt ? '' : ' hidden',
                  attr = dataAudio;
              if (!edit) {
                attr += ' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAudioTip + '\', black: 1, shift: [14, 5, 5]})" onclick="Page.playCurrent(this, this.getAttribute(\'data-audio\'), \'' + cur.options.ciAudioHash + '\')"';

              }
              info = rs(cur.options.ciAudioTpl, {
                text: info,
                attrs: attr,
                count: ci_cnt,
                cnt_class: ci_cnt_class
              });
              wall.updateOwnerStatus(info, el, ev, edit);
            break;

            case 'app':
              var shift = ev[6] ? '[12, 5, 5]' : '[15, 5, 5]', addCls = ev[6] ? ' current_app_icon' : '';
              var attr = edit ? (' onclick="cur.ciApp = ' + ev[4] + '"') : (' onmouseover="showTooltip(this, {forcetoup: true, text: \'' + cur.options.ciAppTip + '\', black: 1, shift: ' + shift + '})" href="' + ev[5] + '?ref=14" onclick="return showApp(event, ' + ev[4] + ', 1, 14, cur.oid)"');
              if (ev[6]) attr += ' style="background-image: url(\'' + ev[6] + '\')"';
              info = '<a class="current_app' + addCls + '"' + attr + '>' + info + '</a>';
              wall.updateOwnerStatus(info, el, ev, edit);
            break;

            default:
              stManager.add(['emoji.js'], function() {
                info = info ? ('<span class="current_text">' + Emoji.emojiToHTML(info, true) + '</span>') : info;
                wall.updateOwnerStatus(info, el, ev, edit);
              });
            break;
          }
          break;
        }
        case 'upd_ci_cnt': {
          var edit = ge('current_info'), cnt = intval(ev[2]), el = edit || ge('page_current_info'),
              cntEl = el && geByClass1('current_audio_cnt', el);
          if (cntEl) {
            if (cntEl.tt) {
              cntEl.tt.destroy();
            }
            toggleClass(cntEl, 'hidden', cnt == 0);
            animateCount(cntEl, cnt);
          }
          break;
        }
      }
      if (updH && (layer ? (updY < 0) : (curST + getSize('page_header_cont')[1] > updY))) {
        curST += updH;
      }
    });
    var endST = scrollGetY();
    if (curST != startST && startST > 100/* && Math.abs(startST - endST) > 100*/) {
      if (layer) {
        wkLayerWrap.scrollTop = curST;
      } else {
        scrollToY(curST, 0, false, true);
      }
    }
    Wall.update();
  },

  updateOwnerStatus: function(info, el, ev, edit) {
    if (edit) {
      var cls = info ? 'my_current_info' : 'no_current_info';
      info = '<span class="' + cls + '">' + (info || getLang('change_current_info')) + '</span>';
      val(el.parentNode.nextSibling, info);
      if (!isVisible('currinfo_editor') && cur.oid > 0) {
        toggle('currinfo_audio', ev[3] != 'app');
        toggle('currinfo_app', ev[3] == 'app');
        addClass('currinfo_app', 'on');
      }
    }
    val(el, info);
    // nodeUpdated(el.firstChild);
  },

  updateMentionsIndex: function (force) {
    clearTimeout(cur.wallUpdateMentionsIndexTO);
    if (!force) {
      cur.wallUpdateMentionsIndexTO = setTimeout(wall.updateMentionsIndex.pbind(true), 300);
      return;
    }

    var byHref = {},
        list = [],
        linkRe = new RegExp('^(https?://(vk\.com|' + location.host.replace(/\./, '\\.') + '))?\/?'),
        photoLinks = [];

    each (geByClass('author', bodyNode, 'a'), function () {
      var name = val(this), href = this.href.replace(linkRe, '');
      if (byHref[href] !== undefined) {
        return;
      }
      var // oidMatches = href.match(/^(id|club|event|public)(\d+)$/),
          oid = /*oidMatches ? (oidMatches[1] == 'id' ? oidMatches[2] : -oidMatches[2]) : */intval(this.getAttribute('data-from-id'));

      if (oid && oid != vk.id) {
        byHref[href] = list.length;
        list.push([oid, name, '@' + href, '/images/camera_c.gif']);
      }
    });

    photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('post_image', bodyNode, 'a')));
    photoLinks = photoLinks.concat(Array.prototype.slice.apply(geByClass('reply_image', bodyNode, 'a')));

    each (photoLinks, function () {
      var href = this.href.replace(linkRe, ''),
          listId = byHref[href];
      if (listId === undefined) {
        return;
      }

      var img = domFC(this);
      while (img && img.tagName != 'IMG') {
        img = domNS(img);
      }
      if (img) {
        list[listId][3] = img.getAttribute('src');
        delete byHref[href];
      }
    });
    cur.wallMentions = list;
  },

  initUpdates: function (key) {
    if (!key || !window.Notifier) {
      return;
    }
    var wasKey = cur.wallAddQueue,
        checkCb = function () {if (cur.wallAddQueue) Notifier.addKey(cur.wallAddQueue, Wall.updated.pbind(false));};

    cur.wallAddQueue = key;
    checkCb();
    if (!wasKey) {
      checkInt = setInterval(checkCb, 10000);
      cur.destroy.push(function () {clearInterval(checkInt)});
    }
  },

  initWallOptions: function (opts) {
    extend(cur, {
      wallType: opts.wall_type,
      wallTpl: opts.wall_tpl,
      wallMyDeleted: {},
      tsDiff: opts.wall_tpl && opts.wall_tpl.abs_timestamp ? Math.round((vkNow() / 1000 - opts.wall_tpl.abs_timestamp) / 900.0) * 900 : 0,
      wallMyOpened: {},
      wallMyReplied: {},
      wallMentions: [],
      wallMyRepliesCnt: 0
    });
    if (opts.wall_tpl && opts.wall_tpl.lang) {
      cur.lang = extend(cur.lang || {}, opts.wall_tpl.lang);
    }

    window.Notifier && Notifier.addRecvClbk('wall_reply_multiline', 'wall', function(data) {
      Wall.onReplySubmitChanged(data.value, 1);
    }, true);
  },

  init: function(opts) {
    Wall.initWallOptions(opts);

    extend(cur, {
      wallInited: true,
      postField: ge('post_field'),
      wallSearch: ge('wall_search'),
      wallPage: ge('profile') || ge('group') || ge('public'),
      wallPageNarrow: ge('narrow_column'),
      wallUploadOpts: opts.upload || false,
      deletedCnts: {own: 0, all: 0}
    });

    cur.destroy.push(function(c) {
      cleanElems(c.postField);
    });
    var rem = removeEvent.pbind(document, 'click', Wall.hideEditPostReply);

    if (cur._back) {
      cur._back.hide.push(rem);
      cur._back.show.push(rem);
      cur._back.show.push(addEvent.pbind(document, 'click', Wall.hideEditPostReply));
    } else {
      cur.destroy.push(rem);
    }
    var ownCnt = ge('page_wall_count_own');
    if (cur.wallType == 'own' && !intval(ownCnt && ownCnt.value)) {
      replaceClass('page_wall_posts', cur.wallType, 'all');
      cur.wallType = 'all';
      // checkPageBlocks();
    }
    cur.wallTab = cur.wallType;
    Wall.update();
    Wall.initUpdates(opts.add_queue_key);

    // Times update interval. For relative time correction
    if (opts.wall_tpl) {
      cur.timeUpdateInt = setInterval(function () {Wall.updateTimes(opts.wallCont);}, 10000);
      cur.destroy.push(function () {clearInterval(cur.timeUpdateInt);});
    }

    var scrollNode = window;
    addEvent(scrollNode, 'scroll', Wall.scrollCheck);
    addEvent(window, 'resize', Wall.scrollCheck);
    cur.destroy.push(function () {
      removeEvent(scrollNode, 'scroll', Wall.scrollCheck);
      removeEvent(window, 'resize', Wall.scrollCheck);
    });
    cur.wallAutoMore = opts.automore;

    Wall.initPostEditable(opts.draft || cur.oid != vk.id && Wall.getOwnerDraft(cur.oid));
    if (cur.wallSearch) {
      placeholderInit(cur.wallSearch);
    }

    removeEvent(document, 'click', Wall.hideEditPostReply);
    addEvent(document, 'click', Wall.hideEditPostReply);

    if (opts.media_types) {
      cur.wallAddMedia = new MediaSelector(ge('page_add_media'), 'media_preview', opts.media_types, extend({
        onAddMediaChange: function() {
          Wall.postChanged(10);

          if (cur.oid != vk.id) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(cur.oid);
            Wall.saveOwnerDraftMedia.apply(window, args);
          }
        }, onMediaChange: function() {
          Wall.postChanged();
        }, editable: 1, sortable: 1}, opts.media_opts || {})
      );
    }
    cur.withUpload = window.WallUpload && !browser.safari_mobile && (cur.wallType == 'all' || cur.wallType == 'own' || cur.wallType == 'feed') && Wall.withMentions && cur.wallUploadOpts;
    if (cur.withUpload && WallUpload.checkDragDrop()) {
      var clean = function () {
          removeEvent(document, 'dragover dragenter drop dragleave', cb);
        },
        cb = function (e) {
          if (dragtimer !== false) {
            clearTimeout(dragtimer);
            dragtimer = false;
          }
          if (cur.uploadInited) {
            clean();
            return cancelEvent(e);
          }
          switch (e.type) {
            case 'drop':
              started = false;
              delete cur.wallUploadFromDrag;
              hide('post_upload_dropbox');
              break;

            case 'dragleave':
              dragtimer = setTimeout(function () {
                started = false;
                delete cur.wallUploadFromDrag;
                hide('post_upload_dropbox');
              }, 100);
              break;

            case 'dragover':
            case 'dragenter':
              if (!started) {
                started = (e.target && (e.target.tagName == 'IMG' || e.target.tagName == 'A')) ? 1 : 2;
                if (started == 2) {
                  setTimeout(Wall.showEditPost, 0);
                }
              }
              if (started == 2) {
                cur.wallUploadFromDrag = 1;
              }
          }
          return cancelEvent(e);
        },
        started = false,
        dragtimer = false;
      addEvent(document, 'dragover dragenter drop dragleave', cb);
      cur.destroy.push(clean);
    }
    Wall.updateMentionsIndex();
  },
  switchOwner: function(obj) {
    toggleClass(geByClass1('_ui_toggler', obj), 'on');
    uiSearch.showProgress('wall_search');
    cur.options.params.owners_only = cur.options.params.owners_only ? null : 1;
    nav.change({owners_only: cur.options.params.owners_only, offset: null});
  },
  replyAsGroup: function(obj) {
    if (!hasClass(obj, 'checkbox_official')) return false;
    checkbox(obj);
    obj.tt && obj.tt.show && obj.tt.show();
    if (hasClass(obj, 'addpost_opt')) {
      toggleClass('signed', 'shown', isChecked(obj));
    }
  },
  replyAsGroupOver: function(obj, tt_user, tt_group) {
    if (!hasClass(obj, 'checkbox_official')) return false;
    var tt_func = function() { return hasClass(obj, 'on') ? tt_group : tt_user; },
        shift = hasClass(obj, 'addpost_opt') ? [8, 7] : [0, 8];
    showTooltip(obj, {text: tt_func, black: 1, shift: shift});
  },
  reportPost: function(obj, ev, postRaw) {
    stManager.add(['privacy.js', 'privacy.css'], function() {
      return Privacy.show(obj, ev, 'report_'+postRaw);
    });
  },

  parsePostId: function(post_id) {
    var matches = post_id.match(/(-?\d+)(_?)(photo|video|note|topic|market|wall_reply|note_reply|photo_comment|video_comment|topic_comment|market_comment|)(\d+)/);
    return {
      type: matches[3] || 'wall',
      id: matches[1] + '_' + matches[4]
    };
  },
  likeIt: function(el, post_id, hash, ev) {
    stopEvent(ev);
    if (!vk.id) return;
    if (cur.viewAsBox) {
      cur.viewAsBox();
      return cancelEvent(ev);
    }

    var p = wall.parsePostId(post_id),
        like_type = p.type,
        post_raw = p.id,
        postEl = el && gpeByClass('_post_content', el) || wall.domPost(post_raw),
        wrapEl = domByClass(postEl, '_like_wrap'),
        iconEl = domByClass(wrapEl, '_icon'),
        countEl = domByClass(wrapEl, '_count'),
        my = hasClass(wrapEl, 'my_like'), ref;

    if (cur.wallType) {
      if (cur.wallType == 'feed') {
        ref = 'feed_' + ((cur.section == 'news' && cur.subsection) ? cur.subsection : cur.section)
      } else {
        ref = 'wall_' + (cur.onepost ? 'one' : (!(cur.wallType || '').indexOf('full_') ? 'full' : 'page'))
      }
    } else {
      ref = cur.module;
    }

    ajax.post('like.php', {
      act: my ? 'a_do_unlike' : 'a_do_like',
      object: like_type + post_raw,
      hash: hash,
      wall: 2,
      from: ref
    }, {
      onDone: Wall.likeFullUpdate.pbind(el, post_id),
      onFail: function() {
        return true;
      }
    });
    var count = val(ge('like_real_count_wall' + post_id) || countEl);
    Wall.likeUpdate(el, post_id, !my, intval(count) + (my ? -1 : 1));
    if (cur.onWallLike) {
      cur.onWallLike();
    }
  },
  likesShow: function(el, post_id, opts) {
    opts = opts || {};
    var p = wall.parsePostId(post_id),
        like_type = p.type,
        post_raw = p.id,
        like_obj = like_type + post_raw,
        postEl = el && gpeByClass('_post_content', el) || wall.domPost(post_raw),
        wrapClass = opts.share ? '_share_wrap' : '_like_wrap',
        wrapEl = domByClass(postEl, wrapClass),
        iconEl = domByClass(wrapEl, '_icon'),
        hasShare = postEl && domByClass(postEl, '_share_wrap');
    if (!iconEl || cur.viewAsBox) return;

    var tt_offset = 41, // @likes-tt-corner-offset + 1
        wrap_left = getXY(wrapEl)[0],
        icon_left = getXY(iconEl)[0],
        icon_width = getSize(iconEl, true)[0],
        left_offset = icon_left + icon_width / 2 - wrap_left - tt_offset;

    showTooltip(iconEl.parentNode, {
      url: '/like.php',
      params: extend({act: 'a_get_stats', 'object': like_obj, has_share: hasShare ? 1 : ''}, opts.share ? {published: 1} : {}),
      slide: 15,
      shift: [-left_offset, like_type == 'wall_reply' ? -3 : 6],
      ajaxdt: 100,
      showdt: 400,
      hidedt: 200,
      dir: 'auto',
      checkLeft: true,
      reverseOffset: 80,
      tip: {
        over: function() {
          Wall.likesShow(el, post_id, opts);
        }
      },
      typeClass: 'like_tt',
      className: opts.cl || ''
    });
  },
  sharesShow: function (el, post_id, opts) {
    Wall.likesShow(el, post_id, extend(opts, {share: 1}));
  },
  sharesOpen: function (ev, post_id, params) {
    if (cur.viewAsBox) {
      cur.viewAsBox();
      return cancelEvent(ev);
    }
    if (!vk.id) return;

    stopEvent(ev);
    var p = wall.parsePostId(post_id),
        like_type = p.type,
        post_raw = p.id,
        like_obj = like_type + post_raw;
    showBox('/like.php', extend({act: 'publish_box', object: like_obj}, params));
  },
  customCur: function() {
    if (window.wkcur && wkcur.shown) return wkcur;
    if (window.mvcur && mvcur.mvShown) return mvcur;
    if (window.pvcur && cur.pvShown) return pvcur;
    return cur;
  }
}

var wall = Wall;

WallUpload = {
  photoUploaded: function(info, params) {
    var i = info.ind !== undefined ? info.ind : info,
        fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, ''),
        ind = info.fileName ? i + '_' + info.fileName : info,
        prg = ge('upload' + ind + '_progress_wrap');

    prg && hide(geByClass1('progress_x', prg));
    ajax.post('al_photos.php', extend({act: 'choose_uploaded'}, params), {
      onDone: function(media, data) {
        WallUpload.addMedia().chooseMedia('photo', media, extend(data, {upload_ind: i + '_' + fileName}));
      },
      onFail: WallUpload.uploadFailed.pbind(info)
    });
  },
  uploadFailed: function(info, code) {
    var i = info.ind !== undefined ? info.ind : info,
        fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
    if (Upload.types[i] == 'fileApi' && !Upload.options[i].wiki_editor) {
      var lnkId, ind = info.fileName ? i+'_'+info.fileName : info;
      if (cur.imMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = cur.imMedia.lnkId;
        cur.addMedia[lnkId].unchooseMedia();
      } else if (cur.addMedia) {
        re('upload'+ind+'_progress_wrap');
        lnkId = (cur.attachMediaIndexes || {})[fileName];
        if (lnkId) cur.addMedia[lnkId].unchooseMedia();
      }
    }
    // hide(box.progress);
    topError('Upload failed', {dt: -1, type: 102, url: (ge('file_uploader_form' + i) || {}).action});
    Upload.embed(i);
  },
  show: function () {
    if (!cur.uploadInited) return;
    var s = {};
    if (cur.wallType == 'feed') {
      removeClass(cur.uploadWrap, 'post_upload_min_wrap');
    } else {
      show(cur.uploadWrap);
    }
  },
  hide: function () {
    if (!cur.uploadInited) return;
    if (cur.wallType == 'feed') {
      addClass(cur.uploadWrap, 'post_upload_min_wrap');
    } else {
      hide(cur.uploadWrap);
    }
    hide('post_upload_dropbox');
  },
  addMedia: function() {
    return cur.dropboxAddMedia || cur.wallAddMedia;
  },
  attachToEl: function(el) {
    el = ge(el);
    var dropbox = ge('post_upload_dropbox');
    if (!el || !dropbox) {
      return false;
    }

    el.insertBefore(dropbox, domFC(el));
  },
  checkDragDrop: function() {
    var b = browser, bv = floatval(browser.version);
    if (!(b.msie && bv >= 9 || b.mozilla && bv >= 3.5 || b.chrome || b.safari)) { // Drag'n'Drop reqs
      return false;
    }
    return (window.XMLHttpRequest || window.XDomainRequest) &&
           (window.FormData || window.FileReader && (window.XMLHttpRequest && XMLHttpRequest.sendAsBinary ||  window.ArrayBuffer && window.Uint8Array && (window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder)));
  },
  init: function () {
    removeEvent(bodyNode, 'dragover dragenter');
    var data = cur.wallUploadOpts,
        field = ge('post_field');

    if (!WallUpload.checkDragDrop()) return;

    field.parentNode.insertBefore(cur.uploadWrap = ce('div', {
      className: 'post_upload_wrap fl_r',
      innerHTML: '<div id="post_field_upload" class="post_upload"></div>'
    }), field);
    var submitBox = ge('submit_post_box');
    submitBox.insertBefore(ce('div', {
      id: 'post_upload_dropbox',
      className: 'post_upload_dropbox',
      innerHTML: '<div class="post_upload_dropbox_inner"><div class="post_upload_label drop_label">' + (data.opts.lang.wall_drop_photos_here || 'Drop files here') + '</div><div class="post_upload_label release_label">' + (data.opts.lang.wall_release_photos_here || 'Release button to attach files') + '</div></div>'
    }), submitBox.firstChild);

    Upload.init('post_field_upload', data.url, data.params, {
      file_name: 'photo',
      file_size_limit: 1024 * 1024 * 5, // 5Mb
      file_types_description: 'Image files (*.jpg, *.jpeg, *.png, *.gif)',
      file_types: '*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF',
      file_input: null,
      accept: 'image/jpeg,image/png,image/gif',
      file_match:  data.opts.ext_re,
      lang: data.opts.lang,
      wiki_editor: 0,

      onUploadStart: function(info, res) {
        var i = info.ind !== undefined ? info.ind : info, options = Upload.options[i];
        if (Upload.types[i] == 'form') {
          // show(box.progress);
          geByClass1('file', ge('choose_photo_upload')).disabled = true;
        }
        if (Upload.types[i] == 'fileApi') {
          if (cur.notStarted) {
            boxQueue.hideLast();
            delete cur.notStarted;
          }
          if (options.multi_progress) this.onUploadProgress(info, 0, 0);
        }
      },
      onUploadComplete: function(info, res) {
        var params, i = info.ind !== undefined ? info.ind : info,
            fileName = (info.fileName ? info.fileName : info).replace(/[&<>"']/g, '');
        try {
          params = eval('(' + res + ')');
        } catch(e) {
          params = q2ajx(res);
        }
        if (!params.photos) {
          Upload.onUploadError(info);
          return;
        }
        WallUpload.photoUploaded(info, params);
      },
      onUploadProgress: function(info, bytesLoaded, bytesTotal) {
        var i = info.ind !== undefined ? info.ind : info;
        if (Upload.types[i] == 'fileApi') {
          var lnkId = (cur.attachMediaIndexes || {})[i];
          if (lnkId === undefined || lnkId && cur.addMedia[lnkId].chosenMedia || cur.imMedia) {
            var data = {loaded: bytesLoaded, total: bytesTotal};
            if (info.fileName) data.fileName = info.fileName.replace(/[&<>"']/g, '');
            WallUpload.addMedia().showMediaProgress('photo', i, data);
          }
        }
      },
      onUploadError: WallUpload.uploadFailed,
      onCheckServerFailed: function () {
        delete cur.uploadInited;
        WallUpload.hide();
      },
      onUploadCompleteAll: function (i) {
        if (Upload.types[i] == 'form') {
          Upload.embed(i);
        }
      },
      onDragEnter: function () {
        Wall.showEditPost();
      },

      noFlash: 1,
      multiple: 1,
      multi_progress: 1,
      max_files: 10,
      chooseBox: 1,
      clear: 1,
      type: 'photo',
      max_attempts: 3,
      server: data.opts.server,
      error: data.opts.default_error,
      error_hash: data.opts.error_hash,
      dropbox: 'post_upload_dropbox',
      label: data.opts.label,
      dragEl: bodyNode
    });
    cur.uploadInited = true;
    WallUpload.show();
    if (cur.wallUploadFromDrag) {
      if (cur.wallUploadFromDrag == 1) {
        show('post_upload_dropbox');
      }
      delete cur.wallUploadFromDrag;
    }
  }
};

function initCustomMedia(lnk, types, opts) {
  lnk = ge(lnk);
  if (!lnk) return false;

  opts = opts || {};

  if (!window.__addMediaIndex) __addMediaIndex = 0;
  var menuId = ++__addMediaIndex;

  if (opts.bgsprite) {
    var icons = opts.bgsprite;
  } else if (window.devicePixelRatio >= 2) {
    var icons = '/images/icons/attach_icons_2x.png?6';
    opts.bgSize = '20px 220px';
  } else {
    var icons = '/images/icons/attach_icons.png?6';
  }
  vkImage().src = icons;

  if (opts.tooltip) {
    var html = '<div class="rows"><div class="add_media_items"></div><div class="add_media_pointer"><div class="chats_sp add_media_pointer_icon"></div></div></div>';
  } else {
    var html = '<div class="rows"><div class="add_media_items"><div class="add_media_head noselect"><nobr>' + lnk.innerHTML + '</nobr></div></div></div>';
  }

  if (!window.customMenuNode) {
    window.customMenuNode = domFC(domFC(pageNode.appendChild(ce('div', {
      id: '',
      innerHTML: '<div class="scroll_fix" id="custom_menu_wrap" style="width:' + (lastInnerWidth - 1) + 'px"><div id="custom_menu_cont"></div></div>'
    }))));
  }
  var menuNode = ce('div', {
    id: 'add_media_menu_' + menuId,
    className: 'add_media_menu ' + (opts.menuNodeClass || ''),
    innerHTML: '<div class="add_media_rows">' + html + '</div>'
  }, {position: 'absolute'});
  var itemsNode = geByClass1('add_media_items', menuNode, 'div')
  customMenuNode.appendChild(menuNode);

  var reverseMargin = opts.reverseMargin || 25;
  var _hideTimer, mediaMenu = {
    id: menuId,
    fixed: -1,
    menuNode: menuNode,
    updateFixed: function(newVal) {
      if (mediaMenu.fixed != -1 && newVal != -1 && newVal !== undefined && mediaMenu.fixed == newVal) {
        return;
      }
      if (mediaMenu.fixed == -1 || newVal !== undefined) {
        if (newVal === undefined || newVal == -1) {
          var el = lnk;
          mediaMenu.fixed = false;
          while (el) {
            if (getStyle(el, 'position') == 'fixed') {
              mediaMenu.fixed = true;
              break;
            }
            el = el.offsetParent;
          }
        } else {
          mediaMenu.fixed = newVal;
        }
        if (mediaMenu.fixed) {
          setStyle(customMenuNode, {position: ''});
          addClass(customMenuNode, 'fixed');
        } else {
          setStyle(customMenuNode, {position: 'absolute'});
          removeClass(customMenuNode, 'fixed');
        }
        if (isVisible(menuNode)) {
          mediaMenu._updatePosition(true);
        }
      }
    },
    show: function(touched, ev) {
      clearTimeout(_hideTimer);
      if (menuNode && !isVisible(menuNode)) {
        lnk.blur();
        mediaMenu.updateFixed(-1);
        var h = mediaMenu._updatePosition(), el = menuNode.firstChild;

        if (browser.msie && browser.version < 9 || browser.mobile) {
          show(menuNode);
        } else {
          setStyle(el, {height: 26, overflow: 'hidden'});
          fadeIn(menuNode, 200);
          if (mediaMenu.reverse) {
            setStyle(el, {position: 'absolute', bottom: -reverseMargin, width: getSize(el.firstChild)[0]});
            setStyle(el.firstChild, {position: 'absolute', bottom: '0px'});
          }
          animate(el, {height: h - 2}, 200, function() {
            setStyle(el.firstChild, {position: 'relative', bottom: ''});
            setStyle(el, {height: '', overflow: '', position: 'static'});
          });
        }
        opts.onShow && opts.onShow();
      }
      if (touched === true) {
        mediaMenu.touched = true;
        clearTimeout(mediaMenu.toucht);
        removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
        mediaMenu.toucht = setTimeout(addEvent.pbind(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide), 500);
        return cancelEvent(ev);
      }
    },
    iecheckhide: function() {
      if (mediaMenu.touched) {
        setTimeout(mediaMenu.hide.pbind(true), 500);
      }
      clearTimeout(mediaMenu.toucht);
      removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
    },
    _updatePosition: function(visible) {
      var coords = getXY(lnk, mediaMenu.fixed),
          pointerShift = 0,
          xShift = opts.leftOffset || 0, yShift = opts.topOffset || 0,
          top = coords[1] + yShift - 4 + (browser.msie && browser.version < 8 ? 1 : 0);
      var rowsEl = menuNode.firstChild, more = geByClass1('add_media_more', menuNode);
      if (vk.rtl) {
        var right =
          lastInnerWidth - 4 // full screen width
           - coords[0] // lnk coords
           - 3 * getSize(lnk)[0] / 2 // 3/2 of lnk width
           + xShift // shift from options;
        if(right < 0) {
          pointerShift = -right;
          right = 0;
        }
        setStyle(menuNode, {right: right, top: top});
      } else {
        var left =
          coords[0]
          + xShift // shift from options
          - getSize(menuNode)[0]/2 // half of media menu width
          + getSize(lnk)[0]/2 // half of lnk
        if(left < 0) {
          pointerShift = left;
          left = 0;
        }
        setStyle(menuNode, {left: left, top: top});
      }

      // before we make it relative, fix 100% to prevent twitching
      setStyle(rowsEl.firstChild, { width: '100%' });
      setStyle(geByClass1('add_media_pointer', menuNode), {
        position: 'relative',
        left: pointerShift  + 'px'
      });

      // Showing to up in case of little widget height
      if (!visible) {
        setStyle(menuNode, {visibility: 'hidden', display: 'block'});
        if (more) {
          hide(more);
          show(more.nextSibling);
        }
      }
      var countSize = getSize(rowsEl), st = (mediaMenu.fixed ? 0 : scrollGetY()), size = countSize;
      if (!visible) {
        if (more) {
          show(more);
          hide(more.nextSibling);
          size = getSize(rowsEl);
        }
        setStyle(menuNode, {visibility: '', display: 'none'});
      }

      var needReverse = false;
      if (countSize[1] - reverseMargin < top - st && lastWindowHeight + st < top + countSize[1] || opts.forceUp) {
        setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
        if (!mediaMenu.reverse) needReverse = true;
      } else {
        setStyle(rowsEl, 'marginTop', -4);//(/mac/.test(_ua) && browser.mozilla ? 22 : 20));
        if (mediaMenu.reverse) needReverse = true;
      }
      if (needReverse) {
        var els = itemsNode.childNodes, len = els.length, el = (mediaMenu.moreWrap || {}).lastChild || {};
        while (len--) {
          itemsNode.appendChild(els[len]);
        }
        els = el.childNodes; len = (els || []).length;
        while (len--) {
          el.appendChild(els[len]);
        }
        mediaMenu.reverse = !mediaMenu.reverse;
        (mediaMenu.reverse ? addClass : removeClass)(menuNode, 'add_media_rev');
      }

      return size[1];
    },
    hide: function(noTimeout) {
      clearTimeout(_hideTimer);
      var hideFunc = (browser.msie && browser.version < 9 || browser.mobile) ? hide.pbind(menuNode) : fadeOut.pbind(menuNode, 100);
      if (noTimeout === true) {
        mediaMenu.touched = false;
        hideFunc();
      } else {
        if (mediaMenu.touched) return;
        _hideTimer = setTimeout(hideFunc, 300);
      }
      opts.onHide && opts.onHide();
    },
    setOptions: function (options) {
      each(options, function (k, v) {
        switch (k) {
          case 'bgsprite': vkImage().src = icons = v; break;
        }
      });
      extend(opts, options);
    },
    setItems: function(types) {
      for (var f = itemsNode.firstChild, l = itemsNode.lastChild; f != l; f = itemsNode.firstChild, l = itemsNode.lastChild) {
        itemsNode.removeChild(hasClass(f, 'add_media_head') ? l : f);
      }
      var test = '';
      var spec_style = (/mac/.test(_ua) && browser.mozilla) ? {height: 19} : {};

      var moreNode = false;
      var hideItem = opts.hideItem;
      var needHide = (hideItem || (types.length > 6)) && !browser.mobile;
      var hideLabel = hideItem && opts.hideLabel || getLang('global_add_media_more');

      mediaMenu.moreWrap = false;

      each(types, function(i, v) { // [id, name, bg-position, onclick, href, bg-url, customStyle]
        var attrs = {
          innerHTML: '<nobr>' + v[1].replace(/\s/g, '&nbsp;') + '</nobr>',
          className: 'add_media_type_' + menuId + '_' + v[0] + ' add_media_item'
        }, style = v[6] || {
          backgroundImage: 'url(' + (v[5] || icons) + ')',
          backgroundPosition: (v[2] || '0 0')
        }, row;
        if (!v[6] && opts.bgSize) {
          style.backgroundSize = opts.bgSize;
        }

        if (needHide && (hideItem ? v[0] == hideItem : i == 3)) {
          var rowsEl = menuNode.firstChild;
          var moreWrap = itemsNode.appendChild(ce('div', {
            className: "add_media_more_wrap"
          }));
          addEvent(moreWrap, 'mouseover click', function(ev) {
            if (ev.type == 'mouseover' && mediaMenu.touched) return;
            clearTimeout(mediaMenu.moreHide);
            if (isVisible(moreWrap.lastChild)) return;
            show(moreWrap.lastChild);
            hide(moreWrap.firstChild);
            if (!mediaMenu.reverse) return;
            var size = getSize(rowsEl);
            setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
          });
          addEvent(moreWrap, 'mouseout', function () {
            clearTimeout(mediaMenu.moreHide);
            mediaMenu.moreHide = setTimeout(function() {
              hide(moreWrap.lastChild);
              show(moreWrap.firstChild);
              if (!mediaMenu.reverse) return;
              var size = getSize(rowsEl);
              setStyle(rowsEl, 'marginTop', -size[1] + reverseMargin);
            }, 300);
          });
          row = moreWrap.appendChild(ce('a', {
            className: 'add_media_more add_media_item',
            innerHTML: '<nobr>' + hideLabel + '</nobr>'
          }));
          moreNode = ce('div', {
            className: 'add_media_more_node',
            innerHTML: '<div class="unshown"></div>'
          }, {
            display: 'none'
          });
          row = moreWrap.appendChild(moreNode);
          mediaMenu.moreWrap = moreWrap;
        }

        extend(style, spec_style);
        if (v[4]) {
          attrs.href = v[4];
        }

        row = (moreNode ? moreNode : itemsNode).appendChild(ce('a', attrs, style));
        if (v[3]) {
          addEvent(row, 'click', function () {
            mediaMenu.hide(true);
            if (opts.onItemClick && !opts.onItemClick(v[0])) {
              return false;
            }
            v[3]();
            return false;
          });
        }
      });
      if (opts.tooltip) {
        var pointerNode = geByClass1('add_media_pointer', menuNode);
        addEvent(itemsNode.firstChild, 'mouseover', function() {
          addClass(pointerNode, 'add_media_pointer_hover');
        });
        addEvent(itemsNode.firstChild, 'mouseout', function() {
          removeClass(pointerNode, 'add_media_pointer_hover');
        });
      }
    }
  };

  types && mediaMenu.setItems(types);

  if (browser.msie) {
    removeEvent(lnk, 'MSPointerDown'); // for ie10 touch
    addEvent(lnk, 'MSPointerDown', mediaMenu.show.pbind(true));
    addEvent(menuNode, 'MSPointerDown', mediaMenu.show.pbind(true));
  }

  removeEvent(lnk, 'mouseover');
  addEvent(lnk, 'mouseover click', mediaMenu.show);
  addEvent(lnk, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'mouseover', mediaMenu.show);
  addEvent(menuNode, 'mouseout', mediaMenu.hide);
  addEvent(menuNode, 'click', cancelEvent);
  addEvent(geByClass1('add_media_header', menuNode), 'click', function(e) {
    mediaMenu.show(true);
    cancelEvent(e);
  });

  if (!opts.global) {
    cur.destroy.push(function() {
      cleanElems(menuNode);
      re(menuNode);
      removeEvent(lnk, 'click', mediaMenu.show);
      if (browser.msie) {
        clearTimeout(mediaMenu.toucht);
        removeEvent(bodyNode, 'MSPointerDown', mediaMenu.iecheckhide);
      }
    });
  }

  return mediaMenu;
}

var urlActiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9�-����_\-]+\.)+(?:��|���|������|����|���))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i,
    urlInactiveExp = /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9�-����_\-]+\.)+(?:��|���|������|����|���))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i;

function extractUrls(text, inactive) {
  var rx = inactive ? urlInactiveExp : urlActiveExp,
    matches;

  var result = [];
  while (text && (matches = text.match(rx))) {
    text = text.substr(matches.index + matches[0].length);
    var offset = 0;
    if (!matches[4]) {
      offset = 7;
    }
    result.push({url: matches[2 + offset], query: matches[5 + offset] || '', domain: matches[4 + offset]});
  }

  return result;
}

function initAddMedia(lnk, previewId, mediaTypes, opts) {
  var types = [], bgposes = {graffiti: -152, video: -20, photo: 3, audio: -42, poll: -108, doc: -64, map: -86, note: -130, postpone: -173, gift: -196}, addMedia;
  opts = opts || {};
  each (mediaTypes || [], function (i, v) {
    if (!v[1]) return;
    var handler = false, toId = opts.toId || cur.postTo, params = {to_id: toId, scrollbar_width: sbWidth(), blockPersonal: opts.blockPersonal};
    params.mail_add = opts.mail ? 1 : '';
    switch (v[0]) {
      case 'graffiti':
          handler = showBox.pbind('al_wall.php', {act: 'canvas_draw_box', to_id: toId, flash: browser.flash}, {cache: 1, dark: 1});
        break;
      case 'photos_list':
        handler = showBox.pbind('al_photos.php', extend(params, {act: 'choose_photo'}), {cache: 1, stat: ['photos.js', 'photos.css', 'upload.js'], dark: 1});
        break;
      case 'photo':
        handler = showBox.pbind('al_photos.php', extend(params, {act: 'choose_photo', max_files: opts.limit || 10}), {cache: 1, stat: ['photos.js', 'photos.css', 'upload.js'], dark: 1});
        break;
      case 'video':
        handler = showBox.pbind('al_video.php', extend(params, {act: 'a_choose_video_box'}), {cache: 1, dark: 1});
        break;
      case 'audio':
        handler = showBox.pbind('audio', extend(params, {act: 'a_choose_audio_box'}), {cache: 1, dark: 1});
        break;
      case 'poll':
        handler = function () {addMedia.chooseMedia('poll', '', v[2])};
        break;
      case 'doc':
        var dcparams = opts.docParams || {};
        handler = showBox.pbind('docs.php', extend(params, extend({act: 'a_choose_doc_box'}, dcparams)), {stat: ['docs.css']});
        break;
      case 'map':
        handler = showBox.pbind('al_places.php', extend(params, {act: 'a_choose_place_box'}), {stat: ['places.css', 'map.css', 'maps.js', 'ui_controls.css', 'ui_controls.js', 'boxes.css'], width: 640, bodyStyle: 'padding: 0px;', dark: 1});
        break;
      case 'note':
        handler = showWiki.pbind({note: 'new'}, true, false, {queue: 1});
        break;
      case 'postpone':
        handler = function () {addMedia.chooseMedia('postpone', v[1], v[2])};
        break;
      case 'gift':
        handler = function() {
          var mid = (cur.peer < 2e9) ? cur.peer : 0;
          cur.giftCurrentPrivacy = 1;
          cur.giftCurrentMessage = trim(clean(IM.getPlainText()));
          cur.onGiftSended = val.pbind(ge('im_editable' + mid), '');
          cur.giftSendFrom = 'im';
          showBox('al_gifts.php', {act: 'get_gift_box', mid: mid, fr: (mid == vk.id ? 1 : 0)}, {stat: ['gifts.css', 'wide_dd.js', 'wide_dd.css'], dark: 1});
        }
        break;
    }
    var isApp = (v[0] == 'app');
    var icon = isApp ? v[4] : false;
    var bgpos = isApp ? '5px 5px' : ('3px ' + bgposes[v[0]] + 'px');
    var url = isApp ? ('/app' + v[2] + '?to_id=' + toId) : false;
    var name = v[1].replace(/\s/g, '&nbsp;');
    types.push([v[0], v[1], bgpos, handler, url, icon]);
  });

  var limit = opts.limit || 10,
      multi = limit > 1,
      editable = opts.editable && (!browser.msie || browser.version > 8),
      sortable = opts.sortable && (!browser.msie || browser.version > 8);

  var menu = initCustomMedia(lnk, types, {
    onShow: function () {
      cur.chooseMedia = addMedia.chooseMedia;
      cur.showMediaProgress = addMedia.showMediaProgress;
      cur.attachCount = addMedia.attachCount;
      cur.lastAddMedia = addMedia;
    },
    onItemClick: function(type) {
      if (multi && addMedia.attachCount() >= limit && type !== 'postpone') {
        showFastBox(getLang('global_error'), getLang('attachments_limit', limit));
        return false;
      }
      return true;
    },
    tooltip: opts.tooltip,
    topOffset: opts.topOffset,
    forceUp: opts.forceUp,
    global: opts.global
  });

  if (!menu) return;
  previewId = previewId || 'media_preview';

  var lnkId = menu.id,
      previewEl = ge(previewId),
      progressEl;

  if (multi) {
    previewEl.innerHTML = '<div id="page_pics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_dpics_preview' + lnkId + '" class="page_pics_preview page_media_sortable media_preview clear_fix"></div><div id="page_docs_preview' + lnkId + '" class="page_docs_preview page_media_sortable media_preview clear_fix"></div><div id="page_pdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_ldocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_mpics_preview' + lnkId + '" class="page_pics_preview media_preview clear_fix"></div><div id="page_ppdocs_preview' + lnkId + '" class="page_docs_preview media_preview clear_fix"></div><div id="page_progress_preview' + lnkId + '" class="page_progress_preview media_preview clear_fix"></div>';
    var picsEl = domFC(previewEl),
        dpicsEl = domNS(picsEl),
        docsEl = domNS(dpicsEl),
        pdocsEl = domNS(docsEl),
        ldocsEl = domNS(pdocsEl),
        mpicsEl = domNS(ldocsEl),
        ppdocsEl = domNS(mpicsEl),
        progressEl = domNS(ppdocsEl);
    removeClass(previewEl, 'media_preview');
    addClass(previewEl, 'multi_media_preview');
  } else {
    addClass(previewEl, 'med_no_attach');
    show(previewEl);
  }

  addMedia = {
    _addMediaLink: lnk,
    lnkId: lnkId,
    menu: menu,
    phLists: {},
    handlers: {},
    chosenMedias: [],
    _showAddMedia: function() {
      menu.show();
    },
    _hideAddMedia: function(noTimeout) {
      menu.hide(noTimeout);
    },
    chooseMedia: function(type, media, data, url, noboxhide, isGraffiti) {
      if (addMedia.onChange && addMedia.onChange(type, media, data, url) === false) {
        return false;
      }
      if (type == 'note') cur.pbNoteAdded = false;
      if (inArray(type, opts.disabledTypes || [])) {
        return false;
      }
      if (addMedia.attachCount() >= limit && data.upload_ind === undefined && type !== 'postpone' || geByClass1('medadd_c_market', docsEl)) {
        if (multi) {
          return false;
        } else {
          addMedia.unchooseMedia();
        }
      }
      var already = false, alreadyTypes = {};
      if (multi) {
        each (addMedia.chosenMedias, function () {
          if (this[0] == type && this[1] == media) {
            already = true;
            return false;
          }
          alreadyTypes[this[0]] = alreadyTypes[this[0]] ? alreadyTypes[this[0]] + 1 : 1;
        });
        if (already) {
          return false;
        }
      }
      var preview = '', postview = '', toPics = false, toEl = docsEl, oncl, attrs = '';
      switch (type) {
        case 'graffiti':
          if (!isObject(data)) {
            data = {thumb: data || ''};
          }
          preview = '<div class="fl_l page_preview_graffiti"><img class="page_preview_graffiti" src="' + data.thumb + '" /></div>';
          toEl = toPics = mpicsEl;
        break;

        case 'photos_list':
          hide(this._addMediaLink);
          vkImage().src = data[1];
          var _vopts = data[3].replace(/^{|}$/g, '');
          if (_vopts) _vopts += ',';
          _vopts += 'queue:1';

          oncl = opts.nocl ? '' : ' onclick="return showPhoto(\'' + data[4] + '\', \'' + data[2] + '\', ' + _vopts.replace(/"/g, '&quot;') + ');"';
          preview = '<div' + oncl + ' class="fl_l page_preview_photo"><img class="page_preview_photo" src="' + data[1] + '" /></div>';
          toEl = toPics = picsEl;
        break;

        case 'photo':
          if (!isObject(data)) {
            data = {
              thumb_m: data[0] || '',
              thumb_s: data[1] || '',
              list: data[2] || '',
              view_opts: data[3] || '',
              upload_ind: data.upload_ind || undefined
            };
          }
          vkImage().src = data.thumb_m;
          var _vopts = data.view_opts.replace(/^{|}$/g, '');
          if (_vopts) _vopts += ',';
          _vopts += 'queue:1';
          addMedia.phLists[media] = data.list;

          if (editable) {
            if (!data.editable) return false;
            if (!opts.nocl) data.editable.click = addMedia.showPhoto.pbind(media, data.list, parseJSON('{' + _vopts + '}'));
          }

          oncl = opts.nocl ? '' : ' onclick="return cur.addMedia['+addMedia.lnkId+'].showPhoto(\'' + media + '\', \'' + data.list + '\', {' + _vopts.replace(/"/g, '&quot;') + '});"';
          preview = '<div ' + oncl + ' class="fl_l page_preview_photo'+(isGraffiti ? ' page_preview_ph_graff' : '')+'"><img class="page_preview_photo" src="' + data.thumb_m + '" /></div>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'video':
          if (!isObject(data)) {
            data = {
              thumb: data || ''
            };
          }
          if (editable) {
            if (!data.editable) return false;
            if (!opts.nocl) data.editable.click = showVideo.pbind(media, false, {queue:1});
          }

          oncl = opts.nocl ? '' : ' onclick="return showVideo(\'' + media + '\', false, {queue:1});"';
          preview = '<div' + oncl + ' class="fl_l page_preview_video"><img class="page_preview_video" src="' + data.thumb + '" /></div>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'audio':
          if (!data.info) return false;
          preview = Page.addAudioPreview(media, data);
          attrs = ' id="pam' + lnkId + '_audio' + media + '"';
        break;

        case 'app':
          preview = '<div class="app fl_l"><img src="' + data[0] + '" /><span>' + data[1] + '</span></div>';
          each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {hide(this);});
        break;

        case 'doc':
          if (!data.lang) return false;
          if (data.thumb && data.thumb_s) {
            preview = '<a onclick="if (cur.cancelClick) return (cur.cancelClick = false);" target="_blank" href="' + data.href + '" class="fl_l pam_dpic"><div class="page_preview_doc_photo"><img src="' + data.thumb_s + '" align="center"></div><div class="page_preview_doc_photo_hint">' + data.title + '</div>';
            postview = '</a><div class="pam_bg"></div>';
            toEl = toPics = dpicsEl;
            attrs = ' id="pam' + lnkId + '_doc' + media + '"';
          } else {
            preview = '<a target="_blank" href="' + data.href + '" class="medadd_h medadd_h_doc inl_bl">' + data.lang.profile_choose_doc + '</a>';
            postview = '<div class="medadd_c medadd_c_doc"><a target="_blank" href="' + data.href + '" title="' + data.title + '">' + data.title + '</a></div>';
            attrs = ' id="pam' + lnkId + '_doc' + media + '"';
          }
        break;

        case 'share':
          if (alreadyTypes.share || alreadyTypes.page || !data.lang) {
            return false;
          }
          if (isArray(data)) {
            data = {
              domain: data[0],
              url: data[1],
              initialPattern: data[2],
              title: data[3],
              description: data[4],
              images: [data[5]],
              user_id: data[6],
              photo_id: data[7]
            };
          };
          data.media = data.media || media;
          if (data.draft) {
            addMedia.checkURL(data.url);
            return false;
          }
          preview = '<a target="_blank" href="/away.php?to=' + encodeURIComponent(data.url) + '" class="medadd_h medadd_h_link inl_bl">' + data.lang.profile_choose_link + '</a>';
          addMedia.shareData = extend(addMedia.shareData || {}, data, {imagesStyles: ['']});
          toEl = ldocsEl;
        break;

        case 'poll':
          if (!data.lang) return false;
          preview = '<div class="medadd_h medadd_h_poll inl_bl">' + data.lang.q + '</div>';
          hide(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
          toEl = pdocsEl;
        break;

        case 'map':
          preview = '<div class="fl_l"><a onclick="return showBox(\'al_places.php\', {act: \'geo_box\', lat: '+data[0]+', long: '+data[1]+', provider: '+intval(data[3])+'}, {dark: 1});"><div class="page_media_map_point"></div><img class="page_preview_map" width="174" height="70" src="/maps?lat='+data[0]+'&lng='+data[1]+'&z=11&'+((window.devicePixelRatio >= 2 || true) ? 'w=360&h=140' : 'w=174&h=70')+'" /></a></div>';
          toEl = toPics = mpicsEl;
          hide(geByClass1('add_media_type_' + lnkId + '_map', ge('add_media_menu_' + lnkId)));
        break;

        case 'page':
          if (alreadyTypes.share || alreadyTypes.page || !data.lang) {
            return false;
          }
          var lst = data.media.split('_');
          preview = '<a href="/page' + data.media + '" onclick="return showWiki({oid: ' + lst[0] + ', id: ' + lst[1] + '}, false, event, {queue: 1})" class="medadd_h medadd_h_page inl_bl">' + data.lang.profile_choose_page + '</a>';
          toEl = ldocsEl;
        break;

        case 'note':
          if (!data.lang) return false;
          preview = '<a onclick="showWiki({w: \'note' + data.raw + '\', edit: 1}, true, event, {queue: 1})" class="medadd_h medadd_h_note inl_bl">' + data.lang.profile_choose_note + '</a>';
          postview = '<div class="medadd_c medadd_c_note"><a onclick="showWiki({w: \'note' + data.raw + '\', edit: 1}, true, event, {queue: 1})" id="share_note_title' + data.raw + '">' + data.title + '</a></div>';
          toEl = ldocsEl;
        break;

        case 'market':
          preview = '<div class="medadd_c_market fl_l"><a target="_blank" href="' + data.href + '"><img class="medadd_c_market_thumb fl_l" src="' + data.thumb + '" /></a><div class="medadd_c_market_info fl_l"><a class="medadd_c_market_title" target="_blank" href="' + data.href + '">' + data.title + '</a><div class="medadd_c_market_price">' + data.price + '</div></div>';
          hide(lnk);
        break;

        case 'market_album':
          if (editable) {
            if (!data.editable) return false;
            extend(data.editable, {
              title: data.title,
              msize: langNumeric(data.count, data.lang.profile_X_market_items),
              click: false
            });
          }
          var lst = media.split('_');

          vkImage().src = data.thumb;
          oncl = opts.nocl ? '' : ' href="/market' + lst[0] + '?section=album_' + lst[1] + '"';
          var cls = 'fl_l page_preview_album wall_album_cover_wrap wall_market_album_cover' + (data.thumb ? '' : ' page_album_nocover');
          preview = '<a class="' + cls + '" ' + oncl + '>\
' + (data.thumb ? '<img class="wall_album_cover" src="' + data.thumb + '"/>' : '') + '\
  <div class="wall_album_caption">\
    <div class="wall_album_title_wrap clear_fix">\
      <div class="wall_album_count fl_r">' + data.count + '</div>\
      <div class="wall_album_title">' + data.title + '</div>\
    </div>\
  </div>\
</a>';
          toPics = 1;
          toEl = picsEl;
        break;

        case 'postpone':
          preview = '<div class="medadd_h medadd_h_timer inl_bl">' + data.lang.profile_choose_timer + '<span id="postpone_preview' + lnkId + '"></span></div>';

          if (cur.editingPost && !multi) {
            media = intval(media);
            if (media) {
              data.date = media;
            } else {
              data.date = intval(cur.editingPost[7]);
            }
            ge('wpe_save').innerHTML = getLang('global_save');
          } else if (cur.editingPost && domPN(ppdocsEl).id == 'wpe_media_preview') {
            media = intval(media);
            if (media) {
              data.date = media;
            } else {
              data.date = intval(cur.editingPost[7]);
            }
            var exp = geByClass1('medadd_c_timersett', ppdocsEl);
            if (exp) {
              var pn = domPN(exp);
              exp = pn.innerHTML;
              re(pn);
            } else {
              exp = '';
            }
            ge('wpe_save').innerHTML = getLang('global_save');
          } else {
            if (data.draft) {
              data.date = intval(media);
            } else if (cur.postponedLastDate) {
              data.date = intval(cur.postponedLastDate) + 3600;
            }
            var chk = ge('official');
            if (chk) {
              if (!isChecked(chk)) {
                checkbox(chk);
                toggle('signed', true);
              }
              addClass(chk, 'disabled');
            }
            var btn = ge('send_post');
            if (btn) {
              btn.innerHTML = data['lang']['profile_wall_postpone_btn'];
            }
          }
          hide(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
          toEl = ppdocsEl;
        break;
      }

      if (multi) {
        var medias = addMedia.chosenMedias,
            ind = medias.length,
            mediaEl = (editable && toPics === 1) ? false : ((type == 'photos_list') ?
              se('<div class="page_preview_' + type + '_wrap" style="position: relative">' + preview + '<div class="page_photos_count">' + media.split(',').length + '</div></div>') :
              se('<div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" '+ (browser.msie && browser.version < 9 ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie && browser.version < 9) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div>'));
        addClass(mediaEl, toPics ? 'fl_l' : 'clear_fix');
        if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
        if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() + 1 < limit);

        if (editable && toPics === 1) {
          addClass(toEl, 'editable_thumbs_wrap');
          if (!domLC(toEl) || !hasClass(domLC(toEl), 'editable_thumbs')) {
            toEl = toEl.appendChild(ce('div', {id: 'thumbs_edit' + lnkId, className: 'editable_thumbs'}));
          } else {
            toEl = domLC(toEl);
          }
          stManager.add(['thumbs_edit.css', 'thumbs_edit.js'], function() {
            if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() + 1 < limit);
            data.editable.remove = addMedia.unchooseMedia.pbind(ind);
            show(domPN(toEl));
            var teMed = ThumbsEdit.convert(type, media, data.editable);
            if (domFC(toEl)) {
              ThumbsEdit.addMedia(toEl, teMed);
            } else if (opts.teWidth && opts.teHeight) {
              ThumbsEdit.init(toEl, [teMed], {width: opts.teWidth, height: opts.teHeight, onMove: opts.onAddMediaChange});
            } else {
              ThumbsEdit.init(toEl, [teMed], {onMove: opts.onAddMediaChange});
            }
          }, true);
        } else {
          show(toEl);
          toEl.appendChild(mediaEl);
          if (sortable) {
            if (toEl == docsEl) {
              stManager.add(['sorter.js'], function() {
                var dXY = getXY(docsEl), dSz = getSize(docsEl),
                docsSorter = function() {
                  if (docsEl.sorter) {
                    sorter.added(docsEl);
                  } else if (toEl.childNodes.length > 1) {
                    sorter.init(docsEl, {onReorder: opts.onAddMediaChange});
                  }
                };
                if (!dXY[0] && !dXY[1] && !dSz[0] && !dSz[1]) {
                  cur.sorterClbk = docsSorter;
                } else {
                  docsSorter();
                }
              }, true);
            } else if (toEl == dpicsEl) {
              stManager.add(['qsorter.js'], function() {
                if (dpicsEl.qsorter) {
                  qsorter.added(dpicsEl);
                } else if (toEl.childNodes.length > 1) {
                  qsorter.init(dpicsEl, addMedia.qsorterOpts());
                }
              }, true);
            }
          }
        }
        medias.push([type, media, mediaEl, url]);
      } else {
        var ind = (type === 'postpone' ? 1 : 0);
        var mediaEl = se('<div class="' + (toPics === false ? 'page_docs_preview' : 'page_pics_preview') + '"><div class="page_preview_' + type + '_wrap"' + (opts.nocl ? ' style="cursor: default"' : '') + attrs + '>' + preview + '<div nosorthandle="1" class="page_media_x_wrap inl_bl" '+ (browser.msie && browser.version < 9 ? 'title' : 'tootltip') + '="'+getLang('dont_attach')+'" onmouseover="if (browser.msie && browser.version < 9) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia['+addMedia.lnkId+'].unchooseMedia(' + ind + '); return cancelEvent(event);"><div class="page_media_x" nosorthandle="1"></div></div>' + postview + '</div></div>');
        if (data.upload_ind !== undefined) re('upload' + data.upload_ind + '_progress_wrap');
        if (type !== 'postpone') {
          addMedia.chosenMedia = [type, media];
          addMedia.chosenMediaData = data;
        }
        addMedia.singleAdded(mediaEl, type);
      }

      if (type == 'share') {
        if (data.title && !url) {
          cur.shareShowImg = 0;
          addMedia.showPreview(true);
          addMedia.shareData.images = false;
        } else {
          addMedia.showExternalPreview();
        }
      } else if (type == 'page') {
        if (!data['nopreview']) {
          cur.shareShowImg = 0;
          addMedia.shareData = extend(addMedia.shareData || {}, data, {images: false});
          addMedia.showPreview();
        }
      } else if (type == 'poll') {
        addMedia.createPoll(data);
      } else if (type == 'postpone') {
        addMedia.setupPostpone(data, exp);
      }

      var ev = window.event;
      if (ev && ev.type == 'click' && (event.ctrlKey || event.metaKey || event.shiftKey)) {
        noboxhide = true;
      }
      if ((!cur.fileApiUploadStarted || data.upload_ind === undefined) && !cur.preventBoxHide && noboxhide !== true && !inArray(type, ['poll', 'share', 'page', 'postpone'])) {
        boxQueue.hideLast();
      }

      cur.lastPostMsg = false;
      if (opts.onMediaAdd) {
        opts.onMediaAdd();
      }

      if (data.upload_ind !== undefined) {
        delete data.upload_ind;
      }
      return false;
    },
    unchooseMedia: function(ind) {
      if (addMedia.onChange && addMedia.onChange(false, ind) === false) {
        return false;
      }
      if (multi) {
        if (ind === undefined) {
          if (window.ThumbsEdit) {
            ThumbsEdit.removeAll('thumbs_edit' + lnkId);
          }
          each (addMedia.chosenMedias, function (k, v) {
            if (v && k !== undefined) addMedia.unchooseMedia(k);
          });
          addMedia.urlsCancelled = [];
          return;
        }
        var medias = addMedia.chosenMedias, x;
        if (medias[ind]) {
          if (medias[ind][2]) {
            if ((x = geByClass1('page_media_x_wrap', medias[ind][2], 'div')) && x.tt && x.tt.el) {
              x.tt.destroy();
            }
            if (domPN(medias[ind][2]) == docsEl && docsEl.sorter) {
              each (docsEl.sorter.elems, function() {
                setStyle(this, {top: 'auto', left: 'auto', cursor: 'auto'});
              });
              docsEl.sorter.destroy();
              re(medias[ind][2]);
              if (docsEl.childNodes.length > 1) sorter.init(docsEl, {onReorder: opts.onAddMediaChange});
            } else if (domPN(medias[ind][2]) == dpicsEl && dpicsEl.qsorter) {
              each (dpicsEl.qsorter.elems, function() {
                setStyle(domFC(this), {top: 'auto', left: 'auto'});
                setStyle(this, {cursor: 'auto'});
              });
              dpicsEl.qsorter.destroy();
              re(medias[ind][2]);
              if (dpicsEl.childNodes.length > 1) qsorter.init(dpicsEl, addMedia.qsorterOpts());
            } else {
              re(medias[ind][2]);
            }
          } else if (medias[ind][0] == 'photo' || medias[ind][0] == 'video' || medias[ind][0] == 'album') {
            if (window.ThumbsEdit) {
              ThumbsEdit.removeById('thumbs_edit' + lnkId, medias[ind][0] + medias[ind][1]);
            }
          }
          switch (medias[ind][0]) {
            case 'page':
            case 'share':
              addMedia.shareData = {};
              re(addMedia.sharePreview);
              delete addMedia.sharePreview;
              break;

            case 'poll':
              re(addMedia.pollPreview);
              addMedia.pollPreview = false;
              show(geByClass1('add_media_type_' + lnkId + '_poll', menu.menuNode, 'a'));
              break;

            case 'app':
              each(geByClass('add_media_type_' + lnkId + '_app', menu.menuNode, 'a'), function () {show(this);});
              break;

            case 'map':
              show(geByClass1('add_media_type_' + lnkId + '_map', ge('add_media_menu_' + lnkId)));
              break;

            case 'market':
              show(lnk);
              break;

            case 'postpone':
              var exp = geByClass1('medadd_c_timersett', addMedia.postponePreview);
              if (cur.editingPost && exp) {
                re(domFC(addMedia.postponePreview));
              } else {
                re(addMedia.postponePreview);
              }
              addMedia.postponePreview = false;
              removeClass('official', 'disabled');
              if (!cur.editingPost) {
                ge('send_post').innerHTML = getLang('wall_send');
              } else {
                ge('wpe_save').innerHTML = getLang('wall_publish_now');
              }
              show(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
              break;
          }
          medias[ind] = false;
        }
        if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
        toggle(picsEl, !!(editable ? geByClass1('thumb_wrap', picsEl) : domFC(picsEl)));
        toggle(dpicsEl, !!domFC(dpicsEl));
        toggle(docsEl, !!domFC(docsEl));
        toggle(pdocsEl, !!domFC(pdocsEl));
        toggle(ldocsEl, !!domFC(ldocsEl));
        toggle(mpicsEl, !!domFC(mpicsEl));
        toggle(ppdocsEl, !!domFC(ppdocsEl));
        toggle(progressEl, !!domFC(progressEl));
      } else {
        var share, x;
        if (ind == undefined) {
          ind = 0;
        }
        if ((x = geByClass('page_media_x_wrap', previewEl, 'div')[ind]) && x.tt && x.tt.el) {
          x.tt.destroy();
        }
        if (ind && addMedia.postponePreview) {
          show(geByClass1('add_media_type_' + lnkId + '_postpone', menu.menuNode, 'a'));
          re(domPN(addMedia.postponePreview));
          addMedia.postponePreview = false;
        } else {
          if (addMedia.postponePreview) {
            var postponeWrap = domPN(addMedia.postponePreview);
            for (var i = 0; i < previewEl.childNodes.length; i++) {
              var v = previewEl.childNodes[i];
              if (v.nodeName == 'DIV' && v != postponeWrap) re(v);
            };
            each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
              if (!hasClass(v, 'add_media_type_' + lnkId + '_postpone')) {
                show(v);
              }
            });
          } else {
            val(previewEl, '');
            addClass(previewEl, 'med_no_attach');
            each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
              show(v);
            });
          }
          if (addMedia.chosenMedia) {
            addMedia.chosenMedia = false;
            addMedia.chosenMediaData = false;
          }
          if (share = addMedia.shareData) {
            if (share.url) {
              addMedia.urlsCancelled.push(share.url);
            }
            if (share.initialPattern) {
              addMedia.urlsCancelled.push(share.initialPattern);
            }
            addMedia.shareData = {};
          }
          each([addMedia.sharePreview, addMedia.pollPreview], function () {re(this);});
          addMedia.sharePreview = addMedia.pollPreview = false;
        }
        if (opts.toggleLnk) show(lnk);
      }

      cur.lastPostMsg = false;

      if (addMedia.onChange) addMedia.onChange(false);
    },
    singleAdded: function(mediaEl, type) {
      if (addMedia.postponePreview) {
        previewEl.insertBefore(mediaEl, domFC(previewEl));
      } else {
        previewEl.appendChild(mediaEl);
      }
      removeClass(previewEl, 'med_no_attach');
      var menuItemsVisible = 0;
      each(geByClass('add_media_item', menu.menuNode, 'a'), function(i, v) {
        if (type !== 'postpone' && !hasClass(v, 'add_media_type_' + lnkId + '_postpone')) {
          hide(v);
        } else if (isVisible(v)) {
          menuItemsVisible++;
        }
      });
      if (opts.toggleLnk && !menuItemsVisible) {
        hide(lnk);
      }
    },
    getMedias: function() {
      if (multi) {
        var edited = window.ThumbsEdit ? ThumbsEdit.getMedias('thumbs_edit' + lnkId) : [], already = {};
        var chosen = addMedia.chosenMedias || [], result = [], check = function(id, ck, cv) {
          if (cv[0] + cv[1] == id) {
            result.push(cv);
            already[id] = true;
            return false;
          }
        };
        each(edited, function(k, v) {
          each(chosen, check.pbind(v[0] + v[1]));
        });
        each(dpicsEl.childNodes, function(k, v) {
          var m = (v.id || '').match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
          if (m) each(chosen, check.pbind(m[1] + m[2]));
        });
        each(docsEl.childNodes, function(k, v) {
          var m = (v.id || '').match(/^pam\d+_([a-z]+)(-?\d+_\d+)/);
          if (m) each(chosen, check.pbind(m[1] + m[2]));
        });
        each(chosen, function(k, v) {
          if (v && isArray(v) && v.length && !already[v[0] + v[1]]) {
            result.push(v);
          }
        });
        return result;
      } else {
        var chosen = addMedia.chosenMedia;
        return chosen ? [chosen[0] + chosen[1]] : [];
      }
    },
    showPhoto: function(photoId, listId, opts, ev) {
      if (cur.pvData && (!cur.pvShown || cur.pvListId != listId)) {
        delete cur.pvData[listId];
      }
      for (var i in ajaxCache) {
        if (i.toString().match(/^\/al_photos\.php\#act=show&draft_photos/)) {
          delete ajaxCache[i];
        }
      }
      var m = addMedia.getMedias(), allPhotos = [];
      each(m, function(k, v) {
        if (v && v[0] == 'photo') {
          allPhotos.push(v[1] + '/' + (addMedia.phLists[v[1]] || ''));
        }
      });
      opts.additional = {draft_photos: allPhotos.join(';')};
      return showPhoto(photoId, listId, extend(opts, {queue: 1}), ev);
    },
    showMediaProgress: function(type, i, info) {
      if (addMedia.onProgress && addMedia.onProgress(type, i, info) === false) {
        return false;
      }
      var frac = info.loaded / info.total, percent = intval(frac * 100),
          fileName = (info.fileName || info.name || '').replace(/[&<>"']/g, ''),
          // ind = i,
          ind = fileName ? i + '_' + fileName : i,
          label = fileName ? (fileName.length > 33 ? fileName.substr(0, 30) + '...' : fileName) : '';

      var prg = ge('upload' + ind + '_progress');
      if (!prg) {
        if (!cur.attachMediaIndexes) cur.attachMediaIndexes = {};
        cur.attachMediaIndexes[ind] = lnkId;

        var progress = '\
<div class="fl_l"><div class="page_attach_progress_wrap" style="margin-top: 3px; margin-bottom: 4px;">\
  <div id="upload' + ind + '_progress" class="page_attach_progress"></div>\
</div></div></div>' + (label ? '<div class="attach_label fl_l">' + label + '</div>' : '') + '<div class="progress_x fl_l" onmouseover="animate(this, {opacity: 1}, 200); showTooltip(this, {text: \'' + getLang('dont_attach') + '\', shift: [6, 3, 3]})" onmouseout="animate(this, {opacity: 0.6}, 200);" onclick="Upload.terminateUpload(' + i + ', \'' + (fileName || i) + '\', this);"></div>';

        if (multi) {
          progressEl.appendChild(ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'}, {marginTop: '6px'}));
          show(progressEl);
          if (opts.toggleLnk) toggle(lnk, addMedia.attachCount() < limit);
        } else {
          var mediaEl = ce('div', {id: 'upload' + ind + '_progress_wrap', innerHTML: progress, className: 'clear_fix upload_' + i + '_progress'});
          addMedia.chosenMedia = 'progress';
          addMedia.singleAdded(mediaEl, 'progress');
        }
        prg = ge('upload' + ind + '_progress');
        prg.full = false;//intval(getStyle(prg.parentNode, 'width'));

        if (percent) {
          setStyle(prg, {width: prg.full ? (intval(prg.full * frac) + 'px') : percent + '%'})
        } else {
          setStyle(prg, {width: '1px'});
          hide(prg);
        }
      } else {
        show(prg);
        if (prg.full) {
          var tw = data(prg, 'tween'), w = intval(prg.full * frac);
          if (tw && tw.isTweening) {
            tw.to.width = w;
          } else {
            animate(prg, {width: w + 'px'}, 500);
          }
        } else {
          setStyle(prg, {width: percent + '%'});
        }
      }
    },

    attachCount: function() {
      if (addMedia.attachedCount) {
        return addMedia.attachedCount();
      }
      if (!previewEl) {
        return 0;
      }
      if (!multi) {
        return previewEl.childNodes.length - (addMedia.postponePreview ? 1 : 0);
      }
      var num = (editable && window.ThumbsEdit ? ((ThumbsEdit.cache()['thumbs_edit' + lnkId] || {}).previews || []) : picsEl.childNodes).length + dpicsEl.childNodes.length + mpicsEl.childNodes.length + docsEl.childNodes.length / (docsEl.sorter ? 2 : 1) + progressEl.childNodes.length;
      if (addMedia.sharePreview) {
        ++num;
      }
      if (addMedia.pollPreview) {
        ++num;
      }
      return num;
    },

    // Inline Polls
    createPoll: function(data) {
      var h = data.question ? '' : '1px', html = [], ans;
      var incCl = data[4 + (10 - 1) * 2] ? 'disabled' : '', decCl = data[4 + 2 * 2] ? '' : 'disabled';
      addMedia.pollPreview = pdocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_poll', innerHTML: '\
<input onkeydown="cur.addMedia[' + lnkId + '].keyPoll(this, event)" class="text medadd_c_pollq" id="create_poll_question' + lnkId + '" value="' + (data.question || '') + '" />\
<div class="medadd_c_pollh">' + data.lang.a + '</div>\
<div class="medadd_c_pollans" id="create_poll_answers' + lnkId + '"></div>\
<div class="medadd_c_polladd_wr" id="create_poll_add' + lnkId + '">\
  <div class="medadd_c_polladd" onclick="cur.addMedia[' + lnkId + '].incPoll()">' + data.lang.i + '</div>\
</div>' + (data.edit ? '' : '<div class="checkbox medadd_c_pollcb' + (data.anon ? ' on' : '') + '" id="create_poll_anonymous' + lnkId + '" onclick="checkbox(this);cur.addMedia[' + lnkId + '].changedPoll();">' + data.lang.c + '</div>')}));
      if (!data.answers) data.answers = [[0, ''], [0, '']];
      cur.pollAnswerTemplate = '<input onkeydown="cur.addMedia[%lnkid%].keyPoll(this, event)" class="text medadd_c_polla" %attrs%/><div class="page_media_x_wrap medadd_c_pollrem inl_bl" '+ (browser.msie ? 'title' : 'tootltip') + '="'+data.lang.d+'" onmouseover="if (browser.msie) return; showTooltip(this, {text: this.getAttribute(\'tootltip\'), shift: [14, 3, 3], black: 1})" onclick="cur.addMedia[%lnkid%].decPoll(this)"><div class="page_media_x"></div></div>';
      for (var i = 0, l = data.answers.length; i < l; ++i) {
        ans = data.answers[i];
        html.push('<div class="medadd_c_polla_wr">' + rs(cur.pollAnswerTemplate, {
          attrs: (ans[0] ? 'id="create_poll_ans' + ans[0] + '" ' : '') + (ans[1] ? '" value="' + ans[1] + '" ' : ''),
          lnkid: lnkId
        }) + '</div>');
        if (i == 9) hide('create_poll_add' + lnkId);
      }
      val('create_poll_answers' + lnkId, html.join(''));
      if (data.question) {
        elfocus('create_poll_question' + lnkId);
        return;
      }
      addMedia.pollPreview.style.height = h;
      animate(addMedia.pollPreview, {height: 166}, 200, function() {
        addMedia.pollPreview.style.height = 'auto';
        elfocus('create_poll_question' + lnkId);
      });
    },
    incPoll: function() {
      var answers = ge('create_poll_answers' + lnkId), l = answers.childNodes.length;
      if (l < 10) {
        elfocus(geByTag1('input', answers.appendChild(ce('div', {
          className: 'medadd_c_polla_wr',
          innerHTML: rs(cur.pollAnswerTemplate, {attrs: '', lnkid: lnkId})
        }))));
      }
      toggle('create_poll_add' + lnkId, l < 9);
    },
    decPoll: function(el) {
      if (el.tt && el.tt.el) el.tt.destroy();
      re(domPN(el));
      show('create_poll_add' + lnkId);
    },
    keyPoll: function(el, ev) {
      ev = ev || window.event;
      if (ev && (ev.keyCode == 10 || ev.keyCode == 13 || ev.keyCode == 9)) {
        var q = hasClass(el, 'medadd_c_pollq'), s = ev.shiftKey;
        if (s && q) return;
        var n = q ? domFC(domNS(domNS(el))) : (s ? domPS : domNS)(domPN(el));
        if (n) {
          elfocus(geByTag1('input', n));
        } else if (s) {
          elfocus(geByClass1('medadd_c_pollq', domPN(domPN(domPN(el)))));
        } else {
          this.incPoll();
        }
        return cancelEvent(ev);
      } else {
        addMedia.changedPoll();
      }
    },
    changedPoll: function() {
      opts.onMediaChange && opts.onMediaChange();
    },
    pollData: function(silentCheck) {
      var answers = ge('create_poll_answers' + lnkId), q = trim(val('create_poll_question' + lnkId)), a;
      var result = {media: q, anonymous: isChecked('create_poll_anonymous' + lnkId)}, ind = 0, found = false;
      for (var el = domFC(answers); el; el = domNS(el)) {
        a = trim(val(domFC(el)));
        if (a) {
          var id = -intval((domFC(el).id.match(/^create_poll_ans(\d+)$/) || [0, -(ind++)])[1]); // -id or ind
          result['answers[' + id + ']'] = a;
          found = true;
        }
      }
      if (!q) {
        if (silentCheck !== true) {
          notaBene('create_poll_question' + lnkId);
          elfocus('create_poll_question' + lnkId);
        }
        return false;
      }
      if (!found) {
        if (!domFC(answers)) cur.addMedia[lnkId].incPoll();
        if (silentCheck !== true) {
          notaBene(domFC(domFC(answers)));
          elfocus(domFC(domFC(answers)));
        }
        return false;
      }
      return result;
    },

    // Inline Share
    urlsCancelled: [],
    shareData: {},
    checkMessageURLs: function(message, inactive) {
      if (addMedia.chosenMedia || addMedia.urlAttachmentLoading && addMedia.urlAttachmentLoading[0] > vkNow() - 10000 || addMedia.attachCount() >= limit) {
        return;
      }
      if (cur.reply_to && cur.reply_to[0]) { // prevent urls in club name from parsing
        var reply_name = Wall.getReplyName(cur.reply_to[0]);
        if (reply_name && isArray(reply_name) && reply_name[1]) {
          reply_name = reply_name[1];
        }
        if (reply_name) {
          var urls_in_name = extractUrls(reply_name, inactive);
          for (var i in urls_in_name) {
            var url = urls_in_name[i].url;
            if (!url.match(/^https?:\/\//)) {
              url = 'http://' + url;
            }
            if (!inArray(url, addMedia.urlsCancelled)) {
              addMedia.urlsCancelled.push(url);
            }
          }
        }
      }

      var urls = extractUrls(message, inactive);
      for (var i in urls) {
        var urlInfo = urls[i];
        var url = urlInfo['url'],
          query = urlInfo['query'],
          domain = urlInfo['domain'],
          initialUrl = url;

        if (!url.match(/^https?:\/\//)) {
          url = 'http://' + url;
        }
        if (inArray(url, addMedia.urlsCancelled) || inArray(initialUrl, addMedia.urlsCancelled)) {
          continue;
        }
        var valid = true;
        if (domain.match(/(^|\.|\/\/)(vkontakte\.ru|vk\.com)/)) {
          valid = query.match(/(#photo|^\/(photo|video|album|page|audio|doc)|z=(album|photo|video)|w=(page|product))(-?\d+_)?\d+|\.(jpg|png|gif)$|market-?\d+\?section=album_\d+|^\/stickers\/.+$|^\/vk2016+$|^http:\/\/instagram\.com\/p\/.+/) ? true : false;
        }
        if (valid) {
          addMedia.checkURL(initialUrl);
          return;
        }
      }
    },
    onCheckURLDone: function(result, data) {
      var url = '';
      if (addMedia.urlAttachmentLoading) {
        re(addMedia.urlAttachmentLoading[2]);
        if (multi) {
          toggle(progressEl, progressEl.childNodes > 0);
        } else {
          toggleClass(previewEl, 'med_no_attach', !previewEl.childNodes);
        }
        url = addMedia.urlAttachmentLoading[1];
        addMedia.urlAttachmentLoading = false;
        setStyle(bodyNode, {cursor: 'default'});
      }
      if (result) {
        addMedia.chooseMedia(data[0], data[1], data[2], url, true);
      } else if (opts.onCheckURLDone) {
        opts.onCheckURLDone(result, data);
      }
    },
    checkURL: function(url) {
      if (!url) return;
      addMedia.urlsCancelled.push(url);
      addMedia.urlAttachmentLoading = [vkNow(), url];

      re(addMedia.checkURLForm);
      addMedia.checkURLForm = ce('div', {innerHTML: '<iframe name="share_parse_iframe' + lnkId + '"></iframe>'});
      utilsNode.appendChild(addMedia.checkURLForm);
      var parseForm = addMedia.checkURLForm.appendChild(ce('form', {
        action: 'share.php?act=url_attachment',
        method: 'post',
        target: 'share_parse_iframe' + lnkId
      }));

      each({
        hash   : cur.share_timehash || cur.options.share.timehash || '',
        index  : lnkId,
        url    : url,
        to_mail: opts.mail ? 1 : ''
      }, function(i, v) {
        parseForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });

      // var progress = ce('div', {className: 'share_parse_progress progress'});
      // progressEl.appendChild(progress);
      // show(progressEl);
      // addMedia.urlAttachmentLoading.push(progress);
      setStyle(bodyNode, {cursor: 'wait'});

      window.onUploadDone = addMedia.onCheckURLDone.pbind(true);
      window.onUploadFail = addMedia.onCheckURLDone.pbind(false);

      parseForm.submit();
    },
    addPreview: function(progress) {
      return (addMedia.sharePreview = ldocsEl.appendChild(ce('div', {className: 'medadd_c medadd_c_link', innerHTML: '\
<div class="medadd_c_linkcon"><div></div>' + (progress ? '<div class="progress medadd_c_linkprg"></div>' : '') + '</div>'})));
    },
    shareImgUrl: function(index) {
      var data = addMedia.shareData;
      if (data.images_proxy && data.images_proxy[index]) {
        return data.images_proxy_url + data.images_proxy[index];
      }

      if (data.images) {
        var imgUrl = data.images[index];
        if (isArray(imgUrl)) {
          if (imgUrl[0]) {
            imgUrl = imgUrl[0];
          } else {
            imgUrl = '';
          }
        }
        return imgUrl;
      } else {
        return '';
      }
    },
    showPreview: function(fast) {
      var data = addMedia.shareData,
          prev = addMedia.sharePreview || addMedia.addPreview(), image, bigLinkClass;

      if (data.images) {
        image = data.images[cur.shareShowImg];
        bigLinkClass = addMedia.bigLink || data.big_link || (image && isArray(image) && image[0]) ? 'medadd_c_linkimg_big' : '';
      }

      if (data.failed) {
        var html = getLang('page_not_loaded');
      } else {
        var onloadStr = fast ? '' : 'onload="if (this.width < 130 && !cur.onLoadSwitched) {cur.onLoadSwitched=1;setTimeout(cur.shareShowNext, 0);}"';
        var imghtml = '';
        var imgUrl = clean(addMedia.shareImgUrl(cur.shareShowImg));

        if (data.images && data.images[cur.shareShowImg] && imgUrl) {
          var curImage = data.images[cur.shareShowImg];

          var style = bigLinkClass ? 'style="width: 100%"' : (data.imagesStyles && data.imagesStyles[cur.shareShowImg] || '');
          imghtml = '<img class="medadd_c_linkimg" src="' + imgUrl + '" ' + onloadStr + ' ' + style + ' />';
          imghtml += bigLinkClass ? Page.buildMediaLinkEl(data.domain) : '';

          if (data.images.length > 0) {
            var leftScroller = ((data.images.length > 1) ? ('<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_left ' + ((cur.shareShowImg == 0) ? 'medadd_c_linkimg_scroll_wrap_left_first' : '') + '" onclick="'+((cur.shareShowImg == 0) ? 'Page.ownerPhoto(\''+data.media+'\');' : 'cur.shareShowNext(true);')+'"><div class="medadd_c_linkimg_scroll"></div></div>') : '');
            var rightScroller = '';
            var closeButton = '';
            if (cur.shareShowImg < (data.images.length - 1)) {
              rightScroller = '<div class="medadd_c_linkimg_scroll_wrap medadd_c_linkimg_scroll_wrap_right" onclick="cur.shareShowNext();"><div class="medadd_c_linkimg_scroll"></div></div>';
            } else if ((cur.shareShowImg == (data.images.length - 1)) && isArray(curImage) && !!curImage[0]) {
              rightScroller = '';
              //closeButton = '<div class="medadd_c_linkimg_scroll_wrap_close" onclick="cur.shareClearOwnPhoto();"></div>';
            }

            var hasOwnPhoto = isArray(data.images[data.images.length - 1]) && !!data.images[data.images.length - 1][0];
            var availableImagesCount = data.uniqueImagesCount + intval(hasOwnPhoto);

            var uploadTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_choose_own_photo') + '\', black: 1, shift: [7, 1, 0]})"';
            var removeTooltip = 'onmouseover="showTooltip(this, {text: \'' + getLang('global_link_remove_photo') + '\', black: 1, shift: [7, 1, 0]})"';

            var imgControls = (!data.media || data.media === '_') ? '' : '<div class="medadd_c_linkimg_controls">' +
                              '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_l">' +
                              (availableImagesCount > 1 ?
                              '    <div class="medadd_c_linkimg_controls_btn_arrows_group">' +
                              '      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_left" onclick="cur.shareShowNext(true);"></div>' +
                              '      <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_right" onclick="cur.shareShowNext();"></div>' +
                              '    </div>' : ''
                              ) +
                              '    <div class="medadd_c_linkimg_controls_btn ' + (availableImagesCount > 1 ? 'medadd_c_btn_side_padd' : '') + '" id="medadd_ctrl_upload" ' + uploadTooltip + ' onclick="Page.ownerPhoto(\''+data.media+'\');"></div>'+
                              '  </div>' +
                              '  <div class="medadd_c_linkimg_controls_btn_group clear_fix fl_r">' +
                              '    <div class="medadd_c_linkimg_controls_btn" id="medadd_ctrl_remove" ' + removeTooltip + ' onclick="tooltips.hide(this);cur.removeLinkImage(this)"></div>' +
                              '  </div>' +
                              '</div>';

            var containerImageStyle = image ? '' : 'display: none';

            imghtml =
              '<div class="medadd_c_linkimg_container fl_l" style="' + containerImageStyle + '">' +
                imghtml +
                imgControls +
                closeButton +
                '<div id="medadd_c_linkimg_loader" class="medadd_c_linkimg_loader"></div>' +
              '</div>'
            ;
          }
        }
        var microdata = '';
        if (data.microdata) {
          if (data.microdata_preview_html) {
            microdata = data.microdata_preview_html;
          }
        }
        var description = data.description_short || data.description;
        var html =
          imghtml +
          (data.title ? '<h4 class="medadd_c_linkhead">' + data.title + '</h4>' : '') +
          (!bigLinkClass && data.domain ? '<div class="page_media_link_addr">' + data.domain + '</div>' : '') +
          //(data.domain ? '<div class="medadd_c_linkdomain">' + data.domain + '</div>' : '') +
          (microdata ? '<div class="medadd_c_linkmicrodata">' + microdata + '</div>' : '') +
          (description ? '<div class="medadd_c_linkdsc">' + description + '</div>' : '') +
          '<div class="clear"></div>';
      }

      if (fast) {
        if (cur.preventShareAnim) {
          cur.preventShareAnim.stop();
        }
        val(domFC(prev), html);
        domFC(prev).style.height = 'auto';
        shortCurrency();
      } else {
        var hidden = !isVisible(ldocsEl);
        show(ldocsEl);
        var tmpDiv = ge(previewId).appendChild(ce('div', {
          innerHTML: '<div class="medadd_c_linkcon ' + bigLinkClass + '">' + html + '</div>'
        }, {
          position: 'absolute',
          width: getSize(prev)[0] - 10,
          visibility: 'hidden'
        }));
        var height = getSize(tmpDiv)[1];
        re(tmpDiv);

        val(domFC(prev), html);
        shortCurrency();

        cur.preventShareAnim = animate(domFC(prev), {height: height}, 200);

        re(geByClass1('medadd_c_linkprg', ldocsEl));
      }

      if (bigLinkClass) {
        addClass(geByClass1('medadd_c_linkcon', ldocsEl), bigLinkClass);
      }
    },
    showExternalPreview: function () {
      var data = addMedia.shareData;
      if (!data.images) {
        data.images = [];
      }

      var _unique = [], _uniqueProxies = [], _uniqueMap = {};
      each(data.images, function(i, im) {
        if (!_uniqueMap[im]) {
          _uniqueMap[im] = true;
          _unique.push(im);
          if (data.images_proxy) {
            _uniqueProxies.push(data.images_proxy[i]);
          }
        }
      });
      data.uniqueImagesCount = _unique.length;
      data.images = _unique;
      data.images_proxy = _uniqueProxies;

      data.images.push([]); // holder for own photo

      if (!data.images || !data.images.length) {
        cur.shareShowImg = 0;
        addMedia.showPreview();
        return;
      } else {
        cur.shareShowImg = -1;
        addMedia.addPreview(true);
      }
      data.imagesStyles = {};
      var fast = false;


      cur.shareSetOwnPhoto = function (res) {
        if (curBox()) curBox().hide();
        addMedia.bigLink = true;
        data.images[data.images.length-1] = [res.photo_url, res.user_id, res.photo_id];
        cur.shareShowNext(0, 1);
      }

      cur.shareClearOwnPhoto = function () {
        data.images[data.images.length-1] = [];
        cur.shareShowNext(0, 0, 1);
      }

      cur.removeLinkImage = function(removeBtn) {
        var linkWrap = gpeByClass('medadd_c_linkcon', removeBtn);
        re(gpeByClass('medadd_c_linkimg_container', removeBtn));
        setStyle(linkWrap, 'height', '');

        addMedia.shareData.noPhoto = true;
      }

      cur.shareShowNext = function (previous, last, current) {
        var tmpImg = vkImage();

        cur.prevShareShowDir = previous;

        if (current) {
          // nothing
        } else if (last) {
          cur.shareShowImg = data.images.length - 1;
        } else if (previous) {
          cur.shareShowImg -= 1;
        } else {
          cur.shareShowImg += 1;
        }

        var hasOwnPhoto = isArray(data.images[data.images.length - 1]) && !!data.images[data.images.length - 1][0];

        if (!hasOwnPhoto && cur.shareShowImg > data.images.length - 2) {
          cur.shareShowImg = 0;
        } else if (cur.shareShowImg > data.images.length - 1) {
          cur.shareShowImg = 0;
        } else if (!hasOwnPhoto && cur.shareShowImg < 0) {
          cur.shareShowImg = data.images.length - 2;
        } else if (cur.shareShowImg < 0) {
          cur.shareShowImg = data.images.length - 1;
        } else if (cur.shareShowImg == 0) {
          for (var i = 1; i < data.images.length - 1; i++) {
            var t = vkImage();
            t.src = addMedia.shareImgUrl(i);
          }
        }
        if (!data.images.length || isEmpty(data.images) || data.images[cur.shareShowImg] === undefined) {
          addMedia.showPreview(fast);
          fast = true;
          return;
        }
        var tmpImgSrc = addMedia.shareImgUrl(cur.shareShowImg);
        if (tmpImgSrc) {
          tmpImg.src = tmpImgSrc;
        }
        if (isArray(data.images[cur.shareShowImg]) && data.images[cur.shareShowImg][1] && data.images[cur.shareShowImg][2]) {
          data.user_id = data.images[cur.shareShowImg][1];
          data.photo_id = data.images[cur.shareShowImg][2];
          data.share_own_image = true;
        } else {
          data.user_id = undefined;
          data.photo_id = undefined;
          data.share_own_image = false;
        }

        var imgLoadTimeout = null;

        if (tmpImgSrc) {
          imgLoadTimeout = setTimeout(function() {
            if (cur.shareImgInterval === true) return;
            if (isArray(data.images[cur.shareShowImg])) return;
            data.images.splice(cur.shareShowImg, 1);
            if (data.images_proxy && data.images_proxy.length > cur.shareShowImg) {
              data.images_proxy.splice(cur.shareShowImg, 1);
            }
            cur.shareShowNext();
          }, 5000);
        }

        var showLoaderTimeout = setTimeout(function () {
          show('medadd_c_linkimg_loader');
          showLoaderTimeout = null;
        }, 100);

        var updatePreview = function() {
          if (tmpImg.width || tmpImg.height || !tmpImgSrc) {
            var w = tmpImg.width, h = tmpImg.height;
            var imgStyle = '';
            var imgParams = '';
            if (imgLoadTimeout) {
              clearTimeout(imgLoadTimeout);
              imgLoadTimeout = null;
            }
            if (showLoaderTimeout) {
              clearTimeout(showLoaderTimeout);
              showLoaderTimeout = null;
            }
            hide('medadd_c_linkimg_loader');
            clearInterval(cur.shareImgInterval);
            if (!isArray(data.images[cur.shareShowImg]) && (w < 20 || h < 20)) {
              data.images.splice(cur.shareShowImg, 1);
              if (data.images_proxy && data.images_proxy.length > cur.shareShowImg) {
                data.images_proxy.splice(cur.shareShowImg, 1);
              }
              if (data.images.length) {
                return setTimeout(cur.shareShowNext.pbind(0, 0, 1), 0);
              }
            } else {
              var bigLink = (w >= 537 && h >= 240);

              if (!bigLink && addMedia.bigLink && (cur.shareShowImg != data.images.length - 1)) {
                data.images.splice(cur.shareShowImg, 1);
                data.images_proxy.splice(cur.shareShowImg, 1);
                if (!cur.prevShareShowDir) cur.shareShowImg --;
                cur.shareShowNext(cur.prevShareShowDir);
                return;
              }

              addMedia.bigLink = addMedia.bigLink || bigLink;

              if (w > 150) {
                h = 150 * h / w;
                w = 150;
              }
              var hHalf = (Math.round(h / 2));
              var wHalf = (Math.round(w / 2));
              var marginTop = (bigLink && (h > 150)) ? -Math.round(67/2) : -hHalf;

              var marginLeft = (w > 150) ? -Math.round(150/2) : -wHalf;
              //imgStyle = 'width: ' + w + 'px; height: ' + h + 'px; margin-top: ' + marginTop + 'px; margin-left: ' + marginLeft + 'px;';
              imgStyle = 'width: ' + w + 'px; height: ' + h + 'px;';

              if (bigLink) {
                imgStyle = 'width: 100%;';
              }
            }
            if (data.images.length > 1) {
              imgParams = '';
            }
            data.imagesStyles[cur.shareShowImg] = 'style="' + imgStyle + '"' + imgParams;
            addMedia.showPreview(fast);
            fast = true;
          }
        }
        clearInterval(cur.shareImgInterval);
        cur.shareImgInterval = setInterval(updatePreview, 300);
        setTimeout(updatePreview, 0);
      }
      cur.shareShowNext();
    },
    uploadShare: function(callback) {
      var data = addMedia.shareData, prev = addMedia.sharePreview;
      var uploadCont = prev.appendChild(ce('div', {innerHTML: '<iframe class="upload_frame" name="share_upload_iframe' + lnkId + '"></iframe>'})),
          uploadForm = uploadCont.appendChild(ce('form', {action: '/share.php', method: 'post', target: 'share_upload_iframe' + lnkId})),
          photoUrl = data.images[cur.shareShowImg];
      each({
        act: 'a_photo',
        url: data.url,
        index: lnkId,
        image: photoUrl,
        extra: data.extra || 0,
        hash: vk.ip_h
      }, function (i, v) {
        uploadForm.appendChild(ce('input', {type: 'hidden', name: i, value: v}));
      });
      window.onUploadDone = function(index, params) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData = extend(addMedia.shareData, {
          user_id: params.user_id,
          photo_id: params.photo_id,
          photo_url: photoUrl,
          images: []
        });
        setTimeout(callback, 0);
      };
      window.onUploadFail = function(index, msg) {
        window.onUploadFail = window.onUploadDone = function () {};
        prev.removeChild(uploadCont);
        addMedia.shareData.images = [];
        setTimeout(callback, 0);
      };
      cur.shareLastParseSubmitted = vkNow();
      uploadForm.submit();
    },

    setupPostpone: function(data, export_row) {
      var toEl;
      if (!multi && !ppdocsEl) {
        toEl = domPN(geByClass1('page_preview_postpone_wrap', previewEl));
      } else {
        toEl = ppdocsEl;
      }
      var ed = (cur.editingPost && domPN(toEl).id == 'wpe_media_preview'), h = (ed || !multi) ? '' : '1px', addedhtml = false;
      var html = '<div class="clear_fix">\
<div class="fl_l"><input type="hidden" id="postpone_date' + lnkId + '" value="' + (data.date || '') + '" /></div>\
<div class="fl_l medadd_c_timerat">' + data.lang.profile_wall_postpone_at + '</div>\
<div class="fl_l"><input type="hidden" id="postpone_time' + lnkId + '"/></div></div>';
      if (cur.editingPost && data.friends_only != undefined) {
        html += '<div class="medadd_c_timersett">';
        if (data.status_export != undefined) {
          html += '<div class="checkbox_status_export' + (data.status_export ? ' on' : '') + ' fl_l" id="status_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_twitter + '\', black: 1, shift: [12,4,0]});"></div>';
        }
        if (data.facebook_export != undefined) {
          html += '<div class="checkbox_facebook_export' + (data.facebook_export ? ' on' : '') + ' fl_l" id="facebook_export' + lnkId + '" onclick="checkbox(this)" onmouseover="showTooltip(this, {text: \'' + data.lang.export_to_facebook + '\', black: 1, shift: [12,4,0]});"></div>';
        }
        html += '<div class="checkbox' + (data.friends_only ? ' on' : '') + ' fl_l" id="friends_only' + lnkId + '" onclick="checkbox(this);checkbox(\'status_export' + lnkId + '\',!isChecked(this));checkbox(\'facebook_export' + lnkId + '\',!isChecked(this));">'+ data.lang.friends_only +'</div></div>';
        addedhtml = true;
      } else if (cur.editingPost && export_row) {
        html += export_row;
        addedhtml = true;
      }
      addMedia.postponePreview = toEl.appendChild(ce('div', {className: 'medadd_c medadd_c_timer clear_fix' + (addedhtml ? ' medadd_c_nofixed' : ''), innerHTML: html}));
      addMedia.postponePreview.style.height = h;
      stManager.add(['ui_controls.css', 'ui_controls.js', 'datepicker.css', 'datepicker.js'], function() {
        new Datepicker('postpone_date' + lnkId, {time: 'postpone_time' + lnkId, width: 120, noPast: true, minStep: 1, onUpdate: opts.onMediaChange});
        if (!ed && multi) {
          animate(addMedia.postponePreview, {height: 33}, 200, function() {
            addMedia.postponePreview.style.height = '';
          });
        }
      });
    },

    destroy: function() {
      if ((docsEl || {}).sorter) {
        docsEl.sorter.destroy();
      }
      if ((dpicsEl || {}).qsorter) {
        dpicsEl.qsorter.destroy();
      }
    },
    qsorterOpts: function() {
      return {
        xsize: Math.floor(dpicsEl.offsetWidth / 110),
        width: 110,
        height: 83,
        onReorder: opts.onAddMediaChange,
        clsUp: 'pam_dpic_up'
      };
    },
    resized: function() {
      if (window.ThumbsEdit) {
        ThumbsEdit.setWide('thumbs_edit' + cur.wallEditComposer.addMedia.lnkId);
      }
      if (dpicsEl.qsorter) {
        dpicsEl.qsorter.destroy();
        qsorter.init(dpicsEl, addMedia.qsorterOpts());
      }
    }
  }

  if (!cur.addMedia) {
    cur.addMedia = {};
  }

  cur.addMedia[lnkId] = addMedia;
  if (opts.onAddMediaChange) addMedia.onChange = opts.onAddMediaChange;
  return addMedia;
};

Composer = {
  init: function (el, options) {
    if (!(el = ge(el))) {
      return null;
    }

    var composer = data(el, 'composer');
    if (composer) {
      return composer;
    }
    composer = {
      input: el,
      inited: false,
      options: options
    };

    data(el, 'composer', composer);

    el.parentNode.insertBefore(
      composer.wddWrap = ce('div', {
        className: 'composer_wdd clear_fix ' + (options.wddClass || ''),
        id: el.id + '_composer_wdd',
        innerHTML: '<input type="hidden" id="' + el.id + '_composer_wdd_term"/>'
      }, {
        width: options.width || getSize(el)[0]
      }),
      el.nextSibling
    );

    composer.wddInput = composer.wddWrap.firstChild;
    composer.wdd = WideDropdown.initSelect(composer.wddWrap, extend({
      text: composer.wddInput,
      input: el,
      url: 'hints.php',
      params: {act: 'a_json_friends', from: 'composer'},
      noResult: options.lang.noResult || '',
      introText: options.lang.introText || '',
      onItemSelect: Composer.onItemSelect.bind(Composer).pbind(composer)
    }, options.wddOpts || {}));

    el.dd = composer.wddWrap.id;

    Composer.initEvents(composer);

    if (options.media) {
      composer.addMedia = new MediaSelector(options.media.lnk, options.media.preview, options.media.types, options.media.options);
    }

    setStyle(composer.wddWrap, 'width', '');

    composer.inited = true;

    return composer;
  },
  initEvents: function (composer) {
    addEvent(composer.input, 'keyup keydown keypress', Composer.onKeyEvent.pbind(composer));
    addEvent(composer.input, 'click mousedown mouseup focus blur paste', Composer.onMouseEvent.pbind(composer));
  },
  destroy: function (composer) {
    WideDropdown.deinit(composer.wddWrap);
    cleanElems(composer.input, composer.wddWrap);
    re(composer.wddWrap);
    composer.inited = false;
    if (composer.addMedia) composer.addMedia.destroy();
    data(composer.input, 'composer', null);
  },

  onKeyEvent: function (composer, event) {
    var controlEvent = composer.wdd && inArray(event.keyCode, [KEY.UP, KEY.DOWN, KEY.RETURN]);
    if (event.type == 'keypress' || event.type == 'keydown') {
      if (event.keyCode == KEY.RETURN || event.keyCode == 10) {
        if (!composer.select || !composer.select.isVisible()) {
          if (event.ctrlKey && isFunction(composer.options.onSubmit)) {
            // composer.input.blur();
            // composer.options.onSubmit();
            return true;
          }
        } else {
          triggerEvent(document, event.type, event);
          return cancelEvent(event);
        }
      }
      if (event.keyCode == KEY.TAB) {
        var input = composer.input,
            value = window.Emoji ? Emoji.editableVal(input) : '',
            curPos = Composer.getCursorPosition(input);
            curValue = value.substr(0, curPos) + "\001" + value.substr(curPos),
            matches = curValue.match(/^[\s\S]*(@|\*)[\S]+\s*\([\s\S]*?\001[\s\S]*?\)\s*/);

        if (matches) {
          var pos = matches[0].length - 1;
          elfocus(composer.input, pos, pos);
          return cancelEvent(event);
        }
      }
      var cnt = 0;
      for (var i in composer.wdd.shown) {
        cnt += 1;
      }
      if (controlEvent && isVisible(composer.wdd.listWrap) && cnt) {
        if (event.type == (browser.opera ? 'keypress' : 'keydown')) {
          WideDropdown._textEvent(event);
        }
        return cancelEvent(event);
      }
    }

    if (event.type == 'keyup' && !controlEvent) {
      if (event.keyCode == 65 && event.ctrlKey) { // fix Ctrl+A
        return;
      }
      if (composer.wdd && inArray(event.keyCode, [KEY.SPACE, KEY.HOME, 190, 191, 78, 55, 49])) {
        Composer.hideSelectList(composer);
      }
      Composer.updateAutoComplete(composer, event);
    }
  },
  onMouseEvent: function (composer, event) {
    if (event.type == 'blur') {
      Composer.hideSelectList(composer);
      return;
    }
    if (event.type == 'focus' || event.type == 'click') {
      Composer.updateAutoComplete(composer, event);
    }
    if (event.type == 'paste') {
      setTimeout(Composer.updateAutoComplete.pbind(composer, event), 0);
    }
  },
  updateAutoComplete: function (composer, event) {
    var input = composer.input,
        value = window.Emoji ? Emoji.editableVal(input) : val(input);


    //curPos = Composer.getCursorPosition(input),
    //prefValue = value.substr(0, curPos),
    var prefValue = value;
    var pos = Math.max(prefValue.lastIndexOf('@'), prefValue.lastIndexOf('*')),
        term = pos > -1 ? prefValue.substr(pos + 1) : false;

    if (term && term.match(/&nbsp;|[,\.\(\)\?\!\s\n \u00A0]|\#/)) {
      term = false;
    }
    composer.curValue = value;
    composer.curTerm = term;
    composer.curPos = pos;
    val(composer.wddInput, term);
    Composer.toggleSelectList(composer);

    if (event.type == 'keyup' || event.type == 'paste') {
      if (composer.options.onValueChange) {
        composer.options.onValueChange(prefValue, event.type != 'keyup');
      }
      if (composer.addMedia) {
        composer.addMedia.checkMessageURLs(prefValue, event.type != 'keyup');
      }
      if (composer.options.checkLen) {
        composer.options.checkLen(value);
      }
    }
  },
  toggleSelectList: function (composer) {
    var term = composer.curTerm;
    if (term === false) {
      Composer.hideSelectList(composer);
    } else {
      Composer.showSelectList(composer, term);
    }
  },
  hideSelectList: function (composer) {
    composer.wddInput.focused = false;
    WideDropdown._hideList(composer.wdd);
  },
  showSelectList: function (composer, term) {
    composer.wddInput.focused = true;
    WideDropdown.items(composer.wdd.id, cur.wallMentions || []);
    WideDropdown._updateList(composer.wdd, false, term);
  },
  onItemSelect: function (composer, item) {
    if (!item) {
      return false;
    }

    var mention = item[2].replace('@', ''),
        alias = item[1],
        prefValue = composer.curValue.substr(0, composer.curPos),
        suffValue = composer.curValue.substr(composer.curPos),
        aliasStartPos, aliasEndPos;

    if (!mention) {
      if (itemId > 0) {
        mention = 'id' + itemId;
      } else {
        mention = 'club' + Math.abs(itemId);
      }
    }

    var noAlias = prefValue.match(/\#[\w_\.\u0400-\u04FF]+$/i) ? true : false;

    var isEmoji = (window.Emoji && composer.input.emojiId !== undefined);
    if (!isEmoji) {
      alias = replaceEntities(alias);
    }

    cur.selNum = (cur.selNum || 0) + 1;
    suffValue = suffValue.replace(/^(@|\*)[^\s]*(?:\s+\((?:(.*?)\))?\s*)?/, function (whole, asterisk, prevAlias) {
      var replacement = asterisk + mention + ' ';
      if (noAlias) {
        aliasStartPos = aliasEndPos = replacement.length;
      } else {
        replacement += '('+(isEmoji ? '<span id="tmp_sel_'+cur.selNum+'">' : '');
        aliasStartPos = replacement.length;
        replacement += alias.replace(/[\(\)\]\[]/g, '');
        aliasEndPos = replacement.length;
        replacement += (isEmoji ? '</span>' : '')+') ';
      }

      return replacement;
    });

    aliasStartPos += composer.curPos;
    aliasEndPos += composer.curPos;

    Composer.hideSelectList(composer);
    if (isEmoji) {
      Emoji.val(composer.input, clean(prefValue) + suffValue);
      Emoji.focus(composer.input);
      Emoji.editableFocus(composer.input, ge('tmp_sel_'+cur.selNum), false, true)
    } else {
      val(composer.input, prefValue + suffValue);
      elfocus(composer.input, aliasStartPos, aliasEndPos);
    }
    return false;
  },
  getCursorPosition: function (node) {
    if (node.selectionStart) {
      return node.selectionStart;
    } else if (!document.selection) {
      return 0;
    }

    var c = "\001",
        sel = document.selection.createRange(),
        txt = sel.text,
        dup = sel.duplicate(),
        len = 0;

    try {
      dup.moveToElementText(node);
    } catch(e) {
      return 0;
    }
    sel.text  = txt + c;
    len = (dup.text.indexOf(c));
    sel.moveStart('character',-1);
    sel.text  = '';
    if (browser.msie && len == -1) {
      return node.value.length;
    }
    return len;
  },
  getSendParams: function(composer, delayedCallback, silentCheck) {
    var addMedia = composer.addMedia || {},
        media = addMedia.chosenMedia || {},
        medias = (addMedia && addMedia.getMedias) ? addMedia.getMedias() : [],
        share = (addMedia.shareData || {}),
        limit = composer && composer.options.media && composer.options.media.options.limit || 0;


      var input = composer.input;
      var message = trim(window.Emoji ? Emoji.editableVal(input) : val(input));
      var params = {message: message};
      var attachI = 0;

    if (isArray(media) && media.length) {
      medias.push(clone(media));
    }

    setStyle(bodyNode, {cursor: 'default'});

    if (medias.length) {
      var delayed = false;
      each (medias, function (k, v) {
        if (!isArray(v) || !v.length) {
          return;
        }
        var type = this[0],
            attachVal = this[1];
        if (attachI >= limit && type != 'postpone') {
          return false;
        }

        switch (type) {
          case 'poll':
            var poll = addMedia.pollData(silentCheck);
            if (!poll) {
              params.delayed = true;
              return false;
            }
            if (intval(attachVal)) {
              params.poll_id = intval(attachVal);
            }
            attachVal = poll.media;
            delete poll.media;
            params = extend(params, poll);
            break;

          case 'share':
            if (share.failed || !share.url ||
                !share.title && (!share.images || !share.images.length) && !share.photo_url) {
              if (cur.shareLastParseSubmitted && vkNow() - cur.shareLastParseSubmitted < 2000) {
                params.delayed = true;
                return false;
              } else {
                return;
              }
            }
            attachVal = share.user_id + '_' + share.photo_id;
            if (share.images && share.images.length && !silentCheck) {
              addMedia.uploadShare(delayedCallback);
              params.delayed = true;
              return false;
            }
            if (share.initialPattern && (trim(message) == share.initialPattern)) {
              params.message = '';
            }
            extend(params, {
              url: share.url,
              title: replaceEntities(share.title),
              description: replaceEntities(share.description),
              extra: share.extra,
              extra_data: share.extraData,
              photo_url: replaceEntities(share.photo_url),
              open_graph_data: (share.openGraph || {}).data,
              open_graph_hash: (share.openGraph || {}).hash
            });
            break;
          case 'page':
            if (share.initialPattern && (trim(message) == share.initialPattern)) {
              params.message = '';
            }
            break;
          case 'postpone':
            params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
            return;
        }
        if (this[3] && trim(message) == this[3]) {
          params.message = '';
        }
        params['attach' + (attachI + 1) + '_type'] = type;
        params['attach' + (attachI + 1)] = attachVal;
        attachI++;
      });
    }
    if (!addMedia.multi && !params.postpone && addMedia.postponePreview) {
      params.postpone = cur.postponedLastDate = val('postpone_date' + addMedia.lnkId);
    }

    return params;
  },
  reset: function (composer) {
    var input = composer.input,
        value = val(input),
        media = composer.addMedia,
        state = {value: value};

    //val(input, '');
    if (window.Emoji) {
      Emoji.val(input, '');
    } else {
      input.innerHTML = '';
    }
    if (media) {
      state.urlsCancelled = clone(media.urlsCancelled);
      media.unchooseMedia();
      media.urlsCancelled = [];
    }

    return state;
  },
  restore: function (composer, prevState) {
    var input = composer.input,
        state = Composer.reset(composer);
    val(input, prevState.value || '');

    return state;
  }
}

if (!window._postsSendTimer) _postsSendTimer = setTimeout(Page.postsSend, 10000);

try{stManager.done('page.js');}catch(e){}