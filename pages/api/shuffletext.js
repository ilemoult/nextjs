/* 
1. Exportiert eine Funktion, die req und res entgegegennimmt.
2. Die GET-Parameter, die man beim Aufruf der URL nutzt, sind in req.query 
zu finden. Holt dort den Wert für text heraus, nehmt "" als Standard.
Zum testen einfach console.log nutzen, ABER der Text wird im Editor-Terminal
ausgegeben, nicht im Browser!
3. Mischt den Text durcheinander und fügt ihn dann wieder zusammen.
4. Gebt den Text in einem JSON-Objekt unter dem Schlüssel text zurück.
*/

import { shuffle } from '@/library/helpers';

export default function shuffleText(req, res) {
  console.log(req.query);
  const { text = '' } = req.query; // eingetippten Text in text speichern

  const shuffledText = shuffle(text).join(''); // Text durchmischen und füge den Text zu einem String zusammen

  res.status(200).json({ text: shuffledText });
}
// der gemischte Text-String wird in shuffledText gespeichert
// join -> nimm den String entgegen und lies ihn komplett aus