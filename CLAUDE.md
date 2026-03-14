# このリポジトリのルール

## プロジェクト概要

- バニラ HTML/CSS/JS（フレームワークなし）のブラウザアプリ集
- 日本語 UI 統一
- 単一HTMLファイル自己完結型を基本とする（外部依存は CDN のみ許可）

---

## デザインシステム

新しいツールを作る際は以下を必ず踏襲すること。

```css
/* 背景グラデーション */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* メインコンテナ */
background: white;
border-radius: 20px;
box-shadow: 0 10px 40px rgba(0,0,0,0.2);
max-width: 800px;

/* アクセントカラー */
#667eea  /* メインパープル */
#764ba2  /* サブパープル */
#4caf50  /* 成功グリーン */
#f44336  /* エラーレッド */
#ff9800  /* 警告オレンジ */
```

---

## 電子回路検証ツール (circuit-verifier.html)

### 概要

`circuit-verifier.html` は JSON ネットリストを入力して電子回路の接続を検証するツール。

### JSON ネットリスト形式

```json
{
  "components": [
    {
      "id": "R1",          // ユニーク ID（必須）
      "type": "resistor",  // 部品タイプ（必須、下記参照）
      "value": "1kΩ",      // 値（省略可）
      "pins": ["A", "B"]   // ピン名リスト（必須）
    }
  ],
  "connections": [
    { "from": "VCC1.pin1", "to": "R1.A" }
  ],
  "ic_pins": {             // IC ピン照合（省略可）
    "U1": [
      { "pin": "8", "name": "VCC", "function": "power", "bypass_cap": "100nF" },
      { "pin": "1", "name": "GND", "function": "ground" }
    ]
  }
}
```

### サポートする部品タイプ

| type | 説明 |
|------|------|
| `power` / `vcc` | 電源 |
| `ground` / `gnd` | GND |
| `resistor` | 抵抗（ショート検出では抵抗素子として扱う） |
| `capacitor` | コンデンサ |
| `inductor` | インダクタ |
| `and_gate` | AND ゲート |
| `or_gate` | OR ゲート |
| `not_gate` | NOT ゲート |
| `nand_gate` | NAND ゲート |
| `nor_gate` | NOR ゲート |
| `xor_gate` | XOR ゲート |
| `ic` | IC 汎用（`part` フィールドで品番を指定） |

### ic_pins の function 値

| function | 説明 | 検証ルール |
|----------|------|-----------|
| `power` | 電源ピン | 電源ネットに接続されているか確認。`bypass_cap` 指定時はコンデンサ有無を警告 |
| `ground` | GNDピン | GND ネットに接続されているか確認 |
| `input` | 入力ピン | 浮遊ピンとして通常の検証に任せる |
| `output` | 出力ピン | VCC/GND への直結を ERROR/WARNING で検出 |
| `nc` | 接続禁止 | 接続があれば ERROR |
| `bidir` | 双方向 I/O | 特別なルールなし |
| `open_drain` | オープンドレイン | 特別なルールなし |

### 検証チェック一覧

| チェック | 重要度 | 説明 |
|---------|--------|------|
| 重複部品 ID | ERROR | 同じ ID が複数ある |
| 無効参照 | ERROR | 存在しない部品/ピンへの接続 |
| ショート回路 | ERROR | VCC→GND へ受動素子を経由しないパス（BFS） |
| IC 電源ピン未接続 | IC ERROR | 電源ピンが VCC に繋がっていない |
| IC GND ピン未接続 | IC ERROR | GND ピンが GND に繋がっていない |
| IC 出力 VCC 直結 | IC ERROR | 出力ピンが VCC に直結 |
| IC NC ピン接続 | IC ERROR | NC ピンに接続がある |
| 重複接続 | WARNING | 同じ接続が複数定義 |
| 浮遊ピン | WARNING | 未接続のピン |
| バイパスコンデンサ不足 | IC WARNING | VCC ピンに指定コンデンサがない |
| IC 出力 GND 直結 | IC WARNING | 出力ピンが GND に直結 |

### ツールの修正・拡張手順

1. **新しい部品タイプを追加する場合**
   - `PASSIVE_TYPES` に追加 → ショート検出でインピーダンスとして扱われる
   - `TYPE_LABELS` に日本語名を追加

2. **新しい検証チェックを追加する場合**
   - `runAllChecks()` 関数内に新しい check 関数の呼び出しを追加
   - `baseIssues` または `icIssues` に結果を追記
   - `renderResults()` の表示ロジックは自動対応（severity 名に応じて CSS クラスが決まる）

3. **サンプルを追加する場合**
   - `SAMPLES` オブジェクトに追記
   - `sample-buttons` div にボタンを追加

4. **PDF ピン抽出の精度を上げる場合**
   - `extractPinsFromLines()` の正規表現を調整
   - `detectPinFunction()` のキーワードリストを拡張

### データシートPDF照合の使い方（UI）

1. JSON を入力して部品を認識させる
2. 「データシート照合」セクションを展開
3. 「照合するIC部品」で対象コンポーネントを選択
4. PDF をアップロードして「抽出する」
5. 抽出されたピン定義を確認・修正
6. 「照合に使用する」を押す
7. 「回路を検証する」を再実行

または、JSON の `ic_pins` フィールドに直接定義を記述しても同等の照合ができる。

---

## コーディング規約

- `const` / `let` を使う（`var` 禁止）
- DOM 操作は `getElementById` / `querySelector`
- ユーザー入力を HTML に埋め込む際は必ず `escHtml()` でエスケープ
- コメントは日本語 OK
- ファイルサイズが大きくなる場合でも単一ファイルを維持する
