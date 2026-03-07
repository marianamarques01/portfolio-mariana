import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   MARIANA MARQUES — Portfolio
   Frontend Engineer & UI/UX Designer
   Aesthetic: Luxury dark minimal · Stripe/Linear/Vercel inspired
   ═══════════════════════════════════════════════════════════════ */

// ─── Project icons (Lucide-style SVGs) ─
const PROJECT_ICONS = {
  cards: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="14" height="18" rx="2"/><rect x="8" y="2" width="14" height="18" rx="2"/></svg>,
  game: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h4v4"/><path d="M8 10V8"/><path d="M15 13h.01"/><path d="M18 11h.01"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
  factory: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20V8l6-4 6 4v12"/><path d="M14 20V8l6-4"/><path d="M6 20V12h4v8"/><path d="M14 12v8h4v-8"/></svg>,
  iot: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>,
  chart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
  newspaper: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>,
  building: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  "shopping-cart": <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
};

// ─── Links ─
const LINKS = {
  github: "https://github.com/marianamarques01",
  linkedin: "https://www.linkedin.com/in/mariana-marques-dev/",
  behance: "https://www.behance.net/marianamarques108",
  whatsapp: "https://wa.me/5531984946938",
  cvPt: "/CV Mariana 2026 pt.pdf",
  cvEn: "/CV Mariana.pdf",
};

