const config = {
    type: Phaser.AUTO,
    // width: 800,
    // height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    dom: {
        createContainer: true, // Kích hoạt DOM container
    },
    width: window.innerWidth,       // Chiều rộng của màn hình
    height: window.innerHeight,     // Chiều cao của màn hình
    scale: {
        mode: Phaser.Scale.FIT,     // Chế độ co giãn hình ảnh vừa vặn với màn hình
        autoCenter: Phaser.Scale.CENTER_BOTH, // Căn giữa trên màn hình
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let oo 
const game = new Phaser.Game(config);

let gameObj = { // gameObj.
    // map
    "map":{

        player: 0, body: 0, weapon: 0, mount: 0, pet: 0, wing: 0,
        playerNameText: 0, monstersBody: [], monContainerArr: [], characterContainer: [],
        monsters: [], chairs: [], obstacles: [], // Chướng ngại vật tĩnh
        cursors: 0, winGame: null,
    
        C: 1,
        width: 1300, height: 800,
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
    this.load.image('player', './img/blank.png');
    this.load.image('monster', 'https://labs.phaser.io/assets/sprites/monkey.png');
    this.load.image('chair', 'https://labs.phaser.io/assets/sprites/chair.png');
    this.load.image('obstacle', 'https://labs.phaser.io/assets/sprites/block.png');  // Chướng ngại vật tĩnh


    // this.load.image('frame1', 'path/to/frame1.png');
    this.load.image('frame1', './img/ha11.png');
    this.load.image('frame2', './img/ha22.png');
    this.load.image('frame3', './img/ha33.png');
    // trang phục nam
    this.load.image('frame4', './img/ha44.png');
    this.load.image('frame5', './img/ha55.png');
    this.load.image('frame6', './img/ha66.png');


    // nũ
    // this.load.image('frame1', 'path/to/frame1.png');
    this.load.image('frame7', './img/ha140.png');
    this.load.image('frame8', './img/ha150.png');
    this.load.image('frame9', './img/ha160.png');
    // trang phục nữ
    this.load.image('frame10', './img/ha99.png');
    this.load.image('frame11', './img/ha77.png');
    this.load.image('frame12', './img/ha88.png');
    this.load.image('arrow', 'https://labs.phaser.io/assets/sprites/arrow.png');
    // vũ khí hoả
    this.load.image('frame13', './img/ha170.png');
    this.load.image('frame14', './img/ha180.png');
    this.load.image('frame15', './img/ha190.png');
    // // vũ khí thủy
    // this.load.image('frame13', './img/ha170.png');
    // this.load.image('frame14', './img/ha180.png');
    // this.load.image('frame15', './img/ha190.png');
    // // vũ khí mộc
    // this.load.image('frame13', './img/ha170.png');
    // this.load.image('frame14', './img/ha180.png');
    // this.load.image('frame15', './img/ha190.png');
    // // vũ khí kim
    // this.load.image('frame13', './img/ha170.png');
    // this.load.image('frame14', './img/ha180.png');
    // this.load.image('frame15', './img/ha190.png');
    // // vũ khí thổ
    // this.load.image('frame13', './img/ha170.png');
    // this.load.image('frame14', './img/ha180.png');
    // this.load.image('frame15', './img/ha190.png');
    // vũ khí cánh
    this.load.image('frame28', './img/ha320.png');
    this.load.image('frame29', './img/ha330.png');
    this.load.image('frame30', './img/ha340.png');
    // thú cưỡi
    this.load.image('frame31', './img/ha350.png');
    this.load.image('frame32', './img/ha360.png');
    this.load.image('frame33', './img/ha370.png');
    // pet
    this.load.image('frame34', './img/ha380.png');
    this.load.image('frame35', './img/ha390.png');
    this.load.image('frame36', './img/ha400.png');
    // nhà
    this.load.image('house1', './img/ha401.png');
    this.load.image('house2', './img/ha402.png');


    // Tải sprite sheet
    // this.load.atlas('boyNuz', './img/boiNuzNuz.png', './img/boiNuz.json');

}

function create() {
    oo = this
    this.physics.world.setBounds(0, 0, gameObj.map.width, gameObj.map.height);
    createAnimations(this)
    createChar(this)
 
    this.input.keyboard.on('keydown-H', () => {
        gameObj.map.indicator.visible ? console.log(gameObj.map.monsterPresent.obj) : console.log("koo")
    });


   // Overlay nền đen  0xffc0cb
   this.overlay = this.add.rectangle(400, 300, 800, 600, 0x000000)
   .setAlpha(0)
   .setDepth(16)
   .setOrigin(0.5)
   .setVisible(true).disableInteractive();
//    .disableBody(true, true);
  
   
// .setInteractive(false);  // Đảm bảo setInteractive được kích hoạt với hand cursor (con trỏ chuột)
// .setInteractive({ useHandCursor: true });  // Đảm bảo setInteractive được kích hoạt với hand cursor (con trỏ chuột)

// Nền xanh
this.tempBackground = this.add.rectangle(
    this.cameras.main.centerX, // Tâm ngang của màn hình
    this.cameras.main.centerY, // Tâm dọc của màn hình
    this.cameras.main.width,   // Độ rộng màn hình
    this.cameras.main.height,  // Độ cao màn hình
    0x0000FF                   // Màu xanh (hex)
)
   .setDepth(10)
   .setOrigin(0.5)
   .setVisible(false).disableInteractive();
//    .disableBody(true, true);
// .setInteractive(true);  // Nền xanh không tương tác khi chưa chuyển map

// Text loading
this.loadingText = this.add.text(400, 300, 'Đang tải...', {
   fontSize: '24px',
   fill: '#ffffff'
}).setOrigin(0.5).setDepth(17).setVisible(false).disableInteractive();
// .disableBody(true, true);

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
            monster.isAlive = true
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
            //   gameObj.map.characterContainer = this.add.container(400, 300, [body, hat, shirt]);

            // Add physics body for the entire character
            monBody = this.physics.add.existing(monContainer);
            monContainer.body.setSize(40, 50).setCollideWorldBounds(true);


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
        console.log("huhu")
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
    // mini map
    // {
    // // Minimap setup
    // // Tạo minimap ở góc trái trên
    // minimap = this.add.graphics().setDepth(13)

    // // Vẽ viền và nền minimap
    // minimap.lineStyle(4, 0xffffff, 1);  // Viền minimap
    // minimap.strokeRect(20, 20, 160, 120);  // Vẽ hình chữ nhật viền cho minimap

    // // Nền mờ cho minimap
    // minimap.fillStyle(0x000000, 0.5);  // Màu nền mờ
    // minimap.fillRect(20, 20, 160, 120);  // Nền minimap

    // // Vẽ Player trên minimap (hình tròn)
    // minimap.clear();  // Xóa đồ họa trước khi vẽ lại
    // minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    // minimap.setScrollFactor(0);
    
    
    // // minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player (phóng đại tỷ lệ)

    // // Vẽ Monsters trên minimap (hình tròn)
    // // monsters.forEach(monster => {
    // //     minimap.fillStyle(0xff0000, 1);  // Màu cho monster (màu đỏ)
    // //     minimap.fillCircle(monster.x / 4 + 20, monster.y / 4 + 20, 5);  // Vẽ hình tròn cho monster (phóng đại tỷ lệ)
    // // });


    // // Vẽ player (chỉ vẽ nếu player nằm trong phạm vi minimap)
    // if (gameObj.map.player.x >= 0 && gameObj.map.player.x <= 640 && gameObj.map.player.y >= 0 && gameObj.map.player.y <= 480) {
    //     minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    //     minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player
    // }

    // // Vẽ quái trên minimap (hình tròn đỏ, chỉ vẽ nếu quái nằm trong phạm vi minimap)
    // for (let i = 0; i < gameObj.map.monsters.length; i++) {
    //     let enemy = gameObj.map.monsters[i];

    //     if (enemy.x >= 0 && enemy.x <= 640 && enemy.y >= 0 && enemy.y <= 480) {
    //         minimap.fillStyle(0xff0000, 1);  // Màu cho quái (đỏ)
    //         minimap.fillCircle(enemy.x / 4 + 20, enemy.y / 4 + 20, 5);  // Vẽ hình tròn cho quái
    //     }
    // }}
    // Tỷ lệ thu nhỏ minimap (ví dụ: bản đồ chính lớn hơn minimap 4 lần)
    const scale = 3;



    // ----------------------------------
    // Vẽ minimap
    // minimap = this.add.graphics().setDepth(13);
    // minimap.setScrollFactor(0);
    
    // // Hàm cập nhật minimap
    // this.events.on('update', () => {
    //     // Xóa đồ họa minimap trước đó
    //     minimap.clear();
    
    //     // Lấy thông tin vùng chơi và nhân vật
    
    //     // Vị trí của minimap (trung tâm minimap là vị trí của nhân vật)
    //     const centerX = gameObj.map.player.x;
    //     const centerY = gameObj.map.player.y;
    
    //     // Tính toán vùng minimap hiển thị (trung tâm là nhân vật)
    //     const startX = Math.max(0, centerX - (160 * scale) / 2); // 160 là chiều rộng minimap
    //     const startY = Math.max(0, centerY - (120 * scale) / 2); // 120 là chiều cao minimap
    //     const endX = Math.min(gameObj.map.width, centerX + (160 * scale) / 2);
    //     const endY = Math.min(gameObj.map.height, centerY + (120 * scale) / 2);
    
    //     // Vẽ nền và viền minimap
    //     minimap.lineStyle(4, 0xffffff, 1);
    //     minimap.strokeRect(20, 20, 160, 120); // Kích thước minimap
    //     minimap.fillStyle(0x000000, 0.5);
    //     minimap.fillRect(20, 20, 160, 120);
    
    //     // Vẽ player (trung tâm minimap)
    //     minimap.fillStyle(0x00ff00, 1); // Màu xanh cho player
    //     minimap.fillCircle(20 + (centerX - startX) / scale, 20 + (centerY - startY) / scale, 5);
    
    //     // Vẽ quái trong vùng minimap
    //     gameObj.map.monsters.forEach(monster => {
    //         if (
    //             monster.x >= startX &&
    //             monster.x <= endX &&
    //             monster.y >= startY &&
    //             monster.y <= endY
    //         ) {
    //             minimap.fillStyle(0xff0000, 1); // Màu đỏ cho quái
    //             minimap.fillCircle(
    //                 20 + (monster.x - startX) / scale,
    //                 20 + (monster.y - startY) / scale,
    //                 3
    //             );
    //         }
    //     });
    // });
    

     // Thiết lập camera chính
    //  this.cameras.main.setBounds(0, 0, gameObj.map.width, gameObj.map.height);
    //  this.physics.world.setBounds(0, 0, gameObj.map.width, gameObj.map.height);
 
    let minimap
    { // ok  nè minimapminimap
     // Tạo minimap camera
     minimap = this.cameras.add(10, 10, 150, 100) // Vị trí và kích thước minimap (x, y, width, height)
         .setZoom(0.3) // Thu nhỏ tỷ lệ (tùy chỉnh theo kích thước bản đồ)
         .setScroll(0, 0) // Vị trí góc nhìn của minimap 

         .setBackgroundColor(0x000000) // Màu nền minimap
        
 
     // Giới hạn minimap camera trong vùng bản đồ
     minimap.setBounds(0, 0, gameObj.map.width, gameObj.map.height);

    minimap.startFollow(gameObj.map.player); // Camera minimap theo dõi nhân vật
 
     // Hiển thị khung bao quanh minimap
    //  const frame = this.add.rectangle(110, 85, 210, 160, 0xffffff)
    //      .setDepth(1000) // Đảm bảo hiển thị trên minimap
    //      .setOrigin(0.5, 0.5)
    //      .setStrokeStyle(2, 0x000000);
  // Tạo khung bao quanh minimap
  this.minimapFrame = this.add.graphics();
  this.minimapFrame.lineStyle(3, 0xffffff); // Đường viền trắng
  this.minimapFrame.strokeRect(10, 10, 150, 100); // Vẽ khung bao quanh minimap
  this.minimapFrame.setScrollFactor(0).disableInteractive().setDepth(9)
  minimap.ignore(this.minimapFrame);

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
        const obstacle = this.physics.add.staticImage(500 + i * 200, 300, 'house' + (i+1));
        obstacle.setSize(80, 100)
            obstacle.setScale(0.725);
            obstacle.setOrigin(0.5, 0.5);
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

    // Lưu vị trí ban đầu từ nhân vật hiện tại
    
    this.isAtCorner = false
    // vào trận và out trận
    this.input.keyboard.on('keydown-M', () => {
        if (this.isAtCorner) {
        
            clearInterval(boardPointt.countdown)
            document.querySelector(".overlayBl").classList.toggle("hiddennn")
            setTimeout(()=>{
                document.querySelector(".overlayBl").classList.toggle("hiddennn")
                  // Trả nhân vật về vị trí ban đầu
            if (gameObj.map.winGame == true) {
              

                gameObj.map.monsterPresent.isAlive = false
                gameObj.map.monsterPresent.setPosition(-1000, -1000);
                setTimeout(()=>{
                    gameObj.map.monsterPresent.isAlive = true;
                    gameObj.map.monsterPresent.setPosition( gameObj.map.monsterPresent.initialPosition.x,  gameObj.map.monsterPresent.initialPosition.y);
                }, 180000) 
            } else {
                gameObj.map.monsterPresent.setPosition( gameObj.map.monsterPresent.initialPosition.x,  gameObj.map.monsterPresent.initialPosition.y);
            }
            enddBattle(this)
            gameObj.map.winGame = null
            
        
            gameObj.map.player.setPosition( gameObj.map.player.initialPosition.x,  gameObj.map.player.initialPosition.y);
            this.cameras.main.stopFollow(gameObj.map.player);
            document.getElementById("toggle-menu").classList.toggle("hiddennn")
    

    document.querySelector(".overlayBl").classList.toggle("hiddennn")
    this.tempBackground.setVisible(false)
        
        }, 500)

            setTimeout(()=>{
                document.querySelector(".overlayBl").classList.toggle("hiddennn")
                setTimeout(()=>{
                    this.input.keyboard.emit('keydown-A');
                }, 1500)
                this.cameras.main.startFollow(gameObj.map.player, true, 0.1, 0.1)
            }, 3000)
        } else {
           

            document.getElementById("toggle-menu").classList.toggle("hiddennn")
    
            createBattleUI()
    this.input.keyboard.emit('keydown-A');

    document.querySelector(".overlayBl").classList.toggle("hiddennn")
    setTimeout(()=>{

        // document.querySelector(".overlayVio").classList.toggle("hiddennn")
        this.tempBackground.setVisible(true)
        gameObj.map.player.initialPosition = { x: gameObj.map.player.x, y: gameObj.map.player.y };
        gameObj.map.monsterPresent.initialPosition = { x: gameObj.map.monsterPresent.x, y: gameObj.map.monsterPresent.y };
        this.cameras.main.stopFollow();
        const camera = this.cameras.main; // Camera hiện tại
        // ------------

// --------------
        const newX = camera.scrollX + 20; // Tọa độ map dựa trên góc trái màn hình
        const newY = camera.scrollY + camera.height - 30; // Góc dưới màn hình
        const newX2 = camera.scrollX + camera.width - 20
        minimap.setPosition(-200, -200);
        gameObj.map.player.setPosition(newX, newY);
        gameObj.map.monsterPresent.setPosition(newX2, newY);


        gameObj.map.monContainerArr[gameObj.map.monsters.indexOf(gameObj.map.monsterPresent)].setPosition(gameObj.map.monsterPresent.x, gameObj.map.monsterPresent.y);

        gameObj.map.monsterPresent.flipX = true
        gameObj.map.monContainerArr[gameObj.map.monsters.indexOf(gameObj.map.monsterPresent)].setScale(-1, 1);
        gameObj.map.player.flipX = false
        gameObj.map.characterContainer.setScale(1, 1);
    }, 500)
    setTimeout(()=>{

        document.querySelector(".overlayBl").classList.toggle("hiddennn")
        joinBattle()
        document.getElementById("battle-ui").style.display = "block"
        updateInfor()
        setTimeout(()=>{
            startGame()
        }, 1500)
    }, 3000)
   
        // -------------------------
       
          

        }

        // Đổi trạng thái
        this.isAtCorner = !this.isAtCorner;
    });


}
function iii() {
    oo.input.keyboard.emit('keydown-M');
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



    //   const hat = scene.add.sprite(0, -30, 'hat');
    //   hat.setSize(40, 50)
    //   const shirt = scene.add.sprite(0, 20, 'shirt');
    //   shirt.setSize(40, 50)

    // tạo mũi tên trên đầu quái
    gameObj.map.indicator = scene.add.image(0, 0, 'arrow').setOrigin(0.5, 0.5).setDepth(12)

    // Group character parts into a container
    gameObj.map.characterContainer = scene.add.container(400, 300, [gameObj.map.body, gameObj.map.weapon, gameObj.map.mount, gameObj.map.pet]);
    gameObj.map.characterContainer.setDepth(12)
    //   gameObj.map.characterContainer = scene.add.container(400, 300, [body, hat, shirt]);

    // Add physics body for the entire character
    characterBody = scene.physics.add.existing(gameObj.map.characterContainer);
    gameObj.map.characterContainer.body.setSize(40, 50) // .setCollideWorldBounds(true);

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
        // ------------------ camera
         // Cấu hình camera để theo dõi nhân vật
         scene.cameras.main.startFollow(gameObj.map.player, true, 0.1, 0.1)

         scene.cameras.main.setBounds(0, 0, 1600, 1200);

   


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

    scene.overlay.setVisible(true)

    // 1. Bắt đầu fade-out
    scene.tweens.add({
        targets: scene.overlay,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
            // 2. Hiển thị loading
            scene.loadingText.setVisible(true)
            scene.tempBackground.setVisible(true)

            // 3. Chuyển map sau khi loading
            scene.time.delayedCall(2500, () => {
                scene.loadingText.setVisible(false)

                // 4. Fade-in
                scene.tweens.add({
                    targets: scene.overlay,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
                        scene.overlay.setVisible(false)

                        // Góc dưới bên phải (screenWidth - 10, screenHeight - 10):
                        const cameraX = scene.cameras.main.scrollX;
                        const cameraY = scene.cameras.main.scrollY;
                        const screenWidth = scene.cameras.main.width;
                        const screenHeight = scene.cameras.main.height;

                        joinBattle()
                        document.getElementById("battle-ui").style.display = "block"
                        updateInfor()

                    }
                });
            });
        }
    });
}

function transitionMapOut(scene) {

    
    scene.overlay.setVisible(true)
    // 1. Bắt đầu fade-out
    scene.tweens.add({
        targets: scene.overlay,
        alpha: 1,
        duration: 1000,
        onComplete: () => {
             // 2. Hiển thị loading
             scene.loadingText.setVisible(true)
             scene.tempBackground.setVisible(false)
 
            enddBattle(scene)
            // 3. Chuyển map sau khi loading
            scene.time.delayedCall(2500, () => {
                // scene.loadingText.setVisible(false)
                scene.loadingText.setVisible(false)
                // 4. Fade-in
                scene.tweens.add({
                    targets: scene.overlay,
                    alpha: 0,
                    duration: 1000,
                    onComplete: () => {
    document.querySelector(".characterContainer").style.display = "flex"

                        scene.overlay.setVisible(false)
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
    // Xóa phần tử
    element.remove();

    boardPointt.start = true;
    boardPointt.click= false;
    boardPointt.currentTurn= '';
    boardPointt.remainingTurns = 1,
    boardPointt.timer = 5;
    boardPointt.countdown= 0;
    board = []; listOfArrays = []
    currTile = undefined, otherTile = undefined
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

    // {

    //     // // Cập nhật minimap
    //     // Tạo minimap ở góc trái trên
    //     minimap.clear(); // Xóa đồ họa trước khi vẽ lại
    
    //     // Vẽ viền và nền minimap
    //     minimap.lineStyle(4, 0xffffff, 1);  // Viền minimap
    //     minimap.strokeRect(20, 20, 160, 120);  // Vẽ hình chữ nhật viền cho minimap
    
    //     // Nền mờ cho minimap
    //     minimap.fillStyle(0x000000, 0.5);  // Màu nền mờ
    //     minimap.fillRect(20, 20, 160, 120);  // Nền minimap
    // if (gameObj.map.player.x >= 0 && gameObj.map.player.x <= 640 && gameObj.map.player.y >= 0 && gameObj.map.player.y <= 480) {
    //     minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    //     minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player
    // }

    // // Vẽ quái trên minimap (hình tròn đỏ, chỉ vẽ nếu quái nằm trong phạm vi minimap)
    // for (let i = 0; i < gameObj.map.monsters.length; i++) {
    //     let enemy = gameObj.map.monsters[i];

    //     if (enemy.x >= 0 && enemy.x <= 640 && enemy.y >= 0 && enemy.y <= 480) {
    //         minimap.fillStyle(0xff0000, 1);  // Màu cho quái (đỏ)
    //         minimap.fillCircle(enemy.x / 4 + 20, enemy.y / 4 + 20, 5);  // Vẽ hình tròn cho quái
    //     }
    // }
    // } minimapminimap


    

    // Vẽ Player trên minimap (hình tròn)
    // minimap.fillStyle(0x00ff00, 1);  // Màu cho player (màu xanh)
    // minimap.fillCircle(gameObj.map.player.x / 4 + 20, gameObj.map.player.y / 4 + 20, 5);  // Vẽ hình tròn cho player (phóng đại tỷ lệ)

    // // Vẽ Monsters trên minimap (hình tròn)
    // monsters.forEach(monster => {
    //     minimap.fillStyle(0xff0000, 1);  // Màu cho monster (màu đỏ)
    //     minimap.fillCircle(monster.x / 4 + 20, monster.y / 4 + 20, 5);  // Vẽ hình tròn cho monster (phóng đại tỷ lệ)
    // });


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
    let mon =gameObj.map.monsters[0].obj.inf // gameObj.map.monsterPresent.obj.inf
    gameObj.map.monn = new Character(mon)
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
        let a = i == 0? gameObj.map.charr.obj: gameObj.map.monn.obj
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

var board = [], hàng = 10, cột = 8, listOfArrays = []
var currTile = undefined, otherTile = undefined
var fiveBlock = 'https://github.com/kun18911/gameBenhVienQuyDu/blob/main/asset/./img/bomb5.png?raw=true'
var blank = 'https://github.com/ImKennyYip/candy-crush/blob/master/images/blank.png?raw=true'
var normal_Class = ['gold', 'yingyang', 'heart', 'sword', 'water', 'soulRock']
var srcValue = []; function createTag(x) {return document.createElement(x)}
function getId(x) {return document.getElementById(x)}
function getBox(x) {return document.getElementById(`a${x}`)}
function getPic(x) {return document.getElementById(x)}
function getFill(x) {return document.getElementById(`a${x}`).querySelector('img:nth-of-type(2)')}
function srcSymbol(x) {return x.dataset.symbolSSrc}


function checkValid() {
    const checkMatch = (candy1, candy2, candy3) =>
        candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes('blank');

    // Kiểm tra hàng và cột
    for (let i = 1; i <= hàng; i++) {
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
    return `./img/${normal_Class[Math.floor(Math.random() * normal_Class.length)]}.png`
}

const square45 = 32.5 // 45
var boardPointt = {
    // battle game
    start: true,
    click: false,
    currentTurn: '',
    remainingTurns: 1,
    timer: 5,
    countdown: 0,
    
    get turnInfo() {return document.getElementById("turn-info")},

    get timerDisplay () {return  document.getElementById("timer")},

    get remainingTurnsDisplay () {return  document.getElementById("remaining-turns")}
}
function startGame() {
    var board_table = document.getElementById("boardd");
    // tạo 64 viên chính ------------
    for (let r = 0; r <= hàng; r++) {
        let row = [];   for (let c = 0; c < cột; c++) { mainTile(r, c, row) };   board.push(row);
    }
    function mainTile(r, c, row) {
        // --------------- tạo thẻ cha, ảnh 1, ảnh 2
        let tileDad = createTag("div"), tile = createTag("img"), fill = createTag("img")
        tileDad.style.top = `${square45 * r - square45}px`
        tileDad.style.left = `${square45 * c}px`
        tileDad.classList.add('fc', 'tileDad'); tileDad.id = `a${r}-${c}`;
        // ---------------
        // tile.src = './img/blank.png'; 
        tile.src = randomCandy();
        tile.classList.add("fc", 'offBoom'); tile.id = `${r}-${c}`;
        tile.filterr = 'undefined'; tile.onclick = click_Affect; row.push(tile); 
        // ----------------
        fill.src = './img/none.png'; fill.style.pointerEvents = 'none'; fill.style.zIndex = 3
        // --------------- 
        board_table.appendChild(tileDad).appendChild(tile); tileDad.appendChild(fill);  
        return tile;
    }    
    // -----------------------

    // startG có nghĩa là báo hiệu đầu game
    // if (boardPointt.start == true) {
    //     if (checkValid()) { setTimeout(() => { destroyCandy() }, 1000) }
    //     else {
    //         // ko thì kiểm tra có nước đi khả thi ko
    //         if (canSwap() ) {
    //             setTimeout(() => { startTime() }, 500)                
    //         } else { reCreate() } 
    //     }
    // }
}
  

// đơn giản là click vào ô thì tạo hiệu ứng cho ô dễ nhìn
const focus = (tile, cls, time) => { setTimeout(()=>{ getBox(tile.id).classList.toggle(cls) }, time) }
function click_Affect() {
    if (boardPointt.click && boardPointt.currentTurn == "Nhân vật") {
        boardPointt.click = false; currTile = this; focus(currTile, 'focus', 0); 
    } else // click chính nó
        if (boardPointt.click == false && this == currTile && boardPointt.currentTurn == "Nhân vật") { 
        focus(this, 'outFocus', 0); focus(this, 'outFocus', 800); 
        useTurn(boardPointt.timer) 

    } else // click lần 2 nếu làlà ô khác nó sẽ hoán đổi cờ 
        if (boardPointt.click == false && this != currTile && boardPointt.currentTurn == "Nhân vật") { 
        boardPointt.click = undefined; otherTile = this;
        focus(otherTile, 'outFocus', 0); focus(otherTile, 'outFocus', 1200); focus(currTile, 'focus', 100); 
        clearInterval(boardPointt.countdown);
        setTimeout(() => checkAdjacency(), 400); 
        
    } 
}
// click xong kiểm tra kề cạnh
function checkAdjacency() { 
    // ------------- nếu 1 trong 2 src là blank thì dừng hàm. say bye
    if (currTile.src.includes('blank') || otherTile.src.includes('blank')) return;

    const [r1, c1] = currTile.id.split("-").map(Number), [r2, c2] = otherTile.id.split("-").map(Number);
    // nếu click vào ô kề cạnh thì hoán đổi
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
        swapCandy(currTile.id, otherTile.id)
        setTimeout(() => { destroyCandy() }, 400)
    } else { useTurn(boardPointt.timer) } // click bậy
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
    for (let r = 1; r <= hàng; r++) {
        let row = board[r];
        let candy1 = row[0], array = [candy1];
        for (let c = 1; c < cột; c++) {
            let candy2 = row[c];
            if (candy1.src === candy2.src && !candy1.src.includes('blank')) { array.push(candy2) }
            else {
                if (array.length >= 3) listOfArrays.push(array);
                candy1 = candy2; array = [candy1];
            }
        }
        if (array.length >= 3) listOfArrays.push(array);
    }
    for (let c = 0; c < cột; c++) {
        let column = board.map(row => row[c]);
        let candy1 = column[1], array = [candy1];
        for (let r = 2; r <= hàng; r++) {
            let candy2 = column[r];
            if (candy1.src === candy2.src && !candy1.src.includes('blank')) { array.push(candy2) }
            else {
                if (array.length >= 3) listOfArrays.push(array);
                candy1 = candy2; array = [candy1];
            }
        }
        if (array.length >= 3) listOfArrays.push(array);
    }

    // quái đánh mới có cần tham số x, người đánh thì khỏi truyền
    if (x != undefined) return listOfArrays
    // ko có viên nào liên tiếp trùng src thì nghỉ khỏe, dừng hàm ngay
    if (listOfArrays.length == 0) { // boardPointt.click = true
        useTurn();
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
                setJ.has(candy) ? temp3x.add(candy) : 1
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

    if (boardPointt.start == false) { boardPointt.remainingTurns += tTurns3x + [...tTurns4x].length }

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
    if (checkBoom()) { blingAnimation(listOfArrays, 1) }
    // truyền 1 là vì nó listOfArrays là mảng kép [[1,2],[3,4]]
    // truyền khác 1 là với mảng thường [1,2,3,4]
    // đây là hàm tạo hiệu ứng cho viên nổ
    function blingAnimation(arrayBling, x) {
        timeBling = 1000
        var array = new Set()
        for (var i = 0; i < arrayBling.length; i++) {
            if (x == 1) {
                arrayBling[i].forEach(item => {
                    if (item.filterr != 'undefined') { array.add(item) }
                })
            } else {
                if (arrayBling[i].filterr != 'undefined') { array.add(arrayBling[i]) }
            }
        };
        array = [...array]
        array.forEach(image => {
            image.classList.add('blink'); // Thêm class để bắt đầu hiệu ứng chớp nháy
            image.style.transition = 'opacity 0.5s ease'; // Đặt transition thành 0.5s
            setTimeout(() => {
                image.classList.remove('blink');
                image.style.transition = 'box-shadow 0.3s ease-in-out, opacity 0.3s ease-in-out';
                // image.style.transition = 'all 0.3s ease-in-out';
            }, timeBling)
        })
    }

    // đem nổ những viên nổ trước khi xóa các viên thường, timebling là 
    // tgian chờ nếu có 
    setTimeout(() => {
        timeBling = 0
        for (var i = 0; i < listOfArrays.length; i++) {
            listOfArrays[i].forEach(item => { boomExplode(item) })
        }
    }, timeBling)

    // 1 viên sẽ có các thuộc tính sau
    // dataset.symbol      undefined với viến thường,   ngang/dọc/3x3 với viên nổ
    // class[1] offboom là trang thái bthuong, 
    // delete là để đánh dấu để chắc chắn ko bị xóa lần 2 3, 
    // onboom là đánh dấu viên nổ bị nổ lan. 
    // mục tiêu là xử onboom và quy về offboom
    setTimeout(() => {
        for (var i = 0; i < listOfArrays.length; i++) {
            listOfArrays[i].forEach((item, index) => {
                // nãy nổ viên boom r, giờ nổ viên thường
                if (item.classList[1] == 'offBoom') { nổChuyền(item) }
                // tới viên cuối cùng sẽ kiểm tra đợt cuối, coi còn boom thì nổ tiếp, 
                // xong thực hiện rơi cờ
                if (i == listOfArrays.length - 1 && index == listOfArrays[i].length - 1) {
                    setTimeout(() => { handleBoom() }, 750);
                    // setTimeout(()=>{handleBoom()}, 350);
                }
            });
        }
    }, 750 + timeBling)
    // }, 350 + timeBling)

    // hàm chuyên lựa các viên boom để nổ
    function boomExplode(item) {
        var b = item.filterr; if (b != 'undefined') { nổChuyền(item, b) }
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
        } else { handsome() } // ko có thì sang rơi cờ
    }
} // vẫn có khả năng 1 giây r chạy luôn !!!
function handsome() {
    filterPic(); // tạo ra các viên nổ
    // setUp lại cho lượt chơi sau
    listOfArrays = []; otherTile = undefined; currTile = undefined; pointArr = new Set()
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
            key == 'soulRock' && pointChess[key] > 0? (gameObj.map.charr.upSoulRockT(pointChess[key], gameObj.map.monn), pointChess[key] = 0): 1
            key == 'gold' && pointChess[key] > 0? (gameObj.map.charr.upGold(pointChess[key]), pointChess[key] = 0): 1
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
            if (nr>0&&nr <=hàng && nc>=0 &&nc<cột){changeClass_1(board[nr][nc])}
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
            if (nr > 0 && nr <= hàng) {changeClass_1(board[nr][c])}
        });
    } 
    deletee(tile) 
    
    function deletee(tile) {
        tile.classList.replace(tile.classList[1], 'deleted');
        tile.filterr = 'undefined';
        // document.getElementById(`a${tile.id}`).remove();
        getFill(tile.id).src = './img/none.png'; tile.style.opacity = 0;
        setTimeout(() => {
            tile.src = './img/blank.png'; tile.style.opacity = 1;
        }, 250);
        setTimeout(() => {
            khoi("a"+ tile.id)
        }, 150);

        // ------------- cộng điểm
        if (!pointArr.has(tile) && boardPointt.start == false) {
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
// bước này chỉ chuẩn bị thôi
function prepareBoom(tile, type) {  var src = tile.src
    suffix = type === 1 ? 'Doc' : type === 2 ? 'Ngang' : '3x3';
    filterPicArray.push({tile: tile, suffix: suffix, src: src})
}


// ---------------------------------------
// 12.
var slidePoint = 0
function slideCollumn(cot) {
    var arrayPic = []
    for (var i = hàng; i >= 0; i--) { arrayPic.push(board[i][cot].id) }

    var go = arrayPic.slice(0, -1).findIndex(i => document.getElementById(i).src.includes("blank"))
    if (go != -1) {
        for (var i = 0; i < arrayPic.length - 1; i++) {
            if (document.getElementById(arrayPic[i]).src.includes('blank')) {
                getBox(arrayPic[i]).style.zIndex = 1
                swapCandy(arrayPic[i], arrayPic[i + 1], 5, arrayPic[arrayPic.length - 1])
            }
        }
        setTimeout(() => { getBox(arrayPic[i]).style.zIndex = 2; slideCollumn(cot) }, 250)
    } else { slidePoint++ } // ko có viên trống thì ++
}
function swapCandy(arrayPicI, arrayPicI1, aa, oo) {
    // aa!= undefined ? document.getElementById(oo).src = randomCandy(): 1
    // swapBox(arrayPicI, arrayPicI1, 'top'); swapBox(arrayPicI, arrayPicI1, 'leftleft')

    // swapId(`a${arrayPicI}`, `a${arrayPicI}`); swapId(arrayPicI, arrayPicI)
    // // -----------
    // let [r1, c1] = document.getElementById(arrayPicI).id.split("-").map(Number);
    // let [r2, c2] = document.getElementById(arrayPicI1).id.split("-").map(Number);
    // [board[r1][c1], board[r2][c2]] = [board[r2][c2], board[r1][c1]];

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
                if (boardPointt.start == true) { startTime() }  
                else if (boardPointt.currentTurn == "Nhân vật") {
                    if (gameObj.map.monn.obj.hpCur <= 0) {
                        gameObj.map.charr.gainExp(gameObj.map.monn, true)
                        clearInterval(boardPointt.countdown)
                        setTimeout(() => { oo.input.keyboard.emit('keydown-C') }, 500)
                    } else { setTimeout(()=>{ useTurn() }, 500) }
                }
            }
        }
    }, 20)
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
                const currPic2 = getFill(board[r][c].id), otherPic2 = getFill(board[r + y][c + z].id)
                // [currPic2.src, otherPic2.src] = [otherPic2.src, currPic2.src]
                let tempSrc = currPic2.src;
                currPic2.src = otherPic2.src; otherPic2.src = tempSrc;
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
    for (var r = 1; r <= hàng; r++) {
        for (var c = 0; c < cột; c++) { /**xuống*/ /**phải */
            var i = changeSrcTest(r + 1 < hàng, r, c, 1, 0);
            var z = changeSrcTest(c + 1 < cột, r, c, 0, 1);
            if (i == true || z == true) return true
        }
    }
    return false
}
function reCreate() {
    clearInterval(boardPointt.countdown);
    for (let r = 1; r <= hàng; r++) {
        for (let c = 0; c < cột; c++) {
            board[r][c].src = './img/blank.png'
            getFill(board[r][c].id).src = './img/none.png'
            board[r][c].filterr = 'undefined'
            board[r][c].className = ''
            board[r][c].classList.add("fc", 'offBoom');
        };
    }
    setTimeout(()=>{slideCandyBoard()},1100)
}





const fiveLL = 5

function startTime() {
    boardPointt.timer = fiveLL; boardPointt.remainingTurns = 1;

    boardPointt.currentTurn = Math.random() < 0.5 ? "Nhân vật" : "Quái";
    if (boardPointt.currentTurn == "Nhân vật" && boardPointt.start == true) {
        boardPointt.start = false; boardPointt.click = true
    }

    updateTimeInfo()
    startCountdown();

}


function updateTimeInfo() {
        // boardPointt.remainingTurnsDisplay.style.display = 'block'
        boardPointt.remainingTurnsDisplay.textContent = `Số lượt còn lại: ${boardPointt.remainingTurns}` 

    boardPointt.turnInfo.textContent = `Lượt của: ${boardPointt.currentTurn}`;
    boardPointt.currentTurn == "Quái"?  boardPointt.turnInfo.style.color = 'red'
        : boardPointt.turnInfo.style.color = 'green';

    boardPointt.timerDisplay.textContent = `Thời gian: ${boardPointt.timer} giây`;
    
}
function startCountdown() {


    boardPointt.countdown = setInterval(() => {

        boardPointt.timer--;
        boardPointt.timerDisplay.textContent = `Thời gian: ${boardPointt.timer} giây`;

        if (boardPointt.timer == 0) {
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

// clearInterval(boardPointt.countdown);
function useTurn(aa) {
    clearInterval(boardPointt.countdown); boardPointt.click = undefined
    const time = aa != undefined ? 400 : 0
    setTimeout(() => {
        if (boardPointt.currentTurn == "Nhân vật") {
            if (aa == undefined) boardPointt.click = boardPointt.remainingTurns > 1 ? true : undefined
            else boardPointt.click = true
        } else {
            if (aa == undefined) boardPointt.click = boardPointt.remainingTurns > 1 ? undefined : true
            // else boardPointt.click = true
        }

        aa == undefined ? boardPointt.remainingTurns-- : 1

        if (boardPointt.remainingTurns === 0) { // đổi lượt
            boardPointt.currentTurn = boardPointt.currentTurn === "Nhân vật" ? "Quái" : "Nhân vật";
            boardPointt.remainingTurns = 1;
        }
        boardPointt.timer = aa != undefined ? aa : fiveLL
        updateTimeInfo(); startCountdown();
    }, time)
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
const skillDescription2 = document.getElementById('skillDescription');
const skillPointsDisplay2 = document.getElementById('skillPoints');
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
    skillDescription2.innerHTML = `<h3>${skill.name} - Cấp độ ${skill.level}</h3>
    
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
        skillPointsDisplay2.textContent = `Điểm Kỹ Năng: ${skillPoints}`;
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

    skillDescription2.innerHTML = `<p>Chọn kỹ năng để xem mô tả.</p>`;
    // document.getElementById("choose-btn-skill").style.display = 'none'
}

// Hiển thị bảng kỹ năng
// skillsButton.addEventListener('click', () => {
//     skillsPopup.classList.add('active');
//     updateSkillNames(); // Cập nhật tên kỹ năng khi bảng hiện
// });

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