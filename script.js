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

window.onload = function()  {
  var text = loadFile("data.txt");
  alert(text);
}
