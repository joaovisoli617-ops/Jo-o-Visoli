/* ============================================================
   GRUPO AMPLIA — ADMIN PANEL SCRIPT
   Senha padrão: Amplia@2024
   ============================================================ */

// ── DEFAULTS ────────────────────────────────────────────────
const DEFAULTS = {
  // General
  'g-company':   'Grupo Amplia',
  'g-tagline':   'Estruturação comercial de alta performance.',
  'g-whatsapp':  '5549999999999',
  'g-instagram': 'grupoamplia',

  // Hero
  'h-eyebrow':  'A nossa proposta de valor',
  'h-line1':    'VENDA MAIS e MELHOR através da',
  'h-line2':    'ESTRUTURAÇÃO COMERCIAL',
  'h-line3':    'de alta performance!',
  'h-pillar1':  'Para construir um negócio que venda todos os dias, de forma independente do dono.',
  'h-pillar2':  'Através de uma metodologia que nós vivenciamos diariamente no Grupo Amplia.',
  'h-cta':      'Quero estruturar meu comercial',

  // Números
  stats: [
    { prefix: 'R$', value: '500', suffix: 'mil+', label: 'em faturamento gerado para clientes' },
    { prefix: '',   value: '14',  suffix: ' meses', label: 'de mercado com resultados comprovados' },
    { prefix: '',   value: '60',  suffix: '%', label: 'de taxa de fechamento em reuniões de vendas' },
    { prefix: '',   value: '8',   suffix: '+ clientes', label: 'de grande porte atendidos' },
  ],

  // Soluções
  solutions: [
    { num: '01', icon: '📣', title: 'Assessoria de Marketing', desc: 'Estruturamos o marketing interno e a marca pessoal do empresário para gerar autoridade e atrair clientes de forma previsível.', items: 'Posicionamento de marca\nGestão de redes sociais\nEstratégia de conteúdo\n+6 dígitos gerenciados em anúncios', highlight: '' },
    { num: '02', icon: '🎯', title: 'Mentoria Comercial', desc: 'Montamos todos os processos comerciais do zero: captação, qualificação, agendamento e fechamento.', items: 'Pesquisa completa de ICP\nScript de Cold Call validado\nProcesso de apresentação (valor antes de preço)\nGestão de equipe comercial\nEncontros 1x1 para estruturar o comercial', highlight: '60% de taxa de fechamento em reunião' },
    { num: '03', icon: '🎬', title: 'Captação Audiovisual', desc: 'Produção de conteúdo estratégico que posiciona sua marca e converte visualizações em clientes reais.', items: 'Vídeos institucionais e de vendas\nConteúdo para redes sociais\n+10 milhões de visualizações geradas', highlight: '' },
    { num: '04', icon: '📚', title: 'Produtos Educacionais', desc: 'Cursos e playbooks da área comercial e de marketing para você dominar as estratégias que realmente funcionam.', items: 'Cursos práticos de vendas\nPlaybooks comerciais\nMateriais de marketing', highlight: '' },
  ],

  // Clientes
  clients: [
    { tag: 'Automotivo', name: 'Marlon Veículos', value: '+R$350K', period: 'bruto no 1º mês', desc: 'Implementamos processos comerciais completos e geramos mais de R$350 mil em venda de veículos já no primeiro mês de trabalho conjunto.' },
    { tag: 'Automotivo', name: 'Chama Autocar', value: '+R$100K', period: 'bruto no 1º mês', desc: 'Estruturamos o comercial e geramos mais de R$100 mil em vendas de veículos logo no primeiro mês de assessoria.' },
    { tag: 'Moda', name: 'Colcci', value: 'R$60K', period: 'em vendas geradas', desc: 'Uma das maiores marcas de moda do Brasil confiou na nossa metodologia e colheu resultados expressivos.' },
    { tag: 'Moda esportiva', name: 'Track & Field', value: 'R$30K', period: 'em vendas geradas', desc: 'Marca premium de moda esportiva. Desenvolvemos estratégias comerciais que impulsionaram as vendas de forma consistente.' },
    { tag: 'Moda premium', name: 'Tommy Hilfiger', value: '✓', period: 'parceria ativa', desc: 'Uma das marcas mais reconhecidas do mundo. Confiou no Grupo Amplia para estruturar seus processos comerciais.' },
    { tag: 'Automotivo / Serviços', name: 'F4 Autocenter', value: '✓', period: 'parceria ativa', desc: 'Um dos maiores autocenters do Oeste de SC. Estruturamos o comercial para garantir vendas previsíveis e escaláveis.' },
    { tag: 'Gastronomia', name: 'Alecrim', value: '✓', period: 'parceria ativa', desc: 'Um dos maiores empórios e cafeterias da região. Fortalecemos o posicionamento de marca e os processos de captação.' },
    { tag: 'Mentor', name: 'Ascendy – Ale Ferreira', value: '+180K', period: 'seguidores | R$200K aos 18 anos', desc: 'Nosso mentor que nos ajudou a estruturar a empresa. Ale Ferreira faturou R$200K aos 18 anos e é referência em empreendedorismo jovem.' },
  ],

  // Fundadores
  founders: [
    { initials: 'JV', name: 'João Visoli', role: 'Expert em Vendas e Estratégias de Aquisição', statNum: '+60%', statLabel: 'taxa de conversão em reuniões de vendas', bio: 'Especialista em estruturar processos de captação e fechamento de alto desempenho para empresas de diferentes segmentos.' },
    { initials: 'CL', name: 'Caetano Lorenci', role: 'Expert em Marketing e Gestão de Dados', statNum: '+6 dígitos', statLabel: 'gerenciados em anúncios', bio: 'Especialista em transformar dados em estratégias de marketing que geram receita real e previsível para o negócio.' },
    { initials: 'JM', name: 'João Mortari', role: 'Expert em Criação de Conteúdo e Posicionamento', statNum: '+10M', statLabel: 'de visualizações geradas para clientes', bio: 'Especialista em posicionar marcas e empresários como referências no mercado, convertendo autoridade em vendas.' },
  ],

  // Contato
  'c-title': 'Pronto para vender mais e melhor?',
  'c-sub':   'Fale com nossa equipe e descubra como estruturar seu comercial de alta performance. Sem enrolação.',
  'c-wabtn': 'Falar no WhatsApp',
  'c-igbtn': 'Ver no Instagram',
};

