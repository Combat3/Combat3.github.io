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
     FILE ARCHIVED ON 08:57:14 Feb 08, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:45:56 Apr 19, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 693.166 (3)
  esindex: 0.015
  captures_list: 716.01
  CDXLines.iter: 13.925 (3)
  PetaboxLoader3.datanode: 692.306 (5)
  exclusion.robots: 0.296
  exclusion.robots.policy: 0.277
  RedisCDXSource: 2.47
  PetaboxLoader3.resolve: 127.514 (4)
  load_resource: 131.457
*/