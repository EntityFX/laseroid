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
		padding: 6
	}

	Main.resources = [
		"images/environment1.png",
		"images/environment2.png",
		"images/interface.png",
		"images/life-icon.png",
		"images/ships-texture.json",
		"images/bullet-texture.json",
		"sounds/alien-torpedo-shoot.wav",
		"sounds/alien-red-plasma-shoot.wav",
		"sounds/hero-torpedo-shoot.wav",
		"sounds/explode.wav",
		"sounds/hero-green-plasma-shoot.wav",
		"sounds/alien-green-plasma-shoot.wav",
		"sounds/pulse-plasma.wav",
		"sounds/laser.wav",
	];

	Main.sounds = {
		"alienTorpedo": "sounds/alien-torpedo-shoot.wav",
		"redPlasma": "sounds/alien-red-plasma-shoot.wav",
		"heroTorpedo": "sounds/hero-torpedo-shoot.wav",
		"explode": "sounds/explode.wav",
		"green-plasma-shoot": "sounds/hero-green-plasma-shoot.wav",
		"alien-green-plasma-shoot": "sounds/alien-green-plasma-shoot.wav",
		"pulse-plasma": "sounds/pulse-plasma.wav",
		"laser": "sounds/laser.wav",
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
		"redPlasma": {
			"sprite": "Bullet2_1.png",
			"hitPoints": 2,
			"intensity": 30,
			"speed": 4,
			"type": "bullet",
			"sound": "redPlasma"
		},
		"greenPlasma": {
			"animatedSprite": "Bullet3",
			"hitPoints": 3,
			"intensity": 30,
			"speed": 7,
			"type": "bullet",
			"sound": "green-plasma-shoot"
		},
		"bluePlasma": {
			"sprite": "Bullet4_1.png",
			"speed": 4.5,
			"hitPoints": 4,
			"intensity": 30,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"pulsePlasma": {
			"animatedSprite": "Bullet7",
			"hitPoints": 2,
			"intensity": 30,
			"speed": 8,
			"hitMax": 3,
			"type": "pulsePlasma",
			"sound": "pulse-plasma"
		},
		"greenLaser": {
			"sprites": {
				"beamSprite": "Bullet9_2.png",
				"shineSprite": "Bullet9_3.png"
			},
			"laserSprite": "",
			"hitPoints": 4,
			"intensity": 55,
			"timeToLive": 15,
			"hitMax": 5,
			"speed": 0,
			"type": "laser",
			"sound": "laser"
		}
	};

	Main.enemyWeaponConfiguration = {
		"torpedo": {
			"sprite": "Bullet1_1.png",
			"isRandomIntensity": false,
			"intensity": [{ "min": 50, "max": 200, "type": "pause" }, { "min": 100, "max": 200, "type": "shoot" }, { "min": 50, "max": 80, "type": "pause" }, { "min": 30, "max": 100, "repeat": 2 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"intensiveTorpedo": {
			"sprite": "Bullet1_1.png",
			"isRandomIntensity": false,
			"intensity": [{ "min": 50, "max": 100, "type": "pause" }, { "min": 35, "max": 80, "repeat": 3 }, { "min": 50, "max": 100, "type": "pause" }, { "min": 65, "max": 100 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"veryIntensiveTorpedo": {
			"sprite": "Bullet1_1.png",
			"intensity": [{ "min": 50, "max": 100, "type": "pause" }, { "min": 100, "max": 200 }, { "min": 50, "max": 100, "type": "pause" }, { "min": 10, "max": 30, "repeat": 5 }],
			"speed": 2.5,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"redPlasm": {
			"sprite": "Bullet2_1.png",
			"intensity": [{ "min": 100, "max": 200, "type": "pause" }, { "min": 35, "max": 120, "repeat": 5 }, { "min": 100, "max": 300, "type": "pause" }, { "min": 40, "max": 70 }, { "min": 150, "max": 300 }, { "min": 20, "max": 55 }],
			"speed": 3.5,
			"type": "bullet",
			"sound": "redPlasma"
		},
		"veryIntensiveRedPlasm": {
			"sprite": "Bullet2_1.png",
			"intensity": [{ "min": 100, "max": 200, "type": "pause" }, { "min": 5, "max": 20, "repeat": 5 }, { "min": 100, "max": 200, "type": "pause" }, { "min": 50, "max": 100 }],
			"speed": 3.5,
			"type": "bullet",
			"sound": "redPlasma"
		},
		"bluePlasma": {
			"sprite": "Bullet4_1.png",
			"speed": 4.5,
			"intensity": [{ "min": 50, "max": 200, "type": "pause" }, { "min": 40, "max": 70, "repeat": 2 }, { "min": 100, "max": 200, "type": "pause" }, { "min": 15, "max": 50, "repeat": 2 }],
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"blueBossPlasma": {
			"sprite": "Bullet4_1.png",
			"speed": 4.5,
			"intensity": [{ "min": 20, "max": 80, "type": "pause" }, { "min": 3, "max": 20, "repeat": 3 }, { "min": 100, "max": 150, "type": "pause" }, { "min": 1, "max": 30, "repeat": 10 }],
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"greenBossPlasma": {
			"animatedSprite": "Bullet3",
			"speed": 5,
			"intensity": [{ "min": 200, "max": 300, "type": "pause" }, { "min": 4, "max": 10, "repeat": 15 }],
			"type": "bullet",
			"sound": "alien-green-plasma-shoot"
		},
		"greenPlasma": {
			"animatedSprite": "Bullet3",
			"speed": 5,
			"intensity": [{ "min": 150, "max": 200 }, { "min": 20, "max": 30 }, { "min": 40, "max": 70 }, { "min": 150, "max": 300 }, { "min": 20, "max": 30 }, { "min": 20, "max": 55 }],
			"type": "bullet",
			"sound": "alien-green-plasma-shoot"
		},
		"blueTorpedo": {
			"sprite": "Bullet5_1.png",
			"intensity": [{ "min": 50, "max": 100 }, { "min": 65, "max": 120 }, { "min": 30, "max": 50 }],
			"speed": 3,
			"type": "bullet",
			"sound": "alienTorpedo"
		},
		"yellowLaser": {
			"sprite": "Bullet6_1.png",
			"intensity": [{ "min": 50, "max": 80 }, { "min": 65, "max": 100 }],
			"speed": { "min": 3.2, "max": 3.8 },
			"type": "bullet",
			"sound": "alienTorpedo"
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
				{ "weapon": "torpedo", "position": { x: -10, y: 0 } },
				{ "weapon": "torpedo", "position": { x: 10, y: 0 } }
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
		7: {
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
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		14: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		15: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "redPlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		19: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "redPlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		20: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "greenPlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		24: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "greenPlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		25: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "bluePlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		29: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "bluePlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},
		30: {
			"weapons": [
				{ "weapon": "greenLaser", "position": { x: 0, y: -20 } },
				{ "weapon": "pulsePlasma", "position": { x: 0, y: 0 } }
			],
			"automatedWeapons": [
				{ "weapon": "automatedTorpedo", "position": { x: -20, y: -15 } },
				{ "weapon": "automatedTorpedo", "position": { x: 20, y: -15 } }
			]
		},

	};

	Main.bonusShipsConfiguration = {
		"bonus1": {
			"animatedSprite": "PowerUps",
			"movement": "horizontalNormal",
			"upgradeBonus": {
				"type": "upgrade1", "position": { x: 0, y: 0 },
				"killPoints": 100
			}
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
		"horizontalSlowAndFollow": {
			"movements": [
				{
					"type": "followHero",
					"speedDelta": {
						"vx": -0.63,
						"vy": 0
					},
					"intensity": [{ "min": 50, "max": 150 }, { "min": 150, "max": 250 }]
				}
			]
		},
		"horizontalNormalAndFollow": {
			"movements": [
				{
					"type": "followHero",
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
		"bothSlow": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -1,
						"vy": 0.63
					},
					"intensity": [{ "min": 150, "max": 200 }, { "min": 5, "max": 150 }, { "min": 200, "max": 300 }, { "min": 25, "max": 50 }]
				}
			]
		},
		"bothSlowAndFollow": {
			"movements": [
				{
					"type": "followHero",
					"speedDelta": {
						"vx": -0.75,
						"vy": 0.75
					},
					"intensity": [{ "min": 250, "max": 250 }]
				}
			]
		},
		"bothFast": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -3,
						"vy": 3
					},
					"intensity": [{ "min": 150, "max": 200 }, { "min": 5, "max": 150 }, { "min": 200, "max": 300 }, { "min": 25, "max": 50 }]
				}
			]
		},
		"bothFastAndFollow": {
			"movements": [
				{
					"type": "followHero",
					"speedDelta": {
						"vx": -3,
						"vy": 1.5
					},
					"intensity": [{ "min": 25, "max": 50 }, { "min": 5, "max": 15 }, { "min": 25, "max": 50 }, { "min": 10, "max": 25 }]
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
		"bothSharpVerticalFast": {
			"movements": [
				{
					"type": "freeMovement",
					"speedDelta": {
						"vx": -1,
						"vy": 3
					},
					"intensity": [{ "min": 25, "max": 50 }, { "min": 5, "max": 75 }, { "min": 15, "max": 30 }, { "min": 25, "max": 50 }]
				}
			]
		},
		"bothSharpVerticalFastAndFollow": {
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
		"horizontalFastAndFollow": {
			"movements": [
				{
					"type": "followHero",
					"speedDelta": {
						"vx": -4,
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
			"movement": "horizontalNormal",
			"killPoints": 150
		},
		"alien2": {
			"life": 4,
			"weapons": [
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } }
			],
			"animatedSprite": "AlienShip2",
			"movement": "bothNormal",
			"killPoints": 300
		},
		"alien3": {
			"life": 8,
			"weapons": [
				{ "weapon": "intensiveTorpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip3_1.png",
			"movement": "horizontalFast",
			"killPoints": 600
		},
		"alien4": {
			"life": 10,
			"weapons": [
				{ "weapon": "redPlasm", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip4_1.png",
			"movement": "bothSharpVertical",
			"killPoints": 600
		},
		"alien5": {
			"life": 10,
			"weapons": [
				{ "weapon": "veryIntensiveTorpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip5_1.png",
			"movement": "movingDown",
			"killPoints": 1100
		},
		"alien6": {
			"life": 30,
			"weapons": [
				{ "weapon": "veryIntensiveRedPlasm", "position": { x: 0, y: 0 } }
			],
			"animatedSprite": "AlienShip6",
			"movement": "horizontalSlowAndFollow",
			"killPoints": 1900
		},
		"alien7": {
			"life": 30,
			"weapons": [
				{ "weapon": "bluePlasma", "position": { x: 0, y: 0 } }
			],
			"animatedSprite": "AlienShip7",
			"movement": "bothSharpVerticalFastAndFollow",
			"killPoints": 1900
		},
		"alien70": {
			"life": 30,
			"weapons": [
				{ "weapon": "bluePlasma", "position": { x: 0, y: 0 } }
			],
			"animatedSprite": "AlienShip70",
			"movement": "bothSharpVerticalFast",
			"killPoints": 2100
		},
		"alien8": {
			"life": 30,
			"weapons": [
				{ "weapon": "greenPlasma", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip8_1.png",
			"movement": "bothFastAndFollow",
			"killPoints": 9000
		},
		"alien9": {
			"life": 30,
			"weapons": [
				{ "weapon": "torpedo", "position": { x: 0, y: 0 } }
			],
			"sprite": "AlienShip9_1.png",
			"movement": "bothSharpVertical",
			"killPoints": 2100
		},
		"alien10": {
			"life": 35,
			"weapons": [
				{ "weapon": "blueTorpedo", "position": { x: -6, y: 0 } },
				{ "weapon": "blueTorpedo", "position": { x: 6, y: 0 } },
			],
			"sprite": "AlienShip10_1.png",
			"movement": "horizontalFast",
			"killPoints": 2100
		},
		"alien11": {
			"life": 35,
			"isSyncWeapon": true,
			"weapons": [
				{ "weapon": "yellowLaser", "position": { x: -24, y: -3 } },
				{ "weapon": "yellowLaser", "position": { x: -8, y: 2 } },
				{ "weapon": "yellowLaser", "position": { x: 8, y: 3 } },
				{ "weapon": "yellowLaser", "position": { x: 24, y: -2 } },
			],
			"sprite": "AlienShip11_1.png",
			"movement": "bothFast",
			"killPoints": 2900
		},
		"boss1": {
			"life": 100,
			"isSyncWeapon": true,
			"weapons": [
				{ "weapon": "blueBossPlasma", "position": { x: 0, y: 0 } },
				{ "weapon": "greenBossPlasma", "position": { x: -10, y: -30 }, "angle": Math.PI * 3 / 4 },
				{ "weapon": "greenBossPlasma", "position": { x: 10, y: -30 }, "angle": Math.PI / 4 }
			],
			"sprite": "BossShip1_1.png",
			"movement": "bothSlowAndFollow",
			"killPoints": 34000
		},
	};

	Main.levelWaveConfiguration = {
		1: {
			"environment": "images/environment1.png",
		},
		2: {
			"environment": "images/environment2.png"
		},
	};

	Main.waveToLevelMapping = {
		1: 0,
		25: 0,
		26: 1
	};

	Main.environments = [
		"images/environment1.png",
		"images/environment2.png"
	];

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
		},
		13: {
			"enemies": [
				{ "type": "alien1", "position": { x: 155, y: 27 } },
				{ "type": "alien1", "position": { x: 206, y: 38 } },
				{ "type": "alien1", "position": { x: 260, y: 36 } },
				{ "type": "alien1", "position": { x: 328, y: 22 } },
				{ "type": "alien1", "position": { x: 388, y: 32 } },
				{ "type": "alien1", "position": { x: 446, y: 33 } },
				{ "type": "alien1", "position": { x: 500, y: 23 } },
				{ "type": "alien5", "position": { x: 163, y: 76 } },
				{ "type": "alien5", "position": { x: 332, y: 69 } },
				{ "type": "alien5", "position": { x: 510, y: 71 } },
				{ "type": "alien2", "position": { x: 202, y: 129 } },
				{ "type": "alien2", "position": { x: 447, y: 119 } },
				{ "type": "alien2", "position": { x: 234, y: 170 } },
				{ "type": "alien2", "position": { x: 415, y: 156 } },
				{ "type": "alien2", "position": { x: 281, y: 295 } },
				{ "type": "alien2", "position": { x: 378, y: 202 } },
				{ "type": "alien2", "position": { x: 329, y: 239 } },
			],
			"bonuses": [
			]
		},
		14: {
			"enemies": [
				{ "type": "alien5", "position": { x: 165, y: 77 } },
				{ "type": "alien5", "position": { x: 513, y: 72 } },
				{ "type": "alien3", "position": { x: 175, y: 220 } },
				{ "type": "alien3", "position": { x: 520, y: 217 } },
				{ "type": "alien3", "position": { x: 340, y: 238 } },
				{ "type": "alien3", "position": { x: 340, y: 281 } },
				{ "type": "alien1", "position": { x: 215, y: 249 } },
				{ "type": "alien1", "position": { x: 164, y: 270 } },
				{ "type": "alien1", "position": { x: 215, y: 281 } },
				{ "type": "alien1", "position": { x: 269, y: 247 } },
				{ "type": "alien1", "position": { x: 269, y: 279 } },
				{ "type": "alien1", "position": { x: 397, y: 243 } },
				{ "type": "alien1", "position": { x: 454, y: 244 } },
				{ "type": "alien1", "position": { x: 454, y: 276 } },
				{ "type": "alien1", "position": { x: 509, y: 266 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		15: {
			"enemies": [
				{ "type": "alien4", "position": { x: 305, y: 49 } },
				{ "type": "alien4", "position": { x: 376, y: 50 } },
				{ "type": "alien4", "position": { x: 306, y: 93 } },
				{ "type": "alien4", "position": { x: 376, y: 101 } },
				{ "type": "alien4", "position": { x: 337, y: 119 } },
				{ "type": "alien6", "position": { x: 335, y: 64 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		/*15: {
			"enemies": [
				{ "type": "alien6", "position": { x: 340, y: 62 } }
			],
		},*/
		16: {
			"enemies": [
				{ "type": "alien4", "position": { x: 204, y: 36 } },
				{ "type": "alien4", "position": { x: 238, y: 66 } },
				{ "type": "alien4", "position": { x: 446, y: 61 } },
				{ "type": "alien4", "position": { x: 480, y: 31 } },
				{ "type": "alien4", "position": { x: 276, y: 126 } },
				{ "type": "alien4", "position": { x: 303, y: 173 } },
				{ "type": "alien4", "position": { x: 413, y: 125 } },
				{ "type": "alien4", "position": { x: 374, y: 174 } },
				{ "type": "alien7", "position": { x: 324, y: 238 } },
			],
			"bonuses": [
			]
		},
		17: {
			"enemies": [
				{ "type": "alien5", "position": { x: 198, y: 38 } },
				{ "type": "alien5", "position": { x: 480, y: 34 } },
				{ "type": "alien5", "position": { x: 340, y: 356 } },
				{ "type": "alien3", "position": { x: 311, y: 75 } },
				{ "type": "alien3", "position": { x: 463, y: 77 } },
				{ "type": "alien70", "position": { x: 362, y: 86 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		18: {
			"enemies": [
				{ "type": "alien5", "position": { x: 166, y: 26 } },
				{ "type": "alien5", "position": { x: 209, y: 24 } },
				{ "type": "alien5", "position": { x: 251, y: 23 } },
				{ "type": "alien5", "position": { x: 290, y: 22 } },
				{ "type": "alien5", "position": { x: 373, y: 22 } },
				{ "type": "alien5", "position": { x: 417, y: 20 } },
				{ "type": "alien5", "position": { x: 465, y: 20 } },
				{ "type": "alien5", "position": { x: 514, y: 19 } },
				{ "type": "alien1", "position": { x: 169, y: 259 } },
				{ "type": "alien1", "position": { x: 168, y: 294 } },
				{ "type": "alien1", "position": { x: 243, y: 260 } },
				{ "type": "alien1", "position": { x: 242, y: 295 } },
				{ "type": "alien1", "position": { x: 318, y: 261 } },
				{ "type": "alien1", "position": { x: 317, y: 296 } },
				{ "type": "alien1", "position": { x: 381, y: 258 } },
				{ "type": "alien1", "position": { x: 380, y: 293 } },
				{ "type": "alien1", "position": { x: 510, y: 262 } },
				{ "type": "alien1", "position": { x: 509, y: 298 } },
			],
			"bonuses": [
			]
		},
		19: {
			"enemies": [
				{ "type": "alien4", "position": { x: 191, y: 41 } },
				{ "type": "alien4", "position": { x: 270, y: 43 } },
				{ "type": "alien4", "position": { x: 374, y: 44 } },
				{ "type": "alien4", "position": { x: 499, y: 42 } },
				{ "type": "alien4", "position": { x: 445, y: 86 } },
				{ "type": "alien4", "position": { x: 337, y: 98 } },
				{ "type": "alien4", "position": { x: 244, y: 92 } },
				{ "type": "alien4", "position": { x: 290, y: 137 } },
				{ "type": "alien4", "position": { x: 392, y: 132 } },
				{ "type": "alien4", "position": { x: 341, y: 174 } },
				{ "type": "alien3", "position": { x: 184, y: 110 } },
				{ "type": "alien3", "position": { x: 513, y: 112 } },
				{ "type": "alien3", "position": { x: 340, y: 357 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		20: {
			"enemies": [
				{ "type": "alien4", "position": { x: 257, y: 90 } },
				{ "type": "alien4", "position": { x: 419, y: 87 } },
				{ "type": "alien8", "position": { x: 327, y: 20 } },
			],
			"bonuses": [
			]
		},
		21: {
			"enemies": [
				{ "type": "alien3", "position": { x: 209, y: 69 } },
				{ "type": "alien3", "position": { x: 262, y: 124 } },
				{ "type": "alien3", "position": { x: 307, y: 165 } },
				{ "type": "alien3", "position": { x: 337, y: 82 } },
				{ "type": "alien3", "position": { x: 369, y: 166 } },
				{ "type": "alien3", "position": { x: 419, y: 131 } },
				{ "type": "alien3", "position": { x: 460, y: 71 } },
				{ "type": "alien3", "position": { x: 336, y: 219 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		22: {
			"enemies": [
				{ "type": "alien5", "position": { x: 176, y: 28 } },
				{ "type": "alien5", "position": { x: 256, y: 27 } },
				{ "type": "alien5", "position": { x: 336, y: 28 } },
				{ "type": "alien5", "position": { x: 408, y: 29 } },
				{ "type": "alien5", "position": { x: 507, y: 24 } },
				{ "type": "alien3", "position": { x: 522, y: 162 } },
				{ "type": "alien3", "position": { x: 473, y: 205 } },
				{ "type": "alien3", "position": { x: 421, y: 164 } },
				{ "type": "alien3", "position": { x: 369, y: 212 } },
				{ "type": "alien3", "position": { x: 314, y: 167 } },
				{ "type": "alien3", "position": { x: 273, y: 214 } },
				{ "type": "alien3", "position": { x: 212, y: 166 } },
			],
			"bonuses": [
			]
		},
		23: {
			"enemies": [
				{ "type": "alien70", "position": { x: 302, y: 35 } },
				{ "type": "alien70", "position": { x: 336, y: 73 } },
				{ "type": "alien70", "position": { x: 366, y: 34 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		24: {
			"enemies": [
				{ "type": "alien2", "position": { x: 334, y: 107 } },
				{ "type": "alien2", "position": { x: 256, y: 154 } },
				{ "type": "alien2", "position": { x: 419, y: 152 } },
				{ "type": "alien2", "position": { x: 201, y: 221 } },
				{ "type": "alien2", "position": { x: 494, y: 220 } },
				{ "type": "alien1", "position": { x: 281, y: 205 } },
				{ "type": "alien1", "position": { x: 373, y: 203 } },
				{ "type": "alien1", "position": { x: 225, y: 252 } },
				{ "type": "alien1", "position": { x: 438, y: 249 } },
				{ "type": "alien1", "position": { x: 328, y: 286 } },
				{ "type": "alien8", "position": { x: 321, y: 24 } },
			],
			"bonuses": [
			]
		},
		25: {
			"enemies": [
				{ "type": "alien6", "position": { x: 335, y: 18 } },
				{ "type": "alien7", "position": { x: 325, y: 128 } },
				{ "type": "alien70", "position": { x: 358, y: 128 } },
			],
			"bonuses": [
			]
		},
		26: {
			"enemies": [
				{ "type": "alien3", "position": { x: 187, y: 23 } },
				{ "type": "alien3", "position": { x: 324, y: 18 } },
				{ "type": "alien3", "position": { x: 396, y: 18 } },
				{ "type": "alien3", "position": { x: 500, y: 24 } },
				{ "type": "alien3", "position": { x: 486, y: 72 } },
				{ "type": "alien3", "position": { x: 364, y: 83 } },
				{ "type": "alien3", "position": { x: 234, y: 70 } },
				{ "type": "alien3", "position": { x: 287, y: 125 } },
				{ "type": "alien3", "position": { x: 445, y: 132 } },
				{ "type": "alien3", "position": { x: 288, y: 125 } },
				{ "type": "alien3", "position": { x: 334, y: 165 } },
				{ "type": "alien3", "position": { x: 395, y: 167 } },
				{ "type": "alien3", "position": { x: 514, y: 213 } },
				{ "type": "alien3", "position": { x: 413, y: 215 } },
				{ "type": "alien3", "position": { x: 362, y: 219 } },
				{ "type": "alien3", "position": { x: 307, y: 218 } },
				{ "type": "alien3", "position": { x: 204, y: 217 } },
				{ "type": "alien3", "position": { x: 265, y: 265 } },
				{ "type": "alien3", "position": { x: 361, y: 263 } },
				{ "type": "alien3", "position": { x: 461, y: 261 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 340, y: 10 } },
			]
		},
		27: {
			"enemies": [
				{ "type": "alien8", "position": { x: 302, y: 27 } },
				{ "type": "alien7", "position": { x: 303, y: 181 } },
				{ "type": "alien70", "position": { x: 400, y: 179 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 169, y: 10 } },
				{ "type": "bonus1", "position": { x: 516, y: 10 } },
			]
		},
		28: {
			"enemies": [
				{ "type": "alien8", "position": { x: 340, y: 23 } },
				{ "type": "alien9", "position": { x: 230, y: 83 } },
				{ "type": "alien9", "position": { x: 463, y: 83 } },
			],
			"bonuses": [
			]
		},
		29: {
			"enemies": [
				{ "type": "boss1", "position": { x: 290, y: 46 } }
			],
			"bonuses": [
			]
		},
		30: {
			"enemies": [
				{ "type": "boss1", "position": { x: 172, y: 27 } },
				{ "type": "boss1", "position": { x: 439, y: 25 } }
			],
			"bonuses": [
			]
		},
		31: {
			"enemies": [
				{ "type": "alien1", "position": { x: 194, y: 49 } },
				{ "type": "alien1", "position": { x: 253, y: 68 } },
				{ "type": "alien1", "position": { x: 253, y: 68 } },
				{ "type": "alien1", "position": { x: 314, y: 98 } },
				{ "type": "alien1", "position": { x: 363, y: 49 } },
				{ "type": "alien1", "position": { x: 414, y: 98 } },
				{ "type": "alien1", "position": { x: 473, y: 68 } },
				{ "type": "alien1", "position": { x: 439, y: 138 } },
				{ "type": "alien1", "position": { x: 204, y: 119 } },
				{ "type": "alien1", "position": { x: 264, y: 142 } },
				{ "type": "alien1", "position": { x: 363, y: 170 } },
				{ "type": "alien1", "position": { x: 533, y: 119 } },
				{ "type": "alien1", "position": { x: 512, y: 178 } },
				{ "type": "alien1", "position": { x: 444, y: 208 } },
				{ "type": "alien1", "position": { x: 283, y: 208 } },
				{ "type": "alien1", "position": { x: 213, y: 178 } },
				{ "type": "alien1", "position": { x: 169, y: 258 } },
				{ "type": "alien1", "position": { x: 314, y: 258 } },
				{ "type": "alien1", "position": { x: 413, y: 258 } },
				{ "type": "alien1", "position": { x: 526, y: 258 } },
			],
			"bonuses": [
			]
		},
		32: {
			"enemies": [
				{ "type": "alien6", "position": { x: 344, y: 65 } },
				{ "type": "alien6", "position": { x: 268, y: 108 } },
				{ "type": "alien6", "position": { x: 416, y: 108 } }
			],
			"bonuses": [
			]
		},
		33: {
			"enemies": [
				{ "type": "alien70", "position": { x: 314, y: 90 } },
				{ "type": "alien70", "position": { x: 234, y: 140 } },
				{ "type": "alien70", "position": { x: 314, y: 180 } },
				{ "type": "alien70", "position": { x: 413, y: 170 } },
				{ "type": "alien70", "position": { x: 514, y: 210 } },
			],
			"bonuses": [
			]
		},
		34: {
			"enemies": [
				{ "type": "alien3", "position": { x: 200, y: 49 } },
				{ "type": "alien3", "position": { x: 330, y: 49 } },
				{ "type": "alien3", "position": { x: 459, y: 49 } },
				{ "type": "alien3", "position": { x: 509, y: 89 } },
				{ "type": "alien3", "position": { x: 379, y: 89 } },
				{ "type": "alien3", "position": { x: 249, y: 89 } },
				{ "type": "alien3", "position": { x: 299, y: 129 } },
				{ "type": "alien3", "position": { x: 429, y: 129 } },
				{ "type": "alien3", "position": { x: 519, y: 129 } },
				{ "type": "alien3", "position": { x: 379, y: 218 } },
				{ "type": "alien1", "position": { x: 355, y: 169 } },
				{ "type": "alien1", "position": { x: 535, y: 219 } },
				{ "type": "alien1", "position": { x: 405, y: 219 } },
				{ "type": "alien1", "position": { x: 275, y: 219 } },
				{ "type": "alien1", "position": { x: 225, y: 259 } },
				{ "type": "alien1", "position": { x: 225, y: 259 } },
				{ "type": "alien1", "position": { x: 374, y: 259 } },
				{ "type": "alien1", "position": { x: 504, y: 259 } },
				{ "type": "alien1", "position": { x: 454, y: 310 } },
				{ "type": "alien1", "position": { x: 324, y: 310 } },
				{ "type": "alien1", "position": { x: 192, y: 310 } },

			],
			"bonuses": [
			]
		},
		35: {
			"enemies": [
				{ "type": "alien8", "position": { x: 249, y: 82 } },
				{ "type": "alien8", "position": { x: 444, y: 82 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 413, y: 10 } },
			]
		},
		36: {
			"enemies": [
				{ "type": "alien6", "position": { x: 195, y: 70 } },
				{ "type": "alien6", "position": { x: 510, y: 70 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 413, y: 10 } },
			]
		},
		37: {
			"enemies": [
				{ "type": "alien9", "position": { x: 385, y: 108 } },
				{ "type": "alien9", "position": { x: 255, y: 120 } },
				{ "type": "alien9", "position": { x: 495, y: 120 } },
				{ "type": "alien1", "position": { x: 364, y: 196 } },
				{ "type": "alien1", "position": { x: 216, y: 229 } },
				{ "type": "alien1", "position": { x: 495, y: 229 } },
				{ "type": "alien1", "position": { x: 364, y: 268 } },
				{ "type": "alien1", "position": { x: 275, y: 288 } },
				{ "type": "alien1", "position": { x: 453, y: 288 } },
			],
			"bonuses": [
			]
		},
		38 : {
			"enemies": [
				{ "type": "alien6", "position": { x: 260, y: 38 } },
				{ "type": "alien9", "position": { x: 350, y: 70 } },
				{ "type": "alien9", "position": { x: 230, y: 86 } },
				{ "type": "alien9", "position": { x: 460, y: 86 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 292, y: 10 } },
			]
		},
		39 : {
			"enemies": [
				{ "type": "alien9", "position": { x: 249, y: 108 } },
				{ "type": "alien9", "position": { x: 480, y: 108 } },
				{ "type": "alien9", "position": { x: 477, y: 224 } },
				{ "type": "alien70", "position": { x: 240, y: 220 } },
				{ "type": "alien70", "position": { x: 518, y: 220 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 415, y: 10 } },
			]
		},
		40 : {
			"enemies": [
				{ "type": "alien9", "position": { x: 237, y: 264 } },
				{ "type": "alien9", "position": { x: 358, y: 247 } },
				{ "type": "alien9", "position": { x: 468, y: 264 } },
				{ "type": "alien3", "position": { x: 180, y: 46 } },
				{ "type": "alien3", "position": { x: 319, y: 46 } },
				{ "type": "alien3", "position": { x: 450, y: 46 } },
				{ "type": "alien3", "position": { x: 500, y: 86 } },
				{ "type": "alien3", "position": { x: 388, y: 86 } },
				{ "type": "alien3", "position": { x: 238, y: 86 } },
				{ "type": "alien3", "position": { x: 288, y: 128 } },
				{ "type": "alien3", "position": { x: 418, y: 128 } },
				{ "type": "alien3", "position": { x: 528, y: 128 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		41 : {
			"enemies": [
				{ "type": "alien9", "position": { x: 260, y: 284 } },
				{ "type": "alien9", "position": { x: 380, y: 268 } },
				{ "type": "alien9", "position": { x: 440, y: 285 } },
				{ "type": "alien8", "position": { x: 460, y: 80 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 415, y: 10 } },
			]
		},
		42 : {
			"enemies": [
				{ "type": "alien9", "position": { x: 229, y: 254 } },
				{ "type": "alien9", "position": { x: 349, y: 237 } },
				{ "type": "alien9", "position": { x: 459, y: 254 } },
				{ "type": "alien5", "position": { x: 180, y: 44 } },
				{ "type": "alien5", "position": { x: 221, y: 42 } },
				{ "type": "alien5", "position": { x: 265, y: 41 } },
				{ "type": "alien5", "position": { x: 305, y: 40 } },
				{ "type": "alien5", "position": { x: 387, y: 39 } },
				{ "type": "alien5", "position": { x: 431, y: 37 } },
				{ "type": "alien5", "position": { x: 480, y: 37 } },
				{ "type": "alien5", "position": { x: 528, y: 35 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		43 : {
			"enemies": [
				{ "type": "alien5", "position": { x: 208, y: 52 } },
				{ "type": "alien5", "position": { x: 496, y: 52 } },
				{ "type": "alien2", "position": { x: 515, y: 155 } },
				{ "type": "alien2", "position": { x: 305, y: 183 } },
				{ "type": "alien2", "position": { x: 438, y: 187 } },
				{ "type": "alien2", "position": { x: 377, y: 210 } },
				{ "type": "alien2", "position": { x: 226, y: 265 } },
				{ "type": "alien2", "position": { x: 305, y: 287 } },
				{ "type": "alien2", "position": { x: 226, y: 265 } },
				{ "type": "alien2", "position": { x: 377, y: 280 } },
				{ "type": "alien2", "position": { x: 455, y: 290 } },
				{ "type": "alien2", "position": { x: 515, y: 257 } },
				{ "type": "alien9", "position": { x: 256, y: 115 } },
				{ "type": "alien9", "position": { x: 375, y: 100 } },
				{ "type": "alien9", "position": { x: 486, y: 115 } },
			],
			"bonuses": [
			]
		},
		44 : {
			"enemies": [
				{ "type": "alien9", "position": { x: 305, y: 140 } },
				{ "type": "alien9", "position": { x: 384, y: 173 } },
				{ "type": "alien9", "position": { x: 460, y: 140 } },
				{ "type": "alien9", "position": { x: 260, y: 280 } },
				{ "type": "alien9", "position": { x: 380, y: 265 } },
				{ "type": "alien9", "position": { x: 490, y: 280 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		45 : {
			"enemies": [
				{ "type": "alien10", "position": { x: 265, y: 100 } },
				{ "type": "alien10", "position": { x: 515, y: 130 } },
				{ "type": "alien10", "position": { x: 355, y: 180 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 350, y: 10 } },
			]
		},
		46 : {
			"enemies": [
				{ "type": "alien10", "position": { x: 500, y: 55 } },
				{ "type": "alien10", "position": { x: 250, y: 115 } },
				{ "type": "alien10", "position": { x: 415, y: 205 } },
				{ "type": "alien8", "position": { x: 325, y: 105 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 425, y: 10 } },
			]
		},
		47 : {
			"enemies": [
				{ "type": "alien10", "position": { x: 280, y: 115 } },
				{ "type": "alien10", "position": { x: 520, y: 58 } },
				{ "type": "alien10", "position": { x: 267, y: 209 } },
				{ "type": "alien6", "position": { x: 195, y: 67 } },
			],
			"bonuses": [
				{ "type": "bonus1", "position": { x: 265, y: 10 } },
			]
		},
		48 : {
			"enemies": [
				{ "type": "alien10", "position": { x: 275, y: 62 } },
				{ "type": "alien10", "position": { x: 515, y: 132 } },
				{ "type": "alien10", "position": { x: 420, y: 203 } },
				{ "type": "alien9", "position": { x: 300, y: 135 } },
			],
			"bonuses": [
			]
		},
		49: {
			"enemies": [
				{ "type": "boss1", "position": { x: 355, y: 95 } }
			],
			"bonuses": [
			]
		},
		50: {
			"enemies": [
				{ "type": "boss1", "position": { x: 295, y: 85 } },
				{ "type": "boss1", "position": { x: 415, y: 85 } },
			],
			"bonuses": [
			]
		},

	};

	Main.heroSpeed = 10;

	Main.prototype.hexi = null;

	Main.prototype.hero = null;

	Main.prototype.enemies = [];

	Main.prototype.bonuses = [];

	Main.prototype.isMobile = false;

	Main.prototype.heroBullets = [];

	Main.prototype.heroLaser = null;

	Main.prototype.enemyBullets = [];

	Main.prototype.upgrades = [];

	Main.prototype.explosionSplashes = [];

	Main.prototype.gameScene = null;

	Main.prototype.interface = null;

	Main.prototype.lifeIcon = null;

	Main.prototype.environment = null;

	Main.prototype.gameTimeSeconds = 0;

	Main.prototype.sounds = {
		"shoot": null
	};

	Main.prototype.lifeText = {
		"position": { "x": 178, "y": 438 },
		"textObject": null,
		"font": "sans-serif",
		"size": "18px",
		"color": "#09BC09"
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

	Main.prototype.scorePointsText = {
		"position": { "x": 4, "y": 96 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
	};

	Main.prototype.gameTimeText = {
		"position": { "x": 4, "y": 136 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#B2B2B2"
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

	Main.prototype.scorePointsLabelText = {
		"position": { "x": 4, "y": 80 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "SCORE"
	};

	Main.prototype.gameTimeLabelText = {
		"position": { "x": 4, "y": 120 },
		"textObject": null,
		"font": "sans-serif",
		"size": "12px",
		"color": "#FFFFFF",
		"text": "TIME"
	};

	Main.prototype.level = {
		"wave": 1,
		"type": 1
	};

	Main.prototype.score = {
		"points": 0
	};

	function Main($hexi, isMobile) {
		this.hexi = $hexi(Main.graphics.width, Main.graphics.height, this.setup.bind(this), Main.resources, this.load.bind(this), "webgl");
		//this.hexi.fps = 45;
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

		setInterval(function name(params) {
			_this.gameTimeSeconds++;
			_this.changeState();
		}, 1000);

		for (var key in Main.sounds) {
			if (Main.sounds.hasOwnProperty(key)) {
				this.sounds[key] = this.hexi.sound(Main.sounds[key]);
				//this.sounds[key].fade(0.3, 1);
			}
		}

		this.gameScene = this.hexi.group();

		this.interface = this.hexi.sprite("images/interface.png");

		this.environment = this.hexi.sprite(Main.environments, 146, 9);
		this.environment.show(0);

		this.lifeIcon = this.hexi.sprite("images/life-icon.png", 149, 434);

		var gameArea = this.hexi.rectangle(
			this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.left - Main.gameArea.padding,
			this.hexi.canvas.height - Main.gameArea.top - Main.gameArea.bottom - Main.gameArea.padding,
			null, "#785E3A", Main.gameArea.padding, Main.gameArea.left, Main.gameArea.top);
		gameArea.visible = false;
		this.gameScene.addChild(gameArea);
		this.gameScene.addChild(this.environment);
		this.hero = new HeroShip(this.hexi, this);

		this.lifeText.textObject = this.hexi.text(_this.hero.life, this.lifeText.font, this.lifeText.size,
			this.lifeText.color,
			this.lifeText.position.x, this.lifeText.position.y);
		this.gameScene.addChild(this.lifeText.textObject);

		this.levelText.textObject = this.hexi.text(_this.level.type, this.levelText.font, this.levelText.size,
			this.levelText.color,
			this.levelText.position.x, this.levelText.position.y);
		this.gameScene.addChild(this.levelText.textObject);

		this.scorePointsText.textObject = this.hexi.text(_this.level.type, this.scorePointsText.font, this.scorePointsText.size,
			this.scorePointsText.color,
			this.scorePointsText.position.x, this.scorePointsText.position.y);
		this.gameScene.addChild(this.scorePointsText.textObject);
		this.gameScene.addChild(this.levelText.textObject);

		this.gameTimeText.textObject = this.hexi.text(String(_this.gameTimeSeconds).toHHMMSS(), this.gameTimeText.font, this.gameTimeText.size,
			this.gameTimeText.color,
			this.gameTimeText.position.x, this.gameTimeText.position.y);
		this.gameScene.addChild(this.gameTimeText.textObject);

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

		this.scorePointsLabelText.textObject = this.hexi.text(_this.scorePointsLabelText.text, this.scorePointsLabelText.font, this.scorePointsLabelText.size,
			this.scorePointsLabelText.color,
			this.scorePointsLabelText.position.x, this.scorePointsLabelText.position.y);
		this.gameScene.addChild(this.scorePointsLabelText.textObject);

		this.gameTimeLabelText.textObject = this.hexi.text(_this.gameTimeLabelText.text, this.gameTimeLabelText.font, this.gameTimeLabelText.size,
			this.gameTimeLabelText.color,
			this.gameTimeLabelText.position.x, this.gameTimeLabelText.position.y);
		this.gameScene.addChild(this.gameTimeLabelText.textObject);


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

		var plusButton = this.hexi.keyboard(189);
		plusButton.press = (function () {
			this.hero.downgrade();
		}).bind(this);

		var minusButton = this.hexi.keyboard(187);
		minusButton.press = (function () {
			this.hero.upgrade();
		}).bind(this);

		var minusButton2 = this.hexi.keyboard(61);
		minusButton2.press = (function () {
			this.hero.upgrade();
		}).bind(this);


		var nextButton = this.hexi.keyboard(78);
		nextButton.press = (function () {
			this.nextLevel();
		}).bind(this);

		this.hexi.state = this.playLoop.bind(this);
	};

	Main.prototype.setupLevel = function (currentWave) {
		var _this = this;

		var levelValue = Main.waveToLevelMapping[currentWave];
		if (levelValue != null) {
			this.environment.show(levelValue);
		}

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
		this.score.points = 0;
		this.gameTimeSeconds = 0;
		this.level.wave = 1;
		this.hero.life = 1;
		this.clearShips();

		this.setupLevel(this.level.wave);
		this.changeState();
		this.hexi.resume();
	};

	Main.prototype.clearShips = function () {
		var _this = this;
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
	};

	Main.prototype.playLoop = function () {
		var _this = this;
		this.hero.update();


		this.enemies = this.enemies.filter(function (enemy) {
			enemy.update();
			return enemy.life > 0;
		});

		this.bonuses = this.bonuses.filter(function (bonus) {
			bonus.update();
			return bonus.sprite.parent;
		});

		if (this.enemies.length == 0 && this.bonuses.length == 0 && this.upgrades.length == 0) {
			this.nextLevel();
		}

		this.heroBullets = this.heroBullets.filter(function (bullet) {
			if (bullet.y < -bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			_this.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(bullet, enemy.sprite)) {
					enemy.hit(bullet);
				}
			})

			_this.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(bullet, bonus.sprite)) {
					bonus.hit(bullet);
				}
			})

			return bullet.parent;
		});

		if (_this.heroLaser) {
			_this.heroLaser.beam.x = _this.hero.sprite.x - _this.heroLaser.beam.halfWidth;
			_this.heroLaser.shine.x = _this.hero.sprite.x - _this.heroLaser.shine.halfWidth;
			_this.heroLaser.timeToLive--;

			_this.enemies.forEach(function (enemy) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, enemy.sprite)) {
					enemy.hit(_this.heroLaser);
				}
			})

			_this.bonuses.forEach(function (bonus) {
				if (_this.hexi.hitTestRectangle(_this.heroLaser.beam, bonus.sprite)) {
					bonus.hit(_this.heroLaser);
				}
			})

			if (_this.heroLaser.timeToLive <= 0) {
				_this.hexi.stage.remove(_this.heroLaser.beam);
				_this.hexi.stage.remove(_this.heroLaser.shine);
				_this.heroLaser.beam.alpha = _this.heroLaser.timeToLive % 2 === 1 ? 1 : 0.1;
				_this.heroLaser = null;
			}
		}

		this.enemyBullets = this.enemyBullets.filter(function (bullet) {

			if (bullet.y >= _this.hexi.canvas.height + bullet.height) {
				_this.hexi.stage.remove(bullet);
			}

			if (_this.hexi.hitTestRectangle(bullet, _this.hero.collisionSprite)) {
				_this.hero.hit(bullet);
			}

			return bullet.parent;
		});


		this.upgrades = this.upgrades.filter(function (upgradeItem) {
			if (upgradeItem.y >= _this.hexi.canvas.height + upgradeItem.height) {
				_this.hexi.stage.remove(upgradeItem);
			}

			if (_this.hexi.hitTestRectangle(upgradeItem, _this.hero.collisionSprite)) {
				_this.hero.hitUpgrade(upgradeItem);
			}
			return upgradeItem.parent;
		});

		this.explosionSplashes = this.explosionSplashes.filter(function (explosionSplash) {
			explosionSplash.ticks++;

			if (explosionSplash.ticks > 18) {
				_this.hexi.stage.remove(explosionSplash);
			}
			return explosionSplash.parent;
		});

		this.hexi.move(this.heroBullets);
		this.hexi.move(this.enemyBullets);
		this.hexi.move(this.upgrades);
	};

	Main.prototype.nextLevel = function () {

		this.clearShips();
		this.level.wave++;
		this.setupLevel(this.level.wave);
		this.changeState();
	};


	Main.prototype.changeState = function () {
		this.lifeText.textObject.content = this.hero.life;
		this.waveText.textObject.content = this.level.wave;
		this.levelText.textObject.content = this.level.type;
		this.scorePointsText.textObject.content = this.score.points;
		this.gameTimeText.textObject.content = String(this.gameTimeSeconds).toHHMMSS();
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

	Ship.prototype.hit = function (bullet) {
		var explosionSplashSprite = this.hexi.sprite(this.hexi.json("images/bullet-texture.json").animations["Explosion"]);

		if (bullet.type == "laser") {
			this.sprite.putCenter(explosionSplashSprite, 0, 0);
		} else {
			bullet.putCenter(explosionSplashSprite, 0, 0);
		}
		explosionSplashSprite.playAnimation();
		explosionSplashSprite.ticks = 0;
		this.game.explosionSplashes.push(explosionSplashSprite);
		this.game.sounds["explode"].play();
	};

	return Ship;
}());

var WeaponedShip = /** @class */ (function (_super) {
	__extends(WeaponedShip, _super);

	WeaponedShip.prototype.isWeaponShooting = false;

	WeaponedShip.prototype.canShot = false;

	WeaponedShip.prototype.automatedWeapons = [];

	function WeaponedShip($hexi, game) {
		return _super !== null && _super.apply(this, arguments) || this;
	}

	WeaponedShip.prototype.startShoot = function () {
		this.isWeaponShooting = true;
		this.canShot = true;
		this.onShootStarted();
	}

	WeaponedShip.prototype.onShootStarted = function () {
	}

	WeaponedShip.prototype.stopShoot = function () {
		this.isWeaponShooting = false;
		this.onShootStopped();
	}

	WeaponedShip.prototype.onShootStopped = function () {
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

	HeroShip.prototype.collisionSprite = null;

	HeroShip.prototype.weaponSprites = {
		"leftWeapon": null,
		"rightWeapon": null
	};

	function HeroShip($hexi, game) {
		var _this = _super.call(this, $hexi, game) || this;
		_this.sprite = this.hexi.sprite(["HeroShip.png"]);
		_this.collisionSprite = this.hexi.rectangle(24, 20, "red", "red", 1);
		var weaponSprites = _this.hexi.json("images/ships-texture.json").animations["Weapon"];
		_this.weaponSprites.leftWeapon = this.hexi.sprite(weaponSprites);
		_this.weaponSprites.rightWeapon = this.hexi.sprite(weaponSprites);

		_this.sprite.y = _this.hexi.canvas.height - 80;
		_this.sprite.putCenter(_this.collisionSprite, 0, 0);
		_this.sprite.putCenter(_this.weaponSprites.leftWeapon, -20, -15);
		_this.sprite.putCenter(_this.weaponSprites.rightWeapon, 20, -15);

		_this.sprite.playAnimation();
		_this.weaponSprites.leftWeapon.playAnimation();
		_this.weaponSprites.rightWeapon.playAnimation();
		_this.hexi.arrowControl(_this.sprite, Main.heroSpeed);

		_this.game.gameScene.addChild(_this.sprite);
		_this.game.gameScene.addChild(_this.collisionSprite);
		_this.game.gameScene.addChild(_this.weaponSprites.leftWeapon);
		_this.game.gameScene.addChild(_this.weaponSprites.rightWeapon);
		_this.collisionSprite.visible = false
		_this.setWeapon();
		return _this;
	}

	HeroShip.prototype.update = function () {
		_super.prototype.update.call(this);

		//this.sprite.vy = 0;
		this.hexi.move(this.sprite);

		this.sprite.x = this.hexi.pointer.x;
		this.sprite.y = this.hexi.pointer.y;

		var collision = this.hexi.contain(this.sprite,
			{
				x: Main.gameArea.left + Main.gameArea.padding,
				y: this.hexi.canvas.height - Main.gameArea.enemyBottom + Main.gameArea.padding,
				width: this.hexi.canvas.width - Main.gameArea.right - Main.gameArea.padding,
				height: this.hexi.canvas.height - Main.gameArea.bottom - Main.gameArea.padding
			}, false);

		this.sprite.putCenter(this.collisionSprite, 0, 8);
		this.sprite.putCenter(this.weaponSprites.leftWeapon, -20, -15);
		this.sprite.putCenter(this.weaponSprites.rightWeapon, 20, -15);

		if (this.invisibilityCounter <= 0) {
			this.invisibilityCounter = 0;
		} else {
			this.invisibilityCounter--;
		}

		this.updateShooting();
	};

	HeroShip.prototype.onShootStarted = function () {
		var _this = this;
		_this.weapons.forEach(function (weapon) {
			if (weapon.weaponItensityCounter == 0) {
				weapon.weaponItensityCounter = weapon.options.intensity;
			}
		});
	}

	HeroShip.prototype.onShootStopped = function () {
		var _this = this;
		_this.weapons.forEach(function (weapon) {
			weapon.weaponItensityCounter = 0;
		});
	}

	HeroShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		var playManualWeaponShootSound = false;
		var playAutomatedWeaponShootSound = false;

		_this.automatedWeapons.forEach(function (weapon) {
			weapon.weaponItensityCounter++;

			if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

			weapon.weaponItensityCounter = 0;
			_this.shootWithWeapon(weapon);
			playAutomatedWeaponShootSound = true;
		});

		_this.weapons.forEach(function (weapon) {
			if (_this.canShot) {
				weapon.weaponItensityCounter++;

				if (weapon.weaponItensityCounter <= weapon.options.intensity) return;

				weapon.weaponItensityCounter = 0;
				playManualWeaponShootSound = true;
			} else {
				return;
			}


			if (_this.isWeaponShooting) {
				_this.shootWithWeapon(weapon);
			} else {
				_this.canShot = false;
			}

		});

		if (playManualWeaponShootSound) {
			_this.game.sounds[_this.weapons[0].options.sound].play();
			playManualWeaponShootSound = false;
		}

		if (playAutomatedWeaponShootSound) {
			_this.game.sounds[_this.automatedWeapons[0].options.sound].play();
			playAutomatedWeaponShootSound = false;
		}
	}

	HeroShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = Main.heroWeaponConfiguration[weapon.weapon];

		if (currentWeapon.type == "laser") {

			if (_this.game.heroLaser != null) {
				return;
			}
			var beam = _this.hexi.sprite(currentWeapon.sprites.beamSprite);
			beam.height = _this.sprite.y - Main.gameArea.top - Main.gameArea.padding;
			beam.x = weapon.position.x;
			beam.y = weapon.position.y;

			var shine = _this.hexi.sprite(currentWeapon.sprites.shineSprite);
			_this.sprite.putCenter(shine, 0, weapon.position.y - shine.halfHeight);

			_this.game.heroLaser = {
				"beam": beam,
				"shine": shine,
				"timeToLive": currentWeapon.timeToLive,
				"type": "laser",
				"hitEnemies": [],
				"hitMax": currentWeapon.hitMax,
				"weapon": currentWeapon
			};
		} else {
			_this.hexi.shoot(
				_this.sprite, 4.7124,   // 3/2*pi          
				weapon.position.x, - _this.sprite.halfHeight + weapon.position.y,
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
					bulletSprite.hitEnemies = [];
					bulletSprite.type = currentWeapon.type;
					bulletSprite.hitMax = currentWeapon.hitMax;
					return bulletSprite;
				}).bind(_this));
		}

	};

	HeroShip.prototype.setWeapon = function () {
		var weaponConfiguration = Main.heroLevelWeapons[this.life];

		if (!weaponConfiguration) return;

		this.weapons = deepCopy(weaponConfiguration.weapons);

		if (weaponConfiguration.automatedWeapons) {
			this.automatedWeapons = deepCopy(weaponConfiguration.automatedWeapons);
		} else {
			this.automatedWeapons = [];
		}

		if (this.automatedWeapons.length == 0) {
			this.weaponSprites.leftWeapon.visible = false;
			this.weaponSprites.rightWeapon.visible = false;
		}

		if (this.automatedWeapons.length == 1) {
			this.weaponSprites.leftWeapon.visible = true;
			this.weaponSprites.rightWeapon.visible = false;
		}

		if (this.automatedWeapons.length > 1) {
			this.weaponSprites.leftWeapon.visible = true;
			this.weaponSprites.rightWeapon.visible = true;
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
		_super.prototype.hit.call(this, bullet);
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

	MovementEngine.prototype.heroSprite = null;

	MovementEngine.prototype.movements = null;

	MovementEngine.prototype.firstMovement = null;

	MovementEngine.prototype.movementItensity = 0;

	MovementEngine.prototype.movementItensityCounter = 0;

	MovementEngine.prototype.movementItensitySlot = 0;

	MovementEngine.prototype.movementConfiguration = null;

	MovementEngine.prototype.isBounceBottom = true;

	function MovementEngine($hexi, sprite, heroSprite, movementConfiguration) {
		this.hexi = $hexi;
		this.sprite = sprite;
		this.heroSprite = heroSprite;
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

		if (_this.firstMovement.type == "freeMovementDown") {
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.isBounceBottom = false;
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
		}
		else if (_this.firstMovement.type == "followHero") {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
			if (_this.sprite.x > _this.heroSprite.x) {
				_this.sprite.vx = -1 * Math.abs(this.sprite.vx);
			} else {
				_this.sprite.vx = Math.abs(this.sprite.vx);
			}
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
		}
		else {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
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

		if (_this.firstMovement.type == "followHero") {
			if (_this.sprite.x > _this.heroSprite.x) {
				_this.sprite.vx = -1 * Math.abs(this.sprite.vx);
			} else {
				_this.sprite.vx = Math.abs(this.sprite.vx);
			}
		}

		_this.movementItensityCounter++;
		if (_this.movementItensityCounter <= _this.movementItensity) return;
		_this.movementItensityCounter = 0;

		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);

		if (_this.firstMovement.type == "freeMovementDown") {
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;
		}
		else if (_this.firstMovement.type == "followHero") {
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
		else {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
	};

	return MovementEngine;
}());

var EnemyShip = /** @class */ (function (_super) {
	__extends(EnemyShip, _super);

	EnemyShip.prototype.type = null;

	EnemyShip.prototype.shipConfiguration = null;

	EnemyShip.prototype.movementEngine = null;

	EnemyShip.prototype.syncWeapons = {
		"grouppedWeapons": null,
		"grouppedCounters": {}
	};

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
		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.hero.sprite, _this.shipConfiguration.movement);

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

		if (_this.shipConfiguration.isSyncWeapon) {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = Main.enemyWeaponConfiguration[weapon.weapon];
				weapon.options = currentWeapon;
			});


			_this.syncWeapons.grouppedWeapons = groupBy(this.automatedWeapons, "weapon");
			for (const weaponKey in _this.syncWeapons.grouppedWeapons) {
				if (_this.syncWeapons.grouppedWeapons.hasOwnProperty(weaponKey)) {
					const weapons = _this.syncWeapons.grouppedWeapons[weaponKey];
					_this.syncWeapons.grouppedCounters[weaponKey] = {
						"weaponItensitySlot": 0,
						"weaponIntensity": 0,
						"weaponItensityCounter": 0,
						"intensityRepeatCounter": 0,
						"firstWeapon": null
					};
					var weaponCounters = _this.syncWeapons.grouppedCounters[weaponKey];
					weaponCounters.firstWeapon = weapons[0];
					var intensityOptions = weaponCounters.firstWeapon.options.intensity[
						weaponCounters.weaponItensitySlot];

					if (weaponCounters.firstWeapon.options.isRandomIntensity) {
						weaponCounters.weaponItensitySlot = _this.hexi.randomInt(0, weaponCounters.firstWeapon.options.intensity.length - 1);
					} else {
						weaponCounters.weaponItensitySlot = 0;
					}

					weaponCounters.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
					intensityOptions.repeat = intensityOptions.repeat == undefined ? 1 : intensityOptions.repeat;
				}
			}

		} else {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = Main.enemyWeaponConfiguration[weapon.weapon];
				weapon.options = currentWeapon;
				weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				if (weapon.isRandomIntensity) {
					weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				} else {
					weapon.weaponItensitySlot = 0;
				}

				var intensityOptions = weapon.options.intensity[weapon.weaponItensitySlot];
				weapon.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
				weapon.weaponItensityCounter = 0;
				weapon.intensityRepeatCounter = 0;
				intensityOptions.repeat = intensityOptions.repeat == undefined ? 1 : intensityOptions.repeat;
			});
		}

		this.isWeaponShooting = true;
	};

	EnemyShip.prototype.updateShooting = function () {
		_super.prototype.updateShooting.call(this);
		var _this = this;

		if (!_this.isWeaponShooting) {
			return;
		}

		if (_this.shipConfiguration.isSyncWeapon) {
			for (const weaponKey in _this.syncWeapons.grouppedWeapons) {
				if (_this.syncWeapons.grouppedWeapons.hasOwnProperty(weaponKey)) {
					var weapons = _this.syncWeapons.grouppedWeapons[weaponKey];
					var weaponCounters = _this.syncWeapons.grouppedCounters[weaponKey];
					weaponCounters.weaponItensityCounter++;
					if (weaponCounters.weaponItensityCounter <= weaponCounters.weaponIntensity) continue;
					weaponCounters.weaponItensityCounter = 0;
					var intensityOptions = weaponCounters.firstWeapon.options.intensity[weaponCounters.weaponItensitySlot];

					if (intensityOptions.type == undefined || intensityOptions.type === "shoot") {
						weapons.forEach(function (weapon) {
							_this.shootWithWeapon(weapon);
						});
					}

					weaponCounters.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);

					weaponCounters.intensityRepeatCounter++;
					if (weaponCounters.intensityRepeatCounter < intensityOptions.repeat) {
						continue;
					}

					weaponCounters.intensityRepeatCounter = 0;
					if (weaponCounters.isRandomIntensity) {
						weaponCounters.weaponItensitySlot = _this.hexi.randomInt(0, weaponCounters.firstWeapon.options.intensity.length - 1);
					} else {
						weaponCounters.weaponItensitySlot++;

						if (weaponCounters.weaponItensitySlot > weaponCounters.firstWeapon.options.intensity.length - 1) {
							weaponCounters.weaponItensitySlot = 0;
						}
					}
				}
			}

		} else {
			this.automatedWeapons.forEach(function (weapon) {
				weapon.weaponItensityCounter++;

				if (weapon.weaponItensityCounter <= weapon.weaponIntensity) return;
				weapon.weaponItensityCounter = 0;
				var intensityOptions = weapon.options.intensity[weapon.weaponItensitySlot];

				if (intensityOptions.type == undefined || intensityOptions.type === "shoot") {
					_this.shootWithWeapon(weapon);
				}
				console.log(weapon.weaponItensitySlot);

				weapon.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
				console.log(weapon.weaponIntensity);

				weapon.intensityRepeatCounter++;
				if (weapon.intensityRepeatCounter < intensityOptions.repeat) {
					return;
				}

				weapon.intensityRepeatCounter = 0;
				if (weapon.isRandomIntensity) {
					weapon.weaponItensitySlot = _this.hexi.randomInt(0, weapon.options.intensity.length - 1);
				} else {
					weapon.weaponItensitySlot++;

					if (weapon.weaponItensitySlot > weapon.options.intensity.length - 1) {
						weapon.weaponItensitySlot = 0;
					}
				}

			});
		}
	};

	EnemyShip.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = Main.enemyWeaponConfiguration[weapon.weapon];

		_this.hexi.shoot(
			_this.sprite, weapon.angle ? weapon.angle : 1.57,   // 3/2*pi          
			weapon.position.x,
			_this.sprite.halfHeight + weapon.position.y,
			_this.hexi.stage,
			currentWeapon.speed.min && currentWeapon.speed.max
				? _this.hexi.randomFloat(currentWeapon.speed.min, currentWeapon.speed.max)
				: currentWeapon.speed,
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
		if (bullet.type == "laser") {
			if (bullet.hitEnemies.indexOf(this) == -1 && bullet.hitEnemies.length < bullet.hitMax) {
				bullet.hitEnemies.push(this);
				this.life -= bullet.weapon.hitPoints;
				_super.prototype.hit.call(this, bullet);
			}
		} else if (bullet.type == "pulsePlasma") {
			if (bullet.hitEnemies.indexOf(this) == -1 && bullet.hitEnemies.length < bullet.hitMax) {
				bullet.hitEnemies.push(this);
				this.life -= bullet.weapon.hitPoints;
				_super.prototype.hit.call(this, bullet);
			}
		} else {
			this.game.hexi.stage.remove(bullet);
			this.life -= bullet.weapon.hitPoints;
			_super.prototype.hit.call(this, bullet);
		}
		if (this.life <= 0) {
			this.game.score.points += this.shipConfiguration.killPoints;
			this.game.changeState();
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

		_this.movementEngine = new MovementEngine($hexi, _this.sprite, game.hero.sprite, _this.shipConfiguration.movement);

		return _this;
	}

	BonusShip.prototype.hit = function (bullet) {
		this.game.hexi.stage.remove(bullet);
		this.remove();
		_super.prototype.hit.call(this, bullet);
		this.shootWithUpgrade(this.upgradeBonus);
	};

	BonusShip.prototype.shootWithUpgrade = function (upgradeBonus) {
		var _this = this;
		//_this.game.sounds.shoot.play();
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