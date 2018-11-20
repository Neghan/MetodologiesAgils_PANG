var platformer = platformer || {};

var gameOptions={
    gameWidth:384,
    gameHeight:308,
    level1Width:384,
    level1Height:208,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450
};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

platformer.game.state.add('level1',platformer.level1);
platformer.game.state.add('splashscreen',platformer.splashscreen);
platformer.game.state.add('worldmap',platformer.worldmap);
platformer.game.state.start('splashscreen');


