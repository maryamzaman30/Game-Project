/*
Week 20
FINAL EXAM SUBMISSION By Maryam Zaman

Commentary
I have used three extensions, sounds, platforms and enemies. I have used one
extra, I consider the enemy one an extra. First, I added sounds for background,
jump, collecting collectables, falling into the canyon, and colliding with enemies. The
issues I faced with sounds were trying to overcome double sounds or echoes.
Double sounds problems only occurred in background sounds and falling in the
canyon, I fixed that with the help of playMode and stop functions. Next extension
is a platform made of two rectangles. The last extension used is enemies, with
platforms and sounds the game was looking fun but not challenging hence the
reason why I used an extra extension.

The bit of code I found difficult is of canyons, making canyon was easy but
interacting with them was not easy, it was fixed with a temporary variable in
checkCanyon and drawCanyon. I also found it difficult to reduce lives and start
game again but it was fixed with checkPlayerDie and startGame functions.

As I have never programmed before, I have learned many skills. I have learned
how to draw and interact. In addition to learning about coding, I also learned
about its philosophy. I have learned the art of debugging and I have also learned
not to panic because the errors we make are right there in front of us. I use a VS
code app for programming which color-codes every code that we write so coding
becomes fun to learn
*/

//For Game character
var gameChar_x;
var gameChar_y;

//For keeping anything on the ground
var floorPos_y;

//For Character movement
var isLeft;
var isRight;

//For Character gravity
var isFalling;

//For Character Falling in Canyon
var isPlummeting;
var pitted;

//For Character collecting collectables
var isFound;

//For drawing
var canyon;
var collectable;
var clouds;
var mountains;
var mountain_y;
var treePos_y;
var trees_x;
var flagpole;

//Sounds
var enemiesSound;
var birdsSound;
var jumpSound;
var collectCollectableSound;
var fallingSound;
var stopFalling;

//For Scrolling
var cameraPosX;

//Game Mechanics
var game_score;
var lives;
var gameEnd;

//Making platforms & enemy
var platforms;
var enemies;

//When in contact with enemy & platform
var inContact; 

function preload()
{
    soundFormats('mp3','wav');
    
    /* loading sounds here. All the sounds that I have taken are from a website 
	provided by Coursera and all sounds used belongs to respective owners
	Website is freesound.org */
    jumpSound = loadSound('assets/jump.mp3');
    jumpSound.setVolume(0.1);
	
	collectCollectableSound = loadSound('assets/Collecting.mp3');
    collectCollectableSound.setVolume(2.0);

	fallingSound = loadSound('assets/Canyonfall.mp3');
    fallingSound.setVolume(0.5);

	enemiesSound = loadSound('assets/Enemy.mp3');
	enemiesSound.setVolume(5.15);

	birdsSound = loadSound('assets/Birds.mp3');
	birdsSound.setVolume(0.5);
}

