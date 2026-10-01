# SIMAK SMANTANG v57.1 — Realtime Sync Fix

Perbaikan utama:
- `users/{uid}` sekarang dipantau realtime secara terpisah untuk Kepala Sekolah/Wakil Kurikulum.
- **Manajemen Akun & Password** memakai `onSnapshot()` untuk koleksi `users` dan `accountAdminRequests`.
- Perubahan status akun dari perangkat A langsung muncul pada perangkat B tanpa tombol Refresh.
- `rawData.users` tetap memakai `staffMaster`, sehingga profil Firebase tidak menimpa master pegawai.
- Status bar menampilkan badge **v57.1** agar deploy dapat diverifikasi.

## Cara uji
1. Upload `index.html` v57.1 ke GitHub.
2. Tunggu Vercel Ready.
3. Pada dua perangkat lakukan Ctrl+F5.
4. Pastikan status bar menampilkan `Realtime LIVE` dan badge `v57.1`.
5. Buka **Manajemen Akun & Password** pada kedua perangkat.
6. Di perangkat A aktif/nonaktifkan satu akun uji.
7. Perangkat B harus berubah otomatis tanpa Refresh.
8. Untuk data akademik, ubah data non-kritis pada A dan lihat modul yang sama pada B.
