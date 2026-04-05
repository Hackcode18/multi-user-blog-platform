import { useState, useRef, useEffect, useCallback } from "react";

/* ─── Google Fonts ─── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@300;400;500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  `}</style>
);

/* ─── Global Styles ─── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg-void:    #04040a;
      --bg-deep:    #080812;
      --bg-card:    #0d0d1f;
      --bg-glass:   rgba(13,13,31,0.72);
      --bg-panel:   #10101e;
      --border:     rgba(255,255,255,0.07);
      --border-lit: rgba(0,210,255,0.28);
      --cyan:       #00d2ff;
      --cyan-dim:   rgba(0,210,255,0.15);
      --amber:      #ffb700;
      --amber-dim:  rgba(255,183,0,0.15);
      --coral:      #ff5f6d;
      --violet:     #7c5cbf;
      --green:      #00ffb2;
      --text-1:     #f0f0ff;
      --text-2:     #9494c0;
      --text-3:     #55556a;
      --font-head:  'Playfair Display', Georgia, serif;
      --font-code:  'JetBrains Mono', 'Fira Code', monospace;
      --font-body:  'DM Sans', system-ui, sans-serif;
      --radius:     12px;
      --radius-lg:  20px;
      --shadow:     0 24px 80px rgba(0,0,0,0.6);
      --glow-cyan:  0 0 30px rgba(0,210,255,0.22), 0 0 80px rgba(0,210,255,0.08);
      --glow-amber: 0 0 30px rgba(255,183,0,0.22), 0 0 80px rgba(255,183,0,0.08);
    }

    html, body { height: 100%; overflow-x: hidden; }

    body {
      background: var(--bg-void);
      color: var(--text-1);
      font-family: var(--font-body);
      font-size: 15px;
      line-height: 1.6;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--text-3); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--text-2); }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes pulseGlow {
      0%,100% { opacity:.6; }
      50%      { opacity:1; }
    }
    @keyframes orbFloat {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(30px,-40px) scale(1.07); }
      66%      { transform: translate(-20px,20px) scale(.95); }
    }
    @keyframes scanline {
      0%   { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes blink {
      0%,100% { opacity:1; }
      50%      { opacity:0; }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes slideIn {
      from { opacity:0; transform:translateX(40px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes ripple {
      0%   { transform:scale(0); opacity:.6; }
      100% { transform:scale(4); opacity:0; }
    }
    @keyframes gradientShift {
      0%,100% { background-position:0% 50%; }
      50%      { background-position:100% 50%; }
    }
    @keyframes typewriter {
      from { width:0; }
      to   { width:100%; }
    }
    @keyframes livepin {
      0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(0,255,178,.5); }
      50%      { transform:scale(1.15); box-shadow:0 0 0 8px rgba(0,255,178,0); }
    }

    .fade-up { animation: fadeUp .6s ease both; }
    .fade-up-1 { animation: fadeUp .6s .1s ease both; }
    .fade-up-2 { animation: fadeUp .6s .2s ease both; }
    .fade-up-3 { animation: fadeUp .6s .35s ease both; }

    /* ── Glassmorphism Card ── */
    .glass {
      background: var(--bg-glass);
      backdrop-filter: blur(18px) saturate(180%);
      -webkit-backdrop-filter: blur(18px) saturate(180%);
      border: 1px solid var(--border);
    }

    /* ── Nav ── */
    .nav {
      position: fixed; top:0; left:0; right:0; z-index:900;
      height:58px; display:flex; align-items:center;
      padding:0 32px;
      background: rgba(4,4,10,.82);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo {
      font-family: var(--font-code);
      font-weight:700;
      font-size:17px;
      color: var(--cyan);
      letter-spacing:-.5px;
      display:flex; align-items:center; gap:8px;
    }
    .nav-logo span { color:var(--amber); }
    .nav-links {
      display:flex; gap:4px; margin-left:40px;
    }
    .nav-link {
      font-size:13px; font-family:var(--font-code); font-weight:400;
      color:var(--text-2); cursor:pointer; padding:6px 14px;
      border-radius:6px; border:none; background:transparent;
      transition:all .2s;
    }
    .nav-link:hover, .nav-link.active {
      color:var(--text-1); background:rgba(255,255,255,.06);
    }
    .nav-link.active { color:var(--cyan); }
    .nav-right { margin-left:auto; display:flex; align-items:center; gap:12px; }
    .live-indicator {
      display:flex; align-items:center; gap:7px;
      font-family:var(--font-code); font-size:12px; color:var(--green);
    }
    .live-dot {
      width:8px; height:8px; border-radius:50%;
      background:var(--green);
      animation: livepin 2s ease infinite;
    }
    .btn {
      padding:8px 20px; border-radius:8px; border:none;
      font-family:var(--font-body); font-size:13px; font-weight:600;
      cursor:pointer; transition:all .22s; display:flex;
      align-items:center; gap:7px;
    }
    .btn-primary {
      background: linear-gradient(135deg,var(--cyan),var(--violet));
      color:#fff;
    }
    .btn-primary:hover { transform:translateY(-1px); box-shadow:var(--glow-cyan); }
    .btn-ghost {
      background:transparent; color:var(--text-2);
      border:1px solid var(--border);
    }
    .btn-ghost:hover { border-color:var(--border-lit); color:var(--text-1); }

    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display:flex; align-items:center; justify-content:center;
      position:relative; overflow:hidden;
      padding:80px 40px 40px;
    }
    .hero-orb {
      position:absolute; border-radius:50%;
      filter:blur(90px); pointer-events:none;
      animation: orbFloat 12s ease-in-out infinite;
    }
    .hero-grid {
      position:absolute; inset:0;
      background-image:
        linear-gradient(rgba(0,210,255,.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,210,255,.04) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
    }
    .hero-content {
      max-width:820px; text-align:center; z-index:2;
    }
    .hero-tag {
      display:inline-flex; align-items:center; gap:8px;
      font-family:var(--font-code); font-size:12px;
      color:var(--cyan); padding:6px 16px;
      border:1px solid var(--border-lit);
      border-radius:100px; margin-bottom:32px;
      background:var(--cyan-dim);
    }
    .hero-title {
      font-family: var(--font-head);
      font-size: clamp(44px,7vw,92px);
      line-height:1.02; font-weight:900;
      letter-spacing:-2px; margin-bottom:24px;
    }
    .hero-title em { font-style:italic; color:var(--amber); }
    .hero-title .hi { color:var(--cyan); }
    .hero-sub {
      font-size:17px; color:var(--text-2); max-width:540px;
      margin:0 auto 40px; line-height:1.7;
    }
    .hero-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
    .hero-stats {
      display:flex; gap:40px; justify-content:center;
      margin-top:64px; padding-top:32px;
      border-top:1px solid var(--border);
    }
    .stat { text-align:center; }
    .stat-val {
      font-family:var(--font-code); font-size:28px; font-weight:700;
      color:var(--text-1); display:block;
    }
    .stat-val span { color:var(--cyan); }
    .stat-label { font-size:12px; color:var(--text-3); text-transform:uppercase; letter-spacing:1px; }

    /* ── Layout ── */
    .page { padding-top:58px; min-height:100vh; }
    .container { max-width:1280px; margin:0 auto; padding:0 32px; }

    /* ── Section Header ── */
    .section-head {
      display:flex; align-items:center; justify-content:space-between;
      padding:40px 0 28px;
    }
    .section-title {
      font-family:var(--font-head); font-size:32px; font-weight:700;
      letter-spacing:-1px;
    }
    .section-badge {
      font-family:var(--font-code); font-size:11px;
      color:var(--amber); padding:4px 12px;
      border:1px solid var(--amber-dim); border-radius:100px;
      background:var(--amber-dim);
    }

    /* ── Blog Grid ── */
    .blog-grid {
      display:grid;
      grid-template-columns: repeat(auto-fill, minmax(340px,1fr));
      gap:24px; padding-bottom:60px;
    }
    .blog-card {
      border-radius:var(--radius-lg);
      border:1px solid var(--border);
      background:var(--bg-card);
      overflow:hidden; cursor:pointer;
      transition:all .28s cubic-bezier(.22,1,.36,1);
      position:relative;
    }
    .blog-card::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,var(--cyan-dim),transparent 60%);
      opacity:0; transition:opacity .3s;
    }
    .blog-card:hover { transform:translateY(-6px); border-color:var(--border-lit); box-shadow:var(--glow-cyan); }
    .blog-card:hover::before { opacity:1; }
    .card-banner {
      height:180px; position:relative; overflow:hidden;
      display:flex; align-items:flex-end; padding:16px;
    }
    .card-banner-bg {
      position:absolute; inset:0;
      background-size:cover; background-position:center;
    }
    .card-banner-overlay {
      position:absolute; inset:0;
      background:linear-gradient(to top,rgba(4,4,10,.95) 0%,rgba(4,4,10,.3) 100%);
    }
    .card-tag {
      position:relative; z-index:1;
      font-family:var(--font-code); font-size:10px; font-weight:700;
      text-transform:uppercase; letter-spacing:1.5px;
      padding:4px 10px; border-radius:100px; border:1px solid currentColor;
    }
    .card-body { padding:20px 22px 22px; }
    .card-title {
      font-family:var(--font-head); font-size:21px;
      font-weight:700; line-height:1.25; margin-bottom:10px;
      letter-spacing:-.3px;
    }
    .card-excerpt {
      font-size:13.5px; color:var(--text-2);
      line-height:1.65; margin-bottom:18px;
      display:-webkit-box; -webkit-line-clamp:2;
      -webkit-box-orient:vertical; overflow:hidden;
    }
    .card-meta {
      display:flex; align-items:center; justify-content:space-between;
    }
    .card-author {
      display:flex; align-items:center; gap:9px;
    }
    .avatar {
      width:30px; height:30px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-family:var(--font-code); font-size:11px; font-weight:700;
      flex-shrink:0; border:2px solid var(--border);
    }
    .author-name { font-size:12.5px; font-weight:600; }
    .author-role { font-size:11px; color:var(--text-3); }
    .card-stats {
      display:flex; gap:14px; align-items:center;
    }
    .card-stat {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-3); display:flex; align-items:center; gap:5px;
    }
    .card-stat svg { width:13px; height:13px; }

    /* ── Featured Card ── */
    .blog-card.featured {
      grid-column: span 2;
    }
    .blog-card.featured .card-banner { height:260px; }
    .blog-card.featured .card-title { font-size:28px; }

    /* ── Floating Window ── */
    .float-win {
      position:fixed; z-index:800;
      border-radius:14px; overflow:hidden;
      box-shadow: var(--shadow), 0 0 0 1px var(--border);
      background:var(--bg-panel);
      min-width:260px; user-select:none;
      animation: slideIn .35s ease both;
    }
    .float-win-header {
      height:36px;
      background:rgba(255,255,255,.04);
      border-bottom:1px solid var(--border);
      display:flex; align-items:center; padding:0 14px; gap:8px;
      cursor:grab;
    }
    .float-win-header:active { cursor:grabbing; }
    .win-dot {
      width:11px; height:11px; border-radius:50%;
    }
    .win-title {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-3); margin-left:6px; flex:1;
    }
    .win-close {
      font-size:16px; color:var(--text-3); cursor:pointer;
      background:none; border:none; line-height:1;
      padding:0 2px;
    }
    .win-close:hover { color:var(--coral); }
    .float-win-body { padding:14px; }

    /* ── Trending Panel ── */
    .trend-item {
      display:flex; align-items:center; gap:10px;
      padding:9px 0; border-bottom:1px solid var(--border);
      cursor:pointer; transition:all .2s;
    }
    .trend-item:last-child { border:none; }
    .trend-item:hover .trend-topic { color:var(--cyan); }
    .trend-num {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-3); width:16px; text-align:right;
    }
    .trend-info { flex:1; }
    .trend-topic { font-size:13px; font-weight:500; transition:color .2s; }
    .trend-count { font-family:var(--font-code); font-size:11px; color:var(--text-3); }
    .trend-bar {
      height:2px; background:var(--border); border-radius:1px; margin-top:4px;
    }
    .trend-bar-fill {
      height:100%; border-radius:1px;
      background:linear-gradient(90deg,var(--cyan),var(--violet));
      transition:width .5s ease;
    }

    /* ── Users Panel ── */
    .user-row {
      display:flex; align-items:center; gap:10px;
      padding:8px 0;
    }
    .user-status {
      width:8px; height:8px; border-radius:50%;
      flex-shrink:0;
    }
    .status-online  { background:var(--green); box-shadow:0 0 8px var(--green); }
    .status-away    { background:var(--amber); }
    .status-offline { background:var(--text-3); }
    .user-info { flex:1; }
    .user-name { font-size:13px; font-weight:500; }
    .user-action { font-size:11px; color:var(--text-3); }
    .user-time  { font-family:var(--font-code); font-size:10px; color:var(--text-3); }

    /* ── Editor Panel ── */
    .editor-wrap {
      background:var(--bg-deep);
      border:1px solid var(--border);
      border-radius:10px; overflow:hidden;
    }
    .editor-toolbar {
      display:flex; gap:6px; padding:8px 12px;
      border-bottom:1px solid var(--border);
    }
    .editor-btn {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-2); background:none; border:none;
      padding:3px 8px; border-radius:4px; cursor:pointer;
      transition:all .15s;
    }
    .editor-btn:hover { background:rgba(255,255,255,.06); color:var(--text-1); }
    .editor-textarea {
      width:100%; background:transparent; border:none; outline:none;
      color:var(--text-1); font-family:var(--font-code); font-size:13px;
      line-height:1.7; padding:12px; resize:none;
      min-height:140px;
    }
    .editor-footer {
      display:flex; align-items:center; justify-content:space-between;
      padding:8px 12px; border-top:1px solid var(--border);
    }
    .editor-wordcount {
      font-family:var(--font-code); font-size:11px; color:var(--text-3);
    }

    /* ── Debate Panel ── */
    .debate-item {
      padding:10px 0; border-bottom:1px solid var(--border);
    }
    .debate-item:last-child { border:none; }
    .debate-q {
      font-size:12.5px; font-weight:600; margin-bottom:8px;
      cursor:pointer;
    }
    .debate-q:hover { color:var(--cyan); }
    .vote-row { display:flex; gap:8px; align-items:center; }
    .vote-opt {
      flex:1; padding:5px 8px;
      border-radius:6px; border:1px solid var(--border);
      font-size:11px; font-family:var(--font-code);
      cursor:pointer; text-align:center; transition:all .2s;
    }
    .vote-opt:hover { border-color:var(--cyan); color:var(--cyan); }
    .vote-opt.voted { background:var(--cyan-dim); border-color:var(--cyan); color:var(--cyan); }
    .vote-opt.voted-b { background:var(--amber-dim); border-color:var(--amber); color:var(--amber); }

    /* ── Post View ── */
    .post-view { max-width:720px; margin:0 auto; padding:60px 32px; }
    .post-back {
      display:inline-flex; align-items:center; gap:8px;
      font-family:var(--font-code); font-size:13px;
      color:var(--text-2); cursor:pointer; margin-bottom:40px;
      transition:color .2s;
    }
    .post-back:hover { color:var(--cyan); }
    .post-header-tag {
      font-family:var(--font-code); font-size:12px;
      color:var(--cyan); margin-bottom:16px;
      display:flex; align-items:center; gap:8px;
    }
    .post-title {
      font-family:var(--font-head); font-size:clamp(32px,5vw,56px);
      font-weight:900; letter-spacing:-1.5px;
      line-height:1.08; margin-bottom:24px;
    }
    .post-meta {
      display:flex; align-items:center; gap:16px;
      padding:16px 0; border-top:1px solid var(--border);
      border-bottom:1px solid var(--border); margin-bottom:40px;
    }
    .post-avatar {
      width:42px; height:42px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-family:var(--font-code); font-weight:700; font-size:14px;
    }
    .post-author-info .name { font-weight:600; }
    .post-author-info .date {
      font-size:12.5px; color:var(--text-3);
      font-family:var(--font-code);
    }
    .post-actions {
      margin-left:auto; display:flex; gap:10px;
    }
    .icon-btn {
      width:36px; height:36px; border-radius:8px;
      border:1px solid var(--border); background:none;
      color:var(--text-2); cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      font-size:15px; transition:all .2s;
    }
    .icon-btn:hover { border-color:var(--border-lit); color:var(--text-1); }
    .icon-btn.liked { border-color:var(--coral); color:var(--coral); background:rgba(255,95,109,.1); }
    .post-body {
      font-size:17px; line-height:1.85; color:#c8c8e8;
    }
    .post-body p { margin-bottom:24px; }
    .post-body h2 {
      font-family:var(--font-head); font-size:28px;
      font-weight:700; letter-spacing:-.5px;
      margin:40px 0 16px; color:var(--text-1);
    }
    .post-body h3 {
      font-family:var(--font-head); font-size:22px;
      font-weight:700; margin:32px 0 12px; color:var(--text-1);
    }
    .post-code {
      background:var(--bg-deep); border:1px solid var(--border);
      border-left:3px solid var(--cyan);
      border-radius:0 8px 8px 0;
      padding:16px 20px; margin:24px 0;
      font-family:var(--font-code); font-size:13.5px;
      line-height:1.7; color:#a8d8f0; overflow-x:auto;
    }
    .post-body blockquote {
      margin:28px 0; padding:16px 24px;
      border-left:3px solid var(--amber);
      background:var(--amber-dim); border-radius:0 8px 8px 0;
      font-style:italic; color:var(--text-2);
    }
    .post-debate-section {
      margin:48px 0; padding:28px;
      background:var(--bg-card); border-radius:var(--radius-lg);
      border:1px solid var(--border);
    }
    .debate-title {
      font-family:var(--font-code); font-size:12px;
      color:var(--amber); text-transform:uppercase; letter-spacing:1.5px;
      margin-bottom:16px; display:flex; align-items:center; gap:8px;
    }
    .debate-question {
      font-family:var(--font-head); font-size:20px;
      font-weight:700; margin-bottom:20px;
    }
    .debate-options { display:flex; gap:12px; flex-wrap:wrap; }
    .debate-option {
      flex:1; min-width:160px; padding:14px 18px;
      border:1px solid var(--border); border-radius:12px;
      cursor:pointer; text-align:left; background:var(--bg-deep);
      transition:all .25s; position:relative; overflow:hidden;
    }
    .debate-option:hover { border-color:var(--cyan); }
    .debate-option.selected { border-color:var(--cyan); background:var(--cyan-dim); }
    .debate-option-label {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-3); text-transform:uppercase; letter-spacing:1px;
      margin-bottom:4px;
    }
    .debate-option-text { font-size:14px; font-weight:600; margin-bottom:8px; }
    .debate-bar {
      height:3px; background:var(--border); border-radius:2px;
    }
    .debate-bar-fill {
      height:100%; border-radius:2px;
      background:linear-gradient(90deg,var(--cyan),var(--violet));
      transition:width .8s cubic-bezier(.22,1,.36,1);
    }
    .debate-votes { font-family:var(--font-code); font-size:11px; color:var(--text-3); margin-top:4px; }

    /* ── Write Modal ── */
    .modal-overlay {
      position:fixed; inset:0; z-index:1000;
      background:rgba(4,4,10,.88);
      backdrop-filter:blur(8px);
      display:flex; align-items:center; justify-content:center;
      padding:40px;
    }
    .modal {
      width:100%; max-width:780px;
      max-height:88vh; overflow-y:auto;
      background:var(--bg-panel);
      border:1px solid var(--border);
      border-radius:20px;
      animation:fadeUp .35s ease both;
    }
    .modal-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:20px 28px;
      border-bottom:1px solid var(--border);
    }
    .modal-title {
      font-family:var(--font-head); font-size:22px; font-weight:700;
    }
    .modal-body { padding:28px; display:flex; flex-direction:column; gap:18px; }
    .form-group { display:flex; flex-direction:column; gap:7px; }
    .form-label {
      font-family:var(--font-code); font-size:11px;
      color:var(--text-3); text-transform:uppercase; letter-spacing:1px;
    }
    .form-input, .form-select {
      background:var(--bg-deep); border:1px solid var(--border);
      border-radius:8px; padding:11px 14px;
      color:var(--text-1); font-family:var(--font-body); font-size:14px;
      outline:none; transition:border-color .2s;
    }
    .form-input:focus, .form-select:focus { border-color:var(--border-lit); }
    .form-textarea {
      min-height:200px; resize:vertical;
      font-family:var(--font-code); font-size:13.5px; line-height:1.7;
    }
    .form-select option { background:var(--bg-deep); }
    .modal-footer {
      padding:20px 28px;
      border-top:1px solid var(--border);
      display:flex; justify-content:flex-end; gap:12px;
    }

    /* ── Notification Toast ── */
    .toast {
      position:fixed; bottom:32px; right:32px; z-index:1100;
      padding:14px 20px; border-radius:12px;
      background:var(--bg-panel); border:1px solid var(--border-lit);
      box-shadow:var(--shadow);
      font-size:14px; display:flex; align-items:center; gap:10px;
      animation:slideIn .3s ease both;
      max-width:320px;
    }
    .toast-icon { font-size:18px; }

    /* ── Tags ── */
    .tag {
      display:inline-block; padding:4px 12px;
      border-radius:100px; font-family:var(--font-code);
      font-size:11px; font-weight:600; border:1px solid;
    }

    /* ── Responsive ── */
    @media(max-width:900px){
      .blog-card.featured { grid-column:span 1; }
      .hero-title { font-size:clamp(36px,8vw,72px); }
      .float-win { display:none; }
    }
    @media(max-width:600px){
      .container { padding:0 16px; }
      .nav { padding:0 16px; }
      .nav-links { display:none; }
      .hero { padding:80px 16px 40px; }
      .hero-stats { gap:24px; flex-wrap:wrap; }
    }

    /* ── Progress Bar ── */
    .read-progress {
      position:fixed; top:58px; left:0; height:2px;
      background:linear-gradient(90deg,var(--cyan),var(--violet),var(--amber));
      z-index:850; transition:width .1s linear;
    }

    /* ── Cursor Follow ── */
    .cursor-glow {
      position:fixed; pointer-events:none; z-index:0;
      width:400px; height:400px; border-radius:50%;
      background:radial-gradient(circle,rgba(0,210,255,.055) 0%,transparent 70%);
      transform:translate(-50%,-50%);
      transition:left .15s ease, top .15s ease;
    }
  `}</style>
);

/* ─── Data ─── */
const TAGS = {
  "Thought Experiment": { color: "#00d2ff", bg: "rgba(0,210,255,.12)" },
  "Deep Dive":          { color: "#ffb700", bg: "rgba(255,183,0,.12)" },
  "Debug Story":        { color: "#ff5f6d", bg: "rgba(255,95,109,.12)" },
  "Architecture":       { color: "#7c5cbf", bg: "rgba(124,92,191,.12)" },
  "Hot Take":           { color: "#00ffb2", bg: "rgba(0,255,178,.12)" },
};

const GRADIENTS = [
  "linear-gradient(135deg,#0d0d2e 0%,#1a0a2e 100%)",
  "linear-gradient(135deg,#0a1628 0%,#0d2040 100%)",
  "linear-gradient(135deg,#1a0a10 0%,#2e0a18 100%)",
  "linear-gradient(135deg,#0a1a10 0%,#0a2e18 100%)",
  "linear-gradient(135deg,#14100a 0%,#281e0a 100%)",
];

const POSTS = [
  {
    id:1, featured:true,
    tag:"Thought Experiment",
    title:"What If Every Function Had a Consciousness Score?",
    excerpt:"Imagine if your compiler could tell you not just whether code compiles, but how 'aware' each function is of its impact on the rest of the system.",
    author:"Arjun Mehta", role:"Systems Philosopher",
    initials:"AM", avatarGrad:"linear-gradient(135deg,#00d2ff,#7c5cbf)",
    date:"Apr 3 2026", readTime:"9 min", views:2847, likes:384, comments:91,
    gradient:0,
    debate:{ q:"Should compilers enforce awareness metrics?", a:"Yes, hard-enforce", b:"Keep it optional", va:61, vb:39 },
    body:`<p>Consciousness in software is a metaphor we keep dancing around without committing to. What if we stopped? What if <strong>every function in your codebase had an awareness score</strong> — a number from 0 to 100 that described how much that function "knows" about its environment, its callers, its side effects?</p>
