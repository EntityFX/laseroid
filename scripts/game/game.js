"use strict";

/**
 * Main class
 * 
 * @class Main
 */
var Main = /** @class */ (function () {

	Main.graphics = {
		width: 640, //420,
		height: 480, //470,
		isScaleToWindow: false
	};

	Main.gameArea = {
		top: 3,
		left: 140,
		bottom: 10,
		enemyBottom: 160,
		right: 78,
		padding: 7
	}

	Main.resources = [
		"images/ships-texture.json",
		"images/bullet-texture.json",
		"sounds/alien-torpedo-shoot.wav",
		"sounds/alien-red-plasma-shoot.wav",
		"sounds/hero-torpedo-shoot.wav",
	];

	Main.sounds = {
		"alienTorpedo": "sounds/alien-torpedo-shoot.wav",
		"redPlasma": "sounds/alien-red-plasma-shoot.wav",
		"heroTorpedo": "sounds/hero-torpedo-shoot.wav",
	};

	Main.heroWeaponConfiguration = {
		"torpedo": {
			"sprite": "Bullet1_1.png",
			"hitPoints": 1,
			"intensity": 25,
			"speed": 5,
			"type": "bullet",
			"sound": "heroTorpedo"
		},
		"automatedTorpedo": {
			"sprite": "Bullet1_1.png",
			"hitPoints": 1,
			"intensity": 50,
			"speed": 5,
			"type": "bullet",
			"sound": "heroTorpedo"
		},
		"greenPlasma": {
			"animatedSprite": "Bullet3",
			"hitPoints": 5,
			"intensity": 30,
			"speed": 7,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"pulsePlasma": {
			"animatedSprite": "Bullet7",
			"hitPoints": 10,
			"intensity": 20,
			"speed": 8,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"greenLaser": {
			"sprite": "Bullet9_3.png",
			"laserSprite": "Bullet9_2.png",
			"hitPoints": 15,
			"intensity": 30,
			"type": "laser",
			"sound": "alienTorpedo"
		}
	};

	Main.enemyWeaponConfiguration = {
		"torpedo": {
			"sprite": "Bullet1_1.png",
			"intensity": [{ "min": 100, "max": 150 }, { "min": 150, "max": 200 }, { "min": 75, "max": 100 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"intensiveTorpedo": {
			"sprite": "Bullet1_1.png",
			"intensity": [{ "min": 35, "max": 80 }, { "min": 65, "max": 100 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"veryIntensiveTorpedo": {
			"sprite": "Bullet1_1.png",
			"intensity": [{ "min": 100, "max": 150 }, { "min": 5, "max": 10 }, { "min": 100, "max": 150 }, { "min": 10, "max": 20 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"redPlasm": {
			"sprite": "Bullet2_1.png",
			"intensity": [{ "min": 150, "max": 200 }, { "min": 10, "max": 20 }, { "min": 40, "max": 70 }, { "min": 150, "max": 300 }, { "min": 15, "max": 25 }, { "min": 20, "max": 55 }],
			"speed": 3.5,
			"type": "bullet",
			"sound": "redPlasma"
		},
	};

	Main.upgradeConfiguration = {
		"upgrade1": {
			"sprite": "Upgrade.png",
			"speed": 3
		}
	};

	Main.heroLevelWeapons = {
		1: {
			"weapons": [
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } }
			]
		},
		2: {
			"weapons": [
				{ "weapon": "torpedo", "position": { x: -5, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 5, y: 0 } }
			]
		},
		3: {
			"weapons": [
				{ "weapon": "torpedo", "position": { x: -10, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 10, y: 0 } }
			]
		},
		4: {
			"weapons": [
				{ "weapon": "torpedo", "position": { x: -10, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 10, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
			]
		},
		5: {
			"weapons": [
				{ "weapon": "torpedo", "position": { x: -10, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 10, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		6: {
			"weapons": [
				{ "weapon": "greenPlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		8: {
			"weapons": [
				{ "weapon": "pulsePlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		9: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		}
	};

	Main.bonusShipsConfiguration = {
		"bonus1": {
			"animatedSprite": "PowerUps",
			"movement": "horizontalNormal",
			"upgradeBonus": { "type": "upgrade1", "position": { x: 0, y: 0 } }
		},
	};

	Main.enemyMovementConfiguration = {
		"horizontalNormal": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -1,
						"vy": 0
					},
					"intensity": [{ "min": 50, "max": 150 }, { "min": 150, "max": 250 }]
				}
			]
		},
		"bothNormal": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -1.5,
						"vy": 1.5
					},
					"intensity": [{ "min": 150, "max": 200 }, { "min": 5, "max": 150 }, { "min": 200, "max": 300 }, { "min": 25, "max": 50 }]
				}
			]
		},
		"bothSharpVertical": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -1,
						"vy": 2
					},
					"intensity": [{ "min": 150, "max": 200 }, { "min": 5, "max": 150 }, { "min": 200, "max": 300 }, { "min": 25, "max": 50 }]
				}
			]
		},
		"horizontalFast": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -6,
						"vy": 0
					},
					"intensity": [{ "min": 20, "max": 150 }, { "min": 150, "max": 350 }]
				}
			]
		},
		"movingDown": {
			"movements": [
				{
					"type": "freeMovementDown",
					"speedDelta": {
						"vx": -0.7,
						"vy": 0.3
					},
					"intensity": [{ "min": 150, "max": 200 }, { "min": 200, "max": 300 }, { "min": 25, "max": 50 }]
				}
			]
		},
	};

	Main.enemyShipsConfiguration = {
		"alien1": {
			"life": 2,
			"weapons": [
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip1_1.png",
			"movement": "horizontalNormal"
		},
		"alien2": {
			"life": 4,
			"weapons": [
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } }
			],
			"animatedSprite": "AlienShip2",
			"movement": "bothNormal"
		},
		"alien3": {
			"life": 6,
			"weapons": [
				{ "weapon": "intensiveTorpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip3_1.png",
			"movement": "horizontalFast"
		},
		"alien4": {
			"life": 8,
			"weapons": [
				{ "weapon": "redPlasm", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip4_1.png",
			"movement": "bothSharpVertical"
		},
		"alien5": {
			"life": 10,
			"weapons": [
				{ "weapon": "veryIntensiveTorpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip5_1.png",
			"movement": "movingDown"
		},
	};

	Main.levelsConfiguration = {
		1: {
			"enemies": [
				{ "type": "alien1", "position": { x: 205, y: 95 } },
				{ "type": "alien1", "position": { x: 290, y: 155 } },
				{ "type": "alien1", "position": { x: 365, y: 230 } },
				{ "type": "alien1", "position": { x: 435, y: 150 } },
				{ "type": "alien1", "position": { x: 520, y: 75 } }
			],
			"bonuses": []
		},
		2: {
			"enemies": [
				{ "type": "alien1", "position": { x: 200, y: 35 } },
				{ "type": "alien1", "position": { x: 300, y: 120 } },
				{ "type": "alien1", "position": { x: 335, y: 155 } },
				{ "type": "alien1", "position": { x: 365, y: 190 } },
				{ "type": "alien1", "position": { x: 400, y: 160 } },
				{ "type": "alien1", "position": { x: 440, y: 115 } },
				{ "type": "alien1", "position": { x: 525, y: 40 } }
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		3: {
			"enemies": [
				{ "type": "alien1", "position": { x: 350, y: 80 } },
				{ "type": "alien1", "position": { x: 275, y: 125 } },
				{ "type": "alien1", "position": { x: 325, y: 125 } },
				{ "type": "alien1", "position": { x: 375, y: 125 } },
				{ "type": "alien1", "position": { x: 425, y: 125 } },
				{ "type": "alien1", "position": { x: 300, y: 155 } },
				{ "type": "alien1", "position": { x: 350, y: 155 } },
				{ "type": "alien1", "position": { x: 400, y: 155 } },
				{ "type": "alien1", "position": { x: 325, y: 185 } },
				{ "type": "alien1", "position": { x: 375, y: 190 } },
				{ "type": "alien1", "position": { x: 350, y: 220 } },
				{ "type": "alien1", "position": { x: 350, y: 290 } }
			],
			"bonuses": []
		},
		4: {
			"enemies": [
				{ "type": "alien1", "position": { x: 170, y: 130 } },
				{ "type": "alien1", "position": { x: 190, y: 90 } },
				{ "type": "alien1", "position": { x: 315, y: 45 } },
				{ "type": "alien1", "position": { x: 380, y: 45 } },
				{ "type": "alien1", "position": { x: 510, y: 90 } },
				{ "type": "alien1", "position": { x: 535, y: 120 } },
				{ "type": "alien2", "position": { x: 300, y: 190 } },
				{ "type": "alien2", "position": { x: 355, y: 160 } },
				{ "type": "alien2", "position": { x: 400, y: 200 } },

			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		5: {
			"enemies": [
				{ "type": "alien1", "position": { x: 320, y: 55 } },
				{ "type": "alien1", "position": { x: 385, y: 55 } },
				{ "type": "alien1", "position": { x: 350, y: 90 } },
				{ "type": "alien2", "position": { x: 195, y: 110 } },
				{ "type": "alien2", "position": { x: 495, y: 110 } },
				{ "type": "alien2", "position": { x: 240, y: 140 } },
				{ "type": "alien2", "position": { x: 435, y: 140 } },
				{ "type": "alien2", "position": { x: 340, y: 210 } }

			],
			"bonuses": []
		},
		6: {
			"enemies": [
				{ "type": "alien3", "position": { x: 315, y: 15 } },
				{ "type": "alien3", "position": { x: 385, y: 15 } },
				{ "type": "alien3", "position": { x: 350, y: 60 } },
				{ "type": "alien1", "position": { x: 235, y: 125 } },
				{ "type": "alien1", "position": { x: 470, y: 110 } },
				{ "type": "alien2", "position": { x: 300, y: 145 } },
				{ "type": "alien2", "position": { x: 415, y: 140 } },
				{ "type": "alien2", "position": { x: 355, y: 190 } }
			],
			"bonuses": []
		},
		7: {
			"enemies": [
				{ "type": "alien4", "position": { x: 350, y: 50 } },
				{ "type": "alien2", "position": { x: 200, y: 100 } },
				{ "type": "alien2", "position": { x: 505, y: 90 } },
				{ "type": "alien2", "position": { x: 230, y: 140 } },
				{ "type": "alien2", "position": { x: 475, y: 130 } },
				{ "type": "alien2", "position": { x: 250, y: 180 } },
				{ "type": "alien2", "position": { x: 445, y: 165 } },
				{ "type": "alien2", "position": { x: 310, y: 215 } },
				{ "type": "alien2", "position": { x: 405, y: 215 } },
			],
			"bonuses": []
		},
		8: {
			"enemies": [
				{ "type": "alien4", "position": { x: 165, y: 177 } },
				{ "type": "alien4", "position": { x: 520, y: 172 } },
				{ "type": "alien1", "position": { x: 164, y: 20 } },
				{ "type": "alien1", "position": { x: 510, y: 23 } },
				{ "type": "alien1", "position": { x: 235, y: 55 } },
				{ "type": "alien1", "position": { x: 336, y: 60 } },
				{ "type": "alien1", "position": { x: 450, y: 55 } },
				{ "type": "alien1", "position": { x: 177, y: 100 } },
				{ "type": "alien1", "position": { x: 290, y: 105 } },
				{ "type": "alien1", "position": { x: 405, y: 100 } },
				{ "type": "alien1", "position": { x: 505, y: 102 } },
				{ "type": "alien1", "position": { x: 240, y: 140 } },
				{ "type": "alien1", "position": { x: 340, y: 135 } },
				{ "type": "alien1", "position": { x: 450, y: 150 } },
				{ "type": "alien1", "position": { x: 285, y: 180 } },
				{ "type": "alien1", "position": { x: 400, y: 180 } },
				{ "type": "alien1", "position": { x: 340, y: 215 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		9: {
			"enemies": [
				{ "type": "alien2", "position": { x: 170, y: 48 } },
				{ "type": "alien2", "position": { x: 520, y: 42 } },
				{ "type": "alien2", "position": { x: 250, y: 86 } },
				{ "type": "alien2", "position": { x: 440, y: 86 } },
				{ "type": "alien2", "position": { x: 340, y: 112 } },
				{ "type": "alien2", "position": { x: 200, y: 137 } },
				{ "type": "alien2", "position": { x: 490, y: 130 } },
				{ "type": "alien2", "position": { x: 280, y: 160 } },
				{ "type": "alien2", "position": { x: 430, y: 165 } },
				{ "type": "alien2", "position": { x: 352, y: 187 } },
				{ "type": "alien4", "position": { x: 340, y: 55 } },
				{ "type": "alien4", "position": { x: 168, y: 192 } },
				{ "type": "alien4", "position": { x: 520, y: 188 } }
			],
			"bonuses": [
			]
		},
		10: {
			"enemies": [
				{ "type": "alien1", "position": { x: 190, y: 35 } },
				{ "type": "alien5", "position": { x: 475, y: 35 } },
				{ "type": "alien4", "position": { x: 272, y: 90 } },
				{ "type": "alien4", "position": { x: 380, y: 64 } },
				{ "type": "alien4", "position": { x: 350, y: 78 } },
				{ "type": "alien4", "position": { x: 270, y: 95 } },
				{ "type": "alien4", "position": { x: 429, y: 92 } },
				{ "type": "alien2", "position": { x: 208, y: 142 } },
				{ "type": "alien2", "position": { x: 492, y: 136 } },
				{ "type": "alien2", "position": { x: 290, y: 165 } },
				{ "type": "alien2", "position": { x: 438, y: 170 } },
				{ "type": "alien2", "position": { x: 336, y: 192 } },
				{ "type": "alien2", "position": { x: 177, y: 248 } },
				{ "type": "alien2", "position": { x: 500, y: 241 } },
				{ "type": "alien2", "position": { x: 257, y: 272 } },
				{ "type": "alien2", "position": { x: 360, y: 265 } },
				{ "type": "alien2", "position": { x: 438, y: 275 } },
			],
			"bonuses": [
			]
		},
		11: {
			"enemies": [
				{ "type": "alien1", "position": { x: 166, y: 22 } },
				{ "type": "alien1", "position": { x: 505, y: 24 } },
				{ "type": "alien1", "position": { x: 333, y: 34 } },
				{ "type": "alien1", "position": { x: 233, y: 54 } },
				{ "type": "alien1", "position": { x: 444, y: 54 } },
				{ "type": "alien1", "position": { x: 170, y: 99 } },
				{ "type": "alien1", "position": { x: 283, y: 106 } },
				{ "type": "alien1", "position": { x: 331, y: 106 } },
				{ "type": "alien1", "position": { x: 401, y: 100 } },
				{ "type": "alien1", "position": { x: 499, y: 102 } },
				{ "type": "alien1", "position": { x: 238, y: 143 } },
				{ "type": "alien1", "position": { x: 448, y: 151 } },
				{ "type": "alien1", "position": { x: 189, y: 174 } },
				{ "type": "alien1", "position": { x: 278, y: 180 } },
				{ "type": "alien1", "position": { x: 335, y: 185 } },
				{ "type": "alien1", "position": { x: 392, y: 180 } },
				{ "type": "alien1", "position": { x: 487, y: 183 } },
				{ "type": "alien1", "position": { x: 237, y: 226 } },
				{ "type": "alien1", "position": { x: 428, y: 226 } },
				{ "type": "alien1", "position": { x: 333, y: 249 } },
			],
			"bonuses": [
			]
		},
		12: {
			"enemies": [
				{ "type": "alien3", "position": { x: 300, y: 25 } },
				{ "type": "alien3", "position": { x: 379, y: 22 } },
				{ "type": "alien5", "position": { x: 335, y: 68 } },
				{ "type": "alien4", "position": { x: 230, y: 98 } },
				{ "type": "alien4", "position": { x: 445, y: 88 } },
				{ "type": "alien2", "position": { x: 190, y: 130 } },
				{ "type": "alien2", "position": { x: 490, y: 114 } },
				{ "type": "alien2", "position": { x: 286, y: 175 } },
				{ "type": "alien2", "position": { x: 383, y: 177 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		}
	};

	Main.heroSpeed = 10;

	Main.prototype.hexi = null;

	Main.prototype.hero = null;

	Main.prototype.enemies = [];

	Main.prototype.bonuses = [];

	Main.prototype.isMobile = false;

	Main.prototype.heroBullets = [];

	Main.prototype.enemyBullets = [];

	Main.prototype.upgrades = [];

	Main.prototype.gameScene = null;

	Main.prototype.sounds = {
		"shoot": null
	};

	Main.prototype.lifeText = {
		"position": { "x": 160, "y": 440 },
		"textObject": null,
		"font": "sans-serif",
		"size": "20px",
		"color": "#009200"
	};

	Main.prototype.waveText = {
		"position": { "x": 620, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	Main.prototype.levelText = {
		"position": { "x": 620, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#F0F0F0"
	};

	Main.prototype.levelLabelText = {
		"position": { "x": 565, "y": 5 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#99CC00",
		"text": "LEVEL"
	};

	Main.prototype.waveLabelText = {
		"position": { "x": 565, "y": 23 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#9DD19D",
		"text": "WAVE"
	};



	Main.prototype.level = {
		"wave": 1,
		"type": 1
	};

	function Main($hexi, isMobile) {
		this.hexi = $hexi(Main.graphics.width, Main.graphics.height, this.setup.bind(this), Main.resources, this.load.bind(this));
	}

	Main.prototype.getResources = function () {
	};

	Main.prototype.init = function () {
		this.hexi.border = "1px violet dashed";
		this.hexi.backgroundColor = 0x000000;

		if (Main.graphics.isScaleToWindow || this.isMobile) {
			/*
						var docelem = document.documentElement;
			
						if (docelem.requestFullscreen) {
							docelem.requestFullscreen();
						}
						else if (docelem.mozRequestFullScreen) {
							docelem.mozRequestFullScreen();
						}
						else if (docelem.webkitRequestFullscreen) {
							docelem.webkitRequestFullscreen();
						}
						else if (docelem.msRequestFullscreen) {
							docelem.msRequestFullscreen();
						}*/
			this.hexi.scaleToWindow();
		}

		this.hexi.start();
	};

	Main.prototype.load = function () {

	};

	Main.prototype.end = function () {

	};

	Main.prototype.setup = function () {
		var _this = this;
		this.hexi.pointer.visible = false;

		for (const key in Main.sounds) {
			if (Main.sounds.hasOwnProperty(key)) {
				this.sounds[key] = this.hexi.sound(Main.sounds[key]);
				//this.sounds[key].fade(0.3, 1);
			}
		}

		this.gameScene = this.hexi.group();
		var gameArea = this.hexi.rectangle(
			this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.left - Main.gameArea.padding,
			this.hexi.canvas.height - Main.gameArea.top - Main.gameArea.bottom - Main.gameArea.padding,
			null, "#785E3A", Main.gameArea.padding, Main.gameArea.left, Main.gameArea.top);
		this.gameScene.addChild(gameArea);

		this.hero = new HeroShip(this.hexi, this);

		this.lifeText.textObject = this.hexi.text(_this.hero.life, this.lifeText.font, this.lifeText.size,
			this.lifeText.color,
			this.lifeText.position.x, this.lifeText.position.y);
		this.gameScene.addChild(this.lifeText.textObject);

		this.levelText.textObject = this.hexi.text(_this.level.type, this.waveText.font, this.waveText.size,
			this.levelText.color,
			this.levelText.position.x, this.levelText.position.y);
		this.gameScene.addChild(this.levelText.textObject);

		this.levelLabelText.textObject = this.hexi.text(_this.levelLabelText.text, this.levelLabelText.font, this.levelLabelText.size,
			this.levelLabelText.color,
			this.levelLabelText.position.x, this.levelLabelText.position.y);
		this.gameScene.addChild(this.levelLabelText.textObject);

		this.waveText.textObject = this.hexi.text(_this.level.wave, this.waveText.font, this.waveText.size,
			this.waveText.color,
			this.waveText.position.x, this.waveText.position.y);
		this.gameScene.addChild(this.waveText.textObject);

		this.waveLabelText.textObject = this.hexi.text(_this.waveLabelText.text, this.waveLabelText.font, this.waveLabelText.size,
			this.waveLabelText.color,
			this.waveLabelText.position.x, this.waveLabelText.position.y);
		this.gameScene.addChild(this.waveLabelText.textObject);


		this.setupLevel(this.level.wave);
		this.changeState();

		this.hexi.pointer.press = (function () {
			this.hero.startShoot();
		}).bind(this);

		this.hexi.pointer.release = (function () {
			this.hero.stopShoot();
		}).bind(this);

		var spaceBar = this.hexi.keyboard(32);

		spaceBar.press = (function () {
			this.hero.startShoot();
		}).bind(this);

		spaceBar.release = (function () {
			this.hero.stopShoot();
		}).bind(this);

		var plusButton = this.hexi.keyboard(48);
		plusButton.press = (function () {
			this.hero.upgrade();
		}).bind(this);

		this.hexi.state = this.playLoop.bind(this);
	};

	Main.prototype.setupLevel = function (currentWave) {
		var _this = this;
		var currentLevel = Main.levelsConfiguration[currentWave];

		currentLevel.enemies.forEach(function (enemyConfig) {
			var enemy = new EnemyShip(_this.hexi, _this, enemyConfig.type)
			enemy.setPosition(enemyConfig.position);
			_this.enemies.push(enemy);
		});

		if (currentLevel.bonuses) {
			currentLevel.bonuses.forEach(function (bonusConfig) {
				var bonusShip = new BonusShip(_this.hexi, _this, bonusConfig.type)
				bonusShip.setPosition(bonusConfig.position);
				_this.bonuses.push(bonusShip);
			});
		}
	}

	Main.prototype.resetGame = function () {
		var _this = this;
		this.hexi.pause();
		this.level.wave = 1;
		this.hero.life = 1;
		this.enemies.forEach(function (enemy) {
			enemy.remove();
		});
		this.enemies = [];

		this.bonuses.forEach(function (bonus) {
			bonus.remove();
		});
		this.bonuses = [];

		this.upgrades.forEach(function (upgrade) {
			_this.hexi.stage.removeChild(upgrade);
		});
		this.upgrades = [];

		this.enemyBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.enemyBullets = [];

		this.heroBullets.forEach(function (bullet) {
			_this.hexi.stage.removeChild(bullet);
		});
		this.heroBullets = [];

		this.setupLevel(this.level.wave);
		this.changeState();
		this.hexi.resume();
	};

	Main.prototype.playLoop = function () {
		var _this = this;
		this.hero.update();

		this.enemies.forEach(function (enemy) {
			enemy.update();
		})

		this.enemies = this.enemies.filter(function (enemy) {
			return enemy.life > 0;
		});

		this.bonuses.forEach(function (bonus) {
			bonus.update();
		});

		this.bonuses = this.bonuses.filter(function (bonus) {
			return bonus.sprite.parent;
		});


		if (this.enemies.length == 0 && this.bonuses.length == 0) {
			this.level.wave++;
			this.setupLevel(this.level.wave);
			this.changeState();
		}

		this.heroBullets.forEach(function (bullet) {
			if (bullet.y < -bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			_this.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestPoint({ x: bullet.x, y: bullet.y }, enemy.sprite)) {
					enemy.hit(bullet);
				}
			})

			_this.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestPoint({ x: bullet.x, y: bullet.y }, bonus.sprite)) {
					bonus.hit(bullet);
				}
			})
		})

		this.heroBullets = this.heroBullets.filter(function (bullet) {
			return bullet.parent;
		});

		for (var bulletIndex in this.enemyBullets) {
			if (this.enemyBullets.hasOwnProperty(bulletIndex)) {
				var bullet = this.enemyBullets[bulletIndex];
				if (bullet.y >= _this.hexi.stage.height - bullet.height) {
					_this.hexi.stage.remove(bullet);
				}

				if (_this.hexi.hitTestPoint({ x: bullet.x, y: bullet.y }, _this.hero.sprite)) {
					_this.hero.hit(bullet);
				}
			}
		}

		this.enemyBullets = this.enemyBullets.filter(function (bullet) {
			return bullet.parent;
		});

		this.upgrades.forEach(function (upgradeItem) {
			if (upgradeItem.y >= _this.hexi.stage.height - upgradeItem.height) {
				_this.hexi.stage.remove(upgradeItem);
			}

			if (_this.hexi.hitTestPoint({ x: upgradeItem.x, y: upgradeItem.y }, _this.hero.sprite)) {
				_this.hero.hitUpgrade(upgradeItem);
			}
		})

		this.hexi.move(this.heroBullets);
		this.hexi.move(this.enemyBullets);
		this.hexi.move(this.upgrades);
	};


	Main.prototype.changeState = function () {
		this.lifeText.textObject.content = this.hero.life;
		this.waveText.textObject.content = this.level.wave;
		this.levelText.textObject.content = this.level.type;
	};

	return Main;
}());

var Ship = /** @class */ (function () {

	Ship.prototype.hexi = null;

	Ship.prototype.sprite = null;

	Ship.prototype.game = null;

	Ship.prototype.life = 1;

	function Ship($hexi, game) {
		this.hexi = $hexi;
		this.game = game;
	}

	Ship.prototype.move = function () {
	}


	Ship.prototype.update = function () {
	}

	Ship.prototype.setPosition = function (position) {
		this.sprite.setPosition(position.x, position.y);
	};

	Ship.prototype.remove = function () {
		this.game.gameScene.removeChild(this.sprite);
	};

	return Ship;
}());

var WeaponedShip = /** @class */ (function (_super) {
	__extends(WeaponedShip, _super);

	WeaponedShip.prototype.isWeaponShooting = false;

	WeaponedShip.prototype.automatedWeapons = [];

	function WeaponedShip($hexi, game) {
		return _super !== null && _super.apply(this, arguments) || this;
	}

	WeaponedShip.prototype.startShoot = function () {
		this.isWeaponShooting = true;
	}

	WeaponedShip.prototype.stopShoot = function () {
		this.isWeaponShooting = false;
	}

	WeaponedShip.prototype.updateShooting = function () {
	};

	WeaponedShip.prototype.remove = function () {
		this.isWeaponShooting = false;
		this.life = 0;
		_super.prototype.remove.call(this);
	};

	return WeaponedShip;
}(Ship));

var HeroShip = /** @class */ (function (_super) {
	__extends(HeroShip, _super);

	HeroShip.prototype.weapons = [];

	HeroShip.prototype.invisibilityCounter = 0;

	function HeroShip($hexi, game) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.sprite = this.hexi.sprite(["HeroShip.png"]);
		_this.hexi.stage.putCenter(_this.sprite, 0, _this.hexi.canvas.height / 2 - 2 * _this.sprite.height);
		_this.sprite.circular = true;

		_this.sprite.playAnimation();
		_this.hexi.arrowControl(_this.sprite, Main.heroSpeed);

		_this.game.gameScene.addChild(_this.sprite);
		_this.setWeapon();
		return _this;
	}

	HeroShip.prototype.update = function () {
		_super.prototype.update.call(this);

		this.sprite.vy = 0;
		this.hexi.move(this.sprite);

		this.sprite.x = this.hexi.pointer.x;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding
			}, false);

		if (this.invisibilityCounter <= 0) {
			this.invisibilityCounter = 0;
		} else {
			this.invisibilityCounter--;
		}

		this.updateShooting();
	};

	HeroShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;


		_this.automatedWeapons.forEach(function (weapon) {
			weapon.weaponItensityCounter++;

			if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

			weapon.weaponItensityCounter = 0;
			_this.shootWithWeapon(weapon);
		});

		if (!this.isWeaponShooting) return;

		_this.weapons.forEach(function (weapon) {
			if (weapon.weaponItensityCounter == 0) {
				_this.shootWithWeapon(weapon);
			}
			weapon.weaponItensityCounter++;

			if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = Main.heroWeaponConfiguration[weapon.weapon];
		_this.game.sounds[currentWeapon.sound].play();
		_this.hexi.shoot(
			_this.sprite, 4.7124,   // 3/2*pi          
			_this.sprite.halfWidth + weapon.position.x, weapon.position.y,
			_this.hexi.stage, currentWeapon.speed,
			_this.game.heroBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				return bulletSprite;
			}).bind(_this)
		);
	};

	HeroShip.prototype.setWeapon = function () {
		var weaponConfiguration = Main.heroLevelWeapons[this.life];

		if (!weaponConfiguration) return;

		this.weapons = deepCopy(weaponConfiguration.weapons);

		if (weaponConfiguration.automatedWeapons) {
			this.automatedWeapons = deepCopy(weaponConfiguration.automatedWeapons);
		}

		this.weapons.forEach(function (weapon) {
			var currentWeapon = Main.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});

		this.automatedWeapons.forEach(function (weapon) {
			var currentWeapon = Main.heroWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.upgrade = function () {
		this.life++;
		this.setWeapon();
		this.game.changeState();
	}

	HeroShip.prototype.downgrade = function () {
		this.life--;
		this.setWeapon();
		this.game.changeState();
	}

	HeroShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);

		if (this.invisibilityCounter > 0) {
			return;
		}

		this.downgrade();

		if (this.life <= 0) {
			this.game.resetGame();
		}

		this.invisibilityCounter = 25;
	};

	HeroShip.prototype.hitUpgrade = function (upgradeItem) {
		this.game.hexi.stage.remove(upgradeItem);

		if (this.invisibilityCounter > 0) {
			return;
		}

		this.upgrade();

		this.invisibilityCounter = 25;
	};

	return HeroShip;
}(WeaponedShip));

var MovementEngine =  /** @class */ (function () {

	MovementEngine.prototype.hexi = null;

	MovementEngine.prototype.sprite = null;

	MovementEngine.prototype.movements = null;

	MovementEngine.prototype.firstMovement = null;

	MovementEngine.prototype.movementItensity = 0;

	MovementEngine.prototype.movementItensityCounter = 0;

	MovementEngine.prototype.movementItensitySlot = 0;

	MovementEngine.prototype.movementConfiguration = null;

	MovementEngine.prototype.isBounceBottom = true;

	function MovementEngine($hexi, sprite, movementConfiguration) {
		this.hexi = $hexi;
		this.sprite = sprite;
		this.movementConfiguration = movementConfiguration;
		this.setMovement();
	}

	MovementEngine.prototype.update = function () {
		if (this.sprite.parent == null) return;

		this.hexi.move(this.sprite);

		this.updateMovement();
	};

	MovementEngine.prototype.setMovement = function () {
		var _this = this;

		this.movements = deepCopy(Main.enemyMovementConfiguration[_this.movementConfiguration]);

		_this.firstMovement = this.movements.movements[0];
		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);
		_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;

		if (_this.firstMovement.type == "freeMovementDown") {
			//Array.isArray(_this.firstMovement.speedDelta.vy)) {
			//_this.sprite.vy = _this.firstMovement.speedDelta.vy[_this.hexi.randomInt(0, 1)];
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.isBounceBottom = false;
		} else {
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
	};

	MovementEngine.prototype.updateMovement = function () {
		var _this = this;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.enemyBottom - Main.gameArea.padding
			}, false, function (collision) {
				if (collision.has("left")) {
					_this.sprite.vx *= -1;
				}

				if (collision.has("right")) {
					_this.sprite.vx *= -1;
				}

				if (collision.has("top")) {
					_this.sprite.vy *= -1;
				}

				if (_this.isBounceBottom && collision.has("bottom")) {
					_this.sprite.vy *= -1;
				}
			});

		_this.movementItensityCounter++;
		if (_this.movementItensityCounter <= _this.movementItensity) return;
		_this.movementItensityCounter = 0;

		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);
		_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;

		if (_this.firstMovement.type == "freeMovementDown") {
			//Array.isArray(_this.firstMovement.speedDelta.vy)) {
			//_this.sprite.vy = _this.firstMovement.speedDelta.vy[_this.hexi.randomInt(0, 1)];
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
		} else {
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vy;
		}
	};

	return MovementEngine;
}());

var EnemyShip = /** @class */ (function (_super) {
	__extends(EnemyShip, _super);

	EnemyShip.prototype.type = null;

	EnemyShip.prototype.shipConfiguration = null;

	EnemyShip.prototype.weaponIntensity = 0;

	EnemyShip.prototype.weaponItensityCounter = 0;

	EnemyShip.prototype.weaponItensitySlot = 0;

	EnemyShip.prototype.firstWeapon = null;

	EnemyShip.prototype.movementEngine = null;

	function EnemyShip($hexi, game, type) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(Main.enemyShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("images/ships-texture.json").animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		_this.setWeapon();
		_this.game.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;
		_this.movementEngine = new MovementEngine($hexi, _this.sprite, _this.shipConfiguration.movement);

		return _this;
	}

	EnemyShip.prototype.update = function () {
		_super.prototype.update.call(this);

		var _this = this;

		if (this.sprite.parent == null) return;

		this.updateShooting();
		this.movementEngine.update();
	};

	EnemyShip.prototype.setWeapon = function () {
		var _this = this;
		this.automatedWeapons = deepCopy(_this.shipConfiguration.weapons);
		this.automatedWeapons.forEach(function (weapon) {
			var currentWeapon = Main.enemyWeaponConfiguration[weapon.weapon];
			weapon.options = currentWeapon;
		});

		_this.firstWeapon = this.automatedWeapons[0];
		var intensityOptions = _this.firstWeapon.options.intensity[_this.weaponItensitySlot];
		_this.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
		_this.weaponItensitySlot = _this.hexi.randomInt(0, _this.firstWeapon.options.intensity.length - 1);
		this.isWeaponShooting = true;
	};

	EnemyShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		if (!_this.isWeaponShooting) {
			return;
		}

		_this.weaponItensityCounter++;

		if (_this.weaponItensityCounter <= _this.weaponIntensity) return;
		_this.weaponItensityCounter = 0;


		this.automatedWeapons.forEach(function (weapon) {
			_this.shootWithWeapon(weapon);
		});

		var intensityOptions = _this.firstWeapon.options.intensity[_this.weaponItensitySlot];
		_this.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

		_this.weaponItensitySlot = _this.hexi.randomInt(0, _this.firstWeapon.options.intensity.length - 1);
	};

	EnemyShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = Main.enemyWeaponConfiguration[weapon.weapon];

		_this.hexi.shoot(
			_this.sprite, 1.57,   // 3/2*pi          
			_this.sprite.halfWidth + weapon.position.x, _this.sprite.height + weapon.position.y,
			_this.hexi.stage, currentWeapon.speed,
			_this.game.enemyBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				return bulletSprite;
			}).bind(_this)
		);

		_this.game.sounds[currentWeapon.sound].play();
	};

	EnemyShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.life -= bullet.weapon.hitPoints;
		if (this.life <= 0) {
			this.remove();
		}
	};


	return EnemyShip;
}(WeaponedShip));

var BonusShip = /** @class */ (function (_super) {
	__extends(BonusShip, _super);

	BonusShip.prototype.type = null;

	BonusShip.prototype.shipConfiguration = null;

	BonusShip.prototype.upgradeBonuses = null;

	BonusShip.prototype.movementEngine = null;

	function BonusShip($hexi, game, type) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(Main.bonusShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("images/ships-texture.json").animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		this.upgradeBonus = deepCopy(_this.shipConfiguration.upgradeBonus);

		_this.game.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;

		_this.movementEngine = new MovementEngine($hexi, _this.sprite, _this.shipConfiguration.movement);

		return _this;
	}

	BonusShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.remove();

		this.shootWithUpgrade(this.upgradeBonus);
	};

	BonusShip.prototype.shootWithUpgrade = function (upgradeBonus) {
		var _this = this;
		_this.game.sounds.shoot.play();
		var upgradeBonusConfig = Main.upgradeConfiguration[upgradeBonus.type];

		_this.hexi.shoot(
			_this.sprite, 1.57,
			_this.sprite.halfWidth + upgradeBonus.position.x, upgradeBonus.position.y,
			_this.hexi.stage, upgradeBonusConfig.speed,
			_this.game.upgrades,
			(function () {
				var upgradeSprite = _this.hexi.sprite(upgradeBonusConfig.sprite
					? upgradeBonusConfig.sprite
					: _this.hexi.json("images/bullet-texture.json").animations[upgradeBonusConfig.animatedSprite]);
				if (upgradeBonusConfig.animatedSprite) {
					upgradeSprite.playAnimation();
				}
				return upgradeSprite;
			}).bind(_this)
		);
	};

	BonusShip.prototype.update = function () {
		_super.prototype.update.call(this);

		if (this.sprite.parent == null) return;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: Main.gameArea.top + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.enemyBottom - Main.gameArea.padding
			}, true);

		this.movementEngine.update();
	};

	return BonusShip;
}(Ship));


function newFunction() {
	return element => {
	};
}
