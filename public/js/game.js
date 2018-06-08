var socket = io();
     var gameState0 = function(){

     }  
     gameState0.prototype = {
    preload : preloadMain,
    create : createMain,
    update : updateMain
};
			var direction = "down";

function preloadMain(){
	game.load.image('landing', 'assets/landing.PNG');
    game.load.image('start', 'assets/start.png');
    game.load.image('score', 'assets/score.png');
    game.load.image('help', 'assets/help.png');
   // game.load.image('sky', 'assets/sky.png');
    //game.load.image('mountain', 'assets/mountains.jpg');

}

var startButton;
var helpButton;
var scoreButton;

function createMain(){
	game.scale.pageAlignHorizontally=true;
	game.scale.pageAlignVertically=true;
        var mountain = game.add.sprite(0, 0, 'landing');
        //mountain.scale.setTo(5,1.5);
        game.add.text(150,70,"SWIFT NINJA",{font:"bold 50px Comic Sans MS",fill:"#fff"});
        startButton = game.add.button(game.world.centerX - 95, 200, 'start', startGame, this);

        helpButton = game.add.button(game.world.centerX - 95, 300, 'help', showHelp, this);
        
        scoreButton = game.add.button(game.world.centerX - 95, 400, 'score', startLeaderBoard, this);
        lives=3;
        score=0;

}

function updateMain(){

}



var startGame = function(){
game.state.start('play');
}

var startLeaderBoard = function(){
game.state.start('gameState1');
}

var showHelp = function(){
	console.log("gameState3");
game.state.start('gameState3');
}

	var game = new Phaser.Game(640, 480, Phaser.CANVAS);//640,480,1330,670
	game.state.add("gameState0",gameState0)
     game.state.start("gameState0");
	
	var ninja;
	var ninjaGravity = 800;
	var ninjaJumpPower;    
	var score=0;
	var scoreText;
     var topScore=0;
     var powerBar;
     var powerTween;
     var placedPoles;
	var poleGroup; 
     var minPoleGap = 100;
     var maxPoleGap = 300; 
     var ninjaJumping;
     var ninjaFallingDown;
     var music1;
     var music;
     var lives=3;


      var gameState3 = function(){

     }  

     gameState3.prototype = {
    preload : preload3,
    create : create3,
    update : update3
};

function preload3(){
game.load.image('back', 'assets/back.PNG');
}

function create3()

{
	console.log("working");
	game.add.text(170,5,"Story Line:",{font:"bold 50px Comic Sans MS",fill:"#fff"});
		game.add.text(10,70,"Once, in an ancient city of china, there was a temple where\n students were trained to become ninjas. The teacher there\n was cruel and used to harm them. So, no students wanted\n to be there, but were forced to stay. Now there was\n one brave young ninja who was able to get out of that temple.\n He needs your help to get him out of the city safely. Would\n you like help him? Here is how you can help... ",{font:"bold 20px Comic Sans MS",fill:"#fff"});

	game.add.text(240,290,"HELP:",{font:"bold 50px Arial",fill:"#fff"});
		game.add.text(10,340,"Left-Click the mouse to jump the walls.\n The longer you press the higher and longer the jump will be.\n The best part is, you will get 3 lives.\n It means you can continue to play even if you die 2 times and still\n your score will continue to increase. ",{font:"bold 20px Arial",fill:"#fff"});
   var backButton = game.add.button(0,0, 'back', backGame, this);
   backButton.scale.setTo(0.3,0.2);
}

