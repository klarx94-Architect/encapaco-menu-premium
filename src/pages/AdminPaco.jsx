import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, LogOut, Package, Eye, EyeOff, Edit3, 
  Save, Upload, CheckCircle2, ChevronRight, Image as ImageIcon,
  Loader2, AlertCircle, X, Trash2, Plus
} from 'lucide-react';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';


const ADMIN_STORAGE_KEY = 'encapaco_admin_auth';

const EMPTY_ITEM = {
  id: '',
  name_es: '',
  name_en: '',
  name_fr: '',
  description_es: '',
  price: '',
  visible: true
};

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]);
  reader.onerror = reject;
});

export default function AdminPaco() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // UI states
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [localPreviews, setLocalPreviews] = useState({}); // catId -> Array of BlobURLs

  // Deep clone helper to ensure React detects nested changes
  const updateMenuData = (newMenu) => {
    setMenuData(JSON.parse(JSON.stringify(newMenu)));
  };

  // Auth Check
  useEffect(() => {
    const auth = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    const savedPw = sessionStorage.getItem('encapaco_admin_pw');
    if (auth === '1' && savedPw) {
      setPassword(savedPw);
      setIsAuthenticated(true);
      fetchMenu();
    }
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      // Bypassing browser cache with a unique timestamp
      const res = await fetch(`/api/menu?t=${Date.now()}`);
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
      const res = await fetch('/api/menu-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: menuData || {} })
      });
      if (res.status !== 401) {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, '1');
        sessionStorage.setItem('encapaco_admin_pw', password);
        setIsAuthenticated(true);
        if (!menuData) fetchMenu();
      } else {
        setAuthError('Contraseña incorrecta. Solo el director de orquesta tiene la llave.');
      }
    } catch (err) {
      setAuthError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/menu-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: menuData })
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert('Error al guardar.');
      }
    } catch (err) {
      alert('Error crítico de conexión.');
    } finally {
      setSaving(false);
    }
  };

  // --- Category Handlers ---

  const setActiveCover = (catId, imageUrl) => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    cat.cover_image = imageUrl;
    updateMenuData(newData);
  };

  const handleCoverImageUpload = async (e, catId) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Immediate local preview
    const previewUrl = URL.createObjectURL(file);
    setLocalPreviews(prev => ({
      ...prev,
      [catId]: [...(prev[catId] || []), previewUrl]
    }));

    setUploadingCover(catId);
    try {
      const base64 = await toBase64(file);
      const ext = file.name.split('.').pop() || 'jpg';
      const filename = `${catId}-cover-${Date.now()}.${ext}`;
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, filename, base64 }),
      });
      const data = await res.json();
      if (data.url) {
        const newData = { ...menuData };
        const cat = newData.categories.find(c => c.id === catId);
        cat.cover_images = [...(cat.cover_images || []), data.url];
        cat.cover_image = data.url;
        updateMenuData(newData);
        // Clear the specific preview once server confirms
        setLocalPreviews(prev => ({
          ...prev,
          [catId]: (prev[catId] || []).filter(url => url !== previewUrl)
        }));
      }
    } catch (err) {
      alert('Error subiendo imagen');
    } finally {
      setUploadingCover(null);
    }
  };

  const handleDeleteCoverImage = (catId, imgIdx) => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    const deletedImg = cat.cover_images[imgIdx];
    cat.cover_images = cat.cover_images.filter((_, i) => i !== imgIdx);
    if (cat.cover_image === deletedImg) {
      cat.cover_image = cat.cover_images[0] || '';
    }
    updateMenuData(newData);
  };

  const toggleCategoryVisibility = (catId) => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    cat.visible = cat.visible === false; // Flip logic
    updateMenuData(newData);
  };

  // --- Item Handlers ---

  const toggleItemVisibility = (catId, itemId) => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    const item = cat.items.find(i => i.id === itemId);
    item.visible = item.visible === false; // Flip logic
    updateMenuData(newData);
  };

  const handleUpdateItem = (catId) => {
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    const idx = cat.items.findIndex(i => i.id === editingItem.id);
    cat.items[idx] = { ...editingItem };
    updateMenuData(newData);
    setEditingItem(null);
  };

  const handleAddItem = (catId) => {
    if (!editingItem?.name_es?.trim()) return;
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    const newItem = {
      id: editingItem.name_es.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      name_es: editingItem.name_es,
      name_en: editingItem.name_en || editingItem.name_es,
      name_fr: editingItem.name_fr || editingItem.name_es,
      description_es: editingItem.description_es || '',
      price: editingItem.price || 'Consultar',
      visible: true,
    };
    cat.items.push(newItem);
    updateMenuData(newData);
    setEditingItem(null);
    setShowAddItem(false);
  };

  const handleDeleteItem = (catId, itemId) => {
    if (!window.confirm('¿Eliminar este plato del menú? Esta acción se guardará al pulsar "Guardar todo".')) return;
    const newData = { ...menuData };
    const cat = newData.categories.find(c => c.id === catId);
    cat.items = cat.items.filter(i => i.id !== itemId);
    updateMenuData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-pearl-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden relative">
        {/* Background Architectural Detail */}
        <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none hidden lg:block">
           <span className="text-[15vw] font-serif font-black leading-none uppercase">PACO</span>
        </div>

        {/* Local Language Toggle for Admin */}
        <div className="absolute top-8 right-8 z-50">
          <LanguageSwitcher className="gap-4" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="max-w-md w-full p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-white border border-black/5 shadow-2xl relative overflow-hidden z-10"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sierra-gold/30 to-transparent" />
          
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-sierra-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10">
            <Package size={32} className="text-sierra-gold" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-dark mb-4 text-center">Acceso Maestro</h1>
          <p className="text-neutral-dark/40 text-center mb-8 sm:mb-10 font-serif italic text-sm leading-relaxed px-2">
            "Para el director de orquesta. <br/>Introduce la contraseña para gestionar el refugio."
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type="password" 
                placeholder="Contraseña" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-6 py-4 rounded-2xl bg-pearl-white border border-black/5 focus:outline-none focus:ring-2 focus:ring-sierra-gold/20 font-sans tracking-widest text-center" 
                required 
              />
            </div>

            <AnimatePresence>
              {authError && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="flex items-center justify-center gap-2 text-terracotta-deep/80 text-[10px] font-black uppercase tracking-widest px-2"
                >
                  <AlertCircle size={12} />
                  <span>{authError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full py-5 rounded-full bg-neutral-dark text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <span className="group-hover:translate-x-1 duration-300">Entrar al Panel</span>
                  <ChevronRight size={14} />
                </>
              )}
            </button>
          </form>
          
          <p className="mt-12 text-center text-[10px] uppercase tracking-widest font-black text-neutral-dark/20">Protocolo Senior Gastro v2.0</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl-white font-sans text-neutral-dark">
      {/* Sidebar - Desktop: Sidenav, Mobile: Bottom Bar */}
      <nav className="fixed bottom-0 left-0 w-full h-20 lg:h-full lg:w-72 bg-white border-t lg:border-t-0 lg:border-r border-black/5 p-4 lg:p-6 z-[600] flex flex-row lg:flex-col justify-between items-center lg:items-stretch">
        <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-6 lg:gap-12 w-full lg:w-auto">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 bg-sierra-gold rounded-xl flex items-center justify-center shadow-lg"><Package size={20} className="text-white" /></div>
            <span className="hidden lg:block text-neutral-dark uppercase tracking-[0.2em] text-[11px] font-black">Encapaco Admin</span>
          </div>
          <button className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-4 p-4 lg:p-4 bg-neutral-dark text-white rounded-2xl shadow-lg">
            <LayoutDashboard size={20} /><span className="hidden lg:block font-bold text-sm">Carta Maestro</span>
          </button>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-4 p-4 text-terracotta-deep hover:bg-terracotta-mid/5 rounded-2xl transition-all">
          <LogOut size={20} /><span className="hidden lg:block font-bold text-sm">Cerrar Sesión</span>
        </button>
      </nav>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} 
            className="fixed bottom-24 lg:bottom-12 right-6 lg:right-12 z-[2000] bg-neutral-dark text-white px-8 py-5 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 pointer-events-none"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Sistema Persistente</p>
              <p className="font-serif font-black text-sm">Carta actualizada en el repositorio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:pl-72 p-6 md:p-12 pb-32 mb-20 lg:mb-0">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-black mb-3">Carta Inteligente</h1>
            <p className="text-neutral-dark/40 italic font-serif text-lg">Gestiona las portadas de categorías y sus platos.</p>
          </div>
          <button onClick={handleSaveAll} disabled={saving} className="group flex items-center gap-4 px-10 py-5 bg-sierra-gold text-neutral-dark rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>Guardar todo al repositorio</span>
          </button>
        </header>

        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-6 text-neutral-dark/20 uppercase tracking-[0.4em] text-xs font-black">
            <Loader2 className="animate-spin" size={32} /><span>Sintonizando datos...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {menuData?.categories.map(category => (
              <motion.div key={category.id} className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm overflow-hidden flex flex-col">
                <div className="relative h-40 bg-neutral-dark overflow-hidden">
                  {category.cover_image ? (
                    <img src={category.cover_image} alt={category.name_es} className="w-full h-full object-cover opacity-70" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon size={40} className="text-white/20" /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/80 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-sierra-gold mb-1">Categoría</span>
                    <h2 className="text-2xl font-serif font-black text-white">{category.name_es}</h2>
                  </div>
                  <button onClick={() => toggleCategoryVisibility(category.id)} className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${category.visible !== false ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-black/30 text-white/40 border border-white/10'}`}>
                    {category.visible !== false ? '● Visible' : '○ Oculta'}
                  </button>
                </div>

                  <div className="px-6 pt-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {[
                        ...(category.cover_images || []), 
                        ...(localPreviews[category.id] || [])
                      ].filter((url, i, self) => self.indexOf(url) === i) // Deduplicate
                      .map((img, idx) => (
                        <div key={idx} className="relative shrink-0 group">
                          <button onClick={() => setActiveCover(category.id, img)} className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${category.cover_image === img ? 'border-sierra-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                            <img 
                              src={img} 
                              alt="" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                // Simple retry for server URLs that are not yet ready
                                if (!img.startsWith('blob:')) {
                                  setTimeout(() => { e.target.src = img + '?t=' + Date.now(); }, 3000);
                                }
                              }}
                            />
                          </button>
                          <button onClick={() => handleDeleteCoverImage(category.id, idx)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                    <label className="shrink-0 w-14 h-14 rounded-xl border-2 border-dashed border-black/10 flex items-center justify-center cursor-pointer hover:border-sierra-gold/40 hover:bg-sierra-gold/5 transition-all">
                      {uploadingCover === category.id ? <Loader2 size={16} className="animate-spin text-sierra-gold" /> : <Plus size={16} className="text-black/20" />}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleCoverImageUpload(e, category.id)} />
                    </label>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-dark/30">{category.items?.length || 0} platos</span>
                  <button onClick={() => setExpandedCategory(category.id)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sierra-gold hover:text-neutral-dark transition-colors">
                    <Edit3 size={12} />Gestionar platos
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Expanded Modal (Items) */}
      <AnimatePresence>
        {expandedCategory && (() => {
          const cat = menuData.categories.find(c => c.id === expandedCategory);
          return (
            <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setExpandedCategory(null); setEditingItem(null); setShowAddItem(false); }} className="absolute inset-0 bg-neutral-dark/60 backdrop-blur-xl" />
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }} className="relative w-full max-w-2xl bg-white rounded-t-[3rem] sm:rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                <div className="p-8 border-b border-black/5 flex items-center justify-between shrink-0">
                  <div><p className="text-[9px] font-black uppercase tracking-[0.3em] text-sierra-gold mb-1">Categoría</p><h2 className="text-2xl font-serif font-black">{cat.name_es}</h2></div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowAddItem(true)} className="flex items-center gap-2 px-5 py-3 bg-sierra-gold text-neutral-dark rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"><Plus size={14} />Añadir plato</button>
                    <button onClick={() => { setExpandedCategory(null); setEditingItem(null); setShowAddItem(false); }} className="text-neutral-dark/20 hover:text-neutral-dark p-2 transition-colors"><X size={24} /></button>
                  </div>
                </div>

                <div className="overflow-y-auto flex-1 p-6 space-y-3">
                  {showAddItem && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-sierra-gold/5 border border-sierra-gold/20 rounded-3xl p-6 space-y-4 overflow-hidden">
                      <p className="text-[10px] font-black uppercase tracking-widest text-sierra-gold">Nuevo plato</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2"><label className="text-[9px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Nombre (ES) *</label><input type="text" placeholder="Ej: Pollo completo" value={editingItem?.name_es || ''} onChange={(e) => setEditingItem({ ...(editingItem || EMPTY_ITEM), name_es: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-white border border-black/5 focus:outline-none font-bold text-sm" /></div>
                        <div><label className="text-[9px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Precio</label><input type="text" placeholder="Ej: 5,50€" value={editingItem?.price || ''} onChange={(e) => setEditingItem({ ...(editingItem || EMPTY_ITEM), price: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-white border border-black/5 focus:outline-none font-black text-sierra-gold text-sm" /></div>
                        <div className="col-span-2"><label className="text-[9px] font-black uppercase tracking-widest text-neutral-dark/40 mb-2 block">Descripción (ES)</label><input type="text" placeholder="Ej: Con tomate y lechuga" value={editingItem?.description_es || ''} onChange={(e) => setEditingItem({ ...(editingItem || EMPTY_ITEM), description_es: e.target.value })} className="w-full px-5 py-3 rounded-xl bg-white border border-black/5 focus:outline-none font-serif italic text-sm" /></div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button onClick={() => handleAddItem(cat.id)} className="flex-1 py-3 rounded-full bg-neutral-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors">Confirmar y añadir</button>
                        <button onClick={() => { setShowAddItem(false); setEditingItem(null); }} className="px-6 py-3 rounded-full border border-black/10 text-neutral-dark/40 text-[10px] font-black uppercase tracking-widest hover:border-black/30 transition-colors">Cancelar</button>
                      </div>
                    </motion.div>
                  )}

                  {cat.items.map((item) => (
                    <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.visible === false ? 'border-dashed border-black/5 bg-black/[0.02] opacity-60' : 'border-black/5 bg-white'}`}>
                      <div className="flex-1 min-w-0">
                        {editingItem?.id === item.id && editingItem?.catId === cat.id ? (
                          <div className="space-y-2">
                            <input type="text" value={editingItem.name_es} onChange={(e) => setEditingItem({ ...editingItem, name_es: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-pearl-white border border-black/5 font-bold text-sm" />
                            <div className="flex gap-2">
                              <input type="text" value={editingItem.price} onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })} className="w-28 px-3 py-2 rounded-xl bg-pearl-white border border-black/5 font-black text-sierra-gold text-sm" />
                              <input type="text" value={editingItem.description_es || ''} onChange={(e) => setEditingItem({ ...editingItem, description_es: e.target.value })} className="flex-1 px-3 py-2 rounded-xl bg-pearl-white border border-black/5 font-serif italic text-sm" />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button onClick={() => handleUpdateItem(cat.id)} className="flex items-center gap-1.5 px-4 py-2 bg-neutral-dark text-white rounded-full text-[9px] font-black uppercase tracking-widest"><CheckCircle2 size={11} /> Guardar</button>
                              <button onClick={() => setEditingItem(null)} className="px-4 py-2 border border-black/10 rounded-full text-neutral-dark/40 text-[9px] font-black uppercase tracking-widest">Cancelar</button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="font-serif font-black text-sm text-neutral-dark truncate">{item.name_es}</p>
                            {item.description_es && <p className="text-[11px] text-neutral-dark/40 font-serif italic truncate">{item.description_es}</p>}
                          </>
                        )}
                      </div>
                      {editingItem?.id !== item.id && (
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] font-black text-sierra-gold whitespace-nowrap">{item.price || '—'}</span>
                          <button onClick={() => toggleItemVisibility(cat.id, item.id)} className={`p-2 rounded-full transition-colors ${item.visible === false ? 'text-neutral-dark/20 hover:bg-black/5' : 'text-green-500 hover:bg-green-500/10'}`}>{item.visible === false ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                          <button onClick={() => setEditingItem({ ...item, catId: cat.id })} className="p-2 text-sierra-gold hover:bg-sierra-gold/10 rounded-full transition-colors"><Edit3 size={15} /></button>
                          <button onClick={() => handleDeleteItem(cat.id, item.id)} className="p-2 text-red-400/60 hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors"><Trash2 size={15} /></button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