// ─── i18n Content ────────────────────────────────────────────
const content = {
  pt: {
    nav: { home: "Home", about: "Sobre", projects: "Portfólio", contributions: "Contribuições", snacks: "Snacks", experience: "Experiência", contact: "Contato" },
    hero: {
      intro: "Sou",
      name: "Mariana Marques,",
      subtitle: "que constrói soluções úteis e agradáveis aos olhos.",
      roles: ["UI/UX Designer", "Dev Front-end", "Product thinker"],
      role: "Desenvolvedora Fullstack",
      desc: "Desenvolvedora Fullstack apaixonada por criar soluções inovadoras e impactantes. Especializada em desenvolvimento web moderno e arquitetura de sistemas escaláveis. Com experiência em UI/UX design.",
      ctaContact: "Entre em contato",
      cvDownload: "Baixar CV",
      dragHint: "Arraste para mover",
      scrollHint: "Role para explorar",
    },
    about: {
      label: "Sobre mim",
      title: "Design com engenharia.\nEngenharia com propósito.",
      p1: "Sou desenvolvedora full stack com forte atuação em frontend, e com formação em Ciência da Computação. Ao longo da minha trajetória, trabalhei em produtos que vão de plataformas educacionais a sistemas industriais de IoT, sempre buscando criar soluções que funcionem bem no uso cotidiano.",
      p2: "No desenvolvimento de interfaces, gosto de olhar além da implementação: procuro entender o fluxo do usuário, sugerir melhorias de usabilidade e considerar acessibilidade desde os primeiros componentes.",
      p3: "Busco equilibrar cuidado com a experiência visual e atenção aos aspectos técnicos, entregando código organizado, testado e preparado para evoluir com o projeto.",
      highlights: [
        { num: "3+", label: "Anos em\nprodução" },
        { num: "5+", label: "Produtos\nlançados" },
        { num: "C2", label: "Inglês\nfluente" },
      ],
      codeComment1: "// meu processo",
    },
    achievement: {
      text: "Também tive a honra de ser reconhecida como empreendedora destaque no LAUNCHX, programa de pré-aceleração da RAJA, com mais de 200 projetos inscritos — e também de receber um aporte de investimento inicial.",
    },
    stack: {
      label: "Stack técnica",
      title: "Ferramentas que domino",
      subtitle: "Tecnologias que uso diariamente para construir produtos digitais de alto nível.",
      categories: { frontend: "Frontend", backend: "Backend", tools: "Outros" },
    },
    projects: {
      label: "Projetos",
      title: "Cases selecionados",
      subtitle: "Cada projeto é uma história de problema, processo e resultado.",
      viewCase: "Ver case completo",
      close: "Fechar",
      labels: { problem: "Problema", role: "Minha atuação", result: "Resultado", tech: "Tecnologias" },
      items: [
        {
          tag: "Mobile · Social", title: "Collecty Card", icon: "cards", color: "#ec4899",
          image: "/projects/collectycard.png",
          brief: "Sistema de vendas + rede social para colecionadores de cards de K-pop.",
          problem: "As vendas de cards K-pop acontecem de forma informal em redes sociais, sem organização, segurança ou eficiência para colecionadores e vendedores.",
          role: "Design completo no Figma, desenvolvimento do app com Angular + Ionic e TypeScript, integração com Firebase. Landing page com vídeo demonstrativo e documentação das telas.",
          tech: ["Figma", "TypeScript", "Angular", "Firebase", "Ionic"],
          result: "O vídeo de apresentação ultrapassou 25 mil visualizações no Twitter com diversos comentários positivos da comunidade. Solução completa para fãs e vendedores.",
        },
        {
          tag: "EdTech · PWA · Mobile", title: "Broto", icon: "game", color: "#6366f1",
          image: "/projects/broto.png",
          brief: "Plataforma gamificada com pet virtual para preparação do ENEM. Versão web (PWA) e app mobile.",
          problem: "Estudantes brasileiros têm dificuldade em manter consistência nos estudos para o ENEM, levando à desmotivação e baixo desempenho.",
          role: "Arquitetura completa do frontend (web e mobile), design do sistema de gamificação com pet virtual (Broto), integração com banco de 1.800+ questões históricas, dashboards de performance e planejador de rotina com IA. Desenvolvimento do app mobile com React Native.",
          tech: ["React", "React Native", "TypeScript", "Supabase", "PWA", "Vite"],
          result: "Plataforma gamificada com 5 módulos integrados, versão PWA e app mobile (React Native), uso offline e vínculo emocional que aumenta retenção de estudo.",
        },
        {
          tag: "App · Moradia", title: "Reppub", icon: "building", color: "#06b6d4",
          image: "/projects/reppub.png",
          brief: "App para conectar pessoas em busca de moradia compartilhada e facilitar a formação de repúblicas.",
          problem: "Pessoas que buscam moradia compartilhada ou repúblicas tinham dificuldade para se conectar e encontrar companheiros de casa de forma prática e segura.",
          role: "Desenvolvimento frontend do app, design de interfaces e integração com APIs. Implementação de fluxos de busca, perfis e conexão entre usuários.",
          tech: ["React", "TypeScript", "REST APIs"],
          result: "App funcional que conecta pessoas em busca de moradia compartilhada e facilita a formação de repúblicas.",
        },
        {
          tag: "Freelancer · Institucional", title: "Liderban", icon: "building", color: "#14b8a6",
          image: "/projects/liderban.png",
          link: "https://liderban.netlify.app/",
          brief: "Soluções de saneamento móvel: banheiros móveis (linhas polietileno e modular) e estruturas modulares com design customizado.",
          problem: "A Liderban precisava de presença digital profissional para apresentar seus serviços de saneamento móvel, banheiros móveis e estruturas modulares, transmitindo credibilidade e facilitando o contato com clientes.",
          role: "Design e desenvolvimento completo do site institucional. Estruturação de páginas de serviços (banheiros móveis, estruturas modulares), formulários de contato e integração com identidade visual da marca.",
          tech: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
          result: "Site moderno e responsivo que comunica as soluções da empresa (saneamento móvel, bem-estar e estruturas modulares) e reforça sua imagem no mercado.",
        },
        {
          tag: "Freelancer · Institucional", title: "SWS Segurança", icon: "shield", color: "#0ea5e9",
          image: "/projects/sws.png",
          link: "https://swsseguranca.com.br/",
          brief: "Site institucional para empresa de segurança.",
          problem: "A SWS Segurança precisava de um site que apresentasse seus serviços e transmitisse confiança no segmento de segurança.",
          role: "Design e desenvolvimento do site institucional. Páginas de serviços, sobre a empresa e canais de contato com layout profissional.",
          tech: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
          result: "Site institucional que comunica profissionalismo e credibilidade da marca.",
        },
      ],
    },
    contributions: {
      label: "Contribuições recentes",
      title: "Projetos em que contribuí",
      subtitle: "Sistemas e plataformas em que atuei no último ano.",
      imageNote: "Nem todos os projetos exibem imagem por serem de propriedade das empresas em que atuei.",
      items: [
        { name: "Sistema LMS White Label", tag: "EdTech · Plataforma", brief: "Plataforma de aprendizagem white label utilizada no projeto Desenvolve.", color: "#00ACC1", icon: "chart", image: "/projects/lms.png", imageAlign: "left" },
        { name: "My Coach", tag: "IA · Mentoria", brief: "Aplicativo de mentoria e acompanhamento de escolas, alunos etc. com suporte de IA.", color: "#14b8a6", icon: "game", image: "/projects/mycoach.png", imageAlign: "left" },
        { name: "EduGenerator", tag: "EdTech · IA", brief: "Ferramenta de geração de conteúdo educacional com inteligência artificial.", color: "#6366f1", icon: "game" },
        { name: "EduFlow", tag: "EdTech · Gestão", brief: "Plataforma de fluxos de aprendizagem e gestão educacional, com geração de material didático a partir de IA.", color: "#06b6d4", icon: "newspaper" },
        { name: "SGA", tag: "Corporativo · Gestão", brief: "Sistema de gestão acadêmica e administrativa.", color: "#8b5cf6", icon: "building" },
        { name: "Alegria Telecom Dashboard", tag: "Telecom · BI", brief: "Dashboard de visualização e análise de dados para a Alegria Telecom.", color: "#0ea5e9", icon: "chart" },
      ],
    },
    thinking: {
      label: "Mentalidade", title: "Como eu penso produto",
      subtitle: "Não escrevo apenas código. Penso no porquê de cada decisão.",
      items: [
        { icon: "◎", title: "UX como fundação", desc: "Toda interface começa pelo problema do usuário. Antes de abrir o editor, eu mapeio fluxos, questiono decisões de design e proponho melhorias que reduzem fricção." },
        { icon: "♿", title: "Acessibilidade nativa", desc: "Aria-labels, navegação por teclado, contraste adequado — não são extras, são requisitos. Construo componentes acessíveis desde o primeiro commit." },
        { icon: "◆", title: "Clean Code & SOLID", desc: "Código é comunicação. Nomeio com intenção, separo responsabilidades, escrevo testes e documento. Meu código é feito para ser mantido por outros." },
        { icon: "⬡", title: "Arquitetura escalável", desc: "Componentização inteligente, design patterns, separação de camadas. Penso em como o sistema vai crescer antes de escrever a primeira linha." },
        { icon: "△", title: "Performance obsessiva", desc: "Lazy loading, code splitting, otimização de re-renders. Cada milissegundo conta quando o objetivo é uma experiência premium." },
        { icon: "◇", title: "Colaboração real", desc: "Trabalho lado a lado com designers, PMs e engenheiros backend. Traduzo requisitos de negócio em soluções técnicas elegantes." },
      ],
    },
    experience: {
      label: "Trajetória", title: "Experiência profissional",
      items: [
        { period: "Abr 2025 — Presente", company: "PEC TEC", role: "Desenvolvedora Frontend & UI/UX Designer", desc: "Design e desenvolvimento de sistemas digitais, ambientes virtuais de aprendizagem e plataformas de gestão para startups.", current: true },
        { period: "Out 2024 — Jan 2025", company: "VALE", role: "Estagiária de BI e Desenvolvimento", desc: "Dashboards, aplicações internas e rotinas automatizadas para a área de Suprimentos." },
        { period: "Jan 2023 — Out 2024", company: "green4T", role: "Estagiária de Soluções de Desenvolvimento", desc: "Programação de placas IoT integradas a interfaces web. Design UI/UX de aplicações de monitoramento de dispositivos." },
        { period: "Abr 2022 — Dez 2022", company: "Teknisa", role: "Estagiária de Desenvolvimento Full Stack", desc: "Desenvolvimento frontend e backend para sistemas corporativos do setor alimentício. Integração com APIs REST e participação no design de interfaces." },
      ],
    },
    contact: {
      label: "Contato", title: "Vamos construir\nalgo incrível juntos?",
      subtitle: "Estou aberta a oportunidades em frontend engineering, design systems e produtos digitais.",
      email: "mariana.msamp@gmail.com", cta: "Enviar e-mail",
    },
    footer: { title: "Obrigada por visitar meu portfólio!", subtitle: "Sinta-se à vontade para entrar em contato comigo se estiver procurando um desenvolvedor, tiver alguma dúvida ou simplesmente quiser se conectar.", cta: "Fale comigo no LinkedIn", credits: "Projetado & desenvolvido por Mariana Marques", rights: "© 2026 — Todos os direitos reservados" },
  },
  en: {
    nav: { home: "Home", about: "About", projects: "Portfolio", contributions: "Contributions", snacks: "Snacks", experience: "Experience", contact: "Contact" },
    hero: {
      intro: "I'm",
      name: "Mariana Marques,",
      subtitle: "who builds useful and eye-pleasing solutions.",
      roles: ["UI/UX Designer", "Front-end Dev", "Product thinker"],
      role: "Fullstack Developer",
      desc: "Fullstack Developer passionate about creating innovative and impactful solutions. Specialized in modern web development and scalable system architecture. With experience in UI/UX design.",
      ctaContact: "Get in touch",
      cvDownload: "Download CV",
      dragHint: "Drag to move",
      scrollHint: "Scroll to explore",
    },
    about: {
      label: "About me", title: "Design with engineering.\nEngineering with purpose.",
      p1: "I'm a full stack developer with a strong frontend focus, with a degree in Computer Science. Throughout my career, I've worked on products ranging from educational platforms to industrial IoT systems, always seeking to create solutions that work well in everyday use.",
      p2: "In interface development, I like to look beyond implementation: I seek to understand the user flow, suggest usability improvements, and consider accessibility from the first components.",
      p3: "I collaborate easily with designers, backend developers, and product teams. I aim to balance care for the visual experience with attention to technical aspects, delivering organized, tested code that's ready to evolve with the project.",
      highlights: [
        { num: "3+", label: "Years in\nproduction" },
        { num: "5+", label: "Products\nshipped" },
        { num: "C2", label: "English\nproficiency" },
      ],
      codeComment1: "// my process",
    },
    achievement: {
      label: "Recognition",
      text: "Last month, I had the honor of being recognized as a standout entrepreneur in LAUNCHX, RAJA's pre-acceleration program, with over 200 projects enrolled — and of receiving an initial investment.",
    },
    stack: {
      label: "Tech stack", title: "Tools I master",
      subtitle: "Technologies I use daily to build high-quality digital products.",
      categories: { frontend: "Frontend", backend: "Backend", tools: "Tools & Practices" },
    },
    projects: {
      label: "Projects", title: "Selected cases",
      subtitle: "Each project is a story of problem, process, and outcome.",
      viewCase: "View full case", close: "Close",
      labels: { problem: "Problem", role: "My role", result: "Outcome", tech: "Technologies" },
      items: [
        {
          tag: "Mobile · Social", title: "Collecty Card", icon: "cards", color: "#ec4899",
          image: "/projects/collectycard.png",
          brief: "Sales system + social network for K-pop card collectors.",
          problem: "K-pop card sales happen informally on social media, without organization, security or efficiency for collectors and sellers.",
          role: "Complete design in Figma, app development with Angular + Ionic and TypeScript, Firebase integration. Landing page with demo video and screen documentation.",
          tech: ["Figma", "TypeScript", "Ionic", "Firebase"],
          result: "The presentation video exceeded 25k views on Twitter with positive feedback from the community. Complete solution for fans and sellers.",
        },
        {
          tag: "EdTech · PWA · Mobile", title: "Broto", icon: "game", color: "#6366f1",
          image: "/projects/broto.png",
          brief: "Gamified platform with virtual pet for ENEM exam preparation. Web (PWA) and mobile app.",
          problem: "Brazilian students struggle to maintain consistency in their ENEM exam preparation, leading to demotivation and poor performance.",
          role: "Complete frontend architecture (web and mobile), gamification system design with virtual pet (Broto), integration with 1,800+ historical questions database, performance dashboards and AI-powered study planner. Mobile app development with React Native.",
          tech: ["React", "React Native", "TypeScript", "Supabase", "PWA", "Vite"],
          result: "Gamified platform with 5 integrated modules, PWA and mobile app (React Native), offline support and emotional bonding that increases study retention.",
        },
        {
          tag: "App · Housing", title: "Reppub", icon: "building", color: "#06b6d4",
          image: "/projects/reppub.png",
          brief: "App to connect people looking for shared housing and facilitate forming shared living arrangements.",
          problem: "People seeking shared housing or roommates had difficulty connecting and finding compatible housemates in a practical and safe way.",
          role: "Frontend development of the app, interface design and API integration. Implementation of search flows, profiles and user matching.",
          tech: ["React", "TypeScript", "REST APIs"],
          result: "Functional app that connects people looking for shared housing and facilitates forming shared living arrangements.",
        },
        {
          tag: "Freelance · Corporate", title: "Liderban", icon: "building", color: "#14b8a6",
          image: "/projects/liderban.png",
          link: "https://liderban.netlify.app/",
          brief: "Mobile sanitation solutions: mobile bathrooms (polyethylene and modular lines) and modular structures with custom design.",
          problem: "Liderban needed a professional digital presence to present its mobile sanitation, mobile bathroom and modular structure services, conveying credibility and facilitating client contact.",
          role: "Complete design and development of the corporate website. Service pages (mobile bathrooms, modular structures), contact forms and brand identity integration.",
          tech: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
          result: "Modern, responsive site that communicates the company's solutions (mobile sanitation, wellbeing and modular structures) and reinforces its market image.",
        },
        {
          tag: "Freelance · Corporate", title: "SWS Segurança", icon: "shield", color: "#0ea5e9",
          image: "/projects/sws.png",
          link: "https://swsseguranca.com.br/",
          brief: "Corporate website for a security company.",
          problem: "SWS Segurança needed a site to present its services and convey trust in the security segment.",
          role: "Design and development of the corporate website. Service pages, about the company and contact channels with professional layout.",
          tech: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
          result: "Corporate site that communicates professionalism and brand credibility.",
        },
      ],
    },
    contributions: {
      label: "Recent contributions",
      title: "Projects I've contributed to",
      subtitle: "Systems and platforms I've worked on in the last year.",
      imageNote: "Not all projects display an image as they are property of the companies I've worked with.",
      items: [
        { name: "LMS White Label System", tag: "EdTech · Platform", brief: "White-label learning platform used in the Desenvolve project.", color: "#00ACC1", icon: "chart", image: "/projects/lms.png", imageAlign: "left" },
        { name: "My Coach", tag: "IA · Mentoring", brief: "Mentoring and follow-up app for schools, students and more, with AI support.", color: "#14b8a6", icon: "game", image: "/projects/mycoach.png", imageAlign: "left" },
        { name: "EduGenerator", tag: "EdTech · AI", brief: "Educational content generation tool with artificial intelligence.", color: "#6366f1", icon: "game" },
        { name: "EduFlow", tag: "EdTech · Management", brief: "Learning flows and educational management platform, with AI-powered educational material generation.", color: "#06b6d4", icon: "newspaper" },
        { name: "SGA", tag: "Enterprise · Management", brief: "Academic and administrative management system.", color: "#8b5cf6", icon: "building" },
        { name: "Alegria Telecom Dashboard", tag: "Telecom · BI", brief: "Data visualization and analysis dashboard for Alegria Telecom.", color: "#0ea5e9", icon: "chart" },
      ],
    },
    thinking: {
      label: "Mindset", title: "How I think product",
      subtitle: "I don't just write code. I think about the why behind every decision.",
      items: [
        { icon: "◎", title: "UX as foundation", desc: "Every interface starts with the user's problem. Before opening the editor, I map flows, question design decisions and propose improvements that reduce friction." },
        { icon: "♿", title: "Native accessibility", desc: "Aria-labels, keyboard navigation, proper contrast — these aren't extras, they're requirements. I build accessible components from the first commit." },
        { icon: "◆", title: "Clean Code & SOLID", desc: "Code is communication. I name with intention, separate responsibilities, write tests and document. My code is meant to be maintained by others." },
        { icon: "⬡", title: "Scalable architecture", desc: "Smart componentization, design patterns, layer separation. I think about how the system will grow before writing the first line." },
        { icon: "△", title: "Performance obsession", desc: "Lazy loading, code splitting, re-render optimization. Every millisecond counts when the goal is a premium experience." },
        { icon: "◇", title: "Real collaboration", desc: "I work side by side with designers, PMs and backend engineers. I translate business requirements into elegant technical solutions." },
      ],
    },
    experience: {
      label: "Journey", title: "Professional experience",
      items: [
        { period: "Apr 2025 — Present", company: "PEC TEC", role: "Frontend Developer & UI/UX Designer", desc: "Design and development of digital systems, virtual learning environments and management platforms for startups.", current: true },
        { period: "Oct 2024 — Jan 2025", company: "VALE", role: "BI & Development Intern", desc: "Dashboards, internal applications and automated routines for the Supply division." },
        { period: "Jan 2023 — Oct 2024", company: "green4T", role: "Development Solutions Intern", desc: "IoT board programming integrated with web interfaces. UI/UX design of device monitoring applications." },
        { period: "Apr 2022 — Dec 2022", company: "Teknisa", role: "Full Stack Development Intern", desc: "Frontend and backend development for enterprise food industry systems. REST API integration and interface design participation." },
      ],
    },
    contact: {
      label: "Contact", title: "Let's build\nsomething amazing together?",
      subtitle: "I'm open to opportunities in frontend engineering, design systems and digital products.",
      email: "mariana.msamp@gmail.com", cta: "Send email",
    },
    footer: { title: "Thanks for visiting my portfolio!", subtitle: "Feel free to get in touch if you're looking for a developer, have any questions or simply want to connect.", cta: "Talk to me on LinkedIn", credits: "Designed & built by Mariana Marques", rights: "© 2026 — All rights reserved" },
  },
};

