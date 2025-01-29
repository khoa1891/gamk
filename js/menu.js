// document.querySelector(".menu-button").addEventListener("click", menuBtn)
// function menuBtn() {
//     document.getElementById("menu").classList.remove("hidden")
// }
let overlayB = 0, overlayBlack = document.querySelector(".overlayBlack")
// let pp = 0
function toggleMenuBoard() {
  // if (pp == 0) {iii(); pp++}
    document.querySelector(".menuBoard").classList.toggle("hiddennn")
    overlayBlack.classList.toggle("hiddennn")
}



    // Dữ liệu của nhân vật
// const character = {
//     avatar: "https://via.placeholder.com/100",
//     name: "Kun1891",
//     damage: "450",
//     health: "1200",
//     element: "Hệ Nước",
//     level: 1,
//     xu: 2000
// };

// Đổ dữ liệu vào thẻ HTML
const avatarDiv = document.querySelector('.avatarCard');
const infoDiv = document.querySelector('.infoCard');

  const excludedKeys = ['avatar',
    'armorCur', 'manaCur', 'manaMax', 'hpPoint', 'damePoint', 'armorPoint', 'dodgePoint',
    'S1p', 'S2p', 'S3p', 'equipment', 'soulRockT', 'xuT', 'potentialPoint', 'skillPoint', 'exp', 'hpCur'
];
function popupInfoAvtar() {
  const displayMap = {
    name: 'Tên',
        sec: 'Giới tính', // hoặc 'female'
        element: 'Hệ',
        xu: "Đồng", kc: 'Vàng',
        level: 'Cấp độ' , 
        dame: 'Tấn công', dodge: 'Né tránh',

        hpMax: 'Máu', armorMax : 'Giáp',
      soulRock: 'Hồn', 
};

function getExp(level) {
  if (level < 7) {
      return 650;
  } else if (level === 7) {
      return 800;
  } else if (level === 9) {
      return 950;
  } else if (level >= 20) {
      return 2600;
  } else {
      return 1000 + (level - 9) * 50; // Tăng dần theo cấp độ
  }
}
  let character = charInF.inf
  // Gán hình nền cho avatar
  avatarDiv.style.backgroundImage = `url('${character.avatar}')`;
  
  // Tạo nội dung thông tin
  for (const key in character) {
      if (!excludedKeys.includes(key)) {
          const p = document.createElement('p');
          
          if (key == 'level') { p.innerHTML = `<span>Cấp độ:</span> ${character[key]}___[${character['exp']}/${getExp(character['level'])}]`}
          else if (key == 'hpMax') { p.innerHTML = `<span>Máu:</span> ${character['hpCur']} / ${character['hpMax']}`}
          else {p.innerHTML = `<span>${displayMap[key]}:</span> ${character[key]}`;}
          infoDiv.appendChild(p);
      }
  }
}
// ---------

// -----------

function popupAvatar() {
  document.querySelector(".info-cardCont").classList.toggle("hiddennn")
  document.querySelector(".infoCard").innerHTML = ''
  popupInfoAvtar()
}

       
        let points = 10;
        function addPoint(stat) {
            if (points <= 0) return;
            const statValue = document.getElementById(`stat-${stat}`);
            const currentValue = parseInt(statValue.textContent);
            statValue.textContent = currentValue + 1;
            points--;
            document.getElementById("points").textContent = points;
            // Disable buttons if points reach 0
            if (points <= 0) {
                document.querySelectorAll(".btn-add").forEach(btn => btn.disabled = true);
            }
        }
    
      
        let oht = 6; // Số ô hiển thị
        let op = "all"; // Giá trị hiện tại của dropdown
const popupGear = document.getElementById("popupGear");
    const popupContentGear = document.getElementById("popup-contentGear");
    const useButtonGear = document.getElementById("use-buttonGear");
    const equipButtonGear = document.getElementById("equip-buttonGear");
    const buyButtonShop = document.getElementById("Buy-buttonShop");
    const closePopupGear = document.getElementById("close-popupGear");
    const slotAo = document.getElementById("slot-ao");
    const slotQuan = document.getElementById("slot-quan");
        const modalGearText = document.getElementById('modal-Gear-text');
        const tableContainer = document.getElementById('table-container');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownBtn = document.querySelector('.dropdown-btn');
        // document.querySelector('.container').style.display = 'none'
         let equipment = { áo: null, quần: null };
         
