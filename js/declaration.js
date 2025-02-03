let charInF = {
    inf: {
        name: 'Kuln1891',
        sec: 'male', // hoặc 'female'
        element: 'hỏa',
        xu: 0, kc: 0,
        level: 1, exp: 0, 
        dame: 0, armorCur: 999999, manaCur: 9999, hpCur: 999999, dodge: 0,

        hpMax:0, manaMax: 300, armorMax : 0,
        hpPoint: 0, damePoint: 0, armorPoint: 0, dodgePoint: 0, 
        S1p: 0, S2p: 0, S3p: 0, equipment: [], soulRockT: 0, soulRock: 0, xuT: 0,
        potentialPoint: 0,
        skillPoint: 0,
    },
    get RunNuz() {
       
        return this.inf.sec === 'male' ? 'run' : 'runG';
    },
    get IdleNuz() {
        return this.inf.sec === 'male' ? 'idle' : 'idleG';
    },
    get RunCloth() {
        return this.inf.sec === 'male' ? 'runCloth' : 'runClothG';
    },
    get IdleCloth() {
        return this.inf.sec === 'male' ? 'idleCloth' : 'idleClothG';
    },
    get RunWeapon() {
        return 'runBlade';
    },
    get IdleWeapon() {
        return 'idleBlade';
    },
    get RunMount() {
        return 'runMount';
    },
    get IdleMount() {
        return 'idleMount';
    },
    get RunPet() {
        return 'runPet';
    },
    get RunWing() {
        return 'runWing';
    },


    // level: 1,
    // aa: 0,
    // hpCur: 999999,
    // hpPoint: 0, 
    // damePoint: 0, armorPoint: 0, dodgePoint: 0, S1p: 0, S2p: 0, S3p: 0



};
let monsInF = {
    1: {
        1: {
            num: 10, // Số lượng quái
            run: [41, 42],
            idle: [42, 42],
            inf: {
                run: [40, 42],
                idle: [41, 42],
                level: null,
                _level() {
                    if (this.level === null) {
                        this.level = Math.floor(Math.random() * 3) + 1; // Random từ 1 đến 3 một lần
                    }
                    return this.level;
                },
                element: null,
                _element() {
                    if (this.element === null) {
                        var elements = ['kim', 'mộc', 'thủy', 'hỏa', 'thổ'];
                        this.element = elements[Phaser.Math.Between(0, elements.length - 1)];
                    }
                    return this.element;
                },
                name: 'Kuln1891',
                sec: 'male', // hoặc 'female'
                xu: 0, kc: 0,
                exp: 0, 
                dame: 0, armorCur: 999999, manaCur: 9999, hpCur: 999999, dodge: 0,
        
                hpMax:0, manaMax: 300, armorMax : 0,
                hpPoint: 0, damePoint: 0, armorPoint: 0, dodgePoint: 0, 
                S1p: 0, S2p: 0, S3p: 0, equipment: [], soulRockT: 0, soulRock: 0, xuT: 0,
                potentialPoint: 0,
                skillPoint: 0,
            },
        },
        // 'quần_thể_2': {
        //     name: 'tay sai cho Mỹ',
        //     level: null,
        //     _level() {
        //         if (this.level === null) {
        //             this.level = Math.floor(Math.random() * 3) + 3; // Random từ 3 đến 5 một lần
        //         }
        //         return this.level;
        //     },
        //     element: null,
        //     _element() {
        //         if (this.element === null) {
        //             var elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
        //             this.element = elements[Phaser.Math.Between(0, elements.length - 1)];
        //         }
        //         return this.element;
        //     },
        //     idle: 'idle',
        //     idleCloth: 'idleCloth',
        //     run: 'run',
        //     runCloth: 'runCloth',
        //     num: 7, // Số lượng quái
        //     mi() {
        //         return this.level;
        //     },
        //     aa: 0,
        //     hpCur: 999999,
        //     hpPoint: 0,
        //     damePoint: 0, armorPoint: 0, dodgePoint: 0, S1p: 0, S2p: 0, S3p: 0
        // }
    },
    2: {
        1: {
            num: 10, // Số lượng quái
            run: [41, 42],
            idle: [42, 42],
            inf: {
                run: [40, 42],
                idle: [41, 42],
                level: null,
                _level() {
                    if (this.level === null) {
                        this.level = Math.floor(Math.random() * 3) + 1; // Random từ 1 đến 3 một lần
                    }
                    return this.level;
                },
                element: null,
                _element() {
                    if (this.element === null) {
                        var elements = ['kim', 'mộc', 'thủy', 'hỏa', 'thổ'];
                        this.element = elements[Phaser.Math.Between(0, elements.length - 1)];
                    }
                    return this.element;
                },
                name: 'Kuln1891',
                sec: 'male', // hoặc 'female'
                xu: 0, kc: 0,
                exp: 0, 
                dame: 0, armorCur: 999999, manaCur: 9999, hpCur: 999999, dodge: 0,
        
                hpMax:0, manaMax: 300, armorMax : 0,
                hpPoint: 0, damePoint: 0, armorPoint: 0, dodgePoint: 0, 
                S1p: 0, S2p: 0, S3p: 0, equipment: [], soulRockT: 0, soulRock: 0, xuT: 0,
                potentialPoint: 0,
                skillPoint: 0,
            },
        },
        // 'quần_thể_2': {
        //     name: 'tay sai cho Mỹ',
        //     level: null,
        //     _level() {
        //         if (this.level === null) {
        //             this.level = Math.floor(Math.random() * 3) + 3; // Random từ 3 đến 5 một lần
        //         }
        //         return this.level;
        //     },
        //     element: null,
        //     _element() {
        //         if (this.element === null) {
        //             var elements = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
        //             this.element = elements[Phaser.Math.Between(0, elements.length - 1)];
        //         }
        //         return this.element;
        //     },
        //     idle: 'idle',
        //     idleCloth: 'idleCloth',
        //     run: 'run',
        //     runCloth: 'runCloth',
        //     num: 7, // Số lượng quái
        //     mi() {
        //         return this.level;
        //     },
        //     aa: 0,
        //     hpCur: 999999,
        //     hpPoint: 0,
        //     damePoint: 0, armorPoint: 0, dodgePoint: 0, S1p: 0, S2p: 0, S3p: 0
        // }
    }
};

