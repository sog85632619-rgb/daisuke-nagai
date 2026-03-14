---
name: parts-validate
description: parts-substitution.js の PARTS_DB と PINOUT_DB を読み込み、整合性を検証する。alternativeTo の双方向漏れ・pinoutId 参照ミス・必須フィールド欠落・detailedSpecs の lo/cv 設定ミスを検出し、修正コードを出力する。
---

# PARTS_DB 整合性チェックスキル

`parts-substitution.js` を読み込み、以下の 4 項目を順番にチェックする。
問題が見つかった場合は修正箇所と修正コードをまとめて出力する。

---

## Step 1: ファイル読み込み

`parts-substitution.js` を Read ツールで読み込み、以下を把握する。

- PARTS_DB の全エントリ（id, partNumber, pinoutId, alternativeTo, detailedSpecs, datasheetUrl など）
- PINOUT_DB の全キー一覧
- `isPinCompatible()` の実装内容

---

## Step 2: alternativeTo の双方向チェック

PARTS_DB の全エントリを走査し、以下を確認する。

**ルール**: 部品 A の `alternativeTo` に部品 B の id が含まれるなら、
部品 B の `alternativeTo` にも部品 A の id が含まれていなければならない。

**検出結果の形式**:
```
⚠️ alternativeTo 双方向漏れ
  BC547.alternativeTo に '2sc1815' があるが、2SC1815.alternativeTo に 'bc547' がない
  → 2SC1815 の alternativeTo に 'bc547' を追記する必要がある
```

修正が必要な部品をすべてリストアップし、修正後の `alternativeTo` 配列を提示する。

---

## Step 3: pinoutId 参照チェック

全 PARTS_DB エントリの `pinoutId` が PINOUT_DB に存在するキーかどうか確認する。

**検出結果の形式**:
```
🔴 pinoutId 参照エラー
  部品: XXXXX (id: xxxxx)
  pinoutId: 'unknown-package'  ← PINOUT_DB に存在しない
  → 正しい pinoutId に修正するか、PINOUT_DB に新規エントリを追加する必要がある
```

---

## Step 4: 必須フィールド欠落チェック

全 PARTS_DB エントリに対して以下の必須フィールドが存在するか確認する。

| フィールド | 必須か | 備考 |
|------------|--------|------|
| `id` | 必須 | 小文字英数字 |
| `partNumber` | 必須 | |
| `name` | 必須 | |
| `category` | 必須 | ic / transistor / diode / mosfet のいずれか |
| `manufacturer` | 必須 | |
| `pinoutId` | 必須 | |
| `unitPriceJPY` | 推奨 | 欠落は警告のみ |
| `specs` | 必須 | |
| `datasheetUrl` | 推奨 | 欠落は警告のみ |
| `detailedSpecs` | 推奨 | 欠落は警告のみ |
| `alternativeTo` | 必須 | 空配列 `[]` でも可 |
| `description` | 推奨 | 欠落は警告のみ |

**検出結果の形式**:
```
🔴 必須フィールド欠落
  部品: XXXXX (id: xxxxx)
  欠落: datasheetUrl, description

⚠️ 推奨フィールド欠落
  部品: YYYYY (id: yyyyy)
  欠落: unitPriceJPY
```

---

## Step 5: detailedSpecs の lo/cv 整合チェック

`detailedSpecs` が存在する全エントリに対して、各スペックの `lo` と `cv` が整合しているか確認する。

**ルール**:
- `cv: 'max'` なのに `max` 値が未定義 → エラー
- `cv: 'min'` なのに `min` 値が未定義 → エラー
- `cv: 'typ'` なのに `typ` 値が未定義 → エラー
- `lo: true`（低い方が良い）なのに `cv: 'min'` ではなく `cv: 'max'` → 警告（意図的な場合もあるので警告のみ）
- `lo: false`（高い方が良い）なのに `cv: 'max'` → 警告（同上）

**検出結果の形式**:
```
🔴 detailedSpecs cv 参照エラー
  部品: XXXXX / key: 'gbw'
  cv: 'typ' だが typ 値が未定義

⚠️ detailedSpecs lo/cv 不整合（要確認）
  部品: YYYYY / key: 'vio'
  lo: true（低い方が良い）だが cv: 'typ'（typ で比較）← 意図的？
```

---

## 出力形式

### サマリー

```
✅ チェック完了: parts-substitution.js
─────────────────────────────
部品数:       XX
PINOUT数:     XX
─────────────────────────────
🔴 エラー:    X 件
⚠️ 警告:      X 件
✅ 問題なし:  X 件
```

### 詳細レポート

Step 2〜5 で検出した問題を項目ごとにまとめて表示する。

### 修正コード

エラー・警告がある場合、`parts-substitution.js` に適用できる修正箇所を具体的に提示する。
修正を適用するか確認を求めてから Edit ツールで反映する。
