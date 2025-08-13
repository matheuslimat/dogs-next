import type { Metadata } from 'next';
import './globals.css';
import { type_second } from '@/functions/fonts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { UserContextProvider } from '@/context/user-context';
import { ThemeProvider } from '@/context/theme-context';
import userGet from '@/actions/user-get';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Adopt-me Dogs',
  description: 'Rede de adoção de cachorros.',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const { data: user } = await userGet();

  return (
    <html lang="pt-BR">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else if (theme === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={type_second.variable}>
        <ThemeProvider>
          <UserContextProvider user={user}>
            <div className="App">
              <Header />
              <main className="AppBody">{children}</main>
              <div>{modal}</div>
              <Footer />
            </div>
          </UserContextProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
