var platformer = platformer || {};


    platformer.HUD=function(){
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
    }
platformer.HUD.prototype.constructor =  platformer.HUD;