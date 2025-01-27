let player;
let monsters = [];
let chairs = [];
let cursors;
// tên
let playerNameText, monsterNamesText = [], vel = 120
// animation nhân vật
let containerChar, body, shirt, pants, clothes
// mũi tên trên đầu quái
let monsterPresent = 0
let monstersNear = []; // Lưu danh sách các quái vật gần
let currentMonsterIndex = 0; // Quái vật đang được chọn
let monsterSelectedManually = false;

let selectedMonsterIndex = -1; // Chỉ số quái vật được chọn
let indicator; // Mũi tên chỉ định
monsterNameDiv = document.getElementById('monsterName')

// time
let countdownText;
let timer = 5; // Thời gian đếm ngược
let isPlayerTurn = true; // Lượt của người chơi


// preload screen
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Tải các tài nguyên dùng chung cho game
        // map A-----------------------
        // Tải hình ảnh cho nhân vật, quái vật và ghế
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
        this.load.image('monster', 'https://labs.phaser.io/assets/sprites/monkey.png');
        this.load.image('chair', 'https://labs.phaser.io/assets/sprites/chair.png');
        this.load.image('shadow', '../img/shadow_char.png');
        // Mũi tên trên đầu quái
        this.load.image('arrow', 'https://labs.phaser.io/assets/sprites/arrow.png');
  
        // Nạp Atlas (hình ảnh + file JSON)
        this.load.atlas('charBody', '../img/huu.png', '../img/hu.json');
        this.load.atlas('clothesMale', '../img/clothesMale.png', '../img/clothesMale.json');
        this.load.atlas('monMap1', '../img/monMap1.png', '../img/monMap1.json');
        // map B-----------------------
    }

    create() {
    
        // Tạo animation dùng chung cho quái map A
        this.anims.create({
            key: 'monWalk',
            frames: this.anims.generateFrameNames('monMap1', { frames: ['5', '3'] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'monIdle',
            frames: this.anims.generateFrameNames('monMap1', { frames: ['5', '4'] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'monWalkRe',
            frames: this.anims.generateFrameNames('monMap1', { frames: ['9', '10'] }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'monIdleRe',
            frames: this.anims.generateFrameNames('monMap1', { frames: ['9', '11'] }),
            frameRate: 5,
            repeat: -1
        });
         
        // animation cho nhân vật 
        // Tạo animation cho body
        this.anims.create({
            key: 'charIdle',
            frames: this.anims.generateFrameNames('charBody', { frames: ['3', '2'] }),
            // frames: [
            //         { key: 'charBody', frame: '2' },
            //         { key: 'charBody', frame: '1' }
            //     ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'charWalk',
            frames: this.anims.generateFrameNames('charBody', { frames: ['3', '1'] }),
            frameRate: 5,
            repeat: -1
        });
        // Tạo animation cho shirt
        this.anims.create({
            key: 'clothesMaleWalk',
            frames: this.anims.generateFrameNames('clothesMale', { frames: ['3', '1'] }),  // Frames 3, 5, 6 cho áo
            frameRate: 5,
            repeat: -1
        });

        // Tạo animation cho pants
        this.anims.create({
            key: 'clothesMaleIdle',
            frames: this.anims.generateFrameNames('clothesMale', { frames: ['3', '2'] }),  // Frames 7, 8, 9 cho quần
            frameRate: 5,
            repeat: -1
        }); 

        // Chuyển sang scene chính khi mọi thứ đã sẵn sàng
        this.scene.start('MapA');
    }
}
