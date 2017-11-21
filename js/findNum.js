var name;
var phone;
var mail;
$(document).ready(
	function()
	{
		$("#search").click(
            function()
            {
                name = $("#name")["0"].value.trim();
                phone = $("#phone")["0"].value.trim();
                mail = $("#mail")["0"].value.trim();
                //console.log([name, phone, mail]);
                if(checkName(name) && checkPhone(phone) && checkEmail(mail))
				{
                $.ajax(
                    {
                        type: "post",
                        url: "Check_Retrieve_number.php",
                        data:
                            {
                                "name":name,
                                "phone":phone,
                                "mail":mail,
                            },
                        dataType: "jsonp",
                        jsonp: "callback",
                        jsonpCallback: "callbackName",
                        success:
                            function(json)
                            {
                                //console.log(json);
                                if(json.check == 3)
                                {
                                    $("#info").html("没有找到符合资料的报名者");
                                }
                                else if(json.check == 4)
                                {
                                    $("#info").html("无法连接到数据库");
                                }
                                else
                                {
                                    $("#page1").hide();
                                    $("#page2").show();
                                    $("#name2").html(name);
                                    $("#number").html(json.check);
                                }
                            },
                        error:
                            function(jqXHR, textStatus, errorThrown, json)
                            {
                                $("#info").html("发送请求失败，请重试");
                                //console.log(json);
                                //console.log(textStatus);
                                //console.log(jqXHR.status);
                                //console.log(jqXHR.readyState);
                            }
                    }
                )
                }
            }
        )
    }
)	
	
	// 检查姓名 	
	function checkName(name){
		if(name === ""){
			$("#info").html("请输入姓名！");
		}else if(!(/^[\u4E00-\u9FA5]{2,10}$/.test(name))){
			$("#info").html("请输入2~10个汉字！");
	}else{	
		return true;
	}
}

// 检查电话号码
function checkPhone(phone){
	if(phone === ""){
		$("#info").html("请输入手机号码！");
	}else if(!(/^1[34578]\d{9}$/.test(phone))){
		$("#info").html("手机号码输入有误！");
	}else{
		return true;
	}
}

// 检查邮箱
function checkEmail(mail){
	if(mail === ""){
		$("#info").html("请输入邮箱！");
	}else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail))){
		$("#info").html("邮箱输入有误！");
	}else{
		return true;
	}
}