// ── STORAGE KEY ──────────────────────────────────────────────
const STORAGE_KEY  = 'amplia_content';
const PWD_KEY      = 'amplia_pwd_hash';
const SESSION_KEY  = 'amplia_auth';
const DEFAULT_PWD  = 'Amplia@2024';

// ── HASH (simple, client-side) ───────────────────────────────
async function sha256(str) {
  const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function getStoredHash() {
  return localStorage.getItem(PWD_KEY) || null;
}

async function checkPassword(input) {
  const stored = getStoredHash();
  const inputH = await sha256(input);
  if (!stored) {
    // First time: compare to default
    const defaultH = await sha256(DEFAULT_PWD);
    return inputH === defaultH;
  }
  return inputH === stored;
}

async function setPassword(newPwd) {
  const h = await sha256(newPwd);
  localStorage.setItem(PWD_KEY, h);
}

// ── DATA HELPERS ─────────────────────────────────────────────
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function get(key) {
  const data = loadData();
  if (key in data) return data[key];
  if (key in DEFAULTS) return DEFAULTS[key];
  return '';
}

// ── AUTH ─────────────────────────────────────────────────────
const loginScreen = document.getElementById('loginScreen');
const dashboard   = document.getElementById('dashboard');
const loginForm   = document.getElementById('loginForm');
const loginError  = document.getElementById('loginError');
const togglePwd   = document.getElementById('togglePwd');
const pwdInput    = document.getElementById('pwd');

function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

function showDashboard() {
  loginScreen.style.display = 'none';
  dashboard.hidden = false;
  initDashboard();
}

if (isAuthenticated()) {
  showDashboard();
}

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const ok = await checkPassword(pwdInput.value);
  if (ok) {
    sessionStorage.setItem(SESSION_KEY, '1');
    loginError.classList.remove('show');
    showDashboard();
  } else {
    loginError.classList.add('show');
    pwdInput.value = '';
    pwdInput.focus();
  }
});

