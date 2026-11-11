# Cumbre · English

Webapp para **aprender inglés desde cero**, poco a poco y demostrando lo que se sabe: se aprende, se practica y se demuestra. (El recorrido llega hasta C1, pero eso no se anuncia en la interfaz: la meta que se ve es aprender inglés.) Es 100 % frontend: no hay servidor y el progreso se guarda en el navegador (con exportar e importar).

```bash
npm install
npm run dev        # desarrollo
npm run build      # build estático en dist/ (sirve en cualquier hosting)
npm run validate   # valida todo el contenido
node scripts/simulate.ts   # simula todos los planes, juegos y el repaso (--full: todos los juegos de gramática, varios minutos)
node scripts/calibrate.ts  # calibra la prueba de nivel
```

## Filosofía
- **Sin mínimo diario y con un máximo** (Ajustes → Ritmo). El repaso nunca cuenta para el máximo, y además hay un tope de palabras nuevas al día.
- **Progreso realista**: un paso a medias cuenta como lo que es (respondidas / total), y solo está *hecho* si lo completas con ≥ 80 %. Los certificados se componen de mini tests que se guardan por separado.
- **Nada se marca como sabido**: «Ya me la sé: pruébame» y «Demostrar» lanzan un test sin pistas. Lo sabes cuando lo demuestras.
- **Maestría por evaluación continua** (`src/core/mastery.ts`), de todo: el inglés en general, cada skill, cada skill en cada nivel, cada tema de gramática, cada grupo de vocabulario y cada juego. ✅ Aprobado 10 aciertos en 2 días · 🥉 Bronce 100 en 7 · 🥈 Plata 300 en 14 · 🥇 Oro 600 en 21 · 👑 Maestro 1.000 en 30, manteniendo ≥ 70 % de acierto reciente. Los temas de gramática exigen además aciertos **a ciegas** en La Rueda (5 / 20 / 50 / 100). Hay un tope diario de aciertos que cuentan (25 por tema, 10 a ciegas por tema, 150 por skill, 400 en total): Maestro en un tema son, como mínimo, 40 días distintos.
- **La Rueda** (`src/core/wheel.ts`, `#/rueda`): lo que ya se ha aprobado vuelve a salir mezclado y **sin decir de qué tema es** (ni título, ni regla, ni pista hasta responder). Gira sola en el Flujo (uno de cada tres bloques) y en los repasos y controles del Camino, y cuenta vueltas completas.
- **Experiencia** (`src/core/gamify.ts`): XP base 8 + 2 × nivel, con multiplicadores que se combinan: respuesta escrita ×1,25, a ciegas ×2, examen ×1,5, racha de aciertos hasta ×1,5 y días seguidos hasta ×1,5. Niveles sin tope.
- **Palabras por etapas** (Nueva → Aprendiendo → Consolidando → Sólida → Dominada). El intervalo solo crece si aciertas cuando toca repasar. *Dominada* = acertada en 5+ días distintos y con un intervalo de 2 meses.
- **Diario**: cuánto avanzaste y cuánto repasaste cada día, con un heatmap de un año.

