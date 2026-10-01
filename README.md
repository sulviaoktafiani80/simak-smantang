# SIMAK SMANTANG v52.1 — Firebase Bootstrap Login & Secure Migration

Versi ini memperbaiki alur migrasi ketika aplikasi masih dalam mode Staging.

## Masalah yang Diselesaikan

Security Rules v52 mengharuskan request Firestore berasal dari pengguna Firebase Authentication yang valid. Pada mode Staging, login SIMAK sebelumnya masih prototype sehingga migrasi Firestore dapat ditolak dengan `permission-denied`.

v52.1 menambahkan **Bootstrap Authentication Firebase** khusus untuk migrasi.

## Alur yang Benar

1. Deploy v52.1 ke Vercel.
2. Pastikan Firebase Web Config sudah tersimpan.
3. Authentication Email/Password sudah aktif.
4. Firestore sudah dibuat.
5. Firestore Rules v52/v52.1 sudah dipublish.
6. Dokumen `users/{uid}` Kepala Sekolah dan Wakil Kurikulum sudah dibuat.
7. Buka **Migrasi Data & Akun Firebase**.
8. Pada **Tahap 0 — Bootstrap Authentication Firebase**:
   - masukkan email akun Kepala Sekolah atau Wakil Kurikulum;
   - masukkan password Firebase;
   - klik **Login Firebase Admin**.
9. Pastikan status:
   **Firebase Admin Authenticated**
10. Buat backup pra-migrasi.
11. Jalankan migrasi data.
12. Verifikasi Firestore.
13. Lanjutkan provisioning UID akun lain.
14. Setelah selesai, logout bootstrap.
15. Masuk ke **Uji Produksi & Go-Live** dan lanjutkan checklist v52.

## Penting

Bootstrap Login:
- tidak mengubah mode aplikasi menjadi Production;
- tidak menyimpan password;
- hanya menyimpan metadata sesi (UID, email, nama, role) di localStorage;
- Firebase session tetap dikelola oleh Firebase Authentication;
- hanya menerima role `Kepala Sekolah` atau `Wakil Kurikulum`.

## Keamanan

Jangan membuka Firestore Rules dengan `allow read, write: if true`.

Migrasi harus dilakukan dengan akun Firebase admin yang sah dan dokumen `users/{uid}` aktif.

## Tahap Berikutnya

Setelah migrasi dan verifikasi:
- aktifkan Firebase Storage;
- publish Storage Rules;
- sinkronisasi master go-live;
- uji login Firebase;
- uji multi-device;
- aktifkan Production.
