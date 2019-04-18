function si_captcha_refresh(img_id,form_id,securimage_url,securimage_show_url) {
   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
   var string_length = 16;
   var prefix = '';
   for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		prefix += chars.substring(rnum,rnum+1);
   }
  document.getElementById('si_code_' + form_id).value = prefix;

  var si_image_ctf = securimage_show_url + prefix;
  if(img_id == 'si_image_side_login') {
       document.getElementById('si_image_side_login').src = si_image_ctf;
  }else{
       document.getElementById('si_image_' + form_id).src = si_image_ctf;
  }
}
/*
     FILE ARCHIVED ON 23:14:51 Apr 09, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:44:32 Apr 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 71.371 (3)
  esindex: 0.009
  captures_list: 93.953
  CDXLines.iter: 12.375 (3)
  PetaboxLoader3.datanode: 86.219 (5)
  exclusion.robots: 0.192
  exclusion.robots.policy: 0.18
  RedisCDXSource: 7.188
  PetaboxLoader3.resolve: 137.535 (2)
  load_resource: 193.317
*/