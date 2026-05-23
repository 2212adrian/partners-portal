import React, { useState } from "react";
import { 
  Search, 
  Pill, 
  Barcode, 
  Tag, 
  Truck, 
  ShoppingCart,
  ChevronRight,
  Home,
  Building2,
  X,
  ArrowLeft,
  PackageOpen,
  Plus,
  Minus,
  Trash2,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  type: string;
  form: string;
  size: string;
  ingredients: Array<{ name: string; strength: string }>;
  sku: string;
  barcode: string;
  basePrice: number;
  moq: number;
  leadTime: string;
  stock?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "AA-Cetirizine-478",
    type: "Syrup",
    form: "Oral",
    size: "60 mL / pack",
    ingredients: [
      { name: "Cetirizine", strength: "10 mg" }
    ],
    sku: "UNILAB-CETIRIZINE-478",
    barcode: "4805441005531",
    basePrice: 500.00,
    moq: 10,
    leadTime: "3d",
    stock: 150,
  },
];

interface SupplierProductsProps {
  supplierName: string;
  onBack: () => void;
}

export const SupplierProductsPage: React.FC<SupplierProductsProps> = ({ supplierName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery)
  );

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.moq }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.moq }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.basePrice * item.quantity), 0);
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F8FAFC]">
      {/* Header - Fixed Z-Index to prevent overlapping Sidebar */}
      <div className="sticky top-0 z-0 bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[13px] font-semibold">Back to Suppliers</span>
            </button>
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative flex items-center gap-2 cursor-pointer text-slate-600">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
              <span className="hidden sm:block text-[12px] font-semibold">Cart</span>
            </button>
          </div>

          {/* Restored Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
            <Home size={12} />
            <span>Suppliers</span>
            <ChevronRight size={10} />
            <span className="text-slate-600">{supplierName}</span>
            <ChevronRight size={10} />
            <span className="text-emerald-600 font-semibold">Products</span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-800">{supplierName}</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        <div className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isCartOpen ? 'lg:mr-[380px]' : ''}`}>
          <div className="relative max-w-md mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Full Details Grid */}
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => {
              const cartItem = cart.find(item => item.id === product.id);
              return (
                <div key={product.id} className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 md:p-5">
                    <h3 className="text-base font-bold text-slate-800 mb-2">{product.name}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.type}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.form}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{product.size}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-1">INGREDIENTS</p>
                        <div className="flex items-center gap-2">
                          <Pill size={12} className="text-emerald-500" />
                          <span className="text-[12px] font-semibold text-slate-700">{product.ingredients[0].name} ({product.ingredients[0].strength})</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[10px]">
                          <Tag size={10} className="text-slate-400" />
                          <span className="text-slate-400">SKU:</span>
                          <span className="font-mono text-slate-600">{product.sku}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <Barcode size={10} className="text-slate-400" />
                          <span className="text-slate-400">Barcode:</span>
                          <span className="font-mono text-slate-600">{product.barcode}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div>
                        <p className="text-xl font-bold text-emerald-600">₱{product.basePrice.toFixed(2)}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-[9px] text-slate-500 flex items-center gap-1"><Truck size={10}/> {product.leadTime}</span>
                          <span className="text-[9px] text-slate-500 flex items-center gap-1"><PackageOpen size={10}/> {product.stock} units</span>
                        </div>
                      </div>
                      
                      {cartItem ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(product.id, cartItem.quantity - product.moq)} className="p-1 border border-slate-200 rounded"><Minus size={14}/></button>
                          <span className="text-sm font-bold w-10 text-center">{cartItem.quantity}</span>
                          <button onClick={() => updateQuantity(product.id, cartItem.quantity + product.moq)} className="p-1 border border-slate-200 rounded"><Plus size={14}/></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(product)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-emerald-700 cursor-pointer transition-colors">
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right-Side Mobile Cart (85% width) */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed z-50 bg-white flex flex-col shadow-2xl right-0 top-0 h-full lg:w-[380px] w-[85%]"
              >
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-emerald-600" />
                    <h2 className="font-bold text-slate-800">Your Cart</h2>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg"><X size={20} className="text-slate-400" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[13px] font-bold text-slate-800 leading-tight">{item.name}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - item.moq)} className="p-0.5"><Minus size={12}/></button>
                          <span className="text-[12px] font-bold min-w-[30px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + item.moq)} className="p-0.5"><Plus size={12}/></button>
                        </div>
                        <p className="font-bold text-emerald-600 text-sm">₱{(item.basePrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-slate-100 bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-semibold text-sm">Total</span>
                    <span className="text-xl font-bold text-emerald-600">₱{getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center cursor-pointer justify-center gap-2">
                    <ClipboardList size={18} /> Review Order
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};