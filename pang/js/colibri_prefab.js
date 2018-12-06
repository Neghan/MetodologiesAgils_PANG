var platformer = platformer || {};

platformer.colibri_prefab = function(game,x,y,level,direction){
    Phaser.Sprite.call(this,game,x,y,'colibri');
    this.anchor.setTo(.5);
    if (direction == -1){
    this.scale.setTo(-1,1);
    }
    this.animations.add("fly",[0,1,2,3,4,5],20,true); 
    this.animations.add("die",[6,7],12,true); 
    this.animations.play('fly');
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    
    this.speedX = 100;
    this.directionX = direction;
    this.colibriTime = 0;
    this.died = false;
    this.colibriDestroyDelay = 1.2;

    
    this.game.add.existing(this);
    this.level.colibriCollisionGroup.add(this);
};



platformer.colibri_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.colibri_prefab.prototype.constructor = platformer.colibri_prefab;




platformer.colibri_prefab.prototype.update = function(){
    
        //Colisions
    this.game.physics.arcade.overlap(this,this.level.hero,this.colibriHitHero,null,this);
    this.game.physics.arcade.collide(this,this.level.bulletArray,this.colibriHitShoot,null,this);
    
    //Check if is alive
    if(this.died == true){
        this.body.enable = false
        this.body.velocity.x = 0;
        if(this.colibriDestroyDelay >= 0){
            this.colibriDestroyDelay -= 0.016;
        }
        else{
            this.destroy();
        }
    }
    else{

        //Movement
        this.body.velocity.x = this.speedX*this.directionX;
        this.body.position.y += (Math.sin(this.colibriTime)*1.2); //Mov Horitzontal Sinus
        
        //ColibriTime
        this.colibriTime += 0.1; //Moviment Vertical Sinus
        
    }
    
};

    
    platformer.colibri_prefab.prototype.colibriHitShoot = function(_colibri, _shot){
        
        this.animations.play('die');
        _shot.destroy();
        this.died = true;

};

    platformer.colibri_prefab.prototype.colibriHitHero = function(_colibri,_hero){
    if(_colibri.body.touching && _hero.body.touching){
        
        this.level.hitHero();
    }
};