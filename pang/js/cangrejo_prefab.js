var platformer = platformer || {};

platformer.cangrejo_prefab = function(game,x,y,level,direction){
    Phaser.Sprite.call(this,game,x,y,'cangrejo');
    this.anchor.setTo(.5);
    if (direction == -1){
    this.scale.setTo(-1,1);
    }
    this.animations.add("walk",[0,1,2,3],10,true); 
    this.animations.add("die",[4,5,6,7],10,true); 
    this.animations.play('walk');
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = true;
    
    this.speedX = 80;
    this.directionX = direction;
    this.died = false;
    this.cangrejoDestroyDelay = 1.2;

    
    this.game.add.existing(this);
    this.level.cangrejoCollisionGroup.add(this);
};



platformer.cangrejo_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.cangrejo_prefab.prototype.constructor = platformer.cangrejo_prefab;




platformer.cangrejo_prefab.prototype.update = function(){
    
        //Colisions
    this.game.physics.arcade.overlap(this,this.level.hero,this.cangrejoHitHero,null,this);
    this.game.physics.arcade.collide(this,this.level.bulletArray,this.cangrejoHitShoot,null,this);
    this.game.physics.arcade.collide(this,this.level.walls_layer,this.cangrejoHitWall,null,this);
    
    //Check if is alive
    if(this.died == true){
        this.body.enable = false
        this.body.velocity.x = 0;
        if(this.cangrejoDestroyDelay >= 0){
            this.cangrejoDestroyDelay -= 0.016;
        }
        else{
            this.destroy();
        }
    }
    else{
        if(this.body.blocked.right || this.body.blocked.left){
            this.directionX *=-1;
        }

        //Movement
        this.body.velocity.x = this.speedX*this.directionX;

        
    }
    console.log(this.level.hero.position.x);
    
};

    
    platformer.cangrejo_prefab.prototype.cangrejoHitShoot = function(_cangrejo, _shot){
        
        this.animations.play('die');
        _shot.destroy();
        this.died = true;

};



    platformer.cangrejo_prefab.prototype.cangrejoHitHero = function(_cangrejo,_hero){
    if(_cangrejo.body.touching && _hero.body.touching){
        
        this.level.hitHero();
    }
};