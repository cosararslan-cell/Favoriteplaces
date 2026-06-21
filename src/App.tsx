import { useState, useEffect, useRef } from 'react';

const CATS = [
  { name: 'Yemek', icon: '🍽️', color: '#ff6b6b' },
  { name: 'Kafe', icon: '☕', color: '#a29bfe' },
  { name: 'Doğa', icon: '🌿', color: '#55efc4' },
  { name: 'Alışveriş', icon: '🛍️', color: '#fd79a8' },
  { name: 'Spor', icon: '⚽', color: '#74b9ff' },
  { name: 'Gece Hayatı', icon: '🌙', color: '#f9ca24' },
  { name: 'Aile', icon: '👨‍👩‍👧', color: '#badc58' },
  { name: 'Kahvaltı', icon: '🥐', color: '#e17055' },
  { name: 'Diğer', icon: '⭐', color: '#dfe6e9' },
];

const TREND_DATA = [
  {
    id: 't1',
    name: 'Mandabatmaz',
    cat: 'Kafe',
    city: 'Beyoğlu',
    score: 98,
    saves: 1240,
    rise: '+42%',
    hot: true,
    rating: 4.8,
    price: '₺₺',
    img: '☕',
    desc: "1967'den beri aynı tarifte Türk kahvesi.",
    tags: ['tarihi', 'kahve', 'instagrammable'],
  },
  {
    id: 't2',
    name: 'Karaköy Güllüoğlu',
    cat: 'Kahvaltı',
    city: 'Karaköy',
    score: 95,
    saves: 980,
    rise: '+38%',
    hot: true,
    rating: 4.9,
    price: '₺₺',
    img: '🥐',
    desc: "İstanbul'un efsane baklavacısı.",
    tags: ['baklava', 'tatlı', 'efsane'],
  },
  {
    id: 't3',
    name: 'Belgrad Ormanı',
    cat: 'Doğa',
    city: 'Sarıyer',
    score: 91,
    saves: 870,
    rise: '+29%',
    hot: false,
    rating: 4.7,
    price: '₺',
    img: '🌿',
    desc: 'Şehrin kalbinde nefes alan bir orman.',
    tags: ['doğa', 'yürüyüş', 'piknik'],
  },
  {
    id: 't4',
    name: 'Zorlu Center',
    cat: 'Alışveriş',
    city: 'Beşiktaş',
    score: 87,
    saves: 760,
    rise: '+21%',
    hot: false,
    rating: 4.5,
    price: '₺₺₺',
    img: '🛍️',
    desc: 'Lüks AVM ve sahneler bir arada.',
    tags: ['alışveriş', 'sinema', 'restoranlar'],
  },
  {
    id: 't5',
    name: "Berk'in Meyhane",
    cat: 'Gece Hayatı',
    city: 'Cihangir',
    score: 84,
    saves: 650,
    rise: '+18%',
    hot: true,
    rating: 4.6,
    price: '₺₺₺',
    img: '🌙',
    desc: 'Canlı müzik ve rakının buluştuğu nokta.',
    tags: ['meyhane', 'müzik', 'rakı'],
  },
  {
    id: 't6',
    name: 'Mini Mutfak',
    cat: 'Yemek',
    city: 'Kadıköy',
    score: 80,
    saves: 540,
    rise: '+15%',
    hot: false,
    rating: 4.7,
    price: '₺₺',
    img: '🍽️',
    desc: 'Ev yemeği tadında küçük bir bistro.',
    tags: ['ev yemeği', 'küçük', 'lezzetli'],
  },
];

const NEARBY_DATA = [
  {
    id: 'n1',
    name: 'Brew Lab Coffee',
    cat: 'Kafe',
    dist: '0.3 km',
    saves: 320,
    rating: 4.7,
    price: '₺₺',
    img: '☕',
    city: 'Nişantaşı',
  },
  {
    id: 'n2',
    name: 'Çiçek Pasajı',
    cat: 'Yemek',
    dist: '0.7 km',
    saves: 890,
    rating: 4.5,
    price: '₺₺₺',
    img: '🍽️',
    city: 'Beyoğlu',
  },
  {
    id: 'n3',
    name: 'Maçka Parkı',
    cat: 'Doğa',
    dist: '1.1 km',
    saves: 210,
    rating: 4.6,
    price: '₺',
    img: '🌿',
    city: 'Şişli',
  },
  {
    id: 'n4',
    name: 'Istinye Park',
    cat: 'Alışveriş',
    dist: '1.4 km',
    saves: 670,
    rating: 4.4,
    price: '₺₺₺',
    img: '🛍️',
    city: 'Sarıyer',
  },
  {
    id: 'n5',
    name: 'Gile Restaurant',
    cat: 'Yemek',
    dist: '1.8 km',
    saves: 430,
    rating: 4.8,
    price: '₺₺₺',
    img: '🍽️',
    city: 'Nişantaşı',
  },
];

const FRIENDS_DATA = [
  {
    id: 'f1',
    name: 'Ege K.',
    avatar: 'EK',
    color: '#a29bfe',
    place: 'Mandabatmaz',
    time: '2 saat önce',
    action: 'kaydetti',
  },
  {
    id: 'f2',
    name: 'Mira T.',
    avatar: 'MT',
    color: '#fd79a8',
    place: 'Gile Restaurant',
    time: '5 saat önce',
    action: '5⭐ verdi',
  },
  {
    id: 'f3',
    name: 'Can A.',
    avatar: 'CA',
    color: '#55efc4',
    place: 'Belgrad Ormanı',
    time: '1 gün önce',
    action: 'ziyaret etti',
  },
  {
    id: 'f4',
    name: 'Selin Y.',
    avatar: 'SY',
    color: '#f9ca24',
    place: 'Zorlu Center',
    time: '1 gün önce',
    action: 'kaydetti',
  },
  {
    id: 'f5',
    name: 'Berk D.',
    avatar: 'BD',
    color: '#ff9f43',
    place: 'Karaköy Güllüoğlu',
    time: '2 gün önce',
    action: 'liste oluşturdu',
  },
];

const INFLUENCERS = [
  {
    id: 'inf1',
    name: 'Yemek Dünyası',
    handle: '@yemekdunyasi',
    followers: '124K',
    avatar: '🍴',
    bio: "İstanbul'un en iyi restoranlarını keşfediyorum.",
    places: 48,
    lists: 7,
  },
  {
    id: 'inf2',
    name: 'Kafe Gezgin',
    handle: '@kafegezgin',
    followers: '89K',
    avatar: '☕',
    bio: 'Her şehirde en iyi kahveyi arıyorum.',
    places: 73,
    lists: 5,
  },
  {
    id: 'inf3',
    name: 'Şehir Rehberi',
    handle: '@sehirrehberi',
    followers: '210K',
    avatar: '🗺️',
    bio: "Türkiye'nin gizli cennetlerini paylaşıyorum.",
    places: 156,
    lists: 14,
  },
];