function setup()
{	
	gameEnd = false; //Game just started
	createCanvas(1024, 576);
	floorPos_y = height * 3/4; 
	
	//Lives just started
	lives = 3;
	pitted = false;
	
	//Character stays on the ground
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	//Initially the character is not moving or doing anything
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;
	inContact = false;
	
	//The properties of collecting collectible 
	collectable = [
		{x_pos: 400, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 600, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 800, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 200, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 200, y_pos: floorPos_y-80, size: 40, isFound: false},
		{x_pos: 1300, y_pos: floorPos_y-60, size: 40, isFound: false},
		{x_pos: 2050, y_pos: floorPos_y-70, size: 40, isFound: false},
		{x_pos: 2080, y_pos: floorPos_y-70, size: 40, isFound: false},
		{x_pos: 2250, y_pos: floorPos_y-105, size: 40, isFound: false},
		{x_pos: 2280, y_pos: floorPos_y-105, size: 40, isFound: false},
		{x_pos: 2450, y_pos: floorPos_y-135, size: 40, isFound: false},
		{x_pos: 2480, y_pos: floorPos_y-135, size: 40, isFound: false},
		{x_pos: -215, y_pos: floorPos_y-80, size: 40, isFound: false},
	];
	
	//An array of cloud objects
	clouds = [
		{x_pos: -200, y_pos: 100},
		{x_pos: 100, y_pos: 150},
		{x_pos: 380, y_pos: 100},
		{x_pos: 750, y_pos: 130},
		{x_pos: 1100, y_pos: 100},
		{x_pos: 1500, y_pos: 130},
			];
	
	//Making multiple interactable canyons
	canyon = [
		 {x: -300, y: 432, width: 142, height: 340},
		 {x: 203, y: 432, width: 120, height: 340},
		 {x: 1000, y: 432, width: 120, height: 340},
		 {x: 1400, y: 432, width: 120, height: 340},
		 {x: 2000, y: 432, width: 670, height: 340},
			];

	//An empty object
	platforms = [];
	//Making multiple interactable platforms
	platforms.push(createPlatforms(100,floorPos_y-80,200));
	platforms.push(createPlatforms(1190,floorPos_y-60,200));
	platforms.push(createPlatforms(2000,floorPos_y-70,200));
	platforms.push(createPlatforms(2225,floorPos_y-105,200));
	platforms.push(createPlatforms(2430,floorPos_y-140,200));

	//Position of trees on the ground
	treePos_y = floorPos_y-150;
	//An array of trees of x-coordinate
	trees_x = [-300,-200,400,600,800,1000,1250,1500,1750,2000,2250,2500];
	
	//An array of mountains of x-coordinate
	mountains = [
		{x_pos: -400},
		{x_pos: 400},
		{x_pos: 1000},
		{x_pos: 1650},
		{x_pos: 2200},
		{x_pos: 2800},
	]
	//Position of mountains on the ground
	mountain_y = floorPos_y;

	//Position of camera of x-coordinate starts in the middle
	cameraPosX = 0;

	//Game score is zero initially since game just started
	game_score = 0;

	//Properties of an interactable flagpole
	flagpole = {isReached: false, x_pos: 2775, y_pos: height * 3/4 - 40};

	//An empty object
	enemies = [];
	//Making multiple interactable enemies
	enemies.push(new Enemy(80,floorPos_y-10,100));
	enemies.push(new Enemy(1150,floorPos_y-5,220));
	enemies.push(new Enemy(1600,floorPos_y-5,370));
}

