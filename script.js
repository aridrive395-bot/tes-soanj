(() => {
"use strict";
const C = CONFIG, RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const h = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.innerHTML = x; return e; };
const fill = s => String(s).replace(/\{penerima\}/g, C.penerima).replace(/\{pengirim\}/g, C.pengirim);
const pick = a => a[Math.floor(Math.random() * a.length)];
Object.entries(C.tema || {}).forEach(([k, v]) => document.documentElement.style.setProperty("--" + k, v));
document.title = fill(C.judul) + " • untuk " + C.penerima;

/* ---------- dekor latar ---------- */
const deco = $("#deco");
(C.dekor || []).forEach((e, i) => { const s = h("span", "", e); s.style.cssText = `left:${(i * 17 + 6) % 92}%;top:${(i * 29 + 10) % 85}%;font-size:${22 + (i % 3) * 8}px;animation-delay:${-i}s`; deco.append(s); });

/* ---------- partikel (konfeti / hati) ---------- */
const cv = $("#fx"), cx = cv.getContext("2d"); let P = [], raf = 0;
const sizeFx = () => { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); };
addEventListener("resize", sizeFx); sizeFx();
const COL = ["#FF5C77", "#FFD45E", "#6fcfa8", "#6bb6f5"], GL = ["❤", "✦", "✿", "●"];
function burst(x, y, n = 36, rain = false) {
  n = RM ? Math.min(n, 6) : Math.min(n, 60);
  for (let i = 0; i < n; i++) P.push({ x: rain ? Math.random() * innerWidth : x, y: rain ? -20 : y, vx: (Math.random() - .5) * (rain ? 2 : 9), vy: rain ? 1 + Math.random() * 2 : -Math.random() * 9 - 2, g: rain ? .02 : .3, r: Math.random() * 6, vr: (Math.random() - .5) * .3, s: 12 + Math.random() * 14, c: COL[i % 4], t: GL[i % 4], l: rain ? 400 : 70 + Math.random() * 40 });
  if (!raf) raf = requestAnimationFrame(tick);
}
function tick() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  P = P.filter(p => p.l > 0 && p.y < innerHeight + 40);
  for (const p of P) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.l--;
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.globalAlpha = Math.min(1, p.l / 30);
    cx.fillStyle = p.c; cx.font = p.s + "px sans-serif"; cx.textAlign = "center"; cx.fillText(p.t, 0, 0); cx.restore();
  }
  raf = P.length ? requestAnimationFrame(tick) : 0;
}
const center = () => burst(innerWidth / 2, innerHeight / 2, 50);

/* ---------- util ---------- */
function type(el, text, cb, sp = 26) {
  if (RM) { el.textContent = text; cb && cb(); return () => {}; }
  let k = 0, done = false;
  const fin = () => { if (done) return; done = true; clearInterval(iv); el.textContent = text; cb && cb(); };
  const iv = setInterval(() => { el.textContent = text.slice(0, ++k); if (k >= text.length) fin(); }, sp);
  return fin;
}
let tt; function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2200); }
const sheet = $("#sheet"), card = $("#card"); let sheetKey = null;
function openSheet(node, onKey) { card.replaceChildren(node); sheet.hidden = false; sheetKey = onKey || null; const b = $("button", card); b && b.focus(); }
function closeSheet() { sheet.hidden = true; sheetKey = null; }
sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });
addEventListener("keydown", e => { if (sheet.hidden) return; if (e.key === "Escape") closeSheet(); else if (sheetKey) sheetKey(e.key); });

/* ---------- musik ---------- */
const au = new Audio(); au.loop = true; au.volume = .6; au.preload = "none"; au.src = C.musik;
const mp = $("#mp"), top = $("#top");
function setPlay(on) { top.classList.toggle("playing", on); mp.setAttribute("aria-pressed", on); mp.setAttribute("aria-label", on ? "Jeda musik" : "Putar musik"); $("#mi").textContent = on ? "❚❚" : "▶"; }
function play() { au.play().then(() => setPlay(true)).catch(() => setPlay(false)); }
mp.onclick = () => au.paused ? play() : (au.pause(), setPlay(false));
$("#vol").oninput = e => au.volume = +e.target.value;
let was = false;
document.addEventListener("visibilitychange", () => { if (document.hidden) { was = !au.paused; au.pause(); } else if (was) play(); });

