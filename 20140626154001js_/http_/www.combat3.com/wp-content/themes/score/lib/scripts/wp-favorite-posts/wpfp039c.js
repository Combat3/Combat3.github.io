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
     INTERNET ARCHIVE ON 23:24:40 Apr 16, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 98.803 (3)
  esindex: 0.012
  captures_list: 127.794
  CDXLines.iter: 17.297 (3)
  PetaboxLoader3.datanode: 98.44 (5)
  exclusion.robots: 0.269
  exclusion.robots.policy: 0.25
  RedisCDXSource: 3.787
  PetaboxLoader3.resolve: 88.462 (2)
  load_resource: 123.437
*/