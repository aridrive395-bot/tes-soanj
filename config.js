/* =====================================================
   KEDAI KENANGAN — SEMUA ISI DIEDIT DI SINI SAJA
   Ganti teks, foto (assets/images), musik (assets/music)
   ===================================================== */
const CONFIG = {
  judul: "Kedai Kenangan",
  penerima: "Nayla",
  pengirim: "Raka",
  tanggalUtama: "14 Feb 2027",
  musik: "assets/music/lagu.mp3",
  // Warna tema (boleh diganti satu per satu)
  tema: { bg: "#FFF3E0", ink: "#3A2530", pink: "#FF5C77", butter: "#FFD45E", mint: "#A6E8CE", sky: "#BFE3FF" },
  dekor: ["🍓", "🧸", "☁️", "🌷", "🍰", "✨"],

  tiket: { atas: "TIKET MASUK • EDISI SPESIAL", petunjuk: "psst… ada kejutan di balik tiket ini 🎟️" },

  cerita: [
    { dari: "aku", teks: "Hai {penerima}! Selamat datang di kedai kecil buatanku 🍓" },
    { dari: "aku", teks: "Kedai ini cuma punya satu menu: semua hal yang bikin aku senyum sejak ketemu kamu." },
    { dari: "kamu", teks: "Hah? Menunya apa aja? 👀" },
    { dari: "aku", teks: "Tawamu yang kerasan di tempat sepi. Caramu salah baca peta tapi tetap pede." },
    { dari: "aku", teks: "Dan cara kamu bilang “bentar lagi” padahal masih setengah jam lagi 😂" },
    { dari: "kamu", teks: "Ih, kok dibongkar semua 🙈" },
    { dari: "aku", teks: "Karena ternyata hal-hal kecil itulah yang paling kuingat. Yuk, jalan-jalan dulu ke dalam ✨" },
  ],

  foto: [
    { src: "assets/images/foto1.jpg", judul: "Hari pertama", tgl: "12 Mar 2026", teks: "Aku gugup sepanjang jalan, tapi kamu bikin semuanya terasa mudah." },
    { src: "assets/images/foto2.jpg", judul: "Makan malam", tgl: "2 Jun 2026", teks: "Kita ngobrol sampai pelayannya mulai menyapu lantai." },
    { src: "assets/images/foto3.jpg", judul: "Hujan deras", tgl: "20 Agu 2026", teks: "Berteduh berjam-jam. Aku diam-diam berdoa hujannya lanjut." },
    { src: "assets/images/foto4.jpg", judul: "Foto buram", tgl: "5 Okt 2026", teks: "Burem, miring, tapi ini favoritku karena kamu lagi ketawa." },
    { src: "assets/images/foto5.jpg", judul: "Pulang larut", tgl: "31 Des 2026", teks: "Satu lagu, dua earphone, jalanan sepi." },
    { src: "assets/images/foto6.jpg", judul: "Hari ini", tgl: "14 Feb 2027", teks: "Dan kita masih di sini. Itu saja sudah cukup bagiku." },
  ],

  game: {
    judul: "Tangkap Hati-nya!", petunjuk: "Ketuk hati yang jatuh. Yang emas bernilai 2!",
    target: 12, ikon: ["❤️", "🩷", "💖", "🍓"], menang: "Yeay! Hatimu penuh sekarang 💗"
  },

  kuis: {
    judul: "Kuis Kecil Kita",
    soal: [
      { q: "Di mana kita pertama kali ngobrol lama?", o: ["Kafe dekat kampus", "Halte bus", "Toko buku", "Pasar malam"], b: 0, hint: "Ada kopi susu yang tumpah di sana…" },
      { q: "Makanan yang selalu aku curi dari piringmu?", o: ["Kentang goreng", "Nasi goreng", "Es krim", "Kerupuk"], b: 0, hint: "Renyah dan gurih ✨" },
      { q: "Kata apa yang paling sering aku bilang ke kamu?", o: ["“Hati-hati ya”", "“Lapar nggak?”", "“Kangen”", "“Ayo”"], b: 2, hint: "Tiga huruf lebih… eh, enam huruf." },
    ],
    selesai: "Nilai sempurna! Kamu memang paling hafal soal kita 🏆"
  },

  rahasia: {
    judul: "Tiga Kotak Rahasia", petunjuk: "Buka satu per satu ya 🎁",
    kotak: [
      { ikon: "🎁", label: "Buka kalau lagi capek", isi: "Kamu sudah melakukan banyak hal hebat hari ini. Tarik napas, minum air, dan ingat: ada aku yang bangga sama kamu." },
      { ikon: "🧸", label: "Buka kalau lagi sedih", isi: "Boleh sedih, boleh nangis. Nanti kita beli es krim dan aku dengerin semua ceritamu, tanpa dipotong." },
      { ikon: "💌", label: "Buka kalau lagi kangen", isi: "Aku juga. Tutup mata sebentar, bayangin aku lagi di sebelahmu pegang tanganmu. Nah, itu aku 🫶" },
    ]
  },

  surat: {
    salam: "Untuk {penerima}, yang selalu kupanggil rumah,",
    paragraf: [
      "Aku bukan orang yang pandai merangkai kata. Tapi hari ini aku ingin mencoba, karena kamu pantas mendapat lebih dari sekadar “selamat ya”.",
      "Terima kasih sudah sabar menghadapi aku yang suka telat balas chat, dan aku yang kadang diam saat harusnya bicara. Kamu tetap tinggal, dan itu berarti segalanya.",
      "Semoga tahun ini kita punya lebih banyak tawa, lebih banyak jalan-jalan tanpa tujuan, dan lebih banyak alasan untuk saling bilang “makasih sudah ada”.",
    ],
    penutup: "Dengan seluruh sayang,",
    ttdPetunjuk: "Tanda tangan di sini ya, lalu kita simpan di hati ✍️"
  },

  penutup: {
    judul: "Selamat, {penerima}! 🎉",
    pesan: "Terima kasih sudah mampir ke kedai kecilku. Pintunya selalu terbuka untukmu — dari {pengirim}, dengan cinta.",
    tombolUlang: "Ulangi dari awal ↺", tombolBagi: "Bagikan 💌"
  },

  adegan: ["Tiket", "Obrolan", "Kenangan", "Game", "Kuis", "Rahasia", "Surat", "Akhir"]
};
