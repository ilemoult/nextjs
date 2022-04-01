import Image from 'next/image';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const apiPath = 'https://react.webworker.berlin/wp-json/wp/v2/';

/* Wenn man einen dynamischen Pfad hat, muss man Next mitteilen,
welche Pfade das System statisch generieren soll, hier also
eine Liste der vorhanden Blog-Slugs übergeben. */

export async function getStaticPaths() {
  let paths = [];

  try {
    const response = await fetch(`${apiPath}posts`);

    if (!response.ok) {
      throw new Error('Problem!');
    }

    const posts = await response.json();

    paths = posts.map(({ slug }) => ({ params: { slug } }));
  } catch (e) {
    console.log(e);
  }
// fallback: Um einen neuen Blogbeitrag automatisch zuholen, weil das ja ein neuer Pfad ist
/* fallback legt fest, dass ein neuer und noch nicht in paths
  enthaltene Slug frisch von WordPress geholt werden soll.
  Wenn man für paths einen leeren Array zurückgibt, werden
  also alle Blogbeiträge erst statisch generiert, wenn sie
  zum ersten Mal angefordert werden. Man könnte in paths
  auch nur z.B. die 20 neuesten Blogbeiträge übergeben. */
  
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  let post = {};

  try {
    const response = await fetch(`${apiPath}posts?slug=${params.slug}`);
    if (!response.ok) {
      throw new Error('Problem!');
    }

    const posts = await response.json();

    post = posts[0];

    if (post.featured_media) {
      post.titleImage = await getTitleImage(post.featured_media); // gibt ein promise zurück. Erst warten auf das eingelöste Promise, erst dann den Code weiter lesen
    }

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      post,
    },
    revalidate: 3600, // Einmal pro Stunde aktualisieren
  };
}

async function getTitleImage(imageId) {
  try {
    const response = await fetch(`${apiPath}media/${imageId}`);
    const imageData = await response.json();

    return {
      src: imageData.guid.rendered,
      width: imageData.media_details.width,
      height: imageData.media_details.height,
      alt: imageData.alt_text,
    };
  } catch (error) {
    console.log(error);
    return null;
  };
};

export default function BlogPost({ post }) {
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
// Platzhalter, während neuer Post geladen wird, der einen neuen, noch unbekannten Pfad hat
  const router = useRouter();
  if(router.isFallback){
    return <Layout>
      <strong>Laden...</strong>
    </Layout>
  }
// Platzhalter Erstellung ENDE

  const { title, content, titleImage } = post;

  return (
    <Layout title={title.rendered}>
      {/*
      1. Prüfen, ob ein Bild vorhanden ist.
      2. Wenn ja, Bilddaten nutzen, um ein Image-Element (Next Image-Komponente)
      darzustellen.
      */}
      {titleImage && 
      <Image
        {...titleImage}
        sizes="(max-width: 50rem) 90vw, 48rem"
        layout="responsive"
      />}
      <div dangerouslySetInnerHTML={{ __html: content.rendered }} />
    </Layout>
  );
}

// Nochmal mit Erklärungen, mit einem Typo irgendwo 

// // eckige Klammern signalisieren, dass es kein fixer Name ist, sondern dynamisch, der für den Ausdruck slug eingesetzt werden kann
// // entspricht der id aus der Filmdatenbank
// // Also statt expliziet Filmname, "slug"
// // slug  - Name ist frei wählbar

// import Layout from '@/components/Layout'
// import React from 'react'

// // Grundpfad zur Schnittstelle
// const apiPath = 'https://react.webworker.berlin/wp-json/wp/v2/';

// // Name vorgegeben und von Next erkannt
// // findet die einzelnen url's der einzelnen Beiträge 
// export async function getStaticPaths(){
//   let paths = [];

//   try {
//     // Schnittstelle anzapfen - Daten holen
//     const response = await fetch(
//       `${apiPath}/posts`
//     );

//     if (!response.ok) {
//       throw new Error('Problem!');
//     }
// // Daten zurückgeben
//     const posts = await response.json(); // wollen nur die slugs daraus
//                                   // params ist vorgegeben // {slug} -:  slus ={slug}
//       paths = posts.map(({ slug }) => ({ params: { slug } }));
//     } catch (e) {
//       console.log(e);
//     }
  
//     return { paths, fallback: true };
//   }
                              

// // Anders als bei Blog.jsx, muss ich angeben um welchen Blogbeitrag es geht
// // Params rausziehen, weil darin das slug Object steht mit den einzelnen Pfaden
// export async function getStaticProps({ params }) {
//   let post = {};

//   try {
//     const response = await fetch(`${apiPath}posts?slug=${params.slug}`);
//     if (!response.ok) {
//       throw new Error('Problem!');
//     }

//     const posts = await response.json();

//     post = posts[0];
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     props: {
//       post,
//     },
//     revalidate: 3600, // Einmal pro Stunde aktualisieren
//   };
// }

// // In dem Ordner Blog darf nur eine Datei liegen
// // Hier werden die einzelnen Word Press Blog Beiträge ausgespielt
// export default function BlogPost({ post }) {
//   const { title } = post;

//   return <Layout title={title.rendered}></Layout>;
// }

