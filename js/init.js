$(function () {
  if (window.matchMedia("(max-width: 992px)").matches) {
    $("#header").load("header.html");
  }
  $("#footer").load("footer.html");

});

