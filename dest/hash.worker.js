!function(t){function e(s){if(o[s])return o[s].exports;var n=o[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="dest",e(0)}([function(t,e,o){"use strict";var s=o(1);console.log("Worker is started"),onmessage=function(t){s("https://storage.googleapis.com/co-publicdata/agemigration_1970_2010SDO.json",function(t){postMessage([t]),close()})}},function(t,e){"use strict";t.exports=function(t,e){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(4===o.readyState&&200===o.status){var t=JSON.parse(o.responseText);e&&e(t)}},o.open("GET",t),o.send()}}]);