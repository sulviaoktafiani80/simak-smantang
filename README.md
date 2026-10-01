# SIMAK SMANTANG v56 — Manajemen Akun & Reset Password Production

Fitur utama: dashboard akun Production, filter role/status/login, reset email Firebase untuk email nyata, permintaan reset admin untuk akun murid/NISN, aktif/nonaktif akses SIMAK, bulk access, ekspor CSV, dan audit.

## Wajib setelah deploy
Publish `firestore.rules` v56 di Firebase Console → Firestore → Rules.

## Reset murid/NISN
1. Dari SIMAK klik **Permintaan Reset Admin**.
2. Di komputer admin, letakkan `serviceAccountKey.json` pada folder toolkit v56.
3. Jalankan `npm install` lalu `npm run process-resets`.
4. Password sementara tersimpan hanya pada CSV lokal di folder `output/`. Jangan upload ke GitHub.

## Catatan keamanan
`active=false` menonaktifkan akses data SIMAK melalui Security Rules, tetapi tidak menghapus akun Firebase Authentication.
