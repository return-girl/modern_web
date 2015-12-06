/* 
   文档说明：写在readme没人看
   1.打乱算法是利用逆序数相关知识产生偶排列，具体为三轮换法打乱.
   2.根据图像选择了左上作为空白块.
   3.游戏过程中可能要注意头发.细节可能不是非常明显.
   4.js中有一处用了.style ，只有一处，用来设置空白的属性.王青老师说尽量避免
     侵入式代码，网页游戏除外..

   有任何改进的建议请联系:
   wzjfloor@163.com 王镇佳
*/
var blank_c = 1;
var blank_r = 1;
var blank_id = 1;
var start = 0;
var near_blank = false;
var solve = true;
var steps;
var timer;
var time =0;

window.onload = function() {
	add_element();
	document.getElementById('start_game').addEventListener("click", begin);
}

//create 16 divs and add their class and id.
function add_element() {
	var oFrag = document.createDocumentFragment();
	var gamebox = document.getElementById('game_box');

	for (var i = 1; i <= 4; i++) {
		for (var j = 1; j <= 4; j++) {
			var op = document.createElement("div");
			op.className = "row_" + i + " col_" + j + " to_get_class";
			op.id = "b" + (4 * (i - 1) + j);
			op.addEventListener("mouseover", judge);
			op.addEventListener("click", move);
			oFrag.appendChild(op);
			if (i == 1 && j == 1) op.style.opacity = 0;
		}
	}
	gamebox.appendChild(oFrag);
}

// game begin.
function begin() {
	start = 1;
	solve = false;
	steps = 0;
    blank_c = 1;
    blank_r = 1;
    blank_id = 1;
    near_blank = false;
    time = 0;

    document.getElementById("start_game").innerText = "重新开始";
	time_count = document.getElementById("time_num");
    time_count.innerText = time;
    if (timer) clearInterval(timer);
    timer = setInterval(set_time, 1000);
	document.getElementById("step_num").innerText = steps;
	disorganize();
}

/* disorganize.

   算法引用自百度词条不可还原的拼图中实现三轮换法打乱算法
   产生对应的偶排序逆序数。
   经修改产生了2-16的一组可复原的数组
*/
function disorganize() {
	var tileArray = new Array(15);
	for (var k = 0; k < 15; k++)
		tileArray[k] = k;
	var hold = 0;
	var a_r;
	var a_c;
	var i;
	var ri = new Array(15);
	for (i = 0; i < 15; i++)
		ri[i] = i;
	for (var j = 0; j < 5; j++) {
		ri.sort(function() {
			return Math.random() - 0.5;
		});
		for (i = 0; i < 15; i += 3) {
			hold = tileArray[ri[i]];
			tileArray[ri[i]] = tileArray[ri[i + 1]];
			tileArray[ri[i + 1]] = tileArray[ri[i + 2]];
			tileArray[ri[i + 2]] = hold;
		}
	}
	for (k = 0; k < 15; k++) {
		tileArray[k] = (tileArray[k] + 2) % 17;
	}
	var puzzle_elements = document.getElementsByClassName('to_get_class');
	for (k = 1; k < 16; k++) {
		puzzle_elements[k].id = "b" + tileArray[k - 1];
	}
	puzzle_elements[0].id = "b1";
}

// when the mouseover, I judge the block's row and col the make sure 
// if there is a blank block near it for saving time.
function judge(event) {
	if (start) {
		var id_name = this.id;
		id_name = id_name.replace(/b/, "");
		now_r = parseInt((id_name - 1) / 4 + 1);
		now_c = id_name - 4 * (now_r - 1);
		if (now_r == blank_r && (Math.abs(now_c - blank_c) == 1)) near_blank = true;
		else if (now_c == blank_c && (Math.abs(now_r - blank_r) == 1)) near_blank = true;
		else near_blank = false;
	}
}

//when we click, if the block near a blank block, it should move.
function move(event) {
	if (start && near_blank == true) {
        steps++;
		document.getElementById("step_num").innerText = steps;
		var idname = "b" + blank_id;
		var blank_one = document.getElementById(idname);
        blank_one.id = this.id;
        this.id = idname;
        blank_id = blank_one.id;
        blank_id = blank_id.replace(/b/, "");
		blank_r = parseInt((blank_id - 1) / 4 + 1);
		blank_c = blank_id - 4 * (blank_r - 1);
		solve = judge_solve();
		if (solve) end();
	}

}

function judge_solve() {
	var puzzle_elements = document.getElementsByClassName('to_get_class');
	var judge_id_name;
	for (var i = 0; i < 16; i++) {
        judge_id_name = puzzle_elements[i].id;
        judge_id_name = judge_id_name.replace(/b/, "");
		if (judge_id_name != (i + 1)) return false;
	}
	return true;
}

function set_time() {
    time++;
    time_count.innerText = time;
}

function end() {
    clearInterval(timer);
    alert("You win! Thank you for playing!");
} 