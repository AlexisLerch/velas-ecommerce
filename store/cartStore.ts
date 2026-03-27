import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setItems: (items: CartItem[]) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;

  showPopup: boolean;
  setShowPopup: (val: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // 🔥 REEMPLAZAR carrito
      setItems: (items) => set({ items }),

      clearCart: () => set({ items: [] }),

      showPopup: false,
      setShowPopup: (val) => set({ showPopup: val }),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i,
              ),
              showPopup: true,
            };
          }

          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
            showPopup: true,
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      // 🔥 helpers
      getTotalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // 🔥 clave en localStorage
    },
  ),
);
