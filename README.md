# SIMAK SMANTANG v52.2 — Go-Live Bootstrap Fix

Perbaikan:
- Bootstrap Firebase Admin dihitung sebagai autentikasi valid pada uji pra-Go-Live.
- Firebase Storage tidak memblokir Go-Live inti saat project masih Spark.
- Aktivasi Production hanya dapat dilakukan jika semua pemeriksaan blocking LULUS dan ada sesi Firebase Production atau Bootstrap Admin valid.

Urutan:
1. Deploy v52.2.
2. Login Staging.
3. Pastikan Bootstrap Firebase Admin masih/ kembali Authenticated.
4. Jalankan Uji Go-Live.
5. Pastikan semua pemeriksaan blocking LULUS.
6. Buat backup terakhir.
7. Aktifkan Production.
8. Login ulang memakai Firebase Authentication.
9. Uji akun Wakil Kurikulum dan Kepala Sekolah dari browser/perangkat lain.
