import type { GrammarTopic } from '../core/types.ts';

export const GRAMMAR_A: GrammarTopic[] = [
  {
    id: 'to-be', level: 'A1', title: 'Verb to be',
    rule: 'I am · you/we/they are · he/she/it is. Negativa: is not / are not. Pregunta: Is she…? Are you…?',
    es: `
**to be** = ser y estar a la vez.
- I **am** (I'm) · you **are** (you're) · he/she/it **is** (he's) · we/they **are**
- Negativa: I'm **not**, she **isn't**, they **aren't**
- Pregunta: invierte verbo y sujeto → **Are** you tired? **Is** it expensive?
> She is a doctor. (es)
> We are at home. (estamos)
## Trampas para hispanohablantes
- La edad va con **be**: I **am** 25 (years old). ❌ I have 25 years.
- Tener hambre/sed/frío/miedo = be hungry / thirsty / cold / afraid.
- No se omite el sujeto: **It** is late. ❌ Is late.
`,
    items: `
My brother ___ a teacher. | is | are / am / be
We ___ from Spain. | are | is / am / be
I ___ not hungry. | am | is / are / be
___ your parents at home? | Are | Is / Am / Do
It ___ very cold today. (be) | is
They ___ (not be) ready yet. | aren't / are not
! I have 30 years. | I am 30. / I'm 30. / I am 30 years old. / I'm 30 years old. # Edad con «be»
! Is very late. | It is very late. / It's very late. # El sujeto no se omite
= Tengo frío. | I am cold. / I'm cold.
= ¿Estás cansado? | Are you tired?
= Ella no es de aquí. | She isn't from here. / She is not from here. / She's not from here.
`,
  },
  {
    id: 'present-simple', level: 'A1', title: 'Present simple',
    rule: 'Hábitos y verdades: I work / she works. Negativa: don\'t/doesn\'t + verbo. Pregunta: Do/Does…?',
    es: `
Para **hábitos, rutinas y verdades generales**.
- I/you/we/they **work** · he/she/it **works** (¡la -s de 3ª persona!)
- -es tras -s, -sh, -ch, -x, -o: watch**es**, go**es** · consonante + y → **-ies**: stud**ies**
- Negativa: **don't / doesn't** + verbo base → She **doesn't work** (❌ doesn't works)
- Pregunta: **Do / Does** + sujeto + verbo base → **Does** he **live** here?
> She works in a hospital.
> Water boils at 100 degrees.
## Trampas
- La -s solo va en un sitio: o en el verbo (she works) o en el auxiliar (does she work?).
- have → **has**, do → **does**, go → **goes**.
`,
    items: `
She ___ (live) in London. | lives
My father ___ (watch) TV every evening. | watches
He ___ (not like) coffee. | doesn't like / does not like
___ you speak French? | Do | Does / Are / Is
Where ___ your sister work? | does | do / is / are
The shop ___ at nine. | opens | open / opening / is open to
My brother ___ (study) medicine. | studies
They ___ (not have) a car. | don't have / do not have
! She don't eat meat. | She doesn't eat meat. / She does not eat meat.
! He work in a bank. | He works in a bank.
! Does she likes tea? | Does she like tea?
= Mi madre trabaja los sábados. | My mother works on Saturdays.
= ¿Dónde vives? | Where do you live?
`,
  },
  {
    id: 'articles-basic', level: 'A1', title: 'Articles: a, an, the',
    rule: 'a/an = uno cualquiera (a + sonido consonante, an + sonido vocal); the = uno concreto/ya mencionado.',
    es: `
- **a** + sonido consonante: a book, a **u**niversity (/ju/), a **E**uropean
- **an** + sonido vocal: an apple, an **h**our (h muda), an **MBA**
- **the** = algo concreto o ya conocido: I bought a car. **The** car is red.
- Profesiones llevan a/an: She is **a** nurse. (❌ She is nurse.)
- Sin artículo: plurales e incontables en sentido general → **Dogs** are loyal. **Music** relaxes me.
> I have an idea.
> The sun is hot.
`,
    items: `
She is ___ engineer. | an | a / the / —
I waited for ___ hour. | an | a / the / —
He studies at ___ university in Madrid. | a | an / the / —
Can you close ___ door, please? | the | a / an / —
I have a dog and a cat. ___ dog is very old. | The | A / An / —
! My sister is doctor. | My sister is a doctor.
! I like the music. | I like music. # En general, sin «the»
! She has a umbrella. | She has an umbrella.
= Es un trabajo interesante. | It's an interesting job. / It is an interesting job.
`,
  },
  {
    id: 'plurals-demonstratives', level: 'A1', title: 'Plurals & this/that/these/those',
    rule: 'this/these = cerca; that/those = lejos. Plurales: -s, -es, -ies y los irregulares (men, children, people).',
    es: `
- **this** (singular, cerca) / **these** (plural, cerca)
- **that** (singular, lejos) / **those** (plural, lejos)
- Plurales: book**s**, box**es**, cit**ies**, kni**ves**
- Irregulares: man → **men**, woman → **women**, child → **children**, person → **people**, foot → **feet**, tooth → **teeth**, mouse → **mice**
- Los adjetivos **no** tienen plural: **big** houses (❌ bigs houses)
> These shoes are new.
> Those people are my neighbours.
`,
    items: `
___ books on this table are mine. | These | This / That / Those
Look at ___ bird over there! | that | these / this / those
I have three ___ (child). | children
There are two ___ (woman) at the door. | women
She brushes her ___ (tooth) twice a day. | teeth
! I bought two news books. | I bought two new books.
! They are very goods friends. | They are very good friends. # Los adjetivos no llevan -s
! This people are nice. | These people are nice. # people es plural
`,
  },
  {
    id: 'there-is', level: 'A1', title: 'There is / There are',
    rule: 'Hay = there is (singular/incontable) / there are (plural). Pasado: there was/were.',
    es: `
**Hay** se dice con **there + be**:
- **There is** a problem. / **There's** some milk.
- **There are** two problems.
- Pregunta: **Is there** a bank near here? **Are there** any tickets?
- Pasado: **there was / there were** · Futuro: **there will be**
> There is a café on the corner.
> There were a lot of people at the party.
- ❌ «It has a problem» para decir «hay un problema».
`,
    items: `
___ a supermarket near my house. | There is / There's
___ many students in the class? | Are there | Is there / There are / Have
There ___ a lot of people at the concert yesterday. | were | was / are / is
There ___ some water in the fridge. | is | are / be / have
! It has a bank in my street. | There is a bank in my street. / There's a bank in my street.
! There is many cars. | There are many cars.
= ¿Hay un hospital por aquí? | Is there a hospital near here? / Is there a hospital around here?
= No había nadie en casa. | There was nobody at home. / There wasn't anybody at home. / There was no one at home. / There wasn't anyone at home.
`,
  },
  {
    id: 'possessives', level: 'A1', title: 'Possessives & pronouns',
    rule: 'Sujeto I/he… · objeto me/him… · posesivo my/his… · pronombre mine/his… · \'s para personas.',
    es: `
Sujeto → objeto → posesivo → pronombre:
- I → **me** → **my** → **mine**
- you → you → **your** → **yours**
- he → **him** → **his** → **his** · she → **her** → **her** → **hers**
- it → it → **its** (¡sin apóstrofo!) · we → **us** → **our** → **ours** · they → **them** → **their** → **theirs**
- Posesión de personas: **John's** car, my **parents'** house.
- **his** = de él, **her** = de ella (depende del poseedor, no de la cosa).
> Maria loves her brother. (de ella)
> This book is mine.
`,
    items: `
Maria is calling ___ mother. | her | his / their / she
Can you help ___? | me | I / my / mine
The dog is eating ___ food. | its | it's / his / it
This isn't your pen. It's ___. | mine | my / me / I
I met ___ (they) at the station. | them
That is my ___ car. (sister) | sister's
! Peter and her wife live in Rome. | Peter and his wife live in Rome. # de él → his
! The car of my father is red. | My father's car is red.
! Is this bag your? | Is this bag yours?
`,
  },
  {
    id: 'can-ability', level: 'A1', title: 'Can / can\'t',
    rule: 'can + verbo sin to (habilidad, permiso, posibilidad). Igual para todas las personas.',
    es: `
- **can** + verbo base: I **can swim**. She **can speak** French. (❌ she cans, ❌ can to swim)
- Negativa: **can't / cannot** · Pregunta: **Can** you…?
- Pasado: **could** · Para otros tiempos: **be able to** → I will **be able to** come.
> Can you help me, please?
> I can't find my keys.
`,
    items: `
She ___ play the piano very well. | can | cans / can to / is can
___ I open the window? | Can | Do / Am / Have
! He can to drive. | He can drive.
! She cans speak three languages. | She can speak three languages.
! I will can come tomorrow. | I will be able to come tomorrow. / I'll be able to come tomorrow.
= No puedo oírte. | I can't hear you. / I cannot hear you.
= ¿Puedes repetirlo, por favor? | Can you repeat that, please? / Could you repeat that, please? / Can you repeat it, please?
`,
  },
  {
    id: 'prep-time', level: 'A1', title: 'Prepositions of time: in, on, at',
    rule: 'at + hora/momento · on + día/fecha · in + mes/año/estación/partes del día.',
    es: `
- **at**: at 5 o'clock, at night, at the weekend (BrE), at Christmas, at the moment
- **on**: on Monday, on 3rd May, on my birthday, on Monday morning
- **in**: in July, in 2020, in summer, in the morning, in the 1990s
- Sin preposición: this/next/last/every → **next** week, **every** day (❌ in next week)
> The class starts at nine.
> I was born in 1998, on a Sunday.
`,
    items: `
The meeting is ___ Monday. | on | in / at / —
I usually get up ___ 7 o'clock. | at | in / on / —
We go skiing ___ winter. | in | on / at / —
My birthday is ___ 5th April. | on | in / at / —
I study best ___ night. | at | in / on / —
! I will see you in next Friday. | I will see you next Friday. / I'll see you next Friday.
! She was born on 1995. | She was born in 1995.
! We have class in Tuesday morning. | We have class on Tuesday morning.
`,
  },
  {
    id: 'frequency', level: 'A1', title: 'Adverbs of frequency',
    rule: 'always/usually/often/sometimes/never van antes del verbo principal pero después de be.',
    es: `
always (100 %) → usually → often → sometimes → rarely → **never** (0 %)
- **Antes** del verbo normal: I **usually get** up early.
- **Después** de be: She **is always** late.
- Con auxiliar: I **have never** been there.
- Preguntas: **How often** do you…? → Once a week, twice a month, every day.
> He never drinks coffee.
> We are often tired on Fridays.
`,
    items: `
She ___ late for class. | is always | always is / always / is always being
I ___ breakfast. | never have | have never / never having / am never have
___ do you go to the gym? | How often | How many / How much / How long
! I go always to work by bus. | I always go to work by bus.
! He never is happy. | He is never happy. / He's never happy.
= A veces estudio en la biblioteca. | Sometimes I study in the library. / I sometimes study in the library.
`,
  },
  {
    id: 'present-continuous', level: 'A2', title: 'Present continuous vs simple',
    rule: 'am/is/are + -ing = ahora / temporal / planes. Present simple = hábitos. Verbos de estado (know, like, want) no van en -ing.',
    es: `
**Present continuous**: be + verbo-**ing**
- Lo que pasa **ahora**: I'**m reading** right now.
- Situaciones **temporales**: She'**s living** with her parents this month.
- **Planes** fijados: We'**re meeting** Tom tomorrow.
**Present simple**: hábitos y verdades → I **read** every night.
## Verbos de estado (no suelen ir en -ing)
know, understand, believe, like, love, hate, want, need, prefer, mean, own, belong, seem
> ❌ I'm knowing → ✅ I **know**
> ❌ I'm wanting → ✅ I **want**
Ortografía: make → mak**ing**, run → ru**nn**ing, lie → l**y**ing
`,
    items: `
Be quiet! The baby ___. | is sleeping | sleeps / sleep / sleeping
I ___ to work every day. | walk | am walking / walks / walking
Look! It ___ (rain). | is raining / 's raining
She ___ (not understand) the question. | doesn't understand / does not understand
What ___ these days? I'm studying for an exam. | are you doing | do you do / you are doing / does you do
We ___ dinner with Anna tomorrow. It's all arranged. | are having | have / has / having
! I am knowing the answer. | I know the answer.
! Now she works in the garden. | Now she is working in the garden. / Now she's working in the garden.
! What do you do? I am read a book. | I am reading a book. / I'm reading a book.
= ¿Qué estás haciendo? | What are you doing?
= Necesito ayuda. | I need help.
`,
  },
  {
    id: 'past-simple', level: 'A2', title: 'Past simple',
    rule: 'Acciones terminadas en un momento pasado: worked / went. Negativa e interrogativa con did + verbo base.',
    es: `
- Regulares: **-ed** → worked, studied, stopped
- Irregulares (aprenderlos): go → **went**, see → **saw**, have → **had**, make → **made**, take → **took**, buy → **bought**, think → **thought**, write → **wrote**…
- Negativa: **didn't** + base → I **didn't go** (❌ didn't went)
- Pregunta: **Did** + sujeto + base → **Did** you **see** it?
- be: **was / were**
- Marcadores: yesterday, last week, ago, in 2019, when I was a child
> We went to Lisbon last summer.
> Where did you buy that?
`,
    items: `
I ___ (see) a great film yesterday. | saw
She ___ (buy) a new laptop last week. | bought
We ___ (not go) out last night. | didn't go / did not go
___ you enjoy the party? | Did | Do / Were / Have
Where ___ you yesterday? | were | was / did / are
They ___ (study) all night. | studied
He ___ the bus ten minutes ago. | caught | catched / catch / has caught
! I didn't went to the class. | I didn't go to the class.
! Did you saw the news? | Did you see the news?
! She buyed a dress. | She bought a dress.
= Llegué a casa muy tarde. | I got home very late. / I arrived home very late.
= ¿Qué hiciste el fin de semana? | What did you do at the weekend? / What did you do on the weekend? / What did you do last weekend?
`,
  },
  {
    id: 'past-continuous', level: 'A2', title: 'Past continuous',
    rule: 'was/were + -ing = acción en progreso en el pasado; a menudo interrumpida por un past simple (when).',
    es: `
- **was/were + -ing**: I **was reading** at 9 pm.
- Acción larga interrumpida por una corta: I **was cooking when** the phone **rang**.
- Dos acciones simultáneas: **While** I was studying, she was watching TV.
- Descripciones de fondo en historias: The sun **was shining**…
> What were you doing when I called?
`,
    items: `
I ___ a shower when the phone rang. | was having | had / have / was have
What ___ you doing at 10 last night? | were | was / did / are
While she ___ (drive), she saw an accident. | was driving
They ___ (play) football when it started to rain. | were playing
When I arrived, they ___ dinner, so I joined them. | were having | had had / have / are having
! When I was arriving home, it started to rain. | When I arrived home, it started to rain. / When I got home, it started to rain.
= Estaba durmiendo cuando llegaste. | I was sleeping when you arrived. / I was asleep when you arrived.
`,
  },
  {
    id: 'comparatives', level: 'A2', title: 'Comparatives & superlatives',
    rule: 'Cortos: -er than / the -est. Largos: more … than / the most … Irregulares: better, worse, further.',
    es: `
- 1 sílaba: tall → tall**er** than → the tall**est**
- -y: easy → eas**ier** → the eas**iest** · doble consonante: big → bi**gg**er
- 2+ sílabas: **more** expensive than → **the most** expensive
- Irregulares: good → **better** → **the best** · bad → **worse** → **the worst** · far → **further/farther**
- Igualdad: **as** tall **as** · not **as/so** … **as**
- ❌ more better, ❌ more easy
- Cuanto más… más: **The more** you read, **the better** you write.
> This exam was harder than the last one.
> It's the most interesting book I've ever read.
`,
    items: `
My car is ___ than yours. | faster | more fast / fastest / more faster
This is the ___ day of my life! | best | better / goodest / most good
Spanish grammar is ___ than English grammar. | more difficult | difficulter / most difficult / more difficult that
She isn't as tall ___ her brother. | as | than / that / like
Today is ___ (hot) than yesterday. | hotter
It's the ___ (expensive) restaurant in town. | most expensive
The ___ you practise, the better you get. | more | most / much / many
! He is more better than me. | He is better than me. / He's better than me.
! This book is more easy. | This book is easier.
! She is taller that her sister. | She is taller than her sister. / She's taller than her sister.
= Es la ciudad más bonita del mundo. | It's the most beautiful city in the world. / It is the most beautiful city in the world.
`,
  },
  {
    id: 'quantifiers', level: 'A2', title: 'Countable/uncountable: some, any, much, many',
    rule: 'many/few + contables; much/little + incontables; a lot of con ambos. some (afirmativas), any (negativas/preguntas).',
    es: `
- **Contables** (se pueden contar): a book, two books → **many**, **a few**, how **many**
- **Incontables**: water, money, information, advice, news, research, furniture, homework → **much**, **a little**, how **much**
- **a lot of / lots of**: con ambos (más natural en afirmativas)
- **some**: afirmativas y ofrecimientos (Would you like **some** tea?)
- **any**: negativas y preguntas (I don't have **any** money.)
- ⚠️ information, advice, news **no** llevan -s ni a/an: a piece of advice
- few = pocos (negativo) / **a few** = algunos (positivo)
> How much time do we have?
> There aren't many students today.
`,
    items: `
How ___ money do you have? | much | many / lot / few
There aren't ___ people here. | many | much / any people / a little
Can you give me some ___? | advice | advices / an advice / adviser
Would you like ___ coffee? | some | any / many / a
I don't have ___ questions. | any | some / no / much
She has ___ friends, so she's never alone. | a lot of | much / a little / any
! I need an information. | I need some information. / I need information. / I need a piece of information.
! There is too much people. | There are too many people.
! How many money is it? | How much money is it? / How much is it?
`,
  },
  {
    id: 'future-basic', level: 'A2', title: 'Future: will vs going to',
    rule: 'going to = planes/intenciones y evidencia; will = decisiones en el momento, predicciones, promesas.',
    es: `
- **going to**: plan ya decidido → I'**m going to** study medicine.
- **going to**: predicción con evidencia → Look at the clouds! It'**s going to** rain.
- **will**: decisión espontánea → The phone's ringing. I'**ll** get it.
- **will**: predicción/opinión → I think she'**ll** pass. Promesas → I'**ll** help you.
- **Present continuous**: citas fijas → I'**m seeing** the dentist on Friday.
- Tras **when, if, as soon as** con futuro → presente: When I **finish**, I'll call you. (❌ when I will finish)
> I'll call you as soon as I arrive.
`,
    items: `
"I'm cold." "I ___ close the window." | 'll / will
Look at that car! It ___ crash! | is going to | will / crashes / is crashing to
We ___ visit our grandparents next weekend. We've already bought the tickets. | are going to | will / go to / going
I'll call you when I ___ (get) home. | get
I promise I ___ (not tell) anyone. | won't tell / will not tell
! I will call you when I will arrive. | I will call you when I arrive. / I'll call you when I arrive.
! Tomorrow I go to buy a car. | Tomorrow I am going to buy a car. / Tomorrow I'm going to buy a car. / I'm going to buy a car tomorrow.
= Creo que lloverá mañana. | I think it will rain tomorrow. / I think it'll rain tomorrow.
`,
  },
  {
    id: 'present-perfect-basic', level: 'A2', title: 'Present perfect (ever, never, just, already, yet)',
    rule: 'have/has + participio: experiencias sin fecha, acciones recientes y resultados presentes.',
    es: `
**have/has + participio** (worked, been, seen, done, written…)
- **Experiencias** sin decir cuándo: Have you **ever** been to London? I've **never** tried sushi.
- **Recién** pasado: I've **just** finished.
- **already** (ya, afirmativas) / **yet** (ya/todavía, preguntas y negativas, al final):
> I've already done my homework.
> Have you finished yet? I haven't finished yet.
- ❌ Con fechas o momentos terminados no se usa: ❌ I have seen him yesterday → ✅ I **saw** him yesterday.
- been vs gone: She has **been** to Paris (fue y volvió) / She has **gone** to Paris (está allí).
`,
    items: `
Have you ever ___ to Japan? | been | gone / went / be
I've ___ finished my essay. Here it is. | just | yet / ever / since
She hasn't called me ___. | yet | already / just / ever
I ___ (never see) such a beautiful place. | have never seen / 've never seen
Have you ever ___ (eat) octopus? | eaten
They ___ (already leave). | have already left / 've already left
! I have seen him yesterday. | I saw him yesterday.
! Did you ever been to Rome? | Have you ever been to Rome?
! I didn't finish yet. | I haven't finished yet.
= Ya he comido. | I have already eaten. / I've already eaten. / I've already had lunch. / I have already had lunch.
`,
  },
  {
    id: 'modals-obligation', level: 'A2', title: 'Must, have to, should',
    rule: 'must/have to = obligación; don\'t have to = no es necesario; mustn\'t = prohibido; should = consejo.',
    es: `
- **must**: obligación (a menudo del hablante) → I **must** call my mum.
- **have to**: obligación externa / reglas → I **have to** wear a uniform.
- **mustn't** = está **prohibido** → You **mustn't** smoke here.
- **don't have to** = **no hace falta** → You **don't have to** come. (puedes, pero no es necesario)
- **should / shouldn't** = consejo → You **should** see a doctor.
- Pasado de must/have to: **had to**.
> You mustn't park here. (prohibido)
> You don't have to pay. It's free. (no hace falta)
`,
    items: `
It's free. You ___ pay. | don't have to | mustn't / shouldn't / must
You ___ use your phone during the exam. It's forbidden. | mustn't | don't have to / needn't / mustn't to
You look tired. You ___ go to bed earlier. | should | must to / have / ought
Yesterday I ___ work until 10 pm. | had to | must / have to / musted
She ___ (have to) get up early on Mondays. | has to
! You must to study more. | You must study more.
! He don't have to work today. | He doesn't have to work today.
= Deberías hablar con tu profesor. | You should talk to your teacher. / You should speak to your teacher. / You should speak with your teacher. / You should talk with your teacher.
`,
  },
  {
    id: 'prep-place', level: 'A2', title: 'Prepositions of place & movement',
    rule: 'in (dentro/ciudades), on (superficie/calle), at (punto concreto); to (dirección), into, arrive in/at.',
    es: `
- **in**: dentro de, ciudades y países → in the box, **in** Madrid
- **on**: superficie, plantas, calles (US) → on the table, **on** the second floor
- **at**: punto/lugar de actividad → **at** home, **at** work, **at** the station, **at** university
- Movimiento: go **to** school, get **into** a car, get **on** a bus/train/plane
- **arrive in** + ciudad/país · **arrive at** + edificio/lugar (❌ arrive to)
- **go home** (sin to)
> She's at work now.
> We arrived in London at midnight.
`,
    items: `
She lives ___ Barcelona. | in | at / on / to
I'll meet you ___ the bus station. | at | in / on / to
We arrived ___ the airport two hours early. | at | to / in / on
Get ___ the bus at the next stop. | on | in / into / at
The keys are ___ the table. | on | in / at / into
! I arrived to Paris at 8. | I arrived in Paris at 8.
! I'm going to home. | I'm going home. / I am going home.
`,
  },
  {
    id: 'verb-patterns-basic', level: 'A2', title: 'Verb + -ing / to + infinitive',
    rule: 'enjoy/finish/mind/avoid + -ing · want/decide/hope/need/plan + to · tras preposición siempre -ing.',
    es: `
- Verbo + **-ing**: enjoy, finish, mind, avoid, suggest, consider, keep, practise, can't stand
- Verbo + **to**: want, need, decide, hope, plan, agree, refuse, promise, learn, manage, afford
- Tras **preposición** → **-ing**: interested **in learning**, good **at swimming**, before **leaving**
- would like / would love + **to**
- Para expresar **finalidad** → **to** (❌ for to): I came here **to study**.
> I enjoy reading in English.
> She decided to quit her job.
`,
    items: `
I enjoy ___ to music. | listening | to listen / listen / for listening
She decided ___ a new car. | to buy | buying / buy / for buy
Thank you for ___ me. | helping | help / to help / helped
I'm interested ___ learning Chinese. | in | on / for / at
Would you mind ___ (open) the window? | opening
We hope ___ (see) you soon. | to see
! I went to the library for to study. | I went to the library to study.
! He avoids to talk about it. | He avoids talking about it.
! I'm looking forward to see you. | I'm looking forward to seeing you. / I am looking forward to seeing you. # «to» aquí es preposición → -ing
`,
  },
];
