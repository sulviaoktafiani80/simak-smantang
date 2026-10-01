# SIMAK SMANTANG v61 — PWA, Mobile Polish & User Onboarding

v61 dibangun di atas v60 yang sudah stabil. Core Firebase, realtime, security, dan disaster recovery tidak diubah.

## PWA
- `manifest.webmanifest`
- `service-worker.js`
- icon 192, 512, Apple Touch Icon
- mode `standalone`
- tombol `Pasang App` ketika browser mendukung
- offline fallback tanpa mencoba memalsukan data cloud
- navigasi selalu network-first agar versi Production terbaru tidak tertahan cache lama

## Mobile Polish
- bottom navigation: Beranda, Jadwal, Notifikasi, Menu
- safe-area untuk HP
- touch target minimum lebih nyaman
- konten utama diberi ruang dari bottom navigation
- input mobile tidak mudah memicu zoom kecil pada browser

## User Onboarding
Tampil sekali per role/browser:
1. pengenalan sesuai role;
2. cara navigasi;
3. realtime, WIB, dan pemasangan PWA.

Pengguna dapat membuka ulang dari tombol `Panduan` di bagian bawah sidebar.

## Deploy v61
Untuk PWA, upload bukan hanya `index.html`. Upload ke repository:
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `offline.html`
- folder `icons/`
- `vercel.json`

Setelah Vercel Ready:
1. Ctrl+F5.
2. Chrome/Edge: lihat tombol `Pasang App` atau icon Install di address bar.
3. HP Android Chrome: menu browser → Install app / Tambahkan ke layar utama.
4. iPhone Safari: Share → Add to Home Screen.

Firestore Rules tidak perlu diubah khusus v61.
