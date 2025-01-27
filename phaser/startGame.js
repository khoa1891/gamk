const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
            // debug: false
        }
    },
    backgroundColor: '#ffffff',
    scene: [PreloadScene, MapA, MapC],
}

const game = new Phaser.Game(config);