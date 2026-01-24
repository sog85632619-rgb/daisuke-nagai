# Lotus Notes DB 変更トリガー処理

Lotus Notes/Domino データベースの状態変化をトリガーに処理を実行するサンプルプログラム集です。

## 概要

| ファイル | 言語 | 方式 | 対応環境 |
|----------|------|------|----------|
| `db_change_agent.lss` | LotusScript | エージェント | Domino 全バージョン |
| `DBChangeMonitor.java` | Java | 外部プログラム | Domino 全バージョン |
| `db_change_monitor.py` | Python | REST API | HCL Domino V12+ |

## 1. LotusScript エージェント (推奨)

### 特徴
- Domino内で完結する最もシンプルな方法
- スケジュール実行またはイベントトリガーで動作
- 追加のインフラ不要

### 設定手順

1. **Domino Designer を開く**

2. **エージェントを作成**
   - データベースを開く
   - 「エージェント」を右クリック → 「新規エージェント」

3. **トリガーを設定**
   - プロパティで以下のいずれかを選択:
     - 「新規および変更された文書について」（リアルタイム）
     - 「スケジュール」→「X分ごと」（ポーリング）

4. **コードを貼り付け**
   - `db_change_agent.lss` の内容を貼り付け
   - カスタム処理を `ProcessDocument` サブルーチンに追加

5. **署名して保存**

### 主なカスタマイズポイント

```lotusscript
Sub ProcessDocument(doc As NotesDocument)
    ' ここにカスタム処理を追加
    ' 例:
    '   - 別DBへの転記
    '   - メール通知
    '   - 外部API呼び出し
    '   - ワークフロー処理
End Sub
```

## 2. Java 外部監視プログラム

### 特徴
- Dominoサーバー外から監視可能
- 柔軟なカスタマイズが可能
- 他システムとの統合が容易

### 必要環境
- Java 8 以上
- Notes.jar（Domino/Notes インストールディレクトリから取得）
- Notes クライアントまたは Domino サーバーがインストールされた環境

### 実行方法

```bash
# Windows
java -Djava.library.path="C:\Program Files\IBM\Notes" -cp "Notes.jar;." DBChangeMonitor

# Linux
java -Djava.library.path="/opt/ibm/notes" -cp "Notes.jar:." DBChangeMonitor
```

### 設定

```java
// DBChangeMonitor.java の設定値を編集
private static final String SERVER = "ServerName/Domain";
private static final String DATABASE = "path/database.nsf";
private static final int POLL_INTERVAL_SECONDS = 30;
```

## 3. Python + REST API

### 特徴
- モダンな実装方法
- HCL Domino V12 以降で利用可能
- インフラ要件が軽い

### 必要環境
- Python 3.7 以上
- HCL Domino V12+ (Domino REST API 有効)

### インストール

```bash
pip install requests
```

### 設定

```python
# db_change_monitor.py の Config クラスを編集
class Config:
    DOMINO_HOST = "https://your-domino-server.com"
    DATABASE_PATH = "path/database.nsf"
    USERNAME = "your_username"
    PASSWORD = "your_password"
    POLL_INTERVAL_SECONDS = 30
```

### 実行

```bash
python db_change_monitor.py
```

## ユースケース例

### 1. ワークフロー自動化
```
文書作成 → ステータス変更 → 自動承認ルーティング
```

### 2. 外部システム連携
```
Notes文書更新 → REST API呼び出し → 外部システム同期
```

### 3. 通知システム
```
重要文書変更 → Slack/Teams/メール通知
```

### 4. データ同期
```
マスターDB更新 → 複数DBへ自動転記
```

## トラブルシューティング

### エージェントが実行されない
- エージェントの署名を確認
- サーバー上でエージェントマネージャーが有効か確認
- `notes.ini` で `AMgr_DocUpdateAgentMinInterval` を確認

### Java プログラムが接続できない
- `notes.ini` へのパスを確認
- `java.library.path` が正しく設定されているか確認
- ローカル Notes クライアントでログインしているか確認

### REST API がエラーを返す
- Domino REST API サービスが起動しているか確認
- CORS 設定を確認
- 認証情報が正しいか確認

## ライセンス

MIT License