function draw()
{
	//Camera of X-coordinate consist of half of width and exclude the game charcter of X-coordinate
	cameraPosX = gameChar_x - width/2;

	///////////DRAWING CODE//////////

	background(135,206,250); //fill the sky blue
	birdsSound.play(); //Background sound
	birdsSound.playMode('untilDone') //To prevent echoes or double sounds

	// Draw the Sun
	drawSun();

	//Ground
	drawGround();

	//Checking game character death
	checkPlayerDie();
	
	// For transferring information 
	push();
	translate(-cameraPosX, 0);
	
	//draw clouds
	drawClouds();

	//draw the mountain
	drawMountains(); 

	//draw a tree
	drawTrees();

	//draw platforms
	for(var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw();
	}

	//collectable items
	for(let i = 0; i < collectable.length; i++)
	{
		if(!collectable[i].isFound)
		{
			drawCollectable(collectable[i]);
			//detect
			checkCollectable(collectable[i]);
		}
	}
	//draw the canyon
	for(let i = 0; i < canyon.length; i++)
	{
		drawCanyon(canyon[i]);
	}

	//Draw flag pole
	renderFlagpole();

	//Draw the enemy
	for(let i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();

		var isContact = enemies[i].checkContact(gameChar_x,gameChar_y)

		if(isContact) //Collision with the enemy
		{
			if(lives > 0)
			{	
				lives -=1; //one collision will make one live lose
				startGame();
				break;
			}
		}
	}

	//A little help
	textSize(20);
		fill(0);
		text("Collect all 13 collectables or you will", width/2, height/2 );
		text("have to give up one life ;)", width/2, height/2+20)

	//the game character
	drawGameChar();

	//for transferring information
	pop();

	//Writing game score text
	fill(255);
	noStroke();
	text("Score:" + game_score,30,30);

	//Drawing lives 
	fill(255);
	textSize(25);
	text("lives:", 30, 50)
	for(var i = 0; i < lives; i++)
	{
		noStroke();
		fill(255,255,0);
		ellipse(15 + 80 + i * 27, 42, 18);
	}

	//Lives counting
	if(lives < 1)
	{	
		stroke(0);
		textSize(55);
		fill(255,0,0);
		text("GAME OVER :(", width/2 - textWidth("GAME OVER :(")/2, height/2);
		fill(255)
		textSize(20);
		text("Press space to continue.", width/2 - textWidth("Press space to continue.")/2, height/2 +15);
		gameEnd = true
		return;
	}

	/* There are 3 emoji's that I have used that includes ;), :( and :) it is not something 
	that I have drawn it myself */

	//Checking if flagpole and required game-score is reached  
	if(flagpole.isReached && game_score == 13)
	{
		textSize(24);
		fill(0);
		text("Level completed :)", width/2, 50 );
		isFalling = true;
		isLeft = false;
		isRight = false;
		gameChar_y = floorPos_y;
		fill(255);
		text("Press space to continue.", width/2 - textWidth("Press space to continue.")/2, height/2 +15);
		gameEnd = true
		return;
	}
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
   if(!gameEnd) //All keys work as long as game is not ending
	{		
		if(isLeft)
		{	//Character moves left when X value is decremented
			gameChar_x -= 5;
		}
		else if (isRight)
		{	//Character moves right when X value is incremented
			gameChar_x += 5;
		}
		
		//Checking platform contact
		if(gameChar_y < floorPos_y)
		{	
			for(var i = 0; i < platforms.length; i++)
			{
				if(platforms[i].checkContact(gameChar_x,gameChar_y) == true)
				{
						inContact = true;   //is on platform
						isFalling = false;  //when not jumping
						break;				//Able to move freely
				}
			 else 
				{
					inContact = false; //is not on platform
				}
			}
			if(inContact == false) //for gravity
			{	
				isFalling = true; //brings the character back to ground
		    	gameChar_y += 2;  //by incrementing Y value
			}
		}
		else
		{
			isFalling = false; //when not jumping
		}

		 /* Charcter falls into the canyon when it's Y value is incremented and 
		it can't move left or right as its keycodes are frozen */
		if(isPlummeting) 
		{
			if(isPlummeting && !fallingSound.isPlaying()) //to prevent double sounds or echoes
			{
				fallingSound.play(); //Falling in canyon sound
			}
			isLeft = false;
			isRight = false;
			gameChar_y += 2;
			
			//Lives are minused when character falls in canyon
			if(gameChar_y > 772)
			{
				pitted = true;
				fallingSound.stop(); //Canyon sound stops when game restarts
			}
		}
	}
	
	//Check if it's falling in canyon
	for(let i = 0; i < canyon.length; i++)
	{
		checkCanyon(canyon[i]);
	}

	//Initially flagpole is not reached
	if(flagpole.isReached == false) 
	{
		checkFlagpole();
	}
}

function keyPressed()
{
/* 	if statements to control the animation of the character when
	keys are pressed. */
	
	if(!isPlummeting && !isFalling) //Prevents double jumps and movements when falling
	{
		if(key == 'a') //Moves left when key 'a' is pressed
		{
			isLeft = true;
		}
		else if(key == 'd') //Moves right when key 'd' is pressed
		{
			isRight = true;    
		}
		if(key=='w') // Jumps when key 'w' is pressed
		{	
			if(isFalling == false) //Sound is played while jumping & not falling
			{
				gameChar_y -=100;
				jumpSound.play();
			}
		}
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
	
	if(key=='a') //Does not move left when key 'a' is released
	{
		isLeft = false;
	}
	else if(key == 'd') //Does not move right when key 'd' is released
	{
		isRight = false;    
	}
	if(gameEnd && key == ' ') //When game ends, spacebar is pressed for setup again
	{
		setup();
	}
}

function drawGround()
{	
	//Green ground made with one rectangle
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); 
}

function drawSun()
{
	 //Yellowish-orange sun made with one ellipse
	  noStroke();
	  fill (255,150,0);
	  ellipse (210, 100, 100);
}

