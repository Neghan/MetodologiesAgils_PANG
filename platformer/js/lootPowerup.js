var platformer = platformer || {};


platformer.lootPowerup = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'loot');
    this.anchor.setTo(0.5);
    this.animations.add("0",[0,16],5,true); //UZI 
    this.animations.add("1",[1,2,3,4,5,6,7,8],5,true); //SHIELD
    this.animations.add("1.5",[1,16],5,true); 
    this.animations.add("2",[9,10,11,16],5,true); //DYNAMITE
    this.animations.add("2.5",[9,16],5,true); 
    this.animations.add("3",[12,16],5,true); // EXTRA TIME
    this.animations.add("4",[13,16],5,true); // STOP TIME
    this.animations.add("5",[14,16],5,true); // DOUBLE HOOK
    this.animations.add("6",[15,16],5,true); // GRAB HOOK

    this.level = level;
    this.game.physics.arcade.enable(this);
    this.body.immovable = false;
    this.body.allowGravity = true;
    this.oneTimeLoot = true;
    this.lootlife = 14;
    this.value = 0;
    
    this.destroy = false;
    this.lootDestroyDelay = 1;

};

platformer.lootPowerup.prototype = Object.create(Phaser.Sprite.prototype);
platformer.lootPowerup.prototype.constructor = platformer.lootPowerup;

platformer.lootPowerup.prototype.update = function(){
    
    if (this.destroy == true){
        this.animations.play(this.value);
        this.lootDestroyDelay -= 0.012;
        if(this.lootDestroyDelay <= 0){
        this.kill();
        }
    }

    this.game.physics.arcade.collide(this,this.level.hero,this.hitFruit,null,this);
    
    this.body.velocity.y= 50;
    if(this.oneTimeLoot){
        this.value = this.game.rnd.integerInRange(0,6);
        
        this.animations.play(this.value);
                 
        this.oneTimeLoot = false;
        this.animations.stop(null, true);
    }
    
    
    if (this.lootlife <= 0){
        this.kill();
    }
    else{
        this.lootlife -= 0.012;
    }
   
    
};
/*
platformer.loot_powerup.prototype.hitFruit = function(_loot,_hero){
    if(_.body.touching && _hero.body.touching){
        this.level.hitFruit();
        this.body.enable = false;
            if (this.fruitSetText == false){
            this.fruitScore = this.game.add.text( this.body.position.x+10, this.body.position.y-10, "250", {
            font: "10px Pixel",
            fill: "#ffffff",
            align: "left"
            });
            this.setText = true;
        }
        this.destroy = true;
    }
    */
//};