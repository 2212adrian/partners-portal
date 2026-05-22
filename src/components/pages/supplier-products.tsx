import React, { useState } from "react";
import { 
  Search, 
  Package, 
  Pill, 
  Barcode, 
  Tag, 
  Truck, 
  ShoppingCart,
  Clock,
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
  const [orderNotes, setOrderNotes] = useState("");

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

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="h-full overflow-y-auto bg-[#F8FAFC]">
      {/* Simple Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          {/* Back Button and Cart Indicator */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[13px] font-semibold">Back to Suppliers</span>
            </button>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
              <span className="text-[12px] font-semibold">Cart</span>
            </button>
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
            <Home size={12} />
            <span>Suppliers</span>
            <ChevronRight size={10} />
            <span className="text-slate-600">{supplierName}</span>
            <ChevronRight size={10} />
            <span className="text-emerald-600 font-semibold">Products</span>
          </div>

          {/* Supplier Name */}
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-emerald-600" />
            <h1 className="text-xl font-bold text-slate-800">{supplierName}</h1>
          </div>
        </div>
      </div>

      {/* Main Content with Cart Sidebar */}
      <div className="flex">
        {/* Products Section */}
        <div className={`flex-1 p-6 transition-all duration-300 ${isCartOpen ? 'mr-[380px]' : ''}`}>
          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ingredient, SKU, barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-2 text-[13px] border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Products - Flexbox column */}
          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                const isInCart = !!cartItem;
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-[500px] bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow relative"
                  >
                    {isInCart && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        In Cart
                      </div>
                    )}
                    <div className="p-4">
                      {/* Product Name */}
                      <h3 className="text-base font-bold text-slate-800 mb-2">{product.name}</h3>
                      
                      {/* Type Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {product.type}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {product.form}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {product.size}
                        </span>
                      </div>

                      {/* Ingredients */}
                      <div className="mb-3">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">INGREDIENTS</p>
                        <div className="flex items-center gap-2">
                          <Pill size={12} className="text-emerald-500" />
                          <span className="text-[12px] font-semibold text-slate-700">{product.ingredients[0].name}</span>
                          <span className="text-[11px] text-slate-500">{product.ingredients[0].strength}</span>
                        </div>
                      </div>

                      {/* SKU and Barcode */}
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <Tag size={10} className="text-slate-400" />
                          <span className="text-[9px] text-slate-400 uppercase">SKU:</span>
                          <span className="text-[10px] font-mono text-slate-600">{product.sku}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Barcode size={10} className="text-slate-400" />
                          <span className="text-[9px] text-slate-400 uppercase">Barcode:</span>
                          <span className="text-[10px] font-mono text-slate-600">{product.barcode}</span>
                        </div>
                      </div>

                      {/* Price and Order Info */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div>
                          <p className="text-xl font-black text-emerald-600">₱{product.basePrice.toFixed(2)}</p>
                          <p className="text-[9px] text-slate-400">base price / pack</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Truck size={10} className="text-slate-400" />
                              <span className="text-[9px] text-slate-500">Lead: {product.leadTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <PackageOpen size={10} className="text-slate-400" />
                              <span className="text-[9px] text-slate-500">Stock: {product.stock} units</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={10} className="text-slate-400" />
                              <span className="text-[9px] text-slate-500">Min. {product.moq} packs</span>
                            </div>
                          </div>
                        </div>
                        
                        {isInCart ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, cartItem.quantity - product.moq)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
                            >
                              <Minus size={14} className="text-slate-500" />
                            </button>
                            <span className="text-[13px] font-bold text-slate-700 min-w-[40px] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, cartItem.quantity + product.moq)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition"
                            >
                              <Plus size={14} className="text-slate-500" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product)}
                            className="flex items-center gap-2 text-[12px] font-bold text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
                          >
                            <ShoppingCart size={14} />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-[500px] bg-white rounded-xl border border-slate-200 p-8 text-center"
            >
              <Package size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium text-sm">No products found</p>
              <button
                onClick={clearSearch}
                className="mt-3 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Clear search →
              </button>
            </motion.div>
          )}
        </div>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ x: 380, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 380, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-[380px] bg-white border-l border-slate-200 shadow-xl z-20 flex flex-col"
              style={{ top: 0 }}
            >
              {/* Cart Header */}
              <div className="p-4 border-b border-slate-200 bg-white sticky top-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-emerald-600" />
                    <h2 className="text-lg font-bold text-slate-800">Your Cart</h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 transition"
                  >
                    <X size={18} className="text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">Your cart is empty</p>
                    <p className="text-[11px] text-slate-400 mt-1">Add items from the product list</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[13px] font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-500">{item.size}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-rose-500 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - item.moq)}
                            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-100"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-[13px] font-semibold text-slate-700 min-w-[40px] text-center">
                            {item.quantity} packs
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + item.moq)}
                            className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-100"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-bold text-emerald-600">
                            ₱{(item.basePrice * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-[9px] text-slate-400">
                            ₱{item.basePrice.toFixed(2)} ea.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Notes */}
              <div className="p-4 border-t border-slate-200">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                  Order notes (optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions for this order..."
                  className="w-full p-2 text-[12px] border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 resize-none"
                  rows={3}
                />
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-semibold text-slate-600">Total</span>
                    <span className="text-xl font-black text-emerald-600">
                      ₱{getCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 text-[13px] font-bold text-white bg-emerald-600 py-2.5 rounded-xl hover:bg-emerald-700 transition-all">
                    <ClipboardList size={16} />
                    Review Order →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};