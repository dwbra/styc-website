import AdsenseSquare from '@/app/components/_AdSense_Square';
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
        <AdsenseSquare />
        <GuidesContent />
        <AdsenseSquare />
        <ConverterForm />
        <BuyMeACoffeeButton />
        <AdsenseSquare />
        <BuyMeACoffeeWidget />
      </main>
    </>
  );
}
