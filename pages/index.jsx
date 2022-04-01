import Layout from '@/components/Layout';
import ShuffleText from '@/components/ShuffleText';

export default function Home() {
  return (
    <Layout title="Willkommen zu NextJS!">
      <p>Meine erste Next-App</p>
      <ShuffleText />
      <img
        src="/img/logo.jpg"
        srcSet="/img/logo@1x.jpg 1x, /img/logo@2x.jpg 2x" // Je nach Bildschirmauflösung wird das entsprechende Bild gewählt vom Browser
        alt="Bildbeschreibung"
        className="logo"
        height="100" // dem Bild wird schon vor dem Laden der Platz eingereumt. Hier kommt es nicht auf die tatsächliche Größe an, sondern dem Seitenverhältnis
        width="320" // war zuerst aus der Mode gekommen, jetzt ist es aber wieder best Practise
        loading="lazy" // Bild wird nur dann geladen wenn sie kurz davor ist, in den sichtbaren Bereich zu scrollen
      />
    </Layout>
  );
}
