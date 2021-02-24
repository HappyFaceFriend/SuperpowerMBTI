var data = `#수업시간에 메모한 시험범위를 잃어버렸다! 당신은
E같이 수업을 듣는 친구들에게 물어본다
I학교페이지에 들어가 시험범위를 찾아본다
#친구들과 술자리에서 나는
I들어주면서 리액션 많이하는 타입
E내가 먼저 화제를 꺼내는 타입
#갑자기 생긴 휴일의 당신은
I하루종일 누워서 유튜브를 본다
E일단 그날 시간 되는 친구가 있는지 물어본다
#여행 계획을 세운다면
S시간, 장소 단위로 최대한 자세히 세운다
N그날 뭐할지 정도만 정해둔다
#나는 다른사람보다
S성실하고 꼼꼼하다
N창의적이고 유연하다
#처음 해보는 일을 할 때
S다른 사람들이 어떻게 하는지 참고한다
N일단 부딛혀보고 내 방식대로 한다
#일을 하다가 작지만 아리송한 부분이 생겼을 때
J시간이 걸려도 도움을 청한다
P일단 할 수 있는 대로 하고 넘어간다
#늦은 시간,영화 한편만 보고 자려했는데 잠이 안온다. 나는
P한편 더 보고 자면 된다.
J그래도 내일 일정이 있으니 억지로라도 자야한다.
#나는 일을 할 때
J나만의 계획을 세우고 그대로 실행한다.
P일단 눈 앞에 보이는 일 먼저 처리한다.
#드라마나 소설을 볼 때
T일어난 사건들을 중심으로 본다
F내가 인물에게 몰입해 공감하며 본다
#갑자기 친구가 다른 친구와 생긴 문제를 이야기한다. 우선
T어쩌다 문제가 생겼는지 알아낸다
F친구의 기분을 먼저 풀어준다
#고급 레스토랑에서 맛있는 음식을 먹고난 뒤
T아무리 맛있어도 비싸서 별로인 것같다
F좀 비싸도 맛있으니까 만족이다`;



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
var widthOfItem = 350;
var currentCard = 0;
var progressText = null;
var progressDiv = null;
var mainContents = null;
var progressBar = null;
var backButton = null;
var mbtiData = {'E':0, 'I':0, 'S':0, 'N':0, 'T':0, 'F':0, 'J':0,  'P':0};
var mbti = "";
function moveSlider(dir)
{
  var player = slider.animate([
    {transform: "translate("+(currentCard * -widthOfItem)+"px,0px)"},
    {transform: "translate("+((currentCard+dir) * -widthOfItem)+"px,0px)"}
  ], {duration:360, easing:"ease-out"});
  player.addEventListener("finish",function(){
    slider.style.transform="translate("+((currentCard * -widthOfItem))+"px,0px)";
  });
  currentCard += dir;

  if(currentCard !=0 && currentCard != numOfQuiz)
    backButton.style.display = "block";
  else
    backButton.style.display="none";

  if(currentCard == numOfQuiz)
  {
    progressText.innerHTML = "";
    mainContents.style.opacity = "0";
    setTimeout(finish,400);

    for(var i=0; i<answerData.length; i++)
    {
      mbtiData[ quizData[i][answerData[i]+1][1] ] ++;
    }
    mbti += putMBTI('E','I') + putMBTI('S','N') + putMBTI('T','F') + putMBTI('J','P');
    return;
  }

  progressText.innerHTML = ""+(currentCard+1)+"/"+numOfQuiz;
  progressBar.style.width = ""+(100*(currentCard+1)/numOfQuiz)+"%";

}
function putMBTI(a,b)
{

  if(mbtiData[a] > mbtiData[b])
    return a;
  else
    return b;
}
function finish(){
  window.location.href = "finish.html#"+mbti;
}
function start()
{
  slider = document.getElementById("qna_slider");
  progressText = document.getElementById("progressText");
  progressDiv = document.getElementById("progressDiv");
  mainContents = document.getElementById("main_contents");
  progressBar = document.getElementById("progressValue");
  backButton = document.getElementById("prevButton");
}
function answerSelected(question,answer)
{
  var but = document.getElementById(""+question+"_"+answerData[question]);
  if(but != null)
    but.classList.remove("selected");

  answerData[question] = answer;

  but = document.getElementById(""+question+"_"+answer);
  but.classList.add("selected");

  moveSlider(+1);

}

window.addEventListener('DOMContentLoaded', function(){
/*  var rawData = loadFile("data.txt");
    alert(rawData);
*/

start();
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
      quizData[numOfQuiz-1].push( [text.slice(1),text[0]]);
    }
  }

  var slider = document.getElementById("qna_slider");
  for(var i=0; i<quizData.length; i++)
  {
    var htmlData = "<li><div id=\"question\">"+
                      quizData[i][0]+"</div><div id = \"answer\">";
    for(var j=1; j<quizData[i].length; j++)
      htmlData +="<button class=\"answers\" id = \""+i+"_"+(j-1)+"\"onclick=\"answerSelected("+i+","+(j-1)+")\">"+quizData[i][j][0]+"</button>";
    htmlData +="</div></li>";
    slider.innerHTML += htmlData;
  }
  slider.style.width = ""+ widthOfItem * (quizData.length) + "px";
    progressText.innerHTML = ""+(currentCard+1)+"/"+numOfQuiz;
    progressBar.style.width = ""+(100*(currentCard+1)/numOfQuiz)+"%";

});

window.onload = function()  {

      mainContents.style.opacity = "1";
}
