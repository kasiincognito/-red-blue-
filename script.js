function startGame(){
    myGameArea.start()
    laser = new sound("shot.mp3")
    explosion = new sound("explosion.mp3")
    red = new component(161, 132, "red.png", 0,  window.innerHeight / 2, "image")
    blue = new component(161, 132, "blue.png", window.innerWidth - 161, window.innerHeight / 2, "image")
    redBullets = []
    blueBullets = []
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener("keydown", function(event){
            if(event.key === "z"){
                red.move = "up"
            }
            else if(event.key === "s"){
                red.move = "down"
            }

            if(event.key === "ArrowUp"){
                blue.move = "up"
            }
            else if(event.key === "ArrowDown"){
                blue.move = "down"
            }

            if(event.key === "t"){
                redBullets.unshift(new component(100, 30, "bullet1.png", blue.width, red.y + (red.height / 2), "image"))
                laser.play()
                laser = ""
                laser = new sound("shot.mp3")
            }
            else if(event.key === "m"){
                blueBullets.unshift(new component(100, 30, "bullet2.png", window.innerWidth - blue.width, blue.y + (blue.height / 2), "image"))
                laser.play()
                laser = ""
                laser = new sound("shot.mp3")
            }
        })
        window.addEventListener("keyup", function(event){
            if(event.key === "ArrowDown" || event.key === "ArrowUp"){
                blue.move = ""
            }
            if(event.key === "z" || event.key === "s"){
                red.move = ""
            }
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type
    this.move
    if(type == "image"){
        this.image = new Image()
        this.image.src = color
    }
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.update = function(){
        ctx = myGameArea.context;
        if(this.type == "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function(){
        if(this.move == "up"){
            this.y -= 10
        }
        else if(this.move == "down"){
            this.y += 10
        }
        else{
            this.y = this.y
        }

        if(this.y <= 0){
            this.y = 0
        }
        else if(this.y + this.height >= window.innerHeight){
            this.y = window.innerHeight - this.height
        }
    }
    
    this.collideWith = function(bullet){
        if(this.x + this.width >= bullet.x && this.y <= bullet.y && this.y +this.height >= bullet.y || bullet.x <= 0){
            return true
        }
    }
}

function updateGameArea(){
    myGameArea.clear()
    if(redBullets.length > 0){
        for(var i = 0; i < redBullets.length; i++){
            redBullets[i].x += 30
            redBullets[i].update()
        }
    }
    
    if(blueBullets.length > 0){
        for(var e = 0; e < blueBullets.length; e++){
            blueBullets[e].x -= 30
            blueBullets[e].update()
        }
        for(var a = 0; a < blueBullets.length; a++){
            if(red.collideWith(blueBullets[a])){
                blueBullets.pop()
                explosion.play()
                explosion = ""
                explosion = new sound("explosion.mp3")
            }
        }
    }

    red.update()
    red.newPos()
    blue.update()
    blue.newPos()
}

function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}


startGame()