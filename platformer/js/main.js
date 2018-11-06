var platformer = platformer || {};

var gameOptions={
    gameWidth:960,
    gameHeight:540,
    level1Width:1280,
    level1Height:800,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450
};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

platformer.game.state.add('level1',platformer.level1);
platformer.game.state.start('level1');