const BADGES = [
  { icon: '🗺️', name: 'Kaşif', desc: 'İlk mekanını ekledin', earned: true },
  { icon: '⭐', name: 'Koleksiyoner', desc: '10 mekan kaydet', earned: false },
  {
    icon: '🔥',
    name: 'Trend Avcısı',
    desc: 'Trend mekan kaydet',
    earned: true,
  },
  { icon: '👥', name: 'Sosyal', desc: '3 arkadaş ekle', earned: false },
  {
    icon: '🏆',
    name: 'Şampiyon',
    desc: 'Şehir sıralamasına gir',
    earned: false,
  },
  { icon: '💎', name: 'Uzman', desc: '50 mekan kaydet', earned: false },
];

const LEADERBOARD = [
  { rank: 1, name: 'Şehir Rehberi', places: 156, avatar: '🗺️' },
  { rank: 2, name: 'Kafe Gezgin', places: 73, avatar: '☕' },
  { rank: 3, name: 'Yemek Dünyası', places: 48, avatar: '🍴' },
  { rank: 4, name: 'Sen', places: 0, avatar: '👤', isMe: true },
];

const REVIEWS = {
  t1: [
    {
      u: 'Ege K.',
      t: '2 gün önce',
      r: 5,
      txt: "İstanbul'da Türk kahvesi için tek adres!",
    },
    {
      u: 'Mira T.',
      t: '5 gün önce',
      r: 5,
      txt: "Tarihi atmosfer ve muhteşem kahve. Beyoğlu'nda olmazsa olmaz.",
    },
  ],
  t2: [
    {
      u: 'Can A.',
      t: '1 gün önce',
      r: 5,
      txt: 'Baklava burada farklı bir lezzete ulaşıyor.',
    },
    {
      u: 'Selin Y.',
      t: '3 gün önce',
      r: 4,
      txt: 'Fıstıklı baklava inanılmaz!',
    },
  ],
  default: [
    {
      u: 'Ziyaretçi',
      t: '1 hafta önce',
      r: 4,
      txt: 'Kesinlikle tavsiye ederim.',
    },
    {
      u: 'Kullanıcı',
      t: '2 hafta önce',
      r: 5,
      txt: 'Harika bir deneyimdi, tekrar geleceğim.',
    },
  ],
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0f;--s1:#13111e;--s2:#1c1a2e;--s3:#26233d;
  --border:#2e2a45;--border2:#403b60;
  --acc:#e040fb;--acc2:#ff6b9d;
  --grad:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045);
  --grad2:linear-gradient(135deg,#e040fb,#ff6b9d);
  --text:#f0ecff;--muted:#6b6585;--muted2:#a099c0;
  --danger:#ff5252;--warn:#ffca28;
}
body,html{height:100%;overflow:hidden}
.app{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);height:100vh;display:flex;flex-direction:column;overflow:hidden}

