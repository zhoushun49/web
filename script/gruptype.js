/*
'//===========================================================================================
'//						gruptype.js
'//-------------------------------------------------------------------------------------------
'//		description		: 
'//		table			: [SELECT] 
'//		version			: ALL
'//		begin			: Afon
'//		copyright		: (C) 2003 COWELL
'//		author			: 
'//		更动纪录		:	
'//		2003-04-02		: [ 阿光 ]新增sel_search_Local() 和 sel_addr_ch2en()两支Function
'//		2003-04-09		: [ 阿光 ]发票地址加上国家、城市、邮递区号
'//		2003-05-02		: [ 阿光 ]选择应收帐号清单
'//		2003/05/06		: [ 阿光 ]新增sel_carr_search()依关键字搜寻航空公司功能
'//								  修改SELDATE_onclick()可输入表单名称
'//		2004/11/29		: [ 阿光 ]新增pblDialogHeight、pblDialogHeightB两个参数，部分 Dialog辅助选单高度的设定
'//		2005/01/04		: [ 阿光 ]修改 sel_search_Local() (sel_natn="变数移除)
'//		2005/05/09		: [Steve ]处理点选选择城市及国家menu会出现两次的Bug
'//		2005/05/09		: [ Ham	 ]SELCITY_onclick 修正呼叫 SELNATN_onclick 时参数值未带入
'//		2005/09/29		: [Brian ]新增统一编号及身分证字号验证方法
'//		2005-10-20		: [ Afon ]新增 CTC_Type变数，判别 function SEL_CTC_NM type为checkbox或radio
'//		2005-11-10		: [ Afon ]SELMEMBER_onclick 新增取回会员卡代码
'//		2005-11-24		: [ Afon ]SELNATN_onclick 新增判别是否为参照国，回传国家名称
'//		2005-12-08		: [ Afon ]Mark SELCITY_onclick 错误讯息
'//		2006-05-12		: [Steve ]修改 sel_search_Local()  改为呼叫城市辅助查询视窗 [公用程式介面]
'//		2006-05-12		: [Steve ]新增 sel_city_sin()  单选城市辅助查询视窗 [公用程式介面]
'//		2006-06-20		: [ Afon ]新增 sel_trword() 回传万用代码 
'//		2006-06-28		: [ Afon ]国家辅助查询 SELNATN_onclick()改为公用视窗方式处理
'//		2006-07-13		: [ Afon ]总代理辅助查询 SELACCT_onclick()同业 与 航空公司 的辅助查询, 改为公用视窗方式处理
'//		2006-07-13		: [ Afon ]调整sel_trword() 显示搜寻表头；已指定类别，列表资料就不需显示类别；调整可回传多资料
'//		2006-07-17		: [ Afon ]调整sel_search_Local() 改为呼叫国家辅助查询视窗 [公用程式介面]
'//		2006-08-16		: [ Afon ]调整 SELNATN_onclick()，排除复选时找不到资料
'//									   SELAREA_onclick()，subcd_area , stop_next 无任何值时，执行 洲别 辅助查询
'//		2006-08-17		: [ Afon ]调整 SELNATN_onclick()，排除复选时，洲别资料只回传一笔资料
'//		2006-08-25		: [ Afon ]调整 SELNATN_onclick() 复选时不清除原本资料
'//		2006-12-07		: [ Afon ]因为开放可以重选城市，故需回传城市及相关资料
'//								  city_cdfrm = 城市代码, city_nm1frm = 城市名称, city_nm2frm = 地址(城市-中), city_enmfrm = 地址(城市-英), city_ccd = (电话区码)
'//		2007-01-03		: [ Leon ]调整 putCntaValue()，增加住家电话 住家传真 公司电话的国码跟区码栏位预设
'//		2007-01-04		: [ Leon ]调整 SELVISA_PAX_onclick() 回传值原本用/区分 改成用 |/| 区分
'//		2007-09-17		: [ 汉堡 ]新增 chkValue(obj,defValue)检查栏位值,若为空值则输入预设值
'//     2008-05-13      : [ mary ]调整 dialogHeight=300pt改为dialogHeight=302pt
'//		2008-08-28		: [Ham] 调整 SELCTC_PO_onclick() 增加带入参数--栏位名称
'//===========================================================================================
*/

if(!pblDialogHeight){ var pblDialogHeight = 310;	}
if(!pblDialogHeightB){ var pblDialogHeightB = 330;	}

function check_ADDR_CITY(tp, NATN_itemName, NATN_itemCode, CITY_itemName,CITY_itemCode, frameName)
{			
	var Citycd = document.FORM1.elements(CITY_itemCode).value ;
	
	if (Citycd != '') {
		var frmitem = eval("self." + frameName);
		frmitem.location.href = "/include/getaddrcity_nm_cnta.asp?tp="+ tp +"&CITY_CD=" + Citycd + "&CITY_itemName=" + CITY_itemName + "&CITY_itemCode=" + CITY_itemCode + "&NATN_itemName=" + NATN_itemName + "&NATN_itemCode=" + NATN_itemCode;
	} else {
	
		window.alert('请输入城市代码!');
	}
}
function sel_subcd_n(formname,valsubcd, subcd, subdr, subdr1) {

	mysubcd = showModalDialog("/include/sel_subcd.asp?subcd="+valsubcd+"&chice=H","","dialogWidth=260pt;dialogHeight=300pt");

	if (mysubcd)
	{
		var ary_subcd = mysubcd.split('，');
		document.forms(formname).elements(subcd).value = ary_subcd[0];
		document.forms(formname).elements(subdr).value = ary_subcd[1];
		document.forms(formname).elements(subdr1).value = "";
	}
}
//--------------------------------------------------------
// 选择应收帐号清单(2003-05-02)
//--------------------------------------------------------
function sel_ovisa(OVISA_TYPE,ACCT_CD,ACCT_NM) {

	var acct_type = showModalDialog("/include/sel_ovisa_acct_type.asp?ovisa_type="+OVISA_TYPE,"","dialogTop=10pt;dialogWidth=300pt;dialogHeight=350pt;status=no;help=no");
	
	if (acct_type) {
		var ary_acct_type= acct_type.split('，');	

		if (ary_acct_type.length > 1) {
			acct_type = ary_acct_type[0];	
		}
	

	var search = sel_search();

	if (search) {
		
		var ary_search = search.split('，');				
		
		if (ary_search.length > 0) {				

			acct_cd = ary_search[1];
			acct_nm = ary_search[2];
				
			var stracct = sel_ovisa_acct(OVISA_TYPE, acct_type, acct_cd ,acct_nm);
			
			if (stracct) {
				FORM1.elements(ACCT_CD).value = stracct[0][0];
				FORM1.elements(ACCT_NM).value = stracct[0][1];
			}
		}
	}
	}
}
//--------------------------------------------------------
// 选择应收帐务
//--------------------------------------------------------
function sel_ovisa_acct(OVISA_TYPE,ACCT_TYPE, ACCT_CD, ACCT_NM) {
	var acctlist = showModalDialog("/include/sel_ovisa_acct.asp?ovisa_type="+OVISA_TYPE+"&acct_type="+ACCT_TYPE+"&ACCT_CD="+ACCT_CD+"&ACCT_NM="+ACCT_NM+"&chice=H","dialogWidth=200pt;dialogHeight=310pt");	

	if (acctlist) {
		return acctlist;
	}
}
//限制只能输入数字
function isno_onkeypress() {
if ((event.keyCode < 48) || (event.keyCode > 57)) {event.returnValue = false;alert("请输入阿拉伯数字!");}
}

// 清空 栏位 资料 fieldnm(栏位名称)
function cls_fields(fieldnm) {		
	var i
		for(i = 0 ; i < document.FORM1.elements.length ; i++) {
			if (document.FORM1.elements[i].name.indexOf(fieldnm) == 0 || document.FORM1.elements[i].name.indexOf('ITN') == 0) 
			{
			document.FORM1.elements[i].value = '';
			}
		}	
}
function cls_fields1(fieldnm) {		
	var i
		for(i = 0 ; i < document.FORM1.elements.length ; i++) {
			if (document.FORM1.elements[i].name.indexOf(fieldnm) == 0) 
			{
			document.FORM1.elements[i].value = '';
			}
		}	
}
//--------------------------------------------------------
// 输入搜寻条件 显示视窗
//--------------------------------------------------------
function sel_search() {					
	var strsearch = showModalDialog("/include/sel_search.asp","sel_search","dialogWidth=300pt;dialogHeight=180pt");	

	if (strsearch) {
		return strsearch;
	}
	
}

//--------------------------------------------------------
// 选择员工清单(新版 2003-03-11)
//--------------------------------------------------------
function sel_emp(empcd, empnm, deptcd, deptnm, compcd, compnm) {
	// 选择员工清单(新版 2006-03-28)
	var RTN_FLD = "TREMP.EMP_CD, TREMP.EMP_CNM, TRDEPT.DEPT_CD, TRDEPT.DEPT_NM, TRDSYS.COMP_CD, TRDSYS.COMP_ANM";
	var SEL_FLD = "'<a target=\"_blank\" href=\"/A/V_EMP.asp?EMP_CD=' + TREMP.EMP_CD + '\">' + TREMP.EMP_CD + '</a>' AS '员工代码', TRDSYS.COMP_ANM AS '分公司', TRDEPT.DEPT_NM AS '部门', TREMP.EMP_CNM AS '员工姓名', ";

	SEL_FLD += "(CASE ISNULL( (SELECT TREMP.OUT_DT WHERE LTRIM(REPLACE(ISNULL(TREMP.OUT_DT, ''), '/', '')) <> '' AND TREMP.OUT_DT < (CONVERT(CHAR(4), YEAR(GETDATE())) + '/' + RIGHT('0' + RTRIM(CONVERT(CHAR(2), MONTH(GETDATE()))), 2)  + '/' + RIGHT('0' + RTRIM(CONVERT(CHAR(2), DAY(GETDATE()))), 2))) , '') WHEN '' THEN '<img src=\"/images/bonus0.gif\">' ELSE '<img src=\"/images/bonus1.gif\">' END) AS '已离职'";

	var SEL_FRM = "TREMP, TRDSYS, TRDEPT";
	var SEL_WHR = "TREMP.COMP_CD = TRDSYS.COMP_CD AND TREMP.DEPT_CD = TRDEPT.DEPT_CD";
	var SEL_ORD = "TREMP.EMP_CD"
	var Action  = "/include/sel_help_emp.asp";
	var Multi   = "";
	var Title   = "员工";
	//2008-09-03 [Ham] 修改高度
	//var sFeatures = "dialogWidth=520px;dialogHeight=490px";
	var sFeatures = "dialogWidth=520px;dialogHeight=640px";
	var ary_emp = SearchWin(RTN_FLD, SEL_FLD, SEL_FRM, SEL_WHR, SEL_ORD, Multi, Action, Title, sFeatures);

	if (ary_emp)
	{
		FORM1.elements(empcd).value  = ary_emp[0][0];
		FORM1.elements(empnm).value  = ary_emp[0][1];
		FORM1.elements(deptcd).value = ary_emp[0][2];
		FORM1.elements(deptnm).value = ary_emp[0][3];
		FORM1.elements(compcd).value = ary_emp[0][4];
		FORM1.elements(compnm).value = ary_emp[0][5];
	}
/*--------------------------------------------------------------------------------------	
	var search = sel_search();

	if (search) {
		
		var ary_search = search.split('，');				
		
		if (ary_search.length > 0) {				
			tp = ary_search[0];
			
			// show all data
			if (tp=='A') {
				sh_code = '';
				sh_name = '';	
				
				var stremp = sel_emplist('A', sh_name, sh_code);					
			}
			// show match condition data
			if (tp=='S') {
				sh_code = ary_search[1];
				sh_name = ary_search[2];
				
				var stremp = sel_emplist('S', sh_name, sh_code);
			}
		
			if (stremp) {
				//alert(stremp);
				var ary_emp= stremp.split('，');		
				
				if (ary_emp.length > 0) {
					FORM1.elements(empcd).value = ary_emp[0];	
					FORM1.elements(empnm).value = ary_emp[1];	
					FORM1.elements(deptcd).value = ary_emp[2];	
					FORM1.elements(deptnm).value = ary_emp[3];	
					FORM1.elements(compcd).value = ary_emp[4];	
					FORM1.elements(compnm).value = ary_emp[5];		
				}
			}
		}
	}	
--------------------------------------------------------------------------------------*/
}
//--------------------------------------------------------
// 选择员工 tp = (A:全部,S:依条件) 显示方式 , sh_name = 名称条件, sh_code = 代码条件
//--------------------------------------------------------
function sel_emplist(tp, sh_name, sh_code) {
	var emplist = showModalDialog("/include/sel_emplist.asp?tp="+tp+"&sh_code="+sh_code+"&sh_name="+sh_name+"&chice=H","dialogWidth=200pt;dialogHeight=310pt");	

	if (emplist) {
		return emplist;
	}
}

