<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户注册</title>
    

  </head>
  <script type="text/javascript">    
	function changeValidateCode(obj) {    
		var timenow = new Date().getTime();    
		obj.src="register/randomAction_execute.action?d="+timenow;    
	}    
</script> 
  <body>
  	<form action="" method="post">
  		<s:text name="验证码"></s:text>：
		<s:textfield name="rand" size="5"></s:textfield>
		<img src="register/randomAction_execute.action"  onclick="changeValidateCode(this)" title="点击图片刷新验证码"/>
  	</form>
  </body>
</html>