// ─── Tech Stack Data with SVG Icons ──────────────────────────
const stackData = {
  frontend: [
    { name: "React", svg: `<circle cx="16" cy="16" r="2.5" fill="currentColor"/><ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.3"/><ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate(120 16 16)"/>` },
    { name: "TypeScript", svg: `<rect x="3" y="3" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="16" y="21.5" text-anchor="middle" font-size="13" font-weight="800" font-family="ui-monospace,monospace" fill="currentColor">TS</text>` },
    { name: "JavaScript", svg: `<rect x="3" y="3" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="16" y="21.5" text-anchor="middle" font-size="13" font-weight="800" font-family="ui-monospace,monospace" fill="currentColor">JS</text>` },
    { name: "HTML5", svg: `<path d="M6.5 4l2 22L16 28l7.5-2 2-22z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10.5 8.5h11l-.5 5.5h-8l.3 3.5L16 19l3-1.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>` },
    { name: "CSS3", svg: `<path d="M6.5 4l2 22L16 28l7.5-2 2-22z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M22 8.5H10l.4 4h10.3l-.6 7.5L16 22l-4-2-.2-3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>` },
    { name: "SASS", svg: `<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12 20c1-1.5 5-3 5-5s-2-3-3.5-2.5c-2 .7-.5 3 2 3.5s4-.5 4-2.5-1-3-3-4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>` },
    { name: "Redux", svg: `<path d="M21 22c1-2 .5-4.5-1.5-5.5M11 22c-1-2-.5-4.5 1.5-5.5M16 12c0-2.5-1-5-3.5-5.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="20" cy="23" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="23" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="15" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/>` },
    { name: "Jest", svg: `<path d="M11 5h10l-5 11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="16" cy="22" r="4.5" fill="none" stroke="currentColor" stroke-width="1.4"/>` },
    { name: "Figma", svg: `<rect x="9" y="4" width="7" height="8" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="16" y="4" width="7" height="8" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="12" width="7" height="8" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="19.5" cy="16" r="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="20" width="7" height="8" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.3"/>` },
    { name: "MFEs", svg: `<rect x="3" y="3" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="18" y="3" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="3" y="18" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="18" y="18" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/>` },
    { name: "Next.js", svg: `<path d="M10 6l14 10-14 10V6z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>` },
    { name: "Angular", svg: `<path d="M16 4l-12 6 3 14 10 4 10-4 3-14z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M16 10l-5 12h10z" fill="none" stroke="currentColor" stroke-width="1.2"/>` },
    { name: "Ionic", svg: `<path d="M16 4L6 16l10 12 10-12z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M16 10v12M11 16l5-6 5 6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>` },
  ],
  backend: [
    { name: "Node.js", svg: `<path d="M16 3L5 9.5v13L16 29l11-6.5v-13z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><text x="16" y="19.5" text-anchor="middle" font-size="10" font-weight="700" font-family="ui-monospace,monospace" fill="currentColor">N</text>` },
    { name: "NestJS", svg: `<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M11 20V12l5 4 5-4v8" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>` },
    { name: "Express", svg: `<rect x="3" y="8" width="26" height="16" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="16" y="20" text-anchor="middle" font-size="9.5" font-weight="700" font-family="ui-monospace,monospace" fill="currentColor">EX</text>` },
    { name: "Spring Boot", svg: `<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 21c3-5 7-11 13-13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="22.5" cy="9.5" r="1.8" fill="currentColor"/>` },
    { name: "PostgreSQL", svg: `<ellipse cx="16" cy="9" rx="9.5" ry="4" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 9v13c0 2.2 4.25 4 9.5 4s9.5-1.8 9.5-4V9" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 16c0 2.2 4.25 4 9.5 4s9.5-1.8 9.5-4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/>` },
    { name: "Supabase", svg: `<ellipse cx="16" cy="9" rx="9.5" ry="4" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M6.5 9v13c0 2.2 4.25 4 9.5 4s9.5-1.8 9.5-4V9" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M16 13v10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>` },
    { name: "REST APIs", svg: `<path d="M8 10h16M8 16h16M8 22h16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="5" cy="10" r="1.5" fill="currentColor"/><circle cx="5" cy="16" r="1.5" fill="currentColor"/><circle cx="5" cy="22" r="1.5" fill="currentColor"/>` },
    { name: "JWT Auth", svg: `<rect x="8" y="14" width="16" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M11 14V9.5a5 5 0 0110 0V14" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="16" cy="20.5" r="2" fill="currentColor"/>` },
  ],
  tools: [
    { name: "Git", svg: `<circle cx="10" cy="7" r="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="22" cy="16" r="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="25" r="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M10 9.5v13M12.5 7.5l7 7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>` },
    { name: "Docker", svg: `<rect x="4" y="14" width="24" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M9 14V10M13 14V10M17 14V8M21 14V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>` },
    { name: "CI/CD", svg: `<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M11.5 16l3.5 3.5 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` },
    { name: "Clean Code", svg: `<path d="M12 9.5l-6.5 6.5 6.5 6.5M20 9.5l6.5 6.5-6.5 6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` },
    { name: "SOLID", svg: `<path d="M16 3.5L4 10v12l12 7 12-7V10z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M4 10l12 7 12-7M16 17v12" stroke="currentColor" stroke-width=".9" opacity="0.35"/>` },
    { name: "Scrum", svg: `<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M16 5a11 11 0 010 22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M16 16l5.5-5.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>` },
    { name: "JSDoc", svg: `<path d="M8 3.5h10l6 6V28H8z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M18 3.5v6h6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 16h8M12 20.5h5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>` },
  ],
};

// Stack names para a esteira (marquee)
const stackMarqueeItems = [
  ...stackData.frontend.map((x) => x.name),
  ...stackData.backend.map((x) => x.name),
  ...stackData.tools.map((x) => x.name),
];

// ─── CSS ─────────────────────────────────────────────────────
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
:root{--bg-primary:#0A0A0B;--bg-secondary:#111113;--bg-tertiary:#18181B;--bg-card:#161618;--border:#27272A;--border-hover:#3F3F46;--text-primary:#FAFAFA;--text-secondary:#A1A1AA;--text-tertiary:#71717A;--accent:#00ACC1;--accent-hover:#0097A7;--accent-glow:rgba(0,172,193,0.15);--accent-subtle:rgba(0,172,193,0.08);--gradient-1:linear-gradient(135deg,#00ACC1 0%,#0097A7 50%,#00897B 100%);--gradient-text:linear-gradient(135deg,#B2EBF2 0%,#00ACC1 50%,#009688 100%);--radius:12px;--radius-lg:20px;--transition:cubic-bezier(0.4,0,0.2,1)}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{font-family:'Outfit',-apple-system,sans-serif;background:var(--bg-primary);color:var(--text-primary);-webkit-font-smoothing:antialiased;overflow-x:hidden;overflow-y:auto}
::selection{background:rgba(0,172,193,0.3);color:var(--text-primary)}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:var(--bg-primary)}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:var(--border-hover)}

@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.8}}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes gradientMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes blob{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
@keyframes hoverBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
@keyframes hoverWiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}

