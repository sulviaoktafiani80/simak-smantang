# SIMAK SMANTANG v53 — Bulk Account Provisioning

Paket ini menyiapkan provisioning massal Firebase Authentication + Firestore untuk:
- 20 pegawai;
- 146 murid;
- total 166 profil.

Dua akun yang sudah ada (Kepala Sekolah dan Wakil Kurikulum) **tidak dihapus**. Script akan menemukan akun berdasarkan email dan mempertahankan password lama, kecuali `RESET_EXISTING_PASSWORDS=true`.

## Strategi Login Murid

Data SIMAK belum memiliki email nyata murid. Karena itu akun Auth murid menggunakan alias internal:

`NISN@murid.simak-smantang.invalid`

SIMAK v53 mengubah input NISN 10 digit menjadi alias tersebut secara otomatis. Murid cukup login menggunakan:
- NISN
- password sementara

Alias `.invalid` sengaja tidak dapat menerima email. Artinya reset password mandiri via email belum tersedia untuk murid. Reset murid dilakukan admin sampai sekolah menetapkan akun email resmi.

## Orang Tua/Wali

Belum diprovisioning massal karena data sumber saat ini tidak menyediakan email/akun orang tua yang valid dan unik.

## Cara Menjalankan

### 1. Service Account
Firebase Console → Project settings → Service accounts → Generate new private key.

Simpan hasilnya sebagai:

`serviceAccountKey.json`

di folder ini.

**Jangan upload file tersebut ke GitHub.**

### 2. Install Node.js
Gunakan Node.js 20+.

### 3. Install dependency

```bash
npm install
```

### 4. Jalankan provisioning

```bash
npm run provision
```

### 5. Hasil

Folder `output/` akan berisi:
- `provisioning-results.csv`
- `temporary-credentials.csv`

`temporary-credentials.csv` berisi password sementara akun baru. Simpan secara aman dan jangan commit ke GitHub.

## Role

- 1 Kepala Sekolah → `Kepala Sekolah`
- 1 Wakil Kurikulum → `Wakil Kurikulum`
- 13 guru/waka lain/kepala lab/kepala perpustakaan/BK → `Guru`
- 5 Kepala TU/TAS/Tendik → `Tenaga Kependidikan`
- 146 murid → `Murid`

## Catatan Password

Script menghasilkan password acak kuat untuk akun baru. Password akun yang sudah ada tidak diubah secara default.

Untuk mereset juga password akun yang sudah ada:

Windows PowerShell:
```powershell
$env:RESET_EXISTING_PASSWORDS="true"
npm run provision
```

Gunakan opsi ini hanya jika memang diperlukan.

## Setelah Provisioning

1. Deploy `index.html` v53 ke GitHub/Vercel.
2. Uji login satu akun Guru.
3. Uji satu akun Tendik.
4. Uji murid dengan NISN + password dari credentials CSV.
5. Setelah lolos, distribusikan kredensial secara individual.
