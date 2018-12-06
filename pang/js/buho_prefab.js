var platformer = platformer || {};

platformer.buho_prefab = function(game,x,y,level){
    Phaser.Sprite.call(this,game,x,y,'buho');
    this.anchor.setTo(.5);
    this.scale.setTo(1.);
    this.animations.add("fly",[0,1,2,3,4,5,6,7,8,9,10],8,true); 
    this.animations.add("die",[11,12],4,true); 
    this.animations.play('fly');
    this.level = level;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    
    this.speedX = 80;
    this.directionX = 1;
    
    this.game.add.existing(this);
    this.level.buhoCollisionGroup.add(this);
};



platformer.buho_prefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.buho_prefab.prototype.constructor = platformer.buho_prefab;


platformer.buho_prefab.prototype.update = function(){
    this.body.velocity.x = this.speedX*this.directionX;

    if( this.body.position.x > 400){
        this.body.position.y += 50;
        this.directionX *= -1;
        this.body.position.x = 395;
        this.scale.setTo(-1,1);
    }
    else if( this.body.position.x < -75){
        this.body.position.y += 50;
        this.directionX *= -1;
        this.body.position.x = -50;
        this.scale.setTo(1,1);
    }
        if( this.body.position.y > 210){
        this.body.position.y = 10.5;
    }
};