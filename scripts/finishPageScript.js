var mainContents = null;
var resultData = [];
var powerName = "";
var powerDisc = "";
var text2 = null;
var text3 = null;
var discription = null;
function initElements()
{
    mainContents = document.getElementById("main_contents");
    text2 = document.getElementById("text2");
    text3 = document.getElementById("text3");
    discription = document.getElementById("discription");
}
window.addEventListener('DOMContentLoaded', function(){
  initElements();
  var type = window.location.hash.slice(1);
  //var rawData = loadFile(""+type".txt");
  var rawData = rdata;
  var sentances = rawData.split('\n');
  for (var i =0; i<sentances.length; i++) {
    let text = sentances[i];
    if(text[0]=='-')
      resultData.push(text.slice(1));
    else {
      powerText = text.split('#')[0];
      powerDisc = text.split('#')[1];
    }
  }

  text2.innerHTML = powerText;
  text3.innerHTML = powerDisc;
  var tstr = "";
  for(var i=0; i<resultData.length; i++)
    tstr += "<li>"+resultData[i]+"</li>";
  discription.innerHTML = tstr;
});
window.onload = function(){

  mainContents.style.opacity = "1";
};
