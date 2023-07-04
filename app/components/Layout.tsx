import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import gammingLogo from '../public/gamming-logo.svg';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Gamming Site' }) => {
  return (
    <div className='layout'>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='header_box'>
        <Link href='/' passHref>
          <div>
            <Image
              src={gammingLogo}
              width={50}
              height={50}
              alt='Picture of the gamming'
            />
            <p> Gaming Hub</p>
          </div>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
