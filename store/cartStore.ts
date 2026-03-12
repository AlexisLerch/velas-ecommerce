// stores/cartStore.ts
import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  showPopup: boolean;
  setShowPopup: (val: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  showPopup: false,
  setShowPopup: (val) => set({ showPopup: val }),
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
          showPopup: true,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        showPopup: true,
      };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));