/* ── Custom Cursor ── */
body.custom-cursor-active{cursor:none}
body.custom-cursor-active *{cursor:none}
.custom-cursor{position:fixed;top:0;left:0;width:10px;height:10px;border-radius:50%;background:var(--accent);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s ease,height .2s ease,background .2s ease,opacity .2s ease}
.custom-cursor.hover{width:36px;height:36px;background:transparent;border:2px solid var(--accent)}

.reveal{opacity:0;transform:translateY(40px);transition:opacity .8s var(--transition),transform .8s var(--transition)}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}.reveal-delay-2{transition-delay:.2s}.reveal-delay-3{transition-delay:.3s}.reveal-delay-4{transition-delay:.4s}.reveal-delay-5{transition-delay:.5s}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 40px;height:72px;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(20px) saturate(1.8);-webkit-backdrop-filter:blur(20px) saturate(1.8);background:rgba(10,10,11,0.7);border-bottom:1px solid transparent;transition:all .4s var(--transition)}
.nav.scrolled{border-bottom-color:var(--border);background:rgba(10,10,11,0.85)}
.nav-left{display:flex;align-items:center;gap:48px}
.nav-logo{font-weight:700;font-size:18px;letter-spacing:-.02em;background:var(--gradient-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-decoration:none;color:inherit;transition:transform .3s cubic-bezier(0.34,1.56,0.64,1)}
.nav-logo:hover{transform:scale(1.08)}
.nav-links{display:flex;align-items:center;gap:28px;list-style:none}
.nav-links a{color:var(--text-secondary);text-decoration:none;font-size:14px;font-weight:400;letter-spacing:.01em;transition:color .3s var(--transition);position:relative}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--accent);transition:width .3s var(--transition)}
.nav-links a:hover{color:var(--text-primary)}.nav-links a:hover::after{width:100%}
.nav-right{display:flex;align-items:center;gap:16px}
.nav-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;color:var(--text-secondary);transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.nav-icon:hover{color:var(--accent);background:var(--accent-subtle);transform:scale(1.1)}
.lang-btn{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;border:none;background:transparent;color:var(--text-secondary);cursor:pointer;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.lang-btn:hover{color:var(--accent);background:var(--accent-subtle);transform:scale(1.08)}
.lang-btn.active{color:var(--accent);background:var(--accent-subtle)}
.nav-contact{display:inline-flex;align-items:center;padding:10px 20px;border-radius:10px;font-size:14px;font-weight:500;background:var(--gradient-1);color:#fff;text-decoration:none;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.nav-contact:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 8px 30px var(--accent-glow)}
.mobile-menu-btn{display:none;background:none;border:none;color:var(--text-primary);cursor:pointer;padding:8px}
.mobile-nav{position:fixed;inset:0;z-index:99;background:rgba(10,10,11,0.95);backdrop-filter:blur(30px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:32px;opacity:0;pointer-events:none;transition:opacity .4s var(--transition)}
.mobile-nav.open{opacity:1;pointer-events:all}
.mobile-nav a{font-size:28px;font-weight:600;color:var(--text-secondary);text-decoration:none;transition:color .3s var(--transition)}
.mobile-nav a:hover{color:var(--text-primary)}

/* ── Hero ── */
.hero-old{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:120px 40px 80px}
.hero-old-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,172,193,0.08) 0%,transparent 55%);opacity:0;animation:heroBgFade 1.2s ease-out .5s forwards}
@keyframes heroBgFade{to{opacity:1}}
.hero-old-inner{display:flex;flex-direction:column;align-items:center;text-align:center;position:relative;z-index:2}
.hero-old-photo-wrap{position:relative;margin-bottom:24px}
.hero-old-photo-glow{position:absolute;inset:0;background:linear-gradient(135deg,var(--border-hover),var(--border));border-radius:50%;filter:blur(24px);opacity:.2;animation:pulse 3s ease-in-out infinite}
.hero-old-photo{position:relative;width:128px;height:128px;border-radius:50%;overflow:hidden;border:2px solid rgba(55,65,81,.5);box-shadow:0 25px 50px -12px rgba(0,0,0,.5);background:linear-gradient(135deg,var(--bg-tertiary),var(--bg-secondary));transition:transform .4s cubic-bezier(0.34,1.56,0.64,1)}
.hero-old-photo:hover{transform:scale(1.05)}
@media(min-width:768px){.hero-old-photo{width:160px;height:160px}}
.hero-old-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.hero-old-photo:hover .hero-old-img{transform:scale(1.1)}
.hero-old-name{font-size:clamp(2.5rem,6vw,4rem);font-weight:700;color:var(--text-primary);letter-spacing:-.025em;margin-bottom:12px}
.hero-old-role-wrap{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px}
.hero-old-line{width:48px;height:1px;background:var(--border)}
.hero-old-role{font-size:clamp(1.125rem,2vw,1.5rem);color:var(--text-secondary);font-weight:300}
.hero-old-desc{color:var(--text-tertiary);max-width:42rem;margin:0 auto 40px;font-size:clamp(.9375rem,1.5vw,1.125rem);line-height:1.7}
.hero-old-ctas{display:flex;flex-direction:column;align-items:center;gap:12px;margin-bottom:28px}
@media(min-width:640px){.hero-old-ctas{flex-direction:row;justify-content:center;gap:16px}}
.hero-old-cta-contact{display:inline-flex;align-items:center;gap:8px;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.hero-old-cta-contact:hover{transform:translateY(-3px) scale(1.02)}
.hero-old-cta-cv{display:inline-flex;align-items:center;gap:8px;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.hero-old-cta-cv:hover{transform:translateY(-3px) scale(1.02)}
.hero-old-social{display:flex;gap:12px;margin-bottom:40px}
.hero-old-social-link{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;color:var(--text-tertiary);transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.hero-old-social-link:hover{color:var(--accent);background:var(--accent-subtle);transform:translateY(-4px) scale(1.1)}
.hero-old-scroll{display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--text-tertiary);text-decoration:none;font-size:13px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;transition:all .3s var(--transition);animation:float 3s ease-in-out infinite}
.hero-old-scroll:hover{color:var(--accent)}
.hero-old-scroll:hover svg{animation:hoverBounce .6s ease-in-out}
.hero-old-scroll svg{opacity:.7;transition:transform .3s var(--transition)}

.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;padding:120px 40px 80px}
.hero-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.hero-gradient{position:absolute;width:600px;height:600px;border-radius:50%;filter:blur(100px);animation:blob 15s ease-in-out infinite}
.hero-gradient-1{top:-150px;right:-100px;background:linear-gradient(135deg,#00ACC1,#00BCD4);opacity:.25}
.hero-gradient-2{bottom:-150px;left:-100px;background:linear-gradient(135deg,#0097A7,#00838F);opacity:.2;animation-delay:-7s}
.hero-gradient-3{top:50%;left:50%;width:400px;height:400px;margin:-200px 0 0 -200px;background:radial-gradient(circle,#00ACC1 0%,transparent 70%);opacity:.1;animation:float 10s ease-in-out infinite}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,172,193,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,172,193,0.04) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%);-webkit-mask-image:radial-gradient(ellipse at center,black 20%,transparent 70%)}
.hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;max-width:1200px;margin:0 auto;width:100%}
.hero-code-wrapper{position:relative;min-height:200px;display:flex;align-items:center;justify-content:flex-end}
.hero-text{text-align:left}
.hero-line1{font-size:clamp(18px,2.2vw,22px);font-weight:400;color:var(--text-secondary);margin-bottom:12px;animation:fadeUp .8s var(--transition) .2s both}
.hero-name{font-size:clamp(44px,7.5vw,80px);font-weight:800;letter-spacing:-.04em;line-height:1.08;margin-bottom:20px;background:var(--gradient-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:fadeUp .8s var(--transition) .35s both}
.hero-role-wrap{min-height:2.8em;margin-bottom:24px;animation:fadeUp .8s var(--transition) .5s both}
.hero-role{font-size:clamp(18px,2.4vw,26px);font-weight:500;color:var(--accent);letter-spacing:-.02em;transition:opacity .3s var(--transition)}
.hero-subtitle{font-size:clamp(15px,1.8vw,19px);color:var(--text-tertiary);line-height:1.7;max-width:480px;margin-bottom:32px;animation:fadeUp .8s var(--transition) .65s both}
.hero-cta{animation:fadeUp .8s var(--transition) .8s both}
.hero-code{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:28px 32px;overflow:hidden;animation:fadeUp .8s var(--transition) .5s both;cursor:grab;user-select:none;touch-action:none;transition:box-shadow .3s var(--transition);min-width:280px;pointer-events:auto;z-index:10}
.hero-code:active{cursor:grabbing}
.hero-code.dragging{box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 0 1px rgba(0,172,193,.2);z-index:50}
.hero-code::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-1);opacity:.6}
.hero-code-handle{position:absolute;top:12px;right:12px;color:var(--text-tertiary);opacity:.6;pointer-events:none}
.hero-code-code{font-family:'JetBrains Mono',monospace;font-size:13px;line-height:2;color:var(--text-tertiary)}
.hero-code-code .kw{color:#0097A7}.hero-code-code .fn{color:#00ACC1}.hero-code-code .str{color:#34D399}.hero-code-code .cm{color:#3F3F46}.hero-code-code .prop{color:#4DD0E1}

.stack-marquee{background:#000;padding:24px 0;overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.stack-marquee-track{display:flex;gap:48px;animation:marquee 25s linear infinite;width:max-content}
.stack-marquee-track:hover{animation-play-state:paused}
.stack-marquee-item{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:500;color:var(--text-tertiary);white-space:nowrap;flex-shrink:0;transition:all .3s cubic-bezier(0.34,1.56,0.64,1)}
.stack-marquee-item:hover{color:var(--accent);transform:scale(1.08)}

.btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:12px;font-family:'Outfit',sans-serif;font-size:15px;font-weight:500;text-decoration:none;cursor:pointer;transition:all .35s cubic-bezier(0.34,1.56,0.64,1);border:none}
.btn-primary{background:var(--gradient-1);color:#fff}
.btn-primary:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 8px 30px var(--accent-glow)}
.btn-secondary{background:var(--bg-tertiary);color:var(--text-primary);border:1px solid var(--border)}
.btn-secondary:hover{border-color:var(--border-hover);transform:translateY(-3px) scale(1.02);background:var(--bg-card)}

.section{padding:120px 40px;max-width:1200px;margin:0 auto}
.section-label{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:var(--accent);letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px}
.section-title{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-.03em;line-height:1.15;margin-bottom:16px;white-space:pre-line}
.section-subtitle{font-size:17px;color:var(--text-tertiary);max-width:540px;line-height:1.7;margin-bottom:56px}
.separator{max-width:1200px;margin:0 auto;padding:0 40px}
.separator-line{height:1px;background:linear-gradient(90deg,transparent 0%,var(--border) 50%,transparent 100%)}

/* ── About (design editorial refinado) ── */
.about{position:relative;overflow:hidden}
.about-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 80% 50% at 70% 50%,rgba(0,172,193,0.06) 0%,transparent 60%)}
.about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:72px;align-items:start;position:relative;z-index:1}
.about-label{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;color:var(--accent);letter-spacing:.18em;text-transform:uppercase;margin-bottom:20px}
.about-tagline{font-size:clamp(28px,4vw,42px);font-weight:700;letter-spacing:-.04em;line-height:1.2;margin-bottom:36px;white-space:pre-line;background:linear-gradient(135deg,var(--text-primary) 0%,var(--text-secondary) 60%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.about-paragraphs{display:flex;flex-direction:column;gap:24px}
.about-p{font-size:16px;line-height:1.85;color:var(--text-secondary);max-width:560px}
.about-side{display:flex;flex-direction:column;gap:32px;position:sticky;top:100px}
.about-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:28px 32px;position:relative;overflow:hidden;transition:all .4s cubic-bezier(0.34,1.56,0.64,1)}
.about-card:hover{border-color:rgba(0,172,193,.25);box-shadow:0 16px 48px rgba(0,0,0,.25);transform:translateY(-4px)}
.about-card-accent{position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-1);opacity:.7}
.about-card-code{font-family:'JetBrains Mono',monospace;font-size:12px;line-height:2.2;color:var(--text-tertiary);display:block}
.about-card-code .kw{color:#0097A7}.about-card-code .fn{color:#00ACC1}.about-card-code .str{color:#34D399}.about-card-code .cm{color:#52525B}.about-card-code .prop{color:#4DD0E1}
.about-highlights{display:flex;flex-wrap:wrap;gap:0;align-items:stretch;justify-content:center;padding:28px 32px 0;margin-top:4px;position:relative;width:100%;box-sizing:border-box}
.about-highlights::before{content:'';position:absolute;top:0;left:32px;right:32px;height:1px;background:linear-gradient(90deg,transparent 0%,var(--border) 15%,var(--border) 85%,transparent 100%);opacity:.5}
.about-highlight-card{flex:0 0 auto;min-width:100px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:24px 28px 24px 0;border-left:1px solid var(--border);transition:all .35s cubic-bezier(0.34,1.56,0.64,1);position:relative}
.about-highlight-card:first-child{border-left:none;padding-left:0}
.about-highlight-card:not(:first-child){padding-left:28px}
.about-highlight-card:hover{border-left-color:rgba(0,172,193,.5);transform:translateX(4px)}
.about-highlight-card:hover .about-highlight-label{color:var(--text-primary)}
.about-highlight-num{font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:600;color:var(--accent);margin-bottom:6px;letter-spacing:-.03em;line-height:1;transition:transform .35s cubic-bezier(0.34,1.56,0.64,1)}
.about-highlight-card:hover .about-highlight-num{transform:scale(1.08)}
.about-highlight-label{font-size:13px;color:var(--text-secondary);line-height:1.5;white-space:pre-line;transition:color .3s var(--transition)}
/* ── Stack Icons ── */
.stack-tabs{display:flex;gap:4px;margin-bottom:48px;background:var(--bg-secondary);padding:4px;border-radius:12px;border:1px solid var(--border);width:fit-content}
.stack-tab{padding:10px 24px;border-radius:8px;border:none;background:transparent;color:var(--text-tertiary);font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .3s var(--transition)}
.stack-tab.active{background:var(--bg-tertiary);color:var(--text-primary);box-shadow:0 1px 3px rgba(0,0,0,.3)}
.stack-tab:hover:not(.active){color:var(--text-secondary)}
.stack-icon-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:16px}
.stack-icon-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px 16px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);cursor:default;transition:all .4s var(--transition);position:relative;overflow:hidden}
.stack-icon-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,var(--accent-glow) 0%,transparent 70%);opacity:0;transition:opacity .4s var(--transition)}
.stack-icon-card:hover{border-color:rgba(0,172,193,.3);transform:translateY(-6px);box-shadow:0 12px 40px rgba(0,0,0,.3),0 0 0 1px rgba(0,172,193,.1)}
.stack-icon-card:hover::before{opacity:1}
.stack-icon-card:hover .stack-icon-wrap{color:var(--accent);transform:scale(1.15)}
.stack-icon-wrap{width:36px;height:36px;color:var(--text-secondary);transition:all .4s var(--transition);position:relative;z-index:1}
.stack-icon-wrap svg{width:100%;height:100%}
.stack-icon-name{font-size:13px;font-weight:500;color:var(--text-tertiary);text-align:center;position:relative;z-index:1;transition:color .3s var(--transition)}
.stack-icon-card:hover .stack-icon-name{color:var(--text-primary)}