function show_pax() {
	var id_no = document.FORM1.elements('ID_NO').value;
	var error = (check_identity( id_no ));
	
	if ( error.length != 0 )
	{	
		alert(error);
		return false;
	}

	if ( id_no && (error.length == 0 ) )
	{
		var paxinfo
		paxinfo = showModalDialog("/include/show_pax.asp?id_no="+id_no,"","dialogTop=10pt;dialogWidth=250pt;dialogHeight=250pt;status=no;help=no");

		if (paxinfo) {
			var ary_paxinfo=paxinfo.split('，');
			var brth_dt = '';
			brth_dt = ary_paxinfo[2];
			var ary_brth_dt = brth_dt.split('/');

			document.FORM1.elements('PAX_CD'+pax_sq).value = ary_paxinfo[1];
			document.FORM1.elements('BRTH_DT_YY'+pax_sq).value = eval(ary_brth_dt[0]);
			document.FORM1.elements('BRTH_DT_MM'+pax_sq).value = eval(ary_brth_dt[1]);
			document.FORM1.elements('BRTH_DT_DD'+pax_sq).value = eval(ary_brth_dt[2]);
			document.FORM1.elements('PAX_TI'+pax_sq).value = ary_paxinfo[3];
			document.FORM1.elements('PAX_CNML'+pax_sq).value = ary_paxinfo[4];
			document.FORM1.elements('PAX_CNMF'+pax_sq).value = ary_paxinfo[5];
			document.FORM1.elements('PAX_ENMF'+pax_sq).value = ary_paxinfo[6];
			document.FORM1.elements('PAX_ENML'+pax_sq).value = ary_paxinfo[7];
			
			return true;

		}
	}

}
// check 身分证号规则
function check_identity ( id )
{
     var myid = id;
     myid = myid.toUpperCase();
     id = myid;
     alert(id);
     if(myid.length>10)
        return "您的身分证字号超过10个字 !\n";
     if(myid.length<10)
        return "您的身分证字号不满10个字 !\n";
     var c = myid.charAt(0);
     if(c<"A" || c> "Z")
        return "您的身分证字号第一码必须是大写的英文字母 !\n";
     c = myid.charAt(1);
     if(c!="1" && c!="2")
        return "您的身分证字号第二码有问题 !\n";
     for(i=1;i<10;i++)
        if(isNaN(parseFloat(myid.charAt(i))))
           return "您的身分证字号第二到十码有问题 !\n";
     var alph = new Array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","X","Y","W","Z","I","O");
     var num  = new Array("10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35");
     var n=0;
     for(i=0;i<alph.length;i++)
       if(myid.charAt(0)==alph[i])
          n=i;
     var tot1 = parseFloat(num[n].charAt(0)) + (parseFloat(num[n].charAt(1)) * 9);
     var tot2 = 0;
     for(i=1;i<myid.length-1;i++)
		    tot2 = tot2 + parseFloat(myid.charAt(i))*(9-i);
     var tot3 = parseFloat(myid.charAt(9));
     var tot4 = tot1 + tot2 + tot3;
     if((tot4 % 10)!=0)
        return "您的身分证字号有问题 !\n";

   return "";
}
//选择联络人(AGT)
function SEL_CTC_NM(agt_cd,agtc_nm,agtc_cd,c_type,no) {
	var mycomp
	var str_agtc_nm=''
	var str_agtc_cd=''
	
//2005-10-20 新增 CTC_Type变数，判别type为checkbox或radio
	if (c_type = "S")
		{	CTC_Type = "radio" ;	}
	else
		{	CTC_Type = "checkbox" ;	}
//------------------------------------------------------

	mycomp = showModalDialog("/include/sel_ctc_nm.asp?aa="+agt_cd+"&CTC_Type="+CTC_Type,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mycomp) {
		ary_comp = mycomp.split('/');

		for(var i=0;i<ary_comp.length;i++) {

			var ary_comp2 = ary_comp[i].split('，');
			
			for(var j=0;j<ary_comp2.length-1;j++) {
				
				if (j==0) {	
					if (str_agtc_nm=='')	{
						str_agtc_nm = ary_comp2[j];
					} else {
						str_agtc_nm = str_agtc_nm+'/'+ary_comp2[j];
					}
				} 
				if (j==1) {
					if (str_agtc_cd=='')	{
						str_agtc_cd = ary_comp2[j];
					} else {
						str_agtc_cd = str_agtc_cd+'/'+ary_comp2[j];
					}
				}
			}
		}
		FORM1.elements(agtc_nm).value = str_agtc_nm;
		FORM1.elements(agtc_cd).value = str_agtc_cd;
		return true;
	}
}
//选择服务单位(PAX)
function SEL_SERVICE_COMPANY(comp_nm,boss_cnm,ctc_nm,comp_enm) {
	var mycomp
	var str_comp_nm=''
	var str_comp_enm=''
	var str_boss_cnm=''
	var str_ctc_nm=''
	
	var search = sel_search();

	if (search) {
		
		var ary_search = search.split('，');
		
		sh_code = ary_search[1];
		sh_name = ary_search[2];

		mycomp = showModalDialog("/include/sel_service_company.asp?sh_code="+sh_code+"&sh_name="+sh_name,"","dialogWidth=300pt;dialogHeight=300pt");
		if (mycomp) {
			ary_comp = mycomp.split('/');
        	
			for(var i=0;i<ary_comp.length;i++) {
        	
				var ary_comp2 = ary_comp[i].split('，');
				
				for(var j=0;j<ary_comp2.length-1;j++) {
					
					if (j==0) {	
						if (str_comp_nm=='')	{
							str_comp_nm = ary_comp2[j];
						} else {
							str_comp_nm = str_comp_nm+'/'+ary_comp2[j];
						}
					} 
					if (j==1) {
						if (str_boss_cnm=='')	{
							str_boss_cnm = ary_comp2[j];
						} else {
							str_boss_cnm = str_boss_cnm+'/'+ary_comp2[j];
						}
					}
					if (j==2) {
						if (str_ctc_nm=='')	{
							str_ctc_nm = ary_comp2[j];
						} else {
							str_ctc_nm = str_ctc_nm+'/'+ary_comp2[j];
						}
					}
					if (j==3) {
						if (str_comp_enm=='')	{
							str_comp_enm = ary_comp2[j];
						} else {
							str_comp_enm = str_comp_enm+'/'+ary_comp2[j];
						}
					}
				}
			}
			FORM1.elements(comp_nm).value = str_comp_nm;
			FORM1.elements(comp_enm).value = str_comp_enm;
			FORM1.elements(boss_cnm).value = str_boss_cnm;
			FORM1.elements(ctc_nm).value = str_ctc_nm;
			return true;
		}
	}
}
//选择公司
function SELCOMP_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_comp,stop_next) {
	var mycomp
	var str_comp_cd=''
	var str_comp_nm=''

	mycomp = showModalDialog("/include/sel_dsys_n.asp?chice="+subcd_comp,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mycomp) {
		ary_comp = mycomp.split('/');

		for(var i=0;i<ary_comp.length;i++) {

			var ary_comp2 = ary_comp[i].split('，');
			
			for(var j=0;j<ary_comp2.length-1;j++) {
				
				if (j==0) {	
					if (str_comp_cd=='')	{
						str_comp_cd = ary_comp2[j];
					} else {
						str_comp_cd = str_comp_cd+'/'+ary_comp2[j];
					}
				} else {
					if (str_comp_nm=='')	{
						str_comp_nm = ary_comp2[j];
					} else {
						str_comp_nm = str_comp_nm+'/'+ary_comp2[j];
					}
				}
			}
		}
		if (str_comp_cd != 'Y') {
			FORM1.elements(comp_cd).value = str_comp_cd;
		}
		else
		{
			FORM1.elements(check_comp_cd).value = str_comp_cd;
		}
		FORM1.elements(comp_nm).value = str_comp_nm;
		if (stop_next!="C") {
			SELDEPT_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_comp,stop_next);
		}
		return true;
	}
}
//选择部门
function SELDEPT_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_dept,stop_next) {
	var mydept
	var str_dept_cd=''
	var str_dept_nm=''
	mydept = showModalDialog("/include/sel_dept_n.asp?comp_cd="+FORM1.elements(comp_cd).value+"&old_deptcd="+FORM1.elements(dept_cd).value+"&chice="+subcd_dept,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mydept) {
		ary_dept = mydept.split('/');

		for(var i=0;i<ary_dept.length;i++) {

			var ary_dept2 = ary_dept[i].split('，');
			
			for(var j=0;j<ary_dept2.length-1;j++) {
				
				if (j==0) {	
					if (str_dept_cd=='')	{
						str_dept_cd = ary_dept2[j];
					} else {
						str_dept_cd = str_dept_cd+'/'+ary_dept2[j];
					}
				} else {
					if (str_dept_nm=='')	{
						str_dept_nm = ary_dept2[j];
					} else {
						str_dept_nm = str_dept_nm+'/'+ary_dept2[j];
					}
				}
			}
		}
		FORM1.elements(dept_cd).value = str_dept_cd;
		FORM1.elements(dept_nm).value = str_dept_nm;
		if (stop_next!="D") {
			SELEMP_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_dept,stop_next);
		}
		return true;
	}
		SELCOMP_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_dept,stop_next);
}
//选择员工
function SELEMP_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_emp,stop_next) {
	var myemp
	var str_emp_cd=''
	var str_emp_nm=''

	myemp = showModalDialog("/include/sel_emp_n.asp?comp_cd="+FORM1.elements(comp_cd).value+"&dept_cd="+FORM1.elements(dept_cd).value+"&usr_id="+FORM1.elements(emp_cd).value+"&chice="+subcd_emp,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myemp) {
		ary_emp = myemp.split('/');

		for(var i=0;i<ary_emp.length;i++) {

			var ary_emp2 = ary_emp[i].split('，');
			
			for(var j=0;j<ary_emp2.length-1;j++) {
				
				if (j==0) {	
					if (str_emp_cd=='')	{
						str_emp_cd = ary_emp2[j];
					} else {
						str_emp_cd = str_emp_cd+'/'+ary_emp2[j];
					}
				} else {
					if (str_emp_nm=='')	{
						str_emp_nm = ary_emp2[j];
					} else {
						str_emp_nm = str_emp_nm+'/'+ary_emp2[j];
					}
				}
			}
		}
		FORM1.elements(emp_cd).value = str_emp_cd;
		FORM1.elements(emp_nm).value = str_emp_nm;
		return true;
	}
		SELDEPT_A_onclick(check_comp_cd,comp_cd,comp_nm,dept_cd,dept_nm,emp_cd,emp_nm,subcd_emp,stop_next);
}
//-----------------------------------------------------------------
// 仅选择(国外)地区 (only area)
//-----------------------------------------------------------------
function SELAREA2_onclick(cd, nm) {
	var myarea
	var str_area_cd=''
	var str_area_nm=''

	myarea = showModalDialog("/include/sel_area.asp?aa="+FORM1.elements(cd).value,"","dialogWidth=210pt;dialogHeight=300pt");
	if (myarea) {		
		ary_area = myarea.split('/');

		for(var i=0;i<ary_area.length;i++) {

			var ary_area2 = ary_area[i].split('，');
			
			for(var j=0;j<ary_area2.length-1;j++) {
				
				if (j==0) {	
					if (str_area_cd=='')	{
						str_area_cd = ary_area2[j];
					} else {
						str_area_cd = str_area_cd+'/'+ary_area2[j];
					}
				} else {
					if (str_area_nm=='')	{
						str_area_nm = ary_area2[j];
					} else {
						str_area_nm = str_area_nm+'/'+ary_area2[j];
					}
				}
			}
		}
	}
	FORM1.elements(cd).value=str_area_cd;
	FORM1.elements(nm).value=str_area_nm;
	
	return true;	
}

//-----------------------------------------------------------------
// 选择洲别(PAX)
//-----------------------------------------------------------------
function SELAREA_PAX_onclick(cd, nm , subcd_area) {
	var myarea
	var str_area_cd=''
	var str_area_nm=''

	myarea = showModalDialog("/include/sel_area.asp?aa="+FORM1.elements(cd).value+"&chice="+subcd_area,"","dialogWidth=210pt;dialogHeight=300pt");
	if (myarea) {		
		ary_area = myarea.split('/');

		for(var i=0;i<ary_area.length;i++) {

			var ary_area2 = ary_area[i].split('，');
			
			for(var j=0;j<ary_area2.length-1;j++) {
				
				if (j==0) {	
					if (str_area_cd=='')	{
						str_area_cd = ary_area2[j];
					} else {
						str_area_cd = str_area_cd+'/'+ary_area2[j];
					}
				} else {
					if (str_area_nm=='')	{
						str_area_nm = ary_area2[j];
					} else {
						str_area_nm = str_area_nm+'/'+ary_area2[j];
					}
				}
			}
		}
	FORM1.elements(cd).value=str_area_cd;
	FORM1.elements(nm).value=str_area_nm;
	}
	if (FORM1.elements(cd).value != ""){
		SELNATN_PAX_onclick(cd,nm,subcd_area);
	}
	return true;	
}

//-----------------------------------------------------------------
// 选择国家(PAX)
//-----------------------------------------------------------------
function SELNATN_PAX_onclick(cd, nm, subcd_natn) {
	var mynatn
	var str_natn_cd=''
	var str_natn_nm=''

	mynatn = showModalDialog("/include/sel_natn.asp?aa="+FORM1.elements(cd).value+"&chice="+subcd_natn,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mynatn) {		
		ary_natn = mynatn.split('/');

		for(var i=0;i<ary_natn.length;i++) {

			var ary_natn2 = ary_natn[i].split('，');
			
			for(var j=0;j<ary_natn2.length-1;j++) {
				
				if (j==0) {	
					if (str_natn_cd=='')	{
						str_natn_cd = ary_natn2[j];
					} else {
						str_natn_cd = str_natn_cd+'/'+ary_natn2[j];
					}
				} else {
					if (str_natn_nm=='')	{
						str_natn_nm = ary_natn2[j];
					} else {
						str_natn_nm = str_natn_nm+'/'+ary_natn2[j];
					}
				}
			}
		}
	}
	FORM1.elements(cd).value=str_natn_cd;
	FORM1.elements(nm).value=str_natn_nm;
	return true;	
}
//-----------------------------------------------------------------
// 选择旅客(PAX)
//-----------------------------------------------------------------
function sel_trpax(cd, nm) {	

	var search = sel_search();
	
	if (search) {
		var ary_search = search.split('，');				
		var strpax = '';

		if (ary_search.length > 0) {				
			tp = ary_search[0];
			
			// show all data
			if (tp=='A') {
				sh_code = '';
				sh_name = '';	
				
				strpax = sel_userpax('A', sh_name, sh_code);					
			}
			// show match condition data
			if (tp=='S') {
				sh_code = ary_search[1];
				sh_name = ary_search[2];
				
				strpax = sel_userpax('S', sh_name, sh_code);
			}
			
			if (strpax) {
				var ary_userpax= strpax.split('，');		
				
				if (ary_userpax.length > 0) {
					pax_cd = ary_userpax[0];	
					pax_cnm = ary_userpax[1];						
					
					document.FORM1.elements(cd).value=pax_cd;										
					document.FORM1.elements(nm).value=pax_cnm;	
				}

			}		
		}
	}					

	return;	

}
//--------------------------------------------------------
// 选择直客 tp = (A:全部,S:依条件) 显示方式 , sh_name = 名称条件, sh_code = 代码条件
//--------------------------------------------------------
function sel_userpax(tp, sh_name, sh_code) {
	var paxcd = showModalDialog("/include/sel_userpax.asp?tp="+tp+"&sh_code="+sh_code+"&sh_name="+sh_name+"&chice=H","dialogWidth=200pt;dialogHeight=310pt");	
		
	if (paxcd) {
		return paxcd;
	}	
}

/*	---------------------------------------------------------------
	=====	2005-04-20	brian	选择证照的路径	=====
	---------------------------------------------------------------*/
