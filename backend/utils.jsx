export const blocks = [
    {
        id: "1",
        block: "Sunflower block",
        states: {
            active: 10,
            inactive: 11,
            maintenance: 3
        },
        floors: [
            {
                id: "1",
                block: "First Floor",
                rooms: [
                    {
                        id: "1",
                        room: "CB101",
                        state: "inactive",
                        issue: "Power Issue"
                    },
                    {
                        id: "2",
                        room: "CB102",
                        state: "active"
                    },
                    {
                        id: "3",
                        room: "CB103",
                        state: "maintenance",
                        issue: "HVAC System Repair"
                    },
                    {
                        id: "4",
                        room: "CB104",
                        state: "active"
                    },
                    {
                        id: "5",
                        room: "CB105",
                        state: "inactive",
                        issue: "Lighting Malfunction"
                    },
                    {
                        id: "6",
                        room: "CB106",
                        state: "active"
                    }
                ]
            },
            {
                id: "2",
                block: "Second Floor",
                rooms: [
                    {
                        id: "7",
                        room: "CB201",
                        state: "active"
                    },
                    {
                        id: "8",
                        room: "CB202",
                        state: "inactive",
                        issue: "Network Connectivity Issues"
                    },
                    {
                        id: "9",
                        room: "CB203",
                        state: "active"
                    },
                    {
                        id: "10",
                        room: "CB204",
                        state: "maintenance",
                        issue: "Floor Renovation"
                    },
                    {
                        id: "11",
                        room: "CB205",
                        state: "active"
                    },
                    {
                        id: "12",
                        room: "CB206",
                        state: "inactive",
                        issue: "Door Lock Malfunction"
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        block: "Mechanical block",
        states: {
            id: "2",
            active: 15,
            inactive: 8,
            maintenance: 2
        },
        floors: [
            {
                id: "1",
                block: "First-Floor",
                rooms: [
                    {
                        id: "1",
                        room: "MB101",
                        state: "active"
                    },
                    {
                        id: "2",
                        room: "MB102",
                        state: "maintenance",
                        issue: "Equipment Overhaul"
                    },
                    {
                        id: "3",
                        room: "MB103",
                        state: "active"
                    },
                    {
                        id: "4",
                        room: "MB104",
                        state: "inactive",
                        issue: "Cooling System Failure"
                    },
                    {
                        id: "5",
                        room: "MB105",
                        state: "active"
                    }
                ]
            },
            {
                id: "2",
                block: "Second Floor",
                rooms: [
                    {
                        id: "18",
                        room: "MB201",
                        state: "active"
                    },
                    {
                        id: "19",
                        room: "MB202",
                        state: "inactive",
                        issue: "Ventilation Problem"
                    },
                    {
                        id: "20",
                        room: "MB203",
                        state: "active"
                    },
                    {
                        id: "21",
                        room: "MB204",
                        state: "active"
                    },
                    {
                        id: "22",
                        room: "MB205",
                        state: "inactive",
                        issue: "Water Leak Detection"
                    }
                ]
            }
        ]
    },
    {
        id: "3",
        block: "Administrative block",
        states: {
            id: "3",
            active: 12,
            inactive: 6,
            maintenance: 4
        },
        floors: [
            {
                id: "1",
                block: "First-Floor",
                rooms: [
                    {
                        id: "23",
                        room: "AB101",
                        state: "active"
                    },
                    {
                        id: "24",
                        room: "AB102",
                        state: "maintenance",
                        issue: "Carpet Replacement"
                    },
                    {
                        id: "25",
                        room: "AB103",
                        state: "active"
                    },
                    {
                        id: "26",
                        room: "AB104",
                        state: "inactive",
                        issue: "Electrical Circuit Issues"
                    },
                    {
                        id: "27",
                        room: "AB105",
                        state: "active"
                    },
                    {
                        id: "28",
                        room: "AB106",
                        state: "maintenance",
                        issue: "Window Repair"
                    }
                ]
            },
            {
                id: "2",
                block: "Second Floor",
                rooms: [
                    {
                        id: "29",
                        room: "AB201",
                        state: "active"
                    },
                    {
                        id: "30",
                        room: "AB202",
                        state: "active"
                    },
                    {
                        id: "31",
                        room: "AB203",
                        state: "inactive",
                        issue: "Temperature Control Failure"
                    },
                    {
                        id: "32",
                        room: "AB204",
                        state: "active"
                    },
                    {
                        id: "33",
                        room: "AB205",
                        state: "maintenance",
                        issue: "Furniture Upgrade"
                    },
                    {
                        id: "34",
                        room: "AB206",
                        state: "active"
                    }
                ]
            }
        ]
    },
    {
        id: "4",
        block: "Research block",
        states: {
            id: "4",
            active: 18,
            inactive: 4,
            maintenance: 1
        },
        floors: [
            {
                id: "1",
                block: "First-Floor",
                rooms: [
                    {
                        id: "35",
                        room: "RB101",
                        state: "active"
                    },
                    {
                        id: "36",
                        room: "RB102",
                        state: "active"
                    },
                    {
                        id: "37",
                        room: "RB103",
                        state: "active"
                    },
                    {
                        id: "38",
                        room: "RB104",
                        state: "inactive",
                        issue: "Equipment Calibration Required"
                    },
                    {
                        id: "39",
                        room: "RB105",
                        state: "active"
                    },
                    {
                        id: "40",
                        room: "RB106",
                        state: "active"
                    }
                ]
            },
            {
                id: "2",
                block: "Second Floor",
                rooms: [
                    {
                        id: "41",
                        room: "RB201",
                        state: "active"
                    },
                    {
                        id: "42",
                        room: "RB202",
                        state: "active"
                    },
                    {
                        id: "43",
                        room: "RB203",
                        state: "maintenance",
                        issue: "Lab Equipment Upgrade"
                    },
                    {
                        id: "44",
                        room: "RB204",
                        state: "active"
                    },
                    {
                        id: "45",
                        room: "RB205",
                        state: "active"
                    },
                    {
                        id: "46",
                        room: "RB206",
                        state: "active"
                    }
                ]
            },
            {
                id: "3",
                block: "Third Floor",
                rooms: [
                    {
                        id: "47",
                        room: "RB301",
                        state: "active"
                    },
                    {
                        id: "48",
                        room: "RB302",
                        state: "active"
                    },
                    {
                        id: "49",
                        room: "RB303",
                        state: "active"
                    },
                    {
                        id: "50",
                        room: "RB304",
                        state: "inactive",
                        issue: "Gas Line Safety Check"
                    },
                    {
                        id: "51",
                        room: "RB305",
                        state: "active"
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        block: "Library block",
        states: {
            id: "5",
            active: 14,
            inactive: 9,
            maintenance: 2
        },
        floors: [
            {
                id: "1",
                block: "First-Floor",
                rooms: [
                    {
                        id: "52",
                        room: "LB101",
                        state: "active"
                    },
                    {
                        id: "53",
                        room: "LB102",
                        state: "inactive",
                        issue: "WiFi Signal Weak"
                    },
                    {
                        id: "54",
                        room: "LB103",
                        state: "active"
                    },
                    {
                        id: "55",
                        room: "LB104",
                        state: "active"
                    },
                    {
                        id: "56",
                        room: "LB105",
                        state: "maintenance",
                        issue: "Bookshelf Installation"
                    },
                    {
                        id: "57",
                        room: "LB106",
                        state: "active"
                    },
                    {
                        id: "58",
                        room: "LB107",
                        state: "inactive",
                        issue: "Sound System Malfunction"
                    }
                ]
            },
            {
                id: "2",
                block: "Second Floor",
                rooms: [
                    {
                        id: "59",
                        room: "LB201",
                        state: "active"
                    },
                    {
                        id: "60",
                        room: "LB202",
                        state: "active"
                    },
                    {
                        id: "61",
                        room: "LB203",
                        state: "inactive",
                        issue: "Projector Not Working"
                    },
                    {
                        id: "62",
                        room: "LB204",
                        state: "active"
                    },
                    {
                        id: "63",
                        room: "LB205",
                        state: "active"
                    },
                    {
                        id: "64",
                        room: "LB206",
                        state: "inactive",
                        issue: "Chair Repair Needed"
                    },
                    {
                        id: "65",
                        room: "LB207",
                        state: "active"
                    },
                    {
                        id: "66",
                        room: "LB208",
                        state: "maintenance",
                        issue: "Computer Station Upgrade"
                    }
                ]
            }
        ]
    },
    {
        id: "6",
        block: "Cafeteria block",
        states: {
            id: "6",
            active: 8,
            inactive: 12,
            maintenance: 5
        },
        floors: [
            {
                id: "1",
                block: "Ground Floor",
                rooms: [
                    {
                        id: "67",
                        room: "CF001",
                        state: "active"
                    },
                    {
                        id: "68",
                        room: "CF002",
                        state: "inactive",
                        issue: "Kitchen Equipment Failure"
                    },
                    {
                        id: "69",
                        room: "CF003",
                        state: "maintenance",
                        issue: "Deep Cleaning in Progress"
                    },
                    {
                        id: "70",
                        room: "CF004",
                        state: "active"
                    },
                    {
                        id: "71",
                        room: "CF005",
                        state: "inactive",
                        issue: "Refrigeration Unit Down"
                    },
                    {
                        id: "72",
                        room: "CF006",
                        state: "maintenance",
                        issue: "Floor Sanitization"
                    }
                ]
            },
            {
                id: "2",
                block: "First Floor",
                rooms: [
                    {
                        id: "73",
                        room: "CF101",
                        state: "inactive",
                        issue: "Exhaust Fan Repair"
                    },
                    {
                        id: "74",
                        room: "CF102",
                        state: "maintenance",
                        issue: "Table Replacement"
                    },
                    {
                        id: "75",
                        room: "CF103",
                        state: "active"
                    },
                    {
                        id: "76",
                        room: "CF104",
                        state: "inactive",
                        issue: "Water Supply Issue"
                    },
                    {
                        id: "77",
                        room: "CF105",
                        state: "active"
                    },
                    {
                        id: "78",
                        room: "CF106",
                        state: "maintenance",
                        issue: "Paint Job Scheduled"
                    },
                    {
                        id: "79",
                        room: "CF107",
                        state: "inactive",
                        issue: "Pest Control Treatment"
                    }
                ]
            }
        ]
    },
    {
        id: "7",
        block: "Sports complex",
        states: {
            id: "7",
            active: 6,
            inactive: 8,
            maintenance: 3
        },
        floors: [
            {
                id: "1",
                block: "Ground Floor",
                rooms: [
                    {
                        id: "80",
                        room: "SC001",
                        state: "active"
                    },
                    {
                        id: "81",
                        room: "SC002",
                        state: "inactive",
                        issue: "Pool Filter Clogged"
                    },
                    {
                        id: "82",
                        room: "SC003",
                        state: "maintenance",
                        issue: "Equipment Inspection"
                    },
                    {
                        id: "83",
                        room: "SC004",
                        state: "active"
                    },
                    {
                        id: "84",
                        room: "SC005",
                        state: "inactive",
                        issue: "Court Floor Damage"
                    }
                ]
            },
            {
                id: "2",
                block: "First Floor",
                rooms: [
                    {
                        id: "85",
                        room: "SC101",
                        state: "active"
                    },
                    {
                        id: "86",
                        room: "SC102",
                        state: "inactive",
                        issue: "Locker Repair Required"
                    },
                    {
                        id: "87",
                        room: "SC103",
                        state: "maintenance",
                        issue: "Gym Equipment Maintenance"
                    },
                    {
                        id: "88",
                        room: "SC104",
                        state: "active"
                    },
                    {
                        id: "89",
                        room: "SC105",
                        state: "inactive",
                        issue: "Shower Plumbing Issues"
                    },
                    {
                        id: "90",
                        room: "SC106",
                        state: "maintenance",
                        issue: "Safety Equipment Check"
                    }
                ]
            }
        ]
    },
    {
        id: "8",
        block: "Hostel block",
        states: {
            id: "8",
            active: 22,
            inactive: 15,
            maintenance: 8
        },
        floors: [
            {
                id: "1",
                block: "Ground Floor",
                rooms: [
                    {
                        id: "91",
                        room: "HB001",
                        state: "active"
                    },
                    {
                        id: "92",
                        room: "HB002",
                        state: "active"
                    },
                    {
                        id: "93",
                        room: "HB003",
                        state: "maintenance",
                        issue: "Bed Frame Replacement"
                    },
                    {
                        id: "94",
                        room: "HB004",
                        state: "active"
                    },
                    {
                        id: "95",
                        room: "HB005",
                        state: "inactive",
                        issue: "Bathroom Plumbing"
                    },
                    {
                        id: "96",
                        room: "HB006",
                        state: "active"
                    }
                ]
            },
            {
                id: "2",
                block: "First Floor",
                rooms: [
                    {
                        id: "97",
                        room: "HB101",
                        state: "active"
                    },
                    {
                        id: "98",
                        room: "HB102",
                        state: "inactive",
                        issue: "Window Glass Broken"
                    },
                    {
                        id: "99",
                        room: "HB103",
                        state: "active"
                    },
                    {
                        id: "100",
                        room: "HB104",
                        state: "maintenance",
                        issue: "Wardrobe Installation"
                    },
                    {
                        id: "101",
                        room: "HB105",
                        state: "active"
                    },
                    {
                        id: "102",
                        room: "HB106",
                        state: "inactive",
                        issue: "Fan Not Working"
                    },
                    {
                        id: "103",
                        room: "HB107",
                        state: "active"
                    },
                    {
                        id: "104",
                        room: "HB108",
                        state: "maintenance",
                        issue: "Wall Painting"
                    }
                ]
            },
            {
                id: "3",
                block: "Second Floor",
                rooms: [
                    {
                        id: "105",
                        room: "HB201",
                        state: "active"
                    },
                    {
                        id: "106",
                        room: "HB202",
                        state: "active"
                    },
                    {
                        id: "107",
                        room: "HB203",
                        state: "inactive",
                        issue: "Hot Water Heater Issue"
                    },
                    {
                        id: "108",
                        room: "HB204",
                        state: "maintenance",
                        issue: "Mattress Replacement"
                    },
                    {
                        id: "109",
                        room: "HB205",
                        state: "active"
                    },
                    {
                        id: "110",
                        room: "HB206",
                        state: "inactive",
                        issue: "Internet Connection Down"
                    },
                    {
                        id: "111",
                        room: "HB207",
                        state: "active"
                    },
                    {
                        id: "112",
                        room: "HB208",
                        state: "maintenance",
                        issue: "Desk Repair"
                    }
                ]
            },
            {
                id: "4",
                block: "Third Floor",
                rooms: [
                    {
                        id: "113",
                        room: "HB301",
                        state: "active"
                    },
                    {
                        id: "114",
                        room: "HB302",
                        state: "inactive",
                        issue: "Door Lock Malfunction"
                    },
                    {
                        id: "115",
                        room: "HB303",
                        state: "active"
                    },
                    {
                        id: "116",
                        room: "HB304",
                        state: "maintenance",
                        issue: "Room Deep Cleaning"
                    },
                    {
                        id: "117",
                        room: "HB305",
                        state: "inactive",
                        issue: "Electrical Socket Problem"
                    },
                    {
                        id: "118",
                        room: "HB306",
                        state: "active"
                    },
                    {
                        id: "119",
                        room: "HB307",
                        state: "maintenance",
                        issue: "Curtain Installation"
                    }
                ]
            }
        ]
    }
];
