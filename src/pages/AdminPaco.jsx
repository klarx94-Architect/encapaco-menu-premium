import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, Settings, Package, User } from 'lucide-react';

export default function AdminPaco() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-pearl-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-black/5 max-w-md w-full"
        >
          <h1 className="text-3xl font-serif font-black text-neutral-dark mb-6">Acceso Admin</h1>
          <p className="text-neutral-dark/60 mb-8 font-serif italic">
            "Solo para el director de orquesta. Identifícate para gestionar el refugio."
          </p>
          {/* Auth component or simple message for now */}
          <div className="bg-terracotta-mid/10 text-terracotta-deep p-4 rounded-xl text-sm mb-6">
            Configuración de Auth pendiente en el Dashboard de Supabase.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl-white font-sans text-neutral-dark">
      <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-black/5 p-6 hidden lg:block">
        <div className="mb-12">
          <span className="text-sierra-gold uppercase tracking-[0.3em] text-[10px] font-black">Encapaco Admin</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-4 p-3 bg-neutral-dark text-white rounded-xl transition-all">
            <LayoutDashboard size={20} />
            <span className="font-bold text-sm">Dashboard</span>
          </button>
          <button className="flex items-center gap-4 p-3 hover:bg-neutral-dark/5 rounded-xl transition-all opacity-60">
            <Package size={20} />
            <span className="font-bold text-sm">Carta / Menú</span>
          </button>
          <button className="flex items-center gap-4 p-3 hover:bg-neutral-dark/5 rounded-xl transition-all opacity-60">
            <Settings size={20} />
            <span className="font-bold text-sm">Configuración</span>
          </button>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
           <button 
             onClick={() => supabase.auth.signOut()}
             className="flex items-center gap-4 p-3 text-terracotta-deep hover:bg-terracotta-mid/5 w-full rounded-xl transition-all"
           >
             <LogOut size={20} />
             <span className="font-bold text-sm">Cerrar Sesión</span>
           </button>
        </div>
      </nav>

      <main className="lg:ml-64 p-6 md:p-12">
         <header className="mb-12 flex justify-between items-center">
            <div>
               <h1 className="text-4xl font-serif font-black mb-2">Panel Maestro</h1>
               <p className="text-neutral-dark/50 italic font-serif">Bienvenido de nuevo, Paco.</p>
            </div>
            <div className="w-12 h-12 bg-sierra-gold rounded-full flex items-center justify-center text-white font-black">
               P
            </div>
         </header>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Vistas Totales</span>
               <span className="text-3xl font-serif font-black">--</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Platos Activos</span>
               <span className="text-3xl font-serif font-black">42</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
               <span className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Estado Server</span>
               <span className="text-terracotta-mid font-bold">ONLINE</span>
            </div>
         </div>
      </main>
    </div>
  );
}
