<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monster Game</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.9/dist/rexvirtualjoystickplugin.min.js"></script>

    
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        #monsterName {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            font-family: Arial, sans-serif;
            border-radius: 5px;
            display: none; /* Ẩn bảng tên mặc định */
        }
    </style>
</head>
<body>
    <!-- Bảng tên quái vật -->
    <div id="monsterName">Monster Name</div>
<script>
function preload() {
    // Tải hình ảnh cho nhân vật, quái vật và ghế
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('monster', 'https://labs.phaser.io/assets/sprites/monkey.png');
    this.load.image('chair', 'https://labs.phaser.io/assets/sprites/chair.png');
    this.load.image('shadow', 'img/shadow_char.png');
    this.load.image('arrow', 'https://labs.phaser.io/assets/sprites/arrow.png'); // Mũi tên chỉ định

    // Nạp Atlas (hình ảnh + file JSON)
    this.load.atlas('charBody', 'img/huu.png', 'img/hu.json');
    this.load.atlas('clothesMale', 'img/clothesMale.png', 'img/clothesMale.json');
    this.load.atlas('monMap1', 'img/monMap1.png', 'img/monMap1.json');

}

function create() {
    // Tạo joystick
    this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,
        y: 500,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888),
        thumb: this.add.circle(0, 0, 25, 0xcccccc),
        dir: '8dir',
        forceMin: 10,
        enable: true
    });

    // Tạo nhân vật
    player = this.physics.add.sprite(200, 300, 'shadow');
    player.setCollideWorldBounds(true);
    player.setSize(50, 30);
    player.setOffset(28, 54);

    // Đặt camera theo dõi nhân vật
    // Thiết lập giới hạn cho camera để nó không kéo vào khi nhân vật ở cạnh bản đồ
    const camera = this.cameras.main;
    camera.setBounds(0, 0, 800, 600); // Điều chỉnh kích thước này cho phù hợp với bản đồ của bạn
    camera.startFollow(player, true, 0.08, 0.08); // Giảm tốc độ theo dõi để tránh giật cục
    camera.setLerp(0.1, 0.1); // Điều chỉnh độ mượt của camera khi theo dõi nhân vật

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

    const monsterNames = ["Quái Xanh", "Quái Đỏ", "Quái Vàng"];
    // Tạo quái vật
    for (let i = 0; i < 3; i++) {
        const monster = this.physics.add.sprite(100 + i * 200, Math.random() * 600, 'monIdle');
        monster.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50));
        monster.setBounce(1);
        monster.setCollideWorldBounds(true);
        monsters.push(monster);
        monster.anims.play('monIdle');
        monster.setSize(50, 30);
        monster.setOffset(28, 54);
        
        // Tạo Text cho mỗi quái vật
        const monsterNameText = this.add.text(monster.x, monster.y - 50, 'Monster ' + (i + 1), { fontSize: '16px', fill: '#ff0000' }).setOrigin(0.5);
        monsterNamesText.push(monsterNameText);
        monster.name = monsterNames[i]

         // Kiểm tra hướng di chuyển và thay đổi scale
        this.physics.world.on('worldstep', () => {
            if (monster.body.velocity.x < 0) {
                // Nếu quái vật di chuyển sang trái, đảo chiều scale
                monster.anims.play('monWalkRe', true);
            } else if (monster.body.velocity.x > 0) {
                // Nếu quái vật di chuyển sang phải, khôi phục scale ban đầu
                monster.anims.play('monWalk', true);
            }
        });
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


    // Tạo container cho nhân vật
    containerChar = this.add.container(200, 298);
    containerChar.setSize(100, 100);

    // Tạo phần body và thêm vào container
    body = this.physics.add.sprite(0, 0, 'charBody');
    // body.setDisplaySize(100, 100);
    body.setOrigin(0.5, 0.5);  // Đặt origin của sprite tại giữa hình ảnh
    containerChar.add(body); 

    // Tạo Tên cho nhân vật
    playerNameText = this.add.text(containerChar.x, containerChar.y - 50, 'Kun1891', { fontSize: '16px', fill: '#ffffff' })
        .setOrigin(0.5)

    // // Tạo phần shirt và thêm vào container
    clothes = this.add.sprite(0, 0, 'clothesMale');
    clothes.setDepth(2);  // Shirt nằm trên body
    clothes.setOrigin(0.5, 0.5); 
    containerChar.add(clothes); 
    
    // body.anims.play('charIdle'); 
    // clothes.anims.play('clothesMaleIdle');

    // // Tạo phần pants và thêm vào container
    // pants = this.add.sprite(0, 0, 'character', 'pants.png');
    // pants.setDepth(2);  // Pants nằm trên shirt
    // containerChar.add(pants); pants.anims.play('walk');

    // Nếu nhấn SPACE thì thay đổi quần áo
    // this.input.keyboard.on('keydown-SPACE', function () {
    //     changeShirt('shirt2.png');  // Thay đổi áo
    // });

    // Thiết lập va chạm giữa nhân vật và ghế
    chairs.forEach(chair => {
        this.physics.add.collider(player, chair, stopPlayer);
    });

    // -----------------
    // tạo mũi tên trên đầu quái
    indicator = this.add.image(0, 0, 'arrow').setOrigin(0.5, 0.5).setVisible(false);

    // Chuyển đổi giữa các quái vật
    this.input.keyboard.on('keydown-SPACE', () => {
        currentMonsterIndex = (currentMonsterIndex + 1) % monstersNear.length;
        monsterPresent = monstersNear[currentMonsterIndex]
        monsterSelectedManually = true; // Ghi nhớ rằng người chơi đã chọn thủ công
    });

