import Hero from '@/components/Hero/Hero';
import Features from '@/components/Features/Features';
import Community from '@/components/Community/Community';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Features />
      <Community />
    </div>
  );
}
