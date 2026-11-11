import type { GrammarTopic } from '../core/types.ts';

/* Temas que faltaban en A1 y A2 para poder empezar desde cero. */
export const GRAMMAR_NEW_A: GrammarTopic[] = [
  {
    id: 'pronouns-subject-object', level: 'A1', sub: 1, cat: 'nouns', title: 'Pronouns: I / me, he / him',
    rule: 'Antes del verbo: I, you, he, she, it, we, they. Después del verbo o de una preposición: me, you, him, her, it, us, them.',
    table: `
| Sujeto (antes del verbo) | Objeto (después) | Español |
|---|---|---|
| **I** | **me** | yo / me, a mí |
| **you** | **you** | tú, vosotros / te, os |
| **he** | **him** | él / le, lo, a él |
| **she** | **her** | ella / le, la, a ella |
| **it** | **it** | (cosa o animal) / lo, la |
| **we** | **us** | nosotros / nos |
| **they** | **them** | ellos, ellas / les, los, las |
`,
    es: `
En inglés el **sujeto no se puede omitir**: siempre hay que decir quién hace la acción.
- **Sujeto** (hace la acción, va delante del verbo): **I**, you, **he**, **she**, it, **we**, **they**
- **Objeto** (recibe la acción, va detrás del verbo o de una preposición): **me**, you, **him**, **her**, it, **us**, **them**
> She loves him.
> Can you help us?
> This present is for them.
## Trampas
- **I** siempre va en mayúscula.
- **it** se usa para cosas, animales, el tiempo y la hora: **It** is cold. **It** is three o'clock.
- Detrás de una preposición va la forma de objeto: with **me**, for **her**, to **them**. ❌ with I
- En español decimos «Es bonito»; en inglés hace falta el sujeto: **It** is nice.
`,
    items: `
This is my sister. ___ is a nurse. | She | Her / He / It
I like Tom, but he doesn't like ___. | me | I / my / mine
Where are the keys? I can't find ___. | them | they / it / their
My parents live in Madrid. I visit ___ every month. | them | they / their / him
Look at that dog. ___ is very big. | It | He is / Its / Them
Can you help ___? We are lost. | us | we / our / ours
Is this book for ___? Thank you! | me | I / my / mine
Mark is my friend. I see ___ (he) every day. | him
We are late. Wait for ___ (we)! | us
Anna is here. Do you know ___ (she)? | her
! Me like chocolate. | I like chocolate.
! Is very cold today. | It is very cold today. / It's very cold today. # El sujeto no se omite: it
! I go to school with she. | I go to school with her. # Tras preposición, forma de objeto
! Them are my friends. | They are my friends. / They're my friends.
= Ella me quiere. | She loves me.
= Los veo todos los días. | I see them every day.
= ¿Puedes ayudarnos? | Can you help us?
`,
  },
  {
    id: 'have-got', level: 'A1', sub: 1, cat: 'verbs', title: 'Have / have got',
    rule: 'Tener: I have / she has (negativa con don\'t / doesn\'t) o I have got / she has got (negativa haven\'t / hasn\'t got).',
    table: `
| | have | have got |
|---|---|---|
| Afirmativa | I **have** a car · she **has** a car | I **have got** (I've got) · she **has got** (she's got) |
| Negativa | I **don't have** · she **doesn't have** | I **haven't got** · she **hasn't got** |
| Pregunta | **Do** you **have**…? **Does** she **have**…? | **Have** you **got**…? **Has** she **got**…? |
| Respuesta corta | Yes, I **do**. / No, she **doesn't**. | Yes, I **have**. / No, she **hasn't**. |
`,
    es: `
Las dos formas significan **tener** (posesión, familia, enfermedades):
- **have**: funciona como cualquier verbo, con **do / does** → I **don't have** time. **Does** he **have** a dog?
- **have got**: muy común en inglés británico hablado → I**'ve got** two brothers. **Has** she **got** a car?
> I have a headache.
> She has got blue eyes.
## Trampas
- 3ª persona: **has**, nunca «haves».
- No mezcles las dos formas: ❌ Do you have got…? ❌ I don't have got.
- La edad, el hambre, el frío… van con **be**, no con have: I **am** 20. I **am** hungry.
- En pasado solo se usa **had**: I **had** a dog. (❌ had got)
`,
    items: `
She ___ two brothers. | has | have / haves / are
We ___ got a big garden. | have | has / are / do
___ you have a pen? | Do | Have / Are / Does
He ___ have a car. | doesn't | don't / hasn't / isn't
___ she got a phone? | Has | Does / Have / Is
I ___ got any money today. | haven't | don't / hasn't / am not
My sister ___ (have) a new job. | has
They ___ (not have) children. | don't have / do not have
___ your brother have a bike? | Does
! She have a dog. | She has a dog. / She has got a dog. / She's got a dog.
! Do you have got a car? | Do you have a car? / Have you got a car?
! I have 20 years. | I am 20. / I'm 20. / I am 20 years old. / I'm 20 years old. # La edad va con «be»
! He don't have time. | He doesn't have time. / He does not have time. / He hasn't got time.
= Tengo dos hermanas. | I have two sisters. / I have got two sisters. / I've got two sisters.
= ¿Tienes coche? | Do you have a car? / Have you got a car?
= Ella no tiene tiempo. | She doesn't have time. / She does not have time. / She hasn't got time. / She has not got time.
`,
  },
  {
    id: 'adjectives-basic', level: 'A1', sub: 1, cat: 'words', title: 'Adjectives: position & form',
    rule: 'El adjetivo va delante del sustantivo (a red car) o detrás de be (the car is red) y nunca lleva plural.',
    table: `
| Español | Inglés | Regla |
|---|---|---|
| un coche **rojo** | a **red** car | adjetivo **antes** del sustantivo |
| unos coches **rojos** | **red** cars | el adjetivo **no tiene plural** |
| el coche es **rojo** | the car is **red** | detrás de **be** |
| una casa **grande y vieja** | a **big old** house | varios adjetivos, sin «and» delante del sustantivo |
`,
    es: `
- El adjetivo va **antes** del sustantivo: a **new** phone, an **interesting** book.
- **No cambia**: ni plural ni género → two **big** dogs (❌ bigs dogs).
- Con **be**, va detrás: The film is **boring**.
- **very / really / quite** van delante del adjetivo: It's **very** good.
> She has long hair.
> They are nice people.
## Trampas
- ❌ a car red · ❌ the house white → a **red** car, the **white** house.
- a / an depende del sonido del adjetivo que sigue: **an** old man, **a** young man.
- «Muy»: **very**, no «much» → very tired (❌ much tired).
`,
    items: `
She has ___. | a new car | a car new / new a car / a news car
They are ___. | good students | goods students / students good / good student
It's ___ old house. | an | a / the some / one of
My sister has ___. | long hair | hair long / a long hair / longs hair
The film was ___. | very good | much good / good very / very well
These shoes are ___. | expensive | expensives / expensive ones shoes / an expensive
I want two ___ (big) pizzas. | big
! She has a car red. | She has a red car.
! They are news books. | They are new books. / They're new books.
! He is a boy tall. | He is a tall boy. / He's a tall boy.
! I am much tired. | I am very tired. / I'm very tired. / I am really tired. / I'm really tired.
= Tengo un coche viejo. | I have an old car. / I have got an old car. / I've got an old car.
= Son casas grandes. | They are big houses. / They're big houses.
= La película es muy interesante. | The film is very interesting. / The movie is very interesting.
`,
  },
  {
    id: 'was-were', level: 'A1', sub: 2, cat: 'tenses', title: 'Past of be: was / were',
    rule: 'I / he / she / it was · you / we / they were. Negativa: wasn\'t / weren\'t. Pregunta: Was she…? Were you…?',
    table: `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I / he / she / it | I **was** | I **wasn't** | **Was** I…? |
| you / we / they | you **were** | you **weren't** | **Were** you…? |
| there | there **was** (singular) · there **were** (plural) | there wasn't / weren't | Was there…? / Were there…? |
`,
    es: `
El pasado de **be** (era, estaba, fui, estuve) tiene dos formas:
- **was**: I, he, she, it → I **was** tired. She **was** at home.
- **were**: you, we, they → We **were** late. **Were** you there?
- No usa did: ❌ Did you be…? → **Were** you…?
> It was cold yesterday.
> They weren't at school last week.
## Expresiones útiles
- **was born** = nací: I **was born** in 1998. (❌ I born)
- **There was / there were** = había: **There was** a park here. **There were** many people.
`,
    items: `
I ___ at home yesterday. | was | were / am / did
They ___ very tired last night. | were | was / are / did
___ you at the party on Saturday? | Were | Was / Did / Are
She ___ at work yesterday; she was ill. | wasn't | weren't / isn't / didn't
Where ___ he born? | was | were / is / did
There ___ many people at the concert. | were | was / are being / is
It ___ (be) very cold last winter. | was
We ___ (not be) at school last week. | weren't / were not
___ (be) your parents at home last night? | Were
! I were at home. | I was at home.
! Did you be at the party? | Were you at the party?
! I born in 1998. | I was born in 1998. # was born
! They was happy. | They were happy.
= Ayer estuve en casa. | I was at home yesterday. / Yesterday I was at home.
= ¿Dónde estabas? | Where were you?
= Nací en España. | I was born in Spain.
`,
  },
  {
    id: 'like-ing', level: 'A1', sub: 2, cat: 'verbs', title: 'Like / love / hate + -ing & would like',
    rule: 'Gustos: like / love / hate + verbo en -ing (I like reading). Deseo concreto: would like + to + verbo (I\'d like to go).',
    table: `
| Para… | Estructura | Ejemplo |
|---|---|---|
| gustos generales | like / love / enjoy / hate + **-ing** | I **like swimming**. |
| gustos + cosa | like + sustantivo | She **likes coffee**. |
| pedir o desear ahora | **would like** + sustantivo | I**'d like** a coffee, please. |
| querer hacer algo | **would like to** + verbo | I**'d like to** go home. |
`,
    es: `
- **like / love / enjoy / don't mind / hate** + verbo en **-ing**: I **love cooking**. He **hates getting up** early.
- En español «me gusta» tiene el sujeto al revés. En inglés quien siente es el sujeto: **I** like music. (❌ Me likes music · ❌ It likes me)
- **would like** ('d like) = querría, me gustaría: es más educado que *want*.
> Do you like dancing?
> Would you like a drink?
## Trampas
- **like** = gusto general · **would like** = lo quiero ahora.
- Tras **would like** va **to** + verbo: I'd like **to see** it. (❌ I'd like see)
- -ing: quita la -e (make → making) y dobla consonante en palabras cortas (run → running, swim → swimming).
`,
    items: `
I like ___ football. | playing | play / plays / to playing
She loves ___ in the sea. | swimming | swim / swiming / swims
I'd like ___ a coffee, please. | to have | having / have / to having
___ you like a cup of tea? | Would | Do you / Are / Will be
He hates ___ up early. | getting | get / geting / gets
My brother doesn't like ___ (cook). | cooking
We love ___ (travel). | travelling / traveling
I would like ___ (go) to London one day. | to go
! Me like music. | I like music.
! I like play tennis. | I like playing tennis. / I like to play tennis.
! I would like go home. | I would like to go home. / I'd like to go home.
! She like dancing. | She likes dancing.
= Me gusta leer. | I like reading. / I like to read.
= Me gustaría un café, por favor. | I would like a coffee, please. / I'd like a coffee, please.
= ¿Te gusta cocinar? | Do you like cooking? / Do you like to cook?
`,
  },
  {
    id: 'conjunctions-basic', level: 'A1', sub: 2, cat: 'clauses', title: 'And, but, or, so, because',
    rule: 'and = y · but = pero · or = o · so = así que (consecuencia) · because = porque (causa).',
    table: `
| Conector | Significado | Ejemplo |
|---|---|---|
| **and** | y (suma) | I have a cat **and** a dog. |
| **but** | pero (contraste) | It's small **but** comfortable. |
| **or** | o (opción) | Tea **or** coffee? |
| **so** | así que (consecuencia) | It was late, **so** I went home. |
| **because** | porque (causa) | I went home **because** it was late. |
`,
    es: `
Con estas cinco palabras ya puedes unir frases y dejar de hablar con frases sueltas.
- **because** + causa · **so** + consecuencia: son la misma idea al revés.
> I was tired, so I went to bed.
> I went to bed because I was tired.
- En frases negativas, para «ni» se usa **or**: I don't like tea **or** coffee.
## Trampas
- «¿Por qué?» = **Why?** · «Porque» = **Because**. No los confundas.
- ❌ I like tea but I don't like coffee **too**. → …**either**.
- No se dice «because of» delante de una frase con verbo: because **it rained** / because of **the rain**.
`,
    items: `
I like tea ___ I don't like coffee. | but | so / because / or
She was hungry, ___ she made a sandwich. | so | because / but / or
I stayed at home ___ I was ill. | because | so / but / and then
Would you like tea ___ coffee? | or | so / but / because
He is tall ___ strong. | and | or because / so that / but because
I don't eat meat ___ fish. | or | so / because / but and
We didn't go out ___ it was raining. | because | so / but / or
It was raining, ___ we stayed at home. | so | because / or / but because
! I was tired because I went to bed. | I was tired, so I went to bed. / I was tired so I went to bed. / I went to bed because I was tired.
! I'm late so the bus was late. | I'm late because the bus was late. / I am late because the bus was late. # because + causa
! I don't like tea and coffee neither. | I don't like tea or coffee. / I don't like tea or coffee either. # En negativa: or
= Tengo un perro y dos gatos. | I have a dog and two cats. / I have got a dog and two cats. / I've got a dog and two cats.
= Es caro, pero es muy bueno. | It is expensive, but it is very good. / It's expensive, but it's very good. / It's expensive but it's very good. / It is expensive but it is very good.
= No fui porque estaba cansado. | I didn't go because I was tired. / I did not go because I was tired.
`,
  },
  {
    id: 'word-order-basic', level: 'A1', sub: 2, cat: 'clauses', title: 'Word order: subject + verb + object',
    rule: 'Orden fijo: sujeto + verbo + objeto + lugar + tiempo. Nada se mete entre el verbo y su objeto.',
    table: `
| Sujeto | Verbo | Objeto | Lugar | Tiempo |
|---|---|---|---|---|
| I | play | tennis | in the park | on Sundays. |
| She | speaks | English | at work | every day. |
| We | watched | a film | at home | last night. |
`,
    es: `
En español el orden es libre («Me gusta mucho el fútbol», «Ayer compré yo el pan»). En inglés es **fijo**:
**Sujeto + Verbo + Objeto** (+ cómo + dónde + cuándo)
- El verbo y su objeto van **pegados**: I like football **very much**. (❌ I like very much football)
- Primero el **lugar**, luego el **tiempo**: I went **to the cinema yesterday**.
- El tiempo también puede ir al principio: **Yesterday** I went to the cinema.
> She speaks English very well.
> We have lunch at home every day.
## Trampas
- ❌ I speak very well English → I speak English **very well**.
- ❌ Is beautiful the house → **The house** is beautiful.
- Siempre hace falta sujeto: **It** is raining. **There** is a problem.
`,
    items: `
I ___. | like football very much | like very much football / very much like the football / football like very much
She ___. | speaks English very well | speaks very well English / very well speaks English / English speaks very well
We ___ every Friday. | go to the cinema | to the cinema go / go the cinema to / the cinema go to
He ___ last night. | watched a film at home | watched at home a film / at home watched a film / a film watched at home
___ is very nice. | The house | Is the house / House the / Very the house
They ___ in the garden. | play football | football play / play in football / plays football
I ___ every morning. | drink coffee at home | drink at home coffee / at home drink coffee / coffee drink at home
! I like very much pizza. | I like pizza very much. / I really like pizza.
! She speaks very well Spanish. | She speaks Spanish very well.
! Is beautiful the beach. | The beach is beautiful.
! I go every day to work. | I go to work every day. / Every day I go to work.
= Me gusta mucho la música. | I like music very much. / I like music a lot. / I really like music.
= Ella habla francés muy bien. | She speaks French very well.
= Ayer compré un libro. | I bought a book yesterday. / Yesterday I bought a book.
`,
  },
  {
    id: 'it-subject', level: 'A2', sub: 1, cat: 'clauses', title: 'It as subject: it\'s easy to…, it takes…',
    rule: 'El inglés necesita sujeto: It is + adjetivo + to + verbo (It\'s easy to learn). Tiempo: It takes + tiempo + to + verbo.',
    table: `
| Uso | Estructura | Ejemplo |
|---|---|---|
| opinar sobre una acción | **It's** + adjetivo + **to** + verbo | **It's** important **to sleep** well. |
| tiempo que se tarda | **It takes** (+ persona) + tiempo + **to** + verbo | **It takes me** an hour **to get** there. |
| clima | **It** + verbo / **It's** + adjetivo | **It's raining**. **It's** sunny. |
| hora, fecha, distancia | **It's** + … | **It's** ten o'clock. **It's** 5 km from here. |
| existencia | **There is / are** | **There's** a problem. |
`,
    es: `
En español decimos «Es difícil aprender chino» o «Llueve» sin sujeto. En inglés hay que poner **it**:
- **It's** difficult **to learn** Chinese. · **It's** nice **to see** you.
- **It takes** = se tarda: **It takes** ten minutes. **How long does it take?**
- **It** para el tiempo, la hora y la distancia: **It's** late. **It was** very hot.
> It's dangerous to swim here.
> It took us two hours to finish.
## Trampas
- ❌ Is important to study. → **It** is important to study.
- ❌ It's easy learn / learning English. → It's easy **to learn** English.
- ❌ I take one hour to arrive. → **It takes me** one hour to arrive.
- No confundas **it's** (it is) con **its** (su).
`,
    items: `
___ important to drink water. | It's | Is / Its / There's
It's easy ___ this game. | to learn | learn / learning of / for learn
It ___ me twenty minutes to get to work. | takes | take / is taking of / lasts
How long does it ___ to fly to London? | take | takes / last for / be
___ raining a lot yesterday. | It was | Was / There was / It were
___ a bank near here? | Is there | Is it / There is it / It is
It's difficult ___ (understand) him. | to understand
It ___ (take) us three hours to get there yesterday. | took
! Is very difficult to find a job. | It is very difficult to find a job. / It's very difficult to find a job.
! It's important study every day. | It's important to study every day. / It is important to study every day.
! I take 30 minutes to go to school. | It takes me 30 minutes to go to school. / It takes me 30 minutes to get to school.
! Is raining. | It is raining. / It's raining.
= Es fácil aprender inglés. | It is easy to learn English. / It's easy to learn English.
= Se tarda una hora. | It takes an hour. / It takes one hour.
= Hace mucho frío hoy. | It is very cold today. / It's very cold today.
`,
  },
  {
    id: 'object-questions', level: 'A2', sub: 1, cat: 'clauses', title: 'Subject & object questions',
    rule: 'Si who / what es el sujeto, no hay auxiliar: Who called you? Si es el objeto, sí: Who did you call?',
    table: `
| Pregunta por… | Estructura | Ejemplo | Respuesta |
|---|---|---|---|
| el **sujeto** | Who / What + **verbo** | **Who called** you? | **Tom** called me. |
| el **objeto** | Who / What + **do / does / did** + sujeto + verbo | **Who did you call?** | I called **Tom**. |
`,
    es: `
Dos preguntas que en español suenan casi igual:
- «¿Quién te llamó?» → preguntas por el **sujeto** → **sin auxiliar** y con el verbo en su forma normal: **Who called you?**
- «¿A quién llamaste?» → preguntas por el **objeto** → **con auxiliar**: **Who did you call?**
> What happened? (¿qué pasó?: «what» es el sujeto)
> What did you see? (¿qué viste?: «you» es el sujeto)
## Trampas
- ❌ Who did call you? → Who **called** you?
- ❌ What did happen? → What **happened**?
- Con **Who** de sujeto el verbo va en 3ª persona: Who **lives** here? Who **wants** coffee?
- Igual con **which / how many** + sustantivo como sujeto: **How many people came?**
`,
    items: `
Who ___ this cake? It's delicious! | made | did make / did made / does made
What ___ yesterday? | happened | did happen / did happened / was happen
Who ___ at the party? | did you see | you saw / saw you / did you saw
Who ___ in that house? | lives | does live / live / do lives
What ___ for breakfast? | do you have | you have / have you do / does you have
How many people ___ to the meeting? | came | did came / did come they / comed
Who ___ (want) more coffee? | wants
What ___ (you / do) at the weekend? | did you do
! Who did break the window? | Who broke the window?
! What did happen to you? | What happened to you?
! Who you called last night? | Who did you call last night?
! Who do want pizza? | Who wants pizza?
= ¿Quién te lo dijo? | Who told you? / Who told you that? / Who told it to you?
= ¿A quién viste? | Who did you see? / Whom did you see?
= ¿Qué pasó? | What happened?
`,
  },
  {
    id: 'for-since-ago', level: 'A2', sub: 2, cat: 'tenses', title: 'How long…? for, since, ago',
    rule: 'for + duración (for two years) · since + momento de inicio (since 2020) · pasado + ago (two years ago).',
    table: `
| Palabra | Va con… | Tiempo verbal | Ejemplo |
|---|---|---|---|
| **for** | una duración | present perfect (sigue ahora) o past simple (terminó) | I've lived here **for** five years. |
| **since** | el momento en que empezó | present perfect | I've lived here **since** 2019. |
| **ago** | cuánto hace que pasó | past simple | I moved here five years **ago**. |
| **How long…?** | pregunta por la duración | present perfect | **How long have** you **lived** here? |
`,
    es: `
- **for** = durante: **for** ten minutes, **for** a week, **for** ages.
- **since** = desde: **since** Monday, **since** 2010, **since** I was a child.
- **ago** = hace: va **detrás** del tiempo y con pasado simple → three days **ago**.
> I've known her for ten years.
> I met her ten years ago.
## Trampas
- «Hace dos años que vivo aquí» → I**'ve lived** here **for** two years. (❌ I live here since two years)
- ❌ since three years → **for** three years. (since va con un momento, no con una duración)
- ❌ ago two days → two days **ago**.
- **How long have you…?** y no ❌ How long time…?
`,
    items: `
I've lived here ___ 2015. | since | for / ago / from
We've been friends ___ ten years. | for | since / ago / during
I saw him two days ___. | ago | before now / since / for
How long ___ you known her? | have | did / do / are
She has worked there ___ last summer. | since | for / ago / during
They got married five years ___. | ago | since / for / past
I haven't eaten ___ (for / since) breakfast. | since
He's been ill ___ (for / since) a week. | for
We ___ (arrive) an hour ago. | arrived
! I live here since two years. | I have lived here for two years. / I've lived here for two years. / I have been living here for two years. / I've been living here for two years.
! I met her ago three years. | I met her three years ago.
! How long time have you been here? | How long have you been here?
= La conozco desde 2018. | I have known her since 2018. / I've known her since 2018.
= Llegué hace dos horas. | I arrived two hours ago.
= Hace un mes que no lo veo. | I haven't seen him for a month. / I have not seen him for a month.
`,
  },
  {
    id: 'may-might', level: 'A2', sub: 2, cat: 'modals', title: 'May / might (possibility)',
    rule: 'may / might + verbo base = quizá, puede que. Negativa: may not / might not. Sin to y sin -s.',
    table: `
| Seguridad | Forma | Ejemplo |
|---|---|---|
| seguro | **will** | It **will** rain. |
| posible | **may / might** | It **may** rain. It **might** rain. |
| posible que no | **may not / might not** | She **might not** come. |
| seguro que no | **won't** | It **won't** rain. |
`,
    es: `
**may** y **might** expresan que algo es **posible** (ahora o en el futuro). Equivalen a «puede que», «quizá», «a lo mejor».
- Igual para todas las personas, sin -s: She **might** be late.
- Van seguidos del verbo **sin to**: I **may go**. (❌ may to go)
- Negativa: **may not / might not** (sin contraer may not).
> Take an umbrella. It might rain.
> I may not be at home tonight.
## Trampas
- ❌ Maybe I will to go → **Maybe** I will go / I **might** go. (*maybe* es un adverbio; *may be* son dos verbos)
- ❌ It can rain tomorrow → It **might** rain tomorrow. (can = posibilidad general, no de un momento concreto)
- **May I…?** también sirve para pedir permiso con educación: **May I** come in?
`,
    items: `
Take a coat. It ___ be cold later. | might | mights / might to / can to
She ___ come to the party; she isn't sure. | may | mays / may to / is may
I ___ not go to work tomorrow. I feel ill. | might | don't might / mightn't to / am might
He may ___ late. The traffic is terrible. | be | to be / is / being
___ I open the window? | May | Might to / Do may / Am I
They ___ (might / not / come). They're very busy. | might not come / may not come
It ___ (may / rain) this afternoon. | may rain
! She mights come later. | She might come later.
! I may to go to the cinema. | I may go to the cinema.
! It can rain tomorrow, take an umbrella. | It might rain tomorrow, take an umbrella. / It may rain tomorrow, take an umbrella.
! He might not to like it. | He might not like it. / He may not like it.
= Puede que llueva. | It might rain. / It may rain.
= A lo mejor llego tarde. | I might be late. / I may be late. / Maybe I'll be late. / Maybe I will be late.
= ¿Puedo entrar? | May I come in? / Can I come in? / Could I come in?
`,
  },
  {
    id: 'infinitive-purpose', level: 'A2', sub: 2, cat: 'verbs', title: 'Purpose: to + verb, for + noun',
    rule: 'Para decir «para» + verbo: to + verbo (I went to buy bread). Con sustantivo: for + sustantivo (for a coffee).',
    table: `
| «Para…» | Estructura | Ejemplo |
|---|---|---|
| + verbo (finalidad) | **to** + verbo | I study **to learn**. |
| + sustantivo | **for** + sustantivo | I went **for a walk**. |
| + para qué sirve algo | **for** + **-ing** | A knife is **for cutting**. |
| + negativa | **so as not to / in order not to** | I ran **so as not to** be late. |
`,
    es: `
El error más repetido de los hispanohablantes: traducir «para» + verbo como *for to* o *for*.
- **to + verbo**: I'm calling **to ask** a question. (❌ for ask · ❌ for to ask · ❌ for asking)
- **for + sustantivo**: We stopped **for lunch**.
- Para qué sirve un objeto: **for + -ing** → This button is **for opening** the door.
> She went to the shop to buy milk.
> I use my phone to take photos.
## Trampas
- ❌ I came here for learn English → I came here **to learn** English.
- ❌ I went to the bank for to get money → …**to get** money.
- «Para no…» = **so as not to / in order not to**: Be quiet **so as not to** wake the baby. (❌ for not wake)
`,
    items: `
I went to the shop ___ some bread. | to buy | for buy / for to buy / for buying
She's saving money ___ a new car. | for | to / for to / so
He called ___ you a question. | to ask | for ask / for asking / to asking
We stopped ___ a coffee. | for | to / for to / for having
This machine is for ___ coffee. | making | make / to making / makes
I'm learning English ___ a better job. | to get | for get / for to get / for getting
They went to Paris ___ (see) the Eiffel Tower. | to see
I got up early ___ (catch) the first train. | to catch
! I came here for learn English. | I came here to learn English.
! She went out for to buy milk. | She went out to buy milk.
! I use this app for study. | I use this app to study. / I use this app for studying.
! He phoned for asking about the job. | He phoned to ask about the job.
= Fui al banco para sacar dinero. | I went to the bank to get money. / I went to the bank to get some money. / I went to the bank to take out money. / I went to the bank to withdraw money.
= Estudio para aprender. | I study to learn.
= Salimos a cenar. | We went out for dinner. / We went out to have dinner.
`,
  },
  {
    id: 'time-clauses', level: 'A2', sub: 2, cat: 'clauses', title: 'Time clauses: when, while, before, after, until',
    rule: 'Tras when / before / after / as soon as / until, el futuro se dice en presente: I\'ll call you when I arrive.',
    table: `
| Conector | Significado | Ejemplo |
|---|---|---|
| **when** | cuando | I'll tell her **when** I **see** her. |
| **as soon as** | en cuanto | Call me **as soon as** you **arrive**. |
| **before / after** | antes de que / después de que | Wash your hands **before** you **eat**. |
| **until** | hasta que | Wait here **until** I **come** back. |
| **while** | mientras | She phoned **while** I **was cooking**. |
`,
    es: `
En español usamos subjuntivo: «cuando **llegue**», «en cuanto **termines**». En inglés, tras estos conectores de tiempo va **presente simple**, aunque hablemos del futuro. El **will** va solo en la otra mitad.
> I'll phone you when I get home. (❌ when I will get)
> We won't start until everybody is here.
- **before / after** + **-ing** si el sujeto es el mismo: **After finishing**, I went home.
- **while** + continuo para la acción larga: **While** I **was reading**, the phone rang.
## Trampas
- ❌ When I will arrive, I will call you. → When I **arrive**, I'll call you.
- ❌ before to go · ❌ after to eat → before **going**, after **eating**.
- **until** = hasta que (tiempo) · **as far as** = hasta (distancia).
`,
    items: `
I'll call you when I ___ home. | get | will get / getting / got to
As soon as she ___, we'll start. | arrives | will arrive / arrive / is arrive
Wait here until I ___ back. | come | will come / came to / am come
Brush your teeth before you ___ to bed. | go | will go / going to / goes
After ___ dinner, we watched a film. | having | have / to have / had to
While I ___, the phone rang. | was cooking | cooked / am cooking / cook
I'll tell him when I ___ (see) him. | see
We won't leave until the rain ___ (stop). | stops
! When I will finish, I will help you. | When I finish, I will help you. / When I finish, I'll help you.
! I'll wait until you will come. | I'll wait until you come. / I will wait until you come.
! Before to go out, close the windows. | Before going out, close the windows. / Before you go out, close the windows.
! As soon as I will know, I'll tell you. | As soon as I know, I'll tell you. / As soon as I know, I will tell you.
= Te llamaré cuando llegue. | I'll call you when I arrive. / I will call you when I arrive. / I'll call you when I get there. / I'll phone you when I arrive.
= Espera hasta que vuelva. | Wait until I come back. / Wait until I get back. / Wait until I return.
= Después de comer, salimos. | After eating, we went out. / After lunch, we went out. / After we ate, we went out.
`,
  },
];
