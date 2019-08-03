var bg, body, refresh;
var clothing = [];

var PILE_MIN_X = 75;
var PILE_MIN_Y = 500;
var PILE_MAX_X = 1200;
var PILE_MAX_Y = 960;

var soundToggle, soundOn, soundOff, music;

function initGame()
{
	var i, file;

	bg = new createjs.Bitmap(queue.getResult("bg"));

	body = new createjs.Bitmap(queue.getResult("misha-body-smol"));
	body.x = 1060;
	body.y = 160;

	// refresh = new createjs.Bitmap(queue.getResult("refresh"));
	// refresh.x = 1685;
	// refresh.y = 850;
	// refresh.cursor = "pointer";
	// refresh.on("click", function(evt)
	// {
	// 	restartGame();
	// });

	initClothingItems("costume");

	// soundToggle = new createjs.Container();
	// soundOff = new createjs.Bitmap(queue.getResult("soundoff"));
	// soundOn = new createjs.Bitmap(queue.getResult("soundon"));
	// soundToggle.x = 1750;
	// soundToggle.y = 50;
	// soundToggle.cursor = "pointer";
	// soundToggle.addChild(soundOff);
	// soundToggle.on("click", function(evt)
	// {
	// 	if (!music) music = createjs.Sound.play("vogue-midi", { loop: -1 });
	// 	else music.paused = !music.paused;

	// 	soundToggle.removeAllChildren();
	// 	if (music.paused) soundToggle.addChild(soundOff);
	// 	else soundToggle.addChild(soundOn);
	// });
}

function startGame()
{	
	currentScreen = SCREEN_GAME;

	stage.addChild(bg);
	stage.addChild(body);
	// stage.addChild(refresh);
	// stage.addChild(soundToggle);

	var n;
	for (n of clothing)
	{
		placeClothingItem(n);		
	}
}

function restartGame()
{
	stage.removeAllChildren();
	startGame();
}

function initClothingItems(type)
{
	var i = 1;
	var file = null;
	while(true)
	{
		file = fileExists(type, i);
		if (!file) break;

		var c = {};
		c = new createjs.Bitmap(file);

		c.cursor = "grab";

		c.on("mousedown", function(evt)
		{
			stage.setChildIndex(evt.target, stage.numChildren-1);
			c.posOnObject = evt.target.globalToLocal(evt.stageX, evt.stageY);
		});
		c.on("pressmove", function(evt)
		{
			var newPos = stage.globalToLocal(evt.stageX, evt.stageY);
	    	evt.target.x = newPos.x - c.posOnObject.x;
	    	evt.target.y = newPos.y - c.posOnObject.y;
		});

		clothing.push(c);
		i++;
	}
}

function placeClothingItem(item)
{
	var xpos = Math.floor(Math.random() * (PILE_MAX_X - PILE_MIN_X - item.getBounds().width)) + PILE_MIN_X;
	var ypos = Math.floor(Math.random() * (PILE_MAX_Y - PILE_MIN_Y - item.getBounds().height)) + PILE_MIN_Y;

	item.x = xpos;
	item.y = ypos;

	var zindex = Math.floor(Math.random() * stage.numChildren) + 1;

	stage.addChildAt(item, zindex);
}

function fileExists(type, i)
{
	var file;
	if (file < 0) return file;
	else if (i < 10) file = queue.getResult(type+"0"+i);
	else file = queue.getResult(type+i);
	return file;
}
