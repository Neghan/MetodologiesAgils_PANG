var platformer = platformer || {};


platformer.worldmap ={
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        this.game.load.bitmapFont()
        
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        //this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        
        this.load.image('worldmap','assets/menus/WorldMap (384-308).png');
        this.load.spritesheet('selector','assets/menus/MapSelectorIcon(40-24).png',20,24);
        
    },

    create:function(){
        this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
        this.background=this.game.add.tileSprite(0,0,384,308,'worldmap');
        
        this.selector = this.game.add.sprite(0,0,'selector');
        this.selector.anchor.setTo(.5);
        this.selector.animations.add('move',[0],0,true);
        this.selector.animations.add('selected',[0,1],10,true);
  
        this.cursors=this.game.input.keyboard.createCursorKeys(); 
        this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
        this.timeflow = 20;
        this.delayLevelSelector = 10;
        this.currentLevel = 1;
        this.selectedLevel = false;
        this.canChangeLevel = true;
        
        //this.cursors=this.game.input.keyboard.createCursorKeys();    
        //this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        
        //HUD TEXT
        this.MapName = this.game.add.text(this.game.world.centerX+140, this.game.world.centerY+115, "Barcelona", {
        font: "15px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.MapName.anchor.setTo(0.5, 0.5);
        this.Stage = this.game.add.text(this.game.world.centerX+145, this.game.world.centerY+140, "1-1 Stage", {
        font: "15px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.Stage.anchor.setTo(0.5, 0.5);
    
        
    },
    update:function(){
        
        //Al principio el selector esta estatico
        if(this.timeflow == 20){
        this.selector.animations.play('move');
        this.MapName.setText("BARCELONA");
        this.Stage.setText("1-1 STAGE");
        }
        
        //DELAY DEL SELECTOR
        if(this.canChangeLevel == false){
            this.delayLevelSelector += 0.5;
            if (this.delayLevelSelector >= 10){
                this.canChangeLevel = true;
            }
        }
        
        //MOURE EL SELECTOR MES DELAY
        if(this.canChangeLevel == true){
            if(this.cursors.left.isDown){
                this.canChangeLevel = false;
                this.delayLevelSelector = 0;
                this.currentLevel +=1
                if(this.currentLevel >= 5){
                    this.currentLevel = 1;
                }
            }
            else if(this.cursors.right.isDown){
                this.canChangeLevel = false;
                this.delayLevelSelector = 0;
                this.currentLevel -=1
                if(this.currentLevel <= 0){
                    this.currentLevel = 4;
                }
            }
        }
        //MOVEM EL SELECTOR
        if( this.currentLevel == 1){    //JAPAN
        this.selector.position.x = 347;
        this.selector.position.y = 90;
        this.MapName.setText("BARCELONA");
        this.Stage.setText("1-1 STAGE");    
        }
        else if( this.currentLevel == 2){ //COUNTRY 2
        this.selector.position.x = 307;
        this.selector.position.y = 90;
        this.MapName.setText("NIVEL 2");
        this.Stage.setText("2-1 STAGE")
        }
        else if( this.currentLevel == 3){ //COUNTRY 3
        this.selector.position.x = 290;
        this.selector.position.y = 130;
        this.MapName.setText("NIVEL 3");
        this.Stage.setText("3-1 STAGE")
        }
        else if( this.currentLevel == 4){ //COUNTRY 4
        this.selector.position.x = 307;
        this.selector.position.y = 130;
        this.MapName.setText("MULTIPLAYER");
        this.Stage.setText("4-1 STAGE")
        }
        
        //Si Pulsamos Pause seleccionamos ese nivel en concreto
        if (this.space.isDown){
            //SALTAR AL NIVEL LEVEL1 POR AHORA
            this.selectedLevel = true;
        }
        //CUANDO SELECCIONAMOS EL NIVEL EMPIEZA A PARPADEAR EL SELECTOR Y AL CABO DE X TIEMPO ENTRAMOS EN EL MAPA
        if ( this.selectedLevel == true){
            this.selector.animations.play('selected');
            if(this.timeflow >= 0){
                this.timeflow -= 0.25;
            }
            //OBRIM MAPA
            else{
                if( this.currentLevel == 1){
                this.state.start('level1');   //NIVEL1
                }
                else if( this.currentLevel == 2){ 
                this.state.start('level1');   //NIVEL2
                }
                else if( this.currentLevel == 3){
                this.state.start('level1');   //NIVEL3
                }
                else if( this.currentLevel == 4){
                this.state.start('level1');   //NIVEL4
                }
            }
        }
    }
};