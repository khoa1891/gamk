
var board = [], hàng = 8, cột = 8, listOfArrays = []
var currTile = undefined, otherTile = undefined
var fiveBlock = 'https://github.com/kun18911/gameBenhVienQuyDu/blob/main/asset/img/bomb5.png?raw=true'
var blank = 'https://github.com/ImKennyYip/candy-crush/blob/master/images/blank.png?raw=true'
var normal_Class = ['gold', 'yingyang', 'heart', 'sword', 'water', 'soulRock']
function createTag(x) {return document.createElement(x)}
function getId(x) {return document.getElementById(x)}

var meTurn = true, monTurn, starPoint = 0

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

// 1. Bắt đầu: -----------------------------------------------------
function randomCandy() {
    return `imgChess/${normal_Class[Math.floor(Math.random() * normal_Class.length)]}.png`
}
var board_table = document.getElementById("board");
var startG = 0, click1 = undefined, sideImg = 290 / cột
var nammuoiW, nammuoiH
var sideImg, sideImg
function startGame() {
    // mới vô reset lại cho đỡ lỗi
    // startG = 0; click1 = undefined; clearInterval(timer); isPaused = false; 
    // turnRemain = 0;collumnArray = []
    // tạo 64 viên chính ------------
    for (let r = 0; r < hàng; r++) {let row = [];
        for (let c = 0; c < cột; c++){mainTile(r, c, row)}; 
        board.push(row);
    }
    function mainTile(r, c, row) {
        // --------------- tạo thẻ cha, images 1, images 2
        let tileDad = createTag("div"), tile = createTag("img") //y = createTag("img")
        tileDad.style.position = "absolute"
        tileDad.style.width = `${sideImg}px`
        tileDad.style.height = `${sideImg}px`

        tile.src = randomCandy(); tile.style.opacity = "1";
        tile.classList.add("fc", 'offBoom');
        tile.addEventListener("click", click_Affect); tile.id = r + "-" + c;
        tile.dataset.symbolClass = 'undefined'
        tileDad.id = "a" + r + "-" + c; row.push(tile); 
        // --------------- gắn thẻ cha, images 1, images 2 vào bảng 
        board_table.appendChild(tileDad).appendChild(tile); 
        // ----------------------- 
        tile.style.width = `${sideImg}px`;
        tile.style.height = `${sideImg}px`;        
        return tile;
    }    
    // tạo 8 viên phụ ------------
    for (let i = 0; i < cột; i++) { supportTile(i)}
    function supportTile(b) {
        // --------------- tạo thẻ cha, images 1, images 2
        const x = createTag("img"); box = createTag("div"); //y = createTag("img")
        x.id = `0-*${b}`; box.id = "a" + x.id
        Object.assign(box.style, {
            top: `-${sideImg}px`, left: `${sideImg * b}px`,
            position: 'absolute'
        });
        box.style.width = `${sideImg}px`;
        box.style.height = `${sideImg}px`
        x.dataset.symbolClass = 'undefined'
        // --------------- gắn thẻ cha, images 1, images 2 vào bảng 
        board_table.appendChild(box).appendChild(x); 
    }
    

    for (let i = 0; i < hàng; i++) {
        for (let e = 0; e < cột; e++) {
            var box = document.getElementById("a" + board[i][e].id)
            Object.assign(box.style, {top:`${sideImg * i}px`,left: `${sideImg * e}px`})
        }
    }   

    // -----------------------
    // startG có nghĩa là báo hiệu đầu game
    if (startG == 0) {
        createCollumnArray(); // phải có mảng này mới có thể rơi cờ, lấp đầy các ô trống 
        // kiểm tra có 3 ô trở lên trùng src thì phá cờ
        if (checkValid()) { setTimeout(() => { destroyCandy() }, 500) }
        else {
            // ko thì kiểm tra có nước đi khả thi ko
            if (testValid()) {
                setTimeout(() => { 
                    currentTurn == 'character'? click1 = true: 1 
                    startG++; 
                    startTurn() // bắt đầu vào đếm giờ nè
                }, 500)
                
            } else { 
                // ko có thì xóa all bảng, tạo mới
                reBuild() 
            } 
        }
    }
}
  

