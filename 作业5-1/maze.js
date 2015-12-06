/*
文档说明：不经过S而直接到E提示不要作弊的功能让人费解。
          然，根据评论我还是做了。
          分块上由于老师没有明确要求于是以简单为原则分成五块。
          回答评论：
          鼠标碰到块，block变红持续多久的问题，根据评论我重新看了视频，觉得
          老师的应该是移动后就马上变回原来的颜色的，所以没改.

          js 格式由jsfommat调整
          欢迎指出错误。
          wzjfloor@163.com 王镇佳
          写在readme没人看..
*/
window.onload = function() {

  var wall_num = document.getElementsByClassName("wall");
  var sec_sen = document.getElementById("second_sen");
  var blocks = document.getElementById("block_s");
  var blocke = document.getElementById("block_e");
  var prevent_cheat = document.getElementById("prevent_cheating");

  var had_begin = 0;
  var cheated = 1;
  var lose = 0;
  var win = 0;
  var had_cheated = 0;

  function turn_red(event) {
    if (win != 1 && lose != 1 && had_cheated == 0) {
      event.target.className = event.target.className.replace(/wall_1 wall/, "wall_2 wall");
      sec_sen.innerHTML = "You Lose!"
      lose = 1;
    }
  }

  function turn_grey(event) {
    event.target.className = event.target.className.replace(/wall_2 wall/, "wall_1 wall");
  }

  function begin(event) {
    for (var i = 0; i < wall_num.length; i++) {
      wall_num[i].addEventListener("mouseover", turn_red);
      wall_num[i].addEventListener("mouseout", turn_grey);
    }
    prevent_cheat.addEventListener("mouseover", function() {
      cheated = 0;
    });
    had_begin = 1;
    win = 0;
    lose = 0;
    cheated = 1;
    help_value = 1;
    had_cheated = 0;
    sec_sen.innerHTML = "";
  }

  function end(event) {
    if ((had_begin && lose == 0 && cheated == 1)||had_begin==0) {
      sec_sen.innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
      had_cheated = 1;
    } else if (had_begin && cheated == 0 && lose == 0 && had_cheated == 0) {
      sec_sen.innerHTML = "You Win!";
      win = 1;
    }
  }

  blocks.addEventListener("mouseover", begin);
  blocke.addEventListener("mouseover", end);
}