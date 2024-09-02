import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ height: '100vh', width: '100vw' }}>{children}</body>
    </html>
  );
}
