class MapA extends Phaser.Scene {
    constructor() {
        super({ key: 'MapA' });
    }

    preload() {
    }

    create() {
        // // Tạo joystick
        // this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        //     x: 100,
        //     y: 500,
        //     radius: 50,
        //     base: this.add.circle(0, 0, 50, 0x888888),
        //     thumb: this.add.circle(0, 0, 25, 0xcccccc),
        //     dir: '8dir',
        //     forceMin: 10,
        //     enable: true
        // });

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
                    monster.setData('re', true)
                } else if (monster.body.velocity.x > 0) {
                    // Nếu quái vật di chuyển sang phải, khôi phục scale ban đầu
                    monster.anims.play('monWalk', true);
                    monster.setData('re', false)
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
        // Trong MapA
this.input.keyboard.on('keydown-C', () => {
    // Truyền dữ liệu cho MapC trước khi chuyển scene
    this.scene.get('MapC').dataContainer = exportContainerData(containerChar);
    
    // Sử dụng switch để chuyển từ MapA sang MapC
    this.scene.start('MapC', { 
        containerName: playerNameText.text,
        monsterName: monsterPresent.name, 
        monsterKey: monsterPresent.anims.currentAnim.key,
        reverse: monsterPresent.getData("re")
    });
    // this.scene.switch('MapC', { containerName: playerNameText.text });
});

        // this.input.keyboard.on('keydown-C', () => {
        //     this.scene.transition({
        //         target: 'MapC', duration: 500
        //     });
        // });


        // const animation = this.anims.get('clothesMaleIdle');
        // console.log(animation.frames, animation.frameRate)
    }

    update() {
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
            containerChar.y = player.y + 2;
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

    }
}


class MapC extends Phaser.Scene {
    constructor() {
        super('MapC');
        this.dataContainer = null; // dữ liệu container sẽ được nhận từ MapA
        this.playerNameText = null
    }
    init(data) {
        this.containerName = data.containerName;
        this.monsterKey = data.monsterKey
        this.reverse = data.reverse
        this.monsterName = data.monsterName
    }
      

    create() {
        // tạo nhân vật
            const newContainer = importContainerData(this, this.dataContainer);
             // Thêm container vào cảnh
            this.add.existing(newContainer);
            this.playerNameText = this.add.text(newContainer.x, newContainer.y - 50, 
                this.containerName , { fontSize: '16px', fill: '#ffffff' })
                .setOrigin(0.5)
        
        // tạo quái
        const monster = this.physics.add.sprite(300, 100, 'player');
        this.reverse ? monster.anims.play(this.monsterKey)
                     : monster.anims.play(`${this.monsterKey}Re`)
        monster.setSize(50, 30);
        monster.setOffset(28, 54);

        // Tạo Text cho mỗi quái vật
        const monsterNameText = this.add.text(monster.x, monster.y - 50, this.monsterName, { fontSize: '16px', fill: '#ff0000' }).setOrigin(0.5);

        // Thêm văn bản đếm ngược ở giữa màn hình
        countdownText = this.add.text(400, 100, `Time: ${timer}`, { fontSize: '32px', color: '#ffffff' })
            .setOrigin(0.5)
            .setVisible(false);
        // Tạo một sự kiện để giảm thời gian đếm ngược mỗi giây
        this.time.addEvent({
            delay: 1000,
            callback: updateTimer,
            callbackScope: this,
            loop: true
        });

        //          // Truy cập các sprite con trong container
        // newContainer.list.forEach(sprite => {
        //     console.log(`Sprite Key: ${sprite.texture.key}, Position: (${sprite.x}, ${sprite.y})`);

        //     // Kiểm tra và điều khiển animation của sprite
        //     if (sprite.anims) {
        //         console.log(`Animation of ${sprite.texture.key}: ${sprite.anims.currentAnim.key}`);
        //     }
        // });
        
    }
}