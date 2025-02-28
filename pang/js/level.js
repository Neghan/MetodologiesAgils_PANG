var platformer = platformer || {};

platformer.level ={
    init:function(){
        
        //INICIALIZAR VENTANA Y SISTEMA DE FÍSICAS
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
        
        
        this.load.spritesheet('walls','assets/img/walls_barcelona_floor.png');
        this.load.spritesheet('walls1','assets/img/walls_barcelona.png');
        this.load.spritesheet('escaleras','assets/img/stairs.png');
        this.load.spritesheet('escaleras1','assets/img/stairs1.png');
        this.load.spritesheet('escaleras2','assets/img/stairs3.png');
        
        this.load.spritesheet('hero','assets/img/player_1.png',41,32);
        this.load.spritesheet('hero2', 'assets/img/player_2.png',41,32);
        this.load.spritesheet('life','assets/img/player_1_life.png',16,16);
        this.load.spritesheet('life2','assets/img/player_2_one_up.png',16,16);
        
        this.load.spritesheet('shoot','assets/img/hook.png',9,189);
        this.load.spritesheet('powerWire','assets/img/power_wire.png',9,191);
        this.load.spritesheet('uzi','assets/img/vulcan_missile.png',16,9);
        
        this.load.spritesheet('fruta','assets/img/Fruit.png',16,16);
        this.load.spritesheet('loot','assets/img/loot.png',16,16);
        
        this.load.spritesheet('bubble_xl','assets/img/bubble_xl.png',48,46);
        this.load.spritesheet('bubble_l','assets/img/bubble_l.png',32,30);
        this.load.spritesheet('bubble_m','assets/img/bubble_m.png',16,16);
        this.load.spritesheet('bubble_s','assets/img/bubble_s.png',10,8);
        
        this.load.spritesheet('shield','assets/img/shield.png',32,39);
        
        this.load.spritesheet('buho','assets/img/buho.png',32,29);
        this.load.spritesheet('colibri','assets/img/colibri.png',32,26);
        this.load.spritesheet('cangrejo','assets/img/cangrejo.png',32,28);
        
        this.load.spritesheet('destructibles2','assets/img/destructibles2.png',8,31);
        
        //CADA NIVEL CON SUS LOADS NO VAN LOS NAMESPACEPS Y HAGO ESTE IF TRUE PARA QUE NO OCUPE MUCHO
                
        if (true){
        
            if (gameOptions.currentLevel == 1){
            this.load.image('bg','assets/img/BG/BG01.png');
            this.load.audio('musica', 'assets/audio/music/M01.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapBCN.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 2){
            this.load.image('bg','assets/img/BG/BG02.png');    
            this.load.audio('musica', 'assets/audio/music/M02.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapNY.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 3){
            this.load.image('bg','assets/img/BG/BG03.png');    
            this.load.audio('musica', 'assets/audio/music/M03.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapGUI.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 4){
            this.load.image('bg','assets/img/BG/BG04.png');    
            this.load.audio('musica', 'assets/audio/music/M04.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAW.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
    
            else if (gameOptions.currentLevel == 5){
            this.load.image('bg','assets/img/BG/BG05.png');    
            this.load.audio('musica', 'assets/audio/music/M05.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAust.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 6){
            this.load.image('bg','assets/img/BG/BG06.png');    
            this.load.audio('musica', 'assets/audio/music/M06.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapNY.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 7){
            this.load.image('bg','assets/img/BG/BG07.png');    
            this.load.audio('musica', 'assets/audio/music/M07.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAW.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 8){
            this.load.image('bg','assets/img/BG/BG08.png');    
            this.load.audio('musica', 'assets/audio/music/M08.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapGUI.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
    
            else if (gameOptions.currentLevel == 9){
            this.load.image('bg','assets/img/BG/BG09.png');    
            this.load.audio('MusicGuilin', 'assets/audio/music/M09.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAust.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 10){
            this.load.image('bg','assets/img/BG/BG10.png');    
            this.load.audio('musica', 'assets/audio/music/M10.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAW.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 11){
            this.load.image('bg','assets/img/BG/BG11.png');    
            this.load.audio('musica', 'assets/audio/music/M11.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapGUI.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 12){
            this.load.image('bg','assets/img/BG/BG12.png');    
            this.load.audio('musica', 'assets/audio/music/M12.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapNY.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
    
            else if (gameOptions.currentLevel == 13){
            this.load.image('bg','assets/img/BG/BG13.png');    
            this.load.audio('musica', 'assets/audio/music/M13.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAust.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 14){
            this.load.image('bg','assets/img/BG/BG14.png');    
            this.load.audio('musica', 'assets/audio/music/M14.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapAW.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 15){
            this.load.image('bg','assets/img/BG/BG15.png');    
            this.load.audio('musica', 'assets/audio/music/M15.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapGUI.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 16){
            this.load.image('bg','assets/img/BG/BG16.png');    
            this.load.audio('musica', 'assets/audio/music/M16.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapNY.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
    
            else if (gameOptions.currentLevel == 17){
            this.load.image('bg','assets/img/BG/BG17.png');    
            this.load.audio('musica', 'assets/audio/music/M17.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/TilemapBCN.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            
            else if (gameOptions.currentLevel == 18){
            this.load.image('bg','assets/img/BG/BG18.png');    
            this.load.audio('musica', 'assets/audio/music/M17.mp3');
            //CARGA DEL MAPA
            this.load.tilemap('Tilemap','assets/tilemaps/Tilemap2Players.json',null,Phaser.Tilemap.TILED_JSON);
            this.load.image('border','assets/UtilsLevel/border.png');
            this.load.image('stairs','assets/UtilsLevel/stairs.png');
            this.load.image('unbreakable_platform','assets/UtilsLevel/unbreakable_platform.png');
            }
            //#endRegion
        }

        
        //SOUNDEFFECTS     
        this.load.audio('Bubble_Explosion','assets/audio/soundeffects/Bubble_Explosion.wav');
        this.load.audio('Buho_die','assets/audio/soundeffects/Buho_die.wav');
        this.load.audio('Colibri_die','assets/audio/soundeffects/Colibri_die.wav');
        this.load.audio('Crab_die','assets/audio/soundeffects/Crab_die.ogg');
        this.load.audio('Pick_Fruit','assets/audio/soundeffects/Pick_Fruit.mp3');
        this.load.audio('Pick_Extra_Time','assets/audio/soundeffects/Pick_Extra_Time.wav');
        this.load.audio('Player_Die','assets/audio/soundeffects/Player_Die.mp3');
        this.load.audio('Get_Points','assets/audio/soundeffects/Get_Points.wav');
        
        this.load.audio('ShootSound','assets/audio/soundeffects/Shoot.wav');
        this.load.audio('UZI','assets/audio/soundeffects/UZI.wav');
        this.load.audio('DynamiteExplosion','assets/audio/soundeffects/DynamiteExplosion.wav');
        this.load.audio('Freeze_Time','assets/audio/soundeffects/Freeze_Time.wav');
        this.load.audio('Shield_Activate','assets/audio/soundeffects/Shield_Activate.wav');
        this.load.audio('Shield_Destroyed','assets/audio/soundeffects/Shield_Destroyed.wav');
        this.load.audio('No_Inmediate_Pow_Up','assets/audio/soundeffects/No_Inmediate_Pow_Up.wav');
        
        this.playUZISound = true;
        this.playDinamiteSound = true;
        this.playFrezzeTimeSound = true;
        this.playExtraTimeSound = true;
        this.playNoInmediatePowUp = true;
        
    },
    create:function(){
        
        
        this.Pause = this.input.keyboard.addKey(Phaser.Keyboard.P);
        this.Pause.onDown.add(function(){this.FunPause();},this);
        
        gameOptions.dead = false;

        this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
        
        this.map=this.game.add.tilemap('Tilemap');
        this.map.addTilesetImage('stairs');
        this.map.addTilesetImage('border');
        this.map.addTilesetImage('unbreakable_platform');
        
        this.walls_layer = this.map.createLayer('tile_walls_layer');
        this.unbreakable_layer = this.map.createLayer('unbreakable_layer');
        this.stairs_layer = this.map.createLayer('stairs_layer');
        
        
        this.map.setCollisionBetween(1,999,true,'tile_walls_layer');
        this.map.setCollisionBetween(1,999,true,'stairs_layer');
        this.map.setCollisionBetween(1,999,true,'unbreakable_layer');
        
        //STORAGE SCORE
        this.localStorageName = "PANGLevel" + gameOptions.currentLevel;
        this.highScore = localStorage.getItem(this.localStorageName) == null ? 0 : localStorage.getItem(this.localStorageName);
        
        //EL HUD PERSONAL DE CADA NIVEL CON EL IF TRUE PARA QUE NO OCUPE MUCHO
        if (true){
            if (gameOptions.currentLevel == 1){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"1-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 2){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"2-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 3){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"3-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 4){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"4-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 5){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"5-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 6){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"6-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 7){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"7-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 8){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"8-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 9){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"9-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 10){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"10-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 11){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"11-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 12){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"12-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 13){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"13-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 14){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"14-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 15){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"15-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 16){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"16-1 Stage",this.highScore);
            } 
            else if (gameOptions.currentLevel == 17){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"17-1 Stage",this.highScore);
            }
            else if (gameOptions.currentLevel == 18){
                this.hud = new platformer.HUD(this.game,this,gameOptions.currentLevelName,"Get the best Score!",this.highScore);
            }
            else{
                this.hud = new platformer.HUD(this.game,this,"OUT OF RANGE","1-1 Stage",this.highScore);
            }
        }
        
        //HUD
        this.timer = this.game.add.text(this.game.world.centerX+130, this.game.world.centerY-80, "TIME:", {
        font: "20px Arial",
        fill: "#ffffff",
        align: "left"
        });
        this.timer.anchor.setTo(0.5, 0.5);
        
        //GAME OVER
        this.gameOverText = this.game.add.text(this.game.world.centerX-150, this.game.world.centerY+135, " ", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.gameOverText.anchor.setTo(0.5, 0.5);
        
        //PAUSE MENU
        this.PauseText = this.game.add.text(this.game.world.centerX -31, this.game.world.centerY - 15, " ", {
            font: "15px Pixel",
            fill: "#000000",
            align: "left"
        });
        this.PressP = this.game.add.text(this.game.world.centerX - 70, this.game.world.centerY + 15, " ", {
            font: "15px Pixel",
            fill: "#000000",
            align: "left"
        });
        
        //DISPAROS
        this.bulletCollisionGroup = this.game.add.group();
        this.bulletCollisionGroup.enableBody = true;
        this.bulletCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bulletArray = [];
        
        
        //STAIRS
        if(gameOptions.currentLevel == 2|| gameOptions.currentLevel == 6||gameOptions.currentLevel == 12||gameOptions.currentLevel == 16){
        this.escaleras = this.game.add.sprite(300,160, 'escaleras', 0);
        this.escaleras.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras, Phaser.Physics.ARCADE);
        this.escaleras.body.immovable = true;
        this.escaleras.body.allowGravity = false;
        }else if(gameOptions.currentLevel == 3 || gameOptions.currentLevel == 8||gameOptions.currentLevel == 11||gameOptions.currentLevel == 15){
        this.escaleras1 = this.game.add.sprite(220,160, 'escaleras', 0);
        this.escaleras1.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras1, Phaser.Physics.ARCADE);
        this.escaleras1.body.immovable = true;
        this.escaleras1.body.allowGravity = false;
        
        this.escaleras2 = this.game.add.sprite(164,160, 'escaleras', 0);
        this.escaleras2.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras2, Phaser.Physics.ARCADE);
        this.escaleras2.body.immovable = true;
        this.escaleras2.body.allowGravity = false;
            
        this.escaleras3 = this.game.add.sprite(116,92, 'escaleras1', 0);
        this.escaleras3.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras3, Phaser.Physics.ARCADE);
        this.escaleras3.body.immovable = true;
        this.escaleras3.body.allowGravity = false;
        
        this.escaleras4 = this.game.add.sprite(268,92, 'escaleras1', 0);
        this.escaleras4.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras4, Phaser.Physics.ARCADE);
        this.escaleras4.body.immovable = true;
        this.escaleras4.body.allowGravity = false;
        }else if(gameOptions.currentLevel == 4|| gameOptions.currentLevel == 7|| gameOptions.currentLevel == 10||gameOptions.currentLevel == 14){
            
        this.escaleras = this.game.add.sprite(44,156, 'escaleras2', 0);
        this.escaleras.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras, Phaser.Physics.ARCADE);
        this.escaleras.body.immovable = true;
        this.escaleras.body.allowGravity = false;
            
        this.escaleras1 = this.game.add.sprite(284,156, 'escaleras2', 0);
        this.escaleras1.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras1, Phaser.Physics.ARCADE);
        this.escaleras1.body.immovable = true;
        this.escaleras1.body.allowGravity = false;
        }else if(gameOptions.currentLevel == 5||gameOptions.currentLevel == 9||gameOptions.currentLevel == 13){
            ///////////////////////////////////////////////////
        this.escaleras1 = this.game.add.sprite(292,160, 'escaleras', 0);
        this.escaleras1.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras1, Phaser.Physics.ARCADE);
        this.escaleras1.body.immovable = true;
        this.escaleras1.body.allowGravity = false;
            
        this.escaleras2 = this.game.add.sprite(44,160, 'escaleras', 0);
        this.escaleras2.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras2, Phaser.Physics.ARCADE);
        this.escaleras2.body.immovable = true;
        this.escaleras2.body.allowGravity = false;
        
        this.escaleras3 = this.game.add.sprite(108,88,'escaleras', 0);
        this.escaleras3.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras3, Phaser.Physics.ARCADE);
        this.escaleras3.body.immovable = true;
        this.escaleras3.body.allowGravity = false;
            
        this.escaleras4 = this.game.add.sprite(196,88, 'escaleras', 0);
        this.escaleras4.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras4, Phaser.Physics.ARCADE);
        this.escaleras4.body.immovable = true;
        this.escaleras4.body.allowGravity = false;
            ///////////////////////////////////////////////////
        }else if(gameOptions.currentLevel == 18){
            
        this.escaleras = this.game.add.sprite(140,160, 'escaleras', 0);
        this.escaleras.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras, Phaser.Physics.ARCADE);
        this.escaleras.body.immovable = true;
        this.escaleras.body.allowGravity = false;
            
        this.escaleras1 = this.game.add.sprite(244,160, 'escaleras', 0);
        this.escaleras1.anchor.setTo(.5);
        this.game.physics.enable(this.escaleras1, Phaser.Physics.ARCADE);
        this.escaleras1.body.immovable = true;
        this.escaleras1.body.allowGravity = false;
        }
        
        
        //LIVES
        if(gameOptions.hero1HP==3){
            this.lifes = this.game.add.sprite(15,230,'life',0);
            this.lifes2 = this.game.add.sprite(35,230,'life',0);
            this.lifes3 = this.game.add.sprite(55,230,'life',0);
        }else if(gameOptions.hero1HP==2){
            this.lifes = this.game.add.sprite(15,230,'life',0);
            this.lifes2 = this.game.add.sprite(35,230,'life',0);
        }else if(gameOptions.hero1HP==1){
            this.lifes = this.game.add.sprite(15,230,'life',0);
        }
        
        if(gameOptions.hero2HP==3){
            this.lifesplayer2 = this.game.add.sprite(314,230,'life2',0);
            this.lifes2player2 = this.game.add.sprite(334,230,'life2',0);
            this.lifes3player2 = this.game.add.sprite(354,230,'life2',0);
        }else if(gameOptions.hero2HP==2){
            this.lifesplayer2 = this.game.add.sprite(334,230,'life2',0);
            this.lifes2player2 = this.game.add.sprite(354,230,'life2',0);
        }else if(gameOptions.hero2HP==1){
            this.lifesplayer2 = this.game.add.sprite(354,230,'life2',0);
        }
        
        this.timeLeft = 100;
        //TIME SPAWN THINGS
        this.timeSpawnFruit = 15;
        this.timeSpawnLoot = 10;
        this.timeSpawnBuho = this.game.rnd.integerInRange(10,99);
        this.timeSpawnColibri = this.game.rnd.integerInRange(10,99);
        this.timeSpawnCangrejo = this.game.rnd.integerInRange(10,99);
        
        //PLAYERS
        this.playerCollisionGroup = this.game.add.group();
        this.playerCollisionGroup.enableBody = true;
        this.playerCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.playerArray = [];
        this.playerArray.push(new platformer.player(this.game,65,180,this,1));
        if(gameOptions.currentLevel == 18){
            this.playerArray.push(new platformer.player(this.game,319,180,this,2));
        }
        
        //BUBBLES
        this.timeSlowed = false;
        this.timeStopped = false;
        this.timeStoppedTimer = 10;
        
        this.bubbleCollisionGroup = this.game.add.group();
        this.bubbleCollisionGroup.enableBody = true;
        this.bubbleCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.bubbleArray = [];
        if(gameOptions.currentLevel == 1){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        }
        else if(gameOptions.currentLevel == 2){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 3){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 4){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 5){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,250,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,50,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 6){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,500,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        }
        else if(gameOptions.currentLevel == 7){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 8){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,50,this,0,2,1));
        }
        else if(gameOptions.currentLevel == 9){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,500,50,this,3,2,1));
        }
        else if(gameOptions.currentLevel == 10){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,50,this,2,2,1));

        }
        else if(gameOptions.currentLevel == 11){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,50,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,1,2,1));
        }
        else if(gameOptions.currentLevel == 12){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,4,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,3,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,4,2,1));
        }
        else if(gameOptions.currentLevel == 13){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,275,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,275,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 14){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,275,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,275,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 15){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,2,2,1));
        }
        else if(gameOptions.currentLevel == 16){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,100,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,300,50,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,50,this,1,2,1));
        }
        else if(gameOptions.currentLevel == 17){
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,250,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,100,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,90,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,450,70,this,0,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,80,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,250,80,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,400,80,this,1,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,200,80,this,2,2,1));
        this.bubbleArray.push(new platformer.bubble_prefab(this.game,450,80,this,2,2,1));
        }
        
        else if (gameOptions.currentLevel == 18){
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,100,100,this,0,2,1));
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,284,100,this,0,0,-1));
        }
        
        this.delayWinCondition = 2;
        
        //POWERUP PICK UP
        this.powerupCollisionGroup = this.game.add.group();
        this.powerupCollisionGroup.enableBody = true;
        this.powerupCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.powerupArray = [];
        
        //ENEMY BUHO
        this.buhoCollisionGroup = this.game.add.group();
        this.buhoCollisionGroup.enableBody = true;
        this.buhoCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.buhoArray = [];
        
        //ENEMY COLIBRI
        this.colibriCollisionGroup = this.game.add.group();
        this.colibriCollisionGroup.enableBody = true;
        this.colibriCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.colibriArray = [];
                       
        //ENEMY CANGREJO
        this.cangrejoCollisionGroup = this.game.add.group();
        this.cangrejoCollisionGroup.enableBody = true;
        this.cangrejoCollisionGroup.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.cangrejoArray = [];
                
        //DELAY WIN CONDITION
        this.delayWinCondition = 2;
        
        //DELAY GAME OVER
        this.delayGameOver = 2;
        
        //MUSICA
        this.music = this.add.audio('musica',1,true);
        this.music.play();
        
        //SOUNDEFFECTS
        this.bubbleExplosion = this.add.audio('Bubble_Explosion');
        this.ColibriDie = this.add.audio('Colibri_die');
        this.BuhoDie = this.add.audio('Buho_die');
        this.CrabDie = this.add.audio('Crab_die');
        this.PickFruit = this.add.audio('Pick_Fruit');
        this.GetPoints = this.add.audio('Get_Points');
        
        this.PlayerDie = this.add.audio('Player_Die');
        
        this.ShootSound = this.add.audio('ShootSound');
        this.UZI = this.add.audio('UZI');
        this.DynamiteExplosion = this.add.audio('DynamiteExplosion');
        this.FrezzeTime = this.add.audio('Freeze_Time');
        this.ExtraTime = this.add.audio('Pick_Extra_Time');
        this.ShieldActivate = this.add.audio('Shield_Activate');
        this.ShieldDestroyed = this.add.audio('Shield_Destroyed');
        this.NoInmediatePowUp = this.add.audio('No_Inmediate_Pow_Up');
        
        this.loopShield = new Phaser.Sound(this,'Shield_Activate',1,true);
        
         //COLLISIONES
        if (gameOptions.currentLevel == 2){
        this.destructiblesInst = new platformer.destructibles(this.game,70,80,this);
        this.game.add.existing(this.destructiblesInst);

        this.destructiblesInst1 = new platformer.destructibles(this.game,90,30,this);
        this.game.add.existing(this.destructiblesInst1);
        }
        
        this.player1Won = false;
        this.player2Won = false;
        
    },
    checkOverlap:function(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

    },
    
    FunPause:function(){
        this.game.paused = this.game.paused? false:true;
        if (this.game.paused){
            this.PauseText.setText("PAUSED")
            this.PressP.setText("PRESS P TO RESUME")
        }
        else{
            this.PauseText.setText(" ")
            this.PressP.setText(" ")
        }
    },
    
        //HIT HERO
    hitHero:function(playerNum){
        if(playerNum == 2){
            if(!this.playerArray[playerNum - 1].shielded && this.playerArray[playerNum - 1].invincibilityFrames <= 0){
                if (gameOptions.dead2 == false){
                this.PlayerDie.play();
                this.camera.shake(0.025,100);
                this.playerArray[playerNum - 1].body.velocity.x =0;
                this.playerArray[playerNum - 1].dead=true;
                gameOptions.dead2 = true;
                gameOptions.hero2HP-=1;
                }
            } else if (this.playerArray[playerNum - 1].invincibilityFrames <= 0){
                this.playerArray[playerNum - 1].shield = false;
                this.playerArray[playerNum - 1].shield.visible = false;
                this.playerArray[playerNum - 1].invincibilityFrames = 2;
                this.loopShield.stop();
            } 
        } else {
            if(!this.playerArray[playerNum - 1].shielded && this.playerArray[playerNum - 1].invincibilityFrames <= 0){
                if (gameOptions.dead1 == false){
                    this.PlayerDie.play();
                    this.camera.shake(0.025,100);
                    this.playerArray[playerNum - 1].body.velocity.x =0;
                    this.playerArray[playerNum - 1].dead=true;
                    gameOptions.dead1 = true;
                    gameOptions.hero1HP-=1;
                }
            } else if (this.playerArray[playerNum - 1].invincibilityFrames <= 0){
                this.playerArray[playerNum - 1].shielded = false;
                this.playerArray[playerNum - 1].shield.visible = false;
                this.playerArray[playerNum - 1].invincibilityFrames = 2;
                this.loopShield.stop();
            }
        }
    },
    
    hitShoot:function(playerNum){
        this.playerArray[playerNum - 1].score+=100;
        this.GetPoints.play();
    },
    
    hitFruit:function(playerNum){
        this.playerArray[playerNum - 1].score+=250;
        this.GetPoints.play();
    },
    
    //buhoHitShoot:function(){
    //  this.hero.score+= 500;  
    //},
    
    collHero:function(powerUpType, playerNum){
        if(powerUpType == 0){//UZI
            this.playerArray[playerNum - 1].uzi = true;
            if (this.playNoInmediatePowUp == true){
                this.NoInmediatePowUp.play();           //Pick song done
                this.playNoInmediatePowUp = false;
            }
        } else if(powerUpType == 1){//SHIELD
            if(!this.playerArray[playerNum - 1].shielded){
                this.loopShield.play();
            }
            this.playerArray[playerNum - 1].shielded = true;
            this.playerArray[playerNum - 1].shield.visible = true;
        } else if(powerUpType == 2){//  DYNAMITE
           if(this.playDinamiteSound == true){
                this.DynamiteExplosion.play();
                this.playDinamiteSound = false;
            }
            for(i = 0; i < this.bubbleArray.length; i++){
                if(this.bubbleArray[i].size < 3){
                    this.bubbleArray[i].animations.play('explode');
                    if (!this.bubbleArray[i].exploded && this.bubbleArray[i].size < 3){
                        this.spawnBubbles(this.bubbleArray[i].x, this.bubbleArray[i].y, this.bubbleArray[i].size + 1, this.bubbleArray[i].color, this.bubbleArray[i].directionX);
                    }
                    this.bubbleArray[i].exploded = true;
                }
                this.playDinamiteSound = true;
            }
        }else if(powerUpType == 3){//EXTRA TIME
            this.timeSlowed = true;
            if (this.playExtraTimeSound == true){
                this.ExtraTime.play();
                this.playExtraTimeSound = false;
            }
            this.playExtraTimeSound = true;
            for(i = 0; i < this.bubbleArray.length; i++){
                this.bubbleArray[i].acceleration /= 2;
            }
        }else if(powerUpType == 4){//STOP TIME
            this.timeStopped = true
            for(i = 0; i < this.bubbleArray.length; i++){
                this.bubbleArray[i].stopped = true;
            }
        }else if(powerUpType == 5){//DOUBLE HOOK
            this.playerArray[playerNum - 1].doubleHook = true;
            if (this.playNoInmediatePowUp == true){
                this.NoInmediatePowUp.play();               //Pick song done
                this.playNoInmediatePowUp = false;
            }
        }else if(powerUpType == 6){//POWER WIRE
            this.playerArray[playerNum - 1].powerWire = true;
            if (this.playNoInmediatePowUp == true){
                this.NoInmediatePowUp.play();               //Pick song done
                this.playNoInmediatePowUp = false;
            }
        }
        this.playNoInmediatePowUp = true;
       
        
    },
    
    spawnFruit:function(){
        this.comida = new platformer.fruits(this.game,this.game.world.centerX,25,this);
        this.game.add.existing(this.comida);
    },
    
    spawnLoot:function(x, y){
        this.powerupArray.push(new platformer.loot_powerup(this.game, x, y,this));
        //this.POWUP = new platformer.loot_powerup(this.game, x, y,this);
        //this.game.add.existing(this.POWUP);
    },
    
    spawnBubbles:function(x, y, size, color, direction){
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,x + direction * 2,y,this,size,color,direction));
            this.bubbleArray.push(new platformer.bubble_prefab(this.game,x -direction * 2,y,this,size,color,-direction));
    },
    
    update:function(){
        //COLISIONES QUE SE HACEN SIEMPRE ESTES VIVO O MUERTO (TODAS EXCEPTO LAS DEL PLAYER)  
        this.game.physics.arcade.collide(this.bullet,this.walls_layer);

        this.game.physics.arcade.collide(this.comida,this.walls_layer);
        this.game.physics.arcade.collide(this.comida,this.unbreakable_layer);

        this.game.physics.arcade.collide(this.POWUP,this.walls_layer);
        this.game.physics.arcade.collide(this.POWUP,this.unbreakable_layer);

            //CONDICION DE VICTORIA --> MATAS TODAS LAS BURBUJAS
        if(gameOptions.currentLevel == 18){
            this.player1Won = true;
            this.player2Won = true;
            for(i = 0; i < this.bubbleArray.length; i++){
                if(this.bubbleArray[i].color == 0 && !this.bubbleArray[i].exploded){
                    this.player2Won = false;
                }
                else if(this.bubbleArray[i].color == 2 && !this.bubbleArray[i].exploded){
                    this.player1Won = false;
                }
            }
            if (this.player1Won || this.player2Won) {
                this.delayWinCondition -= 0.012;
                if(this.delayWinCondition <=0){
                    this.loopShield.stop();
                    if(this.player1Won){
                        gameOptions.heroScore = this.playerArray[0].score;
                    }
                    else{
                        gameOptions.heroScore = this.playerArray[1].score;
                    }
                    if (gameOptions.heroScore > this.highScore){
                        localStorage.setItem(this.localStorageName, gameOptions.heroScore);
                    }
                    gameOptions.timeBonus = Math.trunc(this.timeLeft);
                    this.music.stop();
                    this.state.start('solvedlevel'); 
                }
            } else {
                this.delayWinCondition = 2;
            }
        }
        else{
            if (this.bubbleCollisionGroup.length == 0) {
                this.delayWinCondition -= 0.012;
                if(this.delayWinCondition <=0){
                    this.loopShield.stop();
                    gameOptions.heroScore = this.playerArray[0].score;
                    if (this.playerArray[0].score > this.highScore){
                        localStorage.setItem(this.localStorageName, this.playerArray[0].score);
                    }
                    gameOptions.timeBonus = Math.trunc(this.timeLeft);
                    this.music.stop();
                    this.state.start('solvedlevel'); 
                }
            } else {
                this.delayWinCondition = 2;
            }
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

            //SPAWN FRUIT
            if (this.timeSpawnFruit <= 0){
                this.spawnFruit();
                this.timeSpawnFruit = 15;
            }
            else{
                this.timeSpawnFruit -= 0.012;
            }

            //SPAWN BUHO
            if (this.timeSpawnBuho <= 0){
                this.buhoArray.push(new platformer.buho_prefab(this.game,-1,25,this));
                this.timeSpawnBuho = this.game.rnd.integerInRange(10,99);
            }
            else{
                this.timeSpawnBuho -= 0.012;
            } 

            //SPAWN COLIBRI
            if (this.timeSpawnColibri <= 0){
                this.randomValueDirectionColibri = this.game.rnd.integerInRange(0,1);

                if (this.randomValueDirectionColibri == 0){
                this.colibriArray.push(new platformer.colibri_prefab(this.game,-1,this.playerArray[0].position.y-25,this,1));
                }
                else if (this.randomValueDirectionColibri == 1){
                this.colibriArray.push(new platformer.colibri_prefab(this.game,360,this.playerArray[0].position.y-25,this,-1));
                }

                this.timeSpawnColibri = this.game.rnd.integerInRange(10,99);
            }
            else{
                this.timeSpawnColibri -= 0.012;
            }               

            //SPAWN CANGREJO
            if (this.timeSpawnCangrejo <= 0){
                if(this.playerArray[0].position.x <150){
                    this.cangrejoArray.push(new platformer.cangrejo_prefab(this.game,this.game.rnd.integerInRange(170,300), 20 ,this,1));
                   }
                else{
                    this.cangrejoArray.push(new platformer.cangrejo_prefab(this.game,this.game.rnd.integerInRange(25,130), 20 ,this,1));
                }

                this.timeSpawnCangrejo = this.game.rnd.integerInRange(10,99);
            }
            else{
                this.timeSpawnCangrejo -= 0.012;
            }
            //TIME STOPPED
            if(this.timeStopped){
                this.timeStoppedTimer -= 0.017;
                if(this.timeStoppedTimer <= 0){
                    this.timeStopped = false;
                    this.timeStoppedTimer = 10;
                    for(i = 0; i < this.bubbleArray.length; i++){
                        this.bubbleArray[i].stopped = false;
                    }
                }
            }
        //}
    }
};