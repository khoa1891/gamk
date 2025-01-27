// 3. cho quái đánh: -----------------------------------------------
var pi = { a: 0 }
function testValid() { // kiểm tra xem bàn cờ có đi đc nước nào ko?  
    // r: row, c: collumn
    for (var r = 0; r < hàng; r++) {
        for (var c = 0; c < cột ; c++) {
            changeSrcTest(r + 1 < hàng, 'test', r, c, 1, 0)// hoán đổi chính nó và viên dưới nó
            changeSrcTest(c + 1 < cột, 'test', r, c, 0, 1)// hoán đổi chính nó và viên bên phải
            // ps: chỉ cần đổi 2 hướng là biết, ko cần 4 hướng
            if (pi.a > 0) { pi.a = 0; return true }; 
        }
    }
    // ko còn nước đi nào là trả false nè
    return false 
} 
function reBuild() {
    document.getElementById("board").innerHTML = ''
    setTimeout(()=>{startGame()}, 800)
}

// hoán đổi src và filter giả lập, rồi trả về cũ
function changeSrcTest(condition1, condition2, r, c, y, z, array, num) { 
    if (condition1) {
        // hàm hoán đổi src
        function mimi() { 
            // var img1 = board[r][c], img2 = board[r + y][c + z]
            // 1. đổi src img cho nhau
            [board[r][c].src, board[r + y][c + z].src] = 
            [board[r + y][c + z].src, board[r][c].src];
            // 2. đổi symbolClass img cho nhau
            [board[r][c].dataset.symbolClass, board[r + y][c + z].dataset.symbolClass] = 
                        [board[r + y][c + z].dataset.symbolClass, board[r][c].dataset.symbolClass];
            // 3. đổi images Filter cho nhau
            changeFilter(board[r][c], board[r + y][c + z]); 
        }; 
     
        mimi() // mimi lần 1 là hoán đổi src và filter 2 viên
        if (checkValid()) {
            if (condition2 == 'test') {
                pi.a++;
            } else {
                var testV = destroyCandy2(num)
                if (testV[0] == true) {
                    pi.a++;
                    array.push([board[r][c], board[r + y][c + z], testV[1], testV[2]])
                }
            }
        };
        mimi() // mimi lần 2 là để trả src và filter về
    }
}
//4. kiểm tra xem có tạo đc 4 viên liên tiếp ko
// kiểm tra xem có tạo đc 3 viên liên tiếp ko
function fakeTurn(num) {
    auto_array = []; 
    for (var r = 0; r < hàng; r++) {
        for (var c = 0; c < cột; c++) { /**xuống*/ /**phải */
            changeSrcTest(r + 1 < hàng, undefined, r, c, 1, 0, auto_array, num); 
            changeSrcTest(c + 1 < cột, undefined, r, c, 0, 1, auto_array, num); 
        }
    } 
    var possible = pi.a > 0; pi.a = 0
    return [possible, auto_array] 
}
//6.
function destroyCandy2(number) {
    // truyền 1 để nó return đúng cái listOfArray
    listOfArrays = []; listOfArrays = destroyCandy(1) 
    
    // bước 1, check xem mảng tìm đc có thỏa mãn ăn 3, ăn 4 ko
    var possible = listOfArrays.some(i => { if (i.length >= number) return true })
    // ko có thì lượn lập tức
    if (possible == false) {return [false]}
    
    // bước 2, xem có tất cả bao nhiêu viên đặc biệt
    // ví dụ:  [y] [y]   r     và     [y]  [y]   t   
    //          j   e  [[Y]]           j    t   [y]   
    // ==> rõ ràng ăn nước 1 có lợi hơn
    var numOf_SpecialChess = 0
    var fusionArray = [... new Set(listOfArrays.flat())]
    fusionArray.forEach(i => { 
        if (i.dataset.symbolClass != undefined) { numOf_SpecialChess ++ } 
    })
    // bước 3, xem có bao nhiêu mảng nếu ăn nước này
    // ví dụ:  [x] [x]  y  [x]   và    [x]  [x]  (y)   [x]
    //          j   y  [x]  k           j   (y)  [x]   (k)
    // ==> rõ ràng ăn nước 2 có lợi hơn
    var length = listOfArrays.length; 
    listOfArrays = [] // set up lại về mảng rỗng
    return [true, numOf_SpecialChess, length]
}
//7. Quái lựa cấp độ khó để đánh 
function auto_Fight() { 
    // Xem bàn cờ có những bước đi nào 
    var arrayAll = [fakeTurn(4), fakeTurn(3)]
    var randomNum = Math.floor(Math.random() * arrayAll.length)
    arraySelected = arrayAll[0][0] == true? arrayAll[randomNum] : arrayAll[1]
    var boomChess = [], branch = [], n = 0 //a[1] lấy all mảng|
    arraySelected[1].forEach((i, index) => { 
        boomChess.push([i[2], index]); branch.push([i[3], index]); 
        i[2] > 0 ? n++ : 1 
    })
    if (n > 0) { mi(boomChess) } else { mi(branch) }  // a[1][0]|[2],  a[1][1]|[2]   |[0] và [1] lấy gốc
    function mi(array) {
        const maxNum = Math.max(...array.map(arr => arr[0])); 
        const arrayContainIndex = array // Tạo mảng chứa các phần tử thứ hai của các mảng con có phần tử đầu tiên bằng giá trị lớn nhất
        .filter(arr => arr[0] === maxNum)
        .map(arr => arr[1]);
      
        var randomm = Math.floor(Math.random() * arrayContainIndex.length), 
            condition = Math.floor(Math.random() * 2) + 1
            index= arrayContainIndex[randomm]
        
        if (condition == 1) {
            currTile = arraySelected[1][index][0];
            otherTile = arraySelected[1][index][1]
        } else {
            currTile = arraySelected[1][index][1], 
            otherTile = arraySelected[1][index][0]
        }
    };

    function monsterFightFocus() {
        const focus = (tile, cls) => { tile.classList.replace(tile.classList[0], cls)}
    
        focus(currTile, 'focus') // click lần 1 
        
        // click lần 2
        setTimeout (()=>{
            clearInterval(timer); timeBox.classList.add("disableTime")
            focus(otherTile, 'outFocus'); // console.log(2)
            setTimeout(() => focus(otherTile, 'fc'), 1200); 
            setTimeout(() => focus(currTile, 'fc'), 100); 
            setTimeout(() => checkAdjacency(), 400); 
        }, 800)
    }
    monsterFightFocus() // nhân vật bắt đầu đánh nè
}