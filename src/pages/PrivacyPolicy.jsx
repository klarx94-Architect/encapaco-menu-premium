import React from 'react';
import { Helmet } from 'react-helmet';
import LegalLayout from '../components/legal/LegalLayout';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de privacidad | ENCAPACO</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <LegalLayout 
        title="Política de Privacidad" 
        subtitle="Compromiso de protección de datos personales y transparencia en el tratamiento de la información."
        breadcrumb="Privacidad"
      >
        <div className="space-y-12">
          <nav className="mb-12 p-8 rounded-3xl bg-white border border-black/5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-dark/40 mb-6">Contenido de la política</p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm font-bold text-neutral-dark/70 uppercase tracking-widest leading-loose list-none p-0 m-0">
              <li><a href="#responsable" className="hover:text-terracotta-mid transition-colors no-underline">1. Responsable</a></li>
              <li><a href="#finalidad" className="hover:text-terracotta-mid transition-colors no-underline">2. Finalidad</a></li>
              <li><a href="#legitimacion" className="hover:text-terracotta-mid transition-colors no-underline">3. Legitimación</a></li>
              <li><a href="#derechos" className="hover:text-terracotta-mid transition-colors no-underline">4. Sus Derechos</a></li>
              <li><a href="#seguridad" className="hover:text-terracotta-mid transition-colors no-underline">5. Seguridad</a></li>
            </ul>
          </nav>

          <section id="responsable">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">1. Responsable del Tratamiento</h2>
            <div className="prose prose-neutral max-w-none text-neutral-dark/80">
              <p className="text-base md:text-lg leading-relaxed">
                El responsable del tratamiento de los datos recogidos en este sitio web es:
              </p>
              <ul className="mt-4 space-y-2 font-bold">
                <li>Francisco Javier Fernández Robles</li>
                <li>Bar Encapaco</li>
                <li>Email: encapaco@gmail.com</li>
                <li>Plaza Mayor, 2 – 18160 Güéjar Sierra (Granada)</li>
              </ul>
            </div>
          </section>

          <section id="finalidad">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">2. Finalidad del Tratamiento</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
              Tratamos la información que nos facilitan las personas interesadas con el fin de:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-neutral-dark/80 italic font-serif">
              <li>Gestionar las peticiones de información y consultas recibidas a través de los canales de contacto.</li>
              <li>Ofrecer la carta digital y servicios de hostelería solicitados por el cliente.</li>
              <li>Gestión administrativa y cumplimiento de obligaciones legales derivadas de la actividad comercial.</li>
            </ul>
          </section>

          <section id="legitimacion">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">3. Legitimación</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
              La base legal para el tratamiento de sus datos es el <strong>consentimiento del interesado</strong> al contactar con nosotros o solicitar nuestros servicios, así como el cumplimiento de obligaciones legales aplicables a la actividad de hostelería.
            </p>
          </section>

          <section id="derechos">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">4. Derechos del Usuario</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
              Usted tiene derecho a obtener confirmación sobre si estamos tratando datos personales que les conciernan, o no. Las personas interesadas tienen derecho a:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-widest text-neutral-dark/60 italic p-0 m-0">
              <li>• Acceder a sus datos personales.</li>
              <li>• Solicitar la rectificación de los datos inexactos.</li>
              <li>• Solicitar su supresión cuando ya no sean necesarios.</li>
              <li>• Solicitar la limitación u oposición a su tratamiento.</li>
            </ul>
            <p className="mt-8 text-base md:text-lg text-neutral-dark/80 leading-relaxed">
              Para ejercer estos derechos, puede enviar un correo electrónico a <strong>encapaco@gmail.com</strong> adjuntando copia de su DNI.
            </p>
          </section>

          <section id="seguridad">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">5. Seguridad y Conservación</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
              Nos comprometemos al cumplimiento de nuestra obligación de secreto de los datos de carácter personal y de nuestro deber de guardarlos, y adoptaremos las medidas necesarias para evitar su alteración, pérdida, tratamiento o acceso no autorizado. Los datos se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales.
            </p>
          </section>
        </div>
      </LegalLayout>
    </>
  );
};

export default PrivacyPolicy;
