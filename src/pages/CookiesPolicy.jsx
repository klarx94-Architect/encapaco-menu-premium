import React from 'react';
import { Helmet } from 'react-helmet';
import LegalLayout from '../components/legal/LegalLayout';

const CookiesPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de cookies | ENCAPACO</title>
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <LegalLayout 
        title="Política de Cookies" 
        subtitle="Explicación técnica y legal sobre el uso de tecnologías de almacenamiento local en Encapaco."
        breadcrumb="Cookies"
      >
        <div className="space-y-12">
          <section id="que-son">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">1. ¿Qué son las Cookies?</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
              Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
            </p>
          </section>

          <section id="tipos">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">2. Cookies utilizadas en este sitio</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-8">
              Encapaco utiliza exclusivamente <strong>cookies técnicas y funcionales</strong> necesarias para el correcto funcionamiento del menú digital y la persistencia de preferencias (como el idioma seleccionado).
            </p>

            <div className="overflow-x-auto rounded-3xl border border-black/5 shadow-sm">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-neutral-dark text-pearl-white">
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-pearl-white/60">Nombre</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-pearl-white/60">Proveedor</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-pearl-white/60">Finalidad</th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-pearl-white/60">Duración</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-neutral-dark/80 italic font-serif">
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-bold">i18nextLng</td>
                    <td className="p-4">Propio</td>
                    <td className="p-4">Almacena la preferencia de idioma del usuario.</td>
                    <td className="p-4">Persistente</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-bold">session_id</td>
                    <td className="p-4">Propio</td>
                    <td className="p-4">Seguridad y gestión de la sesión actual.</td>
                    <td className="p-4">Sesión</td>
                  </tr>
                  <tr className="border-b border-black/5">
                    <td className="p-4 font-bold">sb-access-token</td>
                    <td className="p-4">Supabase</td>
                    <td className="p-4">Gestión de autenticación de administrador (si aplica).</td>
                    <td className="p-4">Sesión</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="gestion">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">3. Cómo gestionar sus Cookies</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
              Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador. A continuación, le ofrecemos enlaces de ayuda para los principales navegadores:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-dark/40 list-none p-0">
              <li>
                <span className="text-sierra-gold mr-2">/</span>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-mid transition-colors no-underline"
                >
                  Chrome
                </a>
              </li>
              <li>
                <span className="text-sierra-gold mr-2">/</span>
                <a
                  href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-mid transition-colors no-underline"
                >
                  Firefox
                </a>
              </li>
              <li>
                <span className="text-sierra-gold mr-2">/</span>
                <a
                  href="https://support.apple.com/es-es/HT201265"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-mid transition-colors no-underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <span className="text-sierra-gold mr-2">/</span>
                <a
                  href="https://support.microsoft.com/es-es/topic/eliminar-y-gestionar-cookies-4eae3c8e-4c72-4b18-b6f2-5d2a1b53b2a3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-mid transition-colors no-underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section id="aceptacion">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">4. Aceptación de la Política</h2>
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
              Francisco Javier Fernández Robles asume que usted acepta el uso de cookies. No obstante, muestra información sobre su Política de Cookies en la parte inferior de cualquier página del portal con el objeto de que usted sea consciente.
            </p>
          </section>
        </div>
      </LegalLayout>
    </>
  );
};

export default CookiesPolicy;
