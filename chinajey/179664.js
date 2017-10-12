;(function(win, doc){
    win._qha_data = {
      domain: 179664,
      e360: '2946565212',
      pageClk: null,
      urlClk: 0,
      idClk: null,
      mvid: '445283',
      host: 'http://s.union.360.cn/s.union.360.cn',
      lsa: lsa
    };
    (new Image()).src = location.protocol + '//'+ _qha_data['host'] +'/s.gif?et=99&t=' + (+new Date()) + '&si=' + _qha_data.domain;
    lsa('81b1085b146b01f5.js'/*tpa=http://s0.qhimg.com/static/81b1085b146b01f5.js*/);
    function lsa(d,a){var c=location.protocol==="https:";var e=doc.getElementsByTagName("script")[0];var b=doc.createElement("script");e.parentNode.insertBefore(b,e);b.type="text/javascript";b.defer=true;b.async=true;b.src=!c?d:d.replace(/http:\/\/(s|p)[0-9]\.(qhimg|qhres)\.com/,"https://$1.ssl.$2.com");if(typeof a==="function"){b.onload=a;b.onreadystatechange=function(f){if(/^complete|loaded$/.test(b.readyState)){a(f)}}}};
})(window, document);

