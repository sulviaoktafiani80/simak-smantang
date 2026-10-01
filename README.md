# SIMAK SMANTANG v55 — QR Security Hardening & Secure Check-In/Check-Out

## Perubahan keamanan utama
- QR legacy (`SMANTANG|ID|NISN` dan `SMANTANG-PEGAWAI|...`) dinonaktifkan.
- Secure QR memakai token acak 256-bit.
- QR hanya memuat `SM55.<opaque-token>`; NISN/NIP tidak ada di payload.
- Firestore hanya menyimpan SHA-256 hash token, bukan token mentah.
- Token dapat dicabut dan diregenerasi.
- Token memiliki masa berlaku.
- Regenerasi otomatis mencabut token lama.
- Check-in/check-out memverifikasi token terhadap Firestore.
- Penulisan kehadiran memakai Firestore transaction dengan document ID deterministik.
- Scan ditolak jika token tidak dikenal, revoked, expired, salah tipe, atau QR legacy.
- Audit `QR_CHECKIN`, `QR_CHECKOUT`, `QR_SCAN_REJECTED`, `QR_ISSUE`, `QR_REGENERATE`, dan `QR_REVOKE`.

## Sangat penting: publish Rules v55
Setelah deploy `index.html`, buka:
Firebase Console → Firestore → Rules

Ganti seluruh rules lama dengan `firestore.rules` v55 lalu klik Publish.

## Penerbitan kartu baru
Login sebagai Kepala Sekolah atau Wakil Kurikulum:
1. Buka **Manajemen Token QR v55**.
2. Pilih Murid/Pegawai dan filter.
3. Tentukan masa berlaku (default 365 hari).
4. Klik **Terbitkan/Regenerasi Filter**.
5. Setelah selesai, klik **Cetak Secure QR Baru**.
6. Kartu QR lama v41/v42 tidak dapat digunakan lagi.

Token mentah hanya tersedia pada sesi penerbitan dan tidak disimpan di Firestore. Jika perlu cetak ulang di lain waktu, regenerasi token; kartu lama otomatis menjadi tidak valid.

## Check-In / Check-Out
Gunakan menu **Secure Check-in / Check-out QR**. Scanner:
- membaca token;
- menghitung SHA-256;
- mencari `qrTokens/{hash}`;
- memverifikasi active/expiry/type;
- menulis attendance melalui transaksi Firestore;
- memperbarui statistik penggunaan token;
- menulis audit log.

## Koleksi Firestore baru
- `qrAssignments`
- `qrTokens`

## Rollout yang disarankan
Terbitkan kartu per kelas agar distribusi dapat dikontrol. Setelah kartu baru dibagikan, musnahkan/arsipkan kartu QR lama agar tidak membingungkan pengguna.
