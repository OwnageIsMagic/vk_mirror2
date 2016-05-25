var navMap = {'<void>':['al_index.php',['index.css','index.js']],'<other>':['al_profile.php',['profile.css','page.css','profile.js','page.js']],'public\\d+($|/)':['al_public.php',['public.css','page.css','public.js','page.js']],'event\\d+($|/)':['al_events.php',['groups.css','page.css','groups.js','page.js']],'club\\d+($|/)':['al_groups.php',['groups.css','page.css','groups.js','page.js']],'publics\\d+($|/)':['al_public.php',['public.css','page.css','public.js','page.js']],'groups(\\d+)?$':['al_groups.php',['groups.css','groups_list.js','indexer.js']],'events$':['al_groups.php',['groups.css','page.css','groups.js','page.js']],'changemail$':['register.php',['reg.css']],'mail($|/)':['al_mail.php',['mail.css','mail.js']],'write[-]?\\d*($|/)':['al_mail.php',['mail.css','mail.js']],'im($|/)':['al_im.php',['imn.js','im.css','emoji.js','notifier.css']],'gim\\d+($|/)':['al_im.php',['imn.js','im.css','emoji.js','notifier.css']],'audio-?\\d+_\\d+$':['al_audio.php',['audio.css','audio.js']],'audios(-?\\d+)?$':['al_audio.php',['audio.css','audio.js']],'audio($|/)':['al_audio.php',['audio.css','audio.js']],'apps_check($|/)':['al_apps_check.php',['apps.css','apps.js']],'apps($|/)':['al_apps.php',['apps.css','apps.js']],'editapp($|/)':['al_apps_edit.php',['apps.css','apps.js']],'regstep\\d$':['register.php',['reg.js','reg.css','ui_controls.js','ui_controls.css','selects.js']],'video(-?\\d+_\\d+)?$':['al_video.php',['video.js','video.css','videoview.js','videoview.css','indexer.js']],'videos(-?\\d+)?$':['al_video.php',['video.js','video.css','indexer.js']],'feed$':['al_feed.php',['page.css','page.js','feed.css','feed.js']],'friends$':['al_friends.php',['friends.js','friends.css','privacy.css']],'friendsphotos$':['al_photos.php',['friendsphotos.js','photoview.js','friendsphotos.css','photoview.css']],'wall-?\\d+(_\\d+)?$':['al_wall.php',['page.js','page.css','wall.js','wall.css']],'tag\\d+$':['al_photos.php',['photos.js','photoview.js','photos.css','photoview.css']],'albums(-?\\d+)?$':['al_photos.php',['photos.js','photos.css']],'photos(-?\\d+)?$':['al_photos.php',['photos.js','photos.css']],'album-?\\d+_\\d+$':['al_photos.php',['photos.js','photos.css']],'photo-?\\d+_\\d+$':['al_photos.php',['photos.js','photos.css','photoview.js','photoview.css']],'search$':['al_search.php',['search.css','search.js']],'people($|/)':['al_search.php',['search.css','search.js']],'communities$':['al_search.php',['search.css','search.js']],'brands$':['al_search.php',['search.css','search.js']],'invite$':['invite.php',['invite.css','invite.js','ui_controls.css','ui_controls.js']],'join$':['join.php',['join.css','join.js']],'settings$':['al_settings.php',['settings.js','settings.css']],'edit$':['al_profileEdit.php',['profile_edit.js','profile_edit.css']],'blog($|/)':['blog.php',['blog.css','blog.js','page.js']],'fave$':['al_fave.php',['fave.js','fave.css','page.css','wall.css','qsorter.js','indexer.js']],'topic$':['al_board.php',['board.css']],'board\\d+$':['al_board.php',['board.css','board.js']],'topic-?\\d+_\\d+$':['al_board.php',['board.css','board.js']],'stats($|/)':['al_stats.php',['stats.css']],'ru/(.*)?$':['al_pages.php',['pages.css','pages.js','wk.css','wk.js']],'pages($|/)':['al_pages.php',['pages.css','pages.js','wk.css','wk.js']],'page-?\\d+_\\d+$':['al_pages.php',['pages.css','pages.js','wk.css','wk.js']],'restore($|/)':['al_restore.php',['restore.js','restore.css']],'recover($|/)':['recover.php',['recover.js','recover.css']],'gifts\\d*$':['al_gifts.php',['gifts.js','gifts.css']],'docs($|/)':['docs.php',['docs.css','docs.js','indexer.js']],'doc-?\\d+_\\d+$':['docs.php',['docs.css','docs.js','indexer.js']],'docs-?\\d+$':['docs.php',['docs.css','docs.js','indexer.js']],'login($|/)':['al_login.php',['login.css','login.js']],'tasks($|/)':['tasks.php',['tasks.css','tasks.js']],'abuse($|/)':['abuse.php',['abuse.css','abuse.js']],'abuse2($|/)':['abuse2.php',[]],'restore2($|/)':['restore2.php',['dyn-restore2.css','dyn-restore2.js','dyn-restore2_aa.js','sorter.js']],'datababes($|/)':['datababes.php',[]],'support($|/)':['al_tickets.php',['tickets.css','tickets.js']],'helpdesk($|/)':['al_helpdesk.php',['tickets.css','tickets.js']],'offersdesk($|/)':['offers.php',['offers.css','offers.js']],'payments($|/)':['al_payments.php',['payments.css']],'faq($|/)':['al_faq.php',['faq.css','faq.js']],'tlmd($|\\d+|/)':['al_talmud.php',['faq.js','faq.css','tickets.css','tickets.js','tags_dd.js','tags_dd.css']],'sms_office($|/)':['sms_office.php',['sms_office.css','sms_office.js']],'dev($|/)':['dev.php',['dev.css','dev.js']],'developers($|/)':['al_developers.php',['developers.css']],'help($|/)':['al_help.php',['help.css','help.js']],'claims($|/)':['al_claims.php',['claims.css','claims.js']],'video_embed($|/)':['al_video_embed.php',['video_embed.css','video_embed.js']],'ads$':['ads.php',['ads.css','ads.js']],'adbonus$':['ads.php',['ads.css','ads.js']],'adsbonus$':['ads.php',['ads.css','ads.js']],'adregister$':['ads.php',['ads.css','ads.js']],'adsedit$':['ads_edit.php',['ads.css','ads.js','ads_edit.css','ads_edit.js']],'adscreate$':['ads_edit.php',['ads.css','ads.js','ads_edit.css','ads_edit.js']],'adsmoder$':['ads_moder.php',['ads.css','ads.js','ads_moder.css','ads_moder.js']],'adsweb$':['ads_web.php',['ads.css','ads.js','ads_web.css','ads_web.js']],'exchange$':['ads_posts.php',['ads.css','ads.js','exchange.css','exchange.js']],'exchangemoder$':['ads_posts_moder.php',['ads.css','ads.js','exchange_moder.css','exchange_moder.js']],'offers$':['ads_offers.php',['ads.css','ads.js','ads_offers.css','ads_offers.js']],'offersmoder$':['ads_offers_moder.php',['ads.css','ads.js','ads_offers_moder.css','ads_offers_moder.js']],'test$':['al_help.php',['help.css','help.js']],'agenttest$':['al_help.php',['help.css','help.js']],'grouptest$':['al_help.php',['help.css','help.js']],'dmca$':['al_tickets.php',['tickets.css','tickets.js']],'terms$':['al_help.php',['help.css','help.js']],'privacy$':['al_help.php',['help.css','help.js']],'licence$':['al_help.php',['help.css','help.js']],'editdb$':['editdb.php',['editdb.css','editdb.js']],'note\\d+_\\d+$':['al_wall.php',['wall.js','wall.css','wk.js','wk.css','pagination.js']],'notes(\\d+)?$':['al_wall.php',['wall.js','wall.css','wk.js','wk.css','pagination.js']],'bugs($|/)':['bugs.php',['bugs.css','bugs.js']],'wkview.php($)':['wkview.php',['wkview.js','wkview.css','wk.js','wk.css']],'stickers_office($|/)':['stickers_office.php',['stickers_office.css','stickers_office.js']],'charts($|/)':['al_audio.php',['audio.css','audio.js']],'maps($|/)':['maps.php',[]],'jobs$':['al_jobs.php',['jobs.css','jobs.js','blog.css','blog.js']],'about$':['blog.php',['blog.css','blog.js']],'products$':['blog.php',['blog.css','blog.js']],'ui$':['ui.php',[]],'translation$':['al_translation.php',[]],'mobile$':['al_login.php',[]],'stickers($|/)':['al_im.php',['imn.js','im.css','emoji.js','notifier.css']],'print$':['al_print.php',['print.css','print.js']],'pattern(\\d+)?$':['patterns_info.php',['dyn-patterns_info.css','dyn-patterns_info.js','page.css']],'link(\\d+)?$':['patterns_info.php',['dyn-patterns_info.css','dyn-patterns_info.js','page.css']],'autoreg(\\d+)?$':['patterns_info.php',['dyn-patterns_info.css','dyn-patterns_info.js','page.css']],'statlogs($|/)':['statlogs_view.php',['statlogs.css']],'market(-?\\d+)?(_\\d+)?$':['al_market.php',['market.css','market.js']]}; var stVersions = { 'nav': 709828824999, 'fonts_cnt.css': 2307916144, 'common.js': 1132, 'common.css': 2726300433, 'pads.js': 1601311133, 'pads.css': 1843379990, 'retina.css': 1820592869, 'uncommon.js': 3297864069, 'uncommon.css': 27085503, 'filebutton.css': 2582548248, 'filebutton.js': 1457823047, 'lite.js': 1155182394, 'lite.css': 3640558949, 'ie6.css': 1054141387, 'ie7.css': 532233945, 'rtl.css': 836314285, 'pagination.js': 46926455, 'blog.css': 2868969836, 'blog.js': 2631282163, 'html5audio.js': 1230354391, 'html5video.js': 3599850170, 'html5video.css': 1529932203, 'audioplayer.js': 2036446343, 'audioplayer.css': 1681639176, 'audio_html5.js': 3586987067, 'audio.js': 2481987248, 'audio.css': 4103303405, 'gifts.css': 4269209150, 'gifts.js': 2778120873, 'cc.js': 4037201610, 'indexer.js': 4037127100, 'graph.js': 3091977822, 'graph.css': 2605352871, 'boxes.css': 1776353909, 'box.js': 986491972, 'rate.css': 768419415, 'tooltips.js': 3337223331, 'tooltips.css': 4082385397, 'sorter.js': 2514645581, 'qsorter.js': 2821441961, 'usorter.js': 2212338539, 'phototag.js': 3445996780, 'phototag.css': 3643271466, 'photoview.js': 1409961169, 'photoview.css': 3292471960, 'fullscreen_pv.js': 1738361993, 'fullscreen_pv.css': 4174249355, 'friendsphotos.js': 3869757571, 'friendsphotos.css': 3816436303, 'friends.js': 2165106552, 'friends.css': 2394530635, 'friends_search.js': 3426781484, 'friends_search.css': 204916655, 'board.js': 3457684991, 'board.css': 877836109, 'photos.css': 2377494850, 'photos.js': 186138862, 'photos_add.css': 2557532249, 'photos_add.js': 2100132176, 'wkpoll.js': 3872977013, 'wkview.js': 3525033627, 'wkview.css': 1978487190, 'single_pv.css': 1756823785, 'single_pv.js': 2569562240, 'video.js': 1448603092, 'video.css': 4081142433, 'videocat.js': 972120599, 'videocat.css': 2768202123, 'videoview.js': 2038607023, 'videoview.css': 985981817, 'video_edit.js': 660308478, 'video_edit.css': 3290437348, 'video_upload.js': 1612009913, 'video_youtube.js': 3123894146, 'video_youtube.css': 3352952199, 'videoplayer.js': 2531874047, 'videoplayer.css': 2577344639, 'translation.js': 3444393106, 'translation.css': 4017022451, 'reg.css': 1314058211, 'reg.js': 675443900, 'invite.css': 2190657026, 'invite.js': 2046983763, 'prereg.js': 1684494884, 'index.css': 1337048832, 'index.js': 1152958183, 'join.css': 1956968452, 'join.js': 4143458120, 'intro.css': 632121273, 'post.css': 3834673596, 'module.css': 2271964242, 'owner_photo.js': 777617564, 'owner_photo.css': 191725357, 'page.js': 2223110977, 'page.css': 2506275589, 'page_help.css': 439817088, 'public.css': 1472241584, 'public.js': 1370745423, 'pages.css': 4259151537, 'pages.js': 3347413999, 'groups.css': 3887436404, 'groups.js': 2016833031, 'groups_list.js': 2835370862, 'groups_edit.css': 3970130060, 'groups_edit.js': 430983739, 'profile.css': 1789947477, 'profile.js': 2041998124, 'calendar.css': 3908117517, 'calendar.js': 341854446, 'wk.css': 3440345284, 'wk.js': 1889427948, 'pay.css': 3455936119, 'pay.js': 1315549380, 'tagger.js': 2246443526, 'tagger.css': 172965549, 'qsearch.js': 2246648013, 'wall.css': 330488668, 'wall.js': 2905201975, 'walledit.js': 787182675, 'thumbs_edit.css': 595431267, 'thumbs_edit.js': 2641086814, 'mail.css': 3405659547, 'mail.js': 4232525143, 'email.css': 3625468312, 'im.css': 654378469, 'imn.js': 3322583939, 'im.js': 4271552496, 'emoji.js': 2743385565, 'wide_dd.css': 3273211401, 'wide_dd.js': 2661848751, 'writebox.css': 3912883473, 'writebox.js': 2640458988, 'sharebox.js': 931032458, 'fansbox.js': 2721076082, 'postbox.css': 4170744741, 'postbox.js': 2878853436, 'feed.js': 3821639974, 'feed.css': 507162754, 'privacy.js': 3873593331, 'privacy.css': 328635716, 'apps.css': 3989265160, 'apps.js': 1616812988, 'apps_edit.js': 807186031, 'apps_edit.css': 1794020803, 'apps_check.js': 698434188, 'apps_check.css': 1507545301, 'settings.js': 3653652875, 'settings.css': 2530455346, 'profile_edit.js': 277721666, 'profile_edit.css': 966237583, 'profile_edit_edu.js': 2866173359, 'profile_edit_job.js': 1509540900, 'profile_edit_mil.js': 200684846, 'search.js': 2159878420, 'search.css': 518186190, 'datepicker.js': 2866124529, 'datepicker.css': 3784700326, 'oauth_popup.css': 2783037447, 'oauth_page.css': 1269113697, 'oauth_touch.css': 1390775374, 'notes.css': 1902655111, 'notes.js': 1813954736, 'wiki.css': 2249306031, 'fave.js': 3186044579, 'fave.css': 169581634, 'widget_comments.css': 921902046, 'widget_auth.css': 2175122291, 'widget_community.css': 503844513, 'widget_post.css': 2551740978, 'api/widgets/al_comments.js': 4231179037, 'api/widgets/al_auth.js': 4125400749, 'api/widgets/al_poll.js': 2140073636, 'api/widgets/al_community.js': 2012310203, 'api/widgets/al_subscribe.js': 727663614, 'api/widgets/al_like.js': 3027363630, 'api/widgets/al_post.js': 2471947704, 'al_poll.css': 3, 'widget_recommended.css': 1787553363, 'widgets.css': 978851917, 'common_light.js': 2706613887, 'developers.css': 2192083352, 'touch.css': 1524784846, 'notifier.js': 3565318220, 'notifier.css': 1586328223, 'earthday.js': 1302273681, 'earthday.css': 190978924, 'restore.js': 3203224219, 'restore.css': 3219262144, 'recover.js': 2216623723, 'recover.css': 1708940698, 'docs.js': 388250342, 'docs.css': 1250038639, 'tags_dd.js': 2519761220, 'tags_dd.css': 3629295033, 'tasks.js': 2719584771, 'tasks.css': 1669297652, 'helpdesk.js': 4233812069, 'tickets.js': 557461231, 'tickets.css': 458317458, 'faq.js': 997292752, 'faq.css': 551689430, 'meminfo.css': 1273313007, 'groupinfo.css': 2377869286, 'bugs.js': 2994463564, 'bugs.css': 444001557, 'login.css': 2403356591, 'login.js': 1601448228, 'upload.js': 3218744302, 'graffiti.js': 1026128914, 'graffiti.css': 3374342273, 'graffiti_new.js': 1101659761, 'graffiti_new.css': 2663858004, 'abuse.js': 1131069015, 'abuse.css': 3360978448, 'verify.css': 262281192, 'away.css': 2898203759, 'stats.css': 119059668, 'payments.css': 548545203, 'payments.js': 3222309665, 'offers.css': 1395278909, 'offers.js': 3070210054, 'call.js': 3752504153, 'call.css': 1208034002, 'aes_light.css': 4223103049, 'aes_light.js': 3884708224, 'ads.css': 2818904781, 'ads.js': 4240687553, 'ads_payments.js': 899652112, 'ads_edit.css': 1391889050, 'ads_edit.js': 763237109, 'ads_moder.css': 2214583942, 'ads_moder.js': 3337341676, 'ads_tagger.js': 468647746, 'ads_web.css': 1344536113, 'ads_web.js': 2143800062, 'mrtarg.js': 3995910240, 'mrtarg.css': 3681350201, 'health.css': 4084630120, 'health.js': 53273640, 'pinbar.js': 4083368255, 'sms_office.css': 701386734, 'sms_office.js': 3244045240, 'help.css': 2728043455, 'help.js': 3782508485, 'claims.css': 4212793677, 'claims.js': 4197337467, 'video_embed.js': 531691495, 'video_embed.css': 3858113753, 'site_stats.css': 913929545, 'site_stats.js': 1309466967, 'blank.css': 2360807318, 'wk_editor.js': 3074474176, 'wk_editor.css': 1059090950, 'btagger.js': 2682888485, 'btagger.css': 520431514, 'filters.js': 1865892730, 'filters_pe.js': 1406401216, 'pe.js': 2387291388, 'pe.css': 660979626, 'dev.js': 632513723, 'dev.css': 2912384121, 'share.css': 3743589396, 'stickers_office.css': 2865554295, 'stickers_office.js': 2247906357, 'mapbox.js': 4245575080, 'mapbox.css': 1578941304, 'jobs.js': 1431325420, 'jobs.css': 2576208687, 'print.js': 3671532933, 'print.css': 3483095015, 'qrcode.js': 2897722391, 'contests.css': 630790975, 'ui.css': 849758697, 'ui.js': 3053181925, 'ui_common.js': 3189240781, 'ui_common.css': 591911841, 'ui_media_selector.js': 820225478, 'ui_media_selector.css': 4209267876, 'admin.js': 1614876408, 'admin.css': 784246832, 'exchange.css': 3822057122, 'exchange.js': 829296976, 'exchange_moder.css': 4190609504, 'exchange_moder.js': 735536334, 'ads_offers.css': 2256308232, 'ads_offers.js': 990052303, 'ads_offers_moder.css': 729706038, 'ads_offers_moder.js': 2134368643, 'chronicle.css': 3109023779, 'market.css': 1052220556, 'market.js': 2749946926, 'vk2016.css': 1178411485, 'landings/common.css': 2674258190, 'landings/community_message.css': 877172513, 'landings/wdsd.css': 3959193380, 'landings/smartfeed.css': 3800404485, 'vkme.css': 1846895044, 'ui_controls.js': 1572838920, 'highcharts.js': 607702664, 'grid_sorter.js': 3937644316, 'suggester.js': 446460284, 'auto_list.js': 2462724570, 'ui_controls.css': 3211076741, 'selects.js': 1852657841, 'mentions.js': 3686976691, 'apps_flash.js': 1016765437, 'maps.js': 302009647, 'places.js': 636892584, 'places.css': 3648972740, 'map2.js': 3492395866, 'map.css': 1691287470, 'sort.js': 1905098063, 'paginated_table.js': 3438566458, 'paginated_table.css': 500407230, 'api/share.js': 2402010141, 'api/openapi.js': 86011712, 'api/xdm.js': 1965154462, 'css_clean.js': 824960447, 'q_frame.php': 7, '/swf/api_wrapper.swf': 7, '/swf/api_external.swf': 8, '/swf/api_wrapper2_0.swf': 8, '/swf/audio_lite.swf': 13, '/swf/uploader_lite.swf': 13, '/swf/photo_uploader_lite.swf': 17, '/swf/CaptureImg.swf': 12, '/swf/video.swf': 146, '/swf/vkvideochat.swf': 50, '/swf/vchatdevices.swf': 1, 'snapster/style.css': 3569976985, 'snapster/page.js': 1720549549, 'snapster/mobile.css': 100872175, 'snapster/common.js': 3854326058, 'snapster/main.js': 3771725446, 'favicon': 5, 'lang': 6705}; var stTypes = {fromLib:{'md5.js':1,'ui_controls.js':1,'grid_sorter.js':1,'suggester.js':1,'auto_list.js':1,'highcharts.js':1,'selects.js':1,'sort.js':1,'maps.js':1,'css_clean.js':1},fromRoot:{'api/share.js':1,'api/openapi.js':1,'api/xdm.js':1,'apps_flash.js':1,'mentions.js':1,'map2.js':1,'ui_controls.css':1,'map.css':1,'paginated_table.js':1,'paginated_table.css':1,'snapster/common.js':1,'snapster/style.css':1,'snapster/page.js':1,'snapster/mobile.css':1,'snapster/main.js':1}}; var _rnd = 9671;