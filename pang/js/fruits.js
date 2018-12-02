var platformer = platformer || {};


platformer.fruits = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'fruta');
    this.anchor.setTo(0.5);
    this.animations.add("0",[0,29,0],5,true);
    this.animations.add("1",[1,29,1],5,true);
    this.animations.add("2",[2,29,2],5,true);
    this.animations.add("3",[3,29,3],5,true);
    this.animations.add("4",[4,29,4],5,true);
    this.animations.add("5",[5,29,5],5,true);
    this.animations.add("6",[6,29,6],5,true);
    this.animations.add("7",[7,29,7],5,true);
    this.animations.add("8",[8,29,8],5,true);
    this.animations.add("9",[9,29,9],5,true);
    this.animations.add("10",[10,29,10],5,true);
    this.animations.add("11",[11,29,11],5,true);
    this.animations.add("12",[12,29,12],5,true);
    this.animations.add("13",[13,29,13],5,true);
    this.animations.add("14",[14,29,14],5,true);
    this.animations.add("15",[15,29,15],5,true);
    this.animations.add("16",[16,29,16],5,true);
    this.animations.add("17",[17,29,17],5,true);
    this.animations.add("18",[18,29,18],5,true);
    this.animations.add("19",[19,29,19],5,true);
    this.animations.add("20",[20,29,20],5,true);
    this.animations.add("21",[21,29,21],5,true);
    this.animations.add("22",[22,29,22],5,true);
    this.animations.add("23",[23,29,23],5,true);
    this.animations.add("24",[24,29,24],5,true);
    this.animations.add("25",[25,29,25],5,true);
    this.animations.add("26",[26,29,26],5,true);
    
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = false;
    this.body.allowGravity = true;
    this.oneTimeFruit = true;
    this.fruitlife = 14;
    this.value = 0;
    
    this.theDestroy = false;
    this.fruitDestroyDelay = 1;
    this.fruitSetText = false;
};

platformer.fruits.prototype = Object.create(Phaser.Sprite.prototype);
platformer.fruits.prototype.constructor = platformer.fruits;

platformer.fruits.prototype.update = function(){
    
    if (this.theDestroy == true){
        this.animations.play(this.value);
        this.fruitDestroyDelay -= 0.012;
        if(this.fruitDestroyDelay <= 0){
        this.fruitScore.setText("");
        this.kill();
        }
    }
    
    this.game.physics.arcade.collide(this,this.level.hero,this.hitFruit,null,this);
    
    this.body.velocity.y= 50;
    if(this.oneTimeFruit){
        this.value = this.game.rnd.integerInRange(0, 26);
        
        this.animations.play(this.value);
                 
        this.oneTimeFruit = false;
        this.animations.stop(null, true);
    }
    
    
    if (this.fruitlife <= 0){
        this.kill();
    }
    else{
        this.fruitlife -= 0.012;
    }
   
    
};

platformer.fruits.prototype.hitFruit = function(_fruit,_hero){
    if(_fruit.body.touching && _hero.body.touching){
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
        this.theDestroy = true;
    }
};