/* ── Achievement / Reconhecimento ── */
.achievement-section{max-width:1200px;margin:0 auto;padding:0 40px 80px}
.achievement-card{background:linear-gradient(135deg,var(--bg-card) 0%,var(--bg-secondary) 100%);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px 40px;position:relative;overflow:hidden}
.achievement-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gradient-1);opacity:.8}
.achievement-label{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:500;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px}
.achievement-text{font-size:16px;line-height:1.75;color:var(--text-secondary)}

/* ── Projects / Carousel (horizontal editorial) ── */
#projects .section-title{margin-bottom:12px}
#projects .section-subtitle{margin-bottom:48px}
.projects-wrap{position:relative}
.carousel-outer{position:relative;width:100vw;margin-left:calc(-50vw + 50%);padding:0 40px;overflow:hidden}
.carousel-track{display:flex;gap:28px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:28px 0 56px;-ms-overflow-style:none;scrollbar-width:none}
.carousel-track::-webkit-scrollbar{display:none}
.carousel-card{flex:0 0 520px;scroll-snap-align:start;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;transition:all .5s cubic-bezier(0.34,1.56,0.64,1);position:relative;display:flex;flex-direction:row;min-height:220px;box-shadow:0 4px 24px rgba(0,0,0,.2);opacity:0;animation:carouselCardReveal .7s var(--transition) forwards}
.carousel-card:nth-child(1){animation-delay:.05s}.carousel-card:nth-child(2){animation-delay:.1s}.carousel-card:nth-child(3){animation-delay:.15s}.carousel-card:nth-child(4){animation-delay:.2s}.carousel-card:nth-child(5){animation-delay:.25s}.carousel-card:nth-child(6){animation-delay:.3s}.carousel-card:nth-child(7){animation-delay:.35s}.carousel-card:nth-child(8){animation-delay:.4s}.carousel-card:nth-child(9){animation-delay:.45s}
@keyframes carouselCardReveal{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.carousel-card:hover{border-color:rgba(0,172,193,.35);transform:translateY(-8px) scale(1.01);box-shadow:0 24px 48px rgba(0,0,0,.4),0 0 0 1px rgba(0,172,193,.15)}
.carousel-card-image-wrap{flex:0 0 45%;min-width:0;position:relative;overflow:hidden;background:linear-gradient(135deg,var(--bg-tertiary) 0%,var(--bg-secondary) 100%);align-self:stretch}
.carousel-card-image-wrap>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(0.34,1.56,0.64,1);filter:brightness(0.88)}
.carousel-card:hover .carousel-card-image{transform:scale(1.06)}
.carousel-card-image-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .4s var(--transition);z-index:1}
.carousel-card-image-placeholder.visible{opacity:1}
.carousel-card-image-placeholder svg{width:48px;height:48px;color:inherit;opacity:.6}
.carousel-card-content{flex:1;min-width:0;display:flex;flex-direction:column;padding:24px 28px;justify-content:space-between}
.carousel-card-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}
.carousel-card-tag{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-tertiary);letter-spacing:.12em;text-transform:uppercase;flex-shrink:0}
.carousel-card-github{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);text-decoration:none;flex-shrink:0;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.carousel-card-github:hover{color:var(--accent);background:var(--accent-subtle);transform:scale(1.08)}
.carousel-card-title{font-size:20px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px;line-height:1.25;background:linear-gradient(135deg,var(--text-primary) 0%,var(--text-secondary) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.carousel-card-brief{font-size:13px;color:var(--text-secondary);line-height:1.6;flex:1}
.carousel-card-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid var(--border)}
.carousel-card-techs{display:flex;flex-wrap:wrap;gap:6px}
.carousel-card-tech{padding:5px 10px;background:var(--accent-subtle);border:1px solid rgba(0,172,193,.12);border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent);font-weight:500}
.carousel-card-arrow{width:36px;height:36px;border-radius:10px;background:var(--bg-tertiary);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);flex-shrink:0;transition:all .4s cubic-bezier(0.34,1.56,0.64,1)}
.carousel-card:hover .carousel-card-arrow{background:var(--accent);border-color:var(--accent);color:#fff;transform:translateX(3px) scale(1.05)}
.carousel-nav{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:20px}
.carousel-btn{width:44px;height:44px;border-radius:12px;background:var(--bg-card);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.carousel-btn:hover{border-color:var(--accent);color:var(--accent);background:var(--accent-subtle);transform:scale(1.08)}
.carousel-dots{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:400px}
.carousel-dot{width:8px;height:8px;border-radius:50%;background:var(--border);border:none;cursor:pointer;transition:all .3s var(--transition)}
.carousel-dot.active{background:var(--accent);width:24px;border-radius:4px}

/* ── Contributions (same card design as portfolio) ── */
#contributions .section-title{margin-bottom:12px}
#contributions .section-subtitle{margin-bottom:48px}
.contribution-image-note{font-size:12px;color:var(--text-tertiary);line-height:1.6;max-width:520px;margin:28px auto 0;text-align:center;font-style:italic}
.contributions-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:1100px;margin:0 auto}
.contribution-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;transition:all .5s cubic-bezier(0.34,1.56,0.64,1);display:flex;flex-direction:row;min-height:200px;box-shadow:0 4px 24px rgba(0,0,0,.2)}
.contribution-card:hover{border-color:rgba(0,172,193,.35);transform:translateY(-8px) scale(1.01);box-shadow:0 24px 48px rgba(0,0,0,.4),0 0 0 1px rgba(0,172,193,.15)}
.contribution-card-image{flex:0 0 45%;min-width:0;position:relative;overflow:hidden;align-self:stretch;background:linear-gradient(135deg,var(--bg-tertiary) 0%,var(--bg-secondary) 100%)}
.contribution-card-image>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(0.78);transition:transform .5s cubic-bezier(0.34,1.56,0.64,1),filter .4s var(--transition)}
.contribution-card-image.image-left>img{object-position:left center}
.contribution-card:hover .contribution-card-image>img{transform:scale(1.08);filter:brightness(1)}
.contribution-card-image-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:0;opacity:0;transition:opacity .3s var(--transition)}
.contribution-card-image-placeholder.visible{opacity:1}
.contribution-card-image-placeholder svg{width:48px;height:48px;opacity:.5;color:inherit}
.contribution-card-content{flex:1;min-width:0;display:flex;flex-direction:column;padding:24px 28px;justify-content:space-between}
.contribution-card-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}
.contribution-card-tag{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-tertiary);letter-spacing:.12em;text-transform:uppercase;flex-shrink:0}
.contribution-card-title{font-size:20px;font-weight:700;letter-spacing:-.03em;margin-bottom:8px;line-height:1.25;background:linear-gradient(135deg,var(--text-primary) 0%,var(--text-secondary) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.contribution-card-brief{font-size:13px;color:var(--text-secondary);line-height:1.6;flex:1}
@media(max-width:768px){.contributions-grid{grid-template-columns:1fr}.contribution-card{flex-direction:column;min-height:auto}.contribution-card-image{flex:0 0 auto;aspect-ratio:16/10;min-height:auto}}

/* ── Modal ── */
.modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;padding:40px;opacity:0;pointer-events:none;transition:opacity .35s var(--transition)}
.modal-overlay.open{opacity:1;pointer-events:all}
.modal-content{background:var(--bg-secondary);border:1px solid var(--border);border-radius:var(--radius-lg);max-width:720px;width:100%;max-height:85vh;overflow-y:auto;position:relative;transform:scale(.95) translateY(20px);transition:transform .4s var(--transition)}
.modal-overlay.open .modal-content{transform:scale(1) translateY(0)}
.modal-content::-webkit-scrollbar{width:4px}.modal-content::-webkit-scrollbar-track{background:transparent}.modal-content::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.modal-header{position:relative;padding:48px 48px 0}
.modal-accent-bar{position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--radius-lg) var(--radius-lg) 0 0;background:linear-gradient(90deg,#0ea5e9 0%,#06b6d4 35%,#00acc1 70%,#0891b2 100%)!important}
.modal-close{position:absolute;top:20px;right:20px;width:36px;height:36px;border-radius:50%;background:var(--bg-tertiary);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .35s cubic-bezier(0.34,1.56,0.64,1);z-index:2}
.modal-close:hover{border-color:var(--accent);color:var(--accent);transform:scale(1.1)}
.modal-icon{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,rgba(14,165,233,.2) 0%,rgba(0,172,193,.25) 100%);border:1px solid rgba(14,165,233,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--accent);margin-bottom:16px}
.modal-tag{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--text-tertiary);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px}
.modal-title{font-size:32px;font-weight:700;letter-spacing:-.03em}
.modal-body{padding:32px 48px 48px}
.modal-section{margin-bottom:28px}.modal-section:last-child{margin-bottom:0}
.modal-section-label{font-size:12px;font-weight:600;color:var(--accent);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px}
.modal-section-text{font-size:15px;color:var(--text-secondary);line-height:1.8}
.modal-techs{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.modal-tech{padding:6px 14px;background:var(--accent-subtle);border:1px solid rgba(0,172,193,.12);border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent)}
.modal-image-wrap{position:relative;overflow:hidden;min-height:200px;aspect-ratio:16/10;background:var(--bg-tertiary)}
.modal-image-wrap .modal-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(0.88)}
.modal-image-placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:0}
.modal-image-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.25) 100%);pointer-events:none;z-index:1}

