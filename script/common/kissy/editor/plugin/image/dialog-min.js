/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Apr 3 14:30
*/
KISSY.add("editor/plugin/image/dialog",function(k,w,f,x,y,z){function p(a){for(;a;){var b=a.nodeName();if("a"==b)return a;if(r.$block[b]||r.$blockLimit[b])break;a=a.parent()}return null}function s(a,b){this.editor=a;this.imageCfg=b||{};this.suffix=(this.cfg=this.imageCfg.upload||null)&&this.cfg.suffix||"png,jpg,jpeg,gif";this.suffix_reg=RegExp(this.suffix.split(/,/).join("|")+"$","i");this.suffix_warning="\u53ea\u5141\u8bb8\u540e\u7f00\u540d\u4e3a"+this.suffix+"\u7684\u56fe\u7247"}var r=f.XHTML_DTD,t=k.UA,m=KISSY.NodeList,h="\u8bf7\u70b9\u51fb\u6d4f\u89c8\u4e0a\u4f20\u56fe\u7247",g=f.Utils.valInput;
k.augment(s,{_prepare:function(){var a=this,b=a.editor.get("prefixCls")+"editor-";a.dialog=a.d=(new x.Dialog({width:500,headerContent:"\u56fe\u7247",bodyContent:k.substitute("<div class='{prefixCls}img-tabs'><div class='{prefixCls}img-tabs-bar ks-clear'><div class='{prefixCls}img-tabs-tab-selected {prefixCls}img-tabs-tab' hidefocus='hidefocus'>\u7f51\u7edc\u56fe\u7247</div><div class='{prefixCls}img-tabs-tab' hidefocus='hidefocus'>\u672c\u5730\u4e0a\u4f20</div></div><div class='{prefixCls}img-tabs-body' ><div class='{prefixCls}img-tabs-panel {prefixCls}img-tabs-panel-selected'><label><span class='{prefixCls}image-title'>\u56fe\u7247\u5730\u5740\uff1a </span><input  data-verify='^(https?:/)?/[^\\s]+$'  data-warning='\u7f51\u5740\u683c\u5f0f\u4e3a\uff1ahttp:// \u6216 /' class='{prefixCls}img-url {prefixCls}input' style='width:390px;vertical-align:middle;' /></label></div><div class='{prefixCls}img-tabs-panel'><form class='{prefixCls}img-upload-form' enctype='multipart/form-data'><p style='zoom:1;'><input class='{prefixCls}input {prefixCls}img-local-url' readonly='readonly' style='margin-right: 15px; vertical-align: middle; width: 368px;color:#969696;'/><a style='padding:3px 11px;position:absolute;left:390px;top:0px;z-index:1;' class='{prefixCls}image-up {prefixCls}button ks-inline-block'>\u6d4f\u89c8...</a></p><div class='{prefixCls}img-up-extraHtml'></div></form></div></div></div><div style='padding:0 20px 5px 20px;'><table style='width:100%;margin-top:8px;' class='{prefixCls}img-setting'><tr><td><label>\u5bbd\u5ea6\uff1a </label><input  data-verify='^(\u81ea\u52a8|((?!0$)\\d+))?$'  data-warning='\u5bbd\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='{prefixCls}img-width {prefixCls}input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </td><td><label>\u9ad8\u5ea6\uff1a <label><input  data-verify='^(\u81ea\u52a8|((?!0$)\\d+))?$'  data-warning='\u9ad8\u5ea6\u8bf7\u8f93\u5165\u6b63\u6574\u6570' class='{prefixCls}img-height {prefixCls}input' style='vertical-align:middle;width:60px' /> \u50cf\u7d20 </label><input type='checkbox' class='{prefixCls}img-ratio' style='vertical-align:middle;margin-left:5px;' checked='checked'/> \u9501\u5b9a\u9ad8\u5bbd\u6bd4</label></td></tr><tr><td><label>\u5bf9\u9f50\uff1a </label><select class='{prefixCls}img-align' title='\u5bf9\u9f50'><option value='none'>\u65e0</option><option value='left'>\u5de6\u5bf9\u9f50</option><option value='right'>\u53f3\u5bf9\u9f50</option></select></td><td><label>\u95f4\u8ddd\uff1a </label><input  data-verify='^\\d+$'  data-warning='\u95f4\u8ddd\u8bf7\u8f93\u5165\u975e\u8d1f\u6574\u6570' class='{prefixCls}img-margin {prefixCls}input' style='width:60px'/> \u50cf\u7d20</td></tr><tr><td colspan='2' style='padding-top: 6px'><label>\u94fe\u63a5\u7f51\u5740\uff1a </label><input class='{prefixCls}img-link {prefixCls}input' style='width:235px;vertical-align:middle;'  data-verify='^(?:(?:\\s*)|(?:https?://[^\\s]+)|(?:#.+))$'  data-warning='\u8bf7\u8f93\u5165\u5408\u9002\u7684\u7f51\u5740\u683c\u5f0f' /><label><input class='{prefixCls}img-link-blank' style='vertical-align:middle;margin-left:5px;' type='checkbox'/> &nbsp; \u5728\u65b0\u7a97\u53e3\u6253\u5f00\u94fe\u63a5</label></td></tr></table></div></div>",
{prefixCls:b}),footerContent:k.substitute("<div style='padding:5px 20px 20px;'><a href='javascript:void('\u786e\u5b9a')' class='{prefixCls}img-insert {prefixCls}button ks-inline-block' style='margin-right:30px;'>\u786e\u5b9a</a> <a  href='javascript:void('\u53d6\u6d88')' class='{prefixCls}img-cancel {prefixCls}button ks-inline-block'>\u53d6\u6d88</a></div>",{prefixCls:b}),mask:!0})).render();var c=a.d.get("el"),d=c.one("."+b+"img-cancel"),j=c.one("."+b+"img-insert"),u=f.Utils.verifyInputs,i=c.one("."+b+"img-setting");a.uploadForm=c.one("."+
b+"img-upload-form");a.imgLocalUrl=c.one("."+b+"img-local-url");a.tab=(new y({srcNode:a.d.get("body").one("."+b+"img-tabs"),prefixCls:b+"img-"})).render();a.imgLocalUrl.val(h);a.imgUrl=c.one("."+b+"img-url");a.imgHeight=c.one("."+b+"img-height");a.imgWidth=c.one("."+b+"img-width");a.imgRatio=c.one("."+b+"img-ratio");a.imgAlign=z.Select.decorate(c.one("."+b+"img-align"),{prefixCls:b+"big-",width:80,menuCfg:{prefixCls:b+"",render:c}});a.imgMargin=c.one("."+b+"img-margin");a.imgLink=c.one("."+b+"img-link");
a.imgLinkBlank=c.one("."+b+"img-link-blank");var e=f.Utils.placeholder;e(a.imgUrl,"http://");e(a.imgHeight,"\u81ea\u52a8");e(a.imgWidth,"\u81ea\u52a8");e(a.imgLink,"http://");a.imgHeight.on("keyup",function(){var b=parseInt(g(a.imgHeight));b&&a.imgRatio[0].checked&&!a.imgRatio[0].disabled&&a.imgRatioValue&&g(a.imgWidth,Math.floor(b*a.imgRatioValue))});a.imgWidth.on("keyup",function(){var b=parseInt(g(a.imgWidth));b&&a.imgRatio[0].checked&&!a.imgRatio[0].disabled&&a.imgRatioValue&&g(a.imgHeight,Math.floor(b/a.imgRatioValue))});
d.on("click",function(b){a.d.hide();b.halt()});var n=(new m("<a class='"+b+"button ks-inline-block' style='position:absolute;z-index:"+f.baseZIndex(f.zIndexManager.LOADING_CANCEL)+";left:-9999px;top:-9999px;'>\u53d6\u6d88\u4e0a\u4f20</a>")).appendTo(document.body,void 0);a.loadingCancel=n;j.on("click",function(b){b.halt();if((!1===a.imageCfg.remote||1==k.indexOf(a.tab.getSelectedTab(),a.tab.getTabs()))&&a.cfg){if(u(i.all("input")))if(a.imgLocalUrl.val()==h)alert("\u8bf7\u5148\u9009\u62e9\u6587\u4ef6!");else if(a.suffix_reg.test(a.imgLocalUrl.val()))if(b=
a.fileInput[0].files?a.fileInput[0].files[0].size:0,l&&l<b/1E3)alert("\u4e0a\u4f20\u56fe\u7247\u6700\u5927\uff1a"+l/1E3+"M");else{a.d.loading();n.on("click",function(a){a.halt();e.abort()});b=f.Utils.normParams(a.cfg.serverParams)||{};b["document-domain"]=document.domain;var e=w({data:b,url:a.cfg.serverUrl,form:a.uploadForm[0],dataType:"json",type:"post",complete:function(b,c){n.css({left:-9999,top:-9999});a.d.unloading();"abort"!=c&&(b||(b={error:"\u670d\u52a1\u5668\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5"}),b.error?alert(b.error):(g(a.imgUrl,b.imgUrl),(new Image).src=b.imgUrl,
a._insert()))}}),b=a.d.get("el"),d=b.offset();n.css({left:d.left+b[0].offsetWidth/2.5,top:d.top+b[0].offsetHeight/1.5})}else alert(a.suffix_warning),a.uploadForm[0].reset(),a.imgLocalUrl.val(h)}else u(c.all("input"))&&a._insert()});if(a.cfg){a.cfg.extraHtml&&c.one("."+b+"img-up-extraHtml").html(a.cfg.extraHtml);var v=c.one("."+b+"image-up"),l=a.cfg&&a.cfg.sizeLimit;a.fileInput=(new m("<input type='file' style='position:absolute;cursor:pointer;left:"+(t.ie?"360":t.chrome?"319":"369")+"px;z-index:2;top:0px;height:26px;' size='1' name='"+
(a.cfg.fileInput||"Filedata")+"'/>")).insertAfter(a.imgLocalUrl);l&&(h="\u5355\u5f20\u56fe\u7247\u5bb9\u91cf\u4e0d\u8d85\u8fc7 "+l/1E3+" M");a.imgLocalUrl.val(h);a.fileInput.css("opacity",0);a.fileInput.on("mouseenter",function(){v.addClass(""+b+"button-hover")});a.fileInput.on("mouseleave",function(){v.removeClass(""+b+"button-hover")});a.fileInput.on("change",function(){var b=a.fileInput.val();a.imgLocalUrl.val(b.replace(/.+[\/\\]/,""))});!1===a.imageCfg.remote&&a.tab.removeItemAt(0,1)}else a.tab.removeItemAt(1,1);a._prepare=k.noop},_insert:function(){var a=
this,b=g(a.imgUrl),c,d=parseInt(g(a.imgHeight)),f=parseInt(g(a.imgWidth)),h=a.imgAlign.get("value"),i=parseInt(a.imgMargin.val()),e="";d&&(e+="height:"+d+"px;");f&&(e+="width:"+f+"px;");"none"!=h&&(e+="float:"+h+";");!isNaN(i)&&0!=i&&(e+="margin:"+i+"px;");a.d.hide();a.selectedEl?(c=a.selectedEl,a.editor.execCommand("save"),a.selectedEl.attr({src:b,_ke_saved_src:b,style:e})):(c=new m("<img "+(e?"style='"+e+"'":"")+" src='"+b+"' _ke_saved_src='"+b+"' alt='' />",null,a.editor.get("document")[0]),a.editor.insertElement(c));
setTimeout(function(){var b=p(c),d=k.trim(g(a.imgLink)),e=a.editor.getSelection(),f=a.imgLinkBlank.attr("checked")?"_blank":"_self",h,j=0,i,o,q;if(b){h=b.attr("target")||"_self";if(d!=b.attr("href")||h!=f){c._4e_breakParent(b);(i=c.prev())&&i.nodeName()=="a"&&!i[0].childNodes.length&&i.remove();(o=c.next())&&o.nodeName()=="a"&&!o[0].childNodes.length&&o.remove()}else j=1}if(!j&&d){a.selectedEl||(q=e.createBookmarks());b=new m("<a></a>");b.attr("_ke_saved_href",d).attr("href",d).attr("target",f);d=
c[0];d.parentNode.replaceChild(b[0],d);b.append(d)}q?e.selectBookmarks(q):a.selectedEl&&a.editor.getSelection().selectElement(a.selectedEl);j||a.editor.execCommand("save")},100)},_update:function(a){var b=0,c,d=f.Utils.resetInput;if((this.selectedEl=a)&&!1!==this.imageCfg.remote){g(this.imgUrl,a.attr("src"));c=parseInt(a.style("width"));var j=parseInt(a.style("height"));j?g(this.imgHeight,j):d(this.imgHeight);c?g(this.imgWidth,c):d(this.imgWidth);this.imgAlign.set("value",a.style("float")||"none");
this.imgMargin.val(parseInt(a.style("margin"))||0);this.imgRatio[0].disabled=!1;this.imgRatioValue=c/j;c=p(a)}else(a=this.editor.getSelection().getCommonAncestor())&&(c=p(a)),a=this.imageCfg.defaultMargin,void 0==a&&(a=10),2==this.tab.get("bar").get("children").length&&(b=1),this.imgLinkBlank.attr("checked",!0),d(this.imgUrl),d(this.imgLink),d(this.imgHeight),d(this.imgWidth),this.imgAlign.set("value","none"),this.imgMargin.val(a),this.imgRatio[0].disabled=!0,this.imgRatioValue=null;c?(g(this.imgLink,
c.attr("_ke_saved_href")||c.attr("href")),this.imgLinkBlank.attr("checked","_blank"==c.attr("target"))):(d(this.imgLink),this.imgLinkBlank.attr("checked",!0));this.uploadForm[0].reset();this.imgLocalUrl.val(h);d=this.tab;d.setSelectedTab(d.getTabAt(b))},show:function(a){this._prepare();this._update(a);this.d.show()},destroy:function(){this.d.destroy();this.tab.destroy();this.loadingCancel&&this.loadingCancel.remove();this.imgAlign&&this.imgAlign.destroy()}});return s},{requires:["ajax","editor","../overlay/",
"tabs","../menubutton/"]});
