/* Ejercicios añadidos a los temas de B2 y C1 (ver grammarMore.ts). */
export const GRAMMAR_MORE_2: Record<string, string> = {
  /* ---------------- B2.1 ---------------- */
  'conditionals-3-mixed': `
If I ___ the alarm, I wouldn't have been late. | had heard | would have heard / heard / have heard
If she had taken the job, she ___ in New York now. | would be living | would have lived / will be living / had lived
We ___ the match if we had played better. | would have won | would win / had won / will have won
If you ___ (tell) me, I would have helped you. | had told
If I hadn't missed the train, I ___ (be) there by now. | would be / 'd be
! If I would have known, I would have come. | If I had known, I would have come. / If I'd known, I would have come. / If I had known, I'd have come.
! If she had studied, she would pass the exam last week. | If she had studied, she would have passed the exam last week.
! If I knew it yesterday, I would have told you. | If I had known it yesterday, I would have told you. / If I'd known it yesterday, I would have told you.
= Si lo hubiera sabido, habría venido. | If I had known, I would have come. / If I'd known, I would have come. / If I had known, I'd have come. / If I'd known, I'd have come.
= Si hubieras estudiado, habrías aprobado. | If you had studied, you would have passed. / If you'd studied, you would have passed. / If you had studied, you'd have passed.
`,
  'passive-advanced': `
He is said ___ (be) very rich. | to be
She is believed ___ (leave) the country last week. | to have left
I had my wallet ___ (steal) on the train. | stolen
The suspect is thought ___ (hide) in the mountains at the moment. | to be hiding
I don't like ___ (tell) what to do. | being told
It ___ that the company will close. | is expected | expects / is expecting / was expect
! He is said that he is a genius. | He is said to be a genius. / It is said that he is a genius.
! I cut my hair at the salon every month. | I have my hair cut at the salon every month. / I get my hair cut at the salon every month.
! She was given to a prize. | She was given a prize.
= Se dice que es muy rico. | He is said to be very rich. / It is said that he is very rich.
= Me robaron el móvil. | I had my phone stolen. / My phone was stolen. / I had my mobile stolen.
= No me gusta que me mientan. | I don't like being lied to. / I do not like being lied to.
`,
  'relative-nondefining': `
My brother, ___ (who / that) lives in Rome, is a chef. | who
The hotel, ___ (which / that) was built in 1900, is closed. | which
She passed the exam, ___ (which / what) surprised everyone. | which
This is Ana, ___ (who / whose) mother works with me. | whose
Madrid, ___ I was born, is the capital of Spain. | where | which / that / in where
The people ___ I work with are very friendly. | who | which / whose / what
! My mother, that is a doctor, works a lot. | My mother, who is a doctor, works a lot. # Entre comas no se usa «that»
! He didn't come, what was strange. | He didn't come, which was strange.
= Mi hermana, que vive en París, viene mañana. | My sister, who lives in Paris, is coming tomorrow. / My sister, who lives in Paris, comes tomorrow.
= Llegó tarde, lo cual me molestó. | He arrived late, which annoyed me. / She arrived late, which annoyed me. / He was late, which annoyed me. / She was late, which annoyed me.
`,
  'reporting-verbs': `
She asked me where I ___ (live). | lived
He asked if I ___ (can) help him. | could
They accused him of ___ (steal) the money. | stealing
She apologised for ___ (be) late. | being
! He asked me where did I work. | He asked me where I worked.
! She suggested me to go by train. | She suggested going by train. / She suggested that I go by train. / She suggested that I should go by train. / She suggested I go by train.
! He denied to break the window. | He denied breaking the window. / He denied having broken the window.
! They asked me that I wait. | They asked me to wait.
= Me preguntó dónde vivía. | He asked me where I lived. / She asked me where I lived.
= Negó haberlo hecho. | He denied doing it. / She denied doing it. / He denied having done it. / She denied having done it.
= Sugirió que fuéramos en coche. | He suggested going by car. / She suggested going by car. / He suggested that we go by car. / She suggested that we go by car.
`,
  'modals-past': `
You ___ (should / tell) me earlier! | should have told
She ___ (must / forget) about the meeting; she never misses one. | must have forgotten
He ___ (can't / see) us; it was too dark. | can't have seen / couldn't have seen
I ___ (might / leave) my keys at the office. | might have left / may have left
You ___ have driven so fast. It was dangerous. | shouldn't | mustn't / can't / needn't to
! You should have went to the doctor. | You should have gone to the doctor.
! He must had forgotten. | He must have forgotten.
! She can't has finished already. | She can't have finished already.
! I should studied more. | I should have studied more.
= Deberías habérmelo dicho. | You should have told me. / You should've told me.
= Debe de haberse olvidado. | He must have forgotten. / She must have forgotten.
= No puede haberlo hecho él. | He can't have done it. / He couldn't have done it. / He cannot have done it.
`,
  'fn-regret-criticism': `
I wish I ___ (not say) that. | hadn't said / had not said
You ___ (should / not / do) that. | shouldn't have done / should not have done
I regret ___ (not study) more. | not studying / not having studied
If only I ___ listened to you. | had | would have / have / did
I'm afraid I'm not ___ with the service. | satisfied | satisfy / satisfying / agree
! I wish I didn't say that yesterday. | I wish I hadn't said that yesterday. / I wish I had not said that yesterday.
! You shouldn't to have done it. | You shouldn't have done it. / You should not have done it.
! I regret to not go. | I regret not going. / I regret not having gone.
= Ojalá no lo hubiera hecho. | I wish I hadn't done it. / I wish I had not done it. / If only I hadn't done it.
= No deberías haber dicho eso. | You shouldn't have said that. / You should not have said that.
= Me arrepiento de haberlo comprado. | I regret buying it. / I regret having bought it.
= Quiero presentar una queja. | I want to make a complaint. / I would like to make a complaint. / I'd like to make a complaint. / I'd like to complain.
`,
  /* ---------------- B2.2 ---------------- */
  wish: `
I wish I ___ more free time. (now) | had | have / would have / will have
I wish it ___ raining. It's so annoying! | would stop | stops / will stop / stopped to
If only we ___ earlier. We missed the start. | had left | left / would leave / have left
I'd rather you ___ here. | didn't smoke | don't smoke / not smoke / won't smoke
! I wish I would be taller. | I wish I were taller. / I wish I was taller.
! I wish I have a car. | I wish I had a car.
! I'd rather to stay at home. | I'd rather stay at home. / I would rather stay at home.
! If only I can speak French. | If only I could speak French.
= Ojalá tuviera más tiempo. | I wish I had more time. / If only I had more time.
= Ojalá dejara de llover. | I wish it would stop raining. / If only it would stop raining.
= Preferiría quedarme en casa. | I would rather stay at home. / I'd rather stay at home. / I would prefer to stay at home. / I'd prefer to stay at home.
`,
  'future-advanced': `
This time tomorrow I ___ (fly) to Rome. | will be flying / 'll be flying
By 2030 she ___ (finish) her degree. | will have finished / 'll have finished
Don't call at eight; we ___ (have) dinner. | will be having / 'll be having
By the end of the year, I ___ (work) here for ten years. | will have been working / 'll have been working / will have worked / 'll have worked
By next week we ___ the project. | will have completed | will be completing / complete / will complete by
In June they ___ married for 25 years. | will have been | will be being / are / will been
! By Friday I will finish the report already. | By Friday I will have finished the report. / By Friday I'll have finished the report. / By Friday I will have already finished the report.
! This time next week I will lying on the beach. | This time next week I will be lying on the beach. / This time next week I'll be lying on the beach.
! By the time you arrive, I will left. | By the time you arrive, I will have left. / By the time you arrive, I'll have left.
= Mañana a esta hora estaré trabajando. | This time tomorrow I will be working. / This time tomorrow I'll be working. / At this time tomorrow I'll be working. / At this time tomorrow I will be working.
= Para el lunes lo habré terminado. | I will have finished it by Monday. / I'll have finished it by Monday. / By Monday I will have finished it. / By Monday I'll have finished it.
= El año que viene llevaremos diez años casados. | Next year we will have been married for ten years. / Next year we'll have been married for ten years.
`,
  'gerund-infinitive-meaning': `
I stopped ___ (smoke) two years ago. | smoking
We stopped ___ (buy) some water on the way. | to buy
Remember ___ (lock) the door when you leave. | to lock
I'll never forget ___ (meet) her for the first time. | meeting
Try ___ (add) some salt; it might taste better. | adding
I regret ___ (inform) you that your application was rejected. | to inform
He went on ___ for two hours without a break. | talking | to talk / talk / talked
! I remember to meet him when I was a child. | I remember meeting him when I was a child.
! She stopped to work because she was ill. | She stopped working because she was ill.
! I tried open the window, but it was stuck. | I tried to open the window, but it was stuck.
= Dejé de fumar. | I stopped smoking. / I gave up smoking. / I quit smoking.
= Acuérdate de llamarme. | Remember to call me. / Remember to phone me. / Don't forget to call me.
= Recuerdo haber visto esa película. | I remember seeing that film. / I remember seeing that movie. / I remember watching that film. / I remember watching that movie.
`,
  'contrast-linkers': `
___ it was raining, we went out. | Although | Despite / However / In spite
___ the rain, we went out. | Despite | Although / However / Even
He's rich. ___, he isn't happy. | However | Although / Despite / But though
___ being ill, she went to work. | In spite of | Although / Even though / However
She likes tea, ___ I prefer coffee. | whereas | despite / however, / in spite
Even ___ I was tired, I finished the work. | though | although / if though / despite
! Despite it was late, we continued. | Although it was late, we continued. / Despite the late hour, we continued. / Despite it being late, we continued. / Even though it was late, we continued.
! Although the rain, we played. | Despite the rain, we played. / In spite of the rain, we played. / Although it was raining, we played. / Although it rained, we played.
> Although he was tired, he kept working. | SPITE | In ___ tired, he kept working. | spite of being
> It was cold, but we went swimming. | DESPITE | We went swimming ___ cold. | despite the / despite it being
= Aunque estaba cansado, salí. | Although I was tired, I went out. / Even though I was tired, I went out. / Though I was tired, I went out.
= A pesar del frío, fuimos a la playa. | Despite the cold, we went to the beach. / In spite of the cold, we went to the beach.
`,
  'articles-advanced': `
___ happiness is more important than money. | — | The / A / An
She plays ___ (a / the) piano very well. | the
The injured man was taken to ___ hospital. | — | an / one / some
___ (a / the) rich should pay more taxes. | The
I love ___ music, but I don't like the music they play here. | — | the / a / some of
___ Netherlands is a small country. | The | — / A / This
We had ___ lunch at two. | — | the / a / one
He went to ___ university to study law. | — | the / an / one
! The life is beautiful. | Life is beautiful. # Ideas generales: sin artículo
! In general, I like the dogs. | In general, I like dogs.
! She works as teacher. | She works as a teacher.
= La vida es dura. | Life is hard. / Life is tough.
= Me encanta la música. | I love music.
= Los ricos son cada vez más ricos. | The rich are getting richer. / The rich are getting richer and richer. / The rich get richer.
`,
  'fn-persuasion': `
Why don't we ___ (go) by train? | go
How about ___ (order) a pizza? | ordering
If I were you, I ___ accept the offer. | would | will / should to / did
You ___ really try it; it's amazing. | should | must to / would / ought
Have you thought about ___ a break? | taking | to take / take / taken
! What about to go to the cinema? | What about going to the cinema? / How about going to the cinema?
! I suggest you to try this one. | I suggest you try this one. / I suggest that you try this one. / I suggest trying this one.
! Why don't we to stay here? | Why don't we stay here?
= ¿Por qué no lo intentas? | Why don't you try it? / Why don't you try? / Why not try it?
= ¿Y si vamos al cine? | How about going to the cinema? / What about going to the cinema? / Shall we go to the cinema? / Why don't we go to the cinema?
= Yo que tú, lo compraría. | If I were you, I would buy it. / If I were you, I'd buy it.
= Te recomiendo que lo leas. | I recommend that you read it. / I recommend you read it. / I recommend reading it.
`,
  /* ---------------- C1.1 ---------------- */
  inversion: `
Never ___ (I / see) such a mess. | have I seen
Not only ___ (he / lose) his job, but he also lost his house. | did he lose
Hardly ___ (we / sit) down when the phone rang. | had we sat
Under no circumstances ___ (you / should) open that door. | should you
Only later ___ (I / realise) my mistake. | did I realise / did I realize
! Never I have been so embarrassed. | Never have I been so embarrassed.
! Not only he was late, but he was also rude. | Not only was he late, but he was also rude.
! Rarely we see such talent. | Rarely do we see such talent.
! No sooner I had arrived than it started to rain. | No sooner had I arrived than it started to rain.
> I have never heard such nonsense. | NEVER | ___ such nonsense. | Never have I heard
> If I had known, I would have told you. | HAD | ___, I would have told you. | Had I known
`,
  cleft: `
___ I need is a holiday. | What | That / Which / It
It was Maria ___ called you. | who | which / what / whom she
It was in 2010 ___ we first met. | that | when that / which / what
What I like about him ___ his honesty. | is | are / it is / that is
All I want ___ (be) some peace and quiet. | is
What she did ___ (be) call the police. | was
The reason ___ I left was the salary. | why | because / for which reason that / what
! What I need it is more time. | What I need is more time.
! It was yesterday what I saw him. | It was yesterday that I saw him.
! It is the money what matters. | It is the money that matters. / It's the money that matters.
> I need a coffee. | WHAT | ___ a coffee. | What I need is
> John broke the window. | WAS | It ___ the window. | was John who broke / was John that broke
`,
  'participle-clauses': `
___ (finish) his work, he went home. | Having finished
___ (see) from above, the city looks tiny. | Seen
___ (not know) what to do, I called my mother. | Not knowing
___ (walk) along the beach, we found a bottle. | Walking
The man ___ next to me was snoring. | sitting | sat / who sitting / sits
___ in 1850, the church is the oldest in town. | Built | Building / Having built / It built
! Having finish the report, she sent it. | Having finished the report, she sent it.
! Walking down the street, a car hit me. | Walking down the street, I was hit by a car. / While I was walking down the street, a car hit me. # El sujeto de las dos partes debe ser el mismo
! Knowing not the answer, he stayed silent. | Not knowing the answer, he stayed silent.
> Because she was tired, she went to bed early. | BEING | ___, she went to bed early. | Being tired
> After he had read the letter, he burned it. | HAVING | ___ the letter, he burned it. | Having read
`,
  'subjunctive-formal': `
It is essential that she ___ (be) informed immediately. | be
I suggest that he ___ (see) a specialist. | see / should see
The doctor recommended that he ___ (stop) smoking. | stop / should stop
If I ___ (be) to resign, who would replace me? | were
___ you need any help, please call. | Should | Would / Shall / If should
It's high time we ___ a decision. | made | make / will make / have made
They demanded that the manager ___. | resign | resigns / resigned to / will resign
! It is vital that he is here on time. | It is vital that he be here on time. / It is vital that he should be here on time.
! I insist that she comes with us. | I insist that she come with us. / I insist that she should come with us.
! It's time we go home. | It's time we went home. / It's time to go home.
> If you should see him, tell him to call. | SHOULD | ___ him, tell him to call. | Should you see
`,
  'conditionals-alternatives': `
I'll go ___ it rains. (= if it doesn't rain) | unless
You can borrow it ___ (provide) that you return it tomorrow. | provided / providing
___ (suppose) you won the lottery, what would you do? | Supposing / Suppose
Take an umbrella in ___ it rains. | case | condition / time / provided
Hurry up, ___ we'll miss the train. | otherwise | unless / provided / in case
___ for your help, I would have failed. | But | Except / Without of / Unless
As ___ as you're back by ten, you can go. | long | far / soon / much
! I won't go unless he doesn't invite me. | I won't go unless he invites me. # unless ya es negativo
! Provided you will pay, you can stay. | Provided you pay, you can stay. / Provided that you pay, you can stay.
! I'll take a coat in case it will be cold. | I'll take a coat in case it is cold. / I'll take a coat in case it's cold.
> If you hadn't helped me, I would have failed. | BUT | ___ help, I would have failed. | But for your
`,
  /* ---------------- C1.2 ---------------- */
  hedging: `
It ___ (appear) that the results are inconclusive. | appears
The findings ___ (suggest) a link between diet and mood. | suggest
This may ___ (be) due to several factors. | be
There ___ to be some confusion. | seems | seem that / is seeming / looks
It is widely ___ that the climate is changing. | accepted | accept / accepting / said us
To some ___, the criticism is justified. | extent | point of / way / grade
! It seems that to be a mistake. | It seems to be a mistake. / It seems that it is a mistake.
! This tends being the case. | This tends to be the case.
! It could argued that the plan failed. | It could be argued that the plan failed.
> People think the minister is corrupt. | THOUGHT | The minister ___ corrupt. | is thought to be
`,
  'ellipsis-substitution': `
"Will it rain?" "I hope ___." (= that it won't) | not
"Is she coming?" "I think ___." | so
He promised to call, but he ___ (not). | didn't / did not
I like the blue shirt more than the red ___. | one
She said she would help, and she ___. | did | did so it / helped it / was
"I've never been to Japan." "___ have I." | Neither | So / Either / Nor I
They asked me to leave, and I did ___. | so | it so / that so / such
! "Is he coming?" "I think it." | "Is he coming?" "I think so."
! I hope no. | I hope not.
! She can sing better than I can do it. | She can sing better than I can. / She can sing better than me.
> I don't like it and she doesn't like it either. | NEITHER | I don't like it and ___ she. | neither does
`,
  'emphasis-c1': `
I ___ (do) like your new haircut! | do
She ___ (do) call you yesterday; I saw her. | did
This is ___ far the best film of the year. | by | so / very / much
It was nowhere ___ as difficult as I expected. | near | close / next / far
He's not ___ as clever as he thinks. | nearly | near / almost so / such
What on ___ are you doing? | earth | world / hell's / planet
! I do liked the film. | I did like the film.
! She does knows the answer. | She does know the answer.
! It was nowhere near so good than the first one. | It was nowhere near as good as the first one.
! This is the by far best option. | This is by far the best option.
> I really enjoyed the concert. | DID | I ___ the concert. | did enjoy
`,
  'advanced-linking': `
He was tired; ___ (sin embargo, formal: n…), he carried on. | nevertheless / nonetheless
The plan was risky, ___ (aunque, a…) profitable. | albeit
Prices rose, ___ (por lo tanto, h…) the drop in sales. | hence
___ (dado que) the circumstances, we had no choice. | Given
The law was changed, ___ reducing costs for small firms. | thereby | therefore / whereby / hence that
___ the bad weather, the event went ahead. | Notwithstanding | Nevertheless / Although / Albeit
In ___ to the previous study, this one used a larger sample. | contrast | contrary / opposite / difference
! Despite of the problems, we finished. | Despite the problems, we finished. / In spite of the problems, we finished.
! However he was ill, he came. | Although he was ill, he came. / He was ill; however, he came. / Even though he was ill, he came.
! Moreover of that, it is expensive. | Moreover, it is expensive. / In addition to that, it is expensive.
> The road was closed, so we took another route. | CONSEQUENTLY | The road was closed; ___ another route. | consequently, we took / consequently we took
> Although it is small, the flat is comfortable. | ALBEIT | The flat is comfortable, ___. | albeit small
`,
};
