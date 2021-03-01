var mainContents = null;

window.addEventListener('DOMContentLoaded', function(){
  mainContents = document.getElementById("main_contents");
});
window.onload = function(){

  mainContents.style.opacity = "1";
};

function start() {
  mainContents.style.opacity = "0";
  setTimeout(quiz,400);
}

function quiz(){
  window.location.href = "quiz.html";
}
