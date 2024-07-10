import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';



function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    // <header className={clsx('hero hero--primary', styles.heroBanner)}>
    <header className={clsx('hero', styles.heroBanner, styles.heroSecretGarden)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            👉 ¡hjk! 👈
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="El_Jardin_Secreto_de_w0x7ce<head />">
      <HomepageHeader />
      <main className={styles.mainContent}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
