var platformer = platformer || {};


platformer.shoot = function(game,x,y,pointA,pointB,speed,direction,level,type){
    
    this.playShootSound = true;
    
    if(type == 0){
        Phaser.Sprite.call(this,game,x,y,'shoot');
        this.animations.add('regular',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69],60,false);

    } else if (type == 1){
        Phaser.Sprite.call(this,game,x,y,'powerWire');
        this.animations.add('regular',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],60,false);
        this.animations.add('disappear', [70,71], 10, true);
        this.disappearingTime = 2;
        this.stayingTime = 3;

    } else if (type == 2) {
        Phaser.Sprite.call(this,game,x,y,'uzi');
        this.animations.add('regular',[3,4],10,true);
        this.animations.add('burst',[5,6],10,false);

    }
    this.anchor.setTo(0.5,0.92);    

    this.type = type;
    this.level = level;
    this.game.physics.arcade.enable(this);
    if (this.type != 2){
        this.body.immovable = true;
        this.body.allowGravity = false;
    }
    this.oneTimeShoot = true;

    this.game.add.existing(this);
    this.level.bulletCollisionGroup.add(this);
};

platformer.shoot.prototype = Object.create(Phaser.Sprite.prototype);
platformer.shoot.prototype.constructor = platformer.shoot;

platformer.shoot.prototype.update = function(){

    this.game.debug.body(this);
    
    if(this.type == 2) {
        if(this.playShootSound == true){
            this.level.UZI.play();
            this.playShootSound = false;
        }
        this.body.velocity.y = -500;
        this.game.physics.arcade.collide(this,this.level.walls_layer,this.hitWall,null,this);
        if (this.frame >= 6){
            this.destroy();
        }
    } else if(this.type == 1){
        if(this.playShootSound == true){
            this.level.ShootSound.play();
            this.playShootSound = false;
        }
        if (this.frame == 70){
            this.stayingTime -= 0.017;
        }
        if (this.stayingTime <=0){
            this.animations.play('disappear');
            this.disappearingTime -= 0.017;
        }
        if (this.disappearingTime <=0){
            this.destroy();
        }
    } else if (this.type == 0){
        if(this.playShootSound == true){
            this.level.ShootSound.play();
            this.playShootSound = false;
        }
        if(this.frame >= 69){
            this.destroy();
        }
    }
    if(this.oneTimeShoot){
        this.animations.play('regular');
        this.oneTimeShoot = false;
    }
};

platformer.shoot.prototype.hitWall = function(_shoot, _wall){
        
        if (this.type == 2){
            this.animations.play('burst');
        }
};