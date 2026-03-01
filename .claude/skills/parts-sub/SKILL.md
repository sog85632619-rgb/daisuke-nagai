---
name: parts-sub
description: 電子部品の代替品を提案し、データシートを調査してスペック比較表を生成する。部品番号を渡すと代替候補・データシートURL・電気的特性を調べてPARTS_DBへの追記コードも出力する。
argument-hint: [部品番号 例: BC547]
---

# 電子部品 代替品調査スキル

対象部品: **$ARGUMENTS**

## タスク概要

以下のステップで代替品調査を行い、最後に `parts-substitution.js` の PARTS_DB へ追記できるコードを生成する。

---

## Step 1: 部品の基本情報を確認

1. `parts-substitution.js` の PARTS_DB を読み込み、`$ARGUMENTS` がすでに登録済みか確認する。
2. 登録済みなら現在のスペック・代替候補を確認し、不足情報（detailedSpecs, datasheetUrl）があれば Step 2 以降で補完する。
3. 未登録なら新規エントリとして調査を開始する。

---

## Step 2: データシートURL を調査

WebSearch を使い、以下の情報を収集する。

- メーカー公式データシート PDF の URL
  - 検索クエリ例: `$ARGUMENTS datasheet PDF site:ti.com OR site:onsemi.com OR site:infineon.com OR site:microchip.com OR site:toshiba.com OR site:vishay.com OR site:rohm.com OR site:renesas.com`
- メーカー名
- 部品カテゴリ（op-amp / transistor NPN / transistor PNP / diode / mosfet-n / mosfet-p / etc.）
- パッケージ種別（DIP-8 / TO-92 / TO-220 / DO-41 / SOT-23 / etc.）

---

## Step 3: 電気的特性を調査

WebSearch または WebFetch でデータシートの仕様を調べ、以下を収集する。

### オペアンプの場合
| key | label | symbol |
|-----|-------|--------|
| vs_max | 電源電圧 最大 | VS |
| vs_min | 電源電圧 最小 | VS |
| t_max | 動作温度 最高 | Topr |
| t_min | 動作温度 最低 | Topr |
| vio | 入力オフセット電圧 | VIO |
| iib | 入力バイアス電流 | IIB |
| iio | 入力オフセット電流 | IIO |
| cmrr | CMRR | CMRR |
| psrr | PSRR | PSRR |
| aol | 開ループ電圧利得 | AOL |
| iq | Quiescent電流/amp | IQ |
| isc | 出力短絡電流 | ISC |
| gbw | ゲイン帯域幅積 | GBW |
| sr | スルーレート | SR |

### トランジスタ（NPN/PNP）の場合
| key | label | symbol |
|-----|-------|--------|
| vceo | コレクタ-エミッタ間電圧 | VCEO |
| vcbo | コレクタ-ベース間電圧 | VCBO |
| vebo | エミッタ-ベース間電圧 | VEBO |
| ic_max | コレクタ電流 最大 | IC |
| pc | コレクタ損失 | PC |
| hfe_min | 直流電流増幅率 最小 | hFE |
| hfe_max | 直流電流増幅率 最大 | hFE |
| vce_sat | VCE(sat) | VCE(sat) |
| ft | 遷移周波数 | fT |
| cob | 出力容量 | Cob |
| t_max | 動作温度 最高 | Tj |

### ダイオードの場合
| key | label | symbol |
|-----|-------|--------|
| vrrm | 最大逆電圧 | VRRM |
| io | 平均整流電流 | IO |
| ifsm | サージ電流 | IFSM |
| vf | 順方向電圧 | VF |
| ir | 逆方向漏れ電流 | IR |
| trr | 逆回復時間 | trr |
| cj | 接合容量 | Cj |

### MOSFET の場合
| key | label | symbol |
|-----|-------|--------|
| vds | ドレイン-ソース間電圧 | VDS |
| vgs | ゲート-ソース間電圧 | VGS |
| id_max | ドレイン電流 最大 | ID |
| pd | 消費電力 最大 | PD |
| rds_on | オン抵抗 | RDS(on) |
| vgs_th | ゲートしきい値電圧 | VGS(th) |
| qg | ゲート電荷 | Qg |
| ciss | 入力容量 | Ciss |
| td_on | ターンオン遅延時間 | td(on) |
| tf | 立下り時間 | tf |

各スペックは以下の形式で整理する:
```
{ key, cat, label, sym, typ?, max?, min?, unit, lo, cv, cond? }
```
- `lo: true` = 低い方が優れている（電流, 電圧オフセット, 抵抗等）
- `lo: false` = 高い方が優れている（利得, 帯域幅等）
- `cv`: 比較に使う値 (`'typ'` / `'max'` / `'min'`)

---

## Step 4: 代替品候補を調査

WebSearch で代替品を調べる。
- 検索クエリ例: `$ARGUMENTS 代替品 equivalent replacement`
- 既に PARTS_DB に登録されている部品との互換性も確認する。
- 互換性の判断基準:
  - 同一カテゴリ・同一パッケージ
  - 主要スペックが同等以上
  - ピン配置が同一または変換可能

---

## Step 5: PINOUT_DB のピン情報を確認

`parts-substitution.js` の `PINOUT_DB` を確認し、該当する `pinoutId` を特定する。
新しいピン配置が必要な場合は定義を追記する。

---

## Step 6: コード生成

調査結果をもとに以下を出力する。

### (A) PARTS_DB エントリ

```js
{
  id: '${id}',
  partNumber: '${partNumber}',
  name: '${name}',
  category: '${category}',
  manufacturer: '${manufacturer}',
  pinoutId: '${pinoutId}',
  unitPriceJPY: ${price},
  specs: {
    voltage:   { max: ${vMax}, unit: 'V' },
    current:   { max: ${iMax}, unit: 'A' },
    tempRange: { min: ${tMin}, max: ${tMax}, unit: '℃' },
    package:   ${packageArray},
    // 追加スペック...
  },
  datasheetUrl:    '${datasheetUrl}',
  datasheetSource: '${datasheetSource}',
  detailedSpecs: [
    // Step 3 で収集したスペックを配列で列挙
  ],
  description: '${description}',
  alternativeTo: ${alternativeTo},
}
```

### (B) 代替品関係の更新

既存部品の `alternativeTo` に追記が必要な場合、その変更箇所も示す。

---

## 出力形式

1. **調査結果サマリー** — 部品の概要・メーカー・カテゴリ
2. **データシート URL** — 公式 PDF リンクと注記
3. **代替品候補リスト** — 各候補の互換性評価
4. **生成コード** — PARTS_DB に貼り付け可能な JavaScript
5. **追記手順** — `parts-substitution.js` のどこに挿入するか

最後に、`parts-substitution.js` を編集して追記するか確認を求める。

---

## 注意事項

- ネットワーク制限により一部メーカーサイト（ti.com 等）への直接アクセスが不可な場合がある。その場合は WebSearch の結果と学習データを組み合わせてスペックを推定し、その旨を明記する。
- スペック値は「データシート記載値」「推定値」を明確に区別して示す。
- `lo` / `cv` の設定は部品の用途に応じて適切に判断する。