// đơn giản là click vào ô thì tạo hiệu ứng cho ô dễ nhìn
function click_Affect() {
    // curr: click lần 1, other: click lần 2
    const focus = (tile, cls) => { tile.classList.replace(tile.classList[0], cls)}
    // click lần 1 nếu true
    if (click1 == true ) {
        click1 = false; currTile = this; 
        focus(currTile, 'focus')
    } 
    // click lần 2 nếu biến là false, nếu lỡ click chính nó thì bắt đầu lại
    else if (click1 == false && this == currTile  ) { 
        // click nhầm thì undefined để khỏi click nữa, dừng thời gian
        click1 = undefined; clearInterval(timer); timeBox.classList.add("disableTime")
        // cho chính nó outfocus và tắt sau 800ms
        focus(this, 'outFocus'); setTimeout(() => focus(this, 'fc'), 800); 

        // sau khi click nhầm, 400ms sau mới click đc, thời gian chạy tiếp,
        //  gỡ hiệu ứng dừng đồng hồ
        // do truyền tham số khác undefined nên thời gian chạy tiếp, 
        // ví dụ 5 xuống 4 chứ ko phải bắt đầu lại 10
        setTimeout(() => {
            click1 = true; startTurn(1);
            timeBox.classList.remove("disableTime")
        }, 400); 
    } 
    // click lần 2 nếu biến là false, click ô khác nó sẽ hoán đổi cờ
    else if (click1 == false && this != currTile  ) { 
        click1 = undefined; otherTile = this;
        clearInterval(timer); timeBox.classList.add("disableTime")
        focus(otherTile, 'outFocus'); // console.log(2)
        setTimeout(() => focus(otherTile, 'fc'), 1200); 
        setTimeout(() => focus(currTile, 'fc'), 100); 
        setTimeout(() => checkAdjacency(), 400); 
    } 
    // nếu click 1 là undefined, tức là nhân vật ko thể click đc
}
// click xong kiểm tra kề cạnh
function checkAdjacency() { 
    // ------------- nếu 1 trong 2 src là blank thì dừng hàm. say bye
    if (currTile.src.includes('blank') || otherTile.src.includes('blank')) return;

    const [r1, c1] = currTile.id.split("-").map(Number), [r2, c2] = otherTile.id.split("-").map(Number);
    // nếu click vào ô kề cạnh thì hoán đổi
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
        // 1. đổi src img1 cho nhau
        // cho 2 viên đều mờ trong 300ms (do có hiệu ứng transition)
        currTile.style.opacity = 0; otherTile.style.opacity = 0;
        // Đợi sau 300ms để nó mờ hẳn thì
        setTimeout(() => {
            // 1. đổi src img cho nhau
            [currTile.src, otherTile.src] = [otherTile.src, currTile.src]; 
            // 2. đổi symbolClass cho nhau
            [currTile.dataset.symbolClass, otherTile.dataset.symbolClass] = [otherTile.dataset.symbolClass, currTile.dataset.symbolClass];
            // 3. Hiện rõ 2 cờ sau khi đổi src
            currTile.style.opacity = 1; otherTile.style.opacity = 1; 
            changeFilter(currTile, otherTile); //đổi images Filter cho nhau
        }, 300); 
        // chờ 300ms quá đủ, đợi thêm 500ms (500+300=800) để tới bước phá cờ
        setTimeout(() => { destroyCandy() }, 800)
    } else { 
        // click bậy, ko kề thì chờ 400ms click lại
        setTimeout(() => {
            click1 = true; startTurn(1);
            timeBox.classList.remove("disableTime")
        }, 400)
    }
} 

