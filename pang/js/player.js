var platformer = platformer || {};

platformer.player = function(game,x,y,level,num){
    if(num == 2){
        Phaser.Sprite.call(this,game,x,y,'hero_2');
    } else {
        Phaser.Sprite.call(this,game,x,y,'hero');
    }
    this.num = num;
    this.anchor.setTo(.5);
    this.level = level
    
    this.animations.add('walk',[0,1,2,3,4],10,true);
    //this.hero.animations.add('left',[0,1,2,3,4],10,true);
    this.animations.add('idleShoot',[10,11],10,false);
    this.animations.add('idle',[10],10,true);
    this.animations.add('deathR',[17],10,true);
    this.animations.add('deathL',[16],10,true);
    this.animations.add('stairsUP',[7,8,9,10],10,true);
    this.dead=false;
    this.lives = 3;
    this.score = 0;
    this.shield = false;
    this.doubleHook = false;
    this.powerWire = false;
    this.uzi = false;
    this.invincibilityFrames = 0;
    
    this.shield = this.game.add.sprite(0,0, 'shield', 0);
    this.shield.animations.add('shield', [0,1],10, true);
    this.shield.animations.play('shield');
    this.shield.visible = false;
    this.shield.anchor.setTo(0.5);
};


platformer.player.prototype = Object.create(Phaser.Sprite.prototype);
platformer.player.prototype.constructor = platformer.bubble_prefab;


platformer.player.prototype.update = function(){
    
    //this.game.debug.body(this);
    this.game.physics.arcade.collide(this,this.level.walls_layer);
    this.game.physics.arcade.collide(this,this.level.unbreakable_layer);
    this.game.physics.arcade.overlap(this,this.level.hero,this.hitHero,null,this);
    this.game.physics.arcade.collide(this,this.level.bulletArray,this.hitShoot,null,this);
    this.game.physics.arcade.collide(this,this.level.cangrejoArray,this.hitCrab,null,this);
    
    this.game.physics.arcade.collide(this,this.level.bullet,this.hitShoot,null,this);
    
    if(!this.stopped){
        this.body.velocity.x = this.speedX * this.directionX;
    
        this.speedY += this.acceleration*0.017
        this.body.velocity.y = this.speedY * this.directionY;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0
    }
    //this.body.velocity.y = this.speedY*this.directionY;

   if(this.body.onWall() || this.body.touching.left || this.body.touching.right){
        this.directionX *=-1;
        this.body.velocity.x = this.speedX*this.directionX;
   }
   if(this.body.onFloor() || this.body.touching.down){
        if(this.size == 0 || this.body.y <= 40){
            this.speedY = -Math.sqrt(2 * this.acceleration * (this.body.y - 40));
        } else if (this.size == 1 || this.body.y <= 60){
            this.speedY = -Math.sqrt(2 * this.acceleration * (this.body.y  - 60));
        } else if (this.size == 1 || this.body.y <= 80){
            this.speedY = -Math.sqrt(2 * this.acceleration * (this.body.y  - 80));
        } else{
            this.speedY = -Math.sqrt(2 * this.acceleration * (this.body.y - 100));
        }
   }
   if(this.body.onCeiling() || this.body.touching.up){
        if(this.size == 0 || this.body.y <= 40){
            this.speedY = Math.sqrt(2 * this.acceleration * (this.body.y - 40));
        } else if (this.size == 1 || this.body.y <= 60){
            this.speedY = Math.sqrt(2 * this.acceleration * (this.body.y  - 60));
        } else if (this.size == 1 || this.body.y <= 80){
            this.speedY = Math.sqrt(2 * this.acceleration * (this.body.y  - 80));
        } else{
            this.speedY = Math.sqrt(2 * this.acceleration * (this.body.y - 100));
        }
   }
       
    if (this.exploded == true){
        if(this.playExplosionSound ==  true){
            this.level.bubbleExplosion.play();
            this.playExplosionSound = false;
        }
        this.body.enable = false;
        if(this.setText == false){
            if (this.size == 3){
                this.bubbleScore = this.game.add.text( this.body.position.x+5, this.body.position.y-5, "100", 
                {
                font: "10px Pixel",
                fill: "#ffffff",
                align: "left"
                });
                this.setText = true;
            }
        }
        this.destroyDelay -= 0.3;
        if(this.destroyDelay <= 0){
            if (this.spawnedLoot == false){
                this.spawnRandom = this.game.rnd.integerInRange(1,3);
                console.log (this.spawnRandom);
                if (this.spawnRandom == 1){
                    this.level.spawnLoot(this.body.position.x, this.body.position.y);
                    this.spawnedLoot = true;
                }
            }
            if (this.size == 3){
                this.bubbleScore.setText("");
            }
            this.destroy();
        }
    }
};

platformer.player.prototype.hitShoot = function(_bubble, _shot){
        
        this.animations.play('explode');
        if (this.size < 3){
            this.level.spawnBubbles(this.body.x, this.body.y, this.size + 1, this.color, this.directionX);
            
        }
        else{
          this.level.hitShoot();  
        }
        _shot.destroy();
        this.exploded = true;
        //delay o quan acabi la animació --> destroy.

};

platformer.bubble_prefab.prototype.hitCrab = function(_crab, _shot){
        
        this.animations.play('explode');
        if (this.size < 3){
            this.level.spawnBubbles(this.body.x, this.body.y, this.size + 1, this.color, this.directionX);
        }
        this.exploded = true;

};


platformer.bubble_prefab.prototype.hitHero = function(_bubble,_hero){
    if(_bubble.body.touching && _hero.body.touching){
        
        this.level.hitHero();
        //this.body.enable = false;
        //delay o quan acabi la animació --> destroy.
    }
};