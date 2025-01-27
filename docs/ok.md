<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monster Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js"></script>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>
<script>
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let monsters = [];
let chairs = [];
let cursors;
let joystickBase
let joystick
// tên
let playerNameText,playerNameText2, monsterNamesText = [];
// animation nhân vật
let containerChar, body, shirt, pants;

function preload() {
    // Tải hình ảnh cho nhân vật, quái vật và ghế
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('monster', 'https://labs.phaser.io/assets/sprites/monkey.png');
    this.load.image('chair', 'https://labs.phaser.io/assets/sprites/chair.png');

    // Nạp Atlas (hình ảnh + file JSON)
    this.load.atlas('charBody', 'img/huu.png', 'img/hu.json');

}

function create() {
    // Tạo joystick cố định ở góc dưới màn hình
    joystickBase = this.add.circle(100, this.cameras.main.height - 100, 70, 0x888888, 0.3).setScrollFactor(0).setInteractive();
    // joystickBase = this.add.circle(this.cameras.main.width - 100, this.cameras.main.height - 100, 70, 0x888888, 0.3).setScrollFactor(0).setInteractive();
    joystick = this.add.circle(100, this.cameras.main.height - 100, 40, 0x6666ff, 0.5).setScrollFactor(0).setInteractive();

    // Tạo nhân vật
    player = this.physics.add.sprite(400, 300, 'player');
    player.setCollideWorldBounds(true);
    // Tạo Tên cho nhân vật
    playerNameText = this.add.text(player.x, player.y - 50, 'Kun1891', { fontSize: '16px', fill: '#ffffff' })
        .setOrigin(0.5)

    // Đặt camera theo dõi nhân vật
    // this.cameras.main.startFollow(player);
    // Thiết lập giới hạn cho camera để nó không kéo vào khi nhân vật ở cạnh bản đồ
    const camera = this.cameras.main;
    camera.setBounds(0, 0, 800, 600); // Điều chỉnh kích thước này cho phù hợp với bản đồ của bạn
    camera.startFollow(player, true, 0.08, 0.08); // Giảm tốc độ theo dõi để tránh giật cục
    camera.setLerp(0.1, 0.1); // Điều chỉnh độ mượt của camera khi theo dõi nhân vật

    // Tạo quái vật
    for (let i = 0; i < 3; i++) {
        const monster = this.physics.add.sprite(100 + i * 200, Math.random() * 600, 'monster');
        monster.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
        monster.setBounce(1);
        monster.setCollideWorldBounds(true);
        monsters.push(monster);

        // Tạo Text cho mỗi quái vật
        const monsterNameText = this.add.text(monster.x, monster.y - 50, 'Monster ' + (i + 1), { fontSize: '16px', fill: '#ff0000' }).setOrigin(0.5);
        monsterNamesText.push(monsterNameText);
    }

    // Tạo ghế
    for (let i = 0; i < 3; i++) {
        const chair = this.physics.add.sprite(200 + i * 200, 400, 'chair');
        chair.setCollideWorldBounds(true);
        chair.setBounce(0.2); // Thêm độ nảy cho bàn
        chair.setDrag(400)
        // chair.setImmovable(true);
        chairs.push(chair);
    }

    // Thiết lập điều khiển
    cursors = this.input.keyboard.createCursorKeys();

    // Thiết lập va chạm giữa quái vật và ghế
    monsters.forEach(monster => {
        chairs.forEach(chair => {
            this.physics.add.collider(monster, chair, stopMonster);
        });
    });

    
    
   

    // Thiết lập va chạm giữa các ghế
    for (let i = 0; i < chairs.length; i++) {
        for (let j = i + 1; j < chairs.length; j++) {
            this.physics.add.collider(chairs[i], chairs[j]);
        }
    }

    // Điều khiển joystick
    this.input.on('pointermove', handleJoystickMove, this);
    this.input.on('pointerup', resetJoystick, this);

    // -------------------------------
    // tạo animation
    // this.anims.create({
    //     key: 'walk',
    //     frames: this.anims.generateFrameNames('myAtlas', { start: 1, end: 4 }),
    //     // frames: [
    //     //     { key: 'myAtlas', frame: '2' },
    //     //     { key: 'myAtlas', frame: '5' }
    //     // ],
    //     frameRate: 10,
    //     repeat: -1
    // });

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

// // Tạo animation cho shirt
// this.anims.create({
//     key: 'walkShirt',
//     frames: this.anims.generateFrameNames('myAtlas', { frames: ['3', '5', '6'] }),  // Frames 3, 5, 6 cho áo
//     frameRate: 10,
//     repeat: -1
// });

// // Tạo animation cho pants
// this.anims.create({
//     key: 'walkPants',
//     frames: this.anims.generateFrameNames('myAtlas', { frames: ['7', '8', '9'] }),  // Frames 7, 8, 9 cho quần
//     frameRate: 10,
//     repeat: -1
// });


    // Tạo container cho nhân vật
    containerChar = this.add.container(400, 300);
    containerChar.setSize(100, 200);

    // Tạo phần body và thêm vào container
    body = this.physics.add.sprite(0, 0, 'charBody');
    // body.setDisplaySize(100, 100);
    body.setOrigin(0.5, 0.5);  // Đặt origin của sprite tại giữa hình ảnh
    containerChar.add(body); body.anims.play('charIdle'); 

    // Tạo Tên cho nhân vật
    playerNameText2 = this.add.text(containerChar.x, containerChar.y - 50, 'Kun1891', { fontSize: '16px', fill: '#ffffff' })
        .setOrigin(0.5)

    // // Tạo phần shirt và thêm vào container
    // shirt = this.add.sprite(0, 0, 'character', 'shirt.png');
    // shirt.setDepth(1);  // Shirt nằm trên body
    // containerChar.add(shirt); shirt.anims.play('walk');

    // // Tạo phần pants và thêm vào container
    // pants = this.add.sprite(0, 0, 'character', 'pants.png');
    // pants.setDepth(2);  // Pants nằm trên shirt
    // containerChar.add(pants); pants.anims.play('walk');

    // Nếu nhấn SPACE thì thay đổi quần áo
    this.input.keyboard.on('keydown-SPACE', function () {
        changeShirt('shirt2.png');  // Thay đổi áo
    });
    

  // this.physics.add.existing(containerChar, true); 
    // containerChar.body = body.body;  
    // body.setCollideWorldBounds(true)
    // Thêm thân vật lý cho container
    this.physics.world.enable(containerChar);
containerChar.body.setCollideWorldBounds(true);



    // Thiết lập va chạm giữa nhân vật và ghế
    chairs.forEach(chair => {
        this.physics.add.collider(body, chair, stopPlayer());
    });

}

