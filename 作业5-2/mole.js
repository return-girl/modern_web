/*
文档说明：stop的功能设置为暂停，个人觉得这个功能较为符合需求。
          刚进入游戏的状态由于视频没有给出，暂定为全空。
          js 格式由jsfommat调整
          欢迎指出错误。
          wzjfloor@163.com 王镇佳
          写在readme没人看..
*/

window.onload = function(argument) {

	// first create the 60 div
	var oFrag = document.createDocumentFragment();
	var odiv = document.createElement("div");
	var gamebox = document.getElementById('game');

	for (i = 0; i < 60; i++) {
		var op = document.createElement("div");
		op.className = "game_bottom_type";
		var oText = document.createTextNode("");
		op.appendChild(oText);
		oFrag.appendChild(op);
	}
	gamebox.appendChild(oFrag);

	// second do the click job.
	var time_count = document.getElementById("time_count");
	var game_on = document.getElementById("left_down");
	var score_count = document.getElementById("score_count");
	var bottom_assemble = document.getElementsByClassName("game_bottom_type");
	var start = document.getElementById("left_up");
	var score = 0;
	var time = 30;
	var end = 0;
	var timer;
	var start_game = 0;
	var stop = 0;
	var Range;

	function set_game() {
		game_on.innerHTML = "Playing";
	}

	function game_start() {
		Range = Math.round(Math.random() * 59);
		bottom_assemble[Range].className = "game_bottom_type_click";
	}

	function game_over() {
		game_on.innerHTML = "Game over";
		end = 1;
		start_game = 0;
		stop = 0;
		document.getElementsByClassName("game_bottom_type_click")[0].className = "game_bottom_type";
		alert("Game over.\nYour score is: " + score);
	}

	function set_score() {
		score = 0;
		score_count.innerHTML = "0";
	}

	function set_time() {
		if (time > 0) {
			time--;
			time_count.innerHTML = time;
		} else {
			game_over();
			clearInterval(timer);
		}
	}

	function click_bottom(event) {
		if (start_game == 1 && end == 0 && stop == 0) {
			if (event.target.className == "game_bottom_type_click") {
				score++;
				score_count.innerHTML = score;
				event.target.className = "game_bottom_type";
				game_start();
			} else {
				if (score > 0) {
				score--;
			   }
				score_count.innerHTML = score;
			}
		}
	}

	// when we click the start button
	start.addEventListener("click", function() {
		if (start_game == 0) {
			start_game = 1;
			end = 0;
			set_game();
			set_score();
			game_start();
			time_count.innerHTML = "30";
			time = 30;
			timer = setInterval(set_time, 1000);
		} else if (start_game == 1 && stop == 0) {
			stop = 1;
			clearInterval(timer);
			game_on.innerHTML = "Stop";
		} else if (start_game == 1 && stop == 1) {
			stop = 0;
			game_on.innerHTML = "Playing";
			timer = setInterval(set_time, 1000);
		}
	});

	// add event for every button.
	for (var i = 0; i < 60; i++) {
		bottom_assemble[i].addEventListener("click", click_bottom);
	}

}