function SELVISA_PAX_onclick(cd,nm,subcd_visa)	
{
	var myvisa
	var str_visa_cd=''
	var str_visa_nm=''
	var search = sel_search();
	if(search)
	{
		var ary_search = search.split('，');				

		if (ary_search.length > 0) 
		{				
			tp = ary_search[0];
			
			if (tp=='A') {
				sh_code = '';
				sh_name = '';	
			
			}		
			// show match condition data
			if (tp=='S') {
				sh_code = ary_search[1];
				sh_name = ary_search[2];
			}	
	myvisa = showModalDialog("/include/sel_visa_n.asp?aa="+sh_code+"&bb="+sh_name+"&chice="+subcd_visa,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myvisa) {		
//2007-01-04 leon 原本用 / 改成用 |/|
		ary_visa = myvisa.split('|/|');

		for(var i=0;i<ary_visa.length;i++) {

			var ary_visa2 = ary_visa[i].split('，');
			
			for(var j=0;j<ary_visa2.length-1;j++) {
				
				if (j==0) {	
					if (str_visa_cd=='')	{
						str_visa_cd = ary_visa2[j];
					} else {
						str_visa_cd = str_visa_cd+'/'+ary_visa2[j];
					}
				} else {
					if (str_visa_nm=='')	{
						str_visa_nm = ary_visa2[j];
					} else {
						str_visa_nm = str_visa_nm+'/'+ary_visa2[j];
					}
				}
			}
		}
	}
	FORM1.elements(cd).value=str_visa_cd;
	FORM1.elements(nm).value=str_visa_nm;
	return true;			
			
		}
	}

}
//-----------------------------------------------------------------
// 选择证照(PAX)
//-----------------------------------------------------------------
function SELVISA_PAX_onclick_inside(cd, nm, subcd_visa) {
	var myvisa
	var str_visa_cd=''
	var str_visa_nm=''

	myvisa = showModalDialog("/include/sel_visa_n.asp?aa="+FORM1.elements(cd).value+"&chice="+subcd_visa,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myvisa) {		
		ary_visa = myvisa.split('/');

		for(var i=0;i<ary_visa.length;i++) {

			var ary_visa2 = ary_visa[i].split('，');
			
			for(var j=0;j<ary_visa2.length-1;j++) {
				
				if (j==0) {	
					if (str_visa_cd=='')	{
						str_visa_cd = ary_visa2[j];
					} else {
						str_visa_cd = str_visa_cd+'/'+ary_visa2[j];
					}
				} else {
					if (str_visa_nm=='')	{
						str_visa_nm = ary_visa2[j];
					} else {
						str_visa_nm = str_visa_nm+'/'+ary_visa2[j];
					}
				}
			}
		}
	}
	FORM1.elements(cd).value=str_visa_cd;
	FORM1.elements(nm).value=str_visa_nm;
	return true;	
}
//选择公司(PACKAGE)
function SELCOMP_P_onclick(cd, nm, subcd_comp,stop_next) {
	var mycomp
	var str_comp_cd=''
	var str_comp_nm=''

	mycomp = showModalDialog("/include/sel_dsys_n.asp?chice="+subcd_comp,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mycomp) {
		ary_comp = mycomp.split('/');

		for(var i=0;i<ary_comp.length;i++) {

			var ary_comp2 = ary_comp[i].split('，');
			
			for(var j=0;j<ary_comp2.length-1;j++) {
				
				if (j==0) {	
					if (str_comp_cd=='')	{
						str_comp_cd = ary_comp2[j];
					} else {
						str_comp_cd = str_comp_cd+'/'+ary_comp2[j];
					}
				} else {
					if (str_comp_nm=='')	{
						str_comp_nm = ary_comp2[j];
					} else {
						str_comp_nm = str_comp_nm+'/'+ary_comp2[j];
					}
				}
			}
		}
		FORM1.SEL_COMP_CD.value = str_comp_cd;
		FORM1.SEL_COMP_FNM.value = str_comp_nm;
		if (stop_next!="C") {
			SELDEPT_P_onclick(cd,nm,subcd_comp,stop_next);
		}
		return true;
	}
}
//选择部门(PACKAGE)
function SELDEPT_P_onclick(cd, nm, subcd_dept,stop_next) {
	var mydept
	var str_dept_cd=''
	var str_dept_nm=''

	if (FORM1.SEL_COMP_CD.value != ""){
	mydept = showModalDialog("/include/sel_dept_n.asp?comp_cd="+FORM1.SEL_COMP_CD.value+"&old_deptcd="+FORM1.elements(cd).value+"&chice="+subcd_dept,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mydept) {
		ary_dept = mydept.split('/');

		for(var i=0;i<ary_dept.length;i++) {

			var ary_dept2 = ary_dept[i].split('，');
			
			for(var j=0;j<ary_dept2.length-1;j++) {
				
				if (j==0) {	
					if (str_dept_cd=='')	{
						str_dept_cd = ary_dept2[j];
					} else {
						str_dept_cd = str_dept_cd+'/'+ary_dept2[j];
					}
				} else {
					if (str_dept_nm=='')	{
						str_dept_nm = ary_dept2[j];
					} else {
						str_dept_nm = str_dept_nm+'/'+ary_dept2[j];
					}
				}
			}
		}
		FORM1.elements(cd).value = str_dept_cd;
		FORM1.elements(nm).value = str_dept_nm;
		if (stop_next!="D") {
			SELEMP_onclick(subcd_dept,stop_next);
		}
		return true;
	}
	}
	else {
		window.alert("请先选择公司!");
		SELCOMP_P_onclick(cd,nm,subcd_dept,stop_next);
	}
}
//选择公司(DEPT)
function SELCOMP_D_onclick(cd, nm, subcd_comp,stop_next) {
	var mycomp
	var str_comp_cd=''
	var str_comp_nm=''

	mycomp = showModalDialog("/include/sel_dsys_n.asp?chice="+subcd_comp,"","dialogWidth=300pt;dialogHeight=302pt");   //     2008-05-13      : [ mary ]调整 dialogHeight=300pt改为dialogHeight=302pt
	if (mycomp) {
		ary_comp = mycomp.split('/');

		for(var i=0;i<ary_comp.length;i++) {

			var ary_comp2 = ary_comp[i].split('，');
			
			for(var j=0;j<ary_comp2.length-1;j++) {
				
				if (j==0) {	
					if (str_comp_cd=='')	{
						str_comp_cd = ary_comp2[j];
					} else {
						str_comp_cd = str_comp_cd+'/'+ary_comp2[j];
					}
				} else {
					if (str_comp_nm=='')	{
						str_comp_nm = ary_comp2[j];
					} else {
						str_comp_nm = str_comp_nm+'/'+ary_comp2[j];
					}
				}
			}
		}
		if (str_comp_cd != 'Y') {
			FORM1.SEL_COMP_D_CD.value = str_comp_cd;
		}
		else
		{
			FORM1.SEL_COMP_D_CD.value = "";
			FORM1.SEL_CHECK_COMP_D_CD.value = str_comp_cd;
		}
		FORM1.SEL_COMP_D_FNM.value = str_comp_nm;
		if (stop_next!="C") {
			SELDEPT_D_onclick(cd,nm,subcd_comp,stop_next);
		}
		return true;
	}
}
//选择部门(DEPT)
function SELDEPT_D_onclick(cd, nm, subcd_dept,stop_next) {
	var mydept
	var str_dept_cd=''
	var str_dept_nm=''

	mydept = showModalDialog("/include/sel_dept_n.asp?comp_cd="+FORM1.SEL_COMP_D_CD.value+"&old_deptcd="+FORM1.elements(cd).value+"&chice="+subcd_dept,"","dialogWidth=300pt;dialogHeight=300pt"); 
	if (mydept) {
		ary_dept = mydept.split('/');

		for(var i=0;i<ary_dept.length;i++) {

			var ary_dept2 = ary_dept[i].split('，');
			
			for(var j=0;j<ary_dept2.length-1;j++) {
				
				if (j==0) {	
					if (str_dept_cd=='')	{
						str_dept_cd = ary_dept2[j];
					} else {
						str_dept_cd = str_dept_cd+'/'+ary_dept2[j];
					}
				} else {
					if (str_dept_nm=='')	{
						str_dept_nm = ary_dept2[j];
					} else {
						str_dept_nm = str_dept_nm+'/'+ary_dept2[j];
					}
				}
			}
		}
		FORM1.elements(cd).value = str_dept_cd;
		FORM1.elements(nm).value = str_dept_nm;
		if (stop_next!="D") {
			SELEMP_onclick(subcd_dept,stop_next);
		}
		return true;
	}
}
//选择(国外)地区
function SELAREA_onclick(subcd_area,stop_next) {
	var myarea
	var str_area_cd=''
	var str_area_nm=''
	
	//2006-06-28 [Afon]国家辅助查询改为公用视窗方式处理
	//2006-08-16 [Afon]subcd_area , stop_next 无任何值时，执行 洲别 辅助查询
	if(stop_next=="A" || (!subcd_area && !stop_next) ){
		myarea = showModalDialog("/include/sel_area.asp?aa="+FORM1.ITN_AREA.value+"&chice="+subcd_area,"","dialogWidth=210pt;dialogHeight=300pt");
		if (myarea) {
			ary_area = myarea.split('/');

			for(var i=0;i<ary_area.length;i++) {

				var ary_area2 = ary_area[i].split('，');
				
				for(var j=0;j<ary_area2.length-1;j++) {
					
					if (j==0) {	
						if (str_area_cd=='')	{
							str_area_cd = ary_area2[j];
						} else {
							str_area_cd = str_area_cd+'/'+ary_area2[j];
						}
					} else {
						if (str_area_nm=='')	{
							str_area_nm = ary_area2[j];
						} else {
							str_area_nm = str_area_nm+'/'+ary_area2[j];
						}
					}
				}
			}

			FORM1.ITN_AREA_NM.value = str_area_nm;
			FORM1.ITN_AREA.value = str_area_cd;
			if (stop_next!="A") {
				SELNATN_onclick(subcd_area,stop_next);
			}
			return true;
		}
	}else{
		SELNATN_onclick(subcd_area,stop_next);
	}
}

//选择(国外)国家 
//2004-11-04	Ham	调整参数判断
function SELNATN_onclick(subcd_natn,stop_next,name) {

	var str_natn_cd=''
	var str_natn_nm=''
	var mynatn
	/*=== 2004-11-08 ===
	if (FORM1.ITN_AREA.value == "") {
		SELAREA_onclick(subcd_natn,stop_next);
	}
	==================*/
	//	2004-11-08 Ham
	
	//2006-06-28 [Afon]国家辅助查询SELNATN_onclick()改为公用视窗方式处理
	var Action = "/include/sel_help_natn.asp";
	var Title  = "国家";
	var RTN_FLD = "TRNATN.NATN_CD, (CASE ISNULL(TRNATN.NATN_CNM, '') WHEN '' THEN ISNULL(TRNATN.NATN_ENM, '') ELSE TRNATN.NATN_CNM END) AS NATN_NM , TRAREA.AREA_CD, (CASE ISNULL(TRAREA.AREA_CNM, '') WHEN '' THEN ISNULL(TRAREA.AREA_ENM, '') ELSE TRAREA.AREA_CNM END) AS AREA_NM ";
	var SEL_FLD = "TRNATN.NATN_CD AS '国家代码', (CASE ISNULL(TRAREA.AREA_CNM, '') WHEN '' THEN ISNULL(TRAREA.AREA_ENM, '') ELSE TRAREA.AREA_CNM END) AS '洲别名称' , (CASE ISNULL(TRNATN.NATN_CNM, '') WHEN '' THEN ISNULL(TRNATN.NATN_ENM, '') ELSE TRNATN.NATN_CNM END) AS '国家名称'";
	var SEL_FRM = "TRNATN LEFT JOIN TRAREA ON TRNATN.AREA_CD = TRAREA.AREA_CD";
	var SEL_WHR = "";
	var SEL_ORD = "";
	var Multi	= "";
	//2006-07-25 [Afon]排除 SELNATN_onclick() 出错 sql条件值需要单引号
	if(FORM1.ITN_AREA.value != "") {	
		if(subcd_natn=='H'){
			SEL_WHR = " TRAREA.AREA_CD='" + FORM1.ITN_AREA.value + "'"; 
		}else{
	//2006-08-16 [Afon]排除 复选时找不到资料
			SEL_WHR = " TRAREA.AREA_CD in ('" + Replace(FORM1.ITN_AREA.value, '/',"','") + "')"; 
		}
	}
	if(name == 'REF_NATN'){	Title = "参照国";	}
	
	//2006-08-16 [Afon]复选
	if(subcd_natn !='H'){ Multi="Y";	}
	
	var sURL = "/include/sel_help_pop.asp?Action=" + Action + "&Multi=" + Multi + "&Title=" + Title + "&RTN_FLD=" + RTN_FLD + "&SEL_FLD=" + SEL_FLD + "&SEL_FRM=" + SEL_FRM + "&SEL_WHR=" + SEL_WHR + "&SEL_ORD=" + SEL_ORD + "&AREA_CD=" +  FORM1.ITN_AREA.value + "&AREA_NM=" +  FORM1.ITN_AREA_NM.value;

	var VAL = showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=490px");
	
	if(VAL){
		if(name=='REF_NATN'){
			if(FORM1.REF_NATN_CD){	FORM1.REF_NATN_CD.value	= VAL[0][0];	}
			if(FORM1.REF_NATN_NM){	FORM1.REF_NATN_NM.value = VAL[0][1];	}
			
			if (FORM1.ITN_NATN.value =='')
			{
				FORM1.REF_NATN_NM.value = "";
				FORM1.REF_NATN_CD.value = "";
				alert("请先选择国家!!")
			}
			else
			{
				if (FORM1.REF_NATN_CD.value == FORM1.ITN_NATN.value)
				{
					FORM1.REF_NATN_NM.value = "";
					FORM1.REF_NATN_CD.value = "";
					alert("参照国不可以与国家一样!!\n请重新选择参照国!!")
				}
			}
		}else{
			if(subcd_natn=='H'){
				if(FORM1.ITN_NATN){		FORM1.ITN_NATN.value	= VAL[0][0];	}
				if(FORM1.ITN_NATN_NM){	FORM1.ITN_NATN_NM.value = VAL[0][1];	}
				if(FORM1.ITN_AREA){		FORM1.ITN_AREA.value	= VAL[0][2];	}
				if(FORM1.ITN_AREA_NM){	FORM1.ITN_AREA_NM.value = VAL[0][3];	}
			}else{
			// 2006-08-25 [Afon]调整 SELNATN_onclick() 复选时不清除原本资料
			//	if(FORM1.ITN_NATN){		FORM1.ITN_NATN.value	="";	}
			//	if(FORM1.ITN_NATN_NM){	FORM1.ITN_NATN_NM.value	="";	}
				for(i=0 ; i < VAL.length ; i++){
					if(FORM1.ITN_NATN){		
						if(FORM1.ITN_NATN.value==''){
							FORM1.ITN_NATN.value = VAL[i][0];	
						}else{
							FORM1.ITN_NATN.value += '/' + VAL[i][0];	
						}
					}	
					if(FORM1.ITN_NATN_NM){		
						if(FORM1.ITN_NATN_NM.value==''){
							FORM1.ITN_NATN_NM.value = VAL[i][1];	
						}else{
							FORM1.ITN_NATN_NM.value += '/' + VAL[i][1];	
						}
					}
					//2006-08-17 [Afon] 排除复选时，洲别资料只回传一笔资料
					//2006-08-25 [Afon] 若洲别资料已经存在，则不回传洲别资料
					if(SEL_WHR == ''){
						if(FORM1.ITN_AREA){		
							if(FORM1.ITN_AREA.value==''){
								FORM1.ITN_AREA.value = VAL[i][2];	
							}else{
								FORM1.ITN_AREA.value += '/' + VAL[i][2];	
							}
						}
						if(FORM1.ITN_AREA_NM){		
							if(FORM1.ITN_AREA_NM.value==''){
								FORM1.ITN_AREA_NM.value = VAL[i][3];	
							}else{
								FORM1.ITN_AREA_NM.value += '/' + VAL[i][3];	
							}
						}
					}
				}
			}	
		}
	}
/*---------------------------------------------------------------------------------------------------------------------------
	if (FORM1.ITN_AREA.value != "") {
	//
		mynatn = showModalDialog("/include/sel_natn.asp?aa="+FORM1.ITN_AREA.value+"&bb="+FORM1.ITN_NATN.value+"&chice="+subcd_natn,"","dialogWidth=350pt;dialogHeight=300pt");
		if (mynatn){
			ary_natn = mynatn.split('/');

			for(var i=0;i<ary_natn.length;i++) {

				var ary_natn2 = ary_natn[i].split('，');
				
				for(var j=0;j<ary_natn2.length-1;j++) {
					
					if (j==0) {	
						if (str_natn_cd=='')	{
							str_natn_cd = ary_natn2[j];
						} else {
							str_natn_cd = str_natn_cd+'/'+ary_natn2[j];
						}
					} else {
						if (str_natn_nm=='')	{
							str_natn_nm = ary_natn2[j];
						} else {
							str_natn_nm = str_natn_nm+'/'+ary_natn2[j];
						}
					}
				}
			}
			//---------------判别是否为参照国
			if (name == 'REF_NATN')
			{
				FORM1.REF_NATN_NM.value = str_natn_nm;
				FORM1.REF_NATN_CD.value = str_natn_cd;
				if (FORM1.ITN_NATN.value =='')
				{
					FORM1.REF_NATN_NM.value = "";
					FORM1.REF_NATN_CD.value = "";
					alert("请先选择国家!!")
				}
				else
				{
					if (FORM1.REF_NATN_CD.value == FORM1.ITN_NATN.value)
					{
						FORM1.REF_NATN_NM.value = "";
						FORM1.REF_NATN_CD.value = "";
						alert("参照国不可以与国家一样!!\n请重新选择参照国!!")
					}
				}
		
			}else
			{
				FORM1.ITN_NATN_NM.value = str_natn_nm;
				FORM1.ITN_NATN.value = str_natn_cd;
			}
			//-----------------------by Afon 2005-11-24
			if (stop_next!="N") {
				SELCITY_onclick(subcd_natn);
			}
			return true;
		}
	//	2004-11-08 Ham
	}
	else {
		SELAREA_onclick(subcd_natn,stop_next);
	}
---------------------------------------------------------------------------------------------------------------------------*/
}

