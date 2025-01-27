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
            y: child.y,
            animation: child.anims ? child.anims.currentAnim.key 
                : 'No animation' // Kiểm tra có animation hay không
        }))
    };
} 



function importContainerData(scene, containerData) {
    // Tạo lại container từ dữ liệu đã lưu
    const container = scene.add.container(containerData.x, containerData.y);
    // Tạo lại các sprite bên trong container
    containerData.children.forEach(child => {
        const sprite = scene.add.sprite(child.x, child.y, child.key);
        container.add(sprite);

        // Gán animation nếu có
        if (child.animation !== 'No animation') {
            sprite.anims.play(child.animation);
        }
    });
    return container;
}
// Hàm thay đổi quần áo
function changeShirt(newShirt) {
    shirt.setTexture('character', newShirt);
}