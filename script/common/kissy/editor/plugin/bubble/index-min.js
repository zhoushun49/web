/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Apr 3 14:30
*/
KISSY.add("editor/plugin/bubble/index",function(g,s,n){function t(j){var i=null,b=j.get("editor").getControls();g.each(b,function(c){var d;if(d=c.get)if(d=-1!=(c.get("elCls")||"").indexOf("bubble"))if(d=c!==j)if(d=c.get("visible")){d=j.get("y");var b=d+j.get("el").outerHeight(),g=c.get("y"),e=g+c.get("el").outerHeight();d=d<=e&&b>=e||d<=g&&b>=g}d&&(i?i.get("y")<c.get("y")&&(i=c):i=c)});return i}var l={}.a,v={zIndex:n.baseZIndex(n.zIndexManager.BUBBLE_VIEW),elCls:"{prefixCls}editor-bubble",prefixCls:"{prefixCls}editor-",
effect:{effect:"fade",duration:0.3}};n.prototype.addBubble=function(j,i,b){function c(){f.hide();var a=e.get("window");a&&(a.detach("scroll",p),q.stop())}function d(){var a;var b=f;if(a=b.get("editorSelectedEl")){var d=b.get("editor"),c=d.get("window"),e=d.get("iframe").offset(),b=e.top,e=e.left,i=e+c.width(),c=b+c.height(),h=a.offset(),h=n.Utils.getXY(h,d),d=h.top,h=h.left,j=h+a.width(),m=d+a.height(),k,o;g.UA.ie&&"img"==a[0].nodeName.toLowerCase()&&m>c?a=l:(m>c&&d<c?o=c-30:m>b&&m<c&&(o=m),j>e&&
h<e?k=e:h>e&&h<i&&(k=h),a=k!==l&&o!==l?[k,o]:l)}else a=l;if(a){f.set("xy",a);if(k=t(f))a[1]=k.get("y")+k.get("el").outerHeight(),f.set("xy",a);f.get("visible")||f.show()}}function p(){f.get("editorSelectedEl")&&(f.get("el"),f.hide(),q())}function u(){e.get("window").on("scroll",p);d()}var e=this,r=e.get("prefixCls"),f,b=b||{};b.editor=e;g.mix(b,v);b.elCls=g.substitute(b.elCls,{prefixCls:r});b.prefixCls=g.substitute(b.prefixCls,{prefixCls:r});f=new s(b);e.addControl(j+"/bubble",f);e.on("selectionChange",
function(a){var a=a.path,b=a.elements;if(a&&b&&(a=a.lastElement))(a=i(a))?(f.set("editorSelectedEl",a),f.hide(),g.later(u,10)):c()});e.on("sourceMode",c);var q=g.buffer(d,350)}},{requires:["overlay","editor"]});