function update() {
    // Xử lý điều khiển nhân vật
    // if (cursors.left.isDown) {
    //     player.setVelocityX(-160);
    //     // Thiết lập va chạm giữa nhân vật và ghế
    //     // chairs.forEach(chair => {
    //     //     this.physics.add.collider(player, chair, ()=> {
    //     //         if (player.x < chair.body.right) { player.x = chair.body.right - 2}
    //     //         stopPlayer()
    //     //     });
    //     // });
    // } else if (cursors.right.isDown) {
    //     player.setVelocityX(160);
    // } else {
    //     player.setVelocityX(0);
    // }

    // if (cursors.up.isDown) {
    //     player.setVelocityY(-160);
    // } else if (cursors.down.isDown) {
    //     player.setVelocityY(160);
    // } else {
    //     player.setVelocityY(0);
    // }

     // Di chuyển container nhân vật mượt mà
     if (cursors.left.isDown) {
        // Dùng tween để di chuyển nhân vật mượt mà
        this.tweens.add({
            targets: containerChar,
            x: containerChar.x - 4,
            ease: 'Power1',
            duration: 100
        });
        // containerChar.flipX = true
        containerChar.setScale(-1, 1)
        body.anims.play('charWalk', true);
        // Lật các sprite trong container, nhưng không lật tên
  // Lật các sprite trong container
//   containerChar.list.forEach(sprite => {
//         if (sprite instanceof Phaser.GameObjects.Sprite) {
//             sprite.setScale(-1, 1);  // Lật sprite
//         }
//     });
    }
    else if (cursors.right.isDown) {
        this.tweens.add({
            targets: containerChar,
            x: containerChar.x + 4,
            ease: 'Power1',
            duration: 100
        });
        // containerChar.flipX = false;      // Chắc chắn nhân vật không bị quay ngược
        containerChar.setScale(1, 1);  // Hủy lật ngang container
        body.anims.play('charWalk', true);
    }
    else 
    if (cursors.up.isDown) {
        this.tweens.add({
            targets: containerChar,
            y: containerChar.y - 4,
            ease: 'Power1',
            duration: 100
        });
        body.anims.play('charWalk', true);
    }
    else if (cursors.down.isDown) {
        this.tweens.add({
            targets: containerChar,
            y: containerChar.y + 4,
            ease: 'Power1',
            duration: 100
        });
        body.anims.play('charWalk', true);
    }
    else {
        // Nếu không có phím nào được nhấn, nhân vật sẽ chuyển về trạng thái đứng yên
        body.anims.play('charIdle', true);
    }



    // container va chạm thế giới
     // Đảm bảo container không ra ngoài biên giới
     if (containerChar.x < 0) {
        this.tweens.killTweensOf(containerChar);containerChar.x = 0;  
            } else if (containerChar.x > config.width) {
                this.tweens.killTweensOf(containerChar);containerChar.x = config.width; 
            }

            if (containerChar.y < 0) {
                this.tweens.killTweensOf(containerChar);containerChar.y = 0; 
            } else if (containerChar.y > config.height) {
                this.tweens.killTweensOf(containerChar);containerChar.y = config.height; 
            }



    // Cập nhật vị trí Text của nhân vật
    // playerNameText.setPosition(player.x, player.y - 50);
    if (playerNameText.x !== player.x || playerNameText.y !== player.y - 50) {
        playerNameText.setPosition(player.x, player.y - 50);
    }
    if (playerNameText2.x !== playerNameText2.x || playerNameText2.y !==playerNameText2.y - 50) {
        playerNameText2.setPosition(containerChar.x, containerChar.y - 50);
    }

    // Cập nhật vị trí Text của từng quái vật
    monsters.forEach((monster, index) => {
        monsterNamesText[index].setPosition(monster.x, monster.y - 50);
    });
}

