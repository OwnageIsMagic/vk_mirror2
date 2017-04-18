var navMap = {
    '<void>': ['al_index.php', ['index.css', 'index.js']],
    '<other>': ['al_profile.php', ['profile.css', 'page.css', 'profile.js', 'page.js']],
    'public\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'event\\d+($|/)': ['al_events.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'club\\d+($|/)': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'publics\\d+($|/)': ['al_public.php', ['public.css', 'page.css', 'public.js', 'page.js']],
    'groups(\\d+)?$': ['al_groups.php', ['groups.css', 'groups_list.js', 'indexer.js']],
    'events$': ['al_groups.php', ['groups.css', 'page.css', 'groups.js', 'page.js']],
    'changemail$': ['register.php', ['reg.css']],
    'mail($|/)': ['al_mail.php', ['im.css', 'imn.js']],
    'write[-]?\\d*($|/)': ['al_mail.php', ['im.css', 'imn.js']],
    'im($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'gim\\d+($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'audio-?\\d+_\\d+$': ['al_audio.php', ['audio.css', 'audio.js']],
    'audios(-?\\d+)?$': ['al_audio.php', ['audio.css', 'audio.js']],
    'audio($|/)': ['al_audio.php', ['audio.css', 'audio.js']],
    'apps_check($|/)': ['al_apps_check.php', ['apps.css', 'apps.js']],
    'apps($|/)': ['al_apps.php', ['apps.css', 'apps.js']],
    'editapp($|/)': ['al_apps_edit.php', ['apps.css', 'apps.js']],
    'regstep\\d$': ['register.php', ['reg.js', 'reg.css', 'ui_controls.js', 'ui_controls.css', 'selects.js']],
    'video(-?\\d+_\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'videoview.js', 'videoview.css', 'indexer.js']],
    'videos(-?\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'indexer.js']],
    'feed$': ['al_feed.php', ['page.css', 'page.js', 'feed.css', 'feed.js']],
    'friends$': ['al_friends.php', ['friends.js', 'friends.css', 'privacy.css']],
    'friendsphotos$': ['al_photos.php', ['friendsphotos.js', 'photoview.js', 'friendsphotos.css', 'photoview.css']],
    'wall-?\\d+(_\\d+)?$': ['al_wall.php', ['page.js', 'page.css', 'wall.js', 'wall.css']],
    'tag\\d+$': ['al_photos.php', ['photos.js', 'photoview.js', 'photos.css', 'photoview.css']],
    'albums(-?\\d+)?$': ['al_photos.php', ['photos.js', 'photos.css']],
    'photos(-?\\d+)?$': ['al_photos.php', ['photos.js', 'photos.css']],
    'album-?\\d+_\\d+$': ['al_photos.php', ['photos.js', 'photos.css']],
    'photo-?\\d+_\\d+$': ['al_photos.php', ['photos.js', 'photos.css', 'photoview.js', 'photoview.css']],
    'search$': ['al_search.php', ['search.css', 'search.js']],
    'people($|/)': ['al_search.php', ['search.css', 'search.js']],
    'communities$': ['al_search.php', ['search.css', 'search.js']],
    'brands$': ['al_search.php', ['search.css', 'search.js']],
    'invite$': ['invite.php', ['invite.css', 'invite.js', 'ui_controls.css', 'ui_controls.js']],
    'join$': ['join.php', ['join.css', 'join.js']],
    'settings$': ['al_settings.php', ['settings.js', 'settings.css']],
    'edit$': ['al_profileEdit.php', ['profile_edit.js', 'profile_edit.css']],
    'blog($|/)': ['blog.php', ['blog.css', 'blog.js', 'page.js']],
    'fave$': ['al_fave.php', ['fave.js', 'fave.css', 'page.css', 'wall.css', 'qsorter.js', 'indexer.js']],
    'topic$': ['al_board.php', ['board.css']],
    'board\\d+$': ['al_board.php', ['board.css', 'board.js']],
    'topic-?\\d+_\\d+$': ['al_board.php', ['board.css', 'board.js']],
    'stats($|/)': ['al_stats.php', ['stats.css']],
    'ru/(.*)?$': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'pages($|/)': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'page-?\\d+_\\d+$': ['al_pages.php', ['pages.css', 'pages.js', 'wk.css', 'wk.js']],
    'restore($|/)': ['al_restore.php', ['restore.js', 'restore.css']],
    'recover($|/)': ['recover.php', ['recover.js', 'recover.css']],
    'gifts\\d*$': ['al_gifts.php', ['gifts.js', 'gifts.css']],
    'docs($|/)': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'doc-?\\d+_\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'docs-?\\d+$': ['docs.php', ['docs.css', 'docs.js', 'indexer.js']],
    'login($|/)': ['al_login.php', ['login.css', 'login.js']],
    'tasks($|/)': ['tasks.php', ['tasks.css', 'tasks.js']],
    'abuse($|/)': ['abuse.php', ['abuse.css', 'abuse.js']],
    'abuse2($|/)': ['abuse2.php', []],
    'restore2($|/)': ['restore2.php', ['dyn-restore2.css', 'dyn-restore2.js', 'dyn-restore2_aa.js', 'sorter.js']],
    'datababes($|/)': ['datababes.php', []],
    '(support($|/)|faq\\d+)': ['al_tickets.php', ['tickets.css', 'tickets.js']],
    'helpdesk($|/)': ['al_helpdesk.php', ['tickets.css', 'tickets.js']],
    'offersdesk($|/)': ['offers.php', ['offers.css', 'offers.js']],
    'payments($|/)': ['al_payments.php', ['payments.css']],
    'faq($|/)': ['al_faq.php', ['faq.css', 'faq.js']],
    'tlmd($|\\d+|/)': ['al_talmud.php', ['talmud.js']],
    'sms_office($|/)': ['sms_office.php', ['sms_office.css', 'sms_office.js']],
    'dev($|/)': ['dev.php', ['dev.css', 'dev.js']],
    'developers($|/)': ['al_developers.php', ['developers.css']],
    'help($|/)': ['al_help.php', ['help.css', 'help.js']],
    'claims($|/)': ['al_claims.php', ['claims.css', 'claims.js']],
    'video_embed($|/)': ['al_video_embed.php', ['video_embed.css', 'video_embed.js']],
    'ads$': ['ads.php', ['ads.css', 'ads.js']],
    'adbonus$': ['ads.php', ['ads.css', 'ads.js']],
    'adsbonus$': ['ads.php', ['ads.css', 'ads.js']],
    'adregister$': ['ads.php', ['ads.css', 'ads.js']],
    'adsedit$': ['ads_edit.php', ['ads.css', 'ads.js', 'ads_edit.css', 'ads_edit.js']],
    'adscreate$': ['ads_edit.php', ['ads.css', 'ads.js', 'ads_edit.css', 'ads_edit.js']],
    'adsmoder$': ['ads_moder.php', ['ads.css', 'ads.js', 'ads_moder_common.css', 'ads_moder.css', 'ads_moder_common.js', 'ads_moder.js']],
    'adsweb$': ['ads_web.php', ['ads.css', 'ads.js', 'ads_web.css', 'ads_web.js']],
    'ads/([a-zA-Z0-9\\_]+)$': ['ads.php', ['ads.css', 'ads.js', 'landings/ads.css', 'landings/landings.css', 'landing_ads.js']],
    'exchange$': ['ads_posts.php', ['ads.css', 'ads.js', 'exchange.css', 'exchange.js']],
    'exchangemoder$': ['ads_posts_moder.php', ['ads.css', 'ads.js', 'ads_moder_common.css', 'exchange_moder.css', 'ads_moder_common.js', 'exchange_moder.js']],
    'offers$': ['ads_offers.php', ['ads.css', 'ads.js', 'ads_offers.css', 'ads_offers.js']],
    'offersmoder$': ['ads_offers_moder.php', ['ads.css', 'ads.js', 'ads_offers_moder.css', 'ads_offers_moder.js']],
    'test$': ['al_help.php', ['help.css', 'help.js']],
    'agenttest$': ['al_help.php', ['help.css', 'help.js']],
    'grouptest$': ['al_help.php', ['help.css', 'help.js']],
    'dmca$': ['al_tickets.php', ['tickets.css', 'tickets.js']],
    'terms$': ['al_help.php', ['help.css', 'help.js']],
    'privacy$': ['al_help.php', ['help.css', 'help.js']],
    'licence$': ['al_help.php', ['help.css', 'help.js']],
    'editdb($|/)': ['edit.php', ['edit.js']],
    'note\\d+_\\d+$': ['al_wall.php', ['wall.js', 'wall.css', 'wk.js', 'wk.css', 'pagination.js']],
    'notes(\\d+)?$': ['al_wall.php', ['wall.js', 'wall.css', 'wk.js', 'wk.css', 'pagination.js']],
    'bugs($|/)': ['bugs.php', ['bugs.css', 'bugs.js']],
    'wkview.php($)': ['wkview.php', ['wkview.js', 'wkview.css', 'wk.js', 'wk.css']],
    'stickers_office($|/)': ['stickers_office.php', ['stickers_office.css', 'stickers_office.js']],
    'charts($|/)': ['al_audio.php', ['audio.css', 'audio.js']],
    'maps($|/)': ['maps.php', []],
    'jobs$': ['al_jobs.php', ['jobs.css', 'jobs.js', 'blog.css', 'blog.js']],
    'about$': ['blog.php', ['blog.css', 'blog.js']],
    'products$': ['blog.php', ['blog.css', 'blog.js']],
    'ui$': ['ui.php', []],
    'translation($|/)': ['al_translations.php', []],
    'mobile$': ['al_login.php', []],
    'stickers($|/)': ['al_im.php', ['imn.js', 'im.css', 'emoji.js', 'notifier.css']],
    'print$': ['al_print.php', ['print.css', 'print.js']],
    'pattern(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'link(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'autoreg(\\d+)?$': ['patterns_info.php', ['dyn-patterns_info.css', 'dyn-patterns_info.js', 'page.css']],
    'statlogs($|/)': ['statlogs_view.php', ['statlogs.css']],
    'market(-?\\d+)?(_\\d+)?$': ['al_market.php', ['market.css', 'market.js']],
    'stories(-?\\d+)?(_\\d+)?$': ['al_stories.php', ['stories.css', 'stories.js']],
    'story(-?\\d+)_(\\d+)$': ['al_stories.php', ['stories.css', 'stories.js']],
    'bugtracker($|/)': ['al_bugtracker.php', ['bugtracker.css', 'bugtracker.js']],
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['internal/meminfo.js', 'meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1143,
    'common.css': 27788073906,
    'pads.css': 19546347384,
    'retina.css': 1499557272,
    'uncommon.js': 1524646384,
    'uncommon.css': 19426915747,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 2040438164,
    'lite.css': 37311944802,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 18647607966,
    'pagination.js': 1027022568,
    'blog.css': 19843021600,
    'blog.js': 2208986828,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 20300709057,
    'audioplayer.js': 6425864519,
    'audioplayer.css': 21826268869,
    'audio_html5.js': 287741914,
    'audio.js': 2995098174,
    'audio.css': 25948075735,
    'gifts.css': 22866760941,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 21437604958,
    'boxes.css': 19835090890,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 3126166391,
    'tooltips.css': 24772692295,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 19086251647,
    'photoview.js': 2919002621,
    'photoview.css': 27012804021,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 19252831850,
    'friendsphotos.js': 169519698,
    'friendsphotos.css': 2849056081,
    'spe.js': 3760998372,
    'friends.js': 3212870034,
    'friends.css': 19475046977,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 2538879168,
    'board.css': 25631672467,
    'photos.css': 27187403999,
    'photos.js': 152064977,
    'photos_add.css': 29009573260,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 432847416,
    'wkview.css': 24668372197,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 3840498487,
    'video.css': 26690424046,
    'videocat.js': 1618923991,
    'videocat.css': 26145979913,
    'videoview.js': 114026342,
    'videoview.css': 23870988860,
    'video_edit.js': 2135196486,
    'video_edit.css': 25461204814,
    'video_upload.js': 10194165,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 17546951444,
    'videoplayer.js': 75722058208,
    'videoplayer.css': 44998022424,
    'translation.js': 2431784533,
    'translation.css': 18798240844,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 21429677907,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 24757712248,
    'index.js': 752775373,
    'join.css': 23574944082,
    'join.js': 4281861549,
    'intro.css': 24654578437,
    'post.css': 23948728369,
    'module.css': 21774932180,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 23559403903,
    'page.js': 818268577,
    'page.css': 24384351459,
    'page_help.css': 25597899272,
    'public.css': 28656662824,
    'public.js': 3882483539,
    'pages.css': 24161670779,
    'pages.js': 1162259210,
    'groups.css': 23321301083,
    'groups.js': 2480648562,
    'groups_list.js': 3749004720,
    'groups_edit.css': 34483653759,
    'groups_edit.js': 942087830,
    'profile.css': 27659227342,
    'profile.js': 2009394955,
    'calendar.css': 22819422095,
    'calendar.js': 4203451993,
    'wk.css': 24168430029,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 22654478082,
    'qsearch.js': 4098038985,
    'wall.css': 26842902299,
    'wall.js': 3216669114,
    'walledit.js': 3566580322,
    'thumbs_edit.css': 24863601581,
    'thumbs_edit.js': 662560525,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 110387185258,
    'imn.js': 116921470932,
    'im.js': 1322065004,
    'emoji.js': 3607330516,
    'wide_dd.css': 17889699206,
    'wide_dd.js': 3323487336,
    'writebox.css': 20735654902,
    'writebox.js': 6141701117,
    'sharebox.js': 3843850841,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 3739434507,
    'feed.css': 27705447318,
    'privacy.js': 3620108221,
    'privacy.css': 20496235468,
    'apps.css': 31642006597,
    'apps.js': 535626174,
    'apps_edit.js': 2664300316,
    'apps_edit.css': 29647083000,
    'apps_check.js': 3844411974,
    'apps_check.css': 29503144393,
    'settings.js': 2089554304,
    'settings.css': 27877695619,
    'profile_edit.js': 312998250,
    'profile_edit.css': 19965606634,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 281115018,
    'profile_edit_mil.js': 112384103,
    'search.js': 1757480726,
    'search.css': 34779674684,
    'grid_sorter.js': 703789694,
    'auto_list.js': 2419796116,
    'suggester.js': 3187629441,
    'datepicker.js': 808741082,
    'datepicker.css': 23200008141,
    'oauth_popup.css': 27653080292,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 25932181459,
    'fave.js': 128270649,
    'fave.css': 24696484217,
    'widget_comments.css': 33467508616,
    'widget_auth.css': 27929782014,
    'widget_community.css': 32610104967,
    'widget_contactus.css': 30208039792,
    'widget_post.css': 32621195288,
    'widget_allow_messages_from_community.css': 31046234860,
    'api/widgets/al_comments.js': 920774215,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 406706841,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 4053792122,
    'api/widgets/al_post.js': 1217136033,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 27853722850,
    'api/widgets/community_messages.js': 3264850638,
    'widget_community_messages.css': 29535112450,
    'al_poll.css': 3,
    'widget_recommended.css': 27909934977,
    'widgets.css': 27789045137,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 31215077695,
    'notifier.css': 26227153858,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 2919872619,
    'restore.css': 20697664271,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 3215535710,
    'docs.css': 29192974696,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 19958915593,
    'tasks.js': 662793453,
    'tasks.css': 19303680514,
    'helpdesk.js': 3330561566,
    'helpdesk.css': 24907729158,
    'tickets.js': 3256001699,
    'tickets.css': 22019979898,
    'faq.js': 1134602325,
    'faq.css': 22693774586,
    'talmud.js': 1641838680,
    'agents.js': 1228491530,
    'agents.css': 20458990689,
    'achievements.js': 897703126,
    'achievements.css': 19033120517,
    'sf.css': 18106381651,
    'sal.css': 18859468639,
    'members.css': 19881568284,
    'meminfo.css': 22336705974,
    'groupinfo.css': 22896475162,
    'bugs.js': 3874995669,
    'bugs.css': 17928595608,
    'bugtracker.js': 1102849787,
    'bugtracker.css': 20858190615,
    'login.css': 23654366167,
    'login.js': 3551917100,
    'upload.js': 2080738373,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 22741432014,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 21794449797,
    'stats.css': 20993050203,
    'payments.css': 21907027654,
    'payments.js': 4066298509,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 29490889418,
    'aes_light.js': 2817066015,
    'ads.css': 26836475107,
    'ads_bonus.css': 460482192,
    'ads.js': 2612459391,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 18261821966,
    'ads_edit.js': 1915889757,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 18413583817,
    'ads_moder.css': 19337480178,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 1303830416,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 3654572848,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 3956948163,
    'sms_office.js': 1747548685,
    'help.css': 2602432866,
    'help.js': 981062856,
    'claims.css': 19253182980,
    'claims.js': 577939270,
    'video_embed.js': 492405,
    'video_embed.css': 21488124946,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 20947155781,
    'wk_editor.js': 2318898403,
    'wk_editor.css': 24569741442,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 318083439,
    'pe.css': 17847178584,
    'dev.js': 4126919969,
    'dev.css': 31600137294,
    'share.css': 28010835168,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 22605429354,
    'print.js': 1255624803,
    'print.css': 19882925871,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 18873610589,
    'ui.js': 3953380422,
    'ui_common.js': 2289307861,
    'ui_common.css': 20388110531,
    'ui_media_selector.js': 4095281702,
    'ui_media_selector.css': 22770531232,
    'ui_manual.css': 18841272313,
    'admin.js': 2866808704,
    'admin.css': 22391616722,
    'duty_timetable.js': 929110027,
    'duty_timetable.css': 20882148690,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 19911888656,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 19599099549,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 20508453308,
    'ads_offers.js': 153944036,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 22835138863,
    'landings/vk10_years.css': 19189044983,
    'chronicle.css': 19389903322,
    'market.css': 26283691422,
    'market.js': 3418710663,
    'vk2016.css': 2369321949,
    'landings/common.css': 23225362791,
    'landings/community_message.css': 18652618474,
    'landings/wdsd.css': 22775239279,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 17825331346,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 21924912364,
    'landings/psb.css': 26161979669,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 28466892695,
    'landings/moneysend.css': 21357723594,
    'landings/desktop_messenger.css': 19544904342,
    'landings/vklive.css': 18187610851,
    'landings/vk2017.css': 19265065004,
    'landings/ads.css': 19682937441,
    'landing_ads.js': 15031708232,
    'vkme.css': 20436588660,
    'ui_controls.js': 35629744,
    'highcharts.js': 1982709850,
    'ui_controls.css': 18525908499,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 25037631063,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 19889564647,
    'api/share.js': 1988203672,
    'api/openapi.js': 2055898460,
    'api/xdm.js': 1449919642,
    'css_clean.js': 4210402166,
    'hls.min.js': 4279436662,
    'candy.min.js': 1892723665,
    'q_frame.php': 7,
    '/swf/api_wrapper.swf': 7,
    '/swf/api_external.swf': 8,
    '/swf/api_wrapper2_0.swf': 8,
    '/swf/video_lite.swf': 2,
    '/swf/audio_lite.swf': 13,
    '/swf/uploader_lite.swf': 13,
    '/swf/photo_uploader_lite.swf': 17,
    '/swf/CaptureImg.swf': 12,
    '/swf/video.swf': 157,
    '/swf/vkvideochat.swf': 50,
    '/swf/vchatdevices.swf': 1,
    'snapster/style.css': 21080041818,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 1744321754,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 22488374172,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 21540438615,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 20062382548,
    'top_logo.css': 18572089435,
    'favicon': 5,
    'speech.js': 40673857514,
    'voice_message_player.js': 25193101599,
    'speech_worker_mp3.js': 1172578475,
    'speech_worker_opus.js': 3385759348,
    'stories.js': 2359937612,
    'stories.css': 19765823923,
    'shortener.js': 1002525642,
    'lang': 6767
};
var stTypes = {
    fromLib: {
        'md5.js': 1,
        'clipboard.js': 1,
        'ui_controls.js': 1,
        'highcharts.js': 1,
        'selects.js': 1,
        'sort.js': 1,
        'maps.js': 1,
        'css_clean.js': 1,
        'hls.min.js': 1,
        'candy.min.js': 1
    },
    fromRoot: {
        'api/share.js': 1,
        'api/openapi.js': 1,
        'api/xdm.js': 1,
        'apps_flash.js': 1,
        'mentions.js': 1,
        'map2.js': 1,
        'ui_controls.css': 1,
        'map.css': 1,
        'paginated_table.js': 1,
        'paginated_table.css': 1,
        'snapster/common.js': 1,
        'snapster/style.css': 1,
        'snapster/page.js': 1,
        'snapster/mobile.css': 1,
        'snapster/main.js': 1,
        'mobile/common.js': 1,
        'mobile/oauth.js': 1,
        'mobile/snapster.js': 1,
        'mobile/adaptive_table.css': 1,
        'mobile/base_head.css': 1,
        'mobile/base_screen.css': 1,
        'mobile/common.css': 1,
        'mobile/common_2x.css': 1,
        'mobile/full_browser.css': 1,
        'mobile/gallery.css': 1,
        'mobile/ios_device.css': 1,
        'mobile/medium_head.css': 1,
        'mobile/medium_screen.css': 1,
        'mobile/oauth_android.css': 1,
        'mobile/oauth_ios.css': 1,
        'mobile/oauth_winmobile.css': 1,
        'mobile/small_screen.css': 1,
        'mobile/snapster.css': 1,
        'mobile/wiki.css': 1
    }
};
var _rnd = 2580;