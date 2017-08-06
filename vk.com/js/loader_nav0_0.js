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
    'music$': ['al_audio.php', ['audio.css', 'audio.js']],
    'apps_check($|/)': ['al_apps_check.php', ['apps.css', 'apps.js']],
    'apps($|/)': ['al_apps.php', ['apps.css', 'apps.js']],
    'editapp($|/)': ['al_apps_edit.php', ['apps.css', 'apps.js']],
    'regstep\\d$': ['register.php', ['reg.js', 'reg.css', 'ui_controls.js', 'ui_controls.css', 'selects.js']],
    'video(-?\\d+_\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'videoview.js', 'videoview.css', 'indexer.js']],
    'videos(-?\\d+)?$': ['al_video.php', ['video.js', 'video.css', 'indexer.js']],
    'feed$': ['al_feed.php', ['page.css', 'page.js', 'feed.css', 'feed.js']],
    'friends$': ['al_friends.php', ['friends.js', 'friends.css', 'privacy.css']],
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
    'restoreinfo($|/)': ['al_restore.php', ['restore.js', 'restore.css']],
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
    'ads/([a-zA-Z0-9\\_]+)$': ['ads.php', ['ads.css', 'ads.js', 'landings/ads.css', 'landings/landings.css', 'landing_aes.js']],
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
    'mask(-?\\d+)_(\\d+)$': ['al_masks.php', []],
    'bugtracker($|/)': ['al_bugtracker.php', ['bugtracker.css', 'bugtracker.js']],
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']],
    'cvkmobile($|/)': ['cvkmobile.php', ['internal/cvkmobile.css', 'internal/cvkmobile.js']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1152,
    'common.css': 28111968164,
    'pads.css': 16791282708,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 19058916639,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 3506952057,
    'lite.css': 37507435568,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 16943642406,
    'pagination.js': 1027022568,
    'blog.css': 19360895639,
    'blog.js': 359555078,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 18596743497,
    'audioplayer.js': 6102755754,
    'audioplayer.css': 17861017488,
    'audio_html5.js': 287741914,
    'audio.js': 4208287671,
    'audio.css': 21861814625,
    'gifts.css': 21162795381,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 19733639398,
    'boxes.css': 18131125330,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 1683501140,
    'tooltips.css': 19935335449,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 17382286087,
    'photoview.js': 3288303292,
    'photoview.css': 19964202884,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 17548866290,
    'spe.js': 3760998372,
    'friends.js': 493278683,
    'friends.css': 18800866183,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 3422383258,
    'board.css': 22578881479,
    'photos.css': 20938363293,
    'photos.js': 152064977,
    'photos_add.css': 22760532554,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2577556179,
    'wkview.css': 22327505500,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 187248878,
    'video.css': 22959172167,
    'videocat.js': 1618923991,
    'videocat.css': 21319832899,
    'videoview.js': 3729849832,
    'videoview.css': 23601725459,
    'video_edit.js': 2135196486,
    'video_edit.css': 18176580569,
    'video_upload.js': 555062683,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 15842985884,
    'videoplayer.js': 77017256373,
    'videoplayer.css': 37723165036,
    'translation.js': 2431784533,
    'translation.css': 17094275284,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 19725712347,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 16602019064,
    'index.js': 3228561433,
    'join.css': 18782556742,
    'join.js': 4281861549,
    'intro.css': 19108411983,
    'post.css': 19602273722,
    'module.css': 18662423678,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 21855438343,
    'page.js': 4146090818,
    'page.css': 24052064554,
    'page_help.css': 22545108284,
    'public.css': 24333699869,
    'public.js': 3770119342,
    'pages.css': 21108879791,
    'pages.js': 1162259210,
    'groups.css': 28779728223,
    'groups.js': 2975645919,
    'groups_list.js': 3507753248,
    'groups_edit.css': 28586341854,
    'groups_edit.js': 806425769,
    'profile.css': 24606436354,
    'profile.js': 642429379,
    'calendar.css': 21115456535,
    'calendar.js': 4203451993,
    'wk.css': 21115639041,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 20950512522,
    'qsearch.js': 4098038985,
    'wall.css': 23790111311,
    'wall.js': 106343366,
    'walledit.js': 2578709853,
    'thumbs_edit.css': 16233131547,
    'thumbs_edit.js': 2241504624,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 107758367563,
    'imn.js': 113939998492,
    'im.js': 1322065004,
    'emoji.js': 1068454446,
    'wide_dd.css': 18952341655,
    'wide_dd.js': 452755344,
    'writebox.css': 19031689342,
    'writebox.js': 4788293668,
    'sharebox.js': 4060876929,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 2806083649,
    'feed.css': 22367087186,
    'privacy.js': 3620108221,
    'privacy.css': 18792269908,
    'apps.css': 21296933297,
    'apps.js': 2931332228,
    'apps_edit.js': 119002668,
    'apps_edit.css': 23932439180,
    'apps_check.js': 3844411974,
    'apps_check.css': 23461658604,
    'settings.js': 2882263597,
    'settings.css': 22337524860,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 18261641074,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 2511896194,
    'search.css': 26850939571,
    'grid_sorter.js': 3170482150,
    'auto_list.js': 3820785325,
    'suggester.js': 1574258788,
    'datepicker.js': 1574876075,
    'datepicker.css': 21496042581,
    'oauth_popup.css': 24886476120,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 22879390471,
    'fave.js': 128270649,
    'fave.css': 23704442948,
    'widget_comments.css': 27485318044,
    'widget_auth.css': 25163177842,
    'widget_community.css': 28821227803,
    'widget_contactus.css': 27441435620,
    'widget_post.css': 26315850768,
    'widget_allow_messages_from_community.css': 28279630688,
    'api/widgets/al_comments.js': 932106859,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 1056997481,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 4053792122,
    'api/widgets/al_post.js': 2158816595,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 25087118678,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 26347096641,
    'al_poll.css': 3,
    'widget_recommended.css': 25143330805,
    'widgets.css': 25022440965,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 29061583317,
    'notifier.css': 25476131790,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 1242653913,
    'restore.css': 20070426784,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 4024778124,
    'docs.css': 23505833452,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 18254950033,
    'tasks.js': 662793453,
    'tasks.css': 17599714954,
    'helpdesk.js': 429859829,
    'helpdesk.css': 21501075618,
    'tickets.js': 80447799,
    'tickets.css': 19281127561,
    'faq.js': 1134602325,
    'faq.css': 20989809026,
    'talmud.js': 1641838680,
    'agents.js': 1719521972,
    'agents.css': 18990371115,
    'achievements.js': 897703126,
    'achievements.css': 16968368700,
    'sf.css': 17096979975,
    'sal.css': 17155503079,
    'members.css': 18177602724,
    'meminfo.css': 21808742003,
    'groupinfo.css': 21269814789,
    'bugs.js': 3874995669,
    'bugs.css': 16224630048,
    'bugtracker.js': 1097219715,
    'bugtracker.css': 25579834748,
    'login.css': 18451818235,
    'login.js': 3551917100,
    'upload.js': 3319172650,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 19688641026,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 20472011470,
    'stats.css': 19289084643,
    'payments.css': 19788221688,
    'payments.js': 1241163123,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 24152277881,
    'aes_light.js': 3306454788,
    'ads.css': 22444993468,
    'ads_bonus.css': 460482192,
    'ads.js': 1629241604,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 18447782158,
    'ads_edit.js': 290539585,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 16709618257,
    'ads_moder.css': 16072296441,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 3522009107,
    'ads_tagger.js': 2289308011,
    'ads_web.css': 1585148602,
    'ads_web.js': 4274163593,
    'mrtarg.js': 1146267795,
    'mrtarg.css': 3142794554,
    'health.css': 2251304991,
    'health.js': 2993570139,
    'pinbar.js': 284788792,
    'sms_office.css': 3956948163,
    'sms_office.js': 1747548685,
    'help.css': 2602432866,
    'help.js': 981062856,
    'claims.css': 17549217420,
    'claims.js': 4191854833,
    'video_embed.js': 492405,
    'video_embed.css': 19784159386,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 16242559281,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 21516950454,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 318083439,
    'pe.css': 16143213024,
    'dev.js': 4126919969,
    'dev.css': 26390974210,
    'share.css': 26809153986,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 17841158945,
    'print.js': 1255624803,
    'print.css': 18178960311,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 17169645029,
    'ui.js': 3953380422,
    'ui_common.js': 2918179257,
    'ui_common.css': 18376186091,
    'ui_media_selector.js': 292427396,
    'ui_media_selector.css': 20816803002,
    'ui_manual.css': 17137306753,
    'admin.js': 2866808704,
    'admin.css': 20183420580,
    'duty_timetable.js': 929110027,
    'duty_timetable.css': 19178183130,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 18207923096,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 17895133989,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 18804487748,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 21131173303,
    'landings/vk10_years.css': 17485079423,
    'chronicle.css': 17685937762,
    'market.css': 22278594028,
    'market.js': 1427771939,
    'stories_admin.css': 19071167100,
    'stories_admin.js': 3474276114,
    'vk2016.css': 2369321949,
    'landings/common.css': 21521397231,
    'landings/community_message.css': 16948652914,
    'landings/wdsd.css': 21071273719,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 16121365786,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 20220946804,
    'landings/psb.css': 20925040025,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 23229953051,
    'landings/moneysend.css': 19653758034,
    'landings/desktop_messenger.css': 19781964123,
    'landings/vklive.css': 16483645291,
    'landings/vk2017.css': 17561099444,
    'landings/vkmusic.css': 1141958758,
    'landings/vkmusic.js': 1745567881,
    'landings/vkmasks.css': 3103874243,
    'landings/vkmasks.js': 1193444147,
    'landings/ads.css': 20332909724,
    'landing_aes.js': 17456535829,
    'landings/donors_day.css': 19811879099,
    'landing_donors_day.js': 1027075361,
    'vkme.css': 18732623100,
    'ui_controls.js': 1680051856,
    'highcharts.js': 1982709850,
    'ui_controls.css': 17583968884,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 19491464609,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 18185599087,
    'api/share.js': 2621084197,
    'api/openapi.js': 1813688167,
    'api/xdm.js': 1449919642,
    'css_clean.js': 4210402166,
    'hls.min.js': 625660376,
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
    'snapster/style.css': 19376076258,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 3964802700,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 20784408612,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 19836473055,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 18358416988,
    'top_logo.css': 16868123875,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 24272478849,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 1228312456,
    'stories.css': 18402400553,
    'internal/nospam.css': 20265752813,
    'internal/away_linksban.css': 19008378347,
    'internal/patterns_info.css': 17783704515,
    'internal/cvkmobile.css': 19339484833,
    'internal/cvkmobile.js': 3693679928,
    'shortener.js': 1002525642,
    'cmodules/web/pretty_cards.js': 230288707,
    'lang': 6830
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
    },
    fromCompiled: {
        'imn.js': 1,
        'audioplayer.js': 1,
        'notifier.js': 1,
        'writebox.js': 1,
        'landing_aes.js': 1,
        'speech.js': 1,
        'voice_message_player.js': 1,
        'videoplayer.js': 1,
        'landing_donors_day.js': 1,
        'grid_sorter2.js': 1,
        'lead_forms_app.js': 1
    }
};
var _rnd = 1093;