//选择(国外)城市
function SELCITY_onclick(subcd_city) {
	var str_city_cd=''
	var str_city_nm=''
	var mycity
	/*=== 2004-11-08 Ham ===
	if (FORM1.ITN_NATN.value == "") {
		SELNATN_onclick();
	}
	======================*/
	//	2004-11-08 Ham
//	alert(FORM1.ITN_NATN.value);--------Mark by Afon 2005-12-08
	if (FORM1.ITN_NATN.value != ""){
	//
		mycity = showModalDialog("/include/sel_city.asp?aa="+FORM1.ITN_NATN.value+"&bb="+FORM1.ITN_CITY.value+"&chice="+subcd_city,"","dialogWidth=400pt;dialogHeight=300pt");
		if (mycity) {
			ary_city = mycity.split('/');

			for(var i=0;i<ary_city.length;i++) {

				var ary_city2 = ary_city[i].split('，');
				
				for(var j=0;j<ary_city2.length-1;j++) {
					
					if (j==0) {	
						if (str_city_cd=='')	{
							str_city_cd = ary_city2[j];
						} else {
							str_city_cd = str_city_cd+'/'+ary_city2[j];
						}
					} else {
						if (str_city_nm=='')	{
							str_city_nm = ary_city2[j];
						} else {
							str_city_nm = str_city_nm+'/'+ary_city2[j];
						}
					}
				}
			}

			FORM1.ITN_CITY_NM.value = str_city_nm;
			FORM1.ITN_CITY.value = str_city_cd;
			return true;
		}
	//
	}
	else {
		/*=== 2005-06-20 Ham 郭 修正参数值未带入===*/
		SELNATN_onclick(subcd_city, "");
	}
	//
}

//选择(国内)地区
function SELDEP_onclick(subcd_dep,stop_next) {
	var mydep
	var str_dep_cd=''
	var str_dep_nm=''

	mydep = showModalDialog("../include/sel_dep.asp?aa="+FORM1.ITN_DEP.value+"&chice="+subcd_dep,"","dialogWidth=300pt;dialogHeight=220pt");
	if (mydep) {
		ary_dep = mydep.split('/');

		for(var i=0;i<ary_dep.length;i++) {

			var ary_dep2 = ary_dep[i].split('，');
			
			for(var j=0;j<ary_dep2.length-1;j++) {
				
				if (j==0) {	
					if (str_dep_cd=='')	{
						str_dep_cd = ary_dep2[j];
					} else {
						str_dep_cd = str_dep_cd+'/'+ary_dep2[j];
					}
				} else {
					if (str_dep_nm=='')	{
						str_dep_nm = ary_dep2[j];
					} else {
						str_dep_nm = str_dep_nm+'/'+ary_dep2[j];
					}
				}
			}
		}
		FORM1.ITN_DEP_NM.value = str_dep_nm;
		FORM1.ITN_DEP.value = str_dep_cd;
		if (stop_next!="D") {
			SELDEP_CITY_onclick(subcd_dep);
		}
		return true;
	}
}

//选择(国内)国家
function SELDEP_CITY_onclick(subcd_dep_city) {
	var mydep_city
	var str_dep_city_cd=''
	var str_dep_city_nm=''

	if (FORM1.ITN_DEP.value != ""){
	mydep_city = showModalDialog("../include/sel_dep_city.asp?depcd="+FORM1.ITN_DEP.value+"&aa="+FORM1.ITN_CITY2.value+"&chice="+subcd_dep_city,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mydep_city) {
		ary_dep_city = mydep_city.split('/');

		for(var i=0;i<ary_dep_city.length;i++) {

			var ary_dep_city2 = ary_dep_city[i].split('，');
			
			for(var j=0;j<ary_dep_city2.length-1;j++) {
				
				if (j==0) {	
					if (str_dep_city_cd=='')	{
						str_dep_city_cd = ary_dep_city2[j];
					} else {
						str_dep_city_cd = str_dep_city_cd+'/'+ary_dep_city2[j];
					}
				} else {
					if (str_dep_city_nm=='')	{
						str_dep_city_nm = ary_dep_city2[j];
					} else {
						str_dep_city_nm = str_dep_city_nm+'/'+ary_dep_city2[j];
					}
				}
			}
		}

		FORM1.ITN_CITY2_NM.value = str_dep_city_nm;
		FORM1.ITN_CITY2.value = str_dep_city_cd;
		return true;
	 }
	}
	else {
		SELDEP_onclick();
	}
}

//选择公司
function SELCOMP_onclick(subcd_comp,stop_next) {
	var mycomp
	var str_comp_cd=''
	var str_comp_nm=''

	mycomp = showModalDialog("/include/sel_dsys_n.asp?chice="+subcd_comp,"","dialogWidth=300pt;dialogHeight=302pt");  //     2008-05-13      : [ mary ]调整 dialogHeight=300pt改为dialogHeight=302pt
	if (mycomp) {
		ary_comp = mycomp.split('/');

		for(var i=0;i<ary_comp.length;i++) {

			var ary_comp2 = ary_comp[i].split('，');
			
			for(var j=0;j<ary_comp2.length-1;j++) {
				
				if (j==0) {	
					if (str_comp_cd=='')	{
						str_comp_cd = ary_comp2[j];
					} else {
						str_comp_cd = str_comp_cd+'/'+ary_comp2[j];
					}
				} else {
					if (str_comp_nm=='')	{
						str_comp_nm = ary_comp2[j];
					} else {
						str_comp_nm = str_comp_nm+'/'+ary_comp2[j];
					}
				}
			}
		}
		if (str_comp_cd != 'Y') {
			FORM1.SEL_COMP_CD.value = str_comp_cd;
		}
		else
		{
			FORM1.SEL_COMP_CD.value = "";
			FORM1.SEL_CHECK_COMP_CD.value = str_comp_cd;
		}
		FORM1.SEL_COMP_FNM.value = str_comp_nm;
		if (stop_next!="C") {
			SELDEPT_onclick(subcd_comp,stop_next);
		}
		return true;
	}
}
//选择部门
function SELDEPT_onclick(subcd_dept,stop_next) {
	var mydept
	var str_dept_cd=''
	var str_dept_nm=''
	if (FORM1.SEL_CHECK_COMP_CD.value != "" || FORM1.SEL_COMP_CD.value != ""){
	mydept = showModalDialog("/include/sel_dept_n.asp?comp_cd="+FORM1.SEL_COMP_CD.value+"&old_deptcd="+FORM1.SEL_DEPT_CD.value+"&chice="+subcd_dept,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mydept) {
		ary_dept = mydept.split('/');

		for(var i=0;i<ary_dept.length;i++) {

			var ary_dept2 = ary_dept[i].split('，');
			
			for(var j=0;j<ary_dept2.length-1;j++) {
				
				if (j==0) {	
					if (str_dept_cd=='')	{
						str_dept_cd = ary_dept2[j];
					} else {
						str_dept_cd = str_dept_cd+'/'+ary_dept2[j];
					}
				} else {
					if (str_dept_nm=='')	{
						str_dept_nm = ary_dept2[j];
					} else {
						str_dept_nm = str_dept_nm+'/'+ary_dept2[j];
					}
				}
			}
		}
		FORM1.SEL_DEPT_CD.value = str_dept_cd;
		FORM1.SEL_DEPT_NM.value = str_dept_nm;
		if (stop_next!="D") {
			SELEMP_onclick(subcd_dept,stop_next);
		}
		return true;
	}
	}
	else {
		window.alert("请先选择公司!");
		SELCOMP_onclick(subcd_dept,stop_next);
	}
}
//选择员工
function SELEMP_onclick(subcd_emp,stop_next) {
	var myemp
	var str_emp_cd=''
	var str_emp_nm=''
	var str_id_no=''
	var str_sex_cd=''
	var str_brth_dt_y=''
	var str_brth_dt_m=''
	var str_brth_dt_d=''

	if (FORM1.SEL_DEPT_CD.value != ""){
	myemp = showModalDialog("/include/sel_emp_n.asp?comp_cd="+FORM1.SEL_COMP_CD.value+"&dept_cd="+FORM1.SEL_DEPT_CD.value+"&usr_id="+FORM1.SEL_EMP_CD.value+"&chice="+subcd_emp,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myemp) {
		ary_emp = myemp.split('/');

		for(var i=0;i<ary_emp.length;i++) {

			var ary_emp2 = ary_emp[i].split('，');
			
			for(var j=0;j<ary_emp2.length-1;j++) {
				
				if (j==0) {
					if (str_emp_cd=='')	{
						str_emp_cd = ary_emp2[j];
					} else {
						str_emp_cd = str_emp_cd+'/'+ary_emp2[j];
					}
				} 
				if (j==1) {
					if (str_emp_nm=='')	{
						str_emp_nm = ary_emp2[j];
					} else {
						str_emp_nm = str_emp_nm+'/'+ary_emp2[j];
					}
				}
				if (j==2) {
					if (str_id_no=='')	{
						str_id_no = ary_emp2[j];
					} else {
						str_id_no = str_id_no+'/'+ary_emp2[j];
					}
				}
				if (j==3) {
					if (str_sex_cd=='')	{
						str_sex_cd = ary_emp2[j];
					} else {
						str_sex_cd = str_sex_cd+'/'+ary_emp2[j];
					}
				}
				if (j==4) {
					if (str_brth_dt_y=='')	{
						str_brth_dt_y = ary_emp2[j];
					} else {
						str_brth_dt_y = str_brth_dt_y+'/'+ary_emp2[j];
					}
				}
				if (j==5) {
					if (str_brth_dt_m=='')	{
						str_brth_dt_m = ary_emp2[j];
					} else {
						str_brth_dt_m = str_brth_dt_m+'/'+ary_emp2[j];
					}
				}
				if (j==6) {
					if (str_brth_dt_d=='')	{
						str_brth_dt_d = ary_emp2[j];
					} else {
						str_brth_dt_d = str_brth_dt_d+'/'+ary_emp2[j];
					}
				}
			}
		}
		FORM1.SEL_EMP_CD.value = str_emp_cd;
		FORM1.SEL_EMP_NM.value = str_emp_nm;
		FORM1.ID_NO.value = str_id_no;
		if (str_sex_cd=="F"){
			FORM1.TLDR_SEX(0).checked = true;
		}
		if (str_sex_cd=="M"){
			FORM1.TLDR_SEX(1).checked = true;
		}
		FORM1.BRTH_DT_Y.value = str_brth_dt_y;
		FORM1.BRTH_DT_M.value = str_brth_dt_m;
		FORM1.BRTH_DT_D.value = str_brth_dt_d;
		return true;
	}
	}
	else {
		window.alert("请先选择部门!");
		SELDEPT_onclick(subcd_emp,stop_next);
	}
}

//选择币别
function SELCURR_onclick(subcd_emp) {
	var mycurr
	var str_curr_cd=''
	var str_curr_nm=''
	
	sel_curr("CURR_CD", "CURR_NM", "");
	return true;
	
	mycurr = showModalDialog("/include/sel_curr.asp?aa="+FORM1.CURR_CD.value+"&chice="+subcd_emp,"","dialogWidth=260pt;dialogHeight=300pt");
	if (mycurr) {
		ary_curr = mycurr.split('/');

		for(var i=0;i<ary_curr.length;i++) {

			var ary_curr2 = ary_curr[i].split('，');
			
			for(var j=0;j<ary_curr2.length-1;j++) {
				
				if (j==0) {	
					if (str_curr_cd=='')	{
						str_curr_cd = ary_curr2[j];
					} else {
						str_curr_cd = str_curr_cd+'/'+ary_curr2[j];
					}
				} else {
					if (str_curr_nm=='')	{
						str_curr_nm = ary_curr2[j];
					} else {
						str_curr_nm = str_curr_nm+'/'+ary_curr2[j];
					}
				}
			}
		}
		FORM1.CURR_CD.value = str_curr_cd;
		FORM1.CURR_NM.value = str_curr_nm;
		return true;
	}
}

