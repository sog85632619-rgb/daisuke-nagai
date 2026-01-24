/**
 * Lotus Notes DB 変更監視プログラム (Java版)
 *
 * 概要: 外部JavaプログラムからNotes DBの変更を監視し、処理を実行する
 *
 * 必要なライブラリ:
 *   - Notes.jar (Domino/Notes インストールディレクトリから)
 *
 * 実行方法:
 *   java -Djava.library.path="C:\Program Files\IBM\Notes" -jar DBChangeMonitor.jar
 */

import lotus.domino.*;
import java.util.Vector;
import java.util.Date;
import java.text.SimpleDateFormat;

public class DBChangeMonitor {

    // 設定値
    private static final String SERVER = "ServerName/Domain";  // サーバー名
    private static final String DATABASE = "path/database.nsf"; // DB パス
    private static final int POLL_INTERVAL_SECONDS = 30;        // 監視間隔（秒）

    private Session session;
    private Database db;
    private DateTime lastCheckTime;

    public static void main(String[] args) {
        DBChangeMonitor monitor = new DBChangeMonitor();
        try {
            monitor.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 監視を開始
     */
    public void start() throws NotesException, InterruptedException {
        System.out.println("=== Lotus Notes DB 変更監視を開始 ===");

        // Notes セッションを初期化
        NotesThread.sinitThread();
        try {
            session = NotesFactory.createSession();
            db = session.getDatabase(SERVER, DATABASE);

            if (!db.isOpen()) {
                db.open();
            }

            System.out.println("接続先DB: " + db.getTitle());
            System.out.println("監視間隔: " + POLL_INTERVAL_SECONDS + "秒");
            System.out.println();

            // 初期時刻を設定
            lastCheckTime = session.createDateTime(new Date());

            // メイン監視ループ
            while (true) {
                checkForChanges();
                Thread.sleep(POLL_INTERVAL_SECONDS * 1000);
            }

        } finally {
            NotesThread.stermThread();
        }
    }

    /**
     * 変更をチェック
     */
    private void checkForChanges() throws NotesException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("[" + sdf.format(new Date()) + "] 変更をチェック中...");

        // 前回チェック以降に変更された文書を取得
        DocumentCollection modifiedDocs = db.getModifiedDocuments(lastCheckTime);

        int count = modifiedDocs.getCount();
        if (count > 0) {
            System.out.println("  → " + count + " 件の変更を検出");

            Document doc = modifiedDocs.getFirstDocument();
            while (doc != null) {
                processDocument(doc);
                Document nextDoc = modifiedDocs.getNextDocument(doc);
                doc.recycle();
                doc = nextDoc;
            }
        } else {
            System.out.println("  → 変更なし");
        }

        // チェック時刻を更新
        lastCheckTime.recycle();
        lastCheckTime = session.createDateTime(new Date());
    }

    /**
     * 個別文書を処理
     */
    private void processDocument(Document doc) throws NotesException {
        // 文書情報を取得
        String unid = doc.getUniversalID();
        String form = doc.getItemValueString("Form");
        DateTime modified = doc.getLastModified();

        System.out.println("  文書処理: UNID=" + unid);
        System.out.println("    フォーム: " + form);
        System.out.println("    更新日時: " + modified.getLocalTime());

        // ----------------------------------------------------------------
        // ここにカスタム処理を追加
        // ----------------------------------------------------------------

        // 例: フォームタイプによって処理を分岐
        switch (form) {
            case "Request":
                handleRequest(doc);
                break;
            case "Approval":
                handleApproval(doc);
                break;
            case "Report":
                handleReport(doc);
                break;
            default:
                System.out.println("    → 処理対象外のフォーム");
        }
    }

    /**
     * Request フォームの処理
     */
    private void handleRequest(Document doc) throws NotesException {
        String status = doc.getItemValueString("Status");
        String requester = doc.getItemValueString("Requester");

        System.out.println("    [Request] ステータス: " + status + ", 申請者: " + requester);

        // 例: ステータスが「承認待ち」なら通知を送信
        if ("承認待ち".equals(status)) {
            sendNotification(doc, "新しい承認待ちリクエストがあります");
        }
    }

    /**
     * Approval フォームの処理
     */
    private void handleApproval(Document doc) throws NotesException {
        String decision = doc.getItemValueString("Decision");
        System.out.println("    [Approval] 決定: " + decision);

        // 例: 外部システムにAPIコール
        // callExternalAPI(doc);
    }

    /**
     * Report フォームの処理
     */
    private void handleReport(Document doc) throws NotesException {
        String reportType = doc.getItemValueString("ReportType");
        System.out.println("    [Report] レポートタイプ: " + reportType);

        // 例: ファイルに出力
        // exportToFile(doc);
    }

    /**
     * 通知を送信（サンプル）
     */
    private void sendNotification(Document doc, String message) throws NotesException {
        Database mailDb = session.getDatabase(SERVER, "mail/admin.nsf");
        Document mailDoc = mailDb.createDocument();

        mailDoc.replaceItemValue("Form", "Memo");
        mailDoc.replaceItemValue("Subject", "【通知】" + message);
        mailDoc.replaceItemValue("Body", "文書が更新されました。\n\n" +
                "UNID: " + doc.getUniversalID() + "\n" +
                "更新日時: " + doc.getLastModified().getLocalTime());

        // mailDoc.send(false, "recipient@example.com");
        System.out.println("    → 通知メール送信（実際の送信はコメントアウト中）");

        mailDoc.recycle();
        mailDb.recycle();
    }
}
