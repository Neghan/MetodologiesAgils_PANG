var platformer = platformer || {};

platformer.destructible = function(game,x,y,level){
    this.game = game;
    this.x = x;
    this.y = y;
    this.level = level;
};

platformer.destructibe.prototype = Object.create(Phaser.Sprite.prototype);
platformer.destructible.prototype.constructor = platformer.destructible;
