# Bright Scholarship Memories

Website dokumentasi komunitas penerima Bright Scholarship (YBM BRILiaN). **Bukan website resmi yayasan.** HTML, CSS, dan JavaScript murni, tanpa backend.

## Jalankan di Visual Studio Code
Browser memblokir `fetch()` dari file lokal, jadi gunakan server statis: pasang ekstensi **Live Server**, klik kanan `index.html`, pilih **Open with Live Server**.

## Publikasi ke GitHub Pages
1. Buat repository publik bernama `bright-scholarship-memories` di github.com (tanpa README bawaan).
2. Di folder proyek, jalankan:
   ```
   git init
   git add .
   git commit -m "Versi pertama"
   git branch -M main
   git remote add origin https://github.com/USERNAME/bright-scholarship-memories.git
   git push -u origin main
   ```
   (atau seret folder ke GitHub Desktop, lalu Publish repository.)
3. Buka **Settings → Pages → Build and deployment → Source: GitHub Actions**. Workflow `.github/workflows/pages.yml` akan men-deploy otomatis.
4. Tunggu di tab **Actions** sampai hijau. Alamat: `https://USERNAME.github.io/bright-scholarship-memories/`.

## Memperbarui konten
- **Anggota**: tambah objek di `data/members.json`, foto di `assets/images/members/`.
- **Foto galeri**: tambah objek di `data/gallery.json` (`category`: Kebersamaan, Kegiatan, Pendidikan, Pengabdian Masyarakat, Momen Spesial; `size`: `tall`, `wide`, atau kosong). Kompres foto (maks ~300 KB, lebar ~1600 px).
- **Kegiatan**: `data/activities.json`.
- **Foto utama**: simpan `assets/images/hero.jpg`, lalu ganti `hero.svg` di `index.html`.
- **Media sosial**: isi `SOCIAL` di `assets/js/main.js`.
- **Cerita**: edit `stories.html`.
Lalu `git add . && git commit -m "Update" && git push`.

## Sebelum dipublikasikan
- Semua data bertanda *placeholder* harus diganti atau dihapus.
- Minta izin tiap anggota untuk foto, nama, dan cerita. Jangan tulis data pribadi sensitif.
- Jangan pakai logo resmi yayasan tanpa izin. `logo.svg` hanya ikon sementara.
- Untuk Open Graph dan sitemap, ubah `og:image` menjadi URL penuh dan buat `sitemap.xml` setelah alamat final diketahui.
- Form kontak sengaja tidak dibuat karena belum ada layanan yang terhubung.
- Jika nama repo diganti, ubah path `/bright-scholarship-memories/` di `404.html`.
