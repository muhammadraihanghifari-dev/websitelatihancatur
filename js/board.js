/*
 * Engine papan catur ringan.
 * Merender papan 8x8 dari string FEN dan menampilkan highlight langkah.
 * Tidak memerlukan library eksternal.
 */

const PIECE_UNICODE = {
  K: "\u2654", // ♔
  Q: "\u2655", // ♕
  R: "\u2656", // ♖
  B: "\u2657", // ♗
  N: "\u2658", // ♘
  P: "\u2659", // ♙
  k: "\u265A", // ♚
  q: "\u265B", // ♛
  r: "\u265C", // ♜
  b: "\u265D", // ♝
  n: "\u265E", // ♞
  p: "\u265F", // ♟
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

/* Ubah bagian penempatan bidak pada FEN menjadi matriks 8x8 [rank][file]. */
function fenToBoard(fen) {
  const placement = fen.split(" ")[0];
  const rows = placement.split("/");
  const board = [];
  for (const row of rows) {
    const rank = [];
    for (const ch of row) {
      if (/\d/.test(ch)) {
        const empty = parseInt(ch, 10);
        for (let i = 0; i < empty; i++) rank.push(null);
      } else {
        rank.push(ch);
      }
    }
    board.push(rank);
  }
  return board; // board[0] = rank 8, board[7] = rank 1
}

/* Konversi koordinat aljabar (mis. "e4") ke indeks [rank][file] matriks board. */
function squareToIndex(square) {
  const file = FILES.indexOf(square[0]);
  const rankNum = parseInt(square[1], 10); // 1..8
  const rankIdx = 8 - rankNum; // rank 8 -> 0
  return { rankIdx, fileIdx: file };
}

class ChessBoard {
  /**
   * @param {HTMLElement} container elemen tempat papan dirender
   */
  constructor(container) {
    this.container = container;
    this.flipped = false; // false = perspektif Putih
    this.lastMove = null; // { from, to }
    this.currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    this.build();
  }

  build() {
    this.container.innerHTML = "";
    this.container.classList.add("chessboard");

    // Wrapper agar koordinat bisa menempel di tepi.
    this.squares = {}; // key "e4" -> element
    const frag = document.createDocumentFragment();

    const ranks = this.flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
    const files = this.flipped ? ["h", "g", "f", "e", "d", "c", "b", "a"] : FILES;

    for (const rank of ranks) {
      for (const file of files) {
        const sq = document.createElement("div");
        const fileIdx = FILES.indexOf(file);
        const isLight = (fileIdx + rank) % 2 === 0;
        sq.className = "square " + (isLight ? "light" : "dark");
        sq.dataset.square = file + rank;

        // Koordinat tepi (file di baris bawah, rank di kolom kiri).
        if (file === files[0]) {
          const rl = document.createElement("span");
          rl.className = "coord rank-coord";
          rl.textContent = rank;
          sq.appendChild(rl);
        }
        if (rank === ranks[ranks.length - 1]) {
          const fl = document.createElement("span");
          fl.className = "coord file-coord";
          fl.textContent = file;
          sq.appendChild(fl);
        }

        const piece = document.createElement("span");
        piece.className = "piece";
        sq.appendChild(piece);

        this.squares[file + rank] = sq;
        frag.appendChild(sq);
      }
    }
    this.container.appendChild(frag);
    this.render(this.currentFen, this.lastMove);
  }

  /** Render posisi dari FEN, opsional highlight langkah terakhir. */
  render(fen, move) {
    this.currentFen = fen;
    this.lastMove = move || null;
    const board = fenToBoard(fen);

    // Bersihkan highlight.
    for (const key in this.squares) {
      this.squares[key].classList.remove("move-from", "move-to");
    }

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const rankNum = 8 - r;
        const square = FILES[f] + rankNum;
        const el = this.squares[square];
        if (!el) continue;
        const pieceEl = el.querySelector(".piece");
        const code = board[r][f];
        if (code) {
          pieceEl.textContent = PIECE_UNICODE[code];
          pieceEl.classList.toggle("white-piece", code === code.toUpperCase());
          pieceEl.classList.toggle("black-piece", code === code.toLowerCase());
          // Animasi muncul lembut.
          pieceEl.classList.remove("pop");
          void pieceEl.offsetWidth; // reflow untuk restart animasi
          if (this.lastMove && square === this.lastMove.to) {
            pieceEl.classList.add("pop");
          }
        } else {
          pieceEl.textContent = "";
          pieceEl.className = "piece";
        }
      }
    }

    if (this.lastMove) {
      const fromEl = this.squares[this.lastMove.from];
      const toEl = this.squares[this.lastMove.to];
      if (fromEl) fromEl.classList.add("move-from");
      if (toEl) toEl.classList.add("move-to");
    }
  }

  flip() {
    this.flipped = !this.flipped;
    this.build();
  }

  reset(fen) {
    this.render(
      fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      null
    );
  }
}
