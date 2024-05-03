
import { _decorator, Component, Node, Prefab, Sprite, instantiate, Vec3, Label, director } from 'cc';
import { Player } from './Player';
import { Star } from './Star';
const { ccclass, property, type } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Thu Sep 30 2021 16:23:02 GMT-0300 (Horário Padrão de Brasília)
 * Author = andremtm
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/scripts/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Game')
export class Game extends Component {
    // [1]
    // dummy = '';

    @type(Prefab)
    starPrefab: Prefab | null = null;

    @property
    minStarDuration = 0;

    @property
    maxStarDuration = 0;

    @type(Node)
    ground: Node | null = null;

    @type(Node)
    playerNode: Node | null = null;

    @type(Label)
    scoreDisplay: Label | null = null;

    score = 0;

    timer = 0;
    starDuration = 0;

    private groundY = 0;
    private player: Player | null = null;

    start () {
        this.score = 0;
        this.timer = 0;
        this.starDuration = 0;
        this.groundY = this.ground.position.y + 100;
        this.player = this.playerNode.getComponent('Player') as Player;
        this.spawnNewStar();
    }

    update (deltaTime: number) {
        // Invoke the logic of game failure
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += deltaTime;
    }

    spawnNewStar () {
        let newStar = instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarRandomPosition());
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        // Save a reference of the Game object on the Star script component
        const star: Star = newStar.getComponent('Star') as Star;
        star.game = this;
    }

    getNewStarRandomPosition () : Vec3 {
        let randX = 0;
        let randY = this.groundY + Math.random() * this.player.jumpHeight + 50;
        var maxX = 320;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return new Vec3(randX, randY);
    }

    gainScore () {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        this.timer = 0;
    }

    gameOver () {
        this.playerNode.active = false;
        director.loadScene('game');
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
