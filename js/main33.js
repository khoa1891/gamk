const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let gameObj = { // gameObj.
    // map
    "map":{

        player: 0, body: 0, weapon: 0, mount: 0, pet: 0, wing: 0,
        playerNameText: 0, monstersBody: [], monContainerArr: [], characterContainer: [],
        monsters: [], chairs: [], obstacles: [], // Chướng ngại vật tĩnh
        cursors: 0, 
    
        C: 1,
        // mũi tên trên đầu quái
        monsterPresent: 0,
        monstersNear: [], // Lưu danh sách các quái vật gần
        currentMonsterIndex: 0, // Quái vật đang được chọn
        monsterSelectedManually: false,
        
        selectedMonsterIndex: -1, // Chỉ số quái vật được chọn
        indicator: 0, // Mũi tên chỉ định
    
        mapIndex: 1, monn: 0, charr: 0,
        tempPlayerX: 0, 
        tempPlayerY: 0, 
        tempMonX: 0, 
        tempMonY: 0, 
    }
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // Không sao chép nếu là giá trị cơ bản
    }

    if (Array.isArray(obj)) {
        return obj.map(deepCopy); // Sao chép mảng
    }

    const copiedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copiedObj[key] = deepCopy(obj[key]); // Đệ quy sao chép các thuộc tính
        }
    }
    return copiedObj;
}


function preload() {
    this.load.image('body', 'https://examples.phaser.io/assets/sprites/phaser-dude.png');
    this.load.image('hat', 'https://examples.phaser.io/assets/sprites/hat.png');
    this.load.image('shirt', 'https://examples.phaser.io/assets/sprites/shirt.png');
    // Tải hình ảnh cho nhân vật, quái vật, ghế và vật thể
    this.load.image('player', '../img/blank.png');
    this.load.image('monster', 'https://labs.phaser.io/assets/sprites/monkey.png');
    this.load.image('chair', 'https://labs.phaser.io/assets/sprites/chair.png');
    this.load.image('obstacle', 'https://labs.phaser.io/assets/sprites/block.png');  // Chướng ngại vật tĩnh


    // this.load.image('frame1', 'path/to/frame1.png');
    this.load.image('frame1', '../img/ha11.png');
    this.load.image('frame2', '../img/ha22.png');
    this.load.image('frame3', '../img/ha33.png');
    // trang phục nam
    this.load.image('frame4', '../img/ha44.png');
    this.load.image('frame5', '../img/ha55.png');
    this.load.image('frame6', '../img/ha66.png');


    // nũ
    // this.load.image('frame1', 'path/to/frame1.png');
    this.load.image('frame7', '../img/ha140.png');
    this.load.image('frame8', '../img/ha150.png');
    this.load.image('frame9', '../img/ha160.png');
    // trang phục nữ
    this.load.image('frame10', '../img/ha99.png');
    this.load.image('frame11', '../img/ha77.png');
    this.load.image('frame12', '../img/ha88.png');
    this.load.image('arrow', 'https://labs.phaser.io/assets/sprites/arrow.png');
    // vũ khí hoả
    this.load.image('frame13', '../img/ha170.png');
    this.load.image('frame14', '../img/ha180.png');
    this.load.image('frame15', '../img/ha190.png');
    // // vũ khí thủy
    // this.load.image('frame13', '../img/ha170.png');
    // this.load.image('frame14', '../img/ha180.png');
    // this.load.image('frame15', '../img/ha190.png');
    // // vũ khí mộc
    // this.load.image('frame13', '../img/ha170.png');
    // this.load.image('frame14', '../img/ha180.png');
    // this.load.image('frame15', '../img/ha190.png');
    // // vũ khí kim
    // this.load.image('frame13', '../img/ha170.png');
    // this.load.image('frame14', '../img/ha180.png');
    // this.load.image('frame15', '../img/ha190.png');
    // // vũ khí thổ
    // this.load.image('frame13', '../img/ha170.png');
    // this.load.image('frame14', '../img/ha180.png');
    // this.load.image('frame15', '../img/ha190.png');
    // vũ khí cánh
    this.load.image('frame28', '../img/ha320.png');
    this.load.image('frame29', '../img/ha330.png');
    this.load.image('frame30', '../img/ha340.png');
    // thú cưỡi
    this.load.image('frame31', '../img/ha350.png');
    this.load.image('frame32', '../img/ha360.png');
    this.load.image('frame33', '../img/ha370.png');
    // pet
    this.load.image('frame34', '../img/ha380.png');
    this.load.image('frame35', '../img/ha390.png');
    this.load.image('frame36', '../img/ha400.png');


    // Tải sprite sheet
    // this.load.atlas('boyNuz', '../img/boiNuzNuz.png', '../img/boiNuz.json');

}