/* ── Thinking ── */
.thinking-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.thinking-card{padding:36px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);transition:all .4s cubic-bezier(0.34,1.56,0.64,1);position:relative;overflow:hidden}
.thinking-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--gradient-1);opacity:0;transition:opacity .4s var(--transition)}
.thinking-card:hover{border-color:var(--border-hover);transform:translateY(-6px) scale(1.01);box-shadow:0 12px 40px rgba(0,0,0,.2)}
.thinking-card:hover::after{opacity:.6}
.thinking-icon{font-size:24px;color:var(--accent);margin-bottom:20px;display:block}
.thinking-card h3{font-size:18px;font-weight:600;letter-spacing:-.01em;margin-bottom:12px}
.thinking-card p{font-size:14px;color:var(--text-secondary);line-height:1.7}

/* ── Timeline ── */
.timeline{position:relative;padding-left:40px;display:flex;flex-direction:column;gap:120px}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(180deg,var(--accent) 0%,var(--border) 100%)}
.timeline-item{position:relative;padding:0 0 0 40px}
.timeline-dot{position:absolute;left:-44px;top:6px;width:8px;height:8px;border-radius:50%;background:var(--border);border:2px solid var(--bg-primary);transition:all .3s var(--transition)}
.timeline-item.current .timeline-dot{background:var(--accent);box-shadow:0 0 0 4px var(--accent-glow),0 0 12px var(--accent-glow)}
.timeline-period{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-tertiary);margin-bottom:4px}
.timeline-company{font-size:22px;font-weight:700;letter-spacing:-.02em;margin-bottom:4px}
.timeline-role{font-size:15px;color:var(--accent);font-weight:500;margin-bottom:10px}
.timeline-desc{font-size:14px;color:var(--text-secondary);line-height:1.7;max-width:560px}
.timeline-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;background:var(--accent-subtle);border:1px solid rgba(0,172,193,.15);border-radius:6px;font-size:12px;font-weight:500;color:var(--accent);margin-top:8px}
.timeline-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s ease-in-out infinite}

.contact-section{text-align:center;padding:160px 40px;position:relative}
.contact-section .section-title{white-space:pre-line}
.contact-section .section-subtitle{margin:16px auto 48px;max-width:480px}
.contact-links{display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:32px}
.contact-link{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);font-size:14px;color:var(--text-secondary);text-decoration:none;transition:all .35s cubic-bezier(0.34,1.56,0.64,1)}
.contact-link:hover{border-color:var(--border-hover);color:var(--text-primary);transform:translateY(-4px) scale(1.02)}
.footer{padding:40px;text-align:center;border-top:1px solid var(--border)}
.footer p{font-size:13px;color:var(--text-tertiary);line-height:1.8}

/* ── Footer (design antigo) ── */
.footer-old{border-top:1px solid var(--border);padding:64px 40px;margin-top:80px}
.footer-old-inner{max-width:1200px;margin:0 auto;text-align:center}
.footer-old-title{font-size:clamp(1.5rem,3vw,1.875rem);font-weight:600;color:var(--text-primary);letter-spacing:-.025em;margin-bottom:24px}
.footer-old-subtitle{font-size:1rem;color:var(--text-secondary);line-height:1.7;max-width:42rem;margin:0 auto 24px}
.footer-old-cta{display:inline-flex;align-items:center;gap:12px;background:var(--gradient-1);color:#fff!important}
.footer-old-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px var(--accent-glow)}
.footer-old-credits{margin-top:48px;padding-top:32px;position:relative}
.footer-old-credits::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:100%;max-width:1200px;height:1px;background:linear-gradient(90deg,transparent 0%,var(--border) 50%,transparent 100%)}
.footer-old-credits p{font-size:13px;color:var(--text-tertiary);line-height:1.8;margin:0}

