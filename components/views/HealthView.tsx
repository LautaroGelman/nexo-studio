"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gem,
  Star,
  Heart,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";

export const HealthView = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: 0,
      title: "Medicina Estética",
      icon: <Gem size={24} />,
      desc: "Tratamientos no invasivos para rejuvenecimiento facial y corporal.",
      items: ["Botox & Fillers", "Bioestimulación", "Rinomodelación", "Peeling Químico"],
    },
    {
      id: 1,
      title: "Odontología Premium",
      icon: <Star size={24} />,
      desc: "Diseño de sonrisas y salud bucal con tecnología digital 3D.",
      items: ["Carillas de Porcelana", "Implantes Suizos", "Ortodoncia Invisible", "Blanqueamiento Láser"],
    },
    {
      id: 2,
      title: "Dermatología Clínica",
      icon: <Heart size={24} />,
      desc: "Cuidado experto de la salud de tu piel con diagnóstico avanzado.",
      items: ["Control de Acné", "Rosácea", "Mesoterapia", "Luz Pulsada"],
    },
  ];

  const testimonials = [
    { text: "La atención es impecable desde que entras. El Dr. Martínez transformó mi sonrisa.", name: "Carla R.", role: "Paciente Ortodoncia" },
    { text: "Tecnología de punta y un trato súper humano. Me sentí muy cuidada en todo momento.", name: "Sofía M.", role: "Paciente Estética" },
    { text: "Resultados naturales, que era lo que más buscaba. Superaron mis expectativas.", name: "Luciana G.", role: "Paciente Facial" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-12 sm:pt-20 bg-white text-slate-800 font-sans selection:bg-emerald-100 overflow-x-hidden"
    >

      <section className="relative min-h-[50vh] md:min-h-[60vh] py-16 md:py-24 flex items-center overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-blue-50/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-emerald-100 shadow-sm text-emerald-700 text-xs sm:text-sm font-semibold mb-5 sm:mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Excelencia en Bienestar
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight tracking-tight"
            >
              Belleza que nace de la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Salud
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-slate-500 mb-7 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Fusionamos ciencia médica, tecnología avanzada y una visión artística para resaltar tu mejor versión. Un espacio seguro, ético y profesional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="bg-emerald-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-[0_10px_20px_-5px_rgba(5,150,105,0.3)] flex items-center justify-center gap-2 w-full sm:w-auto">
                Agendar Consulta
                <ArrowRight size={18} />
              </button>
              <button className="bg-white text-slate-600 border border-slate-200 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto text-center">
                Nuestros Profesionales
              </button>
            </motion.div>

            <div className="mt-8 sm:mt-12 flex items-center justify-center lg:justify-start gap-6 sm:gap-8">
              {[
                { label: "Pacientes Felices", val: "5k+" },
                { label: "Años Experiencia", val: "15+" },
                { label: "Especialistas", val: "12" },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900">{stat.val}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 w-full aspect-[4/5] sm:aspect-[4/5] md:aspect-square rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"
                alt="Healthy Skin"
                className="w-full h-full object-cover"
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Tecnología Láser 2024</div>
                    <div className="text-xs text-slate-500">Certificación Internacional FDA</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-100 to-transparent rounded-full z-0 opacity-50 blur-3xl" />
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">Tratamientos a tu Medida</h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Diseñamos protocolos personalizados combinando las técnicas más avanzadas del mercado para asegurar resultados naturales y duraderos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className={`p-5 sm:p-8 rounded-2xl bg-white shadow-xl shadow-slate-200/50 border transition-all duration-300 cursor-pointer ${
                  activeService === idx
                    ? "border-emerald-500 ring-4 ring-emerald-50"
                    : "border-transparent hover:border-emerald-200"
                }`}
                onClick={() => setActiveService(idx)}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    activeService === idx ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed">{service.desc}</p>

                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24 bg-emerald-900 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Voces de Nuestra Comunidad</h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-5 sm:p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="flex gap-1 mb-4 text-emerald-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-emerald-100 italic mb-4 sm:mb-6">"’{t.text}’"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-300" />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-emerald-300 uppercase tracking-wide">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 py-8 sm:py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 opacity-60">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Gem className="text-emerald-600" size={20} />
            <span>Lumina Health</span>
          </div>
          <div className="text-sm text-slate-500">&copy; 2026 Lumina Estética Integral.</div>
          <div className="flex gap-4">
            <Instagram size={20} className="hover:text-emerald-600 cursor-pointer transition-colors" />
            <Facebook size={20} className="hover:text-emerald-600 cursor-pointer transition-colors" />
            <MessageCircle size={20} className="hover:text-emerald-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
