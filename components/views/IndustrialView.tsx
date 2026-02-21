"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Building2,
  Factory,
  Scale,
} from "lucide-react";

export const IndustrialView = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen pt-12 sm:pt-20 bg-white text-slate-900 font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden"
    >

      <section className="relative min-h-[50vh] md:min-h-[60vh] py-16 md:py-24 flex flex-col justify-center px-4 sm:px-6 md:px-12 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 left-12 w-[1px] h-full bg-white/10 hidden md:block" />
        <div className="absolute top-0 right-12 w-[1px] h-full bg-white/10 hidden md:block" />

        <div className="relative z-10 max-w-5xl pt-16 sm:pt-0">
          <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-yellow-400 font-mono font-bold tracking-widest uppercase text-xs sm:text-base">
            <Cpu size={20} />
            <span>Ingeniería & Construcción</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-5 sm:mb-8 leading-[0.9]">
            Construimos <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              El Mañana
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mb-8 sm:mb-12 font-light leading-relaxed">
            Soluciones integrales en infraestructura industrial, obra civil y desarrollo urbano. Comprometidos con la calidad, seguridad y eficiencia en cada proyecto.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-yellow-400 text-black px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 group text-sm sm:text-base">
              Ver Proyectos <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="border border-white/30 backdrop-blur-sm text-white px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors text-sm sm:text-base text-center">
              Contactar Expertos
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest">Descubre Más</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      <section className="bg-yellow-400 text-black py-10 sm:py-16 px-4 sm:px-6 relative z-20 -mt-2">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {[
            { num: "150+", label: "Proyectos Ejecutados" },
            { num: "25", label: "Años de Experiencia" },
            { num: "100%", label: "Cumplimiento ISO" },
            { num: "500+", label: "Expertos en Obra" },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="border-l-2 border-black/20 pl-3 sm:pl-6"
            >
              <div className="text-2xl sm:text-4xl md:text-5xl font-black mb-1">{stat.num}</div>
              <div className="text-[10px] sm:text-sm font-bold uppercase tracking-wider opacity-75">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 sm:py-24 px-4 sm:px-6 md:px-12 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Nuestros Pilares</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 uppercase">Soluciones Industriales</h3>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {[
              { icon: <Building2 size={32} />, title: "Obra Civil", desc: "Desarrollo de infraestructura compleja, edificios corporativos y plantas industriales." },
              { icon: <Factory size={32} />, title: "Plantas Industriales", desc: "Diseño y montaje de naves industriales, optimizadas para procesos productivos." },
              { icon: <Scale size={32} />, title: "Consultoría Técnica", desc: "Estudios de factibilidad, ingeniería de detalle y gestión de permisos." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group bg-white p-6 sm:p-10 hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-yellow-400 relative overflow-hidden"
              >
                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{item.desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-bold uppercase text-sm border-b border-black pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors"
                >
                  Saber Más <ArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 md:opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col justify-center h-full">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-xl">
            <div className="text-yellow-400 font-bold mb-2 uppercase tracking-wide text-xs sm:text-sm">Proyecto Destacado</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 leading-tight">Complejo Energético "Horizonte Sur"</h2>
            <p className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8 font-light">
              Una megaestructura de 50,000 m² dedicada a la generación de energía renovable. Desafío logístico superado en tiempo récord con cero accidentes.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">18</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase">Meses de Obra</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white">$45M</div>
                <div className="text-[10px] sm:text-xs text-gray-500 uppercase">Inversión</div>
              </div>
            </div>

            <button className="bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase hover:bg-yellow-400 transition-colors w-full sm:w-auto text-center text-sm sm:text-base">
              Ver Caso de Estudio
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-10">
          <p className="uppercase tracking-widest text-sm text-gray-400 font-bold">Confianza que Construye</p>
        </div>
        <div className="overflow-hidden whitespace-nowrap relative">
          <motion.div
            className="flex gap-20 items-center justify-center opacity-40 grayscale"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[
              "GRUPO MODELO",
              "CEMENTOS MEX",
              "ACEROS DEL NORTE",
              "PEMEX",
              "CFE",
              "TESLA MFG",
              "BMW GROUP",
              "GRUPO MODELO",
              "CEMENTOS MEX",
              "ACEROS DEL NORTE",
              "PEMEX",
              "CFE",
              "TESLA MFG",
              "BMW GROUP",
            ].map((logo, i) => (
              <h3 key={i} className="text-xl sm:text-2xl md:text-3xl font-black font-mono select-none shrink-0">
                {logo}
              </h3>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-yellow-400 text-black text-center px-4 sm:px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black uppercase mb-5 sm:mb-8 leading-tight">
            ¿Listo para iniciar su próximo gran proyecto?
          </h2>
          <p className="text-base sm:text-xl mb-8 sm:mb-10 font-medium">Contamos con el equipo, la experiencia y la tecnología para hacerlo realidad.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button className="bg-black text-white px-8 sm:px-10 py-4 sm:py-5 font-bold uppercase tracking-wider hover:bg-neutral-800 shadow-xl transition-all hover:-translate-y-1 text-sm sm:text-base">
              Agendar Cita Técnica
            </button>
            <button className="bg-transparent border-2 sm:border-4 border-black text-black px-8 sm:px-10 py-4 sm:py-5 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all text-sm sm:text-base">
              Descargar Brochure
            </button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};
