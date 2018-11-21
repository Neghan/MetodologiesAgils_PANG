var platformer = platformer || {};


platformer.fruits = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'fruta');
    this.anchor.setTo(0.5);
    this.animations.add("0",[0],0,false);
    this.animations.add("1",[1],0,false);
    this.animations.add("2",[2],0,false);
    this.animations.add("3",[3],0,false);
    this.animations.add("4",[4],0,false);
    this.animations.add("5",[5],0,false);
    this.animations.add("6",[6],0,false);
    this.animations.add("7",[7],0,false);
    this.animations.add("8",[8],0,false);
    this.animations.add("9",[9],0,false);
    this.animations.add("10",[10],0,false);
    this.animations.add("11",[11],0,false);
    this.animations.add("12",[12],0,false);
    this.animations.add("13",[13],0,false);
    this.animations.add("14",[14],0,false);
    this.animations.add("15",[15],0,false);
    this.animations.add("16",[16],0,false);
    this.animations.add("17",[17],0,false);
    this.animations.add("18",[18],0,false);
    this.animations.add("19",[19],0,false);
    this.animations.add("20",[20],0,false);
    this.animations.add("21",[21],0,false);
    this.animations.add("22",[22],0,false);
    this.animations.add("23",[23],0,false);
    this.animations.add("24",[24],0,false);
    this.animations.add("25",[25],0,false);
    this.animations.add("26",[26],0,false);
    this.level = level;
    this.game.physics.arcade.enable(this);
    this.body.immovable = false;
    this.body.allowGravity = true;
    this.oneTimeFruit = true;
    this.fruitlife = 14;
    this.value = 0;
    this.destroy = false;
};

platformer.fruits.prototype = Object.create(Phaser.Sprite.prototype);
platformer.fruits.prototype.constructor = platformer.fruits;

platformer.fruits.prototype.update = function(){
    
    if (this.destroy == true){
        this.kill();
    }
    
    this.game.physics.arcade.collide(this,this.level.hero,this.hitFruit,null,this);
    
    this.body.velocity.y= 0.02;
    if(this.oneTimeFruit){
        this.value = this.game.rnd.integerInRange(0, 26);
        if (this.value == 0){this.animations.play('0');}
        else if (this.value == 1){this.animations.play('1');}
        else if (this.value == 2){this.animations.play('2');}
        else if (this.value == 3){this.animations.play('3');}
        else if (this.value == 4){this.animations.play('4');}
        else if (this.value == 5){this.animations.play('5');}
        else if (this.value == 6){this.animations.play('6');}
        else if (this.value == 7){this.animations.play('7');}
        else if (this.value == 8){this.animations.play('8');}
        else if (this.value == 9){this.animations.play('9');}
        else if (this.value == 10){this.animations.play('10');}
        else if (this.value == 11){this.animations.play('11');}
        else if (this.value == 12){this.animations.play('12');}
        else if (this.value == 13){this.animations.play('13');}
        else if (this.value == 14){this.animations.play('14');}
        else if (this.value == 15){this.animations.play('15');}
        else if (this.value == 16){this.animations.play('16');}
        else if (this.value == 17){this.animations.play('17');}
        else if (this.value == 18){this.animations.play('18');}
        else if (this.value == 19){this.animations.play('19');}
        else if (this.value == 20){this.animations.play('20');}
        else if (this.value == 21){this.animations.play('21');}
        else if (this.value == 22){this.animations.play('22');}
        else if (this.value == 23){this.animations.play('23');}
        else if (this.value == 24){this.animations.play('24');}
        else if (this.value == 25){this.animations.play('25');}
        else if (this.value == 26){this.animations.play('26');}
        this.oneTimeFruit = false;
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
        this.destroy = true;
    }
};