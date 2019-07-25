"use strict";

var Enemy = /** @class */ (function (_super) {
	__extends(Enemy, _super);

	Enemy.prototype.type = null;

	Enemy.prototype.shipConfiguration = null;

	Enemy.prototype.movementEngine = null;

	Enemy.prototype.syncWeapons = {
		"grouppedWeapons": null,
		"grouppedCounters": {}
	};

	function Enemy($hexi, game, main, type) {
		var _this = _super.call(this, $hexi, game, main) || this;
		_this.type = type;
		_this.shipConfiguration = deepCopy(_this.configuration.enemyConfiguration.enemyShipsConfiguration[type]);

		_this.sprite = _this.hexi.sprite(_this.shipConfiguration.sprite
			? _this.shipConfiguration.sprite
			: _this.hexi.json("resources/{0}/images/ships-texture.json".format(_this.resourcesPackage)).animations[_this.shipConfiguration.animatedSprite]);
		if (_this.shipConfiguration.animatedSprite) {
			_this.sprite.playAnimation();
		}

		_this.setWeapon();
		_this.gameScene.addChild(_this.sprite);
		_this.life = _this.shipConfiguration.life;
        _this.movementEngine = new MovementEngine($hexi, _this.sprite, game.player.sprite,
             _this.shipConfiguration.movement, _this.configuration.enemyConfiguration.enemyMovementConfiguration);

		return _this;
	}

	Enemy.prototype.update = function () {
		_super.prototype.update.call(this);

		var _this = this;

		if (this.sprite.parent == null) return;

		this.updateShooting();
		this.movementEngine.update();
	};

	Enemy.prototype.setWeapon = function () {
		var _this = this;
		this.automatedWeapons = deepCopy(_this.shipConfiguration.weapons);

		if (_this.shipConfiguration.isSyncWeapon) {
			this.automatedWeapons.forEach(function (weapon) {
				var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];
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
				var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];
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

	Enemy.prototype.updateShooting = function () {
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
				//console.log(weapon.weaponItensitySlot);

				weapon.weaponIntensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
				//console.log(weapon.weaponIntensity);

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

	Enemy.prototype.shootWithWeapon = function (weapon) {
		var _this = this;
		var currentWeapon = _this.configuration.enemyConfiguration.enemyWeaponConfiguration[weapon.weapon];

		_this.hexi.shoot(
			_this.sprite, weapon.angle ? weapon.angle : 1.57,   // 3/2*pi          
			weapon.position.x,
			_this.sprite.halfHeight + weapon.position.y,
			_this.hexi.stage,
			currentWeapon.speed.min && currentWeapon.speed.max
				? _this.hexi.randomFloat(currentWeapon.speed.min, currentWeapon.speed.max)
				: currentWeapon.speed,
			_this.game.bulletsController.enemyBullets,
			(function () {
				var bulletSprite = _this.hexi.sprite(currentWeapon.sprite
					? currentWeapon.sprite
					: _this.hexi.json("resources/{0}/images/bullet-texture.json".format(_this.resourcesPackage)).animations[currentWeapon.animatedSprite]);
				if (currentWeapon.animatedSprite) {
					bulletSprite.playAnimation();
				}
				bulletSprite.weapon = currentWeapon;
				return bulletSprite;
			}).bind(_this)
		);

		_this.sounds[currentWeapon.sound].play();
	};

	Enemy.prototype.hit = function (bullet) {
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
            if (this.onDestroyed) {
                this.onDestroyed();
            }
			this.remove();
		}
	};


	return Enemy;
}(WeaponedActor));