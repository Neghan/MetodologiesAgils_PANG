var platformer = platformer || {};

platformer.level1 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.parentIsWindow = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        this.game.load.bitmapFont()
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
        this.goToWorldmap = false;
    },
    preload:function(){ 
        
        this.load.audio('MusicBarcelona', 'assets/audio/music/10 - Barcelona.mp3');
        
        this.load.image('bg','assets/img/barcelona.png');
        this.load.tilemap('level1','assets/tilemaps/barcelona.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.spritesheet('walls','assets/img/walls_barcelona_floor.png');
        this.load.spritesheet('walls1','assets/img/walls_barcelona.png');
        //this.load.image('moss','assets/img/tileset_edge_lv1.png');
        this.load.spritesheet('hero','assets/img/player_1.png',41,32);
        this.load.spritesheet('life','assets/img/player_1_life.png',16,16);
        this.load.spritesheet('shoot','assets/img/hook.png',9,189);
        
        this.load.spritesheet('bubble_xl','assets/img/bubble_xl.png',48,46);
        this.load.spritesheet('bubble_l','assets/img/bubble_l.png',32,30);
        this.load.spritesheet('bubble_m','assets/img/bubble_m.png',16,16);
        this.load.spritesheet('bubble_s','assets/img/bubble_s.png',10,8);
        
    },
    create:function(){
        
      this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
    
        //HUD TEXT
        this.ready = this.game.add.text(this.game.world.centerX, this.game.world.centerY-20, "READY", {
        font: "15px Pixel",
        fill: "#00FFFF",
        align: "center"
        });
        this.ready.anchor.setTo(0.5, 0.5);
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
        this.text6 = this.game.add.text(this.game.world.centerX-115, this.game.world.centerY+125, "", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text6.anchor.setTo(0.5, 0.5);
        this.timer = this.game.add.text(this.game.world.centerX+130, this.game.world.centerY-80, "TIME:", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.timer.anchor.setTo(0.5, 0.5);
        
        //LIVES
        this.lifes = this.game.add.sprite(15,230,'life',0);
        this.lifes2 = this.game.add.sprite(35,230,'life',0);
        this.lifes3 = this.game.add.sprite(55,230,'life',0);
        //this.interfaz = new platformer.HUD(this.game,this);
        
        this.timeLeft = 100;
        
        //HERO FUNCTIONS
        this.hero=this.game.add.sprite(65,40,'hero',0);
        this.hero.animations.add('walk',[0,1,2,3,4],10,true);
        //this.hero.animations.add('left',[0,1,2,3,4],10,true);
        this.hero.animations.add('idleShoot',[10,11],10,false);
        this.hero.animations.add('idle',[10],10,true);
        this.hero.animations.add('deathR',[17],10,true);
        this.hero.animations.add('deathL',[16],10,true);
        this.hero.dead=false;
        this.hero.lives = 3;
        this.hero.score = 0;
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
        
        //BUBBLE
        this.bubble = new platformer.bubble_prefab(this.game,100,100,this,0,0,1);
        this.game.add.existing(this.bubble);
        
        //MUSICA
        this.music = this.add.audio('MusicBarcelona',1,true);
        this.music.play();
        
    },
        //HIT HERO
    hitHero:function(){
        this.camera.shake(0.025,100);
        this.hero.body.velocity.x =0;
        this.hero.dead=true;
        this.hero.lives--;
    },
    hitShoot:function(){
        this.hero.score+=100;
    },
    update:function(){
        
        if (this.goToWorldmap == true){
            this.state.start('worldmap');
            this.goToWorldmap = false;
        }
        //COLISIONES
        if(!this.hero.dead){
        this.game.physics.arcade.collide(this.hero,this.muro);
        this.game.physics.arcade.collide(this.hero,this.muro2);
        this.game.physics.arcade.collide(this.bullet,this.muro2);
        this.game.physics.arcade.collide(this.hero,this.muroLados1);
        this.game.physics.arcade.collide(this.hero,this.muroLados2);
        }
        
        
        
        this.text.setText("BARCELONA");
        this.text2.setText("1-1 STAGE");
        this.text5.setText("HI: 10000");
        this.text3.setText("PLAYER - 1");
        this.text4.setText("PLAYER - 2");
        this.text6.setText(""+this.hero.score);
        
        this.timer.setText("TIME: "+0+Math.trunc(this.timeLeft));
        this.timeLeft -= 0.012;//this.game.time.now;
        
        if(this.timeLeft<=99){
            this.ready.destroy();
        }
        
        //VIDAS
        if(this.hero.lives<=2){
            this.lifes3.destroy();
            //this.state.start('level1');
        }
        if(this.hero.lives<=1){
            this.lifes2.destroy();
            //this.state.start('level1');
        }
        if(this.hero.lives<=0){
            this.lifes.destroy();
            this.goToWorldmap = true;
        }
        //ANIMACION DE MUERTE
        if(this.hero.dead){
            this.hero.animations.play('deathR');
            //this.hero.setBounce(1);
            this.hero.body.velocity.x=30;
            this.hero.body.velocity.y=30;
            this.hero.body.collideWorldBounds = false;
            //this.state.start('level1');
        }
        
        
        //MOVIMIENTO HEROE 
        if(this.cursors.left.isDown&&!this.hero.dead){
            this.hero.body.velocity.x=-gameOptions.heroSpeed;
            this.hero.animations.play('walk');
            this.hero.scale.setTo(-1,1);
        }else if(this.cursors.right.isDown&&!this.hero.dead){
            this.hero.body.velocity.x=gameOptions.heroSpeed;
            this.hero.scale.setTo(1,1);
            this.hero.animations.play('walk');
        }else if (this.space.isDown&&!this.hero.dead&&this.space.downDuration(10000)){
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
            
        }else if(!this.hero.dead){
            this.oneTime = true;
            this.hero.animations.play('idle');
            this.hero.body.velocity.x=0;
        }
       
         
        
    }
};