new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.playerAttackLog(damage);

            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.playerAttackLog(damage);

            if (this.checkWin()) {
                return;
            }
            
            this.monsterAttack();
        },
        heal: function () {
            
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player heals for 10"
                }); //add next log to beginning of array
            } else {
                this.playerHealth = 100;
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player heals to full health"
                }); //add next log to beginning of array
            }
            
            this.monsterAttack();
        },
        monsterAttack: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            }); //adds next attack to beginning of array
            
            this.checkWin();
        },
        calculateDamage: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);

        },
        playerAttackLog: function(damage) {
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            }); //adds next attack to beginning of array
        },
        checkWin: function (playerHealth, monsterHealth) {
            if(this.monsterHealth <= 0) {
                if (confirm("You won! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You lost! New Game?")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
    }
}); 