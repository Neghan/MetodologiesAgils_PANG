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
        this.load.spritesheet('walls','assets/img/walls_barcelona_floor.png');
        this.load.spritesheet('walls1','assets/img/walls_barcelona.png');
        //this.load.image('moss','assets/img/tileset_edge_lv1.png');
        this.load.spritesheet('hero','assets/img/player_1_locomotion.png',32,32);
        this.load.spritesheet('shoot','assets/img/hook.png',9,189);
        
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
        this.hero.animations.add('idleShoot',[5,6],10,false);
        this.hero.animations.add('idle',[5],10,true);
        this.hero.anchor.setTo(.5);
        
        this.game.physics.arcade.enable(this.hero);
        this.hero.body.allowGravity = true;
        this.hero.body.collideWorldBounds = true;
        
        this.cursors=this.game.input.keyboard.createCursorKeys();    
        this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        
        //COLISIONES MUROS
        //SUELO
        this.muro = this.game.add.sprite(0,200,'walls',0);
        this.game.physics.arcade.enable(this.muro);
        this.muro.body.allowGravity = false;
        this.muro.body.immovable = true;
        this.game.physics.arcade.collide(this.hero,this.muro);
        //TECHO
        this.muro2 = this.game.add.sprite(0,0,'walls',0);
        this.game.physics.arcade.enable(this.muro2);
        this.muro2.body.allowGravity = false;
        this.muro2.body.immovable = true;
        this.game.physics.arcade.collide(this.hero,this.muro2);
        //LEFT
        this.muroLados1 = this.game.add.sprite(0,8,'walls1',0);
        this.game.physics.arcade.enable(this.muroLados1);
        this.muroLados1.body.allowGravity = false;
        this.muroLados1.body.immovable = true;
        this.game.physics.arcade.collide(this.hero,this.muroLados1);
        //RIGHT
        this.muroLados2 = this.game.add.sprite(376,8,'walls1',0);
        this.game.physics.arcade.enable(this.muroLados2);
        this.muroLados2.body.allowGravity = false;
        this.muroLados2.body.immovable = true;
        this.game.physics.arcade.collide(this.hero,this.muroLados2);
        
        //DISPAROS
        this.oneTime = true;
        //this.bullet = this.game.add.sprite('shoot');
    },
    update:function(){
       
        //COLISIONES
        this.game.physics.arcade.collide(this.hero,this.muro);
        this.game.physics.arcade.collide(this.bullet,this.muro2);
        this.game.physics.arcade.collide(this.hero,this.muroLados1);
        this.game.physics.arcade.collide(this.hero,this.muroLados2);
        
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
        }else if (this.space.isDown){
            this.hero.animations.play('idleShoot');
            this.hero.body.velocity.x=0;
            
            if(this.oneTime){
            this.bullet = new platformer.shoot(this.game,this.hero.position.x,this.hero.position.y,240,368,100,1,this);
            this.game.add.existing(this.bullet);
            this.game.world.swap(this.hero,this.bullet);
            this.oneTime = false;
                
            //ORDEN DE DIBUJO 
            this.game.world.swap(this.timer,this.bullet);
            }
        }else{
             this.oneTime = true;
            this.hero.animations.play('idle');
            this.hero.body.velocity.x=0;
        }
       
         
        
    }
};