function drawClouds()
{	
	//An array of moving white clouds made with three ellipses
	for(let i = 0; i < clouds.length; i++)
	{
	noStroke();
	fill(255,255,255);
	ellipse(clouds[i].x_pos,clouds[i].y_pos,80,80);
	ellipse(clouds[i].x_pos-40,clouds[i].y_pos,60,60);
	ellipse(clouds[i].x_pos+40,clouds[i].y_pos,60,60);
	 clouds[i].x_pos = clouds[i].x_pos + 1
	}
}

function drawMountains()
{	
	//An array of mountains made of two triangles followed by two small triangles
	for(let i = 0; i < mountains.length; i++)
	{
	fill(167,167,167);
	triangle(mountains[i].x_pos,mountain_y,mountains[i].x_pos-180,mountain_y-232,mountains[i].x_pos-300,mountain_y);
   fill(255,255,255);
   triangle(mountains[i].x_pos-197,mountain_y-200,mountains[i].x_pos-180,mountain_y-232,mountains[i].x_pos-153,mountain_y-200);
   fill(167,167,167);
	triangle(mountains[i].x_pos-400,mountain_y,mountains[i].x_pos-280,mountain_y-232,mountains[i].x_pos-150,mountain_y);
   fill(255,255,255);
   triangle(mountains[i].x_pos-297,mountain_y-200,mountains[i].x_pos-280,mountain_y-232,mountains[i].x_pos-262,mountain_y-200);
	}	
}

function drawTrees()
{
	for(let i =0; i < trees_x.length; i++)
		{
		//An array of trees made of a rectangle and two triangles
		fill(120,100,40);
		rect(trees_x[i],treePos_y,60,150);
		
		//Branches
		fill(0,155,0);
		triangle(trees_x[i]-50,treePos_y+50,trees_x[i]+30,treePos_y-50,trees_x[i]+110,treePos_y+50);
		triangle(trees_x[i]-50,treePos_y,trees_x[i]+30,treePos_y-100,trees_x[i]+110,treePos_y);
		}
}

function drawCollectable(t_collectable)
{
	//Drawing collectable items which is a cherry made of an ellipse and a rectangle
	if(t_collectable.isFound==false)
	{
		stroke(0,0,0);
		fill(230,0,0);
		ellipse(t_collectable.x_pos,t_collectable.y_pos-15,30);
		stroke(0,0,0);
		fill(120,100,40);
		rect(t_collectable.x_pos-3,t_collectable.y_pos-40,8, 20);
		fill(255,165,0);
	}
}

function checkCollectable(t_collectable)
{
	//Collectable is collected when there is no longer any distance between the character and the collectable
	if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
	{
		t_collectable.isFound = true;
		game_score += 1;
		collectCollectableSound.play();
	}
}

function drawCanyon(t_canyon)
{
	//Canyon of rectangle shape
	noStroke();
	fill(80, 144, 255);
	rect(t_canyon.x,t_canyon.y,t_canyon.width,t_canyon.height);
}
function checkCanyon(t_canyon)
{	
	 /* Character is fallen into the canyon when dist function covers the canyon and when Y 
	    value of character is less then Y value of floor */
	if((gameChar_x > t_canyon.x && gameChar_x < t_canyon.x + t_canyon.width) && gameChar_y >= floorPos_y)
	{
		isPlummeting = true;
	}
}

