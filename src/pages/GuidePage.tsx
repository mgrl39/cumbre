import { Card, Md } from '../ui/common.tsx';

const GUIDE = `
## Cómo funciona tu nivel
- Cada skill (Grammar, Vocabulary, Reading, Listening, Writing) tiene **su propio nivel**, de A1 a C2. Puedes ser B2 leyendo y A2 en gramática: es lo normal.
- El nivel se calcula como en los tests adaptativos: cada pregunta tiene un nivel; acertar preguntas difíciles sube mucho, fallar fáciles baja. «Tener» un nivel significa acertar ~75 % de sus preguntas, no solo aprobar.
- El porcentaje (p. ej. **B1 · 60%**) es lo que llevas recorrido hacia el siguiente nivel.

## Poco a poco, sin presión… y sin trampas
- **No hay mínimo diario.** Cinco minutos cuentan. Un día sin practicar no rompe nada.
- **Sí hay un máximo** (Ajustes → Ritmo). Cuando llegas, la app te invita a parar: el cerebro consolida descansando. El repaso nunca cuenta para el máximo.
- **Lo hecho a medias se ve a medias.** Si dejas un paso a la mitad, se guarda lo que acertaste sobre el total (5 de 12 = 42 %), no un 100 %. Solo se marca «hecho» si lo completas con ≥ 80 %.
- **Nada se marca como sabido.** «Ya me la sé» te la pregunta sin pistas; «Demostrar A1» es un test. Lo que aciertes entra en el repaso y se sigue comprobando.
- **Repasar es la clave.** El Diario te enseña cuánto avanzaste y cuánto repasaste cada día.

## La Rueda: lo aprobado vuelve a ciegas
- Con la tabla delante cualquiera acierta. Por eso todo tema que apruebas entra en **la Rueda**: vuelve a salir más adelante, mezclado con los demás, **sin decirte de qué tema es** ni ofrecerte la regla hasta que respondas.
- La Rueda **gira**: siempre sale el tema que lleva más tiempo sin salir. Cuando han salido todos los aprobados, has completado una vuelta y empieza otra.
- Sale sola en el **Flujo** (uno de cada tres bloques) y en los repasos y controles del Camino; o gírala tú en el menú → La Rueda.
- Los aciertos a ciegas son obligatorios para subir un tema: Bronce 5 · Plata 20 · Oro 50 · Maestro 100 (cuentan 10 al día por tema).

## Maestría: evaluación continua
- Cada acierto da **XP** (subes de nivel y de título) y suma **maestría**.
- La maestría tiene niveles: ✅ **Aprobado** 10 aciertos en 2+ días · 🥉 **Bronce** 100 en 7+ días · 🥈 **Plata** 300 en 14+ · 🥇 **Oro** 600 en 21+ · 👑 **Maestro** 1.000 en 30+ días. Existe para el inglés en general, para cada skill y nivel, cada grupo de vocabulario, cada juego y cada tema de gramática.
- **Aprobar no es dominar.** Aprobar un tema es fácil y solo significa que ya lo has visto. Ser Maestro son **mil ejercicios acertados** de ese tema repartidos en al menos 40 días, cien de ellos a ciegas.
- **XP con multiplicadores:** escribir la respuesta ×1,25 · a ciegas en la Rueda ×2 · examen ×1,5 · racha de aciertos y días seguidos hasta ×1,5 cada una. Los niveles no tienen tope.
- **Cuenta la evolución, no el atracón.** Cada día solo suman un número limitado de aciertos (25 por tema, 150 por skill), y cada nivel exige días distintos. Hacer algo 5 veces hoy y 6 la semana que viene vale más que 11 veces seguidas.
- **Palabras:** Aprendiendo → Consolidando (3+ días) → Sólida (21+ días) → **Dominada** (acertada en 5+ días distintos y aguanta 2 meses sin verla). El intervalo solo crece si aciertas *cuando toca* repasarla; repetirla el mismo día es práctica, pero no la consolida. Un fallo la devuelve a Aprendiendo.
- **Juegos:** modo **∞** (con vidas, hasta caer) o de **10, 20 o 30 preguntas** (sin vidas).

## Una rutina orientativa (si te apetece)
- **Primero, el repaso** pendiente.
- **Luego, un rato de Flujo**: prioriza tu skill más floja automáticamente.
- **Una lectura** del Camino, un texto largo en Juegos → Textacos o un artículo real en el Lector.
- **De vez en cuando**, un texto libre en Writing y compararlo con el modelo.
- Cuando sientas que dominas un nivel, prueba los mini tests de su certificado.
- ¿Día sin ganas? Juegos → Rápidos: un minuto de Contrarreloj ya es practicar.

## Arreglar los fundamentos
- Si «más o menos entiendes» pero fallas lo básico, haz la prueba de Grammar y el Camino desde tu nivel: los temas flojos por debajo de tu nivel se vuelven a colar en el Flujo hasta que los domines.
- Al fallar, pulsa **Ver regla**: dos minutos de regla tras un error valen más que diez antes.
- Cada tema tiene un **dominio** (0–100 %): llega al 100 % con 100 aciertos repartidos en 7+ días, acertando ≥ 80 % últimamente. Míralo en Grammar o en el Mapa.

## Para leer artículos y temario en inglés
- El vocabulario **académico** (analyse, significant, hypothesis, whereas…) aparece en casi todos los textos de estudio: es la mayor palanca. Practícalo en Juegos → Académico y Conectores.
- Usa el **Lector** con textos reales de lo que estudias. Las palabras técnicas que guardes entran en tu repaso.
- Lee primero sin diccionario intentando captar la idea de cada párrafo; luego relee consultando solo las palabras que se repiten.
- Fíjate en los conectores: however / whereas / therefore te dicen la estructura del argumento antes de entender cada palabra.

## Para expresarte (Writing)
- Las **transformaciones** obligan a decir lo mismo de varias formas: es la base de escribir bien.
- Los **errores típicos de hispanohablantes** (people is, depend of, explain me…) son los que más delatan el nivel: el analizador los detecta.
- Copia estructuras de los modelos: «It could be argued that…», «Not only… but also…», «What matters most is…».

## Sin servidor
- Todo funciona en tu navegador. La voz natural (Piper) también: se descarga una vez (~60 MB) desde Ajustes y queda guardada.
- Tu progreso está en este navegador: expórtalo en Ajustes de vez en cuando.
`;

export default function GuidePage() {
  return (
    <div className="page narrow">
      <h1>Guía</h1>
      <Card>
        <Md text={GUIDE} />
      </Card>
    </div>
  );
}
