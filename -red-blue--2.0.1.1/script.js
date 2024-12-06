function startGame(){                                       // fonction pour initier le jeu
    myGameArea.start()                                      // commencement de l'objet 'myGameArea'
    laser = new sound("laser.mp3")
    explosion = new sound("explosion.mp3")
    red = new component(161, 132, "red.png", 0,  window.innerHeight / 2, "image")
    blue = new component(161, 132, "blue.png", window.innerWidth - 161, window.innerHeight / 2, "image")
    redBullets = []
    blueBullets = []
}

var myGameArea = {                                          // La variable myGameArea est un objet 'canvas'
    canvas : document.createElement("canvas"),
    start : function(){                                     // Méthode start() pour l'objet myGameArea pour créer le canvas
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context = this.canvas.getContext("2d")
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener("keydown", function(event){ // Vérification des touches claviers
            if(event.key === "z"){
                red.move = "up"     
            }
            if(event.key === "s"){
                red.move = "down"
            }

            if(event.key === "ArrowUp"){
                blue.move = "up"
            }
            if(event.key === "ArrowDown"){
                blue.move = "down"
            }

            if(event.key === "t"){
                redBullets.unshift(new component(100, 30, "bullet1.png", blue.width, red.y + (red.height / 2), "image"))
                laser.play()
                laser = ""
                laser = new sound("laser.mp3")
            }
            if(event.key === "m"){
                blueBullets.unshift(new component(100, 30, "bullet2.png", window.innerWidth - blue.width, blue.y + (blue.height / 2), "image"))
                laser.play()
                laser = ""
                laser = new sound("laser.mp3")
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
    clear : function() {                                    // Méthode de utilisée pour effacer le contenu du canvas et reremplir dans la fonction updateGameArea
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {      // une moule de base pour chaques objet que le canvas contient
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
    this.update = function(){                               // Méthode de mise à jour de chaques composants du canvas (du jeu)
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
    this.newPos = function(){                               // Méthode de mise à jour de position pour les joueurs
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
    
    this.collideWithBlue = function(bullet){                // Méthode de verification de collision pour les balles de bleu pour le joueur rouge
        if(this.x + this.width >= bullet.x && this.y <= bullet.y && this.y +this.height >= bullet.y){
            return true
        }
    }

    this.collideWithRed = function(bullet){                 // Méthode de verification de collision avec les balles de rouge pour le joueur bleu
        if(this.x <= bullet.x + bullet.width && this.y <= bullet.y && this.y +this.height >= bullet.y){
            return true
        }
    }

    this.collideWithBlueWall = function(){
        if(this.x + this.width >= window.innerWidth){
            return true
        }
    }

    this.collideWithRedWall = function(){
        if(this.x <= 0){
            return true
        }
    }
}

function updateGameArea(){                                  // Les instructions pour la fonction de mise à jour du canvas (le jeu)
    myGameArea.clear()
    if(redBullets.length > 0){
        for(var i = 0; i < redBullets.length; i++){
            redBullets[i].x += 30
            redBullets[i].update()
        }
        for(var z = 0; z < redBullets.length; z++){
            if(blue.collideWithRed(redBullets[z]) || redBullets[z].collideWithBlueWall()){
                redBullets[z].image = "explosion.png"
                explosion.play()
                explosion = ""
                explosion = new sound("explosion.mp3")
                redBullets.pop()
            }
        }
    }
    
    if(blueBullets.length > 0){
        for(var e = 0; e < blueBullets.length; e++){
            blueBullets[e].x -= 30
            blueBullets[e].update()
        }
        for(var a = 0; a < blueBullets.length; a++){
            if(red.collideWithBlue(blueBullets[a]) || blueBullets[a].collideWithRedWall()){
                blueBullets[a].image = "explosion.png"
                explosion.play()
                explosion = ""
                explosion = new sound("explosion.mp3")
                blueBullets.pop()
            }
        }
    }

    red.update()
    red.newPos()
    blue.update()
    blue.newPos()
}

function sound(src){                                        // Moule à son
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


startGame()                                                 // Appel au commencement du jeu