<h2>The Awareness Spectrum</h2>
<p>A pure function with no dependencies scores a 0 — it is blissfully unaware, living in mathematical paradise. But your DatabaseConnectionManager that knows about environment variables, network state, retry policies, and three different config files? That thing scores an 85. It's practically sentient.</p>
<pre class="post-code">// Awareness Score: 2 (pure, deterministic)
const add = (a, b) => a + b;

// Awareness Score: 78 (reads env, mutates state, talks to network)
class UserService {
  async fetchAndCache(userId) {
    const env = process.env.API_URL; // +10 awareness
    const cached = this.cache.get(userId); // +15 awareness  
    const user = await fetch(env + userId); // +30 awareness
    this.cache.set(userId, user); // +23 awareness
    return user;
  }
}</pre>
<h2>Why This Matters</h2>
<p>Here's the uncomfortable truth: we already intuitively understand awareness in code. We call it "coupling." We call it "cohesion." We draw dependency graphs. But we never give it a <em>number</em> that shows up at compile time, that fails your CI pipeline if a function suddenly becomes too aware of the world around it.</p>
<blockquote>The most dangerous functions in any codebase are the ones that know too much and say too little about it.</blockquote>
<p>Imagine a linter rule: <code>max-awareness: 60</code>. Your function hits 61. Build fails. You're forced to either split the function or explicitly annotate that yes, this function is intentionally complex and you own that decision.</p>`
  },
  {
    id:2,
    tag:"Debug Story",
    title:"48 Hours Chasing a Bug That Didn't Exist",
    excerpt:"The production incident that taught me more about distributed systems than five years of coursework ever did.",
    author:"Priya Nair", role:"Backend Witch",
    initials:"PN", avatarGrad:"linear-gradient(135deg,#ff5f6d,#ffb700)",
    date:"Apr 2 2026", readTime:"12 min", views:5621, likes:892, comments:143,
    gradient:1,
    debate:{ q:"Should we mock network calls in unit tests?", a:"Always mock", b:"Use real calls", va:73, vb:27 },
    body:`<p>It started at 3:47 AM on a Tuesday. Our payments service dropped its error rate from 0.1% to 11% in ninety seconds. By 3:49 I was awake, staring at Grafana dashboards, convinced I had broken production.</p>
<h2>The Phantom Bug</h2>
<p>Every trace looked identical. Requests hitting our service, forwarding to the payment gateway, getting a 200 OK response — and then we logged it as an error. The data said success. Our logs said failure. Something in between was lying.</p>
<pre class="post-code">// The suspicious block — looked innocent enough
if (response.status === 200 && response.body.success) {
  return { ok: true, transactionId: response.body.id };
} else {
  log.error('Payment failed', { status: response.status });
  return { ok: false };
}</pre>
<p>Twelve engineers on a Zoom call, all staring at the same forty lines of code, convinced the bug was in there. It wasn't. The bug was in our <em>assumption about what success meant</em>.</p>`
  },
  {
    id:3,
    tag:"Hot Take",
    title:"Object-Oriented Programming Was a Philosophical Mistake",
    excerpt:"Not a technical argument — a metaphysical one. We modeled software after nouns when the universe runs on verbs.",
    author:"Kaito Yamada", role:"Functional Evangelist",
    initials:"KY", avatarGrad:"linear-gradient(135deg,#00ffb2,#00d2ff)",
    date:"Apr 1 2026", readTime:"7 min", views:12403, likes:1247, comments:328,
    gradient:2,
    debate:{ q:"Is functional programming the future?", a:"Absolutely yes", b:"OOP is fine", va:54, vb:46 },
    body:`<p>I want to be clear: I've written Java for eleven years. I've designed systems with hundreds of classes, deep inheritance hierarchies, factory patterns for my factory patterns. I'm not writing this from ignorance. I'm writing this from the other side.</p>
<h2>The Noun Problem</h2>
<p>When Alan Kay described OOP, he was thinking about <em>message passing</em>. He was thinking about living things communicating. Somewhere between his vision and our industry's adoption, we reduced it to <strong>nouns with methods</strong>. Objects. Things. Dead things with behaviors bolted on.</p>`
  },
  {
    id:4,
    tag:"Architecture",
    title:"Building a System That Forgets Intentionally",
    excerpt:"Designing ephemeral data architectures for privacy-first applications, where forgetting is a feature not a bug.",
    author:"Selin Çelik", role:"Privacy Architect",
    initials:"SC", avatarGrad:"linear-gradient(135deg,#7c5cbf,#ff5f6d)",
    date:"Mar 31 2026", readTime:"11 min", views:3182, likes:441, comments:67,
    gradient:3,
    debate:{ q:"Should user data auto-expire?", a:"Yes, default on", b:"User's choice", va:45, vb:55 },
    body:`<p>Most systems are designed to remember. Databases, caches, logs, backups of backups — we build infrastructure that fights entropy, that preserves state against the chaos of hardware failure and network partition. But what if forgetting was the goal?</p>`
  },
  {
    id:5,
    tag:"Deep Dive",
    title:"Why Your API Response Times Lie to You",
    excerpt:"Percentiles, tail latencies, and the statistical tricks that make your p99 look like a lie your monitoring told you to believe.",
    author:"Marcus Webb", role:"Performance Engineer",
    initials:"MW", avatarGrad:"linear-gradient(135deg,#ffb700,#ff5f6d)",
    date:"Mar 30 2026", readTime:"15 min", views:8934, likes:1103, comments:201,
    gradient:4,
    debate:{ q:"Is p99 a useful metric?", a:"Yes, essential", b:"Use histograms", va:38, vb:62 },
    body:`<p>You're looking at your dashboard. P50 latency: 45ms. Beautiful. P99: 280ms. Acceptable. P99.9: <em>4.7 seconds</em>. You tell yourself that's an outlier. It's not. It's a promise you're breaking to 1 in 1000 users.</p>`
  },
];

