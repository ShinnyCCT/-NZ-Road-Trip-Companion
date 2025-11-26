

export const FLIGHT_GROUPS = [
  {
    name: "爸爸媽媽 & 晉豪",
    sections: [
      {
        type: "去程",
        flights: [
          { date: "11/30 (日)", airline: "國泰 CX443", route: "TPE 台北 -> HKG 香港", time: "15:50 - 17:55", aircraft: "A330-300", duration: "2h 05m" },
          { date: "11/30 (日)", airline: "國泰 CX123", route: "HKG 香港 -> CHC 基督城", time: "21:05 - 13:20 (+1)", aircraft: "A350-900", duration: "11h 15m" }
        ]
      },
      {
        type: "回程",
        flights: [
          { date: "12/12 (五)", airline: "紐航 NZ", route: "CHC 基督城 -> AKL 奧克蘭", time: "17:00 - 18:25", aircraft: "Domestic", duration: "1h 25m" },
          { date: "12/13 (六)", airline: "紐航 NZ077", route: "AKL 奧克蘭 -> TPE 台北", time: "10:45 - 17:00", aircraft: "B787-9", duration: "11h 15m" }
        ]
      }
    ]
  },
  {
    name: "采璇",
    sections: [
      {
        type: "去程",
        flights: [
          { date: "11/30 (日)", airline: "國泰 CX461", route: "TPE 台北 -> HKG 香港", time: "12:25 - 14:30", aircraft: "A330-300", duration: "2h 05m" },
          { date: "11/30 (日)", airline: "國泰 CX111", route: "HKG 香港 -> SYD 雪梨", time: "19:05 - 07:15 (+1)", aircraft: "A350-900", duration: "9h 10m" },
          { date: "12/01 (一)", airline: "澳洲航空 QF137", route: "SYD 雪梨 -> CHC 基督城", time: "10:20 - 15:25", aircraft: "B737-800", duration: "3h 05m" }
        ]
      },
      {
        type: "回程",
        flights: [
          { date: "12/12 (五)", airline: "捷星航空", route: "CHC 基督城 -> AKL 奧克蘭", time: "16:20 - 17:40", aircraft: "Domestic", duration: "1h 20m" },
          { date: "12/12 (五)", airline: "華航", route: "AKL 奧克蘭 -> TPE 台北", time: "20:50 - 05:25 (+1)", aircraft: "International", duration: "11h 35m" }
        ]
      }
    ]
  }
];

export const ACCOMMODATIONS = [
  { id: "day2", days: [2    ], name: "基督城住宿", address: "https://maps.app.goo.gl/urYKLzvvBDB6tBaNA", lat: -43.5320, lng: 172.6362 },
  { id: "day3", days: [3    ], name: "蒂卡波住宿", address: "https://maps.app.goo.gl/9AoYcSiBaJ1MKD727", lat: -44.0046, lng: 170.4771 },
  { id: "day4", days: [4    ], name: "隱士飯店 (The Hermitage)", address: "https://maps.app.goo.gl/LjFsZeEiZB8QrPfr6", lat: -43.7353, lng: 170.0962 },
  { id: "day5", days: [5, 6 ], name: "瓦納卡住宿", address: "https://maps.app.goo.gl/PQ5a1goZ5SUwa85T9", lat: -44.6941, lng: 169.1255 },
  { id: "day7", days: [7, 8 ], name: "皇后鎮住宿", address: "https://maps.app.goo.gl/6Mu6VtqhndGNqgf97", lat: -45.0311, lng: 168.6626 },
  { id: "day9", days: [9, 10], name: "蒂阿瑙住宿", address: "https://maps.app.goo.gl/mB5LagDr72HS1hBF6", lat: -45.4144, lng: 167.7180 },
  { id: "day11", days: [11  ], name: "但尼丁住宿", address: "https://maps.app.goo.gl/HJ7V9BtersXQPzac6", lat: -45.8788, lng: 170.5028 },
  { id: "day12", days: [12  ], name: "基督城住宿", address: "https://maps.app.goo.gl/LQCikLnTTqXc4zrW8", lat: -43.5320, lng: 172.6362 },
  { id: "day13", days: [13  ], name: "Pullman Auckland Airport", address: "https://maps.app.goo.gl/TFP7onvC2B8r4Lz39", lat: -37.0082, lng: 174.7850 },
];

