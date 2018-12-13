var platformer = platformer || {};

platformer.destructibles = function(game,x,y,level){
   this.game = game;
    //this.x = x;
    //this.y = y;
    this.level = level;
    
    Phaser.Sprite.call(this,game,x,y,'destructibles2');
    this.animations.add('stay',[0],0,true);
    this.animations.add('explode',[0,1,2,3,4,5],10,false);
    this.animations.play('stay');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.timertodie = 0.8;
    this.onetimeplease = true;
};

platformer.destructibles.prototype = Object.create(Phaser.Sprite.prototype);
platformer.destructibles.prototype.constructor = platformer.destructible;

platformer.destructibles.prototype.update = function(){
      this.game.physics.arcade.collide(this,this.level.hero);
   this.game.physics.arcade.collide(this,this.level.bubbleCollisionGroup);
    this.game.physics.arcade.collide(this,this.level.bulletCollisionGroup,this.gotHit,null,this);
};

platformer.destructibles.prototype.gotHit = function(){
    if(this.timertodie<=0){
        this.destroy();
    }else{
        this.timertodie-=0.017;
    }
    
    if(this.onetimeplease == true){
        this.animations.play('explode');
        this.onetimeplease = false;
    }
    
    
};