function create() {
    createAnimations(this)
        gameObj.map.body = this.add.sprite(0, 0, 'body');
        gameObj.map.body.setSize(40, 50)
        gameObj.map.body.setScale(0.725);
        gameObj.map.body.setOrigin(0.5, 0.5);
    
        gameObj.map.weapon = this.add.sprite(0, 0, 'body');
        gameObj.map.weapon.setSize(40, 50)
        gameObj.map.weapon.setScale(0.725);
        gameObj.map.weapon.setOrigin(0.5, 0.5);
    
        
        gameObj.map.mount = this.add.sprite(0, 0, 'body');
        gameObj.map.mount.setSize(40, 50)
        gameObj.map.mount.setScale(0.725);
        gameObj.map.mount.setOrigin(0.5, 0.5);
    
         
        gameObj.map.pet = this.add.sprite(0, 0, 'body');
        gameObj.map.pet.setSize(40, 50)
        gameObj.map.pet.setScale(0.725);
        gameObj.map.pet.setOrigin(0.5, 0.5);
    
        gameObj.map.wing = this.add.sprite(0, 0, 'body');
        gameObj.map.wing.setSize(40, 50)
        gameObj.map.wing.setScale(0.725);
        gameObj.map.wing.setOrigin(0.5, 0.5);
    
        gameObj.map.wing = this.add.sprite(0, 0, 'body');
        gameObj.map.wing.setSize(40, 50)
        gameObj.map.wing.setScale(0.725);
        gameObj.map.wing.setOrigin(0.5, 0.5);
        gameObj.map.wing.setDepth(10)
    
    
        // tạo mũi tên trên đầu quái
        gameObj.map.indicator = this.add.sprite(0, 0, 'arrow').setOrigin(0.5, 0.5)
            .setVisible(false).setDepth(12)
    
        // Group character parts into a container
        gameObj.map.characterContainer = this.add.container(400, 300, [gameObj.map.body, gameObj.map.weapon, gameObj.map.mount, gameObj.map.pet]);
        gameObj.map.characterContainer.setDepth(12)
    
    characterBody = this.physics.add.existing(gameObj.map.characterContainer);

        gameObj.map.characterContainer.body.setSize(40, 50)
    
        // Tạo nhân vật
        gameObj.map.player = this.physics.add.sprite(400, 300, 'frame1');
        gameObj.map.player.setSize(40, 50)
        gameObj.map.player.setScale(0.725);
        gameObj.map.player.setOrigin(0.5, 0.5);
        gameObj.map.player.setDepth(11)
    
        gameObj.map.player.setCollideWorldBounds(true);
        // Tạo Tên cho nhân vật
        gameObj.map.playerNameText = this.add.text(gameObj.map.player.x, gameObj.map.player.y - 50, charInF.name, { fontSize: '15px', fill: '#ffffff' })
            .setOrigin(0.5).setDepth(12)
   

    this.input.keyboard.on('keydown-H', () => {
        gameObj.map.indicator.visible ? console.log(gameObj.map.monsterPresent.obj) : console.log("koo")
    });
    

    // Overlay nền đen
    this.overlay = this.add.rectangle(400, 300, 800, 600, 0xffc0cb)
        .setAlpha(0)
        .setDepth(16)
        .setOrigin(0.5)
        .disableBody(true, true);
    // .setInteractive(false);  // Đảm bảo setInteractive được kích hoạt với hand cursor (con trỏ chuột)
    // .setInteractive({ useHandCursor: true });  // Đảm bảo setInteractive được kích hoạt với hand cursor (con trỏ chuột)

    // Nền xanh
    this.tempBackground = this.add.rectangle(400, 300, 800, 600, 0x0000FF)
        .setDepth(9)
        .setOrigin(0.5)
        .disableBody(true, true);
    // .setInteractive(true);  // Nền xanh không tương tác khi chưa chuyển map

    // Text loading
    this.loadingText = this.add.text(400, 300, 'Đang tải...', {
        fontSize: '24px',
        fill: '#ffffff'
    }).setOrigin(0.5).setDepth(17)
    .disableBody(true, true);

    // Lắng nghe phím C
    this.input.keyboard.on('keydown-C', () => {
        gameObj.map.C == 1? (transitionMap(this), gameObj.map.C++): (transitionMapOut(this),gameObj.map.C--)
        // gameObj.map.monsters[0].disableBody(true, true);
    });
    // Chuyển đổi giữa các quái vật
    this.input.keyboard.on('keydown-SPACE', () => {
        gameObj.map.currentMonsterIndex = (gameObj.map.currentMonsterIndex + 1) % gameObj.map.monstersNear.length;
        gameObj.map.monsterPresent = gameObj.map.monstersNear[gameObj.map.currentMonsterIndex]
        gameObj.map.monsterSelectedManually = true; // Ghi nhớ rằng người chơi đã chọn thủ công
    });

    // // Lắng nghe sự kiện nhấn vào vùng đỏ (nếu nó đang tương tác)
    // this.tempBackground.on('pointerdown', () => {
    //     console.log("haha"); // Khi nhấn vào vùng đỏ, in ra "haha"
    // });
    var yy = 0
    const currentMap = monsInF[gameObj.map.mapIndex];
    for (const groupKey in currentMap) {
        const group = currentMap[groupKey];
        for (let i = 0; i < group.num; i++) {
            const monster = this.physics.add.sprite(100 + i * 100, Math.random() * 600, 'frame1');
            monster.setVelocity(Phaser.Math.Between(-70, 70), Phaser.Math.Between(-70, 70));
            // monster.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            monster.setBounce(1);
            monster.setCollideWorldBounds(true);
            monster.setSize(40, 50)
            monster.setScale(0.725);
            monster.setOrigin(0.5, 0.5);
            monster.setDepth(11)
            monster.indec = yy
            yy++
            // monster.body.moves = false;
            // monster.body.setImmovable(true); 
            monster.obj = deepCopy(group)
            monster.obj.level = monster.obj._level() // Lấy level từ getter
            monster.obj.element = monster.obj._element()
            // monster.level = deepCopy(group)._level() // Lấy level từ getter
            // monster.element =  deepCopy(group)._element()
            // monster.idle = group.idle
            // monster.idleCloth = group.idleCloth
            // monster.run = group.run
            // monster.runCloth = group.runCloth

            monster.isStopped = false; // Mặc định tất cả đều đang chạy


            gameObj.map.monsters.push(monster);

            // áo
            let body = this.add.sprite(0, 0, 'body');
            body.setSize(40, 50)
            body.setScale(0.725);
            body.setOrigin(0.5, 0.5);

            gameObj.map.monstersBody.push(body)



            // Group character parts into a container
            let monContainer = this.add.container(400, 300, [body]);
            gameObj.map.monContainerArr.push(monContainer)
            monContainer.setDepth(12)  

            // Add physics body for the entire character
            monContainer.body.setSize(40, 50)


            // // Tạo tên cho quái vật
            // monster.monsterNameText = this.add.text(
            //     monster.x,
            //     monster.y - 50,
            //     `${monster.name} | Lv ${monster.level}`,
            //     // `${monster.name} ${i}`,
            //     { fontSize: '12px', fill: '#ffffff' }
            // ).setOrigin(0.5);


            // Thêm thông tin quái vật vào mảng
            // monsters2.push({ container: monsterContainer, nameText: monsterNameText });
        }
    }
    this.input.keyboard.on('keydown-A', () => {
        gameObj.map.monsters.forEach((monster, index) => {
            if (monster.isStopped) {
                // Nếu đang dừng, cho chạy lại
                monster.setVelocity(Phaser.Math.Between(-70, 70), Phaser.Math.Between(-70, 70));
                monster.isStopped = false;
            } else {
                // Nếu đang chạy, dừng lại
                monster.setVelocity(0, 0);
                monster.isStopped = true;
                gameObj.map.monstersBody[index].anims.play('idleCloth', true);
                monster.anims.play('idle', true);
            }
        });
    });
    // Minimap setup
    // Tạo minimap ở góc trái trên
    minimap = this.add.graphics();

    // Vẽ viền và nền minimap
    minimap.lineStyle(4, 0xffffff, 1);  // Viền minimap
    minimap.strokeRect(20, 20, 160, 120);  // Vẽ hình chữ nhật viền cho minimap

    // Nền mờ cho minimap
    minimap.fillStyle(0x000000, 0.5);  // Màu nền mờ
    minimap.fillRect(20, 20, 160, 120);  // Nền minimap

    // Vẽ Player trên minimap (hình tròn)
    minimap.clear();  // Xóa đồ họa trước khi vẽ lại
    minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    // minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player (phóng đại tỷ lệ)

    // Vẽ Monsters trên minimap (hình tròn)
    // monsters.forEach(monster => {
    //     minimap.fillStyle(0xff0000, 1);  // Màu cho monster (màu đỏ)
    //     minimap.fillCircle(monster.x / 4 + 20, monster.y / 4 + 20, 5);  // Vẽ hình tròn cho monster (phóng đại tỷ lệ)
    // });


    // Vẽ player (chỉ vẽ nếu player nằm trong phạm vi minimap)
    if (gameObj.map.player.x >= 0 && gameObj.map.player.x <= 640 && gameObj.map.player.y >= 0 && gameObj.map.player.y <= 480) {
        minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
        minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player
    }

    // Vẽ quái trên minimap (hình tròn đỏ, chỉ vẽ nếu quái nằm trong phạm vi minimap)
    for (let i = 0; i < gameObj.map.monsters.length; i++) {
        let enemy = gameObj.map.monsters[i];

        if (enemy.x >= 0 && enemy.x <= 640 && enemy.y >= 0 && enemy.y <= 480) {
            minimap.fillStyle(0xff0000, 1);  // Màu cho quái (đỏ)
            minimap.fillCircle(enemy.x / 4 + 20, enemy.y / 4 + 20, 5);  // Vẽ hình tròn cho quái
        }
    }


    this.input.keyboard.on('keydown-B', () => {
        console.log(gameObj.map.monsters[0].name)
        var monster = gameObj.map.monsters[0]
        if (monster.isStopped) {
            // Nếu đang dừng, cho chạy lại
            monster.setVelocity(Phaser.Math.Between(-70, 70), Phaser.Math.Between(-70, 70));
            monster.isStopped = false;
        } else {
            // Nếu đang chạy, dừng lại
            monster.setVelocity(0, 0);
            monster.isStopped = true;
            gameObj.map.monstersBody[0].anims.play('idleCloth', true);
            monster.anims.play('idle', true);
        }
    });





    // Tạo ghế
    for (let i = 0; i < 3; i++) {
        const chair = this.physics.add.sprite(200 + i * 200, 400, 'chair');
        chair.setCollideWorldBounds(true);
        chair.setBounce(0.2); // Thêm độ nảy cho ghế
        chair.setDrag(400);
        gameObj.map.chairs.push(chair);
    }

    // Tạo chướng ngại vật tĩnh
    for (let i = 0; i < 2; i++) {
        const obstacle = this.physics.add.staticImage(500 + i * 200, 300, 'obstacle');
        gameObj.map.obstacles.push(obstacle);
    }

    // Thiết lập điều khiển
    gameObj.map.cursors = this.input.keyboard.createCursorKeys();

    // Thiết lập va chạm giữa quái vật và ghế
    gameObj.map.monsters.forEach(monster => {
        gameObj.map.chairs.forEach(chair => {
            this.physics.add.collider(monster, chair, stopMonster);
        });
    });

    // Thiết lập va chạm giữa nhân vật và ghế
    gameObj.map.chairs.forEach(chair => {
        this.physics.add.collider(gameObj.map.player, chair)// , stopPlayer);
    });



    // Thiết lập va chạm giữa nhân vật và quái vật (để đẩy quái)
    gameObj.map.monsters.forEach(monster => {
        this.physics.add.collider(gameObj.map.player, monster, pushMonster);
    });

    // Thiết lập va chạm giữa quái vật và chướng ngại vật tĩnh
    gameObj.map.monsters.forEach(monster => {
        gameObj.map.obstacles.forEach(obstacle => {
            this.physics.add.collider(monster, obstacle);
        });
    });

    // Thiết lập va chạm giữa nhân vật và chướng ngại vật tĩnh
    gameObj.map.obstacles.forEach(obstacle => {
        this.physics.add.collider(gameObj.map.player, obstacle);
    });
    // Thiết lập va chạm giữa các quái vật
    for (let i = 0; i < gameObj.map.monsters.length; i++) {
        for (let j = i + 1; j < gameObj.map.monsters.length; j++) {
            this.physics.add.collider(gameObj.map.monsters[i], gameObj.map.monsters[j]);
        }
    }
    // Thiết lập va chạm giữa các ghế
    for (let i = 0; i < gameObj.map.chairs.length; i++) {
        for (let j = i + 1; j < gameObj.map.chairs.length; j++) {
            this.physics.add.collider(gameObj.map.chairs[i], gameObj.map.chairs[j]);
        }
    }
    // Làm cho quần áo di chuyển theo nhân vật
    // this.physics.world.on('worldstep', () => {
    //   gameObj.map.characterContainer.x = gameObj.map.player.x;
    //   gameObj.map.characterContainer.y = gameObj.map.player.y;
    // });

    // createMonsters()


}
function createChar(scene) {
    gameObj.map.body = scene.add.sprite(0, 0, 'body');
    gameObj.map.body.setSize(40, 50)
    gameObj.map.body.setScale(0.725);
    gameObj.map.body.setOrigin(0.5, 0.5);

    gameObj.map.weapon = scene.add.sprite(0, 0, 'body');
    gameObj.map.weapon.setSize(40, 50)
    gameObj.map.weapon.setScale(0.725);
    gameObj.map.weapon.setOrigin(0.5, 0.5);

    
    gameObj.map.mount = scene.add.sprite(0, 0, 'body');
    gameObj.map.mount.setSize(40, 50)
    gameObj.map.mount.setScale(0.725);
    gameObj.map.mount.setOrigin(0.5, 0.5);

     
    gameObj.map.pet = scene.add.sprite(0, 0, 'body');
    gameObj.map.pet.setSize(40, 50)
    gameObj.map.pet.setScale(0.725);
    gameObj.map.pet.setOrigin(0.5, 0.5);

    gameObj.map.wing = scene.add.sprite(0, 0, 'body');
    gameObj.map.wing.setSize(40, 50)
    gameObj.map.wing.setScale(0.725);
    gameObj.map.wing.setOrigin(0.5, 0.5);

    gameObj.map.wing = scene.add.sprite(0, 0, 'body');
    gameObj.map.wing.setSize(40, 50)
    gameObj.map.wing.setScale(0.725);
    gameObj.map.wing.setOrigin(0.5, 0.5);
    gameObj.map.wing.setDepth(10)


    // tạo mũi tên trên đầu quái
    gameObj.map.indicator = scene.add.sprite(0, 0, 'arrow').setOrigin(0.5, 0.5)
        .setVisible(false).setDepth(12)

    // Group character parts into a container
    gameObj.map.characterContainer = scene.add.container(400, 300, [gameObj.map.body, gameObj.map.weapon, gameObj.map.mount, gameObj.map.pet]);
    gameObj.map.characterContainer.setDepth(12)

    console.log(gameObj.map.characterContainer)
    gameObj.map.characterContainer.body.setSize(40, 50)

    // Tạo nhân vật
    gameObj.map.player = scene.physics.add.sprite(400, 300, 'frame1');
    gameObj.map.player.setSize(40, 50)
    gameObj.map.player.setScale(0.725);
    gameObj.map.player.setOrigin(0.5, 0.5);
    gameObj.map.player.setDepth(11)

    gameObj.map.player.setCollideWorldBounds(true);
    // Tạo Tên cho nhân vật
    gameObj.map.playerNameText = scene.add.text(gameObj.map.player.x, gameObj.map.player.y - 50, charInF.name, { fontSize: '15px', fill: '#ffffff' })
        .setOrigin(0.5).setDepth(12)
}