function stopMonster(monster, chair) {
    // Tính toán vector hướng từ ghế đến quái vật
    const direction = monster.body.position.clone().subtract(chair.body.position);
    direction.normalize(); // Chuẩn hóa vector
    // body.anims.stop();
    
    // Đặt vận tốc ngược lại cho quái vật
    monster.setVelocity(direction.x * 100, direction.y * 100); // Tăng tốc độ nếu cần thiết
}

function stopPlayer(scence) {
    // Dừng nhân vật khi chạm ghế
    player.setVelocity(0);
    // containerChar.body.setVelocity(0, 0);

    // body.setVelocity(0); // Dừng chuyển động của body
    // // Nếu cần dừng hoàn toàn vật lý của container, có thể dừng cả containerChar
    // containerChar.x = body.x;
    // containerChar.y = body.y;
   
}

function handleJoystickMove(pointer) {
    if (!pointer.isDown) return;

    // Tính toán hướng di chuyển từ joystick
    let dx = pointer.x - joystickBase.x;
    let dy = pointer.y - joystickBase.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Giới hạn joystick nhỏ bên trong joystick lớn
    let maxDistance = 70; // Bán kính joystick lớn
    if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
    }

    // Cập nhật vị trí joystick nhỏ
    joystick.setPosition(joystickBase.x + dx, joystickBase.y + dy);

    // Tính góc di chuyển và di chuyển nhân vật
    let angle = Math.atan2(dy, dx);
    let speed = 200; // Tốc độ di chuyển của nhân vật
    player.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
}


function resetJoystick() {
    // Đặt lại joystick về vị trí trung tâm
    joystick.setPosition(joystickBase.x, joystickBase.y);
    player.setVelocity(0, 0);
}


// Hàm thay đổi quần áo
function changeShirt(newShirt) {
    shirt.setTexture('character', newShirt);
}
</script>
<script src="js/declaration.js"></script>
</body>
</html>
