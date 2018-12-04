var platformer = platformer || {};

platformer.collsionwall = function(game,x,y,level){
    this.game = game;
    
    this.level = level;
    
    Phaser.Sprite.call(this,game,x,y,'destructibles2');
    this.animations.add('stay',[1],0,true);
    this.animations.play('stay');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.allowGravity = false;
};

platformer.collsionwall.prototype = Object.create(Phaser.Sprite.prototype);
platformer.collsionwall.prototype.constructor = platformer.collsionwall;

platformer.collsionwall.prototype.update = function(){
   this.game.physics.arcade.collide(this,this.level.bubbleCollisionGroup);
    
}