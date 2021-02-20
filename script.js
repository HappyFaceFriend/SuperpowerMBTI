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
    rawFile.send(null);
    return allText;
}
var quizData = [];
var numOfQuiz = 0;
window.addEventListener('DOMContentLoaded', function(){
  var rawData = loadFile("data.txt");
  var sentances = rawData.split('\n');
  for (text in sentances) {
    alert(text);
    if(text[0]=='#')  {
      quizData.append([text.slice(1)]);
      numOfQuiz++;
    }
    else {
      quizData[numOfQuiz-1].append(text);
    }
  }
});

var pos = 0;