function toggleMenu5() {

    if (overlayB == 0) {
        document.getElementById("toggle-menu").style.zIndex = 9
        document.querySelector(".menuBoard").classList.toggle("hiddennn")

        overlayB = 1
    } else {
        document.getElementById("toggle-menu").style.zIndex = 11
        overlayB = 0
        overlayBlack.classList.toggle("hiddennn")
    }
    document.querySelector('.containerPotential').classList.toggle('hiddennn');
}

function toggleMenu6() {

  if (overlayB == 0) {
      document.getElementById("toggle-menu").style.zIndex = 9
      document.querySelector(".menuBoard").classList.toggle("hiddennn")

      overlayB = 1
  } else {
      document.getElementById("toggle-menu").style.zIndex = 11
      overlayB = 0
      overlayBlack.classList.toggle("hiddennn")
  }
  document.querySelector('.info-cardCont').classList.toggle('hiddennn');
}
        // Hiển thị bảng các ô
        function renderTable() {
            tableContainer.innerHTML = '';
            for (let i = 1; i <= oht; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `slot-${i}`
               cell.textContent = 'trống';
                // cell.textContent = i;
                tableContainer.appendChild(cell);
            }
            document.getElementById('dongg').innerText = gameObj.map.charr.obj.xu
        }
        function toggleMenu() {
            if (overlayB == 0) {
                document.getElementById("toggle-menu").style.zIndex = 9
                document.querySelector(".menuBoard").classList.toggle("hiddennn")
                overlayB = 1

            } else {
                document.getElementById("toggle-menu").style.zIndex = 11
                overlayB = 0
                overlayBlack.classList.toggle("hiddennn")
            }
            document.querySelector('.containerGear').classList.toggle('hiddennn');
            document.getElementById('dongg').innerText = gameObj.map.charr.obj.xu
            document.getElementById('vangg').innerText = gameObj.map.charr.obj.kc
        }
        function toggleMenu2() {
            if (overlayB == 0) {
                document.getElementById("toggle-menu").style.zIndex = 9
            document.querySelector(".menuBoard").classList.toggle("hiddennn")

                overlayB = 1
            } else {
                document.getElementById("toggle-menu").style.zIndex = 11
                overlayB = 0
                overlayBlack.classList.toggle("hiddennn")

                closeModal()
                popupGear.style.display = "none";
            }
            document.getElementById('equipmentContainer').classList.toggle('hiddennn');
        }
