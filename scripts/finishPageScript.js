var mainContents = null;
var features = [];
var powerName = ["","",""];
var powerDisc = ["","",""];
var harmony=[];
var text2 = null;
var text3 = null;
var discription = null;
var resultImage = null;
var goodImage = null;
var badImage = null;
var goodPower = null;
var badPower = null;
function initElements()
{
    mainContents = document.getElementById("main_contents");
    text2 = document.getElementById("text2");
    text3 = document.getElementById("text3");
    discription = document.getElementById("discription");
    resultImage = document.getElementById("resultImage");
    goodImage = document.getElementById("goodImage");
    badImage = document.getElementById("badImage");
    goodPower = document.getElementById("goodPower");
    badPower = document.getElementById("badPower");
}
window.addEventListener('DOMContentLoaded', function(){
  initElements();
  var type = window.location.hash.slice(1);
  //var rawData = loadFile("results/"+type+".txt");
  var rawData = rdata;
  var hData = hdata;
  var sentances = rdata.split('\n');
  for (var i =0; i<sentances.length; i++) {
      features.push(sentances[i].slice(1));
  }
  sentances = hData.split('\n');
  for(var i=0; i<sentances.length; i++) {
    var words = sentances[i].split('#');
    if(words[0] == type)
    {
      harmony.push(words[1]);
      harmony.push(words[2]);
    }
  }
  var pData = pdata;
  sentances = pData.split('\n');
  for(var i=0; i<sentances.length; i++) {
    var words = sentances[i].split('#');
    if(words[0] == type)
    {
      powerName[0] = words[1];
      powerDisc[0] = words[2];
    }
    else if(words[0] == harmony[0])
    {
      powerName[1] = words[1];
      powerDisc[1] = words[2];
    }
    else if(words[0] == harmony[1])
    {
      powerName[2] = words[1];
      powerDisc[2] = words[2];
    }
  }

  text2.innerHTML = powerName[0];
  text3.innerHTML = powerDisc[0];
  goodPower.innerHTML = powerName[1];
  badPower.innerHTML = powerName[2];
  var tstr = "";
  for(var i=0; i<features.length; i++)
    tstr += "<li>"+features[i]+"</li>";
  discription.innerHTML = tstr;

  resultImage.src = "images/results/"+type+".jpg";
  goodImage.src = "images/results/"+harmony[0]+".jpg";
  badImage.src = "images/results/"+harmony[1]+".jpg";


});

function loadImage(path, id)
{
  var img = document.createElement("img");
  img.setAttribute("src",path);
  img.id = id;
  return img;
}
window.onload = function(){

  mainContents.style.opacity = "1";
};
