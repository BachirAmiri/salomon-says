import App from '@/src/App';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <App />
        {children}
      </body>
    </html>
  );
}
