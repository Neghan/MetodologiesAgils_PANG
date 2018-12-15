var platformer = platformer || {};


platformer.loot_powerup = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'loot');
    this.anchor.setTo(0.5);
    this.animations.add("0",[0,16],5,true); //UZI 
    this.animations.add("1",[1,2,3,4,5,6,7,8],5,true); //SHIELD
    this.animations.add("1.5",[5,16],5,true); 
    this.animations.add("2",[9,10,11],5,true); //DYNAMITE
    this.animations.add("2.5",[11,16],5,true); 
    this.animations.add("3",[12,16],5,true); // SLOW TIME
    this.animations.add("4",[13,16],5,true); // STOP TIME
    this.animations.add("5",[14,16],5,true); // DOUBLE HOOK
    this.animations.add("6",[15,16],5,true); // GRAB HOOK
    
    
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = false;
    this.body.allowGravity = true;
    this.oneTimeLoot = true;
    this.lootlife = 14;
    this.value = 0;
    
    this.delayDestroy = false;
    this.lootDestroyDelay = 1;
    this.game.add.existing(this);
    this.level.powerupCollisionGroup.add(this);
    
};

platformer.loot_powerup.prototype = Object.create(Phaser.Sprite.prototype);
platformer.loot_powerup.prototype.constructor = platformer.loot_powerup;

platformer.loot_powerup.prototype.update = function(){
    
    this.game.physics.arcade.collide(this,this.level.walls_layer);
    
    this.game.physics.arcade.collide(this,this.level.hero,this.collHero,null,this);
    
    this.body.velocity.y= 50;
    if(this.oneTimeLoot){ 
        this.value = this.game.rnd.integerInRange(0,6); // 0-6
        if (this.value == 1 ){
        this.animations.play(this.value);    
        }
        else if (this.value == 2){
        this.animations.play(this.value);    
        }
        else{
        this.animations.play(this.value);
        this.animations.stop(null, true);
        }
        this.oneTimeLoot = false;
    }
    
    
    if (this.lootlife <= 0){
        this.destroy();
    }
    else{
        this.lootlife -= 0.012;
    }
    
    
    if (this.delayDestroy == true){
        if (this.value == 1 ){
            this.animations.play(1.5);    
        }
        else if (this.value == 2){
            this.animations.play(2.5);    
        }
        else{
            this.animations.play(this.value);
        }
        this.lootDestroyDelay -= 0.012;
        if(this.lootDestroyDelay <= 0){
        this.destroy();
        }
    }
   
    
}

platformer.loot_powerup.prototype.collHero = function(_loot,_hero){
    if(_loot.body.touching && _hero.body.touching){
        this.level.collHero(this.value);
        this.body.enable = false;
        this.delayDestroy = true;
    }

};