// Toggle password visibility
togglePwd.addEventListener('click', () => {
  const isText = pwdInput.type === 'text';
  pwdInput.type = isText ? 'password' : 'text';
  togglePwd.setAttribute('aria-label', isText ? 'Mostrar senha' : 'Ocultar senha');
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

// ── TABS ─────────────────────────────────────────────────────
const tabTitles = {
  geral:       'Configurações Gerais',
  hero:        'Hero / Cabeçalho',
  layout:      'Layout do Hero',
  numeros:     'Números / Stats',
  solucoes:    'Soluções',
  clientes:    'Clientes / Resultados',
  fundadores:  'Fundadores',
  contato:     'Contato / Links',
  senha:       'Alterar Senha',
};

function switchTab(tab) {
  document.querySelectorAll('.sidebar__item').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
  document.getElementById('mainTitle').textContent = tabTitles[tab] || tab;
}

document.querySelectorAll('.sidebar__item').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ── SIDEBAR TOGGLE ───────────────────────────────────────────
const sidebar      = document.getElementById('sidebar');
const mainContent  = document.getElementById('mainContent');
const sidebarToggle = document.getElementById('sidebarToggle');

function isMobile() { return window.innerWidth <= 900; }

sidebarToggle.addEventListener('click', () => {
  if (isMobile()) {
    sidebar.classList.toggle('mobile-open');
  } else {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('full');
  }
});

// Close sidebar on mobile link click
document.querySelectorAll('.sidebar__item').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isMobile()) sidebar.classList.remove('mobile-open');
  });
});

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg = 'Alterações salvas com sucesso!') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── ACCORDION CARDS ──────────────────────────────────────────
function makeCardEditor(title, fields, index) {
  const card = document.createElement('div');
  card.className = 'card-editor';
  card.innerHTML = `
    <div class="card-editor__header">
      <h3>${title}</h3>
      <span class="toggle-icon">+</span>
    </div>
    <div class="card-editor__body">
      <div class="form-grid">${fields}</div>
    </div>`;
  card.querySelector('.card-editor__header').addEventListener('click', () => card.classList.toggle('open'));
  return card;
}

// ── STAT EDITORS ─────────────────────────────────────────────
function buildStatEditors() {
  const container = document.getElementById('stat-editors');
  container.innerHTML = '';
  const stats = get('stats');
  stats.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `
      <h3>Stat ${i+1}</h3>
      <div class="form-grid">
        <div class="field full"><label>Prefixo (ex: R$)</label><input type="text" id="stat-prefix-${i}" value="${s.prefix}" /></div>
        <div class="field full"><label>Valor (número)</label><input type="text" id="stat-value-${i}" value="${s.value}" /></div>
        <div class="field full"><label>Sufixo (ex: mil+)</label><input type="text" id="stat-suffix-${i}" value="${s.suffix}" /></div>
        <div class="field full"><label>Legenda</label><input type="text" id="stat-label-${i}" value="${s.label}" /></div>
      </div>`;
    container.appendChild(card);
  });
}

// ── SOLUTION EDITORS ─────────────────────────────────────────
function buildSolEditors() {
  const container = document.getElementById('sol-editors');
  container.innerHTML = '';
  const sols = get('solutions');
  sols.forEach((s, i) => {
    const fields = `
      <div class="field"><label>Ícone (emoji)</label><input type="text" id="sol-icon-${i}" value="${s.icon}" /></div>
      <div class="field"><label>Número</label><input type="text" id="sol-num-${i}" value="${s.num}" /></div>
      <div class="field full"><label>Título</label><input type="text" id="sol-title-${i}" value="${s.title}" /></div>
      <div class="field full"><label>Descrição</label><textarea rows="2" id="sol-desc-${i}">${s.desc}</textarea></div>
      <div class="field full"><label>Itens da lista (um por linha)</label><textarea rows="4" id="sol-items-${i}">${s.items}</textarea></div>
      <div class="field full"><label>Destaque (deixe vazio para ocultar)</label><input type="text" id="sol-highlight-${i}" value="${s.highlight}" /></div>`;
    container.appendChild(makeCardEditor(`Solução ${i+1}: ${s.title}`, fields, i));
  });
}