//选择航空公司
function SELCARR_onclick(cd, nm ,subcd_carr) {
	var mycarr
	var str_carr_cd=''
	var str_carr_nm=''

	mycarr = showModalDialog("/include/sel_carr.asp?aa="+FORM1.elements(cd).value+"&chice="+subcd_carr,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mycarr) {
		ary_carr = mycarr.split('/');

		for(var i=0;i<ary_carr.length;i++) {

			var ary_carr2 = ary_carr[i].split('，');
			
			for(var j=0;j<ary_carr2.length-1;j++) {
				
				if (j==0) {	
					if (str_carr_cd=='')	{
						str_carr_cd = ary_carr2[j];
					} else {
						str_carr_cd = str_carr_cd+'/'+ary_carr2[j];
					}
				} else {
					if (str_carr_nm=='')	{
						str_carr_nm = ary_carr2[j];
					} else {
						str_carr_nm = str_carr_nm+'/'+ary_carr2[j];
					}
				}
			}
		}
		FORM1.elements(cd).value=str_carr_cd;
		FORM1.elements(nm).value=str_carr_nm;
		return true;
	}
}


function sel_carr_search(carrcdForm, carrnmForm)
{	var getResult = sel_search();	
		
	if(getResult)
	{	rsArray = getResult.split('，');
		carrCD = rsArray[1];
		carrNM = rsArray[2];
	
		var getcarrCD = showModalDialog("/include/sel_carr_search.asp?dflt=1&carr_cd=" + carrCD + "&carr_nm=" + carrNM, "", "dialogWidth=300pt;dialogHeight=" + pblDialogHeight + "pt");
		if(getcarrCD)
		{
			carrcdForm.value = getcarrCD[0];
			carrnmForm.value = getcarrCD[1];
		}	
	}	
}

//选择机场
function SELAIRTEL_onclick(subcd_emp) {
	var myairtel
	var str_airtel_cd=''
	var str_airtel_cnm=''
	var str_airtel_enm=''

	if (FORM1.ITN_AREA.value==""){
		window.alert("请先选择洲别!");
		SELAREA_onclick('H');
	}
	if (FORM1.ITN_NATN.value==""){
		window.alert("请先选择国家!");
		SELAREA_onclick('H');
	}
	if (FORM1.ITN_CITY.value==""){
		window.alert("请先选择城市!");
		SELCITY_onclick('H');
	}
	myairtel = showModalDialog("/include/sel_airp.asp?aa="+FORM1.AIRP_CD.value+"&bb="+FORM1.ITN_CITY.value+"&chice="+subcd_emp,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myairtel) {
		ary_airtel = myairtel.split('/');
		for(var i=0;i<ary_airtel.length;i++) {

			var ary_airtel2 = ary_airtel[i].split('，');
			
			for(var j=0;j<ary_airtel2.length-1;j++) {
				
				if (j==0) {	
					if (str_airtel_cd=='')	{
						str_airtel_cd = ary_airtel2[j];
					} else {
						str_airtel_cd = str_airtel_cd+'/'+ary_airtel2[j];
					}
				}
				if (j==1) {
					if (str_airtel_cnm=='')	{
						str_airtel_cnm = ary_airtel2[j];
					} else {
						str_airtel_cnm = str_airtel_cnm+'/'+ary_airtel2[j];
					}
				}
				if (j==2) {
					if (str_airtel_enm=='')	{
						str_airtel_enm = ary_airtel2[j];
					} else {
						str_airtel_enm = str_airtel_enm+'/'+ary_airtel2[j];
					}
				}
			}
		}
		FORM1.AIRP_CD.value = str_airtel_cd;
		FORM1.AIRP_CNM.value = str_airtel_cnm;
		FORM1.AIRP_ENM.value = str_airtel_enm;
		return true;
	}
}
//选择办件单位
function SELAPUN_onclick(subcd_apun) {
	var myapunn
	var str_apunn_cd=''
	var str_apunn_nm=''
	myapunn = showModalDialog("/include/sel_apun_type.asp","","dialogWidth=300pt;dialogHeight=300pt");
	if (myapunn) {
		ary_apunn = myapunn.split('/');

		for(var i=0;i<ary_apunn.length;i++) {

			var ary_apunn2 = ary_apunn[i].split('，');
			
			for(var j=0;j<ary_apunn2.length-1;j++) {
				
				if (j==0) {	
					if (str_apunn_cd=='')	{
						str_apunn_cd = ary_apunn2[j];
					} else {
						str_apunn_cd = str_apunn_cd+'/'+ary_apunn2[j];
					}
				} else {
					if (str_apunn_nm=='')	{
						str_apunn_nm = ary_apunn2[j];
					} else {
						str_apunn_nm = str_apunn_nm+'/'+ary_apunn2[j];
					}
				}
			}
		}
		FORM1.APUN_TYPE.value = str_apunn_cd;
	}
	
	var searchVal = sel_search();
	
	var sel_apun_cd = "", sel_apun_nm = "";
	
	if(searchVal)
	{	valueArray = searchVal.split("，");
		sel_apun_cd = valueArray[1];
		sel_apun_nm = valueArray[2];
	}

	if (myapunn) {
	var myapun
	var str_apun_cd=''
	var str_apun_nm=''
	myapun = showModalDialog("/include/sel_apun.asp?aa="+sel_apun_cd+"&bb="+FORM1.APUN_TYPE.value+"&cc="+sel_apun_nm+"&chice="+subcd_apun,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myapun) 
	{	
		FORM1.APUN_CD.value = myapun[0][0];
		FORM1.APUN_NM.value = myapun[0][1];
		return true;
	}
	}
}

//选择(国外)国家 -- 联络资料
function SELNATN_CNTA_onclick(subcd_natn,stop_next) {
	var str_natn_cd=''
	var str_natn_nm=''
	var mynatn

	if (FORM1.ITN_AREA.value != "") {
		mynatn = showModalDialog("/include/sel_cnta_natn.asp?aa="+FORM1.ITN_AREA.value+"&bb="+FORM1.ITN_NATN.value+"&chice="+subcd_natn,"","dialogWidth=350pt;dialogHeight=300pt");
		alert(mynatn);
		if (mynatn){
			ary_natn = mynatn.split('/');

			for(var i=0;i<ary_natn.length;i++) {

				var ary_natn2 = ary_natn[i].split('，');
				
				for(var j=0;j<ary_natn2.length-1;j++) {
					
					if (j==0) {	
						if (str_natn_cd=='')	{
							str_natn_cd = ary_natn2[j];
						} else {
							str_natn_cd = str_natn_cd+'/'+ary_natn2[j];
						}
					} else {
						if (str_natn_nm=='')	{
							str_natn_nm = ary_natn2[j];
						} else {
							str_natn_nm = str_natn_nm+'/'+ary_natn2[j];
						}
					}
				}
			}

			FORM1.ITN_NATN_NM.value = str_natn_nm;
			FORM1.ITN_NATN.value = str_natn_cd;
			if (stop_next!="N") {
				SELCITY_onclick(subcd_natn);
			}
			return true;
		}
	}
	else {
		window.alert("请先选择洲别!");
		SELAREA_onclick(subcd_natn,stop_next);
	}
}

//选择职称
//2008-08-28 [Ham] 增加带入参数--栏位名称
//function SELCTC_PO_onclick(subcd_emp) {
function SELCTC_PO_onclick(subcd_emp, frmitem_cd, frmitem_nm) {
	var mypo
	var str_po_cd=''
	var str_po_nm=''

	//2008-08-28 [Ham] 若有带入栏位名称, 则依带入的栏位值进入辅助查询
	if (frmitem_cd) {
		mypo = showModalDialog("/include/sel_ctc_po.asp?aa="+frmitem_cd.value+"&chice="+subcd_emp,"","dialogWidth=300pt;dialogHeight=300pt");
	}
	else {
		mypo = showModalDialog("/include/sel_ctc_po.asp?aa="+FORM1.CTC_PO.value+"&chice="+subcd_emp,"","dialogWidth=300pt;dialogHeight=300pt");
	}
	if (mypo) {
		ary_po = mypo.split('/');

		for(var i=0;i<ary_po.length;i++) {

			var ary_po2 = ary_po[i].split('，');
			
			for(var j=0;j<ary_po2.length-1;j++) {
				
				if (j==0) {	
					if (str_po_cd=='')	{
						str_po_cd = ary_po2[j];
					} else {
						str_po_cd = str_po_cd+'/'+ary_po2[j];
					}
				} else {
					if (str_po_nm=='')	{
						str_po_nm = ary_po2[j];
					} else {
						str_po_nm = str_po_nm+'/'+ary_po2[j];
					}
				}
			}
		}
		//2008-08-28 [Ham] 若有带入栏位名称, 则依栏位名称回传选择的值
		if (frmitem_cd) {
			frmitem_cd.value = str_po_cd;
		}
		else {
			FORM1.CTC_PO.value = str_po_cd;
		}
		if (frmitem_nm) {
			frmitem_nm.value = str_po_nm;
		}
		else {
			FORM1.CTC_PO_ENM.value = str_po_nm;
		}
		return true;
	}
}
//选择会员卡
function SELMEMBER_onclick(subcd_member) {
	var mymember
	var str_member_cd=''
	var str_member_nm=''

	mymember = showModalDialog("/include/sel_member.asp?aa="+FORM1.MEMBER_NM.value+"&chice="+subcd_member,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mymember) {
		ary_member = mymember.split('/');

		for(var i=0;i<ary_member.length;i++) {

			var ary_member2 = ary_member[i].split('，');
			
			for(var j=0;j<ary_member2.length-1;j++) {
				
				if (j==0) {	
					if (str_member_cd=='')	{
						str_member_cd = ary_member2[j];
					} else {
						str_member_cd = str_member_cd+'/'+ary_member2[j];
					}
				} else {
					if (str_member_nm=='')	{
						str_member_nm = ary_member2[j];
					} else {
						str_member_nm = str_member_nm+'/'+ary_member2[j];
					}
				}
			}
		}
		FORM1.MEMBER_NM.value = str_member_nm; //取回会员卡名称
		FORM1.MEMBER_CD.value = str_member_cd; //取回会员卡代码 2005-11-10 by Afon
		return true;
	}
}
//选择总代理
function SELACCT_onclick(subcd_apun) {
	var myacctn
	var str_acctn_cd=''
	var str_acctn_nm=''
	myacctn = showModalDialog("/include/sel_acct_type.asp","","dialogWidth=300pt;dialogHeight=300pt");
	if (myacctn) {
		ary_acctn = myacctn.split('/');

		for(var i=0;i<ary_acctn.length;i++) {

			var ary_acctn2 = ary_acctn[i].split('，');
			
			for(var j=0;j<ary_acctn2.length-1;j++) {
				
				if (j==0) {	
					if (str_acctn_cd=='')	{
						str_acctn_cd = ary_acctn2[j];
					} else {
						str_acctn_cd = str_acctn_cd+'/'+ary_acctn2[j];
					}
				} else {
					if (str_acctn_nm=='')	{
						str_acctn_nm = ary_acctn2[j];
					} else {
						str_acctn_nm = str_acctn_nm+'/'+ary_acctn2[j];
					}
				}
			}
		}
	//	FORM1.ACCT_TYPE.value = str_acctn_cd;
	//2006-06-07-13	[Afon]SELACCT_onclick()同业 与 航空公司 的辅助查询, 调整为 新版功用辅助查询视窗方式
		if(str_acctn_cd==1){

			var AGT_ARY = sel_help_agt();

			if (AGT_ARY)
			{
				valCD = AGT_ARY[0][0];

				if (AGT_ARY[0][1] != ""){
					valNM = AGT_ARY[0][1];
				}else{
					valNM = AGT_ARY[0][2];
				}
				FORM1.ACCT_NO.value = 'A' + valCD;
				FORM1.ACCT_NM.value = valNM;
			}

		}else{
			var CARR_ARY = sel_help_carr();

			if (CARR_ARY)
			{
				valCD = CARR_ARY[0][0];

				if (CARR_ARY[0][1] != ""){
					valNM = CARR_ARY[0][1];
				}else if (COMP_ARY[0][2] != ""){
					valNM = CARR_ARY[0][2];
				}else{
					valNM = CARR_ARY[0][3];
				}

				FORM1.ACCT_NO.value = 'T' + valCD;
				FORM1.ACCT_NM.value = valNM;
			}

		}
	}
/*---------------------------------------------------------------------------------------------------------------------------
	//if (myacctn) {
		var myacct
		var str_acct_cd=''
		var str_acct_nm=''
		myacct = showModalDialog("/include/sel_acct.asp?aa="+FORM1.ACCT_NO.value+"&bb="+FORM1.ACCT_TYPE.value+"&chice="+subcd_apun,"","dialogWidth=300pt;dialogHeight=300pt");
		if (myacct) {
			ary_acct = myacct.split('/');
	
			for(var i=0;i<ary_acct.length;i++) {
	
				var ary_acct2 = ary_acct[i].split('，');
				
				for(var j=0;j<ary_acct2.length-1;j++) {
					
					if (j==0) {	
						if (str_acct_cd=='')	{
							str_acct_cd = ary_acct2[j];
						} else {
							str_acct_cd = str_acct_cd+'/'+ary_acct2[j];
						}
					} else {
						if (str_acct_nm=='')	{
							str_acct_nm = ary_acct2[j];
						} else {
							str_acct_nm = str_acct_nm+'/'+ary_acct2[j];
						}
					}
				}
			}
			FORM1.ACCT_NO.value = str_acct_cd;
			FORM1.ACCT_NM.value = str_acct_nm;
			return true;
		}
	}
	else{
	//	FORM1.ACCT_TYPE.value = "";
		var myacct
		var str_acct_cd=''
		var str_acct_nm=''
		myacct = showModalDialog("/include/sel_acct.asp?aa="+FORM1.ACCT_NO.value+"&bb="+FORM1.ACCT_TYPE.value+"&chice="+subcd_apun,"","dialogWidth=300pt;dialogHeight=300pt");
	}
---------------------------------------------------------------------------------------------------------------------------*/
}