## Qué incluye
- **Nivel por skill** (Grammar, Vocabulary, Reading, Listening, Writing), con una prueba adaptativa bayesiana para cada una.
- **El Camino**: 10 tramos (A1.1 → C1.2), con «Empiezo de cero» como alternativa a la prueba de nivel. El control de cada tramo se hace en modo examen.
- **Mapa**: grafo del recorrido entero con el % de dominio de cada tema, vocabulario y lectura.
- **Grammar en árbol**: nivel → tramo → tipo → tema. Son 93 temas y 5.303 ejercicios; cada tema tiene tabla, explicación, errores típicos (sacados de sus ejercicios), juegos y examen. Incluyen *language use* (pedir, opinar, rechazar, persuadir…).
- **Juegos de gramática por sección** (`src/core/grammarGames.ts`): cada tema, cada tipo dentro de un tramo, cada tramo y cada nivel tiene hasta 36 modos generados de sus ejercicios, en cuatro grupos (básicos, escribir, de oído y retos): elegir, completar, cazar el error, ordenar, traducir, transformar, dictado, primera letra, supervivencia, contrarreloj, a ciegas… Cada tema tiene al menos 28. Un juego se da por superado con una ronda completa al 80 %.
- **Repaso de fallos** (`#/repaso`): todo lo que se falla en cualquier sesión, juego o examen queda apuntado con lo que se respondió y la respuesta correcta. Sale de la lista al acertarlo en 2 días distintos. Se puede repasar todo, por skill o por sección de gramática.
- **Corrección**: al fallar se ve «Tu respuesta» (con las palabras que no encajan marcadas) frente a «Correcta», la explicación y la regla del tema. Hay sonidos cortos de acierto y de fallo (WebAudio, `src/core/sfx.ts`; se desactivan en Ajustes).
- **Modo examen**: sin pistas, sin sonidos y sin corrección hasta el final; al acabar, nota sobre 10 y la lista de fallos con tu respuesta y la correcta. Lo usan los exámenes de gramática (tema, tipo, tramo, nivel), los certificados y los controles del Camino. La prueba de nivel tampoco corrige por pregunta.
- **Vocabulario**: 8.253 palabras (objetivo C1 ≈ 8.000), con repaso espaciado (SM-2) y tus propias palabras. Hay 545 curadas a mano, que son las del Camino, y un banco de 7.708 ordenado por frecuencia. Las palabras nuevas salen por orden de frecuencia y respetan el tope diario. «Ya me la sé: pruébame» cambia la tarjeta por una pregunta sin pistas, y «Demostrar» lanza un test de 20 palabras del nivel.
- **Reading**: 243 textos originales (48–50 por nivel, unas 26.000 palabras), muchos de ellos cortos, con 60 documentos de la vida real (menús, avisos, contratos, ofertas de empleo, actas, un abstract) y textos largos C1 («textacos»).
- **Writing**: 384 ejercicios (errores típicos de hispanohablantes, traducción, transformaciones con palabra clave y conectores), 42 redacciones con modelo de A1 a C1 y un analizador automático.
- **Listening**: dictado, oído fino, spelling bee y textos solo en audio.
- **Voz neuronal** (Piper vía onnxruntime-web, en el navegador): se descarga una vez (~60 MB) y queda guardada. Si no está, se usa la voz del sistema.
- **87 juegos**, cada uno en modo ∞ infinito (con vidas: récord de aciertos) o de 10, 20 o 30 preguntas (récord de partida completa), con el contador «Pregunta X de N» y la XP de la sesión. Ocho grupos: rápidos, clásicos, duros, palabras, Use of English (cloze, transformaciones, inversión…), de oído, inglés real (carteles, emails, abreviaturas, titulares) y a ciegas (mezclas por categoría sin decir el tema).
- **Exámenes y certificados**: exámenes de gramática por nivel y por tramo, y 30 certificados (5 skills + global × A1–C1). Cada uno son 4 mini tests de 12 preguntas, y se consigue con una media ≥ 75 %.

## Contenido
Todo está en `src/content/`, escrito en un mini-DSL de una línea por ítem (ver `src/core/content.ts`). Los juegos rápidos leen `src/content/games.ts`.

La gramática está repartida en `grammarA/B/C/Extra.ts` (temas originales), `grammarNewA/B.ts` (temas añadidos, con `sub`, `cat` y `table` en el propio tema) y `grammarMore.ts` / `grammarMore2.ts` (ejercicios extra por id de tema, que se anexan al final para no cambiar los ids existentes). Para que un tema tenga todos sus juegos conviene que lleve al menos 3 ejercicios de cada tipo: opción múltiple, hueco, error y traducción. `npm run validate` comprueba que todas las variantes de juego se generan y que cada tema tiene al menos 6 juegos. Además, `scripts/gen-grammar.ts` genera `grammarGen.ts` (3.581 ejercicios de 59 temas mecánicos, con plantillas y conjugación real; determinista) — se regenera con `node scripts/gen-grammar.ts` y no se edita a mano. Las lecturas están en `reading.ts` … `reading8.ts`, la escritura en `writing.ts` y `writing2.ts`, y los juegos nuevos en `games2.ts` / `games2b.ts`.

El banco de vocabulario está en `src/content/bank/b00–b12.ts`, con una línea por entrada: `palabra|pos|español[|ejemplo con *palabra*]`. Una línea `#N` fija el nivel (1 = A1 … 5 = C1) de las que vienen detrás. Los phrasal verbs (`pv`) y los modismos (`id`) llevan ejemplo obligatorio. Los lemas salen de NGSL/NAWL (CC BY-SA), de la frecuencia de OpenSubtitles y de las listas Cambridge B1 Preliminary, B2 y C1 (solo los lemas). Las traducciones y los ejemplos son propios. Después de tocar contenido, ejecuta `npm run validate` y `node scripts/simulate.ts`.

El temario de B1–C1 sigue los bloques del curso *Advanced English* (TU Chemnitz): tiempos, pasiva en todos los tiempos, estilo indirecto, condicionales, *language use*, ensayos de causa-efecto, cartas al periódico, propuestas y descripción de procesos.
