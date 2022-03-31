import Layout from '@/components/Layout';
import NewsList from '@/components/NewsList';

console.log(process.env.TEST); // Kein JS Object - Kein Destrukturing möglich
const apiKey = process.env.NEWS_API_KEY;

const testResults = {
    status: 'ok',
    totalResults: 38,
  
    articles: [
      {
        source: {
          id: 'cnn',
          name: 'CNN',
        },
        author: 'Chris Isidore, CNN Business',
        title: "Boeing's 737 Max gets approval to fly passengers again - CNN",
        description:
          "The Federal Aviation Administration Wednesday gave approval for the Boeing 737 Max to carry passengers again, ending the jet's 20-month grounding.",
        url: 'https://www.cnn.com/2020/11/18/business/boeing-737-max-approval/index.html',
        urlToImage:
          'https://cdn.cnn.com/cnnnext/dam/assets/201116084430-boeing-737-max-southwest-restricted-super-tease.jpg',
        publishedAt: '2020-11-18T12:12:00Z',
        content: null,
      },
  
      {
        source: {
          id: null,
          name: 'HuffPost',
        },
        author: 'Yahoo Entertainment',
        title: "'MasterChef Junior' Star Ben Watkins Dies At Age 14 - HuffPost",
        description:
          '"MasterChef Junior" judge Gordon Ramsay hailed Watkins as "an incredibly talented home cook and even stronger young man."',
        url: 'https://www.huffpost.com/entry/ben-watkins-dead_n_5fb508edc5b66cd4ad40820e',
        urlToImage:
          'https://img.huffingtonpost.com/asset/5fb5105e2400008630b047cf.png?ops=1778_1000',
        publishedAt: '2020-11-18T11:59:00Z',
        content:
          'Ben Watkins, a fan-favorite from MasterChef Junior, died on Monday after an 18-month battle with cancer. He was 14.\r\nWatkins was diagnosed with angiomatoid fibrous histiocytoma, an extremely rare for… [+2665 chars]',
      },
    ],
  };
  

// const apiKey = '2db3e0610d984bce92afc4143fbb8fe2'; // wird nicht im Browser ausgeführt, sollte aber nicht im Code stehen (Sicherheit)
// Lösung: Umgehungsvariablen - Umgebungsdatei (.emv Datei)

export async function getStaticProps(){ // Name ist vorgegeben - React erkennt die Funktion
// Soll ausgeführt werden und dann den Zwischenstatus abspeichern - statisch
// Kann nur im pages Ordner angewendet werden

  let newsArticles = [];

  /*
Try-Catch-Block schreiben, darin mit fetch die neuesten
Schlagzeilen holen, mit den Parametern, die euch interessieren.
https://newsapi.org/docs/endpoints/top-headlines
Im Erfolgsfall sollen die Artikel in den Array newsArticles
gespeichert werden.
*/

  try {

    const showNews = await fetch(`https://newsapi.org/v2/top-headlines?country=de&category=entertainment&apiKey=${apiKey}`);

    if (!showNews.ok) { // prüft 200 oder 400 zum Beispiel
      throw new Error('Problem beim Laden der Nachrichten!');}

    const newData = await showNews.json(); // Warten bis die Daten aufgeteilt wurden und umgewandelt wurden

    newsArticles = newData.articles // Nachrichten im Array speichern

  } catch (error){
    console.log(error);
  }

  return {
// Das hier findet nur auf der Datenbank statt
        props: {  // props ist auch vorgeschrieben und weiteres Obj auch
            test: 'Hallo vom Server!😋', // Inhalt landet jetzt in Props
            time: new Date().toLocaleTimeString(),
            news: newsArticles, // testResults.articles für anderen Beispiel
        },
        revalidate: 600, // 10 Minuten nach dem ersten Aufruf wird das neue Ergebnis mit dem nächsten Aufruf ausgegeben
        // geeignet für eine Seite die viel Traffic hat z.B. beim Auslesen von Daten aus einer Schnittstelle
    }
};

// Code wird nur auf dem Server aufgeführt
export default function News({ news }) {
    return (
      <Layout title="News">
        <NewsList news={news} title={'Die neuesten Meldungen'} />
      </Layout>
    );
  }
  
// echte/aktuelle Newsholen:
