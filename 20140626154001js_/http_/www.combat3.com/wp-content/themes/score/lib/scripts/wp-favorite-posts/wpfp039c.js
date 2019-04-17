jQuery(document).ready( function($) {
    $('.wpfp-link').live('click', function() {
        dhis = $(this);
        wpfp_do_js( dhis, 1 );
        // for favorite post listing page
        if (dhis.hasClass('remove-parent')) {
            dhis.parent("li").fadeOut();
        }
        return false;
    });
});

function wpfp_do_js( dhis, doAjax ) {
    loadingImg = dhis.prev();
    loadingImg.show();
    beforeImg = dhis.prev().prev();
    beforeImg.hide();
    url = document.location.href.split('#')[0];
    params = dhis.attr('href').replace('?', '') + '&ajax=1';
    if ( doAjax ) {
        jQuery.get(url, params, function(data) {
                dhis.parent().html(data);
                if(typeof wpfp_after_ajax == 'function') {
                    wpfp_after_ajax( dhis ); // use this like a wp action.
                }
                loadingImg.hide();
            }
        );
    }
}
/*
     FILE ARCHIVED ON 15:40:01 Jun 26, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:56:41 Apr 17, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 59.916 (3)
  esindex: 0.006
  captures_list: 83.385
  CDXLines.iter: 9.371 (3)
  PetaboxLoader3.datanode: 122.671 (5)
  exclusion.robots: 0.113
  exclusion.robots.policy: 0.106
  RedisCDXSource: 11.008
  PetaboxLoader3.resolve: 63.241 (2)
  load_resource: 165.744
*/