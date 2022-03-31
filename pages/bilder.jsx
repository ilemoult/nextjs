import Layout from '@/components/Layout';

export default function Bilder() {
  return <Layout title="Bilder">
      <img
      src="/img/logo.jpg"
      srcSet="/img/logo@1x.jpg 1x, /img/logo@2x.jpg 2x" // Je nach Bildschirmauflösung wird das entsprechende Bild gewählt vom Browser
      alt="Bildbeschreibung Logo"
      className="logo" 
      height="100" // dem Bild wird schon vor dem Laden der Platz eingereumt. Hier kommt es nicht auf die tatsächliche Größe an, sondern dem Seitenverhältnis
      width="320" // war zuerst aus der Mode gekommen, jetzt ist es aber wieder best Practise
      loading="lazy" // Bild wird nur dann geladen wenn sie kurz davor ist, in den sichtbaren Bereich zu scrollen
      />
      <p>Text</p>

        <img
            src="https://picsum.photos/id/1011/900/450"
            srcSet="https://picsum.photos/id/1011/450/225 450w, https://picsum.photos/id/1011/900/450 900w, https://picsum.photos/id/1011/1350/675 1350w, https://picsum.photos/id/1011/1800/900 1800w"
            sizes="(max-width: 50rem) 90vw, 48rem" // bis 50 rem breite ist das Bild 90 % aufgelöst, ab 50 rem dann 48 (-padding 2x1)
            // die 50 rem kommen als vordefinition aus dem CSS
            alt="See"
            className="image"
            width="2"
            height="1"
            loading="lazy"
            />

  </Layout>;
}