function drawGameChar()
 /* My game charcter is a chick which is represented with an orange beak as triangle, 
    yellow body as an ellipse, yellow head as an ellipse and black eyes as an ellipse */
{
	if(isLeft && isFalling)
	//jumping-left code, charcter move and jump left
	{
		noStroke();
		fill(255, 165, 0);
		//beak
		triangle(gameChar_x-30,gameChar_y-50,gameChar_x-45,gameChar_y-55,gameChar_x-30,gameChar_y-55);;
		noStroke(); 
		fill(255,255,0);
		//body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		//head
		ellipse(gameChar_x-10,gameChar_y-48,44,35);
		fill(0,0,0);
		//eye
		ellipse(gameChar_x-20,gameChar_y-55,5,5);
	}
	else if(isRight && isFalling)
	{
		//Jumping-right code, charcter move and jump right
		
		noStroke();
		fill(255, 165, 0);
		//beak
		triangle(gameChar_x+30,gameChar_y-50,gameChar_x+45,gameChar_y-55,gameChar_x+30,gameChar_y-55);
		noStroke(); 
		fill(255,255,0);
		//body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		//head
		ellipse(gameChar_x+10,gameChar_y-48,44,35);
		fill(0,0,0);
		//eye
		ellipse(gameChar_x+20,gameChar_y-55,5,5);
	}
	else if(isLeft)
	{
		//Walking left code, character moves left 
		noStroke();
		fill(255, 165, 0);
		//beak
		triangle(gameChar_x-30,gameChar_y-50,gameChar_x-45,gameChar_y-55,gameChar_x-30,gameChar_y-55);
		noStroke(); 
		fill(255,255,0);
		//body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		//head
		ellipse(gameChar_x-10,gameChar_y-48,44,35);
		fill(0,0,0);
		//eye
		ellipse(gameChar_x-20,gameChar_y-55,5,5);        
	}
	else if(isRight)
	{
		//Walking right code, character moves right
		noStroke();
		fill(255, 165, 0);
		//beak
		triangle(gameChar_x+30,gameChar_y-50,gameChar_x+45,gameChar_y-55,gameChar_x+30,gameChar_y-55);
		noStroke(); 
		fill(255,255,0);
		//body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		//head
		ellipse(gameChar_x+10,gameChar_y-48,44,35);
		fill(0,0,0);
		//eye
		ellipse(gameChar_x+20,gameChar_y-55,5,5);
	}
	else if(isFalling || isPlummeting)
	{
		//jumping facing forwards code, character jumps from front view
		noStroke(); 
		fill(255,255,0);
		// body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		// head
		ellipse(gameChar_x,gameChar_y-48,44,35);
		fill(0,0,0);
		// eyes
		ellipse(gameChar_x-3,gameChar_y-55,4,4);
		ellipse(gameChar_x+3,gameChar_y-55,4,4);
		fill(255, 165, 0);
		// beak
		triangle(gameChar_x-4,gameChar_y-50,gameChar_x+4,gameChar_y-50,gameChar_x,gameChar_y-40);
	}
	//Standing front facing code, character stands facing front when it is not moving
	else 
	{ 
		noStroke(); 
		fill(255,255,0);
		// body
		ellipse(gameChar_x,gameChar_y-20,54,43);
		noStroke();
		fill(255,255,0);
		// head
		ellipse(gameChar_x,gameChar_y-48,44,35);
		fill(0,0,0);
		// eyes
		ellipse(gameChar_x-3,gameChar_y-55,4,4);
		ellipse(gameChar_x+3,gameChar_y-55,4,4);
		fill(255, 165, 0);
		// beack
		triangle(gameChar_x-4,gameChar_y-50,gameChar_x+4,gameChar_y-50,gameChar_x,gameChar_y-40);
	}
}

function renderFlagpole()
{
	//Flagpole made with a line & a rectangle
	push(); // For transferring information
	
	strokeWeight(5);
	stroke(0);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y-250);
	noStroke();
	fill(255,0,0);

	if(flagpole.isReached && game_score == 13) 
	{
		rect(flagpole.x_pos, floorPos_y-250,50,50); //When game is completed, flagpole goes up
	}
	else
	{
		rect(flagpole.x_pos, floorPos_y-50,50,50); //Otherwise its down
	}

	pop(); // For transferring information
}

function checkFlagpole()
{
	//Checking if game is completed 
	var d = abs(gameChar_x - flagpole.x_pos); //Calculates the distance regardless of -ve/+ve signs

	if(d < 15) //If calculated distance is reached
	{
		flagpole.isReached = true; //Flagpole goes up
	}
}

function Enemy(x,y,range)
{
	//Properties
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 2;

	//Making movements for enemies
	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -2;
		}
		else if (this.currentX < this.x)
		{
			this.inc = 2;
		}
	}
	this.draw = function()
	{
		/* Enemy consists of an ellipse & 2 triangles. It is a sharp 
		round object that can slaughter a chick */
		this.update();
		fill(96,96,96);
		ellipse(this.currentX,this.y,50,50);
		triangle(this.currentX+30,this.y+15,this.currentX +2,this.y -33,this.currentX-30,this.y+15);
		triangle(this.currentX-30,this.y-15,this.currentX -2,this.y +33,this.currentX+30,this.y-15);
	}

	this.checkContact = function(gc_x,gc_y)
	{	
		//Colliding with the enemy
		var d = dist(gc_x,gc_y,this.currentX,this.y)
		if(d < 25)
		{
			enemiesSound.play(); //Hitting sound
			return true; //When collided
		}
				return false; //When not collided
	}
}

