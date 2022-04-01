import Layout from '@/components/Layout';
import Image from 'next/image';
import hongKong from '@/img/hong-kong.jpg'; // geht nicht in JS // nur in next.js möglich

export default function Bilder() {
  return (
    <Layout title="Bilder">

      <Image /* Image Element ist Next spezifisch - beste konvertierung */
        src={hongKong}
        alt="Hong Kong"
        // width={5184} überflüssig
        // height={3456}
        sizes="(max-width: 50rem) 90vw, 48rem"
        layout="responsive"
        /*
      Wenn man ein Bild, das auf dem Server liegt, zuvor importiert
      und bei src einsetzt, kann man width und height weglassen.
      placeholder="blur" erzeugt eine verschwommene sehr kleine
      Variante des Bildes, die sofort sichtbar ist und dann später
      durch das volle Bild ausgetauscht wird.
      */
        placeholder="blur"
      />

      <img
        src="/img/logo.jpg"
        srcSet="/img/logo@1x.jpg 1x, /img/logo@2x.jpg 2x" // Je nach Bildschirmauflösung wird das entsprechende Bild gewählt vom Browser
        alt="Bildbeschreibung"
        className="logo"
        height="100" // dem Bild wird schon vor dem Laden der Platz eingereumt. Hier kommt es nicht auf die tatsächliche Größe an, sondern dem Seitenverhältnis
        width="320" // war zuerst aus der Mode gekommen, jetzt ist es aber wieder best Practise
        loading="lazy" // Bild wird nur dann geladen wenn sie kurz davor ist, in den sichtbaren Bereich zu scrollen
      />

      <img
        src="https://picsum.photos/id/1011/900/450"
        srcSet="https://picsum.photos/id/1011/450/225 450w, https://picsum.photos/id/1011/900/450 900w, https://picsum.photos/id/1011/1350/675 1350w, https://picsum.photos/id/1011/1800/900 1800w"
        sizes="(max-width: 50rem) 90vw, 48rem" // bis 50 rem breite ist das Bild 90 % aufgelöst, ab 50 rem dann 48 (-padding 2x1)
        // die 50 rem kommen als vordefinition aus dem CSS
        alt="See"
        alt="Frau im Kanu"
        className="image"
        width="2"
        height="1"
        loading="lazy"
      />

      <picture> {/* Hülle um das img Element */}
        <source /* wenn hier bei source nichts passt, nimmt der Browser die normalen img Anweisungen */
          media="(max-width: 30rem) and (orientation: portrait)"
          srcSet="/img/header-image-portrait.jpg"
        />
        <source
          media="(max-width: 40rem) and (orientation: portrait)"
          srcSet="/img/header-image-square.jpg"
        />
        <img
          className="image"
          src="/img/header-image-landscape@1000.jpg"
          srcSet="/img/header-image-landscape@1000.jpg 1000w,/img/header-image-landscape@1500.jpg 1500w,/img/header-image-landscape@2000.jpg 2000w"
          sizes="(max-width: 52rem) 90vw, 50rem"
          loading="lazy"
          alt=""
        />
      </picture>

      <picture>
        <source srcSet="/img/herbst.webp" type="image/webp" />
        <img
          className="image"
          src="/img/herbst.jpg"
          alt=""
          loading="lazy"
          width="4"
          height="3"
        />
      </picture>

      <Image /* Image Element ist Next spezifisch - beste konvertierung */
      src="/img/hong-kong.jpg"
      alt="Hong Kong"
      width={5184}
      height={3456}
      sizes="(max-width: 50rem) 90vw, 48rem"
      layout="responsive"
      />

    </Layout>
  );
}