let chairMap = [
    [{ pos: [100, 100], img: 'chair'}, { pos: [200, 200], img: 'chair'} ],
    [{ pos: [500, 500], img: 'chair'}, { pos: [600, 600], img: 'chair'} ],
    [{ pos: [500, 500], img: 'chair'}, { pos: [600, 600], img: 'chair'} ]
]
let obstacleMap = [
    [{ pos: [188, 188], img: 'house1'}, { pos: [188, 188], img: 'house2'} ],
    [{ pos: [400, 300], img: 'house1'}, { pos: [500, 300], img: 'house2'} ],
    [{ pos: [388, 100], img: 'house1'}, { pos: [200, 499], img: 'house2'} ]
]


let exitMap = [
    [ 
        { pos: [10, 10], toMap: 1, spawnPos: [100, 100] },  // Map 0 -> Map 1, nhân vật sẽ xuất hiện ở [100, 100]
        { pos: [20, 200], toMap: 2, spawnPos: [444, 444] }  // Map 0 -> Map 2, nhân vật sẽ xuất hiện ở [200, 200]
    ],
    [ 
        { pos: [450, 400], toMap: 2, spawnPos: [300, 300] },  // Map 2 -> Map 0, nhân vật sẽ xuất hiện ở [300, 300]
        { pos: [500, 400], toMap: 2, spawnPos: [350, 350] }   // Map 2 -> Map 1, nhân vật sẽ xuất hiện ở [350, 350]
    ],
    [ 
        { pos: [30, 30], toMap: 0, spawnPos: [50, 50] },    // Map 1 -> Map 0, nhân vật sẽ xuất hiện ở [50, 50]
        { pos: [40, 40], toMap: 2, spawnPos: [250, 250] }   // Map 1 -> Map 2, nhân vật sẽ xuất hiện ở [250, 250]
    ]
    
];
let skillGame = {
    'kim': {
        spe: 'Sát thương mạnh, phòng thủ tốt, tấn công sắc bén',
        S1: {
            name: 'Lưỡi Kim hahaha',
            description: 'Tấn công mục tiêu bằng một lưỡi dao sắc bén, gây sát thương vật lý lớn',
            mana: 75,
            dame: 28,
            level: 1,
            point: 0,
            curSkill() {

                this.dame += (10 * (this.level - 1) + 4 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        },
        S2: {
            name: 'Tường Bạch Kim',
            description: 'Tạo một bức tường kim loại bảo vệ bản thân hoặc đồng đội, giảm 40% sát thương nhận vào trong 3 lượt',
            mana: 150,
            armorCur: 35,
            level: 1,
            point: 0,
            curSkill() {
                this.armorCur += (9 * (this.level - 1) + 4.3 * this.point)
                this.armorCur = +this.armorCur.toFixed(2)
            }
        },
        S3: {
            name: 'Thép Nóng Chảy',
            description: 'Phóng ra luồng thép nóng chảy tấn công tất cả kẻ địch, gây sát thương diện rộng và hiệu ứng thiêu đốt trong 2 lượt',
            mana: 225,
            dame: 50,
            level: 1,
            point: 0,
            curSkill() {
                this.dame += (14 * (this.level - 1) + 6 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        }
    },

    'mộc': {
        spe: 'Sát thương mạnh, phòng thủ tốt, tấn công sắc bén',
        S1: {
            name: 'Lưỡi Kim',
            description: 'Tấn công mục tiêu bằng một lưỡi dao sắc bén, gây sát thương vật lý lớn',
            mana: 75,
            dame: 28,
            level: 1,
            point: 0,
            curSkill() {

                this.dame += (10 * (this.level - 1) + 4 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        },
        S2: {
            name: 'Tường Bạch Kim',
            description: 'Tạo một bức tường kim loại bảo vệ bản thân hoặc đồng đội, giảm 40% sát thương nhận vào trong 3 lượt',
            mana: 150,
            armorCur: 35,
            level: 1,
            point: 0,
            curSkill() {
                this.armorCur += (9 * (this.level - 1) + 4.3 * this.point)
                this.armorCur = +this.armorCur.toFixed(2)
            }
        },
        S3: {
            name: 'Thép Nóng Chảy',
            description: 'Phóng ra luồng thép nóng chảy tấn công tất cả kẻ địch, gây sát thương diện rộng và hiệu ứng thiêu đốt trong 2 lượt',
            mana: 225,
            dame: 50,
            level: 1,
            point: 0,
            curSkill() {
                this.dame += (14 * (this.level - 1) + 6 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        }
    },
    'thủy': {
        spe: 'Sát thương mạnh, phòng thủ tốt, tấn công sắc bén',
        S1: {
            name: 'Lưỡi Kim',
            description: 'Tấn công mục tiêu bằng một lưỡi dao sắc bén, gây sát thương vật lý lớn',
            mana: 75,
            dame: 28,
            level: 1,
            point: 0,
            curSkill() {

                this.dame += (10 * (this.level - 1) + 4 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        },
        S2: {
            name: 'Tường Bạch Kim',
            description: 'Tạo một bức tường kim loại bảo vệ bản thân hoặc đồng đội, giảm 40% sát thương nhận vào trong 3 lượt',
            mana: 150,
            armorCur: 35,
            level: 1,
            point: 0,
            curSkill() {
                this.armorCur += (9 * (this.level - 1) + 4.3 * this.point)
                this.armorCur = +this.armorCur.toFixed(2)
            }
        },
        S3: {
            name: 'Thép Nóng Chảy',
            description: 'Phóng ra luồng thép nóng chảy tấn công tất cả kẻ địch, gây sát thương diện rộng và hiệu ứng thiêu đốt trong 2 lượt',
            mana: 225,
            dame: 50,
            level: 1,
            point: 0,
            curSkill() {
                this.dame += (14 * (this.level - 1) + 6 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        }
    },
    'hỏa': {
        spe: 'Sát thương mạnh, phòng thủ tốt, tấn công sắc bén',
        S1: {
            name: 'Lưỡi Kim',
            description: 'Tấn công mục tiêu bằng một lưỡi dao sắc bén, gây sát thương vật lý lớn',
            mana: 75,
            dame: 28,
            level: 1,
            point: 0,
            curSkill(level) {

                this.dame = 28 + (10 * (level - 1) + 4 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        },
        S2: {
            name: 'Tường Bạch Kim',
            description: 'Tạo một bức tường kim loại bảo vệ bản thân hoặc đồng đội, giảm 40% sát thương nhận vào trong 3 lượt',
            mana: 150,
            armorCur: 35,
            level: 1,
            point: 0,
            curSkill(level) {
                this.armorCur = 35+ (9 * (level - 1) + 4.3 * this.point)
                this.armorCur = +this.armorCur.toFixed(2)
            }
        },
        S3: {
            name: 'Thép Nóng Chảy',
            description: 'Phóng ra luồng thép nóng chảy tấn công tất cả kẻ địch, gây sát thương diện rộng và hiệu ứng thiêu đốt trong 2 lượt',
            mana: 225,
            dame: 50,
            level: 1,
            point: 0,
            curSkill(level) {
                this.dame = 50 + (14 * (level - 1) + 6 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        }
    },
    'thổ': {
        spe: 'Sát thương mạnh, phòng thủ tốt, tấn công sắc bén',
        S1: {
            name: 'Lưỡi Kim',
            description: 'Tấn công mục tiêu bằng một lưỡi dao sắc bén, gây sát thương vật lý lớn',
            mana: 75,
            dame: 28,
            level: 1,
            point: 0,
            curSkill() {

                this.dame = 28 + (10 * (this.level - 1) + 4 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        },
        S2: {
            name: 'Tường Bạch Kim',
            description: 'Tạo một bức tường kim loại bảo vệ bản thân hoặc đồng đội, giảm 40% sát thương nhận vào trong 3 lượt',
            mana: 150,
            armorCur: 35,
            level: 1,
            point: 0,
            curSkill() {
                this.armorCur = 35 +(9 * (this.level - 1) + 4.3 * this.point)
                this.armorCur = +this.armorCur.toFixed(2)
            }
        },
        S3: {
            name: 'Thép Nóng Chảy',
            description: 'Phóng ra luồng thép nóng chảy tấn công tất cả kẻ địch, gây sát thương diện rộng và hiệu ứng thiêu đốt trong 2 lượt',
            mana: 225,
            dame: 50,
            level: 1,
            point: 0,
            curSkill() {
                this.dame = 50 + (14 * (this.level - 1) + 6 * this.point)
                this.dame = +this.dame.toFixed(2)
            }
        }
    },
}

class Character {
    constructor(obj) {
        this.obj = obj

        this.skill = deepCopy(skillGame[obj.element])
        this.skill.S1.point = obj.S1p
        // this.skill.S1.level = obj.level
        this.skill.S1.curSkill(this.obj.level)

        this.skill.S2.point = obj.S2p
        // this.skill.S2.level = obj.level
        this.skill.S2.curSkill(this.obj.level)

        this.skill.S3.point = obj.S3p
        // this.skill.S3.level = obj.level
        this.skill.S3.curSkill(this.obj.level)
        // ------

        this.equipment = []

        this.setScore()
        this.obj.manaCur = 0
        this.obj.armorCur = 0
        this.obj.soulRockT = 0
        this.obj.xuT = 0
    }
    addEquip(x) {
        this.equipment.push(x)
        this.hpFunc()
    }
    xu(a) {
        if (a==undefined) {return this.obj.xu}
        else if (a==2) {return +(this.obj.xu+a).toFixed(2)}
        else {
            if(this.obj.xu >= a) {this.obj.xu = +(this.obj.xu-a).toFixed(2); return this.obj.xu}
            else {return false}
        }
    }
    kc(a) {
        if (a==undefined) {return this.obj.kc}
        else if (a==2) {return +(this.obj.kc+a).toFixed(2)}
        else {
            if(this.obj.kc >= a) {this.obj.kc = +(this.obj.kc-a).toFixed(2); return this.obj.kc}
            else {return false}
        }
    }
    useSkill(a, target) {
        const skill = this.skill[`S${a}`];
        if (this.obj.manaCur < skill.mana) {
            console.log("mana ko đủ"); return;
        }

        this.obj.manaCur -= skill.mana
        Object.keys(skill).forEach(item => {
            // this.obj.dame += item.dame || 0;
            item == 'armorCur' ? (this.obj.armorCur += skill[item] || 0,
                this.obj.armorCur = +this.obj.armorCur.toFixed(2)
            ) : 1
            item == 'hpCur' ? (this.obj.hpCur += skill[item] || 0,
                this.obj.hpCur = +this.obj.hpCur.toFixed(2)
            ) : 1
            if ((skill[item] || 0) != 0 && item == 'dame') { this.fight(target, skill[item]) }
            // this.obj.dodge += item.dodge || 0;
        });
    }
    setUpEnd(target, isWin) {
        this.obj.manaCur = 0
        this.obj.armorCur = 0

        this.obj.soulRockT = 0
        this.obj.xuT = 0
        gainExp(target, isWin)
    }

    // useSkill(a, target) {
    //     const skill = this.obj.skill[`S${a}`];
    //     if (this.obj.manaCur < skill.mana) {
    //         console.log("mana ko đủ");
    //         return;
    //     }

    //     this.obj.manaCur -= skill.mana;

    //     for (const [key, value] of this.Object.entries(skill)) {
    //         if (key !== 'mana') {
    //             const { dame = 0, armorCur = 0, hpCur = 0 } = value;

    //             if (dame > 0) fight(target, dame);
    //             this.obj.armorCur += armorCur;
    //             this.obj.hpCur += hpCur;
    //         }
    //     }
    // }

    upMana(a) {
        a == undefined ? this.obj.manaCur += 9.4 : this.obj.manaCur += 9.4 * a
        this.obj.manaCur = +this.obj.manaCur.toFixed(2)
        this.obj.manaCur = this.obj.manaCur >= this.obj.manaMax ? this.obj.manaMax : this.obj.manaCur
    }
    upSoulRockT(a, target) {
        if (target.obj.level >= this.obj.level) {
            let point = 0
            
            if (target.obj.level - this.obj.level == 1) {point = 0.71}
            else if (target.obj.level - this.obj.level == 2) {point = 0.76}
            else if (target.obj.level - this.obj.level == 3) {point = 0.82}
            else if (target.obj.level - this.obj.level >= 4) {point = 0.86}
            else if (target.obj.level - this.obj.level == 0) {point = 0.65}
            a == undefined ? this.obj.soulRockT += point : this.obj.soulRockT += point * a
            this.obj.soulRockT = +this.obj.soulRockT.toFixed(2)
        }
    }
    upGold(a) {
        a == undefined ? this.obj.xuT += 4.5 + (1.6 * (this.obj.level - 1)) :
            this.obj.xuT += (4.5 + (1.6 * (this.obj.level - 1))) * a
        this.obj.xuT = +this.obj.xuT.toFixed(2)
    }
    upHp(a) {
        a == undefined ? this.obj.hpCur += 5.3 + (1.4 * (this.obj.level - 1)) :
            this.obj.hpCur += (5.3 + (1.4 * (this.obj.level - 1))) * a
        this.obj.hpCur = +this.obj.hpCur.toFixed(2)
        this.obj.hpCur = this.obj.hpCur >= this.obj.hpMax ? this.obj.hpMax : this.obj.hpCur
    }
    upArmorCur(a) {
        a == undefined ? this.obj.armorCur += 4.1 + (1.3 * (this.obj.level - 1)) :
            this.obj.armorCur += (4.1 + (1.3 * (this.obj.level - 1))) * a

        this.obj.armorCur = +this.obj.armorCur.toFixed(2)
    }


upGhost(a) {
a == undefined ? this.hpCur += 2.7 + (0.7 * (this.level - 1)) :
this.hpCur += (2.7 + (0.7 * (this.level - 1))) * a
this.hpCur = +this.hpCur.toFixed(2)
this.hpCur = this.hpCur >= this.hpMax ? this.hpMax : this.hpCur

a == undefined ? this.armorCur += 2.1 + (0.7 * (this.level - 1)) :
this.armorCur += (2.1 + (0.7 * (this.level - 1))) * a

this.armorCur = +this.armorCur.toFixed(2)
}
    setScore() {
        // máu
        this.obj.hpMax =
            +((this.obj.level - 1) * 68 + 200
                + this.obj.hpPoint * 8).toFixed(2)
        // giáp
        this.obj.armorMax =
            +((this.obj.level - 1) * 3.4 + 10
                + this.obj.armorPoint * 0.4).toFixed(2)
        // dame
        this.obj.dame = +((this.obj.level - 1) * 6.8 + 20
            + this.obj.damePoint * 0.8).toFixed(2)
        // né
        this.obj.dodge = +((this.obj.level - 1) * 0.23 + 0.35
            + this.obj.dodgePoint * 0.03).toFixed(2)
        // this.obj.equipment.forEach(item => {
        //     this.obj.dame += item.dame || 0;
        //     this.obj.armorMax += item.armorMax || 0;
        //     this.obj.hpMax += item.hpMax || 0;
        //     this.obj.dodge += item.dodge || 0;
        // });
        this.obj.hpCur = getNum(this.obj.hpCur, this.obj.hpMax)
    }
    // Bảng khắc hệ
    static elementChart = {
        "mộc": "thổ",
        "thổ": "thủy",
        "thủy": "hỏa",
        "hỏa": "kim",
        "kim": "mộc"
    };

    fight(target, aa, bb) {
        var dame
        if (aa == 0) {
            dame = (this.obj.dame / 3) * bb
        } else {
            dame = aa
        }
        // console.log({
        //     hpCur: target.obj.hpCur,
        //     giápCứng: target.obj.armorMax,
        //     armorCur: target.obj.armorCur,
        //     sátThuong: dame
        // })

        if (Character.elementChart[this.obj.element] === target.obj.element) {
            dame *= 1.3; // Tăng 30% khi khắc hệ
        } else if (Character.elementChart[target.obj.element] === this.obj.element) {
            dame *= 0.8; // Giảm 20% khi bị khắc
        }

        if (Math.random() * 100 < target.obj.dodge) {
            dame = 0;
        }

        // Trừ giáp mềm trước
        if (target.obj.armorCur > 0) {
            if (dame >= target.obj.armorCur) {
                dame -= target.obj.armorCur; // Sát thương còn lại sau khi phá giáp mềm
                target.obj.armorCur = 0; // Giáp mềm bị phá hủy
            } else {
                target.obj.armorCur -= dame; // Giáp mềm giảm nhưng vẫn còn
                target.obj.armorCur = +target.obj.armorCur.toFixed(2)
                dame = 0; // Sát thương đã bị hấp thụ hết
            }
        }

        // Trừ giáp cứng nếu vẫn còn sát thương
        if (dame > 0 && target.obj.armorMax > 0) {
            if (dame >= target.obj.armorMax) {
                dame -= target.obj.armorMax; // Sát thương còn lại sau khi phá giáp cứng
            } else {

                dame = 0; // Sát thương đã bị hấp thụ hết
            }
        }

        // Trừ target.obj.hpCur nếu vẫn còn sát thương
        if (dame > 0) {
            target.obj.hpCur -= dame; // Trừ sát thương vào target.obj.hpCur
        }

        // Đảm bảo target.obj.hpCur không âm
        target.obj.hpCur = +(Math.max(target.obj.hpCur, 0)).toFixed(2)

        return target.obj.hpCur == 0 ? true : false
        // return {
        //     hpCur: target.hpCur,
        //     giápCứng: target.armorMax,
        //     armorCur: target.armorCur
        // };
    }


    // tính lv 
    gainExp(target, isWin = true) {
        let expGained = 0; // Khởi tạo exp thay đổi
    
        // Nếu thắng
        if (isWin) {
            if (target.obj.level >= this.obj.level + 4) {
                expGained = 129; // Quái hơn bạn từ 4 cấp trở lên
            } else if (target.obj.level === this.obj.level + 3) {
                expGained = 122; // Quái hơn bạn 3 cấp
            } else if (target.obj.level === this.obj.level + 2) {
                expGained = 115; // Quái hơn bạn 2 cấp
            } else if (target.obj.level === this.obj.level + 1) {
                expGained = 108; // Quái hơn bạn 1 cấp
            } else if (target.obj.level === this.obj.level) {
                expGained = 100; // Quái cùng cấp
            } else if (target.obj.level === this.obj.level - 1) {
                expGained = 92; // Quái nhỏ hơn bạn 1 cấp
            } else if (target.obj.level === this.obj.level - 2) {
                expGained = 85; // Quái nhỏ hơn bạn 2 cấp
            } else if (target.obj.level === this.obj.level - 3) {
                expGained = 78; // Quái nhỏ hơn bạn 3 cấp
            } else if (target.obj.level <= this.obj.level - 4) {
                expGained = 71; // Quái nhỏ hơn bạn 4 cấp trở xuống
            }

            this.obj.soulRock += this.obj.soulRockT
            this.obj.soulRock = +this.obj.soulRock.toFixed(2)
            this.obj.xu += this.obj.xuT
            this.obj.xu = +this.obj.xu.toFixed(2)
            gameObj.map.winGame = true

           
        } else {
            // Nếu thua
            if (target.obj.level >= this.obj.level + 4) {
                expGained = -129; // Quái hơn bạn từ 4 cấp trở lên
            } else if (target.obj.level === this.obj.level + 3) {
                expGained = -122; // Quái hơn bạn 3 cấp
            } else if (target.obj.level === this.obj.level + 2) {
                expGained = -115; // Quái hơn bạn 2 cấp
            } else if (target.obj.level === this.obj.level + 1) {
                expGained = -108; // Quái hơn bạn 1 cấp
            } else if (target.obj.level === this.obj.level) {
                expGained = -100; // Quái cùng cấp
            } else if (target.obj.level === this.obj.level - 1) {
                expGained = -108; // Quái nhỏ hơn bạn 1 cấp
            } else if (target.obj.level === this.obj.level - 2) {
                expGained = -115; // Quái nhỏ hơn bạn 2 cấp
            } else if (target.obj.level === this.obj.level - 3) {
                expGained = -122; // Quái nhỏ hơn bạn 3 cấp
            } else if (target.obj.level <= this.obj.level - 4) {
                expGained = -129; // Quái nhỏ hơn bạn 4 cấp trở xuống
            }
            this.obj.hpCur = this.obj.hpMax
            gameObj.map.winGame = false
        }
    
        // Cập nhật exp sau trận đấu
        this.obj.exp += expGained;
        this.obj.exp = +this.obj.exp.toFixed(2)
        this.obj.soulRockT = 0; this.obj.xuT = 0
        this.obj.manaCur = 0
        this.obj.armorCur = 0

        target.obj.hpCur = target.obj.hpMax
        target.obj.manaCur = 0
        target.obj.armorCur = 0
        target.obj.soulRockT = 0
        target.obj.xuT = 0
        

     

         // Kiểm tra nếu đủ exp để lên cấp
    // Kiểm tra nếu đủ exp để lên cấp
    while (this.obj.exp >= this.getExpForNextLevel(this.obj.level)) {
        this.obj.exp -= this.getExpForNextLevel(this.obj.level); // Trừ đi exp đã dùng để lên cấp
        this.obj.level++; // Tăng cấp độ
        this.obj.skillPoint += 2.5; 
        this.obj.potentialPoint += 6; 
    }

    // Nếu exp âm, giữ cấp độ hiện tại và đặt exp = 0
    if (this.obj.exp < 0) {
        this.obj.exp = 0; // Reset exp về 0
        // console.log("Exp can't go below 0 at current level.");
    }
    
       
    
        // // Kiểm tra nếu exp bị âm và rớt cấp
        // while (this.obj.exp < 0 && this.obj.level > 1) {
        //     this.obj.level--; // Giảm cấp độ
        //     this.obj.exp += this.getExpForNextLevel(this.obj.level); // Thêm lại exp tương ứng của cấp trước
        //     console.log("Level down! New level: " + this.obj.level);
        // }
    
        // Đảm bảo exp không âm nếu lv = 1
        if (this.obj.level === 1 && this.obj.exp < 0) {
            this.obj.exp = 0; // Reset về 0 nếu cấp 1
        }
    
        // console.log("Exp gained/lost: " + expGained);
        // console.log("Current level: " + this.obj.level + ", Current exp: " + this.obj.exp);
    }
    
    // Hàm tính số exp cần để lên cấp tiếp theo
    getExpForNextLevel(level) {
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
    

}


function createBattleUI() {
    const body = document.body;

    
    // Tạo container chính
    const container = document.createElement('div');
    container.id = 'battle-ui';

    // Tạo Board-Time
    const boardTime = document.createElement('div');
    boardTime.id = 'board-Time';
    boardTime.innerHTML = `
        <p id="timer">Thời gian: -- giây</p>
        <p id="turn-info">Số lượt còn lại: --</p>
        <p id="remaining-turns">Số lượt còn lại: --</p>
    `;
    container.appendChild(boardTime);

    // Tạo thẻ #board và chèn vào body
    const board = document.createElement('div');
    board.id = 'board';
    container.appendChild(board);

    // Tạo Game Container
    const gameContainer = document.createElement('div');
    gameContainer.className = 'game-containerBattle';

    // Tạo Nhân Vật
    const characterStats = document.createElement('div');
    characterStats.className = 'stats';
    characterStats.id = 'character';
    characterStats.style.position = 'absolute';
    characterStats.style.left = '20px';
    characterStats.style.width = '119px';
    characterStats.innerHTML = `
        <h2>Nhân Vật</h2>
        <p>Máu: <span id="char-health">150</span>/<span id="char-health2">150</span></p>
        <p>Mana: <span id="char-mana">50</span>/<span id="char-mana2">50</span></p>
        <p>Giáp Max: <span id="char-max-armor">20</span></p>
        <p>Giáp Cur: <span id="char-armor-cur">0</span></p>
        <p>Dame: <span id="char-dame">0</span></p>
    `;
    gameContainer.appendChild(characterStats);

    // Tạo Quái Vật
    const monsterStats = document.createElement('div');
    monsterStats.className = 'stats';
    monsterStats.id = 'monster';
    monsterStats.style.position = 'absolute';
    monsterStats.style.left = '567px';
    monsterStats.style.width = '119px';
    monsterStats.innerHTML = `
        <h2>Quái Vật</h2>
        <p>Máu: <span id="mon-health">200</span>/<span id="mon-health2">200</span></p>
        <p>Mana: <span id="mon-mana">30</span>/<span id="mon-mana2">30</span></p>
        <p>Giáp Max: <span id="mon-max-armor">15</span></p>
        <p>Giáp Cur: <span id="mon-armor-cur">0</span></p>
        <p>Dame: <span id="mon-dame">0</span></p>
    `;
    gameContainer.appendChild(monsterStats);

    container.appendChild(gameContainer);

    // Tạo nút Kỹ Năng và Đầu Hàng
    const skillButton = document.createElement('button');
    skillButton.id = 'skill-btn';
    skillButton.textContent = 'Kỹ Năng';

    const surrenderButton = document.createElement('button');
    surrenderButton.id = 'surrender-btn';
    surrenderButton.textContent = 'Đầu Hàng';

    container.appendChild(skillButton);
    container.appendChild(surrenderButton);

    // Tạo Skills Popup
    const skillsPopup = document.createElement('div');
    skillsPopup.id = 'skillsPopup';
    skillsPopup.className = 'popupSkill';
    skillsPopup.innerHTML = `
        <h2>Kỹ Năng</h2>
        <div class="skill-box">
            <div id="skill1" class="skill"></div>
            <div id="skill2" class="skill"></div>
            <div id="skill3" class="skill"></div>
        </div>
        <div class="skill-names">
            <div id="skill1Name" class="skill-name"></div>
            <div id="skill2Name" class="skill-name"></div>
            <div id="skill3Name" class="skill-name"></div>
        </div>
        <div id="skillDescription" class="skill-description">
            <p>Chọn kỹ năng để xem mô tả.</p>
        </div>
        <div class="stat-box-skill"></div>
        <button onclick="hidePopup('skillsPopup')" class="close-btn">Đóng</button>
        <button id="chooseButton" class="choose-btn-skill">Chọn</button>
    `;
    container.appendChild(skillsPopup);

    // Thêm toàn bộ UI vào body
    document.body.appendChild(container);
    container.style.display = 'none'
}

// Gọi hàm để thêm UI vào trang
// hàm tạo những gì liên quan base
function createDiv(id, cls, casee, tick, tickId) {
    // Tạo thẻ div
    let div = document.createElement('div');

    // Gán id và class
    if (id) div.id = id;  // Gán id nếu id có giá trị (không phải 0 hoặc undefined)
    if (cls) div.className = cls; 

    // Thêm vào thẻ body
    switch (casee) {
        case 1:
            document.body.appendChild(div);
            break;
        default:
            // tick true là id
            let parentDiv // Lấy thẻ cha
                = tick? document.getElementById(tickId): document.querySelector(`.${tickId}`)

            // Thêm thẻ con vào thẻ cha
            parentDiv.appendChild(div);
    }
}
// createDiv("board", 0, 1)


// updateInfor()



// constructor(obj) {

//     this.skill = deepCopy(skillGame[obj.element])
//     // console.log(this.skill)
//     this.skill.S1.point = obj.S1p
//     this.skill.S1.level = obj.level
//     // // console.log( this.skill.S1.level )
//     this.skill.S1.curSkill()

//     this.skill.S2.point = obj.S2p
//     this.skill.S2.level = obj.level
//     this.skill.S2.curSkill()

//     this.skill.S3.point = obj.S3p
//     this.skill.S3.level = obj.level
//     this.skill.S3.curSkill()
//     // ------
//     // this.skill = acc
//     // this.skill.S1.point = S1p
//     // this.skill.S1.level = level
//     // // console.log( this.skill.S1.level )
//     // this.skill.S1.curSkill()

//     // this.skill.S2.point = S2p
//     // this.skill.S2.level = level
//     // this.skill.S2.curSkill()

//     // this.skill.S3.point = S3p
//     // this.skill.S3.level = level
//     // this.skill.S3.curSkill()

//     this.name = obj.name
//     this.level = obj.level
//     this.exp = obj.exp
//     this.element = obj.element

//     this.equipment = []

//     this.hpPoint = obj.hpPoint
//     this.damePoint = obj.damePoint
//     this.dodgePoint = obj.dodgePoint
//     this.armorPoint = obj.armorPoint

//     this.hpCur = obj.hpCur
//     this.manaCur = obj.manaCur
//     this.manaMax = obj.manaMax
//     this.armorCur = obj.armorCur
//     this.xu = obj.xu
//     this.kc = obj.kc
//     this.hpFunc()
// }

function swapId(id1, id2) {
    let el1 = getPic(id1);
    let el2 = getPic(id2);

    let tempId = el1.id;
    el1.id = el2.id;
    el2.id = tempId;
}


// tạo hẳn viên boom, thay dataset và classList để nó thành 1 viên hoàn chỉnh
function filterPic() {
    filterPicArray.forEach(i=>{
        i.tile.src = i.src; i.tile.filterr = i.suffix
        i.tile.classList.replace(i.tile.classList[1], 'offBoom')
        getFill(i.tile.id).src = `./img/filter${i.suffix}.png`
    })
    filterPicArray = []; 
}
function swapBox(id1, id2, a) {
    let el1 = getBox(id1);
    let el2 = getBox(id2);

    let tempId = el1.style[a]
    el1.style[a] = el2.style[a]
    el2.style[a] = tempId;
}

