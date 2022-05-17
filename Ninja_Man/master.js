// VARIABLES
    // collect page elements
var world = document.getElementById('world'),
    ninja = document.getElementById('ninjaman'),
    pinky = document.getElementById('pinky'),
    bluey = document.getElementById('bluey'),
    pumpky = document.getElementById('pumpky'),
    red = document.getElementById('red');
    // establish world data
    worldMap = [],
    worldDict = {
        0: 'blank',
        1: 'wall',
        2: 'sushi',
        3: 'onigiri',
    },
    // Character data
    ninjaDict = {
        x: 1,
        y: 1,
        score: 0,
        lives: 3,
    },
    pinkyDict = {
        x:10,
        y:10,
    },
    blueyDict = {
        x:10,
        y:5,
    },
    pumpkDict = {
        x:2,
        y:12,
    },
    redDict = {
        x:10,
        y:2,
    };



// CHARACTER FUNCTIONS
function drawCharacter(characterElm,characterDict){ // reposition both ninja & ghost
    characterElm.style.top = characterDict.y * 40 +'px';
    characterElm.style.left = characterDict.x * 40 +'px';
}

function moveCharacter(characterDict,axis,direction){ // updates both ninja and ghost dictionary
    if(axis=="x"){
        if(direction==1){
            if(worldMap[characterDict.y][characterDict.x+1]!=1){
                characterDict.x++
            }
        } else if(direction==-1) {
            if(worldMap[characterDict.y][characterDict.x-1]!=1){
                characterDict.x--
            }
        }
    } else {
        if(direction==1){
            if(worldMap[characterDict.y+1][characterDict.x]!=1){
                characterDict.y++
            }
        } else if(direction==-1) {
            if(worldMap[characterDict.y-1][characterDict.x]!=1){
                characterDict.y--
            }
        }
    }
}



// Players Actions
document.onkeydown = function(e){
    if(e.keyCode == 40){ // down
        moveCharacter(ninjaDict,"y",1);
    } if(e.keyCode == 38){ // up
        moveCharacter(ninjaDict,"y",-1);
    } if(e.keyCode == 37){ // left
        moveCharacter(ninjaDict,"x",-1)
    } if(e.keyCode == 39){ // right
        moveCharacter(ninjaDict,"x",1)
    } if(worldMap[ninjaDict.y][ninjaDict.x] == 2){
        ninjaDict.score += 2;
    } if(worldMap[ninjaDict.y][ninjaDict.x] == 3){
        ninjaDict.score += 5;
    }
    worldMap[ninjaDict.y][ninjaDict.x] = 0;
    drawWorld();
    drawCharacter(ninja,ninjaDict);
}





// CODE FOR WORLD
function drawWorld(){ // adds world data to html, reveal characters, and switchs from front page to game page
    var output = "";
    for(var row=0; row<worldMap.length; row++){
        output += "<div class = 'row'>";
        for(var x=0;x<worldMap[row].length; x++){
            output += "<div class = 'space "+worldDict[worldMap[row][x]]+"'></div>";
        }
        output += "</div>"
    }
    output += "<h3>Score: "+ninjaDict.score+" - Lives: "+ninjaDict.lives+"</h3>";
    world.innerHTML = output;
    world.classList.remove('hidden');
    ninja.classList.remove('hidden');
    pinky.classList.remove('hidden');
    bluey.classList.remove('hidden');
    pumpky.classList.remove('hidden');
    red.classList.remove('hidden');
    document.getElementById('preGame').classList.add('hidden');
    drawCharacter(ninja,ninjaDict);
}

function randomWorld(){ // generates random world
    worldMap.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
    for(var newRow=0; newRow<18; newRow++){
        newArr = [];
        for (var newSpace=0; newSpace<20; newSpace++) {
            if(newSpace == 0 || newSpace == 19){
                newArr.push(1);
            } else {
                var num = Math.floor(Math.random()*(3-1+1)+1);
                newArr.push(num);
            }
        }
        worldMap.push(newArr);
    }
    worldMap.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
}




// CODE FOR GHOST
function ghostKillsNinja(goshtDict){ // ghost kills player when ghost overlaps ninja
    if(ninjaDict.x == goshtDict.x && ninjaDict.y == goshtDict.y){
        ninjaDict.x = 1;
        ninjaDict.y = 1;
        ninjaDict.lives--;
        gameOver();
        drawCharacter(ninja, ninjaDict);
    }
}

function moveGhost(characterDict){ // ghost chases player
    var num = Math.floor(Math.random()*(2-1+1)+1),
        gx = characterDict.x,
        gy = characterDict.y,
        nx = ninjaDict.x,
        ny = ninjaDict.y;
    if(num==1){ // move gohst x axis
        if(nx>gx){
            moveCharacter(characterDict,"x",1);
        } else {
            moveCharacter(characterDict,"x",-1);
        }
    } else if(num==2){ // move gohst y axis
        if(ny>gy){
            moveCharacter(characterDict,"y",1);
        } else {
            moveCharacter(characterDict,"y",-1);
        }
    }
}



// GAME FUNCTIONS
function startGame(){ // starts the game
    setInterval(function(){
        drawCharacter(pinky,pinkyDict);
        moveGhost(pinkyDict);
        ghostKillsNinja(pinkyDict);
        drawCharacter(bluey,blueyDict);
        moveGhost(blueyDict);
        ghostKillsNinja(blueyDict);
        drawCharacter(pumpky,pumpkDict);
        moveGhost(pumpkDict);
        ghostKillsNinja(pumpkDict);
        drawCharacter(red,redDict);
        moveGhost(redDict);
        ghostKillsNinja(redDict);
    }, 1000);
}

function gamechange(){ // sets ghost image to "scaredy" & quickens pace
    clearInterval(startGame);
    pinky.style.backgroundImage=("url('img/scaredy.png')");
    pumpky.style.backgroundImage=("url('img/scaredy.png')");
    bluey.style.backgroundImage=("url('img/scaredy.png')");
    red.style.backgroundImage=("url('img/scaredy.png')");
    setInterval(function(){
        drawCharacter(pinky,pinkyDict);
        moveGhost(pinkyDict);
        ghostKillsNinja(pinkyDict);
        drawCharacter(bluey,blueyDict);
        moveGhost(blueyDict);
        ghostKillsNinja(blueyDict);
        drawCharacter(pumpky,pumpkDict);
        moveGhost(pumpkDict);
        ghostKillsNinja(pumpkDict);
        drawCharacter(red,redDict);
        moveGhost(redDict);
        ghostKillsNinja(redDict);
    }, 500);
}

setTimeout(gamechange, 60000);// clears normal pace & calls function to change pace

function gameOver(){ // swithes from game page to Game Over page
    if(ninjaDict.lives <= 0){
        world.classList.add('hidden');
        document.getElementById('gameOver').classList.remove('hidden');
        ninja.classList.add("hidden");
        pinky.classList.add('hidden');
        bluey.classList.add('hidden');
        red.classList.add('hidden');
        pumpky.classList.add('hidden');
    }
}

function reloadGame(){
    location.reload();
}

