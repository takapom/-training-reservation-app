src/app/page.tsxでログイン画面を表示
※現在はメールアドレスやパスワードでのログイン機能はできない

ログイン後、src/app/mypage/page.tsxに遷移し、ログインしているかのチェック、ユーザーごとのページに遷移する処理を定義



----Firebaseからのデータ取得際のデータ構造の移り変わり----
【Firestoreの生データ】
↓ onSnapshot（QuerySnapshot）
【snapshot.docs（DocumentSnapshotの配列）】
↓ doc.data()
【各ドキュメントの中身（Timestamp付き）】
↓ .toDate() & 加工
【画面表示用の配列オブジェクト】
↓ setReservations(data)
【Reactの状態：表示に使われる】