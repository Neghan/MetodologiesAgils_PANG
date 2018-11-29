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
    this.level = level;
    this.speedX = 50;
//    this.speedY = 30;
    this.directionX = direction;
//    this.directionY = 1;
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
    this.body.gravity.y = 1; //Parece que a partir de cierto número no baja mas
    
    this.bubbleScore;
    
    this.spawnRateLoot = 3;
    this.spawnedLoot = false;
    this.game.add.existing(this);
    this.level.bubbleCollisionGroup.add(this);
};



platformer.bubble_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.bubble_prefab.prototype.constructor = platformer.bubble_prefab;


platformer.bubble_prefab.prototype.update = function(){
    
    //this.game.debug.body(this);
    this.game.physics.arcade.collide(this,this.level.muroLados1);
    this.game.physics.arcade.collide(this,this.level.muroLados2);
    this.game.physics.arcade.collide(this,this.level.muro);
    this.game.physics.arcade.collide(this,this.level.muro2);
    this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
    this.game.physics.arcade.collide(this,this.level.shoot,this.hitShoot,null,this);
    
    this.game.physics.arcade.collide(this,this.level.bullet,this.hitShoot,null,this);
    
    this.body.velocity.x = this.speedX*this.directionX;
    //this.body.velocity.y = this.speedY*this.directionY;

   if(this.body.touching.right || this.body.touching.left){
        this.directionX *=-1;
        this.body.velocity.x = this.speedX*this.directionX;
   }
       
    if (this.exploded == true){
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
                this.level.spawnLoot(this.body.position.x, this.body.position.y);
                this.spawnedLoot = true;
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
        this.body.enable = false;
        if (this.size < 3){
            this.level.spawnBubbles(this.body.x, this.body.y, this.size + 1, this.color, this.directionX);
        }
        this.level.hitShoot();
        _shot.destroy();
        this.exploded = true;
        //delay o quan acabi la animació --> destroy.

};


platformer.bubble_prefab.prototype.hitHero = function(_bubble,_hero){
    if(_bubble.body.touching && _hero.body.touching){
        
        this.level.hitHero();
        this.body.enable = false;
        //delay o quan acabi la animació --> destroy.
    }
};