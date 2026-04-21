/* ─────────────────────────────────────────────────────────────
   LV1 Health Admin — Storage Layer
   All data lives in localStorage. Keys prefixed lv1_adm_.
   ───────────────────────────────────────────────────────────── */

const K = {
  products:   'lv1_adm_products',
  brochures:  'lv1_adm_brochures',
  categories: 'lv1_adm_categories',
  settings:   'lv1_adm_settings',
  activity:   'lv1_adm_activity',
  session:    'lv1_adm_session',
  seeded:     'lv1_adm_seeded'
};

/* ── helpers ── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function now() { return new Date().toISOString(); }
function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
}
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

/* ── SEED DATA ── */
const SEED = {
  categories: [
    { id:'cat1', nameFR:'Échographie',  nameAR:'التصوير بالموجات فوق الصوتية', nameEN:'Ultrasound',    icon:'🔊', color:'#27b2d9', createdAt:'2025-01-01' },
    { id:'cat2', nameFR:'Imagerie',     nameAR:'التصوير الطبي',                 nameEN:'Imaging',       icon:'📷', color:'#f59b3f', createdAt:'2025-01-01' },
    { id:'cat3', nameFR:'Accessoires',  nameAR:'الملحقات',                      nameEN:'Accessories',   icon:'🔧', color:'#22c55e', createdAt:'2025-01-01' },
    { id:'cat4', nameFR:'Diagnostics',  nameAR:'التشخيص',                       nameEN:'Diagnostics',   icon:'🏥', color:'#a855f7', createdAt:'2025-01-01' },
    { id:'cat5', nameFR:'Logiciels',    nameAR:'البرمجيات',                      nameEN:'Software',      icon:'💻', color:'#ef4444', createdAt:'2025-01-01' }
  ],

  products: [
    {
      id: 'p1',
      nameFR: 'Clarius L7 HD3', nameAR: 'كلاريوس L7 HD3', nameEN: 'Clarius L7 HD3',
      subtitle: 'Sonde Linéaire MSK',
      category: 'cat1', model: 'HD3-L7',
      featured: true, published: true,
      image: '../asset/clarius 1.jpg',
      descFR: 'Sonde linéaire sans fil pour MSK, vasculaire et tissus superficiels. Compatible iOS et Android, démarrage en 10 secondes, optimisation automatique par IA.',
      descAR: 'مسبار خطي لاسلكي للجهاز العضلي الهيكلي والأوعية الدموية والأنسجة السطحية. متوافق مع iOS وAndroid.',
      descEN: 'Wireless linear probe for MSK, vascular and superficial tissue imaging. iOS & Android compatible, 10-second startup, AI-powered auto-optimization.',
      specs: [
        { key: 'Type de sonde', val: 'Linéaire' },
        { key: 'Fréquence', val: '4 – 13 MHz' },
        { key: 'Application', val: 'MSK, Vasculaire' },
        { key: 'Poids', val: '288 g' },
        { key: 'Dimensions', val: '147 × 76 × 32 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, ISO 13485' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br1',
      createdAt: '2025-01-15'
    },
    {
      id: 'p2',
      nameFR: 'Clarius C3 HD3', nameAR: 'كلاريوس C3 HD3', nameEN: 'Clarius C3 HD3',
      subtitle: 'Sonde Convexe Polyvalente',
      category: 'cat1', model: 'HD3-C3',
      featured: true, published: true,
      image: '../asset/polyvalente.jpg',
      descFR: 'Sonde convexe sans fil pour l\'abdomen, l\'obstétrique et le poumon. Idéale pour les médecins urgentistes et de soins primaires.',
      descAR: 'مسبار محدب لاسلكي للبطن والتوليد والرئة. مثالي لأطباء الطوارئ والرعاية الأولية.',
      descEN: 'Wireless convex probe for abdominal, OB and lung imaging. Ideal for emergency and primary care physicians.',
      specs: [
        { key: 'Type de sonde', val: 'Convexe' },
        { key: 'Fréquence', val: '2 – 5 MHz' },
        { key: 'Application', val: 'Abdomen, Obstétrique' },
        { key: 'Poids', val: '292 g' },
        { key: 'Dimensions', val: '153 × 76 × 35 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, FDA' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br1',
      createdAt: '2025-01-20'
    },
    {
      id: 'p3',
      nameFR: 'Clarius PA HD3', nameAR: 'كلاريوس PA HD3', nameEN: 'Clarius PA HD3',
      subtitle: 'Sonde à Réseau Phasé Cardiaque',
      category: 'cat1', model: 'HD3-PA',
      featured: false, published: true,
      image: '../asset/eco 3.jpg',
      descFR: 'Sonde à réseau phasé sans fil dédiée à l\'échocardiographie et à l\'échographie pulmonaire avancée.',
      descAR: 'مسبار شبكة الطور اللاسلكي المخصص لتخطيط صدى القلب وتصوير الرئة المتقدم.',
      descEN: 'Wireless phased array probe dedicated to echocardiography and advanced lung ultrasound.',
      specs: [
        { key: 'Type de sonde', val: 'Réseau phasé' },
        { key: 'Fréquence', val: '1 – 4 MHz' },
        { key: 'Application', val: 'Cardiologie, Poumon' },
        { key: 'Poids', val: '275 g' },
        { key: 'Dimensions', val: '120 × 68 × 28 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, ISO 13485' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br2',
      createdAt: '2025-02-05'
    },
    {
      id: 'p4',
      nameFR: 'Clarius EC HD3', nameAR: 'كلاريوس EC HD3', nameEN: 'Clarius EC HD3',
      subtitle: 'Sonde Endocavitaire',
      category: 'cat1', model: 'HD3-EC',
      featured: false, published: true,
      image: '../asset/indovarginale.jpg',
      descFR: 'Sonde endocavitaire sans fil pour l\'échographie gynécologique et urologique, avec une qualité d\'image exceptionnelle.',
      descAR: 'مسبار داخلي لاسلكي لتصوير أمراض النساء والمسالك البولية بجودة صورة استثنائية.',
      descEN: 'Wireless endocavitary probe for gynecological and urological ultrasound with exceptional image quality.',
      specs: [
        { key: 'Type de sonde', val: 'Endocavitaire' },
        { key: 'Fréquence', val: '4 – 12 MHz' },
        { key: 'Application', val: 'Gynécologie, Urologie' },
        { key: 'Poids', val: '242 g' },
        { key: 'Dimensions', val: '278 × 32 × 32 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, ISO 13485' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br2',
      createdAt: '2025-02-12'
    },
    {
      id: 'p5',
      nameFR: 'Clarius MC HD3', nameAR: 'كلاريوس MC HD3', nameEN: 'Clarius MC HD3',
      subtitle: 'Sonde Micro-Convexe',
      category: 'cat1', model: 'HD3-MC',
      featured: true, published: true,
      image: '../asset/ecographie polyvalente.jpg',
      descFR: 'Sonde micro-convexe pour les urgences, la pédiatrie et les soins intensifs. Petite taille, haute performance.',
      descAR: 'مسبار محدب مصغر للطوارئ وطب الأطفال والعناية المركزة. حجم صغير وأداء عالٍ.',
      descEN: 'Micro-convex probe for emergency, pediatric and critical care. Small form factor, high performance.',
      specs: [
        { key: 'Type de sonde', val: 'Micro-convexe' },
        { key: 'Fréquence', val: '2 – 8 MHz' },
        { key: 'Application', val: 'Urgences, Pédiatrie' },
        { key: 'Poids', val: '252 g' },
        { key: 'Dimensions', val: '130 × 56 × 30 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, FDA, ISO 13485' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br1',
      createdAt: '2025-02-20'
    },
    {
      id: 'p6',
      nameFR: 'Clarius L20 HD3', nameAR: 'كلاريوس L20 HD3', nameEN: 'Clarius L20 HD3',
      subtitle: 'Sonde Linéaire Haute Fréquence',
      category: 'cat1', model: 'HD3-L20',
      featured: false, published: true,
      image: '../asset/cutanée.jpg',
      descFR: 'Sonde linéaire haute fréquence pour les applications cutanées, ophtalmologiques et les structures superficielles.',
      descAR: 'مسبار خطي عالي التردد للتطبيقات الجلدية وطب العيون والهياكل السطحية.',
      descEN: 'High-frequency linear probe for cutaneous, ophthalmic and superficial structure applications.',
      specs: [
        { key: 'Type de sonde', val: 'Linéaire HF' },
        { key: 'Fréquence', val: '8 – 20 MHz' },
        { key: 'Application', val: 'Cutanée, Ophtalmologie' },
        { key: 'Poids', val: '268 g' },
        { key: 'Dimensions', val: '138 × 64 × 28 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, ISO 13485' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br3',
      createdAt: '2025-03-01'
    },
    {
      id: 'p7',
      nameFR: 'Clarius HD3 Vét', nameAR: 'كلاريوس HD3 بيطري', nameEN: 'Clarius HD3 Vet',
      subtitle: 'Sonde Vétérinaire',
      category: 'cat1', model: 'HD3-VET',
      featured: false, published: true,
      image: '../asset/veterinaire.jpg',
      descFR: 'Scanner ultrasonore sans fil spécialement conçu pour la médecine vétérinaire, grandes et petites espèces.',
      descAR: 'ماسح بالموجات فوق الصوتية لاسلكي مصمم خصيصاً للطب البيطري للحيوانات الكبيرة والصغيرة.',
      descEN: 'Wireless ultrasound scanner specifically designed for veterinary medicine, large and small animals.',
      specs: [
        { key: 'Type de sonde', val: 'Convexe vétérinaire' },
        { key: 'Fréquence', val: '2 – 6 MHz' },
        { key: 'Application', val: 'Vétérinaire' },
        { key: 'Poids', val: '298 g' },
        { key: 'Dimensions', val: '160 × 78 × 38 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE' },
        { key: 'Garantie', val: '2 ans' }
      ],
      brochureId: 'br3',
      createdAt: '2025-03-10'
    },
    {
      id: 'p8',
      nameFR: 'Clarius Urgentiste', nameAR: 'كلاريوس للطوارئ', nameEN: 'Clarius Emergency',
      subtitle: 'Solution Point-of-Care',
      category: 'cat1', model: 'HD3-POC',
      featured: true, published: true,
      image: '../asset/eco urgentiste.jpg',
      descFR: 'Solution complète d\'échographie au point de soins pour les urgentistes. Résistant aux chocs, étanche IP67.',
      descAR: 'حل تصوير شامل بالموجات فوق الصوتية عند نقطة الرعاية لأطباء الطوارئ. مقاوم للصدمات وضد الماء IP67.',
      descEN: 'Complete point-of-care ultrasound solution for emergency physicians. Shock-resistant, IP67 waterproof.',
      specs: [
        { key: 'Type de sonde', val: 'Polyvalente' },
        { key: 'Fréquence', val: '1 – 15 MHz' },
        { key: 'Application', val: 'Urgences, Point-of-Care' },
        { key: 'Poids', val: '310 g' },
        { key: 'Dimensions', val: '165 × 82 × 40 mm' },
        { key: 'Compatibilité', val: 'iOS & Android' },
        { key: 'Certification', val: 'CE, FDA, IP67' },
        { key: 'Garantie', val: '3 ans' }
      ],
      brochureId: 'br2',
      createdAt: '2025-03-18'
    }
  ],

  brochures: [
    {
      id: 'br1',
      titleFR: 'Catalogue Produits Clarius 2025',
      titleAR: 'كتالوج منتجات كلاريوس 2025',
      titleEN: 'Clarius Product Catalog 2025',
      lang: 'FR', cover: '../asset/11.png',
      file: '', productIds: ['p1','p2','p5'],
      createdAt: '2025-01-10'
    },
    {
      id: 'br2',
      titleFR: 'Guide Clinique Échographie',
      titleAR: 'دليل التصوير السريري بالموجات فوق الصوتية',
      titleEN: 'Clinical Ultrasound Guide',
      lang: 'FR', cover: '../asset/222.jpg',
      file: '', productIds: ['p3','p4','p8'],
      createdAt: '2025-02-01'
    },
    {
      id: 'br3',
      titleFR: 'Spécialités & Applications',
      titleAR: 'التخصصات والتطبيقات',
      titleEN: 'Specialties & Applications',
      lang: 'EN', cover: '../asset/images moved 1.jpg',
      file: '', productIds: ['p6','p7'],
      createdAt: '2025-03-05'
    }
  ],

  settings: {
    companyName: 'LV1 Health Tech',
    taglineFR: 'Imagerie médicale haute performance accessible à chaque clinicien.',
    taglineAR: 'التصوير الطبي عالي الأداء في متناول كل طبيب.',
    taglineEN: 'High-performance medical imaging accessible to every clinician.',
    phone: '0021627690338',
    email: 'contact3@lv1-health.com',
    address: '56 avenue de carthage, 1001 Tunis, Tunisia',
    facebook: 'https://www.facebook.com/share/1P1c8GnVzF/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/clarius_tunisie',
    linkedin: 'https://www.linkedin.com/company/clarius-mobile-health-tunisie/',
    tiktok: 'https://www.tiktok.com/@clarius.tunisie',
    password: 'admin2025'
  },

  activity: [
    { id:'a1', type:'product', icon:'📦', message:'Produit "Clarius L7 HD3" ajouté',         at:'2025-04-18T10:23:00Z' },
    { id:'a2', type:'product', icon:'📦', message:'Produit "Clarius C3 HD3" mis à jour',      at:'2025-04-17T14:05:00Z' },
    { id:'a3', type:'brochure',icon:'📚', message:'Brochure "Catalogue 2025" publiée',        at:'2025-04-16T09:45:00Z' },
    { id:'a4', type:'product', icon:'📦', message:'Produit "Clarius MC HD3" mis en vedette',  at:'2025-04-15T16:30:00Z' },
    { id:'a5', type:'cat',     icon:'🏷️', message:'Catégorie "Logiciels" créée',              at:'2025-04-14T11:00:00Z' },
    { id:'a6', type:'settings',icon:'⚙️', message:'Paramètres du site mis à jour',           at:'2025-04-13T08:20:00Z' },
    { id:'a7', type:'brochure',icon:'📚', message:'Brochure "Guide Clinique" ajoutée',        at:'2025-04-12T15:10:00Z' },
    { id:'a8', type:'product', icon:'📦', message:'Produit "Clarius HD3 Vét" publié',         at:'2025-04-11T13:55:00Z' }
  ]
};

/* ── Seed on first load ── */
(function seedOnce() {
  if (load(K.seeded)) return;
  save(K.categories, SEED.categories);
  save(K.products,   SEED.products);
  save(K.brochures,  SEED.brochures);
  save(K.settings,   SEED.settings);
  save(K.activity,   SEED.activity);
  save(K.seeded,     true);
})();

/* ═══════════════════════════════════════════════
   CRUD HELPERS
═══════════════════════════════════════════════ */

/* Products */
const Products = {
  all()       { return load(K.products) || []; },
  get(id)     { return this.all().find(p => p.id === id) || null; },
  save(prod) {
    const list = this.all();
    const idx  = list.findIndex(p => p.id === prod.id);
    if (idx >= 0) {
      list[idx] = prod;
      Activity.log('📦', `Produit "${prod.nameFR}" mis à jour`);
    } else {
      prod.id        = uid();
      prod.createdAt = now();
      list.unshift(prod);
      Activity.log('📦', `Produit "${prod.nameFR}" ajouté`);
    }
    save(K.products, list);
    return prod;
  },
  delete(id) {
    const prod = this.get(id);
    save(K.products, this.all().filter(p => p.id !== id));
    if (prod) Activity.log('🗑️', `Produit "${prod.nameFR}" supprimé`);
  }
};

/* Brochures */
const Brochures = {
  all()       { return load(K.brochures) || []; },
  get(id)     { return this.all().find(b => b.id === id) || null; },
  save(broch) {
    const list = this.all();
    const idx  = list.findIndex(b => b.id === broch.id);
    if (idx >= 0) {
      list[idx] = broch;
      Activity.log('📚', `Brochure "${broch.titleFR}" mise à jour`);
    } else {
      broch.id        = uid();
      broch.createdAt = now();
      list.unshift(broch);
      Activity.log('📚', `Brochure "${broch.titleFR}" ajoutée`);
    }
    save(K.brochures, list);
    return broch;
  },
  delete(id) {
    const b = this.get(id);
    save(K.brochures, this.all().filter(b => b.id !== id));
    if (b) Activity.log('🗑️', `Brochure "${b.titleFR}" supprimée`);
  }
};

/* Categories */
const Categories = {
  all()      { return load(K.categories) || []; },
  get(id)    { return this.all().find(c => c.id === id) || null; },
  name(id, lang) {
    const c = this.get(id);
    if (!c) return '—';
    return lang === 'ar' ? c.nameAR : lang === 'en' ? c.nameEN : c.nameFR;
  },
  save(cat) {
    const list = this.all();
    const idx  = list.findIndex(c => c.id === cat.id);
    if (idx >= 0) {
      list[idx] = cat;
      Activity.log('🏷️', `Catégorie "${cat.nameFR}" mise à jour`);
    } else {
      cat.id        = uid();
      cat.createdAt = now();
      list.push(cat);
      Activity.log('🏷️', `Catégorie "${cat.nameFR}" créée`);
    }
    save(K.categories, list);
    return cat;
  },
  delete(id) {
    const c = this.get(id);
    save(K.categories, this.all().filter(c => c.id !== id));
    if (c) Activity.log('🗑️', `Catégorie "${c.nameFR}" supprimée`);
  }
};

/* Settings */
const Settings = {
  get()        { return load(K.settings) || SEED.settings; },
  save(data)   {
    save(K.settings, data);
    Activity.log('⚙️', 'Paramètres du site mis à jour');
  }
};

/* Activity */
const Activity = {
  all()  { return load(K.activity) || []; },
  log(icon, message) {
    const list = this.all();
    list.unshift({ id: uid(), icon, message, at: now() });
    save(K.activity, list.slice(0, 80));
  }
};

/* Auth */
const Auth = {
  login(password) {
    const s = Settings.get();
    if (password === s.password) {
      save(K.session, { at: now() });
      return true;
    }
    return false;
  },
  logout() { localStorage.removeItem(K.session); },
  check()  { return !!load(K.session); }
};

/* Formatting helpers used across pages */
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
}
function fmtRelative(iso) {
  if (!iso) return '—';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'À l\'instant';
  if (mins < 60)  return `Il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `Il y a ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7)   return `Il y a ${days}j`;
  return fmtDate(iso);
}