function toggleMenu3() {
    
            shop1Board()
        }
        // Thêm một ô mới
        function addCell() {
            let cost = 1000 + 500 * (oht - 6)
            document.querySelector('.question-box-Gear').style.display = 'block'
            document.querySelector('.question-text-Gear').textContent = `Bạn có muốn mua thêm ô, với giá ${cost} đồng không?`;
            // oht++;
            // renderTable();
        }
        function yesBtnCell() {
            document.querySelector('.question-box-Gear').style.display = 'none'
            document.querySelector('.modalGear').style.display = 'block'
            let cost = 1000 + 500 * (oht - 6)
            if (gameObj.map.charr.obj.xu >= cost) {
                gameObj.map.charr.obj.xu -= cost
                oht++;
               modalGearText.textContent = "Chúc mừng bạn đã mở thành công 1 ô mới!";
                modalGearText.className = "success";
                renderTable();
                displayInventory()
            } else {
                modalGearText.textContent = "Bạn không đủ đồng để mở thêm ô! ";
                modalGearText.className = "error";
            }
        }
        function noBtnCell() {
            document.querySelector('.question-box-Gear').style.display = 'none'
        }
        function closeModal() {
            document.querySelector('.modalGear').style.display = 'none'
        }
        // Hiển thị hoặc ẩn dropdown
        function toggleDropdown() {
            const isDisplayed = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isDisplayed ? 'none' : 'block';
        }
        // Chọn một tùy chọn trong dropdown
        function selectOption(value, text) {
            op = value;
            dropdownBtn.textContent = text;
            dropdownMenu.style.display = 'none';
        }
        // Khởi tạo bảng
        renderTable();
        // ---------------- trang bij
        // document.addEventListener('keydown', function (event) {
        //     if (event.key === 'c' || event.key === 'C') {
        //         const container = document.getElementById('equipmentContainer');
        //         container.classList.toggle('hiddennn');
        //     }
        // });
        // Close the equipment container when clicking the close button

       
    
    let a = [
      { loại: "hp", name: "máu 10", "số lượng": 2 },
       { loại: "mana", name: "mana 10", "số lượng": 100 },
      { loại: "áo", name: "áo xanh" },
      { loại: "quần", name: "quần đỏ" },
      { loại: "quần", name: "quần vàng" },
      { loại: "quần", name: "quần hồng" },
    ];
    let inventory = []; // Hành trang
    const maxSlots = 6; // Số ô tối đa trong hành trang
    function addItemToInventory(item) {
      if (item["số lượng"]) {
        // Xử lý vật phẩm có số lượng
        let existingItem = inventory.find((i) => i.name === item.name);
        if (existingItem) {
          // Nếu vật phẩm đã tồn tại, tăng số lượng
          let newTotal = existingItem["số lượng"] + item["số lượng"];
          existingItem["số lượng"] = Math.min(newTotal, 999);
        } else if (inventory.length < maxSlots) {
          // Thêm vật phẩm mới nếu còn chỗ
          item["số lượng"] = Math.min(item["số lượng"], 999);
          inventory.push(item);
        }
      } else {
        // Xử lý vật phẩm không có số lượng
        if (inventory.length < maxSlots) {
          inventory.push(item);
        }
      }
      displayInventory()
    }
    function displayInventory() {
      // Ưu tiên "hp" và "mana"
      inventory.sort((item1, item2) => {
        if ((item1.loại === "hp" || item1.loại === "mana") && !(item2.loại === "hp" || item2.loại === "mana")) {
          return -1;
        }
        if (!(item1.loại === "hp" || item1.loại === "mana") && (item2.loại === "hp" || item2.loại === "mana")) {
          return 1;
        }
        return 0;
      });
      // Hiển thị lên giao diệnmaxSlots
      for (let i = 0; i < maxSlots; i++) {
        let slot = document.getElementById(`slot-${i + 1}`);
        if (inventory[i]) {
          let item = inventory[i];
          slot.textContent = item["số lượng"] ? `${item.name} (x${item["số lượng"]})` : item.name;
          slot.onclick = () => showPopup(item, i, "inventory");
          slot.classList.remove("empty");
        } else {
          slot.textContent = "Trống";
          slot.classList.add("empty");
        }
      }
    }
    // Thêm vật phẩm thử nghiệm
    addItemToInventory(a[0]);
    addItemToInventory(a[1]);
    addItemToInventory(a[2]);
    addItemToInventory(a[3]);
    addItemToInventory(a[4]);
    addItemToInventory(a[5]);
    displayInventory();

    function showPopup(item, index, context, type) {
        if (type == undefined) {
            popupContentGear.innerHTML = `Tên: ${item.name}\nLoại: ${item.loại}\n` + 
          (item["số lượng"] ? `Số lượng: ${item["số lượng"]}\n` : "");
        } else {
            popupContentGear.textContent = `Tên: ${item.name}\nLoại: ${item.loại}\n` + 
            (item["số lượng"] ? `Số lượng: ${item["số lượng"]}\n` : "") + 
            (item["cost"] ? `Giá bán: ${item["cost"]} đồng` : "")
        }
      popupGear.style.display = "block";
      popupGear.style.left = "50%";
      popupGear.style.top = "50%";
      popupGear.style.transform = "translate(-50%, -50%)";
      if (context === "inventory") {
        if (item.loại === "áo" || item.loại === "quần") {
          equipButtonGear.style.display = "inline";
          equipButtonGear.onclick = () => equipItem(item, index);
          useButtonGear.style.display = "none";
          buyButtonShop.style.display = "none";
        } else {
            buyButtonShop.style.display = "none";
          equipButtonGear.style.display = "none";
          useButtonGear.style.display = "inline";
          useButtonGear.onclick = () => useItem(item, index);
        }
      } else if (context === "equipment") {
        equipButtonGear.style.display = "none";
        useButtonGear.style.display = "none";
        buyButtonShop.style.display = "none";
      } else if (context === "shop") {
        equipButtonGear.style.display = "none";
        useButtonGear.style.display = "none";
        buyButtonShop.style.display = "inline";
        buyButtonShop.onclick = () => buyShopPopUp(item)
      }
    }
    function closePopupMenu() {
      popupGear.style.display = "none";
    }
    function useItem(item, index) {
      if (item["số lượng"]) {
        item["số lượng"] -= 1;
        if (item["số lượng"] === 0) {
          inventory.splice(index, 1);
        }
        displayInventory();
        closePopupMenu();
      }
    }
    function displayEquipment() {
      if (equipment.áo) {
        slotAo.textContent = equipment.áo.name;
        slotAo.classList.remove("empty");
        slotAo.onclick = () => showPopup(equipment.áo, null, "equipment");
      } else {
        slotAo.textContent = "Áo";
        slotAo.classList.add("empty");
        slotAo.onclick = null;
      }
      if (equipment.quần) {
        slotQuan.textContent = equipment.quần.name;
        slotQuan.classList.remove("empty");
        slotQuan.onclick = () => showPopup(equipment.quần, null, "equipment");
      } else {
        slotQuan.textContent = "Quần";
        slotQuan.classList.add("empty");
        slotQuan.onclick = null;
      }
    }
    function equipItem(item, index) {
      const slot = item.loại === "áo" ? "áo" : "quần";
      if (equipment[slot]) {
        // Đưa trang bị cũ về hành trang
        inventory.splice(index, 1);
        inventory.splice(index, 0, equipment[slot]);
        equipment[slot] = item;
      } else {
          equipment[slot] = item;
          inventory.splice(index, 1);
      }
      displayInventory();
      displayEquipment();
      closePopupMenu();
    }
    closePopupGear.onclick = closePopupMenu;
    // document.addEventListener('keydown', function(event) {
    //     if (event.key === 'c' || event.key === 'C') {
    //         const container = document.getElementById('containerShop1');
    //         container.classList.toggle('hiddennn');
    //         renderTableShop()
    //     }
    // });
    document.addEventListener('keydown', function(event) {
        if (event.key === 's' || event.key === 'S') {
            const container = document.querySelector('.popup__contentSkill');
            container.classList.toggle('hiddennn');
        }
    });
    document.getElementById('closeBtnShop1').addEventListener('click', function () {
        const container = document.getElementById('containerShop1');
        container.classList.add('hiddennn');
        popupGear.style.display = "none";
    });
    let Shop1 = [
     { loại: "hp", name: "máu 10", "số lượng": 1, cost: 100},
      { loại: "mana", name: "mana 10", "số lượng": 1, cost: 100 },
     { loại: "áo", name: "áo xanh", cost: 700},
     { loại: "quần", name: "quần đỏ", cost: 550 },
     { loại: "quần", name: "quần vàng", cost: 1000 },
   ];
    function renderTableShop() {
        const container = document.getElementById("table-containerShop1")
            container.innerHTML = '';
            for (let i = 1; i <= Shop1.length; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `slotShop1-${i}`
            //    cell.textContent = 'trống';
                cell.textContent = Shop1[i-1].name
                container.appendChild(cell);
                cell.onclick = () => showPopup(Shop1[i-1], i - 1, "shop", 1);
            }
            document.getElementById('xuShop1').innerText = gameObj.map.charr.obj.xu
        }
