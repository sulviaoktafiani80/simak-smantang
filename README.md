# SIMAK SMANTANG v54 — Audit Log & Production Monitoring

## Fitur v54
- Audit login/logout.
- Audit metadata perubahan data yang tersinkron ke Firestore.
- `lastLoginAt`, `lastSeenAt`, `loginCount` pada profil akun.
- Monitoring akun aktif 7 hari dan akun yang belum pernah login.
- Pencatatan client error / unhandled rejection ke `systemEvents`.
- Health check read/write Firestore.
- Dashboard Audit & Monitoring Produksi.
- Filter audit dan ekspor CSV.
- Ekspor aktivitas akun.
- Security Rules khusus `auditLogs`, `systemEvents`, dan update aktivitas akun sendiri.

## Sangat penting setelah deploy
`index.html` saja tidak cukup. Publish juga file `firestore.rules` v54 melalui:

Firebase Console → Firestore Database → Rules → paste → Publish.

Tanpa Rules v54:
- login aplikasi tetap dapat bekerja;
- tetapi `lastLoginAt`, `auditLogs`, dan `systemEvents` dapat ditolak oleh Rules lama.

## Deploy
Upload ke repository GitHub:
- `index.html`
- `firestore.rules`
- `storage.rules` (boleh disimpan di repo; Storage masih opsional)
- `vercel.json`
- `README.md`

Jangan upload service account atau file password.

## Verifikasi
1. Login Wakil Kurikulum.
2. Buka **Audit & Monitoring Produksi**.
3. Klik **Jalankan Health Check**.
4. Logout lalu login kembali.
5. Refresh dashboard monitoring.
6. Pastikan loginCount bertambah dan audit LOGIN/LOGOUT muncul.
7. Lakukan satu perubahan data non-kritis lalu pastikan audit UPSERT tercatat.
