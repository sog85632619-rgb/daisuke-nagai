// =============================================
// 電子部品 代替品データベース
// =============================================
//
// pinoutId: 同じIDの部品は同一ピン配置 → 基板変更不要で差し替え可能
//           パッケージが共通していることも条件 (isPinCompatible 参照)
//
// unitPriceJPY: 参考単価(円) / 少量購入相場の目安
//
// TO-92 ピン配置メモ (平面側から左→右):
//   2SC1815 / 2SA1015: E-C-B  (pinout: to92-ecb)
//   BC547:              C-B-E  (pinout: to92-cbe)
//   2N3904:             E-B-C  (pinout: to92-ebc)
//   ※同じTO-92でもピン順が異なるため互いに非コンパチ
// =============================================

const PARTS_DB = [
  // ── IC / オペアンプ ──────────────────────────
  {
    id: 'lm358',
    partNumber: 'LM358',
    name: '汎用デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'dual-opamp-8pin',   // DIP-8/SOP-8 標準デュアルOPアンプ配置
    unitPriceJPY: 30,
    specs: {
      voltage: { min: 3, max: 32, unit: 'V' },
      current: { max: 0.7, unit: 'A' },
      tempRange: { min: 0, max: 70, unit: '℃' },
      package: ['DIP', 'SOP'],
      bandwidth: '1 MHz',
      channels: 2,
    },
    description: 'シングルサプライ動作可能な汎用デュアルオペアンプ。',
    alternativeTo: [],
  },
  {
    id: 'lm358a',
    partNumber: 'LM358A',
    name: '汎用デュアルオペアンプ (改良版)',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'dual-opamp-8pin',
    unitPriceJPY: 35,
    specs: {
      voltage: { min: 3, max: 32, unit: 'V' },
      current: { max: 0.7, unit: 'A' },
      tempRange: { min: -40, max: 85, unit: '℃' },
      package: ['DIP', 'SOP'],
      bandwidth: '1 MHz',
      channels: 2,
    },
    description: 'LM358の改良版。低電流・低電圧動作。',
    alternativeTo: ['lm358'],
  },
  {
    id: 'rc4558',
    partNumber: 'RC4558',
    name: 'デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'dual-opamp-8pin',   // LM358と同一ピン配置
    unitPriceJPY: 40,
    specs: {
      voltage: { min: 6, max: 36, unit: 'V' },
      current: { max: 0.025, unit: 'A' },
      tempRange: { min: 0, max: 70, unit: '℃' },
      package: ['DIP', 'SOP'],
      bandwidth: '3 MHz',
      channels: 2,
    },
    description: '高スルーレートのデュアルオペアンプ。音響回路によく使用。',
    alternativeTo: ['lm358'],
  },
  {
    id: 'mcp6002',
    partNumber: 'MCP6002',
    name: 'デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Microchip',
    pinoutId: 'dual-opamp-8pin',   // DIP-8/SOP-8 同一ピン配置
    unitPriceJPY: 60,
    specs: {
      voltage: { min: 1.8, max: 6, unit: 'V' },
      current: { max: 0.025, unit: 'A' },
      tempRange: { min: -40, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      bandwidth: '1 MHz',
      channels: 2,
    },
    description: '低電圧・低消費電流デュアルオペアンプ。動作電圧範囲に注意。',
    alternativeTo: ['lm358'],
  },
  {
    id: 'ne555',
    partNumber: 'NE555',
    name: 'タイマーIC',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'timer-555-8pin',
    unitPriceJPY: 30,
    specs: {
      voltage: { min: 4.5, max: 16, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: 0, max: 70, unit: '℃' },
      package: ['DIP', 'SOP'],
      channels: 1,
    },
    description: '最も広く使われるタイマーIC。単安定・無安定マルチバイブレータ。',
    alternativeTo: [],
  },
  {
    id: 'lm555',
    partNumber: 'LM555',
    name: 'タイマーIC',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'timer-555-8pin',    // NE555と同一ピン配置
    unitPriceJPY: 40,
    specs: {
      voltage: { min: 4.5, max: 16, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      channels: 1,
    },
    description: 'NE555の広温度範囲版。ピン完全互換。',
    alternativeTo: ['ne555'],
  },
  {
    id: 'tlc555',
    partNumber: 'TLC555',
    name: 'CMOSタイマーIC',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    pinoutId: 'timer-555-8pin',    // NE555と同一ピン配置
    unitPriceJPY: 80,
    specs: {
      voltage: { min: 2, max: 15, unit: 'V' },
      current: { max: 0.1, unit: 'A' },
      tempRange: { min: -40, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      channels: 1,
    },
    description: 'CMOS版タイマーIC。低消費電流・低電圧動作。ピン互換。',
    alternativeTo: ['ne555'],
  },

  // ── トランジスタ ────────────────────────────
  {
    id: '2sc1815',
    partNumber: '2SC1815',
    name: 'NPN汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Toshiba',
    pinoutId: 'to92-ecb',          // TO-92: 平面側より E-C-B
    unitPriceJPY: 20,
    specs: {
      voltage: { max: 50, unit: 'V' },
      current: { max: 0.15, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '70〜700',
      power: '0.4 W',
    },
    description: '日本で最も広く使われるNPN汎用トランジスタ。',
    alternativeTo: [],
  },
  {
    id: 'bc547',
    partNumber: 'BC547',
    name: 'NPN汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Fairchild',
    pinoutId: 'to92-cbe',          // TO-92: 平面側より C-B-E ← 2SC1815と異なる
    unitPriceJPY: 15,
    specs: {
      voltage: { max: 45, unit: 'V' },
      current: { max: 0.1, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '110〜800',
      power: '0.5 W',
    },
    description: 'NPN汎用トランジスタ。2SC1815と特性は近いがピン順が異なるため要確認。',
    alternativeTo: ['2sc1815'],
  },
  {
    id: '2n3904',
    partNumber: '2N3904',
    name: 'NPN汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'ON Semiconductor',
    pinoutId: 'to92-ebc',          // TO-92: 平面側より E-B-C ← 2SC1815と異なる
    unitPriceJPY: 10,
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '100〜300',
      power: '0.625 W',
    },
    description: 'グローバル標準NPN汎用トランジスタ。安価・入手容易。ピン順が異なるため要確認。',
    alternativeTo: ['2sc1815'],
  },
  {
    id: '2sa1015',
    partNumber: '2SA1015',
    name: 'PNP汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Toshiba',
    pinoutId: 'to92-ecb-pnp',      // TO-92: E-C-B (PNP)
    unitPriceJPY: 20,
    specs: {
      voltage: { max: 50, unit: 'V' },
      current: { max: 0.15, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '70〜700',
      power: '0.4 W',
    },
    description: '2SC1815の相補型PNPトランジスタ。',
    alternativeTo: [],
  },

  // ── ダイオード ──────────────────────────────
  {
    id: '1n4007',
    partNumber: '1N4007',
    name: '整流ダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    pinoutId: 'diode-do41',        // DO-41: アノード/カソード標準
    unitPriceJPY: 15,
    specs: {
      voltage: { max: 1000, unit: 'V' },
      current: { max: 1, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['DO-41'],
      vf: '1.1 V',
    },
    description: '1A整流ダイオード。最大逆電圧1000V。',
    alternativeTo: [],
  },
  {
    id: '1n5819',
    partNumber: '1N5819',
    name: 'ショットキーバリアダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    pinoutId: 'diode-do41',        // DO-41: 1N4007と同一フットプリント
    unitPriceJPY: 25,
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 1, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['DO-41'],
      vf: '0.6 V',
    },
    description: '低順電圧降下ショットキーダイオード。DO-41フットプリントで1N4007と基板互換。',
    alternativeTo: ['1n4007'],
  },
  {
    id: '1n4148',
    partNumber: '1N4148',
    name: 'スイッチングダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    pinoutId: 'diode-do35',        // DO-35: 別パッケージ
    unitPriceJPY: 10,
    specs: {
      voltage: { max: 100, unit: 'V' },
      current: { max: 0.3, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['DO-35'],
      vf: '0.7 V',
    },
    description: '高速スイッチングダイオード。信号回路に最適。',
    alternativeTo: [],
  },
  {
    id: 'ss14',
    partNumber: 'SS14',
    name: 'SMDショットキーダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    pinoutId: 'diode-sma',         // SMA: 別パッケージ
    unitPriceJPY: 30,
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 1, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['SMA'],
      vf: '0.5 V',
    },
    description: '1N5819のSMD版。パッケージが異なるため基板変更が必要。',
    alternativeTo: ['1n4007', '1n5819'],
  },

  // ── MOSFET ─────────────────────────────────
  {
    id: 'irf540',
    partNumber: 'IRF540',
    name: 'N-ch パワーMOSFET',
    category: 'mosfet',
    manufacturer: 'Infineon',
    pinoutId: 'mosfet-to220-gds',  // TO-220: G-D-S
    unitPriceJPY: 100,
    specs: {
      voltage: { max: 100, unit: 'V' },
      current: { max: 28, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-220'],
      rdsOn: '0.077 Ω',
      power: '150 W',
    },
    description: '100V/28A パワーMOSFET。モータードライブ・電源回路に使用。',
    alternativeTo: [],
  },
  {
    id: 'irf540n',
    partNumber: 'IRF540N',
    name: 'N-ch パワーMOSFET (改良版)',
    category: 'mosfet',
    manufacturer: 'Infineon',
    pinoutId: 'mosfet-to220-gds',  // TO-220: IRF540と同一ピン配置
    unitPriceJPY: 120,
    specs: {
      voltage: { max: 100, unit: 'V' },
      current: { max: 33, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-220'],
      rdsOn: '0.052 Ω',
      power: '150 W',
    },
    description: 'IRF540の改良版。低オン抵抗。ピン完全互換で基板変更不要。',
    alternativeTo: ['irf540'],
  },
  {
    id: '2n7000',
    partNumber: '2N7000',
    name: 'N-ch MOSFET (小信号)',
    category: 'mosfet',
    manufacturer: 'ON Semiconductor',
    pinoutId: 'mosfet-to92-sgd',   // TO-92: S-G-D (IRF540と別パッケージ)
    unitPriceJPY: 60,
    specs: {
      voltage: { max: 60, unit: 'V' },
      current: { max: 0.115, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      rdsOn: '5 Ω',
    },
    description: '小信号N-chMOSFET。ロジック回路のスイッチングに使用。',
    alternativeTo: [],
  },
];

// =============================================
// ピン配置データベース
// =============================================
// pinoutId をキーに、各パッケージのピン配置情報を保持する。
// pins 配列: index 0 = ピン番号1 (TO-92など) / DIPは index = ピン番号 - 1

const PINOUT_DB = {
  'dual-opamp-8pin': {
    description: 'デュアルOPアンプ 8ピン標準配置',
    note: 'DIP-8 / SOP-8 共通。ピン1が切り欠き・マーク側。',
    packages: ['DIP', 'SOP'],
    pins: [
      { num: 1, name: 'OUT A',  func: '出力 A' },
      { num: 2, name: 'IN A−', func: '反転入力 A' },
      { num: 3, name: 'IN A+', func: '非反転入力 A' },
      { num: 4, name: 'GND',   func: '電源マイナス / V−' },
      { num: 5, name: 'IN B+', func: '非反転入力 B' },
      { num: 6, name: 'IN B−', func: '反転入力 B' },
      { num: 7, name: 'OUT B', func: '出力 B' },
      { num: 8, name: 'VCC',   func: '電源プラス / V+' },
    ],
  },
  'timer-555-8pin': {
    description: '555タイマー 8ピン配置',
    note: 'DIP-8 / SOP-8 共通。ピン1が切り欠き・マーク側。',
    packages: ['DIP', 'SOP'],
    pins: [
      { num: 1, name: 'GND',   func: 'グランド' },
      { num: 2, name: 'TRIG',  func: 'トリガ' },
      { num: 3, name: 'OUT',   func: '出力' },
      { num: 4, name: 'RESET', func: 'リセット (L=リセット)' },
      { num: 5, name: 'CTRL',  func: 'コントロール電圧' },
      { num: 6, name: 'THR',   func: 'しきい値' },
      { num: 7, name: 'DIS',   func: '放電' },
      { num: 8, name: 'VCC',   func: '電源' },
    ],
  },
  'to92-ecb': {
    description: 'TO-92 / E-C-B',
    note: '平面側を手前にして左から ①E ②C ③B',
    packages: ['TO-92'],
    pins: [
      { num: 1, name: 'E', func: 'エミッタ' },
      { num: 2, name: 'C', func: 'コレクタ' },
      { num: 3, name: 'B', func: 'ベース' },
    ],
  },
  'to92-ecb-pnp': {
    description: 'TO-92 / E-C-B (PNP)',
    note: '平面側を手前にして左から ①E ②C ③B (PNP型)',
    packages: ['TO-92'],
    pins: [
      { num: 1, name: 'E', func: 'エミッタ' },
      { num: 2, name: 'C', func: 'コレクタ' },
      { num: 3, name: 'B', func: 'ベース' },
    ],
  },
  'to92-cbe': {
    description: 'TO-92 / C-B-E',
    note: '平面側を手前にして左から ①C ②B ③E',
    packages: ['TO-92'],
    pins: [
      { num: 1, name: 'C', func: 'コレクタ' },
      { num: 2, name: 'B', func: 'ベース' },
      { num: 3, name: 'E', func: 'エミッタ' },
    ],
  },
  'to92-ebc': {
    description: 'TO-92 / E-B-C',
    note: '平面側を手前にして左から ①E ②B ③C',
    packages: ['TO-92'],
    pins: [
      { num: 1, name: 'E', func: 'エミッタ' },
      { num: 2, name: 'B', func: 'ベース' },
      { num: 3, name: 'C', func: 'コレクタ' },
    ],
  },
  'diode-do41': {
    description: 'DO-41 / アノード-カソード',
    note: '帯マークなし側=アノード、帯マーク側=カソード',
    packages: ['DO-41'],
    pins: [
      { num: 1, name: 'A', func: 'アノード (帯マークなし側)' },
      { num: 2, name: 'K', func: 'カソード (帯マーク側)' },
    ],
  },
  'diode-do35': {
    description: 'DO-35 / アノード-カソード',
    note: '帯マークなし側=アノード、帯マーク側=カソード',
    packages: ['DO-35'],
    pins: [
      { num: 1, name: 'A', func: 'アノード (帯マークなし側)' },
      { num: 2, name: 'K', func: 'カソード (帯マーク側)' },
    ],
  },
  'diode-sma': {
    description: 'SMA / アノード-カソード',
    note: 'SMD。マーク面がカソード側。',
    packages: ['SMA'],
    pins: [
      { num: 1, name: 'A', func: 'アノード' },
      { num: 2, name: 'K', func: 'カソード (マーク面)' },
    ],
  },
  'mosfet-to220-gds': {
    description: 'TO-220 / G-D-S',
    note: '平面(マーク)面を手前にして左から ①G ②D ③S',
    packages: ['TO-220'],
    pins: [
      { num: 1, name: 'G', func: 'ゲート' },
      { num: 2, name: 'D', func: 'ドレイン' },
      { num: 3, name: 'S', func: 'ソース' },
    ],
  },
  'mosfet-to92-sgd': {
    description: 'TO-92 / S-G-D',
    note: '平面側を手前にして左から ①S ②G ③D',
    packages: ['TO-92'],
    pins: [
      { num: 1, name: 'S', func: 'ソース' },
      { num: 2, name: 'G', func: 'ゲート' },
      { num: 3, name: 'D', func: 'ドレイン' },
    ],
  },
};

// =============================================
// ピンコンパチ判定
// =============================================

/**
 * 2部品がピンコンパチかどうかを判定する。
 * 条件: ① 同一 pinoutId  ② 少なくとも1つ共通パッケージ
 * → 両方を満たせば基板変更なしに差し替え可能。
 */
function isPinCompatible(a, b) {
  if (!a.pinoutId || !b.pinoutId) return false;
  if (a.pinoutId !== b.pinoutId) return false;
  const pkgA = a.specs.package ?? [];
  const pkgB = b.specs.package ?? [];
  return pkgA.some(p => pkgB.includes(p));
}

// =============================================
// コストランク
// =============================================

function costRank(part) {
  const p = part.unitPriceJPY ?? 999;
  if (p <= 20)  return { label: '¥',   cls: 'cost-low',  title: `参考単価 ${p}円` };
  if (p <= 60)  return { label: '¥¥',  cls: 'cost-mid',  title: `参考単価 ${p}円` };
  return        { label: '¥¥¥', cls: 'cost-high', title: `参考単価 ${p}円` };
}

// =============================================
// 代替品スコアリング
// =============================================

/**
 * 電気的スペックの適合度を 0〜100 で返す。
 * ピンコンパチかどうかは別途 isPinCompatible() で判定し、
 * ソート順は searchParts() が制御する。
 */
function electricalScore(original, candidate) {
  if (original.id === candidate.id) return -1;
  if (candidate.category !== original.category) return -1;

  let score = 40; // ベース

  // 電圧: 候補が元部品の最大電圧を満たすこと
  const origV = original.specs.voltage?.max ?? 0;
  const candV = candidate.specs.voltage?.max ?? 0;
  if (candV >= origV)         score += 30;
  else if (candV >= origV * 0.9) score += 10;
  else                        score -= 40; // 電圧不足は致命的

  // 電流: 候補が元部品の最大電流を満たすこと
  const origI = original.specs.current?.max ?? 0;
  const candI = candidate.specs.current?.max ?? 0;
  if (candI >= origI)         score += 20;
  else if (candI >= origI * 0.8) score += 8;
  else                        score -= 20;

  // 温度範囲
  const origTmax = original.specs.tempRange?.max ?? 0;
  const candTmax = candidate.specs.tempRange?.max ?? 0;
  if (candTmax >= origTmax)   score += 10;

  return Math.min(99, Math.max(0, score));
}

function electricalLabel(score) {
  if (score >= 90) return { label: '電気的: 優', cls: 'elec-great' };
  if (score >= 70) return { label: '電気的: 良', cls: 'elec-good' };
  if (score >= 50) return { label: '電気的: 可', cls: 'elec-fair' };
  return                  { label: '電気的: 要注意', cls: 'elec-poor' };
}

// =============================================
// 検索ロジック
// =============================================

function searchParts(query, filters) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // 元部品を特定 (完全一致優先 → 部分一致)
  let original = PARTS_DB.find(p =>
    p.partNumber.toLowerCase() === q ||
    p.partNumber.toLowerCase().replace(/\s/g, '') === q.replace(/\s/g, '')
  );
  if (!original) {
    original = PARTS_DB.find(p =>
      p.partNumber.toLowerCase().includes(q) || q.includes(p.partNumber.toLowerCase())
    );
  }

  // スペックフィルタ適用
  const catFilter = filters.category;
  const pkgFilter = filters.package;
  let pool = PARTS_DB.filter(p => {
    if (catFilter && p.category !== catFilter) return false;
    if (pkgFilter && !(p.specs.package ?? []).includes(pkgFilter)) return false;
    if (filters.voltageMax && (p.specs.voltage?.max ?? 0) < parseFloat(filters.voltageMax)) return false;
    if (filters.currentMax && (p.specs.current?.max ?? 0) < parseFloat(filters.currentMax)) return false;
    if (filters.tempRange  && (p.specs.tempRange?.max ?? 0) < parseFloat(filters.tempRange)) return false;
    return true;
  });

  if (original) {
    const candidates = pool
      .map(p => {
        const eScore = electricalScore(original, p);
        if (eScore < 0) return null;
        return {
          ...p,
          pinCompatible: isPinCompatible(original, p),
          eScore,
        };
      })
      .filter(Boolean);

    // ── ソート: ① ピンコンパチ優先  ② 電気スコア降順  ③ コスト昇順 ──
    candidates.sort((a, b) => {
      if (a.pinCompatible !== b.pinCompatible) return b.pinCompatible - a.pinCompatible;
      if (b.eScore !== a.eScore) return b.eScore - a.eScore;
      return (a.unitPriceJPY ?? 999) - (b.unitPriceJPY ?? 999);
    });

    return { original, substitutes: candidates };
  }

  // 元部品が特定できない場合: フリーワード検索
  const freeResults = pool.filter(p =>
    p.partNumber.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
  return {
    original: null,
    substitutes: freeResults.map(p => ({ ...p, pinCompatible: null, eScore: null })),
  };
}

// =============================================
// UI レンダリング
// =============================================

function specRow(label, value) {
  if (!value) return '';
  return `<div class="spec-row"><span class="spec-label">${label}</span><span class="spec-value">${value}</span></div>`;
}

function formatVoltage(spec) {
  if (!spec) return null;
  return spec.min !== undefined ? `${spec.min}〜${spec.max} ${spec.unit}` : `${spec.max} ${spec.unit}`;
}

function categoryLabel(cat) {
  const map = {
    ic: 'IC', resistor: '抵抗', capacitor: 'コンデンサ',
    transistor: 'トランジスタ', diode: 'ダイオード', mosfet: 'MOSFET',
  };
  return map[cat] || cat;
}

function renderPartCard(part, isOriginal = false) {
  const pkgs = (part.specs.package ?? []).join(', ');
  const elec = part.eScore !== null && part.eScore !== undefined ? electricalLabel(part.eScore) : null;
  const cost = costRank(part);

  // ピンコンパチバッジ
  let pinBadge = '';
  if (!isOriginal && part.pinCompatible === true) {
    pinBadge = `<span class="pin-badge pin-badge--ok" title="同一ピン配置・同一パッケージ。基板変更なしに差し替え可能">✓ 基板変更不要</span>`;
  } else if (!isOriginal && part.pinCompatible === false) {
    pinBadge = `<span class="pin-badge pin-badge--ng" title="ピン配置またはパッケージが異なります">⚠ 要基板確認</span>`;
  }

  return `
    <div class="part-card ${isOriginal ? 'part-card--original' : ''}" data-id="${part.id}">
      <div class="part-card-header">
        <div class="part-card-title">
          <span class="part-number">${part.partNumber}</span>
          <span class="category-badge category-${part.category}">${categoryLabel(part.category)}</span>
        </div>
        <div class="part-card-badges">
          ${pinBadge}
          ${!isOriginal ? `<span class="cost-badge ${cost.cls}" title="${cost.title}">${cost.label}</span>` : ''}
          ${elec ? `<span class="elec-badge ${elec.cls}">${elec.label}</span>` : ''}
        </div>
      </div>
      <p class="part-name">${part.name}</p>
      <p class="part-manufacturer">📦 ${part.manufacturer}
        ${!isOriginal && part.unitPriceJPY ? `<span class="price-tag">約${part.unitPriceJPY}円</span>` : ''}
      </p>
      <div class="spec-grid">
        ${specRow('最大電圧', formatVoltage(part.specs.voltage))}
        ${specRow('最大電流', part.specs.current ? `${part.specs.current.max} ${part.specs.current.unit}` : null)}
        ${specRow('動作温度', part.specs.tempRange ? `${part.specs.tempRange.min}〜${part.specs.tempRange.max} ${part.specs.tempRange.unit}` : null)}
        ${specRow('パッケージ', pkgs || null)}
        ${specRow('帯域幅', part.specs.bandwidth || null)}
        ${specRow('hFE', part.specs.hFE || null)}
        ${specRow('Rds(on)', part.specs.rdsOn || null)}
        ${specRow('消費電力', part.specs.power || null)}
      </div>
      <p class="part-desc">${part.description}</p>
      <button class="btn btn-outline detail-btn" data-id="${part.id}">詳細を見る</button>
    </div>
  `;
}

function renderResults(result) {
  const { original, substitutes } = result;

  document.getElementById('resultCount').textContent = `${substitutes.length}件`;

  // 元部品
  if (original) {
    document.getElementById('originalPartCard').style.display = 'block';
    document.getElementById('originalPartInfo').innerHTML = renderPartCard(original, true);
  } else {
    document.getElementById('originalPartCard').style.display = 'none';
  }

  if (substitutes.length === 0) {
    showState('notFound');
    return;
  }

  // ── ピンコンパチ / 要確認 を2セクションに分けて表示 ──
  const pinOk  = substitutes.filter(p => p.pinCompatible === true);
  const pinNg  = substitutes.filter(p => p.pinCompatible !== true);

  let html = '';

  if (pinOk.length > 0) {
    html += `
      <div class="result-section">
        <div class="result-section-header result-section-header--ok">
          <span class="section-icon">✓</span>
          <div>
            <h3>基板変更不要の代替品 <span class="section-count">${pinOk.length}件</span></h3>
            <p>同一ピン配置・同一パッケージ。そのまま差し替え可能。電気スペック順 → コスト安い順で表示。</p>
          </div>
        </div>
        <div class="substitute-list">
          ${pinOk.map(p => renderPartCard(p)).join('')}
        </div>
      </div>`;
  }

  if (pinNg.length > 0) {
    html += `
      <div class="result-section ${pinOk.length > 0 ? 'result-section--secondary' : ''}">
        <div class="result-section-header result-section-header--ng">
          <span class="section-icon">⚠</span>
          <div>
            <h3>要基板確認の代替品 <span class="section-count">${pinNg.length}件</span></h3>
            <p>ピン配置またはパッケージが異なります。使用には基板修正・向き確認が必要です。</p>
          </div>
        </div>
        <div class="substitute-list">
          ${pinNg.map(p => renderPartCard(p)).join('')}
        </div>
      </div>`;
  }

  document.getElementById('substituteList').innerHTML = html;
  showState('results');
}

// =============================================
// CSV エクスポート
// =============================================

function exportCSV(result) {
  const { original, substitutes } = result;
  const rows = [
    ['役割', '部品番号', 'メーカー', 'カテゴリ', '基板変更', '参考単価(円)',
     '最大電圧(V)', '最大電流(A)', '温度範囲(℃)', 'パッケージ', '電気スコア', '説明'],
  ];
  if (original) {
    rows.push([
      '元部品', original.partNumber, original.manufacturer, categoryLabel(original.category),
      '', original.unitPriceJPY ?? '',
      original.specs.voltage?.max ?? '', original.specs.current?.max ?? '',
      original.specs.tempRange ? `${original.specs.tempRange.min}〜${original.specs.tempRange.max}` : '',
      (original.specs.package ?? []).join('/'), '', original.description,
    ]);
  }
  substitutes.forEach(p => {
    rows.push([
      '代替品', p.partNumber, p.manufacturer, categoryLabel(p.category),
      p.pinCompatible === true ? '不要' : '要確認',
      p.unitPriceJPY ?? '',
      p.specs.voltage?.max ?? '', p.specs.current?.max ?? '',
      p.specs.tempRange ? `${p.specs.tempRange.min}〜${p.specs.tempRange.max}` : '',
      (p.specs.package ?? []).join('/'),
      p.eScore !== null && p.eScore !== undefined ? `${p.eScore}%` : '',
      p.description,
    ]);
  });

  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `parts-substitution-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// =============================================
// 状態管理
// =============================================

const STATES = ['emptyState', 'loading', 'resultsSection', 'notFound'];

function showState(state) {
  STATES.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  if (state === 'results') {
    document.getElementById('resultsSection').style.display = 'block';
  } else {
    const el = document.getElementById(state);
    if (el) el.style.display = 'block';
  }
}

// =============================================
// モーダル — 比較テーブル付き
// =============================================

let lastResult = null;

// ── 電気的特性比較テーブル ──────────────────────

function cmpRow(label, origVal, candVal, status) {
  // status: 'better' | 'ok' | 'same' | 'warn' | 'info'
  const icons = { better: '▲ 優', ok: '✓ OK', same: '= 同等', warn: '△ 要注意', info: '— 参考' };
  return `
    <tr class="cmp-row cmp-row--${status}">
      <td class="cmp-label">${label}</td>
      <td class="cmp-orig">${origVal ?? '—'}</td>
      <td class="cmp-cand">${candVal ?? '—'}</td>
      <td class="cmp-status cmp-status--${status}">${icons[status] ?? ''}</td>
    </tr>`;
}

function renderElecCmp(orig, cand) {
  const os = orig.specs;
  const cs = cand.specs;
  let rows = '';

  // 最大電圧
  if (os.voltage || cs.voltage) {
    const ov = os.voltage?.max, cv = cs.voltage?.max;
    const status = cv == null ? 'info' : cv > ov ? 'better' : cv === ov ? 'same' : cv >= ov * 0.9 ? 'ok' : 'warn';
    rows += cmpRow('最大電圧', ov != null ? `${ov} V` : '—', cv != null ? `${cv} V` : '—', status);
  }
  // 最小動作電圧
  if (os.voltage?.min != null || cs.voltage?.min != null) {
    const ov = os.voltage?.min, cv = cs.voltage?.min;
    const status = cv == null ? 'info' : cv < ov ? 'better' : cv === ov ? 'same' : cv <= ov * 1.2 ? 'ok' : 'warn';
    rows += cmpRow('最小電圧', ov != null ? `${ov} V` : '—', cv != null ? `${cv} V` : '—', status);
  }
  // 最大電流
  if (os.current || cs.current) {
    const ov = os.current?.max, cv = cs.current?.max;
    const status = cv == null ? 'info' : cv > ov ? 'better' : cv === ov ? 'same' : cv >= ov * 0.8 ? 'ok' : 'warn';
    rows += cmpRow('最大電流', ov != null ? `${ov} A` : '—', cv != null ? `${cv} A` : '—', status);
  }
  // 最高動作温度
  if (os.tempRange || cs.tempRange) {
    const ov = os.tempRange?.max, cv = cs.tempRange?.max;
    const status = cv == null ? 'info' : cv > ov ? 'better' : cv === ov ? 'same' : cv >= ov - 5 ? 'ok' : 'warn';
    rows += cmpRow('最高動作温度', ov != null ? `${ov} ℃` : '—', cv != null ? `${cv} ℃` : '—', status);
  }
  // 最低動作温度
  if (os.tempRange || cs.tempRange) {
    const ov = os.tempRange?.min, cv = cs.tempRange?.min;
    const status = cv == null ? 'info' : cv < ov ? 'better' : cv === ov ? 'same' : cv <= ov + 5 ? 'ok' : 'warn';
    rows += cmpRow('最低動作温度', ov != null ? `${ov} ℃` : '—', cv != null ? `${cv} ℃` : '—', status);
  }
  // 文字列スペック (帯域幅, hFE, Rds(on), 消費電力, 順電圧降下)
  const strFields = [
    ['帯域幅', 'bandwidth'], ['hFE', 'hFE'], ['Rds(on)', 'rdsOn'],
    ['消費電力', 'power'], ['順電圧降下', 'vf'],
  ];
  strFields.forEach(([label, key]) => {
    const ov = os[key], cv = cs[key];
    if (ov || cv) {
      const status = ov === cv ? 'same' : 'info';
      rows += cmpRow(label, ov ?? '—', cv ?? '—', status);
    }
  });
  // 参考単価
  const op = orig.unitPriceJPY, cp = cand.unitPriceJPY;
  if (op || cp) {
    const status = cp == null ? 'info' : cp < op ? 'better' : cp === op ? 'same' : cp <= op * 1.3 ? 'ok' : 'warn';
    rows += cmpRow('参考単価', op ? `約${op}円` : '—', cp ? `約${cp}円` : '—', status);
  }

  return `
    <div class="cmp-block">
      <h4 class="cmp-title">⚡ 電気的特性</h4>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead>
            <tr>
              <th>スペック</th>
              <th>元: ${orig.partNumber}</th>
              <th>代替: ${cand.partNumber}</th>
              <th>判定</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ── パッケージ比較テーブル ──────────────────────

function renderPackageCmp(orig, cand) {
  const allPkgs = [...new Set([...(orig.specs.package ?? []), ...(cand.specs.package ?? [])])].sort();
  const rows = allPkgs.map(pkg => {
    const hasO = (orig.specs.package ?? []).includes(pkg);
    const hasC = (cand.specs.package ?? []).includes(pkg);
    const compat = hasO && hasC;
    return `
      <tr class="cmp-row ${compat ? 'cmp-row--ok' : ''}">
        <td class="cmp-label">${pkg}</td>
        <td class="cmp-orig">${hasO ? '✓' : '—'}</td>
        <td class="cmp-cand">${hasC ? '✓' : '—'}</td>
        <td class="cmp-status ${compat ? 'cmp-status--ok' : 'cmp-status--info'}">
          ${compat ? '✓ 互換' : hasO ? '元のみ' : '代替のみ'}
        </td>
      </tr>`;
  }).join('');

  return `
    <div class="cmp-block">
      <h4 class="cmp-title">📦 パッケージ</h4>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead>
            <tr>
              <th>パッケージ</th>
              <th>元: ${orig.partNumber}</th>
              <th>代替: ${cand.partNumber}</th>
              <th>互換</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

// ── ピン情報比較テーブル ────────────────────────

function renderPinCmp(orig, cand) {
  const pinO = PINOUT_DB[orig.pinoutId];
  const pinC = PINOUT_DB[cand.pinoutId];

  if (!pinO && !pinC) return '';

  const pinCompat = isPinCompatible(orig, cand);

  if (pinCompat && pinO) {
    // 同一ピン配置 → 共通テーブル1本
    const rows = pinO.pins.map(p =>
      `<tr>
        <td class="cmp-pin-num">${p.num}</td>
        <td class="cmp-pin-name">${p.name}</td>
        <td class="cmp-pin-func">${p.func}</td>
        <td class="cmp-status cmp-status--ok">✓</td>
      </tr>`
    ).join('');
    return `
      <div class="cmp-block">
        <h4 class="cmp-title">📌 ピン配置 <span class="pin-compat-note pin-compat-note--ok">完全一致 — 基板変更不要</span></h4>
        <p class="cmp-note">${pinO.note ?? ''}</p>
        <div class="cmp-table-wrap">
          <table class="cmp-table cmp-table--pin">
            <thead><tr><th>ピン</th><th>名称</th><th>機能</th><th>一致</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }

  // 異なるピン配置 → 2つのテーブルを並べる
  function pinTable(part, pinDef) {
    if (!pinDef) return `<div class="cmp-pin-half"><h5>${part.partNumber}</h5><p class="cmp-note">ピン情報なし</p></div>`;
    const rows = pinDef.pins.map(p =>
      `<tr><td class="cmp-pin-num">${p.num}</td><td class="cmp-pin-name">${p.name}</td><td class="cmp-pin-func">${p.func}</td></tr>`
    ).join('');
    return `
      <div class="cmp-pin-half">
        <h5>${part.partNumber} <span class="cmp-pin-desc">${pinDef.description}</span></h5>
        <p class="cmp-note">${pinDef.note ?? ''}</p>
        <table class="cmp-table cmp-table--pin">
          <thead><tr><th>ピン</th><th>名称</th><th>機能</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  return `
    <div class="cmp-block">
      <h4 class="cmp-title">📌 ピン配置 <span class="pin-compat-note pin-compat-note--ng">配置が異なります — 要確認</span></h4>
      <div class="cmp-pin-pair">
        ${pinTable(orig, pinO)}
        ${pinTable(cand, pinC)}
      </div>
    </div>`;
}

// ── 部品詳細 (単独表示) ─────────────────────────

function renderPartDetails(part) {
  const pinDef = PINOUT_DB[part.pinoutId];
  let pinHtml = '';
  if (pinDef) {
    const rows = pinDef.pins.map(p =>
      `<tr><td class="cmp-pin-num">${p.num}</td><td class="cmp-pin-name">${p.name}</td><td class="cmp-pin-func">${p.func}</td></tr>`
    ).join('');
    pinHtml = `
      <div class="cmp-block">
        <h4 class="cmp-title">📌 ピン配置</h4>
        <p class="cmp-note">${pinDef.note ?? ''}</p>
        <div class="cmp-table-wrap">
          <table class="cmp-table cmp-table--pin">
            <thead><tr><th>ピン</th><th>名称</th><th>機能</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }
  return `
    <div class="modal-specs">
      <p class="modal-desc">${part.description}</p>
      <div class="spec-grid spec-grid--modal">
        ${specRow('メーカー', part.manufacturer)}
        ${specRow('カテゴリ', categoryLabel(part.category))}
        ${specRow('参考単価', part.unitPriceJPY ? `約${part.unitPriceJPY}円` : null)}
        ${specRow('最大電圧', formatVoltage(part.specs.voltage))}
        ${specRow('最大電流', part.specs.current ? `${part.specs.current.max} ${part.specs.current.unit}` : null)}
        ${specRow('動作温度', part.specs.tempRange ? `${part.specs.tempRange.min}〜${part.specs.tempRange.max} ${part.specs.tempRange.unit}` : null)}
        ${specRow('パッケージ', (part.specs.package ?? []).join(', ') || null)}
        ${specRow('帯域幅', part.specs.bandwidth || null)}
        ${specRow('チャンネル数', part.specs.channels?.toString() || null)}
        ${specRow('hFE', part.specs.hFE || null)}
        ${specRow('Rds(on)', part.specs.rdsOn || null)}
        ${specRow('消費電力', part.specs.power || null)}
        ${specRow('順電圧降下', part.specs.vf || null)}
      </div>
      ${part.alternativeTo.length > 0
        ? `<p class="alt-info">代替元: ${part.alternativeTo.map(id => PARTS_DB.find(p => p.id === id)?.partNumber ?? id).join(', ')}</p>`
        : ''}
      ${pinHtml}
    </div>`;
}

// ── モーダル開閉 ────────────────────────────────

function openModal(partId) {
  const part = PARTS_DB.find(p => p.id === partId);
  if (!part) return;

  const original = lastResult?.original;
  const isSubstitute = original && original.id !== partId;

  if (isSubstitute) {
    document.getElementById('modalTitle').textContent =
      `${part.partNumber} vs ${original.partNumber} — 比較`;
    document.getElementById('modalBody').innerHTML =
      renderElecCmp(original, part) +
      renderPackageCmp(original, part) +
      renderPinCmp(original, part) +
      `<hr class="cmp-divider">` +
      renderPartDetails(part);
  } else {
    document.getElementById('modalTitle').textContent = `${part.partNumber} — 詳細情報`;
    document.getElementById('modalBody').innerHTML = renderPartDetails(part);
  }

  document.getElementById('modalOverlay').style.display = 'flex';
}

// =============================================
// イベントバインディング
// =============================================

function getFilters() {
  return {
    category:   document.getElementById('category').value,
    package:    document.getElementById('package').value,
    voltageMax: document.getElementById('voltageMax').value,
    currentMax: document.getElementById('currentMax').value,
    tempRange:  document.getElementById('tempRange').value,
  };
}

function doSearch() {
  const q = document.getElementById('partNumber').value;
  if (!q.trim()) { showState('emptyState'); return; }

  showState('loading');

  setTimeout(() => {
    const result = searchParts(q, getFilters());
    if (!result || (result.substitutes.length === 0 && !result.original)) {
      showState('notFound');
      return;
    }
    lastResult = result;
    renderResults(result);
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  showState('emptyState');

  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('partNumber').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
  document.getElementById('exportBtn').addEventListener('click', () => {
    if (lastResult) exportCSV(lastResult);
  });

  // クイック検索
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('partNumber').value = btn.dataset.query;
      doSearch();
    });
  });

  // 詳細ボタン (イベント委譲)
  document.addEventListener('click', e => {
    if (e.target.classList.contains('detail-btn')) openModal(e.target.dataset.id);
  });

  // モーダルを閉じる
  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('modalOverlay').style.display = 'none';
  });
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').style.display = 'none';
    }
  });
});
