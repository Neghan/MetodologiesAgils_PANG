var platformer = platformer || {};


platformer.splashscreen ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.parentIsWindow = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        this.game.load.bitmapFont()
        
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        //this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        this.load.spritesheet('splash','assets/menus/SplashScreen(31x1).png',384,308);
        this.load.audio('MusicOpening', 'assets/audio/music/Opening.mp3');
        
    },

    create:function(){
      this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');

        this.music = this.add.audio('MusicOpening',1,true);

        this.music.play();

    this.splash=this.game.add.sprite(0,0,'splash');
    //FIRST ANIMATION
    this.splash.animations.add('cinematica',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],10,true);
    //INSERT COIN ANIMATION
    this.splash.animations.add('coin',[29,30],1,true);   
     
    this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
    
    this.flow = 20;
    
        
        //this.cursors=this.game.input.keyboard.createCursorKeys();    
        //this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        
    },
    update:function(){
    
    
    if(this.flow >= 0){
        this.splash.animations.play('cinematica');   
        this.flow -= 0.12;
            
    }
    else{
       this.splash.animations.play('coin');
        if (this.space.isDown){
           //SALTAR AL MENU WORLD
            this.music.stop();
            this.state.start('worldmap');
        }
    }
    

        
        
    }
};