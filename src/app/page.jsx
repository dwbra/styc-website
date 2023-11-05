import Adsense from '@/app/components/_AdSense';
import IntroContent from '@/app/components/HomeIntroContent';
import GuidesContent from '@/app/components/HomeGuidesContent';
import BuyMeACoffeeButton from '@/app/components/_BuyMeCoffeeButton';
import HomeForm from '@/app/components/HomeForm';
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
        <HomeForm />
        <BuyMeACoffeeButton />
        <Adsense styles={{ display: 'block', width: '1200px', height: '280px' }} slot="xyz" />
        <BuyMeACoffeeWidget />
      </main>
    </>
  );
}
