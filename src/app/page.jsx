import Adsense from '@/app/components/_AdSense_Square';
import IntroContent from '@/app/components/home/IntroContent';
import GuidesContent from '@/app/components/home/GuidesContent';
import BuyMeACoffeeButton from '@/app/components/_BuyMeCoffeeButton';
import ConverterForm from '@/app/components/home/ConverterForm';
import BuyMeACoffeeWidget from '@/app/components/_BuyMeCoffeeWidget';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <IntroContent />
        <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
        <GuidesContent />
        <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
        <ConverterForm />
        <BuyMeACoffeeButton />
        <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
        <BuyMeACoffeeWidget />
      </main>
    </>
  );
}
