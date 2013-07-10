<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<table>
		<tr><th>用户名</th><th></th></tr>
		<s:iterator value="usrs">
			<tr>
				<td>
					<s:property value="usrName"/>
				</td>
				<td>
					<a href="justtest_getByName?usrName=<s:property value="usrName"/>">修改密码</a>
					<a href="justtest_deleteUsr?usrName=<s:property value="usrName"/>">删除</a>
				</td>
			</tr>
		</s:iterator>
	</table>
	<b><s:property value="usr.usrName"/> </b>
</body>
</html>