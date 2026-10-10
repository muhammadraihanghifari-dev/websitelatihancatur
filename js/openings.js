/*
 * Data pembukaan catur (chess openings).
 * Setiap langkah memiliki FEN agar papan dapat dirender tanpa engine catur eksternal.
 * Penjelasan tersedia dalam 3 level: pemula (rinci), menengah (ringkas), jago (gerakan saja).
 */

const OPENINGS = {
  ruy_lopez: {
    id: "ruy_lopez",
    name: "Ruy Lopez (Spanish Opening)",
    icon: "♞",
    eco: "C60–C99",
    short: "Pembukaan klasik yang menekan kuda c6 dan mengincar pusat.",
    moves: [
      {
        san: "1. e4",
        side: "white",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        from: "e2",
        to: "e4",
        beginner:
          "Putih membuka dengan e4, mendorong pion raja dua langkah. Tujuannya menguasai kotak pusat (d5 & f5) dan membuka jalan untuk gajah serta menteri. Ini salah satu langkah pembuka terbaik untuk pemula.",
        intermediate: "e4: kuasai pusat, buka diagonal gajah f1 dan menteri.",
        advanced: "1.e4",
      },
      {
        san: "1... e5",
        side: "black",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        from: "e7",
        to: "e5",
        beginner:
          "Hitam menjawab simetris dengan e5, ikut memperebutkan pusat dan menghalangi Putih mendorong d4 dengan mudah. Posisi menjadi terbuka dan seimbang.",
        intermediate: "e5: lawan pusat secara simetris, posisi terbuka.",
        advanced: "1...e5",
      },
      {
        san: "2. Nf3",
        side: "white",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        from: "g1",
        to: "f3",
        beginner:
          "Kuda ke f3 mengembangkan bidak sambil langsung mengancam pion e5 Hitam. Prinsip penting: kembangkan kuda sebelum gajah, dan arahkan ke pusat.",
        intermediate: "Nf3: kembangkan kuda, serang pion e5.",
        advanced: "2.Nf3",
      },
      {
        san: "2... Nc6",
        side: "black",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        from: "b8",
        to: "c6",
        beginner:
          "Hitam membela pion e5 dengan kuda c6. Bidak dikembangkan sambil menjaga pusat. Ini bela diri alami yang paling umum.",
        intermediate: "Nc6: bela pion e5 sambil mengembangkan kuda.",
        advanced: "2...Nc6",
      },
      {
        san: "3. Bb5",
        side: "white",
        fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
        from: "f1",
        to: "b5",
        beginner:
          "Inilah ciri khas Ruy Lopez: gajah ke b5 menekan kuda c6 yang membela e5. Idenya adalah menambah tekanan ke pusat Hitam secara tidak langsung. Jika kelak gajah menukar kuda c6, struktur pion Hitam bisa melemah.",
        intermediate: "Bb5: pin tak langsung ke pembela e5, ciri khas Ruy Lopez.",
        advanced: "3.Bb5",
      },
      {
        san: "3... a6",
        side: "black",
        fen: "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
        from: "a7",
        to: "a6",
        beginner:
          "Hitam memainkan a6 (Morphy Defense), menantang gajah: mau mundur atau menukar? Ini memberi Hitam fleksibilitas dan menjadi variasi paling populer di dunia.",
        intermediate: "a6: tantang gajah (Morphy Defense), variasi utama.",
        advanced: "3...a6",
      },
      {
        san: "4. Ba4",
        side: "white",
        fen: "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4",
        from: "b5",
        to: "a4",
        beginner:
          "Gajah mundur ke a4, tetap menjaga tekanan pada diagonal menuju c6 sambil menghindari pertukaran. Putih mempertahankan ketegangan dan rencana rokade pendek berikutnya.",
        intermediate: "Ba4: jaga gajah di diagonal, pertahankan tekanan.",
        advanced: "4.Ba4",
      },
      {
        san: "4... Nf6",
        side: "black",
        fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
        from: "g8",
        to: "f6",
        beginner:
          "Hitam mengembangkan kuda f6 yang menyerang pion e4. Kedua pihak hampir siap rokade. Posisi khas Ruy Lopez: ketegangan panjang di pusat dengan rencana strategis mendalam.",
        intermediate: "Nf6: serang e4, siapkan rokade.",
        advanced: "4...Nf6",
      },
    ],
    analysis:
      "Ruy Lopez adalah pembukaan strategis jangka panjang. Putih tidak langsung menyerang, tetapi menumpuk tekanan halus pada pusat lewat gajah b5. Rencana khas Putih: rokade pendek, dorong c3 dan d4 untuk membangun pusat besar, lalu manuver kuda b1-d2-f1-g3. Hitam punya banyak sistem solid (Morphy, Berlin, Marshall). Cocok untuk pemain yang suka permainan posisional dan sabar.",
    plans: [
      "Rokade pendek lebih dulu untuk mengamankan raja.",
      "Siapkan c3 lalu d4 membangun pusat pion yang kuat.",
      "Manuver kuda b1→d2→f1→g3 menuju kingside.",
      "Tekan sisi raja Hitam setelah pusat stabil.",
    ],
  },

  italian_game: {
    id: "italian_game",
    name: "Italian Game (Giuoco Piano)",
    icon: "♗",
    eco: "C50–C54",
    short: "Pembukaan cepat berkembang yang mengarahkan gajah ke f7 lemah.",
    moves: [
      {
        san: "1. e4",
        side: "white",
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        from: "e2",
        to: "e4",
        beginner:
          "Sama seperti banyak pembukaan terbuka, Putih mulai dengan e4 untuk menguasai pusat dan membuka jalur gajah f1 dan menteri.",
        intermediate: "e4: kuasai pusat, buka diagonal gajah.",
        advanced: "1.e4",
      },
      {
        san: "1... e5",
        side: "black",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        from: "e7",
        to: "e5",
        beginner:
          "Hitam membalas e5, menjaga keseimbangan di pusat dan membuka diagonal gajahnya sendiri.",
        intermediate: "e5: tandingi pusat secara simetris.",
        advanced: "1...e5",
      },
      {
        san: "2. Nf3",
        side: "white",
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
        from: "g1",
        to: "f3",
        beginner:
          "Kuda f3 mengembangkan bidak dan menyerang pion e5. Langkah alami sesuai prinsip pembukaan.",
        intermediate: "Nf3: kembangkan kuda, serang e5.",
        advanced: "2.Nf3",
      },
      {
        san: "2... Nc6",
        side: "black",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
        from: "b8",
        to: "c6",
        beginner:
          "Hitam membela e5 dengan kuda c6, mengembangkan bidak sambil menjaga pusat.",
        intermediate: "Nc6: bela e5 sambil berkembang.",
        advanced: "2...Nc6",
      },
      {
        san: "3. Bc4",
        side: "white",
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
        from: "f1",
        to: "c4",
        beginner:
          "Inilah tanda Italian Game: gajah ke c4 membidik kotak f7, titik terlemah di kubu Hitam (hanya dijaga raja). Gajah ini bersiap mendukung serangan cepat ke sisi raja.",
        intermediate: "Bc4: incar titik lemah f7, ciri khas Italian.",
        advanced: "3.Bc4",
      },
      {
        san: "3... Bc5",
        side: "black",
        fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
        from: "f8",
        to: "c5",
        beginner:
          "Hitam meniru dengan gajah c5 (varian Giuoco Piano), juga membidik f2 di kubu Putih. Posisi simetris dan tenang; nama Giuoco Piano berarti 'permainan tenang'.",
        intermediate: "Bc5: simetris, incar f2 (Giuoco Piano).",
        advanced: "3...Bc5",
      },
      {
        san: "4. c3",
        side: "white",
        fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
        from: "c2",
        to: "c3",
        beginner:
          "Putih bermain c3 untuk menyiapkan d4, hendak membangun pusat pion yang besar dan mengusir gajah c5. Ini rencana strategis utama di Italian modern.",
        intermediate: "c3: siapkan d4 untuk pusat besar.",
        advanced: "4.c3",
      },
      {
        san: "4... Nf6",
        side: "black",
        fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
        from: "g8",
        to: "f6",
        beginner:
          "Hitam mengembangkan kuda f6, menyerang e4 dan siap rokade. Kedua pihak berkembang harmonis menuju permainan tengah yang kaya.",
        intermediate: "Nf6: serang e4, siap rokade.",
        advanced: "4...Nf6",
      },
    ],
    analysis:
      "Italian Game adalah pembukaan ramah pemula: bidak berkembang cepat, rencana jelas, dan raja segera aman lewat rokade. Fokus utamanya adalah tekanan gajah c4 terhadap f7. Dalam gaya modern (c3-d4), Putih membangun pusat besar. Hindari serangan terburu-buru yang belum didukung; prioritaskan pengembangan dan rokade. Sangat baik untuk melatih prinsip dasar pembukaan.",
    plans: [
      "Kembangkan gajah ke c4 membidik f7.",
      "Rokade pendek secepatnya untuk mengamankan raja.",
      "Mainkan c3 lalu d4 untuk pusat yang kuat.",
      "Cari serangan di sisi raja setelah berkembang penuh.",
    ],
  },

  queens_gambit: {
    id: "queens_gambit",
    name: "Queen's Gambit",
    icon: "♕",
    eco: "D06–D69",
    short: "Pengorbanan pion sisi menteri untuk mendominasi pusat.",
    moves: [
      {
        san: "1. d4",
        side: "white",
        fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
        from: "d2",
        to: "d4",
        beginner:
          "Putih membuka dengan d4, pembukaan 'tertutup' yang menekankan kontrol pusat secara perlahan dan permainan posisional. Berbeda dari e4 yang lebih terbuka dan taktis.",
        intermediate: "d4: pembukaan tertutup, kontrol pusat posisional.",
        advanced: "1.d4",
      },
      {
        san: "1... d5",
        side: "black",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
        from: "d7",
        to: "d5",
        beginner:
          "Hitam menjawab d5, menegakkan pion di pusat dan menolak dominasi Putih. Posisi simetris dan solid.",
        intermediate: "d5: tegakkan pusat, posisi simetris.",
        advanced: "1...d5",
      },
      {
        san: "2. c4",
        side: "white",
        fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
        from: "c2",
        to: "c4",
        beginner:
          "Inilah 'gambit': Putih menawarkan pion c4. Jika Hitam mengambil (dxc4), Putih tidak benar-benar kehilangan pion secara permanen, tetapi mendapat pusat dan jalur terbuka. Tujuannya mengalihkan pion d5 Hitam agar pusat Putih mendominasi.",
        intermediate: "c4: tawarkan pion untuk alihkan pusat d5 Hitam.",
        advanced: "2.c4",
      },
      {
        san: "2... e6",
        side: "black",
        fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
        from: "e7",
        to: "e6",
        beginner:
          "Hitam memilih menolak gambit dengan e6 (Queen's Gambit Declined), memperkuat d5. Harganya: gajah c8 jadi agak terkurung, tapi posisinya sangat solid.",
        intermediate: "e6: tolak gambit (QGD), perkuat d5.",
        advanced: "2...e6",
      },
      {
        san: "3. Nc3",
        side: "white",
        fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
        from: "b1",
        to: "c3",
        beginner:
          "Kuda c3 menambah tekanan ke pion d5 Hitam. Putih menumpuk serangan di pusat sambil mengembangkan bidak.",
        intermediate: "Nc3: tambah tekanan ke d5.",
        advanced: "3.Nc3",
      },
      {
        san: "3... Nf6",
        side: "black",
        fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
        from: "g8",
        to: "f6",
        beginner:
          "Hitam mengembangkan kuda f6 yang ikut membela d5 dan mengincar pusat. Bidak berkembang dengan harmonis.",
        intermediate: "Nf6: bela d5, kembangkan bidak.",
        advanced: "3...Nf6",
      },
      {
        san: "4. Bg5",
        side: "white",
        fen: "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4",
        from: "c1",
        to: "g5",
        beginner:
          "Gajah g5 menekan kuda f6 (pin terhadap menteri d8). Dengan membebani pembela d5, Putih menambah tekanan di pusat. Ini sistem klasik Queen's Gambit Declined.",
        intermediate: "Bg5: pin kuda f6, tekan pembela d5.",
        advanced: "4.Bg5",
      },
      {
        san: "4... Be7",
        side: "black",
        fen: "rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 4 5",
        from: "f8",
        to: "e7",
        beginner:
          "Hitam mengembangkan gajah e7 untuk melepas pin dan bersiap rokade. Posisi solid, khas QGD, dengan rencana jangka panjang membebaskan gajah c8.",
        intermediate: "Be7: lepas pin, siap rokade.",
        advanced: "4...Be7",
      },
    ],
    analysis:
      "Queen's Gambit adalah salah satu pembukaan paling terhormat dalam sejarah catur. Meski disebut 'gambit', ini bukan pengorbanan sejati—Putih biasanya bisa merebut kembali pion c4. Tema utamanya adalah tekanan pusat dan permainan posisional yang perlahan. Dalam Queen's Gambit Declined, Hitam membangun benteng solid dengan harga gajah c8 yang pasif. Cocok untuk pemain yang ingin belajar strategi pusat dan permainan sabar ala posisional.",
    plans: [
      "Tekan pion d5 lawan dengan c4 dan Nc3.",
      "Kembangkan gajah ke g5 untuk mem-pin kuda f6.",
      "Rokade pendek dan tempatkan benteng di kolom c.",
      "Manfaatkan minoritas pion untuk menyerang struktur Hitam.",
    ],
  },
};