//选择联络资料的地区
function SELCNTA_AREA_onclick(subcd_area) {
	var myarea
	var str_area_cd=''
	var str_area_nm=''

	myarea = showModalDialog("/include/sel_cnta_area.asp?aa="+FORM1.ITN_AREA.value+"&chice="+subcd_area,"","dialogWidth=210pt;dialogHeight=300pt");
	if (myarea) {
		ary_area = myarea.split('/');

		for(var i=0;i<ary_area.length;i++) {

			var ary_area2 = ary_area[i].split('，');
			
			for(var j=0;j<ary_area2.length-1;j++) {
				
				if (j==0) {	
					if (str_area_cd=='')	{
						str_area_cd = ary_area2[j];
					} else {
						str_area_cd = str_area_cd+'/'+ary_area2[j];
					}
				} else {
					if (str_area_nm=='')	{
						str_area_nm = ary_area2[j];
					} else {
						str_area_nm = str_area_nm+'/'+ary_area2[j];
					}
				}
			}
		}

		FORM1.ITN_AREA_NM.value = str_area_nm;
		FORM1.ITN_AREA.value = str_area_cd;
		SELCNTA_NATN_onclick(subcd_area);
		return true;
	}


}
//联络资料的国家国码
function SELCNTA_NATN_onclick(subcd_natn) {
	var mycnta
	var str_cnta_cd=''
	var str_cnta_cnm=''
	var str_cnta_enm=''
	var str_cnta_ntel=''

	if (FORM1.ITN_AREA.value != ""){
	mycnta = showModalDialog("/include/sel_cnta_natn.asp?aa="+FORM1.ITN_AREA.value+"&bb="+FORM1.ITN_NATN.value+"&chice="+subcd_natn,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mycnta) {
		ary_cnta = mycnta.split('/');
		for(var i=0;i<ary_cnta.length;i++) {

			var ary_cnta2 = ary_cnta[i].split('，');
			
			for(var j=0;j<ary_cnta2.length-1;j++) {
				
				if (j==0) {	
					if (str_cnta_cd=='')	{
						str_cnta_cd = ary_cnta2[j];
					} else {
						str_cnta_cd = str_cnta_cd+'/'+ary_cnta2[j];
					}
				}
				if (j==1) {
					if (str_cnta_cnm=='')	{
						str_cnta_cnm = ary_cnta2[j];
					} else {
						str_cnta_cnm = str_cnta_cnm+'/'+ary_cnta2[j];
					}
				}
				if (j==2) {
					if (str_cnta_enm=='')	{
						str_cnta_enm = ary_cnta2[j];
					} else {
						str_cnta_enm = str_cnta_enm+'/'+ary_cnta2[j];
					}
				}
				if (j==3) {
					if (str_cnta_ntel=='')	{
						str_cnta_ntel = ary_cnta2[j];
					} else {
						str_cnta_ntel = str_cnta_ntel+'/'+ary_cnta2[j];
					}
				}
			}
		}
		FORM1.ITN_NATN.value = str_cnta_cd;
		FORM1.ITN_NATN_NM.value = str_cnta_cnm;
		FORM1.ADD_NATN.size = str_cnta_cnm.length+2;
		FORM1.ADD_NATN.value = str_cnta_cnm;
		FORM1.EADD_NATN.size = str_cnta_enm.length+2;
		FORM1.EADD_NATN.value = str_cnta_enm;
		FORM1.NATN_CCD1.value = str_cnta_ntel;
		FORM1.NATN_CCD3.value = str_cnta_ntel;
		SELCNTA_CITY_onclick(subcd_natn);
		return true;
	}
	}
	else {
		window.alert("请先选择洲别!");
		SELCNTA_AREA_onclick(subcd_natn);
	}
}
//联络资料的城市
function SELCNTA_CITY_onclick(subcd_city) {
	var mycnta
	var str_cnta_cd=''
	var str_cnta_cnm=''
	var str_cnta_enm=''
	var str_cnta_ntel=''

	if (FORM1.ITN_NATN.value != ""){
	mycnta = showModalDialog("/include/sel_cnta_city.asp?aa="+FORM1.ITN_NATN.value+"&chice="+subcd_city,"","dialogWidth=330pt;dialogHeight=300pt");
	if (mycnta) {
		ary_cnta = mycnta.split('/');
		for(var i=0;i<ary_cnta.length;i++) {

			var ary_cnta2 = ary_cnta[i].split('，');
			
			for(var j=0;j<ary_cnta2.length-1;j++) {
				
				if (j==0) {	
					if (str_cnta_cd=='')	{
						str_cnta_cd = ary_cnta2[j];
					} else {
						str_cnta_cd = str_cnta_cd+'/'+ary_cnta2[j];
					}
				}
				if (j==1) {
					if (str_cnta_cnm=='')	{
						str_cnta_cnm = ary_cnta2[j];
					} else {
						str_cnta_cnm = str_cnta_cnm+'/'+ary_cnta2[j];
					}
				}
				if (j==2) {
					if (str_cnta_enm=='')	{
						str_cnta_enm = ary_cnta2[j];
					} else {
						str_cnta_enm = str_cnta_enm+'/'+ary_cnta2[j];
					}
				}
				if (j==3) {
					if (str_cnta_ntel=='')	{
						str_cnta_ntel = ary_cnta2[j];
					} else {
						str_cnta_ntel = str_cnta_ntel+'/'+ary_cnta2[j];
					}
				}
			}
		}
		FORM1.ITN_CITY.value = str_cnta_cd;
		FORM1.ITN_CITY_NM.value = str_cnta_cnm;
		FORM1.ADD_CITY.size = str_cnta_cnm.length+2;
		FORM1.ADD_CITY.value = str_cnta_cnm;
		FORM1.EADD_CITY.size = str_cnta_enm.length+2;
		FORM1.EADD_CITY.value = str_cnta_enm;
		FORM1.CITY_CCD1.value = str_cnta_ntel;
		FORM1.CITY_CCD3.value = str_cnta_ntel;
		return true;
	}
	}
	else {
		window.alert("请先选择国家!");
		SELCNTA_NATN_onclick(subcd_city);
	}
}

//选择联络资料的地区
function SELHTL_onclick() {
	var myhtl
	var str_htl_cd=''
	var str_htl_nm=''

	myhtl = showModalDialog("/include/sel_itnhotel.asp?city="+FORM1.ITN_CITY.value+"&HTL_CD="+FORM1.HTL_CD.value,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myhtl) {
		ary_htl = myhtl.split('/');

		for(var i=0;i<ary_htl.length;i++) {

			var ary_htl2 = ary_htl[i].split('，');
			
			for(var j=0;j<ary_htl2.length-1;j++) {
				
				if (j==0) {	
					if (str_htl_cd=='')	{
						str_htl_cd = ary_htl2[j];
					} else {
						str_htl_cd = str_htl_cd+'/'+ary_htl2[j];
					}
				} else {
					if (str_htl_nm=='')	{
						str_htl_nm = ary_htl2[j];
					} else {
						str_htl_nm = str_htl_nm+'/'+ary_htl2[j];
					}
				}
			}
		}

		FORM1.HTL_CD.value = str_htl_cd;
		FORM1.ITN_HTL.value = str_htl_nm;
		return true;
	}
}

//选择联络资料的地区
function SELGAREA_onclick() {
	var mygarea
	var str_garea_cd=''
	var str_garea_nm=''

	mygarea = showModalDialog("../include/sel_garea.asp?aa="+FORM1.EMP_GAREA.value,"","dialogWidth=260pt;dialogHeight=300pt");
	if (mygarea) {
		ary_garea = mygarea.split('/');

		for(var i=0;i<ary_garea.length;i++) {

			var ary_garea2 = ary_garea[i].split('，');
			
			for(var j=0;j<ary_garea2.length-1;j++) {
				
				if (j==0) {	
					if (str_garea_cd=='')	{
						str_garea_cd = ary_garea2[j];
					} else {
						str_garea_cd = str_garea_cd+'/'+ary_garea2[j];
					}
				} else {
					if (str_garea_nm=='')	{
						str_garea_nm = ary_garea2[j];
					} else {
						str_garea_nm = str_garea_nm+'/'+ary_garea2[j];
					}
				}
			}
		}

		FORM1.EMP_GAREA.value = str_garea_cd;
		FORM1.EMP_GAREA_NM.value = str_garea_nm;
		return true;
	}
	else
	{
		FORM1.EMP_GAREA.value = "";
		FORM1.EMP_GAREA_NM.value = "";
		return true;
	}
}

//选择旅馆特色
function SELHTLRK_onclick(subcd_htlrk) {
	var myhtlrk

	myhtlrk = showModalDialog("/include/sel_htl_rk.asp?aa="+FORM1.HTL_RK.value+"&chice="+subcd_htlrk,"","dialogWidth=300pt;dialogHeight=300pt");
	if (myhtlrk) {
		FORM1.HTL_RK.value = myhtlrk;
		return true;
	}
}
//选择行程特色
function SELPSORK_onclick(subcd_psork) {
	var mypsork

	mypsork = showModalDialog("/include/sel_pso_rk.asp?aa="+FORM1.ITN_RK.value+"&chice="+subcd_psork,"","dialogWidth=300pt;dialogHeight=300pt");
	if (mypsork) {
		FORM1.ITN_RK.value = mypsork;
		return true;
	}
}
//重设城市
function RESETCITYCD_onclick() {
	if (FORM1.ITN_AREA.value!="" || FORM1.ITN_NATN.value!="" || FORM1.ITN_CITY.value!="")
	{
	
	if (confirm('您确定重设旅游地区？\n\n（确定:重设; 取消:不重设）'))
	{
		FORM1.ITN_AREA.value=""; 
		FORM1.ITN_NATN.value="";    
		FORM1.ITN_CITY.value=""; 
	}}
}



//选择(国内)台湾城市
function SELLCITY_onclick(subcd_city2){
var l_city
if (FORM1.ITN_DEP.value != "") 
{
l_city = showModalDialog("../include/L_ITN_CITY.asp?aa="+FORM1.ITN_CITY2.value+"&chice="+subcd_city2+"&depcd="+FORM1.ITN_DEP.value,"","dialogWidth=300pt;dialogHeight=385pt");
if(l_city) FORM1.ITN_CITY2.value=l_city;
}
else
{alert("请先选择行经台湾那些区域");SELLDEP_onclick(subcd_city2);}
}

//只选择(国内)地区
function SELLDEPH_onclick(subcd_dep) {
var dep
dep = showModalDialog("../include/L_ITN_DEP.asp?aa="+FORM1.ITN_DEP.value+"&chice="+subcd_dep,"","dialogWidth=300pt;dialogHeight=200pt");
if(dep){FORM1.ITN_DEP.value=dep;}
}

//选择租车特色
function test() {
var brk
brk = showModalDialog("../include/b_itn_rk.asp?aa="+FORM1.ITN_RK.value,"","dialogWidth=300pt;dialogHeight=160pt");
if(brk) FORM1.ITN_RK.value=brk;
FORM1.ITN_RK.focus();
}

//选择饭店特色说明
function SELSELspecial_onclick() {
var rk
rk = showModalDialog("../include/H_itn_rk.asp?aa="+FORM1.special.value,"","dialogWidth=300pt;dialogHeight=210pt");
if(rk) FORM1.special.value=rk;
FORM1.special.focus();
}

//选个团基本资料-费用说明按扭传回字显示
function SELFEERK_onclick() {
var rk
rk = showModalDialog("../include/feerk.asp?aa="+FORM1.FEERK.value,"","dialogWidth=300pt;dialogHeight=200pt");
if(rk) FORM1.FEERK.value=rk;
FORM1.FEERK.focus();
}

//找自由行配对饭店
function SEL_F_HTL_onclick(city) {
var HTL
HTL = showModalDialog("../include/F_HTL.asp?city="+city,"","dialogWidth=300pt;dialogHeight=300pt");
if(HTL) {
         //HTL_total.style.display = "";
         //nm.innerHTML = HTL[0];
         FORM1.HTL_CNM.value = HTL[0];
         //cls.innerHTML = HTL[1];
         //content.innerHTML = HTL[2];
         FORM1.HTL_CD.value = HTL[3];
        }
}

//找自由行配对饭店等级名称
function SELPHTL_NM_onclick(agt) {
var phtlnm
phtlnm = showModalDialog("../include/F_PHTL_NM.asp?agt_cd="+agt,"","dialogWidth=200pt;dialogHeight=200pt");
if(phtlnm) {
         FORM1.PHTL_NM.value = phtlnm[0];
        }
}

//找日期配对日期(万年历)
function SELDATE_onclick(yf,mf,df,frmName)
{	var adate;
	var yfVal, mfVal, dfVal;
	
	if(frmName)
	{	yfVal = frmName.elements(yf).value
		mfVal = frmName.elements(mf).value
		dfVal = frmName.elements(df).value	
	}
	
	else
	{	yfVal = FORM1.elements(yf).value
		mfVal = FORM1.elements(mf).value
		dfVal = FORM1.elements(df).value	
	}
		
	adate = showModalDialog("../include/sel_cal.asp?ayear="+yfVal+"&amonth="+mfVal+"&aday="+dfVal,"","dialogTop=10pt;dialogWidth=275pt;dialogHeight=180pt;status=no;help=no");
	if(adate) 
	{  		if(frmName)	
			{	frmName.elements(yf).value=adate[0];
				frmName.elements(mf).value=adate[1];
				frmName.elements(df).value=adate[2];
	        }
	        else
	        {	FORM1.elements(yf).value=adate[0];
				FORM1.elements(mf).value=adate[1];
				FORM1.elements(df).value=adate[2];                
	        }
	}

}
//找日期配对日期(万年历)无限制
function SELDATE_OTHER_onclick(yf,mf,df) {
var adate
adate = showModalDialog("../include/sel_other_cal.asp?ayear="+FORM1.elements(yf).value+"&amonth="+FORM1.elements(mf).value+"&aday="+FORM1.elements(df).value,"","dialogTop=10pt;dialogWidth=275pt;dialogHeight=180pt;status=no;help=no");
if(adate) {
         FORM1.elements(yf).value=adate[0];
         FORM1.elements(mf).value=adate[1];
         FORM1.elements(df).value=adate[2];
        }
}

//一值换给另一值,且可继续编辑
function valuechange(a,b) {
FORM1.elements(b).value='';
FORM1.elements(b).value=FORM1.elements(a).value;
FORM1.elements(b).focus();
}

//一值换给另一值
function changedate(a,b) {
FORM1.elements(b).value=FORM1.elements(a).value;
}

//用于自由行帐款中,若一个选无,另一个也一定为无
function none(a,b) {
if (FORM1.elements(a).value == '') {FORM1.elements(b).value = '';}
}

//选个团(国外)航班资料-行程(来回城市)按扭传回码显示
function SELROUT_ID_onclick() {
var ROUT
if (FORM1.trans.value=="") {ROUT = showModalDialog("../include/ROUT_ID.asp?bb="+FORM1.ROUT_ID.value+"&aa="+FORM1.ITN_NATN.value,"dialogWidth=350pt;dialogHeight=400pt");}
if (FORM1.trans.value!="") {ROUT = showModalDialog("../include/ROUT_ID.asp?bb="+FORM1.ROUT_ID.value+"&aa="+FORM1.ITN_NATN.value+"/"+FORM1.trans.value,"","dialogWidth=350pt;dialogHeight=400pt");}
if(ROUT) FORM1.ROUT_ID.value=ROUT;
}

