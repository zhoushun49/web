KISSY.add("gallery/form/1.2/uploader/themes/ershouUploader/index",function(e,h,c,i,a){var b="",g=h.all,d="[Theme-ershou] ";function f(k){var j=this;f.superclass.constructor.call(j,k)}e.extend(f,c,{afterUploaderRender:function(n){var u=this,j=u.get("oPlugin"),o=n.get("queue"),m=n.get("button"),k=n.get("auth"),s=u.get("queueTarget");var r=m.get("target"),t=g(".original-file-input",r);g(t).remove();e.log(d+"old input removed.");var q=5;if(k){q=k.getRule("max")}else{e.log(d+"Cannot get auth")}u.set("maxFileAllowed",q);var p=new j.preview(),v=new i({msgContainer:u.get("msgContainer"),successMsgCls:u.get("successMsgCls"),hintMsgCls:u.get("hintMsgCls"),errorMsgCls:u.get("errorMsgCls")}),l=new a(u.get("mainPicInput"),u.get("queueTarget"));u.set("message",v);u.set("preview",p);u.set("setMainPic",l);if(n.get("type")=="ajax"){e.log(d+"advance queue");g(u.get("queueTarget")).addClass("advance-queue")}g(s).delegate("click",".J_SetMainPic",function(y){y.preventDefault();var x=y.currentTarget,w=g(x).parent("li");l.setMainPic(w)});g(s).delegate("click",".J_DeleltePic",function(x){x.preventDefault();var w=x.currentTarget,y=g(w).attr("data-file-id");o.remove(y)});return true;o.on("restore",function(y){var w=l.getMainPicUrl(),x=o.getFiles("success"),z=x?parseInt(x.length,"10"):0+parseInt(y.filesData.length,"10");l.setMainPic(w);if(z){v.send(e.substitute(leftMsg,{left:q[0]-z}),"hint")}});o.on("add",function(y){var x=g(".J_ItemPic",y.target),w=o.getFiles("success");p.preview(y.file.input,x);e.log(d+"preview done for file: "+y.file.id);if(w.length+1){v.send(e.substitute(leftMsg,{left:q[0]-w.length-1}),"hint")}});o.on("remove",function(x){var w=o.getFiles("success"),y;l.setMainPic();if(w.length){y=e.substitute(leftMsg,{left:q-w.length})}else{y=e.substitute(defaultMsg,{max:q})}v.send(y,"hint")});n.on("success",function(z){var x=z.file,y=x.target,w=x.sUrl;g(y).attr("data-url",w);l.setMainPic()})},_updateCount:function(){var l=this,k=l.get("queue"),o=k.getFiles("success"),j=l.get("maxFileAllowed")[0],n=l.get("message"),q=l.get("defaultMsg"),m=l.get("leftMsg"),p;if(o.length){p=e.substitute(m,{left:j-o.length})}else{p=e.substitute(q,{max:j})}n.send(p,"hint");e.log(d+"file count updated. Message sent.")},_addCallback:function(l,m){var k=this,j=k.get("queue"),n=k._appendFileDom(m);j.updateFile(l,{target:n});j.fileStatus(l,"waiting");k.displayFile(true,n);k._updateCount();return j.getFile(l)},_waitingHandler:function(m){var j=this,n=j.get("preview"),k=m.file,o=k.target,l=g(".J_ItemPic",o);n&&n.preview(k.input,l);e.log(d+"preview done for file: "+m.file.id);g(o).addClass("upload-waiting")},_addHandler:function(j){e.log(d+"add done.")},_startHandler:function(l){var j=this,k=l.file,m=k.target;g(m).replaceClass("upload-waiting","uploading");e.log(d+"start upload")},_successHandler:function(m){var j=this,k=m.file,n=k.target,l=j.get("setMainPic");g(n).replaceClass("uploading","upload-done").attr("data-url",k.result.data.url);l.setMainPic();j._updateCount()},_removeFileHandler:function(l){var j=this,k=l.file,m=k.target;j._updateCount();g(m).remove();e.log(d+"file deleted.")}},{ATTRS:{name:{value:"ershouUploader"},cssUrl:{value:"gallery/form/1.2/uploader/themes/ershouUploader/style.css"},fileTpl:{value:['<li id="J_LineQueue-{id}" data-file-id="{id}" data-url="{sUrl}" data-name="{name}" data-size="{textSize}">','<div class="J_Wrapper wrapper">','<div class="tb-pic120">','<a href="javascript:void(0);"><img class="J_ItemPic" src="{sUrl}" /></a>',"</div>",'<div class="pic-mask"></div>','<div class="tips-uploading"><div class="progress-bar J_ProgressBar"><span class="progress-mask J_UploadingProgress"></span></div><p class="tips-text">上传中，请稍候</p></div>','<div class="tips-upload-success"><span class="progress-bar"></span><p class="tips-text">上传成功！</p></div>','<div class="tips-upload-error"><span class="progress-bar"></span><p>上传失败</p><p>请重新尝试！</p></div>','<div class="tips-upload-waiting">等待上传，请稍候</div>','<div class="upload-op-mask"></div>','<div class="upload-operations">','<a class="J_SetMainPic set-as-main" data-file-id="{id}" href="#">设为主图</a>','<a class="J_DeleltePic del-pic" data-file-id="{id}" href="#">删除</a>',"</div>","</div>","</li>"].join("")},plugins:{value:["preview","progressBar"]},msgContainer:{value:"#J_MsgBoxUpload"},defaultMsg:{value:"最多上传{max}张照片，每张图片小于5M"},leftMsg:{value:"还可以上传{left}张图片，每张小于5M。主图将在搜索结果中展示，请认真设置。"},successMsgCls:{value:"msg-success"},hintMsgCls:{value:"msg-hint"},errorMsgCls:{value:"msg-error"},mainPicInput:{value:"#J_MainPicUrl"}}});return f},{requires:["node","../../theme","./message","./setMainPic"]});KISSY.add("gallery/form/1.2/uploader/themes/ershouUploader/message",function(c,a){var d=a.all,e="[ershouUploader: Message] ";function b(g){var f=this;f.config=c.mix({msgContainer:"#J_MsgBoxUpload",successMsgCls:"msg-success",hintMsgCls:"msg-hint",errorMsgCls:"msg-error"},g);c.log(e+"Constructed")}c.augment(b,{send:function(m,k){var h=this;if(!m){c.log(e+"You did not tell me what to show.");return false}var g=h.config.msgContainer,f=h.config[k+"MsgCls"],i=h.config.successMsgCls,j=h.config.hintMsgCls,l=h.config.errorMsgCls;if(g){switch(k){case"success":case"hint":case"error":d(g).html(m);d(g).replaceClass([i,j,l].join(" "),f);return true;break;default:c.log(e+"type error");return false;break}}}});return b},{requires:["node"]});KISSY.add("gallery/form/1.2/uploader/themes/ershouUploader/setMainPic",function(c,b){var d=b.all,e="[LineQueue: setMainPic] ";function a(g,h){var f=this,g=d(g),h=d(h);if(!g||g.length<=0){c.log(e+"cannot find mainPicInput, SetMainPic function disabled.");return false}if(!h||h.length<=0){c.log(e+"cannot find queue container");return false}f.queueContainer=h;f.input=g}c.augment(a,{setMainPic:function(m){var f=this,j=f.queueContainer,k=d("li",j);if(c.isString(m)){c.each(k,function(p,o){var n=d(p).attr("data-url");if(n==m){m=p;return true}})}var i=f.getMainPic(),m=d(m);if(!m||m.length<=0){if(!k[0]){c.log(e+"There is no pic. I cannot set any pic as main pic. So I will empty the main pic input.");d(f.input).val("");return null}else{if(i.length>0){c.log(e+"Already have a main pic. Since you do not tell me which one to set as main pic, I will do nothing.");return i}else{c.log(e+"No li element specified. I will set the first pic as main pic.");m=k[0]}}}var g=d(".J_Wrapper",m),h=d('<span class="main-pic-logo">主图</span>'),l=d(m).attr("data-url");if(i.length>0){d(i).removeClass("main-pic");d(".main-pic-logo",i).remove()}d(m).addClass("main-pic");d(h).appendTo(g);d(f.input).val(l);c.log(e+"write main pic url to :"+l);return m},getMainPic:function(){var f=this;return d(f.queueContainer).children(".main-pic")},getMainPicUrl:function(){var f=this;return d(f.input).val()}});return a},{requires:["node"]});