//     this.input.keyboard.on('keydown-SPACE', () => {
//     if (monstersNear.length > 0) {
//         currentMonsterIndex = (currentMonsterIndex + 1) % monstersNear.length;
//         monsterPresent = monstersNear[currentMonsterIndex];

//         // Đặt vị trí của mũi tên lên trên quái vật được chọn
//         indicator.setPosition(monsterPresent.x, monsterPresent.y - 50).setVisible(true);
//         monsterNameDiv.innerText = monsterPresent.name;
//         monsterNameDiv.style.display = "block";
//         monsterNameDiv.style.left = `${monsterPresent.x}px`;
//         monsterNameDiv.style.top = `${monsterPresent.y - 60}px`;
//     }
// });
// --------------------------- chuyển cảnh
    // Khi chuyển cảnh, lưu dữ liệu container
    // this.input.keyboard.on('keydown-C', () => {
    //     this.scene.transition({
    //         target: 'MapC',
    //         duration: 500,
    //         onUpdate: () => {
    //             // Truyền dữ liệu container sang MapC
    //             this.scene.get('MapC').dataContainer = exportContainerData(containerChar);
    //         }
    //     });
    // });
    this.input.keyboard.on('keydown-C', () => {
        this.scene.transition({ target: 'MapC', duration: 500 
    });
});

}

function update() {
    // Xử lý điều khiển nhân vật
    let isMoving = false; // Kiểm tra xem nhân vật có di chuyển không

    if (cursors.left.isDown) {
        player.setVelocityX(-vel);
        containerChar.x = player.x + 3
        containerChar.setScale(-1, 1);
        isMoving = true;
    } else if (cursors.right.isDown) {
        player.setVelocityX(vel);
        containerChar.x = player.x + 1
        containerChar.setScale(1, 1);
        isMoving = true;
    } else {
        player.setVelocityX(0);
        if (containerChar.scaleX === -1) {
            containerChar.x = player.x + 5
        } else {
            containerChar.x = player.x
        }
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-vel);
        containerChar.y = player.y - 4;
        isMoving = true;
    } else if (cursors.down.isDown) {
        player.setVelocityY(vel);
        containerChar.y = player.y +2;
        isMoving = true;
    } else {
        player.setVelocityY(0);
        containerChar.y = player.y - 1;
    }

    // animation quái vật
    // monsters.forEach((monster) => {
    //     // Kiểm tra điều kiện để chuyển animation
    //     if (monster.body.velocity.x !== 0 || monster.body.velocity.y !== 0) {
    //         monster.play('monWalk');
    //     } else {
    //         monster.play('monIdle');
    //     }
    // });



    // Chọn hoạt ảnh dựa trên trạng thái di chuyển
    if (isMoving) {
        body.anims.play('charWalk', true);
        clothes.anims.play('clothesMaleWalk', true);
    } else {
        body.anims.play('charIdle', true);
        clothes.anims.play('clothesMaleIdle', true);
    }


    // Cập nhật vị trí Text của nhân vật
    // playerNameText.setPosition(player.x, player.y - 50);
    playerNameText.setPosition(containerChar.x, containerChar.y - 50);

    // Cập nhật vị trí Text của từng quái vật
    monsters.forEach((monster, index) => {
        monsterNamesText[index].setPosition(monster.x, monster.y - 50);
    });


    // ------------------ mũi tên trên đầu quái
    // Kiểm tra khoảng cách gần quái vật
    // selectedMonsterIndex = -1; // Reset chỉ số quái vật đã chọn
    let previousMonstersNear = [...monstersNear]; // Lưu lại danh sách trước đó để so sánh
    monstersNear = [];
    monsters.forEach((monster, index) => {
        const distance = Phaser.Math.Distance.Between(player.x, player.y, monster.x, monster.y);
        if (distance < 100) { // Khoảng cách để chọn quái vật
            monstersNear.push(monster);
        }
    });
