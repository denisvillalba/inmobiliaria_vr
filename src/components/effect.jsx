import { useEffect, useState } from "react";

function Effect() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("El contador es:", contador);
    document.title = `Clicks ${contador}`;
  }, [contador]);

  return (
    <div>
      <h2>Contador con useEffect</h2>
      <h1>{contador}</h1>

      <button onClick={() => setContador(contador + 1)}>
        Aumentar
      </button>
    </div>
  );
}

export default Effect;