var keys = document.querySelectorAll('#mycal button');
var decimalAdded = false; //避免连续输入小数点的辅助变量
var operators = ['+', '-', '*', '/'];
var end = 0;

//把 onclick event 加到所有的keys上面
for (var i = 0; i < keys.length; i++) {
  keys[i].onclick = function(e) {
    input = document.getElementById('cal_screen');
    input_value = input.value;
    var keys_value = this.innerHTML;

    if (input_value.length > 32)
      document.getElementById('cal_screen').focus();

    if (end == 1) {
      input_value = "";
      end = 0;
    }

    if (keys_value == "CE") {
      input.value = '';
      decimalAdded = false;
    }
    //实现回退back功能.
    else if (keys_value == "←") {
      input_value = input_value.replace(/.$/, '');
      input.value = input_value;
    }
    //实现计算功能
    else if (keys_value == "=") {
      input = document.getElementById('cal_screen');
      input_value = input.value;
      end = 1;
      var equation = input_value;
      //如果最后一个字符为小数点. 那么要把它去掉。
      var lastchar = equation[equation.length - 1];
      if (lastchar == '.')
        equation = equation.replace(/.$/, '');
      if (equation) {
        try {
          input.value = parseFloat(eval(equation).toFixed(8));
        } catch (exception) {
          input.value = "SYNTAX ERROR";
        }
      }
      decimalAdded = false;
    }

    //用户在以下这些条件下没法输入
    else if (operators.indexOf(keys_value) > -1) {
      // 说明有操作数进来了
      var lastchar = input_value[input_value.length - 1];
      //1.在非空的输入中连续输入操作数不被允许
      if (input_value != "" && operators.indexOf(lastchar) == -1) {
        input_value += keys_value;
        input.value = input_value;
      }
      //2.在空的输入中输入 - + 是可以的
      if (input_value == "" && (keys_value == "-" || keys_value == "+")) {
        input_value += keys_value;
        input.value = input_value;
      }
      //3.在原来最后一个已经是操作数的情况下再次输入操作数，将会更新末尾操作数
      if (operators.indexOf(lastchar) > -1 && input_value.length > 1) {
        input_value = input_value.replace(/.$/, keys_value);
        input.value = input_value;
      }
      decimalAdded = false;
    }
    //4.无法连续输入两个小数点
    else if (keys_value == ".") {
      if (!decimalAdded) {
        input_value += keys_value;
        input.value = input_value;
        decimalAdded = true;
      }
    } else {
      input_value += keys_value;
      input.value = input_value;
    }
    e.preventDefault(); // 取消事件的默认动作
  }
}

//实现键盘回车计算功能
document.getElementById('mycal').onkeydown = function() {
  if (end == 1) {
    input.value = "";
    end = 0;
  }
  if (event.keyCode == 13) {
    document.getElementById('myeval').click();
  }
}