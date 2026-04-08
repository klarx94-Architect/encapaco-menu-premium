import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, LogOut, Package, Eye, EyeOff, Edit3, 
  Save, Upload, CheckCircle2, ChevronRight, Image as ImageIcon,
  Loader2, AlertCircle, X
} from 'lucide-react';

const ADMIN_STORAGE_KEY = 'encapaco_admin_auth';

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // Quitar el prefijo "data:image/jpeg;base64," — GitHub solo quiere el base64 puro
    const base64 = reader.result.split(',')[1];
    resolve(base64);
  };
  reader.onerror = reject;
});

export default function AdminPaco() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Auth Check
  useEffect(() => {
    const auth = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if (auth === '1') {
      setIsAuthenticated(true);
      fetchMenu();
    }
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuData(data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    
    try {
      // Validate password by trying to fetch (or we just use the update with empty data and check for 401)
      const res = await fetch('/api/menu-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: menuData || {} })
      });

      if (res.status === 200 || res.status === 204 || (res.status === 400 && !menuData)) {
         // If 200/204, pass is correct. If 400 because data was empty but pass was correct, also fine.
         // Actually, let's just check for 401.
         if (res.status !== 401) {
            sessionStorage.setItem(ADMIN_STORAGE_KEY, '1');
            setIsAuthenticated(true);
            if (!menuData) fetchMenu();
         } else {
            setAuthError('Contraseña incorrecta. Solo el director de orquesta tiene la llave.');
         }
      } else if (res.status === 401) {
        setAuthError('Contraseña incorrecta. Solo el director de orquesta tiene la llave.');
      }
    } catch (err) {
      setAuthError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword('');
  };

  const toggleVisibility = (catId, itemId = null) => {
    const newData = { ...menuData };
    if (itemId) {
      const cat = newData.categories.find(c => c.id === catId);
      const item = cat.items.find(i => i.id === itemId);
      item.visible = !item.visible;
    } else {
      const cat = newData.categories.find(c => c.id === catId);
      cat.visible = !cat.visible;
    }
    setMenuData(newData);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/menu-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password || '', data: menuData })
      });
      if (res.ok) {
        alert('Cambios guardados con éxito.');
      } else {
        alert('Error al guardar. Verifica la conexión.');
      }
    } catch (err) {
      alert('Error crítico al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const base64 = await toBase64(file);
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${editingItem.id}.${extension}`;
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: password, // la contraseña ya en sessionStorage o estado
          filename,
          base64,
        }),
      });
      
      const data = await res.json();
      if (data.url) {
        // Actualizar image_url del plato en el estado local
        setEditingItem({ ...editingItem, image_url: data.url });
      } else {
        alert(data.error || 'Error subiendo imagen');
      }
    } catch (err) {
      console.error('Error subiendo imagen:', err);
      alert('Error de conexión al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  const updateItemDetails = () => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === editingItem.catId);
    const itemIdx = cat.items.findIndex(i => i.id === editingItem.id);
    cat.items[itemIdx] = { ...editingItem };
    setMenuData(newData);
    setEditingItem(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pearl-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-12 rounded-[3.5rem] bg-white border border-black/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sierra-gold/30 to-transparent" />
          
          <div className="w-20 h-20 bg-sierra-gold/10 rounded-full flex items-center justify-center mx-auto mb-10">
            <Package size={32} className="text-sierra-gold" />
          </div>
          
          <h1 className="text-3xl font-serif font-black text-neutral-dark mb-4 text-center">Acceso Maestro</h1>
          <p className="text-neutral-dark/40 text-center mb-10 font-serif italic text-sm leading-relaxed">
            "Para el director de orquesta. <br/>Introduce la contraseña para gestionar el refugio."
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-pearl-white border border-black/5 focus:outline-none focus:ring-2 focus:ring-sierra-gold/20 font-sans"
                required
              />
            </div>
            
            <AnimatePresence>
              {authError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 text-terracotta-deep/80 text-xs font-bold uppercase tracking-wider px-2"
                >
                  <AlertCircle size={14} />
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-full bg-neutral-dark text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : 'Entrar al Panel'}
            </button>
          </form>
          
          <p className="mt-12 text-center text-[10px] uppercase tracking-widest font-black text-neutral-dark/20">Protocolo Senior Gastro v2.0</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl-white font-sans text-neutral-dark">
      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 lg:w-72 bg-white border-r border-black/5 p-6 z-[600] flex flex-col justify-between overflow-hidden">
        <div className="space-y-12">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 bg-sierra-gold rounded-xl flex items-center justify-center shadow-lg shadow-sierra-gold/20">
              <Package size={20} className="text-white" />
            </div>
            <span className="hidden lg:block text-neutral-dark uppercase tracking-[0.2em] text-[11px] font-black">Encapaco Admin</span>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 bg-neutral-dark text-white rounded-2xl transition-all shadow-lg">
              <LayoutDashboard size={20} />
              <span className="hidden lg:block font-bold text-sm">Carta Maestro</span>
            </button>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 p-4 text-terracotta-deep hover:bg-terracotta-mid/5 w-full rounded-2xl transition-all"
        >
          <LogOut size={20} />
          <span className="hidden lg:block font-bold text-sm">Cerrar Sesión</span>
        </button>
      </nav>

      <main className="pl-20 lg:pl-72 p-6 md:p-12 pb-32">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-black mb-3">Carta Inteligente</h1>
            <p className="text-neutral-dark/40 italic font-serif text-lg">Gestiona la disponibilidad y precios del refugio.</p>
          </div>
          
          <button 
            onClick={handleSaveAll}
            disabled={saving}
            className="group flex items-center gap-4 px-10 py-5 bg-sierra-gold text-neutral-dark rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>Guardar todos los cambios</span>
          </button>
        </header>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-6 text-neutral-dark/20 uppercase tracking-[0.4em] text-xs font-black">
            <Loader2 className="animate-spin" size={32} />
            <span>Sintonizando datos...</span>
          </div>
        ) : (
          <div className="space-y-16">
            {menuData?.categories.map(category => (
              <div key={category.id} className="relative">
                <div className="flex items-center justify-between mb-8 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-black/5">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-neutral-dark text-white rounded-2xl flex items-center justify-center font-serif font-black text-xl">
                      {category.name_es.charAt(0)}
                    </div>
                    <h2 className="text-2xl font-serif font-black">{category.name_es}</h2>
                  </div>
                  <button 
                    onClick={() => toggleVisibility(category.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${
                      category.visible === false 
                        ? 'bg-neutral-dark/10 text-neutral-dark/40' 
                        : 'bg-green-500/10 text-green-600'
                    }`}
                  >
                    {category.visible === false ? <EyeOff size={14} /> : <Eye size={14} />}
                    {category.visible === false ? 'Oculta en web' : 'Visible'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map(item => (
                    <motion.div 
                      key={item.id}
                      layoutId={item.id}
                      className={`bg-white p-6 rounded-[2.5rem] border transition-all ${
                        item.visible === false ? 'border-dashed border-black/10 opacity-70' : 'border-black/5 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-pearl-white rounded-2xl overflow-hidden flex items-center justify-center border border-black/5">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="text-black/5" size={24} />
                          )}
                        </div>
                        <div className="flex gap-2">
                           <button 
                            onClick={() => toggleVisibility(category.id, item.id)}
                            className={`p-3 rounded-full transition-colors ${
                              item.visible === false ? 'text-neutral-dark/30 hover:bg-black/5' : 'text-green-500 hover:bg-green-500/10'
                            }`}
                          >
                            {item.visible === false ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button 
                            onClick={() => setEditingItem({ ...item, catId: category.id })}
                            className="p-3 text-sierra-gold hover:bg-sierra-gold/10 rounded-full transition-colors"
                          >
                            <Edit3 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/30 mb-2">{item.price}</p>
                      <h3 className="text-xl font-serif font-black leading-tight mb-2 line-clamp-1">{item.name_es}</h3>
                      <p className="text-xs text-neutral-dark/40 italic font-serif line-clamp-2 min-h-[32px]">{item.description_es || 'Sin descripción'}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Editing Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="absolute inset-0 bg-neutral-dark/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 bg-pearl-white p-12 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-black/5">
                 <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-white border-8 border-white shadow-xl mb-8 group">
                    {editingItem.image_url ? (
                      <img src={editingItem.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-neutral-dark/10">
                         <ImageIcon size={64} />
                         <span className="text-[10px] font-black uppercase tracking-widest">Sin imagen</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                       <label className="cursor-pointer bg-white text-neutral-dark px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3">
                          <Upload size={14} />
                          {uploading ? 'Subiendo...' : 'Cambiar Imagen'}
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                       </label>
                    </div>
                    
                    {uploading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                         <Loader2 className="animate-spin text-sierra-gold mb-4" size={48} />
                         <p className="text-xs text-neutral-dark/60 font-serif italic">
                            Subiendo imagen... estará visible en producción en ~30 segundos.
                         </p>
                      </div>
                    )}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/30">ID: {editingItem.id}</p>
              </div>

              <div className="w-full md:w-1/2 p-12 space-y-8">
                <div className="flex justify-between items-start">
                   <h2 className="text-3xl font-serif font-black">Editar Plato</h2>
                   <button onClick={() => setEditingItem(null)} className="text-neutral-dark/20 hover:text-neutral-dark transition-colors">
                      <X size={24} />
                   </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-dark/40 mb-3 block">Nombre (ES)</label>
                    <input 
                      type="text" 
                      value={editingItem.name_es}
                      onChange={(e) => setEditingItem({ ...editingItem, name_es: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-pearl-white border border-black/5 focus:outline-none font-bold"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-dark/40 mb-3 block">Precio</label>
                      <input 
                        type="text" 
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl bg-pearl-white border border-black/5 focus:outline-none font-black text-sierra-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-dark/40 mb-3 block">Descripción (ES)</label>
                    <textarea 
                      value={editingItem.description_es || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description_es: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-pearl-white border border-black/5 focus:outline-none font-serif italic text-sm min-h-[100px]"
                    />
                  </div>
                </div>

                <button 
                  onClick={updateItemDetails}
                  className="w-full py-5 rounded-full bg-neutral-dark text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-4"
                >
                  <CheckCircle2 size={16} />
                  Actualizar Datos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Save Reminder */}
      <AnimatePresence>
        {menuData && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[800] lg:hidden"
          >
             <button 
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-4 px-10 py-5 bg-sierra-gold text-neutral-dark rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl active:scale-95 transition-all"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Guardar Cambios
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
