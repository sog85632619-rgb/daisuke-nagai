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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max', cat:'電源',    label:'電源電圧 最大',      sym:'VS',   max:32,    unit:'V',     lo:false, cv:'max' },
      { key:'vs_min', cat:'電源',    label:'電源電圧 最小',      sym:'VS',   min:3,     unit:'V',     lo:true,  cv:'min' },
      { key:'t_max',  cat:'動作温度',label:'動作温度 最高',      sym:'Topr', max:70,    unit:'℃',    lo:false, cv:'max' },
      { key:'t_min',  cat:'動作温度',label:'動作温度 最低',      sym:'Topr', min:0,     unit:'℃',    lo:true,  cv:'min' },
      { key:'vio',    cat:'DC特性',  label:'入力オフセット電圧', sym:'VIO',  typ:2,   max:7,   unit:'mV',    lo:true,  cv:'max', cond:'VS=5 V' },
      { key:'iib',    cat:'DC特性',  label:'入力バイアス電流',   sym:'IIB',  typ:45,  max:250, unit:'nA',    lo:true,  cv:'max' },
      { key:'iio',    cat:'DC特性',  label:'入力オフセット電流', sym:'IIO',  typ:5,   max:50,  unit:'nA',    lo:true,  cv:'max' },
      { key:'cmrr',   cat:'DC特性',  label:'CMRR',              sym:'CMRR', typ:80,  min:65,  unit:'dB',    lo:false, cv:'min' },
      { key:'psrr',   cat:'DC特性',  label:'PSRR',              sym:'PSRR', typ:100,           unit:'dB',    lo:false, cv:'typ' },
      { key:'aol',    cat:'DC特性',  label:'開ループ電圧利得',   sym:'AOL',  typ:100,           unit:'dB',    lo:false, cv:'typ', cond:'RL=2 kΩ' },
      { key:'iq',     cat:'DC特性',  label:'Quiescent電流/amp', sym:'IQ',   typ:0.5, max:0.7, unit:'mA',    lo:true,  cv:'max' },
      { key:'isc',    cat:'DC特性',  label:'出力短絡電流',       sym:'ISC',  typ:40,            unit:'mA',    lo:false, cv:'typ' },
      { key:'gbw',    cat:'AC特性',  label:'ゲイン帯域幅積',     sym:'GBW',  typ:1.0,           unit:'MHz',   lo:false, cv:'typ' },
      { key:'sr',     cat:'AC特性',  label:'スルーレート',       sym:'SR',   typ:0.6,           unit:'V/µs',  lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm358a.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max', cat:'電源',    label:'電源電圧 最大',      sym:'VS',   max:32,    unit:'V',     lo:false, cv:'max' },
      { key:'vs_min', cat:'電源',    label:'電源電圧 最小',      sym:'VS',   min:3,     unit:'V',     lo:true,  cv:'min' },
      { key:'t_max',  cat:'動作温度',label:'動作温度 最高',      sym:'Topr', max:85,    unit:'℃',    lo:false, cv:'max' },
      { key:'t_min',  cat:'動作温度',label:'動作温度 最低',      sym:'Topr', min:-40,   unit:'℃',    lo:true,  cv:'min' },
      { key:'vio',    cat:'DC特性',  label:'入力オフセット電圧', sym:'VIO',  typ:0.3, max:1,   unit:'mV',    lo:true,  cv:'max', cond:'VS=5 V (LM358比 7倍改善)' },
      { key:'iib',    cat:'DC特性',  label:'入力バイアス電流',   sym:'IIB',  typ:45,  max:250, unit:'nA',    lo:true,  cv:'max' },
      { key:'iio',    cat:'DC特性',  label:'入力オフセット電流', sym:'IIO',  typ:5,   max:50,  unit:'nA',    lo:true,  cv:'max' },
      { key:'cmrr',   cat:'DC特性',  label:'CMRR',              sym:'CMRR', typ:80,  min:65,  unit:'dB',    lo:false, cv:'min' },
      { key:'psrr',   cat:'DC特性',  label:'PSRR',              sym:'PSRR', typ:100,           unit:'dB',    lo:false, cv:'typ' },
      { key:'aol',    cat:'DC特性',  label:'開ループ電圧利得',   sym:'AOL',  typ:100,           unit:'dB',    lo:false, cv:'typ' },
      { key:'iq',     cat:'DC特性',  label:'Quiescent電流/amp', sym:'IQ',   typ:0.5, max:0.7, unit:'mA',    lo:true,  cv:'max' },
      { key:'isc',    cat:'DC特性',  label:'出力短絡電流',       sym:'ISC',  typ:40,            unit:'mA',    lo:false, cv:'typ' },
      { key:'gbw',    cat:'AC特性',  label:'ゲイン帯域幅積',     sym:'GBW',  typ:1.0,           unit:'MHz',   lo:false, cv:'typ' },
      { key:'sr',     cat:'AC特性',  label:'スルーレート',       sym:'SR',   typ:0.6,           unit:'V/µs',  lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/rc4558.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max',  cat:'電源',    label:'電源電圧 最大',         sym:'VS',     max:30,    unit:'V',      lo:false, cv:'max', cond:'±15 V dual' },
      { key:'vs_min',  cat:'電源',    label:'電源電圧 最小',         sym:'VS',     min:10,    unit:'V',      lo:true,  cv:'min', cond:'±5 V dual' },
      { key:'t_max',   cat:'動作温度',label:'動作温度 最高',         sym:'Topr',   max:70,    unit:'℃',     lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',label:'動作温度 最低',         sym:'Topr',   min:0,     unit:'℃',     lo:true,  cv:'min' },
      { key:'vio',     cat:'DC特性',  label:'入力オフセット電圧',    sym:'VIO',    typ:2,   max:6,   unit:'mV',     lo:true,  cv:'max' },
      { key:'iib',     cat:'DC特性',  label:'入力バイアス電流',      sym:'IIB',    typ:800, max:1500,unit:'nA',     lo:true,  cv:'max', cond:'バイポーラ入力' },
      { key:'iio',     cat:'DC特性',  label:'入力オフセット電流',    sym:'IIO',    typ:25,  max:200, unit:'nA',     lo:true,  cv:'max' },
      { key:'cmrr',    cat:'DC特性',  label:'CMRR',                 sym:'CMRR',   typ:80,  min:70,  unit:'dB',     lo:false, cv:'min' },
      { key:'aol',     cat:'DC特性',  label:'開ループ電圧利得',      sym:'AOL',    typ:100,           unit:'dB',     lo:false, cv:'typ' },
      { key:'iq',      cat:'DC特性',  label:'Quiescent電流/amp',    sym:'IQ',     typ:2.4,           unit:'mA',     lo:true,  cv:'typ', cond:'LM358の約5倍' },
      { key:'noise_v', cat:'DC特性',  label:'入力換算電圧ノイズ',    sym:'en',     typ:6.5,           unit:'nV/√Hz', lo:true,  cv:'typ', cond:'f=1 kHz' },
      { key:'thd',     cat:'DC特性',  label:'THD+N',                sym:'THD+N',  typ:0.0001,        unit:'%',      lo:true,  cv:'typ', cond:'f=1 kHz' },
      { key:'gbw',     cat:'AC特性',  label:'ゲイン帯域幅積',        sym:'GBW',    typ:4.0,           unit:'MHz',    lo:false, cv:'typ' },
      { key:'sr',      cat:'AC特性',  label:'スルーレート',          sym:'SR',     typ:2.2,           unit:'V/µs',   lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://ww1.microchip.com/downloads/en/DeviceDoc/MCP6001-1R-1U-2-4-1-MHz-Low-Power-Op-Amp-DS20001733L.pdf',
    datasheetSource: 'Microchip Technology',
    detailedSpecs: [
      { key:'vs_max', cat:'電源',    label:'電源電圧 最大',      sym:'VS',   max:6.0,   unit:'V',     lo:false, cv:'max', cond:'要注意: LM358の1/5以下' },
      { key:'vs_min', cat:'電源',    label:'電源電圧 最小',      sym:'VS',   min:1.8,   unit:'V',     lo:true,  cv:'min' },
      { key:'t_max',  cat:'動作温度',label:'動作温度 最高',      sym:'Topr', max:85,    unit:'℃',    lo:false, cv:'max' },
      { key:'t_min',  cat:'動作温度',label:'動作温度 最低',      sym:'Topr', min:-40,   unit:'℃',    lo:true,  cv:'min' },
      { key:'vio',    cat:'DC特性',  label:'入力オフセット電圧', sym:'VIO',  typ:4.5, max:7,   unit:'mV',    lo:true,  cv:'max' },
      { key:'iib',    cat:'DC特性',  label:'入力バイアス電流',   sym:'IIB',  typ:0.001,         unit:'nA',    lo:true,  cv:'typ', cond:'CMOS入力 (1 pA typ)' },
      { key:'cmrr',   cat:'DC特性',  label:'CMRR',              sym:'CMRR', typ:88,  min:75,  unit:'dB',    lo:false, cv:'min' },
      { key:'psrr',   cat:'DC特性',  label:'PSRR',              sym:'PSRR', typ:90,            unit:'dB',    lo:false, cv:'typ' },
      { key:'aol',    cat:'DC特性',  label:'開ループ電圧利得',   sym:'AOL',  typ:112,           unit:'dB',    lo:false, cv:'typ' },
      { key:'iq',     cat:'DC特性',  label:'Quiescent電流/amp', sym:'IQ',   typ:0.1, max:0.13,unit:'mA',    lo:true,  cv:'max', cond:'LM358の約1/5' },
      { key:'gbw',    cat:'AC特性',  label:'ゲイン帯域幅積',     sym:'GBW',  typ:1.0,           unit:'MHz',   lo:false, cv:'typ' },
      { key:'sr',     cat:'AC特性',  label:'スルーレート',       sym:'SR',   typ:0.6,           unit:'V/µs',  lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/ne555.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max',     cat:'電源',    label:'電源電圧 最大',          sym:'VCC',    max:16,    unit:'V',   lo:false, cv:'max' },
      { key:'vs_min',     cat:'電源',    label:'電源電圧 最小',          sym:'VCC',    min:4.5,   unit:'V',   lo:true,  cv:'min' },
      { key:'t_max',      cat:'動作温度',label:'動作温度 最高',          sym:'Topr',   max:70,    unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',      cat:'動作温度',label:'動作温度 最低',          sym:'Topr',   min:0,     unit:'℃',  lo:true,  cv:'min' },
      { key:'icc_5v',     cat:'電源',    label:'電源電流 (VCC=5 V)',     sym:'ICC',    typ:3,   max:6,   unit:'mA',  lo:true,  cv:'max' },
      { key:'icc_15v',    cat:'電源',    label:'電源電流 (VCC=15 V)',    sym:'ICC',    typ:6,   max:10,  unit:'mA',  lo:true,  cv:'max' },
      { key:'v_trig',     cat:'DC特性',  label:'トリガしきい値',         sym:'VTRIG',  unit:'',  lo:false, cv:'typ', cond:'VCC/3 ± 誤差' },
      { key:'v_thres',    cat:'DC特性',  label:'しきい値電圧',           sym:'VTHRES', unit:'',  lo:false, cv:'typ', cond:'2×VCC/3 ± 誤差' },
      { key:'io_sink',    cat:'DC特性',  label:'出力シンク電流 最大',    sym:'IOL',    typ:200,           unit:'mA',  lo:false, cv:'typ' },
      { key:'io_source',  cat:'DC特性',  label:'出力ソース電流 最大',    sym:'IOH',    typ:200,           unit:'mA',  lo:false, cv:'typ' },
      { key:'timing_acc', cat:'AC特性',  label:'タイミング精度',         sym:'δt/t',   typ:1,             unit:'%',   lo:true,  cv:'typ' },
      { key:'freq_max',   cat:'AC特性',  label:'最大発振周波数',         sym:'fmax',   typ:500,           unit:'kHz', lo:false, cv:'typ', cond:'無安定動作' },
    ],
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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/lm555.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max',     cat:'電源',    label:'電源電圧 最大',          sym:'VCC',    max:16,    unit:'V',   lo:false, cv:'max' },
      { key:'vs_min',     cat:'電源',    label:'電源電圧 最小',          sym:'VCC',    min:4.5,   unit:'V',   lo:true,  cv:'min' },
      { key:'t_max',      cat:'動作温度',label:'動作温度 最高',          sym:'Topr',   max:125,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',      cat:'動作温度',label:'動作温度 最低',          sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'icc_5v',     cat:'電源',    label:'電源電流 (VCC=5 V)',     sym:'ICC',    typ:3,   max:6,   unit:'mA',  lo:true,  cv:'max' },
      { key:'icc_15v',    cat:'電源',    label:'電源電流 (VCC=15 V)',    sym:'ICC',    typ:6,   max:10,  unit:'mA',  lo:true,  cv:'max' },
      { key:'v_trig',     cat:'DC特性',  label:'トリガしきい値',         sym:'VTRIG',  unit:'',  lo:false, cv:'typ', cond:'VCC/3' },
      { key:'v_thres',    cat:'DC特性',  label:'しきい値電圧',           sym:'VTHRES', unit:'',  lo:false, cv:'typ', cond:'2×VCC/3' },
      { key:'io_sink',    cat:'DC特性',  label:'出力シンク電流 最大',    sym:'IOL',    typ:200,           unit:'mA',  lo:false, cv:'typ' },
      { key:'io_source',  cat:'DC特性',  label:'出力ソース電流 最大',    sym:'IOH',    typ:200,           unit:'mA',  lo:false, cv:'typ' },
      { key:'timing_acc', cat:'AC特性',  label:'タイミング精度',         sym:'δt/t',   typ:1,             unit:'%',   lo:true,  cv:'typ' },
      { key:'freq_max',   cat:'AC特性',  label:'最大発振周波数',         sym:'fmax',   typ:500,           unit:'kHz', lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://www.ti.com/lit/ds/symlink/tlc555.pdf',
    datasheetSource: 'Texas Instruments',
    detailedSpecs: [
      { key:'vs_max',     cat:'電源',    label:'電源電圧 最大',          sym:'VCC',    max:15,    unit:'V',   lo:false, cv:'max' },
      { key:'vs_min',     cat:'電源',    label:'電源電圧 最小',          sym:'VCC',    min:2.0,   unit:'V',   lo:true,  cv:'min', cond:'NE555比 2.5 V低い' },
      { key:'t_max',      cat:'動作温度',label:'動作温度 最高',          sym:'Topr',   max:85,    unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',      cat:'動作温度',label:'動作温度 最低',          sym:'Topr',   min:-40,   unit:'℃',  lo:true,  cv:'min' },
      { key:'icc_5v',     cat:'電源',    label:'電源電流 (VDD=5 V)',     sym:'ICC',    typ:0.2, max:0.3, unit:'mA',  lo:true,  cv:'max', cond:'NE555の約1/15' },
      { key:'io_sink',    cat:'DC特性',  label:'出力シンク電流 最大',    sym:'IOL',    typ:100,           unit:'mA',  lo:false, cv:'typ', cond:'NE555の1/2' },
      { key:'io_source',  cat:'DC特性',  label:'出力ソース電流 最大',    sym:'IOH',    typ:10,            unit:'mA',  lo:false, cv:'typ', cond:'NE555の1/20' },
      { key:'timing_acc', cat:'AC特性',  label:'タイミング精度',         sym:'δt/t',   typ:1,             unit:'%',   lo:true,  cv:'typ' },
      { key:'freq_max',   cat:'AC特性',  label:'最大発振周波数',         sym:'fmax',   typ:2000,          unit:'kHz', lo:false, cv:'typ', cond:'NE555の4倍' },
    ],
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
    datasheetUrl: 'https://media.digikey.com/pdf/Data%20Sheets/Toshiba%20PDFs/2SC1815.pdf',
    datasheetSource: 'Toshiba (via Digi-Key)',
    detailedSpecs: [
      { key:'vceo',    cat:'絶対最大定格',label:'コレクタ-エミッタ間電圧', sym:'VCEO',   max:50,    unit:'V',   lo:false, cv:'max' },
      { key:'vcbo',    cat:'絶対最大定格',label:'コレクタ-ベース間電圧',   sym:'VCBO',   max:60,    unit:'V',   lo:false, cv:'max' },
      { key:'vebo',    cat:'絶対最大定格',label:'エミッタ-ベース間電圧',   sym:'VEBO',   max:5,     unit:'V',   lo:false, cv:'max' },
      { key:'ic_max',  cat:'絶対最大定格',label:'コレクタ電流 最大',       sym:'IC',     max:150,   unit:'mA',  lo:false, cv:'max' },
      { key:'ib_max',  cat:'絶対最大定格',label:'ベース電流 最大',         sym:'IB',     max:50,    unit:'mA',  lo:false, cv:'max' },
      { key:'pc_max',  cat:'絶対最大定格',label:'コレクタ損失 最大',       sym:'PC',     max:400,   unit:'mW',  lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',         sym:'Tj',     max:125,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',           sym:'Topr',   max:125,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',           sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'hfe_min', cat:'DC特性',      label:'hFE 最小 (Oグレード)',    sym:'hFE',    min:70,    unit:'',    lo:false, cv:'min', cond:'IC=2 mA, VCE=6 V' },
      { key:'hfe_max', cat:'DC特性',      label:'hFE 最大 (GRグレード)',   sym:'hFE',    max:400,   unit:'',    lo:false, cv:'max', cond:'GR: 200〜400' },
      { key:'vce_sat', cat:'DC特性',      label:'VCE(sat)',                sym:'VCE(sat)',typ:0.1, max:0.25,unit:'V',   lo:true,  cv:'max', cond:'IC=100 mA, IB=10 mA' },
      { key:'vbe_on',  cat:'DC特性',      label:'VBE(on)',                 sym:'VBE',    typ:0.6, max:0.9, unit:'V',   lo:true,  cv:'max' },
      { key:'ft',      cat:'AC特性',      label:'電流利得帯域幅積',        sym:'fT',     min:80,    unit:'MHz', lo:false, cv:'min', cond:'IC=5 mA, VCE=10 V' },
      { key:'cob',     cat:'AC特性',      label:'出力容量',                sym:'Cob',    typ:2,     unit:'pF',  lo:true,  cv:'typ', cond:'VCB=10 V, 1 MHz' },
      { key:'nf',      cat:'AC特性',      label:'雑音指数',                sym:'NF',     max:10,    unit:'dB',  lo:true,  cv:'max', cond:'f=1 kHz' },
    ],
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
    datasheetUrl: 'https://www.onsemi.com/pdf/datasheet/bc546-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vceo',    cat:'絶対最大定格',label:'コレクタ-エミッタ間電圧', sym:'VCEO',   max:45,    unit:'V',   lo:false, cv:'max', cond:'2SC1815より5 V低い' },
      { key:'vcbo',    cat:'絶対最大定格',label:'コレクタ-ベース間電圧',   sym:'VCBO',   max:50,    unit:'V',   lo:false, cv:'max' },
      { key:'vebo',    cat:'絶対最大定格',label:'エミッタ-ベース間電圧',   sym:'VEBO',   max:6,     unit:'V',   lo:false, cv:'max' },
      { key:'ic_max',  cat:'絶対最大定格',label:'コレクタ電流 最大',       sym:'IC',     max:100,   unit:'mA',  lo:false, cv:'max', cond:'2SC1815より50 mA低い' },
      { key:'pc_max',  cat:'絶対最大定格',label:'コレクタ損失 最大',       sym:'PC',     max:625,   unit:'mW',  lo:false, cv:'max', cond:'2SC1815より高い' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',         sym:'Tj',     max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',           sym:'Topr',   max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',           sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'hfe_min', cat:'DC特性',      label:'hFE 最小 (Aグレード)',    sym:'hFE',    min:110,   unit:'',    lo:false, cv:'min', cond:'IC=2 mA, VCE=5 V' },
      { key:'hfe_max', cat:'DC特性',      label:'hFE 最大 (Cグレード)',    sym:'hFE',    max:800,   unit:'',    lo:false, cv:'max', cond:'C: 420〜800' },
      { key:'vce_sat', cat:'DC特性',      label:'VCE(sat)',                sym:'VCE(sat)',typ:0.2, max:0.6, unit:'V',   lo:true,  cv:'max', cond:'IC=10 mA' },
      { key:'vbe_on',  cat:'DC特性',      label:'VBE(on)',                 sym:'VBE',    typ:0.58,max:0.7, unit:'V',   lo:true,  cv:'max' },
      { key:'ft',      cat:'AC特性',      label:'電流利得帯域幅積',        sym:'fT',     typ:150,   unit:'MHz', lo:false, cv:'typ', cond:'IC=2 mA, VCE=5 V' },
    ],
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
    datasheetUrl: 'https://www.onsemi.com/download/data-sheet/pdf/2n3904-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vceo',    cat:'絶対最大定格',label:'コレクタ-エミッタ間電圧', sym:'VCEO',   max:40,    unit:'V',   lo:false, cv:'max', cond:'2SC1815より10 V低い' },
      { key:'vcbo',    cat:'絶対最大定格',label:'コレクタ-ベース間電圧',   sym:'VCBO',   max:60,    unit:'V',   lo:false, cv:'max' },
      { key:'vebo',    cat:'絶対最大定格',label:'エミッタ-ベース間電圧',   sym:'VEBO',   max:6,     unit:'V',   lo:false, cv:'max' },
      { key:'ic_max',  cat:'絶対最大定格',label:'コレクタ電流 最大',       sym:'IC',     max:200,   unit:'mA',  lo:false, cv:'max', cond:'2SC1815より高い' },
      { key:'pc_max',  cat:'絶対最大定格',label:'コレクタ損失 最大',       sym:'PC',     max:625,   unit:'mW',  lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',         sym:'Tj',     max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',           sym:'Topr',   max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',           sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'hfe_min', cat:'DC特性',      label:'hFE 最小',               sym:'hFE',    min:100,   unit:'',    lo:false, cv:'min', cond:'IC=10 mA, VCE=1 V' },
      { key:'hfe_max', cat:'DC特性',      label:'hFE 最大',               sym:'hFE',    max:300,   unit:'',    lo:false, cv:'max' },
      { key:'vce_sat', cat:'DC特性',      label:'VCE(sat)',                sym:'VCE(sat)',typ:0.1, max:0.2, unit:'V',   lo:true,  cv:'max', cond:'IC=10 mA, IB=1 mA' },
      { key:'vbe_on',  cat:'DC特性',      label:'VBE(on)',                 sym:'VBE',    typ:0.65,  unit:'V',   lo:true,  cv:'typ' },
      { key:'ft',      cat:'AC特性',      label:'電流利得帯域幅積',        sym:'fT',     typ:270,   unit:'MHz', lo:false, cv:'typ' },
    ],
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
    datasheetUrl: 'https://www.unisonic.com.tw/uploadfiles/836/part_no_pdf/2SA1015.pdf',
    datasheetSource: 'Unisonic Technologies (Toshiba互換品)',
    detailedSpecs: [
      { key:'vceo',    cat:'絶対最大定格',label:'コレクタ-エミッタ間電圧 |VCEO|', sym:'|VCEO|', max:50,  unit:'V',   lo:false, cv:'max', cond:'PNP型' },
      { key:'vcbo',    cat:'絶対最大定格',label:'コレクタ-ベース間電圧 |VCBO|',   sym:'|VCBO|', max:50,  unit:'V',   lo:false, cv:'max' },
      { key:'vebo',    cat:'絶対最大定格',label:'エミッタ-ベース間電圧 |VEBO|',   sym:'|VEBO|', max:5,   unit:'V',   lo:false, cv:'max' },
      { key:'ic_max',  cat:'絶対最大定格',label:'コレクタ電流 最大 |IC|',         sym:'|IC|',   max:150, unit:'mA',  lo:false, cv:'max' },
      { key:'ib_max',  cat:'絶対最大定格',label:'ベース電流 最大',                sym:'IB',     max:50,  unit:'mA',  lo:false, cv:'max' },
      { key:'pc_max',  cat:'絶対最大定格',label:'コレクタ損失 最大',              sym:'PC',     max:400, unit:'mW',  lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',                sym:'Tj',     max:125, unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',                  sym:'Topr',   max:125, unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',                  sym:'Topr',   min:-55, unit:'℃',  lo:true,  cv:'min' },
      { key:'hfe_min', cat:'DC特性',      label:'hFE 最小 (Oグレード)',           sym:'hFE',    min:70,  unit:'',    lo:false, cv:'min', cond:'IC=2 mA, VCE=6 V' },
      { key:'hfe_max', cat:'DC特性',      label:'hFE 最大 (GRグレード)',          sym:'hFE',    max:400, unit:'',    lo:false, cv:'max', cond:'GR: 200〜400' },
      { key:'vce_sat', cat:'DC特性',      label:'|VCE(sat)|',                     sym:'VCE(sat)',typ:0.1, max:0.25, unit:'V', lo:true, cv:'max', cond:'IC=100 mA, IB=10 mA' },
      { key:'ft',      cat:'AC特性',      label:'電流利得帯域幅積',               sym:'fT',     min:80,  unit:'MHz', lo:false, cv:'min' },
    ],
    description: '2SC1815の相補型PNPトランジスタ。',
    alternativeTo: [],
  },
  {
    id: '2n3906',
    partNumber: '2N3906',
    name: 'PNP汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'ON Semiconductor',
    pinoutId: 'to92-ecb-pnp',
    unitPriceJPY: 10,
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '100〜300',
      power: '0.625 W',
    },
    datasheetUrl: 'https://www.onsemi.com/download/data-sheet/pdf/2n3906-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vceo',    cat:'絶対最大定格',label:'|VCEO|',   sym:'|VCEO|', max:40,  unit:'V',   lo:false, cv:'max', cond:'PNP型。2SA1015より10 V低い' },
      { key:'vcbo',    cat:'絶対最大定格',label:'|VCBO|',   sym:'|VCBO|', max:40,  unit:'V',   lo:false, cv:'max', cond:'2SA1015より10 V低い' },
      { key:'vebo',    cat:'絶対最大定格',label:'|VEBO|',   sym:'|VEBO|', max:5,   unit:'V',   lo:false, cv:'max' },
      { key:'ic_max',  cat:'絶対最大定格',label:'|IC| 最大',sym:'|IC|',   max:200, unit:'mA',  lo:false, cv:'max', cond:'2SA1015より高い' },
      { key:'pc_max',  cat:'絶対最大定格',label:'PC 最大',  sym:'PC',     max:625, unit:'mW',  lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'Tj 最高',  sym:'Tj',     max:150, unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高', sym:'Topr', max:150, unit:'℃', lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低', sym:'Topr', min:-55, unit:'℃', lo:true,  cv:'min' },
      { key:'hfe_min', cat:'DC特性',      label:'hFE 最小', sym:'hFE',    min:100, unit:'',    lo:false, cv:'min', cond:'IC=10 mA' },
      { key:'hfe_max', cat:'DC特性',      label:'hFE 最大', sym:'hFE',    max:300, unit:'',    lo:false, cv:'max' },
      { key:'ft',      cat:'AC特性',      label:'fT',       sym:'fT',     typ:250, unit:'MHz', lo:false, cv:'typ' },
    ],
    description: '2N3904の相補型PNPトランジスタ。2SA1015の代替として使用可能だがVCEO=40V注意。',
    alternativeTo: ['2sa1015'],
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
    datasheetUrl: 'https://www.onsemi.com/download/data-sheet/pdf/1n4001-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vrrm',    cat:'絶対最大定格',label:'最大逆電圧 (VRRM)',          sym:'VRRM',    max:1000,  unit:'V',   lo:false, cv:'max' },
      { key:'io_avg',  cat:'絶対最大定格',label:'平均整流電流',               sym:'IO',      max:1.0,   unit:'A',   lo:false, cv:'max' },
      { key:'ifsm',    cat:'絶対最大定格',label:'サージ電流 (IFSM)',          sym:'IFSM',    max:30,    unit:'A',   lo:false, cv:'max', cond:'8.3 ms 半波' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',            sym:'Tj',      max:175,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',              sym:'Topr',    max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',              sym:'Topr',    min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vf',      cat:'DC特性',      label:'順電圧降下 (VF)',            sym:'VF',      typ:0.7, max:1.1,  unit:'V',   lo:true,  cv:'max', cond:'IF=1 A' },
      { key:'ir_rev',  cat:'DC特性',      label:'逆方向漏れ電流 (IR)',        sym:'IR',      max:5,     unit:'µA',  lo:true,  cv:'max', cond:'VR=VRRM' },
      { key:'cj',      cat:'DC特性',      label:'接合容量 (CJ)',              sym:'CJ',      typ:15,    unit:'pF',  lo:true,  cv:'typ', cond:'VR=4 V, 1 MHz' },
      { key:'trr',     cat:'AC特性',      label:'逆回復時間 (trr)',           sym:'trr',     unit:'',   lo:true,  cv:'typ', cond:'規定なし (標準整流)' },
    ],
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
    datasheetUrl: 'https://www.onsemi.com/pdf/datasheet/1n5817-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vrrm',    cat:'絶対最大定格',label:'最大逆電圧 (VRRM)',   sym:'VRRM',  max:40,   unit:'V',   lo:false, cv:'max', cond:'Schottky — 1N4007の1/25' },
      { key:'io_avg',  cat:'絶対最大定格',label:'平均整流電流',        sym:'IO',    max:1.0,  unit:'A',   lo:false, cv:'max' },
      { key:'ifsm',    cat:'絶対最大定格',label:'サージ電流 (IFSM)',   sym:'IFSM',  max:25,   unit:'A',   lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',     sym:'Tj',    max:125,  unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',       sym:'Topr',  max:125,  unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',       sym:'Topr',  min:-55,  unit:'℃',  lo:true,  cv:'min' },
      { key:'vf',      cat:'DC特性',      label:'順電圧降下 (VF)',     sym:'VF',    typ:0.45,max:0.6,  unit:'V',   lo:true,  cv:'max', cond:'IF=1 A (1N4007の1/2以下)' },
      { key:'ir_rev',  cat:'DC特性',      label:'逆方向漏れ電流 (IR)', sym:'IR',    max:1,    unit:'mA',  lo:true,  cv:'max', cond:'VR=40 V' },
      { key:'cj',      cat:'DC特性',      label:'接合容量 (CJ)',       sym:'CJ',    typ:110,  unit:'pF',  lo:true,  cv:'typ', cond:'Schottkyは高い' },
      { key:'trr',     cat:'AC特性',      label:'逆回復時間 (trr)',    sym:'trr',   unit:'',  lo:true,  cv:'typ', cond:'多数キャリア — 本質的に高速' },
    ],
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
    datasheetUrl: 'https://www.onsemi.com/download/data-sheet/pdf/1n914-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vrrm',    cat:'絶対最大定格',label:'最大逆電圧 (VRRM)',   sym:'VRRM',  max:100,   unit:'V',   lo:false, cv:'max' },
      { key:'io_avg',  cat:'絶対最大定格',label:'連続順電流',          sym:'IF',    max:100,   unit:'mA',  lo:false, cv:'max' },
      { key:'ifsm',    cat:'絶対最大定格',label:'サージ電流 (IFSM)',   sym:'IFSM',  max:4000,  unit:'mA',  lo:false, cv:'max', cond:'1 ms' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',     sym:'Tj',    max:175,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',       sym:'Topr',  max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',       sym:'Topr',  min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vf',      cat:'DC特性',      label:'順電圧降下 (VF)',     sym:'VF',    typ:0.6, max:0.72,  unit:'V',   lo:true,  cv:'max', cond:'IF=10 mA' },
      { key:'ir_rev',  cat:'DC特性',      label:'逆方向漏れ電流 (IR)', sym:'IR',    max:25,    unit:'nA',  lo:true,  cv:'max', cond:'VR=75 V (非常に低い)' },
      { key:'cj',      cat:'DC特性',      label:'接合容量 (CJ)',       sym:'CJ',    typ:4,     unit:'pF',  lo:true,  cv:'typ', cond:'VR=0, 1 MHz' },
      { key:'trr',     cat:'AC特性',      label:'逆回復時間 (trr)',    sym:'trr',   typ:4,     unit:'ns',  lo:true,  cv:'typ', cond:'高速スイッチング' },
    ],
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
    datasheetUrl: 'https://www.vishay.com/doc/?88746=',
    datasheetSource: 'Vishay General Semiconductor',
    detailedSpecs: [
      { key:'vrrm',    cat:'絶対最大定格',label:'最大逆電圧 (VRRM)',   sym:'VRRM',  max:40,    unit:'V',   lo:false, cv:'max', cond:'Schottky SMA' },
      { key:'io_avg',  cat:'絶対最大定格',label:'平均整流電流',        sym:'IO',    max:1.0,   unit:'A',   lo:false, cv:'max' },
      { key:'ifsm',    cat:'絶対最大定格',label:'サージ電流 (IFSM)',   sym:'IFSM',  max:40,    unit:'A',   lo:false, cv:'max', cond:'1N5819より高い' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',     sym:'Tj',    max:125,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_max',   cat:'動作温度',    label:'動作温度 最高',       sym:'Topr',  max:125,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',       sym:'Topr',  min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vf',      cat:'DC特性',      label:'順電圧降下 (VF)',     sym:'VF',    typ:0.34,max:0.5,   unit:'V',   lo:true,  cv:'max', cond:'IF=1 A (1N5819と同等以下)' },
      { key:'ir_rev',  cat:'DC特性',      label:'逆方向漏れ電流 (IR)', sym:'IR',    max:0.5,   unit:'mA',  lo:true,  cv:'max', cond:'VR=40 V' },
      { key:'cj',      cat:'DC特性',      label:'接合容量 (CJ)',       sym:'CJ',    typ:75,    unit:'pF',  lo:true,  cv:'typ' },
      { key:'trr',     cat:'AC特性',      label:'逆回復時間 (trr)',    sym:'trr',   unit:'',   lo:true,  cv:'typ', cond:'多数キャリア — 本質的に高速' },
    ],
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
    datasheetUrl: 'https://www.infineon.com/dgdl/irf540npbf.pdf?fileId=5546d462533600a4015355e39f0d19a1',
    datasheetSource: 'Infineon Technologies (International Rectifier)',
    detailedSpecs: [
      { key:'vds_max', cat:'絶対最大定格',label:'VDS 最大',         sym:'VDSS',   max:100,   unit:'V',   lo:false, cv:'max' },
      { key:'id_max',  cat:'絶対最大定格',label:'ID 最大 (25°C)',   sym:'ID',     max:28,    unit:'A',   lo:false, cv:'max' },
      { key:'idm',     cat:'絶対最大定格',label:'IDM (パルス)',      sym:'IDM',    max:110,   unit:'A',   lo:false, cv:'max' },
      { key:'vgs_max', cat:'絶対最大定格',label:'VGS 最大',         sym:'VGS',    max:20,    unit:'V',   lo:false, cv:'max', cond:'±20 V' },
      { key:'ptot',    cat:'絶対最大定格',label:'損失 最大 (25°C)', sym:'Ptot',   max:150,   unit:'W',   lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',  sym:'Tj',     max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',    sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vgs_th',  cat:'DC特性',      label:'ゲートしきい値電圧',sym:'VGS(th)',typ:3, min:2, max:4, unit:'V',  lo:true, cv:'max' },
      { key:'rds_on',  cat:'DC特性',      label:'オン抵抗 RDS(on)', sym:'RDS(on)',typ:0.052,max:0.077,unit:'Ω',  lo:true,  cv:'max', cond:'VGS=10 V, ID=14 A' },
      { key:'idss',    cat:'DC特性',      label:'ゼロゲート遮断電流',sym:'IDSS',   max:250,   unit:'µA',  lo:true,  cv:'max' },
      { key:'qg',      cat:'スイッチング',label:'ゲートチャージ',   sym:'Qg',     typ:72,    unit:'nC',  lo:true,  cv:'typ', cond:'VGS=10 V' },
      { key:'rth_jc',  cat:'熱特性',      label:'熱抵抗 接合-ケース',sym:'Rθjc',  max:1.0,   unit:'°C/W',lo:true, cv:'max' },
    ],
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
    datasheetUrl: 'https://www.infineon.com/dgdl/Infineon-IRF540N-DataSheet-v01_01-EN.pdf?fileId=5546d462533600a4015355e39f0d19a1',
    datasheetSource: 'Infineon Technologies',
    detailedSpecs: [
      { key:'vds_max', cat:'絶対最大定格',label:'VDS 最大',           sym:'VDSS',   max:100,   unit:'V',   lo:false, cv:'max' },
      { key:'id_max',  cat:'絶対最大定格',label:'ID 最大 (25°C)',     sym:'ID',     max:33,    unit:'A',   lo:false, cv:'max', cond:'IRF540より5 A高い' },
      { key:'idm',     cat:'絶対最大定格',label:'IDM (パルス)',        sym:'IDM',    max:110,   unit:'A',   lo:false, cv:'max' },
      { key:'vgs_max', cat:'絶対最大定格',label:'VGS 最大',           sym:'VGS',    max:20,    unit:'V',   lo:false, cv:'max', cond:'±20 V' },
      { key:'ptot',    cat:'絶対最大定格',label:'損失 最大 (25°C)',   sym:'Ptot',   max:150,   unit:'W',   lo:false, cv:'max' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',    sym:'Tj',     max:175,   unit:'℃',  lo:false, cv:'max', cond:'IRF540より25°C高い' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',      sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vgs_th',  cat:'DC特性',      label:'ゲートしきい値電圧', sym:'VGS(th)',typ:3, min:2, max:4, unit:'V',  lo:true, cv:'max' },
      { key:'rds_on',  cat:'DC特性',      label:'オン抵抗 RDS(on)',   sym:'RDS(on)',typ:0.032,max:0.044,unit:'Ω',  lo:true,  cv:'max', cond:'VGS=10 V, ID=27 A (IRF540の43%)' },
      { key:'idss',    cat:'DC特性',      label:'ゼロゲート遮断電流', sym:'IDSS',   max:250,   unit:'µA',  lo:true,  cv:'max' },
      { key:'qg',      cat:'スイッチング',label:'ゲートチャージ',     sym:'Qg',     typ:47,    unit:'nC',  lo:true,  cv:'typ', cond:'IRF540の65% — 高速ドライブ有利' },
      { key:'rth_jc',  cat:'熱特性',      label:'熱抵抗 接合-ケース', sym:'Rθjc',  max:1.1,   unit:'°C/W',lo:true, cv:'max' },
    ],
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
    datasheetUrl: 'https://www.onsemi.com/download/data-sheet/pdf/2n7000ta-d.pdf',
    datasheetSource: 'onsemi (ON Semiconductor)',
    detailedSpecs: [
      { key:'vds_max', cat:'絶対最大定格',label:'VDS 最大',           sym:'VDS',    max:60,    unit:'V',   lo:false, cv:'max' },
      { key:'id_max',  cat:'絶対最大定格',label:'ID 最大 (連続)',     sym:'ID',     max:0.2,   unit:'A',   lo:false, cv:'max' },
      { key:'vgs_max', cat:'絶対最大定格',label:'VGS 最大',           sym:'VGS',    max:20,    unit:'V',   lo:false, cv:'max', cond:'±20 V' },
      { key:'ptot',    cat:'絶対最大定格',label:'損失 最大',           sym:'PD',     max:400,   unit:'mW',  lo:false, cv:'max', cond:'TO-92' },
      { key:'tj_max',  cat:'絶対最大定格',label:'接合部温度 最高',    sym:'Tj',     max:150,   unit:'℃',  lo:false, cv:'max' },
      { key:'t_min',   cat:'動作温度',    label:'動作温度 最低',      sym:'Topr',   min:-55,   unit:'℃',  lo:true,  cv:'min' },
      { key:'vgs_th',  cat:'DC特性',      label:'ゲートしきい値電圧', sym:'VGS(th)',min:0.8, max:3.0,  unit:'V',   lo:true,  cv:'max' },
      { key:'rds_on',  cat:'DC特性',      label:'オン抵抗 RDS(on)',   sym:'RDS(on)',max:5.0,   unit:'Ω',   lo:true,  cv:'max', cond:'VGS=5 V, ID=10 mA' },
      { key:'qg',      cat:'スイッチング',label:'ゲートチャージ',     sym:'Qg',     typ:5,     unit:'nC',  lo:true,  cv:'typ' },
    ],
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

function cmpRow(label, sym, origVal, candVal, status, cond) {
  // status: 'better' | 'ok' | 'same' | 'warn' | 'info'
  const icons = { better: '▲ 優', ok: '✓ OK', same: '= 同等', warn: '△ 要注意', info: '— 参考' };
  const condHtml = cond ? `<span class="cmp-cond">${cond}</span>` : '';
  return `
    <tr class="cmp-row cmp-row--${status}">
      <td class="cmp-label"><span class="cmp-sym">${sym}</span>${label}${condHtml}</td>
      <td class="cmp-orig">${origVal ?? '—'}</td>
      <td class="cmp-cand">${candVal ?? '—'}</td>
      <td class="cmp-status cmp-status--${status}">${icons[status] ?? ''}</td>
    </tr>`;
}

/**
 * detailedSpecs エントリから表示用文字列を生成する。
 * typ/max/min を持つ場合は "typ X / max Y" 形式で表示。
 */
function fmtSpec(s) {
  if (!s) return '—';
  const parts = [];
  if (s.typ  != null) parts.push(`typ ${s.typ}`);
  if (s.max  != null) parts.push(`max ${s.max}`);
  if (s.min  != null) parts.push(`min ${s.min}`);
  const val = parts.join(' / ');
  return val ? `${val} ${s.unit ?? ''}`.trim() : (s.unit ?? '—');
}

/**
 * 比較用の単一数値を detailedSpec エントリから取得する。
 * cv フィールドが 'typ'|'max'|'min' のいずれかを示す。
 */
function cmpVal(s) {
  if (!s) return null;
  return s[s.cv] ?? null;
}

/**
 * 2値を比較して status を返す。
 * lo=true: 低い方が良い / lo=false: 高い方が良い
 */
function calcStatus(ov, cv, lo) {
  if (ov == null || cv == null) return 'info';
  const ratio = lo ? cv / ov : ov / cv;   // ratio < 1 → cand が良い
  if (lo ? cv < ov : cv > ov) return ratio <= 0.7 ? 'better' : 'ok';   // 30%以上良ければ better
  if (ov === cv || Math.abs(cv - ov) / (ov || 1) < 0.05) return 'same'; // 5%以内
  return ratio > 1.2 ? 'warn' : 'ok';    // 20%以上悪ければ warn
}

function renderElecCmp(orig, cand) {
  // detailedSpecs がある場合は詳細比較
  if (orig.detailedSpecs && cand.detailedSpecs) {
    return renderDetailedElecCmp(orig, cand);
  }
  // フォールバック: 既存の基本比較
  return renderBasicElecCmp(orig, cand);
}

function renderDetailedElecCmp(orig, cand) {
  // キーのマップを作成
  const oMap = Object.fromEntries(orig.detailedSpecs.map(s => [s.key, s]));
  const cMap = Object.fromEntries(cand.detailedSpecs.map(s => [s.key, s]));
  // 両方にあるキーを orig の順で処理
  const allKeys = orig.detailedSpecs.map(s => s.key).filter(k => cMap[k]);
  // 片方にしかないキーも追加 (info 扱い)
  const candOnlyKeys = cand.detailedSpecs.map(s => s.key).filter(k => !oMap[k]);

  // カテゴリ別にグループ化
  const groups = {};
  [...allKeys, ...candOnlyKeys].forEach(k => {
    const s = oMap[k] ?? cMap[k];
    const cat = s.cat;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(k);
  });

  let html = '';
  Object.entries(groups).forEach(([cat, keys]) => {
    let rows = '';
    keys.forEach(k => {
      const os = oMap[k], cs = cMap[k];
      const base = os ?? cs;
      const ov = cmpVal(os), cv = cmpVal(cs);
      const status = os && cs ? calcStatus(ov, cv, base.lo) : 'info';
      rows += cmpRow(
        base.label, base.sym ?? '',
        fmtSpec(os), fmtSpec(cs),
        status, base.cond
      );
    });
    html += `
      <div class="cmp-sub-block">
        <div class="cmp-cat-label">${cat}</div>
        <table class="cmp-table">
          <thead><tr>
            <th>スペック</th>
            <th>元: ${orig.partNumber}</th>
            <th>代替: ${cand.partNumber}</th>
            <th>判定</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  });

  // 単価も追加
  const op = orig.unitPriceJPY, cp = cand.unitPriceJPY;
  if (op || cp) {
    const status = calcStatus(op ?? 0, cp ?? 0, true);
    const row = cmpRow('参考単価', '¥', op ? `約${op}円` : '—', cp ? `約${cp}円` : '—', status, '');
    html += `
      <div class="cmp-sub-block">
        <div class="cmp-cat-label">コスト</div>
        <table class="cmp-table">
          <thead><tr><th>スペック</th><th>元: ${orig.partNumber}</th><th>代替: ${cand.partNumber}</th><th>判定</th></tr></thead>
          <tbody>${row}</tbody>
        </table>
      </div>`;
  }

  return `
    <div class="cmp-block">
      <h4 class="cmp-title">⚡ 電気的特性 — データシート全スペック比較</h4>
      ${html}
    </div>`;
}

function renderBasicElecCmp(orig, cand) {
  const os = orig.specs, cs = cand.specs;
  let rows = '';
  if (os.voltage || cs.voltage) {
    const ov = os.voltage?.max, cv = cs.voltage?.max;
    rows += cmpRow('電源電圧 最大', 'VS', ov != null ? `${ov} V` : '—', cv != null ? `${cv} V` : '—',
      calcStatus(ov, cv, false), '');
  }
  if (os.tempRange || cs.tempRange) {
    const ov = os.tempRange?.max, cv = cs.tempRange?.max;
    rows += cmpRow('動作温度 最高', 'Topr', ov != null ? `${ov} ℃` : '—', cv != null ? `${cv} ℃` : '—',
      calcStatus(ov, cv, false), '');
    const om = os.tempRange?.min, cm = cs.tempRange?.min;
    rows += cmpRow('動作温度 最低', 'Topr', om != null ? `${om} ℃` : '—', cm != null ? `${cm} ℃` : '—',
      calcStatus(om, cm, true), '');
  }
  const strFields = [['帯域幅', 'bandwidth'], ['hFE', 'hFE'], ['Rds(on)', 'rdsOn'], ['消費電力', 'power'], ['VF', 'vf']];
  strFields.forEach(([label, key]) => {
    const ov = os[key], cv = cs[key];
    if (ov || cv) rows += cmpRow(label, '', ov ?? '—', cv ?? '—', ov === cv ? 'same' : 'info', '');
  });
  const op = orig.unitPriceJPY, cp = cand.unitPriceJPY;
  if (op || cp) rows += cmpRow('参考単価', '¥', op ? `約${op}円` : '—', cp ? `約${cp}円` : '—',
    calcStatus(op, cp, true), '');
  return `
    <div class="cmp-block">
      <h4 class="cmp-title">⚡ 電気的特性</h4>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th>スペック</th><th>元: ${orig.partNumber}</th><th>代替: ${cand.partNumber}</th><th>判定</th></tr></thead>
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
      ${part.datasheetUrl
        ? `<div class="ds-link-wrap">
             <a href="${part.datasheetUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-ds">
               📄 データシート PDF ↗
             </a>
             <span class="ds-source">${part.datasheetSource ?? ''}</span>
           </div>`
        : ''}
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
