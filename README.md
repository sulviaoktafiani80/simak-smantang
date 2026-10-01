# SIMAK SMANTANG v57.3 — Realtime Fallback & Account Data Recovery Fix

Perbaikan utama:
- Manajemen Akun melakukan initial load `users.get()` sebelum mengandalkan realtime.
- Setelah data awal valid tampil, `onSnapshot()` mengambil alih.
- Snapshot kosong/transien tidak lagi mengosongkan tabel.
- Jika realtime gagal, data valid terakhir tetap terlihat.
- Listener mencoba tersambung ulang otomatis.
- Tombol **Recovery Load** memaksa pembacaan ulang Firestore.
- Panel status menampilkan sumber data akun dan error yang sebenarnya.
- Fallback connectivity check memastikan Firestore dibaca sebelum listener dipasang ulang.

Target setelah deploy:
- Total akun kembali 166.
- Sumber awal: `Initial Load / Firestore get()`.
- Setelah listener hidup: `Realtime Firestore`.
- Realtime gagal tidak boleh mengubah total akun menjadi 0.