function checkPlayerDie()
{
	if(pitted) //Just for canyon
	{
		pitted = false;
		lives -= 1;
		//One life is minused when falling in canyon
		for(var i = 0; i < lives; i++)
		{
			
		}
		if((lives <= 0)) //Game over when lives are zero
		{
			return true; //Start over
		}
		startGame();
	}
	return false; //Dosen't starts over
}

function startGame()
{
	//When game starts again, everything appears again
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;
	
	//Proerties of collectable will appers again
	collectable = [
		{x_pos: 400, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 600, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 800, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 200, y_pos: floorPos_y, size: 40, isFound: false},
		{x_pos: 200, y_pos: floorPos_y-80, size: 40, isFound: false},
		{x_pos: 1300, y_pos: floorPos_y-60, size: 40, isFound: false},
		{x_pos: 2050, y_pos: floorPos_y-70, size: 40, isFound: false},
		{x_pos: 2080, y_pos: floorPos_y-70, size: 40, isFound: false},
		{x_pos: 2250, y_pos: floorPos_y-105, size: 40, isFound: false},
		{x_pos: 2280, y_pos: floorPos_y-105, size: 40, isFound: false},
		{x_pos: 2450, y_pos: floorPos_y-135, size: 40, isFound: false},
		{x_pos: 2480, y_pos: floorPos_y-135, size: 40, isFound: false},
		{x_pos: -215, y_pos: floorPos_y-80, size: 40, isFound: false},
	];
	
	//Objects of clouds appears again
	clouds = [
		{x_pos: -200, y_pos: 100},
		{x_pos: 100, y_pos: 150},
		{x_pos: 380, y_pos: 100},
		{x_pos: 750, y_pos: 130},
		{x_pos: 1100, y_pos: 100},
		{x_pos: 1500, y_pos: 130},
	];
	
	//multiple interactable canyons appears again
	canyon = [
		{x: -300, y: 432, width: 142, height: 340},
		{x: 203, y: 432, width: 120, height: 340},
		{x: 1000, y: 432, width: 120, height: 340},
		 {x: 1400, y: 432, width: 120, height: 340},
		 {x: 2000, y: 432, width: 670, height: 340},

	];
	
	//Position of trees on the ground appears again
	treePos_y = floorPos_y-150;
	//An array of trees of x-coordinate appears again
	trees_x = [-300,-200,400,600,800,1000,1250,1500,1750,2000,2250,2500];
	
	//An array of mountains of x-coordinate appears again
	mountains = [
		{x_pos: -400},
		{x_pos: 400},
		{x_pos: 1000},
		{x_pos: 1650},
		{x_pos: 2200},
		{x_pos: 2800},
	]
	//Position of mountains on the ground appears again
	mountain_y = floorPos_y;

	//Position of camera of x-coordinate starts in the middle appears again
	cameraPosX = 0;

	//Game score is zero again since game started again
	game_score = 0;

	//Properties of an interactable flagpole appears again
	flagpole = {isReached: false, x_pos: 2780};
}

function createPlatforms(x,y,length)
{
	var p = 
	{	//Properties
		x: x,
		y: y,
		length: length,
		draw: function()
		{
			//Platforms made with 2 rectangles
			stroke(0);
			fill(255,228,225);
			rect(this.x, this.y, this.length, 20);
			fill(248,248,255);
			rect(this.x, this.y, this.length, 10);
		},
		checkContact: function(gameC_x,gameC_y)
		{
			if(gameC_x > this.x && gameC_x < this.x + this.length)
			{
				var d = this.y - gameC_y;
				if(d >= 0 && d < 5)
				{
					return true; //When on platform	
				}
			}
			return false; //When not on platform	
		}
	}
	return p; //When properties of platform is in use
}