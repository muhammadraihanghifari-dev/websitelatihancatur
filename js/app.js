/*
 * Logika utama Chess Opening Trainer.
 * Mengelola input (opening, level, tantangan), output (langkah, papan, analisis),
 * dan sinkronisasi papan dengan daftar notasi.
 */

(function () {
  "use strict";

  const START_FEN =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

  // State aplikasi.
  const state = {
    openingId: "ruy_lopez",
    level: "beginner",
    stepIndex: -1, // -1 = posisi awal, 0..n-1 = setelah langkah ke-(i+1)
    autoplay: false,
    autoplayTimer: null,
  };

  // Elemen DOM.
  const el = {};
  let board;

  function $(id) {
    return document.getElementById(id);
  }

  function cacheDom() {
    el.boardContainer = $("board");
    el.openingSelect = $("openingSelect");
    el.levelButtons = document.querySelectorAll("[data-level]");
    el.openingName = $("openingName");
    el.openingEco = $("openingEco");
    el.openingShort = $("openingShort");
    el.movesList = $("movesList");
    el.explanation = $("explanationBox");
    el.analysis = $("analysisBox");
    el.plansList = $("plansList");
    el.stepLabel = $("stepLabel");
    el.btnStart = $("btnStart");
    el.btnPrev = $("btnPrev");
    el.btnNext = $("btnNext");
    el.btnEnd = $("btnEnd");
    el.btnAuto = $("btnAuto");
    el.btnFlip = $("btnFlip");
    el.challengeArea = $("challengeArea");
    el.aiBox = $("aiAnswer");
    el.aiInput = $("aiInput");
    el.aiAsk = $("aiAsk");
  }

  function currentOpening() {
    return OPENINGS[state.openingId];
  }

  /* --- Rendering input / meta opening --- */
  function populateOpeningSelect() {
    el.openingSelect.innerHTML = "";
    Object.values(OPENINGS).forEach((op) => {
      const opt = document.createElement("option");
      opt.value = op.id;
      opt.textContent = op.icon + "  " + op.name;
      el.openingSelect.appendChild(opt);
    });
    el.openingSelect.value = state.openingId;
  }

  function renderMeta() {
    const op = currentOpening();
    el.openingName.textContent = op.name;
    el.openingEco.textContent = "ECO " + op.eco;
    el.openingShort.textContent = op.short;
  }

  /* --- Daftar langkah (notasi) --- */
  function renderMovesList() {
    const op = currentOpening();
    el.movesList.innerHTML = "";
    op.moves.forEach((mv, i) => {
      const li = document.createElement("button");
      li.type = "button";
      li.className = "move-chip";
      li.dataset.index = i;
      li.innerHTML =
        '<span class="move-dot ' +
        mv.side +
        '"></span>' +
        '<span class="move-san">' +
        mv.san +
        "</span>";
      li.addEventListener("click", () => goToStep(i));
      el.movesList.appendChild(li);
    });
    highlightActiveMove();
  }

  function highlightActiveMove() {
    const chips = el.movesList.querySelectorAll(".move-chip");
    chips.forEach((c) => {
      const idx = parseInt(c.dataset.index, 10);
      c.classList.toggle("active", idx === state.stepIndex);
      c.classList.toggle("played", idx < state.stepIndex);
    });
  }

  /* --- Penjelasan sesuai level & langkah aktif --- */
  function renderExplanation() {
    const op = currentOpening();
    if (state.stepIndex < 0) {
      el.explanation.innerHTML =
        '<p class="hint">Tekan <strong>Mulai</strong> atau <strong>▶</strong> untuk menelusuri langkah-langkah pembukaan. ' +
        "Penjelasan tiap langkah akan muncul di sini sesuai level yang kamu pilih.</p>";
      el.stepLabel.textContent = "Posisi awal";
      return;
    }
    const mv = op.moves[state.stepIndex];
    const levelText = mv[state.level];
    const levelBadge = {
      beginner: "Pemula · rinci",
      intermediate: "Menengah · ringkas",
      advanced: "Jago · gerakan saja",
    }[state.level];

    let html =
      '<div class="exp-head">' +
      '<span class="exp-move">' +
      mv.san +
      "</span>" +
      '<span class="exp-badge">' +
      levelBadge +
      "</span>" +
      "</div>";

    if (state.level === "advanced") {
      html += '<p class="exp-advanced">' + levelText + "</p>";
    } else {
      html += "<p>" + levelText + "</p>";
    }
    el.explanation.innerHTML = html;
    el.stepLabel.textContent =
      "Langkah " + (state.stepIndex + 1) + " dari " + op.moves.length;
  }

  function renderAnalysis() {
    const op = currentOpening();
    el.analysis.textContent = op.analysis;
    el.plansList.innerHTML = "";
    op.plans.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      el.plansList.appendChild(li);
    });
  }

  /* --- Navigasi langkah & sinkronisasi papan --- */
  function syncBoard() {
    const op = currentOpening();
    if (state.stepIndex < 0) {
      board.render(START_FEN, null);
    } else {
      const mv = op.moves[state.stepIndex];
      board.render(mv.fen, { from: mv.from, to: mv.to });
    }
    highlightActiveMove();
    renderExplanation();
    updateControls();
  }

  function goToStep(i) {
    const op = currentOpening();
    state.stepIndex = Math.max(-1, Math.min(i, op.moves.length - 1));
    syncBoard();
  }

  function next() {
    const op = currentOpening();
    if (state.stepIndex < op.moves.length - 1) {
      state.stepIndex++;
      syncBoard();
      return true;
    }
    return false;
  }

  function prev() {
    if (state.stepIndex > -1) {
      state.stepIndex--;
      syncBoard();
    }
  }

  function toStart() {
    state.stepIndex = -1;
    syncBoard();
  }

  function toEnd() {
    const op = currentOpening();
    state.stepIndex = op.moves.length - 1;
    syncBoard();
  }

  function toggleAutoplay() {
    if (state.autoplay) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  function startAutoplay() {
    const op = currentOpening();
    // Jika sudah di akhir, mulai lagi dari awal.
    if (state.stepIndex >= op.moves.length - 1) {
      toStart();
    }
    state.autoplay = true;
    el.btnAuto.classList.add("active");
    el.btnAuto.textContent = "⏸ Jeda";
    state.autoplayTimer = setInterval(() => {
      const moved = next();
      if (!moved) stopAutoplay();
    }, 1400);
  }

  function stopAutoplay() {
    state.autoplay = false;
    if (state.autoplayTimer) clearInterval(state.autoplayTimer);
    state.autoplayTimer = null;
    el.btnAuto.classList.remove("active");
    el.btnAuto.textContent = "▶ Putar otomatis";
  }

  function updateControls() {
    const op = currentOpening();
    el.btnStart.disabled = state.stepIndex <= -1;
    el.btnPrev.disabled = state.stepIndex <= -1;
    el.btnNext.disabled = state.stepIndex >= op.moves.length - 1;
    el.btnEnd.disabled = state.stepIndex >= op.moves.length - 1;
  }

  /* --- Tantangan (quiz) --- */
  function renderChallenge() {
    const list = CHALLENGES[state.openingId] || [];
    el.challengeArea.innerHTML = "";
    if (!list.length) {
      el.challengeArea.innerHTML = "<p>Belum ada soal untuk pembukaan ini.</p>";
      return;
    }

    list.forEach((item, qi) => {
      const card = document.createElement("div");
      card.className = "quiz-card";

      const q = document.createElement("p");
      q.className = "quiz-q";
      q.textContent = qi + 1 + ". " + item.q;
      card.appendChild(q);

      const opts = document.createElement("div");
      opts.className = "quiz-options";

      item.options.forEach((optText, oi) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = optText;
        btn.addEventListener("click", () => {
          if (card.dataset.answered === "true") return;
          card.dataset.answered = "true";
          const correct = oi === item.answer;
          btn.classList.add(correct ? "correct" : "wrong");
          // Tandai jawaban benar jika salah pilih.
          if (!correct) {
            opts.children[item.answer].classList.add("correct");
          }
          // Nonaktifkan sisanya secara visual.
          Array.from(opts.children).forEach((c) => c.classList.add("locked"));
          const fb = document.createElement("p");
          fb.className = "quiz-feedback " + (correct ? "ok" : "no");
          fb.textContent =
            (correct ? "✔ Benar! " : "✘ Kurang tepat. ") + item.explain;
          card.appendChild(fb);
        });
        opts.appendChild(btn);
      });

      card.appendChild(opts);
      el.challengeArea.appendChild(card);
    });
  }

  /* --- Asisten AI (template, tanpa model nyata) --- */
  function handleAiAsk() {
    const op = currentOpening();
    const question = (el.aiInput.value || "").trim();
    if (!question) {
      el.aiBox.innerHTML =
        '<p class="ai-placeholder">Ketik pertanyaanmu dulu, lalu tekan Tanya.</p>';
      return;
    }
    // Jawaban template berbasis opening & level aktif (bukan AI sungguhan).
    const levelNote = {
      beginner: "Karena kamu memilih level pemula, berikut penjelasan rincinya.",
      intermediate: "Ringkasan untuk level menengah:",
      advanced: "Inti untuk level mahir:",
    }[state.level];

    el.aiBox.innerHTML =
      '<div class="ai-bubble">' +
      '<p class="ai-tag">🤖 Asisten (jawaban contoh)</p>' +
      "<p><strong>Pertanyaanmu:</strong> " +
      escapeHtml(question) +
      "</p>" +
      "<p>" +
      levelNote +
      "</p>" +
      "<p>Pembukaan <strong>" +
      op.name +
      "</strong>: " +
      op.short +
      " " +
      op.analysis +
      "</p>" +
      '<p class="ai-disclaimer">Catatan: ini jawaban template untuk demo. ' +
      "Integrasi AI sungguhan dapat ditambahkan di sini nanti.</p>" +
      "</div>";
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  /* --- Event wiring & ganti opening/level --- */
  function changeOpening(id) {
    state.openingId = id;
    stopAutoplay();
    state.stepIndex = -1;
    renderMeta();
    renderMovesList();
    renderAnalysis();
    renderChallenge();
    syncBoard();
    el.aiBox.innerHTML =
      '<p class="ai-placeholder">Tanyakan apa saja tentang pembukaan ini. Jawaban berupa contoh template.</p>';
  }

  function changeLevel(level) {
    state.level = level;
    el.levelButtons.forEach((b) =>
      b.classList.toggle("active", b.dataset.level === level)
    );
    renderExplanation();
  }

  function bindEvents() {
    el.openingSelect.addEventListener("change", (e) =>
      changeOpening(e.target.value)
    );
    el.levelButtons.forEach((b) =>
      b.addEventListener("click", () => changeLevel(b.dataset.level))
    );
    el.btnStart.addEventListener("click", () => {
      stopAutoplay();
      toStart();
    });
    el.btnPrev.addEventListener("click", () => {
      stopAutoplay();
      prev();
    });
    el.btnNext.addEventListener("click", () => {
      stopAutoplay();
      next();
    });
    el.btnEnd.addEventListener("click", () => {
      stopAutoplay();
      toEnd();
    });
    el.btnAuto.addEventListener("click", toggleAutoplay);
    el.btnFlip.addEventListener("click", () => board.flip());
    el.aiAsk.addEventListener("click", handleAiAsk);
    el.aiInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleAiAsk();
    });

    // Navigasi keyboard panah kiri/kanan.
    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        stopAutoplay();
        next();
      } else if (e.key === "ArrowLeft") {
        stopAutoplay();
        prev();
      }
    });
  }

  function init() {
    cacheDom();
    board = new ChessBoard(el.boardContainer);
    populateOpeningSelect();
    bindEvents();
    changeLevel(state.level);
    changeOpening(state.openingId);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
