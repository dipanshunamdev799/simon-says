alert ("How to play.....");
alert("1. click anywhere on the screen or press any key to start the game\n2. A tile will flash.\n3. Now click on the tile that just flashed.\n4. Now another tile will flash.\n5. Now click on the tile that was flashed before and then on the tile that just flashed.\n6. Now you move on to the next level.\n7. Keep repeating this pattern from the start! Lets see how far you can go :)");



let started = false; //false implies game not running
let level = 0;
userSeq = [];
gameSeq = [];
let boxes = {
    box1: document.querySelector(".box1"),
    box2: document.querySelector(".box2"),
    box3: document.querySelector(".box3"),
    box4: document.querySelector(".box4"),
}
function gameOver(){
    document.querySelector('h2').innerText = `Game Over!`;
    document.querySelector('h2').classList.add('danger');
    //danger class is for the red color
    setTimeout(function(){
        document.querySelector('h2').classList.remove('danger');
        document.querySelector('h2').innerText = `Press any key to start a new game!`;
        started = false;
        userSeq = [];
        gameSeq = [];
        level = 0;
        started = false;
    },1000);
}
function userFlash(box){
    box.classList.add('user-flash');
    setTimeout(()=>{
        box.classList.remove('user-flash');
    },50);
}
function randomBoxFlash(){
    box = boxes[`box${Math.floor(Math.random()*4 + 1)}`];
    box.classList.add('flash');
    setTimeout(()=>{
        box.classList.remove('flash');
    },500);
    gameSeq.push(box);
}
document.addEventListener('keydown',function(){
    if(started == false){
        document.querySelector('h2').innerText = `Level ${level}`;
        started = true;
        randomBoxFlash();
    }
});
document.addEventListener('click',function(){
    if(started == false){
        document.querySelector('h2').innerText = `Level ${level}`;
        started = true;
        randomBoxFlash();
    }
});
for(let i=1; i<=4; i++){
    let box = boxes[`box${i}`];
    box.addEventListener('click',function(){
        if(started==true){
            userSeq.push(this);
            userFlash(this);
            if(userSeq.length == gameSeq.length){
                for(let i=0; i<userSeq.length; i++){
                    if(userSeq[i]!=gameSeq[i]){
                        gameOver();
                        return;
                    }
                }
                userSeq = []
                document.querySelector('h2').innerText = `Level ${++level}`;
                randomBoxFlash();
            }else{
                for(let i=0; i<userSeq.length; i++){
                    if( userSeq[i] != gameSeq[i] || userSeq.length > gameSeq){
                        gameOver();
                        return;
                    }
                }
            }   
        }
    });
}
