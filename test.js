const data = [
  {
    id: 4,
    location: "Along International Airport, Lagos",
    imageUrl: "https://proxi.uat.com.ng/4/billboard2.png",
    provider: "Bill",
    title: "AIRPORT BOARD",
    size: "15.73m x 8.53m",
    illumination: "Illuminated",
    traffic: "FTF Airport road",
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 4,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 4,
      },
      {
        cost: 300000,
        name: "Monthly",
        billboard_id: 4,
      },
    ],
  },
  {
    id: 3,
    location: "MM1 Arivals, International Airport, Lagos",
    imageUrl: "https://proxi.uat.com.ng/3/billboard2.png",
    provider: "Bill",
    title: "MMI BOARD",
    size: "20 x 30",
    illumination: "Illuminated",
    traffic: null,
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 3,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 3,
      },
      {
        cost: 300000,
        name: "Monthly",
        billboard_id: 3,
      },
    ],
  },
  {
    id: 8,
    location: " International Airport Road, By Toll Gate",
    imageUrl: "https://proxi.uat.com.ng/8/billboard1.jpeg",
    provider: "Digital Anny",
    title: "Digital Bill",
    size: "40*40",
    illumination: "illuminated",
    traffic: null,
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 8,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 8,
      },
      {
        cost: 300000,
        name: "Monthly",
        billboard_id: 8,
      },
    ],
  },
  {
    id: 7,
    location: "Ibadan",
    imageUrl: "https://proxi.uat.com.ng/7/billboard1.jpeg",
    provider: "Digital Anny",
    title: "Another Board",
    size: "5000X4000",
    illumination: "200",
    traffic: "Yes",
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 7,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 7,
      },
      {
        cost: 300000,
        name: "Monthly",
        billboard_id: 7,
      },
    ],
  },
  {
    id: 6,
    location: " International Airport Road, By Toll Gate",
    imageUrl: "https://proxi.uat.com.ng/6/billboard1.jpeg",
    provider: "Digital Anny",
    title: "POTRAIT BOARD",
    size: "15.73m x 8.53m",
    illumination: "Illuminated",
    traffic: " FTF Airport road",
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 6,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 6,
      },
      {
        cost: 1300000,
        name: "Monthly",
        billboard_id: 6,
      },
    ],
  },
  {
    id: 5,
    location: "Accra Ring Road",
    imageUrl: "https://proxi.uat.com.ng/5/billboard1.jpeg",
    provider: "Digital Anny",
    title: "Mounted Billboard",
    size: "40*40",
    illumination: "Illuminated",
    traffic: "1million",
    rates: [
      {
        cost: 10000,
        name: "Daily",
        billboard_id: 5,
      },
      {
        cost: 60000,
        name: "Weekly",
        billboard_id: 5,
      },
      {
        cost: 300000,
        name: "Monthly",
        billboard_id: 5,
      },
    ],
  },
];

