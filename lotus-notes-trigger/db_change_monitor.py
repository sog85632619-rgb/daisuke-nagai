#!/usr/bin/env python3
"""
Lotus Notes DB 変更監視プログラム (Python + REST API版)

概要: HCL Domino REST API を使用してDBの変更を監視し、処理を実行する

対応バージョン:
    - HCL Domino V12 以降（Domino REST API対応版）

必要なライブラリ:
    pip install requests

使用方法:
    python db_change_monitor.py
"""

import requests
import time
import json
from datetime import datetime, timedelta
from typing import Optional, Dict, List, Any

# ============================================================================
# 設定
# ============================================================================

class Config:
    # Domino REST API の設定
    DOMINO_HOST = "https://domino-server.example.com"
    DATABASE_PATH = "path/database.nsf"

    # 認証情報
    USERNAME = "your_username"
    PASSWORD = "your_password"

    # 監視設定
    POLL_INTERVAL_SECONDS = 30  # 監視間隔（秒）


# ============================================================================
# Domino REST API クライアント
# ============================================================================

class DominoRestClient:
    """Domino REST API クライアント"""

    def __init__(self, host: str, username: str, password: str):
        self.host = host.rstrip('/')
        self.username = username
        self.password = password
        self.session = requests.Session()
        self.token: Optional[str] = None

    def authenticate(self) -> bool:
        """認証してトークンを取得"""
        url = f"{self.host}/api/v1/auth"
        try:
            response = self.session.post(
                url,
                json={"username": self.username, "password": self.password},
                headers={"Content-Type": "application/json"}
            )
            response.raise_for_status()
            data = response.json()
            self.token = data.get("bearer")
            print(f"認証成功")
            return True
        except requests.RequestException as e:
            print(f"認証エラー: {e}")
            return False

    def get_modified_documents(self, db_path: str, since: datetime) -> List[Dict[str, Any]]:
        """指定時刻以降に変更された文書を取得"""
        url = f"{self.host}/api/v1/databases/{db_path}/documents"

        # ISO 8601 形式で日時を指定
        since_str = since.isoformat() + "Z"

        params = {
            "modifiedsince": since_str,
            "count": 100  # 最大取得件数
        }

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }

        try:
            response = self.session.get(url, params=params, headers=headers)
            response.raise_for_status()
            return response.json().get("documents", [])
        except requests.RequestException as e:
            print(f"文書取得エラー: {e}")
            return []

    def get_document(self, db_path: str, unid: str) -> Optional[Dict[str, Any]]:
        """特定の文書を取得"""
        url = f"{self.host}/api/v1/databases/{db_path}/documents/{unid}"

        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }

        try:
            response = self.session.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"文書取得エラー (UNID: {unid}): {e}")
            return None


# ============================================================================
# 文書処理ハンドラー
# ============================================================================

class DocumentHandler:
    """文書処理ハンドラー"""

    def process(self, doc: Dict[str, Any]) -> None:
        """文書を処理"""
        unid = doc.get("@unid", "unknown")
        form = doc.get("Form", "unknown")
        modified = doc.get("@modified", "unknown")

        print(f"  文書処理: UNID={unid}")
        print(f"    フォーム: {form}")
        print(f"    更新日時: {modified}")

        # フォームタイプによって処理を分岐
        handler_method = getattr(self, f"handle_{form.lower()}", None)
        if handler_method:
            handler_method(doc)
        else:
            print(f"    → 処理対象外のフォーム")

    def handle_request(self, doc: Dict[str, Any]) -> None:
        """Request フォームの処理"""
        status = doc.get("Status", "")
        requester = doc.get("Requester", "")
        print(f"    [Request] ステータス: {status}, 申請者: {requester}")

        if status == "承認待ち":
            self.send_notification(doc, "新しい承認待ちリクエストがあります")

    def handle_approval(self, doc: Dict[str, Any]) -> None:
        """Approval フォームの処理"""
        decision = doc.get("Decision", "")
        print(f"    [Approval] 決定: {decision}")

        # 例: Webhook で外部システムに通知
        # self.call_webhook(doc)

    def handle_report(self, doc: Dict[str, Any]) -> None:
        """Report フォームの処理"""
        report_type = doc.get("ReportType", "")
        print(f"    [Report] レポートタイプ: {report_type}")

        # 例: データをエクスポート
        # self.export_data(doc)

    def send_notification(self, doc: Dict[str, Any], message: str) -> None:
        """通知を送信（サンプル）"""
        print(f"    → 通知: {message}")
        # ここに実際の通知処理を実装
        # 例: Slack, Teams, メールなど


# ============================================================================
# メイン監視プログラム
# ============================================================================

class DBChangeMonitor:
    """DB変更監視プログラム"""

    def __init__(self, config: Config):
        self.config = config
        self.client = DominoRestClient(
            config.DOMINO_HOST,
            config.USERNAME,
            config.PASSWORD
        )
        self.handler = DocumentHandler()
        self.last_check_time = datetime.utcnow() - timedelta(hours=1)

    def start(self) -> None:
        """監視を開始"""
        print("=== Lotus Notes DB 変更監視を開始 ===")
        print(f"接続先: {self.config.DOMINO_HOST}")
        print(f"DB: {self.config.DATABASE_PATH}")
        print(f"監視間隔: {self.config.POLL_INTERVAL_SECONDS}秒")
        print()

        # 認証
        if not self.client.authenticate():
            print("認証に失敗しました。終了します。")
            return

        # メイン監視ループ
        try:
            while True:
                self.check_for_changes()
                time.sleep(self.config.POLL_INTERVAL_SECONDS)
        except KeyboardInterrupt:
            print("\n監視を終了します。")

    def check_for_changes(self) -> None:
        """変更をチェック"""
        now = datetime.now()
        print(f"[{now.strftime('%Y-%m-%d %H:%M:%S')}] 変更をチェック中...")

        # 変更された文書を取得
        documents = self.client.get_modified_documents(
            self.config.DATABASE_PATH,
            self.last_check_time
        )

        if documents:
            print(f"  → {len(documents)} 件の変更を検出")
            for doc in documents:
                self.handler.process(doc)
        else:
            print("  → 変更なし")

        # チェック時刻を更新
        self.last_check_time = datetime.utcnow()


# ============================================================================
# エントリーポイント
# ============================================================================

if __name__ == "__main__":
    config = Config()
    monitor = DBChangeMonitor(config)
    monitor.start()
