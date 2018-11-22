var platformer = platformer || {};

platformer.HUD=function(game,   level){
       //HUD TEXT
        this.ready = game.add.text(game.world.centerX, game.world.centerY-20, "READY", {
        font: "15px Pixel",
        fill: "#00FFFF",
        align: "center"
        });
        this.ready.setShadow(-1, 1, 'rgba(0,0,0,255)',0);
        this.ready.anchor.setTo(0.5, 0.5);
        this.text = game.add.text(game.world.centerX, game.world.centerY+115, "Barcelona", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text.anchor.setTo(0.5, 0.5);
        this.text2 = game.add.text(game.world.centerX, game.world.centerY+140, "1-1 Stage", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text2.anchor.setTo(0.5, 0.5);
        this.text3 = game.add.text(game.world.centerX-150, game.world.centerY+115, "PLAYER - 1", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text3.anchor.setTo(0.5, 0.5);
        this.text4 = game.add.text(game.world.centerX+150, game.world.centerY+115, "PLAYER - 2", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text4.anchor.setTo(0.5, 0.5);
        this.text5 = game.add.text(game.world.centerX, game.world.centerY+150, "HI: 10000", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text5.anchor.setTo(0.5, 0.5);
        this.text6 = game.add.text(game.world.centerX-115, game.world.centerY+125, "", {
        font: "10px Pixel",
        fill: "#ffffff",
        align: "center"
        });
        this.text6.anchor.setTo(0.5, 0.5);
    };
platformer.HUD.prototype.constructor =  platformer.HUD;
