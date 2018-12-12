var platformer = platformer || {};

var gameOptions={
    gameWidth:384,
    gameHeight:308,
    level1Width:384,
    level1Height:208,
    heroGravity:1000,
    heroSpeed:200,
    heroJump:450,
    heroHP:3,
    heroScore:0,
    currentLevel:'undefined',
    timeBonus:0,
    onceLevel1:true,
    onceLevel2:true,
    onceLevel3:true,
    currentLevel:0
};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,'gameFrame',this,false,false);

platformer.game.state.add('level',platformer.level);
platformer.game.state.add('splashscreen',platformer.splashscreen);
platformer.game.state.add('worldmap',platformer.worldmap);
platformer.game.state.add('solvedlevel',platformer.solvedlevel);

platformer.game.state.start('splashscreen');

//platformer.game.state.start('solvedlevel');


