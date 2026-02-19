"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Gem,
  Scale,
  Briefcase,
  Users,
  Smartphone,
  Home,
} from "lucide-react";

export const CorporateView = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const stats = [
    { value: "25+", label: "Años de Experiencia" },
    { value: "500+", label: "Empresas Asesoradas" },
    { value: "98%", label: "Tasa de Éxito" },
    { value: "$2M+", label: "Ahorro Fiscal Generado" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 sm:pt-20 bg-white font-sans text-slate-900"
    >

      {/* IMPROVED HERO */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6">
        {/* Background Grid & Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

        <div className="container mx-auto relative z-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-16 sm:pt-10">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Corporate Intelligence
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Redefiniendo el <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-emerald-400">
                Futuro Empresarial
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-10 leading-relaxed max-w-xl border-l-4 border-emerald-500 pl-4 sm:pl-6">
              Integramos consultoría de alto nivel con soluciones financieras y legales. 
              Transformamos la complejidad corporativa en ventajas competitivas sostenibles.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="group relative bg-white text-slate-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-3 overflow-hidden">
                <span className="relative z-10">Agendar Consultoría</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-all backdrop-blur-sm text-center">
                Explorar Soluciones
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/60 flex flex-col gap-4">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Confían en nosotros</p>
              <div className="flex gap-4 sm:gap-6 opacity-40 grayscale mix-blend-screen items-center flex-wrap">
                 {/* Simple Geometric logos for placeholders */}
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">AEXA</span></div>
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rotate-45 border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">NOVUS</span></div>
                 <div className="flex items-center gap-2"><div className="w-5 h-5 sm:w-6 sm:h-6 rounded-sm border-2 border-white"></div><span className="font-bold text-sm sm:text-lg">VERTEX</span></div>
              </div>
            </div>
          </motion.div>

          {/* Visual Content - Right Side */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="relative hidden lg:block h-[600px] w-full"
          >
            {/* Main Image with sophisticated masking */}
            <div className="absolute inset-0 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
               
               {/* Floating Cards Overlays */}
               <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400"><Gem size={16}/></div>
                       <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Crecimiento</span>
                    </div>
                    <div className="text-white text-2xl font-bold mb-1">+240%</div>
                    <div className="text-slate-400 text-xs">Incremento en Q3 2024</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors cursor-default">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400"><Briefcase size={16}/></div>
                       <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Capital</span>
                    </div>
                    <div className="text-white text-2xl font-bold mb-1">$500M+</div>
                    <div className="text-slate-400 text-xs">Activos bajo gestión</div>
                  </div>
               </div>
            </div>

            {/* Decorative Elements around image */}
            <div className="absolute -z-10 top-[-20px] right-[-20px] w-full h-full border border-slate-800 rounded-2xl"></div>
            <div className="absolute -z-20 top-[20px] left-[-20px] w-full h-full bg-slate-900/50 rounded-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-10 sm:gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-blue-100 rounded-full z-0 opacity-50" />
              <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-emerald-100 rounded-full z-0 opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80"
                alt="Meeting"
                className="relative z-10 rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest mb-4 text-sm">
                Nuestra Filosofía
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
                Más que asesores, somos sus{" "}
                <span className="underline decoration-blue-500 decoration-4 underline-offset-4">
                  socios estratégicos
                </span>
                .
              </h3>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                En un entorno empresarial volátil, la claridad es poder. Nuestro
                enfoque multidisciplinario integra visión legal, perspicacia
                financiera y estrategia corporativa para blindar su negocio y
                acelerar su crecimiento.
              </p>
              <ul className="space-y-4">
                {[
                  "Análisis de riesgo proactivo 360°.",
                  "Implementación de estructuras fiscales eficientes.",
                  "Defensa corporativa implacable.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-800 font-medium"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <ArrowRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-14 sm:py-24 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Nuestra Expertise
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Cubrimos cada ángulo de su corporación con especialistas de primer
              nivel dedicados a su éxito.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            {[
              {
                icon: <Scale size={28} />,
                title: "Derecho Corporativo",
                desc: "Fusiones, adquisiciones, y litigios comerciales complejos manejados con precisión quirúrgica.",
                features: [
                  "Contratos Internacionales",
                  "Propiedad Intelectual",
                  "Litigio Mercantil",
                ],
              },
              {
                icon: <Briefcase size={28} />,
                title: "Consultoría Financiera",
                desc: "Auditoría forense y planificación fiscal estratégica para optimizar cada recurso de su empresa.",
                features: ["Auditoría Externa", "Planning Fiscal", "Valuación de Activos"],
              },
              {
                icon: <Users size={28} />,
                title: "Gestión de Talento",
                desc: "Transformamos su capital humano en su mayor ventaja competitiva mediante liderazgo y cultura.",
                features: [
                  "Headhunting Ejecutivo",
                  "Desarrollo Organizacional",
                  "Compensaciones",
                ],
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white p-6 sm:p-8 rounded-2xl hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] transition-all border border-slate-100 group"
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                  {service.title}
                </h4>
                <p className="text-slate-600 mb-8">{service.desc}</p>
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Cómo se estructura la tarifa de sus servicios?",
                a: "Trabajamos mediante un esquema de iguala mensual personalizado o por proyecto específico, dependiendo de la magnitud y duración del requerimiento.",
              },
              {
                q: "¿Tienen experiencia en mercados internacionales?",
                a: "Sí, contamos con alianzas estratégicas en LATAM, USA y Europa para facilitar la expansión y operaciones transfronterizas de nuestros clientes.",
              },
              {
                q: "¿Cuál es el tiempo de respuesta promedio?",
                a: "Para nuestros clientes corporativos, garantizamos una respuesta inicial en menos de 4 horas y atención prioritaria 24/7 para emergencias legales.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 bg-slate-50 hover:bg-slate-100 text-left font-bold text-slate-800 transition-colors text-sm sm:text-base"
                >
                  {item.q}
                  <motion.div
                    animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-6 text-slate-600 bg-white border-t border-slate-100 text-sm sm:text-base">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Empecemos a trabajar.</h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-md">
                Agenda una consulta inicial gratuita de 30 minutos para evaluar
                sus necesidades y cómo podemos ayudarle.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                    <Smartphone />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Llámenos</div>
                    <div className="text-lg sm:text-xl font-medium">+54 11 5555 0123</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
                    <Home />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-bold">Oficinas</div>
                    <div className="text-base sm:text-xl font-medium">Av. Libertador 1000, Piso 25, CABA</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl">
              <h3 className="text-xl font-bold mb-6">Formulario de Contacto</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email de trabajo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <textarea
                  rows={4}
                  placeholder="Mensaje o Requerimiento"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-slate-800 text-center text-slate-500 text-xs sm:text-sm">
            &copy; 2026 Nexo Corporate Solutions. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