/* ---------- adegan ---------- */
function sOpen(el, a) {
  el.innerHTML = `<div class="ticket wob" id="tk"><div class="tl"><small>${fill(C.tiket.atas)}</small><h1>${fill(C.judul)}</h1><p>untuk <b>${C.penerima}</b> 💌</p></div><div class="tr"><span>${C.tanggalUtama}</span><b>♥</b><span>ADMIT ONE</span></div></div>
  <button class="btn big" id="tear">Sobek tiketnya ✂</button><p class="hint">${fill(C.tiket.petunjuk)}</p>`;
  $("#tear", el).onclick = e => { e.target.disabled = true; $("#tk", el).classList.remove("wob"); $("#tk", el).classList.add("torn"); if (au.paused) play(); burst(innerWidth / 2, innerHeight / 2.5, 30); setTimeout(a.next, RM ? 0 : 1000); };
}
function sStory(el, a) {
  el.innerHTML = `<h2>Obrolan Kecil 💬</h2><div class="chat" id="ch" aria-live="polite"></div><button class="btn" id="mo">Ketuk untuk lanjut ›</button>`;
  const ch = $("#ch", el), mo = $("#mo", el); let i = 0, busy = false, fin = null;
  function say() {
    if (busy) { fin && fin(); return; }
    if (i >= C.cerita.length) return;
    busy = true; const l = C.cerita[i++];
    const b = h("div", "bub " + (l.dari === "aku" ? "me" : "you"), '<i class="dots"><b></b><b></b><b></b></i>'); ch.append(b); ch.scrollTop = ch.scrollHeight;
    setTimeout(() => { fin = type(b, fill(l.teks), () => { busy = false; ch.scrollTop = ch.scrollHeight; if (i >= C.cerita.length) { mo.hidden = true; a.ready(); } }); }, RM ? 0 : 600);
  }
  mo.onclick = say; say();
}
function sGal(el, a) {
  el.classList.add("wide");
  el.innerHTML = `<h2>Papan Kenangan 📌</h2><p class="sub">Ketuk foto untuk memperbesar</p><div class="board"></div>`;
  const bd = $(".board", el), F = C.foto;
  function view(k) {
    k = (k + F.length) % F.length; const f = F[k];
    const n = h("div", "", `<img src="${f.src}" alt="${f.judul}"><h3>${f.judul}</h3><small>${f.tgl}</small><p>${fill(f.teks)}</p><div class="row"><button class="btn ghost" data-d="-1" aria-label="Foto sebelumnya">‹</button><button class="btn" data-c>Tutup</button><button class="btn ghost" data-d="1" aria-label="Foto berikutnya">›</button></div>`);
    n.onclick = e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.c !== undefined) closeSheet(); else view(k + +b.dataset.d); };
    openSheet(n, key => { if (key === "ArrowLeft") view(k - 1); if (key === "ArrowRight") view(k + 1); });
    a.ready();
  }
  F.forEach((f, k) => {
    const b = h("button", "pol", `<i class="tape"></i><img src="${f.src}" alt="" loading="lazy"><span>${f.judul}</span><em>${f.tgl}</em>`);
    b.setAttribute("aria-label", "Buka foto: " + f.judul); b.style.setProperty("--r", ((k % 2 ? 1 : -1) * (1 + (k % 3) * 1.3)) + "deg"); b.style.setProperty("--d", k * 70 + "ms"); b.onclick = () => view(k); bd.append(b);
  });
}
function sGame(el, a) {
  const G = C.game;
  el.innerHTML = `<h2>${G.judul}</h2><p class="sub">${G.petunjuk}</p><div class="score" aria-live="polite"><b id="sc">0</b> / ${G.target}</div><div class="field" id="fd"></div>`;
  const fd = $("#fd", el), sc = $("#sc", el); let n = 0, on = true;
  function spawn() {
    if (!on || fd.childElementCount > 14) return;
    const gold = Math.random() < .15, e = h("button", "fall" + (gold ? " gold" : ""), gold ? "⭐" : pick(G.ikon));
    e.setAttribute("aria-label", gold ? "Bintang emas" : "Hati");
    e.style.left = 4 + Math.random() * 80 + "%"; e.style.setProperty("--fh", fd.clientHeight + 80 + "px"); e.style.animationDuration = 3 + Math.random() * 2 + "s";
    e.onpointerdown = ev => { ev.preventDefault(); if (!on) return; n += gold ? 2 : 1; sc.textContent = Math.min(n, G.target); burst(ev.clientX, ev.clientY, 8); e.remove(); if (n >= G.target) win(); };
    e.onanimationend = () => e.remove(); fd.append(e);
  }
  function win() { on = false; fd.replaceChildren(h("p", "win", G.menang)); center(); a.ready(); }
  const iv = setInterval(spawn, RM ? 1200 : 650); spawn();
  return () => { on = false; clearInterval(iv); };
}
function sQuiz(el, a) {
  const Q = C.kuis.soal; let i = 0;
  function show() {
    const s = Q[i];
    el.innerHTML = `<h2>${C.kuis.judul} 🧠</h2><p class="sub">Soal ${i + 1} dari ${Q.length}</p><p class="q">${s.q}</p><div class="opts"></div><p class="fb" aria-live="polite"></p>`;
    const ob = $(".opts", el), fb = $(".fb", el);
    s.o.forEach((t, k) => {
      const b = h("button", "btn", t);
      b.onclick = () => {
        if (k === s.b) { b.classList.add("ok"); fb.textContent = "Benar! 🎉"; burst(innerWidth / 2, innerHeight / 2, 20); $$(ob).forEach(x => x.disabled = true); setTimeout(() => { i++; if (i < Q.length) show(); else { el.innerHTML = `<div class="big-e">🏆</div><h2>${C.kuis.selesai}</h2>`; center(); a.ready(); } }, RM ? 300 : 1100); }
        else { b.classList.add("no"); b.disabled = true; fb.textContent = "Hampir! Petunjuk: " + s.hint; }
      };
      ob.append(b);
    });
  }
  const $$ = n => [...n.children];
  show();
}
function sSecret(el, a) {
  const R = C.rahasia; let opened = 0;
  el.innerHTML = `<h2>${R.judul}</h2><p class="sub">${R.petunjuk}</p><div class="gifts"></div>`;
  R.kotak.forEach(k => {
    const b = h("button", "gift", `<i>${k.ikon}</i>${k.label}`);
    b.onclick = () => {
      b.classList.add("shake");
      setTimeout(() => {
        b.classList.remove("shake");
        if (!b.classList.contains("opened")) { b.classList.add("opened"); $("i", b).textContent = "✨"; opened++; }
        const n = h("div", "", `<div class="big-e">${k.ikon}</div><h3>${k.label}</h3><p>${fill(k.isi)}</p><button class="btn">Simpan di hati 💗</button>`);
        n.onclick = e => { if (e.target.closest("button")) { closeSheet(); if (opened >= R.kotak.length) a.ready(); } };
        openSheet(n); center();
      }, RM ? 0 : 600);
    };
    $(".gifts", el).append(b);
  });
}
function sLetter(el, a) {
  const L = C.surat;
  el.innerHTML = `<h2>Surat untukmu 💌</h2><button class="env" id="ev" aria-label="Buka surat">💌</button><p class="hint">Ketuk amplopnya</p>`;
  $("#ev", el).onclick = () => {
    const ev = $("#ev", el); ev.classList.add("open"); ev.disabled = true;
    setTimeout(() => {
      el.innerHTML = `<div class="paper" id="pp" tabindex="0"></div>`;
      const pp = $("#pp", el), lines = [fill(L.salam), ...L.paragraf.map(fill), fill(L.penutup)]; let k = 0, fin = null;
      const next = () => {
        if (k >= lines.length) return sign();
        const p = h("p", k === lines.length - 1 ? "sg" : ""); pp.append(p); const my = k++;
        fin = type(p, lines[my], () => setTimeout(next, RM ? 0 : 250), 22);
      };
      pp.onclick = () => fin && fin();
      function sign() {
        const w = h("div", "", `<p class="sg">${C.pengirim} ♥</p><p class="small">${L.ttdPetunjuk}</p><canvas class="sig" id="sg" aria-label="Area tanda tangan"></canvas><div class="row"><button class="btn ghost" id="cl">Hapus</button></div>`);
        pp.append(w); const c = $("#sg", pp), g = c.getContext("2d"), d = Math.min(devicePixelRatio || 1, 2), r = c.getBoundingClientRect();
        c.width = r.width * d; c.height = r.height * d; g.scale(d, d); g.lineWidth = 2.5; g.lineCap = g.lineJoin = "round"; g.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--ink");
        let dr = false; const xy = e => { const b = c.getBoundingClientRect(); return [e.clientX - b.left, e.clientY - b.top]; };
        c.onpointerdown = e => { dr = true; c.setPointerCapture(e.pointerId); g.beginPath(); g.moveTo(...xy(e)); };
        c.onpointermove = e => { if (dr) { g.lineTo(...xy(e)); g.stroke(); } };
        c.onpointerup = () => { dr = false; };
        $("#cl", pp).onclick = () => g.clearRect(0, 0, c.width, c.height);
        w.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "end" }); burst(innerWidth / 2, innerHeight / 2, 30); a.ready();
      }
      next();
    }, RM ? 100 : 750);
  };
}
function sEnd(el, a) {
  const E = C.penutup;
  el.innerHTML = `<div class="big-e">🎉</div><h1>${fill(E.judul)}</h1><p>${fill(E.pesan)}</p><div class="row"><button class="btn big" id="rp">${E.tombolUlang}</button><button class="btn" id="sh">${E.tombolBagi}</button></div>`;
  $("#rp", el).onclick = () => { done = {}; go(0); };
  $("#sh", el).onclick = async () => {
    const data = { title: document.title, text: `Ada kejutan untuk ${C.penerima} 💌`, url: location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(location.href); toast("Link disalin ✨"); } } catch (e) { /* dibatalkan */ }
  };
  center(); const iv = setInterval(() => burst(0, 0, 2, true), 900);
  return () => clearInterval(iv);
}

