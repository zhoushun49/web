/**
 * 全画面用共通JS函数
 */
KISSY.add("loong/common", function(S, Overlay, Button, Validation) {
	var validationMap = {};
	S.ready(function (S) {
		
		//前端Validation默认设置
		S.all("form").each(function(item ,key){
			validationMap[item.attr("id")] = new Validation(item[0] ,{
		    	attrname: "data-check",
		    	style:'text',
		    	okMsg:"<img src='images/common/correct.png'/>",
		    	custumKey :"checkForm",
		    	custumFuc : function(event){
					if(!validationMap[this.form.id].isValid()) {
						event.stopImmediatePropagation();
						exports.openErrorDialog("请核对输入信息后再提交。");
						return false;
					}
		    	}
		    });
		});
	});
	var dialogMap = {"type1" : null, "type2": null,"type3": null};
	var buttonMap = {"button1" : null, "button2": null};
	var postButonClick = null;
	var cancelButonClick = null;
	
	function getDialog1() {
		if (!dialogMap["type1"]) {
			var d = new Overlay.Dialog({
				width:350,
				mask:true,
				align:{points:['cc', 'cc']}
			});

			d.on("afterRenderUI", function () {
				buttonMap["button1"] = new Button({
					content:"确定",
					elCls:"ks-button-primary",
					listeners:{click:function () {d.hide();if(postButonClick)postButonClick();}},
					render:d.get("footer")
				});
				buttonMap["button1"].render();
				
				
				buttonMap["button2"] = new Button({
					content:"取消",
					render:d.get("footer"),
					listeners:{click:function () {d.hide();if(cancelButonClick)cancelButonClick();}},
				});
				buttonMap["button2"].render();
			});
			dialogMap["type1"] = d;
		}
		return dialogMap["type1"];
	}
	var exports = {};
	function getDialog2() {
		if (!dialogMap["type2"]) {
			dialogMap["type2"] = new Overlay.Popup({
				elCls:"ks-popup-top",
				triggerType:"mouse",
				content:'<div class="ks-popup-arrow"></div><div class="ks-tooltip-inner">请稍等</div>',
				effect:{
					effect:"fade",
					duration:0.3
				},
				align:{
					node:'#tooltip',
					points:['tc', 'bc']
				}
			});
		}
		return dialogMap["type2"];
	}
	

	exports =  {
		//验证对象
		validationMap : validationMap,
			
		//弹出一般信息对话框
		openInfoDialog : function (content ,func) {
			postButonClick = func;
			var d = getDialog1();
			d.set("headerContent" , "<div class='infoDialog'><span>提示</span></div>");
			d.set("mask" , false);
			d.set("bodyContent" , "<div>" + content + "</div>");
			d.show();
			if (buttonMap["button2"])buttonMap["button2"].hide();
		},
		
		//弹出警告对话框
		openWarnDialog : function (content,func) {
			postButonClick = func;
			var d = getDialog1();
			d.set("headerContent" , "<div class='warnDialog'><span>注意</span></div>");
			d.set("mask" , false);
			d.set("bodyContent" , "<div>" + content + "</div>");
			d.show();
			if (buttonMap["button2"])buttonMap["button2"].hide();
		},
		//弹出错误信息对话框
		openErrorDialog : function (content,func) {
			postButonClick = func;
			var d = getDialog1();
			d.set("headerContent" , "<div class='errDialog'><span>错误</span></div>");
			d.set("mask" , false);
			d.set("bodyContent" , "<div>" + content + "</div>");
			d.show();
			if (buttonMap["button2"])buttonMap["button2"].hide();
		},
		//弹出确认对话框
		openConfirmDialog : function (content,func1, func2) {
			postButonClick = func1;
			cancelButonClick = func2;
			var d = getDialog1();
			d.set("width" , "700");
			d.set("headerContent" , "<b>确认</b>");
			d.set("mask" , true);
			d.set("bodyContent" , "<div>" + content + "</div>");
			d.show();
			if (buttonMap["button2"])buttonMap["button2"].show();
		},
		//弹出tooltip
		tooltip : function(id ,content){
			var d = getDialog2();
			d.set("align" , {
				node:'#' + id,
				points:['tc', 'bc']
			});
			d.show();
			return d;
		}
	};
	return exports;
},{
	requires:["overlay","button","overlay/assets/dpl.css","button/assets/dpl.css","gallery/validation/1.0/"]
});