function update3()
{

}
var backGame = function(){
game.state.start('gameState0');
}
game.state.add("gameState3",gameState3)

     var gameState1 = function(){ // game over
		}

	gameState1.prototype = {
	    preload:preload1,
	    create:create1,
	    update:update1
	};  
	     var play = function(game){}     // main game
     play.prototype = {
		preload:function(){
			game.load.image("ninja", "assets/ninja.png"); 
			game.load.image("pole", "assets/pole.png");
               game.load.image("powerbar", "assets/powerbar.png");
               game.load.image("background", "assets/background.png");
               game.load.audio("fall","assets/fall.wav");
                game.load.audio("jump1","assets/jump.wav")

		},

		create:function(){
			// console.log(lives)
			game.add.tileSprite(0, 0, 1000, 600, 'background');
			//background.scale.setTo(1.2,1.2);
			ninjaJumping = false;
			ninjaFallingDown = false;
			//score = 0;

			placedPoles = 0;
			poleGroup = game.add.group();
			// topScore = localStorage.getItem("topFlappyScore")==null?0:localStorage.getItem("topFlappyScore");
			socket.emit("get_best");
			socket.on('send_best', function (score) {
		        // console.log("topScore: "+topScore)
		        topScore = score;
		        updateScore();
		    })
			scoreText = game.add.text(10,10,"-",{font:"bold 16px Arial",fill:"#FFF"});
			updateScore();
			music = game.add.audio('fall');
			music1 = game.add.audio('jump1');
			
			//game.stage.backgroundColor = "#87CEEB";
			game.physics.startSystem(Phaser.Physics.ARCADE);
			ninja = game.add.sprite(80,0,"ninja");
			ninja.anchor.set(0.5);
			ninja.scale.setTo(0.1,0.12);
			ninja.lastPole = 1;
			game.physics.arcade.enable(ninja);              
			ninja.body.gravity.y = ninjaGravity;
			game.input.onDown.add(prepareToJump, this);
			addPole(80);
		},	
		update:function(){
			game.physics.arcade.collide(ninja, poleGroup, checkLanding);
		


			if(ninja.y>game.height){
				
				die();
			}
		}
	}     
	function preload1()
	{
      game.load.image("leader", "assets/leader.PNG");
      console.log("working")
      game.load.image("reset", "assets/Reset.PNG");

	}
	function create1()

	{
		 
   //resetButton.scale.setTo(0.3,0.2);
		game.add.tileSprite(0, 0, 1000, 600, 'leader');
		var resetButton = game.add.button(280,400, 'reset', resetGame, this);
		 resetButton.scale.setTo(0.5,0.5);
		game.add.text(230,50,"YOUR SCORE IS:" + score,{font:"bold 26px Arial",fill:"#fff"});
		//scoreText.text = "Score: "+score+"\nBest: "+topScore;
		socket.emit("sendScore", score);
		socket.emit("getHighScore");
		socket.on('sendHighScore', function (data) {
	       console.log(data)
	       // text.addcolor("#ffffff", 0)
	       game.add.text(150,100,"Rank",{font:"bold 18px Arial ",fill:"#FFF"});
	       game.add.text(300,100,"Name",{font:"bold 18px Arial",fill:"#FFF"});
	       game.add.text(450,100,"Score",{font:"bold 18px Arial",fill:"#FFF"});
	       var len = data.length;
	       for (var i = 0; i < len; i++) {
	       		 game.add.text(150,150 + i*50,i+1,{font:"bold 18px Arial",fill:"#FFF"});
			     game.add.text(300,150 + i*50,data[i].name,{font:"bold 18px Arial",fill:"#FFF"});
			     game.add.text(450,150 + i*50,data[i].score,{font:"bold 18px Arial",fill:"#FFF"});
	       }

	    })
	}
	function update1()
	{

	}
	var resetGame = function(){
game.state.start('gameState0');
}
     game.state.add("play",play);
     game.state.add("gameState1",gameState1);
	function updateScore(){
		scoreText.text = "Score: "+score+"\nBest: "+topScore + "\nLives: "+(lives-1);	
	}     
	function prepareToJump(){
		if(ninja.body.velocity.y==0){
	          powerBar = game.add.sprite(ninja.x,ninja.y-50,"powerbar");
	          powerBar.scale.setTo(0.1,0.2)
	          powerBar.width = 0;
	          powerTween = game.add.tween(powerBar).to({
			   width:100
			}, 1000, "Linear",true); 
	          game.input.onDown.remove(prepareToJump, this);
	          game.input.onUp.add(jump, this);
          }        	
	}     
     function jump(){
     		music1.play();
          ninjaJumpPower= -powerBar.width*3-100
          powerBar.destroy();
          game.tweens.removeAll();
          ninja.body.velocity.y = ninjaJumpPower*2;
          //ninja.body.velocity.x = -ninjaJumpPower;
          ninjaJumping = true;
          powerTween.stop();
          game.input.onUp.remove(jump, this);
     }     
     function addNewPoles(){
     	var maxPoleX = 0;
		poleGroup.forEach(function(item) {
			maxPoleX = Math.max(item.x,maxPoleX)			
		});
		var nextPolePosition = maxPoleX + game.rnd.between(minPoleGap,maxPoleGap);
		addPole(nextPolePosition);			
	}
	function addPole(poleX){
		if(poleX<game.width*2){
			placedPoles++;
			var pole = new Pole(game,poleX,game.rnd.between(250,400));
			game.add.existing(pole);
	          pole.anchor.set(0.5,0);
	         pole.scale.setTo(0.3,0.1)
			poleGroup.add(pole);
			var nextPolePosition = poleX + game.rnd.between(minPoleGap,maxPoleGap);
			addPole(nextPolePosition);
		}
	}	
	function die(){
		console.log("in die")
		music.play();
		lives--;
		if(lives>0)
		{
		//localStorage.setItem("topFlappyScore",Math.max(score,topScore));	
		 game.state.start("play");
		}
		else
		{
			//localStorage.setItem("topFlappyScore",Math.max(score,topScore));
			game.state.start("gameState1");
		}
	}
	function checkLanding(n,p){
		if(p.y>=n.y+n.height/2){
			// var border = n.x-p.x
			// if(Math.abs(border)>40){
				n.body.velocity.x=0;
				n.body.velocity.y=0;	
			// }
			var poleDiff = p.poleNumber-n.lastPole;
			if(poleDiff>0){
				score+= Math.pow(2,poleDiff);
				updateScore();	
				n.lastPole= p.poleNumber;
			}
			if(ninjaJumping){
               	ninjaJumping = false;              
               	game.input.onDown.add(prepareToJump, this);
          	}
		}
		else{
			ninjaFallingDown = true;
			poleGroup.forEach(function(item) {
				item.body.velocity.x = 0;			
			});
		}			
	}
	Pole = function (game, x, y) {
		Phaser.Sprite.call(this, game, x, y, "pole");
		game.physics.enable(this, Phaser.Physics.ARCADE);
          this.body.immovable = true;
          this.poleNumber = placedPoles;
	};
	Pole.prototype = Object.create(Phaser.Sprite.prototype);
	Pole.prototype.constructor = Pole;
	Pole.prototype.update = function() {
          if(ninjaJumping && !ninjaFallingDown){
               this.body.velocity.x = ninjaJumpPower;
          }
          else{
               this.body.velocity.x = 0
          }
		if(this.x<-this.width){
			this.destroy();
			addNewPoles();
		}
	}	
