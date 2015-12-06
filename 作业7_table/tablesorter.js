// $(function() {
   $('table').each(function() {
      var ths = $(this).find('thead tr th'), tbodys = $(this).find('tbody');
      if (ths.length == 0)
         ths = $(this).find('thead tr td');
      makeTableSortable(ths, tbodys);
   });
// });

function makeTableSortable(ths, tbodys) {
   ths.click(function(){
      var arr = new Array();
      for (var j in tbodys[0].rows) // get tbody's rows and store in a array
         arr[j] = tbodys[0].rows[j];
      changeClass(arr, $(this), ths);
      tbodys.empty();  // remove old tbody
      tbodys.append(arr);
   });
}

function changeClass(arr, th, ths) {
   if (th.attr('class') != 'ascend' && th.attr('class') != 'descend') {
      $(ths).removeAttr('class');
      th.attr('class', 'ascend');
      arr.sort(cmp(th[0].cellIndex));
   } else {  //the table has been sorted, just reverse it
      th.attr('class', (th.hasClass('ascend') ? 'descend' : 'ascend'));
      arr.reverse();
   }
}

function cmp (col) {
   return function (x, y) {
      var xText = x.cells[col].textContent.toLowerCase(),
         yText = y.cells[col].textContent.toLowerCase();
      if (!isNaN(xText) && !isNaN(yText))   // x, y are number
         return (xText - yText);
      return (xText > yText ? 1 : -1);
   }
}