// ── CLIENT EDITORS ────────────────────────────────────────────
function buildClientEditors() {
  const container = document.getElementById('client-editors');
  container.innerHTML = '';
  const clients = get('clients');
  clients.forEach((c, i) => {
    const fields = `
      <div class="field"><label>Tag / Segmento</label><input type="text" id="cli-tag-${i}" value="${c.tag}" /></div>
      <div class="field"><label>Nome da empresa</label><input type="text" id="cli-name-${i}" value="${c.name}" /></div>
      <div class="field"><label>Valor (ex: +R$350K)</label><input type="text" id="cli-value-${i}" value="${c.value}" /></div>
      <div class="field"><label>Período (ex: bruto no 1º mês)</label><input type="text" id="cli-period-${i}" value="${c.period}" /></div>
      <div class="field full"><label>Descrição</label><textarea rows="3" id="cli-desc-${i}">${c.desc}</textarea></div>`;
    container.appendChild(makeCardEditor(c.name, fields, i));
  });
}

// ── FOUNDER EDITORS ──────────────────────────────────────────
function buildFounderEditors() {
  const container = document.getElementById('founder-editors');
  container.innerHTML = '';
  const founders = get('founders');
  founders.forEach((f, i) => {
    const fields = `
      <div class="field"><label>Iniciais (avatar)</label><input type="text" id="fnd-initials-${i}" value="${f.initials}" /></div>
      <div class="field"><label>Nome completo</label><input type="text" id="fnd-name-${i}" value="${f.name}" /></div>
      <div class="field full"><label>Cargo / especialidade</label><input type="text" id="fnd-role-${i}" value="${f.role}" /></div>
      <div class="field"><label>Número destaque</label><input type="text" id="fnd-statNum-${i}" value="${f.statNum}" /></div>
      <div class="field"><label>Label do número</label><input type="text" id="fnd-statLabel-${i}" value="${f.statLabel}" /></div>
      <div class="field full"><label>Bio</label><textarea rows="3" id="fnd-bio-${i}">${f.bio}</textarea></div>`;
    container.appendChild(makeCardEditor(f.name, fields, i));
  });
}

// ── POPULATE SIMPLE FIELDS ────────────────────────────────────
function populateSimpleFields() {
  const simpleIds = [
    'g-company','g-tagline','g-whatsapp','g-instagram',
    'h-eyebrow','h-line1','h-line2','h-line3','h-pillar1','h-pillar2','h-cta',
    'c-title','c-sub','c-wabtn','c-igbtn',
  ];
  simpleIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = get(id);
  });
}

// ── COLLECT ALL DATA ──────────────────────────────────────────
function collectData() {
  const data = {};

  // Simple fields
  [
    'g-company','g-tagline','g-whatsapp','g-instagram',
    'h-eyebrow','h-line1','h-line2','h-line3','h-pillar1','h-pillar2','h-cta',
    'c-title','c-sub','c-wabtn','c-igbtn',
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });

  // Stats
  const statsCount = DEFAULTS.stats.length;
  data.stats = [];
  for (let i = 0; i < statsCount; i++) {
    data.stats.push({
      prefix: document.getElementById(`stat-prefix-${i}`)?.value ?? '',
      value:  document.getElementById(`stat-value-${i}`)?.value ?? '',
      suffix: document.getElementById(`stat-suffix-${i}`)?.value ?? '',
      label:  document.getElementById(`stat-label-${i}`)?.value ?? '',
    });
  }

  // Solutions
  const solCount = DEFAULTS.solutions.length;
  data.solutions = [];
  for (let i = 0; i < solCount; i++) {
    data.solutions.push({
      num:       document.getElementById(`sol-num-${i}`)?.value ?? '',
      icon:      document.getElementById(`sol-icon-${i}`)?.value ?? '',
      title:     document.getElementById(`sol-title-${i}`)?.value ?? '',
      desc:      document.getElementById(`sol-desc-${i}`)?.value ?? '',
      items:     document.getElementById(`sol-items-${i}`)?.value ?? '',
      highlight: document.getElementById(`sol-highlight-${i}`)?.value ?? '',
    });
  }

  // Clients
  const cliCount = DEFAULTS.clients.length;
  data.clients = [];
  for (let i = 0; i < cliCount; i++) {
    data.clients.push({
      tag:    document.getElementById(`cli-tag-${i}`)?.value ?? '',
      name:   document.getElementById(`cli-name-${i}`)?.value ?? '',
      value:  document.getElementById(`cli-value-${i}`)?.value ?? '',
      period: document.getElementById(`cli-period-${i}`)?.value ?? '',
      desc:   document.getElementById(`cli-desc-${i}`)?.value ?? '',
    });
  }

  // Founders
  const fndCount = DEFAULTS.founders.length;
  data.founders = [];
  for (let i = 0; i < fndCount; i++) {
    data.founders.push({
      initials:  document.getElementById(`fnd-initials-${i}`)?.value ?? '',
      name:      document.getElementById(`fnd-name-${i}`)?.value ?? '',
      role:      document.getElementById(`fnd-role-${i}`)?.value ?? '',
      statNum:   document.getElementById(`fnd-statNum-${i}`)?.value ?? '',
      statLabel: document.getElementById(`fnd-statLabel-${i}`)?.value ?? '',
      bio:       document.getElementById(`fnd-bio-${i}`)?.value ?? '',
    });
  }

  return data;
}

