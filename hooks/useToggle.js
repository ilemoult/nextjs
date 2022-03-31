import { useState } from "react";

// Vereinfachung - Immer wenn ich einen Toggle brauche, kann ich jetzt diese Hilffunction benutzen
// Hook Function damit ich Hooks nutzen kann
export function useToggle(initialState){                   // die function mit use zu beginnen ist eine starke Konvention bei der Arbeit mit Hooks, aber nicht technisch notwendig

    const [state, setState] = useState(initialState); // initialState ist ein abstrakter Parameter, weil wir ja für den einzelnen Fall noch nicht wissen, welche Startwerte wir benötigen werden
    
    const toggle = () => setState((currentState) => !currentState);
    // Jetzt müssen state, setState und toggle zurück gegeben werden. Return kann nur eins zurückgeben
    // Deswegen Array bauen
    return [state, toggle, setState];
  
  };