/* ---------- mesin adegan ---------- */
const S = [sOpen, sStory, sGal, sGame, sQuiz, sSecret, sLetter, sEnd], TR = ["", "t1", "t2", "t3"];
const stage = $("#stage"), nextB = $("#next"), prevB = $("#prev");
let cur = -1, done = {}, cleanup = null, token = 0;
function go(i) {
  if (i < 0 || i >= S.length) return;
  closeSheet(); cleanup && cleanup(); cleanup = null; const my = ++token;
  const old = stage.firstElementChild;
  const show = () => {
    if (my !== token) return;
    cur = i; document.body.dataset.s = i;
    const el = h("section", "scene " + TR[i % 4]); stage.replaceChildren(el); stage.scrollTop = 0;
    const api = { ready() { done[i] = true; if (cur === i) nextB.disabled = false; }, next() { go(i + 1); } };
    nextB.disabled = !done[i]; prevB.disabled = i === 0;
    $("#fill").style.width = (i / (S.length - 1)) * 100 + "%";
    $("#lbl").textContent = `Adegan ${i + 1}/${S.length} · ${C.adegan[i] || ""}`;
    cleanup = S[i](el, api) || null;
  };
  if (old && !RM) { old.classList.add("out"); setTimeout(show, 240); } else show();
}
nextB.onclick = () => go(cur + 1); prevB.onclick = () => go(cur - 1);
go(0);
})();
