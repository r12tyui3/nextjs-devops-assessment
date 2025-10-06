import Head from 'next/head';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>DevOps Assessment • Ritika Singh</title>
        <meta name="description" content="Containerized Next.js app for DevOps assessment by Ritika Singh" />
        <meta name="author" content="Ritika Singh" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, DevOps World! 👋</h1>
        <p className={styles.subtitle}>
          This Next.js app is built, containerized, and k8s-ready by Ritika Singh. Time to shine!
        </p>
        <section className={styles.section}>
          <h2>What's under the hood?</h2>
          <ul>
            <li>Next.js 14 running on Node 18</li>
            <li>Containerized with a multi-stage Docker build</li>
            <li>Built & pushed via GitHub Actions into GHCR</li>
            <li>Deployed on Kubernetes (Minikube)</li>
            <li>Production-ready with health checks and probes</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>DevOps Assessment Features</h2>
          <ul>
            <li>✅ Docker containerization with multi-stage build</li>
            <li>✅ GitHub Container Registry (GHCR) integration</li>
            <li>✅ Kubernetes deployment manifests</li>
            <li>✅ Health check API endpoints</li>
            <li>✅ CI/CD pipeline with GitHub Actions</li>
            <li>✅ Security best practices implemented</li>
          </ul>
        </section>
      </main>
    </>
  );
}