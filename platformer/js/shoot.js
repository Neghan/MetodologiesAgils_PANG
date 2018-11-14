var platformer = platformer || {};


platformer.shoot = function(game,x,y,pointA,pointB,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'shoot');
    this.anchor.setTo(.5);
    //this.animations.add('walk',[0,1,2,3],10,true);
    //this.animations.play('walk');
    //this.patrolA = pointA;
    //this.patrolB = pointB;
    //this.speed = speed;
    //this.direction = direction;
    //this.level = level;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
};