//用于团的航班-转机国家
function transnatn_onclick() {
var gareatrans
gareatrans = showModalDialog("../include/trarea.asp","dialogWidth=200pt;dialogHeight=270pt");
if(gareatrans) 
  {
   var NATN
   NATN = showModalDialog("../include/trnatn.asp?aa="+gareatrans,"","dialogWidth=300pt;dialogHeight=300pt");
   if(NATN) {FORM1.trans.value=NATN;SELROUT_ID_onclick()}
  }
}

//选个团(国内)航班资料-行程(来回城市)按扭传回码显示
function SELR_L_OUT_ID_onclick() {
var L_ROUT
L_ROUT = showModalDialog("../include/L_ROUT_ID.asp?bb="+FORM1.ROUT_ID.value+"&aa="+FORM1.ITN_NATN.value,"","dialogWidth=350pt;dialogHeight=400pt");
if(L_ROUT) FORM1.ROUT_ID.value=L_ROUT;
}

//用于航班日期互换
function selectchange(val) {
FORM1.DEP_DT.selectedIndex = FORM1.GBOOK_SQ.value-1;
FORM1.ARR_DT.selectedIndex = FORM1.GBOOK_SQ.value-1;
}


//选择第二家航班公司
function SELCARR_CD_onclick2(aira,airb,localtw) {
if (FORM1.elements(airb).value.length < 5) 
  {if (FORM1.CARR_CD2.value=='') {alert("请先选择第一家转机航班公司");SELCARR_CD_onclick(aira,airb,localtw);}
   else 
   {var garea2
    garea2 = showModalDialog("../include/carr1_cd.asp?aa="+FORM1.elements(airb).value+"&localtw="+localtw,"","dialogWidth=480pt;dialogHeight=360pt");
    if(garea2) FORM1.elements(airb).value= FORM1.elements(airb).value+'/'+garea2;
    }
  }
else
  {if (confirm('您已超过二家转机航班公司,请问要重选？\n\n（确定:重选; 取消:不选了）')) {FORM1.elements(airb).value = ''; SELCARR_CD_onclick(aira,airb,localtw);}}
}



//选择国内出发城市
function SELFROMCITYintra_onclick(citya,cityb){
var CITYintra 
CITYintra = showModalDialog("../include/T_city.asp?aa=TW&cc=intra&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=400pt");
if(CITYintra) FORM1.elements(cityb).value=CITYintra;
}

//选择国外城市
function SELFROMCITYout_onclick(citya,cityb){
var CITYout 
CITYout = showModalDialog("../include/T_city.asp?aa=TW&cc=out&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=150pt");
if(CITYout) FORM1.elements(cityb).value=CITYout;
}

//国内国际机场中文名称
function SELAIRPNMintra_onclick(airpA,airpB){
var airpA 
airpA = showModalDialog("../include/T_airp_nm.asp?aa=TW&cc=out&bb="+FORM1.elements(airpB).value,"","dialogWidth=300pt;dialogHeight=150pt");
if(airpA) FORM1.elements(airpB).value=airpA;
}

//国外国际机场中文名称
function SELFROMCITYx_onclick(citya,cityb) {
if (FORM1.elements(cityb).value.length > 1) 
 {if (confirm('您确定重选城市？\n\n（确定:重选; 取消:不选了）')) 
  {FORM1.elements(cityb).value = ''; SELFROMCITY_onclick(citya,cityb);}
 }
else
 { 
   var garea
   garea = showModalDialog("../include/trarea.asp?aa="+FORM1.elements(cityb).value,"","dialogWidth=200pt;dialogHeight=300pt");
   if(garea) {var NATN 
              NATN = showModalDialog("../include/trnatn.asp?aa="+garea+"&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=300pt");
              if(NATN) {var CITY 
                        CITY = showModalDialog("../include/T_city.asp?aa="+NATN+"&cc=out&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=400pt");
                        if(CITY) {var AIRP
									AIRP = showModalDialog("../include/T_airp_nm.asp?aa=OUTER&bb="+CITY,"","dialogWidth=300pt;dialogHeight=400pt");
									if (AIRP)
									{	FORM1.elements(cityb).value=AIRP; }
								}
                       }
              }         
 }
}

//选择第一个转机城市
function SELFROMCITY_onclick(citya,cityb) {
if (FORM1.elements(cityb).value.length > 1) 
 {if (confirm('您确定重选城市？\n\n（确定:重选; 取消:不选了）')) 
  {FORM1.elements(cityb).value = ''; SELFROMCITY_onclick(citya,cityb);}
 }
else
 { 
   var garea
   garea = showModalDialog("../include/trarea.asp?aa="+FORM1.elements(cityb).value,"","dialogWidth=200pt;dialogHeight=300pt");
   if(garea) {var NATN 
              NATN = showModalDialog("../include/trnatn.asp?aa="+garea+"&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=300pt");
              if(NATN) {var CITY 
                        CITY = showModalDialog("../include/T_city.asp?aa="+NATN+"&cc=out&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=400pt");
                        if(CITY) FORM1.elements(cityb).value=CITY;
                       }
              }         
 }
}

