import '@/styles/globals.css'; // ここでCSSをインポート


export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ height: '100vh', width: '100vw' }}>{children}</body>
    </html>
  );
}
