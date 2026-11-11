import type { GrammarTopic } from '../core/types.ts';

/* Temas añadidos: huecos del temario + "Language use" (funciones comunicativas) inspirado en el curso Advanced English (TU Chemnitz / Al-Istiqlal). */
export const GRAMMAR_EXTRA: GrammarTopic[] = [
  {
    id: 'imperatives', level: 'A1', title: 'Imperatives & let\'s',
    rule: 'Orden o instrucción = verbo base (Open the door). Negativa: Don\'t + verbo. Propuesta: Let\'s + verbo.',
    es: `
- Afirmativo: **verbo base** → **Sit** down. **Turn** left.
- Negativo: **Don't** + verbo → **Don't** worry.
- Para incluirte: **Let's** + verbo → **Let's** go! · Negativo: **Let's not** argue.
- Más amable: **please**, o mejor una pregunta → **Could you** close the door?
> Don't forget your keys.
> Let's start with the easy questions.
`,
    items: `
___ the window, please. It's cold. | Close | Closes / To close / Closing
___ touch that! It's hot. | Don't | Not / No / Doesn't
___ go to the cinema tonight. | Let's | Let / Lets / Let us to
! Not open the door. | Don't open the door. / Do not open the door.
! Let's to go home. | Let's go home.
= No te preocupes. | Don't worry.
= Vamos a empezar. | Let's start. / Let's begin.
`,
  },
  {
    id: 'questions-basic', level: 'A1', title: 'Questions: word order & wh-words',
    rule: 'QASI: Question word + Auxiliary + Subject + Infinitive → Where do you live? Con be: Where is she?',
    es: `
Orden de una pregunta (**QASI**): **Q**uestion word + **A**uxiliar + **S**ujeto + **I**nfinitivo
> Where do you work?
> What did she say?
> How long have you been here?
- Con **be** no hay do: Where **is** he? Are you OK?
- Wh-words: **what** (qué), **which** (cuál, entre opciones), **who** (quién), **whose** (de quién), **where**, **when**, **why**, **how**, **how much/many/long/often/old/far**
- Preposición al final (muy natural): **Who** are you talking **to**? **What** is it **about**?
`,
    items: `
Where ___ you live? | do | are / does / is
What ___ she do yesterday? | did | does / was / do
___ is your birthday? In May. | When | What / Where / Which
___ much does it cost? | How | What / Which / Who
___ bag is this? It's Tom's. | Whose | Who / Who's / Which
___ coffee or tea? | Which do you prefer | What do you prefer / Which you prefer / What you prefer
! Where you live? | Where do you live?
! What means this word? | What does this word mean?
! How old have you? | How old are you?
= ¿De qué trata el libro? | What is the book about? / What's the book about?
`,
  },
  {
    id: 'adjectives-adverbs', level: 'A2', title: 'Adjectives vs adverbs (-ed/-ing)',
    rule: 'Adjetivo describe un sustantivo (a careful driver); adverbio describe un verbo (drive carefully). -ed = cómo te sientes, -ing = lo que lo causa.',
    es: `
- **Adjetivo** + sustantivo / tras be: She's a **quick** learner. The test was **easy**.
- **Adverbio** (+ -ly) describe el verbo: She learns **quickly**. (❌ She learns quick)
- Irregulares: good → **well**, fast → **fast**, hard → **hard** (hardly = apenas!), late → **late** (lately = últimamente)
- **-ed** = sentimiento de la persona: I'm **bored / interested / tired / confused**
- **-ing** = lo que lo provoca: The film is **boring / interesting / tiring / confusing**
- Verbos de percepción + adjetivo: It **looks good**, it **smells nice**, I **feel bad**.
> I was surprised: the results were surprising.
`,
    items: `
She speaks English very ___. | well | good / goodly / best
He drives ___. | carefully | careful / care / carefuly
I'm ___ in history. | interested | interesting / interest / interestingly
The lecture was so ___ that I fell asleep. | boring | bored / bore / boredly
This soup smells ___. | delicious | deliciously / delicious smell / deliciousness
I've been very busy ___. | lately | late / latest / later
! He works very hardly. | He works very hard.
! I'm boring. Let's do something. | I'm bored. Let's do something.
= Lo hiciste muy bien. | You did it very well. / You did very well.
`,
  },
  {
    id: 'indefinite-pronouns', level: 'A2', title: 'Someone, anyone, no one, nothing…',
    rule: 'some- (afirmativas), any- (preguntas y negativas), no- (negativo con verbo afirmativo), every- (todos). Nunca doble negación.',
    es: `
| | personas | cosas | lugares |
|---|---|---|---|
| some- | someone / somebody | something | somewhere |
| any- | anyone / anybody | anything | anywhere |
| no- | no one / nobody | nothing | nowhere |
| every- | everyone / everybody | everything | everywhere |
- **some-** en afirmativas: There's **someone** at the door.
- **any-** en preguntas y negativas: Is there **anything** to eat? I didn't see **anybody**.
- **no-** con verbo **afirmativo**: I saw **nobody**. (❌ I didn't see nobody — doble negación)
- Van con verbo en **singular**: **Everyone is** here. **Nobody knows**.
- **any-** en afirmativa = cualquiera: You can sit **anywhere**.
> Nothing happened.
`,
    items: `
Is there ___ in the fridge? I'm hungry. | anything | something / nothing / everything
I didn't see ___ at the party. | anyone | no one / someone / everyone
___ knows the answer. It's a mystery. | Nobody | Anybody / Somebody / Not anybody
Everyone ___ tired after the exam. | was | were / are / have
I've looked ___ for my glasses. | everywhere | anywhere / nowhere / somewhere else
You can choose ___ you like. | anything | nothing / something / everything that
! I didn't say nothing. | I didn't say anything. / I said nothing.
! Everybody are happy. | Everybody is happy.
= No hay nadie en casa. | There's nobody at home. / There is nobody at home. / There isn't anybody at home. / There's no one at home. / There isn't anyone at home.
`,
  },
  {
    id: 'fn-requests-offers', level: 'A2', title: 'Language use: requests & offers',
    rule: 'Pedir: Could you…? / Would you mind + -ing? · Ofrecer: Shall I…? / Would you like me to…? · Aceptar/rechazar con educación.',
    es: `
**Pedir algo** (de menos a más formal):
- Can you…? → **Could you** pass me the salt? → **Would you mind** open**ing** the window? → **I was wondering if you could** help me.
- Responder: Sure. / Of course. / No problem. · **Not at all** (a *Would you mind…?*: = no me importa, lo hago)
**Ofrecer**:
- **Shall I** carry that for you? · **Would you like me to** call a taxi? · **Let me** help you. · **Can I get you** anything?
- Aceptar: That would be great, thanks. / Yes, please. · Rechazar: That's very kind of you, but I'm fine. / No, thanks, I can manage.
> Would you mind waiting a moment?
`,
    items: `
___ you pass me the salt, please? | Could | Shall / Would like / Must
Would you mind ___ the door? | closing | close / to close / closed
"Shall I help you with your bags?" "___" | That would be great, thanks. | Yes, you shall. / No, I shan't. / Yes, help.
"Would you mind if I opened the window?" "___ — go ahead." | Not at all | Yes, I mind / Yes, please / No, thanks
___ I carry that for you? | Shall | Will / Would / Do
Would you like ___ a taxi? | me to call | that I call / me call / I call
I was wondering if you ___ help me with my essay. | could | can / will / would mind
`,
  },
  {
    id: 'few-little', level: 'B1', title: 'Few / a few, little / a little',
    rule: 'a few (contables) / a little (incontables) = algo, suficiente (positivo). few / little = poco, casi nada (negativo).',
    es: `
| | contables | incontables |
|---|---|---|
| algo (positivo) | **a few** friends | **a little** time |
| poco (negativo) | **few** friends | **little** time |
| mucho | many friends | much time |
- **a few / a little**: tienes algo, y está bien → I have **a few** friends here, so I'm not lonely.
- **few / little**: casi nada, problema → **Few** people came; the event was a failure.
- **quite a few** = bastantes · **very few / very little** = muy pocos
> There's little evidence for this claim. (casi ninguna)
`,
    items: `
I have ___ money left. Let's get a coffee. | a little | a few / few / little
Very ___ students passed the exam; it was really difficult. | few | a few / little / a little
There is ___ hope of finding survivors now. | little | a little / few / a few
I've got ___ questions for you, if you have time. | a few | a little / little / much
We need ___ more information before deciding. | a little | a few / few / many
___ people know that he was once a teacher. | Few | Little / A little / Much
! I have a few time this evening. | I have a little time this evening.
`,
  },
  {
    id: 'fn-agree', level: 'B1', title: 'Language use: agreeing & disagreeing',
    rule: 'De acuerdo: I couldn\'t agree more / Exactly. Desacuerdo suave: I see your point, but… / I\'m not so sure about that.',
    es: `
| Fuerte acuerdo | Acuerdo parcial | Desacuerdo educado |
|---|---|---|
| I couldn't agree more. | I agree up to a point. | I'm not so sure about that. |
| Absolutely. / Exactly. | That's true, but… | I see your point, but… |
| That's just what I was thinking. | I suppose so. | I'm afraid I disagree. |
- **I agree with you** / **I agree that…** (❌ I am agree)
- Responder a negativas: "I don't like it." → "**Neither do I.**" / "**Me neither.**"
- En inglés el desacuerdo directo (*You're wrong*) suena brusco: suaviza con *I'm afraid*, *I'm not sure*, *I see what you mean, but…*
`,
    items: `
"This is the best solution." "___ It's perfect." | I couldn't agree more. | I couldn't agree less. / I'm agree. / I don't agree more.
"Social media is harmful." "I agree ___ a point, but it has benefits too." | up to | until / in / at
"I don't like this music." "___" | Neither do I. | So do I. / I don't too. / Me too.
The most polite way to disagree: | I see your point, but I'm not sure that's right. | You're wrong. / That's stupid. / No.
"We should cancel the trip." "___ — the weather looks terrible." | Absolutely | Absolute / Neither / Not really
! I am agree with your opinion. | I agree with your opinion.
`,
  },
  {
    id: 'fn-opinions', level: 'B1', title: 'Language use: giving & asking for opinions',
    rule: 'Dar: In my view, / As far as I\'m concerned, / I\'d say… · Pedir: What do you think about…? / How do you feel about…?',
    es: `
| Dar opinión (neutro) | Formal / escrito | Pedir opinión |
|---|---|---|
| I think / I reckon… | In my view, … | What do you think **of/about**…? |
| If you ask me, … | It seems to me that… | How do you feel about…? |
| I'd say (that)… | From my perspective, … | What's your view on…? |
| As far as I'm concerned, … | I would argue that… | Do you agree that…? |
- ❌ *In my opinion, I think…* (redundante) · ❌ *According to me* (no se usa: **in my opinion**)
- **according to** + otra persona/fuente: according to the report…
`,
    items: `
___, the government should invest more in education. | In my view | According to me / In my opinion I think / For me opinion
What do you think ___ the new law? | about | on to / for / in
As far as I'm ___, it's a waste of money. | concerned | concerning / concern / considered
How do you ___ about working from home? | feel | think of / opinion / believe
___ the report, unemployment is falling. | According to | In my view / As far as / For
! According to me, the film was boring. | In my opinion, the film was boring. / In my view, the film was boring. / I think the film was boring.
`,
  },
  {
    id: 'fn-clarification', level: 'B1', title: 'Language use: asking for clarification',
    rule: 'Sorry, I didn\'t catch that. · What do you mean by…? · Could you say that again? · So you mean that…?',
    es: `
Para **no perderte** en clase, en una reunión o en una conversación:
- No has oído: **Sorry, I didn't catch that.** / **Could you say that again, please?** / **Pardon?**
- No has entendido una palabra: **What do you mean by** "stakeholder"? / **What does** X **mean**?
- Comprobar: **So, what you're saying is…?** / **Do you mean that…?** / **If I understand correctly, …**
- Pedir más detalle: **Could you give me an example?** / **Could you be more specific?**
- Ganar tiempo: **Let me think…** / **That's a good question.**
> Sorry, could you speak a bit more slowly?
`,
    items: `
You didn't hear what someone said: | Sorry, I didn't catch that. | Sorry, I didn't take that. / Repeat. / What you say?
What do you mean ___ "sustainable"? | by | with / of / for
So, ___ you're saying is that we need more time? | what | that / which / it
Could you be more ___? I don't understand which part. | specific | specify / specially / special
"If I understand ___, the deadline is Friday." | correctly | correct / right understanding / good
! What means "deadline"? | What does "deadline" mean?
`,
  },
  {
    id: 'passive-tenses', level: 'B1', title: 'The passive in every tense',
    rule: 'Pasiva = be (en el tiempo del verbo activo) + participio. Solo cambia "be": is done, was done, has been done, will be done…',
    es: `
La regla es una sola: **pon «be» en el tiempo del verbo activo + participio**.
| Tiempo | Activa | Pasiva |
|---|---|---|
| Present simple | They **make** cars here. | Cars **are made** here. |
| Present continuous | They **are building** a bridge. | A bridge **is being built**. |
| Past simple | They **built** it in 1900. | It **was built** in 1900. |
| Past continuous | They **were repairing** the road. | The road **was being repaired**. |
| Present perfect | They **have sold** the house. | The house **has been sold**. |
| Past perfect | They **had cancelled** the flight. | The flight **had been cancelled**. |
| Future (will) | They **will announce** it. | It **will be announced**. |
| Future perfect | They **will have finished** it. | It **will have been finished**. |
| Modal | You **must sign** it. | It **must be signed**. |
> The results are being analysed at the moment.
`,
    items: `
The bridge ___ at the moment. | is being repaired | is repairing / is repaired / being repaired
The thief ___ yet. | hasn't been caught | hasn't caught / wasn't caught yet / isn't caught
When I arrived, the flight ___. | had been cancelled | had cancelled / has been cancelled / was cancelling
The winners ___ next week. | will be announced | will announce / are announce / will been announced
This form must ___ by both parents. | be signed | signed / sign / been signed
The road ___ when we drove past. | was being repaired | was repairing / is being repaired / has repaired
By 2030, the project ___ completed. | will have been | will be have / will have / has been
> They are building a new hospital. | BUILT | A new hospital ___. | is being built
> Someone has stolen my bike. | BEEN | My bike ___. | has been stolen
`,
  },
  {
    id: 'fn-refusal', level: 'B1', title: 'Language use: declining & refusing politely',
    rule: 'Agradece + excusa breve + alternativa: That\'s very kind of you, but I\'m afraid I can\'t. Maybe another time?',
    es: `
Fórmula educada para decir **no**:
1. Agradece o valora: **Thanks for asking / That's very kind of you / I'd love to, but…**
2. Suaviza: **I'm afraid… / Unfortunately…**
3. Razón breve: **I've already got plans / I'm a bit busy this week**
4. Alternativa (opcional): **Maybe another time? / How about next week?**
> I'd love to, but I'm afraid I can't make it on Friday.
- Negar algo con tacto: **I'm not sure that's entirely accurate.** / **That's not quite what happened.**
- ❌ *No, I don't want.* suena muy brusco.
`,
    items: `
The most polite way to refuse an invitation: | I'd love to, but I'm afraid I can't make it. | No, I don't want. / No, thanks, I'm busy, bye. / I can't come because no.
I'm ___ I won't be able to attend the meeting. | afraid | sorry that / fear / scared
That's very kind ___ you, but I can manage. | of | for / to / with
"Would you like to come to dinner on Saturday?" "___" | Thanks for asking, but I've already got plans. | No, I won't. / I don't like dinner. / No, never.
I can't come this week. ___ another time? | Maybe | Perhaps that / What about to / Might
! Sorry, I can't to come. | Sorry, I can't come.
`,
  },
  {
    id: 'fn-probability', level: 'B1', title: 'Language use: predictions & probability',
    rule: 'Seguro: bound to / certain to · Probable: likely to / there\'s a good chance · Poco probable: unlikely to / doubt.',
    es: `
| Probabilidad | Expresión | Ejemplo |
|---|---|---|
| 100 % | **will definitely / be bound to / be certain to** | Prices **are bound to** rise. |
| 75 % | **will probably / be likely to / There's a good chance (that)** | She'**s likely to** win. |
| 50 % | **may / might / could / It's possible that** | It **might** rain later. |
| 25 % | **probably won't / be unlikely to / I doubt (that)** | They'**re unlikely to** agree. |
| 0 % | **definitely won't / There's no chance (that)** | He **definitely won't** come. |
- Orden: will **probably** (afirmativa) · **probably** won't (negativa)
- **likely** es adjetivo: *It is likely that…* / *He is likely to…* (❌ He will likely to)
> In all likelihood, the project will be delayed.
`,
    items: `
Prices are ___ to rise next year; it's almost certain. | bound | bond / binding / sure that
She's ___ to pass. She studied very hard. | likely | probably / probable that / possible
I ___ we'll finish on time. There's too much to do. | doubt | don't doubt / am doubt / doubt that not
He will ___ be late, as usual. | probably | likely / probable / maybe
There's a good ___ that it will snow tomorrow. | chance | possibility to / likely / probability of
They ___ won't agree to our proposal. | probably | likely / unlikely / maybe not
! It's likely to that he wins. | It's likely that he will win. / He is likely to win. / It is likely that he will win. / He's likely to win.
`,
  },
  {
    id: 'fn-regret-criticism', level: 'B2', title: 'Language use: regret, criticism & complaint',
    rule: 'Arrepentimiento: I should have… / I wish I had… / If only… · Crítica: You shouldn\'t have… / You could have… / I\'m not happy with…',
    es: `
**Arrepentimiento** (tú):
- I **should have** studied more. · I **wish I had** listened. · **If only** I **hadn't** said that. · I **regret** not **going**.
- Third conditional: If I **had left** earlier, I **wouldn't have missed** the train.
**Crítica** (a otros), de suave a fuerte:
- It **might have been better to** ask first. → You **could have** told me! → You **shouldn't have** done that. → I'm really **disappointed** that…
- Crítica constructiva: **One thing that could be improved is…** / **It would be even better if…**
**Quejarse** con educación: **I'm afraid I have to complain about…** / **I'm not entirely happy with…**
`,
    items: `
I failed the exam. I ___ harder. | should have studied | should study / must have studied / had to study
If only I ___ that email! | hadn't sent | didn't send / haven't sent / wouldn't send
You ___ told me you were coming! I'd have made dinner. | could have | must have / can have / would
The most diplomatic criticism: | It might have been better to check the figures first. | Your figures are wrong, obviously. / You never check anything. / This is terrible.
I regret ___ the job offer. | not accepting | not to accept / don't accept / not accept
One thing that ___ be improved is the introduction. | could | should have / would have / must
! I wish I would have studied medicine. | I wish I had studied medicine. / I wish I'd studied medicine.
`,
  },
  {
    id: 'fn-persuasion', level: 'B2', title: 'Language use: persuading & suggesting',
    rule: 'Sugerir: Why don\'t we…? / How about + -ing? / I\'d suggest + -ing. Persuadir: Surely…, Wouldn\'t it be better to…?, Think of the benefits…',
    es: `
**Sugerir**:
- **Why don't we** take a break? · **How about / What about** go**ing** by train? · **I'd suggest** start**ing** earlier. · **We could** try… · **Shall we**…?
- **suggest**: suggest + **-ing** / suggest **that** someone (should) do (❌ suggest someone to)
**Persuadir** (argumentar a favor):
- **Surely** you agree that… · **Wouldn't it be better to**…? · **Don't you think** it would be wise to…?
- **The main advantage is that…** · **Think of** the time we'd save. · **It's worth** consider**ing**… · **Not only** would it…, **but** it would also…
**Escrito formal**: *It is strongly recommended that…*, *There is a compelling case for…*
`,
    items: `
How about ___ a different approach? | trying | try / to try / we try to
Why ___ we ask the teacher? | don't | not / do not to / aren't
I'd suggest ___ the meeting until Monday. | postponing | to postpone / postpone / you to postpone
It's ___ considering the costs before deciding. | worth | worthy / value / worthwhile to
___ it be better to wait for the results? | Wouldn't | Won't / Doesn't / Isn't
There is a ___ case for reducing working hours. | compelling | compelled / compel / compulsory
! I suggest you to read the instructions. | I suggest you read the instructions. / I suggest that you read the instructions. / I suggest reading the instructions. / I suggest that you should read the instructions.
`,
  },
  {
    id: 'conditionals-alternatives', level: 'C1', title: 'Beyond "if": unless, provided, otherwise, but for',
    rule: 'unless = if not · provided/providing/as long as = solo si · in case = por si · otherwise = si no · but for = si no fuera por · supposing = ¿y si…?',
    es: `
| Conector | Significado | Ejemplo |
|---|---|---|
| **unless** | si no / a menos que | We'll go **unless** it rains. |
| **provided / providing (that), as long as, on condition that** | siempre que | You can borrow it **as long as** you return it. |
| **in case** | por si | Take an umbrella **in case** it rains. |
| **otherwise / or else** | si no, de lo contrario | Hurry, **otherwise** we'll miss it. |
| **but for / were it not for** | si no fuera/hubiera sido por | **But for** your help, I'd have failed. |
| **supposing / suppose / what if** | supongamos que | **Supposing** you lost your job, what would you do? |
| **even if** | aunque (hipotético) | I wouldn't go **even if** they paid me. |
- ⚠️ **in case** ≠ if: *in case* = precaución (antes), *if* = condición.
- Tras unless/provided/as long as → presente con sentido futuro (❌ unless it will rain).
`,
    items: `
You won't pass ___ you study harder. | unless | if / provided / in case
I'll lend you the car ___ you drive carefully. | provided | unless / in case / otherwise
Take some cash ___ the card machine doesn't work. | in case | if / unless / provided
Leave now; ___, you'll miss the train. | otherwise | unless / in case / provided
___ your support, the project would have failed. | But for | Unless / Provided / In case of
I wouldn't eat that ___ I were starving. | even if | in case / provided / unless that
___ you won the lottery, what would you do first? | Supposing | Provided / Unless / In case
> We will only sign the contract if they lower the price. | PROVIDED | We will sign the contract ___ the price. | provided they lower / provided that they lower
> If it hadn't been for the rain, we would have won. | BUT | ___ the rain, we would have won. | But for
`,
  },
];
