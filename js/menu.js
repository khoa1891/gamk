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
    'S1p', 'S2p', 'S3p', 'equipment', 'soulRockT', 'xuT', 'potentialPoint', 'skillPoint', 'exp', 
    'hpCur', 'equipment', 'inventory',  'skillPic'
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
          if (key=='sec') {p.innerHTML = `<span>Giới tính:</span> ${character[key] == 'male'? 'nam': 'nữ'}`}
          else if (key == 'level') { p.innerHTML = `<span>Cấp độ:</span> ${character[key]}___[${character['exp']}/${getExp(character['level'])}]`}
          else if (key == 'hpMax') { p.innerHTML = `<span>Máu:</span> ${character['hpCur']} / ${character['hpMax']}`}
          else {p.innerHTML = `<span>${displayMap[key]}:</span> ${character[key]}`;}
          infoDiv.appendChild(p);
      }
  }
}
// ---------

// -----------

function popupAvatar() {
  if (overlayB == 0) {
    document.getElementById("toggle-menu").style.zIndex = 9
    document.querySelector(".menuBoard").classList.toggle("hiddennn")
    overlayB = 1

} else {
    document.getElementById("toggle-menu").style.zIndex = 11
    overlayB = 0
    overlayBlack.classList.toggle("hiddennn")
}


  document.querySelector(".info-cardCont").classList.toggle("hiddennn")
  document.querySelector(".infoCard").innerHTML = ''
  popupInfoAvtar()
}

       
        function addPoint(stat) {
            if (gameObj.map.charr.obj.potentialPoint <= 0) return;
            const statValue = document.getElementById(`stat-${stat}`);
            gameObj.map.charr.obj[stat]++
            const currentValue = parseInt(statValue.textContent);
            statValue.textContent = currentValue + 1;
            gameObj.map.charr.obj.potentialPoint--;
            document.getElementById("pointPotential").textContent = gameObj.map.charr.obj.potentialPoint;

            gameObj.map.charr.setScore()
            // Disable buttons if gameObj.map.charr.obj.potentialPoint reach 0
            if (gameObj.map.charr.obj.potentialPoint <= 0) {
                document.querySelectorAll(".btn-add").forEach(btn => btn.disabled = true);
            }
        }
    
      
        // let oht = JSON.parse(localStorage.getItem("oht"))??6 ; // Số ô hiển thị
        let op = "all"; // Giá trị hiện tại của dropdown
const popupGear = document.getElementById("popupGear");
    const popupContentGear = document.getElementById("popup-contentGear");
    const useButtonGear = document.getElementById("use-buttonGear");
    const equipButtonGear = document.getElementById("equip-buttonGear");
    const buyButtonShop = document.getElementById("Buy-buttonShop");
    const closePopupGear = document.getElementById("close-popupGear");
    const slotAo = document.getElementById("slot-áo");
    const slotQuan = document.getElementById("slot-quần");
        const modalGearText = document.getElementById('modal-Gear-text');
        const tableContainer = document.getElementById('table-container');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const dropdownBtn = document.querySelector('.dropdown-btn');
        // document.querySelector('.container').style.display = 'none'
        //  let equipment = JSON.parse(localStorage.getItem("equipment")) ??{ áo: null, quần: null };
      
      
      // Object.keys(equipment).forEach(key => {
      //     if (equipment[key]) {  // Kiểm tra nếu không phải null
      //         displayEquipment(key);
      //     }
      // });
         
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
    document.getElementById("pointPotential").textContent = gameObj.map.charr.obj.potentialPoint
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
            for (let i = 1; i <= charInF.inf.oht; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `slot-${i}`
            cell.textContent = 'trống'
                // cell.textContent = i;
                tableContainer.appendChild(cell);
            }
            // document.getElementById('dongg').innerText = gameObj.map.charr.obj.xu
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
            // document.getElementById('dongg').innerText = gameObj.map.charr.obj.xu.toLocaleString('de-DE')
            // document.getElementById('vangg').innerText = gameObj.map.charr.obj.kc.toLocaleString('de-DE')
            displayInventory()
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


          Object.keys(charInF.inf.equipment).forEach(key => {
            if (charInF.inf.equipment[key]) {  // Kiểm tra nếu không phải null
              displayEquipment(key);
            }
          });
          gameObj.map.charr.setScore()
        }
