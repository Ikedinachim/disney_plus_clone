var obj = {
  channel: "sms",
  twitterHandle: "tosin",
  facebookHandle: "tosin",
  instagramHandle: "tosin",
  snapchatHandle: "tosin",
  campaignMessage: "tosin",
  campaignType: "influencer_marketing",
  attachment:
    "https://res.cloudinary.com/mysogi/image/upload/v1642247997/assests/ddkapge1wxevtnkfwq1r.png",
  platform: {
    1: {
      id: 1,
      name: "Yusuf Oguntola",
      imagePath: "https://mysogi.uat.com.ng/1/excel_exploration.png",
      platforms: [
        {
          id: 1,
          name: "twitter",
          influencer_Id: 1,
          cost: "1000.00",
          allPlatform: false,
        },
        {
          id: 2,
          name: "instagram",
          influencer_Id: 1,
          cost: "1000.00",
          allPlatform: false,
        },
      ],
      cost: 2000,
    },
    2: {
      id: 2,
      name: "Ixoria",
      imagePath: "https://mysogi.uat.com.ng/2/Blogger.PNG",
      platforms: [
        {
          id: 6,
          name: "facebook",
          influencer_Id: 2,
          cost: "20000.00",
          allPlatform: false,
        },
      ],
      cost: 20000,
    },
  },
  price: 22000,
};

// const test = Object.values(obj.platform)
//   .map((item) => item.platforms)
//   .flat()
//   .map((item) => {
//     return {
//       id: item.id,
//       influencer_id: item.influencer_Id,
//       cost: item.cost,
//       allPlatform: item.allPlatform,
//     };
//   });

const test = Object.values(obj.platform)
  .map((item) => item.platforms)
  .map((item) => {
    console.log(item);
    const cost = item.reduce((acc, curr) => {
      acc += +parseInt(curr.cost);
      return acc;
    }, 0);
    const platform = item.map((i) => i.name).join(", ");
    const influencer_id = item[0].influencer_Id;
    const allPlatform = item[0].allPlatform;
    return { cost, platform, influencer_id, allPlatform };
  });

// console.log(test);

const data = {
  channel: obj.channel,
  twitterHandle: obj.twitterHandle,
  facebookHandle: obj.facebookHandle,
  instagramHandle: obj.instagramHandle,
  snapchatHandle: obj.snapchatHandle,
  campaignMessage: obj.campaignMessage,
  campaignType: obj.campaignType,
  attachment: obj.attachment,
  platform: test,
};

console.log(data);
