import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex">
          <Sidebar />

          <div className="flex-1">
            <Header />

            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}