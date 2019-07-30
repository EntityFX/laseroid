"use strict";

/**
 * Main class
 * 
 * @class Game
 */
var Game = /** @class */ (function () {

    Game.playerSpeed = 10;

    Game.prototype.hexi = null;

    Game.prototype.player = null;

    Game.prototype.bulletsController = null;

    Game.prototype.enemyController = null;

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
        this.player = new Player(this.hexi, this, main);
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

        var currentLevel = this.main.configuration.levelsConfiguration.waves[currentWave];

        if (currentLevel == null) {
            currentWave = this.level.wave = 1;
            currentLevel = this.main.configuration.levelsConfiguration.waves[currentWave];
        }

        currentLevel.enemies.forEach(function (enemyConfig) {
            var enemy = new Enemy(_this.hexi, _this, _this.main, enemyConfig.id)
            enemy.setPosition(enemyConfig.position);
            enemy.onDestroyed = _this.enemyDestroyed.bind(_this);
            _this.enemyController.enemies.push(enemy);
        });

        if (currentLevel.bonuses) {
            currentLevel.bonuses.forEach(function (bonusConfig) {
                var bonus = new Bonus(_this.hexi, _this, _this.main, bonusConfig.id)
                bonus.setPosition(bonusConfig.position);
                _this.enemyController.bonuses.push(bonus);
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

    Game.prototype.previousLevel = function () {
        this.clearShips();
        this.level.wave--;
        this.setupLevel(this.level.wave);
    };

    Game.prototype.forwardLevel = function () {
        this.clearShips();
        this.level.wave+=5;
        this.setupLevel(this.level.wave);
    };

    Game.prototype.rewindLevel = function () {
        this.clearShips();
        this.level.wave-=5;
        this.setupLevel(this.level.wave);
    };

    Game.prototype.restoreState = function (gameState) {
        var _this = this;
        this.hexi.pause();
        this.clearShips();
        this.level.wave = gameState.wave;
        this.score.points = gameState.scorePoints;
        this.player.life = gameState.life;
        this.player.setLife(this.player.life);
        this.setupLevel(this.level.wave);
        this.hexi.resume();
    };

    Game.prototype.resetGame = function () {
        var _this = this;
        this.hexi.pause();
        this.score.points = 0;
        //this.gameTimeSeconds = 0;
        this.level.wave = 1;
        this.player.life = 1;
        this.player.setLife(this.player.life);
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

        this.player.update();
        this.bulletsController.update();
        this.enemyController.update();
    };

    Game.prototype.enemyDestroyed = function () {
        if (this.onEnemyDestroyed) {
            this.onEnemyDestroyed();
        }
    };

    return Game;
}());