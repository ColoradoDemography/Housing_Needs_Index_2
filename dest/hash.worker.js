!function(e){function t(s){if(n[s])return n[s].exports;var o=n[s]={exports:{},id:s,loaded:!1};return e[s].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="dest",t(0)}([function(e,t,n){"use strict";var s=n(1);console.log("Worker is started"),onmessage=function(e){s("../data/agemigration_1970_2010.json",function(e){postMessage([e]),close()})}},function(e,t){"use strict";e.exports=function(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState&&200===n.status){var e=JSON.parse(n.responseText);t&&t(e)}},n.open("GET",e),n.send()}}]);