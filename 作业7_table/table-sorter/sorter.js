/*对表格排序不熟悉的我一开始走了许多弯路，实现了作业要求，但是无法做出在网页用
  一行代码实现排序，后来参考前人写好的tablesorter.js
  学习其中优秀的函数结构以及部分代码实现,算是学习，
  特此声明.
  参考来源:tablesorter.js
  https://rawgit.com/nevershow/Web/master/table-sorter/sorter.js
*/

//加载完成后
$(function() {
	$("tr:even").addClass("even_style");
	$('table').each(function() {
		var click_th = $(this).find("thead tr th"),
			tbodys = $(this).find('tbody');
		make_Table_Sortable(click_th, tbodys); //调用排序函数
	})
});

function make_Table_Sortable(click_th, tbodys) {
	click_th.click(function() {
		var arr = new Array();
		for (var j in tbodys[0].rows) arr[j] = tbodys[0].rows[j];
		changeClass(arr, $(this), click_th); //把tbody的数据传进去下一个函数，进行排序以及交换th的类
		tbodys.empty();
		tbodys.append(arr);
		$("tr").removeClass("even_style");
		$("tr:even").addClass("even_style");
	});
}

function changeClass(arr, th, click_th) {
	if (th.attr('class') != 'ascend' && th.attr('class') != 'descend') {
		$(click_th).removeAttr('class');
		th.attr('class', 'ascend');
		arr.sort(cmp(th[0].cellIndex));
	} else { //如果表格已经是asend或者是descend，那么就只要将数组倒过来就好。
		th.attr('class', (th.hasClass('ascend') ? 'descend' : 'ascend'));
		arr.reverse();
	}
}

function cmp(col) {
	return function(x, y) {
		var xText = x.cells[col].textContent.toLowerCase(),
			yText = y.cells[col].textContent.toLowerCase();
		if (!isNaN(xText) && !isNaN(yText)) // x, y are number
			return (xText - yText);
		return (xText > yText ? 1 : -1);
	}
}