@media(max-width:1024px){.nav-links{display:none}.nav-right .nav-contact{display:none}.mobile-menu-btn{display:flex;align-items:center;justify-content:center}.about-grid{grid-template-columns:1fr;gap:48px}.about-side{position:static;order:1}.about-text{order:2}.about-tagline{font-size:clamp(24px,5vw,32px)}.about-highlights{flex-direction:column;align-items:stretch}.about-highlights::before{left:0;right:0}.about-highlight-card{border-left:none;border-top:1px solid var(--border);padding:20px 0;padding-left:0!important;min-width:auto}.about-highlight-card:first-child{border-top:none;padding-top:0}.about-highlight-card:not(:first-child){padding-left:0}.about-highlight-card:hover{border-left-color:transparent;border-top-color:rgba(0,172,193,.4)}.thinking-grid{grid-template-columns:repeat(2,1fr)}.carousel-card{flex:0 0 420px}.hero-inner{grid-template-columns:1fr;gap:48px}.hero-text{text-align:center}.hero-subtitle{margin-left:auto;margin-right:auto}.hero-code{order:1}.mobile-nav .nav-social{display:flex;gap:12px;margin-top:24px;justify-content:center}.mobile-nav .nav-contact{margin-top:16px}}
@media(max-width:768px){.section{padding:80px 24px}.achievement-section{padding:0 24px 60px}.achievement-card{padding:24px 28px}.hero{padding:100px 24px 60px}.nav{padding:0 20px}.thinking-grid{grid-template-columns:1fr}.about-highlights{flex-direction:column;padding-top:24px;margin-top:0}.about-highlights::before{display:none}.about-highlight-card{border-left:none;border-top:1px solid var(--border);padding:16px 0;min-width:auto;padding-left:0!important}.about-highlight-card:first-child{border-top:none;padding-top:0}.about-highlight-card:hover{border-top-color:rgba(0,172,193,.4)}.about-tagline{font-size:22px;margin-bottom:28px}.hero-btns{flex-direction:column}.contact-section{padding:100px 24px}.stack-tabs{overflow-x:auto;width:100%}.stack-icon-grid{grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:12px}.stack-icon-card{padding:22px 12px}.stack-icon-wrap{width:28px;height:28px}.carousel-outer{padding:0 24px}.carousel-card{flex:0 0 320px;flex-direction:column;min-height:auto}.carousel-card-image-wrap{flex:0 0 auto;aspect-ratio:16/10;min-height:auto}.carousel-card-content{padding:20px 24px}.carousel-card-foot{margin-top:12px;padding-top:12px}.modal-overlay{padding:16px}.modal-header{padding:36px 28px 0}.modal-body{padding:24px 28px 36px}.modal-title{font-size:24px}}
`;

// ─── Scroll Reveal Hook ──────────────────────────────────────
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${className}`}>{children}</div>;
}

// ─── Custom Cursor ────────────────────────────────────────────
const CURSOR_SELECTOR = "a, button, .btn, .nav-icon, .nav-contact, .contact-link, .carousel-card, .contribution-card, .stack-icon-card, .thinking-card, .about-highlight-card, .hero-old-social-link, .hero-old-scroll, .carousel-btn, .stack-tab, .lang-btn, .modal-close, .mobile-menu-btn";
function CustomCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(!prefersReduced && hasPointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const cursor = ref.current;
    if (!cursor) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onOver = (e) => { if (e.target.closest(CURSOR_SELECTOR)) setHover(true); };
    const onOut = (e) => { if (!e.relatedTarget?.closest(CURSOR_SELECTOR)) setHover(false); };
    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.classList.add("custom-cursor-active");

    let raf;
    const animate = () => {
      const { x: tx, y: ty } = target.current;
      const { x: px, y: py } = pos.current;
      pos.current = { x: px + (tx - px) * 0.2, y: py + (ty - py) * 0.2 };
      cursor.style.left = pos.current.x + "px";
      cursor.style.top = pos.current.y + "px";
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("custom-cursor-active");
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (enabled === false) return null;
  return <div ref={ref} className={`custom-cursor ${hover ? "hover" : ""}`} style={{ opacity: visible ? 1 : 0 }} aria-hidden="true" />;
}

// ─── Nav ─────────────────────────────────────────────────────
function Nav({ t, lang, setLang, navItems }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const TranslateIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/>
    </svg>
  );
  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nav-left">
          <a href="#hero" className="nav-logo">mm.</a>
          <ul className="nav-links">
            {navItems.map(([k, h]) => <li key={k}><a href={h}>{t.nav[k]}</a></li>)}
          </ul>
        </div>
        <div className="nav-right">
          <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang(lang === "pt" ? "en" : "pt")} aria-label={lang === "pt" ? "Mudar para inglês" : "Switch to Portuguese"} title={lang === "pt" ? "English" : "Português"}><TranslateIcon/></button>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#contact" className="nav-contact">{t.nav.contact}</a>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>}
          </svg>
        </button>
      </nav>
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }} role="dialog" aria-modal="true" aria-label="Menu">
        {navItems.map(([k, h]) => <a key={k} href={h} onClick={() => setMobileOpen(false)}>{t.nav[k]}</a>)}
        <div className="nav-social">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="GitHub" onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="LinkedIn" onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
        <button className={`lang-btn ${lang === "pt" ? "active" : ""}`} onClick={() => { setLang("pt"); setMobileOpen(false); }}>PT</button>
        <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => { setLang("en"); setMobileOpen(false); }}>EN</button>
        <a href="#contact" className="nav-contact" onClick={() => setMobileOpen(false)}>{t.nav.contact}</a>
      </div>
    </>
  );
}

