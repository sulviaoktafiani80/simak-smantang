# SIMAK SMANTANG v52 — Uji Produksi & Go-Live

v52 mengaktifkan jalur produksi Firebase secara bertahap.

## Perubahan Utama

- Login produksi menggunakan Firebase Authentication Email/Password.
- Profil role dibaca dari `users/{uid}` di Cloud Firestore.
- Firestore menjadi sumber data utama ketika mode Production aktif.
- Data staff dimuat dari `staffMaster`, terpisah dari profil autentikasi `users`.
- Data murid/orang tua dibaca secara terfilter berdasarkan `localId` / `childId`.
- Perubahan data oleh akun staff menggunakan write-through ke Firestore.
- Tersedia pusat **Uji Produksi & Go-Live**.
- Tersedia sinkronisasi master sebelum aktivasi Production.
- Tersedia rollback ke Staging tanpa menghapus data Firestore.
- Firestore Rules diperketat per collection dan role.

## Sebelum Mengaktifkan Production

1. Deploy v52 ke Vercel.
2. Firebase Web Config sudah tersimpan.
3. Authentication Email/Password aktif.
4. Firestore dan Storage aktif.
5. Terapkan `firestore.rules` dan `storage.rules`.
6. Akun Kepala Sekolah dan Wakil Kurikulum sudah dibuat.
7. `users/{uid}` untuk akun tersebut sudah memiliki:
   - `localId`
   - `name`
   - `email`
   - `role`
   - `active: true`
8. Jalankan migrasi v51.
9. Masuk ke **Uji Produksi & Go-Live**.
10. Klik **Sinkronkan Master ke Firestore**.
11. Jalankan **Uji Go-Live**.
12. Pastikan seluruh pemeriksaan LULUS.
13. Buat backup terakhir.
14. Klik **Aktifkan Production**.

## Rollback

Jika terjadi masalah:
- gunakan menu **Rollback ke Staging** saat masih bisa masuk sebagai manajemen; atau
- ubah localStorage `simak_go_live_mode` menjadi `staging` melalui browser developer tools sebagai pemulihan darurat.

Rollback tidak menghapus data Firestore.

## Catatan Akun Murid/Orang Tua

Untuk Murid:
- profil `users/{uid}` perlu `role: "Murid"` dan `localId` yang sama dengan ID dokumen `students`.

Untuk Orang Tua/Wali:
- profil perlu `role: "Orang Tua/Wali"` dan `childId` yang menunjuk ID murid.

Uji Security Rules per role sebelum akun dibagikan.

## Setelah v52

Tahap selanjutnya adalah stabilisasi pasca-go-live:
- audit error nyata;
- monitoring koneksi;
- optimasi query;
- penguatan token QR;
- upload bukti ke Storage;
- audit log perubahan.