const TRENDING = [
  { topic:"Consciousness Scores in Compilers", count:"2.8k posts", pct:88 },
  { topic:"Ephemeral Data Architecture",       count:"1.4k posts", pct:54 },
  { topic:"Tail Latency Myths",                count:"1.1k posts", pct:43 },
  { topic:"Functional vs OOP Debate 2026",     count:"4.2k posts", pct:100 },
  { topic:"Privacy-First System Design",        count:"890 posts",  pct:35 },
];

const ONLINE_USERS = [
  { name:"Arjun Mehta",  action:"Writing a new post",      time:"now",    status:"online" },
  { name:"Priya Nair",   action:"Editing — Bug Chronicles", time:"2m",    status:"online" },
  { name:"Kaito Yamada", action:"Reading Architecture #4",  time:"5m",    status:"online" },
  { name:"Selin Çelik",  action:"Reviewing comments",       time:"12m",   status:"away"   },
  { name:"Marcus Webb",  action:"Last seen",                 time:"1h",   status:"offline"},
];

const DEBATES_PANEL = [
  { q:"Is TypeScript worth the overhead?",       va:68, vb:32 },
  { q:"REST vs GraphQL for microservices?",      va:44, vb:56 },
  { q:"Should tests run before or after code?",  va:81, vb:19 },
];