// ── SAVE BUTTON ───────────────────────────────────────────────
document.getElementById('saveBtn').addEventListener('click', () => {
  let data = collectData();
  data = collectLayoutData(data);
  saveData(data);
  showToast('Alterações salvas com sucesso!');
});

// ── CHANGE PASSWORD ───────────────────────────────────────────
document.getElementById('changePwdBtn').addEventListener('click', async () => {
  const current  = document.getElementById('pwd-current').value;
  const newPwd   = document.getElementById('pwd-new').value;
  const confirm  = document.getElementById('pwd-confirm').value;
  const msg      = document.getElementById('pwdMsg');

  const ok = await checkPassword(current);
  if (!ok) {
    msg.className = 'pwd-msg error';
    msg.textContent = 'Senha atual incorreta.';
    return;
  }
  if (newPwd.length < 6) {
    msg.className = 'pwd-msg error';
    msg.textContent = 'A nova senha deve ter pelo menos 6 caracteres.';
    return;
  }
  if (newPwd !== confirm) {
    msg.className = 'pwd-msg error';
    msg.textContent = 'As senhas não coincidem.';
    return;
  }

  await setPassword(newPwd);
  msg.className = 'pwd-msg success';
  msg.textContent = 'Senha alterada com sucesso!';
  document.getElementById('pwd-current').value = '';
  document.getElementById('pwd-new').value = '';
  document.getElementById('pwd-confirm').value = '';
});

// ── LAYOUT DEFAULTS ───────────────────────────────────────────
const LAYOUT_DEFAULTS = {
  'l-headline':       '{VENDA} MAIS e {MELHOR}\natravés da\n{ESTRUTURAÇÃO\nCOMERCIAL}\nde alta {performance!}',
  'l-fontsize':       'xlarge',
  'l-italic':         true,
  'l-show-eyebrow':   true,
  'l-show-pillars':   true,
  'l-show-trust':     true,
  'l-show-ghost-btn': true,
  'l-bg':             'black',
};

// ── MARKUP PARSER ─────────────────────────────────────────────
// {text} = orange span, normal = white, \n = <br>
function parseHeadlineMarkup(raw, isItalic) {
  const lines = raw.split('\n');
  const lastIdx = lines.length - 1;
  return lines.map((line, i) => {
    const parsed = line.replace(/\{([^}]*)\}/g, '<span class="or">$1</span>');
    const isLast = i === lastIdx;
    const wrapped = isLast && isItalic ? `<em>${parsed}</em>` : parsed;
    return i < lastIdx ? wrapped + '<br/>' : wrapped;
  }).join('');
}

// ── FONT SIZE MAP ─────────────────────────────────────────────
const FONT_SIZE_CSS = {
  xlarge: 'clamp(2.6rem, 6vw, 5.2rem)',
  large:  'clamp(2rem, 4.5vw, 4rem)',
  medium: 'clamp(1.6rem, 3.5vw, 3rem)',
  small:  'clamp(1.2rem, 2.5vw, 2rem)',
};

// ── BG MAP ────────────────────────────────────────────────────
const BG_CSS = {
  'black':       '#000',
  'dark-orange': 'linear-gradient(135deg,#000 0%,#1a0800 100%)',
  'deep-dark':   '#080808',
};

