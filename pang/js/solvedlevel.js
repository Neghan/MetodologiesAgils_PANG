var platformer = platformer || {};


platformer.solvedlevel ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.parentIsWindow = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight-50);
        this.game.load.bitmapFont()
        
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        //this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        this.load.spritesheet('gif','assets/img/Gif_Solved_Level.png',693,532);
        this.load.audio('MusicOpening', 'assets/audio/music/Opening.mp3');
        
    },

    create:function(){
      //this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');

        this.music = this.add.audio('MusicOpening',1,true);

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
    
    this.TimeBonus = this.game.add.text(this.game.world.centerX-100, this.game.world.centerY+70, "TIME BONUS:", {
        font: "10px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.TimeBonus.anchor.setTo(0, 0.5);
        
    this.Score = this.game.add.text(this.game.world.centerX-100, this.game.world.centerY+90, "SCORE:", {
        font: "10px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.Score.anchor.setTo(0, 0.5);
        

        
        
    },
    update:function(){
    
        this.splash.animations.play('solvedGif');   
          

        if (this.space.isDown){
           //SALTAR AL MENU WORLD
            this.music.stop();
            this.state.start('worldmap');
        }
    }
    
};