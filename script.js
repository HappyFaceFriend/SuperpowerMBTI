var data = `#맨날 지나치던 포장마차 떡볶이가 5천원 세일 중! 당신의 선택은?
개이득! 바로 사버린다.
원래 안먹으니까 무시한다.
나중에 더 싸게 팔때 산다.
#발이 문에 찍혔을때
나를 욕한다
발을 욕한다
신을 욕한다
친구한테 전화해서 욕한다
#나는
남자다
여자다`;



function loadFile(filePath) {
  var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    var allText="";
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    //rawFile.send(null);
    return allText;
}
var quizData = [];
var numOfQuiz = 0;
var slider = null;
var answerData=[];
var widthOfItem = 500;
var marginOfSlider = 0;
function start()
{
  slider = document.getElementById("qna_slider");
  marginOfSlider -= widthOfItem;
  slider.style.marginLeft = "" + marginOfSlider + "px";
}
function answerSelected(question,answer)
{
  var but = document.getElementById(""+question+"_"+answerData[question]);
  if(but != null)
    but.classList.remove("selected");

  answerData[question] = answer;

  but = document.getElementById(""+question+"_"+answer);
  but.classList.add("selected");

  marginOfSlider -= widthOfItem;
  slider.style.marginLeft = "" + marginOfSlider + "px";

}

window.addEventListener('DOMContentLoaded', function(){
/*  var rawData = loadFile("data.txt");
    alert(rawData);
*/
  var rawData = data;
  var sentances = rawData.split('\n');
  for (var i =0; i<sentances.length; i++) {
    let text = sentances[i];
    if(text[0]=='#')  {
      quizData.push([text.slice(1)]);
      numOfQuiz++;
      answerData.push(-1);
    }
    else {
      quizData[numOfQuiz-1].push(text);
    }
  }

  var slider = document.getElementById("qna_slider");
  for(var i=0; i<quizData.length; i++)
  {
    var htmlData = "<li><div id=\"question\">"+
                      quizData[i][0]+"</div><div id = \"answer\">";
    for(var j=1; j<quizData[i].length; j++)
      htmlData +="<button class=\"answers\" id = \""+i+"_"+(j-1)+"\"onclick=\"answerSelected("+i+","+(j-1)+")\">"+quizData[i][j]+"</button>";
    htmlData +="</div></li>";
    slider.innerHTML += htmlData;
  }
  slider.style.width = ""+ widthOfItem * (quizData.length + 1) + "px";
});
