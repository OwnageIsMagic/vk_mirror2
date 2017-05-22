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
    'bugtracker($|/)': ['al_bugtracker.php', ['bugtracker.css', 'bugtracker.js']],
    'landings$': ['landings.php', []],
    'ach($|/)': ['achievements.php', ['achievements.css', 'achievements.js']],
    'memedit($|/)': ['members.php', ['members.css', 'dyn-members.js']],
    'meminfo($|/)': ['member_info.php', ['cmodules/internal/meminfo.js', 'meminfo.css']],
    'groupinfo($|/)': ['group_info.php', ['groupinfo.css']]
};
var stVersions = {
    'nav': 0,
    'fonts_cnt.css': 2889730895,
    'common.js': 1148,
    'common.css': 31093051793,
    'pads.css': 12911477957,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 13843145436,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 1843199387,
    'lite.css': 39777362911,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 13063837655,
    'pagination.js': 1027022568,
    'blog.css': 14259251289,
    'blog.js': 3187719799,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 14716938746,
    'audioplayer.js': 5342631254,
    'audioplayer.css': 13981212736,
    'audio_html5.js': 287741914,
    'audio.js': 3050291824,
    'audio.css': 23632910535,
    'gifts.css': 17282990630,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 15853834647,
    'boxes.css': 14251320579,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 3126166391,
    'tooltips.css': 22704303505,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 13502481336,
    'photoview.js': 2919002621,
    'photoview.css': 25489374887,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 13669061539,
    'spe.js': 3760998372,
    'friends.js': 3212870034,
    'friends.css': 14323259345,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 2538879168,
    'board.css': 23563283677,
    'photos.css': 21603633688,
    'photos.js': 152064977,
    'photos_add.css': 23425802949,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2577556179,
    'wkview.css': 23311907698,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 3840498487,
    'video.css': 22279188509,
    'videocat.js': 1618923991,
    'videocat.css': 20562209602,
    'videoview.js': 1193625786,
    'videoview.css': 26263339259,
    'video_edit.js': 2135196486,
    'video_edit.css': 18841850964,
    'video_upload.js': 1022936202,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 11963181133,
    'videoplayer.js': 80124333280,
    'videoplayer.css': 37030466789,
    'translation.js': 2431784533,
    'translation.css': 13214470533,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 15845907596,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 19173941937,
    'index.js': 752775373,
    'join.css': 17991173771,
    'join.js': 4281861549,
    'intro.css': 19070808126,
    'post.css': 20867994039,
    'module.css': 22024317919,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 17975633592,
    'page.js': 4223660935,
    'page.css': 24089996578,
    'page_help.css': 23529510482,
    'public.css': 26588274034,
    'public.js': 3770119342,
    'pages.css': 22093281989,
    'pages.js': 1162259210,
    'groups.css': 26238391052,
    'groups.js': 2975645919,
    'groups_list.js': 3507753248,
    'groups_edit.css': 29001715595,
    'groups_edit.js': 4194796742,
    'profile.css': 25590838552,
    'profile.js': 116458155,
    'calendar.css': 17235651784,
    'calendar.js': 4203451993,
    'wk.css': 22100041239,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 17070707771,
    'qsearch.js': 4098038985,
    'wall.css': 24774513509,
    'wall.js': 106343366,
    'walledit.js': 3566580322,
    'thumbs_edit.css': 19279831270,
    'thumbs_edit.js': 662560525,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 106865255370,
    'imn.js': 109537264997,
    'im.js': 1322065004,
    'emoji.js': 2908692631,
    'wide_dd.css': 12305928895,
    'wide_dd.js': 3323487336,
    'writebox.css': 15151884591,
    'writebox.js': 2694422212,
    'sharebox.js': 3843850841,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 2576421283,
    'feed.css': 20590665086,
    'privacy.js': 3620108221,
    'privacy.css': 14912465157,
    'apps.css': 28949683198,
    'apps.js': 726679172,
    'apps_edit.js': 119002668,
    'apps_edit.css': 26966425882,
    'apps_check.js': 3844411974,
    'apps_check.css': 25148935054,
    'settings.js': 2541056089,
    'settings.css': 23841621883,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 14381836323,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 1688095335,
    'profile_edit_mil.js': 112384103,
    'search.js': 1757480726,
    'search.css': 29538866774,
    'grid_sorter.js': 2259327269,
    'auto_list.js': 3820785325,
    'suggester.js': 2238023012,
    'datepicker.js': 1574876075,
    'datepicker.css': 17616237830,
    'oauth_popup.css': 26424763305,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 23863792669,
    'fave.js': 128270649,
    'fave.css': 19824638197,
    'widget_comments.css': 27310634652,
    'widget_auth.css': 26701465027,
    'widget_community.css': 30359514988,
    'widget_contactus.css': 28979722805,
    'widget_post.css': 27854137953,
    'widget_allow_messages_from_community.css': 29817917873,
    'api/widgets/al_comments.js': 2288253858,
    'api/widgets/al_auth.js': 2044551244,
    'api/widgets/al_poll.js': 2701047015,
    'api/widgets/al_community.js': 665624601,
    'api/widgets/al_contactus.js': 3360514866,
    'api/widgets/al_subscribe.js': 1435892857,
    'api/widgets/al_like.js': 4053792122,
    'api/widgets/al_post.js': 4224621419,
    'api/widgets/al_allow_messages_from_community.js': 2539325945,
    'api/widgets/al_add_community_app.js': 2715350043,
    'widget_add_community_app.css': 26625405863,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 27885383826,
    'al_poll.css': 3,
    'widget_recommended.css': 26681617990,
    'widgets.css': 26560728150,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 28460529380,
    'notifier.css': 23967913499,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 3120912976,
    'restore.css': 16937036736,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 4024778124,
    'docs.css': 24490235650,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 14375145282,
    'tasks.js': 662793453,
    'tasks.css': 13719910203,
    'helpdesk.js': 3971000045,
    'helpdesk.css': 16219827730,
    'tickets.js': 3256001699,
    'tickets.css': 23059055817,
    'faq.js': 1134602325,
    'faq.css': 17110004275,
    'talmud.js': 1641838680,
    'agents.js': 1719521972,
    'agents.css': 15110566364,
    'achievements.js': 897703126,
    'achievements.css': 13088563949,
    'sf.css': 12522611340,
    'sal.css': 13275698328,
    'members.css': 14297797973,
    'meminfo.css': 15188487811,
    'groupinfo.css': 17390010038,
    'bugs.js': 3874995669,
    'bugs.css': 12344825297,
    'bugtracker.js': 3501719115,
    'bugtracker.css': 14482198809,
    'login.css': 18222287113,
    'login.js': 3551917100,
    'upload.js': 3319172650,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 20673043224,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 16210679486,
    'stats.css': 15409279892,
    'payments.css': 16323257343,
    'payments.js': 3353706223,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 25136680079,
    'aes_light.js': 2817066015,
    'ads.css': 26002464651,
    'ads_bonus.css': 460482192,
    'ads.js': 2664761182,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 12678051655,
    'ads_edit.js': 509956036,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 12829813506,
    'ads_moder.css': 12192491690,
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
    'claims.css': 13669412669,
    'claims.js': 577939270,
    'video_embed.js': 492405,
    'video_embed.css': 15904354635,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 15363385470,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 22501352652,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 318083439,
    'pe.css': 12263408273,
    'dev.js': 4126919969,
    'dev.css': 30561311456,
    'share.css': 26782518181,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 17021659043,
    'print.js': 1255624803,
    'print.css': 14299155560,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 13289840278,
    'ui.js': 3953380422,
    'ui_common.js': 4053872353,
    'ui_common.css': 14679062837,
    'ui_media_selector.js': 1275369056,
    'ui_media_selector.css': 17186760921,
    'ui_manual.css': 13257502002,
    'admin.js': 2866808704,
    'admin.css': 15454188405,
    'duty_timetable.js': 929110027,
    'duty_timetable.css': 15298378379,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 14328118345,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 14015329238,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 14924682997,
    'ads_offers.js': 437551776,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 17251368552,
    'landings/vk10_years.css': 13605274672,
    'chronicle.css': 13806133011,
    'market.css': 23925561115,
    'market.js': 1088949930,
    'vk2016.css': 2369321949,
    'landings/common.css': 17641592480,
    'landings/community_message.css': 13068848163,
    'landings/wdsd.css': 17191468968,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 12241561035,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 16341142053,
    'landings/psb.css': 21441321155,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 23746234181,
    'landings/moneysend.css': 15773953283,
    'landings/desktop_messenger.css': 12499369621,
    'landings/vklive.css': 12603840540,
    'landings/vk2017.css': 13681294693,
    'landings/vkmusic.css': 3258822848,
    'landings/vkmusic.js': 2329960741,
    'landings/ads.css': 16259199100,
    'landing_aes.js': 16840307206,
    'vkme.css': 14852818349,
    'ui_controls.js': 35629744,
    'highcharts.js': 1982709850,
    'ui_controls.css': 12942138188,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 19453860752,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 14305794336,
    'api/share.js': 1988203672,
    'api/openapi.js': 1813688167,
    'api/xdm.js': 1449919642,
    'css_clean.js': 4210402166,
    'hls.min.js': 4014179262,
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
    'snapster/style.css': 15496271507,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 1500580907,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 16904603861,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 15956668304,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 14478612237,
    'top_logo.css': 12988319124,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 24272478849,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 675877973,
    'stories.css': 14182053612,
    'cmodules/internal/meminfo.js': 11393787619,
    'cmodules/internal/nospam.js': 29356626234,
    'shortener.js': 1002525642,
    'lang': 6792
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
        'videoplayer.js': 1
    }
};
var _rnd = 749;