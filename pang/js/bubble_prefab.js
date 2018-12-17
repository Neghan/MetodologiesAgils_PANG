var platformer = platformer || {};

platformer.bubble_prefab = function(game,x,y,level,size,color, direction){
    //SIZE: 0 == XL, 1 == L, 2 == M, 3 == S
    //COLOR: 0 == RED, 1 == GREEN, 2 == BLUE
    if(size == 3){
        Phaser.Sprite.call(this,game,x,y,'bubble_s');
    } else if (size == 2){
        Phaser.Sprite.call(this,game,x,y,'bubble_m');
    } else if (size == 1){
        Phaser.Sprite.call(this,game,x,y,'bubble_l');
    } else{
        Phaser.Sprite.call(this,game,x,y,'bubble_xl');
    }
    this.size = size;
    this.color = color;
    this.anchor.setTo(.5);
    this.scale.setTo(.75);
    if(size == 3){
        this.animations.add('normal',[0 + 4*this.color],0,true);
        this.animations.add('explode',[1 + 4*this.color,2 + 4*this.color,3 + 4*this.color],10,false);
    } else {
        this.animations.add('normal',[0 + 5*this.color],0,true);
        this.animations.add('explode',[1 + 5*this.color,2 + 5*this.color,3 + 5*this.color,4 + 5*this.color],10,false);
    }

    this.animations.play('normal');
    this.level = level
    
    this.speedX = 50;
//    this.speedY = 30;
    this.acceleration = 100;
    if(this.level.timeSlowed){
        this.acceleration /= 2;
    }
    this.speedY = 0;

    this.directionX = direction;
    this.directionY = 1;
//    this.directionY = 1;
    //this.body.gravity.y = 1; //Parece que a partir de cierto número no baja mas
    
    //this.game.physics.arcade.enable(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    

    
    if(size == 3){
        this.body.setCircle(3);
    } else if (size == 2){
        this.body.setCircle(7);
    } else if (size == 1){
        this.body.setCircle(15);
    } else{
        this.body.setCircle(23);
    }
    this.destroyDelay = 10;
    this.exploded = false;
    this.setText = false;

    this.body.bounce.y = 1;
    this.body.allowGravity = false;
    
    this.bubbleScore;
    this.spawnRandom = 0;
    
    if(this.level.timeStopped){
        this.stopped = true;   
    } else {
        this.stopped = false;
    }
    
    this.spawnRateLoot = 3;
    this.spawnedLoot = false;
    this.game.add.existing(this);
    this.level.bubbleCollisionGroup.add(this);
    
    this.playExplosionSound = true;
    
};



platformer.bubble_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.bubble_prefab.prototype.constructor = platformer.bubble_prefab;


platformer.bubble_prefab.prototype.update = function(){
    
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

platformer.bubble_prefab.prototype.hitShoot = function(_bubble, _shot){
        
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