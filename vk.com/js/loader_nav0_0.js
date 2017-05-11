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
    'common.js': 1147,
    'common.css': 29499305750,
    'pads.css': 15522288843,
    'retina.css': 2633262011,
    'uncommon.js': 1524646384,
    'uncommon.css': 16453956322,
    'filebutton.css': 1044306797,
    'filebutton.js': 2454165044,
    'lite.js': 4184089252,
    'lite.css': 38551292217,
    'ie6.css': 2976338090,
    'ie7.css': 2926539419,
    'rtl.css': 15674648541,
    'pagination.js': 1027022568,
    'blog.css': 16870062175,
    'blog.js': 3187719799,
    'html5audio.js': 976782859,
    'html5video.js': 223664659,
    'html5video.css': 17327749632,
    'audioplayer.js': 4745785525,
    'audioplayer.css': 16592023622,
    'audio_html5.js': 287741914,
    'audio.js': 1681225465,
    'audio.css': 24492228525,
    'gifts.css': 19893801516,
    'gifts.js': 338252255,
    'cc.js': 1644397126,
    'indexer.js': 1700343828,
    'graph.js': 3882247419,
    'graph.css': 18464645533,
    'boxes.css': 16862131465,
    'box.js': 590267265,
    'rate.css': 1431298744,
    'tooltips.js': 3126166391,
    'tooltips.css': 23435289208,
    'sorter.js': 1976440538,
    'qsorter.js': 4013122173,
    'usorter.js': 362016183,
    'phototag.js': 2522467854,
    'phototag.css': 16113292222,
    'photoview.js': 2919002621,
    'photoview.css': 26220360590,
    'fullscreen_pv.js': 2393839857,
    'fullscreen_pv.css': 16279872425,
    'spe.js': 3760998372,
    'friends.js': 3212870034,
    'friends.css': 16934070231,
    'friends_search.js': 3688413939,
    'friends_search.css': 1694758778,
    'board.js': 2538879168,
    'board.css': 24294269380,
    'photos.css': 24214444574,
    'photos.js': 152064977,
    'photos_add.css': 26036613835,
    'photos_add.js': 3448017910,
    'wkpoll.js': 534542755,
    'wkview.js': 2577556179,
    'wkview.css': 24042893401,
    'single_pv.css': 1445030012,
    'single_pv.js': 2438273057,
    'video.js': 3840498487,
    'video.css': 23010174212,
    'videocat.js': 1618923991,
    'videocat.css': 23173020488,
    'videoview.js': 1174380746,
    'videoview.css': 26994324962,
    'video_edit.js': 2135196486,
    'video_edit.css': 22488245389,
    'video_upload.js': 10194165,
    'video_youtube.js': 2438487008,
    'video_youtube.css': 14573992019,
    'videoplayer.js': 82265270006,
    'videoplayer.css': 39641277675,
    'translation.js': 2431784533,
    'translation.css': 15825281419,
    'reg.css': 887926110,
    'reg.js': 1336565657,
    'invite.css': 18456718482,
    'invite.js': 4133426028,
    'prereg.js': 4187303773,
    'index.css': 21784752823,
    'index.js': 752775373,
    'join.css': 20601984657,
    'join.js': 4281861549,
    'intro.css': 21681619012,
    'post.css': 23888271954,
    'module.css': 22755303622,
    'owner_photo.js': 1714149322,
    'owner_photo.css': 20586444478,
    'page.js': 606275200,
    'page.css': 25441176205,
    'page_help.css': 24260496185,
    'public.css': 27319259737,
    'public.js': 3770119342,
    'pages.css': 22824267692,
    'pages.js': 1162259210,
    'groups.css': 26969376755,
    'groups.js': 2975645919,
    'groups_list.js': 3507753248,
    'groups_edit.css': 29732701298,
    'groups_edit.js': 4194796742,
    'profile.css': 26321824255,
    'profile.js': 116458155,
    'calendar.css': 19846462670,
    'calendar.js': 4203451993,
    'wk.css': 22831026942,
    'wk.js': 2226505193,
    'pay.css': 989146268,
    'pay.js': 1463178433,
    'tagger.js': 2640218940,
    'tagger.css': 19681518657,
    'qsearch.js': 4098038985,
    'wall.css': 25505499212,
    'wall.js': 106343366,
    'walledit.js': 3566580322,
    'thumbs_edit.css': 21890642156,
    'thumbs_edit.js': 662560525,
    'mail.css': 2042965398,
    'mail.js': 2691231200,
    'email.css': 2955752408,
    'im.css': 103348021275,
    'imn.js': 112210719180,
    'im.js': 1322065004,
    'emoji.js': 3574018791,
    'wide_dd.css': 14916739781,
    'wide_dd.js': 3323487336,
    'writebox.css': 17762695477,
    'writebox.js': 4022948418,
    'sharebox.js': 3843850841,
    'fansbox.js': 2740474922,
    'postbox.css': 3839233565,
    'postbox.js': 760473537,
    'feed.js': 3472996414,
    'feed.css': 21321650789,
    'privacy.js': 3620108221,
    'privacy.css': 17523276043,
    'apps.css': 30447033289,
    'apps.js': 3251691800,
    'apps_edit.js': 119002668,
    'apps_edit.css': 27841301748,
    'apps_check.js': 3844411974,
    'apps_check.css': 26023810920,
    'settings.js': 2541056089,
    'settings.css': 24716497749,
    'profile_edit.js': 2157979570,
    'profile_edit.css': 16992647209,
    'profile_edit_edu.js': 799807020,
    'profile_edit_job.js': 281115018,
    'profile_edit_mil.js': 112384103,
    'search.js': 1757480726,
    'search.css': 30269852477,
    'grid_sorter.js': 2259327269,
    'auto_list.js': 3820785325,
    'suggester.js': 2238023012,
    'datepicker.js': 1574876075,
    'datepicker.css': 20227048716,
    'oauth_popup.css': 26529108524,
    'oauth_page.css': 377358648,
    'oauth_touch.css': 850126194,
    'notes.css': 2351233181,
    'notes.js': 3300062627,
    'wiki.css': 24594778372,
    'fave.js': 128270649,
    'fave.css': 22435449083,
    'widget_comments.css': 27414979871,
    'widget_auth.css': 26805810246,
    'widget_community.css': 30463860207,
    'widget_contactus.css': 29084068024,
    'widget_post.css': 27958483172,
    'widget_allow_messages_from_community.css': 29922263092,
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
    'widget_add_community_app.css': 26729751082,
    'api/widgets/community_messages.js': 1044060584,
    'widget_community_messages.css': 27989729045,
    'al_poll.css': 3,
    'widget_recommended.css': 26785963209,
    'widgets.css': 26665073369,
    'common_light.js': 2102079137,
    'developers.css': 2998332598,
    'touch.css': 796462384,
    'notifier.js': 27484931071,
    'notifier.css': 24698899202,
    'earthday.js': 2276669993,
    'earthday.css': 287663071,
    'restore.js': 2316458840,
    'restore.css': 20277785584,
    'recover.js': 2830033131,
    'recover.css': 2080137791,
    'docs.js': 1689802100,
    'docs.css': 27855571609,
    'tags_dd.js': 3735969205,
    'tags_dd.css': 16985956168,
    'tasks.js': 662793453,
    'tasks.css': 16330721089,
    'helpdesk.js': 3971000045,
    'helpdesk.css': 18830638616,
    'tickets.js': 3256001699,
    'tickets.css': 23790041520,
    'faq.js': 1134602325,
    'faq.css': 19720815161,
    'talmud.js': 1641838680,
    'agents.js': 1228491530,
    'agents.css': 17486031264,
    'achievements.js': 897703126,
    'achievements.css': 16060161092,
    'sf.css': 15133422226,
    'sal.css': 15886509214,
    'members.css': 16908608859,
    'meminfo.css': 19363746549,
    'groupinfo.css': 20000820924,
    'bugs.js': 3874995669,
    'bugs.css': 14955636183,
    'bugtracker.js': 3501719115,
    'bugtracker.css': 17093009695,
    'login.css': 20833097999,
    'login.js': 3551917100,
    'upload.js': 3319172650,
    'graffiti.js': 1826105362,
    'graffiti.css': 404471482,
    'graffiti_new.js': 67279821,
    'graffiti_new.css': 21404028927,
    'abuse.js': 2562479185,
    'abuse.css': 1179531957,
    'verify.css': 688648654,
    'away.css': 18821490372,
    'stats.css': 18020090778,
    'payments.css': 18934068229,
    'payments.js': 3353706223,
    'offers.css': 978996883,
    'offers.js': 2030679272,
    'call.js': 4217435992,
    'call.css': 3256039661,
    'aes_light.css': 26011555945,
    'aes_light.js': 2817066015,
    'ads.css': 24751515142,
    'ads_bonus.css': 460482192,
    'ads.js': 2664761182,
    'ads_payments.js': 2170749464,
    'ads_edit.css': 15288862541,
    'ads_edit.js': 1057757128,
    'ads_edit_geo.js': 1634516705,
    'ads_moder_common.css': 15440624392,
    'ads_moder.css': 14803302576,
    'ads_moder_common.js': 187287116,
    'ads_moder.js': 3328616431,
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
    'claims.css': 16280223555,
    'claims.js': 577939270,
    'video_embed.js': 492405,
    'video_embed.css': 18515165521,
    'site_stats.css': 3894412059,
    'site_stats.js': 3102281884,
    'blank.css': 17974196356,
    'wk_editor.js': 3842354971,
    'wk_editor.css': 23232338355,
    'btagger.js': 333150,
    'btagger.css': 3891092611,
    'filters.js': 2533221357,
    'filters_pe.js': 2963371200,
    'pe.js': 318083439,
    'pe.css': 14874219159,
    'dev.js': 4126919969,
    'dev.css': 30665656675,
    'share.css': 26886863400,
    'stickers_office.css': 1312075860,
    'stickers_office.js': 2301605568,
    'mapbox.js': 262357480,
    'mapbox.css': 4285195017,
    'jobs.js': 1932948232,
    'jobs.css': 19632469929,
    'print.js': 1255624803,
    'print.css': 16909966446,
    'qrcode.js': 773151497,
    'contests.css': 2752582154,
    'ui.css': 15900651164,
    'ui.js': 3953380422,
    'ui_common.js': 4053872353,
    'ui_common.css': 18432313845,
    'ui_media_selector.js': 1275369056,
    'ui_media_selector.css': 19797571807,
    'ui_manual.css': 15868312888,
    'admin.js': 2866808704,
    'admin.css': 18064999291,
    'duty_timetable.js': 929110027,
    'duty_timetable.css': 17909189265,
    'paysupp_admin.js': 127920242,
    'paysupp_admin.css': 16938929231,
    'exchange.css': 3337097141,
    'exchange.js': 3355553135,
    'exchange_moder.css': 16626140124,
    'exchange_moder.js': 2036879800,
    'ads_offers.css': 17535493883,
    'ads_offers.js': 153944036,
    'ads_offers_moder.css': 1451957431,
    'ads_offers_moder.js': 3862633445,
    'landings/landings.css': 19862179438,
    'landings/vk10_years.css': 16216085558,
    'chronicle.css': 16416943897,
    'market.css': 24656546818,
    'market.js': 1088949930,
    'vk2016.css': 2369321949,
    'landings/common.css': 20252403366,
    'landings/community_message.css': 15679659049,
    'landings/wdsd.css': 19802279854,
    'landings/smartfeed.css': 655905554,
    'landings/dota.css': 14852371921,
    'dota_landing.js': 2187041646,
    'landings/promo_post.css': 18951952939,
    'landings/psb.css': 23281601394,
    'landings/psb_context.css': 19990271,
    'landings/psb_mobile.css': 25586514420,
    'landings/moneysend.css': 18384764169,
    'landings/desktop_messenger.css': 15110180507,
    'landings/vklive.css': 15214651426,
    'landings/vk2017.css': 16292105579,
    'landings/vkmusic.css': 3258822848,
    'landings/vkmusic.js': 2329960741,
    'landings/ads.css': 18870009986,
    'landing_aes.js': 16840307206,
    'vkme.css': 17463629235,
    'ui_controls.js': 35629744,
    'highcharts.js': 1982709850,
    'ui_controls.css': 15552949074,
    'selects.js': 2835310113,
    'mentions.js': 3097650360,
    'apps_flash.js': 574154589,
    'maps.js': 2999814160,
    'places.js': 3945143946,
    'places.css': 22064671638,
    'map2.js': 3799102730,
    'map.css': 4020192821,
    'sort.js': 1633148408,
    'paginated_table.js': 1572974868,
    'paginated_table.css': 16916605222,
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
    'snapster/style.css': 18107082393,
    'snapster/page.js': 324997776,
    'snapster/mobile.css': 2784903123,
    'snapster/common.js': 1500580907,
    'snapster/main.js': 949985539,
    'snapster/snapster.js': 1856082732,
    'snapster/modules.js': 891205739,
    'snapster/snapster.css': 19515414747,
    'snapster/mob_templates.js': 830712780,
    'snapster/snapster_mobile.js': 300135425,
    'snapster/snapster_mobile.css': 18567479190,
    'snapster/templates.js': 3536307956,
    'snapster/snapster_ui.js': 338551892,
    'snapster/notifier.js': 2312942404,
    'snapster/snapster_ui.css': 17089423123,
    'top_logo.css': 15599130010,
    'favicon': 5,
    'speech.js': 40590190126,
    'voice_message_player.js': 24272478849,
    'cmodules/web/speech_worker_mp3.js': 1172578475,
    'cmodules/web/speech_worker_opus.js': 3385759348,
    'stories.js': 351125936,
    'stories.css': 16792864498,
    'cmodules/internal/meminfo.js': 13000983222,
    'cmodules/internal/nospam.js': 28682614661,
    'shortener.js': 1002525642,
    'lang': 6778
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
var _rnd = 5580;