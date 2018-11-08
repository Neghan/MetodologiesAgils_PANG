var platformer = platformer || {};

platformer.level1 ={
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        this.game.load.bitmapFont()
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        this.load.image('bg','assets/img/barcelona.png');
        this.load.tilemap('level1','assets/tilemaps/barcelona.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('walls','assets/img/walls_barcelona.png');
        //this.load.image('moss','assets/img/tileset_edge_lv1.png');
        this.load.spritesheet('hero','assets/img/player_1_locomotion.png',32,32);
        //this.load.spritesheet('shoot','assets/img/player_1_shoot.png',32,32);
        //this.load.spritesheet('door','assets/img/door.png',32,40);
        
    },
    create:function(){
      this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
        
        //HUD TEXT
        this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY+115, "Barcelona", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.text2 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+140, "1-1 Stage", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text2.anchor.setTo(0.5, 0.5);
        this.text3 = this.game.add.text(this.game.world.centerX-150, this.game.world.centerY+115, "PLAYER - 1", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text3.anchor.setTo(0.5, 0.5);
        this.text4 = this.game.add.text(this.game.world.centerX+150, this.game.world.centerY+115, "PLAYER - 2", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text4.anchor.setTo(0.5, 0.5);
        this.text5 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+150, "HI: 10000", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text5.anchor.setTo(0.5, 0.5);
        this.timer = this.game.add.text(this.game.world.centerX+130, this.game.world.centerY-80, "TIME:", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.timer.anchor.setTo(0.5, 0.5);
        this.timeLeft = 100;
        
        //HERO FUNCTIONS
        this.hero=this.game.add.sprite(65,140,'hero',0);
        this.hero.animations.add('right',[0,1,2,3,4],10,true);
        this.hero.animations.add('left',[0,1,2,3,4],10,true);
        this.hero.animations.add('idleShoot',[5],10,false);
        this.hero.anchor.setTo(.5);
        
        this.game.physics.arcade.enable(this.hero);
        this.hero.body.allowGravity = true;
        this.hero.body.collideWorldBounds = true;
        
        this.cursors=this.game.input.keyboard.createCursorKeys();    
        this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        
        //COLISIONES MUROS
        for(var i =0;i<50;++i){
        this.muro = this.game.add.sprite(i*8,260,'walls',0);
        this.game.physics.arcade.enable(this.muro);
        this.muro.body.allowGravity = false;
        this.muro.body.immovable = true;
        }
        
    },
    update:function(){
      //this.entry.animations.play('open');
        this.game.physics.arcade.collide(this.hero,this.muro);
        //this.game.physics.arcade.collide(this.hero,this.walls);
        this.text.setText("BARCELONA");
        this.text2.setText("1-1 STAGE");
        this.text5.setText("HI: 10000");
        this.text3.setText("PLAYER - 1");
        this.text4.setText("PLAYER - 2");
        
        this.timer.setText("TIME: "+0+Math.trunc(this.timeLeft));
        this.timeLeft -= 0.012;//this.game.time.now;
        
        if(this.cursors.left.isDown){
            this.hero.body.velocity.x=-gameOptions.heroSpeed;
            this.hero.animations.play('left');
            this.hero.scale.setTo(-1,1);
        }else if(this.cursors.right.isDown){
            this.hero.body.velocity.x=gameOptions.heroSpeed;
            this.hero.scale.setTo(1,1);
            this.hero.animations.play('right');
        }
        else{
            this.hero.animations.play('idleShoot');
               this.hero.body.velocity.x=0;
        }
        
        if (this.space.isDown){
           //DISPARAR
        }
        
        
    }
};