var player1 = document.getElementById("player1")
var player2 = document.getElementById("player2")
var number1 = document.getElementById("number1")
var number2 = document.getElementById("number2")
var count1 = 10
var count2 = 10
var counter1 = 0
var counter2 = 0
var score1 = document.getElementById("score1")
var score2 = document.getElementById("score2")
score1.textContent = ("Score: " + counter1)
score2.textContent = ("Score: " + counter2)
number1.textContent = ("Bullet: " + count1)
number2.textContent = ("Bullet: " + count2)
var winner = document.getElementById("winner")
var countdown = 3
var limitbox = document.getElementById("limit-box")
var limit = document.getElementById("limit")
var limitbutton = document.getElementById("submit")
var limitcounter
var limitscore = document.getElementById("limit-score")

var x = 250;
var x1 = 250;
var bulletx = window.innerHeight

player1.style.top = x + "px";
player2.style.top = x1 + "px";

function createBullet(color){
    if(count1 >= 0 && count2 >= 0){
         if(color == "red"){
            var bullet1 = document.createElement("div")
            bullet1.classList.add("bullet1")
            var bullet1x = x
            bullet1.style.top = (bullet1x + 50 + "px")

            document.body.appendChild(bullet1)
            setTimeout(function(){
                document.body.removeChild(bullet1)
            }, 1000)
            setTimeout(function(){
                if(bullet1x >= x1 - 50 && bullet1x <= x1 + 50){
                    winner.style.animationName = ""
                    winner.textContent = "+1"
                    winner.style.color = "red"
                    winner.style.animationName = "animation"
                    winner.style.animationDuration = "0.5s"
                    winner.style.animationIterationCount = "1"
                    setTimeout(function(){
                        winner.textContent = ""
                        winner.style.animationName = ""
                    }, 1000)
                    counter1 += 1
                    score1.textContent = ("Score: " + counter1)
                    count1 = 10
                    count2 = 10
                    number1.textContent = ("Bullet: " + count1)
                    number2.textContent = ("Bullet: " + count2)
                }
            },900)
        }if(color == "blue"){
            var bullet2 = document.createElement("div")
            bullet2.classList.add("bullet2")
            var bullet2x = x1
            bullet2.style.top = (bullet2x + 50 + "px")

            document.body.appendChild(bullet2)
            setTimeout(function(){
                document.body.removeChild(bullet2)
            }, 1000)
            setTimeout(function(){
                if(bullet2x >= x - 50 && bullet2x <= x + 50){
                    winner.style.animationName = ""
                    winner.textContent = "+1"
                    winner.style.color = "blue"
                    winner.style.animationName = "animation"
                    winner.style.animationDuration = "0.5s"
                    winner.style.animationIterationCount = "1"
                    setTimeout(function(){
                        winner.textContent = ""
                        winner.style.animationName = ""
                    }, 1000)
                    counter2 += 1
                    score2.textContent = ("Score: " + counter2)
                    count1 = 10
                    count2 = 10
                    number1.textContent = ("Bullet: " + count1)
                    number2.textContent = ("Bullet: " + count2)
                }
            },900)
        }
    }
    else{
        alert("shit, we're out of ammo!")
        count1 = 10
        count2 = 10
        number1.textContent = ("Bullet: " + count1)
        number2.textContent = ("Bullet: " + count2)
    }
}

function updatePosition(event) {
    if(x >= 0){
        if (event.key === "z") {
            x -= 20;
            player1.style.top = x + "px";
        }
        }
        if(x < window.innerHeight - 132){
            if (event.key === "s") {
                x += 20;
                player1.style.top = x + "px";
            }
        }
        if(x1 > 0){
            if (event.key === "ArrowUp") {
                x1 -= 20;
                player2.style.top = x1 + "px";
            }
        }
        if(x1 < window.innerHeight - 132){
            if (event.key === "ArrowDown") {
                x1 += 20;
                player2.style.top = x1 + "px";
            }
        }
        if(event.key === "t"){
            count1 -= 1
            number1.textContent = ("Bullet: " + count1)
            if(counter1 == limitcounter || counter2 == limitcounter && counter1 > counter2){
                winner.style.color = "red"
                winner.style.animationName = "animation"
                winner.style.animaionDuration = "1s"
                winner.style.iterationCount = "1"
                winner.textContent = "red is winner"
                setTimeout(function(){
                    winner.textContent = "none"
                    start()
                }, 500)
            }
            if(counter1 == limitcounter || counter2 == limitcounter && counter2 > counter1){
                winner.style.color = "red"
                winner.style.animationName = "animation"
                winner.style.animaionDuration = "1s"
                winner.style.iterationCount = "1"
                winner.textContent = "red is winner"
                setTimeout(function(){
                    winner.textContent = "none"
                    start()
                }, 500)
            }
            else{
                createBullet("red")
            }
        }
        if(event.key === "m"){
            count2 -= 1
            number2.textContent = ("Bullet: " + count2)
            if(counter1 == limitcounter || counter2 == limitcounter && counter1 > counter2){
                winner.style.color = "red"
                winner.style.animationName = "animation"
                winner.style.animaionDuration = "1s"
                winner.style.iterationCount = "1"
                winner.textContent = "red is winner"
                setTimeout(function(){
                    winner.textContent = "none"
                    start()
                }, 500)
            }
            if(counter1 == limitcounter || counter2 == limitcounter && counter2 > counter1){
                winner.style.color = "red"
                winner.style.animationName = "animation"
                winner.style.animaionDuration = "1s"
                winner.style.iterationCount = "1"
                winner.textContent = "red is winner"
                setTimeout(function(){
                    winner.textContent = "none"
                    start()
                }, 500)
            }
            else{
                createBullet("blue")
            }
        }
}

function start(){
    limitbox.style.display = "flex"
    limitcounter = limit.value
    limitbutton.style.bottom = "40px"
    limitbutton.style.boxShadow = "0 10px 0 white"
    limitbutton.addEventListener("click",function(){
        limitcounter = limit.value
        limitbutton.style.bottom = "30px"
        limitbutton.style.boxShadow = "0 0 0 white"
        setTimeout(function(){
            limitbox.style.display = "none"
            limitscore.textContent = "limit: " + limitcounter
            countdownfunc()
        }, 500)
    })
}

function countdownfunc(){
    if(countdown > -1){
        setTimeout(function(){
            winner.textContent = countdown
            countdown--
            countdownfunc()
        }, 1000)
    }
    else{
        winner.textContent = ""
        document.addEventListener("keydown", updatePosition)
    }
}

start()