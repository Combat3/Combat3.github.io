function onYouTubeIframeAPIReady(){slideshow_jquery_image_gallery_script.youTubeAPIReady=!0}slideshow_jquery_image_gallery_script=function(){var t=jQuery,i={};return i.slideshowInstances={},i.initialized=!1,i.youTubeAPIReady=!1,i.init=function(){i.initialized||(i.initialized=!0,i.loadYouTubeAPI(),i.checkStylesheetURL(),i.activateSlideshows())},i.getSlideshowInstance=function(e){if(isNaN(parseInt(e,10))){if(e instanceof t&&e.length>0)for(var s in i.slideshowInstances)if(i.slideshowInstances.hasOwnProperty(s)){var n=i.slideshowInstances[s];if(n instanceof i.Slideshow&&n.$container.get(0)===e.get(0))return n}}else if(i.slideshowInstances[e]instanceof i.Slideshow)return i.slideshowInstances[e];return new i.Slideshow},i.activateSlideshows=function(){t.each(jQuery(".slideshow_container"),function(e,s){var n=t(s),o=n.data("sessionId");isNaN(parseInt(o,10))&&(o=n.attr("data-session-id")),i.slideshowInstances[o]instanceof i.Slideshow||(i.slideshowInstances[o]=new i.Slideshow(n))})},i.loadYouTubeAPI=function(){if(i.loadYouTubeAPICalled=!0,!(t(".slideshow_slide_video").length<=0)){var e=document.createElement("script"),s=document.getElementsByTagName("script")[0];e.src="//web.archive.org/web/20140626130956/http://www.youtube.com/iframe_api",s.parentNode.insertBefore(e,s)}},i.checkStylesheetURL=function(){var i=t('[id*="slideshow-jquery-image-gallery-ajax-stylesheet_"]');i.length<=0||t.each(i,function(i,e){var s,n,o,a=t(e),h=t(e).attr("href");void 0!==h&&""!==h&&(s=a.attr("id").split("_"),n=s.splice(1,s.length-1).join("_").slice(0,-4),o=h.split("?"),(void 0===o[1]||""===o[1]||o[1].toLowerCase().indexOf("style=")<0)&&(o[1]="action=slideshow_jquery_image_gallery_load_stylesheet&style="+n+"&ver="+Math.round((new Date).getTime()/1e3),h=o.join("?"),a.attr("href",h)))})},t(document).ready(function(){i.init()}),t(window).load(function(){i.init()}),t.fn.getSlideshowInstance=function(){return i.getSlideshowInstance(this)},i}();

