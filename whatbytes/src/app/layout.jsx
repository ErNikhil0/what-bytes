import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Whatbytes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}