function shop1Board() {
    const container = document.getElementById('containerShop1');
            container.classList.toggle('hiddennn');
            renderTableShop()
}
function buyShopPopUp(item) {
    document.querySelector(".question-box-Shop").style.display= 'block'
    popupGear.style.display = "none"
    document.querySelector(".question-text-Shop").innerText= `Bạn có muốn mua vật phẩm: ${item.name}, với giá ${item.cost} đồng không?`
    document.querySelector(".yes-btnShop").onclick = () => yesBtnShop(item)
}
 function yesBtnShop(item) {
            document.querySelector('.question-box-Shop').style.display = 'none'
            document.querySelector('.modalGear').style.display = 'block'
            let cost = item.cost
            if (gameObj.map.charr.obj.xu >= cost) {
                gameObj.map.charr.obj.xu -= cost
                 modalGearText.textContent = "Chúc mừng bạn đã mua thành công vật phẩm này";
                modalGearText.className = "success";
                document.getElementById('xuShop1').innerText = gameObj.map.charr.obj.xu
              //console.log(item)
              addItemToInventory(item);
            } else {
                modalGearText.textContent = "Bạn không đủ đồng để mua vật phẩm!";
                modalGearText.className = "error";
    }
}
function toggleMenu4() {

    if (overlayB == 0) {
        document.getElementById("toggle-menu").style.zIndex = 9
    document.querySelector(".menuBoard").classList.toggle("hiddennn")

        overlayB = 1
    } else {
        document.getElementById("toggle-menu").style.zIndex = 11
        overlayB = 0
        overlayBlack.classList.toggle("hiddennn")
    }
    document.querySelector('.popup__contentSkill').classList.toggle('hiddennn');

}
function toggleMenu42() {
  document.querySelector('.popup__contentSkill2').classList.toggle('hiddennn');
  document.getElementById("skillDescription22").innerHTML = 'Chạm kỹ năng để xem mô tả'

}
function noBtnShop() {
    document.querySelector('.question-box-Shop').style.display = 'none'

}