export const IMPORTANT_INFO = {
  emergency: [
    { label: "👮 報警/急救", value: "111", type: "phone" },
    { label: "🇹🇼 駐紐西蘭代表處", value: "04-473-6472", type: "phone" },
    { label: "📱 小乖的當地號碼", value: "029-026-31113", type: "phone" },
    { label: "🚗 租車公司 (ezi)", value: "0800-545-000", type: "phone" }
  ]
};

export type ActivityType = 'transport' | 'visit' | 'food' | 'rest' | 'activity' | 'hike' | 'shop' | 'star' | 'admin' | 'flight';

export interface SubActivity {
  title: string;
  notes?: string;
  location?: string;
  lat?: number;
  lng?: number;
  type?: ActivityType;
  navLink?: string;
}

export interface ActionLink {
    url: string;
    text: string;
}

export interface Activity {
  time: string;
  title: string;
  type: ActivityType;
  duration: string;
  location: string;
  notes?: string;
  lat?: number;
  lng?: number;
  isFlexible?: boolean;
  links?: ActionLink[]; 
  subActivities?: SubActivity[];
  navLink?: string; // Custom direct link for navigation
  showNav?: boolean; // Control whether to show the navigation button
  hideNav?: boolean; // Explicitly hide navigation button (legacy support)
}

export interface SunInfo {
  rise: string;
  set: string;
}

export interface WeatherInfo {
  temp: string;
  condition: string;
  desc: string;
}

export interface DayItinerary {
  date: string;
  dayLabel: string;
  location: string;
  coverImage: string;
  bgPos?: string; // CSS background-position property
  sun: SunInfo;
  weather: WeatherInfo;
  isFlightDay?: boolean;
  activities: Activity[];
}

// Airport Coordinates for Flight Paths
export const AIRPORTS = {
  TPE: { lat: 25.0797, lng: 121.2342 },
  HKG: { lat: 22.3080, lng: 113.9185 },
  SYD: { lat: -33.9399, lng: 151.1753 },
  CHC: { lat: -43.4895, lng: 172.5323 },
  AKL: { lat: -37.0082, lng: 174.7850 }
};

