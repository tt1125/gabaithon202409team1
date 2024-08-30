export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{margin : 0 , height : '100vh' , width:'100vw'}}>{children}</body>
    </html>
  );
}
