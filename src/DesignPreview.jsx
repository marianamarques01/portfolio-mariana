import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   Página de preview dos 4 modelos de design para cards de projeto
   Acesse via: /#design-preview
   ═══════════════════════════════════════════════════════════════ */

const SAMPLE_PROJECTS = [
  { tag: "Mobile · Social", title: "Collecty Card", brief: "Sistema de vendas + rede social para colecionadores de cards de K-pop.", tech: ["Figma", "TypeScript", "Angular", "Firebase"], color: "#ec4899" },
  { tag: "EdTech · PWA", title: "ENEM Pet", brief: "Plataforma gamificada com pet virtual para preparação do ENEM.", tech: ["React", "TypeScript", "Supabase", "PWA"], color: "#6366f1" },
  { tag: "Plataforma · Publicação", title: "Reppub", brief: "Plataforma de republicação e curadoria de conteúdo.", tech: ["React", "TypeScript", "REST APIs"], color: "#06b6d4" },
];

const GITHUB_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ARROW_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
.preview-page{--bg:#0A0A0B;--bg-card:#161618;--border:#27272A;--text:#FAFAFA;--text-muted:#A1A1AA;--accent:#00ACC1;font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:40px 24px 80px}
.preview-page *{box-sizing:border-box}
.preview-header{text-align:center;margin-bottom:56px}
.preview-header h1{font-size:28px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px}
.preview-header p{color:var(--text-muted);font-size:15px}
.preview-header a{color:var(--accent);text-decoration:none;font-weight:500;margin-top:16px;display:inline-block}
.preview-header a:hover{text-decoration:underline}
.preview-section{margin-bottom:80px}
.preview-section-title{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px}
.preview-section h2{font-size:22px;font-weight:700;letter-spacing:-.02em;margin-bottom:8px}
.preview-section-desc{color:var(--text-muted);font-size:14px;margin-bottom:32px;max-width:560px}
.preview-grid{display:grid;gap:24px;max-width:1200px;margin:0 auto}
.preview-grid-2{grid-template-columns:repeat(2,1fr)}
.preview-grid-3{grid-template-columns:repeat(3,1fr)}
@media(max-width:768px){.preview-grid-2,.preview-grid-3{grid-template-columns:1fr}}
.img-placeholder{background:linear-gradient(135deg,var(--border) 0%,#1a1a1c 100%);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:12px;font-family:'JetBrains Mono',monospace}
.img-placeholder.square{aspect-ratio:4/3}
.tag{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px}
.card-title{font-size:18px;font-weight:700;letter-spacing:-.02em;margin-bottom:8px}
.card-brief{font-size:13px;color:var(--text-muted);line-height:1.6}
.card-tech{display:inline-flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.card-tech span{padding:4px 8px;background:rgba(0,172,193,.1);border:1px solid rgba(0,172,193,.15);border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent)}
`;

// ─── Modelo 1: Horizontal (imagem à esquerda) ───
function CardModel1({ p }) {
  return (
    <div className="preview-card-1" style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", minHeight: 200 }}>
      <div style={{ flex: "0 0 45%", minWidth: 0 }}>
        <div className="img-placeholder square" style={{ height: "100%", aspectRatio: "4/3" }}>Imagem</div>
      </div>
      <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <span className="tag">{p.tag}</span>
            <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--text-muted)", padding: 6 }} aria-label="GitHub">{GITHUB_ICON}</a>
          </div>
          <h3 className="card-title">{p.title}</h3>
          <p className="card-brief">{p.brief}</p>
        </div>
        <div className="card-tech">{p.tech.slice(0, 3).map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
    </div>
  );
}

// ─── Modelo 2: Compacto com hover (imagem + título, reveal no hover) ───
function CardModel2({ p }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="preview-card-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "all .35s ease",
      }}
    >
      <div style={{ position: "relative" }}>
        <div className="img-placeholder" style={{ background: `linear-gradient(135deg, ${p.color}30 0%, ${p.color}08 100%)` }}>Imagem</div>
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="card-title" style={{ color: "white", margin: 0, textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>{p.title}</h3>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "rgba(255,255,255,.9)", padding: 6 }} aria-label="GitHub">{GITHUB_ICON}</a>
        </div>
      </div>
      <div style={{
        maxHeight: hover ? 120 : 0,
        overflow: "hidden",
        transition: "max-height .35s ease",
        borderTop: "1px solid var(--border)",
      }}>
        <div style={{ padding: 20 }}>
          <p className="card-brief" style={{ marginBottom: 12 }}>{p.brief}</p>
          <div className="card-tech">{p.tech.slice(0, 3).map((t, i) => <span key={i}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Modelo 3: Bento (tamanhos variados) ───
function CardModel3({ p, size = "normal" }) {
  const isLarge = size === "large";
  return (
    <div style={{
      gridColumn: isLarge ? "span 2" : "span 1",
      gridRow: isLarge ? "span 2" : "span 1",
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      overflow: "hidden",
      display: "flex",
      flexDirection: isLarge ? "column" : "column",
      minHeight: isLarge ? 320 : 200,
    }}>
      <div className="img-placeholder" style={{ flex: isLarge ? "1 1 60%" : "0 0 auto", background: `linear-gradient(135deg, ${p.color}25 0%, ${p.color}08 100%)` }}>
        Imagem {isLarge ? "(destaque)" : ""}
      </div>
      <div style={{ padding: isLarge ? 28 : 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span className="tag">{p.tag}</span>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--text-muted)" }} aria-label="GitHub">{GITHUB_ICON}</a>
        </div>
        <h3 className="card-title" style={{ fontSize: isLarge ? 22 : 18 }}>{p.title}</h3>
        <p className="card-brief" style={{ marginTop: 8, marginBottom: 12 }}>{p.brief}</p>
        <div className="card-tech">{p.tech.slice(0, 3).map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
    </div>
  );
}

// ─── Modelo 4: Lista (imagem lateral) ───
function CardModel4({ p }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "stretch",
      gap: 24,
      padding: "20px 0",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="img-placeholder square" style={{ width: 160, flexShrink: 0, background: `linear-gradient(135deg, ${p.color}25 0%, ${p.color}08 100%)` }}>Img</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span className="tag">{p.tag}</span>
          <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--text-muted)" }} aria-label="GitHub">{GITHUB_ICON}</a>
        </div>
        <h3 className="card-title">{p.title}</h3>
        <p className="card-brief">{p.brief}</p>
        <div className="card-tech" style={{ marginTop: 12 }}>{p.tech.slice(0, 3).map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", color: "var(--text-muted)" }}>{ARROW_ICON}</div>
    </div>
  );
}

export default function DesignPreview() {
  return (
    <div className="preview-page">
      <style>{styles}</style>
      <header className="preview-header">
        <h1>Preview: modelos de cards</h1>
        <p>4 sugestões de design para a seção de portfólio</p>
        <a href="#hero">← Voltar ao portfólio</a>
      </header>

      <section className="preview-section" style={{ maxWidth: 900, margin: "0 auto 80px" }}>
        <span className="preview-section-title">Modelo 1</span>
        <h2>Horizontal (imagem à esquerda)</h2>
        <p className="preview-section-desc">Imagem à esquerda, conteúdo à direita. Visual editorial, como um case study.</p>
        <div className="preview-grid preview-grid-2">
          {SAMPLE_PROJECTS.map((p, i) => (
            <CardModel1 key={i} p={p} />
          ))}
        </div>
      </section>

      <section className="preview-section" style={{ maxWidth: 900, margin: "0 auto 80px" }}>
        <span className="preview-section-title">Modelo 2</span>
        <h2>Compacto com hover</h2>
        <p className="preview-section-desc">Só imagem + título visíveis. Brief e techs aparecem no hover.</p>
        <div className="preview-grid preview-grid-3">
          {SAMPLE_PROJECTS.map((p, i) => (
            <CardModel2 key={i} p={p} />
          ))}
        </div>
      </section>

      <section className="preview-section" style={{ maxWidth: 1000, margin: "0 auto 80px" }}>
        <span className="preview-section-title">Modelo 3</span>
        <h2>Grid bento (tamanhos variados)</h2>
        <p className="preview-section-desc">Cards assimétricos: alguns maiores em destaque, outros compactos.</p>
        <div className="preview-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(160px, auto)" }}>
          <CardModel3 p={SAMPLE_PROJECTS[0]} size="large" />
          <CardModel3 p={SAMPLE_PROJECTS[1]} />
          <CardModel3 p={SAMPLE_PROJECTS[2]} />
        </div>
      </section>

      <section className="preview-section" style={{ maxWidth: 800, margin: "0 auto" }}>
        <span className="preview-section-title">Modelo 4</span>
        <h2>Lista (imagem lateral)</h2>
        <p className="preview-section-desc">Layout em lista: imagem à esquerda, conteúdo à direita, linha entre cards.</p>
        <div>
          {SAMPLE_PROJECTS.map((p, i) => (
            <CardModel4 key={i} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
