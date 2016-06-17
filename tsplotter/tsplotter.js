function quandl_button_cb() {
  var key = prompt("Enter your quandl.com API key", thePage.quandl_key);
  if (key !== null) {
    thePage.quandl_key = key;
  }
}

function copy_link_button_cb() {
  var permalink = thePage.make_permalink();

  var chart = HTML.chart_elem();
  chart.style.visibility = "hidden";

  // show, select, copy
  var perma = HTML.perma_link_elem();
  perma.style.visibility = "visible";
  perma.innerHTML = permalink;
  var range = document.createRange();
  range.selectNode(perma);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');

  // put it back
  chart.style.visibility = "visible";
  perma.style.visibility = "hidden";
}

function search_button_cb() {
  var term = document.getElementById("search-box").value;
  term = encodeURIComponent(term);
  var url = "https://www.quandl.com/search?query=" + term + "&type=free";
  var win = window.open(url, '_blank');
  win.focus();
}

function help_button_cb() {
  var url = "tsplotter/user_manual.html";
  var win = window.open(url, '_blank');
  win.focus();
}

// called after google charts and jquery DOM are ready
function init() {
  websocket_connect("9002"); // used for sending data programatic
  thePage.google_charts_loaded();
}

/*
 * EXECUTION STARTS HERE
 */
$(document).ready(function() {
  thePage = new Page();

  HTML.make_layout();
  HTML.make_file_load_button();

  google.charts.load('current', {
    'packages': ['charteditor'],
    'callback': init
  });
});