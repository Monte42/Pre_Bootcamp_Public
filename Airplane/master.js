var playersDiv = document.getElementById('players'),
    playerDict = {topVal: 620, leftVal:410, type:"player"},
    enemiesDiv = document.getElementById('enemies'),
    enemiesDict = [
        {topVal: 20, leftVal:170, type: "enemy"},
        {topVal: 40, leftVal:290, type: "enemy"},
        {topVal: 60, leftVal:410, type: "enemy"},
        {topVal: 40, leftVal:530, type: "enemy"},
        {topVal: 20, leftVal:650, type: "enemy"},
    ]

function drawCharacter(character){
    content = "<div class='character "+character.type+"' style='top:"+character.topVal+"px; left:"+character.leftVal+"px;'></div>";
    return content;
}

function drawEnemies(){
    content = '';
    for(i=0;i<enemiesDict.length;i++){
        content += drawCharacter(enemiesDict[i]);
    }
    enemiesDiv.innerHTML = content;
}

document.onkeydown = function (e){
    if(e.keyCode == 40 && playerDict.topVal<620){ // down
            playerDict.topVal+=5;
            playersDiv.innerHTML = drawCharacter(playerDict);
    } if(e.keyCode == 38 && playerDict.topVal>466){ // up
            playerDict.topVal-=5;
            playersDiv.innerHTML = drawCharacter(playerDict);
    } if(e.keyCode == 37 && playerDict.leftVal>10){ // left
            playerDict.leftVal-=5;
            playersDiv.innerHTML = drawCharacter(playerDict);
    } if(e.keyCode == 39 && playerDict.leftVal<840){ // right
            playerDict.leftVal+=5;
            playersDiv.innerHTML = drawCharacter(playerDict);
    } if(e.keyCode == 32){

    }
}

playersDiv.innerHTML = drawCharacter(playerDict);
drawEnemies();

setInterval(function(){
    for(i=0;i<enemiesDict.length;i++){
        enemiesDict[i].topVal +=2;
    }
    drawEnemies();
},30)