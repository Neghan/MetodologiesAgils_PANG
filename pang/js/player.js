var platformer = platformer || {};

platformer.player = function(game,x,y,level,num){
    if(num == 2){
        Phaser.Sprite.call(this,game,x,y,'hero2');
    } else {
        Phaser.Sprite.call(this,game,x,y,'hero');
    }
    this.num = num;
    this.anchor.setTo(.5);
    this.level = level
    
    this.animations.add('walk',[0,1,2,3,4],10,true);
    //this.hero.animations.add('left',[0,1,2,3,4],10,true);
    this.animations.add('idleShoot',[10,11],10,false);
    this.animations.add('idle',[10],10,true);
    this.animations.add('deathR',[17],10,true);
    this.animations.add('deathL',[16],10,true);
    this.animations.add('stairsUP',[7,8,9,10],10,true);
    this.dead=false;
    this.lives = 3;
    this.score = 0;
    this.shielded = false;
    this.doubleHook = false;
    this.powerWire = false;
    this.uzi = false;
    this.invincibilityFrames = 0;
    this.shootOneTime = true;
    
    this.shield = this.game.add.sprite(0,0, 'shield', 0);
    this.shield.animations.add('shield', [0,1],10, true);
    this.shield.animations.play('shield');
    this.shield.visible = false;
    this.shield.anchor.setTo(0.5);
    
    this.shot = false;
    this.doubleShot = false;
    
    if(this.num == 2){
        this.upkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downkey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftkey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightkey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.shootKey=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    else{
        this.upkey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downkey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftkey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightkey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.shootKey=this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
    } 
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    
    this.level.playerCollisionGroup.add(this);
    
    this.body.setSize(26, 32, 8, 0);
};


platformer.player.prototype = Object.create(Phaser.Sprite.prototype);
platformer.player.prototype.constructor = platformer.bubble_prefab;


platformer.player.prototype.update = function(){
    if(this.num == 2){
        if (gameOptions.dead2 == true){
            //ANIMACION DE MUERTE
            if(this.dead){
                if(gameOptions.currentLevel != 18 || gameOptions.hero2HP == 0){
                    this.animations.play('deathR');
                    //this.hero.setBounce(1);
                    this.body.velocity.x=30;
                    this.body.velocity.y=30;
                    this.body.collideWorldBounds = false;
                } else{
                    this.invincibilityFrames = 2;
                    this.dead = false;
                }
            }

            // CUANDO TE QUEDAS SIN VIDAS LLAMAS A UN DELAY Y CUANDO ACABA TE VAS AL WORLD MAP
            if (this.level.goToWorldmap == true){
                if (this.level.delayGameOver >= 0){
                    this.level.delayGameOver -= 0.017;
                }
                else{
                    gameOptions.hero2HP=3;
                    this.level.goToWorldmap = false;
                    this.level.state.start('worldmap');
                    gameOptions.dead2 = false;
                }
            }

            //VIDAS
            if(gameOptions.hero2HP==2){
                if(gameOptions.currentLevel != 18){
                    this.level.music.stop();
                    this.level.state.start('level');  
                } else{
                    this.level.lifesplayer2.destroy();
                }
                gameOptions.dead2 = false;
            }
            else if(gameOptions.hero2HP==1){
                if(gameOptions.currentLevel != 18){
                    this.level.music.stop();
                    this.level.state.start('level');  
                } else{
                    this.level.lifes2player2.destroy();
                }
                gameOptions.dead2 = false;
            }
            else if(gameOptions.hero2HP==0){
                if(gameOptions.currentLevel != 18){
                    this.level.lifesplayer2.destroy(); 
                } else{
                    this.level.lifes3player2.destroy();
                }       
                this.level.gameOverText.setText("GAME OVER");
                this.level.music.stop();
                this.level.goToWorldmap = true;
            }
        }
        else{
                        //COLISIONES CON LOS MUROS SOLO SI ESTA VIVO
            this.game.physics.arcade.collide(this,this.level.walls_layer);
            this.game.physics.arcade.collide(this,this.level.unbreakable_layer);
        
            this.shield.x = this.x;
            this.shield.y = this.y;
            if(this.invincibilityFrames > 0){
                this.invincibilityFrames -= 0.012;
            }

            this.level.hud.scoretext2.setText(""+this.score);
            
            //MOVIMIENTO HEROE 
            if(this.leftkey.isDown&&!this.dead){
                this.body.velocity.x=-gameOptions.heroSpeed;
                this.animations.play('walk');
                this.scale.setTo(-1,1);
            }else if(this.rightkey.isDown&&!this.dead){
                this.body.velocity.x=gameOptions.heroSpeed;
                this.scale.setTo(1,1);
                this.animations.play('walk');
            }else if (this.shootKey.isDown&& !this.dead){
                this.animations.play('idleShoot');
                this.body.velocity.x=0;
                    if(this.shootOneTime){
                        if(this.uzi){
                            this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,2,this.num));

                            //this.game.world.swap(this.hero,this.bulletArray);
                            this.shootOneTime = false;
                            //ORDEN DE DIBUJO 
                            //this.game.world.swap(this.timer,this.bulletArray);
                        } else if (this.level.bulletCollisionGroup.length < 1 || (this.level.bulletCollisionGroup.length < 2 && this.doubleHook)){
                            if(this.powerWire){
                                this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,1,this.num));
                            } else {
                                this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,0,this.num));
                            }
                            this.shootOneTime = false;
                        }
                    }

            }else if(!this.dead){
                this.shootOneTime = true;
                this.animations.play('idle');
                this.body.velocity.x=0;
            }
            //CHECK OVERLAP
            if(gameOptions.currentLevel == 2|| gameOptions.currentLevel == 6||gameOptions.currentLevel == 12||gameOptions.currentLevel == 16){
            if(this.level.checkOverlap(this,this.level.escaleras)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                }
            }else if(gameOptions.currentLevel == 3||gameOptions.currentLevel == 8||gameOptions.currentLevel == 11||gameOptions.currentLevel == 15){
               if(this.level.checkOverlap(this,this.level.escaleras4)||this.level.checkOverlap(this,this.level.escaleras3)||this.level.checkOverlap(this,this.level.escaleras2)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                if(this.upkey.isDown){
                    this.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                } 
                }
            }else if(gameOptions.currentLevel == 4||gameOptions.currentLevel == 7||gameOptions.currentLevel == 10||gameOptions.currentLevel == 14){
                if(this.level.checkOverlap(this,this.level.escaleras)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                }
            }else if(gameOptions.currentLevel == 5||gameOptions.currentLevel == 9||gameOptions.currentLevel == 13){
                if(this.level.checkOverlap(this,this.level.escaleras4)||this.level.checkOverlap(this,this.level.escaleras3)||this.level.checkOverlap(this,this.level.escaleras2)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                }
            }else if(gameOptions.currentLevel == 18){
                if(this.level.checkOverlap(this,this.level.escaleras)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                      if(this.upkey.isDown){
                        this.body.velocity.y=-gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }
                    if(this.downkey.isDown){
                       this.body.velocity.y=gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }       
                    }
            }
        }
    }
    else{
        if (gameOptions.dead1 == true){
            //ANIMACION DE MUERTE
            if(this.dead){
                if(gameOptions.currentLevel != 18 || gameOptions.hero1HP == 0){
                    this.animations.play('deathR');
                    //this.hero.setBounce(1);
                    this.body.velocity.x=30;
                    this.body.velocity.y=30;
                    this.body.collideWorldBounds = false;
                } else {
                    this.invincibilityFrames = 2;
                    this.dead = false;
                }
            }

            // CUANDO TE QUEDAS SIN VIDAS LLAMAS A UN DELAY Y CUANDO ACABA TE VAS AL WORLD MAP
            if (this.level.goToWorldmap == true){
                if (this.level.delayGameOver >= 0){
                    this.level.delayGameOver -= 0.017;
                }
                else{
                    gameOptions.hero1HP=3;
                    this.level.goToWorldmap = false;
                    this.level.state.start('worldmap');
                    gameOptions.dead1 = false;
                }
            }

            //VIDAS
            if(gameOptions.hero1HP==2){
                if(gameOptions.currentLevel != 18){
                    this.level.music.stop();
                    this.level.state.start('level');  
                } else{
                    this.level.lifes.destroy();
                }
                gameOptions.dead1 = false;
            }
            else if(gameOptions.hero1HP==1){
                if(gameOptions.currentLevel != 18){
                    this.level.music.stop();
                    this.level.state.start('level');  
                } else{
                    this.level.lifes2.destroy();
                }
                gameOptions.dead1 = false;
            }
            else if(gameOptions.hero1HP==0){
                if(gameOptions.currentLevel != 18){
                    this.level.lifes.destroy(); 
                } else{
                    this.level.lifes3.destroy();
                }       
                this.level.gameOverText.setText("GAME OVER");
                this.level.music.stop();
                this.level.goToWorldmap = true;
            }
        }
        else{
                        //COLISIONES CON LOS MUROS SOLO SI ESTA VIVO
            this.game.physics.arcade.collide(this,this.level.walls_layer);
            this.game.physics.arcade.collide(this,this.level.unbreakable_layer);
        
            this.shield.x = this.x;
            this.shield.y = this.y;
            if(this.invincibilityFrames > 0){
                this.invincibilityFrames -= 0.012;
            }

            this.level.hud.scoretext.setText(""+this.score);
            
            //MOVIMIENTO HEROE 
            if(this.leftkey.isDown&&!this.dead){
                this.body.velocity.x=-gameOptions.heroSpeed;
                this.animations.play('walk');
                this.scale.setTo(-1,1);
            }else if(this.rightkey.isDown&&!this.dead){
                this.body.velocity.x=gameOptions.heroSpeed;
                this.scale.setTo(1,1);
                this.animations.play('walk');
            }else if (this.shootKey.isDown&& !this.dead){
                this.animations.play('idleShoot');
                this.body.velocity.x=0;
                    if(this.shootOneTime){
                        this.shot = false;
                        this.doubleShot = false;
                        for(i = 0; i < this.level.bulletArray.length; i++){
                            if(this.level.bulletArray[i].owner == this.num && !this.level.bulletArray[i].destroyed){
                                if(!this.shot){
                                    this.shot = true;
                                } else if(!this.doubleShot){
                                    this.doubleShot = true;
                                }
                            }
                        }
                        if(this.uzi){
                            this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,2,this.num));

                            //this.game.world.swap(this.hero,this.bulletArray);
                            this.shootOneTime = false;
                            //ORDEN DE DIBUJO 
                            //this.game.world.swap(this.timer,this.bulletArray);
                        } else if (!this.shot || (!this.doubleShot && this.doubleHook)){
                            if(this.powerWire){
                                this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,1,this.num));
                            } else {
                                this.level.bulletArray.push(new platformer.shoot(this.game,this.position.x,this.position.y,240,368,100,1,this.level,0,this.num));
                            }
                            this.shootOneTime = false;
                        }
                    }

            }else if(!this.dead){
                this.shootOneTime = true;
                this.animations.play('idle');
                this.body.velocity.x=0;
            }
            //CHECK OVERLAP
            if(gameOptions.currentLevel == 2|| gameOptions.currentLevel == 6||gameOptions.currentLevel == 12||gameOptions.currentLevel == 16){
            if(this.level.checkOverlap(this,this.level.escaleras)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                }
            }else if(gameOptions.currentLevel == 3||gameOptions.currentLevel == 8||gameOptions.currentLevel == 11||gameOptions.currentLevel == 15){
               if(this.level.checkOverlap(this,this.level.escaleras4)||this.level.checkOverlap(this,this.level.escaleras3)||this.level.checkOverlap(this,this.level.escaleras2)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                } 
                }
            }else if(gameOptions.currentLevel ==4||gameOptions.currentLevel == 7||gameOptions.currentLevel == 10||gameOptions.currentLevel == 14){
                if(this.level.checkOverlap(this,this.level.escaleras)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                      if(this.upkey.isDown){
                        this.body.velocity.y=-gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }
                    if(this.downkey.isDown){
                       this.body.velocity.y=gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }       
                    }
            }
            else if(gameOptions.currentLevel == 5||gameOptions.currentLevel == 9||gameOptions.currentLevel == 13){
                if(this.level.checkOverlap(this,this.level.escaleras4)||this.level.checkOverlap(this,this.level.escaleras3)||this.level.checkOverlap(this,this.level.escaleras2)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                if(this.upkey.isDown){
                    this.body.velocity.y=-gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                if(this.downkey.isDown){
                   this.body.velocity.y=gameOptions.heroSpeed;
                     this.animations.play('stairsUP');
                }
                }
            }else if(gameOptions.currentLevel == 18){
                if(this.level.checkOverlap(this,this.level.escaleras)||this.level.checkOverlap(this,this.level.escaleras1)&&!this.dead){
                      if(this.upkey.isDown){
                        this.body.velocity.y=-gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }
                    if(this.downkey.isDown){
                       this.body.velocity.y=gameOptions.heroSpeed;
                         this.animations.play('stairsUP');
                    }       
                    }
            }
        }
    }
};