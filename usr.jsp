<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<form action="justtest_add" method="post">
		<input type="text" name="usrName"/><br>
		<input type="password" name="usrPwd"/><br>
		<input type="submit"/>
	</form>
	<br>
	<a href="justtest_getAllUsr">查询全部用户</a>
	<form action="justtest_getByName" method="post">
		<input type="text" name="usrName"/><br>
		<input type="submit" value="查询"/>
	</form>
</body>
</html>