.hdr{background:var(--s1);border-bottom:1px solid var(--border);padding:0 16px;height:54px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;z-index:300}
.hdr-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
.logo-icon{width:32px;height:32px;border-radius:10px;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(224,64,251,.4)}
.logo-text{font-weight:800;font-size:16px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hdr-right{display:flex;align-items:center;gap:8px}
.hdr-icon{width:36px;height:36px;border-radius:10px;background:var(--s2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;position:relative;transition:all .15s}
.hdr-icon:hover{background:var(--s3)}
.ndot{position:absolute;top:5px;right:5px;width:6px;height:6px;background:var(--danger);border-radius:50%;border:1.5px solid var(--s1)}
.hdr-ai{padding:0 14px;height:36px;border-radius:10px;background:var(--grad);border:none;color:#fff;font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(224,64,251,.4);white-space:nowrap;transition:opacity .15s}
.hdr-ai:hover{opacity:.88}

.bnav{background:var(--s1);border-top:1px solid var(--border);display:flex;height:56px;flex-shrink:0;z-index:300;padding:0 4px}
.bn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;padding:6px 2px;border-radius:10px;border:none;background:transparent;color:var(--muted);font-family:inherit;transition:all .15s}
.bn:hover{background:var(--s2)}
.bn.on{color:var(--acc2)}
.bn-ico{font-size:18px;line-height:1}
.bn-lbl{font-size:9px;font-weight:500}
.bn.on .bn-ico{filter:drop-shadow(0 0 5px var(--acc))}

.screen{flex:1;overflow-y:auto;overflow-x:hidden}
.screen::-webkit-scrollbar{width:3px}
.screen::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

.hero{padding:18px 16px 10px}
.hero-title{font-size:22px;font-weight:800;margin-bottom:2px}
.hero-sub{font-size:13px;color:var(--muted2)}
.hero-grad{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

.story-row{display:flex;gap:12px;padding:4px 16px 16px;overflow-x:auto;scrollbar-width:none}
.story-row::-webkit-scrollbar{display:none}
.story{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;flex-shrink:0}
.story-ring{width:64px;height:64px;border-radius:50%;padding:2.5px;background:var(--grad)}
.story-ring.off{background:var(--border)}
.story-inner{width:100%;height:100%;border-radius:50%;background:var(--s2);display:flex;align-items:center;justify-content:center;font-size:22px;border:2px solid var(--bg)}
.story-lbl{font-size:10px;color:var(--muted2);text-align:center;max-width:64px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}

.sh{display:flex;align-items:center;justify-content:space-between;padding:4px 16px 10px}
.sh-title{font-size:15px;font-weight:700}
.sh-more{font-size:11px;color:var(--acc2);cursor:pointer;background:none;border:none;font-family:inherit}

.hscroll{display:flex;gap:12px;padding:0 16px 18px;overflow-x:auto;scrollbar-width:none}
.hscroll::-webkit-scrollbar{display:none}

.pc{width:160px;flex-shrink:0;background:var(--s1);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:all .2s;box-shadow:0 4px 16px rgba(0,0,0,.3)}
.pc:hover{transform:translateY(-3px);border-color:var(--border2);box-shadow:0 10px 28px rgba(0,0,0,.4)}
.pc-img{height:100px;display:flex;align-items:center;justify-content:center;font-size:44px;position:relative}
.pc-hot{position:absolute;top:8px;right:8px;background:var(--danger);color:#fff;font-size:9px;font-weight:700;padding:3px 7px;border-radius:20px}
.pc-rise{position:absolute;top:8px;left:8px;background:rgba(0,0,0,.5);color:#fff;font-size:9px;font-weight:600;padding:3px 7px;border-radius:20px;backdrop-filter:blur(4px)}
.pc-body{padding:10px 12px}
.pc-name{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px}
.pc-meta{display:flex;align-items:center;justify-content:space-between}
.pc-city{font-size:10px;color:var(--muted2)}
.pc-rating{font-size:10px;color:var(--warn);font-weight:700}
.pc-saves{font-size:10px;color:var(--muted);margin-top:3px}

.fc{background:var(--s1);border:1px solid var(--border);border-radius:16px;margin:0 16px 12px;overflow:hidden;cursor:pointer;transition:all .15s}
.fc:hover{border-color:var(--border2)}
.fc-top{display:flex;align-items:center;gap:10px;padding:12px}
.fc-ico{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.fc-info{flex:1;min-width:0}
.fc-name{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fc-sub{font-size:11px;color:var(--muted2);margin-top:2px;display:flex;gap:6px}
.fc-right{display:flex;flex-direction:column;align-items:flex-end;gap:4px}
.tag{font-size:9px;font-weight:700;padding:3px 8px;border-radius:20px;white-space:nowrap}
.t-hot{background:rgba(255,82,82,.15);color:var(--danger)}
.t-trend{background:rgba(255,202,40,.12);color:var(--warn)}
.t-acc{background:rgba(224,64,251,.12);color:var(--acc)}
.t-near{background:rgba(85,239,196,.12);color:#55efc4}
.fc-bar{height:3px;background:var(--s3);margin:0 12px 12px}
.fc-fill{height:100%;border-radius:2px;background:var(--grad2)}

.ff{display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border)}
.ff-ava{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;border:2px solid var(--border)}
.ff-body{flex:1;min-width:0}
.ff-name{font-size:12px;font-weight:600}
.ff-act{font-size:11px;color:var(--muted2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ff-time{font-size:10px;color:var(--muted);flex-shrink:0}

.infc{background:var(--s1);border:1px solid var(--border);border-radius:16px;margin:0 16px 12px;padding:14px;cursor:pointer;transition:all .15s}
.infc:hover{border-color:var(--border2)}
.infc-top{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.infc-ava{width:44px;height:44px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;border:2px solid var(--border2)}
.infc-name{font-size:13px;font-weight:700}
.infc-handle{font-size:10px;color:var(--muted2)}
.infc-bio{font-size:11px;color:var(--muted2);line-height:1.5;margin-bottom:10px}
.infc-footer{display:flex;align-items:center;justify-content:space-between}
.infc-stats{display:flex;gap:14px}
.infc-s{font-size:10px;color:var(--muted)}
.infc-s span{color:var(--text);font-weight:700}
.follow-btn{height:28px;padding:0 12px;border-radius:8px;border:1px solid var(--acc);background:transparent;color:var(--acc);font-family:inherit;font-size:11px;font-weight:600;cursor:pointer;transition:all .15s}
.follow-btn.on,.follow-btn:hover{background:var(--grad2);color:#fff;border-color:transparent}

.prof-hero{background:linear-gradient(180deg,var(--s2),var(--bg));padding:28px 16px 20px;text-align:center;border-bottom:1px solid var(--border)}
.prof-ava{width:72px;height:72px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-size:28px;margin:0 auto 10px;box-shadow:0 0 0 3px var(--bg),0 0 0 5px var(--acc)}
.prof-name{font-size:18px;font-weight:800}
.prof-lvl{font-size:11px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:600;margin-top:3px}
.prof-stats{display:flex;justify-content:center;gap:28px;margin-top:16px}
.ps-n{font-size:20px;font-weight:800}
.ps-l{font-size:10px;color:var(--muted);margin-top:1px}
.badge-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:14px}
.bgc{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:14px 8px;text-align:center}
.bgc.earned{border-color:var(--acc);background:rgba(224,64,251,.07)}
.bgc-ico{font-size:24px;margin-bottom:6px;filter:grayscale(1) opacity(.3)}
.bgc.earned .bgc-ico{filter:none}
.bgc-name{font-size:11px;font-weight:600;margin-bottom:2px}
.bgc-desc{font-size:9px;color:var(--muted)}
.lb-row{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border)}
.lb-rank{font-size:14px;font-weight:800;width:24px;text-align:center;flex-shrink:0}
.lb-ava{width:32px;height:32px;border-radius:50%;background:var(--s2);display:flex;align-items:center;justify-content:center;font-size:14px;border:1px solid var(--border)}
.lb-name{flex:1;font-size:13px;font-weight:500}
.lb-score{font-size:12px;font-weight:700;background:var(--grad2);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

.my-pi{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s}
.my-pi:hover{background:var(--s2)}
.my-pi-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.my-pi-info{flex:1;min-width:0}
.my-pi-name{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.my-pi-sub{font-size:10px;color:var(--muted2);margin-top:2px}
.del-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;padding:4px;transition:color .15s}
.del-btn:hover{color:var(--danger)}

.sec-lbl{font-size:10px;text-transform:uppercase;letter-spacing:1.4px;color:var(--muted);padding:14px 16px 8px;font-weight:600}

.map-modal{position:fixed;inset:0;z-index:500;display:flex;flex-direction:column;background:var(--bg);transform:translateY(100%);transition:transform .35s cubic-bezier(.4,0,.2,1)}
.map-modal.open{transform:translateY(0)}
.map-hdr{background:var(--s1);border-bottom:1px solid var(--border);padding:0 16px;height:50px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.map-hdr-title{font-size:14px;font-weight:700}
.map-close{background:var(--s2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:5px 12px;font-family:inherit;font-size:12px;cursor:pointer}
#leafmap{flex:1}
.map-hint{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);background:rgba(19,17,30,.9);border:1px solid var(--border);border-radius:20px;padding:6px 14px;font-size:11px;color:var(--muted2);backdrop-filter:blur(8px);white-space:nowrap;pointer-events:none;z-index:10}

.ai-modal{position:fixed;inset:0;z-index:600;background:rgba(10,10,15,.92);display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s;backdrop-filter:blur(8px)}
.ai-modal.open{opacity:1;pointer-events:all}
.ai-box{background:var(--s1);border:1px solid var(--border);border-radius:24px 24px 0 0;width:100%;max-width:520px;max-height:88vh;overflow-y:auto;padding:20px 20px 32px;transform:translateY(20px);transition:transform .25s}
.ai-modal.open .ai-box{transform:translateY(0)}
.ai-box::-webkit-scrollbar{width:3px}
.ai-box::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.ai-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 16px}
.ai-title{font-size:20px;font-weight:800;margin-bottom:3px}
.ai-sub{font-size:12px;color:var(--muted2);margin-bottom:18px}
.ai-row{margin-bottom:14px}
.ai-row label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:6px;font-weight:600}
.ai-opts{display:flex;flex-wrap:wrap;gap:6px}
.ai-opt{padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--muted2);font-family:inherit;font-size:11px;cursor:pointer;transition:all .15s}
.ai-opt.on{background:var(--grad2);border-color:transparent;color:#fff;font-weight:600}
.ai-go{width:100%;padding:13px;border-radius:12px;border:none;background:var(--grad);color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;margin-top:8px;box-shadow:0 6px 20px rgba(224,64,251,.35);transition:opacity .15s}
.ai-go:hover{opacity:.88}
.ai-loading{text-align:center;padding:28px;color:var(--muted2);font-size:13px}
.ai-spin{font-size:30px;display:block;margin-bottom:10px;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.ai-result-lbl{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin:16px 0 10px;font-weight:600}
.ai-card{background:var(--s2);border:1px solid var(--border);border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;transition:all .15s}
.ai-card:hover{border-color:var(--border2)}
.ai-card-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px}
.ai-card-name{font-size:14px;font-weight:700}
.ai-card-meta{font-size:10px;color:var(--muted2);margin-top:2px}
.ai-score{font-size:20px;font-weight:800;background:var(--grad2);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.ai-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.ai-tag{font-size:9.5px;padding:2px 8px;border-radius:20px;background:var(--s3);color:var(--muted2);border:1px solid var(--border)}
.ai-why{font-size:11px;color:var(--muted2);line-height:1.5;background:rgba(224,64,251,.06);border:1px solid rgba(224,64,251,.15);border-radius:10px;padding:9px 11px}
.ai-again{width:100%;margin-top:8px;padding:10px;border-radius:10px;background:var(--s2);border:1px solid var(--border);color:var(--text);font-family:inherit;font-size:13px;cursor:pointer}
.ai-close-btn{width:100%;margin-top:8px;padding:10px;border-radius:10px;background:transparent;border:1px solid var(--border);color:var(--muted2);font-family:inherit;font-size:12px;cursor:pointer}

.det-modal{position:fixed;inset:0;z-index:550;background:var(--bg);overflow-y:auto;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}
.det-modal.open{transform:translateX(0)}
.det-modal::-webkit-scrollbar{display:none}
.det-hero{height:200px;display:flex;align-items:center;justify-content:center;font-size:80px;position:relative;flex-shrink:0}
.det-back{position:absolute;top:14px;left:14px;background:rgba(10,10,15,.8);border:1px solid var(--border);color:var(--text);border-radius:10px;padding:7px 12px;font-family:inherit;font-size:12px;cursor:pointer;backdrop-filter:blur(6px)}
.det-body{padding:18px 16px}
.det-title{font-size:22px;font-weight:800;margin-bottom:3px}
.det-cat{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:4px 10px;border-radius:20px;margin-bottom:14px;font-weight:600}
.det-meta{display:flex;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.det-m{font-size:12px;color:var(--muted2)}
.det-desc{font-size:13px;color:var(--muted2);line-height:1.6;margin-bottom:14px}
.det-tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px}
.info-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px}
.info-row:last-child{border:none}
.info-key{color:var(--muted)}
.sec-divider{height:1px;background:var(--border);margin:12px 0}
.rating-row{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.rating-big{font-size:26px;font-weight:800}
.stars{color:var(--warn);font-size:15px;letter-spacing:1px}
.rev{background:var(--s1);border:1px solid var(--border);border-radius:12px;padding:11px;margin-bottom:8px}
.rev-top{display:flex;align-items:center;gap:8px;margin-bottom:5px}
.rev-ava{width:26px;height:26px;border-radius:50%;background:var(--s3);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0}
.rev-name{font-size:12px;font-weight:600;flex:1}
.rev-time{font-size:10px;color:var(--muted)}
.rev-txt{font-size:11px;color:var(--muted2);line-height:1.5}
.det-save{width:100%;padding:13px;border-radius:12px;border:none;background:var(--grad);color:#fff;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 6px 20px rgba(224,64,251,.3);transition:opacity .15s;margin-top:8px}
.det-save:hover{opacity:.88}
.det-save.saved{background:var(--s2);color:var(--acc);border:1px solid var(--acc);box-shadow:none}

.add-modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:700;display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s;backdrop-filter:blur(6px)}
.add-modal.open{opacity:1;pointer-events:all}
.add-box{background:var(--s1);border:1px solid var(--border);border-radius:24px 24px 0 0;width:100%;max-width:520px;padding:20px 20px 32px;transform:translateY(20px);transition:transform .25s}
.add-modal.open .add-box{transform:translateY(0)}
.field{margin-bottom:13px}
.field label{display:block;font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:5px;font-weight:600}
.field input,.field textarea{width:100%;background:var(--s2);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:inherit;font-size:13px;padding:10px 12px;outline:none;transition:border-color .15s}
.field input:focus,.field textarea:focus{border-color:var(--acc)}
.field textarea{resize:none;height:60px}
.mc-row{display:flex;flex-wrap:wrap;gap:5px}
.mc{padding:5px 11px;border-radius:20px;border:1px solid var(--border);background:transparent;color:var(--muted2);font-family:inherit;font-size:11px;cursor:pointer;transition:all .15s}
.mc.on{background:var(--grad2);border-color:transparent;color:#fff;font-weight:600}
.add-actions{display:flex;gap:8px;margin-top:16px}
.add-cancel{flex:1;padding:11px;border-radius:10px;border:1px solid var(--border);background:transparent;color:var(--muted2);font-family:inherit;font-size:13px;cursor:pointer}
.add-save{flex:2;padding:11px;border-radius:10px;border:none;background:var(--grad);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(224,64,251,.3)}

.empty{padding:48px 24px;text-align:center;color:var(--muted2)}
.empty-ico{font-size:48px;margin-bottom:14px}
.empty-txt{font-size:13px;line-height:1.7}

.toast{position:fixed;bottom:68px;left:50%;transform:translateX(-50%) translateY(12px);background:var(--s2);border:1px solid var(--border);border-radius:20px;padding:9px 16px;font-size:12px;z-index:800;opacity:0;transition:all .25s;white-space:nowrap;pointer-events:none}
.toast.on{opacity:1;transform:translateX(-50%) translateY(0)}

.leaflet-container{background:#08080f}
.leaflet-tile{filter:brightness(.72) saturate(1.2) hue-rotate(240deg)}
.leaflet-control-zoom a{background:#13111e!important;color:#f0ecff!important;border-color:#2e2a45!important}
.leaflet-control-attribution{background:rgba(10,10,15,.85)!important;color:#6b6585!important;font-size:9px!important}
.leaflet-popup-content-wrapper{background:#13111e!important;border:1px solid #2e2a45!important;border-radius:14px!important;box-shadow:0 8px 32px rgba(0,0,0,.6)!important;color:#f0ecff!important;font-family:'Inter',sans-serif!important}
.leaflet-popup-tip{background:#13111e!important}
.leaflet-popup-close-button{color:#6b6585!important;top:8px!important;right:8px!important}
`;

export default function App() {
  const mapRef = useRef(null);
  const lMap = useRef(null);
  const markers = useRef({});

  const [tab, setTab] = useState('kesif');
  const [places, setPlaces] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fp5') || '[]');
    } catch {
      return [];
    }
  });
  const [filters, setFilters] = useState(new Set(CATS.map((c) => c.name)));
  const [mapOpen, setMapOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [pending, setPending] = useState(null);
  const [pName, setPName] = useState('');
  const [pNote, setPNote] = useState('');
  const [pCat, setPCat] = useState('Kafe');
  const [toast, setToast] = useState({ msg: '', on: false });
  const [followed, setFollowed] = useState(new Set());
  const [saved, setSaved] = useState(new Set());
  const [aiCrit, setAiCrit] = useState({
    people: '2',
    budget: 'Orta ₺₺',
    dist: '5 km',
    cat: 'Herhangi',
    space: 'Farketmez',
    kids: 'Hayır',
    pet: 'Hayır',
  });
  const [aiState, setAiState] = useState('idle');
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    const s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => {
      try {
        document.head.removeChild(s);
      } catch {}
    };
  }, []);

  useEffect(() => {
    if (!mapOpen) return;
    const init = () => {
      if (!window.L || !mapRef.current || lMap.current) return;
      const L = window.L;
      const m = L.map(mapRef.current, { zoomControl: false }).setView(
        [41.015, 28.97],
        12
      );
      L.control.zoom({ position: 'bottomright' }).addTo(m);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(m);
      m.on('click', (e) => {
        setPending(e.latlng);
        setPName('');
        setPNote('');
        setPCat('Kafe');
        setAddOpen(true);
      });
      lMap.current = m;
      syncMarkers(m);
    };
    if (!window.L) {
      const s = document.createElement('script');
      s.src =
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      s.onload = init;
      document.head.appendChild(s);
    } else setTimeout(init, 80);
  }, [mapOpen]);

  function syncMarkers(m) {
    if (!m || !window.L) return;
    const L = window.L;
    Object.values(markers.current).forEach((mk) => m.removeLayer(mk));
    markers.current = {};
    places.forEach((p) => {
      const c = CATS.find((x) => x.name === p.category) || CATS[8];
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 32 42"><path d="M16 0C7.16 0 0 7.16 0 16c0 10 16 26 16 26s16-16 16-26C32 7.16 24.84 0 16 0z" fill="${c.color}"/><circle cx="16" cy="16" r="7" fill="rgba(0,0,0,.3)"/><text x="16" y="20.5" text-anchor="middle" font-size="11">${c.icon}</text></svg>`;
      const icon = L.divIcon({
        className: '',
        html: `<div style="filter:drop-shadow(0 3px 8px rgba(0,0,0,.6))">${svg}</div>`,
        iconSize: [28, 38],
        iconAnchor: [14, 38],
        popupAnchor: [0, -40],
      });
      const mk = L.marker([p.lat, p.lng], { icon })
        .addTo(m)
        .bindPopup(`<b>${p.name}</b><br/><small>${p.category}</small>`, {
          maxWidth: 180,
        });
      markers.current[p.id] = mk;
    });
  }

  useEffect(() => {
    if (lMap.current) syncMarkers(lMap.current);
  }, [places]);

  function showToast(msg) {
    setToast({ msg, on: true });
    setTimeout(() => setToast((t) => ({ ...t, on: false })), 2500);
  }

  function savePlace() {
    if (!pName.trim()) return;
    const p = {
      id: Date.now().toString(),
      name: pName.trim(),
      category: pCat,
      note: pNote.trim(),
      lat: pending.lat,
      lng: pending.lng,
    };
    const next = [...places, p];
    setPlaces(next);
    localStorage.setItem('fp5', JSON.stringify(next));
    setAddOpen(false);
    showToast(`"${p.name}" kaydedildi 📍`);
  }

  function delPlace(id) {
    const next = places.filter((p) => p.id !== id);
    setPlaces(next);
    localStorage.setItem('fp5', JSON.stringify(next));
    if (markers.current[id] && lMap.current) {
      lMap.current.removeLayer(markers.current[id]);
      delete markers.current[id];
    }
    showToast('Mekan silindi');
  }

  function toggleSave(id) {
    const n = new Set(saved);
    n.has(id) ? n.delete(id) : n.add(id);
    setSaved(n);
    showToast(n.has(id) ? 'Favorilere eklendi ⭐' : 'Kaldırıldı');
  }
  function toggleFollow(id) {
    const n = new Set(followed);
    n.has(id) ? n.delete(id) : n.add(id);
    setFollowed(n);
    showToast(n.has(id) ? 'Takip edildi' : 'Takipten çıkıldı');
  }

  async function askAI() {
    setAiState('loading');
    setAiResult(null);
    const prompt = `Mekan öneri asistanısın. Kriterlere göre İstanbul'dan 3 mekan öner.
Kriterler: Kişi:${aiCrit.people}, Bütçe:${aiCrit.budget}, Mesafe:${aiCrit.dist}, Kategori:${aiCrit.cat}, Alan:${aiCrit.space}, Çocuklu:${aiCrit.kids}, Evcil hayvan:${aiCrit.pet}
SADECE JSON döndür: [{"name":"...","category":"...","score":95,"distance":"1.2 km","rating":4.7,"price":"₺₺","why":"...","tags":["...","...","..."]}]`;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const txt = data.content?.map((i) => i.text || '').join('') || '';
      setAiResult(JSON.parse(txt.replace(/```json|```/g, '').trim()));
      setAiState('done');
    } catch {
      setAiResult([
        {
          name: 'Mandabatmaz',
          category: 'Kafe',
          score: 97,
          distance: '0.8 km',
          rating: 4.8,
          price: '₺₺',
          why: 'Tarihi atmosferi ve eşsiz kahvesiyle profilinize en uygun seçim.',
          tags: ['tarihi', 'kahve', 'sakin'],
        },
        {
          name: 'Gile Restaurant',
          category: 'Yemek',
          score: 91,
          distance: '1.4 km',
          rating: 4.8,
          price: '₺₺₺',
          why: 'Ödüllü mutfağı ve şık ortamıyla bütçe ve kişi sayısına ideal.',
          tags: ['ödüllü', 'modern', 'Türk mutfağı'],
        },
        {
          name: 'Maçka Parkı',
          category: 'Doğa',
          score: 85,
          distance: '2.1 km',
          rating: 4.6,
          price: '₺',
          why: 'Açık alan ve bütçe kriterlerine birebir uygun.',
          tags: ['açık alan', 'ücretsiz', 'doğa'],
        },
      ]);
      setAiState('done');
    }
  }

  function ScreenKesif() {
    return (
      <>
        <div className="hero">
          <div className="hero-title">Merhaba 👋</div>
          <div className="hero-sub">
            Bugün <span className="hero-grad">nereye gidiyoruz?</span>
          </div>
        </div>
        <div className="story-row">
          {CATS.map((c) => (
            <div
              key={c.name}
              className="story"
              onClick={() => setTab('mekanlar')}
            >
              <div className={`story-ring${filters.has(c.name) ? '' : ' off'}`}>
                <div className="story-inner">{c.icon}</div>
              </div>
              <div className="story-lbl">{c.name}</div>
            </div>
          ))}
        </div>
        <div className="sh">
          <div className="sh-title">🔥 Bu Hafta Trend</div>
          <button className="sh-more" onClick={() => setTab('trend')}>
            Tümü →
          </button>
        </div>
        <div className="hscroll">
          {TREND_DATA.filter((d) => d.hot).map((d) => {
            const c = CATS.find((x) => x.name === d.cat) || CATS[8];
            return (
              <div key={d.id} className="pc" onClick={() => setDetail(d)}>
                <div className="pc-img" style={{ background: c.color + '22' }}>
                  <span>{d.img}</span>
                  {d.hot && <div className="pc-hot">HOT</div>}
                  <div className="pc-rise">{d.rise}</div>
                </div>
                <div className="pc-body">
                  <div className="pc-name">{d.name}</div>
                  <div className="pc-meta">
                    <span className="pc-city">{d.city}</span>
                    <span className="pc-rating">★ {d.rating}</span>
                  </div>
                  <div className="pc-saves">
                    ❤️ {d.saves} · {d.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sh">
          <div className="sh-title">📡 Yakınında</div>
          <button className="sh-more" onClick={() => setTab('yakin')}>
            Tümü →
          </button>
        </div>
        <div className="hscroll">
          {NEARBY_DATA.slice(0, 4).map((d) => {
            const c = CATS.find((x) => x.name === d.cat) || CATS[8];
            return (
              <div key={d.id} className="pc" onClick={() => setDetail(d)}>
                <div className="pc-img" style={{ background: c.color + '22' }}>
                  <span>{d.img}</span>
                </div>
                <div className="pc-body">
                  <div className="pc-name">{d.name}</div>
                  <div className="pc-meta">
                    <span className="pc-city">{d.dist}</span>
                    <span className="pc-rating">★ {d.rating}</span>
                  </div>
                  <div className="pc-saves">
                    {d.price} · {d.saves} kayıt
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sh">
          <div className="sh-title">👥 Arkadaşlar</div>
          <button className="sh-more" onClick={() => setTab('arkadas')}>
            Tümü →
          </button>
        </div>
        {FRIENDS_DATA.slice(0, 3).map((f) => (
          <div key={f.id} className="ff">
            <div
              className="ff-ava"
              style={{ background: f.color + '22', borderColor: f.color }}
            >
              {f.avatar}
            </div>
            <div className="ff-body">
              <div className="ff-name">{f.name}</div>
              <div className="ff-act">
                {f.action}: <b>{f.place}</b>
              </div>
            </div>
            <div className="ff-time">{f.time}</div>
          </div>
        ))}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function ScreenTrend() {
    return (
      <>
        <div className="hero">
          <div className="hero-title">🔥 Trend</div>
          <div className="hero-sub">Son 7 günde en çok kaydedilenler</div>
        </div>
        {TREND_DATA.map((d) => {
          const c = CATS.find((x) => x.name === d.cat) || CATS[8];
          return (
            <div key={d.id} className="fc" onClick={() => setDetail(d)}>
              <div className="fc-top">
                <div className="fc-ico" style={{ background: c.color + '22' }}>
                  {d.img}
                </div>
                <div className="fc-info">
                  <div className="fc-name">{d.name}</div>
                  <div className="fc-sub">
                    <span>{d.city}</span>
                    <span>★ {d.rating}</span>
                    <span>{d.price}</span>
                  </div>
                </div>
                <div className="fc-right">
                  {d.hot && <div className="tag t-hot">🔥 HOT</div>}
                  <div className="tag t-trend">{d.rise}</div>
                </div>
              </div>
              <div className="fc-bar">
                <div className="fc-fill" style={{ width: d.score + '%' }} />
              </div>
            </div>
          );
        })}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function ScreenYakin() {
    return (
      <>
        <div className="hero">
          <div className="hero-title">📡 Yakında</div>
          <div className="hero-sub">Sana en yakın popüler mekanlar</div>
        </div>
        {NEARBY_DATA.map((d) => {
          const c = CATS.find((x) => x.name === d.cat) || CATS[8];
          return (
            <div key={d.id} className="fc" onClick={() => setDetail(d)}>
              <div className="fc-top">
                <div className="fc-ico" style={{ background: c.color + '22' }}>
                  {d.img}
                </div>
                <div className="fc-info">
                  <div className="fc-name">{d.name}</div>
                  <div className="fc-sub">
                    <span>{d.city}</span>
                    <span>★ {d.rating}</span>
                  </div>
                </div>
                <div className="fc-right">
                  <div className="tag t-near">📍 {d.dist}</div>
                  <div className="tag t-acc">{d.price}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function ScreenArkadas() {
    return (
      <>
        <div className="hero">
          <div className="hero-title">👥 Sosyal</div>
          <div className="hero-sub">Arkadaşların ve takip ettiklerin</div>
        </div>
        <div className="sec-lbl">Aktivite Akışı</div>
        {FRIENDS_DATA.map((f) => (
          <div key={f.id} className="ff">
            <div
              className="ff-ava"
              style={{ background: f.color + '22', borderColor: f.color }}
            >
              {f.avatar}
            </div>
            <div className="ff-body">
              <div className="ff-name">{f.name}</div>
              <div className="ff-act">
                {f.action}: <b>{f.place}</b>
              </div>
            </div>
            <div className="ff-time">{f.time}</div>
          </div>
        ))}
        <div className="sec-lbl">Öne Çıkan Hesaplar</div>
        {INFLUENCERS.map((inf) => (
          <div
            key={inf.id}
            className="infc"
            onClick={() => setDetail({ ...inf, _type: 'inf' })}
          >
            <div className="infc-top">
              <div className="infc-ava">{inf.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="infc-name">{inf.name}</div>
                <div className="infc-handle">{inf.handle}</div>
              </div>
              <button
                className={`follow-btn${followed.has(inf.id) ? ' on' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFollow(inf.id);
                }}
              >
                {followed.has(inf.id) ? '✓ Takip' : 'Takip Et'}
              </button>
            </div>
            <div className="infc-bio">{inf.bio}</div>
            <div className="infc-footer">
              <div className="infc-stats">
                <div className="infc-s">
                  <span>{inf.followers}</span> takipçi
                </div>
                <div className="infc-s">
                  <span>{inf.places}</span> mekan
                </div>
                <div className="infc-s">
                  <span>{inf.lists}</span> liste
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function ScreenMekanlar() {
    const filtered = places.filter((p) => filters.has(p.category));
    return (
      <>
        <div className="hero">
          <div className="hero-title">📍 Mekanlarım</div>
          <div className="hero-sub">{places.length} mekan kaydedildi</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '0 16px 14px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {CATS.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                const n = new Set(filters);
                n.has(c.name) ? n.delete(c.name) : n.add(c.name);
                setFilters(n);
              }}
              style={{
                padding: '4px 11px',
                borderRadius: 20,
                border: `1px solid ${
                  filters.has(c.name) ? c.color : 'var(--border)'
                }`,
                background: filters.has(c.name)
                  ? c.color + '22'
                  : 'transparent',
                color: filters.has(c.name) ? c.color : 'var(--muted)',
                fontFamily: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all .15s',
              }}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-ico">🗺️</div>
            <div className="empty-txt">
              Henüz mekan eklemediniz.
              <br />
              Haritayı açıp bir yere tıklayın.
            </div>
            <button
              onClick={() => setMapOpen(true)}
              style={{
                marginTop: 14,
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                background: 'var(--grad)',
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Haritayı Aç
            </button>
          </div>
        ) : (
          filtered.map((p) => {
            const c = CATS.find((x) => x.name === p.category) || CATS[8];
            return (
              <div key={p.id} className="my-pi" onClick={() => setDetail(p)}>
                <div
                  className="my-pi-ico"
                  style={{ background: c.color + '22' }}
                >
                  {c.icon}
                </div>
                <div className="my-pi-info">
                  <div className="my-pi-name">{p.name}</div>
                  <div className="my-pi-sub">
                    {p.category}
                    {p.note ? ' · ' + p.note.slice(0, 30) : ''}
                  </div>
                </div>
                <button
                  className="del-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    delPlace(p.id);
                  }}
                >
                  ×
                </button>
              </div>
            );
          })
        )}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function ScreenProfil() {
    return (
      <>
        <div className="prof-hero">
          <div className="prof-ava">👤</div>
          <div className="prof-name">Kullanıcı</div>
          <div className="prof-lvl">⚡ Seviye 1 — Kaşif</div>
          <div className="prof-stats">
            <div>
              <div className="ps-n">{places.length}</div>
              <div className="ps-l">Mekan</div>
            </div>
            <div>
              <div className="ps-n">0</div>
              <div className="ps-l">Liste</div>
            </div>
            <div>
              <div className="ps-n">{followed.size}</div>
              <div className="ps-l">Takip</div>
            </div>
          </div>
        </div>
        <div className="sec-lbl">Rozetler</div>
        <div className="badge-grid">
          {BADGES.map((b, i) => (
            <div key={i} className={`bgc${b.earned ? ' earned' : ''}`}>
              <div className="bgc-ico">{b.icon}</div>
              <div className="bgc-name">{b.name}</div>
              <div className="bgc-desc">{b.desc}</div>
            </div>
          ))}
        </div>
        <div className="sec-lbl">Şehir Sıralaması</div>
        {LEADERBOARD.map((l) => (
          <div
            key={l.rank}
            className="lb-row"
            style={l.isMe ? { background: 'rgba(224,64,251,.05)' } : {}}
          >
            <div
              className="lb-rank"
              style={l.rank === 1 ? { color: 'var(--warn)' } : {}}
            >
              {l.rank === 1 ? '🏆' : l.rank}
            </div>
            <div className="lb-ava">{l.avatar}</div>
            <div
              className="lb-name"
              style={l.isMe ? { color: 'var(--acc2)', fontWeight: 700 } : {}}
            >
              {l.name}
              {l.isMe ? ' (Sen)' : ''}
            </div>
            <div className="lb-score">{l.places} mekan</div>
          </div>
        ))}
        <div style={{ height: 16 }} />
      </>
    );
  }

  function DetailModal() {
    const d = detail;
    if (!d) return null;
    if (d._type === 'inf')
      return (
        <div className="det-modal open">
          <div
            className="det-hero"
            style={{
              background: 'linear-gradient(135deg,var(--s2),var(--s3))',
            }}
          >
            <button className="det-back" onClick={() => setDetail(null)}>
              ← Geri
            </button>
            <span>{d.avatar}</span>
          </div>
          <div className="det-body">
            <div className="det-title">{d.name}</div>
            <div
              style={{ fontSize: 12, color: 'var(--muted2)', marginBottom: 12 }}
            >
              {d.handle} · {d.followers} takipçi
            </div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--muted2)',
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              {d.bio}
            </p>
            <div className="det-meta">
              <div className="det-m">📍 {d.places} mekan</div>
              <div className="det-m">📋 {d.lists} liste</div>
            </div>
            <button
              className={`det-save${followed.has(d.id) ? ' saved' : ''}`}
              onClick={() => toggleFollow(d.id)}
            >
              {followed.has(d.id) ? '✓ Takiptesin' : 'Takip Et'}
            </button>
          </div>
        </div>
      );
    const c = CATS.find((x) => x.name === d.category) || CATS[8];
    const revs = REVIEWS[d.id] || REVIEWS.default;
    const isSaved = saved.has(d.id) || places.some((p) => p.name === d.name);
    return (
      <div className="det-modal open">
        <div
          className="det-hero"
          style={{
            background: `linear-gradient(135deg,${c.color}33,${c.color}11)`,
          }}
        >
          <button className="det-back" onClick={() => setDetail(null)}>
            ← Geri
          </button>
          <span>{d.img || c.icon}</span>
        </div>
        <div className="det-body">
          <div className="det-title">{d.name}</div>
          <div
            className="det-cat"
            style={{ background: c.color + '22', color: c.color }}
          >
            {c.icon} {d.category}
          </div>
          <div className="det-meta">
            {d.rating && <div className="det-m">★ {d.rating}</div>}
            {d.price && <div className="det-m">💰 {d.price}</div>}
            {d.saves && <div className="det-m">❤️ {d.saves}</div>}
            {d.score && <div className="det-m">📈 {d.score} puan</div>}
          </div>
          {d.desc && <div className="det-desc">{d.desc}</div>}
          {d.tags && (
            <div className="det-tags">
              {d.tags.map((t, i) => (
                <span key={i} className="ai-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
          <div className="sec-divider" />
          <div
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--muted)',
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Bilgiler
          </div>
          {d.city && (
            <div className="info-row">
              <span className="info-key">📍 Konum</span>
              <span>{d.city}</span>
            </div>
          )}
          {d.price && (
            <div className="info-row">
              <span className="info-key">💰 Fiyat</span>
              <span>{d.price}</span>
            </div>
          )}
          {d.rise && (
            <div className="info-row">
              <span className="info-key">📈 Trend</span>
              <span style={{ color: 'var(--acc2)' }}>{d.rise}</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-key">🕐 Çalışma</span>
            <span>09:00 – 23:00</span>
          </div>
          <div className="sec-divider" />
          <div
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--muted)',
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            Değerlendirmeler
          </div>
          <div className="rating-row">
            <div className="rating-big">{d.rating || '4.5'}</div>
            <div className="stars">★★★★★</div>
          </div>
          {revs.map((r, i) => (
            <div key={i} className="rev">
              <div className="rev-top">
                <div className="rev-ava">{r.u.slice(0, 2)}</div>
                <div className="rev-name">{r.u}</div>
                <div className="rev-time">{r.t}</div>
              </div>
              <div className="rev-txt">{r.txt}</div>
            </div>
          ))}
          <button
            className={`det-save${isSaved ? ' saved' : ''}`}
            onClick={() => toggleSave(d.id)}
          >
            {isSaved ? '✓ Kaydedildi' : '⭐ Favorilere Ekle'}
          </button>
        </div>
      </div>
    );
  }

  function AIModal() {
    const O = (label, key, opts) => (
      <div className="ai-row">
        <label>{label}</label>
        <div className="ai-opts">
          {opts.map((o) => (
            <button
              key={o}
              className={`ai-opt${aiCrit[key] === o ? ' on' : ''}`}
              onClick={() => setAiCrit((p) => ({ ...p, [key]: o }))}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <div
        className={`ai-modal${aiOpen ? ' open' : ''}`}
        onClick={(e) =>
          e.target.className?.includes?.('ai-modal') && setAiOpen(false)
        }
      >
        <div className="ai-box">
          <div className="ai-handle" />
          <div className="ai-title">✨ Nereye Gitsek?</div>
          <div className="ai-sub">
            Kriterleri seç, yapay zeka senin için seçsin
          </div>
          {O('Kaç Kişi?', 'people', ['1', '2', '3-4', '5+'])}
          {O('Bütçe?', 'budget', ['Düşük ₺', 'Orta ₺₺', 'Yüksek ₺₺₺'])}
          {O('Mesafe?', 'dist', ['1 km', '5 km', '10 km', 'Farketmez'])}
          {O('Kategori?', 'cat', [
            'Herhangi',
            'Yemek',
            'Kafe',
            'Doğa',
            'Gece Hayatı',
            'Kahvaltı',
          ])}
          {O('Alan?', 'space', ['Farketmez', 'Açık Alan', 'Kapalı Alan'])}
          {O('Çocuklu?', 'kids', ['Hayır', 'Evet'])}
          {O('Evcil Hayvan?', 'pet', ['Hayır', 'Evet'])}
          {aiState === 'idle' && (
            <button className="ai-go" onClick={askAI}>
              ✨ Öneri Al
            </button>
          )}
          {aiState === 'loading' && (
            <div className="ai-loading">
              <span className="ai-spin">⏳</span>Yapay zeka düşünüyor...
            </div>
          )}
          {aiState === 'done' && aiResult && (
            <>
              <div className="ai-result-lbl">🎯 En iyi 3 seçenek</div>
              {aiResult.map((r, i) => (
                <div
                  key={i}
                  className="ai-card"
                  onClick={() => {
                    setAiOpen(false);
                    setDetail({
                      ...r,
                      img:
                        CATS.find((x) => x.name === r.category)?.icon || '⭐',
                      id: 'ai' + i,
                    });
                  }}
                >
                  <div className="ai-card-top">
                    <div>
                      <div className="ai-card-name">{r.name}</div>
                      <div className="ai-card-meta">
                        {r.category} · {r.distance} · ★{r.rating} · {r.price}
                      </div>
                    </div>
                    <div className="ai-score">{r.score}%</div>
                  </div>
                  <div className="ai-tags">
                    {r.tags?.map((t, j) => (
                      <span key={j} className="ai-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="ai-why">💡 {r.why}</div>
                </div>
              ))}
              <button className="ai-again" onClick={() => setAiState('idle')}>
                Yeniden Ara
              </button>
            </>
          )}
          <button
            className="ai-close-btn"
            onClick={() => {
              setAiOpen(false);
              setAiState('idle');
            }}
          >
            Kapat
          </button>
        </div>
      </div>
    );
  }

  const screens = {
    kesif: <ScreenKesif />,
    trend: <ScreenTrend />,
    yakin: <ScreenYakin />,
    arkadas: <ScreenArkadas />,
    mekanlar: <ScreenMekanlar />,
    profil: <ScreenProfil />,
  };

  return (
    <div className="app">
      <div className="hdr">
        <div className="hdr-logo" onClick={() => setTab('kesif')}>
          <div className="logo-icon">📍</div>
          <div className="logo-text">Keşfet</div>
        </div>
        <div className="hdr-right">
          <div className="hdr-icon" onClick={() => setMapOpen(true)}>
            🗺️
          </div>
          <div className="hdr-icon notif" onClick={() => setTab('arkadas')}>
            🔔
            <div className="ndot" />
          </div>
          <button
            className="hdr-ai"
            onClick={() => {
              setAiOpen(true);
              setAiState('idle');
            }}
          >
            ✨ Nereye Gitsek?
          </button>
        </div>
      </div>

      <div className="screen">{screens[tab]}</div>

      <div className="bnav">
        {[
          { k: 'kesif', ico: '🏠', lbl: 'Keşfet' },
          { k: 'trend', ico: '🔥', lbl: 'Trend' },
          { k: 'yakin', ico: '📡', lbl: 'Yakında' },
          { k: 'arkadas', ico: '👥', lbl: 'Sosyal' },
          { k: 'mekanlar', ico: '📍', lbl: 'Mekanlarım' },
          { k: 'profil', ico: '👤', lbl: 'Profil' },
        ].map((b) => (
          <button
            key={b.k}
            className={`bn${tab === b.k ? ' on' : ''}`}
            onClick={() => setTab(b.k)}
          >
            <span className="bn-ico">{b.ico}</span>
            <span className="bn-lbl">{b.lbl}</span>
          </button>
        ))}
      </div>

      <div className={`map-modal${mapOpen ? ' open' : ''}`}>
        <div className="map-hdr">
          <div className="map-hdr-title">
            🗺️ Harita{' '}
            <span
              style={{ fontSize: 10, color: 'var(--muted2)', fontWeight: 400 }}
            >
              — tıklayarak mekan ekle
            </span>
          </div>
          <button className="map-close" onClick={() => setMapOpen(false)}>
            ✕ Kapat
          </button>
        </div>
        <div id="leafmap" ref={mapRef} style={{ flex: 1 }} />
        <div className="map-hint">Haritaya tıklayarak yeni mekan ekle</div>
      </div>

      <AIModal />
      {detail && <DetailModal />}

      <div
        className={`add-modal${addOpen ? ' open' : ''}`}
        onClick={(e) =>
          e.target.className?.includes?.('add-modal') && setAddOpen(false)
        }
      >
        <div className="add-box">
          <div className="ai-handle" />
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 3 }}>
            📍 Yeni Mekan
          </h2>
          <div
            style={{ fontSize: 11, color: 'var(--muted2)', marginBottom: 16 }}
          >
            {pending
              ? `${pending.lat.toFixed(4)}, ${pending.lng.toFixed(4)}`
              : ''}
          </div>
          <div className="field">
            <label>Mekan Adı</label>
            <input
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && savePlace()}
              placeholder="örn. Mandabatmaz"
              maxLength={60}
              autoFocus
            />
          </div>
          <div className="field">
            <label>Kategori</label>
            <div className="mc-row">
              {CATS.map((c) => (
                <button
                  key={c.name}
                  className={`mc${pCat === c.name ? ' on' : ''}`}
                  onClick={() => setPCat(c.name)}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Not (isteğe bağlı)</label>
            <textarea
              value={pNote}
              onChange={(e) => setPNote(e.target.value)}
              placeholder="Bu mekan hakkında..."
            />
          </div>
          <div className="add-actions">
            <button className="add-cancel" onClick={() => setAddOpen(false)}>
              İptal
            </button>
            <button className="add-save" onClick={savePlace}>
              Kaydet
            </button>
          </div>
        </div>
      </div>

      <div className={`toast${toast.on ? ' on' : ''}`}>{toast.msg}</div>
    </div>
  );
}