//选择第二个转机城市
function SELFROMCITY_onclick2(citya,cityb) {
{if (FORM1.elements(cityb).value.length < 1) {alert("请先选择第一个转机城市");SELFROMCITY_onclick(citya,cityb);}
else
{
{if (FORM1.elements(cityb).value.length > 5) {if (confirm('您确定重选转机城市？\n\n（确定:重选; 取消:不选了）')) {FORM1.elements(cityb).value = ''; SELFROMCITY_onclick(citya,cityb);}}
else
 {  
   var garea
   garea = showModalDialog("../include/trarea.asp?aa="+FORM1.elements(cityb).value,"","dialogWidth=200pt;dialogHeight=300pt");
   if(garea) {var NATN 
              NATN = showModalDialog("../include/trnatn.asp?aa="+garea+"&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=300pt");
              if(NATN) {var CITY 
                        CITY = showModalDialog("../include/T_city.asp?aa="+NATN+"&bb="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=400pt");
                        if(CITY) FORM1.elements(cityb).value=FORM1.elements(cityb).value+'/'+CITY;
                       }
              }         
 }}}
}}

// 手动输入机场代码 by locust
function KEYINAIRP_onclick(citya,cityb,cityc) {
   var garea
	if (FORM1.elements(cityb).value=="") { 
	   alert("请输入机场代码!!");
	   FORM1.elements(cityb).focus(); // 游标指向此栏位   
   }
	else
	   garea = showModalDialog("../include/keyin_airp.asp?aa="+FORM1.elements(cityb).value,"","dialogWidth=300pt;dialogHeight=150pt");

if (garea) {FORM1.elements(cityc).value=garea;FORM1.elements(cityb).value=""; }

}


//用于复制图时的产品编号选择
function SELid_onclick(fs,fid,agent) {
if (FORM1.elements(fs).value=='') {alert("请先选择新的产品分类");return false;}
else 
   {var tid
    tid = showModalDialog("../include/img_id.asp?aa="+FORM1.elements(fid).value+"&bb="+FORM1.elements(fs).value+"&agt="+agent,"","dialogTop=10pt;dialogWidth=275pt;dialogHeight=180pt;status=no;help=no");
    if(tid) FORM1.elements(fid).value = tid[0];
    }
}   

//用于团的航班资料
function DEP_DT_onchange() {
FORM1.elements("ARR_DT").value=FORM1.elements("DEP_DT").value;
}



//选择(国外)地区
function SELSAGT_onclick() {
var gsagt
gsagt = showModalDialog("../include/getsagt.asp?SetAGT="+FORMSAGT.ITN_SAGTCD.value,"","dialogWidth=400pt;dialogHeight=500pt");
if(gsagt) open("new_addgurp.asp?SAGT_CD="+gsagt,"_self")
}

//选择城市-国别-地区
function sel_search_Local(areacd_item, areanm_item, natncd_item, natnnm_item, citycd_item, citynm_item, tp, tp2)
{
	if(tp2=="N"){
		//2006-07-17 [Afon]改为公用视窗方式处理
		var Action = "/include/sel_help_natn.asp";
	
		var Title  = "国家";
		var RTN_FLD = "TRNATN.AREA_CD, TRAREA.AREA_CNM, TRAREA.AREA_ENM, TRNATN.NATN_CD, TRNATN.NATN_CNM, TRNATN.NATN_ENM, TRNATN.NATN_TCD";
		var SEL_FLD = "TRNATN.NATN_CD AS '国家代码', (CASE ISNULL(TRAREA.AREA_CNM, '') WHEN '' THEN ISNULL(TRAREA.AREA_ENM, '') ELSE TRAREA.AREA_CNM END) AS '洲别名称' , (CASE ISNULL(TRNATN.NATN_CNM, '') WHEN '' THEN ISNULL(TRNATN.NATN_ENM, '') ELSE TRNATN.NATN_CNM END) AS '国家名称'";
		var SEL_FRM = "TRNATN LEFT JOIN TRAREA ON TRNATN.AREA_CD = TRAREA.AREA_CD";
		var SEL_WHR = "";
		
		var SEL_ORD = "TRNATN.AREA_CD, TRNATN.NATN_CD";

		var sURL = "/include/sel_help_pop.asp?Action=" + Action + "&Title=" + Title + "&RTN_FLD=" + RTN_FLD + "&SEL_FLD=" + SEL_FLD + "&SEL_FRM=" + SEL_FRM + "&SEL_WHR=" + SEL_WHR + "&SEL_ORD=" + SEL_ORD + "&AREA_CD=" +  FORM1.ITN_AREA.value + "&AREA_NM=" +  FORM1.ITN_AREA_NM.value;

		//2008-09-03 [Ham] 修改高度
		//var VAL = showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=490px");
		var VAL = showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=640px");
		
		if(VAL){
			var getLocalInfo = new Array();

			    getLocalInfo[0] = new Array();
			    getLocalInfo[0][0] = VAL[0][0];
			    getLocalInfo[0][1] = VAL[0][1];
			    getLocalInfo[0][2] = VAL[0][2];
			    getLocalInfo[0][3] = "";
			    getLocalInfo[1] = new Array();
			    getLocalInfo[1][0] = VAL[0][3];
			    getLocalInfo[1][1] = VAL[0][4];
			    getLocalInfo[1][2] = VAL[0][5];
			    getLocalInfo[1][3] = VAL[0][6];
			   
		/*var searchVal = sel_search();

		var sel_natn_cd = "", sel_natn_nm = "";
		if(searchVal)	
		{	valueArray = searchVal.split("，");
			sel_natn_cd = valueArray[1];
			sel_natn_nm = valueArray[2];
		}*/
		/*2004-11-08 Ham
		if((sel_natn_cd != "") || (sel_natn_nm != ""))
		{
		*/
			
		//	var getLocalInfo = showModalDialog("/include/sel_all_natn.asp?natn_cd=" + sel_natn_cd + "&natn_nm=" + sel_natn_nm);
		//	if(getLocalInfo)
		//	{	
			    putCntaValue(getLocalInfo, areacd_item, areanm_item, natncd_item, natnnm_item, '', '', tp, tp2); 
			
		//	}
		/*
		}
		*/
		}
	}
	else
	{
/*
		var sel_city_cd = "", sel_city_cnm = "";
		
		if(searchVal)	
		{	valueArray = searchVal.split("，");
			sel_city_cd = valueArray[1];
			sel_city_cnm = valueArray[2];
		}
*/
		sel_natn_cd=natncd_item.value;	//2004-11-04 Ham 新增国家代码参数
		/*	2004-11-04 Ham 允许空直
		if((sel_city_cd != "") || (sel_city_cnm != ""))
		{
		*/
			//var getLocalInfo = showModalDialog("/include/sel_all_city.asp?city_cd=" + sel_city_cd + "&city_cnm=" + sel_city_cnm);

			var ary_city = sel_city_sin(areacd_item.value, natncd_item.value);

			if (ary_city)
			{	
			    var getLocalInfo = new Array();

			    getLocalInfo[0] = new Array();
			    getLocalInfo[0][0] = ary_city[0][0];
			    getLocalInfo[0][1] = ary_city[0][1];
			    getLocalInfo[0][2] = ary_city[0][2];
			    getLocalInfo[0][3] = "";
			    getLocalInfo[1] = new Array();
			    getLocalInfo[1][0] = ary_city[0][3];
			    getLocalInfo[1][1] = ary_city[0][4];
			    getLocalInfo[1][2] = ary_city[0][5];
			    getLocalInfo[1][3] = ary_city[0][6];
			    getLocalInfo[2] = new Array();
			    getLocalInfo[2][0] = ary_city[0][7];
			    getLocalInfo[2][1] = ary_city[0][8];
			    getLocalInfo[2][2] = ary_city[0][9];
			    getLocalInfo[2][3] = ary_city[0][10];

			    putCntaValue(getLocalInfo, areacd_item, areanm_item, natncd_item, natnnm_item, citycd_item, citynm_item, tp, tp2); 
			
			}
		/*	2004-11-04 Ham 允许空直
		}
		*/
	}
}

function sel_city_sin(areacd, natncd)
{
	var Action = "/include/sel_help_city.asp";
	var Title  = "城市";
	var RTN_FLD = "TRNATN.AREA_CD, TRAREA.AREA_CNM, TRAREA.AREA_ENM, TRCITY.NATN_CD, TRNATN.NATN_CNM, TRNATN.NATN_ENM, TRNATN.NATN_TCD, TRCITY.CITY_CD, TRCITY.CITY_CNM, TRCITY.CITY_ENM, TRCITY.CITY_TCD";
	var SEL_FLD = "TRCITY.CITY_CD AS '城市代码', TRAREA.AREA_CNM AS '洲别名称', TRNATN.NATN_CNM AS '国家名称', TRCITY.CITY_CNM AS '城市名称'";
	var SEL_FRM = "TRCITY LEFT JOIN TRNATN ON TRCITY.NATN_CD = TRNATN.NATN_CD AND TRCITY.NATN_CD <> '' AND TRCITY.NATN_CD IS NOT NULL LEFT JOIN TRAREA ON TRNATN.AREA_CD = TRAREA.AREA_CD AND TRNATN.AREA_CD <> '' AND TRNATN.AREA_CD IS NOT NULL";
	var SEL_WHR = "";
	var SEL_ORD = "TRNATN.AREA_CD, TRCITY.NATN_CD, TRCITY.CITY_CD";

	if (natncd == "")
	{
		if (areacd != "")
			SEL_WHR = " TRAREA.AREA_CD = '" + areacd + "'";
	}
	else
	{
		SEL_WHR = " TRNATN.NATN_CD = '" + natncd + "'";
	}

	var sURL = "/include/sel_help_pop.asp?Action=" + Action + "&Title=" + Title + "&RTN_FLD=" + RTN_FLD + "&SEL_FLD=" + SEL_FLD + "&SEL_FRM=" + SEL_FRM + "&SEL_WHR=" + SEL_WHR + "&SEL_ORD=" + SEL_ORD;

	//2008-09-03 [Ham] 修改高度
	//return showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=490px");
	return showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=640px");
}

function putCntaValue(valueArray, areacd_item, areanm_item, natncd_item, natnnm_item, citycd_item, citynm_item, tp, tp2)
{	if(typeof(areacd_item) == "object") { areacd_item.value = valueArray[0][0];	}
	if(typeof(areanm_item) == "object") { areanm_item.value = valueArray[0][1];	}
			
	if(typeof(natncd_item) == "object") { natncd_item.value = valueArray[1][0];	}
	if(typeof(natnnm_item) == "object") { natnnm_item.value = valueArray[1][1];	}

	if(typeof(citycd_item) == "object") { citycd_item.value = valueArray[2][0];	}
	if(typeof(citynm_item) == "object") { citynm_item.value = valueArray[2][1];	}
	
	if(tp2==""){
		if(typeof(citycd_item) == "object") { citycd_item.value = valueArray[2][0];	}
		if(typeof(citynm_item) == "object") { citynm_item.value = valueArray[2][1];	}
	}
			
	if (tp != "ADDR") {
		if(typeof(FORM1.ADD_NATN) == "object")
		{	FORM1.ADD_NATN.size = valueArray[1][1].length + 2;
			FORM1.ADD_NATN.value = valueArray[1][1];
		}	
				
		if(typeof(FORM1.EADD_NATN) == "object")
		{	FORM1.EADD_NATN.size = valueArray[1][2].length + 2;
			FORM1.EADD_NATN.value = valueArray[1][2];
		}	
				
		if(typeof(FORM1.ADD_CITY) == "object")
		{	FORM1.ADD_CITY.size = valueArray[2][1].length + 2;
			FORM1.ADD_CITY.value = valueArray[2][1];
		}	
				
		if(typeof(FORM1.EADD_CITY) == "object")
		{	FORM1.EADD_CITY.size = valueArray[2][2].length + 2;
			FORM1.EADD_CITY.value = valueArray[2][2];
		}	
		
//		if(typeof(FORM1.NATN_CCD1) == "object"){ FORM1.NATN_CCD1.value = valueArray[1][3]; }
//		if(typeof(FORM1.NATN_CCD3) == "object"){ FORM1.NATN_CCD3.value = valueArray[1][3]; }
        	
//		if(typeof(FORM1.CITY_CCD1) == "object"){ FORM1.CITY_CCD1.value = valueArray[2][3]; }
//		if(typeof(FORM1.CITY_CCD3) == "object"){ FORM1.CITY_CCD3.value = valueArray[2][3]; }
//		2007-01-03 leon 增加 住家电话 住家传真 公司电话的国码与区码的数值预设		
		if(typeof(FORM1.NATN_CCD1) == "object"){ FORM1.NATN_CCD1.value = valueArray[1][3]; }
		if(typeof(FORM1.NATN_CCD2) == "object"){ FORM1.NATN_CCD2.value = valueArray[1][3]; }
		if(typeof(FORM1.NATN_CCD3) == "object"){ FORM1.NATN_CCD3.value = valueArray[1][3]; }
		if(typeof(FORM1.NATN_CCD4) == "object"){ FORM1.NATN_CCD4.value = valueArray[1][3]; }
		if(typeof(FORM1.NATN_CCD5) == "object"){ FORM1.NATN_CCD5.value = valueArray[1][3]; }
        	
		if(typeof(FORM1.CITY_CCD1) == "object"){ FORM1.CITY_CCD1.value = valueArray[2][3]; }
		if(typeof(FORM1.CITY_CCD2) == "object"){ FORM1.CITY_CCD2.value = valueArray[2][3]; }
		if(typeof(FORM1.CITY_CCD3) == "object"){ FORM1.CITY_CCD3.value = valueArray[2][3]; }
		if(typeof(FORM1.CITY_CCD4) == "object"){ FORM1.CITY_CCD4.value = valueArray[2][3]; }
		if(typeof(FORM1.CITY_CCD5) == "object"){ FORM1.CITY_CCD5.value = valueArray[2][3]; }
	}
}

//Pop-up地址中翻英视窗 (city_cd = 城市代号，zipfrm = 表单名称.邮递区号栏位名称，zip1frm = 表单名称.发票地址邮递区号栏位名称，chfrm = 表单名称.中文地址栏位名称，enfrm = 表单名称.英文地址栏位名称)
//		2006-12-06		: [ Afon ]因为开放可以重选城市，故需回传城市及相关资料
//								  city_cdfrm = 城市代码, city_nm1frm = 城市名称, city_nm2frm = 地址(城市-中), city_enmfrm = 地址(城市-英), city_ccd = (电话区码)
function sel_addr_ch2en(city_cd, zipfrm, chfrm, enfrm, zip1frm, city_cdfrm, city_nm1frm, city_nm2frm, city_enmfrm, city_ccd)
{	var w = 600, h = 270;
	var url = "/include/sel_addr_ch2en.asp?" ;
		url+= "city_cd=" + city_cd	;
		url+= "&zipfrm=" + zipfrm	;
		url+= "&chaddrfrm=" + chfrm	;
		url+= "&enaddrfrm=" + enfrm	; 
		url+= "&zip1frm=" + zip1frm	;
		url+= "&city_cdfrm=" + city_cdfrm	;
		url+= "&city_nm1frm=" + city_nm1frm	;
		url+= "&city_nm2frm=" + city_nm2frm	; 
		url+= "&city_enmfrm=" + city_enmfrm	;
		url+= "&city_ccd=" +	city_ccd	;
		
	var nWin = window.open(url , "newWin", "width=" + w + "pt, height=" + h + "pt, left=" + (window.screen.width / 2 - w / 2) + ", top=" + (window.screen.height / 2 - h / 2) + ", Status=yes"); 
	nWin.focus();
}

//选择(国外)地区--联络资料合并用
function SELAREA_onclick1(subcd_area,stop_next) {
	var myarea
	var str_area_cd=''
	var str_area_nm=''

	myarea = showModalDialog("/include/sel_area.asp?aa="+FORM1.ITN_AREA1.value+"&chice="+subcd_area,"","dialogWidth=210pt;dialogHeight=300pt");
	if (myarea) {
		ary_area = myarea.split('/');

		for(var i=0;i<ary_area.length;i++) {

			var ary_area2 = ary_area[i].split('，');
			
			for(var j=0;j<ary_area2.length-1;j++) {
				
				if (j==0) {	
					if (str_area_cd=='')	{
						str_area_cd = ary_area2[j];
					} else {
						str_area_cd = str_area_cd+'/'+ary_area2[j];
					}
				} else {
					if (str_area_nm=='')	{
						str_area_nm = ary_area2[j];
					} else {
						str_area_nm = str_area_nm+'/'+ary_area2[j];
					}
				}
			}
		}

		FORM1.ITN_AREA_NM1.value = str_area_nm;
		FORM1.ITN_AREA1.value = str_area_cd;
		if (stop_next!="A") {
			SELNATN_onclick(subcd_area,stop_next);
		}
		return true;
	}
}

/*	=======================================================================
	检查统一编号公用程式
	chkprno(iprno)
	cc(n)
	=======================================================================	*/
	function chkprno(iprno)
	{
		var cx = new Array;
		cx[0] = 1;
		cx[1] = 2;
		cx[2] = 1;
		cx[3] = 2;
		cx[4] = 1;
		cx[5] = 2;
		cx[6] = 4;
		cx[7] = 1;
		var NO = iprno;
		var SUM = 0;
		if (NO == ""){
			alert("需填入统编!!");
			return false;
		}
		if (NO.charAt(0) != "*"){
			if (NO.length != 8) {
				alert("统编错误，要有 8 个数字");
				return false;
			}
			var cnum = NO.split("");
			for (i=0; i<=7; i++) 
			{
				if (NO.charCodeAt() < 48 || NO.charCodeAt() > 57) {
				  alert("统编错误，要有 8 个 0-9 数字组合");
				  return false;
				}
				SUM += cc(cnum[i] * cx[i]);
			}
			if (SUM % 10 == 0) { 
				return true;	
			}  else if  (cnum[6] == 7 && (SUM + 1) % 10 == 0) {
				return true;
			} else {
				alert("统一编号："+NO+" 错误!"); 
				return false;
			}
		}
	}
	function cc(n){
	  if (n > 9) {
	    var s = n + "";
	    n1 = s.substring(0,1) * 1;
	    n2 = s.substring(1,2) * 1;
	    n = n1 + n2;
	  }
	  return n;
	}
/*	=======================================================================
	检查身分证字号公用程式
	chkidno(idno)
	=======================================================================	*/
function chkidno ( id , showid, istyle)
{
     var myid = id;
     myid = myid.toUpperCase();
     id = myid;     
	 ary_myid = myid.split('');
	 if (ary_myid[0] == '*') {
		if (myid.length < 8)
		{
			alert("您的身分证字号不正确 !\n");
			return false;
		}
	 } else {
		// 检查身分证号
		if(myid.length>10){ alert("您的身分证字号超过10个字 !\n"); return false;}
		if(myid.length<10){ alert("您的身分证字号不满10个字 !\n"); return false;}
		var c = myid.charAt(0);
		if(c<"A" || c> "Z")
		{
			alert("您的身分证字号第一码必须是大写的英文字母 !\n");
			return false;
		}
		c = myid.charAt(1);
		if(c!="1" && c!="2")
		{
			alert("您的身分证字号第二码有问题 !\n");
			return false;
		}
		for(i=1;i<10;i++)
			if(isNaN(parseFloat(myid.charAt(i))))
			{
				alert("您的身分证字号第二到十码有问题 !\n");
				return false;
			}
		var alph = new Array("A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","X","Y","W","Z","I","O");
		var num  = new Array("10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35");
		var n=0;
		for(i=0;i<alph.length;i++)
		if(myid.charAt(0)==alph[i])
			n=i;
		var tot1 = parseFloat(num[n].charAt(0)) + (parseFloat(num[n].charAt(1)) * 9);
		var tot2 = 0;
		for(i=1;i<myid.length-1;i++)
				tot2 = tot2 + parseFloat(myid.charAt(i))*(9-i);
		var tot3 = parseFloat(myid.charAt(9));
		var tot4 = tot1 + tot2 + tot3;
		if((tot4 % 10)!=0)
		{
			alert("您的身分证字号有问题 !\n");
			return false;
		} 
	 }
   return "";
}
/*	=======================================================================
	回传万用代码 
	ex:sel_trword('SCEND_TP', document.FORM1.SEL_SCEND_TP, document.FORM1.SEL_SCEND_DR, '', '','景点资讯类别代码')
	cls_cd			： 万用代码类别
	item_DATA_VALUE	： 代码物件
	item_CHIN_WD	： 中文名称物件
	item_ENGL_WD	： 英文名称物件
	Multi			： "" / "Y"(单选/复选)
	Title			： 表头名称
	Return_TP		： 回传方式 0/1 
	=======================================================================	*/
function sel_trword(cls_cd, item_DATA_VALUE, item_CHIN_WD, item_ENGL_WD, Multi, Title, Return_TP)
{
	var Action = "/include/sel_help_trword.asp";
	//2006-07-13 [Afon] 新增 表头参数，无表头资料时，表头预设"万用代码"
	if(Title==''){	Title  = "万用代码";	}
	
	var RTN_FLD = "TRWORD.CLS_CD, TRWORD.DATA_VALUE, TRWORD.CHIN_WD, TRWORD.ENGL_WD";
	
	//2006-07-13 [Afon]已经指定类别，所以列表资料不需要显示类别
	if(cls_cd ==''){
		var SEL_FLD = "TRWORD.CLS_CD AS '类别', TRWORD.DATA_VALUE AS '代码值', TRWORD.CHIN_WD AS '中文名称', TRWORD.ENGL_WD AS '英文名称'";
	}else{	
		var SEL_FLD = "TRWORD.DATA_VALUE AS '代码值', TRWORD.CHIN_WD AS '中文名称', TRWORD.ENGL_WD AS '英文名称'";
	}
	var SEL_FRM = "TRWORD";
	var SEL_WHR = "";
	var SEL_ORD = "TRWORD.SORT_SQ";

	if (cls_cd != ""){	SEL_WHR = " TRWORD.CLS_CD = '" + cls_cd + "'";	}

	var sURL = "/include/sel_help_pop.asp?Action=" + Action + "&Title=" + Title + "&Multi=" + Multi + "&RTN_FLD=" + RTN_FLD + "&SEL_FLD=" + SEL_FLD + "&SEL_FRM=" + SEL_FRM + "&SEL_WHR=" + SEL_WHR + "&SEL_ORD=" + SEL_ORD + "&CLS_CD=" + cls_cd;

	//2008-09-03 [Ham] 修改高度
	//var VAL = showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=490px");
	var VAL = showModalDialog(sURL, "", "dialogWidth=530px;dialogHeight=640px");
	
	if(VAL){
		if(Multi==''){
			if(item_DATA_VALUE){ item_DATA_VALUE.value = VAL[0][1]; }
			if(item_CHIN_WD){ item_CHIN_WD.value = VAL[0][2]; }
			if(item_ENGL_WD){ item_ENGL_WD.value = VAL[0][3]; }
		}else{
		//2006-07-13 [Afon]调整可回传多资料
			if(Return_TP=='1'){
				return VAL
			}else{
				var str_DATA_VAL= '' ;
				var str_CHIN_WD = '' ;
				var str_ENGL_WD = '' ;
				
				for (var i=0; i<VAL.length; i++){
					if(str_DATA_VAL==''){
						str_DATA_VAL = VAL[i][1] ;
					}else{	
						str_DATA_VAL = str_DATA_VAL + ',' + VAL[i][1] ;
					}
					
					if(str_CHIN_WD==''){
						str_CHIN_WD = VAL[i][2];
					}else{	
						str_CHIN_WD = str_CHIN_WD + ',' + VAL[i][2] ;
					}
					
					if(str_ENGL_WD==''){	
						str_ENGL_WD = VAL[i][3] ;
					}else{	
						str_ENGL_WD = str_ENGL_WD + ',' + VAL[i][3]
					}
				} 
				if(item_DATA_VALUE){	item_DATA_VALUE.value = str_DATA_VAL ; 	}
				if(item_CHIN_WD){		item_CHIN_WD.value = str_CHIN_WD ; 			}
				if(item_ENGL_WD){		item_ENGL_WD.value = str_ENGL_WD; }
			}
		}
	}
}

//=== 2007-09-20 Hamburger 增加栏位预设值 ===
function chkValue(obj,defValue){
	if(obj.value==""){
		obj.value=defValue;
	}
}
//===========================================