// Hàm riêng để tạo các animation
function createAnimations(scene) {
    // nhún đứng, đứng đi
    // boy
    scene.anims.create({
        // key: 'run',
        // frames: scene.anims.generateFrameNames('boyNuz', { frames: ['2', '2'] }),
        key: 'idle',         // Tên animation
        frames: [
            { key: 'frame1' },
            { key: 'frame2' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });


    scene.anims.create({
        key: 'runCloth',         // Tên animation
        frames: [
            { key: 'frame4' },
            { key: 'frame5' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    scene.anims.create({
        key: 'idleCloth',         // Tên animation
        frames: [
            { key: 'frame6' },
            { key: 'frame4' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });

    scene.anims.create({
        key: 'run',         // Tên animation
        frames: [
            { key: 'frame2' },
            { key: 'frame3' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    // ----------------
    // girl
    // boy
    scene.anims.create({
        key: 'idleG',         // Tên animation
        frames: [
            { key: 'frame7' },
            { key: 'frame8' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });


    scene.anims.create({
        key: 'runClothG',         // Tên animation
        frames: [
            { key: 'frame11' },
            { key: 'frame12' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    scene.anims.create({
        key: 'idleClothG',         // Tên animation
        frames: [
            { key: 'frame10' },
            { key: 'frame11' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });

    scene.anims.create({
        key: 'runG',         // Tên animation
        frames: [
            { key: 'frame8' },
            { key: 'frame9' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });

    scene.anims.create({
        key: 'idleBlade',         // Tên animation
        frames: [
            { key: 'frame15' },
            { key: 'frame13' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });

    scene.anims.create({
        key: 'runBlade',         // Tên animation
        frames: [
            { key: 'frame13' },
            { key: 'frame14' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    // thú cưỡi
    scene.anims.create({
        key: 'idleMount',         // Tên animation
        frames: [
            { key: 'frame33' },
            { key: 'frame31' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });

    scene.anims.create({
        key: 'runMount',         // Tên animation
        frames: [
            { key: 'frame31' },
            { key: 'frame32' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    // pet 
    scene.anims.create({
        key: 'runPet',         // Tên animation
        frames: [
            { key: 'frame34' },
            { key: 'frame35' },
            { key: 'frame36' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
    // cánh
      // pet 
      scene.anims.create({
        key: 'runWing',         // Tên animation
        frames: [
            { key: 'frame28' },
            { key: 'frame29' },
            { key: 'frame30' },
        ],                          // Các frame của animation
        frameRate: 5,              // Tốc độ chuyển động của animation (10 frame mỗi giây)
        repeat: -1
    });
}


function transitionMap(scene) {
    createBattleUI()
    // scene.overlay.setInteractive(true)
    scene.input.keyboard.emit('keydown-A');
    gameObj.map.tempPlayerX = gameObj.map.player.x 
    gameObj.map.tempPlayerY = gameObj.map.player.y 
    gameObj.map.tempMonX = gameObj.map.monsters[0].x
    gameObj.map.tempMonY = gameObj.map.monsters[0].y 
    // Đặt quái vật tại góc dưới bên phải
    gameObj.map.monsters[0].setPosition(703, 411);
    // gameObj.map.monsters[0].setPosition(cameraX + screenWidth - 10, cameraY + screenHeight - 10);
    gameObj.map.monContainerArr[0].setPosition(gameObj.map.monsters[0].x, gameObj.map.monsters[0].y);
    gameObj.map.monsters[0].flipX = true
    gameObj.map.monContainerArr[0].setScale(-1, 1);

    gameObj.map.player.flipX = false
    gameObj.map.characterContainer.setScale(1, 1);

    // Đặt nhân vật tại góc dưới bên trái
    gameObj.map.player.setPosition(598, 411);

    gameObj.map.characterContainer.setPosition(gameObj.map.player.x, gameObj.map.player.y);

  
    scene.overlay.enableBody(true, 400, 300, true, true);

    // 1. Bắt đầu fade-out
    scene.tweens.add({
        
        targets: scene.overlay,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
            // 2. Hiển thị loading
            scene.loadingText.enableBody(true, 400, 300, true, true);
            scene.tempBackground.enableBody(true, 400, 300, true, true);

            // 3. Chuyển map sau khi loading
            scene.time.delayedCall(2500, () => {
                // scene.loadingText.enableBody(true, 400, 300, true, true);

                // 4. Fade-in
                scene.tweens.add({
                    targets: scene.overlay,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        scene.overlay.disableBody(true, true);
                        scene.loadingText.disableBody(true, true);
                        scene.tempBackground.disableBody(true, true);
                        // Góc dưới bên phải (screenWidth - 10, screenHeight - 10):
                        const cameraX = scene.cameras.main.scrollX;
                        const cameraY = scene.cameras.main.scrollY;
                        const screenWidth = scene.cameras.main.width;
                        const screenHeight = scene.cameras.main.height;

                        joinBattle()
                        document.getElementById("battle-ui").style.display = "block"
                        updateInfor()


                        // Ví dụ sử dụng hàm này:
                        // simulatePointerDown(this, 400, 300);


                        // 5. Sau khi fade-out xong, set overlay không còn tương tác
                        // scene.overlay.setInteractive(false); // Tắt tính tương tác khi hoàn thành fade-out
                    }
                });
            });
        }
    });
}

function transitionMapOut(scene) {
    scene.overlay.enableBody(true, 400, 300, true, true);
    // 1. Bắt đầu fade-out
    scene.tweens.add({
        targets: scene.overlay,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
            scene.loadingText.enableBody(true, 400, 300, true, true);
            scene.tempBackground.enableBody(true, 400, 300, true, true);
            enddBattle(scene)
            // 3. Chuyển map sau khi loading
            scene.time.delayedCall(2500, () => {
                // scene.loadingText.setVisible(false)

                // 4. Fade-in
                scene.tweens.add({
                    targets: scene.overlay,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        scene.overlay.disableBody(true, true);
                        scene.loadingText.disableBody(true, true);
                        scene.tempBackground.disableBody(true, true);

                    }
                });
            });
        }
    });
}
// Giả lập nhấn vào vị trí màn hình
function simulatePointerDown(scene, x, y) {
    // Di chuyển con trỏ đến vị trí (x, y)
    scene.input.activePointer.x = x;
    scene.input.activePointer.y = y;

    // Gọi sự kiện 'pointerdown' tại vị trí đó
    scene.input.activePointer.isDown = true;
    scene.input.pointerDownHandler(scene.input.activePointer);  // Gọi sự kiện thủ công
}

function enddBattle(scene) {
    const element = document.getElementById('battle-ui');
    // gameObj.map.tempMonX = gameObj.map.monsters[0].x
    // gameObj.map.tempMonY = gameObj.map.monsters[0].y 

    // Xóa phần tử
    element.remove();
    gameObj.map.monsters[0].setPosition(gameObj.map.tempMonX, gameObj.map.tempMonY);
    gameObj.map.player.setPosition(gameObj.map.tempPlayerX, gameObj.map.tempPlayerY);
    gameObj.map.monsters[0].disableBody(true, true);
    gameObj.map.monstersBody[0].setAlpha(0)
    // gameObj.map.monsters[0].enableBody(true, gameObj.map.tempMonX, gameObj.map.tempMonY, true, true);
    function mi(xx, xx2) {
        // Tìm phần tử có `name === "Element 1"`
        let index = gameObj.map.monsters.findIndex(item => item.indec === gameObj.map.monsters[0].indec);
        // Xóa phần tử tại vị trí x[1]
        let removedElement = gameObj.map.monsters.splice(index, 1)[0]; // Lấy phần tử bị xóa

        // console.log("Mảng sau khi xóa:", gameObj.map.monsters.length);

        // Thêm lại phần tử vào sau 3 giây
        setTimeout(() => {
            gameObj.map.monsters.splice(1, 0, removedElement); // Chèn phần tử vào lại vị trí cũ
            gameObj.map.monsters[0].enableBody(true, xx, xx2, true, true);
            gameObj.map.monstersBody[0].setAlpha(1)
            

            setTimeout(() => {    
                scene.input.keyboard.emit('keydown-A');
                // gameObj.map.monsters[0].setVelocity(Phaser.Math.Between(-70, 70), Phaser.Math.Between(-70, 70));
                gameObj.map.monstersBody[0].anims.play('runCloth', true);
                gameObj.map.monsters[0].anims.play('run', true);
            }, 1500);
            // console.log("Mảng sau khi thêm lại:", gameObj.map.monsters.length);
        }, 3000);

    }
    mi(gameObj.map.tempMonX, gameObj.map.tempMonY)
}

function update() {
    let isMoving = false
    let vel = 160
    if (gameObj.map.cursors.left.isDown) {
        gameObj.map.player.setVelocityX(-vel);
        gameObj.map.player.flipX = true
        gameObj.map.characterContainer.setScale(-1, 1);
        // gameObj.map.characterContainer.x = gameObj.map.player.x + 3
        isMoving = true;
    } else if (gameObj.map.cursors.right.isDown) {
        gameObj.map.player.setVelocityX(vel);
        gameObj.map.player.flipX = false
        gameObj.map.characterContainer.setScale(1, 1);
        // gameObj.map.characterContainer.x = gameObj.map.player.x 
        isMoving = true;

    } else {
        gameObj.map.player.setVelocityX(0);

    }

    if (gameObj.map.cursors.up.isDown) {
        gameObj.map.player.setVelocityY(-vel);
        isMoving = true;
    } else if (gameObj.map.cursors.down.isDown) {
        gameObj.map.player.setVelocityY(vel);
        isMoving = true;
    } else {
        gameObj.map.player.setVelocityY(0);
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



    // if (isMoving) {
    //     mimi('runG', 'runClothG');
    // } else {
    //     mimi('idleG', 'idleClothG');
    // }
    if (isMoving) {
        mimi(charInF.RunNuz, charInF.RunCloth, charInF.RunWeapon,  charInF.RunMount, charInF.RunPet, charInF.RunWing);
    } else {
        mimi(charInF.IdleNuz, charInF.IdleCloth, charInF.IdleWeapon, charInF.IdleMount, charInF.RunPet, charInF.RunWing);
    }
    function mimi(a, b, c, d, e, f) {
        gameObj.map.player.anims.play(a, true);
        gameObj.map.body.anims.play(b, true);
        gameObj.map.weapon.anims.play(c, true);
        gameObj.map.mount.anims.play(d, true);
        gameObj.map.pet.anims.play(e, true);
        gameObj.map.wing.anims.play(f, true);
    }

    // Đảm bảo quần áo di chuyển theo nhân vật
    gameObj.map.characterContainer.setPosition(gameObj.map.player.x, gameObj.map.player.y);
    gameObj.map.wing.setPosition(gameObj.map.player.x, gameObj.map.player.y);
    // playerNameText.setPosition(gameObj.map.player.x, gameObj.map.player.y - 50);
    gameObj.map.playerNameText.setPosition(gameObj.map.player.x, gameObj.map.player.y - 50);
    // Cập nhật vị trí Text của từng quái vật
    //   monsters.forEach((monster, index) => {
    //     monster.monsterNameText.setPosition(monster.x, monster.y - 50);
    // });
    gameObj.map.monsters.forEach((monster, index) => {
        if (!monster.isStopped) {
            // // Cập nhật quái vật di chuyển tự do
            // if (monster.body.velocity.x === 0 && monster.body.velocity.y === 0) {
            //     monster.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            // }

            gameObj.map.monstersBody[index].anims.play('runCloth', true);
            monster.anims.play('run', true);
            gameObj.map.monContainerArr[index].setPosition(monster.x, monster.y);

            // Kiểm tra hướng di chuyển và lật hình
            if (monster.body.velocity.x < 0) {
                monster.flipX = true
                gameObj.map.monContainerArr[index].setScale(-1, 1);
            } else if (monster.body.velocity.x > 0) {
                monster.flipX = false
                gameObj.map.monContainerArr[index].setScale(1, 1);
            }
        }
    });


    // // Cập nhật minimap
    // Tạo minimap ở góc trái trên
    minimap.clear(); // Xóa đồ họa trước khi vẽ lại

    // Vẽ viền và nền minimap
    minimap.lineStyle(4, 0xffffff, 1);  // Viền minimap
    minimap.strokeRect(20, 20, 160, 120);  // Vẽ hình chữ nhật viền cho minimap

    // Nền mờ cho minimap
    minimap.fillStyle(0x000000, 0.5);  // Màu nền mờ
    minimap.fillRect(20, 20, 160, 120);  // Nền minimap

    // Vẽ Player trên minimap (hình tròn)
    // minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    // minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player (phóng đại tỷ lệ)

    // // Vẽ Monsters trên minimap (hình tròn)
    // monsters.forEach(monster => {
    //     minimap.fillStyle(0xff0000, 1);  // Màu cho monster (màu đỏ)
    //     minimap.fillCircle(monster.x / 4 + 20, monster.y / 4 + 20, 5);  // Vẽ hình tròn cho monster (phóng đại tỷ lệ)
    // });
    if (gameObj.map.player.x >= 0 && gameObj.map.player.x <= 640 && gameObj.map.player.y >= 0 && gameObj.map.player.y <= 480) {
        minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
        minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player
    }

    // Vẽ quái trên minimap (hình tròn đỏ, chỉ vẽ nếu quái nằm trong phạm vi minimap)
    for (let i = 0; i < gameObj.map.monsters.length; i++) {
        let enemy = gameObj.map.monsters[i];

        if (enemy.x >= 0 && enemy.x <= 640 && enemy.y >= 0 && enemy.y <= 480) {
            minimap.fillStyle(0xff0000, 1);  // Màu cho quái (đỏ)
            minimap.fillCircle(enemy.x / 4 + 20, enemy.y / 4 + 20, 5);  // Vẽ hình tròn cho quái
        }
    }


    // Lọc danh sách quái vật gần
    const previousMonstersNear = [...gameObj.map.monstersNear];
    gameObj.map.monstersNear = gameObj.map.monsters.filter(monster =>
        monster.active &&
        monster.visible &&
        Phaser.Math.Distance.Between(gameObj.map.player.x, gameObj.map.player.y, monster.x, monster.y) < 100
    );

    // Nếu có quái vật gần
    if (gameObj.map.monstersNear.length) {
        if (!gameObj.map.monsterSelectedManually || JSON.stringify(gameObj.map.monstersNear) !== JSON.stringify(previousgameObj.map.MonstersNear)) {
            gameObj.map.currentMonsterIndex = gameObj.map.currentMonsterIndex % gameObj.map.monstersNear.length; // Đảm bảo chỉ số hợp lệ
            gameObj.map.monsterPresent = gameObj.map.monstersNear[gameObj.map.currentMonsterIndex];
        }
        // Hiển thị chỉ số và tên
        gameObj.map.indicator.setVisible(true).setPosition(gameObj.map.monsterPresent.x, gameObj.map.monsterPresent.y - 25);
        // monsterNameDiv.style.display = 'block';
        // monsterNameDiv.innerText = gameObj.map.monsterPresent.name;
    } else {
        // Không có quái vật gần, ẩn chỉ số và tên
        gameObj.map.indicator.setVisible(false);
        // monsterNameDiv.style.display = 'none';
        gameObj.map.monsterSelectedManually = false;
        gameObj.map.currentMonsterIndex = 0;
    }

    // updateMonsters()


    // // Cập nhật quái vật di chuyển tự do
    // monsters.forEach(monster => {
    //     if (monster.body.velocity.x === 0 && monster.body.velocity.y === 0) {
    //         monster.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
    //     }
    // });
}

function stopMonster(monster, object) {
    // Quái vật bật lại khi chạm vật thể hoặc chướng ngại vật
    const direction = monster.body.position.clone().subtract(object.body.position);
    direction.normalize(); // Chuẩn hóa vector
    monster.setVelocity(direction.x * 80, direction.y * 80); // Giảm tốc độ khi bật lại
}



function stopPlayer(player, chair) {
    // Dừng nhân vật khi chạm ghế
    player.setVelocity(0);
}

function pushMonster(player, monster) {
    // Nhân vật đẩy quái khi va chạm
    const direction = monster.body.position.clone().subtract(player.body.position);
    direction.normalize(); // Chuẩn hóa vector
    monster.setVelocity(direction.x * 100, direction.y * 100); // Đẩy quái đi
}


function joinBattle() {
    // a, name, element, level,
    // hpCur, hpPoint, damePoint, armorPoint, dodgePoint,
    // S1p, S2p, S3p,
    let mon = gameObj.map.monsterPresent.obj
    gameObj.map.monn = new Character(mon.aa, mon.name, mon.element, mon.level,
        mon.hpCur, mon.hpPoint, mon.damePoint, mon.armorPoint, mon.dodgePoint,
        mon.S1p, mon.S2p, mon.S3p, mon)

    gameObj.map.charr = new Character(charInF.aa, charInF.name, charInF.element, charInF.level,
        charInF.hpCur, charInF.hpPoint, charInF.damePoint, charInF.armorPoint, charInF.dodgePoint,
        charInF.S1p, charInF.S2p, charInF.S3p, charInF)
}
// -----------------------------

function getNum(a, b) {
    a = a > b ? b : a < 0 ? 0 : a
    return a
}



{
    let hihi = {
        bibi
    }
    function bibi() {
        console.log("hihi")
    }
}

function updateInfor() {
    var i = 0
    for (const type of ['char', 'mon']) {
        let a = i == 0? gameObj.map.charr: gameObj.map.monn
        document.getElementById(`${type}-health`).textContent = +a.hpCur.toFixed(2)
        document.getElementById(`${type}-mana`).textContent = +a.manaCur.toFixed(2)
        document.getElementById(`${type}-max-armor`).textContent = +a.armorMax.toFixed(2)
        document.getElementById(`${type}-armor-cur`).textContent = +a.armorCur.toFixed(2)
        document.getElementById(`${type}-dame`).textContent = +a.dame.toFixed(2)

        document.getElementById(`${type}-health2`).textContent = +a.hpMax.toFixed(2)
        document.getElementById(`${type}-mana2`).textContent = +a.manaMax.toFixed(2)
        i++
    }
}
var equip = {
    "shirt": {
        dame: 5,
        hp: 10,
        armor: 3.6,
        dodge: 1.49
    }
}


// ----------------------play 

var board = [], hàng = 9, cột = 8, listOfArrays = []
var currTile = undefined, otherTile = undefined
var fiveBlock = 'https://github.com/kun18911/gameBenhVienQuyDu/blob/main/asset/../img/bomb5.png?raw=true'
var blank = 'https://github.com/ImKennyYip/candy-crush/blob/master/images/blank.png?raw=true'
var normal_Class = ['gold', 'yingyang', 'heart', 'sword', 'water', 'soulRock']
var srcValue = []; function createTag(x) {return document.createElement(x)}
function getId(x) {return document.getElementById(x)}
function getBox(x) {return document.getElementById(`a${x}`)}
function srcSymbol(x) {return x.dataset.symbolSSrc}


function checkValid() {
    const checkMatch = (candy1, candy2, candy3) =>
        candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank');

    // Kiểm tra hàng và cột
    for (let i = 0; i < hàng; i++) {
        for (let j = 0; j < cột; j++) {
            if (j < cột - 2 && checkMatch(board[i][j], board[i][j + 1], board[i][j + 2])) return true;
            if (i < hàng - 2 && checkMatch(board[i][j], board[i + 1][j], board[i + 2][j])) return true;
        }
    }

    return false;
}


// 16.
function làm_Tròn(number, decimalPlaces) {var factor = Math.pow(10, decimalPlaces); return Math.round(number * factor) / factor}

function randomCandy() {
    return `../img/${normal_Class[Math.floor(Math.random() * normal_Class.length)]}.png`
}
var board_table = document.getElementById("board");
const square45 = 45
var boardPointt = {
    // battle game
    start: true,
    click: false,
    currentTurn: '',
    remainingTurns: 1,
    timer: 5,
    countdown: 0
}
function startGame() {
    // tạo 64 viên chính ------------
    for (let r = 0; r <= hàng; r++) {
        let row = [];
        for (let c = 0; c < cột; c++) { mainTile(r, c, row) };
        board.push(row);
    }
    function mainTile(r, c, row) {
        // --------------- tạo thẻ cha, ảnh 1, ảnh 2
        let tileDad = createTag("div"), tile = createTag("img") //y = createTag("img")
        tileDad.style.position = "absolute"
        tileDad.style.top = `${square45 * r - square45 }px`
        tileDad.style.left = `${square45 * c}px`
        tileDad.style.height = '45px'
        tileDad.style.width = '45px'
        tileDad.className = 'fc'
        tileDad.style.zIndex = 2
        // tileDad.style.transition = 'all 0.3s ease-in-out'
        tileDad.style.transition = 'all 0.4s ease-in-out'

        // -----------
        tile.src = randomCandy(); tile.style.opacity = "1";
        tile.classList.add("fc", 'offBoom');
        tile.addEventListener("click", click_Affect); tile.id = r + "-" + c;
        tile.filterr = 'undefined'
        tileDad.id = `a${r}-${c}`; row.push(tile); 
        // --------------- gắn thẻ cha, ảnh 1, ảnh 2 vào bảng 
        board_table.appendChild(tileDad).appendChild(tile);  //tileDad.appendChild(y);
        return tile;
    }    
    // -----------------------

    // startG có nghĩa là báo hiệu đầu game
    if (boardPointt.start == true) {
        if (checkValid()) { setTimeout(() => { destroyCandy() }, 2000) }
        else {
            // ko thì kiểm tra có nước đi khả thi ko
            if (canSwap() ) {
                setTimeout(() => { startTime() }, 500)                
            } else { reCreate() } 
        }
    }
}
  

// đơn giản là click vào ô thì tạo hiệu ứng cho ô dễ nhìn
const focus = (tile, cls, aa, time) => { 
    setTimeout(()=>{
        // getBox(tile).classList.replace(getBox(tile).classList, cls)
        getBox(tile.id).className = cls;
        aa == 1? getBox(tile.id).style.zIndex = 3
            :getBox(tile.id).style.zIndex = 2
    }, time)
}
function click_Affect() {
    if (boardPointt.click && boardPointt.currentTurn == "Nhân vật") {
        boardPointt.click = false; currTile = this; 
        focus(currTile, 'focus', 1, 0); 
    } else if (boardPointt.click == false && this == currTile && boardPointt.currentTurn == "Nhân vật") { 
        boardPointt.click = undefined; // clearInterval(timer); timeBox.classList.add("disableTime")
        // cho chính nó outfocus và tắt sau 800ms
        focus(this, 'outFocus', 1, 0); focus(this, 'fc', 2, 800); 
        // setTimeout(() => {
        //     boardPointt.click = true; startTurn(1);
        //     timeBox.classList.remove("disableTime")
        // }, 400); 
        clearInterval(boardPointt.countdown);
        setTimeout(() => {
            boardPointt.click = true
            boardPointt.remainingTurns += 1       
            useTurn(boardPointt.timer)
        }, 400); 

    } 
    // click lần 2 nếu biến là false, click ô khác nó sẽ hoán đổi cờ
    else if (boardPointt.click == false && this != currTile && boardPointt.currentTurn == "Nhân vật") { 
        otherTile = this;
        // clearInterval(timer); timeBox.classList.add("disableTime")
        focus(otherTile, 'outFocus', 1, 0); // console.log(2)
        focus(otherTile, 'fc', 2, 1200); 
        focus(currTile, 'fc', 2, 100); 
        setTimeout(() => checkAdjacency(), 400); 
        boardPointt.click = undefined
        clearInterval(boardPointt.countdown);
    } 
}
// click xong kiểm tra kề cạnh
function checkAdjacency() { 
    // ------------- nếu 1 trong 2 src là blank thì dừng hàm. say bye
    if (currTile.src.includes('blank') || otherTile.src.includes('blank')) return;

    const [r1, c1] = currTile.id.split("-").map(Number), [r2, c2] = otherTile.id.split("-").map(Number);
    // nếu click vào ô kề cạnh thì hoán đổi
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
        // // 1. đổi src img1 cho nhau trong 300ms
        // [getBox(currTile.id).style.top, getBox(currTile.id).style.left,
        //     getBox(otherTile.id).style.top, getBox(otherTile.id).style.left] =
        // [getBox(otherTile.id).style.top, getBox(otherTile.id).style.left,
        //     getBox(currTile.id).style.top, getBox(currTile.id).style.left];

        // [getBox(currTile.id).id, getBox(otherTile.id).id] =
        //     [getBox(otherTile.id).id, getBox(currTile.id).id];
        // // -----------
        // [currTile.id, otherTile.id] = [otherTile.id, currTile.id];
        // // -----------
        // let [r1, c1] = currTile.id.split("-").map(Number);
        // let [r2, c2] = otherTile.id.split("-").map(Number);
        // [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];

        swapCandy(currTile.id, otherTile.id)
        // chờ 300ms quá đủ, đợi thêm 500ms (500+300=800) để tới bước phá cờ
        setTimeout(() => { destroyCandy() }, 800)
    } else { 
        // click bậy, ko kề thì chờ 400ms click lại
        setTimeout(() => {
            boardPointt.click = true; // startTurn(1);
            // timeBox.classList.remove("disableTime")

            boardPointt.remainingTurns += 1       
            useTurn(boardPointt.timer)
        }, 400)
        
    }
} 

var getPoint = new Set()
var pointChess = {
    gold: 0,
    water: 0,
    heart: 0,
    soulRock: 0,
    sword: 0,
    yingyang: 0,
}
function destroyCandy(x) {
// Phần I: listOfArrays là chiếc xem có bao nhiêu viên có 3 ô liên tiếp trở lên cùng src
{   
// for (let r = 0; r < hàng; r++) {console.log(r); meme(cột, board[r])} // Kiểm tra hàng
    // for (let c = 0; c <= cột; c++) {meme(hàng, board.map(row => row[c]))} // Kiểm tra cột

    // // Hàm chung để kiểm tra hàng hoặc cột
    // function meme(length, line) {
    //     let candy1 = line[0], array = [candy1];
    //     for (let i = 1; i < length; i++) {
    //         let candy2 = line[i];
    //         if (candy1.src == candy2.src && !candy1.src.includes('blank')) {
    //             array.push(candy2)} 
    //         else {
    //             if (array.length >= 3) listOfArrays.push(array);
    //             candy1 = candy2; array = [candy1];
    //         }
    //     }
    //     if (array.length >= 3) listOfArrays.push(array);
    // }
}

for (let r = 0; r <= hàng; r++) {
    let row = board[r];
    let candy1 = row[0], array = [candy1];
    for (let c = 1; c < cột; c++) {
        let candy2 = row[c];
        if (candy1.src === candy2.src && !candy1.src.includes('blank')) {
            array.push(candy2);
        } else {
            if (array.length >= 3) listOfArrays.push(array);
            candy1 = candy2;
            array = [candy1];
        }
    }
    if (array.length >= 3) listOfArrays.push(array);
}
for (let c = 0; c < cột; c++) {
    let column = board.map(row => row[c]);
    let candy1 = column[0], array = [candy1];
    for (let r = 1; r <= hàng; r++) {
        let candy2 = column[r];
        if (candy1.src === candy2.src && !candy1.src.includes('blank')) {
            array.push(candy2);
        } else {
            if (array.length >= 3) listOfArrays.push(array);
            candy1 = candy2;
            array = [candy1];
        }
    }
    if (array.length >= 3) listOfArrays.push(array);
}
    




    // quái đánh mới có cần tham số x, người đánh thì khỏi truyền
    if (x != undefined) return listOfArrays
    // ko có viên nào liên tiếp trùng src thì nghỉ khỏe, dừng hàm ngay
    if (listOfArrays.length == 0) {  //boardPointt.click = true
        // boardPointt.remainingTurns += 1       
        useTurn(); 
        // useTurn(timer); 
        return
    }


    // --------------------------------
    // Phần II: các viên cờ giao nhau thì sẽ tạo thành ô 3x. nổ 4 viên chéo kề cạnh nó
    let temp3x = new Set()
    // 3x:     
    for (let i = 0; i < listOfArrays.length; i++) {
        let setI = new Set(listOfArrays[i]); // Chuyển mảng i thành Set
        for (let j = i + 1; j < listOfArrays.length; j++) {
            let setJ = new Set(listOfArrays[j]); // Chuyển mảng j thành Set
            [...setI].forEach(candy =>
                setJ.has(candy)? temp3x.add(candy): 1
            ); 
        }
    }
    temp3x = [...temp3x] //Array.from(intersectionCandy);
    var tTurns3x = temp3x.length
    temp3x.forEach(tile => prepareBoom(tile, 3));

    // --------------------------------------
    // Phần III: xem tạo đc bao nhiêu viên 4x
    var tTurns4x = new Set(), temp4x = []
    temp4x = listOfArrays.filter(array => array.length >= 4);
    temp4x.forEach(array => {
        let duplicate = array.some(candy => temp3x.includes(candy));
        if (!duplicate) { // trùng thì bỏ
            // sẽ tạo ra viên 4x ở nơi mình vừa ghép
            let checkTiles = [otherTile, currTile].filter(tile => array.includes(tile));
            let tile = checkTiles.length > 0 ? checkTiles[0] 
                : array[Math.floor(Math.random() * array.length)];
            tTurns4x.add(tile)
            // số truyền vào=       1:dọc, 2: ngang, 3: 3x
            var a = +array[0].id.split('-')[0]
            var b = +array[1].id.split('-')[0]
            prepareBoom(tile, a == b ? 1 : 2)
        }
    });
    // startG = 0 là khởi đầu, có tạo đc 100 lượt thì cũng ko đc tính
    if (boardPointt.start == false) {
        // let pointArr = new Set()
        boardPointt.remainingTurns += tTurns3x + [...tTurns4x].length
        // listOfArrays.forEach(i=>{
        //     i.forEach(y=>{
        //         pointArr.add(y)
        //     })
        // })
        // pointArr = [...pointArr]
        // // console.log(pointArr)
        // for (var  i = 0; i < pointArr.length; i++) {
        //     Object.keys(pointChess).forEach(key => {
        //         // console.log(pointArr[i].src, pointArr[i].src.includes(key))
        //         pointArr[i].src.includes(key)? (pointChess[key]++): 1
        //         // pointArr[i].src.includes(key)? (console.log(key, pointChess[key]),pointChess[key]++): 1
        //     });
        // }

    }

    // --------------------
    // kiểm tra xem có viên nào trong listOfArrays chứa boom 3x hay 4x ko, 
    // vì muốn nó tạo hiệu ứng chớp nháy trong 1 giây
    function checkBoom() {
        for (var i = 0; i < listOfArrays.length; i++) {
            var hi = listOfArrays[i].some(item => item.filterr != 'undefined')
            if (hi) return true
        }
    }; 
    var timeBling = 0
    if (checkBoom()) {blingAnimation(listOfArrays, 1)}
    // truyền 1 là vì nó listOfArrays là mảng kép [[1,2],[3,4]]
    // truyền khác 1 là với mảng thường [1,2,3,4]
    // đây là hàm tạo hiệu ứng cho viên nổ
    function blingAnimation(arrayBling, x) {
        timeBling = 1000
        var array = new Set()
        for (var i = 0; i < arrayBling.length; i++) {
            if (x == 1) {
                arrayBling[i].forEach(item => {
                    if (item.filterr != 'undefined') {array.add(item)}
                })
            } else {
                if (arrayBling[i].filterr != 'undefined') {array.add(arrayBling[i])}
            }
        }; 
        array = [... array]
        array.forEach(image=>{
            image.classList.add('blink'); // Thêm class để bắt đầu hiệu ứng chớp nháy
            image.style.transition = 'opacity 0.5s ease'; // Đặt transition thành 0.5s
            setTimeout(()=>{
                image.classList.remove('blink');
                image.style.transition = 'box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out';
                // image.style.transition = 'all 0.3s ease-in-out';
            }, timeBling)
        })
    }
    
    // đem nổ những viên nổ trước khi xóa các viên thường, timebling là 
    // tgian chờ nếu có 
    setTimeout(()=>{
        timeBling = 0
        for (var i = 0; i < listOfArrays.length; i++) {
            listOfArrays[i].forEach(item =>{boomExplode(item)})
        }
    }, timeBling)

    // 1 viên sẽ có các thuộc tính sau
    // dataset.symbol      undefined với viến thường,   ngang/dọc/3x3 với viên nổ
    // class[1] offboom là trang thái bthuong, 
    // delete là để đánh dấu để chắc chắn ko bị xóa lần 2 3, 
    // onboom là đánh dấu viên nổ bị nổ lan. 
    // mục tiêu là xử onboom và quy về offboom
    setTimeout(()=>{
        for (var i = 0; i < listOfArrays.length; i++) {
            listOfArrays[i].forEach((item, index) => {
                // nãy nổ viên boom r, giờ nổ viên thường
                if (item.classList[1] == 'offBoom') {nổChuyền(item)}
                // tới viên cuối cùng sẽ kiểm tra đợt cuối, coi còn boom thì nổ tiếp, 
                // xong thực hiện rơi cờ
                if (i ==listOfArrays.length-1 &&index==listOfArrays[i].length-1){
                    setTimeout(()=>{handleBoom()}, 750);
                    // setTimeout(()=>{handleBoom()}, 350);
                }
            });
        }
    }, 750 + timeBling)
// }, 350 + timeBling)

    // hàm chuyên lựa các viên boom để nổ
    function boomExplode(item) {
        var b = item.filterr; if (b != 'undefined') {nổChuyền(item, b)}    
    }
    function handleBoom() {
        // kiểm tra có các viên onBoom còn sót lại ko
        var onBoo = document.querySelectorAll(".onBoom")
        onBoo = [...onBoo]
        if (onBoo.length > 0) {
            // có thì làm hiệu ứng cho viên đó
            blingAnimation(onBoo)
            setTimeout(() => {
                onBoo.forEach((item, index) => {
                    // nếu có thì đem nổ từng viên
                    boomExplode(item);
                    if (index === onBoo.length - 1) {
                        // viên cuối sẽ chờ 350ms để kiểm tra coi quá trình nổ có 
                        // nổ trúng viên boom ko. các viên đều nổ 300ms
                        setTimeout(() => {
                            var onBoo = document.querySelectorAll(".onBoom")
                            onBoo = [...onBoo]
                            if (onBoo.length > 0) {
                                blingAnimation(onBoo, 2)
                                setTimeout(() => {
                                    timeBling = 0; handleBoom()
                                }, timeBling)
                            } else { handsome() }
                        }, 750)
                    // }, 350)
                    }
                })
            }, timeBling);
        } else {handsome()} // ko có thì sang rơi cờ
    }
} // vẫn có khả năng 1 giây r chạy luôn !!!
function handsome() {
    // tạo ra các viên nổ
    filterPic(); filterPicArray = []; 
    // setUp lại cho lượt chơi sau
    listOfArrays = []; otherTile = undefined; currTile = undefined; pointArr = new Set()
    
    
    // getPoint.clear()
    // tính điểm dame để trừ máu --------------------
    // if (boardPointt.currentTurn === 'character') {
    //     attackInGame(numDame, monsterInGame) // nhân vật đánh trừ máu quái
    // } else {
    //     attackInGame(numDame, characterInGame) // quái đánh trừ máu nhân vật
    // }
    // numDame = 0

    // set các viên delete thành num ----------------
    var onBoo = document.querySelectorAll(".deleted")
    onBoo.forEach(item => item.classList.replace(item.classList[1], 'offBoom'))

    // cộng điểm
    if (boardPointt.currentTurn == 'Nhân vật') {
        Object.keys(pointChess).forEach(key => {
            key == 'water' && pointChess[key] > 0 ? (gameObj.map.charr.upMana(pointChess[key]), pointChess[key] = 0): 1
            key == 'heart' && pointChess[key] > 0? (gameObj.map.charr.upHp(pointChess[key]), pointChess[key] = 0): 1
            key == 'yingyang' && pointChess[key] > 0? (gameObj.map.charr.upArmorCur(pointChess[key]), pointChess[key] = 0): 1
            key == 'sword' && pointChess[key] > 0? (gameObj.map.charr.fight(gameObj.map.monn, 0, pointChess[key]), pointChess[key] = 0): 1
        });
    }
    updateInfor()
    slideCandyBoard() // rơi cờ
}
let pointArr = new Set()
function nổChuyền(tile, type) {
    let [r, c] = tile.id.split("-").map(Number);
    // Nổ 4 ô chéo cho viên 3x3
    if (type === '3x3') {
        let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        directions.forEach(([dr, dc]) => {
            let nr = r + dr, nc = c + dc;
            if (nr>=0&&nr < hàng && nc>=0 &&nc<cột){changeClass_1(board[nr][nc])}
        });
    }

    // Nổ 2 ô trước và 2 ô sau cho viên ngang
    else if (type === 'Ngang') {
        let range = [-2, -1, 1, 2];
        range.forEach(dc => {
            let nc = c + dc;
            if (nc >= 0 && nc < cột) {changeClass_1(board[r][nc])}
        });
    }

    // Nổ 2 ô trên và 2 ô dưới cho viên dọc
    else if (type === 'Doc') {
        let range = [-2, -1, 1, 2];
        range.forEach(dr => {
            let nr = r + dr;
            if (nr >= 0 && nr < hàng) {changeClass_1(board[nr][c])}
        });
    } 
    deletee(tile) 
    
    function deletee(tile) {
        // đầu trận (startG = 0) thì ko tính điểm cho ai
        // if (startG != 0) {
        //     if (getPoint.has(tile)) {
        //     } else {
        //         getPoint.add(tile);
        //         if (boardPointt.currentTurn === "character") {
        //             getPoint2Turn(1, tile)
        //         } else {
        //             getPoint2Turn(2, tile)
        //         }
        //     }
        // } 

        tile.classList.replace(tile.classList[1], 'deleted');
        tile.filterr = 'undefined';
        // document.getElementById(`a${tile.id}`).remove();
        deleteFilter(tile); tile.style.opacity = 0;
        setTimeout(() => {
            tile.src = '../img/blank.png'; tile.style.opacity = 1;
        }, 300);
        setTimeout(() => {
            khoi("a"+ tile.id)
        }, 200);

        // ------------- cộng điểm
        if (!pointArr.has(tile)) {
            pointArr.add(tile)
            Object.keys(pointChess).forEach(key => {
                tile.src.includes(key) && tile.filterr != 'undefined' ? (pointChess[key] += 1.5)
                    : tile.src.includes(key) ? (pointChess[key]++) : 1
            });
        }

        
    }
    function changeClass_1(tile) {
        if (/Ngang|Doc|3x3/.test(tile.filterr)) {
            tile.classList.replace(tile.classList[1], 'onBoom');
        } else { deletee(tile)}
    }
}

var filterPicArray = []
// tạo hẳn viên boom, thay dataset và classList để nó thành 1 viên hoàn chỉnh
function filterPic() {
    filterPicArray.forEach(i=>{
        i.tile.src = i.src; i.tile.filterr = i.suffix
        i.tile.classList.replace(i.tile.classList[1], 'offBoom')
        createPic2(i.tile.id, i.suffix); 
    })
}
// bước này chỉ chuẩn bị thôi
function prepareBoom(tile, type) {  var src = tile.src
    suffix = type === 1 ? 'Doc' : type === 2 ? 'Ngang' : '3x3';
    filterPicArray.push({tile: tile, suffix: suffix, src: src})
}

// đổi filter 2 viên cho nhau
function changeFilter(curr, other) {
    // kiểm tra 2 viên có filter ko, ko trả null -----------
    const currPic2 = havePic2(curr.id); const otherPic2 = havePic2(other.id)
    function havePic2(box) {
        return document.getElementById("a" + 
        box).querySelector('img:nth-of-type(2)')
    }
    // ------------------------------------
    if (currPic2 && otherPic2) { // 2 bên đều có filter
        [currPic2.src, otherPic2.src] = [otherPic2.src, currPic2.src]
    } else if (!currPic2 && otherPic2){ // a ko filter, b có
        createPic2(curr.id); havePic2(curr.id).src = otherPic2.src; otherPic2.remove();
    } 
    else if (currPic2 && !otherPic2) { // a có, b ko filter
        createPic2(other.id); havePic2(other.id).src=currPic2.src; currPic2.remove();    
    }
}
// tạo cái thẻ div cho filter, ko truyền r là chỉ tạo, truyền là tạo hình ảnh cho filter 
function createPic2(tileId, r) {
    var x = getId("a" + tileId)
        x.insertAdjacentHTML('beforeend', `<img style="position:absolute; 
            z-index:2; width: 45px; height: 45px">`);
        x.querySelector('img:nth-of-type(2)').style.pointerEvents = 'none'
    if (r != undefined) x.querySelector('img:nth-of-type(2)').src = `../img/filter${r}.png`
}
// hàm tạm biệt filter
function deleteFilter(tile) {
    var x = getId("a"+tile.id)
    if (x.children.length > 1) {x.removeChild(x.children[1])}
}

// ---------------------------------------
// 12.
var slidePoint = 0
function slideCollumn(cot) {
    var arrayPic = []
    var arrayCol = []
        // for (var i = hàng - 1; i >= 0; i--) {
            for (var i = hàng; i >= 0; i--) {
            arrayPic.push(board[i][cot].id)
            arrayCol.push(`a${board[i][cot].id}`)
        }

    var go = arrayPic.slice(0, -1).findIndex(i => document.getElementById(i).src.includes("blank"))
    if (go != -1) {
        for (var i = 0; i < arrayPic.length - 1; i++) {
            if (document.getElementById(arrayPic[i]).src.includes('blank')) {
                document.getElementById(arrayCol[i]).style.zIndex = 1
                swapCandy(arrayPic[i], arrayPic[i + 1], 5, arrayPic[arrayPic.length - 1])
            }
        }
        setTimeout(() => {
            document.getElementById(arrayCol[i]).style.zIndex = 2
            slideCollumn(cot)
        }, 550)
    } else { slidePoint++ } // ko có viên trống thì ++
}
function swapCandy(arrayPicI, arrayPicI1, aa, oo) {
    var currTile = document.getElementById(arrayPicI)
    var otherTile = document.getElementById(arrayPicI1)
    aa!= undefined ? document.getElementById(oo).src = randomCandy(): 1
    
    var ii = getBox(arrayPicI).style.top
    getBox(arrayPicI).style.top= getBox(arrayPicI1).style.top
    getBox(arrayPicI1).style.top= ii

    var yy = getBox(arrayPicI).style.left
    getBox(arrayPicI).style.left= getBox(arrayPicI1).style.left
    getBox(arrayPicI1).style.left= yy

   // Lưu phần tử trước khi thay đổi
let firstElement = getBox(arrayPicI);
let secondElement = getBox(arrayPicI1);

// Hoán đổi id
let tempId = firstElement.id;
firstElement.id = secondElement.id;
secondElement.id = tempId;

    // ------------ đổi id ảnh
    [currTile.id, otherTile.id] = [otherTile.id, currTile.id];
    // // -----------
    let [r1, c1] = currTile.id.split("-").map(Number);
    let [r2, c2] = otherTile.id.split("-").map(Number);
    [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];
}
function slideCandyBoard() { // ✨
    // gọi hàm rơi cờ cho tất cảc cá cột
    for (var i = 0; i < cột; i++) { slideCollumn(i) } 
    var slideLoop = setInterval(function () {
        if (slidePoint == cột) {
            // nếu đủ rồi thì dừng vòng lặp, set slidePoint về 0
            clearInterval(slideLoop); slidePoint = 0
            // tùy cờ đã đầy nhưng nếu có các ô liên tiếp trùng src, lại nổ tiếp
            if (checkValid()) {setTimeout(()=>destroyCandy(), 100)} 
            else {
                if (boardPointt.start == true) {
                    boardPointt.click = true
                    boardPointt.start = false
                    startTime()
                } else if (boardPointt.currentTurn == "Nhân vật") {
                    if (boardPointt.remainingTurns == 1) {
                        if (gameObj.map.monn.hpCur <= 0) {
                            setTimeout(()=>{
                                scene.input.keyboard.emit('keydown-C');
                                
                            }, 500)
                        } else {
                            setTimeout(()=>{
                                useTurn() 
                            }, 500)
                        }
                    } else {
                        setTimeout(()=>{
                            boardPointt.click = true
                            useTurn() 
                        }, 500)
                    }
                }
            }
            // else {
            //     // setTimeout(() => {
            //     //     // hiển thị máu và mana 2 bên đã mất hay tăng sau giao tranh
            //     //     display_InfoChar_Mon();
            //     //     if (startG == 0) {
            //     //         // chỉ khi vào trận, nếu đầu trận mà có thể nổ cờ, 
            //     //         // thì cờ đó ko thuộc về ai. sau đó mới bắt đầu chơi
            //     //         startG++; startTurn()

            //     //     } else { checkBattleResult()? 2:endTurn() }
            //     //     // những lần chơi về sau, mỗi khi rớt cờ xong, kiểm tra ai thua,
            //     //     //  hoặc ko ai thua thì chuyển lượt ng kia
            //     // }, 200)
            // }
        }
    }, 20)
}

var arrayNameCandy = ['yingyang', "heart", "water", "sword"]
var goldMe = 0, soulRockMe = 0, numDame = 0
function getPoint2Turn(x, tileSrc) {
    var y = tileSrc.filterr != 'undefined'
    if (x == 1) { // me
        var goldSoulRockFound = ['gold', 'soulRock'].some((name, index) =>{
            if (tileSrc.src.includes(name)) {
                switch (index) {
                    case 0: {
                        var num = 7; y == true? num = num * 1.5: 0
                        goldMe += num
                        goldMe = +goldMe.toFixed(1);
                        break;
                    }
                    case 1: {
                        var num = 0.5; y == true? num = num * 1.5: 0
                        soulRockMe += num
                        soulRockMe = +soulRockMe.toFixed(1);
                        break;
                    }
                }
                return true; // Dừng lại khi tìm thấy phần tử phù hợp
            }
        })
        if (goldSoulRockFound) {return}
        arrayNameCandy.some((name, index) =>{
            if (tileSrc.src.includes(name)) {
                switch (index) {
                    case 0: {
                        var num = parseInt((characterInGame.getmaxHealth() / 14) / 3)
                        y == true? num = num * 1.5: 0
                        armorTwo(characterInGame, num)
                        break;
                    }
                    case 1: {
                        var num =  parseInt((characterInGame.getmaxHealth() / 8) / 3)
                        y == true? num = num * 1.5: 0
                        healthTwo(characterInGame, num)
                        break;
                    }
                    case 2: {
                        var num = 11
                        y == true? num = num * 1.5: 0
                        manaTwo(characterInGame, num)
                        break;
                    }
                    case 3: {
                        var num = characterInGame.maxDame /3
                        y == true? num = num * 1.5: 0
                        numDame += num
                        break;
                    }
                }
                return true; // Dừng lại khi tìm thấy phần tử phù hợp
            }
        })
    } else {
        var goldSoulRockFound = ['gold', 'soulRock'].some( name =>{
            if (tileSrc.src.includes(name)) {return true}
        })
        if (goldSoulRockFound) {return}
        arrayNameCandy.some((name, index) =>{
            if (tileSrc.src.includes(name)) {
                switch (index) {
                    case 0: {
                        var num = parseInt((monsterInGame.getmaxHealth() / 14) / 3)
                        y == true? num = num * 1.5: 0
                        armorTwo(monsterInGame, num)
                        break;
                    }
                    case 1: {
                        var num = parseInt((monsterInGame.getmaxHealth() / 8) / 3)
                        y == true? num = num * 1.5: 0
                        healthTwo(monsterInGame, num)
                        break;
                    }
                    case 2: {
                        var num = 11
                        y == true? num = num * 1.5: 0
                        manaTwo(monsterInGame, 11)
                        break;
                    }
                    case 3: {
                        var num = monsterInGame.maxDame / 3 
                        y == true? num = num * 1.5: 0
                        numDame += num
                        break;
                    }
                }
                return true; // Dừng lại khi tìm thấy phần tử phù hợp
            }
        })
    }
}



//4. kiểm tra xem có tạo đc 4 viên liên tiếp ko
// kiểm tra xem có tạo đc 3 viên liên tiếp ko
function canSwap() {
    // hoán đổi src và filter giả lập, rồi trả về cũ
    function changeSrcTest(condition, r, c, y, z) {
        if (condition) {
            // hàm hoán đổi src
            function mimi() {
                [board[r][c].src, board[r + y][c + z].src] =
                    [board[r + y][c + z].src, board[r][c].src];
                // 2. đổi symbolClass img cho nhau
                [board[r][c].filterr, board[r + y][c + z].filterr] =
                    [board[r + y][c + z].filterr, board[r][c].filterr];
                // 3. đổi ảnh Filter cho nhau
                changeFilter(board[r][c], board[r + y][c + z]);
            };

            // function swapCandy(arrayPicI, arrayPicI1, aa, oo) {
            //     var currTile = document.getElementById(arrayPicI)
            //     var otherTile = document.getElementById(arrayPicI1)
            //     aa!= undefined ? document.getElementById(oo).src = randomCandy(): 1
                
            //     var ii = getBox(arrayPicI).style.top
            //     getBox(arrayPicI).style.top= getBox(arrayPicI1).style.top
            //     getBox(arrayPicI1).style.top= ii
            
            //     var yy = getBox(arrayPicI).style.left
            //     getBox(arrayPicI).style.left= getBox(arrayPicI1).style.left
            //     getBox(arrayPicI1).style.left= yy
            
            //    // Lưu phần tử trước khi thay đổi
            // let firstElement = getBox(arrayPicI);
            // let secondElement = getBox(arrayPicI1);
            
            // // Hoán đổi id
            // let tempId = firstElement.id;
            // firstElement.id = secondElement.id;
            // secondElement.id = tempId;
            
            //     // ------------ đổi id ảnh
            //     [currTile.id, otherTile.id] = [otherTile.id, currTile.id];
            //     // // -----------
            //     let [r1, c1] = currTile.id.split("-").map(Number);
            //     let [r2, c2] = otherTile.id.split("-").map(Number);
            //     [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];
            // }

            mimi(); var i = checkValid(); mimi()
            return i ? true : false
        }
    }
    for (var r = 0; r < hàng; r++) {
        for (var c = 0; c < cột; c++) { /**xuống*/ /**phải */
            var i = changeSrcTest(r + 1 < hàng, r, c, 1, 0);
            var z = changeSrcTest(c + 1 < cột, r, c, 0, 1);
            if (i == true || z == true) return true
        }
    }
    return false
}
function reCreate() {
    for (let r = 0; r <= hàng; r++) {
        for (let c = 0; c < cột; c++) {
            board[r][c].src = '../img/blank.png'
            deleteFilter(board[r][c])
            board[r][c].filterr = 'undefined'
            board[r][c].classList.add("fc", 'offBoom');
        };
    }
    setTimeout(()=>{slideCandyBoard()},3000)
}







const turnInfo = document.getElementById("turn-info");

        const timerDisplay = document.getElementById("timer");

        const remainingTurnsDisplay = document.getElementById("remaining-turns");

function startTime() {

    boardPointt.timer = 5;

    boardPointt.remainingTurns = 1;

    boardPointt.currentTurn = Math.random() < 0.5 ? "Nhân vật" : "Quái";
    if (boardPointt.start == true && boardPointt.currentTurn == "Nhân vật") {
        boardPointt.start = false
        boardPointt.click = true
    }

    updateTurnInfo();



    startCountdown();

    updateRemainingTurns();

}

function updateTurnInfo() {

    turnInfo.textContent = `Lượt của: ${boardPointt.currentTurn}`;
    boardPointt.currentTurn == "Quái"?  turnInfo.style.color = 'red'
        : turnInfo.style.color = 'green';

}

function updateRemainingTurns() {

    remainingTurnsDisplay.textContent = `Số lượt còn lại: ${boardPointt.remainingTurns}`;

}
function startCountdown() {

    timerDisplay.textContent = `Thời gian: ${boardPointt.timer} giây`;

    boardPointt.countdown = setInterval(() => {

        boardPointt.timer--;
        timerDisplay.textContent = `Thời gian: ${boardPointt.timer} giây`;

        if (boardPointt.timer <= 0) {
            clearInterval(boardPointt.countdown)
            setTimeout(()=>{
                if (boardPointt.currentTurn == "Quái" && boardPointt.remainingTurns == 1) {
                    boardPointt.click = true
                } else if (boardPointt.currentTurn == "Nhân vật"  && boardPointt.remainingTurns >= 1) {
                    boardPointt.click = boardPointt.remainingTurns == 1? false: true
                    if (currTile != undefined) {
                        focus(currTile, 'fc', 2, 0); 
                        otherTile = undefined; currTile = undefined;
                    }
                }
                useTurn()
            },1000)

        }

    }, 1000);

}

function useTurn(aa) {
    // console.log(boardPointt.remainingTurns)

    clearInterval(boardPointt.countdown);

    if (boardPointt.remainingTurns > 0) {

        boardPointt.remainingTurns--;
    // console.log(boardPointt.remainingTurns)


        updateRemainingTurns()
        // aa == undefined? updateboardPointt.RemainingTurns(): 1

        if (boardPointt.remainingTurns === 0) {
            boardPointt.timer = aa != undefined? aa: 5

            switchTurn()

        } else {
            boardPointt.timer = aa != undefined? aa: 5
            startCountdown()

        }

    }

}

function switchTurn() {

    boardPointt.currentTurn = boardPointt.currentTurn === "Nhân vật" ? "Quái" : "Nhân vật";

    boardPointt.remainingTurns = 1;

    updateTurnInfo();

    updateRemainingTurns();

   

    startCountdown();

}


function khoi(a) {
    
    const container = document.getElementById(a);
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    let circleCount = 20; // Start with 20 circles
    

    function createCircle() {
      if (circleCount <= 0) return;
      
      const circle = document.createElement('div');
      circle.classList.add('circle');
    
      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
    
      circle.style.setProperty('--dx', dx);
      circle.style.setProperty('--dy', dy);
      circle.style.left = `${centerX - 5}px`; // Adjust for circle size (10px)
      circle.style.top = `${centerY - 5}px`;
    
      container.appendChild(circle);
    
      // Remove circle after animation and reduce count
      circle.addEventListener('animationend', () => {
        circle.remove();
        circleCount--;
      });
    }
    
    // Generate initial circles
    for (let i = 0; i < 20; i++) {
      setTimeout(createCircle, i * 25); // Spread initial creation over time
    }
}
function endBattle() {
    document.getElementById("skill-btn").style.display = 'none'
    document.getElementById("surrender-btn").style.display = 'none'
    document.getElementById("board-Time").style.display = 'none'
    document.getElementById("board").style.display = 'none'
    document.querySelectorAll(".game-containerBattle .stats").forEach(element => {
        element.style.display = 'none';
    });
}
// endBattle()
const skillsButton = document.getElementById('skill-btn');
const skillsPopup = document.getElementById('skillsPopup');
const skillDescription = document.getElementById('skillDescription');
const skillPointsDisplay = document.getElementById('skillPoints');
const chooseButtonSkill = document.getElementById('chooseButton');
var manaPointsDisplay
var manaPointsDisplay2
var manaPointsDisplay3

// Cập nhật tên kỹ năng bên ngoài
function updateSkillNames() {
    document.getElementById('skill1Name').textContent = gameObj.map.charr.skill.S1.name
    document.getElementById('skill2Name').textContent = gameObj.map.charr.skill.S2.name
    document.getElementById('skill3Name').textContent = gameObj.map.charr.skill.S3.name
}

// Hiển thị mô tả khi chọn kỹ năng
function showSkillDescription(skillIndex) {
    chooseButtonSkill.classList.remove('active');
    const skill = gameObj.map.charr.skill[`S${skillIndex}`]
    skillDescription.innerHTML = `<h3>${skill.name} - Cấp độ ${skill.level}</h3>
    
<p>${skill.description}</p>
<span id="manaPoints3">Mana: <span id="manaPoints">50</span>/<span id="manaPoints2">50</span></span>
`;

chooseButtonSkill.classList.add('active');
  chooseButtonSkill.disabled = gameObj.map.charr.manaCur < skill.mana;
  chooseButtonSkill.onclick = () => chooseSkill(skillIndex, gameObj.map.charr, gameObj.map.monn)
{/* <button onclick="levelUpSkill(${skillIndex})" id="levelUpButton">Cộng điểm kỹ năng</button> */}
    // updateLevelUpButton(); // Cập nhật nút sau mỗi lần chọn kỹ năng
    manaPointsDisplay = document.getElementById('manaPoints');
    manaPointsDisplay2 = document.getElementById('manaPoints2');
    manaPointsDisplay3 = document.getElementById('manaPoints3');
    manaPointsDisplay.textContent = +gameObj.map.charr.manaCur.toFixed(2)
    manaPointsDisplay2.textContent = skill.mana
    gameObj.map.charr.manaCur >= skill.mana? manaPointsDisplay3.classList.add("manaPointGreen")
        :manaPointsDisplay3.classList.add("manaPointRed")
}

// Nâng cấp kỹ năng
function levelUpSkill(skillIndex) {
    if (skillPoints > 0) {
        skills[skillIndex].level++;
        skillPoints--;
        skillPointsDisplay.textContent = `Điểm Kỹ Năng: ${skillPoints}`;
        showSkillDescription(skillIndex); // Cập nhật lại mô tả sau khi nâng cấp
    } else {
        alert('Không đủ điểm kỹ năng!');
    }
    // updateLevelUpButton(); // Cập nhật trạng thái của nút "Cộng điểm kỹ năng"
}

// Cập nhật trạng thái của nút "Cộng điểm kỹ năng"
function updateLevelUpButton() {
    const levelUpButton = document.getElementById('levelUpButton');
    if (skillPoints === 0) {
        levelUpButton.disabled = true;
    } else {
        levelUpButton.disabled = false;
    }
}

// Ẩn bảng kỹ năng
function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove('active');
    chooseButtonSkill.classList.remove('active');

    skillDescription.innerHTML = `<p>Chọn kỹ năng để xem mô tả.</p>`;
    // document.getElementById("choose-btn-skill").style.display = 'none'
}

// Hiển thị bảng kỹ năng
skillsButton.addEventListener('click', () => {
    skillsPopup.classList.add('active');
    updateSkillNames(); // Cập nhật tên kỹ năng khi bảng hiện
});

// Chọn kỹ năng
function chooseSkill(skillIndex, thi, thi2) {
    const skill = gameObj.map.charr.skill[`S${skillIndex}`]
    if (gameObj.map.charr.manaCur >= skill.mana) {
        gameObj.map.charr.manaCur -= skill.mana;

        //   manaPointsDisplay.textContent = manaPoints;
        hidePopup('skillsPopup');
        Object.keys(skill).forEach(item => {
            // this.dame += item.dame || 0;
            item == 'armorCur' ? (thi.armorCur += skill[item] || 0,
                thi.armorCur = +thi.armorCur.toFixed(2)
            ) : 1
            item == 'hpCur' ? (thi.hpCur += skill[item] || 0,
                thi.hpCur = +thi.hpCur.toFixed(2)
            ) : 1
            if ((skill[item] || 0) != 0 && item == 'dame') { thi.fight(thi2, skill[item]) }
            this.dodge += item.dodge || 0;
        });
        updateInfor()


        boardPointt.click = undefined
        clearInterval(countdown);

        if (currTile != undefined) {
            focus(currTile, 'fc', 2, 0);
            otherTile = undefined; currTile = undefined;
        }
        setTimeout(() => { useTurn() }, 2000)
    }
}
// Gán sự kiện cho các kỹ năng
document.getElementById('skill1').addEventListener('click', () => showSkillDescription(1, gameObj.map.charr, gameObj.map.monn));
document.getElementById('skill2').addEventListener('click', () => showSkillDescription(2, gameObj.map.charr, gameObj.map.monn));
document.getElementById('skill3').addEventListener('click', () => showSkillDescription(3, gameObj.map.charr, gameObj.map.monn));