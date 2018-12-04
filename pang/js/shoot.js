var platformer = platformer || {};


platformer.shoot = function(game,x,y,pointA,pointB,speed,direction,level,type){
    this.type = type;
    if(this.type == 0){
        Phaser.Sprite.call(this,game,x,y,'shoot');
        this.animations.add('regular',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],60,false);

    } else if (this.type == 1){
        Phaser.Sprite.call(this,game,x,y,'powerWire');
        this.animations.add('regular',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],60,false);

    } else {
        Phaser.Sprite.call(this,game,x,y,'uzi');
        this.animations.add('regular',[3,4],10,true);

    }
    this.anchor.setTo(0.5,0.92);    
    //this.animations.play('walk');
    //this.patrolA = pointA;
    //this.patrolB = pointB;
    //this.speed = speed;
    //this.direction = direction;
    this.level = level;
    this.game.physics.arcade.enable(this);
    if (this.type != 2){
        this.body.immovable = true;
        this.body.allowGravity = false;
    }
    this.oneTimeShoot = true;
    if(this.type == 2){
        
        this.lifespan = 500;
        
    }
    if (this.type == 1){
        
        this.lifespan = 5000;
        
    }else{
       
        this.lifespan = 1700;
        
    }
    this.game.add.existing(this);
    this.level.bulletCollisionGroup.add(this);
};

platformer.shoot.prototype = Object.create(Phaser.Sprite.prototype);
platformer.shoot.prototype.constructor = platformer.shoot;

platformer.shoot.prototype.update = function(){

    
    if(this.type == 2) {
        this.body.velocity.y = 100;
    }
    if(this.oneTimeShoot){
         this.animations.play('regular');
         this.oneTimeShoot = false;
    }
   if(this.lifespan <= 0){
       this.destroy();
   }
    
};