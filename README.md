# SIMAK SMANTANG v57 — Realtime Sync & Multi-Device Engine

## Fitur utama
- Firestore `onSnapshot()` untuk sinkronisasi live.
- Listener otomatis sesuai role pengguna.
- Kepala Sekolah/Waka/Guru/Guru Piket/Tendik menerima koleksi kerja yang diizinkan.
- Murid/Orang Tua hanya menerima data publik dan data murid terkait.
- Status global: Realtime LIVE / Connecting / Offline / Error.
- Reconnect otomatis saat internet kembali.
- Listener otomatis di-unsubscribe saat logout/role berubah.
- Toast `Data diperbarui dari cloud` ketika perangkat lain melakukan perubahan.
- QR v55 yang dipindai di HP dapat memperbarui rekap pada perangkat lain tanpa reload.
- Deteksi potensi konflik perubahan berdekatan pada dokumen yang sama.
- Dashboard **Realtime & Multi-Device** untuk Kepala Sekolah/Wakil Kurikulum.
- Tombol sinkronisasi penuh manual tetap tersedia sebagai recovery.

## Firestore Rules
v57 tidak menambah koleksi data baru. `firestore.rules` disertakan agar repository tetap lengkap. Jika Rules v56 sudah aktif, rules v57 ini kompatibel dan tidak memerlukan perubahan struktur tambahan.

## Uji multi-device
1. Deploy `index.html` v57 ke GitHub/Vercel.
2. Ctrl+F5 pada dua perangkat.
3. Login Perangkat A dan B dengan akun berbeda.
4. Pastikan bar status menampilkan **Realtime LIVE**.
5. Pada A, ubah satu data non-kritis.
6. Pada B, data harus berubah tanpa reload.
7. Uji Secure QR v55: scan dari HP lalu lihat rekap kehadiran di laptop.
8. Putuskan internet salah satu perangkat; status menjadi **Offline**.
9. Sambungkan internet kembali; status akan kembali connecting/live.

## Catatan konflik
Firestore tetap menggunakan model last-write-wins untuk penulisan biasa. v57 menambahkan **peringatan konflik** ketika perubahan pada dokumen yang sama terjadi dalam jendela waktu berdekatan. Untuk transaksi kritis yang membutuhkan konsistensi kuat, gunakan transaction seperti modul Secure QR v55.
