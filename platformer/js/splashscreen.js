var platformer = platformer || {};

var anim;


platformer.splashscreen ={
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        this.game.load.bitmapFont()
        
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        //this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        this.load.spritesheet('first','assets/menus/FirstSplashScreen(29x1)Max_Resolution.png',384,308);
        //this.load.image('moss','assets/img/tileset_edge_lv1.png');
        this.load.spritesheet('coin','assets/menus/SplashcreenInsertCoin(2x1).png',384,308);
        //this.load.spritesheet('shoot','assets/img/player_1_shoot.png',32,32);
        //this.load.spritesheet('door','assets/img/door.png',32,40);
        
    },

    create:function(){
      this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');

        
    //FIRST ANIMATION
    this.first=this.game.add.sprite(0,0,'first');
    this.first.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],10,true);
    
    
    
    //INSERT COIN ANIMATION
    this.coin=this.game.add.sprite(0,0,'coin');
    this.coin.animations.add('insert',[0,1],1,true);    

        
        //this.cursors=this.game.input.keyboard.createCursorKeys();    
        //this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        
    },
    update:function(){
    this.first.animations.play('play');
    this.coin.animations.play('insert');

        
        
    }
};