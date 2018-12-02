var platformer = platformer || {};


platformer.solvedlevel ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.parentIsWindow = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight-50);
        this.game.load.bitmapFont()
        this.timer = 4;
        this.message = "PRESS SPACE TO CONTINUE";

    },
    preload:function(){ 
        this.load.spritesheet('gif','assets/img/Gif_Solved_Level.png',693,532);
        this.load.audio('MusicOpening', 'assets/audio/music/solvedLevel.mp3');
        
    },

    create:function(){
      //this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');

        this.music = this.add.audio('MusicOpening',1,false);

        this.music.play();

        this.splash=this.game.add.sprite(3,0,'gif',0);
        
        this.splash.scale.setTo(0.56);
    //FIRST ANIMATION
    this.splash.animations.add('solvedGif',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],30,true);

     
    this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
    this.CurrentLevel = this.game.add.text(this.game.world.centerX-100, this.game.world.centerY+50, "CURRENT LEVEL:", {
        font: "10px Arial",
        fill: "#ffffff",
        align: "left"
        });
    this.CurrentLevel.anchor.setTo(0, 0.5);
    
    this.CurrentLevelText = this.game.add.text(this.game.world.centerX+60, this.game.world.centerY+50, gameOptions.currentLevel, {
        font: "10px Arial",
        fill: "#ffffff",
        align: "right"
        });
    this.CurrentLevelText.anchor.setTo(0, 0.5);    
        
    this.TimeBonus = this.game.add.text(this.game.world.centerX-100, this.game.world.centerY+70, "TIME BONUS:", {
        font: "10px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.TimeBonus.anchor.setTo(0, 0.5);
        
        this.TimeBonusText = this.game.add.text(this.game.world.centerX+60, this.game.world.centerY+70, gameOptions.timeBonus, {
        font: "10px Arial",
        fill: "#ffffff",
        align: "right"
        });
        this.TimeBonusText.anchor.setTo(0, 0.5);
        
    this.Score = this.game.add.text(this.game.world.centerX-100, this.game.world.centerY+90, "SCORE:", {
        font: "10px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.Score.anchor.setTo(0, 0.5);
        
    this.ScoreText = this.game.add.text(this.game.world.centerX+60, this.game.world.centerY+90, gameOptions.heroScore, {
        font: "10px Arial",
        fill: "#ffffff",
        align: "right"
        });
        this.ScoreText.anchor.setTo(0, 0.5);
        
    this.PressToContinue = this.game.add.text(this.game.world.centerX -55, this.game.world.centerY+100, this.message, {
        font: "10px Arial",
        fill: "#ffffff",
        align: "right"
        });
        this.ScoreText.anchor.setTo(0, 0.5);      
        
    },
    update:function(){
    
        this.splash.animations.play('solvedGif');
        this.PressToContinue.destroy();
              

        if (this.space.isDown){
           //SALTAR AL MENU WORLD
            this.music.stop();
            this.state.start('worldmap');
        }
        
    if (this.timer >= 0){
        this.message = "PRESS SPACE TO CONTINUE";
        this.timer-= 0.1;
    }
    else{
        this.message = "";
        this.timer-= 0.1;
        if (this.timer <= -4){
            this.timer = 6;
        }
    }
    console.log(this.timer);
    this.PressToContinue = this.game.add.text(this.game.world.centerX -55, this.game.world.centerY+100, this.message, {
        font: "10px Arial",
        fill: "#ffffff",
        align: "right"
        });
        this.ScoreText.anchor.setTo(0, 0.5);
    }
    
};