!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow=function(i){if(i instanceof t&&(this.$container=i,this.$content=this.$container.find(".slideshow_content"),this.$views=this.$container.find(".slideshow_view"),this.$slides=this.$container.find(".slideshow_slide"),this.$controlPanel=this.$container.find(".slideshow_controlPanel"),this.$togglePlayButton=this.$controlPanel.find(".slideshow_togglePlay"),this.$nextButton=this.$container.find(".slideshow_next"),this.$previousButton=this.$container.find(".slideshow_previous"),this.$pagination=this.$container.find(".slideshow_pagination"),this.$loadingIcon=this.$container.find(".slideshow_loading_icon"),this.ID=this.getID(),!isNaN(parseInt(this.ID,10)))){this.settings=window["SlideshowPluginSettings_"+this.ID],t.each(this.settings,t.proxy(function(t,i){"true"==i?this.settings[t]=!0:"false"==i&&(this.settings[t]=!1)},this)),this.$parentElement=this.$container.parent(),this.viewData=[],this.viewIDs=[],this.currentlyAnimating=!1,this.currentViewID=void 0,this.currentWidth=0,this.visibleViews=[],this.videoPlayers=[],this.PlayStates={UNSTARTED:-2,PAUSED:-1,TEMPORARILY_PAUSED:0,PLAYING:1},this.playState=this.PlayStates.UNSTARTED,this.interval=!1,this.pauseOnHoverTimer=!1,this.invisibilityTimer=!1,this.descriptionTimer=!1,this.randomNextHistoryViewIDs=[],this.randomPreviousHistoryViewIDs=[],this.randomAvailableViewIDs=[],t.each(this.$views,t.proxy(function(t){this.viewIDs.push(t)},this)),this.currentViewID=this.getNextViewID(),this.visibleViews=[this.currentViewID],this.recalculate(!1);var e=!0;t.each(this.$views,t.proxy(function(i,s){var n=t(s);i!=this.visibleViews[0]?n.css("top",this.$container.outerHeight(!0)):n.addClass("slideshow_currentView"),this.viewData[i]=[],t.each(n.find(".slideshow_slide"),t.proxy(function(s,n){var o=t(n);if(this.viewData[i][s]={},o.hasClass("slideshow_slide_image")){var a=o.find("img");a.length>0?a.get(0).complete?this.viewData[i][s].loaded=1:(i===this.currentViewID&&(e=!1),this.viewData[i][s].loaded=0,this.onImageLoad(a,t.proxy(function(t){this.viewData[i][s].loaded=t?1:2,this.settings.waitUntilLoaded&&i===this.currentViewID&&this.isViewLoaded(i)&&this.start()},this))):this.viewData[i][s].loaded=-1}else this.viewData[i][s].loaded=-1},this))},this)),t(window).load(t.proxy(function(){this.recalculateVisibleViews()},this)),parseFloat(this.settings.intervalSpeed)<parseFloat(this.settings.slideSpeed)+.1&&(this.settings.intervalSpeed=parseFloat(this.settings.slideSpeed)+.1),(!this.settings.waitUntilLoaded||this.settings.waitUntilLoaded&&e)&&this.start()}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.start=function(){this.activateDescriptions(),this.activateControlPanel(),this.activateNavigationButtons(),this.activatePagination(),this.activatePauseOnHover(),this.$loadingIcon.length>0&&this.$loadingIcon.remove(),this.$content.show(),this.recalculateViews(),this.settings.enableResponsiveness&&t(window).resize(t.proxy(function(){this.recalculate(!0)},this)),this.playState=this.PlayStates.PAUSED,this.$container.trigger("slideshowPlayStateChange",[this.playState]),this.settings.play&&this.play()},i.Slideshow.prototype.play=function(){this.interval||(this.playState=this.PlayStates.PLAYING,this.$container.trigger("slideshowPlayStateChange",[this.playState]),this.interval=setInterval(t.proxy(function i(e,s){void 0===s&&(s=this),void 0===e&&(e=s.getNextViewID()),s.isViewLoaded(e)?(s.animateTo(e,1),s.play()):(s.pause(this.PlayStates.TEMPORARILY_PAUSED),setTimeout(t.proxy(function(){i(e,s)},s),100))},this),1e3*this.settings.intervalSpeed))},i.Slideshow.prototype.pause=function(t){clearInterval(this.interval),this.interval=!1,t!==this.PlayStates.PAUSED&&t!==this.PlayStates.TEMPORARILY_PAUSED&&(t=this.PlayStates.PAUSED),this.playState=t,this.$container.trigger("slideshowPlayStateChange",[this.playState])},i.Slideshow.prototype.next=function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getNextViewID(),1)},i.Slideshow.prototype.previous=function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getPreviousViewID(),-1)},i.Slideshow.prototype.isVideoPlaying=function(){for(var t in this.videoPlayers)if(this.videoPlayers.hasOwnProperty(t)){var i=this.videoPlayers[t].state;if(1==i||3==i)return!0}return!1},i.Slideshow.prototype.pauseAllVideos=function(){for(var t in this.videoPlayers)if(this.videoPlayers.hasOwnProperty(t)){var i=this.videoPlayers[t].player;null!=i&&"function"==typeof i.pauseVideo&&(this.videoPlayers[t].state=2,i.pauseVideo())}},i.Slideshow.prototype.isViewLoaded=function(i){var e=!0;return t.each(this.viewData[i],t.proxy(function(t,i){0==i.loaded&&(e=!1)},this)),e},i.Slideshow.prototype.getNaturalImageSize=function(i,e,s){return i.length<=0||!(i instanceof t)||"string"!=typeof i.attr("src")?(e(-1,-1,s),void 0):(this.onImageLoad(i,t.proxy(function(t,i){e(i.width,i.height,s)},this)),void 0)},i.Slideshow.prototype.onImageLoad=function(i,e,s){var n=new Image;return i.length<=0||!(i instanceof t)||"string"!=typeof i.attr("src")?(e(!1,n,s),void 0):(n.onload=t.proxy(function(){e(!0,n,s)},this),n.src=i.attr("src"),void 0)},i.Slideshow.prototype.getNextViewID=function(){var t=this.currentViewID;if(this.settings.random){var i=t;if(t=this.getNextRandomViewID(),t!=i)return t}return isNaN(parseInt(t,10))?0:t>=this.$views.length-1?this.settings.loop?0:this.currentViewID:t+1},i.Slideshow.prototype.getPreviousViewID=function(){var t=this.currentViewID;if(isNaN(parseInt(t,10))&&(t=0),this.settings.random){var i=t;if(t=this.getPreviousRandomViewID(),t!=i)return t}return 0>=t?this.settings.loop?t=this.$views.length-1:this.currentViewID:t-=1},i.Slideshow.prototype.getNextRandomViewID=function(){return isNaN(parseInt(this.currentViewID,10))||this.randomPreviousHistoryViewIDs.push(this.currentViewID),this.randomPreviousHistoryViewIDs.length>2*this.viewIDs.length&&this.randomPreviousHistoryViewIDs.shift(),this.randomNextHistoryViewIDs.length>0?this.randomNextHistoryViewIDs.pop():((void 0===this.randomAvailableViewIDs||this.randomAvailableViewIDs.length<=0)&&(this.randomAvailableViewIDs=t.extend(!0,[],this.viewIDs),this.randomAvailableViewIDs.splice(t.inArray(this.currentViewID,this.randomAvailableViewIDs))),this.randomAvailableViewIDs.splice(Math.floor(Math.random()*this.randomAvailableViewIDs.length),1).pop())},i.Slideshow.prototype.getPreviousRandomViewID=function(){return isNaN(parseInt(this.currentViewID,10))||this.randomNextHistoryViewIDs.push(this.currentViewID),this.randomNextHistoryViewIDs.length>2*this.viewIDs.length&&this.randomNextHistoryViewIDs.shift(),this.randomPreviousHistoryViewIDs.length>0?this.randomPreviousHistoryViewIDs.pop():this.viewIDs[Math.floor(Math.random()*this.viewIDs.length)]},i.Slideshow.prototype.getID=function(){var t=this.$container.data("sessionId");return isNaN(parseInt(t,10))&&(t=this.$container.attr("data-session-id")),t}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.animateTo=function(i,e){if(!(this.isVideoPlaying()||0>i||i>=this.$views.length||i==this.currentViewID)){if(this.currentlyAnimating===!0)return this.$container.one("slideshowAnimationEnd",t.proxy(function(){this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(i,e)},this)),void 0;this.currentlyAnimating=!0,(isNaN(parseInt(e,10))||0==e)&&(e=i<this.currentViewID?-1:1),this.visibleViews=[this.currentViewID,i];var s=this.settings.animation,n=["slide","slideRight","slideUp","slideDown","fade","directFade"];"random"==s&&(s=n[Math.floor(Math.random()*n.length)]);var o={slide:"slideRight",slideRight:"slide",slideUp:"slideDown",slideDown:"slideUp",fade:"fade",directFade:"directFade"};0>e&&(s=o[s]);var a=t(this.$views[this.currentViewID]),h=t(this.$views[i]);switch(a.stop(!0,!0),h.stop(!0,!0),h.addClass("slideshow_nextView"),this.recalculateVisibleViews(),this.currentViewID=i,this.$container.trigger("slideshowAnimationStart",[i,s]),s){case"slide":h.css({top:0,left:this.$content.width()}),a.animate({left:-a.outerWidth(!0)},1e3*this.settings.slideSpeed),h.animate({left:0},1e3*this.settings.slideSpeed),setTimeout(t.proxy(function(){a.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideRight":h.css({top:0,left:-this.$content.width()}),a.animate({left:a.outerWidth(!0)},1e3*this.settings.slideSpeed),h.animate({left:0},1e3*this.settings.slideSpeed),setTimeout(t.proxy(function(){a.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideUp":h.css({top:this.$content.height(),left:0}),a.animate({top:-a.outerHeight(!0)},1e3*this.settings.slideSpeed),h.animate({top:0},1e3*this.settings.slideSpeed),setTimeout(t.proxy(function(){a.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"slideDown":h.css({top:-this.$content.height(),left:0}),a.animate({top:a.outerHeight(!0)},1e3*this.settings.slideSpeed),h.animate({top:0},1e3*this.settings.slideSpeed),setTimeout(t.proxy(function(){a.stop(!0,!0).css("top",this.$container.outerHeight(!0))},this),1e3*this.settings.slideSpeed);break;case"fade":h.css({top:0,left:0,display:"none"}),a.fadeOut(1e3*this.settings.slideSpeed/2),setTimeout(t.proxy(function(){h.fadeIn(1e3*this.settings.slideSpeed/2),a.stop(!0,!0).css({top:this.$container.outerHeight(!0),display:"block"})},this),1e3*this.settings.slideSpeed/2);break;case"directFade":h.css({top:0,left:0,"z-index":0,display:"none"}),a.css({"z-index":1}),h.stop(!0,!0).fadeIn(1e3*this.settings.slideSpeed),a.stop(!0,!0).fadeOut(1e3*this.settings.slideSpeed),setTimeout(t.proxy(function(){h.stop(!0,!0).css({"z-index":0}),a.stop(!0,!0).css({top:this.$container.outerHeight(!0),display:"block","z-index":0})},this),1e3*this.settings.slideSpeed)}setTimeout(t.proxy(function(){a.removeClass("slideshow_currentView"),h.removeClass("slideshow_nextView"),h.addClass("slideshow_currentView"),this.visibleViews=[i],this.currentlyAnimating=!1,this.$container.trigger("slideshowAnimationEnd")},this),1e3*this.settings.slideSpeed)}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.recalculate=function(i){if(!this.$container.is(":visible"))return this.invisibilityTimer=setInterval(t.proxy(function(){this.$container.is(":visible")&&(this.recalculate(i),clearInterval(this.invisibilityTimer),this.invisibilityTimer=!1)},this),500),void 0;for(var e=this.$parentElement,s=0;e.width()<=0&&(e=e.parent(),!(s>50));s++);if(this.currentWidth!=e.width()){this.currentWidth=e.width();var n=e.width()-(this.$container.outerWidth()-this.$container.width());if(parseInt(this.settings.maxWidth,10)>0&&parseInt(this.settings.maxWidth,10)<n&&(n=parseInt(this.settings.maxWidth,10)),this.$container.css("width",Math.floor(n)),this.$content.css("width",Math.floor(n)-(this.$content.outerWidth(!0)-this.$content.width())),this.settings.preserveSlideshowDimensions){var o=n*this.settings.dimensionHeight/this.settings.dimensionWidth;this.$container.css("height",Math.floor(o)),this.$content.css("height",Math.floor(o)-(this.$content.outerHeight(!0)-this.$content.height()))}else this.$container.css("height",Math.floor(this.settings.height)),this.$content.css("height",Math.floor(this.settings.height));this.$views.each(t.proxy(function(i,e){t.inArray(i,this.visibleViews)<0&&t(e).css("top",this.$container.outerHeight(!0))},this)),this.$container.trigger("slideshowResize"),(i||"boolean"!=typeof i)&&this.recalculateVisibleViews()}},i.Slideshow.prototype.recalculateViews=function(){t.each(this.$views,t.proxy(function(t){this.recalculateView(t,!1)},this))},i.Slideshow.prototype.recalculateVisibleViews=function(){t.each(this.visibleViews,t.proxy(function(t,i){this.recalculateView(i,!1)},this))},i.Slideshow.prototype.recalculateView=function(e,s){var n=t(this.$views[e]);if("boolean"==typeof s&&s||this.$content.width()!=n.outerWidth(!0)){var o=n.find(".slideshow_slide");if(!(o.length<=0)){var a=this.$content.width()-(n.outerWidth(!0)-n.width()),h=this.$content.height()-(n.outerHeight(!0)-n.height()),r=Math.floor(a/o.length),l=h,d=a%o.length,c=0;t(o[0]).css("margin-left",0),t(o[o.length-1]).css("margin-right",0),t.each(o,t.proxy(function(s,n){var a=t(n),h=a.outerWidth(!0)-a.width(),u=a.outerHeight(!0)-a.height();if(s==o.length-1?a.width(r-h+d):a.width(r-h),a.height(l-u),a.hasClass("slideshow_slide_text")){var p=a.find(".slideshow_background_anchor");if(p.length<=0)return;var w=a.width()-(p.outerWidth(!0)-p.width()),g=a.height()-(p.outerHeight(!0)-p.height());p.css({width:w,height:g})}else if(a.hasClass("slideshow_slide_image")){var y=a.find("img");if(y.length<=0)return;var f,v,m=y.outerWidth(),I=y.outerHeight();f=isNaN(parseInt(m))?0:m-y.width(),v=isNaN(parseInt(I))?0:I-y.height();var S=a.width()-f,P=a.height()-v;"stretch"===this.settings.imageBehaviour?(y.css({width:S,height:P}),y.attr({width:S,height:P})):this.getNaturalImageSize(y,t.proxy(function(i,s){var n,o;return 0>=i||0>=s?(setTimeout(t.proxy(function(){this.recalculateView(e,!0)},this),500),void 0):(n=a.width()/a.height(),o=(i+f)/(s+v),o>=n?"natural"===this.settings.imageBehaviour?(y.css({margin:"0px",width:S,height:Math.floor(S/o)}),y.attr({width:S,height:Math.floor(S/o)})):"crop"===this.settings.imageBehaviour&&(y.css({"margin-top":"0px","margin-left":-Math.floor((P*o-S)/2),height:P,width:Math.floor(P*o)}),y.attr({width:Math.floor(P*o),height:P})):"natural"===this.settings.imageBehaviour?(y.css({"margin-left":"auto","margin-right":"auto",display:"block",width:Math.floor(P*o),height:P}),y.attr({width:Math.floor(P*o),height:P})):"crop"===this.settings.imageBehaviour&&(y.css({"margin-top":-Math.floor((S/o-P)/2),"margin-left":"0px",width:S,height:Math.floor(S/o)}),y.attr({width:S,height:Math.floor(S/o)})),void 0)},this))}else if(a.hasClass("slideshow_slide_video")){var $=a.find("iframe");if($.length>0)$.attr({width:a.width(),height:a.height()});else var D=setInterval(t.proxy(function(){if(i.youTubeAPIReady){clearInterval(D);var e=a.find(".slideshow_slide_video_id");e.attr("id","slideshow_slide_video_"+Math.floor(1e6*Math.random())+"_"+e.text());var s=e.attr("data-show-related-videos"),n=new YT.Player(e.attr("id"),{width:a.width(),height:a.height(),videoId:e.text(),playerVars:{wmode:"opaque",rel:s},events:{onReady:function(){},onStateChange:t.proxy(function(t){this.videoPlayers[e.attr("id")].state=t.data},this)}}),o=t("#"+e.attr("id"));o.show(),o.attr("src",o.attr("src")+"&wmode=opaque"),this.videoPlayers[e.attr("id")]={player:n,state:-1}}},this),500)}c+=a.outerWidth(!0)},this)),n.css({width:a,height:h})}}}}();
!function(){var t=jQuery,i=slideshow_jquery_image_gallery_script;i.Slideshow.prototype.activateDescriptions=function(){this.settings.showDescription&&(t.each(this.$slides.find(".slideshow_description"),t.proxy(function(i,e){var s=t(e);s.show(),this.settings.hideDescription?s.css({position:"absolute",top:this.$container.outerHeight(!0)}):s.css({position:"absolute",bottom:0})},this)),this.settings.hideDescription&&(this.$container.bind("slideshowResize",t.proxy(function(){t.each(this.$container.find(".slideshow_description"),t.proxy(function(i,e){t(e).css("top",this.$container.outerHeight(!0))},this))},this)),this.$container.bind("slideshowAnimationStart",t.proxy(function(){void 0!=this.visibleViews[1]&&t.each(t(this.$views[this.visibleViews[1]]).find(".slideshow_description"),t.proxy(function(i,e){t(e).css("top",this.$container.outerHeight(!0))},this))},this)),this.$slides.mouseenter(t.proxy(function(i){var e=t(i.currentTarget).find(".slideshow_description");this.descriptionTimer=setTimeout(t.proxy(function(){this.descriptionTimer="",e.stop(!0,!1).animate({top:this.$container.outerHeight(!0)-e.outerHeight(!0)},parseInt(1e3*this.settings.descriptionSpeed,10))},this),200)},this)),this.$slides.mouseleave(t.proxy(function(i){this.descriptionTimer!==!1&&(clearInterval(this.descriptionTimer),this.descriptionTimer=!1),t(i.currentTarget).find(".slideshow_description").stop(!0,!1).animate({top:this.$container.outerHeight(!0)},parseInt(1e3*this.settings.descriptionSpeed,10))},this))))},i.Slideshow.prototype.activateNavigationButtons=function(){this.settings.controllable&&(this.$nextButton.click(t.proxy(function(){this.currentlyAnimating||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getNextViewID(),1))},this)),this.$previousButton.click(t.proxy(function(){this.currentlyAnimating||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(this.getPreviousViewID(),-1))},this)),this.settings.hideNavigationButtons?(this.$container.mouseenter(t.proxy(function(){this.$nextButton.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$nextButton.stop(!0,!0).fadeOut(500)},this)),this.$container.mouseenter(t.proxy(function(){this.$previousButton.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$previousButton.stop(!0,!0).fadeOut(500)},this))):(this.$nextButton.show(),this.$previousButton.show()))},i.Slideshow.prototype.activateControlPanel=function(){this.settings.controlPanel&&(this.$container.bind("slideshowPlayStateChange",t.proxy(function(t,i){i===this.PlayStates.PLAYING?this.$togglePlayButton.attr("class","slideshow_pause"):i===this.PlayStates.PAUSED&&this.$togglePlayButton.attr("class","slideshow_play")},this)),this.$togglePlayButton.click(t.proxy(function(i){var e=t(i.currentTarget);e.hasClass("slideshow_play")?this.play():this.pause(this.PlayStates.PAUSED)},this)),this.settings.hideControlPanel?(this.$container.mouseenter(t.proxy(function(){this.$controlPanel.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$controlPanel.stop(!0,!0).fadeOut(500)},this))):this.$controlPanel.show())},i.Slideshow.prototype.activatePagination=function(){if(this.settings.showPagination){this.$pagination.find(".slideshow_pagination_center").html("<ul></ul>");var i=this.$pagination.find("ul");i.html(""),this.$views.each(t.proxy(function(t){var e="";t==this.currentViewID&&(e="slideshow_currentView"),i.append('<li class="slideshow_transparent '+e+'"><span style="display: none;">'+t+"</span></li>")},this)),this.$pagination.find("li").click(t.proxy(function(i){if(!this.currentlyAnimating){var e=t(i.currentTarget).find("span").text();isNaN(parseInt(e,10))||(this.pauseAllVideos(),this.playState===this.PlayStates.PLAYING&&(this.pause(this.PlayStates.TEMPORARILY_PAUSED),this.play()),this.animateTo(parseInt(e,10),0))}},this)),this.$container.bind("slideshowAnimationStart",t.proxy(function(){var i=this.$pagination.find("li");i.each(t.proxy(function(i,e){t(e).removeClass("slideshow_currentView")},this)),t(i[this.currentViewID]).addClass("slideshow_currentView")},this)),this.settings.hidePagination?(this.$container.mouseenter(t.proxy(function(){this.$pagination.stop(!0,!0).fadeIn(100)},this)),this.$container.mouseleave(t.proxy(function(){this.$pagination.stop(!0,!0).fadeOut(500)},this))):this.$pagination.show()}},i.Slideshow.prototype.activatePauseOnHover=function(){this.settings.pauseOnHover&&(this.$container.mouseenter(t.proxy(function(){clearTimeout(this.pauseOnHoverTimer),this.playState!==this.PlayStates.PAUSED&&(this.pauseOnHoverTimer=setTimeout(t.proxy(function(){this.pause(this.PlayStates.TEMPORARILY_PAUSED)},this),500))},this)),this.$container.mouseleave(t.proxy(function(){clearTimeout(this.pauseOnHoverTimer),this.playState!==this.PlayStates.PAUSED&&this.interval===!1&&this.play()},this)))}}();
/*
     FILE ARCHIVED ON 13:09:56 Jun 26, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:25:57 Apr 16, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 149.997 (3)
  esindex: 0.007
  captures_list: 171.813
  CDXLines.iter: 9.812 (3)
  PetaboxLoader3.datanode: 184.397 (5)
  exclusion.robots: 0.144
  exclusion.robots.policy: 0.136
  RedisCDXSource: 9.219
  PetaboxLoader3.resolve: 94.936 (3)
  load_resource: 175.515
*/