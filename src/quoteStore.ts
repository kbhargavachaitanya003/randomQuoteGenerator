import { create } from "zustand";

interface Quote {
    id: number;
    text: string;
    author: string;
}

interface QuoteStore {
    quotes: Quote[];
    currentQuote: Quote | null;
    setQuotes: (newQuotes: Quote[]) => void;
    getRandomQuote: () => void;
}

const useQuoteStore = create<QuoteStore>((set) => ({
    quotes: [],
    currentQuote: null,
    setQuotes: (newQuotes) => set({ quotes: newQuotes }),
    getRandomQuote: () => set((state) => ({
        currentQuote: state.quotes[Math.floor(Math.random() * state.quotes.length)]
    })
    )
}))

export default useQuoteStore;