//     monstersNear = monsters.filter(monster => 
//     Phaser.Math.Distance.Between(player.x, player.y, monster.x, monster.y) < 100
// );


    // Nếu danh sách quái vật gần thay đổi và không có hành động chuyển quái vật
    if (monstersNear.length > 0 &&
        (!monsterSelectedManually || monstersNear !== previousMonstersNear)) {
        // Kiểm tra và điều chỉnh currentMonsterIndex
        if (currentMonsterIndex >= monstersNear.length) {
            currentMonsterIndex = 0; // Đặt lại chỉ số về 0 nếu vượt quá
        }
        monsterPresent = monstersNear[currentMonsterIndex]
        indicator.setVisible(true);
        indicator.setPosition(monsterPresent.x, monsterPresent.y - 25);
    }

    // Nếu không có quái vật gần, ẩn mũi tên chỉ định
    if (monstersNear.length === 0) {
        indicator.setVisible(false);

        monsterSelectedManually = false; // Reset lại trạng thái chuyển thủ công
        currentMonsterIndex = 0;
        // ẩn tên quái
        monsterNameDiv.style.display = 'none';
    } else {
        monsterNameDiv.style.display = 'block';
        monsterNameDiv.innerText = monstersNear[currentMonsterIndex].name;
    }

    // // Xử lý di chuyển bằng joystick
    // const force = this.joystick.force;
    // if (force > 0) {
    //     const angle = this.joystick.angle;
    //     this.physics.velocityFromRotation(Phaser.Math.DegToRad(angle), force * 10, player.body.velocity);
    // } else {
    //     player.setVelocity(0, 0); // Dừng khi không có lực từ joystick
    // }
}

function stopMonster(monster, chair) {
    // Tính toán vector hướng từ ghế đến quái vật
    const direction = monster.body.position.clone().subtract(chair.body.position);
    direction.normalize(); // Chuẩn hóa vector
    // Đặt vận tốc ngược lại cho quái vật
    monster.setVelocity(direction.x * 100, direction.y * 100); // Tăng tốc độ nếu cần thiết
}

function stopPlayer() {
    // Dừng nhân vật khi chạm ghế
    player.setVelocity(0);
}

function exportContainerData(container) {
        // Trả về vị trí và các sprite trong container dưới dạng một đối tượng
        return {
            x: container.x,
            y: container.y,
            children: container.list.map(child => ({
                key: child.texture.key,
                x: child.x,
                y: child.y
            }))
        };
    } 



    class MapC extends Phaser.Scene {
    constructor() {
        super('MapC');
        this.dataContainer = null; // dữ liệu container sẽ được nhận từ MapA
    }

    create() {
        if (this.dataContainer) {
            const newContainer = importContainerData(this, this.myContainerData);
             // Thêm container vào cảnh
            this.add.existing(newContainer);
        }
    }
}

function importContainerData(scene, containerData) {
    // Tạo lại container từ dữ liệu đã lưu
    const container = scene.add.container(containerData.x, containerData.y);
    // Tạo lại các sprite bên trong container
    containerData.children.forEach(child => {
        const sprite = scene.add.sprite(child.x, child.y, child.key);
        container.add(sprite);
    });
    return container;
}
// Hàm thay đổi quần áo
function changeShirt(newShirt) {
    shirt.setTexture('character', newShirt);
}


</script>
<script src="phaser/declare.js"></script>
<script src="phaser/mapA.js"></script>
<script src="phaser/startGame.js"></script>

</body>
</html>