// ─── Hero (foto, nome, cargo, descrição, CTAs, redes, scroll hint) ─
function Hero({ t, lang }) {
  const cvLink = LINKS.cvPt;
  const cvDownloadName = "CV-Mariana-2026-pt.pdf";
  return (
    <>
      <section className="hero-old" id="hero">
        <div className="hero-old-bg" aria-hidden="true" />
        <div className="hero-old-inner">
          <div className="hero-old-photo-wrap">
            <div className="hero-old-photo-glow" aria-hidden="true"/>
            <div className="hero-old-photo">
              <img src="/eu.jpg" alt="Mariana Marques" className="hero-old-img"/>
            </div>
          </div>
          <h1 className="hero-old-name">Mariana Marques</h1>
          <div className="hero-old-role-wrap">
            <div className="hero-old-line"/>
            <p className="hero-old-role">{t.hero.role}</p>
            <div className="hero-old-line"/>
          </div>
          <p className="hero-old-desc">{t.hero.desc}</p>
          <div className="hero-old-ctas">
            <a href="#contact" className="btn btn-primary hero-old-cta-contact">
              {t.hero.ctaContact}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href={cvLink} download={cvDownloadName} className="btn btn-secondary hero-old-cta-cv">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {t.hero.cvDownload}
            </a>
          </div>
          <div className="hero-old-social">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hero-old-social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hero-old-social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <a href="#about" className="hero-old-scroll" aria-label={t.hero.scrollHint}>
            <span className="hero-old-scroll-text">{t.hero.scrollHint}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </a>
        </div>
      </section>
      <div className="stack-marquee">
        <div className="stack-marquee-track">
          {[...stackMarqueeItems, ...stackMarqueeItems].map((name, i) => (
            <span key={i} className="stack-marquee-item">{name}</span>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── About (design editorial refinado) ─
function About({ t }) {
  return (
    <section className="section about" id="about">
      <div className="about-bg" aria-hidden="true" />
      <div className="about-grid">
        <div className="about-text">
          <Reveal><p className="about-label">{t.about.label}</p></Reveal>
          <Reveal delay={1}>
            <h2 className="about-tagline">{t.about.title}</h2>
          </Reveal>
          <div className="about-paragraphs">
            <Reveal delay={2}><p className="about-p">{t.about.p1}</p></Reveal>
            <Reveal delay={3}><p className="about-p">{t.about.p2}</p></Reveal>
            <Reveal delay={4}><p className="about-p">{t.about.p3}</p></Reveal>
          </div>
        </div>
        <div className="about-side">
          <Reveal delay={2}>
            <div className="about-card">
              <div className="about-card-accent" />
              <div className="about-card-code">
                <span className="cm">{t.about.codeComment1}</span><br />
                <span className="kw">function</span> <span className="fn">ship</span>() {'{'}<br />
                {'  '}<span className="fn">design</span>(<span className="str">"user-centric"</span>);<br />
                {'  '}<span className="fn">code</span>(<span className="str">"tested"</span>);<br />
                {'  '}<span className="kw">return</span> <span className="fn">experience</span>(<span className="str">"accessible"</span>);<br />
                {'}'}
              </div>
            </div>
          </Reveal>
          <Reveal delay={5}>
            <div className="about-highlights">
              {t.about.highlights.map((h, i) => (
                <div key={i} className="about-highlight-card">
                  <span className="about-highlight-num">{h.num}</span>
                  <span className="about-highlight-label">{h.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Achievement({ t }) {
  return (
    <div className="achievement-section">
      <Reveal>
        <div className="achievement-card">
          <p className="achievement-label">{t.achievement.label}</p>
          <p className="achievement-text">{t.achievement.text}</p>
        </div>
      </Reveal>
    </div>
  );
}

function Stack({ t }) {
  const [activeTab, setActiveTab] = useState("frontend");
  return (
    <section className="section" id="stack">
      <Reveal><p className="section-label">{t.stack.label}</p><h2 className="section-title">{t.stack.title}</h2><p className="section-subtitle">{t.stack.subtitle}</p></Reveal>
      <Reveal delay={1}>
        <div className="stack-tabs" role="tablist">
          {["frontend", "backend", "tools"].map(tab => (
            <button key={tab} className={`stack-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)} role="tab" aria-selected={activeTab === tab}>{t.stack.categories[tab]}</button>
          ))}
        </div>
      </Reveal>
      <Reveal delay={2}>
        <div className="stack-icon-grid" key={activeTab}>
          {stackData[activeTab].map((item, i) => (
            <div key={item.name} className="stack-icon-card" style={{ animation: `fadeUp .5s var(--transition) ${i * 0.06}s both` }}>
              <div className="stack-icon-wrap" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 32 32" fill="none">${item.svg}</svg>` }} />
              <span className="stack-icon-name">{item.name}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ProjectModal({ project, labels, closeLabel, onClose }) {
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [project?.title]);
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  const showImage = project?.image && !imageError;
  return (
    <div className={`modal-overlay ${project ? "open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {project && (
        <div className="modal-content" role="dialog" aria-modal="true" aria-label={project.title}>
          <div className="modal-image-wrap" style={showImage ? {} : { background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 100%)` }}>
            {showImage ? (
              <img src={project.image} alt={project.title} className="modal-image" onError={() => setImageError(true)} />
            ) : (
              <div className="modal-image-placeholder" style={{ color: project.color || "var(--accent)" }}>
                {PROJECT_ICONS[project.icon] ?? PROJECT_ICONS.cards}
              </div>
            )}
            <div className="modal-image-overlay" aria-hidden="true" />
            <button className="modal-close" onClick={onClose} aria-label={closeLabel}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="modal-header">
            <p className="modal-tag">{project.tag}</p>
            <h3 className="modal-title">{project.title}</h3>
          </div>
          <div className="modal-body">
            <div className="modal-section"><p className="modal-section-label">{labels.problem}</p><p className="modal-section-text">{project.problem}</p></div>
            <div className="modal-section"><p className="modal-section-label">{labels.role}</p><p className="modal-section-text">{project.role}</p></div>
            <div className="modal-section"><p className="modal-section-label">{labels.result}</p><p className="modal-section-text">{project.result}</p></div>
            <div className="modal-section"><p className="modal-section-label">{labels.tech}</p><div className="modal-techs">{project.tech.map((tech, idx) => <span key={`${project.title}-${tech}-${idx}`} className="modal-tech">{tech}</span>)}</div></div>
          </div>
        </div>
      )}
    </div>
  );
}

function Projects({ t }) {
  const [selected, setSelected] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef(null);

  const scrollTo = useCallback((idx) => {
    const track = trackRef.current;
    if (!track || !track.children[idx]) return;
    track.children[idx].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIdx(idx);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const h = () => { const w = (track.children[0]?.offsetWidth || 520) + 28; setActiveIdx(Math.min(Math.round(track.scrollLeft / w), t.projects.items.length - 1)); };
    track.addEventListener("scroll", h, { passive: true });
    return () => track.removeEventListener("scroll", h);
  }, [t.projects.items.length]);

  return (
    <section className="section" id="projects">
      <Reveal><p className="section-label">{t.projects.label}</p><h2 className="section-title">{t.projects.title}</h2><p className="section-subtitle">{t.projects.subtitle}</p></Reveal>
      <Reveal delay={1}>
        <div className="projects-wrap">
          <div className="carousel-outer">
          <div className="carousel-track" ref={trackRef}>
            {t.projects.items.map((p, i) => (
              <div key={i} className="carousel-card" onClick={() => setSelected(p)} role="button" tabIndex={0} aria-label={`${t.projects.viewCase}: ${p.title}`} onKeyDown={e => { if (e.key === "Enter") setSelected(p); }}>
                <div className="carousel-card-image-wrap" style={p.image ? {} : { background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}08 100%)` }}>
                  {p.image && (
                    <img src={p.image} alt={p.title} className="carousel-card-image" loading="lazy" onError={e => { e.target.style.display = "none"; e.target.nextElementSibling?.classList.add("visible"); }} />
                  )}
                  <div className={`carousel-card-image-placeholder ${!p.image ? "visible" : ""}`} style={{ background: p.color ? `linear-gradient(135deg, ${p.color}40 0%, ${p.color}15 100%)` : undefined, color: p.color || "var(--accent)" }}>
                    {PROJECT_ICONS[p.icon] ?? PROJECT_ICONS.cards}
                  </div>
                </div>
                <div className="carousel-card-content">
                  <div>
                    <div className="carousel-card-header">
                      <span className="carousel-card-tag">{p.tag}</span>
                      <a href={p.link || p.github || LINKS.github} target="_blank" rel="noopener noreferrer" className="carousel-card-github" aria-label={p.link ? `Visitar site ${p.title}` : `GitHub ${p.title}`} onClick={e => e.stopPropagation()}>
                        {p.link ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        )}
                      </a>
                    </div>
                    <h3 className="carousel-card-title">{p.title}</h3>
                    <p className="carousel-card-brief">{p.brief}</p>
                  </div>
                  <div className="carousel-card-foot">
                    <div className="carousel-card-techs">
                      {p.tech.slice(0, 3).map((tech, idx) => <span key={`${p.title}-${tech}-${idx}`} className="carousel-card-tech">{tech}</span>)}
                      {p.tech.length > 3 && <span className="carousel-card-tech">+{p.tech.length - 3}</span>}
                    </div>
                    <div className="carousel-card-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={() => scrollTo(Math.max(0, activeIdx - 1))} aria-label="Previous"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>
            <div className="carousel-dots">{t.projects.items.map((_, i) => <button key={i} className={`carousel-dot ${activeIdx === i ? "active" : ""}`} onClick={() => scrollTo(i)} aria-label={`Project ${i + 1}`}/>)}</div>
            <button className="carousel-btn" onClick={() => scrollTo(Math.min(t.projects.items.length - 1, activeIdx + 1))} aria-label="Next"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          </div>
        </div>
        </div>
      </Reveal>
      <ProjectModal project={selected} labels={t.projects.labels} closeLabel={t.projects.close} onClose={() => setSelected(null)} />
    </section>
  );
}

function Contributions({ t }) {
  return (
    <section className="section" id="contributions">
      <Reveal><p className="section-label">{t.contributions.label}</p><h2 className="section-title">{t.contributions.title}</h2><p className="section-subtitle">{t.contributions.subtitle}</p></Reveal>
      <Reveal delay={1}>
        <div className="contributions-grid">
          {t.contributions.items.map((item, i) => (
            <div key={i} className="contribution-card">
              <div className={`contribution-card-image ${item.imageAlign === "left" ? "image-left" : ""}`} style={item.image ? {} : { background: `linear-gradient(135deg, ${item.color}30 0%, ${item.color}08 100%)` }}>
                {item.image && (
                  <img src={item.image} alt={item.name} loading="lazy" onError={e => { e.target.style.display = "none"; e.target.nextElementSibling?.classList.add("visible"); }} />
                )}
                <div className={`contribution-card-image-placeholder ${!item.image ? "visible" : ""}`} style={{ color: item.color || "var(--accent)" }}>
                  {PROJECT_ICONS[item.icon] ?? PROJECT_ICONS.chart}
                </div>
              </div>
              <div className="contribution-card-content">
                <div>
                  <div className="contribution-card-header">
                    <span className="contribution-card-tag">{item.tag}</span>
                  </div>
                  <h3 className="contribution-card-title">{item.name}</h3>
                  <p className="contribution-card-brief">{item.brief}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {t.contributions.imageNote && <p className="contribution-image-note">{t.contributions.imageNote}</p>}
      </Reveal>
    </section>
  );
}

function Thinking({ t }) {
  return (
    <section className="section" id="snacks">
      <Reveal><p className="section-label">{t.thinking.label}</p><h2 className="section-title">{t.thinking.title}</h2><p className="section-subtitle">{t.thinking.subtitle}</p></Reveal>
      <div className="thinking-grid">{t.thinking.items.map((item, i) => <Reveal key={i} delay={Math.min(i + 1, 5)}><div className="thinking-card"><span className="thinking-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.desc}</p></div></Reveal>)}</div>
    </section>
  );
}

function Experience({ t }) {
  const badge = t === content.pt ? "Atual" : "Current";
  return (
    <section className="section" id="experience">
      <Reveal><p className="section-label">{t.experience.label}</p><h2 className="section-title">{t.experience.title}</h2></Reveal>
      <div className="timeline" style={{ marginTop: 56 }}>
        {t.experience.items.map((item, i) => (
          <Reveal key={i} delay={Math.min(i + 1, 4)}>
            <div className={`timeline-item ${item.current ? "current" : ""}`}>
              <div className="timeline-dot"/>
              <p className="timeline-period">{item.period}</p>
              <h3 className="timeline-company">{item.company}</h3>
              <p className="timeline-role">{item.role}</p>
              <p className="timeline-desc">{item.desc}</p>
              {item.current && <div className="timeline-badge"><span className="timeline-badge-dot"/>{badge}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact({ t }) {
  return (
    <section className="contact-section" id="contact">
      <Reveal>
        <p className="section-label">{t.contact.label}</p>
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="section-subtitle">{t.contact.subtitle}</p>
        <a href={`mailto:${t.contact.email}`} className="btn btn-primary" style={{ margin: "0 auto" }}>{t.contact.cta} →</a>
        <div className="contact-links">
          <a href="mailto:mariana.msamp@gmail.com" className="contact-link" aria-label="Email"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>mariana.msamp@gmail.com</a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="contact-link" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>GitHub</a>
          <a href="https://www.linkedin.com/in/mariana-marques-dev/" target="_blank" rel="noopener" className="contact-link" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Footer (design antigo) ─
function Footer({ t }) {
  return (
    <footer className="footer-old">
      <div className="footer-old-inner">
        <h2 className="footer-old-title">{t.footer.title}</h2>
        <p className="footer-old-subtitle">{t.footer.subtitle}</p>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary footer-old-cta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          {t.footer.cta}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <div className="footer-old-credits">
          <p>{t.footer.credits}</p>
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
function Separator() { return <div className="separator"><div className="separator-line"/></div>; }

// ─── App ─────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("pt");
  const t = content[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const navItems = [["home","#hero"],["about","#about"],["projects","#projects"],["contributions","#contributions"],["experience","#experience"]];
  return (
    <>
      <style>{styles}</style>
      <CustomCursor />
      <Nav t={t} lang={lang} setLang={setLang} navItems={navItems}/>
      <main>
        <Hero t={t} lang={lang}/><Separator/><About t={t}/><Achievement t={t}/><Separator/><Stack t={t}/><Separator/>
        <Projects t={t}/><Separator/><Contributions t={t}/><Separator/><Experience t={t}/><Separator/>
        <Contact t={t}/>
      </main>
      <Footer t={t}/>
    </>
  );
}