function toggleMenu3() {
    
            shop1Board()
        }
        // Thêm một ô mới
        function addCell() {
            let cost = 1000 + 500 * (charInF.inf.oht - 6)
            document.querySelector('.question-box-Gear').style.display = 'block'
            document.querySelector('.question-text-Gear').textContent = `Bạn có muốn mua thêm ô, với giá ${cost} đồng không?`;
            // charInF.inf.oht++;
            // renderTable();
        }
        function yesBtnCell() {
            document.querySelector('.question-box-Gear').style.display = 'none'
            document.querySelector('.modalGear').style.display = 'block'
            let cost = 1000 + 500 * (charInF.inf.oht - 6)
            if (gameObj.map.charr.obj.xu >= cost) {
                gameObj.map.charr.obj.xu -= cost
                charInF.inf.oht++;
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
      { loại: "hp", name: "máu 10", "số lượng": 2, linkImg: './img/ha417.png'},
       { loại: "mana", name: "mana 10", "số lượng": 100, linkImg: './img/ha417.png' },
      { loại: "quần", name: "quần xanh", linkImg: './img/ha410.png', level: 1, dame:10, armorMax:10 },
      { loại: "áo", name: "áo đỏ", linkImg: './img/ha412.png', level: 1, dame:10, dodge:10 },
      { loại: "áo", name: "áo vàng", linkImg: './img/ha413.png', level: 1, dame:10, armorMax:10},
      { loại: "áo", name: "áo hồng", linkImg: './img/ha417.png', level: 1, dame:10, hpMax:10},
    ];
    // let inventory =  JSON.parse(localStorage.getItem('inventory'))??[]; // Hành trang
    ///////
    // const oht = 6; // Số ô tối đa trong hành trang
    function addItemToInventory(item) {
      if (item["số lượng"]) {
        // Xử lý vật phẩm có số lượng
        let existingItem = charInF.inf.inventory.find((i) => i.name === item.name);
        if (existingItem) {
          // Nếu vật phẩm đã tồn tại, tăng số lượng
          let newTotal = existingItem["số lượng"] + item["số lượng"];
          existingItem["số lượng"] = Math.min(newTotal, 999);
        } else if (charInF.inf.inventory.length < charInF.inf.oht) {
          // Thêm vật phẩm mới nếu còn chỗ
          item["số lượng"] = Math.min(item["số lượng"], 999);
          charInF.inf.inventory.push(item);
        }
      } else {
        // Xử lý vật phẩm không có số lượng
        if (charInF.inf.inventory.length < charInF.inf.oht) {
          charInF.inf.inventory.push(item);
        }
      }
      displayInventory()
    }
    function displayInventory() {
      // Ưu tiên "hp" và "mana"
      charInF.inf.inventory.sort((item1, item2) => {
        if ((item1.loại === "hp" || item1.loại === "mana") && !(item2.loại === "hp" || item2.loại === "mana")) {
          return -1;
        }
        if (!(item1.loại === "hp" || item1.loại === "mana") && (item2.loại === "hp" || item2.loại === "mana")) {
          return 1;
        }
        return 0;
      });
      // Hiển thị lên giao diệnoht
      for (let i = 0; i < charInF.inf.oht; i++) {
        let slot = document.getElementById(`slot-${i + 1}`);
        if (charInF.inf.inventory[i]) {
          let item = charInF.inf.inventory[i];
          // slot.textContent = item["số lượng"] ? `${item.name} (x${item["số lượng"]})` : item.name;
          slot.textContent = item["số lượng"] ? `x${item["số lượng"]}` : ''
          slot.onclick = () => showPopup(item, i, "inventory");
          slot.classList.remove("empty");

            slot.style.backgroundColor = '#ff2a3e'
            slot.style.backgroundImage = `url(${item.linkImg})`;
            slot.style.backgroundPosition = '-2px -2px'
            slot.style.backgroundSize = '45px'
        } else {
          slot.textContent = "Trống";
          slot.style.backgroundColor = '#6a8fb7'
          slot.onclick = null
          slot.style.backgroundImage = ``;
          slot.classList.add("empty");
        }
      } // ///

      document.getElementById('dongg').innerText = gameObj.map.charr.obj.xu.toLocaleString('de-DE')
      document.getElementById('vangg').innerText = gameObj.map.charr.obj.kc.toLocaleString('de-DE')
    }
    // Thêm vật phẩm thử nghiệm
    // addItemToInventory(a[0]);
    // addItemToInventory(a[1]);
    // addItemToInventory(a[2]);
    // addItemToInventory(a[3]);
    // addItemToInventory(a[4]);
    // addItemToInventory(a[5]);
    // displayInventory();

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
          charInF.inf.inventory.splice(index, 1);
        }
        displayInventory();
        closePopupMenu();
      }
    }
    function displayEquipment(slot) {
      if (charInF.inf.equipment.áo) {
        // slotAo.textContent = charInF.inf.equipment.áo.name;
        slotAo.classList.remove("empty");
        slotAo.onclick = () => showPopup(charInF.inf.equipment.áo, null, "equipment");
      } else {

        slotAo.textContent = "Áo";
        slotAo.classList.add("empty");
        slotAo.onclick = null;
      }
      if (charInF.inf.equipment.quần) {

        // slotQuan.textContent = charInF.inf.equipment.quần.name;
        slotQuan.classList.remove("empty");
        slotQuan.onclick = () => showPopup(charInF.inf.equipment.quần, null, "equipment");
      } else {

        slotQuan.textContent = "Quần";
        slotQuan.classList.add("empty");
        slotQuan.onclick = null;
      }
      if (charInF.inf.equipment[slot]) {
        document.getElementById(`slot-${slot}`).textContent = "";
              document.getElementById(`slot-${slot}`).classList.add("trangBiColor")
              document.getElementById(`slot-${slot}`).style.backgroundImage = `url(${charInF.inf.equipment[slot].linkImg})`;
              document.getElementById(`slot-${slot}`).style.backgroundPosition = '3px 1px'
              document.getElementById(`slot-${slot}`).style.backgroundSize = '55px'
              

          //  this.obj.charInF.inf.charInF.inf.equipment.forEach(item => {
            gameObj.map.charr.obj.dame += charInF.inf.equipment[slot].dame || 0;
            gameObj.map.charr.obj.armorMax += charInF.inf.equipment[slot].armorMax || 0;
            gameObj.map.charr.obj.hpMax += charInF.inf.equipment[slot].hpMax || 0;
            gameObj.map.charr.obj.dodge += charInF.inf.equipment[slot].dodge || 0;
        // });

      }
    }
    function equipItem(item, index) {
      if (!item.sec.includes(gameObj.map.charr.obj.sec)) {return}
      const slot = item.loại === "áo" ? "áo" : "quần";
      if (charInF.inf.equipment[slot]) {
        // Đưa trang bị cũ về hành trang
        charInF.inf.inventory.splice(index, 1);
        charInF.inf.inventory.splice(index, 0, charInF.inf.equipment[slot]);
        
        gameObj.map.charr.obj.dame -= charInF.inf.equipment[slot].dame || 0;
        gameObj.map.charr.obj.armorMax -= charInF.inf.equipment[slot].armorMax || 0;
        gameObj.map.charr.obj.hpMax -= charInF.inf.equipment[slot].hpMax || 0;
        gameObj.map.charr.obj.dodge -= charInF.inf.equipment[slot].dodge || 0;

        charInF.inf.equipment[slot] = item;
      } else {
          charInF.inf.equipment[slot] = item;
          charInF.inf.inventory.splice(index, 1);
      }
      displayInventory();
      displayEquipment(slot);
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
    //  { loại: "hp", name: "máu 10", "số lượng": 1, cost: 100},
    //   { loại: "mana", name: "mana 10", "số lượng": 1, cost: 100 },
    //  { loại: "áo", name: "áo xanh", cost: 700},
    //  { loại: "quần", name: "quần đỏ", cost: 550 },
    //  { loại: "quần", name: "quần vàng", cost: 1000 },

    // { loại: "hp", name: "máu 10", "số lượng": 2, linkImg: './img/ha417.png', cost: 100},
    { loại: "hp", name: "máu 10", "số lượng": 1, linkImg: './img/ha421.png', sec: ['male', 'female'], cost: 100},
    // { loại: "mana", name: "mana 10", "số lượng": 100, linkImg: './img/ha417.png' , sec: ['male'], cost: 100},
    { loại: "mana", name: "mana 10", "số lượng": 1, linkImg: './img/ha422.png' , sec: ['male', 'female'], cost: 100},
   { loại: "quần", name: "quần xanh", linkImg: './img/ha410.png', level: 1, dame:10, armorMax:10, sec: ['male'], cost: 700 },
   { loại: "áo", name: "áo đỏ", linkImg: './img/ha412.png', level: 1, dame:10, dodge:10, sec: ['male'], cost: 550 },
   { loại: "áo", name: "áo vàng", linkImg: './img/ha413.png', level: 1, dame:10, armorMax:10, sec: ['female'], cost: 1000},
   { loại: "áo", name: "áo hồng", linkImg: './img/ha417.png', level: 1, dame:10, hpMax:10, sec: ['male', 'female'], cost: 1000},
   ];
    function renderTableShop() {
        const container = document.getElementById("table-containerShop1")
            container.innerHTML = '';
            for (let i = 1; i <= Shop1.length; i++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.id = `slotShop1-${i}`
            //    cell.textContent = 'trống';
                // cell.textContent = Shop1[i-1].name
                cell.textContent = Shop1[i-1]["số lượng"] ? `x${Shop1[i-1]["số lượng"]}` : ''
                container.appendChild(cell);
                cell.onclick = () => showPopup(Shop1[i-1], i - 1, "shop", 1); // ///

                // cell.classList.remove("empty");
      
                  cell.style.backgroundColor = '#ff2a3e'
                  cell.style.backgroundImage = `url(${Shop1[i-1].linkImg})`;
                  cell.style.backgroundPosition = '-2px -2px'
                  cell.style.backgroundSize = '45px'

            }
            document.getElementById('xuShop1').innerText = gameObj.map.charr.obj.xu.toLocaleString('de-DE')
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


function toggleSaveGame() {
  localStorage.setItem("charInF", JSON.stringify(charInF));
// localStorage.setItem("inventory", JSON.stringify(inventory));
// localStorage.setItem("oht", JSON.stringify(charInF.inf.oht));
// localStorage.setItem("equipment", JSON.stringify(equipment));
document.getElementById("saveGame").style.background = '#21af59';

setTimeout(()=>{document.getElementById("saveGame").style.background = '#2980b9'}, 600)
}
 function yesBtnShop(item) {
            document.querySelector('.question-box-Shop').style.display = 'none'
            document.querySelector('.modalGear').style.display = 'block'
            let cost = item.cost
            if (gameObj.map.charr.obj.xu >= cost && charInF.inf.inventory.length < charInF.inf.oht) {
                gameObj.map.charr.obj.xu -= cost
                 modalGearText.textContent = "Chúc mừng bạn đã mua thành công vật phẩm này";
                modalGearText.className = "success";
                document.getElementById('xuShop1').innerText = gameObj.map.charr.obj.xu.toLocaleString('de-DE')
              //console.log(item)
              addItemToInventory(item);
            } else if (gameObj.map.charr.obj.xu >= cost && charInF.inf.inventory.length >= charInF.inf.oht) {
              modalGearText.textContent = "Không còn ô trống để mua thêm vật phẩm!";
              modalGearText.className = "error";
            }
            else  {
                modalGearText.textContent = "Bạn không đủ đồng để mua vật phẩm!";
                modalGearText.className = "error";
    }
}
function toggleMenu4() {
  skillPointsDisplay.textContent = gameObj.map.charr.obj.skillPoint
  updateSkillNames()
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
    
    document.getElementById('skill1').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[0]}.png")`
    document.getElementById('skill1').style.backgroundSize = '50px'
    document.getElementById('skill2').style.backgroundSize = '50px'
    document.getElementById('skill3').style.backgroundSize = '50px'
    document.getElementById('skill2').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[1]}.png")`
    document.getElementById('skill3').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[2]}.png")`
}
function toggleMenu42() {
  document.querySelector('.popup__contentSkill2').classList.toggle('hiddennn');
  document.getElementById("skillDescription22").innerHTML = 'Chạm kỹ năng để xem mô tả'

  document.getElementById('skill12').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[0]}.png")`
  document.getElementById('skill12').style.backgroundSize = '50px'
  document.getElementById('skill22').style.backgroundSize = '50px'
  document.getElementById('skill32').style.backgroundSize = '50px'
  document.getElementById('skill22').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[1]}.png")`
  document.getElementById('skill32').style.backgroundImage = `url("./img/ha${charInF.inf.skillPic[2]}.png")`

}
function noBtnShop() {
    document.querySelector('.question-box-Shop').style.display = 'none'

}