export const ITINERARY_DATA: DayItinerary[] = [
  { 
    date: "2025-11-30", 
    dayLabel: "Day 1", 
    location: "前往紐西蘭",
    coverImage: "https://lh3.googleusercontent.com/d/1t_OgvK_uL-Qwcq0MRwlqR_2wprmXf1Y8",
    bgPos: "center",
    sun: { rise: "--:--", set: "--:--" }, 
    weather: { temp: "--", condition: "Cloudy", desc: "飛行中" },
    isFlightDay: true,
    activities: [ 
      { 
        time: "出發前", 
        title: "紐西蘭入境申報單 (NZTD)", 
        type: "admin", 
        duration: "", 
        location: "", 
        notes: "請在出發前完成填寫，可選繁體中文",
        links: [
            { url: "https://app.travellerdeclaration.govt.nz/#/", text: "填寫申報單" },
            { url: "https://www.utsc.com.tw/knowledge/precautions-nztd", text: "查看教學" }
        ]
      },
      { 
        time: "15:50", 
        title: "前往機場搭機", 
        type: "flight", 
        duration: "", 
        location: "Taoyuan International Airport", 
        lat: 25.0797, 
        lng: 121.2342,
        notes: "分為兩組出發，請參考航班資訊確認航廈" 
      },
      {
        time: "21:05",
        title: "香港機場轉機",
        type: "flight",
        duration: "",
        location: "Hong Kong International Airport",
        lat: 22.3080,
        lng: 113.9185,
        notes: "分為兩組出發，請參考航班資訊確認航廈"
      }
    ] 
  },
  { 
    date: "2025-12-01", 
    dayLabel: "Day 2", 
    location: "抵達基督城", 
    coverImage: "https://lh3.googleusercontent.com/d/121o5bbXbqRF4pUXAVo295oaxOH2CAeoG",
    bgPos: "bottom",
    sun: { rise: "05:40", set: "21:00" }, 
    weather: { temp: "18°C", condition: "Sunny", desc: "晴時多雲" }, 
    activities: [ 
      { 
          time: "13:20", 
          title: "抵達基督城 & 取車", 
          type: "transport", 
          duration: "1.5 hr", 
          location: "EZI Car Rental Christchurch Airport",
          lat: -43.4894,
          lng: 172.5344,
          hideNav: true,
          notes: "前往 EZI 櫃台取車，預約號碼：R1LKGS" 
      }, 
      { 
        time: "15:00", 
        title: "基督城市區觀光", 
        type: "visit", 
        duration: "3-4 hr", 
        location: "Christchurch Central City",
        lat: -43.5320, 
        lng: 172.6362,
        notes: "市區景點集中，可步行遊覽",
        subActivities: [
          { title: "基督城植物園", location: "Christchurch Botanic Gardens", lat: -43.5305, lng: 172.6169, notes: "占地大，有綠意植物&漂亮花朵" },
          { title: "河岸市場 Riverside Market", location: "Riverside Market", lat: -43.5337, lng: 172.6335, notes: "多國美食市集，蜂蜜MGO濃度高且便宜" },
          { title: "基督城大教堂 & 紙教堂", location: "Christchurch Transitional Cathedral", lat: -43.5309, lng: 172.6370, notes: "附近可看到可愛電車，適合拍照" },
          { title: "C1 Espresso (早午餐)", location: "C1 Espresso", lat: -43.5345, lng: 172.6385, notes: "郵局改建的特色建築，漢堡從天花板管線投遞" }
        ]
      },
      { 
        time: "18:00", 
        title: "晚餐", 
        type: "food", 
        duration: "1.5 hr", 
        location: "Christchurch Central City", 
        lat: -43.5341, 
        lng: 172.6330, 
        notes: "",
        subActivities: [
           { title: "Athens Yacht Club (希臘菜)", location: "Athens Yacht Club", lat: -43.5341, lng: 172.6330, notes: "份量多但貴，最推Flamed Cheese & Giannis Pita Bread & Hot greek doughnt" },
           { title: "Afghan Restaurant (阿富汗菜)", location: "Afghan Restaurant", lat: -43.5285, lng: 172.6390, notes: "份量大又好吃，廚師依人頭出菜 NZD23/人，現金付款", navLink: "https://maps.app.goo.gl/PX4pWZNTfiLEUmWM9" }
        ]
      }
    ] 
  },
  { 
    date: "2025-12-02", 
    dayLabel: "Day 3", 
    location: "蒂卡波湖漫遊", 
    coverImage: "https://lh3.googleusercontent.com/d/1zHCbIpNF68rmnThOuWeaBwzKnKyqh84j",
    bgPos: "bottom",
    sun: { rise: "05:42", set: "21:05" }, 
    weather: { temp: "15°C", condition: "Cloudy", desc: "多雲轉晴" }, 
    activities: [ 
      { 
        time: "09:00", 
        title: "移動：前往蒂卡波", 
        type: "transport", 
        duration: "3.5 hr", 
        location: "Lake Tekapo", 
        lat: -44.0046, 
        lng: 170.4771, 
        notes: "長途駕駛，路途景點：",
        subActivities: [
             { title: "Barkers 果醬店", location: "Barkers of Geraldine", lat: -44.0880, lng: 171.2436, notes: "紐西蘭知名果醬，全口味可試吃" },
             { title: "Fairlie Bakehouse 鹹派", location: "Fairlie Bakehouse", lat: -44.1019, lng: 170.8295, notes: "推薦鮭魚口味鹹派" }
        ]
      }, 
      { time: "14:00", title: "牧羊人教堂 & 湖畔", type: "visit", duration: "1 hr", location: "Church of the Good Shepherd", lat: -44.0035, lng: 170.4815, notes: "內部不開放，湖畔步道散步，觀賞魯冰花海", navLink: "https://maps.app.goo.gl/vnUh9NSfbi46Xsks9" }, 
      { time: "15:30", title: "Mt. John 天文台 & Astro Cafe", type: "visit", duration: "1.5 hr", location: "Mount John Observatory", lat: -43.9859, lng: 170.4644, notes: "喝咖啡眺望蒂卡波湖全景 (需付8紐過路費)" }, 
      { time: "18:00", title: "Kohan Restaurant (日式)", type: "food", duration: "1.5 hr", location: "Kohan Restaurant", lat: -44.0049, lng: 170.4778, notes: "生鮭魚飯/壽司超級好吃，建議提前預約" }, 
      { time: "00:45", title: "觀星 (@Mt. John 天文台)", type: "visit", duration: "1.5 hr", location: "Dark Sky Project", lat: -44.0040, lng: 170.4760, notes: "國際暗空保護區的觀星體驗" } 
    ] 
  },
  { 
    date: "2025-12-03", 
    dayLabel: "Day 4", 
    location: "庫克山冰川健行", 
    coverImage: "https://lh3.googleusercontent.com/d/1_7maOh5oDG9bwZhsn1-z5-es5fJqdr-Q",
    bgPos: "bottom",
    sun: { rise: "05:45", set: "21:10" }, 
    weather: { temp: "12°C", condition: "Rain", desc: "山區多變" }, 
    activities: [ 
      { 
          time: "09:00", 
          title: "移動：前往庫克山", 
          type: "transport", 
          duration: "1 hr", 
          location: "Mount Cook Village", 
          lat: -43.7331, // Slightly offset to prevent overlap with Glacier Hike
          lng: 170.0962, 
          notes: "沿普卡基湖 (Lake Pukaki) 行駛，風景美可停留拍照",
          subActivities: [
              { title: "Mt Cook Alpine Salmon Shop", location: "Mount Cook Alpine Salmon", lat: -44.1442, lng: 170.1168, notes: "推薦購買鮭魚生魚片", navLink: "https://maps.app.goo.gl/5qL3ajXroGtbZtxq7" }
          ]
      }, 
      { time: "10:45", title: "庫克山冰川健行", type: "activity", duration: "3 hr", location: "Mount Cook Glacier Guiding", lat: -43.7333, lng: 170.0962, notes: "預約11:15場次，輕裝即可，帶水、能量棒、快樂的心", navLink: "https://maps.app.goo.gl/BmmDL3huPmZaXtL7A" }, 
      { 
          time: "15:00", 
          title: "Hooker Valley 或 Tasman Lake步道", 
          type: "hike", 
          duration: "2 hr", 
          location: "Hooker Valley Track", 
          lat: -43.7200, 
          lng: 170.1000, 
          notes: "• 庫克山步道：第一段來回約兩小時，可看到冰川湖 \n• 塔斯曼湖步道：推！來回僅需約 40 分鐘，眺望冰川末端" 
      }, 
      { time: "17:30", title: "Alpine Dinner (隱士飯店)", type: "food", duration: "1.5 hr", location: "The Hermitage Hotel", lat: -43.7353, lng: 170.0962, notes: "晚餐時間 17:00-20:30" } 
    ] 
  },
  { 
    date: "2025-12-04", 
    dayLabel: "Day 5", 
    location: "庫克山步道&薰衣草森林", 
    coverImage: "https://lh3.googleusercontent.com/d/1pjI56ZpxgxYUZlAyld2S2iTYlTtsWJsA",
    bgPos: "bottom",
    sun: { rise: "05:45", set: "21:12" }, 
    weather: { temp: "19°C", condition: "Sunny", desc: "晴朗" }, 
    activities: [ 
      { time: "09:00", title: "補漏行程 (若 D4 未完成)", type: "hike", duration: "2 hr", location: "Mount Cook Village", lat: -43.7353, lng: 170.0962, notes: "庫克山步道 or 塔斯曼湖步道" }, 
      { 
          time: "13:00", 
          title: "移動：前往瓦納卡", 
          type: "transport", 
          duration: "2.5 hr", 
          location: "Wanaka", 
          lat: -44.7000, 
          lng: 169.1167, 
          notes: "",
          subActivities: [
              { title: "High Country Salmon", location: "High Country Salmon", lat: -44.3506, lng: 170.0688, notes: "生鮭魚片或烤鮭魚都好吃", navLink: "https://maps.app.goo.gl/N6GPBjYYuh6ib5du9" }
          ]
      }, 
      { time: "15:30", title: "Wanaka Lavender Farm (薰衣草)", type: "visit", duration: "1.5 hr", location: "Wanaka Lavender Farm", lat: -44.6862, lng: 169.1756, notes: "12月是薰衣草季，也可以餵草泥馬" }, 
      { time: "18:00", title: "晚餐", type: "food", duration: "1.5 hr", location: "Wanaka", lat: -44.6964353, lng: 169.1354572, notes: "", subActivities: [
          { title: "Kai Kikokiko(烤肉)", location: "Kai Whakapai", lat: -44.6963330, lng: 169.1367828, notes: "外帶店，烤肉名店，有牛羊豬", navLink: "https://maps.app.goo.gl/a59RXhPbxFC73vx67" },
          { title: "Firebird (炸雞)", location: "Firebird Wanaka", lat: -44.6962811, lng: 169.1378297, notes: "外帶店，炸雞跟薯條都很好吃" }
      ] } 
    ] 
  },
  { 
    date: "2025-12-05", 
    dayLabel: "Day 6", 
    location: "瓦納卡跳傘", 
    coverImage: "https://lh3.googleusercontent.com/d/1giZwnc4S6zNjqEt6NqNQC3nIPVu2xE6j",
    bgPos: "bottom",
    sun: { rise: "05:45", set: "21:13" }, 
    weather: { temp: "20°C", condition: "Sunny", desc: "適合跳傘" }, 
    activities: [ 
      { time: "09:45", title: "Skydive 跳傘", type: "activity", duration: "3 hr", location: "Skydive Wanaka", lat: -44.7228, lng: 169.2432, notes: "已預約10:15場次，-帶著一顆冒險的心，挑戰人生新高度！" }, 
      { time: "13:30", title: "Scroggin Coffee (早午餐)", type: "food", duration: "1 hr", location: "Scroggin Coffee and Eatery", lat: -44.6942373, lng: 169.1373822, notes: "推薦酸種麵包配炒菇菇" }, 
      { time: "15:00", title: "Wanaka Lakefront 孤獨樹", type: "visit", duration: "1.5 hr", location: "#ThatWanakaTree", lat: -44.6983546, lng: 169.1175644, notes: "湖邊散步，與孤獨樹合影" }, 
      { time: "16:30", title: "Patagonia (冰淇淋)", type: "food", duration: "30 min", location: "Patagonia Chocolates Wanaka", lat: -44.6960527, lng: 169.1335297, notes: "紐西蘭特有口味 Hokey Pokey" },
       { time: "18:00", title: "晚餐", type: "food", duration: "1.5 hr", location: "Wanaka", lat: -44.6964353, lng: 169.1354572, notes: "", subActivities: [
          { title: "Kai Kikokiko(烤肉)", location: "Kai Whakapai", lat: -44.6963330, lng: 169.1367828, notes: "外帶店，烤肉名店，有牛羊豬", navLink: "https://maps.app.goo.gl/a59RXhPbxFC73vx67" },
          { title: "Firebird (炸雞)", location: "Firebird Wanaka", lat: -44.6962811, lng: 169.1378297, notes: "外帶店，炸雞跟薯條都很好吃" }
      ] } 
    ] 
  },
  { 
    date: "2025-12-06", 
    dayLabel: "Day 7", 
    location: "瓦納卡最美步道&箭鎮", 
    coverImage: "https://lh3.googleusercontent.com/d/1QyvIdfmjixSpeONUg05ZFrxnVpVIoBfh",
    bgPos: "bottom",
    sun: { rise: "05:46", set: "21:15" }, 
    weather: { temp: "18°C", condition: "Sunny", desc: "晴時多雲" }, 
    activities: [ 
      { time: "08:00", title: "Roy’s Peak Track步道", type: "hike", duration: "5-6 hr", location: "Roys Peak Track Car Park", lat: -44.6914, lng: 169.0505, notes: "必去!無敵景色，5-6小時路程，去偶遇牛牛羊羊吧" }, 
      { time: "13:30", title: "Pembroke Patisserie (早午餐)", type: "food", duration: "1 hr", location: "Pembroke Patisserie", lat: -44.6768, lng: 169.1615, notes: "推薦杏仁片可頌 & 原味可頌" },
      { time: "14:30", title: "移動：往皇后鎮 (經劍鎮)", type: "transport", duration: "1.5 hr", location: "Arrowtown", lat: -44.9425, lng: 168.8330, notes: "途經 Crown Range Summit (最高點觀景台)", navLink: "https://maps.app.goo.gl/p8Co1PEGMMZU84FK8" }, 
      { time: "15:30", title: "劍鎮 Arrowtown", type: "visit", duration: "1 hr", location: "Arrowtown Chinese Settlement", lat: -44.9389, lng: 168.8348, notes: "逛白金漢街與華人淘金村" }, 
      { 
        time: "18:00", 
        title: "晚餐", 
        type: "food", 
        duration: "1.5 hr", 
        location: "Queenstown", 
        lat: -45.0311, 
        lng: 168.6626, 
        notes: "",
        subActivities: [
          { title: "Fergburger 世界第一漢堡", location: "Fergburger", lat: -45.0318, lng: 168.6588, notes: "營業時間長，排隊等待時間尚可" },
          { title: "Himalaya 尼泊爾料理", location: "Himalaya Indian and Nepalese Restaurant", lat: -45.0320, lng: 168.6600, notes: "推薦MOMO 餃子跟炒麵", navLink: "https://maps.app.goo.gl/TPDRg8czdNyGRk3C6" }
        ]
      } 
    ] 
  },
  { 
    date: "2025-12-07", 
    dayLabel: "Day 8", 
    location: "皇后鎮 纜車&蒸汽船", 
    coverImage: "https://lh3.googleusercontent.com/d/1dM7UQRjAl9qDETp-_3FQnngJq7kUE4Vn",
    bgPos: "bottom",
    sun: { rise: "05:46", set: "21:16" }, 
    weather: { temp: "19°C", condition: "Sunny", desc: "舒適" }, 
    activities: [ 
      { time: "9:00", title: "Skyline Luge 溜溜車", type: "activity", duration: "2.5 hr", location: "Skyline Queenstown", lat: -45.0274, lng: 168.6526, notes: "纜車上山看風景，必玩溜溜車" }, 
      { time: "13:00", title: "Bespoke Kitchen (早午餐)", type: "food", duration: "1 hr", location: "Bespoke Kitchen", lat: -45.0300, lng: 168.6645, notes: "推薦司康，每日有特殊口味" }, 
      { time: "14:30", title: "皇后鎮市區 & ANITA GELATO (冰淇淋)", type: "visit", duration: "1.5 hr", location: "Anita Gelato", lat: -45.0317, lng: 168.6595, notes: "紐西蘭最好吃的義式冰淇淋", navLink: "https://maps.app.goo.gl/yK4BdVLtEHMmofdR6" }, 
      { time: "16:40", title: "TSS Earnslaw 蒸汽船 & BBQ", type: "activity", duration: "3.5 hr", location: "RealNZ", lat: -45.0332, lng: 168.6603, notes: "已預約17:00 場次，遊湖 + 農場 BBQ 晚餐", navLink: "https://maps.app.goo.gl/DuNGmjVe7LNwN3Ei8" } 
    ] 
  },
  { 
    date: "2025-12-08", 
    dayLabel: "Day 9", 
    location: "皇后鎮 鹿園&酒莊", 
    coverImage: "https://lh3.googleusercontent.com/d/1TDG55wL1-UDITUiAR0-IhKWLowYHAr8t",
    bgPos: "bottom",
    sun: { rise: "05:47", set: "21:18" }, 
    weather: { temp: "16°C", condition: "Cloudy", desc: "多雲" }, 
    activities: [ 
      { 
        time: "10:00", 
        title: "Deer Park Heights 鹿園高地", 
        type: "visit", 
        duration: "2 hr", 
        location: "Deer Park Heights", 
        lat: -45.0499, 
        lng: 168.7230, 
        notes: "開車看風景餵動物，需事先預約",
        links: [
            { text: "預約網址", url: "https://booking.deerparkheights.co.nz/" }
        ]
      }, 
      { time: "14:00", title: "Gibbston Valley 酒莊", type: "visit", duration: "1.5 hr", location: "Gibbston Valley Winery", lat: -45.0261, lng: 168.9458, notes: "已預約14:30場次，紅酒莊品酒行程" }, 
      { time: "17:00", title: "晚餐", type: "food", duration: "1 hr", location: "Queenstown", lat: -45.0311, lng: 168.6626, notes: "可再吃一次 Fergburger (如果還在皇后鎮)" },
      { time: "18:30", title: "移動：前往蒂阿瑙 (Te Anau)", type: "transport", duration: "2 hr", location: "Te Anau", lat: -45.4144, lng: 167.7180, notes: "吃完晚餐後開車前往" }
    ] 
  },
  { 
    date: "2025-12-09", 
    dayLabel: "Day 10", 
    location: "米佛峽灣", 
    coverImage: "https://lh3.googleusercontent.com/d/1rzO3YuiGbUDTEk8PWcovMeUdNeWRi1GR",
    bgPos: "bottom",
    sun: { rise: "05:48", set: "21:20" }, 
    weather: { temp: "14°C", condition: "Rain", desc: "峽灣常雨" }, 
    activities: [ 
      { 
          time: "09:00", 
          title: "移動：前往米佛峽灣", 
          type: "transport", 
          duration: "2.5 hr", 
          location: "Milford Sound", 
          lat: -44.6716, 
          lng: 167.9256, 
          notes: "停車場距離乘船碼頭要 30 分鐘步行距離",
          navLink: "https://maps.app.goo.gl/sNMzypt1uUvduDT16",
      }, 
      { time: "12:30", title: "米佛峽灣遊船", type: "activity", duration: "2 hr", location: "Milford Sound Cruise Terminal", lat: -44.6700, lng: 167.9261, notes: "已預約13:00 場次，需攜帶保暖衣物" }, 
      { 
        time: "16:00", 
        title: "移動：返回蒂阿瑙", 
        type: "transport", 
        duration: "2 hr", 
        location: "Te Anau", 
        lat: -45.4144, 
        lng: 167.7180, 
        notes: "原路折返，路途景點：",
        subActivities: [
          { title: "Homer Tunnel", location: "Homer Tunnel", lat: -44.7633, lng: 167.9800, notes: "荷馬隧道，運氣好可見啄羊鸚鵡" },
          { title: "Mirror Lakes", location: "Mirror Lakes Walk", lat: -44.9833, lng: 168.0167, notes: "鏡湖，天氣好時倒影極美" },
          { title: "Eglinton Valley", location: "Eglinton Valley", lat: -45.1000, lng: 167.9500, notes: "壯闊的冰川谷草原，魔戒拍攝景點" }
       ]
      }, 
      { time: "19:40", title: "Te Anau Glowworm Caves", type: "activity", duration: "2.5 hr", location: "RealNZ Te Anau", lat: -45.4182, lng: 167.7111, notes: "已預約20:15 場次，搭船欣賞藍色螢火蟲洞" } 
    ] 
  },
  { 
    date: "2025-12-10", 
    dayLabel: "Day 11", 
    location: "但尼丁看小藍企鵝", 
    coverImage: "https://lh3.googleusercontent.com/d/1_lzy2WYTzn2abswqFPZrgsjb4te3gKPJ",
    bgPos: "center", 
    sun: { rise: "05:45", set: "21:15" }, 
    weather: { temp: "17°C", condition: "Sunny", desc: "晴朗" }, 
    activities: [ 
      { 
          time: "09:00", 
          title: "移動：前往但尼丁", 
          type: "transport", 
          duration: "3.5 hr", 
          location: "Dunedin", 
          lat: -45.8788, 
          lng: 170.5028, 
          notes: "路途經過：",
          subActivities: [
              { title: "Nugget Point Lighthouse", location: "Nugget Point Lighthouse", lat: -46.4480, lng: 169.8170, notes: "經典明信片燈塔場景。" },
              { title: "Tunnel Beach 隧道海灘", location: "Tunnel Beach Track", lat: -45.9169, lng: 170.4542, notes: "海蝕洞與人工隧道。" }
          ]
      }, 
      { 
        time: "17:00", 
        title: "但尼丁市區觀光", 
        type: "visit", 
        duration: "1.5 hr", 
        location: "Dunedin", 
        lat: -45.8771, 
        lng: 170.5067,
        notes: "探索蘇格蘭風情建築",
        subActivities: [
            { title: "但尼丁車站", location: "Dunedin Railway Station", lat: -45.8771, lng: 170.5067, notes: "紐西蘭最美火車站" },
            { title: "鮑德溫街 (Baldwin St)", location: "Baldwin Street", lat: -45.8494, lng: 170.5347, notes: "世界最陡街道" }
        ]
      },
      { time: "19:00", title: "Good Good 漢堡", type: "food", duration: "1 hr", location: "Good Good Dunedin", lat: -45.8735, lng: 170.5054, notes: "餐車改建漢堡店" }, 
      { time: "20:30", title: "Blue Penguins Pukekura", type: "activity", duration: "1.5 hr", location: "Blue Penguins Pukekura", lat: -45.8731, lng: 170.7278, notes: "已預約21:00 場次，觀看小藍企鵝歸巢" } 
    ] 
  },
  { 
    date: "2025-12-11", 
    dayLabel: "Day 12", 
    location: "返回基督城", 
    coverImage: "https://lh3.googleusercontent.com/d/19Um3z5vvzigErSxzfi-S0EVGV33n6npE",
    sun: { rise: "05:40", set: "21:00" }, 
    weather: { temp: "18°C", condition: "Sunny", desc: "晴時多雲" }, 
    activities: [ 
      { 
          time: "09:00", 
          title: "移動：返回基督城", 
          type: "transport", 
          duration: "4.5 hr", 
          location: "Christchurch", 
          lat: -43.5318, // Slightly offset to prevent overlap with Dinner
          lng: 172.6362, 
          notes: "沿東海岸北上。",
          subActivities: [
              { title: "Moeraki Boulders 圓石", location: "Moeraki Boulders Beach", lat: -45.3462, lng: 170.8263, notes: "海灘上的巨大圓石" }
          ]
      }, 
      { time: "12:00", title: "Oamaru奧馬魯市區", type: "visit", duration: "1 hr", location: "Oamaru Victorian Precinct", lat: -45.1031, lng: 170.9708, notes: "奧瑪魯維多利亞特區，白色石灰岩建築群" }, 
      { time: "13:30", title: "Riverstone Kitchen 午餐", type: "food", duration: "1 hr", location: "Riverstone Kitchen", lat: -44.9649, lng: 170.9658, notes: "網路推薦，奧瑪魯北邊，使用在地食材" }, 
      { 
        time: "18:00", 
        title: "晚餐", 
        type: "food", 
        duration: "1.5 hr", 
        location: "Christchurch", 
        lat: -43.5320, 
        lng: 172.6362,
        notes: "",
        subActivities: [
           { title: "Athens Yacht Club (希臘菜)", location: "Athens Yacht Club", lat: -43.5341, lng: 172.6330, notes: "份量多但貴，最推Flamed Cheese & Giannis Pita Bread & Hot greek doughnt" },
           { title: "Afghan Restaurant (阿富汗菜)", location: "Afghan Restaurant", lat: -43.5285, lng: 172.6390, notes: "份量大又好吃，廚師依人頭出菜 NZD23/人，現金付款", navLink: "https://maps.app.goo.gl/PX4pWZNTfiLEUmWM9" }
        ]
      } 
    ] 
  },
  { 
    date: "2025-12-12", 
    dayLabel: "Day 13", 
    location: "基督城最終遊", 
    coverImage: "https://lh3.googleusercontent.com/d/1TTUw4AkOId2LxEJIKQ_bEAxkrgsgCuUa", 
    bgPos: "bottom",
    sun: { rise: "05:55", set: "20:30" }, 
    weather: { temp: "22°C", condition: "Sunny", desc: "市區漫遊" }, 
    activities: [ 
      { time: "09:00", title: "基督城市區自由活動", type: "visit", duration: "3 hr", location: "Christchurch Central City", lat: -43.5321, lng: 172.6362, notes: "享受假期尾聲，最後採買" }, 
      { time: "14:00", title: "前往機場 & 還車", type: "transport", duration: "1 hr", location: "Apex Car Rentals Christchurch Airport", lat: -43.4875, lng: 172.5373, notes: "搭乘 16:20 / 17:00 班機前往奧克蘭" }, 
      { time: "16:25", title: "前往奧克蘭", type: "flight", duration: "1.5 hr", location: "Auckland Airport", lat: -37.0082, lng: 174.7850, notes: "需備留時間還車" }, 
      { time: "19:00", title: "入住 Pullman Auckland Airport", type: "rest", duration: "", location: "Teewa Drive, Auckland Airport", lat: -37.0082, lng: 174.7850, notes: "機場旁，步行5分鐘即可抵達" } 
    ] 
  },
  { 
    date: "2025-12-13", 
    dayLabel: "Day 14", 
    location: "回程", 
    coverImage: "https://lh3.googleusercontent.com/d/1eyW4OgN49O-OCTZnO1YKaKbAErcq58Ji",
    sun: { rise: "--:--", set: "--:--" }, 
    weather: { temp: "--", condition: "Cloudy", desc: "返家" },
    isFlightDay: true,
    activities: [ 
      { time: "11:15", title: "搭機回台灣", type: "transport", duration: "11 hr", location: "Taiwan Taoyuan International Airport", lat: 25.0797, lng: 121.2342, notes: "平安回家！", navLink: "https://maps.app.goo.gl/bNQN3tzGCyv9nQaB8" } 
    ] 
  }
];