"use strict";

/**
 * Main class
 * 
 * @class Game
 */
var Game = /** @class */ (function () {

    Game.heroSpeed = 10;

    Game.prototype.hexi = null;

    Game.prototype.hero = null;

    Game.prototype.bulletsController = null;

    Game.prototype.enemyController = null;

    Game.prototype.explosionSplashes = [];

    Game.prototype.onLevelChanged = null;

    Game.prototype.level = {
        "wave": 1,
        "type": 1
    };

    Game.prototype.score = {
        "points": 0
    };

    function Game($hexi, main) {
        var _this = this;
        this.hexi = $hexi;
        this.main = main;
        this.hero = new HeroShip(this.hexi, this, main);
        this.bulletsController = new BulletsController(this.hexi, this);
        this.enemyController = new EnemyController(this.hexi, this);

        this.setupLevel(this.level.wave);
        //this.changeState();
    }

    Game.prototype.clearShips = function () {
        var _this = this;

        this.bulletsController.clear();
        this.enemyController.clear();
    };

    Game.prototype.setupLevel = function (currentWave) {
        var _this = this;

        var currentLevel = this.main.configuration.levelsConfiguration[currentWave];

        currentLevel.enemies.forEach(function (enemyConfig) {
            var enemy = new EnemyShip(_this.hexi, _this, _this.main, enemyConfig.type)
            enemy.setPosition(enemyConfig.position);
            enemy.onDestroyed = _this.enemyDestroyed.bind(_this);
            _this.enemyController.enemies.push(enemy);
        });

        if (currentLevel.bonuses) {
            currentLevel.bonuses.forEach(function (bonusConfig) {
                var bonusShip = new BonusShip(_this.hexi, _this, _this.main, bonusConfig.type)
                bonusShip.setPosition(bonusConfig.position);
                _this.enemyController.bonuses.push(bonusShip);
            });
        }

        if (this.onLevelChanged) {
            this.onLevelChanged(this.level.wave);
        }
    }

    Game.prototype.nextLevel = function () {
        this.clearShips();
        this.level.wave++;
        this.setupLevel(this.level.wave);
    };

    Game.prototype.restoreState = function (gameState) {
        var _this = this;
        this.hexi.pause();
        this.clearShips();
        this.level.wave = gameState.wave;
        this.score.points = gameState.scorePoints;
        this.hero.life = gameState.life;
        this.setupLevel(this.level.wave);
        if (this.onGameReseted) {
            this.onGameReseted();
        }
        this.hexi.resume();
    };

    Game.prototype.resetGame = function () {
        var _this = this;
        this.hexi.pause();
        this.score.points = 0;
        //this.gameTimeSeconds = 0;
        this.level.wave = 1;
        this.hero.life = 1;
        this.clearShips();

        this.setupLevel(this.level.wave);
        if (this.onGameReseted) {
            this.onGameReseted();
        }
        this.hexi.resume();
    };

    Game.prototype.update = function () {
        var _this = this;

        if (_this.enemyController.isLevelCompleted()) {
            this.nextLevel();
        }

        this.hero.update();
        this.bulletsController.update();
        this.enemyController.update();

        this.explosionSplashes = this.explosionSplashes.filter(function (explosionSplash) {
            explosionSplash.ticks++;

            if (explosionSplash.ticks > 18) {
                _this.hexi.stage.remove(explosionSplash);
            }
            return explosionSplash.parent;
        });
    };

    Game.prototype.enemyDestroyed = function () {
        if (this.onEnemyDestroyed) {
            this.onEnemyDestroyed();
        }
    };

    return Game;
}());