var getPoint = new Set()
function destroyCandy(x) {
// Phần I: listOfArrays là chiếc xem có bao nhiêu viên có 3 ô liên tiếp trở lên cùng src
    for (let r = 0; r < hàng; r++) {meme(cột, board[r])} // Kiểm tra hàng
    for (let c = 0; c < cột; c++) {meme(hàng, board.map(row => row[c]))} // Kiểm tra cột

    // Hàm chung để kiểm tra hàng hoặc cột
    function meme(length, line) {
        let candy1 = line[0], array = [candy1];
        for (let i = 1; i < length; i++) {
            let candy2 = line[i];
            if (candy1.src == candy2.src && !candy1.src.includes('blank')) {
                array.push(candy2)} 
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
    if (listOfArrays.length == 0) {click1 = true; endTurn(); return}


    // --------------------------------
    // Phần II: các viên cờ giao nhau thì sẽ tạo thành ô 3x. nổ 4 viên chéo kề cạnh nó
    let intersectionCandy = new Set()
    // 3x:     
    for (let i = 0; i < listOfArrays.length; i++) {
        let setI = new Set(listOfArrays[i]); // Chuyển mảng i thành Set
        for (let j = i + 1; j < listOfArrays.length; j++) {
            let setJ = new Set(listOfArrays[j]); // Chuyển mảng j thành Set
            let giaoNhau = [...setI].filter(candy => setJ.has(candy)); 
            // Tìm giao giữa 2 Set
            giaoNhau.forEach(candy => intersectionCandy.add(candy));
        }
    }
    let intersectionArray = [...intersectionCandy] //Array.from(intersectionCandy);
    // intersectionArray là mảng thể hiện có bao nhiêu viên 3x đc tạo.
    // bao nhiêu viên thì đc tăng bấy nhiêu lượt, lưu tạm số lượt của 3x vô đây, 
    // lát cộng số lượt 4x sẽ ra tổng số lượt chơi còn lại
    var tTurns3x = intersectionArray.length
    // ghép 4 viên, 4 viên đó nổ hết trong 1 thời gian, theo quy tắc, cuối cùng sẽ tạo ra 
    // boom trong 4 viên đó
    intersectionArray.forEach(tile => prepareBoom(tile, 3));

    // --------------------------------------
    // Phần III: xem tạo đc bao nhiêu viên 4x
    var tTurns4x = new Set(), arrayGreaterThanFour = []
    arrayGreaterThanFour = listOfArrays.filter(array => array.length >= 4);
    arrayGreaterThanFour.forEach(array => {
        let duplicate = array.some(candy => intersectionArray.includes(candy));
        if (!duplicate) { // trùng thì bỏ
            // sẽ tạo ra viên 4x ở nơi mình vừa ghép
            let checkTiles = [otherTile, currTile].filter(tile => array.includes(tile));
            let tileToChange = checkTiles.length > 0 ? checkTiles[0] 
                : array[Math.floor(Math.random() * array.length)];
            // 4 viên này ko có viên nào được mình ghép thì tự nó random
            tTurns4x.add(tileToChange)
            // sẽ có 2 trường hợp, 4 ô nằm ngang thì nó tạo boom dọc, 
            // 4 ô nằm dọc thì tạo boom ngang
            // số truyền vào=       1:dọc, 2: ngang, 3: 3x
            var a = +array[0].id.split('-')[0]
            var b = +array[1].id.split('-')[0]
            // 4 viên ngang thì chỉ cần kiểm tra 2 viên đầu có số khác nhau ko
            // [0][1]  [0][2]  [0][3]  [0][4]     đây là id 4 viên liên tiếp hàng ngang
            prepareBoom(tileToChange, a == b ? 1 : 2)
        }
    });
    // startG = 0 là khởi đầu, có tạo đc 100 lượt thì cũng ko đc tính
    if (startG != 0) turnRemain += tTurns3x + [...tTurns4x].length

    // --------------------
    // kiểm tra xem có viên nào trong listOfArrays chứa boom 3x hay 4x ko, 
    // vì muốn nó tạo hiệu ứng chớp nháy trong 1 giây
    function checkBoom() {
        for (var i = 0; i < listOfArrays.length; i++) {
            var hi = listOfArrays[i].some(item => item.dataset.symbolClass != 'undefined')
            if (hi) return true
        }
    }; 
    var timeBling = 0
    if (checkBoom()) {blingAnimation(listOfArrays, 1)}
    // truyền 1 là vì nó listOfArrays là mảng kép [[1,2],[3,4]]
    // truyền khác 1 là với mảng thường [1,2,3,4]\
    // đây là hàm tạo hiệu ứng cho viên nổ
    function blingAnimation(arrayBling, x) {
        timeBling = 1000
        var array = new Set()
        for (var i = 0; i < arrayBling.length; i++) {
            if (x == 1) {
                arrayBling[i].filter(item => {
                    if (item.dataset.symbolClass != 'undefined') {array.add(item)}
                })
            } else {
                if (arrayBling[i].dataset.symbolClass != 'undefined') {array.add(arrayBling[i])}
            }
        }; 
        array = [... array]
        array.forEach(image=>{
            image.classList.add('blink'); // Thêm class để bắt đầu hiệu ứng chớp nháy
            image.style.transition = 'opacity 0.5s ease'; // Đặt transition thành 0.5s
            setTimeout(()=>{
                image.classList.remove('blink');
                image.style.transition = 'box-shadow 0.3s ease-in-out, opacity 0.3s ease';
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
                if (item.classList[1] == 'offBoom') {nổChuyền(item, 'hi')}
                // tới viên cuối cùng sẽ kiểm tra đợt cuối, coi còn boom thì nổ tiếp, 
                // xong thực hiện rơi cờ
                // tại sao 350ms? vì cờ bị xóa, hiệu ứng xóa mờ rồi biến mất trong 300ms
                if (i ==listOfArrays.length-1 &&index==listOfArrays[i].length-1){
                    setTimeout(()=>{handleBoom()}, 350);
                }
            });
        }
    }, 350 + timeBling)

    // hàm chuyên lựa các viên boom để nô
    function boomExplode(item) {
        var b = item.dataset.symbolClass; if (b != 'undefined') {nổChuyền(item, b)}    
    }
    function handleBoom() {
        // kiểm tra có các viên onBoom còn sót lại ko
        var onBoo = document.querySelectorAll(".onBoom")
        onBoo = Array.from(onBoo);
        if (onBoo.length > 0) {
            // có thì làm hiệu ứng cho viên đó
            blingAnimation(onBoo, 2)
            setTimeout(() => {
                onBoo.forEach((item, index) => {
                    // nếu có thì đem nổ từng viên
                    boomExplode(item);
                    if (index === onBoo.length - 1) {
                        // viên cuối sẽ chờ 350ms để kiểm tra coi quá trình nổ có 
                        // nổ trúng viên boom ko. các viên đều nổ 300ms
                        setTimeout(() => {
                            var onBoo = document.querySelectorAll(".onBoom")
                            onBoo = Array.from(onBoo);
                            if (onBoo.length > 0) {
                                blingAnimation(onBoo, 2)
                                setTimeout(() => {
                                    timeBling = 0; handleBoom()
                                }, timeBling)
                            } else { handsome() }
                        }, 350)
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
    listOfArrays = []; otherTile = undefined; currTile = undefined;
    
    
    getPoint.clear()
    // tính điểm dame để trừ máu --------------------
    if (currentTurn === 'character') {
        attackInGame(numDame, monsterInGame) // nhân vật đánh trừ máu quái
    } else {
        attackInGame(numDame, characterInGame) // quái đánh trừ máu nhân vật
    }
    numDame = 0

    // set các viên delete thành num ----------------
    var onBoo = document.querySelectorAll(".deleted")
    onBoo.forEach(item => item.classList.replace(item.classList[1], 'offBoom'))
    slideCandyBoard() // rơi cờ
}

function nổChuyền(tile, type) {
    let [r, c] = tile.id.split("-").map(Number);
    // Nổ 4 ô chéo cho viên 3x3
    if (type === '3x3') {
        let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        directions.forEach(([dr, dc]) => {
            let nr = r + dr, nc = c + dc;
            if (nr>=0&&nr < hàng && nc>=0 &&nc<cột){addClassIfKeywordPresent(board[nr][nc])}
        });
    }

    // Nổ 2 ô trước và 2 ô sau cho viên ngang
    else if (type === 'Ngang') {
        let range = [-2, -1, 1, 2];
        range.forEach(dc => {
            let nc = c + dc;
            if (nc >= 0 && nc < cột) {addClassIfKeywordPresent(board[r][nc])}
        });
    }

    // Nổ 2 ô trên và 2 ô dưới cho viên dọc
    else if (type === 'Doc') {
        let range = [-2, -1, 1, 2];
        range.forEach(dr => {
            let nr = r + dr;
            if (nr >= 0 && nr < hàng) {addClassIfKeywordPresent(board[nr][c])}
        });
    } 
    delete_Filter_Blank(tile) 
    
    function delete_Filter_Blank(tile) {
        // đầu trận (startG = 0) thì ko tính điểm cho ai
        if (startG != 0) {
            if (getPoint.has(tile)) {
            } else {
                getPoint.add(tile);
                if (currentTurn === "character") {
                    getPoint2Turn(1, tile)
                } else {
                    getPoint2Turn(2, tile)
                }
            }
        } 

        tile.classList.replace(tile.classList[1], 'deleted');
        tile.dataset.symbolClass = 'undefined';
        deleteFilter(tile); tile.style.opacity = 0;
        setTimeout(() => {
            tile.src = 'images/blank.png'; tile.style.opacity = 1;
        }, 300);
    }
    function addClassIfKeywordPresent(tile) {
        if (/Ngang|Doc|3x3/.test(tile.dataset.symbolClass)) {
            tile.classList.replace(tile.classList[1], 'onBoom');
        } else {  delete_Filter_Blank(tile)}
    }
}

var filterPicArray = []
// tạo hẳn viên boom, thay dataset và classList để nó thành 1 viên hoàn chỉnh
function filterPic() {
    filterPicArray.forEach(i=>{
        i.tile.src = i.src; i.tile.dataset.symbolClass = i.suffix
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
    const currPic2 = havePic2(curr); const otherPic2 = havePic2(other)
    function havePic2(box) {
        return document.getElementById("a" + 
        box.id).querySelector('img:nth-of-type(2)')
    }
    // ------------------------------------
    if (currPic2 && otherPic2) { // 2 bên đều có filter
        [currPic2.src, otherPic2.src] = [otherPic2.src, currPic2.src]
    } else if (!currPic2 && otherPic2){ // a ko filter, b có
        createPic2(curr.id); havePic2(curr).src = otherPic2.src; deleteFilter(other)
    } 
    else if (currPic2 && !otherPic2) { // a có, b ko filter
        createPic2(other.id); havePic2(other).src=currPic2.src; deleteFilter(curr)    
    }
}
// tạo cái thẻ div cho filter, ko truyền r là chỉ tạo, truyền là tạo hình images cho filter 
function createPic2(tileId, r) {
    var x = getId("a" + tileId)
        x.insertAdjacentHTML('beforeend', `<img style="position:absolute; 
            z-index:2; width: ${sideImg}px; height: ${sideImg}px">`);
        x.querySelector('img:nth-of-type(2)').style.pointerEvents = 'none'
    if (r != undefined) x.querySelector('img:nth-of-type(2)').src = `images/filter${r}.png`
}
// hàm tạm biệt filter
function deleteFilter(tile) {
    var x = getId("a"+tile.id)
    if (x.children.length > 1) {x.removeChild(x.children[1])}
}

// ---------------------------------------
var collumnArray = []
function createCollumnArray() { // ✨
    for (var i = 0; i < cột; i++) {
        collumnArray[i] = [];
        for (var j = hàng - 1; j >= 0; j--) {
            collumnArray[i].push(document.getElementById("a" + board[j][i].id))
        }
        collumnArray[i].push(document.getElementById("a0-*" + i))
    }
}
// 12.
var slidePoint = 0, iii = 0
function slideCollumn(cot) {
    // tìm viên đều tiên của cột có ô trống. tìm dưới lên
    // viên đầu tiên, images 1 là gốc, images 2 là filter
    var indexCollumn = cot.slice(0, -1).findIndex(i => 
        i.querySelector('img:first-of-type').src.includes("blank"))

    if (indexCollumn !== -1) {
        // lấy các phần tử sau ô trống
        var arrayAfterBlank = cot.slice(indexCollumn + 1); // mảng ko lấy chính nó
        var arrayAnd_Blank = cot.slice(indexCollumn); // mảng lấy chính nó
        // cho ô cuối tạo images ngẫu nhiên, set kích thuóc
        cot[cot.length - 1].querySelector('img:first-of-type').src = randomCandy()
        cot[cot.length - 1].querySelector('img:first-of-type').style.width = sideImg + 'px'
        cot[cot.length - 1].querySelector('img:first-of-type').style.height = sideImg + 'px'

        // cho kẹo rớt xuống trong 500ms, chuyển động mượt
        arrayAfterBlank.forEach((el) => {
            el.style.zIndex = 1
            el.style.transition = 'transform 500ms ease-in';
            el.style.transform = `translateY(${sideImg}px)`
        })
        
        // sau 500ms cần sắp xếp lại
        setTimeout(() => { 
            // Lặp từ phần tử đầu tiên đến phần tử áp chót, tức ko lấy viên phụ
            for (let i = 0; i < arrayAnd_Blank.length - 1; i++) {
                function tile(a) { return arrayAnd_Blank[a].querySelector('img:first-of-type') }
                // đổi dataset, src, filter cho nhau hết
                tile(i).dataset.symbolClass = tile(i+1).dataset.symbolClass
                tile(i).src = tile(i + 1).src; 
                changeFilter(tile(i), tile(i + 1)); 
                
                // xóa filter viên này nếu có, vì nếu có nó đã bị chuyển xuống rồi
                deleteFilter(tile(i + 1));
            } 
            // cho các viên rớt xuống hồi nãy, quay ngược lại vị trí cũ
            arrayAfterBlank.forEach(el => {
                el.style.transition='';
                el.style.transform = '';
                el.style.zIndex = '';
            })
            setTimeout(()=>{slideCollumn(cot)},30) // tiếp tục rớt các viên tiếp theo
        }, 500)
    } else { slidePoint++ } // ko có viên trống thì ++
}

function slideCandyBoard() { // ✨
    // gọi hàm rơi cờ cho tất cảc cá cột
    for (var i = 0; i < cột; i++) { slideCollumn(collumnArray[i]) } 
    var slideLoop = setInterval(function () {
        if (slidePoint == cột) {
            // nếu đủ rồi thì dừng vòng lặp, set slidePoint về 0
            clearInterval(slideLoop); slidePoint = 0
            // tùy cờ đã đầy nhưng nếu có các ô liên tiếp trùng src, lại nổ tiếp
            if (checkValid()) {setTimeout(()=>destroyCandy(), 200)} 
            else {
                setTimeout(() => {
                    // hiển thị máu và mana 2 bên đã mất hay tăng sau giao tranh
                    display_InfoChar_Mon();
                    if (startG == 0) {
                        // chỉ khi vào trận, nếu đầu trận mà có thể nổ cờ, 
                        // thì cờ đó ko thuộc về ai. sau đó mới bắt đầu chơi
                        startG++; startTurn()

                    } else { checkBattleResult()? 2:endTurn() }
                    // những lần chơi về sau, mỗi khi rớt cờ xong, kiểm tra ai thua,
                    //  hoặc ko ai thua thì chuyển lượt ng kia
                }, 200)
            }
        }
    }, 20)
}

// ---------------------------------------------
let currentTurn = null;  // "character" or "monster"
let turnRemain = 0;
let timer;
let timeLeft
let isPaused = false;
let timeMonster = [8, 7, 6, 5]
let timeMonFight = null

const timeDisplay = document.getElementById('time-display');
const timeBox = document.querySelector('.timeBox');
// hàm bắt đầu chuyển lượt về thời gian
function startTurn(x) {
    // ko truyền x là khi đổi lượt, truyền x là khi ấn nhầm cờ, nó 
    // sẽ dừng thời gian rồi tiếp tục 
    if (x== undefined) {timeLeft = 10} else {timeLeft = timeLeft}
    timeBox.style.visibility = 'visible'; // Hiện thời gian khi bắt đầu lượt
    updateTimeDisplay();

    if (currentTurn === "character") {
        click1 = true; 
        // if (currTile != undefined) {focus(currTile, 'fc'); currTile = undefined}
        music.src = 'sound/doorbell.mp3';   
        music.play(); 
        document.querySelector(".boxMeIn_Game").classList.add("colorTurn", "flyBtn")
        document.querySelector(".boxMonIn_Game").classList.remove("colorTurn", "flyBtn")
    } else {
        click1 = undefined;        
        if (currTile != undefined) {focus(currTile, 'fc'); currTile = undefined}
        timeMonFight = timeMonster[Math.floor(Math.random() * timeMonster.length)]
        document.querySelector(".boxMeIn_Game").classList.remove("colorTurn", "flyBtn")
        document.querySelector(".boxMonIn_Game").classList.add("colorTurn", "flyBtn")
    }
   

    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            if (timeLeft >=  0) {
                updateTimeDisplay()
                if (timeLeft == timeMonFight && currentTurn == "monster") {
                    auto_Fight()
                }
            }
            else {endTurn()}
        } 
    }, 1000);
}

function displayTurnRemain() {
    const hiddenDiv = document.getElementById('hiddenDiv');
    hiddenDiv.classList.remove('none'); // Hiện thẻ div
    hiddenDiv.textContent = `Còn ${turnRemain} lượt`; turnRemain--;
    setTimeout(() => {
        setTimeout(() => {
            hiddenDiv.classList.add('none');
            hiddenDiv.style.opacity = '1' // Thêm lớp ẩn trở lại
        }, 1000);
        hiddenDiv.style.opacity = '0'
    }, 2000);
}



// -----------------------------


function updateTimer() {
    countdownText.setVisible(true);
    // Giảm thời gian mỗi giây
    timer--;
    countdownText.setText(`Time: ${timer}`);

    if (timer <= 0) {
        // Khi thời gian đạt 0, đổi lượt
        isPlayerTurn = !isPlayerTurn;
        timer = 5; // Đặt lại thời gian về 5 giây

        // Đổi màu các ô vuông để hiển thị lượt
        if (isPlayerTurn) {
            playerBox.setFillStyle(0x00ff00); // Màu xanh cho lượt người chơi
            enemyBox.setFillStyle(0x666666); // Màu xám cho quái vật
        } else {
            playerBox.setFillStyle(0x666666); // Màu xám cho người chơi
            enemyBox.setFillStyle(0xff0000); // Màu đỏ cho lượt quái
        }
    }
}