/* Soal tantangan per opening. Jawaban dicek secara lokal (template, tanpa AI). */
const CHALLENGES = {
  ruy_lopez: [
    {
      q: "Langkah apa yang menjadi ciri khas Ruy Lopez pada langkah ke-3 Putih?",
      options: ["Bc4", "Bb5", "d4", "Nc3"],
      answer: 1,
      explain:
        "Bb5 adalah tanda Ruy Lopez — gajah menekan kuda c6 yang membela pion e5.",
    },
    {
      q: "Setelah 3...a6, ke mana gajah Putih biasanya mundur dalam variasi utama?",
      options: ["Ba4", "Bxc6", "Be2", "Bc4"],
      answer: 0,
      explain:
        "Ba4 mempertahankan gajah di diagonal sambil menghindari pertukaran langsung.",
    },
    {
      q: "Apa rencana pusat khas Putih di Ruy Lopez?",
      options: [
        "Dorong f4 secepatnya",
        "Siapkan c3 lalu d4",
        "Tukar semua bidak minor",
        "Mainkan h4-h5 menyerang",
      ],
      answer: 1,
      explain:
        "c3 menyiapkan d4 untuk membangun pusat pion yang kuat — rencana klasik Ruy Lopez.",
    },
  ],
  italian_game: [
    {
      q: "Kotak lemah mana yang diincar gajah c4 dalam Italian Game?",
      options: ["d5", "f7", "h7", "b7"],
      answer: 1,
      explain:
        "f7 hanya dijaga oleh raja Hitam, sehingga menjadi target alami gajah c4.",
    },
    {
      q: "Apa arti 'Giuoco Piano'?",
      options: ["Serangan cepat", "Permainan tenang", "Pengorbanan menteri", "Pertahanan India"],
      answer: 1,
      explain:
        "Giuoco Piano berarti 'permainan tenang', merujuk pada sifat posisional varian 3...Bc5.",
    },
    {
      q: "Langkah mana yang menyiapkan d4 untuk pusat besar di Italian modern?",
      options: ["b3", "c3", "a4", "g3"],
      answer: 1,
      explain: "c3 menopang dorongan d4 agar Putih membangun pusat pion yang kuat.",
    },
  ],
  queens_gambit: [
    {
      q: "Langkah mana yang menawarkan 'gambit' dalam Queen's Gambit?",
      options: ["c4", "e4", "Nf3", "Bg5"],
      answer: 0,
      explain:
        "c4 menawarkan pion sisi menteri untuk mengalihkan pion d5 Hitam dari pusat.",
    },
    {
      q: "Apa nama varian saat Hitam menjawab 2...e6 menolak gambit?",
      options: [
        "Queen's Gambit Accepted",
        "Queen's Gambit Declined",
        "Slav Defense",
        "King's Indian",
      ],
      answer: 1,
      explain: "2...e6 adalah Queen's Gambit Declined (QGD) — Hitam memperkuat d5.",
    },
    {
      q: "Apakah Queen's Gambit benar-benar mengorbankan pion secara permanen?",
      options: [
        "Ya, selalu kehilangan pion",
        "Tidak, Putih biasanya bisa merebutnya kembali",
        "Hanya di endgame",
        "Hanya jika Hitam rokade",
      ],
      answer: 1,
      explain:
        "Ini bukan gambit sejati; Putih umumnya dapat merebut kembali pion c4.",
    },
  ],
};
