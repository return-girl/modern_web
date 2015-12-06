//页面加载完成后
$(function() {
	//利用ajax，在按下reset的时候，向服务器发出/reset的请求，并获取服务器的响应
	$('#reset').click(function() {
		var xmlhttp;
		clear_error();
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open('GET', '/reset'); //发送请求
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = JSON.parse(xmlhttp.response);
				if (result.success == true) alert("重置成功!!");
			}
		}
		xmlhttp.send(null);
	});

	//利用ajax，在点击submit之后先判断，若合法，再向服务器发出方式为post的/signin请求,同时获取服务器的响应
	$('#submit').click(function (e) {
		e.preventDefault();
		if (!validate_name($('#username').val()) || !validate_number($('#usernumber').val()) || !validate_phone($('#userphone').val()) || !validate_email($('#useremail').val()))
			return; //只要有一个不合法的，就不向服务器发送请求。
		//对于合法的输入,则要发出/signin的请求
		var xmlhttp;
		var fd = {
			username: $('#username').val(),
			usernumber: $('#usernumber').val(),
			userphone: $('#userphone').val(),
			useremail: $('#useremail').val()
		};
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open('POST', '/signin');
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				var result = JSON.parse(xmlhttp.response);
				if (result.error == '') {
                   document.getElementsByTagName('html')[0].innerHTML = result.data;
				}
				else {
					error_alert(result.error);
				}
			}
		}
		xmlhttp.send(JSON.stringify(fd));
	});

	$('#form div input').blur(function() {
		if (this.name == "username")
			if (!validate_name($("#" + this.name).val())) {
				$(".error_message").eq(0).text("用户名6-8位英文字母、数字或者下划线，必须以英文开头");
			} else {
				$(".error_message").eq(0).text("");
			} else if (this.name == "usernumber")
			if (!validate_number($("#" + this.name).val())) {
				$(".error_message").eq(1).text("学号8位数字，不能以0开头");
			} else {
				$(".error_message").eq(1).text("");
			} else if (this.name == "userphone")
			if (!validate_phone($("#" + this.name).val())) {
				$(".error_message").eq(2).text("电话11位数字，不能以0开头");
			} else {
				$(".error_message").eq(2).text("");
			} else if (this.name == "useremail")
			if (!validate_email($("#" + this.name).val())) {
				$(".error_message").eq(3).text("邮箱格式应为:***@***.com");
			} else {
				$(".error_message").eq(3).text("");
			}
	});
});

function validate_name(name) {
	return /^[a-zA-Z][a-zA-Z_0-9]{5,18}$/.test(name);
}

function validate_number(number) {
	return /^[1-9]\d{7}$/.test(number);
}

function validate_phone(phone) {
	return /^[1-9]\d{10}$/.test(phone);
}

function validate_email(email) {
	return /^[a-zA-Z_0-9\-]+@(([a-zA-Z_0-9\-])+\.)+[a-zA-Z]{2,4}$/.test(email);
} //王老师的邮箱格式+数字版

function clear_error() {
	$(".error_message").each(function(i) {
		$(this).text("");
	});
}
function error_alert(s) {
    if (s == 'username') alert("该用户名已被注册!")
    else if (s == 'usernumber') alert("该学号已被注册!");
    else if (s == 'userphone') alert("该电话已被注册!");
    else if (s == 'useremail') alert("该邮箱已被注册!");
}