/* ─── Draggable Hook ─── */
function useDraggable(initPos) {
  const [pos, setPos] = useState(initPos);
  const dragging = useRef(false);
  const offset   = useRef({ x:0, y:0 });
  const ref      = useRef();

  const onMouseDown = useCallback((e) => {
    if (e.target.closest(".win-close")) return;
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  }, [pos]);

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, []);

  return { pos, ref, onMouseDown };
}

/* ─── Float Window ─── */
function FloatWin({ title, children, onClose, initPos, dotColors = ["#ff5f6d","#ffb700","#00ffb2"] }) {
  const { pos, onMouseDown } = useDraggable(initPos);
  return (
    <div className="float-win" style={{ left: pos.x, top: pos.y }}>
      <div className="float-win-header" onMouseDown={onMouseDown}>
        {dotColors.map((c,i) => <div key={i} className="win-dot" style={{ background:c }} />)}
        <span className="win-title">{title}</span>
        <button className="win-close" onClick={onClose}>✕</button>
      </div>
      <div className="float-win-body">{children}</div>
    </div>
  );
}

/* ─── Trending Panel ─── */
function TrendingPanel({ onClose }) {
  return (
    <FloatWin title="trending.json" onClose={onClose} initPos={{ x:28, y:100 }}>
      <div style={{ width:270 }}>
        <div style={{ fontFamily:"var(--font-code)", fontSize:10, color:"var(--text-3)", marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>
          🔥 Hot right now · {new Date().toLocaleTimeString()}
        </div>
        {TRENDING.map((t, i) => (
          <div key={i} className="trend-item">
            <span className="trend-num">#{i+1}</span>
            <div className="trend-info">
              <div className="trend-topic">{t.topic}</div>
              <div className="trend-bar"><div className="trend-bar-fill" style={{ width:`${t.pct}%` }} /></div>
              <div className="trend-count">{t.count}</div>
            </div>
          </div>
        ))}
      </div>
    </FloatWin>
  );
}

/* ─── Online Users Panel ─── */
function UsersPanel({ onClose }) {
  return (
    <FloatWin title="active_users.log" onClose={onClose}
      initPos={{ x: window.innerWidth - 310, y: 100 }}
      dotColors={["#ff5f6d","#ffb700","#00ffb2"]}>
      <div style={{ width:270 }}>
        <div style={{ fontFamily:"var(--font-code)", fontSize:10, color:"var(--text-3)", marginBottom:10, textTransform:"uppercase", letterSpacing:1 }}>
          ◉ {ONLINE_USERS.filter(u=>u.status==="online").length} online now
        </div>
        {ONLINE_USERS.map((u, i) => (
          <div key={i} className="user-row">
            <div className={`user-status status-${u.status}`} />
            <div className="avatar" style={{ background:"rgba(255,255,255,.06)", fontSize:10, width:26, height:26 }}>{u.name.split(" ").map(w=>w[0]).join("")}</div>
            <div className="user-info">
              <div className="user-name">{u.name}</div>
              <div className="user-action">{u.action}</div>
            </div>
            <div className="user-time">{u.time}</div>
          </div>
        ))}
      </div>
    </FloatWin>
  );
}

/* ─── Debate Panel ─── */
function DebatePanel({ onClose }) {
  const [votes, setVotes] = useState({});
  const vote = (qi, side) => setVotes(v => ({ ...v, [qi]: side }));
  return (
    <FloatWin title="live_debates.db" onClose={onClose}
      initPos={{ x:28, y:520 }}
      dotColors={["#7c5cbf","#00d2ff","#ffb700"]}>
      <div style={{ width:290 }}>
        <div style={{ fontFamily:"var(--font-code)", fontSize:10, color:"var(--amber)", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
          ⚡ Community Debates
        </div>
        {DEBATES_PANEL.map((d, i) => (
          <div key={i} className="debate-item">
            <div className="debate-q">{d.q}</div>
            <div className="vote-row">
              <div className={`vote-opt ${votes[i]==="a"?"voted":""}`} onClick={()=>vote(i,"a")}>
                Yes · {votes[i]==="a" ? d.va+1 : d.va}%
              </div>
              <div className={`vote-opt ${votes[i]==="b"?"voted-b":""}`} onClick={()=>vote(i,"b")}>
                No · {votes[i]==="b" ? d.vb+1 : d.vb}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </FloatWin>
  );
}

/* ─── Write Panel ─── */
function WritePanel({ onClose }) {
  const [text, setText] = useState("## My Big Idea\n\nStart writing here...");
  const wc = text.split(/\s+/).filter(Boolean).length;
  return (
    <FloatWin title="new_post.md" onClose={onClose}
      initPos={{ x: window.innerWidth - 380, y: 420 }}
      dotColors={["#00d2ff","#7c5cbf","#ff5f6d"]}>
      <div style={{ width:340 }}>
        <div className="editor-wrap">
          <div className="editor-toolbar">
            {["# H1","## H2","**B**","_I_","` ` code","---"].map(t => (
              <button key={t} className="editor-btn" onClick={()=>setText(p=>p+"\n"+t)}>{t}</button>
            ))}
          </div>
          <textarea
            className="editor-textarea"
            value={text}
            onChange={e=>setText(e.target.value)}
            spellCheck={false}
          />
          <div className="editor-footer">
            <span className="editor-wordcount">{wc} words</span>
            <button className="btn btn-primary" style={{ padding:"5px 14px", fontSize:12 }}>Publish Draft</button>
          </div>
        </div>
      </div>
    </FloatWin>
  );
}

/* ─── Blog Card ─── */
function BlogCard({ post, onClick }) {
  const tag = TAGS[post.tag];
  return (
    <div className={`blog-card ${post.featured?"featured":""}`} onClick={()=>onClick(post)}>
      <div className="card-banner">
        <div className="card-banner-bg" style={{ background: GRADIENTS[post.gradient] }} />
        <div className="card-banner-overlay" />
        <div className="card-tag" style={{ color:tag.color, borderColor:tag.color, background:tag.bg }}>
          {post.tag}
        </div>
      </div>
      <div className="card-body">
        <div className="card-title">{post.title}</div>
        <div className="card-excerpt">{post.excerpt}</div>
        <div className="card-meta">
          <div className="card-author">
            <div className="avatar" style={{ background:post.avatarGrad }}>
              {post.initials}
            </div>
            <div>
              <div className="author-name">{post.author}</div>
              <div className="author-role">{post.role}</div>
            </div>
          </div>
          <div className="card-stats">
            <span className="card-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              {(post.views/1000).toFixed(1)}k
            </span>
            <span className="card-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {post.likes}
            </span>
            <span className="card-stat" style={{ color:"var(--text-3)" }}>{post.readTime} read</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Post View ─── */
function PostView({ post, onBack }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [voted, setVoted] = useState(null);
  const [progress, setProgress] = useState(0);
  const tag = TAGS[post.tag];

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0,0); }, [post]);

  const va = voted === "a" ? post.debate.va+1 : post.debate.va;
  const vb = voted === "b" ? post.debate.vb+1 : post.debate.vb;

  return (
    <>
      <div className="read-progress" style={{ width:`${progress}%` }} />
      <div className="post-view fade-up">
        <div className="post-back" onClick={onBack}>
          ← Back to Feed
        </div>
        <div className="post-header-tag">
          <span className="tag" style={{ color:tag.color, borderColor:tag.color, background:tag.bg }}>
            {post.tag}
          </span>
          <span style={{ color:"var(--text-3)", fontSize:13 }}>{post.date} · {post.readTime} read</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <div className="post-avatar" style={{ background:post.avatarGrad }}>{post.initials}</div>
          <div className="post-author-info">
            <div className="name">{post.author}</div>
            <div className="date">{post.role} · {post.date}</div>
          </div>
          <div className="post-actions">
            <button className={`icon-btn ${liked?"liked":""}`} onClick={()=>setLiked(!liked)} title="Like">
              ♥
            </button>
            <button className={`icon-btn ${bookmarked?"liked":""}`} onClick={()=>setBookmarked(!bookmarked)} title="Bookmark">
              ⊹
            </button>
            <button className="icon-btn" title="Share">⇧</button>
          </div>
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        <div className="post-debate-section">
          <div className="debate-title">⚡ Embedded Debate — Cast Your Vote</div>
          <div className="debate-question">{post.debate.q}</div>
          <div className="debate-options">
            {[
              { key:"a", label:"Option A", text:post.debate.a, pct:va },
              { key:"b", label:"Option B", text:post.debate.b, pct:vb },
            ].map(opt => (
              <div key={opt.key}
                className={`debate-option ${voted===opt.key?"selected":""}`}
                onClick={()=>setVoted(opt.key)}>
                <div className="debate-option-label">{opt.label}</div>
                <div className="debate-option-text">{opt.text}</div>
                <div className="debate-bar">
                  <div className="debate-bar-fill" style={{ width: voted ? `${opt.pct}%` : "0%" }} />
                </div>
                <div className="debate-votes">{voted ? `${opt.pct}% voted` : "Vote to reveal"}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height:80 }} />
      </div>
    </>
  );
}

/* ─── Hero ─── */
function Hero({ onExplore }) {
  return (
    <div className="hero">
      <div className="hero-orb" style={{ width:500, height:500, left:"10%", top:"5%", background:"rgba(0,210,255,.07)", animationDuration:"14s" }} />
      <div className="hero-orb" style={{ width:400, height:400, right:"5%", top:"20%", background:"rgba(124,92,191,.08)", animationDuration:"18s", animationDelay:"-6s" }} />
      <div className="hero-orb" style={{ width:300, height:300, left:"30%", bottom:"10%", background:"rgba(255,183,0,.05)", animationDuration:"10s", animationDelay:"-3s" }} />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-tag fade-up">
          <span style={{ animation:"livepin 2s ease infinite", display:"inline-block", width:7, height:7, borderRadius:"50%", background:"var(--green)" }} />
          Unique Concept: Embedded Debate Threads Inside Every Post
        </div>
        <h1 className="hero-title fade-up-1">
          Where Developers<br />Write <em>Dangerously</em><br /><span className="hi">Good Ideas</span>
        </h1>
        <p className="hero-sub fade-up-2">
          ThoughtForge is a multi-author blogging platform built for technologists who want to share ideas and challenge them — with live, in-post debates that let readers vote on the ideas they just read.
        </p>
        <div className="hero-actions fade-up-3">
          <button className="btn btn-primary" style={{ padding:"13px 28px", fontSize:15 }} onClick={onExplore}>
            Explore Posts ↓
          </button>
          <button className="btn btn-ghost" style={{ padding:"13px 28px", fontSize:15 }}>
            Start Writing →
          </button>
        </div>
        <div className="hero-stats fade-up-3">
          {[["12<span>,400</span>","Posts Published"],["<span>3.2</span>k","Active Writers"],["<span>48</span>k","Debates Cast"],["<span>99</span>%","Open Source"]].map(([v,l],i) => (
            <div key={i} className="stat">
              <span className="stat-val" dangerouslySetInnerHTML={{ __html:v }} />
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Write Modal ─── */
function WriteModal({ onClose, onPublish }) {
  const [form, setForm] = useState({ title:"", tag:"Thought Experiment", excerpt:"", body:"" });
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));
  const submit = () => {
    if (!form.title.trim()) return;
    onPublish(form);
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">New Post</span>
          <button className="btn btn-ghost" style={{ padding:"6px 14px", fontSize:12 }} onClick={onClose}>✕ Cancel</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" placeholder="Your unforgettable title..." value={form.title} onChange={set("title")} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input form-select" value={form.tag} onChange={set("tag")}>
              {Object.keys(TAGS).map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Excerpt</label>
            <input className="form-input" placeholder="One sentence that makes people stop scrolling..." value={form.excerpt} onChange={set("excerpt")} />
          </div>
          <div className="form-group">
            <label className="form-label">Body (Markdown)</label>
            <textarea className="form-input form-textarea" placeholder="Write something that challenges an assumption..." value={form.body} onChange={set("body")} />
          </div>
          <div style={{ background:"var(--bg-deep)", borderRadius:10, padding:"14px 18px", border:"1px solid var(--amber-dim)" }}>
            <div style={{ fontFamily:"var(--font-code)", fontSize:11, color:"var(--amber)", marginBottom:8, textTransform:"uppercase", letterSpacing:1 }}>
              ⚡ Embedded Debate (Unique Feature)
            </div>
            <div style={{ fontSize:13, color:"var(--text-2)", lineHeight:1.6 }}>
              After publishing, readers can vote on your core argument. Set your debate question in post settings. This is what makes ThoughtForge unique — every post has a built-in argument.
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={submit}>
            Publish to ThoughtForge →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ msg, emoji }) {
  return (
    <div className="toast">
      <span className="toast-icon">{emoji}</span>
      <span>{msg}</span>
    </div>
  );
}

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const ref = useRef();
  useEffect(() => {
    const move = e => {
      if(ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" />;
}

/* ─── Main App ─── */
export default function App() {
  const [view, setView]         = useState("home");   // home | feed | post
  const [activePost, setPost]   = useState(null);
  const [navTab, setNavTab]     = useState("Feed");
  const [posts, setPosts]       = useState(POSTS);
  const [showWrite, setWrite]   = useState(false);
  const [toast, setToast]       = useState(null);
  const feedRef = useRef();

  // Floating Windows
  const [wins, setWins] = useState({
    trending: true,
    users:    true,
    debates:  true,
    editor:   false,
  });
  const toggleWin = k => setWins(w=>({...w,[k]:!w[k]}));

  const showToast = (msg, emoji="✅") => {
    setToast({ msg, emoji });
    setTimeout(()=>setToast(null), 3200);
  };

  const openPost = p => {
    setPost(p);
    setView("post");
    setNavTab("Feed");
  };

  const onPublish = form => {
    const np = {
      id: Date.now(), featured:false,
      tag: form.tag, title: form.title || "Untitled",
      excerpt: form.excerpt || "A new thought from the forge.",
      author:"You", role:"New Thinker", initials:"YO",
      avatarGrad:"linear-gradient(135deg,#00d2ff,#00ffb2)",
      date:"Just now", readTime:"1 min", views:1, likes:0, comments:0,
      gradient: Math.floor(Math.random()*5),
      debate:{ q:"What do you think?", a:"Agree", b:"Disagree", va:50, vb:50 },
      body:`<p>${form.body || "No body yet."}</p>`
    };
    setPosts(p=>[np,...p]);
    showToast("Post published to ThoughtForge! 🔥","🚀");
  };

  const goToFeed = () => { setView("feed"); setNavTab("Feed"); feedRef.current?.scrollIntoView({ behavior:"smooth" }); };

  return (
    <>
      <FontLink />
      <GlobalStyles />
      <CursorGlow />

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo" onClick={()=>{setView("home");setNavTab("Home")}} style={{ cursor:"pointer" }}>
          ⬡ Thought<span>Forge</span>
        </div>
        <div className="nav-links">
          {["Home","Feed","Trending","Writers"].map(t => (
            <button key={t} className={`nav-link ${navTab===t?"active":""}`}
              onClick={()=>{setNavTab(t);if(t==="Home")setView("home");if(t==="Feed"||t==="Trending"||t==="Writers")setView("feed");}}>
              {t}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <div className="live-indicator">
            <div className="live-dot" />
            LIVE
          </div>
          <button className="btn btn-ghost" style={{ padding:"6px 14px", fontSize:12 }}
            onClick={()=>toggleWin("trending")}>
            📊 Panels
          </button>
          <button className="btn btn-primary" onClick={()=>setWrite(true)}>
            + Write
          </button>
        </div>
      </nav>

      {/* ── FLOATING WINDOWS ── */}
      {wins.trending && <TrendingPanel onClose={()=>toggleWin("trending")} />}
      {wins.users    && <UsersPanel    onClose={()=>toggleWin("users")} />}
      {wins.debates  && <DebatePanel   onClose={()=>toggleWin("debates")} />}
      {wins.editor   && <WritePanel    onClose={()=>toggleWin("editor")} />}

      {/* ── PAGES ── */}
      <div className="page">
        {view === "home" && (
          <>
            <Hero onExplore={goToFeed} />
            <div ref={feedRef} />
            <div className="container">
              <div className="section-head">
                <h2 className="section-title">Latest from the Forge</h2>
                <span className="section-badge">⚡ {posts.length} posts · live</span>
              </div>
              <div className="blog-grid">
                {posts.map(p => <BlogCard key={p.id} post={p} onClick={openPost} />)}
              </div>
            </div>
          </>
        )}

        {view === "feed" && (
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">All Posts</h2>
              <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                <span className="section-badge">⚡ {posts.length} total</span>
                <button className="btn btn-ghost" style={{ padding:"6px 14px", fontSize:12 }}
                  onClick={()=>toggleWin("editor")}>
                  🖊 Quick Write
                </button>
              </div>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
              {["All",...Object.keys(TAGS)].map(tag => (
                <button key={tag} className="btn btn-ghost" style={{ padding:"5px 14px", fontSize:12 }}>
                  {tag}
                </button>
              ))}
            </div>
            <div className="blog-grid">
              {posts.map(p => <BlogCard key={p.id} post={p} onClick={openPost} />)}
            </div>
          </div>
        )}

        {view === "post" && activePost && (
          <PostView post={activePost} onBack={()=>setView("home")} />
        )}
      </div>

      {/* ── WRITE MODAL ── */}
      {showWrite && <WriteModal onClose={()=>setWrite(false)} onPublish={onPublish} />}

      {/* ── TOAST ── */}
      {toast && <Toast msg={toast.msg} emoji={toast.emoji} />}
    </>
  );
}
