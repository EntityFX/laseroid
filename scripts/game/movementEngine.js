"use strict";

var MovementEngine =  /** @class */ (function () {

	function MovementEngine($hexi, sprite, playerSprite, movementConfigurationName, movementConfiguration, gameAreaConfiguration) {
		this.movements = null;

		this.firstMovement = null;

		this.movementItensity = 0;

		this.movementItensityCounter = 0;

		this.movementItensitySlot = 0;

		this.isBounceBottom = true;
		this.hexi = $hexi;
		this.sprite = sprite;
		this.playerSprite = playerSprite;
		this.movementConfigurationName = movementConfigurationName;
		this.movementConfiguration = movementConfiguration;
		this.gameAreaConfiguration = gameAreaConfiguration;
		this.setMovement();
	}

	MovementEngine.prototype.update = function () {
		if (this.sprite.parent == null) return;

		this.hexi.move(this.sprite);

		this.updateMovement();
	};

	MovementEngine.prototype.setMovement = function () {
		var _this = this;

		this.movements = deepCopy(_this.movementConfiguration[_this.movementConfigurationName]);

		_this.firstMovement = this.movements.movements[0];
		var intensityOptions = _this.firstMovement.intensity[_this.movementItensitySlot];
		_this.movementItensity = _this.hexi.randomInt(intensityOptions.min, intensityOptions.max);
		_this.movementItensitySlot = _this.hexi.randomInt(0, _this.firstMovement.intensity.length - 1);

		if (_this.firstMovement.type == "freeMovementDown") {
			_this.sprite.vy = _this.firstMovement.speedDelta.vy;
			_this.isBounceBottom = false;
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
		}
		else if (_this.firstMovement.type == "followPlayer") {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vx;
			if (_this.sprite.x > _this.playerSprite.x) {
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
				x: this.gameAreaConfiguration.left + this.gameAreaConfiguration.padding,
				y: this.gameAreaConfiguration.top + this.gameAreaConfiguration.padding,
				width: this.hexi.canvas.width - this.gameAreaConfiguration.right - this.gameAreaConfiguration.padding,
				height: this.hexi.canvas.height - this.gameAreaConfiguration.enemyBottom - this.gameAreaConfiguration.padding
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

		if (_this.firstMovement.type == "followPlayer") {
			if (_this.sprite.x > _this.playerSprite.x) {
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
		else if (_this.firstMovement.type == "followPlayer") {
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
		else {
			_this.sprite.vx = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.sprite.vx;
			_this.sprite.vy = (_this.hexi.randomInt(0, 1) == 0 ? -1 : 1) * _this.firstMovement.speedDelta.vy;
		}
	};

	return MovementEngine;
}());