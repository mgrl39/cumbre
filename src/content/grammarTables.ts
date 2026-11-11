/* Tablas de referencia por tema (se muestran al principio de la explicación). Markdown con | columnas |. */
export const GRAMMAR_TABLES: Record<string, string> = {
  'to-be': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I | I **am** (I'm) | I'm **not** | **Am** I…? |
| you / we / they | you **are** (you're) | you **aren't** | **Are** you…? |
| he / she / it | she **is** (she's) | she **isn't** | **Is** she…? |
| Pasado | I/he/she/it **was** · you/we/they **were** | wasn't / weren't | Was…? / Were…? |
`,
  'present-simple': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I / you / we / they | I **work** | I **don't work** | **Do** you **work**? |
| he / she / it | she **works** | she **doesn't work** | **Does** she **work**? |

| Terminación | Regla | Ejemplos |
|---|---|---|
| -s | general | works, plays, reads |
| -es | tras -s, -sh, -ch, -x, -o | watches, goes, fixes |
| -ies | consonante + y | studies, tries |
| irregular | have | **has** |
`,
  'articles-basic': `
| Artículo | Cuándo | Ejemplo |
|---|---|---|
| **a** | uno cualquiera + sonido consonante | a book, a university |
| **an** | uno cualquiera + sonido vocal | an apple, an hour |
| **the** | concreto / ya mencionado / único | the sun, the book I bought |
| **—** | plurales e incontables en general | Dogs are loyal. Music helps. |
`,
  'plurals-demonstratives': `
| | Cerca | Lejos |
|---|---|---|
| Singular | **this** book | **that** book |
| Plural | **these** books | **those** books |

| Singular | Plural | | Singular | Plural |
|---|---|---|---|---|
| man | men | | child | children |
| woman | women | | person | people |
| foot | feet | | tooth | teeth |
| knife | knives | | mouse | mice |
`,
  'there-is': `
| | Singular / incontable | Plural |
|---|---|---|
| Presente | There **is** (there's) | There **are** |
| Pasado | There **was** | There **were** |
| Presente perfecto | There **has been** | There **have been** |
| Futuro | There **will be** | There **will be** |
| Pregunta | **Is there**…? | **Are there**…? |
`,
  possessives: `
| Sujeto | Objeto | Adjetivo posesivo | Pronombre posesivo |
|---|---|---|---|
| I | me | my | mine |
| you | you | your | yours |
| he | him | his | his |
| she | her | her | hers |
| it | it | its | — |
| we | us | our | ours |
| they | them | their | theirs |
`,
  'can-ability': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| Presente | I **can** swim | I **can't / cannot** swim | **Can** you swim? |
| Pasado | I **could** swim | I **couldn't** swim | **Could** you…? |
| Otros tiempos | I'**ll be able to** swim | I **haven't been able to**… | |
`,
  'prep-time': `
| AT | ON | IN |
|---|---|---|
| horas: at 5 pm | días: on Monday | meses: in May |
| at night, at noon | fechas: on 3rd May | años: in 2020 |
| at the weekend (BrE) | on my birthday | estaciones: in summer |
| at Christmas | on Monday morning | partes del día: in the morning |
| at the moment | on time (puntual) | in time (a tiempo), in the 1990s |
`,
  frequency: `
| 100 % | | | | | 0 % |
|---|---|---|---|---|---|
| always | usually | often | sometimes | rarely / seldom | never |

| Posición | Ejemplo |
|---|---|
| antes del verbo principal | I **often** read. |
| después de be | She **is always** late. |
| entre auxiliar y verbo | I have **never** been there. |
`,
  'present-continuous': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I | I **am working** | I'm **not working** | **Am** I **working**? |
| you / we / they | they **are working** | they **aren't working** | **Are** they **working**? |
| he / she / it | she **is working** | she **isn't working** | **Is** she **working**? |

| Present simple | Present continuous |
|---|---|
| hábitos: I work at 9. | ahora: I'm working now. |
| verdades: Water boils at 100°. | temporal: I'm living with friends this month. |
| verbos de estado: I know, I want | planes: I'm meeting Ana tomorrow. |
`,
  'past-simple': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| Regular | I **worked** | I **didn't work** | **Did** you **work**? |
| Irregular | I **went** | I **didn't go** | **Did** you **go**? |
| be | I/he **was** · we/they **were** | wasn't / weren't | **Was** he…? |

| Base | Pasado | | Base | Pasado |
|---|---|---|---|---|
| go | went | | buy | bought |
| see | saw | | think | thought |
| have | had | | take | took |
| make | made | | write | wrote |
| get | got | | say | said |
`,
  'past-continuous': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I / he / she / it | was **working** | **wasn't** working | **Was** she working? |
| you / we / they | were **working** | **weren't** working | **Were** they working? |

| Estructura | Ejemplo |
|---|---|
| acción larga **when** acción corta | I was cooking **when** the phone rang. |
| **while** + dos acciones largas | **While** I was reading, he was sleeping. |
`,
  comparatives: `
| Adjetivo | Comparativo | Superlativo |
|---|---|---|
| corto: tall | tall**er** than | the tall**est** |
| -y: easy | eas**ier** than | the eas**iest** |
| CVC: big | bi**gg**er than | the bi**gg**est |
| largo: expensive | **more** expensive than | **the most** expensive |
| good | **better** | **the best** |
| bad | **worse** | **the worst** |
| far | **further / farther** | **the furthest** |
| igualdad | **as** tall **as** | not **as** tall **as** |
`,
  quantifiers: `
| | Contables (chairs) | Incontables (water) |
|---|---|---|
| Mucho | many / a lot of | much / a lot of |
| Algo | some / a few | some / a little |
| Poco | few | little |
| Pregunta | How **many**? | How **much**? |
| Negativa | not any / no | not any / no |

Incontables típicos: information, advice, news, research, evidence, furniture, equipment, homework, knowledge, progress, traffic, luggage.
`,
  'future-basic': `
| Forma | Uso | Ejemplo |
|---|---|---|
| **will** + verbo | decisión al momento, predicción, promesa | I'll help you. |
| **be going to** + verbo | plan decidido, evidencia | I'm going to study. Look, it's going to rain. |
| **present continuous** | cita/plan fijado | I'm seeing the doctor at 5. |
| **present simple** | horarios | The train leaves at 6. |
| when / if / as soon as + **presente** | futuro tras conjunción | When I **finish**, I'll call you. |
`,
  'present-perfect-basic': `
| | Afirmativa | Negativa | Pregunta |
|---|---|---|---|
| I / you / we / they | I **have done** | I **haven't done** | **Have** you **done**? |
| he / she / it | she **has done** | she **hasn't done** | **Has** she **done**? |

| Palabra | Posición | Ejemplo |
|---|---|---|
| ever | pregunta, antes del participio | Have you **ever** been…? |
| never | antes del participio | I've **never** seen it. |
| just | antes del participio | I've **just** arrived. |
| already | antes del participio | She's **already** left. |
| yet | final, neg./pregunta | Have you finished **yet**? |
`,
  'modals-obligation': `
| Verbo | Significado | Ejemplo |
|---|---|---|
| **must** | obligación (personal) | I must call her. |
| **have to** | obligación (externa) | I have to wear a uniform. |
| **mustn't** | prohibido | You mustn't smoke here. |
| **don't have to / needn't** | no es necesario | You don't have to come. |
| **should / ought to** | consejo | You should rest. |
| **had to** | pasado de must/have to | I had to wait. |
`,
  'prep-place': `
| IN | ON | AT |
|---|---|---|
| dentro: in the box | superficie: on the table | punto: at the door |
| ciudades/países: in Paris | plantas: on the 2nd floor | lugares de actividad: at work, at school |
| in bed, in the car | on the bus/train/plane | at home, at the station |

| Movimiento | Ejemplo |
|---|---|
| go **to** | go to school (pero **go home**) |
| arrive **in** (ciudad/país) / **at** (lugar) | arrive in Rome / at the airport |
| get **into** a car / get **on** a bus | |
`,
  'verb-patterns-basic': `
| + -ing | + to + infinitivo | + preposición + -ing |
|---|---|---|
| enjoy, finish, mind | want, need, decide | interested **in** |
| avoid, suggest, keep | hope, plan, agree | good **at** |
| consider, practise | refuse, promise, learn | before / after |
| can't stand | afford, manage, would like | look forward **to** |
`,
  'pp-vs-past': `
| Past simple | Present perfect |
|---|---|
| momento terminado y conocido | sin momento / resultado ahora |
| yesterday, last week, in 2019, ago | ever, never, just, already, yet |
| I **lost** my keys yesterday. | I'**ve lost** my keys (no las tengo). |
| periodo terminado: I **lived** there for 2 years (ya no) | periodo abierto: I'**ve lived** here for 2 years (sigo) |
| When **did** you arrive? | How long **have** you been here? |

| FOR + duración | SINCE + inicio |
|---|---|
| for two years, for ages | since 2019, since Monday, since I was a kid |
`,
  'pp-continuous': `
| Forma | Ejemplo |
|---|---|
| have/has **been** + -ing | I've **been waiting** for an hour. |
| Negativa | She **hasn't been sleeping** well. |
| Pregunta | How long **have** you **been studying**? |

| Present perfect simple | Present perfect continuous |
|---|---|
| resultado / cantidad | actividad / duración |
| I've **written** 3 emails. | I've **been writing** emails all morning. |
| verbos de estado: I've **known** him for years | ❌ I've been knowing |
`,
  'past-perfect': `
| Forma | Ejemplo |
|---|---|
| had + participio | When I arrived, the film **had started**. |
| Negativa | I **hadn't seen** it before. |
| Pregunta | **Had** you **met** her before? |

| Línea temporal | |
|---|---|
| 1º (antes) | past perfect: the film **had started** |
| 2º (después) | past simple: I **arrived** |
`,
  'conditionals-012': `
| Tipo | If-clause | Main clause | Uso |
|---|---|---|---|
| Zero | if + present | present | verdades generales |
| First | if + present | will + verbo | posible/real |
| Second | if + past (were) | would + verbo | hipotético presente |
| unless | = if not | | You won't pass **unless** you study. |
`,
  'passive-basic': `
| Tiempo | Activa | Pasiva |
|---|---|---|
| Present simple | They **clean** it. | It **is cleaned**. |
| Past simple | They **built** it. | It **was built**. |
| Present perfect | They **have sold** it. | It **has been sold**. |
| Future | They **will open** it. | It **will be opened**. |
| Modal | You **can use** it. | It **can be used**. |
`,
  'relative-defining': `
| Pronombre | Para | Ejemplo |
|---|---|---|
| **who** | personas | the woman **who** called |
| **which** | cosas | the book **which** I read |
| **that** | personas o cosas (defining) | the film **that** we saw |
| **whose** | posesión (cuyo) | the man **whose** car… |
| **where** | lugar | the town **where** I grew up |
| **when** | tiempo | the day **when** we met |
| — (omitido) | si es objeto | the book (that) I bought |
`,
  'reported-statements': `
| Directo | Indirecto |
|---|---|
| present: "I **am** tired" | past: she said she **was** tired |
| present continuous: "I'**m working**" | past continuous: he said he **was working** |
| past / present perfect: "I **saw** / **have seen** it" | past perfect: he said he **had seen** it |
| will: "I'**ll** call" | would: she said she **would** call |
| can: "I **can** help" | could |
| must: "I **must** go" | had to |
| today / tomorrow / here | that day / the next day / there |
`,
  'used-to': `
| Estructura | Significado | Ejemplo |
|---|---|---|
| **used to** + verbo | solía (ya no) | I **used to** smoke. |
| **didn't use to** + verbo | no solía | I **didn't use to** like it. |
| **be used to** + -ing | estar acostumbrado | I'**m used to** working late. |
| **get used to** + -ing | acostumbrarse | You'll **get used to** living here. |
| **usually** + presente | hábito actual | I **usually** walk. |
`,
  'modals-deduction': `
| Certeza | Presente | Ejemplo |
|---|---|---|
| 100 % sí | **must** + verbo | She **must be** tired. |
| posible | **might / may / could** + verbo | He **might be** at home. |
| 100 % no | **can't** + verbo | That **can't be** true. |
| en progreso | must/might/can't **be + -ing** | They **must be sleeping**. |
`,
  'too-enough-so-such': `
| Estructura | Ejemplo |
|---|---|
| **too** + adj | too hot to drink |
| adj + **enough** | old enough to vote |
| **enough** + sustantivo | enough money |
| **so** + adj / adv | so tired, so quickly |
| **such (a/an)** + adj + sustantivo | such a nice day, such good friends |
| so/such … **that** | so late **that** we took a taxi |
`,
  'questions-indirect': `
| Directa | Indirecta |
|---|---|
| Where **is** the station? | Could you tell me where **the station is**? |
| What time **does** it **start**? | Do you know what time **it starts**? |
| **Did** she call? | I wonder **if / whether** she called. |

| Afirmativa | Question tag |
|---|---|
| You're Spanish, | **aren't you**? |
| She doesn't smoke, | **does she**? |
| They went home, | **didn't they**? |
| I'm right, | **aren't I**? |
| Let's go, | **shall we**? |
`,
  'gerund-infinitive-b1': `
| Verbo | Patrón | Ejemplo |
|---|---|---|
| make | + persona + **verbo base** | made me **wait** |
| let | + persona + **verbo base** | let us **leave** |
| help | + persona + (to) verbo | helped me (to) **move** |
| want, ask, tell, allow, force, encourage | + persona + **to** + verbo | asked me **to help** |
| be made (pasiva) | + **to** + verbo | I was made **to wait** |
`,
  'conditionals-3-mixed': `
| Tipo | If-clause | Main clause | Ejemplo |
|---|---|---|---|
| Third | if + **had** + participio | **would have** + participio | If I had studied, I would have passed. |
| Mixta (pasado → presente) | if + had + participio | would + verbo | If I had taken the job, I would be rich now. |
| Mixta (presente → pasado) | if + past | would have + participio | If I were braver, I would have spoken. |
| Variantes | | could have / might have | …we might have caught it. |
`,
  'passive-advanced': `
| Estructura | Ejemplo |
|---|---|
| It **is said / believed / thought** that… | It is believed that the drug is safe. |
| Sujeto + **is said to** + infinitivo | The drug **is believed to be** safe. |
| Sujeto + is said **to have** + participio (pasado) | He **is thought to have left**. |
| **have / get** + objeto + participio (causativa) | I **had my hair cut**. |
| algo malo que te pasa | She **had her bag stolen**. |
| -ing pasivo | I hate **being told** what to do. |
| modal + have been + participio | It **should have been done**. |
`,
  'relative-nondefining': `
| | Defining | Non-defining |
|---|---|---|
| Comas | no | **sí** |
| that | sí | **no** |
| Omitir pronombre | si es objeto | **nunca** |
| Función | identifica | añade información extra |
| Ejemplo | The man **who lives here** is a doctor. | My brother, **who lives in Bilbao**, is a doctor. |

| Formal (preposición delante) | Informal (preposición al final) |
|---|---|
| the person **to whom** I spoke | the person I spoke **to** |
| many **of whom**, some **of which**, all **of which** | |
`,
  'reporting-verbs': `
| Patrón | Verbos | Ejemplo |
|---|---|---|
| + to + verbo | agree, refuse, offer, promise, threaten | He **refused to answer**. |
| + persona + to + verbo | advise, warn, remind, encourage, persuade, tell | She **advised me to rest**. |
| + -ing | suggest, deny, admit, recommend | He **denied taking** it. |
| + preposición + -ing | accuse sb **of**, apologise **for**, insist **on**, blame sb **for** | They **accused him of lying**. |
| + that | suggest, explain, claim, admit | She **suggested that** I (should) go. |

| Pregunta directa | Indirecta |
|---|---|
| "Where do you live?" | She asked **where I lived**. |
| "Are you OK?" | He asked **if / whether** I was OK. |
`,
  'modals-past': `
| Modal + have + participio | Significado | Ejemplo |
|---|---|---|
| **must have** | seguro que sí | She must have forgotten. |
| **can't / couldn't have** | imposible | He can't have seen me. |
| **might / may / could have** | quizás | They might have got lost. |
| **should have** | debería haber (y no lo hice) | I should have studied. |
| **shouldn't have** | no debería haber | You shouldn't have said that. |
| **could have** | podría haber (no se aprovechó) | You could have told me! |
| **needn't have** | no hacía falta (pero lo hice) | You needn't have bought wine. |
`,
  wish: `
| Deseo sobre… | Estructura | Ejemplo |
|---|---|---|
| presente | wish + **past** (were) | I wish I **had** more time. |
| pasado (arrepentimiento) | wish + **past perfect** | I wish I **had studied**. |
| quejas sobre otros | wish + **would** | I wish you **would stop**. |
| habilidad | wish + **could** | I wish I **could** fly. |
| preferencia | **I'd rather** + sujeto + past | I'd rather you **didn't** smoke. |
| ya es hora | **It's (high) time** + past | It's time we **left**. |
`,
  'future-advanced': `
| Forma | Estructura | Ejemplo |
|---|---|---|
| Future continuous | will be + -ing | This time tomorrow I'**ll be flying**. |
| Future perfect | will have + participio | By 2030 I'**ll have finished**. |
| Future perfect continuous | will have been + -ing | By June I'**ll have been working** here 10 years. |
| a punto de | be about to + verbo | The film **is about to** start. |
| previsto | be due to + verbo | The plane **is due to** land at 6. |
| probable | be likely to + verbo | Prices **are likely to** rise. |
`,
  'gerund-infinitive-meaning': `
| Verbo | + -ing | + to + infinitivo |
|---|---|---|
| remember / forget | recordar algo pasado | acordarse de hacer |
| stop | dejar de | parar para |
| try | probar (experimento) | intentar (esfuerzo) |
| regret | arrepentirse | lamentar informar |
| go on | seguir con lo mismo | pasar a otra cosa |
| need | necesita ser (pasiva) | necesitar hacer |
`,
  'contrast-linkers': `
| Conector | Va seguido de | Ejemplo |
|---|---|---|
| **although / even though / though** | sujeto + verbo | Although it rained, we went. |
| **despite / in spite of** | sustantivo / -ing | Despite the rain… / Despite being tired… |
| **despite the fact that** | sujeto + verbo | Despite the fact that it rained… |
| **however / nevertheless / nonetheless** | nueva frase (. + coma) | It was hard. However, we did it. |
| **whereas / while** | contraste entre dos | I like tea, whereas she likes coffee. |
| **but / yet** | mismo enunciado | It's cheap but good. |
`,
  'articles-advanced': `
| Situación | Artículo | Ejemplo |
|---|---|---|
| general (plural/incontable) | **—** | **Education** is key. **People** are worried. |
| concreto | **the** | **The education** I received… |
| instituciones por su función | **—** | go to school / university / hospital / prison / bed |
| visitar el edificio | **the** | I went to **the** hospital to see her. |
| únicos | **the** | the sun, the internet, the economy |
| grupos (the + adj) | **the** | the rich, the elderly, the unemployed |
| países | **—** / the | Spain · **the** UK, **the** USA, **the** Netherlands |
`,
  inversion: `
| Adverbio inicial | Estructura | Ejemplo |
|---|---|---|
| Never / Rarely / Seldom | + aux + sujeto | Never **have I** seen… |
| Not only … but also | + aux + sujeto | Not only **did she** win, but she also… |
| Hardly / Scarcely … when | + had + sujeto | Hardly **had I** sat down when… |
| No sooner … than | + had + sujeto | No sooner **had I** sat down than… |
| Only when / Only after / Only then | (cláusula) + aux + sujeto | Only then **did I** understand. |
| Not until | (cláusula) + aux + sujeto | Not until later **did we** realise. |
| Under no circumstances / On no account | + aux + sujeto | Under no circumstances **should you**… |
| Little | + aux + sujeto | Little **did they** know… |
| Condicional sin if | Had / Were / Should + sujeto | **Had I** known… / **Should you** need… |
`,
  cleft: `
| Tipo | Estructura | Ejemplo |
|---|---|---|
| It-cleft | **It is/was** + X + **that/who** … | It was Maria who solved it. |
| Wh-cleft | **What** + sujeto + verbo + **is/was** + X | What I need is a break. |
| Wh-cleft (acción) | **What** + sujeto + **did was** + (to) verbo | What we did was change the plan. |
| All-cleft | **All** + sujeto + verbo + **is** + X | All I want is peace. |
| Reason | **The reason (why)** … **is that** … | The reason I left is that… |
`,
  'participle-clauses': `
| Tipo | Significado | Ejemplo |
|---|---|---|
| **-ing** | activo / simultáneo / causa | **Feeling** tired, I went to bed. |
| **Having + participio** | anterior | **Having finished**, she left. |
| **Participio pasado** | pasivo | **Written** in 1949, the novel… |
| **Not + -ing** | negativo | **Not knowing** what to do, … |
| Relativa reducida (activa) | who/which + verbo → -ing | the people **living** here |
| Relativa reducida (pasiva) | which was + participio → participio | the data **collected** in 2020 |
`,
  'subjunctive-formal': `
| Disparador | Estructura | Ejemplo |
|---|---|---|
| It is essential / vital / crucial / imperative that | + sujeto + **verbo base** | …that he **be** informed. |
| recommend / insist / demand / suggest that | + sujeto + **verbo base** | …that she **leave**. |
| negativa | + **not** + verbo base | …that he **not be** late. |
| BrE alternativo | + **should** + verbo | …that he **should leave**. |
| If + **were to** | hipótesis formal | If he **were to** resign… |
| **Should** + sujeto (= if) | condición formal | **Should** you need help… |
`,
  hedging: `
| Recurso | Ejemplos |
|---|---|
| Verbos | seem, appear, tend, suggest, indicate |
| Modales | may, might, could |
| Adverbios | arguably, possibly, presumably, largely, relatively, to some extent |
| Impersonales | It could be argued that… · It is widely accepted that… · There is evidence that… |
| Cuantificadores | a significant proportion of, the majority of, in most cases |

| Verbo | Nominalización |
|---|---|
| analyse | the **analysis** of |
| increase | an **increase in** |
| decide | a **decision** to |
| fail | a **failure** to |
| introduce | the **introduction** of |
`,
  'ellipsis-substitution': `
| Recurso | Ejemplo |
|---|---|
| so / not | I think **so**. · I hope **not**. · I'm afraid **not**. |
| So + aux + sujeto | I love it. — **So do I**. |
| Neither / Nor + aux + sujeto | I can't swim. — **Neither can I**. |
| do so | …if they wish to **do so**. |
| one / ones | the blue **one**, the old **ones** |
| to (sin verbo) | I'd love **to**. |
| auxiliar solo | She said she'd call, but she **didn't**. |
`,
  'emphasis-c1': `
| Recurso | Ejemplo |
|---|---|
| do/does/did enfático | I **do** understand. |
| far / much / considerably + comparativo | **far** better, **considerably** cheaper |
| by far + superlativo | **by far** the best |
| nowhere near / nothing like as … as | **nowhere near as** good **as** |
| the + comp., the + comp. | **The sooner**, **the better**. |
| comp. and comp. | **more and more** difficult |
| at all / whatsoever | no evidence **whatsoever** |
`,
  'advanced-linking': `
| Conector | Significado | Ejemplo |
|---|---|---|
| given that / in view of the fact that | dado que | Given that time is short, … |
| hence / thus | por tanto | …hence the delay. |
| thereby | de ese modo (+ -ing) | …thereby reducing costs. |
| whereby | mediante el cual | a system whereby users vote |
| insofar as / in that | en la medida en que / en el sentido de que | useful in that it explains… |
| notwithstanding | a pesar de | Notwithstanding the costs, … |
| albeit | aunque (+ adj/adv) | slow, albeit steady |
| as opposed to | en contraposición a | online as opposed to face-to-face |
`,
};
