import React from 'react';
import LegalLayout from '../components/legal/LegalLayout';

const LegalNotice = () => {
  return (
    <LegalLayout 
      title="Aviso Legal" 
      subtitle="Información obligatoria sobre la titularidad y condiciones de uso del sitio web oficial de Encapaco."
      breadcrumb="Aviso Legal"
    >
      <div className="space-y-12">
        <section id="titular">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">1. Datos Identificativos</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
              En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se reflejan los siguientes datos:
            </p>
            <ul className="mt-6 space-y-4 text-neutral-dark/80">
              <li><strong>Titular:</strong> Francisco Javier Fernández Robles</li>
              <li><strong>Nombre Comercial:</strong> Bar Encapaco</li>
              <li><strong>CIF / NIF:</strong> [Pendiente de inserción o disponible bajo solicitud]</li>
              <li><strong>Domicilio:</strong> Plaza Mayor, 2 – 18160 Güéjar Sierra (Granada, España)</li>
              <li><strong>Teléfono:</strong> +34 616 600 772</li>
              <li><strong>Email:</strong> encapaco@gmail.com</li>
              <li><strong>Dominio:</strong> encapaco.com</li>
            </ul>
          </div>
        </section>

        <section id="condiciones">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">2. Condiciones de Uso</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
          </p>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            El sitio web proporciona acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a Francisco Javier Fernández Robles o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
          </p>
        </section>

        <section id="propiedad">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">3. Propiedad Intelectual e Industrial</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            Francisco Javier Fernández Robles por sí o como cesionario, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, etc.).
          </p>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-6">
            Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Francisco Javier Fernández Robles.
          </p>
        </section>

        <section id="responsabilidad">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">4. Exclusión de Garantías y Responsabilidad</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
            Francisco Javier Fernández Robles no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
        </section>

        <section id="jurisdiccion">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-neutral-dark mb-6 tracking-tight">5. Legislación Aplicable y Jurisdicción</h2>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed">
            La relación entre Francisco Javier Fernández Robles y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Granada, España.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default LegalNotice;
