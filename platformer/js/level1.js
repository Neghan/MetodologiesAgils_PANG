var platformer = platformer || {};

platformer.level1 ={
    init:function(){
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth,gameOptions.gameHeight);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=gameOptions.heroGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height);
    },
    preload:function(){ 
        this.load.image('bg','assets/img/barcelona.png');
        this.load.tilemap('level1','assets/tilemaps/barcelona.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('walls','assets/img/walls_barcelona.png');
        //this.load.image('moss','assets/img/tileset_edge_lv1.png');
        this.load.spritesheet('hero','assets/img/player_1_locomotion.png',32,32);
        //this.load.spritesheet('shoot','assets/img/player_1_shoot.png',32,32);
        //this.load.spritesheet('door','assets/img/door.png',32,40);
        
    },
    create:function(){
      this.bg = this.game.add.tileSprite(0,0,gameOptions.level1Width,gameOptions.level1Height,'bg');
        //this.map=this.game.add.tilemap('level1');
        //this.map.addTilesetImage('walls');
        //this.map.addTilesetImage('moss');
        //this.walls=this.map.createLayer('walls_layer');
        //this.map.setCollisionBetween(1,11,true,'walls_layer');
        //this.map.createLayer('moss_left');
        //this.map.createLayer('moss_right');
        //this.map.createLayer('moss_top');
        //this.map.createLayer('moss_bottom');
        
        //this.entry=this.game.add.sprite(65,268,'door');
        //this.entry.anchor.setTo(.5);
        //this.entry.animations.add('open',[1,2,3],3,true);
        
        //this.game.physics.arcade.enable(this.entry);
        //this.entry.body.allowGravity=false;
        //this.entry.body.immovable=true;
        this.hero=this.game.add.sprite(65,184,'hero',0);
        this.hero.animations.add('right',[0,1,2,3,4],10,true);
        this.hero.animations.add('left',[0,1,2,3,4],10,true);
        this.hero.animations.add('idleShoot',[5],10,false);
        this.hero.anchor.setTo(.5);
        
        this.game.physics.arcade.enable(this.hero);
        this.hero.body.allowGravity = false;
        
        this.cursors=this.game.input.keyboard.createCursorKeys();    
         this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
            
        //this.camera.follow(this.hero);    
        //this.camera.follow(this.hero,Phaser.Camera.FOLLOW_LOCKON);    
            
            
    },
    update:function(){
      //this.entry.animations.play('open');
        //this.game.physics.arcade.collide(this.hero,this.entry);
        //this.game.physics.arcade.collide(this.hero,this.walls);
        
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
        //if (this.space.isDown && this.hero.body.blocked.down){
        if (this.space.isDown && this.hero.body.onFloor() && this.space.downDuration(250)){
            this.hero.body.velocity.y=-gameOptions.heroJump;
        }
        
        
    }
};