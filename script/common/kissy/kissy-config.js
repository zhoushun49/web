(function(S){
	S.config({
		debug:true,
		base:"script/common/kissy/",
	    packages:[
	        {
	            name:"loong", // 包名
	            tag:new Date(), // 动态加载包内的模块js文件时,
	            debug:true,
	            path:"script" // 包对应路径, 相对路径指相对于当前页面路径
	        }
	    ]
	});
})(KISSY);