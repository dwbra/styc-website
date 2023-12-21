import Adsense from '@/app/components/global/_AdSense';
import IntroContent from '@/app/components/home/IntroContent';
import GuidesContent from '@/app/components/home/GuidesContent';
import BuyMeACoffeeButton from '@/app/components/global/_BuyMeCoffeeButton';
import ConverterForm from '@/app/components/home/ConverterForm';
import BuyMeACoffeeWidget from '@/app/components/global/_BuyMeCoffeeWidget';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      {/* <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8692686668487136"
          crossorigin="anonymous"
        ></script>
      </head> */}
      <main className={styles.main}>
        <IntroContent />
        <GuidesContent />
        <ConverterForm />
        <BuyMeACoffeeButton />
        <BuyMeACoffeeWidget />
      </main>
    </>
  );
}
