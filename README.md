# SIMAK SMANTANG v57.4 — Persistent Firebase Production Bootstrap

## Akar masalah yang diperbaiki
Pada v57.1–v57.3, data Firestore dapat sehat tetapi runtime aplikasi kadang mulai sebelum Firebase benar-benar terinisialisasi atau konfigurasi lokal kosong setelah deployment/browser reset. Dampaknya:
- `0 listener`;
- Realtime terus `Menghubungkan...`;
- Manajemen Akun dapat membutuhkan Recovery Load/manual initialization.

## Perbaikan v57.4
- Firebase web config project `simak-sman1mantang` menjadi default Production di aplikasi.
- Nilai kosong dari localStorage tidak dapat menimpa default config.
- Pada hostname Vercel SIMAK, mode otomatis `production`.
- Bootstrap otomatis menunggu Firebase SDK dan retry dengan backoff.
- Auth persistence menggunakan Firebase `LOCAL`.
- `onAuthStateChanged` baru dipasang setelah Auth + Firestore siap.
- Realtime listener baru dipasang setelah bootstrap selesai.
- Login dapat memicu self-healing bootstrap.
- Recovery Load dapat memicu bootstrap sendiri.
- Session Firebase dipulihkan otomatis setelah refresh.
- Fallback v57.3 tetap dipertahankan: realtime error tidak mengosongkan data akun.

## Konfigurasi Production
Project ID: `simak-sman1mantang`

Firebase Web API key bukan private server credential. Keamanan data tetap dikendalikan oleh Firebase Authentication dan Firestore Security Rules. Jangan pernah memasukkan service-account private key ke HTML.

## Deploy
Upload `index.html` v57.4 ke GitHub/Vercel. Rules tidak berubah dari v57.3.

Setelah Vercel Ready:
1. Ctrl+F5.
2. Login Firebase.
3. Pastikan akun terbaca 166.
4. Pastikan status menjadi `Realtime LIVE`.
5. Pastikan listener > 0.
6. Reload browser dan pastikan tidak perlu lagi membuka menu Firebase Production.
7. Uji dua perangkat.
