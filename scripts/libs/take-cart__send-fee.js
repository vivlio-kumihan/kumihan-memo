"use strict";

class SendFee {
  constructor(takeCartIns) {
    // 方面
    this.AREA = {
      "---": ["---"],
      "北海道": ["北海道"],
      "東北": ["青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"],
      "関東": ["東京都", "茨城県", "神奈川県", "栃木県", "千葉県", "群馬県", "山梨県", "埼玉県", "新潟県", "長野県"],
      "北陸": ["富山県", "石川県", "福井県"],
      "中部": ["静岡県", "岐阜県", "愛知県", "三重県"],
      "近畿": ["大阪府", "京都府", "兵庫県", "滋賀県", "奈良県", "和歌山県"],
      "中国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
      "四国": ["香川県", "愛媛県", "徳島県", "高知県"],
      "九州": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県"],
      "沖縄": ["沖縄県"]
    };

    this.PREFECTURE = [
      "---",
      "北海道",
      "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
      "東京都", "茨城県", "神奈川県", "栃木県", "千葉県", "群馬県", "山梨県", "埼玉県", "新潟県", "長野県",
      "富山県", "石川県", "福井県",
      "静岡県", "岐阜県", "愛知県", "三重県",
      "大阪府", "京都府", "兵庫県", "滋賀県", "奈良県", "和歌山県",
      "鳥取県", "島根県", "岡山県", "広島県", "山口県",
      "香川県", "愛媛県", "徳島県", "高知県",
      "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県",
      "沖縄県"
    ];

    // n（グラム）までの送料
    this.FEE = {
      "---": { 50: 0, 100: 0, 150: 0, 200: 0 },
      "北海道": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1860 },
      "東北": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1420 },
      "関東": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1310 },
      "北陸": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1210 },
      "中部": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1210 },
      "近畿": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1210 },
      "中国": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1210 },
      "四国": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1210 },
      "九州": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1310 },
      "沖縄": { 50: 230, 100: 250, 150: 320, 200: 480, 201: 1740 },
    };

    this.takeCartIns = takeCartIns;
    this._init();
  }

  _init() {
    this.feeCalcMth();
    // console.log(this.PREFECTURE);
  }
  
  feeCalcMth() {
    const orderedItems = this.takeCartIns.cartResultCalcIns.orderedEachItemResultMth;
    // 方面
    const prefSelected = "大阪府";
    const direction = Object.keys(this.AREA).find(key => this.AREA[key].includes(prefSelected));
    // console.log("方面=>", direction);
    // 総重量
    const totalWeight = Object.values(orderedItems).reduce((acc, obj) => {
      return acc + obj["重量小計"];
    }, 0);
    // console.log("総重量=>", totalWeight);
    // 送料の計算
    // FEE[方面][重量];
    // 条件分岐で回さないとエラーになる。
    let sendFee = 0;
    switch (true) {
      case totalWeight < 51:
        sendFee = direction && this.FEE[direction][50];
        break;
      case totalWeight < 101:
        sendFee = direction && this.FEE[direction][100];
        break;
      case totalWeight < 151:
        sendFee = direction && this.FEE[direction][150];
        break;
      case totalWeight < 201:
        sendFee = direction && this.FEE[direction][200];
        break;
      case totalWeight >= 201:
        sendFee = direction && this.FEE[direction][201];
        break;
    }
    return sendFee;
  }
}