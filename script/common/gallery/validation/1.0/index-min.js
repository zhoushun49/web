KISSY.add("gallery/validation/1.0/base",function(f,g,h,e,c,b,a,d){function k(a,b){"string"==typeof a&&(a=f.get(a));a?this._init(a,b||{}):e.log("\u8bf7\u914d\u7f6e\u6b63\u786e\u7684form ID.")}f.augment(k,f.EventTarget,{_init:function(a,b){this.config=f.merge(c.Config,b);this.form=a;this.fields=new e.storage;this._initfields()},_initfields:function(){var a=this,b=a.config;f.each(a.form.elements,function(d){var c=g.attr(d,b.attrname);b.custumKey&&(b.custumFuc&&c==b.custumKey)&&(h.on(d,"click",b.custumFuc),
c="");c&&a.add(d,e.toJSON(c.replace(/'/g,'"')))})},add:function(a,d){var m=this.fields,c=f.merge(this.config,d);if(f.isObject(a)&&a instanceof b)return m.add(g.attr(a.el,"id"),a),this;var k=g.get(a)||g.get("#"+a),q=g.attr(k,"id");!k||k.form!=this.form?e.log("\u5b57\u6bb5"+a+"\u4e0d\u5b58\u5728\u6216\u4e0d\u5c5e\u4e8e\u8be5form"):(q||(q=c.prefix+f.guid(),g.attr(k,"id",q)),m.add(q,new b(k,c)))},remove:function(a){this.fields.remove(a)},get:function(a){return this.fields.get(a)},isValid:function(a){var b=
this.fields;if(a&&b.get(a))return b.get(a).isValid();var d=!0;b.each(function(a,b){if(!b.isValid()&&(d=!1,b.single))return!1});return d},submit:function(){this.fire("submit",this.fields)&&this.isValid()&&this.form.submit()}});f.mix(k,{Util:e,Define:c,Field:b,Warn:a,Rule:d});return k},{requires:"dom event ./utils ./define ./field ./warn ./rule".split(" ")});
KISSY.add("gallery/validation/1.0/define",function(){return{Config:{attrname:"data-valid",prefix:"auth-f",defaultwarn:"alert"},Const:{enumvalidsign:{error:0,ok:1,hint:2,ignore:3}}}});
KISSY.add("gallery/validation/1.0/field",function(f,g,h,e,c,b,a,d){function k(a,b){(a=f.get(a))?(this.el=a,this.rule=new e.storage,this._init(b)):e.log("\u5b57\u6bb5\u4e0d\u5b58\u5728\u3002")}var p=c.Const.enumvalidsign,l=document;k.Config={required:[!0,"\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002"],initerror:"data-showerror"};f.augment(k,{_init:function(a){a=f.merge(k.Config,a||{});f.mix(this,a,"label");this._initField();this._initVType(a);this._initWarn(a);g.attr(this.el,a.initerror)&&this.showMessage(!1,
g.attr(this.el,a.initerror))},_initField:function(){var a=this.el;if(-1<"checkbox,radio".indexOf(g.attr(a,"type"))){var b=a.form,a=g.attr(a,"name"),d=[];f.each(l.getElementsByName(a),function(a){a.form==b&&d.push(a)});this.el=d}},_initVType:function(b){var d=this,c=d.el,e;for(e in b)d.addRule(e,b[e]);if(b.remote){b=f.isArray(b.remote)?{url:b.remote[0]}:b.remote;var k=new a(c,b,function(a,b){d.showMessage(a,b)});d.addRule("ajax",function(a){return k.check(a)})}},_initWarn:function(a){var b=this,c,
k={};a.warn&&(c=f.isFunction(a.warn)?a.warn:d.get(a.warn),k=f.merge(a,{}));a.style&&d.getStyle(a.style)&&(k=d.getStyle(a.style),c=d.get(k.core),k=f.merge(a,k));c?(c=new c(b.el,k),c._bindEvent(b.el,a.event||c.event,function(){var a=b._validateValue();f.isArray(a)&&2==a.length&&b.showMessage(a[1],a[0])}),f.mix(b,{warn:c,single:c.single})):e.log("\u63d0\u793a\u4fe1\u606f\u7c7b\u914d\u7f6e\u9519\u8bef.")},_validateValue:function(){var a=this.rule,b=this._getValue(),a=a.getAll();if(g.attr(this.el,"disabled")||
g.hasClass(this.el,"disabled")||a.depend&&!0!==a.depend.call(this,b))return[void 0,p.ignore];for(var d in a){if("required"==d){var c=a.required.call(this,b);if(c)return this.label?[this.label,p.hint]:[c,p.error];if(e.isEmpty(b))return["",p.ignore]}if(!(-1<"depend".indexOf(d))){if(-1<"ajax".indexOf(d))break;c=a[d].call(this,b);if(!e.isEmpty(c))return this._ajaxtimer&&this._ajaxtimer.cancel(),[c,p.error]}}return a.ajax?a.ajax.call(this,b):[this.okMsg||"OK",p.ok]},_getValue:function(){var a=this.el,
b=[];switch(g.attr(a,"type")){case "select-multiple":f.each(a.options,function(a){a.selected&&b.push(a.value)});break;case "radio":case "checkbox":f.each(a,function(a){a.checked&&b.push(a.value)});break;default:b=g.val(a)}return b},addRule:function(a,d){var c=this.rule;if(f.isFunction(a))return c.add(f.guid(),a),this;var e=b.get(a,d);if(e)return c.add(a,e),this},removeRule:function(a){this.rule.remove(a)},showMessage:function(a,b,d){this.warn.showMessage(a,b||this.okMsg,d)},isValid:function(){var a=
this._validateValue();this.showMessage(a[1],a[0]);return!0==a[1]||1===a[1]||3===a[1]?!0:!1}});return k},{requires:"dom event ./utils ./define ./rule ./rule/remote ./warn".split(" ")});KISSY.add("gallery/validation/1.0/index",function(f,g){return g},{requires:["gallery/validation/1.0/base","gallery/validation/1.0/assets/base.css"]});KISSY.add("gallery/validation/1.0/rule",function(f,g,h){return h},{requires:["./utils","./rule/base","./rule/normal"]});
KISSY.add("gallery/validation/1.0/rule/base",function(f,g,h,e){return new function(){var c=new e.storage;this.add=function(b,a,d){f.isFunction(d)&&c.add(b,{name:b,fun:d,text:a})};this.get=function(b,a){var d=c.get(b);if(!d)return null;var e=d.fun,d=d.text,g=e.length-1,l=[];a?f.isArray(a)?a.length>=g?(l.push(a[a.length-1]),l=l.concat(a.slice(0,-1))):(l.push(d),l=l.concat(a)):0<g?(l.push(d),l.push(a)):l.push(d):l=[d];return function(a){return e.apply(this,[a].concat(l))}};this.toString=function(b,a){var d=
c.get(b);if(d)return e.format(a||"\u3010\u89c4\u5219\u540d\u3011\n {0}\n\n\u3010\u9ed8\u8ba4\u63d0\u793a\u4fe1\u606f\u3011\n {1}\n\n\u3010\u51fd\u6570\u4f53\u3011\n {2}",d.name,d.text,d.fun.toString())}}},{requires:["dom","event","../utils"]});
KISSY.add("gallery/validation/1.0/rule/normal",function(f,g,h,e,c){c.add("func","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){b=d.call(this,b);if(!1===b)return a;if(!e.isEmpty(b))return b});c.add("regex","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){if(!RegExp(d).test(b))return a});c.add("depend","\u8be5\u5b57\u6bb5\u65e0\u9700\u6821\u9a8c",function(b,a,d){return d.call(this,b)});c.add("ajax","\u6821\u9a8c\u5931\u8d25\u3002",function(b,a,d){return d.call(this,b)});c.add("required","\u6b64\u9879\u4e3a\u5fc5\u586b\u9879\u3002",
function(b,a,d){if(f.isArray(b)&&0==b.length||e.isEmpty(b)&&d)return a});c.add("equalTo","\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\u3002",function(b,a,d){if(b!==g.val(f.get(d)))return a});c.add("length","\u5b57\u7b26\u957f\u5ea6\u4e0d\u80fd\u5c0f\u4e8e{0},\u4e14\u4e0d\u80fd\u5927\u4e8e{1}",function(b,a,d,c,f){b=e.getStrLen(b,f);d=e.toNumber(d);c=e.toNumber(c);if(!(b>=d&&b<=c))return e.format(a,d,c)});c.add("minLength","\u4e0d\u80fd\u5c0f\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,d,c){b=e.getStrLen(b,
c);d=e.toNumber(d);if(b<d)return e.format(a,d)});c.add("maxLength","\u4e0d\u80fd\u5927\u4e8e{0}\u4e2a\u5b57\u7b26\u3002",function(b,a,d,c){b=e.getStrLen(b,c);d=e.toNumber(d);if(b>d)return e.format(a,d)});c.add("fiter","\u5141\u8bb8\u7684\u683c\u5f0f{0}\u3002",function(b,a,d){if(!RegExp("^.+.(?=EXT)(EXT)$".replace(/EXT/g,d.split(/\s*,\s*/).join("|")),"gi").test(b))return e.format(a,d)});c.add("range","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,d,c){d=e.toNumber(d);c=e.toNumber(c);
if(b<d||b>c)return e.format(a,d,c)});c.add("group","\u53ea\u80fd\u5728{0}\u81f3{1}\u4e4b\u95f4\u3002",function(b,a,d,c){if(f.isArray(b)&&(b=b.length,!(b>=d&&b<=c)))return e.format(a,d,c)});c.add("trim","\u4e24\u7aef\u4e0d\u80fd\u542b\u6709\u7a7a\u683c\u3002",function(b,a){if(/(^\s+)|(\s+$)/g.test(b))return a});c.add("ltrim","\u5b57\u7b26\u4e32\u6700\u524d\u9762\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",function(b,a){if(/^\s+/g.test(b))return a});c.add("rtrim","\u5b57\u7b26\u4e32\u672b\u5c3e\u4e0d\u80fd\u5305\u542b\u7a7a\u683c",
function(b,a){if(/\s+$/g.test(b))return a});c.add("card","\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e",function(b,a){var d=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],c=0;for(i=0;17>i;i++)c+=parseInt(b.charAt(i))*d[i];d=(12-c%11)%11;10==d&&(d="x");if(b.charAt(17).toLowerCase()!=d)return a});c.add("mobile","\u624b\u673a\u53f7\u7801\u4e0d\u5408\u6cd5",function(b,a){var d=!1;f.each({cm:/^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,cu:/^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
ce:/^(?:0?1)(?:33|53|8[079])\d{8}$/,cn:/^(?:0?1)[3458]\d{9}$/,hk:/^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,macao:/^6\d{7}$/,tw:/^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/},function(a){if(b.match(a))return d=!0,!1});if(!d)return a});f.each([["chinese",/^[\u0391-\uFFE5]+$/,"\u53ea\u80fd\u8f93\u5165\u4e2d\u6587"],["english",/^[A-Za-z]+$/,"\u53ea\u80fd\u8f93\u5165\u82f1\u6587\u5b57\u6bcd"],["currency",/^\d+(\.\d+)?$/,"\u91d1\u989d\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["phone",/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,
"\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["url",/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]':+!]*([^<>""])*$/,"url\u683c\u5f0f\u4e0d\u6b63\u786e\u3002"],["email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,"\u8bf7\u8f93\u5165\u6b63\u786e\u7684email\u683c\u5f0f"]],function(b){c.add(b[0],b[2],function(a,d){if(!RegExp(b[1]).test(a))return d})})},{requires:["dom","event","../utils","./base"]});
KISSY.add("gallery/validation/1.0/rule/remote",function(f,g,h,e){return function(c,b,a){function d(d){return function(c,e,k){c.state="200"==c.status;c&&(!0===c.state||!1===c.state)?(a(c.state,c.message),c.state&&l.add(d,{est:c.state,msg:c.message})):a(0,"failure");f.isFunction(b.success)&&b.success.call(this,c,e,k);h=null}}var k=null,h=null,l=new e.storage,m=g.attr(c,"name"),n={loading:"loading",type:"POST",dataType:"json",data:{}};f.mix(n,b);n.error=function(a,c,d){f.isFunction(b.error)&&b.success.call(this,
a,c,d)};this.check=function(a){var b=l.get(a);if(b)return[b.msg,b.est];k&&k.cancel();k=f.later(function(){h&&h.abort();n.data[m]=a;n.success=d(a);h=f.io(n)},500);return[n.loading,0]}}},{requires:["dom","event","../utils"]});
KISSY.add("gallery/validation/1.0/utils",function(f,g){var h={log:f.log,toJSON:function(e){try{eval("var result="+e)}catch(c){return{}}return result},isEmpty:function(e){return null===e||e===g||""===e},format:function(e){var c=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(b,a){return c[a]})},toNumber:function(e){e=new String(e);e=-1<e.indexOf(".")?parseFloat(e):parseInt(e);return isNaN(e)?0:e},getStrLen:function(e,c){return c?e.replace(/[^\x00-\xFF]/g,"**").length:
e.length},storage:function(){this.cache={}}};f.augment(h.storage,{add:function(e,c,b){var a=this.cache;if(!a[e]||a[e]&&(null==b||b))a[e]=c},remove:function(e){var c=this.cache;c[e]&&delete c[e]},get:function(e){var c=this.cache;return c[e]?c[e]:null},getAll:function(){return this.cache},each:function(e){var c=this.cache,b;for(b in c)if(!1===e.call(this,b,c[b]))break}});return h});
KISSY.add("gallery/validation/1.0/warn",function(f,g,h,e,c,b,a){h.extend("Alert",c);h.extend("Static",b);h.extend("Float",a);h.BaseClass=e;return h},{requires:"./utils ./warn/base ./warn/baseclass ./warn/alert ./warn/static ./warn/float".split(" ")});
KISSY.add("gallery/validation/1.0/warn/alert",function(f,g,h,e,c){var b=c.Const.enumvalidsign;return function(){return{init:function(){this.single=!0},showMessage:function(a,c){if(a==b.error)return this.invalidClass&&g.addClass(this.target,this.invalidClass),alert(c),this.target.focus(),!1;this.invalidClass&&g.removeClass(this.target,this.invalidClass)},style:{alert:{invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("gallery/validation/1.0/warn/base",function(f,g,h,e,c){var b=new e.storage,a=new e.storage;return{extend:function(a,e){var g=function(a,b){g.superclass.constructor.call(this,a,b)},h=f.isFunction(e)?e():e;if(h.style){for(var m in h.style)this.addStyle(m,f.merge(h.style[m],{core:a}));delete h.style}f.extend(g,c,h);b.add(a,g);return g},addStyle:function(b,c){a.add(b,c)},getStyle:function(b){return a.get(b)},get:function(a){return b.get(a)}}},{requires:["dom","event","../utils","./baseclass"]});
KISSY.add("gallery/validation/1.0/warn/baseclass",function(f,g,h){function e(c,b){this.target=f.isArray(c)?c[c.length-1]:c;this.el=c;this.single=!1;f.mix(this,b||{});this.init()}f.augment(e,f.EventTarget,{init:function(){},_bindEvent:function(c,b,a){if("select"==f.get(c).tagName.toLowerCase())h.on(c,"change",a);else switch((g.attr(c,"type")||"input").toLowerCase()){case "radio":case "checkbox":h.on(c,"click",a);break;case "file":h.on(c,"change",a);break;default:h.on(c,b,a)}},showMessage:function(c,
b){evttype=1}});return e},{requires:["dom","event"]});
KISSY.add("gallery/validation/1.0/warn/float",function(f,g,h,e,c){var b=c.Const.enumvalidsign;return function(){return{invalidCls:"J_Invalid",init:function(){var a=this,b=a.target,c=g.create(a.template),e=g.get("div.msg",c);f.ready(function(){document.body.appendChild(c)});f.mix(a,{panel:f.one(c),msg:f.one(e)});h.on(a.el,"focus",function(c){g.hasClass(b,a.invalidCls)&&a._toggleError(!0,c.target)});h.on(a.el,"blur",function(){a._toggleError(!1)})},showMessage:function(a,c,e,f){var h=this.target,m=
this.msg;b.ok==a?(g.removeClass(h,this.invalidClass),m.html("OK")):("submit"!=e&&this._toggleError(!0,f),g.addClass(h,this.invalidClass),m.html(c))},_pos:function(a){a=g.offset(a||this.target);var b=this.panel.height(),b=a.top-b-20;this.panel.css("left",a.left-10).css("top",b)},_toggleError:function(a,b){var c=this.panel;a?(g.show(c),this._pos(b)):g.hide(c)},style:{"float":{template:'<div class="valid-float" style="display:none;"><div class="msg">&nbsp;</div><s>\u25e5\u25e4</s></div>',event:"focus blur",
invalidClass:"vailInvalid"}}}}},{requires:["dom","event","../utils","../define"]});
KISSY.add("gallery/validation/1.0/warn/static",function(f,g,h,e){var c=e.Const.enumvalidsign,b=g.all;return function(){return{init:function(){var a=b(this.target);if(a=a.attr("data-message")?b(a.attr("data-messagebox")):this.messagebox?b(this.messagebox):g(this.template).appendTo(a.parent()))this.panel=a,this.panelheight=a.css("height"),this.estate=a.one(".estate"),this.label=a.one(".label"),this.estate&&this.label&&a.hide()},showMessage:function(a,d){var e=b(this.el),g=this.panel,h=this.estate,m=
this.label,n=f.isNumber(this.anim)?this.anim:0.1;this.invalidClass&&(a==c.ignore&&a==c.ok?e.removeClass(this.invalidClass):e.addClass(this.invalidClass));var e="none"==g.css("display")?!1:!0,r=this.panelheight;a==c.ignore?e&&g.slideUp(n):(h.removeClass("ok tip error"),a==c.error?(h.addClass("error"),m.html(d),e||g.height(r).slideDown(n)):a==c.ok?!1===this.isok?e&&g.slideUp(n):(e||g.height(r).slideDown(n),h.addClass("ok"),m.html(this.oktext?this.oktext:d)):a==c.hint&&(h.addClass("tip"),m.html(d),e||
g.height(r).slideDown(n)))},style:{text:{template:'<label class="valid-text"><span class="estate"><em class="label"></em></span></label>',event:"focus blur"},under:{template:'<div class="valid-under"><p class="estate"><span class="label"></span></p></div>',event:"focus blur keyup"}}}}},{requires:["node","../utils","../define"]});
