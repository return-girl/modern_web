/*文档说明： 大换血
  1.解决了上周的居中问题.
  2.没有用position-x 和 -y
  3.只载入一张图片
  4.利用jQuery的简洁，把之前两个定位的class去掉了，用师兄讲的方法加上自己原有代码的理解，只用id和jQuery
  5.解决用百分比无法完全显示原图片的问题。
  6.解决全局变量太多问题。
  6.用心精简代码。
  wzjfloor@163.com 王镇佳
*/

/*定义全局变量并储存在一个变量中*/
var mypuzzle = {
   val_game_start: 0, val_time: 0,
   val_steps: 0,      val_near_blank: false,
   val_blank_c: 0,    val_blank_r: 0,
   val_blank_id: 0,   val_timer: 0,
   var_picture_num: 0
}

/*函数开始的地方*/
$(function (argument) {
	add_puzzle_piece();
	set_puzzle_piece();
	$('#start_game').click(function_puzzle_start);
})

/*添加16个div*/
function add_puzzle_piece() {
	var oFrag = document.createDocumentFragment();
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 4; j++) {
			var op = document.createElement("div");
			op.id = "id" + (4 * i + j);
			op.addEventListener("mouseover", puzzle_judge);
			op.addEventListener("click", puzzle_move);
		    oFrag.appendChild(op); }
	document.getElementById('game_box').appendChild(oFrag); }

/*设置16个div属性*/
function set_puzzle_piece() {
	$('#game_box div').each(function(i) {
    var x = i % 4; var y = Math.floor(i / 4);
    if (!i) $(this).css("opacity", "0");
    $(this).addClass("puzzle-piece");
    $(this).css({"background-position" : x*-100 + "px " + y*-100 + "px"});
	})
}

/*游戏开始*/
function function_puzzle_start() {
    val_start_setting();
    $('#start_game').text("重新开始");
	$('#time_num').text(mypuzzle.val_time);
    if (mypuzzle.val_timer) clearInterval(mypuzzle.val_timer);
    mypuzzle.val_timer = setInterval(set_time, 1000);
	$('#step_num').text(mypuzzle.val_steps);
	puzzle_disorganize();
}

/*变量在开始游戏后相应的设置*/
function val_start_setting() {
	mypuzzle.val_game_start = 1;
	mypuzzle.val_steps = 0;
    mypuzzle.val_blank_c = 0;
    mypuzzle.val_blank_r = 0;
    mypuzzle.val_blank_id = 0,
    mypuzzle.val_near_blank = false;
    mypuzzle.val_time = 0;
}

/*打乱顺序*/
function puzzle_disorganize() {
	var tileArray = new Array(15); for (var k = 0; k < 15; k++) tileArray[k] = k;
	var hold = 0, a_r, a_c, i;
	var ri = new Array(15); for (i = 0; i < 15; i++) ri[i] = i;
	for (var j = 0; j < 5; j++) { ri.sort(function() { return Math.random() - 0.5; });
	for (i = 0; i < 15; i += 3) { hold = tileArray[ri[i]]; tileArray[ri[i]] = tileArray[ri[i + 1]]; tileArray[ri[i + 1]] = tileArray[ri[i + 2]]; tileArray[ri[i + 2]] = hold; } }
	for (k = 0; k < 15; k++) { tileArray[k] = (tileArray[k] + 1) % 17;}
	$('#game_box div').each(function(i) { if (i) { $(this).attr("id", "id" + tileArray[i - 1]); } else $(this).attr("id", "id0"); });
}

/*在mouseover的时候就开始判断*/
function puzzle_judge(event) {
	if (mypuzzle.val_game_start) {
		var id_value = this.id;
		id_value = id_value.replace(/id/, "");
		var now_r = parseInt(id_value / 4);
		var now_c = id_value % 4;
		if (now_r == mypuzzle.val_blank_r && (Math.abs(now_c - mypuzzle.val_blank_c) == 1)) mypuzzle.val_near_blank = true;
		else if (now_c == mypuzzle.val_blank_c && (Math.abs(now_r - mypuzzle.val_blank_r) == 1)) mypuzzle.val_near_blank = true;
		else mypuzzle.val_near_blank = false;
	}
}

/*移动拼图*/
function puzzle_move(event) {
	if (mypuzzle.val_game_start && mypuzzle.val_near_blank == true) {
        mypuzzle.val_steps++; $('#step_num').text(mypuzzle.val_steps);
		var old_blank_id = "id" + mypuzzle.val_blank_id;
		var old_blank_one = document.getElementById(old_blank_id);
        old_blank_one.id = this.id;
        this.id = old_blank_id;
        mypuzzle.val_blank_id = old_blank_one.id.replace(/id/, "");
		mypuzzle.val_blank_r = parseInt(mypuzzle.val_blank_id / 4);
		mypuzzle.val_blank_c = mypuzzle.val_blank_id % 4
		if (judge_solve()) end(); } }

/*判断是否有解*/
function judge_solve() {
	var solve = true;
	$('#game_box div').each(function (i) {
		if ($(this).attr('id') != ("id" + i)) solve = false;
	})
    return solve;
}

/*函数结束*/
function end() {
    clearInterval(mypuzzle.val_timer);
    alert("You win! Thank you for playing!");
}

function set_time() {
    mypuzzle.val_time++;
    $('#time_num').text(mypuzzle.val_time);
}
