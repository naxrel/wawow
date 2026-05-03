import fs from "fs";
import path from "path";
import RootClient from "../components/RootClient";

export default function Home() {
  // 1. Tentukan lokasi folder foto
  const photosDirectory = path.join(process.cwd(), "public/photos");

  let photoFiles: string[] = [];

  try {
    // 2. Baca semua file di dalam folder tersebut
    const files = fs.readdirSync(photosDirectory);

    // 3. Filter agar hanya mengambil file gambar saja
    photoFiles = files.filter((file) =>
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );
  } catch {
    console.error("Folder public/photos belum dibuat atau kosong.");
  }

  // 4. Kirim daftar nama foto ke RootClient (yang mengelola state halaman)
  return <RootClient photos={photoFiles} />;
}