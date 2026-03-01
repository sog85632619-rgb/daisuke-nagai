// =============================================
// 電子部品 代替品データベース
// =============================================

const PARTS_DB = [
  // ── IC / オペアンプ ──────────────────────────
  {
    id: 'lm358',
    partNumber: 'LM358',
    name: '汎用デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Texas Instruments',
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
    id: 'mcp6002',
    partNumber: 'MCP6002',
    name: 'デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Microchip',
    specs: {
      voltage: { min: 1.8, max: 6, unit: 'V' },
      current: { max: 0.025, unit: 'A' },
      tempRange: { min: -40, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      bandwidth: '1 MHz',
      channels: 2,
    },
    description: '低電圧・低消費電流デュアルオペアンプ。',
    alternativeTo: ['lm358'],
  },
  {
    id: 'rc4558',
    partNumber: 'RC4558',
    name: 'デュアルオペアンプ',
    category: 'ic',
    manufacturer: 'Texas Instruments',
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
    id: 'ne555',
    partNumber: 'NE555',
    name: 'タイマーIC',
    category: 'ic',
    manufacturer: 'Texas Instruments',
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
    specs: {
      voltage: { min: 4.5, max: 16, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      channels: 1,
    },
    description: 'NE555の広温度範囲版。',
    alternativeTo: ['ne555'],
  },
  {
    id: 'tlc555',
    partNumber: 'TLC555',
    name: 'CMOSタイマーIC',
    category: 'ic',
    manufacturer: 'Texas Instruments',
    specs: {
      voltage: { min: 2, max: 15, unit: 'V' },
      current: { max: 0.1, unit: 'A' },
      tempRange: { min: -40, max: 125, unit: '℃' },
      package: ['DIP', 'SOP'],
      channels: 1,
    },
    description: 'CMOS版タイマーIC。低消費電流・低電圧動作。',
    alternativeTo: ['ne555'],
  },

  // ── トランジスタ ────────────────────────────
  {
    id: '2sc1815',
    partNumber: '2SC1815',
    name: 'NPN汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Toshiba',
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
    specs: {
      voltage: { max: 45, unit: 'V' },
      current: { max: 0.1, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '110〜800',
      power: '0.5 W',
    },
    description: 'NPN汎用トランジスタ。2SC1815の代替として広く使用。',
    alternativeTo: ['2sc1815'],
  },
  {
    id: '2n3904',
    partNumber: '2N3904',
    name: 'NPN汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Fairchild',
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 0.2, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-92'],
      hFE: '100〜300',
      power: '0.625 W',
    },
    description: 'グローバル標準のNPN汎用トランジスタ。入手性が高い。',
    alternativeTo: ['2sc1815'],
  },
  {
    id: '2sa1015',
    partNumber: '2SA1015',
    name: 'PNP汎用トランジスタ',
    category: 'transistor',
    manufacturer: 'Toshiba',
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
    id: '1n4148',
    partNumber: '1N4148',
    name: 'スイッチングダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
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
    id: '1n5819',
    partNumber: '1N5819',
    name: 'ショットキーバリアダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 1, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['DO-41'],
      vf: '0.6 V',
    },
    description: '低順電圧降下ショットキーダイオード。スイッチング電源に最適。',
    alternativeTo: ['1n4007'],
  },
  {
    id: 'ss14',
    partNumber: 'SS14',
    name: 'SMDショットキーダイオード',
    category: 'diode',
    manufacturer: 'Vishay',
    specs: {
      voltage: { max: 40, unit: 'V' },
      current: { max: 1, unit: 'A' },
      tempRange: { min: -55, max: 125, unit: '℃' },
      package: ['SMA'],
      vf: '0.5 V',
    },
    description: '1N5819のSMD版。',
    alternativeTo: ['1n4007', '1n5819'],
  },

  // ── MOSFET ─────────────────────────────────
  {
    id: '2n7000',
    partNumber: '2N7000',
    name: 'N-ch MOSFET',
    category: 'mosfet',
    manufacturer: 'Fairchild',
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
  {
    id: 'irf540',
    partNumber: 'IRF540',
    name: 'N-ch パワーMOSFET',
    category: 'mosfet',
    manufacturer: 'Infineon',
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
    specs: {
      voltage: { max: 100, unit: 'V' },
      current: { max: 33, unit: 'A' },
      tempRange: { min: -55, max: 150, unit: '℃' },
      package: ['TO-220'],
      rdsOn: '0.052 Ω',
      power: '150 W',
    },
    description: 'IRF540の改良版。低オン抵抗。',
    alternativeTo: ['irf540'],
  },
];

// =============================================
// 代替品スコアリング
// =============================================

function computeCompatibility(original, candidate) {
  if (original.id === candidate.id) return -1; // 同じ部品は除外
  if (candidate.alternativeTo.includes(original.id) || original.alternativeTo.includes(candidate.id)) {
    return 95 + Math.floor(Math.random() * 5);
  }
  if (candidate.category !== original.category) return -1;

  let score = 50;

  // 電圧マージン
  const origV = original.specs.voltage?.max ?? 0;
  const candV = candidate.specs.voltage?.max ?? 0;
  if (candV >= origV) score += 20;
  else if (candV >= origV * 0.9) score += 10;
  else score -= 20;

  // 電流
  const origI = original.specs.current?.max ?? 0;
  const candI = candidate.specs.current?.max ?? 0;
  if (candI >= origI) score += 15;
  else if (candI >= origI * 0.8) score += 5;
  else score -= 15;

  // パッケージ共通チェック
  const origPkg = original.specs.package ?? [];
  const candPkg = candidate.specs.package ?? [];
  if (origPkg.some(p => candPkg.includes(p))) score += 15;

  // 温度範囲
  const origTmax = original.specs.tempRange?.max ?? 0;
  const candTmax = candidate.specs.tempRange?.max ?? 0;
  if (candTmax >= origTmax) score += 10;

  return Math.min(99, Math.max(0, score));
}

function getCompatibilityLabel(score) {
  if (score >= 90) return { label: '◎ 完全互換', cls: 'compat-full' };
  if (score >= 70) return { label: '○ 高互換性', cls: 'compat-high' };
  if (score >= 50) return { label: '△ 条件付き', cls: 'compat-cond' };
  return { label: '✕ 非互換', cls: 'compat-none' };
}

// =============================================
// 検索ロジック
// =============================================

function searchParts(query, filters) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // 元部品を特定
  let original = PARTS_DB.find(p =>
    p.partNumber.toLowerCase() === q ||
    p.partNumber.toLowerCase().replace(/\s/g, '') === q.replace(/\s/g, '')
  );

  // 見つからない場合は部分一致
  if (!original) {
    original = PARTS_DB.find(p =>
      p.partNumber.toLowerCase().includes(q) || q.includes(p.partNumber.toLowerCase())
    );
  }

  // カテゴリ絞り込み
  const catFilter = filters.category;
  const pkgFilter = filters.package;

  let results = PARTS_DB.filter(p => {
    if (catFilter && p.category !== catFilter) return false;
    if (pkgFilter && !(p.specs.package ?? []).includes(pkgFilter)) return false;
    if (filters.voltageMax && (p.specs.voltage?.max ?? 0) < parseFloat(filters.voltageMax)) return false;
    if (filters.currentMax && (p.specs.current?.max ?? 0) < parseFloat(filters.currentMax)) return false;
    if (filters.tempRange && (p.specs.tempRange?.max ?? 0) < parseFloat(filters.tempRange)) return false;
    return true;
  });

  if (original) {
    // スコアリングして代替品を返す
    return {
      original,
      substitutes: results
        .map(p => ({ ...p, score: computeCompatibility(original, p) }))
        .filter(p => p.score >= 0)
        .sort((a, b) => b.score - a.score),
    };
  }

  // 部品が特定できなければフリーワード検索
  const freeResults = results.filter(p =>
    p.partNumber.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
  return { original: null, substitutes: freeResults.map(p => ({ ...p, score: null })) };
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
  if (spec.min !== undefined) return `${spec.min}〜${spec.max} ${spec.unit}`;
  return `${spec.max} ${spec.unit}`;
}

function renderPartCard(part, isOriginal = false, score = null) {
  const compat = score !== null ? getCompatibilityLabel(score) : null;
  const pkgs = (part.specs.package ?? []).join(', ');

  return `
    <div class="part-card ${isOriginal ? 'part-card--original' : ''}" data-id="${part.id}">
      <div class="part-card-header">
        <div>
          <span class="part-number">${part.partNumber}</span>
          <span class="category-badge category-${part.category}">${categoryLabel(part.category)}</span>
        </div>
        ${compat ? `<span class="compat-badge ${compat.cls}" title="互換性スコア: ${score}%">${compat.label} (${score}%)</span>` : ''}
      </div>
      <p class="part-name">${part.name}</p>
      <p class="part-manufacturer">📦 ${part.manufacturer}</p>
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

function categoryLabel(cat) {
  const map = { ic: 'IC', resistor: '抵抗', capacitor: 'コンデンサ', transistor: 'トランジスタ', diode: 'ダイオード', mosfet: 'MOSFET' };
  return map[cat] || cat;
}

function renderResults(result) {
  const { original, substitutes } = result;

  document.getElementById('resultCount').textContent = `${substitutes.length}件`;

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

  document.getElementById('substituteList').innerHTML = substitutes
    .map(p => renderPartCard(p, false, p.score))
    .join('');

  showState('results');
}

// =============================================
// CSV エクスポート
// =============================================

function exportCSV(result) {
  const { original, substitutes } = result;
  const rows = [
    ['役割', '部品番号', 'メーカー', 'カテゴリ', '最大電圧(V)', '最大電流(A)', '温度範囲(℃)', 'パッケージ', '互換性スコア', '説明'],
  ];
  if (original) {
    rows.push([
      '元部品', original.partNumber, original.manufacturer, categoryLabel(original.category),
      original.specs.voltage?.max ?? '', original.specs.current?.max ?? '',
      original.specs.tempRange ? `${original.specs.tempRange.min}〜${original.specs.tempRange.max}` : '',
      (original.specs.package ?? []).join('/'), '', original.description,
    ]);
  }
  substitutes.forEach(p => {
    rows.push([
      '代替品', p.partNumber, p.manufacturer, categoryLabel(p.category),
      p.specs.voltage?.max ?? '', p.specs.current?.max ?? '',
      p.specs.tempRange ? `${p.specs.tempRange.min}〜${p.specs.tempRange.max}` : '',
      (p.specs.package ?? []).join('/'), p.score !== null ? `${p.score}%` : '', p.description,
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
// モーダル
// =============================================

let lastResult = null;

function openModal(partId) {
  const part = PARTS_DB.find(p => p.id === partId);
  if (!part) return;

  document.getElementById('modalTitle').textContent = `${part.partNumber} — 詳細情報`;
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-specs">
      <p class="modal-desc">${part.description}</p>
      <div class="spec-grid spec-grid--modal">
        ${specRow('メーカー', part.manufacturer)}
        ${specRow('カテゴリ', categoryLabel(part.category))}
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
      ${part.alternativeTo.length > 0 ? `<p class="alt-info">代替元: ${part.alternativeTo.map(id => PARTS_DB.find(p => p.id === id)?.partNumber ?? id).join(', ')}</p>` : ''}
    </div>
  `;
  document.getElementById('modalOverlay').style.display = 'flex';
}

// =============================================
// イベントバインディング
// =============================================

function getFilters() {
  return {
    category: document.getElementById('category').value,
    package: document.getElementById('package').value,
    voltageMax: document.getElementById('voltageMax').value,
    currentMax: document.getElementById('currentMax').value,
    tempRange: document.getElementById('tempRange').value,
  };
}

function doSearch() {
  const q = document.getElementById('partNumber').value;
  if (!q.trim()) { showState('emptyState'); return; }

  showState('loading');

  setTimeout(() => {
    const result = searchParts(q, getFilters());
    if (!result || result.substitutes.length === 0 && !result.original) {
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

  // 詳細ボタン（委譲）
  document.addEventListener('click', e => {
    if (e.target.classList.contains('detail-btn')) {
      openModal(e.target.dataset.id);
    }
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