const data2 = [
  {
    id: 1,
    name: "Yusuf Oguntola",
    kind: "blogger",
    reach: 200,
    imageUrl: "1/excel_exploration.png",
    imagePath: "https://mysogi.uat.com.ng/1/excel_exploration.png",
    allCost: "3500.00",
    createdAt: "2022-01-10T13:33:36.325Z",
    updatedAt: "2022-01-20T11:27:23.264Z",
    costs: [
      {
        id: 1,
        influencerId: 1,
        platform: "twitter",
        cost: "1000.00",
        createdAt: "2022-01-10T13:36:40.248Z",
        updatedAt: "2022-01-10T13:36:40.248Z",
      },
      {
        id: 2,
        influencerId: 1,
        platform: "instagram",
        cost: "1000.00",
        createdAt: "2022-01-10T13:36:49.534Z",
        updatedAt: "2022-01-10T13:36:49.534Z",
      },
      {
        id: 3,
        influencerId: 1,
        platform: "facebook",
        cost: "1000.00",
        createdAt: "2022-01-10T13:36:57.429Z",
        updatedAt: "2022-01-10T13:36:57.429Z",
      },
      {
        id: 4,
        influencerId: 1,
        platform: "snapchat",
        cost: "1000.00",
        createdAt: "2022-01-10T13:37:08.545Z",
        updatedAt: "2022-01-10T13:37:08.545Z",
      },
    ],
    user_image:
      "https://res.cloudinary.com/mysogi/image/upload/v1645782255/assests/adhjjl2ambzw462sz5pv.png",
  },
  {
    id: 2,
    name: "Ixoria",
    kind: "blogger",
    reach: 100000,
    imageUrl: "2/Blogger5.PNG",
    imagePath: "https://mysogi.uat.com.ng/2/Blogger5.PNG",
    allCost: "100000.00",
    createdAt: "2022-01-10T19:49:55.990Z",
    updatedAt: "2022-01-21T10:10:50.774Z",
    costs: [
      {
        id: 11,
        influencerId: 2,
        platform: "snapchat",
        cost: "2000.00",
        createdAt: "2022-01-21T10:35:59.814Z",
        updatedAt: "2022-01-21T10:35:59.814Z",
      },
      {
        id: 6,
        influencerId: 2,
        platform: "facebook",
        cost: "2000.00",
        createdAt: "2022-01-10T23:01:26.790Z",
        updatedAt: "2022-01-21T10:43:10.141Z",
      },
      {
        id: 5,
        influencerId: 2,
        platform: "instagram",
        cost: "2000.00",
        createdAt: "2022-01-10T23:00:45.097Z",
        updatedAt: "2022-01-21T10:45:01.927Z",
      },
    ],
    user_image: null,
  },
  {
    id: 3,
    name: "Lexy",
    kind: "artist",
    reach: 1200000,
    imageUrl: "3/Basketballer.PNG",
    imagePath: "https://mysogi.uat.com.ng/3/Basketballer.PNG",
    allCost: "15000.00",
    createdAt: "2022-01-10T19:55:37.647Z",
    updatedAt: "2022-01-24T08:05:22.512Z",
    costs: [],
    user_image: "",
  },
  {
    id: 5,
    name: "Lexoria",
    kind: "artist",
    reach: 50000,
    imageUrl: "5/u.Bloggeer.PNG",
    imagePath: "https://mysogi.uat.com.ng/5/u.Bloggeer.PNG",
    allCost: "15000.00",
    createdAt: "2022-01-25T18:27:47.327Z",
    updatedAt: "2022-01-25T18:27:47.355Z",
    costs: [
      {
        id: 14,
        influencerId: 5,
        platform: "instagram",
        cost: "5000.00",
        createdAt: "2022-01-25T18:32:34.634Z",
        updatedAt: "2022-01-25T18:32:34.634Z",
      },
      {
        id: 30,
        influencerId: 5,
        platform: "twitter",
        cost: "0.00",
        createdAt: "2022-03-02T11:14:38.842Z",
        updatedAt: "2022-03-02T11:14:38.842Z",
      },
      {
        id: 16,
        influencerId: 5,
        platform: "snapchat",
        cost: "2000.00",
        createdAt: "2022-01-25T18:33:23.294Z",
        updatedAt: "2022-03-02T11:14:38.854Z",
      },
      {
        id: 15,
        influencerId: 5,
        platform: "facebook",
        cost: "5000.00",
        createdAt: "2022-01-25T18:33:01.840Z",
        updatedAt: "2022-03-03T07:55:57.894Z",
      },
    ],
    user_image:
      "https://res.cloudinary.com/mysogi/image/upload/v1646294130/assests/ck7k508qmqpfwcuaxktv.jpg",
  },
  {
    id: 6,
    name: "Tijani Adelakun",
    kind: "artist",
    reach: 50000,
    imageUrl: null,
    imagePath: "",
    allCost: "15000.00",
    createdAt: "2022-02-02T22:03:24.940Z",
    updatedAt: "2022-02-02T22:03:24.940Z",
    costs: [
      {
        id: 17,
        influencerId: 6,
        platform: "snapchat",
        cost: "10000.00",
        createdAt: "2022-02-03T08:42:23.754Z",
        updatedAt: "2022-02-03T08:42:23.754Z",
      },
      {
        id: 18,
        influencerId: 6,
        platform: "instagram",
        cost: "10000.00",
        createdAt: "2022-02-03T09:08:35.167Z",
        updatedAt: "2022-02-03T09:08:35.167Z",
      },
      {
        id: 19,
        influencerId: 6,
        platform: "facebook",
        cost: "10000.00",
        createdAt: "2022-02-03T09:09:07.294Z",
        updatedAt: "2022-02-03T09:09:07.294Z",
      },
      {
        id: 20,
        influencerId: 6,
        platform: "twitter",
        cost: "5000.00",
        createdAt: "2022-02-03T09:09:30.856Z",
        updatedAt: "2022-02-03T09:09:30.856Z",
      },
    ],
    user_image: null,
  },
  {
    id: 7,
    name: "Gabriel",
    kind: "blogger",
    reach: 5000,
    imageUrl: null,
    imagePath: "",
    allCost: "20000.00",
    createdAt: "2022-02-16T16:39:03.779Z",
    updatedAt: "2022-02-16T16:39:03.779Z",
    costs: [
      {
        id: 31,
        influencerId: 7,
        platform: "snapchat",
        cost: "2000.00",
        createdAt: "2022-03-21T20:43:39.707Z",
        updatedAt: "2022-03-21T21:52:15.012Z",
      },
      {
        id: 22,
        influencerId: 7,
        platform: "facebook",
        cost: "3000.00",
        createdAt: "2022-02-16T16:45:34.083Z",
        updatedAt: "2022-03-21T21:55:24.169Z",
      },
      {
        id: 21,
        influencerId: 7,
        platform: "instagram",
        cost: "4000.00",
        createdAt: "2022-02-16T16:44:31.373Z",
        updatedAt: "2022-03-21T21:55:24.172Z",
      },
    ],
    user_image:
      "https://res.cloudinary.com/mysogi/image/upload/v1645550248/assests/hyty87vkzunf1ieezrhi.png",
  },
  {
    id: 8,
    name: "Ultrateknic",
    kind: "artist",
    reach: 2000,
    imageUrl: "8/mysogi-logo_192x192.png",
    imagePath: "https://mysogi.uat.com.ng/8/mysogi-logo_192x192.png",
    allCost: "5000.00",
    createdAt: "2022-02-17T15:38:36.228Z",
    updatedAt: "2022-02-17T15:38:36.240Z",
    costs: [
      {
        id: 26,
        influencerId: 8,
        platform: "facebook",
        cost: "1000.00",
        createdAt: "2022-02-22T10:52:46.636Z",
        updatedAt: "2022-02-22T14:53:47.078Z",
      },
      {
        id: 24,
        influencerId: 8,
        platform: "instagram",
        cost: "2000.00",
        createdAt: "2022-02-19T17:02:56.571Z",
        updatedAt: "2022-02-24T18:27:06.414Z",
      },
      {
        id: 23,
        influencerId: 8,
        platform: "twitter",
        cost: "3000.00",
        createdAt: "2022-02-17T15:39:01.150Z",
        updatedAt: "2022-02-22T10:52:46.620Z",
      },
      {
        id: 25,
        influencerId: 8,
        platform: "snapchat",
        cost: "4000.00",
        createdAt: "2022-02-22T10:52:46.625Z",
        updatedAt: "2022-02-22T10:52:46.625Z",
      },
    ],
    user_image:
      "https://res.cloudinary.com/mysogi/image/upload/v1646271600/assests/q63ttuqelajz4w3su1cz.jpg",
  },
  {
    id: 9,
    name: "Xxyborg",
    kind: "artist",
    reach: 50000,
    imageUrl: "9/Anime.PNG",
    imagePath: "https://mysogi.uat.com.ng/9/Anime.PNG",
    allCost: "15000.00",
    createdAt: "2022-02-23T06:51:21.974Z",
    updatedAt: "2022-02-23T06:51:21.992Z",
    costs: [
      {
        id: 27,
        influencerId: 9,
        platform: "snapchat",
        cost: "2000.00",
        createdAt: "2022-02-23T06:52:18.826Z",
        updatedAt: "2022-02-23T06:52:18.826Z",
      },
      {
        id: 28,
        influencerId: 9,
        platform: "facebook",
        cost: "5000.00",
        createdAt: "2022-02-23T06:52:37.456Z",
        updatedAt: "2022-02-23T06:52:37.456Z",
      },
      {
        id: 29,
        influencerId: 9,
        platform: "instagram",
        cost: "8000.00",
        createdAt: "2022-02-23T06:53:02.588Z",
        updatedAt: "2022-02-23T06:53:02.588Z",
      },
    ],
    user_image:
      "https://res.cloudinary.com/mysogi/image/upload/v1651159243/assests/yoed5fy3gpytwkwfigjh.jpg",
  },
  {
    id: 10,
    name: "Tosin",
    kind: "artist",
    reach: 50000,
    imageUrl: null,
    imagePath: "",
    allCost: "40000.00",
    createdAt: "2022-02-23T15:36:05.940Z",
    updatedAt: "2022-02-23T15:36:05.940Z",
    costs: [],
    user_image: "",
  },
  {
    id: 12,
    name: "Oye",
    kind: "artist",
    reach: 100,
    imageUrl: null,
    imagePath: "",
    allCost: "100.00",
    createdAt: "2022-03-21T21:25:31.459Z",
    updatedAt: "2022-03-21T21:25:31.459Z",
    costs: [],
    user_image: "",
  },
  {
    id: 13,
    name: "YOU",
    kind: "artist",
    reach: 202,
    imageUrl: null,
    imagePath: "",
    allCost: "200.00",
    createdAt: "2022-03-23T05:43:59.311Z",
    updatedAt: "2022-03-23T05:43:59.311Z",
    costs: [],
    user_image: null,
  },
  {
    id: 15,
    name: "Usher",
    kind: "artist",
    reach: 3000,
    imageUrl: "15/Basketballer.PNG",
    imagePath: "https://mysogi.uat.com.ng/15/Basketballer.PNG",
    allCost: "200.00",
    createdAt: "2022-05-09T12:23:58.269Z",
    updatedAt: "2022-05-09T12:23:58.289Z",
    costs: [],
    user_image: null,
  },
];
