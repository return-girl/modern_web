//说明：使用了部分ajax的代码
//有任何建议与想法欢迎指点
//wzjfloor@qq.com


var http = require('http');
var fs = require('fs');
var path = require('path');
var process = require('process');
var qs = require('querystring');

var store = []; // 服务器储存各个用户

//创建服务器
var server = http.createServer(function(request, response) {
	console.log(request.url);
	console.log(request.method);
	// 如果是/读入Index.html
	if (request.url === '/') Response(response, './index.html');
	// 如果是post方式且客户端传来的是signin就处理表单数据
	else if (request.method === 'POST' && request.url === "/signin") {
		var receive = '';
		request.on('data', function(data) {
			receive += data;
		});
		request.on('end', function() { // 请求体结束后
			var result = {};
			result.error = '';
			result.data = '';
			var parse_data = JSON.parse(receive);
			var repeat = [];
			//判断有没有重复，具体哪一个输入重复
			for (var i = 0; i < store.length; i++) {
				if (store[i].username === parse_data.username) {
					repeat.push('用户名');
					result.error = 'username';
					break;
				}
				if (store[i].usernumber === parse_data.usernumber) {
					repeat.push('学号');
					result.error = 'usernumber';
					break;
				}
				if (store[i].userphone === parse_data.userphone) {
					repeat.push('电话');
					result.error = 'userphone';
					break;
				}
				if (store[i].useremail === parse_data.useremail) {
					repeat.push('邮箱');
					result.error = 'useremail';
					break;
				}
			}
			if (repeat.length === 0) {
				store.push(parse_data);
				render_detail(parse_data, function(err, data) {
					result.data = data;
					result.error = "";
					response.end(JSON.stringify(result));
				});
			} else {
				result.data = "";
				response.end(JSON.stringify(result));
			}
		})
	}
	//如果客户端传入的是reset
	else if (request.url === '/reset') {
		store = [];
		var result = {};
		result.success = true;
		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.end(JSON.stringify(result));
	}
	//如果用户在url输入栏加入 ?username=abc
	else if (request.url.match(/^\/\?username=(.*)$/) != null) {
		var name = request.url.match(/^\/\?username=(.*)$/)[1];
		var find = -1;
		for (var i = 0; i < store.length; i++) {
			if (store[i].username === name) {
				find = i;
				break;
			}
		}
		if (find !== -1) {
			render_detail(store[find], function(err, data) {
				if (err) {
					console.log(err);
				}
				response.writeHead(200, {
					"Content-Type": "text/html"
				});
				response.end(data);
			});
		} else {
			response.statusCode = 301;
			response.setHeader('Location', '/');
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			response.setHeader("Expires", "0");
			response.end();
		}
	} else Response(response, '.' + request.url);

});
server.listen(8000);
console.log("8000 server is listening");
//传入文件函数
var Response = function(response, filePath) {
	fs.readFile(filePath, function(err, data) {
		if (err) {
			response.writeHead(404, {
				"Content-type": "text/plain"
			});
			response.end('404 file is not found!!');
		}
		var fName = path.extname(filePath).substring(1); // 获得文件扩展名
		if (fName != "css" && fName != "html" && fName != "js") {
			response.writeHead(200, {
				"Content-type": "image/" + fName
			});
			response.end(data);
		} else {
			response.writeHead(200, {
				"Content-type": "text/" + fName
			});
			response.end(data.toString('utf-8'));
		}
	});
};

//用于显示detail.html的内容
function render_detail(parse_data, callback) {
	fs.readFile(path.join(__dirname, '', 'detail.html'), 'utf-8', function(err, data) {
		if (err) {
			callback(err, null);
		} else {
			// console.log(data);  //拿到整个页面的数据，替换
			data = data.replace('_username', parse_data.username);
			data = data.replace('_usernumber', parse_data.usernumber);
			data = data.replace('_userphone', parse_data.userphone);
			data = data.replace('_useremail', parse_data.useremail);
			callback(null, data);
		}
	})
}