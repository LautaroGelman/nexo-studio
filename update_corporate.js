const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'components/views/CorporateView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace colors globally
content = content.replace(/#c8a96e/g, '#3b82f6');
content = content.replace(/#e8d5a3/g, '#93c5fd');
content = content.replace(/200,169,110/g, '59,130,246');

// 2. Update services array
const servicesRegex = /const services = \[\s*\{[\s\S]*?\}\,\s*\];/;
const newServices = `const services = [
    {
      num: "01",
      tag: "Strategy",
      title: "Transformación Estratégica",
      desc: "Diagnóstico profundo y roadmaps de crecimiento personalizados. Convertimos la ambigüedad en ventajas competitivas sostenibles.",
      features: ["Planificación a 5 años", "Análisis de mercado", "Gestión del cambio"],
      accent: "#3b82f6",
      glow: "59,130,246",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900",
    },
    {
      num: "02",
      tag: "Finance",
      title: "Corporate Finance & M&A",
      desc: "Fusiones, adquisiciones y planificación fiscal avanzada. Cada decisión financiera, respaldada por inteligencia cuantitativa de primer nivel.",
      features: ["Auditoría estratégica", "M&A end-to-end", "Valuación de activos"],
      accent: "#8b5cf6",
      glow: "139,92,246",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=900",
    },
    {
      num: "03",
      tag: "People",
      title: "Talento & Liderazgo",
      desc: "Headhunting ejecutivo y cultura organizacional de alto rendimiento. Su activo más valioso, potenciado al máximo.",
      features: ["Headhunting C-suite", "Cultura organizacional", "Compensaciones ejecutivas"],
      accent: "#10b981",
      glow: "16,185,129",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=900",
    },
  ];`;
content = content.replace(servicesRegex, newServices);

// 3. Update services cards rendering
const servicesRenderRegex = /<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">[\s\S]*?<\/section>/;
const newServicesRender = `<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col rounded-3xl overflow-hidden min-h-[480px]"
                style={{ background: "#0d0f18", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-40 group-hover:opacity-50 mix-blend-luminosity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1 p-6 sm:p-8 justify-end">
                  <div className="absolute top-6 left-6">
                    <span
                      className="text-[10px] font-black tracking-[0.22em] px-3 py-1.5 rounded-full border backdrop-blur-md"
                      style={{ color: svc.accent, borderColor: \`\${svc.accent}40\`, background: \`\${svc.accent}12\` }}
                    >
                      {svc.num}
                    </span>
                  </div>
                  <div className="absolute top-6 right-6">
                    <span
                      className="text-[10px] font-bold tracking-[0.18em] px-3 py-1.5 rounded-full backdrop-blur-md"
                      style={{ color: svc.accent, background: \`\${svc.accent}18\` }}
                    >
                      {svc.tag}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="w-10 h-[2px] rounded-full mb-5 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: svc.accent }} />
                    <h3 className="text-2xl font-black text-white mb-3 leading-tight">{svc.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{svc.desc}</p>
                    
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                      <div className="overflow-hidden">
                        <div className="pt-5 border-t flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                          <ul className="space-y-2">
                            {svc.features.map((f, fi) => (
                              <li key={fi} className="flex items-center gap-3 text-[13px] text-slate-300">
                                <CheckCircle2 size={14} style={{ color: svc.accent, flexShrink: 0 }} />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <button className="self-start flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/50 hover:text-white transition-colors duration-300 group/btn mt-2">
                            <span>Explorar solución</span>
                            <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" style={{ color: svc.accent }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ boxShadow: \`inset 0 0 0 1px \${svc.accent}50, 0 0 60px \${svc.accent}20\` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>`;
content = content.replace(servicesRenderRegex, newServicesRender);

// 4. Add process parallax light
const hooksRegex = /const aboutImgY = useTransform\(aboutP, \[0, 1\], \["-10%", "10%"\]\);/;
const newHooks = `const aboutImgY = useTransform(aboutP, [0, 1], ["-10%", "10%"]);

  // ── Process parallax & light ───────────────────────────────────────────────
  const processRef = useRef<HTMLElement>(null);
  const { scrollYProgress: processP } = useScroll({ target: processRef, offset: ["start end", "end start"] });
  const smoothProcessP = useSpring(processP, { damping: 20, stiffness: 100 });
  const lightY = useTransform(smoothProcessP, [0, 1], ["-10%", "110%"]);
  const lightX = useTransform(smoothProcessP, [0, 0.3, 0.6, 1], ["10%", "80%", "10%", "80%"]);`;
content = content.replace(hooksRegex, newHooks);

const processSectionRegex2 = /<section className="py-16 sm:py-28 bg-\[#0a0b10\]">\s*<div className="container mx-auto px-5 sm:px-8 max-w-4xl">/;
const newProcessSection = `<section ref={processRef} className="py-16 sm:py-28 bg-[#0a0b10] relative overflow-hidden">
        {/* Moving Light */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)",
            top: lightY,
            left: lightX,
            x: "-50%",
            y: "-50%"
          }}
        />
        
        <div className="container mx-auto px-5 sm:px-8 max-w-4xl relative z-10">`;
content = content.replace(processSectionRegex2, newProcessSection);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done');
