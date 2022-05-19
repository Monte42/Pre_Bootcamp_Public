// VARIABLES
var playersDiv = document.getElementById('players'),
    playerDict = {topVal: 620, leftVal:410, type:"player"},
    enemiesDiv = document.getElementById('enemies'),
    enemiesDict = [
        {topVal: 20, leftVal:170, type: "enemy"},
        {topVal: 40, leftVal:290, type: "enemy"},
        {topVal: 60, leftVal:410, type: "enemy"},
        {topVal: 40, leftVal:530, type: "enemy"},
        {topVal: 20, leftVal:650, type: "enemy"},
    ],
    missileDict = [];



// FUNCTIONS
function drawMissile() {
    content = '';
    for(i=0;i<missileDict.length;i++){
        content += '<div class="missile" style="top:'+(missileDict[i].topVal)+'px; left:'+(missileDict[i].leftVal)+'px;"></div>'
    }
    document.getElementById('missiles').innerHTML = content;
}

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

function moveObjects(objDict, moveAmount){
    for(i=0;i<objDict.length;i++){
        objDict[i].topVal += moveAmount;
    }
}



// PLAYERS ACTIONS
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
    } if(e.keyCode == 32){ // fire
        if(missileDict.length%2==0){
            missileDict.push({topVal: playerDict.topVal-5, leftVal:playerDict.leftVal+34});
        } else {
            missileDict.push({topVal: playerDict.topVal-5, leftVal:playerDict.leftVal+21});
        }        
        drawMissile();
    }
}



// GAME LOOP
function gameLoop(){
    playersDiv.innerHTML = drawCharacter(playerDict);

    moveObjects(enemiesDict, 1);
    drawEnemies();

    drawMissile();
    moveObjects(missileDict,-16)

    setTimeout(gameLoop, 50)
}
gameLoop();