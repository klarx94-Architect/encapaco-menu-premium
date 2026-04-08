import React from 'react';
import LegalLayout from '../components/legal/LegalLayout';

const Accessibility = () => {
  return (
    <LegalLayout 
      title="Accesibilidad" 
      subtitle="Declaración de compromiso con el acceso universal a la información y el diseño inclusivo."
      breadcrumb="Accesibilidad"
    >
      <div className="space-y-12">
        <section id="declaracion">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">1. Declaración de Accesibilidad</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            Francisco Javier Fernández Robles se ha comprometido a hacer accesible su sitio web de conformidad con el Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público.
          </p>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
            La presente declaración de accesibilidad se aplica al sitio web <strong>encapaco.com</strong> y su carta digital.
          </p>
        </section>

        <section id="situacion">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">2. Situación de Conformidad</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6 italic">
            Este sitio web es <strong>parcialmente conforme</strong> con el nivel AA de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 y la norma UNE-EN 301549:2022.
          </p>
        </section>

        <section id="medidas">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">3. Medidas Implementadas</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-8">
            Para garantizar la mejor experiencia posible, se han adoptado las siguientes medidas técnicas en el diseño de Encapaco:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-dark text-pearl-white">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-sierra-gold">Diseño Adaptativo</h3>
              <p className="text-sm text-pearl-white/60 leading-relaxed font-serif italic">Arquitectura fluida para una visualización óptima en cualquier dispositivo y tamaño de pantalla.</p>
            </div>
            <div className="p-8 rounded-3xl border border-black/5 bg-white">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-neutral-dark/80">Contraste de Color</h3>
              <p className="text-sm text-neutral-dark/40 leading-relaxed font-serif italic">Mantenimiento de relaciones de contraste superiores a 4.5:1 en textos informativos críticos.</p>
            </div>
            <div className="p-8 rounded-3xl border border-black/5 bg-white">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-neutral-dark/80">Navegación Teclado</h3>
              <p className="text-sm text-neutral-dark/40 leading-relaxed font-serif italic">Estructura semántica que permite la navegación secuencial y predecible mediante dispositivos de entrada.</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-dark text-pearl-white">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-sierra-gold">Estructura Semántica</h3>
              <p className="text-sm text-pearl-white/60 leading-relaxed font-serif italic">Uso correcto de etiquetas HTML5 (headings, nav, main, footer) para tecnologías de asistencia.</p>
            </div>
          </div>
        </section>

        <section id="comunicacion">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">4. Comunicación y Consultas</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            Si detecta que algún contenido no es accesible o encuentra dificultades en la navegación, puede comunicárnoslo a través de:
          </p>
          <ul className="space-y-4 text-neutral-dark/80">
            <li><strong>Email:</strong> encapaco@gmail.com</li>
            <li><strong>Teléfono:</strong> +34 616 600 772</li>
          </ul>
        </section>

        <div className="pt-12 border-t border-black/5">
           <p className="text-xs font-black uppercase tracking-[0.4em] text-neutral-dark/20 text-center">Última revisión: Abril 2026</p>
        </div>
      </div>
    </LegalLayout>
  );
};

export default Accessibility;
