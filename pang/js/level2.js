var platformer = platformer || {};

platformer.level2 ={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.parentIsWindow = true;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight-50);
        this.game.load.bitmapFont()
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
        this.goToWorldmap = false;
    },
    preload:function(){ 
        this.load.image('bg','assets/img/nueva_york.png');
        //CARGA DEL MAPA
       this.load.tilemap('TilemapNY','assets/tilemaps/TilemapNY.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.image('stairs','assets/UtilsLevel/stairs.png');
        this.load.image('border','assets/UtilsLevel/border.png');
        this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
        
        this.load.audio('MusicBarcelona', 'assets/audio/music/10 - Barcelona.mp3');
        
        
        this.load.spritesheet('walls','assets/img/walls_barcelona_floor.png');
        this.load.spritesheet('walls1','assets/img/walls_barcelona.png');

        this.load.spritesheet('hero','assets/img/player_1.png',41,32);
        this.load.spritesheet('life','assets/img/player_1_life.png',16,16);
        this.load.spritesheet('shoot','assets/img/hook.png',9,189);
        this.load.spritesheet('fruta','assets/img/Fruit.png',16,16);
        this.load.spritesheet('loot','assets/img/loot.png',16,16);
        
        this.load.spritesheet('bubble_xl','assets/img/bubble_xl.png',48,46);
        this.load.spritesheet('bubble_l','assets/img/bubble_l.png',32,30);
        this.load.spritesheet('bubble_m','assets/img/bubble_m.png',16,16);
        this.load.spritesheet('bubble_s','assets/img/bubble_s.png',10,8);
        
        this.load.spritesheet('destructibles2','assets/img/destructibles2.png',8,31);
        
    },
    create:function(){

        this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
        
        //CREACION DEL TILEMAP
        this.map=this.game.add.tilemap('TilemapNY');
        this.map.addTilesetImage('stairs');
        this.map.addTilesetImage('border');
        this.map.addTilesetImage('unbreakable_platform');
        
        this.walls_layer = this.map.createLayer('tile_walls_layer');
        this.unbreakable_layer = this.map.createLayer('unbreakable_layer');
        this.stairs_layer = this.map.createLayer('stairs_layer');
        
        this.map.setCollisionBetween(1,999,true,'tile_walls_layer');
        this.map.setCollisionBetween(1,999,true,'stairs_layer');
        this.map.setCollisionBetween(1,999,true,'unbreakable_layer');
        
        //HUD
        this.hud = new platformer.HUD(this.game,this,"New York","14-1 Stage");
        this.timer = this.game.add.text(this.game.world.centerX+130, this.game.world.centerY-80, "TIME:", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.timer.anchor.setTo(0.5, 0.5);
        
        //DISPAROS
        this.oneTime = true;
        this.bulletCollisionGroup = this.game.add.group();
        this.bulletCollisionGroup.enableBody = true;
        this.bulletCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bulletArray = [];
        
        //LIVES
        if(gameOptions.heroHP==3){
            this.lifes = this.game.add.sprite(15,230,'life',0);
            this.lifes2 = this.game.add.sprite(35,230,'life',0);
            this.lifes3 = this.game.add.sprite(55,230,'life',0);
        }else if(gameOptions.heroHP==1){
            this.lifes = this.game.add.sprite(15,230,'life',0);
            this.lifes2 = this.game.add.sprite(35,230,'life',0);
        }else if(gameOptions.heroHP==1){
            this.lifes = this.game.add.sprite(15,230,'life',0);
        }
        
        this.timeLeft = 100;
        this.timeSpawnFruit = 15;
        
        //HERO FUNCTIONS
        this.hero=this.game.add.sprite(65,40,'hero',0);
        this.hero.animations.add('walk',[0,1,2,3,4],10,true);
        //this.hero.animations.add('left',[0,1,2,3,4],10,true);
        this.hero.animations.add('idleShoot',[10,11],10,false);
        this.hero.animations.add('idle',[10],10,true);
        this.hero.animations.add('deathR',[17],10,true);
        this.hero.animations.add('deathL',[16],10,true);
        this.hero.animations.add('stairsUp',[7,8,9,10],10,true);
        this.hero.dead=false;
        this.hero.lives = 3;
        this.hero.score = 0;
        this.hero.anchor.setTo(.5);
        
        this.game.physics.arcade.enable(this.hero);
        this.hero.body.allowGravity = true;
        this.hero.body.collideWorldBounds = true;
        
        this.cursors=this.game.input.keyboard.createCursorKeys();    
        this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        
        //BUBBLES
        this.bubbleCollisionGroup = this.game.add.group();
        this.bubbleCollisionGroup.enableBody = true;
        this.bubbleCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bubbleArray = [];
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,0,1));
        
        //POWERUP PICK UP
        this.powerupCollisionGroup = this.game.add.group();
        this.powerupCollisionGroup.enableBody = true;
        this.powerupCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.powerupArray = [];
        
        //COLLISIONES
        this.destructiblesInst = new platformer.destructibles(this.game,70,80,this);
        this.game.add.existing(this.destructiblesInst);

        this.destructiblesInst1 = new platformer.destructibles(this.game,90,30,this);
        this.game.add.existing(this.destructiblesInst1);
        
    
        
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
        gameOptions.heroHP-=1;
    },
    
    hitShoot:function(){
        this.hero.score+=100;
    },
    
    hitFruit:function(){
        this.hero.score+=250;
    },
    
        collHero:function(powerUpType){
        console.log("Adri implementa el Power Up");
        console.log("Estoy en ello danielom");
        if(powerUpType == 0){//UZI
            //TODO
        } else if(powerUpType == 1){//SHIELD
            this.hero.shield = true;
            this.shield.visible = true;
        } else if(powerUpType == 2){//  DYNAMITE
            //TODO
        }else if(powerUpType == 3){//EXTRA TIME
            //TODO
        }else if(powerUpType == 4){//STOP TIME
            //TODO
        }else if(powerUpType == 5){//DOUBLE HOOK
            //TODO
        }else if(powerUpType == 6){//POWER WIRE
            //TODO
        }
    },
    
    spawnFruit:function(){
        this.comida = new platformer.fruits(this.game,this.game.world.centerX,25,this);
        this.game.add.existing(this.comida);
    },
    
    spawnLoot:function(x, y){
    this.powerupArray.push(new platformer.loot_powerup(this.game, x, y,this));
        //this.POWUP = new platformer.loot_powerup(this.game, x, y,this);
        //this.game.add.existing(this.POWUP);
        console.log("Spawn Power Up");
    },
    
    spawnBubbles:function(x, y, size, color, direction){
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,x,y,this,size,color,direction));
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,x,y,this,size,color,-direction));
    },
    
    update:function(){
        
        if (this.goToWorldmap == true){
            this.state.start('worldmap');
            this.goToWorldmap = false;
        }
        //COLISIONES
       if(!this.hero.dead){
        this.game.physics.arcade.collide(this.hero,this.walls_layer);
        this.game.physics.arcade.collide(this.hero,this.unbreakable_layer);
        this.game.physics.arcade.collide(this.bullet,this.walls_layer);
        this.game.physics.arcade.collide(this.comida,this.walls_layer);
        this.game.physics.arcade.collide(this.comida,this.unbreakable_layer);
        this.game.physics.arcade.collide(this.POWUP,this.walls_layer);
           this.game.physics.arcade.collide(this.POWUP,this.unbreakable_layer);
        }
        
        console.log(this.bubbleCollisionGroup.length);
        //CONDICION DE VICTORIA --> MATAS TODAS LAS BURBUJAS
        if (this.bubbleCollisionGroup.length == 0) {
            
            gameOptions.heroScore = this.hero.score;
            gameOptions.timeBonus = Math.trunc(this.timeLeft);
            gameOptions.currentLevel = "Level 2";
            this.music.stop();
            this.state.start('solvedlevel'); 
        }
        
        this.timer.setText("TIME: "+0+Math.trunc(this.timeLeft));
        this.timeLeft -= 0.012;//this.game.time.now;
        
        //Flickering Effect Ready
        if(this.timeLeft<=100&&this.timeLeft>=99){
            //this.hud.ready.alpha = 255;
        }
        if(this.timeLeft<100&&this.timeLeft>99){
             //this.hud.ready.alpha =0;
        }
        if(this.timeLeft<=99){
            //this.game.paused = true;
            this.hud.ready.destroy();
            this.game.paused = false;
        }
        
        //VIDAS
        if(gameOptions.heroHP==2 &&gameOptions.onceLevel1){
           //this.lifes3.destroy();
            this.music.stop();
            this.state.start('level2');
            gameOptions.onceLevel1 = false;
        }else if(gameOptions.heroHP==1&&gameOptions.onceLevel2){
            //this.lifes2.destroy();
            this.music.stop();
            gameOptions.onceLevel2= false;
            this.state.start('level2');
        }else if(gameOptions.heroHP==0&&gameOptions.onceLevel3){
            //this.lifes.destroy();
            this.music.stop();
            gameOptions.onceLevel3 = false;
            gameOptions.heroHP = 3;
            this.goToWorldmap = true;
            gameOptions.onceLevel1  = true;
            gameOptions.onceLevel2  = true;
            gameOptions.onceLevel3  = true;
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
        
       ;
        //MOVIMIENTO HEROE 
        
        if(this.cursors.left.isDown&&!this.hero.dead){
            this.hero.body.velocity.x=-gameOptions.heroSpeed;
            this.hero.animations.play('walk');
            this.hero.scale.setTo(-1,1);
        }else if(this.cursors.right.isDown&&!this.hero.dead){
            this.hero.body.velocity.x=gameOptions.heroSpeed;
            this.hero.scale.setTo(1,1);
            this.hero.animations.play('walk');
        }else if (this.space.isDown&& !this.hero.dead){
            this.hero.animations.play('idleShoot');
            this.hero.body.velocity.x=0;
                if(this.oneTime){
                    if(this.hero.uzi){
                        this.bulletArray.push(new platformer.shoot(this.game,this.hero.position.x,this.hero.position.y,240,368,100,1,this,2));
                    
                        //this.game.world.swap(this.hero,this.bulletArray);
                        this.oneTime = false;
                        //ORDEN DE DIBUJO 
                        //this.game.world.swap(this.timer,this.bulletArray);
                    } else if (this.bulletCollisionGroup.length < 1 || (this.bulletCollisionGroup.length < 2 && this.hero.doubleHook)){
                        if(this.hero.powerWire){
                            this.bulletArray.push(new platformer.shoot(this.game,this.hero.position.x,this.hero.position.y,240,368,100,1,this,1));
                        } else {
                            this.bulletArray.push(new platformer.shoot(this.game,this.hero.position.x,this.hero.position.y,240,368,100,1,this,0));
                        }
                        this.oneTime = false;
                    }
                }
        
        }else if(this.game.physics.arcade.overlap(this.hero,this.powerupArray)==true&&!this.hero.dead){
            
           if(this.cursors.up.isDown&&!this.hero.dead){
               this.hero.animations.play('stairsUp');
               this.hero.body.velocity.y=-gameOptions.heroSpeed;
           }else if(this.cursors.down.isDown&&!this.hero.dead){
               this.hero.animations.play('stairsUp');
                this.hero.body.velocity.y=gameOptions.heroSpeed;
           }
        }
        else if(!this.hero.dead){
            this.oneTime = true;
            this.hero.animations.play('idle');
            this.hero.body.velocity.x=0;
        }
        
        //SPAWN FRUIT
        if (this.timeSpawnFruit <= 0){
            this.spawnFruit();
            this.timeSpawnFruit = 15;
        }
        else{
            this.timeSpawnFruit -= 0.012;
        }
       
         
        
    }
};