// ── POPULATE LAYOUT TAB ───────────────────────────────────────
function populateLayoutTab() {
  const data = loadData();
  const lget = key => key in data ? data[key] : LAYOUT_DEFAULTS[key];

  const headlineEl = document.getElementById('l-headline');
  if (headlineEl) headlineEl.value = lget('l-headline');

  const fontSize = lget('l-fontsize');
  document.getElementById('l-fontsize').value = fontSize;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === fontSize);
  });

  const bg = lget('l-bg');
  document.getElementById('l-bg').value = bg;
  document.querySelectorAll('.bg-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.bg === bg);
  });

  const checkboxIds = ['l-italic','l-show-eyebrow','l-show-pillars','l-show-trust','l-show-ghost-btn'];
  checkboxIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = lget(id);
  });

  updatePreview();
}

// ── LIVE PREVIEW ──────────────────────────────────────────────
function updatePreview() {
  const raw      = document.getElementById('l-headline')?.value ?? '';
  const isItalic = document.getElementById('l-italic')?.checked ?? true;
  const fontSize = document.getElementById('l-fontsize')?.value ?? 'xlarge';
  const bg       = document.getElementById('l-bg')?.value ?? 'black';
  const showEyebrow   = document.getElementById('l-show-eyebrow')?.checked ?? true;
  const showPillars   = document.getElementById('l-show-pillars')?.checked ?? true;
  const showTrust     = document.getElementById('l-show-trust')?.checked ?? true;
  const showGhostBtn  = document.getElementById('l-show-ghost-btn')?.checked ?? true;

  const prevHeadline = document.getElementById('prevHeadline');
  const prevHero     = document.getElementById('previewHero');
  const prevEyebrow  = document.getElementById('prevEyebrow');
  const prevPillars  = document.getElementById('prevPillars');
  const prevTrust    = document.getElementById('prevTrust');
  const prevGhostBtn = document.getElementById('prevGhostBtn');

  if (prevHeadline) {
    prevHeadline.innerHTML = parseHeadlineMarkup(raw, isItalic);
    prevHeadline.className = `preview-headline fs-${fontSize}`;
  }
  if (prevHero) prevHero.style.background = BG_CSS[bg] ?? '#000';
  if (prevEyebrow)  prevEyebrow.style.display  = showEyebrow  ? '' : 'none';
  if (prevPillars)  prevPillars.style.display   = showPillars  ? '' : 'none';
  if (prevTrust)    prevTrust.style.display     = showTrust    ? '' : 'none';
  if (prevGhostBtn) prevGhostBtn.style.display  = showGhostBtn ? '' : 'none';
}

// ── LAYOUT EVENT LISTENERS ────────────────────────────────────
function initLayoutTab() {
  // Headline textarea live update
  document.getElementById('l-headline')?.addEventListener('input', updatePreview);

  // Font size buttons
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('l-fontsize').value = btn.dataset.size;
      updatePreview();
    });
  });

  // BG buttons
  document.querySelectorAll('.bg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('l-bg').value = btn.dataset.bg;
      updatePreview();
    });
  });

  // Checkboxes
  ['l-italic','l-show-eyebrow','l-show-pillars','l-show-trust','l-show-ghost-btn'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updatePreview);
  });
}

// ── COLLECT LAYOUT DATA ───────────────────────────────────────
function collectLayoutData(existing) {
  existing['l-headline']       = document.getElementById('l-headline')?.value ?? '';
  existing['l-fontsize']       = document.getElementById('l-fontsize')?.value ?? 'xlarge';
  existing['l-bg']             = document.getElementById('l-bg')?.value ?? 'black';
  existing['l-italic']         = document.getElementById('l-italic')?.checked ?? true;
  existing['l-show-eyebrow']   = document.getElementById('l-show-eyebrow')?.checked ?? true;
  existing['l-show-pillars']   = document.getElementById('l-show-pillars')?.checked ?? true;
  existing['l-show-trust']     = document.getElementById('l-show-trust')?.checked ?? true;
  existing['l-show-ghost-btn'] = document.getElementById('l-show-ghost-btn')?.checked ?? true;
  return existing;
}

// ── INIT ──────────────────────────────────────────────────────
function initDashboard() {
  populateSimpleFields();
  buildStatEditors();
  buildSolEditors();
  buildClientEditors();
  buildFounderEditors();
  populateLayoutTab();
  initLayoutTab();
}
