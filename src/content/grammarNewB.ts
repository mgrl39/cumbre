import type { GrammarTopic } from '../core/types.ts';

/* Temas que faltaban de B1 a C1. */
export const GRAMMAR_NEW_B: GrammarTopic[] = [
  {
    id: 'one-both-either', level: 'B1', sub: 1, cat: 'nouns', title: 'One / ones, both, either, neither',
    rule: 'one / ones evita repetir un sustantivo. both = los dos · either = cualquiera de los dos · neither = ninguno de los dos.',
    table: `
| Palabra | Significado | Verbo | Ejemplo |
|---|---|---|---|
| **one / ones** | sustituye a un sustantivo contable | — | I like the red **one**. |
| **both** (… and …) | los dos | plural | **Both** films **are** good. |
| **either** (… or …) | uno u otro, cualquiera | singular | **Either** day **is** fine. |
| **neither** (… nor …) | ninguno de los dos | singular | **Neither** answer **is** right. |
| both / either / neither **of** | + the / these / my / us / them | — | **Neither of them** came. |
`,
    es: `
- **one** (singular) y **ones** (plural) evitan repetir: Which bag? The blue **one**. · I prefer the old **ones**.
- **both / either / neither** hablan siempre de **dos** cosas o personas.
- Con negativa se usa **either**, no neither: I don't like **either** of them. = I like **neither** of them.
> Both my parents work.
> You can take either bus.
> Neither of us speaks German.
## Trampas
- ❌ Both of them doesn't… → **Neither** of them… (both no va con verbos negativos)
- ❌ the both → **both** (the) cars.
- Con más de dos: **all / any / none**, no both / either / neither.
- **one** no sustituye a incontables: ❌ I need some milk. Have you got one? → …got **any / some**?
`,
    items: `
I don't like this shirt. Have you got a blue ___? | one | ones / it / some one
These shoes are too small. Can I try the bigger ___? | ones | one / them / these
___ my brothers live in London: Tom and Sam. | Both | Either / Neither / All the two
You can pay by card or in cash. ___ is fine. | Either | Both / Neither / All
___ of the two hotels was good. We hated them. | Neither | Both / Either / None both
I haven't read ___ of these two books. | either | neither / both / none
Both restaurants ___ expensive. | are | is / be / isn't
Neither of them ___ (speak) English. | speaks / speak
Which cake do you want? The chocolate ___. | one
! Both of them didn't come. | Neither of them came.
! I like the both films. | I like both films. / I like both the films. / I like both of the films.
! I don't like neither of them. | I don't like either of them. / I like neither of them.
= Me gustan los dos. | I like both. / I like both of them. / I like them both.
= Ninguno de los dos funciona. | Neither of them works. / Neither works. / Neither of them work.
= ¿Cuál quieres? El rojo. | Which one do you want? The red one. / Which do you want? The red one.
`,
  },
  {
    id: 'reflexive', level: 'B1', sub: 1, cat: 'nouns', title: 'Reflexive pronouns & each other',
    rule: 'myself, yourself, himself… cuando sujeto y objeto son la misma persona. each other = el uno al otro.',
    table: `
| Sujeto | Reflexivo |
|---|---|
| I | **myself** |
| you (singular) | **yourself** |
| he / she / it | **himself / herself / itself** |
| we | **ourselves** |
| you (plural) | **yourselves** |
| they | **themselves** |
| recíproco | **each other** (el uno al otro) |
`,
    es: `
- Se usan cuando la acción **recae sobre el propio sujeto**: I cut **myself**. She taught **herself** to play.
- **by myself** = yo solo, sin ayuda o sin compañía.
- **each other** = recíproco: They love **each other**. (se quieren entre ellos)
> Help yourself!
> We really enjoyed ourselves.
## Trampas
- Muchos verbos reflexivos en español **no** lo son en inglés: levantarse = **get up**, ducharse = **have a shower**, sentirse = **feel**, acordarse = **remember**, quejarse = **complain**. ❌ I feel myself tired · ❌ I got up myself
- ❌ hisself, theirselves → **himself, themselves**.
- **themselves** ≠ **each other**: They looked at **themselves** (cada uno a sí mismo) / at **each other** (el uno al otro).
`,
    items: `
I cut ___ while I was cooking. | myself | me / my / myselves
She taught ___ to play the guitar. | herself | her / hers / sheself
We really enjoyed ___ at the party. | ourselves | us / ourself / each one
Tom and Ana have known ___ for years. | each other | themselves / them / theirselves
He lives by ___. | himself | hisself / him / his own self
I ___ tired today. | feel | feel myself / feel me / am feel
Be careful! You could hurt ___ (you, singular). | yourself
The children made the cake ___ (they). | themselves
! I feel myself very well. | I feel very well. / I feel very good.
! He hurt hisself playing football. | He hurt himself playing football.
! They love themselves very much; they got married last year. | They love each other very much; they got married last year.
! I got up myself at seven. | I got up at seven.
= Me corté. | I cut myself.
= Se conocen desde hace años. | They have known each other for years. / They've known each other for years.
= Lo hice yo solo. | I did it myself. / I did it by myself. / I did it on my own.
`,
  },
  {
    id: 'phrasal-order', level: 'B1', sub: 1, cat: 'verbs', title: 'Phrasal verbs: word order',
    rule: 'Separables: turn the light off / turn off the light, pero con pronombre SIEMPRE en medio: turn it off.',
    table: `
| Tipo | Con sustantivo | Con pronombre | Ejemplos |
|---|---|---|---|
| **separable** | turn **off** the TV / turn the TV **off** | turn **it off** (❌ turn off it) | pick up, put on, take off, turn on/off, give back, throw away, fill in |
| **inseparable** | look **after** the kids | look **after them** | look after, look for, get on, get off, run into, deal with |
| **3 palabras** (inseparable) | look **forward to** the trip | look **forward to it** | get on with, run out of, put up with, look forward to |
| **sin objeto** | — | — | get up, wake up, sit down, grow up, break down |
`,
    es: `
Un phrasal verb es **verbo + partícula** con un significado propio (give up = dejar, rendirse).
- **Separables**: el objeto puede ir en medio o detrás. Con **pronombre** (it, them, me…) va **siempre en medio**: pick **it** up, put **them** on.
- **Inseparables**: verbo y partícula no se separan nunca: I'm looking **for** my keys → I'm looking **for them**.
> Take your shoes off. = Take off your shoes. → Take them off.
> I ran into an old friend.
## Trampas
- ❌ Turn off it. · ❌ Pick up them. → Turn **it** off. Pick **them** up.
- ❌ I'm looking my keys for. → I'm looking **for my keys**.
- Tras **look forward to** va **-ing**: I look forward to **seeing** you.
`,
    items: `
The music is too loud. Can you ___? | turn it down | turn down it / turn it down it / down turn it
It's cold. Put your coat ___. | on | in / of / at
I'm ___ my glasses. Have you seen them? | looking for | looking after / looking / looking them for
Your shoes are dirty. ___. | Take them off | Take off them / Take them of / Off take them
Who is going to ___ the children tonight? | look after | look for / look them after / look up to
I can't find my keys. Can you help me ___? | look for them | look them for / look after them / look for
We've ___ milk. Can you buy some? | run out of | run of out / run out / run out from
Those are my keys. Can you pick ___ (they) up, please? | them
My car broke ___ on the motorway, so I called for help. | down
I get ___ well with my colleagues. | on / along
! Please turn off it. | Please turn it off.
! I'm looking forward to see you. | I'm looking forward to seeing you. / I am looking forward to seeing you.
! He looked his keys for all morning. | He looked for his keys all morning.
! Pick up them, please. | Pick them up, please.
= Apágalo. | Turn it off. / Switch it off.
= Estoy buscando mi móvil. | I'm looking for my phone. / I am looking for my phone. / I'm looking for my mobile.
= Quítate los zapatos. | Take your shoes off. / Take off your shoes.
`,
  },
  {
    id: 'dependent-prepositions', level: 'B1', sub: 1, cat: 'words', title: 'Verb / adjective + preposition',
    rule: 'Cada verbo y adjetivo pide su preposición (depend on, good at, interested in). Tras preposición, verbo en -ing.',
    table: `
| Preposición | Verbos | Adjetivos |
|---|---|---|
| **on** | depend on, rely on, focus on, insist on, spend (money) on | keen on, based on |
| **in** | believe in, succeed in, be interested in, take part in | interested in, involved in |
| **at** | look at, laugh at, arrive at (un lugar) | good / bad at, surprised at |
| **of** | think of, dream of, consist of, remind sb of | afraid of, proud of, tired of, full of |
| **for** | wait for, look for, pay for, apply for, ask for | responsible for, famous for, ready for |
| **to** | listen to, belong to, talk to, object to | married to, similar to, used to |
| **about** | think about, worry about, talk about, complain about | worried about, excited about |
| **with** | agree with, deal with, cope with | angry with, pleased with, fed up with |
`,
    es: `
No hay regla: se aprenden como un bloque. Las que más fallan los hispanohablantes porque en español son distintas:
- depender **de** → depend **on** · pensar **en** → think **about / of** · soñar **con** → dream **of / about**
- casado **con** → married **to** · consistir **en** → consist **of** · llegar **a** → arrive **at / in**
- Sin preposición en inglés: **enter** a room, **discuss** a problem, **answer** a question, **call** someone, **ask** someone.
> It depends on the weather.
> She's good at maths.
## Trampas
- Tras preposición, **-ing**: I'm interested in **learning**. (❌ in learn / in to learn)
- ❌ listen music → listen **to** music · ❌ wait the bus → wait **for** the bus.
- ❌ discuss about · ❌ enter in / to → **discuss** it, **enter** the room.
`,
    items: `
It depends ___ the weather. | on | of / from / in
She's very good ___ languages. | at | in / on / with
I'm interested ___ learning Japanese. | in | on / for / about of
He's married ___ a doctor. | to | with / by / of
We're waiting ___ the bus. | for | to / at / —
I often listen ___ music while I work. | to | at / — / on
Are you afraid ___ spiders? | of | from / to / with
The team consists ___ five people. | of | in / on / from
I'm thinking about ___ (change) my job. | changing
She apologised for ___ (be) late. | being
We need to ___ the problem. | discuss | discuss about / discuss on / talk
! It depends of the price. | It depends on the price.
! I'm listening music. | I'm listening to music. / I am listening to music.
! She is married with an Italian. | She is married to an Italian. / She's married to an Italian.
! We discussed about the plan. | We discussed the plan.
! I'm interested in learn more. | I'm interested in learning more. / I am interested in learning more.
= Depende de ti. | It depends on you. / It's up to you.
= Estoy pensando en ti. | I'm thinking about you. / I am thinking about you. / I'm thinking of you. / I am thinking of you.
= Se me dan bien las matemáticas. | I'm good at maths. / I am good at maths. / I'm good at math. / I am good at math.
`,
  },
  {
    id: 'ability-past', level: 'B1', sub: 2, cat: 'modals', title: 'Could, was able to, managed to',
    rule: 'Habilidad general en el pasado: could. Lograr algo en una ocasión concreta: was able to / managed to (no could).',
    table: `
| Situación | Forma | Ejemplo |
|---|---|---|
| habilidad general en el pasado | **could** | I **could** swim when I was four. |
| lo conseguí esa vez (afirmativa) | **was / were able to** · **managed to** | We **managed to** catch the train. |
| no lo conseguí (negativa) | **couldn't** · wasn't able to | I **couldn't** open the door. |
| verbos de percepción | **could** see / hear / smell / feel | I **could** hear music. |
| otros tiempos | **be able to** | I'll **be able to** help. I've never **been able to** dance. |
`,
    es: `
**can** solo tiene presente (can) y pasado (could). Para el resto de tiempos se usa **be able to**.
- **could** = sabía, podía (en general): She **could** read at three.
- **was able to / managed to** = pude, conseguí (una vez, con esfuerzo): The door was stuck, but I **managed to** open it.
- En negativa valen los dos: I **couldn't** / **wasn't able to** find it.
> Will you be able to come tomorrow?
> I haven't been able to sleep.
## Trampas
- ❌ I could pass the exam yesterday. → I **managed to pass** / **was able to pass**…
- ❌ I will can go. · ❌ I have could. → I'll **be able to** go. I have **been able to**.
- **managed to** + verbo base: managed to **find** (❌ managed find / managed to finding).
`,
    items: `
I ___ ride a bike when I was five. | could | managed / can / was able
The exam was hard, but I ___ pass it. | managed to | could / can / managed
Will you ___ come to the meeting tomorrow? | be able to | can / could / able to
I've never ___ understand physics. | been able to | could / can / be able to
We ___ find the hotel, so we asked a policeman. | couldn't | didn't could / can't to / weren't able
After two hours, the firefighters ___ rescue the cat. | were able to | could to / was able to / can
I ___ hear someone crying in the next room. | could | managed / was able / can to
She ___ (not / can) speak English two years ago. | couldn't / could not
He finally managed ___ (fix) the car. | to fix
! I will can help you tomorrow. | I will be able to help you tomorrow. / I'll be able to help you tomorrow.
! It was difficult, but I could finish the race. | It was difficult, but I managed to finish the race. / It was difficult, but I was able to finish the race.
! She managed find a job. | She managed to find a job.
= De niño sabía nadar muy bien. | As a child I could swim very well. / When I was a child, I could swim very well. / As a child, I could swim very well.
= Conseguimos llegar a tiempo. | We managed to arrive on time. / We managed to get there on time. / We were able to arrive on time. / We managed to get there in time.
= No podré ir. | I won't be able to go. / I will not be able to go. / I won't be able to come.
`,
  },
  {
    id: 'purpose-reason-result', level: 'B1', sub: 2, cat: 'discourse', title: 'Reason, result & purpose: because of, so, so that',
    rule: 'because + frase / because of + sustantivo · so, therefore = consecuencia · so that + sujeto + can / will = para que.',
    table: `
| Función | Conector | Va seguido de… | Ejemplo |
|---|---|---|---|
| causa | **because, as, since** | sujeto + verbo | We stayed in **because it rained**. |
| causa | **because of, due to** | sustantivo / -ing | We stayed in **because of the rain**. |
| consecuencia | **so** | sujeto + verbo | It rained, **so** we stayed in. |
| consecuencia (formal) | **therefore, as a result** | nueva frase, con coma | It rained. **Therefore,** we stayed in. |
| finalidad | **to / in order to** | verbo base | I left early **to avoid** the traffic. |
| finalidad | **so that** | sujeto + can / could / will / would | I left early **so that I could** rest. |
`,
    es: `
- **because** + frase completa · **because of** + sustantivo: because **I was ill** / because of **my illness**.
- **so** une dos frases; **therefore / as a result** empiezan frase nueva y son más formales.
- **so that** = «para que» (cuando hay un sujeto distinto o un modal): Speak slowly **so that everyone can** understand.
> The flight was cancelled due to bad weather.
> I'll give you my number so that you can call me.
## Trampas
- ❌ because of it rained → because **it rained** / because of **the rain**.
- ❌ for that you can → **so that** you can.
- ❌ I didn't go, because I was tired so I stayed. No uses because y so para la misma relación.
- «Por eso» = **that's why**: I was tired. **That's why** I left.
`,
    items: `
The match was cancelled ___ the rain. | because of | because / so / due
She was tired, ___ she went to bed early. | so | because / so that / due to
I'll explain it again ___ everyone understands. | so that | for that / because of / so as
We couldn't sleep ___ the noise. | due to | because / therefore / so that
He didn't study. ___, he failed the exam. | As a result | Because / So that / Due to
I'm saving money ___ buy a flat. | in order to | so that / for / because of
___ it was late, we took a taxi. | As | Due to / Therefore / Because of
I wrote it down so that I ___ forget. | wouldn't | don't will / not / won't to
! We stayed at home because of it was raining. | We stayed at home because it was raining. / We stayed at home because of the rain.
! I'll send you the map for that you can find it. | I'll send you the map so that you can find it. / I will send you the map so that you can find it.
! He was ill, because he didn't come. | He was ill, so he didn't come. / He didn't come because he was ill.
> I left early because I wanted to avoid the traffic. | ORDER | I left early ___ the traffic. | in order to avoid
> It rained, so the game was cancelled. | BECAUSE | The game was cancelled ___ rain. | because of the
= No salimos por la lluvia. | We didn't go out because of the rain. / We did not go out because of the rain. / We didn't go out due to the rain.
= Habla despacio para que te entienda. | Speak slowly so that I can understand you. / Speak slowly so I can understand you.
= Estaba cansado; por eso me fui. | I was tired; that's why I left. / I was tired. That's why I left. / I was tired, that's why I left. / I was tired, so I left.
`,
  },
  {
    id: 'reported-commands', level: 'B1', sub: 2, cat: 'clauses', title: 'Reported commands & requests: tell / ask + to',
    rule: 'Órdenes y peticiones indirectas: tell / ask + persona + (not) to + verbo. He told me to wait. She asked me not to go.',
    table: `
| Directo | Indirecto | Estructura |
|---|---|---|
| "Sit down." | He **told me to sit** down. | tell + persona + **to** + verbo |
| "Don't touch it." | She **told us not to touch** it. | tell + persona + **not to** + verbo |
| "Can you help me, please?" | He **asked me to help** him. | ask + persona + **to** + verbo |
| "You should see a doctor." | She **advised me to see** a doctor. | advise / warn / remind / encourage + persona + to |
| say vs tell | He **said** (that)… / He **told me** (that)… | tell necesita persona; say, no |
`,
    es: `
En español usamos «que + subjuntivo»: «Me dijo **que esperara**». En inglés es **infinitivo con to**:
- He told me **to wait**. (❌ He told me that I wait / that I waited)
- She asked him **not to smoke**. (la negación va delante de *to*)
- **want / would like** funcionan igual: I want **you to come**. (❌ I want that you come)
> The teacher told us to open our books.
> My mum asked me to buy some bread.
## Trampas
- **tell** lleva persona, **say** no: He **told me**. He **said** (to me). ❌ He said me.
- ❌ She told to me to wait. → She told **me** to wait.
- ❌ I want that you help me. → I want **you to help** me.
`,
    items: `
The doctor told me ___ more water. | to drink | drink / that I drink / drinking
She asked us ___ so loudly. | not to talk | to not talking / don't talk / that we don't talk
He ___ me that he was tired. | told | said / told to / said to that
I want you ___ with me. | to come | come / that you come / coming
My mother ___ that dinner was ready. | said | told / said me / told that to
The teacher warned us ___ late. | not to be | to not being / don't be / that we aren't
He asked me ___ (help) him with the boxes. | to help
They told us ___ (not / wait) for them. | not to wait
! She said me to wait. | She told me to wait.
! He told me that I close the door. | He told me to close the door.
! I want that you listen to me. | I want you to listen to me.
! They asked us to not make noise. | They asked us not to make noise.
> "Please open the window," she said to me. | ASKED | She ___ the window. | asked me to open
> "Don't be late," he told us. | NOT | He told ___ late. | us not to be
= Me dijo que esperara. | He told me to wait. / She told me to wait.
= Quiero que vengas. | I want you to come.
= Nos pidió que no dijéramos nada. | He asked us not to say anything. / She asked us not to say anything.
`,
  },
  {
    id: 'narrative-tenses', level: 'B2', sub: 1, cat: 'tenses', title: 'Narrative tenses',
    rule: 'Contar una historia: past simple (acciones seguidas), past continuous (fondo), past perfect (antes), past perfect continuous (duración anterior).',
    table: `
| Tiempo | Forma | Para… | Ejemplo |
|---|---|---|---|
| past simple | **did** | hechos principales, uno tras otro | She **opened** the door and **went** in. |
| past continuous | **was / were doing** | escenario; acción en curso interrumpida | It **was raining** when I **left**. |
| past perfect | **had done** | lo que pasó antes | I realised I **had forgotten** my keys. |
| past perfect continuous | **had been doing** | actividad que duraba hasta ese momento | She was tired because she **had been working** all day. |
`,
    es: `
Un relato combina los cuatro tiempos:
- **Past simple** = la línea principal de la historia.
- **Past continuous** = lo que estaba pasando alrededor (descripción, fondo).
- **Past perfect** = un salto atrás, a algo anterior.
- **Past perfect continuous** = lo que llevaba pasando un rato y explica la situación.
> When I got home, everybody was sleeping. (estaban dormidos)
> When I got home, everybody had gone to bed. (ya se habían ido)
> His eyes were red because he had been crying.
## Trampas
- **when** + past simple, dos lecturas: «When she arrived, we **had** dinner» (después) / «…we **were having** dinner» (durante) / «…we **had had** dinner» (antes).
- Los verbos de estado no van en continuo: I **had known** him for years (❌ had been knowing).
- No abuses del past perfect: con *after / before* y orden claro, el past simple basta.
`,
    items: `
It ___ heavily when we left the house. | was raining | rained / had rained / has been raining
When I got to the cinema, the film ___. | had already started | already started / was already starting / has already started
He was out of breath because he ___. | had been running | was running / ran / has been running
She ___ the letter, put it in her bag and left. | read | was reading / had been reading / had read it and
While they ___, someone stole their car. | were having dinner | had dinner / had had dinner / have had dinner
I ___ him for years before we became friends. | had known | had been knowing / was knowing / knew of
By the time we arrived, they ___ for two hours. | had been waiting | were waiting / waited / have been waiting
When the phone rang, I ___ (have) a shower. | was having
She couldn't pay because she ___ (leave) her wallet at home. | had left / 'd left
! When I arrived, the train already left. | When I arrived, the train had already left.
! I had been knowing her for a long time. | I had known her for a long time. / I'd known her for a long time.
! He was tired because he was working all night. | He was tired because he had been working all night. / He was tired because he'd been working all night.
> First she finished her work. Then she went home. | AFTER | She went home ___ her work. | after she had finished / after finishing / after she finished
= Cuando llegué, ya se habían ido. | When I arrived, they had already left. / When I arrived, they had already gone. / When I got there, they had already left.
= Estaba lloviendo cuando salimos. | It was raining when we left. / It was raining when we went out.
= Llevaba dos horas esperando cuando llegó. | I had been waiting for two hours when he arrived. / I had been waiting for two hours when she arrived. / I'd been waiting for two hours when he arrived. / I'd been waiting for two hours when she arrived.
`,
  },
  {
    id: 'comparatives-advanced', level: 'B2', sub: 1, cat: 'words', title: 'Advanced comparisons: the more… the more, far better',
    rule: 'the + comparativo…, the + comparativo (cuanto más… más). Intensificar: much / far / a lot + comparativo; by far the + superlativo.',
    table: `
| Estructura | Significado | Ejemplo |
|---|---|---|
| **the** + comp., **the** + comp. | cuanto más…, más… | **The more** you read, **the more** you learn. |
| **much / far / a lot** + comp. | mucho más | It's **far cheaper** online. |
| **slightly / a bit** + comp. | un poco más | She's **slightly taller** than me. |
| comp. **and** comp. | cada vez más | It's getting **colder and colder**. |
| **as** + adj + **as** | tan… como | He's **as tall as** his father. |
| **twice / three times as** … **as** | el doble / triple de | It costs **twice as much as** mine. |
| **by far the** + superlativo | con diferencia el más | It's **by far the best**. |
`,
    es: `
- **The sooner, the better.** = Cuanto antes, mejor.
- Para reforzar un comparativo no se usa *very*: ❌ very better → **much / far / a lot** better.
- **as … as** en afirmativa; **not as / so … as** en negativa: It's **not as easy as** it looks.
- **the same as** (❌ the same that / than), **different from**.
> The older I get, the less I worry.
> Prices are getting higher and higher.
## Trampas
- ❌ more better · ❌ more easier → **much** better, **much** easier (no dobles el comparativo).
- ❌ twice bigger → **twice as big as**.
- ❌ the same than you → the same **as** you.
`,
    items: `
The more you practise, ___ you get. | the better | better / the best / more better
This phone is ___ than the old one. | far better | very better / more better / much more good
She earns twice ___ I do. | as much as | more that / as much than / much as
It's getting ___ to find a flat. | harder and harder | more and more hard / hard and hard / the harder
He's ___ the best player in the team. | by far | far / much more / very
My flat is not ___ yours. | as big as | so big than / as big than / bigger as
Your idea is the same ___ mine. | as | than / that / like
The ___ (soon) we leave, the earlier we'll arrive. | sooner
The film was ___ (much / good) than I expected. | much better
! This one is more cheaper. | This one is cheaper. / This one is much cheaper.
! It's very better than before. | It's much better than before. / It's far better than before. / It's a lot better than before.
! My car is the same than yours. | My car is the same as yours.
> If you study more, you learn more. | THE | The more you study, ___ learn. | the more you
> This house is much bigger than ours. | NEARLY | Our house isn't ___ this one. | nearly as big as
= Cuanto antes, mejor. | The sooner, the better. / The sooner the better.
= Es mucho más caro que el mío. | It is much more expensive than mine. / It's much more expensive than mine. / It's far more expensive than mine. / It's a lot more expensive than mine.
= Cada vez hace más calor. | It is getting hotter and hotter. / It's getting hotter and hotter. / It's getting warmer and warmer.
`,
  },
  {
    id: 'had-better', level: 'B2', sub: 1, cat: 'modals', title: 'Had better, be supposed to, be allowed to',
    rule: 'had better + verbo base = más vale que (advertencia). be supposed to = se supone que. be allowed to = tener permiso.',
    table: `
| Forma | Significado | Ejemplo |
|---|---|---|
| **had better** ('d better) + verbo | más vale que (si no, habrá consecuencias) | You**'d better hurry**. |
| **had better not** + verbo | más vale que no | You**'d better not be** late. |
| **be supposed to** + verbo | se supone que, deberías (norma, plan) | We**'re supposed to wear** a tie. |
| **be allowed to** + verbo | tener permiso para | You**'re not allowed to park** here. |
| **be meant to** + verbo | estar pensado para; se supone que | This **is meant to be** easy. |
| **ought to** + verbo | deberías (= should) | You **ought to see** a doctor. |
`,
    es: `
- **had better** habla del presente o futuro aunque lleve *had*. Va **sin to**: You'd better **go**. (❌ better to go)
- **be supposed to**: lo que se espera según las normas o lo acordado; en pasado suele indicar que no ocurrió → He **was supposed to call** me (pero no llamó).
- **be allowed to** es el pasivo de *let / allow*: I **wasn't allowed to** go out.
> We'd better leave now or we'll miss the train.
> You're not supposed to use your phone in class.
## Trampas
- ❌ You had better to study. · ❌ You better had… → You**'d better study**.
- ❌ You hadn't better… → You**'d better not**…
- ❌ It's not allowed smoke. → You're not allowed **to smoke**. / Smoking is not allowed.
`,
    items: `
It's late. We ___ go home. | had better | had better to / should better / better had
You'd better ___ anyone about this. | not tell | not to tell / don't tell / not telling
You're not ___ to use a calculator in the exam. | allowed | let / allowing / permit
He ___ be here at nine, but he hasn't arrived. | was supposed to | had better / supposed to / was suppose to
Students ___ to wear a uniform at this school. | are supposed | supposed / had better / are suppose
You ___ to see a dentist about that tooth. | ought | had better / should to / are better
When I was a child, I ___ to stay up late. | wasn't allowed | didn't allow / wasn't let / hadn't better
You'd better ___ (take) an umbrella. | take
We ___ (not / allow) to park here. | are not allowed / aren't allowed / 're not allowed
! You had better to see a doctor. | You had better see a doctor. / You'd better see a doctor.
! You hadn't better be late. | You had better not be late. / You'd better not be late.
! I am supposed finish this today. | I am supposed to finish this today. / I'm supposed to finish this today.
> It's a good idea for you to leave now. | BETTER | You ___ now. | had better leave / 'd better leave
> They don't let us use our phones. | ALLOWED | We ___ use our phones. | are not allowed to / aren't allowed to
= Más vale que te des prisa. | You had better hurry. / You'd better hurry. / You had better hurry up. / You'd better hurry up.
= Se supone que tengo que estar allí a las ocho. | I am supposed to be there at eight. / I'm supposed to be there at eight.
= No nos dejan salir. | We are not allowed to go out. / We aren't allowed to go out. / We're not allowed to go out. / We aren't allowed to leave.
`,
  },
  {
    id: 'quantifiers-advanced', level: 'B2', sub: 2, cat: 'nouns', title: 'All, each, every, none, whole, most',
    rule: 'every / each + singular · all + plural / incontable · none of + plural · most + sustantivo, most of + the / my / them.',
    table: `
| Palabra | Va con… | Verbo | Ejemplo |
|---|---|---|---|
| **every** | sustantivo singular (todos, como grupo) | singular | **Every student has** a book. |
| **each** | singular (uno por uno); each of + plural | singular | **Each of them was** given a prize. |
| **all** | plural / incontable; all (of) the… | plural / singular | **All the students have** books. |
| **the whole** | sustantivo singular contable | singular | **The whole class** laughed. |
| **most** | most + sust. (en general) · most of the + sust. (concreto) | — | **Most people** agree. **Most of my friends** agree. |
| **none of** | the / my / them + plural | singular o plural | **None of them knows / know**. |
| **no** | + sustantivo | — | There's **no time**. |
`,
    es: `
- **every** y **each** llevan sustantivo y verbo en **singular**, aunque en español digamos «todos».
- **all day** = todo el día (duración) · **every day** = todos los días (frecuencia).
- **most** sin *the* ni *of* para hablar en general: **Most people**… (❌ The most of people · ❌ Most of people)
- **of** solo si sigue the / this / my / them…: most **of the** time, all **of us**, none **of these**.
> Each of us has a different opinion.
> None of my friends lives nearby.
## Trampas
- ❌ Every students · ❌ All people is → **Every student**, **All people are** / **Everybody is**.
- ❌ No one of them → **None of them**.
- ❌ all the day → **all day** / **the whole day**.
- Doble negación: ❌ None of them didn't come → **None of them came**.
`,
    items: `
___ student in the class passed the exam. | Every | All / Each of / Whole
___ people enjoy music. | Most | Most of / The most / The most of
___ of my friends came to the party. I was alone all night. | None | No / Any / No one
I spent ___ day cleaning the house. | the whole | all of / every / whole the
___ of the players was given a medal. | Each | Every / All / Whole
___ the information you need is on the website. | All | Every / Each / Whole
Every child ___ a present. | gets | get / are getting / have got
I've read ___ of the books on the list. | most | the most / most the / almost
None of the shops ___ (be) open yesterday. | was / were
___ (all / every) day last week, it rained. | Every
! Every students have a laptop. | Every student has a laptop. / All students have a laptop. / All the students have a laptop.
! The most of people think so. | Most people think so.
! None of them didn't know the answer. | None of them knew the answer.
! I worked all the day. | I worked all day. / I worked the whole day.
> All the rooms have a balcony. | EVERY | ___ a balcony. | Every room has
= La mayoría de la gente trabaja. | Most people work.
= Ninguno de nosotros lo sabía. | None of us knew. / None of us knew it. / None of us knew that.
= Cada uno de ellos tiene un coche. | Each of them has a car. / Every one of them has a car.
`,
  },
  {
    id: 'future-in-past', level: 'B2', sub: 2, cat: 'tenses', title: 'Future in the past: was going to, would, was about to',
    rule: 'Planes o predicciones vistos desde el pasado: was / were going to, would, was about to (a punto de).',
    table: `
| Desde el presente | Desde el pasado | Ejemplo |
|---|---|---|
| am / is going to | **was / were going to** | I **was going to call** you, but I forgot. |
| will | **would** | I knew she **would** be late. |
| am about to | **was about to** | I **was about to leave** when you rang. |
| am doing (plan) | **was doing** | We **were meeting** at six, so I hurried. |
| is to | **was to / was supposed to** | He **was to become** president years later. |
`,
    es: `
Cuando cuentas algo en pasado y hablas de lo que **entonces era futuro**:
- **was going to** = iba a (muchas veces algo que al final no ocurrió): I **was going to** tell you.
- **would** = el pasado de *will*: He said he **would** help.
- **was about to** = estaba a punto de: The film **was about to** start.
- **was on the point of** + -ing (más formal).
> I thought it was going to rain, so I took an umbrella.
> Little did they know that everything would change.
## Trampas
- ❌ I was going call you. → I was going **to** call you.
- ❌ I knew she will come. → I knew she **would** come.
- ❌ I was about leaving. → I was about **to leave**.
- «Iba a» ≠ «solía»: I **was going to** go (intención) / I **used to** go (hábito).
`,
    items: `
I ___ call you, but my battery died. | was going to | would / was about / am going to
We knew the exam ___ be difficult. | would | will / was going / is going to
The train ___ leave when we got to the platform. | was about to | was about / would to / is about to
She promised she ___ write every week. | would | will / was / is going to
They ___ get married last year, but they cancelled the wedding. | were going to | would / will / were about
I ___ the point of giving up when I found the answer. | was on | was at / would on / was about
He said he ___ (will / be) late. | would be / 'd be
I ___ (be / about / leave) when the phone rang. | was about to leave
! I was going call you yesterday. | I was going to call you yesterday.
! I thought you will like it. | I thought you would like it. / I thought you'd like it.
! She was about leaving when I arrived. | She was about to leave when I arrived.
> "I'll help you," he said. | WOULD | He said ___ me. | he would help / that he would help / he'd help
> I intended to phone you, but I forgot. | GOING | I ___ you, but I forgot. | was going to phone
= Iba a decírtelo. | I was going to tell you. / I was going to tell you that.
= Estaba a punto de salir. | I was about to leave. / I was about to go out.
= Sabía que vendrías. | I knew you would come. / I knew you'd come. / I knew that you would come.
`,
  },
  {
    id: 'relative-advanced', level: 'C1', sub: 1, cat: 'clauses', title: 'Advanced relatives: of which, whereby, reduced clauses',
    rule: 'Cuantificador + of which / of whom · whereby = mediante el cual · relativas reducidas con -ing / participio.',
    table: `
| Estructura | Uso | Ejemplo |
|---|---|---|
| **all / most / some / none + of which / of whom** | cantidad dentro del grupo mencionado | He has three sons, **two of whom** are doctors. |
| preposición + **which / whom** | registro formal | The issue **to which** I refer… |
| **whereby** | sistema o proceso mediante el cual | A scheme **whereby** staff can buy shares. |
| **in which case / at which point** | añade consecuencia o momento | It may rain, **in which case** we'll cancel. |
| reducida activa: **-ing** | = who / which + verbo activo | People **living** nearby complained. |
| reducida pasiva: **participio** | = which + be + participio | The data **collected** in 2020 show… |
| **what** | = the thing(s) that | **What** I need is time. |
`,
    es: `
- **of whom** para personas, **of which** para cosas: She wrote ten novels, **most of which** were bestsellers.
- En registro formal la preposición va delante: the person **with whom** I spoke (informal: the person I spoke **with**).
- **Relativas reducidas**: se quita *who / which + be* → The man (who is) **standing** there · The book (which was) **published** last year.
- **what** no lleva antecedente: ❌ everything what → everything **that** / **what** he said.
> The company employs 200 people, many of whom work remotely.
> Anyone wishing to attend should register online.
## Trampas
- ❌ two of them are doctors (tras coma, en una relativa) → **two of whom** are doctors.
- ❌ the reason because → the reason **why / that**.
- ❌ all what I know → **all (that)** I know.
`,
    items: `
She has three brothers, two ___ live abroad. | of whom | of which / of them who / whom of
He wrote several books, none ___ sold well. | of which | of whom / which of / of them which
It is a system ___ employees choose their own hours. | whereby | whereas / which / what
The flight may be cancelled, ___ we will refund your ticket. | in which case | in what case / which case / in that which
Students ___ to apply should complete the form. | wishing | wished / who wishing / which wish
The results ___ in the study were surprising. | obtained | obtaining / which obtained / were obtained
___ worries me is the cost. | What | That / Which / The what
The conference ___ I referred was held in Berlin. | to which | which to / to what / to whom
! He has two sisters, both of them are teachers. | He has two sisters, both of whom are teachers.
! That's all what I know. | That's all I know. / That's all that I know.
! The people which were invited didn't come. | The people who were invited didn't come. / The people invited didn't come. / The people that were invited didn't come.
> The woman who is sitting by the window is my boss. | SITTING | The woman ___ window is my boss. | sitting by the
> They interviewed fifty people. Most of them were students. | WHOM | They interviewed fifty people, ___ students. | most of whom were
> The cars that are produced here are exported. | PRODUCED | The cars ___ exported. | produced here are
= Lo que necesito es tiempo. | What I need is time.
= Tiene dos hijos, uno de los cuales vive en Roma. | He has two children, one of whom lives in Rome. / She has two children, one of whom lives in Rome. / He has two sons, one of whom lives in Rome. / She has two sons, one of whom lives in Rome.
`,
  },
  {
    id: 'future-formal', level: 'C1', sub: 1, cat: 'tenses', title: 'Formal & nuanced future: be to, be due to, be bound to',
    rule: 'be to = plan oficial u orden · be due to = previsto para · be bound to = seguro que · be on the verge of = a punto de.',
    table: `
| Forma | Matiz | Ejemplo |
|---|---|---|
| **be to** + verbo | plan oficial, instrucción (prensa, normas) | The President **is to visit** Madrid. |
| **be due to** + verbo | previsto en un horario | The train **is due to arrive** at 6. |
| **be about to** + verbo | inminente | The show **is about to begin**. |
| **be on the verge / point of** + -ing | a punto de (cambio importante) | She's **on the verge of resigning**. |
| **be bound / sure / certain to** + verbo | seguro que ocurrirá | He's **bound to find out**. |
| **be likely / unlikely to** + verbo | probable / improbable | Prices are **likely to rise**. |
| **be set to** + verbo | todo indica que (periodismo) | Sales are **set to double**. |
`,
    es: `
Además de *will* y *going to*, el inglés formal y periodístico tiene un abanico de futuros:
- **be to**: titulares y normas → You **are not to leave** the building. (orden)
- **be due to**: horario o plazo → The report **is due to be published** in May.
- **be bound to**: certeza lógica → It's **bound to** rain; it always does.
- **be likely to**: la forma natural de «es probable que» → She **is likely to win**. (❌ It's probable that she wins)
> The two companies are to merge next year.
> You're bound to make mistakes at first.
## Trampas
- ❌ It is probable that he comes. → He **is likely to** come.
- ❌ on the verge to collapse → on the verge **of collapsing**.
- **due to** también significa «debido a»: no lo confundas con **be due to** + verbo.
`,
    items: `
The Prime Minister ___ meet union leaders tomorrow, officials said. | is to | is bound / is on the verge of / will to
The plane is ___ land at 18:40. | due to | bound of / about / on the verge to
You're ___ feel nervous before your first speech; everybody does. | bound to | due / to / on the point of
The company is on the verge ___ bankrupt. | of going | to go / of go / going
Prices are ___ to rise again next year. | likely | probable / possibly / maybe
You are not ___ this room without permission. | to leave | leaving / to be left / due leaving
The film is ___ to start. Hurry up! | about | on verge / point / going be
Unemployment is ___ to fall below 5% this year, analysts say. | set | verge / point / sure of
! It is probable that she wins the election. | She is likely to win the election. / It is likely that she will win the election. / She will probably win the election.
! He is on the point to resign. | He is on the point of resigning.
! The meeting is due at start at ten. | The meeting is due to start at ten.
> I'm sure he'll forget. | BOUND | He ___ forget. | is bound to / 's bound to
> The government plans to announce the changes on Monday. | IS | The government ___ the changes on Monday. | is to announce
> She will probably get the job. | LIKELY | She ___ the job. | is likely to get
= Está a punto de llover. | It is about to rain. / It's about to rain.
= Es probable que lleguen tarde. | They are likely to be late. / They're likely to be late. / They are likely to arrive late. / It is likely that they will be late.
`,
  },
  {
    id: 'nominalisation', level: 'C1', sub: 2, cat: 'discourse', title: 'Nominalisation',
    rule: 'En escritura académica, los verbos y adjetivos se convierten en sustantivos: prices rose sharply → a sharp rise in prices.',
    table: `
| Estilo hablado (verbo / adjetivo) | Estilo académico (sustantivo) |
|---|---|
| Prices **rose** sharply. | There was **a sharp rise in** prices. |
| The government **decided** to… | The government's **decision** to… |
| Because people **are aware**… | Owing to public **awareness**… |
| They **failed** to act, so… | Their **failure** to act led to… |
| If we **analyse** the data… | An **analysis of** the data… |
| It **is likely that** rates will fall. | There is **a likelihood of** falling rates. |
`,
    es: `
**Nominalizar** es expresar una acción o cualidad con un sustantivo. Hace el texto más **denso, impersonal y formal**: se quita el sujeto y se pone el foco en el concepto.
- Verbo → sustantivo: increase → **an increase in**, develop → **development**, fail → **failure**, grow → **growth**, lose → **loss**.
- Adjetivo → sustantivo: important → **importance**, able → **ability**, aware → **awareness**, likely → **likelihood**.
- El adverbio pasa a adjetivo: rose **sharply** → a **sharp** rise.
- Preposiciones habituales: a rise / fall / increase / decrease **in**; the cause / effect / lack **of**; a need / demand / reason **for**; an impact / effect **on**.
> The introduction of the new law led to a reduction in crime.
> There is a growing need for qualified staff.
## Trampas
- ❌ an increase of prices → an increase **in** prices (pero: an increase **of** 5 %).
- ❌ the lack of to understand → the lack of **understanding**.
- No abuses: demasiados sustantivos seguidos vuelven el texto ilegible.
`,
    items: `
There has been a sharp rise ___ unemployment. | in | of / on / at
The ___ of the new system took two years. | development | develop / developing of / developed
Their ___ to respond caused serious problems. | failure | fail / failing of / failed
There is a growing ___ for skilled workers. | demand | demanding / demanded / demand of
The study highlights the ___ of early education. | importance | important / importancy / import
Lack of ___ is the main cause of accidents. | awareness | aware / awaring / awarement
The new law had a major impact ___ small businesses. | on | in / at / to the
The ___ (grow) of the city has been rapid. | growth
We were surprised by his ___ (refuse) to cooperate. | refusal
The ___ (likely) of success is low. | likelihood
> Prices rose sharply last year. | RISE | There was ___ prices last year. | a sharp rise in
> The company decided to close the factory, which surprised everyone. | DECISION | The company's ___ the factory surprised everyone. | decision to close
> Because he failed to attend, he lost his job. | FAILURE | His ___ led to the loss of his job. | failure to attend
> People are becoming more aware of the problem. | AWARENESS | There is growing ___ the problem. | awareness of
= Ha habido un aumento del 5 % en las ventas. | There has been a 5% increase in sales. / There has been an increase of 5% in sales. / There has been a 5 % increase in sales.
= La falta de tiempo es el problema principal. | Lack of time is the main problem. / The lack of time is the main problem.
`,
  },
  {
    id: 'modals-advanced', level: 'C1', sub: 2, cat: 'modals', title: 'Advanced modality: needn\'t have, might as well, can\'t help',
    rule: 'needn\'t have done = lo hiciste sin necesidad · might as well = ya que estamos · can\'t help + -ing = no poder evitar.',
    table: `
| Expresión | Significado | Ejemplo |
|---|---|---|
| **needn't have** + participio | lo hiciste, pero no hacía falta | You **needn't have bought** wine; we had plenty. |
| **didn't need to** + verbo | no hacía falta (y probablemente no se hizo) | I **didn't need to queue**, so I went straight in. |
| **might / may as well** + verbo | ya puestos, no hay nada mejor que hacer | The bus has gone; we **might as well walk**. |
| **can't help** + -ing | no poder evitar | I **can't help laughing**. |
| **can't / couldn't have** + participio | es imposible que | He **can't have known**. |
| **may / might well** + verbo | es muy posible que | She **may well be** right. |
| **should / ought to have** + participio | deberías haber | You **should have told** me. |
| **will / would** (hábito, insistencia) | conducta típica, a veces molesta | He **will keep** interrupting. |
`,
    es: `
Matices que distinguen un nivel alto:
- **needn't have done** ≠ **didn't need to do**: I **needn't have hurried** (corrí para nada) / I **didn't need to hurry** (no hizo falta correr).
- **might as well**: sugerencia sin entusiasmo. We **might as well go** home.
- **can't help + -ing** / **can't help but + verbo**: I **couldn't help noticing**… / I couldn't help **but notice**…
- **may / might well**: probabilidad alta. · **could / might have**: posibilidad no realizada o reproche suave: You **might have told** me!
> You needn't have come so early.
> I can't help thinking we've made a mistake.
## Trampas
- ❌ I can't help to laugh. → I can't help **laughing**.
- ❌ You didn't need buy it. → You **didn't need to buy** it / **needn't have bought** it.
- ❌ He mustn't have seen us (deducción negativa) → He **can't have seen** us.
`,
    items: `
You ___ so much food; there are only three of us. | needn't have cooked | didn't need cook / mustn't have cooked / needn't cooked
There's nothing on TV. We ___ go to bed. | might as well | might well to / can as well / may as good
I can't help ___ that something is wrong. | feeling | to feel / feel / but feeling
She ___ the email; she was on a plane all day. | can't have read | mustn't have read / can't read / shouldn't read
He ___ be telling the truth; his story does make sense. | may well | may as well / can well / might good
You ___ me you were coming! I'd have made dinner. | might have told | might tell / may have told to / must have told
I ___ wait: the doctor saw me immediately. | didn't need to | needn't have / mustn't / hadn't to
He ___ leave his dirty cups everywhere. It drives me mad. | will | would rather / shall / is to
I couldn't help ___ (overhear) your conversation. | overhearing
You needn't ___ (bring) anything, but thank you. | have brought
! I can't help to think about it. | I can't help thinking about it.
! He mustn't have heard the phone; he would have answered. | He can't have heard the phone; he would have answered. / He couldn't have heard the phone; he would have answered.
> It wasn't necessary for you to pay, but you did. | NEEDN'T | You ___ paid. | needn't have
> There's no point waiting, so let's leave. | WELL | We ___ leave. | might as well / may as well
> I'm sure she didn't see us. | HAVE | She ___ us. | can't have seen / couldn't have seen
= No pude evitar reírme. | I couldn't help laughing. / I could not help laughing. / I couldn't help but laugh.
= No hacía falta que vinieras. | You needn't have come. / You didn't need to come. / You didn't have to come.
`,
  },
];
