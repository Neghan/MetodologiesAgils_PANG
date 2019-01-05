var platformer = platformer || {};

var gameOptions={
    gameWidth:384,
    gameHeight:308,
    level1Width:384,
    level1Height:208,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450,
    hero1HP:3,
    hero2HP:3,
    hero1Score:0,
    hero2Score:0,
    currentLevelName:'undefined',
    timeBonus:0,
    currentLevel:0,
    dead1:false,
    dead2:false

};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

platformer.game.state.add('level',platformer.level);
platformer.game.state.add('splashscreen',platformer.splashscreen);
platformer.game.state.add('worldmap',platformer.worldmap);
platformer.game.state.add('solvedlevel',platformer.solvedlevel);

platformer.game.state.start('splashscreen');

//platformer.game.state.start('solvedlevel');


