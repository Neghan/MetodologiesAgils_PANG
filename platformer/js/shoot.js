var platformer = platformer || {};


platformer.shoot = function(game,x,y,pointA,pointB,speed,direction,level,bubble){
    Phaser.Sprite.call(this,game,x,y,'shoot');
    this.anchor.setTo(0.5,0.92);
    this.animations.add('shooting',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],60,false);
    //this.animations.play('walk');
    //this.patrolA = pointA;
    //this.patrolB = pointB;
    //this.speed = speed;
    //this.direction = direction;
    this.level = level;
    this.bubble = bubble;
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;
    this.oneTimeShoot = true;
};

platformer.shoot.prototype = Object.create(Phaser.Sprite.prototype);
platformer.shoot.prototype.constructor = platformer.shoot;

platformer.shoot.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.bubble);
    this.game.physics.arcade.collide(this,this.level.bubble,this.OnHitAny,null,this);
    this.body.velocity.y= 0.01;
    if(this.oneTimeShoot){
         this.animations.play('shooting');
         this.oneTimeShoot = false;
    }
   
};
platformer.shoot.prototype.OnHitAny  = function(_shot,_bubble){
    if(_shot.body.touching.left && _bubble.body.touching.right || _shot.body.touching.right &&  _bubble.body.touching.left || _shot.body.touching.up &&  _bubble.body.touching.down){
        this.kill();
    }
};