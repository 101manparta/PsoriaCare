import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Flame, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ShieldAlert,
  Layers,
  Activity
} from 'lucide-react';

export const KnowledgeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pengertian' | 'karakteristik' | 'tipe' | 'pemicu' | 'mitos'>('pengertian');
  const [expandedCard, setExpandedCard] = useState<string | null>('plak');

  const lesionFeatures = [
    {
      id: 'plak',
      name: 'Papul & Plak Eritema (Bercak Merah)',
      summary: 'Bercak merah meradang berbatas tegas yang meninggi di atas permukaan kulit normal.',
      detail: 'Eritema terjadi akibat pelebaran kapiler darah di lapisan dermis dan peradangan aktif. Batas antara plak psoriasis dengan kulit sehat di sekitarnya biasanya sangat tegas (well-demarcated).',
      tip: 'Jangan digosok keras saat mandi karena dapat merangsang peradangan lebih lanjut.'
    },
    {
      id: 'skuama',
      name: 'Skuama Berlapis Perak (Sisik Tebal)',
      summary: 'Sisik berwarna putih keperakan atau seperti mika yang menutupi plak kemerahan.',
      detail: 'Akibat sel kulit membelah terlalu cepat (3-4 hari dibandingkan normal 28 hari), sel-sel yang belum matang menumpuk di permukaan membentuk lapisan keratinosis kering berlapis.',
      tip: 'Gunakan keratolitik seperti asam salisilat atau pelembap urea untuk melunakkan sisik sebelum mengoleskan obat kortikosteroid atau calcipotriol.'
    },
    {
      id: 'auspitz',
      name: 'Tanda Auspitz (Auspitz Sign)',
      summary: 'Bintik perdarahan halus menyerupai titik jarum saat sisik dikelupas paksa.',
      detail: 'Di bawah plak terdapat pembuluh darah kapiler yang sangat rapuh. Mengelupas sisik secara paksa merobek dinding kapiler tersebut dan memicu perdarahan halus.',
      tip: '⚠️ PERINGATAN: Jangan pernah mengelupas atau menarik sisik secara paksa. Biarkan sisik rontok alami dengan bantuan pelembap.'
    },
    {
      id: 'koebner',
      name: 'Fenomena Koebner (Koebner Phenomenon)',
      summary: 'Timbulnya lesi psoriasis baru di area kulit yang mengalami trauma fisik atau luka.',
      detail: 'Garukan kuku, luka gores, gesekan ikat pinggang ketat, bekas gigitan serangga, atau bahkan luka tato dapat memicu timbulnya plak psoriasis baru pada area tersebut dalam 7-14 hari.',
      tip: 'Potong kuku tangan secara teratur dan hindari pakaian berbahan kasar atau terlalu ketat.'
    }
  ];

  const typesList = [
    {
      name: 'Psoriasis Plak (Psoriasis Vulgaris)',
      frequency: '~85% - 90% Kasus',
      desc: 'Bentuk paling umum. Lesi berupa plak merah berbatas tegas dengan sisik tebal keperakan, paling sering timbul di siku luar, lutut depan, kulit kepala, dan punggung bawah.',
      treatmentFocus: 'Terapi topikal (Calcipotriol, kortikosteroid potensi sedang-kuat, asam salisilat, dan pelembap intensif).'
    },
    {
      name: 'Psoriasis Kulit Kepala (Scalp Psoriasis)',
      frequency: 'Sangat sering (~50-80% pasien)',
      desc: 'Sisik tebal putih keperakan menyerupai ketombe parah di kulit kepala yang sering melewati garis rambut ke dahi atau belakang leher.',
      treatmentFocus: 'Sediaan losio, solusio, gel, atau sampo mengandung tar/kortikosteroid yang mudah dibilas tanpa residu berminyak.'
    },
    {
      name: 'Psoriasis Guttate (Tetesan Air)',
      frequency: '~10% Kasus (sering usia muda)',
      desc: 'Bintik-bintik merah kecil (seperti tetesan air hujan) yang muncul mendadak di dada, punggung, dan lengan, sering kali dipicu oleh infeksi saluran napas atas (Streptococcus).',
      treatmentFocus: 'Pengobatan infeksi pemicu, terapi topikal potensi sedang, atau fototerapi.'
    },
    {
      name: 'Psoriasis Inversa (Fleksural / Lipatan)',
      frequency: 'Area Lipatan Tubuh',
      desc: 'Lesi merah halus, mengilap, dan tidak bersisik tebal karena kelembapan alami pada lipatan kulit seperti ketiak, selangkangan, dan lipatan bawah payudara.',
      treatmentFocus: 'Inhibitor kalsineurin (Tacrolimus/Pimecrolimus) atau steroid potensi lemah. Hindari steroid kuat pada lipatan kulit!'
    },
    {
      name: 'Artritis Psoriatis (Keterlibatan Sendi)',
      frequency: '~20-30% Pasien Psoriasis',
      desc: 'Peradangan sendi yang menyebabkan kaku di pagi hari, pembengkakan jari ("jari sosis" / daktilitis), dan nyeri pada lutut, tumit, atau tulang belakang.',
      treatmentFocus: 'Wajib dirujuk ke dokter spesialis kulit atau reumatolog untuk terapi sistemik/biologik.'
    }
  ];

  const mythsList = [
    {
      q: 'Mitos: Psoriasis adalah penyakit kulit menular.',
      isFact: false,
      explanation: 'FAKTA: Psoriasis 100% TIDAK MENULAR. Anda tidak dapat tertular atau menularkannya melalui sentuhan, berpelukan, berenang bersama, atau berbagi barang.'
    },
    {
      q: 'Mitos: Psoriasis timbul karena kurang menjaga kebersihan badan.',
      isFact: false,
      explanation: 'FAKTA: Psoriasis adalah gangguan inflamasi autoimun kronis terkait faktor genetik dan sistem imun, bukan karena kotor atau higienitas buruk.'
    },
    {
      q: 'Mitos: Salep kortikosteroid boleh dioleskan tebal-tebal agar cepat sembuh.',
      isFact: false,
      explanation: 'FAKTA: Mengoleskan steroid terlalu tebal tidak mempercepat kesembuhan, melainkan meningkatkan risiko penipisan kulit (atrofi), pembuluh darah melebar, dan efek rebound hebat.'
    },
    {
      q: 'Mitos: Pelembap tidak berguna, yang penting hanya obat salep dokter.',
      isFact: false,
      explanation: 'FAKTA: Pelembap adalah terapi dasar paling penting dalam perawatan psoriasis untuk memperbaiki sawar kulit (skin barrier) dan mencegah gatal.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Knowledge – Mengenal Psoriasis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Panduan Lengkap Mengenal Psoriasis
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Disusun dengan bahasa sederhana yang mudah dipahami berdasarkan literatur dermatologi terpercaya, fokus pada karakteristik lesi, terapi topikal, dan manajemen perawatan mandiri.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('pengertian')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'pengertian'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Apa Itu Psoriasis?
        </button>
        <button
          onClick={() => setActiveTab('karakteristik')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'karakteristik'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          Karakteristik Lesi
        </button>
        <button
          onClick={() => setActiveTab('tipe')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
            activeTab === 'tipe'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Tipe-Tipe Psoriasis
        </button>
        <button
          onClick={() => setActiveTab('pemicu')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'pemicu'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          Faktor Pemicu
        </button>
        <button
          onClick={() => setActiveTab('mitos')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'mitos'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Mitos vs Fakta
        </button>
      </div>

      {/* Tab 1: Pengertian Psoriasis */}
      {activeTab === 'pengertian' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-slate-900">
              Apa yang Sebenarnya Terjadi pada Kulit Psoriasis?
            </h2>
            
            <p className="text-sm text-slate-700 leading-relaxed">
              Psoriasis adalah penyakit peradangan kulit kronis (menahun) yang ditandai oleh <strong>percepatan siklus pergantian sel kulit</strong>. Pada kulit yang sehat, sel-sel kulit baru diproduksi di lapisan dalam dan bergerak ke permukaan kulit dalam waktu sekitar <strong>28 hari</strong> sebelum meluruh secara tidak terlihat.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Kulit Normal</span>
                <p className="text-2xl font-black text-slate-800 font-mono">28 Hari</p>
                <p className="text-xs text-slate-600 mt-1">Siklus regenerasi seimbang, sel kulit mati rontok perlahan dan tak kasat mata.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">Kulit Psoriasis</span>
                <p className="text-2xl font-black text-emerald-700 font-mono">3 - 4 Hari</p>
                <p className="text-xs text-emerald-900 mt-1">Siklus amat cepat, sel belum matang menumpuk membentuk plak merah dan sisik tebal.</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Akibat percepatan abnormal ini, sel-sel keratinosit menumpuk di permukaan kulit, membentuk <strong>plak eritematosa (merah meninggi)</strong> yang dilapisi oleh <strong>skuama (sisik tebal keperakan)</strong>.
            </p>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900 leading-relaxed">
              <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Penting untuk Diingat:</strong> Psoriasis adalah kondisi kronis yang memiliki fase kambuh (flare) dan fase tenang (remisi). Meskipun saat ini belum ada obat yang menyembuhkan total 100%, kondisi ini <em>sangat dapat dikendalikan dengan baik</em> melalui terapi topikal yang patuh dan gaya hidup sehat.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Karakteristik Lesi */}
      {activeTab === 'karakteristik' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <p className="text-sm text-slate-600">
            Berikut adalah karakteristik khas lesi psoriasis menurut pedoman dermatologi. Klik setiap item untuk membaca rincian penting dan tips perawatannya:
          </p>

          <div className="space-y-3">
            {lesionFeatures.map((item) => {
              const isExpanded = expandedCard === item.id;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded ? 'border-emerald-300 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : item.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.summary}
                      </p>
                    </div>
                    <div className="p-1 rounded-lg bg-slate-100 text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 border-t border-slate-100 pt-3 space-y-3 text-xs sm:text-sm text-slate-700">
                      <p className="leading-relaxed">
                        {item.detail}
                      </p>
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs">
                        <strong>Tips Klinis:</strong> {item.tip}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Tipe-Tipe Psoriasis */}
      {activeTab === 'tipe' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typesList.map((t, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {t.frequency}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.desc}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                  <strong className="text-slate-700">Fokus Terapi:</strong> {t.treatmentFocus}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Faktor Pemicu (Triggers) */}
      {activeTab === 'pemicu' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Kenali Pemicu Flare-Up (Kekambuhan)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Psoriasis dapat kambuh atau memburuk jika terpapar pemicu tertentu. Menghindari pemicu adalah pilar penting terapi:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase">
                  <Flame className="w-4 h-4" /> Stres Emosional
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stres memicu pelepasan hormon kortisol dan sitokin pro-inflamasi yang langsung mempercepat proliferasi sel kulit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase">
                  <Activity className="w-4 h-4" /> Infeksi Bakteri
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Infeksi saluran pernapasan atas (radang tenggorokan akibat bakteri Streptococcus) adalah pemicu klasik tipe guttate.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase">
                  <ShieldAlert className="w-4 h-4" /> Trauma Fisik Kulit
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Garukan kuku, luka gores, gesekan ikat pinggang atau sepatu sempit memicu Fenomena Koebner.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase">
                  <Sparkles className="w-4 h-4" /> Cuaca Dingin & Kering
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Udara dingin dan AC membuat kulit kehilangan hidrasi (TEWL meningkat), memicu sisik lebih tebal dan gatal berat.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                  <BookOpen className="w-4 h-4" /> Obat Tertentu
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Obat antihipertensi (Beta-blocker), litium, obat antimalaria, atau penghentian kortikosteroid oral/topikal kuat secara mendadak.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase">
                  <HelpCircle className="w-4 h-4" /> Rokok & Alkohol
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zat kimia rokok dan konsumsi alkohol memperparah tingkat keparahan plak dan menurunkan respons terhadap obat topikal.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Mitos vs Fakta */}
      {activeTab === 'mitos' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <p className="text-xs sm:text-sm text-slate-600">
            Klarifikasi kesalahpahaman umum masyarakat mengenai psoriasis:
          </p>

          <div className="space-y-3">
            {mythsList.map((m, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="p-1 rounded-md bg-rose-100 text-rose-700 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  <p className="text-sm font-bold text-slate-900">{m.q}</p>
                </div>
                <div className="flex items-start gap-2.5 pl-6 pt-1 text-xs text-emerald-900 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{m.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
