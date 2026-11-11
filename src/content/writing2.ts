import type { Level, WritingPrompt } from '../core/types.ts';

/* Segunda tanda de escritura: errores típicos de hispanohablantes, traducción, transformaciones con palabra clave
   y conectores. Mismo mini-DSL que writing.ts. Frases originales. */
export const WRITING_BLOCKS_2: { id: string; level: Level; list: string }[] = [
  {
    id: 'err2-a', level: 'A2', list: `
! I have hungry. | I am hungry. / I'm hungry. # tener hambre = be hungry
! They have thirty years old. | They are thirty years old. / They are thirty.
! I am boring in this class. | I am bored in this class. # bored = aburrido; boring = que aburre
! The people is waiting outside. | The people are waiting outside.
! I like very much the chocolate. | I like chocolate very much. / I really like chocolate.
! He is doctor. | He is a doctor. # las profesiones llevan a / an
! We was at home yesterday. | We were at home yesterday.
! I didn't went to the party. | I didn't go to the party.
! She can to swim very well. | She can swim very well.
! I am going to home. | I am going home. # go home, sin «to»
! My sister is more old than me. | My sister is older than me.
! There is three chairs in the room. | There are three chairs in the room.
! I am here since Monday. | I have been here since Monday. / I've been here since Monday.
! Do you can help me? | Can you help me?
! I have a lot of homeworks. | I have a lot of homework. # homework es incontable
! He go to work by bus. | He goes to work by bus.
! I am very good in maths. | I am very good at maths.
! What means this word? | What does this word mean?
! I am thinking to buy a car. | I am thinking of buying a car. / I am thinking about buying a car.
! She said me the truth. | She told me the truth.
! I am married with a teacher. | I am married to a teacher.
! It's a film very interesting. | It's a very interesting film.
! How many money do you have? | How much money do you have?
! I lost the bus this morning. | I missed the bus this morning. # perder el autobús = miss the bus
! I born in 1995. | I was born in 1995.
! We arrived to the airport late. | We arrived at the airport late.
! The childrens are playing. | The children are playing.
! I enjoy to read. | I enjoy reading.
! Is very cold today. | It is very cold today. / It's very cold today. # el sujeto «it» es obligatorio
! I have to make my homework. | I have to do my homework.
`,
  },
  {
    id: 'err2-b', level: 'B1', list: `
! I am used to get up early. | I am used to getting up early.
! If I will see him, I will tell him. | If I see him, I will tell him. / If I see him, I'll tell him.
! She suggested me to go by train. | She suggested that I go by train. / She suggested going by train. / She suggested I go by train.
! I'm looking forward to see you. | I'm looking forward to seeing you.
! He told that he was tired. | He said that he was tired. / He told me that he was tired. / He said he was tired.
! Despite of the rain, we went out. | Despite the rain, we went out. / In spite of the rain, we went out.
! I have been in Paris last year. | I was in Paris last year. / I went to Paris last year.
! The film was so bored that I left. | The film was so boring that I left.
! I'd like that you come with me. | I'd like you to come with me.
! She has a great knowledge in computers. | She has a great knowledge of computers.
! Each of the students have a laptop. | Each of the students has a laptop.
! I stopped to smoke two years ago. | I stopped smoking two years ago. # stop + -ing = dejar de
! The police is looking for him. | The police are looking for him. # police es plural
! He explained me the problem. | He explained the problem to me.
! We discussed about the new plan. | We discussed the new plan. # discuss, sin preposición
! I want to make a question. | I want to ask a question.
! She is working here since five years. | She has been working here for five years. / She has worked here for five years.
! It was such hot that we stayed in. | It was so hot that we stayed in.
! I didn't use to liking coffee. | I didn't use to like coffee.
! Although it was late, but we kept working. | Although it was late, we kept working. # although y but no van juntos
! I'm agree with most of your points. | I agree with most of your points.
! Can you say me where the station is? | Can you tell me where the station is?
! He doesn't mind to wait. | He doesn't mind waiting.
! I wish I can come tomorrow. | I wish I could come tomorrow.
! Nobody didn't call me. | Nobody called me. # una sola negación
! The news are very bad today. | The news is very bad today. # news es singular
! I prefer tea than coffee. | I prefer tea to coffee.
! They let me to leave early. | They let me leave early.
! She made me to wait an hour. | She made me wait an hour.
! I have done a mistake. | I have made a mistake. / I've made a mistake.
`,
  },
  {
    id: 'err2-c', level: 'B2', list: `
! If I would have known, I would have come. | If I had known, I would have come.
! I'm not used to drive on the left. | I'm not used to driving on the left.
! He denied to have taken the money. | He denied having taken the money. / He denied taking the money.
! It's the first time I see this. | It's the first time I have seen this. / It's the first time I've seen this.
! The economical situation is getting worse. | The economic situation is getting worse. # economic = de la economía; economical = que ahorra
! She is very sensible to criticism. | She is very sensitive to criticism. # sensible = sensato
! Actually, I'm working in a bank. (ahora) | Currently, I'm working in a bank. / At present, I'm working in a bank. / At the moment, I'm working in a bank. # actually = en realidad
! I assisted to the conference last week. | I attended the conference last week. # asistir = attend
! He succeeded to pass the exam. | He succeeded in passing the exam.
! We must avoid to make the same mistake. | We must avoid making the same mistake.
! I'd rather to stay at home. | I'd rather stay at home.
! It's worth to visit the museum. | It's worth visiting the museum.
! No sooner I had arrived than it started raining. | No sooner had I arrived than it started raining.
! She insisted to pay for the meal. | She insisted on paying for the meal.
! The amount of people has increased. | The number of people has increased. # amount con incontables
! I look forward to hear from you. | I look forward to hearing from you.
! He's said to be lived abroad for years. | He's said to have lived abroad for years.
! Less people came than we expected. | Fewer people came than we expected.
! In my opinion, I think it is unfair. | In my opinion, it is unfair. / I think it is unfair. # redundante
! The reason is because prices rose. | The reason is that prices rose.
! I had my car to be repaired. | I had my car repaired.
! This is the man which I told you about. | This is the man who I told you about. / This is the man that I told you about. / This is the man I told you about. / This is the man whom I told you about.
! He works as lawyer in Madrid. | He works as a lawyer in Madrid.
! She remembered me to buy bread. | She reminded me to buy bread. # remind = recordarle algo a alguien
! By the time we arrived, the film already started. | By the time we arrived, the film had already started.
`,
  },
  {
    id: 'err2-d', level: 'C1', list: `
! Not only he was late, but he also forgot the documents. | Not only was he late, but he also forgot the documents.
! It is essential that he is informed at once. (registro formal) | It is essential that he be informed at once. / It is essential that he should be informed at once.
! Had I knew about it, I would have acted. | Had I known about it, I would have acted.
! The datas show a clear trend. | The data show a clear trend. / The data shows a clear trend.
! Eventually we could find a solution after hours. | Eventually we were able to find a solution after hours. / Eventually we managed to find a solution after hours. # logro concreto: was able to / managed to
! Scarcely I had sat down when the phone rang. | Scarcely had I sat down when the phone rang.
! The research, that was published in May, has been criticised. | The research, which was published in May, has been criticised.
! He is believed to be born in Vienna. | He is believed to have been born in Vienna.
! Little he knew what awaited him. | Little did he know what awaited him.
! I would appreciate if you could reply promptly. | I would appreciate it if you could reply promptly.
! There is no point to argue with them. | There is no point in arguing with them. / There is no point arguing with them.
! Under no circumstances you should open this door. | Under no circumstances should you open this door.
! The more I read, more I understand. | The more I read, the more I understand.
! She objected to be treated like a child. | She objected to being treated like a child.
! Were he to accepted the offer, we would be delighted. | Were he to accept the offer, we would be delighted.
`,
  },
  {
    id: 'tr2-a', level: 'A2', list: `
= Tengo veinticinco años. | I am twenty-five. / I am twenty-five years old. / I am 25. / I am 25 years old.
= Hace frío hoy. | It is cold today. / It's cold today.
= Me gusta mucho la música. | I like music very much. / I really like music. / I like music a lot.
= ¿A qué hora empieza la película? | What time does the film start? / What time does the movie start? / What time does the film begin?
= Hay dos sillas en la cocina. | There are two chairs in the kitchen.
= Ayer fui al médico. | Yesterday I went to the doctor. / I went to the doctor yesterday. / Yesterday I went to the doctor's. / I went to the doctor's yesterday.
= No tengo hermanos. | I don't have any brothers or sisters. / I have no brothers or sisters. / I haven't got any brothers or sisters. / I don't have any siblings.
= Mi hermana es más alta que yo. | My sister is taller than me. / My sister is taller than I am.
= ¿Puedes ayudarme, por favor? | Can you help me, please? / Could you help me, please?
= Estoy aprendiendo inglés. | I am learning English. / I'm learning English.
= Nací en Sevilla. | I was born in Seville. / I was born in Sevilla.
= Voy a llamarte mañana. | I am going to call you tomorrow. / I'm going to call you tomorrow. / I am going to phone you tomorrow.
= Tengo que irme. | I have to go. / I have to leave. / I've got to go. / I must go.
= ¿Cuánto cuesta este abrigo? | How much is this coat? / How much does this coat cost?
= No me gusta levantarme temprano. | I don't like getting up early. / I don't like to get up early.
= Ella trabaja en un hospital. | She works in a hospital. / She works at a hospital.
= ¿Has estado alguna vez en Londres? | Have you ever been to London?
= Tengo sed. | I am thirsty. / I'm thirsty.
= Llegamos al hotel a las diez. | We arrived at the hotel at ten. / We got to the hotel at ten. / We arrived at the hotel at ten o'clock. / We got to the hotel at ten o'clock.
= Está lloviendo. | It is raining. / It's raining.
`,
  },
  {
    id: 'tr2-b', level: 'B1', list: `
= Solía jugar al tenis cuando era joven. | I used to play tennis when I was young.
= Si tuviera tiempo, viajaría más. | If I had time, I would travel more. / If I had time, I'd travel more.
= Llevo dos horas esperando. | I have been waiting for two hours. / I've been waiting for two hours.
= Estoy acostumbrado a trabajar de noche. | I am used to working at night. / I'm used to working at night. / I am used to working nights.
= Me dijo que estaba cansada. | She told me that she was tired. / She told me she was tired.
= Ojalá tuviera más dinero. | I wish I had more money. / If only I had more money.
= No deberías trabajar tanto. | You shouldn't work so much. / You should not work so much. / You shouldn't work so hard.
= Me hicieron esperar una hora. | They made me wait an hour. / They made me wait for an hour. / I was made to wait an hour. / I was made to wait for an hour.
= Dejé de fumar hace un año. | I stopped smoking a year ago. / I gave up smoking a year ago. / I quit smoking a year ago.
= Cuando llegué, ya se habían ido. | When I arrived, they had already left. / When I got there, they had already left. / When I arrived, they had already gone.
= Vale la pena intentarlo. | It is worth trying. / It's worth trying. / It's worth a try.
= No me importa esperar. | I don't mind waiting.
= La casa fue construida en 1900. | The house was built in 1900.
= ¿Te importaría abrir la ventana? | Would you mind opening the window?
= Aunque estaba lloviendo, salimos. | Although it was raining, we went out. / Even though it was raining, we went out. / Though it was raining, we went out.
= Tan pronto como llegue, te llamaré. | As soon as I arrive, I will call you. / As soon as I arrive, I'll call you. / As soon as I get there, I'll call you.
= Me arrepiento de no haber estudiado más. | I regret not studying more. / I regret not having studied more. / I wish I had studied more.
= Se me ha roto el móvil. | My phone has broken. / My mobile has broken. / My phone is broken. / I have broken my phone.
= Es más fácil de lo que pensaba. | It is easier than I thought. / It's easier than I thought. / It's easier than I expected.
= No tienes por qué preocuparte. | You don't need to worry. / You don't have to worry. / You needn't worry. / There's no need to worry.
`,
  },
  {
    id: 'tr2-c', level: 'B2', list: `
= Si lo hubiera sabido, te lo habría dicho. | If I had known, I would have told you. / Had I known, I would have told you. / If I'd known, I'd have told you.
= Debe de haberse olvidado de la reunión. | He must have forgotten about the meeting. / She must have forgotten about the meeting. / He must have forgotten the meeting. / She must have forgotten the meeting.
= Cuanto más practicas, mejor lo haces. | The more you practise, the better you get. / The more you practice, the better you get. / The more you practise, the better you do it. / The more you practise, the better you become.
= Me cortaron el pelo ayer. | I had my hair cut yesterday. / I got my hair cut yesterday.
= No es probable que venga. | He is unlikely to come. / She is unlikely to come. / It is unlikely that he will come. / It is unlikely that she will come. / He's not likely to come. / She's not likely to come.
= Preferiría que no se lo dijeras. | I would rather you didn't tell him. / I'd rather you didn't tell her. / I would rather you didn't tell her. / I'd rather you didn't tell him. / I'd prefer you not to tell him. / I'd prefer you not to tell her.
= Se dice que es muy rico. | He is said to be very rich. / It is said that he is very rich. / He is said to be very wealthy.
= Deberías haberme avisado. | You should have told me. / You should have warned me. / You should have let me know.
= A pesar de estar enfermo, fue a trabajar. | Despite being ill, he went to work. / In spite of being ill, he went to work. / Despite being sick, he went to work. / Although he was ill, he went to work.
= Para cuando llegues, habré terminado. | By the time you arrive, I will have finished. / By the time you get here, I will have finished. / By the time you arrive, I'll have finished. / By the time you get here, I'll have finished.
= No pude evitar reírme. | I couldn't help laughing. / I could not help laughing. / I couldn't help but laugh.
= Ya es hora de que nos vayamos. | It is time we left. / It's time we left. / It's time for us to leave. / It's time we went. / It's high time we left.
= No tiene sentido quejarse. | There is no point in complaining. / There's no point complaining. / It's no use complaining. / There's no point in complaining.
= Me acusaron de mentir. | They accused me of lying. / I was accused of lying.
= Apenas había empezado cuando se fue la luz. | I had hardly started when the power went out. / I had barely started when the power went out. / Hardly had I started when the power went out. / I had hardly started when the lights went out. / I had only just started when the power went out.
= Se supone que tenemos que estar allí a las ocho. | We are supposed to be there at eight. / We're supposed to be there at eight. / We are supposed to be there at eight o'clock.
= Por mucho que lo intente, no lo consigo. | However hard I try, I can't do it. / No matter how hard I try, I can't do it. / However hard I try, I can't manage it. / No matter how hard I try, I can't manage it.
= Acabó dimitiendo. | He ended up resigning. / She ended up resigning. / He ended up quitting. / She ended up quitting.
= Echo de menos vivir cerca del mar. | I miss living near the sea. / I miss living by the sea. / I miss living close to the sea.
= No estoy acostumbrado a que me hablen así. | I am not used to being spoken to like that. / I'm not used to being spoken to like that. / I'm not used to being talked to like that. / I'm not used to people speaking to me like that. / I'm not used to people talking to me like that.
`,
  },
  {
    id: 'tr2-d', level: 'C1', list: `
= De haberlo sabido, no habría venido. | Had I known, I would not have come. / Had I known, I wouldn't have come. / If I had known, I wouldn't have come. / Had I known that, I wouldn't have come.
= Nunca había visto nada igual. (con inversión) | Never had I seen anything like it. / Never before had I seen anything like it. / Never have I seen anything like it.
= No fue hasta más tarde cuando me di cuenta. (con inversión) | Not until later did I realise. / Not until later did I realize. / Only later did I realise. / Only later did I realize. / It was not until later that I realised. / It wasn't until later that I realised.
= Es fundamental que cada candidato presente dos referencias. | It is essential that each candidate submit two references. / It is essential that each candidate should submit two references. / It is essential that each candidate submits two references. / It is vital that each candidate submit two references. / It is essential for each candidate to submit two references.
= Por difícil que parezca, hay que intentarlo. | Difficult as it may seem, we have to try. / However difficult it may seem, we have to try. / Difficult though it may seem, we have to try. / However difficult it may seem, we must try. / Difficult as it may seem, we must try.
= Lo que más me sorprendió fue su calma. | What surprised me most was his calm. / What surprised me most was her calm. / What surprised me the most was his calm. / What surprised me the most was her calm. / What surprised me most was his calmness. / What surprised me most was her calmness.
= Se cree que el cuadro fue robado en los años setenta. | The painting is believed to have been stolen in the seventies. / The painting is believed to have been stolen in the 1970s. / It is believed that the painting was stolen in the seventies. / It is believed that the painting was stolen in the 1970s. / The painting is thought to have been stolen in the 1970s. / The painting is thought to have been stolen in the seventies.
= No me queda más remedio que aceptar. | I have no choice but to accept. / I have no option but to accept. / I have no alternative but to accept.
= Ni que decir tiene que estamos agradecidos. | It goes without saying that we are grateful. / Needless to say, we are grateful.
= Tiende a pasar por alto los detalles. | He tends to overlook details. / She tends to overlook details. / He tends to overlook the details. / She tends to overlook the details.
= En cuanto a los costes, quedan por calcular. | As for the costs, they have yet to be calculated. / As for the costs, they are yet to be calculated. / As for the costs, they remain to be calculated. / As regards the costs, they have yet to be calculated. / As for the costs, they have not yet been calculated.
= Si llegara a surgir algún problema, avíseme. | Should any problem arise, let me know. / Should any problems arise, let me know. / Should a problem arise, let me know. / Should any problem arise, please let me know. / Should any problems arise, please let me know. / If any problem should arise, let me know.
`,
  },
  {
    id: 'tf2-b1', level: 'B1', list: `
> I last saw him two years ago. | SEEN | I ___ two years. | haven't seen him for / have not seen him for
> The test was so difficult that nobody passed. | SUCH | It was ___ test that nobody passed. | such a difficult
> "Don't touch the oven," she told the boy. | NOT | She told the boy ___ the oven. | not to touch
> It's possible that she missed the train. | MIGHT | She ___ the train. | might have missed
> They are building a new bridge. | BEING | A new bridge ___. | is being built
> I'd prefer to walk rather than take the bus. | RATHER | I'd ___ take the bus. | rather walk than
> He is too young to vote. | ENOUGH | He isn't ___ vote. | old enough to
> Whose is this umbrella? | BELONG | Who does ___ to? | this umbrella belong
> I haven't got enough money to buy it. | AFFORD | I ___ buy it. | can't afford to / cannot afford to
> We couldn't go out because of the storm. | PREVENTED | The storm ___ out. | prevented us from going
> It was raining, but we went for a walk. | ALTHOUGH | We went for a walk ___ raining. | although it was
> I regret telling her. | WISH | I ___ her. | wish I hadn't told / wish I had not told
> Learning to drive took me six months. | TOOK | It ___ to learn to drive. | took me six months
> Nobody in the class is taller than Marta. | TALLEST | Marta ___ in the class. | is the tallest person / is the tallest student / is the tallest girl / is the tallest
> Somebody stole my bike last night. | WAS | My bike ___ night. | was stolen last
> "Where do you live?" he asked me. | WHERE | He asked me ___. | where I lived
`,
  },
  {
    id: 'tf2-b2', level: 'B2', list: `
> I'm sure he didn't do it on purpose. | CAN'T | He ___ it on purpose. | can't have done
> They say the company is losing money. | SAID | The company ___ losing money. | is said to be
> It wasn't necessary for you to bring wine, but thank you. | NEEDN'T | You ___ wine, but thank you. | needn't have brought
> I didn't go because I felt ill. | WOULD | If I hadn't felt ill, I ___. | would have gone
> A mechanic is servicing my car tomorrow. | HAVING | I ___ serviced tomorrow. | am having my car / 'm having my car
> As soon as we sat down, the waiter arrived. | SOONER | No ___ down than the waiter arrived. | sooner had we sat
> It's a pity I didn't take the job. | ONLY | If ___ the job. | only I had taken / only I'd taken
> He managed to finish despite the noise. | SUCCEEDED | He ___ despite the noise. | succeeded in finishing
> I find it difficult to get up early. | DIFFICULTY | I ___ up early. | have difficulty getting / have difficulty in getting
> "I'm sorry I broke the vase," said Tom. | APOLOGISED | Tom ___ the vase. | apologised for breaking / apologised for having broken
> People think the fire started in the kitchen. | THOUGHT | The fire ___ started in the kitchen. | is thought to have
> I'd rather you didn't smoke in here. | MIND | Would ___ in here? | you mind not smoking
> The last time I ate meat was in 2020. | SINCE | I ___ 2020. | haven't eaten meat since / have not eaten meat since
> We ran out of petrol halfway there. | LEFT | We had ___ halfway there. | no petrol left
> She is not as confident as she seems. | LESS | She is ___ she seems. | less confident than
> Unless you hurry, we'll miss the start. | IF | We'll miss the start ___ hurry. | if you don't / if you do not
`,
  },
  {
    id: 'tf2-c1', level: 'C1', list: `
> I had no idea how serious the problem was. | LITTLE | ___ how serious the problem was. | Little did I know / Little did I realise / Little did I realize
> You must not leave the building under any circumstances. | NO | Under ___ leave the building. | no circumstances must you / no circumstances should you
> If you need further help, contact us. | SHOULD | ___ further help, contact us. | Should you need / Should you require
> Everyone was surprised when she resigned. | CAME | Her resignation ___ to everyone. | came as a surprise
> I don't intend to apologise. | INTENTION | I ___ apologising. | have no intention of
> The match was cancelled because of the weather. | OWING | The match was cancelled ___ weather. | owing to the
> It's likely that prices will rise. | BOUND | Prices ___ rise. | are bound to
> He didn't mention the delay at all. | REFERENCE | He ___ the delay. | made no reference to
> They only told us the truth after the meeting. | UNTIL | Not ___ they tell us the truth. | until after the meeting did
> I'm sure the thieves got in through the window. | MUST | The thieves ___ in through the window. | must have got / must have gotten
> She's very good at making people feel welcome. | KNACK | She ___ making people feel welcome. | has a knack for / has a knack of
> We were about to leave when the phone rang. | POINT | We were ___ when the phone rang. | on the point of leaving
> I couldn't understand his handwriting at all. | SENSE | I couldn't ___ his handwriting. | make sense of / make any sense of
> Whatever happens, don't sign anything. | ACCOUNT | On ___ sign anything. | no account should you / no account must you
`,
  },
  {
    id: 'lk2-a', level: 'A2', list: `
I was tired, ___ I went to bed early. | so | because / but / or
I like tea, ___ I don't like coffee. | but | so / because / or
She stayed at home ___ she was ill. | because | so / but / and
Would you like tea ___ coffee? | or | so / but / because
___ I got home, I had a shower. | When | So / But / Or
First we had lunch. ___ we went for a walk. | Then | Because / But / Or
He is rich ___ he is not happy. | but | so / because / or
I got up, had breakfast ___ went to work. | and | but / because / so
We didn't go out ___ the rain. | because of | because / so / but
I always brush my teeth ___ I go to bed. | before | after that / so / then
`,
  },
  {
    id: 'lk2-b', level: 'B1', list: `
___ it was cold, we had lunch outside. | Although | Despite / However / Because
He trained hard. ___, he didn't win. | However | Although / Despite / Because
I'll lend you the car ___ you drive carefully. | as long as | unless / although / despite
Take an umbrella ___ it rains. | in case | unless / so that / although
She speaks French ___ English. | as well as | as long as / in case / so that
We won't start ___ everyone is here. | until | while / in case / as well as
___ being tired, he kept working. | Despite | Although / However / Because
The flight was cancelled ___ the fog. | due to | because / although / so
I'll text you ___ I arrive. | as soon as | until / unless / while
You won't pass ___ you study more. | unless | if / in case / as long as
`,
  },
  {
    id: 'lk2-c', level: 'B2', list: `
The plan is risky. ___, it is our only option. | Nevertheless | Therefore / Moreover / Otherwise
Sales rose; ___, profits fell. | by contrast | therefore / moreover / for instance
He left early ___ avoid the traffic. | in order to | so that / owing to / despite
___ the two reports, the second is clearer. | Of | Between / From / Among
The museum is closed on Mondays. ___, entry is free on Sundays. | Incidentally | Therefore / Otherwise / Nevertheless
You should book now; ___ you may not get a seat. | otherwise | moreover / therefore / whereas
___ the cost, the project went ahead. | Regardless of | Although / However / Whereas
She is quiet, ___ her brother never stops talking. | whereas | despite / therefore / otherwise
He was ill. ___, he missed the exam. | As a result | Nevertheless / By contrast / Otherwise
The hotel was cheap and, ___, very central. | what is more | however / otherwise / instead
`,
  },
  {
    id: 'lk2-d', level: 'C1', list: `
The results were promising, ___ preliminary. | albeit | despite / whereas / hence
The engine failed; ___ the delay. | hence | albeit / whereas / notwithstanding
___ the objections raised, the board approved the plan. | Notwithstanding | Albeit / Whereas / Hence
The policy was unpopular. ___, it was never fully implemented. | Moreover | Conversely / Albeit / Nonetheless
Small firms struggled; large ones, ___, thrived. | conversely | hence / albeit / likewise
___ as I admire her work, I cannot agree here. | Much | Even / Despite / However
He did not reply, ___ did he acknowledge the letter. | nor | or / neither / either
The data are incomplete; ___, no firm conclusion can be drawn. | accordingly | conversely / albeit / nonetheless
She accepted the post ___ that she could work remotely. | on condition | in case / as long / unless
___ it not for their support, we would have failed. | Were | If / Had / Should
`,
  },
];

const P = (id: string, level: Level, genre: string, title: string, task: string, min: number, max: number, tips: string[], model: string): WritingPrompt => ({ id, level, genre, title, task, min, max, tips, model });

/* Segunda tanda de tareas de redacción (28), de A1 a C1, con modelo original. */
export const WRITING_PROMPTS_2: WritingPrompt[] = [
  P('wp2-a1-me', 'A1', 'Descripción', 'Sobre mí', 'Write a short text about yourself: your name, age, where you live, your family and what you like.', 35, 70,
    ['Frases cortas con «I am…», «I live in…», «I have…», «I like…».', 'Une dos ideas con and o but.'],
    `My name is Laura and I am twenty years old. I live in Málaga with my parents and my brother. My brother's name is Luis and he is sixteen. I am a student. I like music and I love the beach, but I don't like football. At the weekend I go out with my friends.`),
  P('wp2-a1-room', 'A1', 'Descripción', 'Mi habitación', 'Describe your bedroom. Say what there is in it and where things are.', 35, 70,
    ['Usa «There is / There are».', 'Preposiciones de lugar: next to, under, on, between.'],
    `My bedroom is small but nice. There is a bed next to the window and there is a desk near the door. My laptop is on the desk. There are two shelves with books above the bed. The walls are white and there is a big photo of my family. I like my room because it is quiet.`),
  P('wp2-a1-day', 'A1', 'Rutina', 'Un día normal', 'Write about your typical day. What time do you get up? What do you do in the morning, afternoon and evening?', 40, 80,
    ['Present simple y horas: «I get up at seven».', 'Ordena con first, then, after that.'],
    `I get up at seven o'clock and I have breakfast at home. Then I go to work by bus. I start work at nine and I have lunch at two. After that, I work until six. In the evening I go to the gym or I meet my friends. I have dinner at nine and I watch TV. I go to bed at half past eleven.`),
  P('wp2-a2-holiday', 'A2', 'Narración', 'Mis últimas vacaciones', 'Write about your last holiday. Where did you go? Who with? What did you do? Did you enjoy it?', 60, 100,
    ['Pasado simple; cuidado con los irregulares (went, saw, ate).', 'Añade una opinión: «It was amazing / a bit boring».', 'Conecta con and, but, because, so.'],
    `Last summer I went to Portugal with two friends. We travelled by car and stayed in a small flat near the beach. Every morning we swam in the sea, and in the afternoon we visited different villages. One day we went to Lisbon and took an old yellow tram. The food was delicious, especially the fish, and it wasn't expensive. The only problem was the weather on the last day, because it rained and we couldn't go to the beach. I really enjoyed the holiday and I want to go back next year.`),
  P('wp2-a2-thanks', 'A2', 'Email informal', 'Da las gracias por un regalo', 'A friend sent you a birthday present. Write an email to thank them, say why you like it and tell them about your birthday.', 60, 100,
    ['Empieza con «Hi …,» y cierra con «Love,» o «See you soon,».', 'Agradece: «Thank you so much for…».', 'Cuenta dos cosas que hiciste en tu cumpleaños.'],
    `Hi Sophie,

Thank you so much for the book! It arrived yesterday and I have already read forty pages. How did you know I love detective stories?

My birthday was great. My family came for lunch and my mum made a huge chocolate cake. In the evening I went out with some friends from work and we had dinner in an Italian restaurant.

I hope you can visit me soon. There is a new café near my flat that you will love.

See you soon,
Clara`),
  P('wp2-a2-town', 'A2', 'Descripción', 'Mi ciudad', 'Describe your town or city for a visitor. What can people see and do there? What is the best time to visit?', 60, 100,
    ['Usa «There is / are» y «You can…».', 'Superlativos: the best, the oldest, the most beautiful.', 'Termina con una recomendación.'],
    `I live in Granada, a city in the south of Spain. It isn't very big, but there are a lot of things to see. The most famous place is the Alhambra, a beautiful old palace on a hill. You can also walk through the Albaicín, the oldest part of the city, and see the sunset from there. The food is great and it is cheap, because you get free tapas with your drink. The best time to visit is spring, when it is warm but not too hot. In winter you can even go skiing in the mountains near the city.`),
  P('wp2-a2-flat', 'A2', 'Mensaje', 'Nota para tu compañero de piso', 'You are going away for the weekend. Write a note to your flatmate: say where you are going, ask them to do two things and say when you will be back.', 50, 90,
    ['Peticiones educadas: «Could you…?», «Please don\'t forget to…».', 'Futuro con going to / will.'],
    `Hi Marco,

I'm going to my parents' house this weekend because it's my dad's birthday. Could you water the plants in the living room, please? They need water on Saturday. Also, a parcel is going to arrive on Friday afternoon. Can you take it for me?

There is some lasagne in the fridge — please eat it!

I'll be back on Sunday at about nine in the evening.

Thanks a lot,
Elena`),
  P('wp2-b1-review', 'B1', 'Reseña', 'Reseña de un restaurante', 'Write a review of a restaurant you have been to recently. Describe the place, the food and the service, and say whether you would recommend it.', 100, 150,
    ['Estructura: dónde y cuándo → comida → servicio y precio → recomendación.', 'Adjetivos variados: tasty, generous, overcooked, friendly, slow.', 'Contraste: however, although, on the other hand.'],
    `Last Saturday I had dinner at La Terraza, a small family restaurant near the harbour. I had heard good things about it, so I booked a table for four.

The place is simple but cosy, with wooden tables and a lovely view of the boats. We shared a seafood rice that was full of flavour and big enough for five people. The grilled vegetables were excellent too, although the dessert was a little disappointing: the cake tasted as if it had come from a supermarket.

The waiters were friendly and gave good advice. However, the service was rather slow, and we waited forty minutes for the main course.

In spite of that, I would recommend La Terraza, especially for the rice. Prices are reasonable — about 25 euros each — but remember to book in advance.`),
  P('wp2-b1-advice', 'B1', 'Email informal', 'Aconseja a un amigo', 'A friend is coming to live in your country for a year and has asked for advice. Write an email with tips about finding a flat, meeting people and learning the language.', 100, 150,
    ['Consejos: you should, if I were you, it\'s a good idea to, why don\'t you…', 'Un párrafo por tema.', 'Tono cercano; termina ofreciendo ayuda.'],
    `Hi Jonas,

Great news that you're coming to Spain! Here are a few tips.

First, start looking for a flat as soon as you can. If I were you, I would share with Spanish people instead of other foreigners. It's cheaper, and you'll practise the language every day. There are several good websites, and I can check the adverts for you if you like.

To meet people, it's a good idea to join a sports club or a language exchange. Most cities have groups that meet in bars once a week, and they are very friendly.

As for the language, don't worry about making mistakes. People are patient and they'll be happy that you're trying. You should also watch Spanish series with subtitles.

Let me know when you arrive and I'll show you around.

Take care,
Pablo`),
  P('wp2-b1-article', 'B1', 'Artículo', 'Una persona a la que admiro', 'Write an article for a student magazine about a person you admire. Say who they are, what they have done and why you admire them.', 100, 150,
    ['Título y primera frase que enganchen.', 'Present perfect para logros: «She has worked…».', 'Da ejemplos concretos, no solo adjetivos.'],
    `The person I admire most isn't famous. She is my aunt Carmen, who has worked as a village doctor for almost thirty years.

When she finished university, she could have stayed in the city, where salaries were higher. Instead, she chose a mountain village with six hundred inhabitants and no hospital nearby. Since then she has looked after three generations of the same families. She has driven through snow at night to visit patients, and people still stop her in the street to say thank you.

What I admire most is her patience. She listens to everybody as if she had all the time in the world, even when the waiting room is full. She has also taught me that success doesn't always mean earning a lot of money.

If I become half as useful to other people as she is, I will be proud.`),
  P('wp2-b1-complaint', 'B1', 'Email formal', 'Queja a un hotel', 'You stayed at a hotel and had several problems. Write an email to the manager explaining what happened and saying what you would like them to do.', 100, 150,
    ['Saludo y despedida formales: Dear Sir or Madam / Yours faithfully.', 'Explica los hechos con fechas, sin insultar.', 'Pide algo concreto: a refund, an apology.'],
    `Dear Sir or Madam,

I am writing to complain about my stay at your hotel from 4 to 6 May.

When I booked, I asked for a quiet room with a sea view. However, I was given a room above the kitchen, and it was impossible to sleep before midnight because of the noise. In addition, the air conditioning did not work. I reported the problem at reception twice, but nobody came to repair it.

I paid 140 euros per night, and I do not think the service I received was acceptable. I would therefore like a refund for at least one night.

I look forward to your reply.

Yours faithfully,
Marta Gil`),
  P('wp2-b1-story2', 'B1', 'Narración', 'Empieza con esta frase', 'Write a story that begins: "When I opened the door, I couldn\'t believe my eyes."', 110, 160,
    ['Mezcla pasado simple, continuo y perfecto.', 'Añade tensión con suddenly, at that moment, to my surprise.', 'Un final claro.'],
    `When I opened the door, I couldn't believe my eyes. The living room was full of people, and all of them were looking at me.

I had had a terrible day. My train had been cancelled, I had argued with my boss, and I had completely forgotten that it was my birthday. I was thinking about going straight to bed when I noticed the balloons.

"Surprise!" everybody shouted. My sister, who lives in Germany, was standing next to the sofa. I hadn't seen her for two years. My parents were there too, and so were my friends from university.

At that moment I started to cry and laugh at the same time. My flatmate had been planning the party for weeks, and I hadn't suspected anything.

We danced until three in the morning. It was the worst day and the best night of the year.`),
  P('wp2-b1-forum', 'B1', 'Opinión', '¿Mascotas en un piso?', 'A website has asked: "Is it fair to keep a dog in a small flat?" Write your opinion with reasons and examples.', 100, 150,
    ['Deja clara tu opinión al principio.', 'Dos razones con ejemplo cada una.', 'In my opinion, I believe, on the other hand, to sum up.'],
    `In my opinion, keeping a dog in a small flat can be fair, but only if the owner is prepared to make an effort.

A dog does not need a big living room; it needs exercise and company. My neighbour has a large dog in a one-bedroom flat, but she takes him out three times a day and runs with him at weekends. He is healthier than many dogs that live in houses with gardens and never go for a walk.

On the other hand, some people leave their pets alone for ten hours while they are at work. In that case the animal suffers, and so do the neighbours, who have to listen to it barking all day.

To sum up, the size of the flat is not the problem. What matters is how much time you can give your dog.`),
  P('wp2-b2-essay-social', 'B2', 'Ensayo de opinión', 'Redes sociales y amistad', 'Write an essay: "Social media has made it easier to have friends but harder to have real friendships." Do you agree?', 160, 220,
    ['Introducción que reformula el tema y anuncia tu postura.', 'Un párrafo a favor, otro en contra o matizando.', 'Conectores formales: furthermore, nevertheless, as a result.', 'Conclusión que no repita literalmente la introducción.'],
    `It is often claimed that social media has multiplied our contacts while weakening our relationships. Although there is some truth in this, I believe the picture is more complicated.

On the one hand, online platforms undoubtedly encourage a superficial kind of contact. Clicking "like" takes a second and requires no real interest in the other person. As a result, many people have hundreds of "friends" they would never phone if they had a problem. Furthermore, time spent scrolling is time not spent face to face.

On the other hand, the same tools allow us to maintain friendships that would otherwise have disappeared. I am still in touch with classmates who moved abroad years ago, and when we meet, we do not feel like strangers. For people who are shy or isolated, online communities can also be a first step towards genuine connection.

In conclusion, social media is neither the enemy of friendship nor a substitute for it. Real friendships have always required time and attention; technology simply makes it easier to forget that. Used with care, it can support the relationships that matter rather than replace them.`),
  P('wp2-b2-report', 'B2', 'Informe', 'Informe sobre el transporte local', 'Your town council wants to improve public transport. Write a report describing the current situation, the main problems and your recommendations.', 160, 220,
    ['Encabezados: Introduction, Current situation, Problems, Recommendations.', 'Estilo impersonal: «It was found that…», «It is recommended that…».', 'Recomendaciones concretas y realistas.'],
    `Introduction
The aim of this report is to assess public transport in the town and to suggest improvements. It is based on a survey of 120 residents.

Current situation
The town is served by four bus routes and a railway station on the outskirts. Buses run every twenty minutes on weekdays and every hour at weekends.

Problems
The majority of those surveyed complained that buses were unreliable, particularly during the rush hour. It was also pointed out that there is no service after 10 pm, which makes it difficult for young people and shift workers to get home. In addition, the station is poorly connected to the centre, so many passengers are forced to drive there.

Recommendations
It is recommended that a bus lane be created on the main avenue in order to reduce delays. A night service at weekends would also be welcomed, even if it ran only once an hour. Finally, a shuttle bus between the station and the centre should be introduced at peak times.

Conclusion
These measures would be relatively inexpensive and would encourage more residents to leave their cars at home.`),
  P('wp2-b2-review-book', 'B2', 'Reseña', 'Reseña de un libro o una serie', 'Write a review of a book or series you would recommend. Summarise it briefly without spoilers, comment on its strengths and weaknesses and say who would enjoy it.', 150, 210,
    ['No cuentes el final.', 'Vocabulario de crítica: gripping, slow-paced, predictable, well-drawn characters.', 'Equilibra elogios y pegas.'],
    `"The Long Winter Road" is a crime series set in a remote Norwegian town, and it is one of the most gripping things I have watched this year.

The story follows a young detective who returns to her home town to investigate the disappearance of a teacher. So far, so familiar. What sets the series apart is its atmosphere. The snow-covered landscape is almost a character in itself, and the silence of the place makes every small sound unsettling.

The acting is superb, particularly that of the lead, who conveys a great deal with very few words. The secondary characters are well drawn too, and nobody is entirely innocent. My only criticism is the pace of the middle episodes, which drag slightly, and one subplot that is never properly resolved.

Nevertheless, the final episode more than makes up for it. I would recommend the series to anyone who enjoys intelligent thrillers and does not mind reading subtitles. If you are looking for car chases and explosions, though, this is not for you.`),
  P('wp2-b2-letter-app', 'B2', 'Carta de solicitud', 'Solicita un puesto de voluntario', 'An international festival is looking for volunteers. Write a letter of application explaining why you are suitable and when you are available.', 150, 210,
    ['Dear Sir or Madam / Yours faithfully.', 'Párrafos: motivo → experiencia → cualidades → disponibilidad.', 'Formal: I would welcome the opportunity, I am available.'],
    `Dear Sir or Madam,

I am writing to apply for a position as a volunteer at the International Film Festival, as advertised on your website.

I am a twenty-three-year-old student of journalism with a strong interest in cinema. Last summer I worked for two months at the information desk of a music festival, where I was responsible for answering visitors' questions and solving problems with tickets. This experience taught me to remain calm under pressure and to deal politely with people who are tired or upset.

I speak Spanish and English fluently and have a good level of French, which I believe would be useful when welcoming international guests. I am also used to working in a team and am happy to work in the evenings and at weekends.

I would be available for the whole of the festival, from 10 to 20 October, and could attend training sessions in the previous week.

I would welcome the opportunity to discuss my application further. I enclose my CV and look forward to hearing from you.

Yours faithfully,
Lucas Herrero`),
  P('wp2-b2-article-tech', 'B2', 'Artículo', 'Una semana sin móvil', 'Write an article for a magazine: could you live for a week without your phone? Describe what would be hard, what might improve, and what you conclude.', 160, 220,
    ['Título atractivo y pregunta directa al lector.', 'Tono personal pero cuidado.', 'Usa condicionales: I would, I might, it would be.'],
    `Seven days, no screen

Could you survive a week without your phone? I asked myself that question last month, when mine fell into a river, and the answer surprised me.

The first two days were dreadful. I kept reaching into my pocket, and I felt strangely anxious, as if I had left the gas on. Practical problems appeared too: I could not check the bus timetable, pay in my usual café or let a friend know I was running late.

By the third day, however, something had changed. I was reading on the train instead of scrolling, and I finished a novel for the first time in months. Conversations at lunch lasted longer, because nobody at the table — well, not me, at least — was glancing at a screen. I also slept better than I had for years.

Would I give up my phone for good? Certainly not. It is far too useful, and I missed my family's messages. But the week taught me how much of my attention I had been giving away without noticing. Since then, I have kept one small habit: the phone stays out of the bedroom. I suggest you try it.`),
  P('wp2-b2-proposal', 'B2', 'Propuesta', 'Propuesta para la biblioteca', 'Your local library has received money for improvements. Write a proposal suggesting how it should be spent and why.', 150, 210,
    ['Encabezados: Introduction, Suggestions, Benefits, Conclusion.', 'Lenguaje de sugerencia: I would suggest, it would be advisable, this would allow.', 'Justifica cada idea.'],
    `Introduction
This proposal outlines how the recent grant could best be used to improve the town library.

Longer opening hours
At present the library closes at 6 pm, which means that people who work cannot use it during the week. I would suggest staying open until 9 pm on two evenings. This would only require hiring one part-time assistant.

A study area for students
Many secondary-school students have no quiet place to study at home. It would be advisable to convert the storeroom on the first floor into a study area with twenty desks and reliable Wi-Fi.

Digital resources
A subscription to an e-book platform would allow members to borrow books without visiting the building, which would particularly benefit elderly residents.

Benefits
These measures would attract new users, especially young people and working adults, and would make the library a real meeting point for the community.

Conclusion
I strongly recommend giving priority to the study area, since it would meet the most urgent need at a relatively low cost.`),
  P('wp2-b2-for-against', 'B2', 'Ensayo (for & against)', 'Turismo masivo', 'Write a for-and-against essay on the effects of mass tourism on popular cities.', 160, 220,
    ['Introducción neutral.', 'Párrafo de ventajas y párrafo de inconvenientes, con ejemplos.', 'Tu opinión solo en la conclusión.'],
    `Every year, millions of visitors travel to cities such as Barcelona, Venice and Amsterdam. While tourism brings clear benefits, its growth has also created serious problems for the people who live there.

The main argument in favour of mass tourism is economic. Hotels, restaurants and shops depend on visitors, and thousands of jobs would disappear without them. Moreover, the income from tourism helps to pay for the restoration of historic buildings that might otherwise fall into disrepair.

However, there are significant drawbacks. In the most popular districts, flats are increasingly rented to tourists, which pushes up prices and forces residents to move away. Traditional shops are replaced by souvenir stores, so that the neighbourhood gradually loses the character that attracted visitors in the first place. Noise, litter and overcrowded public transport are further sources of tension.

On balance, I believe that tourism is positive provided that it is properly managed. Limits on holiday flats and a tax on visitors, invested in local services, would help cities to remain places where people can live as well as places that people want to see.`),
  P('wp2-c1-essay-work', 'C1', 'Ensayo académico', '¿Semana laboral de cuatro días?', 'Write an essay evaluating whether a four-day working week should become the norm. Consider at least two perspectives and reach a justified conclusion.', 220, 280,
    ['Tesis matizada desde la introducción.', 'Evalúa, no solo enumeres: «this argument overlooks…», «the evidence is mixed».', 'Hedging: tends to, arguably, to some extent.', 'Nominalizaciones y conectores avanzados: notwithstanding, by the same token.'],
    `The proposal that employees should work four days rather than five for the same pay has moved, within a decade, from the margins of debate to large-scale trials. Its advocates present it as a rare policy from which everyone gains. I shall argue that, while the case is stronger than sceptics allow, it holds only under certain conditions.

The evidence from pilot schemes is undeniably encouraging. Firms that have adopted the shorter week typically report stable output, lower absenteeism and markedly improved retention. The explanation appears to be that a compressed schedule forces organisations to eliminate what was never productive in the first place — unnecessary meetings, duplicated reporting — while rested employees concentrate better.

It would be rash, however, to generalise from these results. Participating companies were self-selected and drawn disproportionately from sectors where output is not tied to hours of presence. A hospital ward or a bus depot cannot become more efficient by cancelling meetings; there, a shorter week implies hiring more staff, at considerable cost. There is, moreover, a risk that the policy would widen the gap between office workers, who would enjoy a three-day weekend, and those in manual or care occupations, who would not.

None of this amounts to an argument against reform. It suggests, rather, that a universal mandate would be premature. A more defensible course would be to encourage adoption where productivity gains can offset the reduction in hours, while compensating other sectors through additional leave or public funding.

In short, the four-day week is neither a utopian fantasy nor a universal remedy. Its promise is real, but it will be realised only if policy acknowledges that not all work is alike.`),
  P('wp2-c1-report', 'C1', 'Informe', 'Informe sobre un programa de mentoría', 'Your organisation ran a six-month mentoring scheme for new staff. Write a report evaluating its success and recommending changes.', 220, 280,
    ['Encabezados claros y un propósito en la primera línea.', 'Datos y matices: «a clear majority», «a significant minority».', 'Registro impersonal y recomendaciones priorizadas.'],
    `Purpose
This report evaluates the mentoring scheme piloted between January and June and puts forward recommendations for its continuation. It draws on questionnaires completed by all 24 participants and on interviews with six mentors.

Overall assessment
The scheme was, on the whole, well received. A clear majority of new staff stated that it had enabled them to settle in more quickly, and three-quarters would recommend it to future recruits. Mentors, for their part, reported that explaining procedures to others had prompted them to reflect on their own practice.

Areas of concern
Notwithstanding this positive picture, two weaknesses emerged. First, the frequency of meetings varied widely: while some pairs met weekly, others managed only three sessions in six months, largely owing to mentors' workloads. Secondly, a significant minority of participants felt that the pairing had been arbitrary, their mentor working in an unrelated department and being unable to answer practical questions.

Recommendations
In the light of these findings, it is recommended that:
• mentors be allocated one protected hour per fortnight, recognised in their workload;
• pairs be matched, wherever feasible, within the same department or a closely related one;
• a brief training session be offered to mentors before the scheme begins, since several admitted to being uncertain of what was expected of them.

Conclusion
The pilot has demonstrated the value of mentoring at modest cost. Provided that the above adjustments are made, there is every reason to extend the scheme to all new employees from September.`),
  P('wp2-c1-proposal', 'C1', 'Propuesta', 'Reducir residuos en la oficina', 'Write a proposal to your management outlining measures to reduce waste in the workplace, anticipating objections.', 220, 280,
    ['Estructura persuasiva: situación → medidas → objeciones previstas → siguiente paso.', 'Tono firme pero diplomático.', 'Subjuntivo formal: «I propose that the company adopt…».'],
    `Introduction
This proposal sets out three measures by which the company could substantially reduce the waste it generates, together with an estimate of their cost and a response to likely objections.

Current situation
An informal audit carried out last month indicated that the office discards some 900 disposable cups a week and prints roughly 14,000 pages, a third of which are abandoned at the printer. General and recyclable waste are, in practice, collected together.

Proposed measures
I propose that the company adopt the following:
1. Replace disposable cups with reusable ones, each employee being issued with a mug and the kitchen supplied with a second dishwasher.
2. Introduce "follow-me" printing, whereby documents are released only when the user is present at the machine. Comparable firms have reported reductions of 30 per cent in paper use.
3. Install clearly labelled recycling points on every floor and remove individual desk bins.

Anticipated objections
It may be objected that these changes will inconvenience staff. Experience elsewhere suggests that resistance is short-lived, particularly if the reasons are explained and savings are made visible. As regards cost, the initial outlay of approximately €4,000 would be recovered within eighteen months through lower purchasing and collection charges.

Next steps
Should the board approve the proposal in principle, I would suggest a three-month trial on the second floor, after which results could be reviewed before any company-wide commitment is made.`),
  P('wp2-c1-review', 'C1', 'Reseña crítica', 'Reseña de un ensayo o documental', 'Write a critical review of a non-fiction book or documentary. Evaluate its argument and evidence, not just its content.', 200, 260,
    ['Resume la tesis en dos frases; el resto, valoración.', 'Señala virtudes y limitaciones con precisión.', 'Léxico evaluativo: compelling, lopsided, meticulously researched, glosses over.'],
    `"The Quiet Harvest", a ninety-minute documentary on the decline of insect populations, sets itself a difficult task: to make viewers care about creatures most of us would rather swat. For the most part, it succeeds admirably.

Its central claim is that insect numbers in parts of Europe have fallen by as much as three-quarters within a generation, and that the consequences for agriculture will be severe. The film is at its most compelling when it stays close to the evidence. An extended sequence with amateur entomologists in Germany, who have been weighing their catches in the same meadows since the 1980s, is both meticulously explained and unexpectedly moving.

Where the documentary is less convincing is in its treatment of causes. Pesticides are presented as the principal culprit, and farmers who use them are given little opportunity to respond. Habitat loss and light pollution, which many researchers consider equally significant, are glossed over in a few minutes. The result is an account that is persuasive but somewhat lopsided, and viewers may come away with a clearer sense of whom to blame than the science strictly warrants.

The closing section, which turns to remedies, also strikes an oddly cheerful note, implying that wildflower strips beside motorways will be sufficient.

These reservations aside, this is intelligent, beautifully photographed film-making. It deserves a wide audience — ideally one prepared to follow it up with further reading.`),
  P('wp2-c1-letter-editor', 'C1', 'Carta al director', 'Responde a un artículo de opinión', 'A newspaper published an article claiming that learning foreign languages is pointless now that translation software exists. Write a letter to the editor responding.', 200, 260,
    ['Refiérete al artículo en la primera frase.', 'Concede algo antes de refutar: «While it is true that…».', 'Cierre contundente pero cortés.'],
    `Sir,

I read with interest, and some dismay, your columnist's assertion (12 March) that learning a foreign language has become "an expensive hobby" in the age of instant translation.

While it is true that software now renders a menu or a set of instructions with impressive accuracy, your columnist confuses the exchange of information with communication. A machine may convert my words; it cannot tell me that my joke has fallen flat, that my directness has caused offence, or that the silence following my proposal signals disagreement rather than assent. Anyone who has negotiated, taught or simply made friends in another language knows that these are precisely the moments that matter.

There is also the question of what language learning does to the learner. To study another tongue is to discover that one's own way of dividing up the world is not the only one. It is difficult to imagine a more valuable lesson at a time when misunderstanding between cultures carries such a cost.

Finally, the article overlooks a practical point. Translation tools perform best between widely used languages and in standard registers. Those who rely on them entirely place themselves at the mercy of a device — and of the company that makes it.

By all means let us welcome the technology. To conclude from it that we need no longer learn languages, however, is rather like arguing that calculators have made it unnecessary to understand numbers.

Yours faithfully,
Ana Robles`),
  P('wp2-c1-essay-compare', 'C1', 'Ensayo (dos enfoques)', 'Cómo reducir el tráfico', 'Your class discussed ways of reducing traffic in city centres: congestion charges and investment in public transport. Write an essay comparing the two approaches and saying which would be more effective.', 220, 280,
    ['Compara con criterios (eficacia, equidad, coste), no por separado.', 'Conecta: whereas, by contrast, in this respect.', 'Conclusión que elija y justifique.'],
    `Few urban problems prove as stubborn as traffic. Among the remedies most frequently proposed are charging motorists to enter city centres and improving public transport so that they no longer wish to. This essay compares the two in terms of effectiveness and fairness.

As regards immediate impact, the congestion charge has the stronger record. Where it has been introduced, traffic volumes have typically fallen by between fifteen and thirty per cent within months, with corresponding improvements in air quality. Investment in public transport, by contrast, yields results only gradually: new lines take years to build, and habits take longer still to change.

In terms of fairness, however, the positions are reversed. A flat charge weighs most heavily on those with modest incomes, for whom it represents a real deterrent, while wealthier drivers simply absorb it. There is something unsatisfactory about a policy that clears the roads chiefly for those who can afford to pay. Better public transport, on the other hand, benefits precisely those who are least able to run a car.

It might seem, then, that one must choose between an effective measure and an equitable one. In practice the dilemma is less stark than it appears, since the revenue from charging can be ring-fenced for buses and trams — an arrangement that also makes the charge more acceptable to the public.

On balance, I would argue that the congestion charge is the more effective instrument, but only when its proceeds are visibly reinvested in alternatives. Pursued in isolation, it merely prices people out; combined with investment, it changes how a city moves.`),
  P('wp2-c1-summary', 'C1', 'Resumen y valoración', 'Resume y valora dos posturas', 'Summarise in your own words two opposing views on whether universities should prioritise employability over academic knowledge, then evaluate them.', 200, 260,
    ['Parafrasea: no copies expresiones del enunciado.', 'Un párrafo por postura y un párrafo de valoración.', 'Verbos de reporte: contend, maintain, concede, overlook.'],
    `Opinion on the purpose of higher education is divided between those who see the university primarily as preparation for work and those who regard it as a place for the disinterested pursuit of knowledge.

Proponents of the first view contend that, since students now bear much of the cost of their degrees, institutions have an obligation to equip them for the labour market. On this account, courses should be designed in consultation with employers, and placements, digital skills and teamwork ought to feature as prominently as subject content.

Their opponents maintain that such an approach mistakes training for education. The skills employers demand today, they point out, may be obsolete within a decade, whereas the capacity to analyse evidence, construct an argument and tolerate uncertainty does not date. They add that a society needs historians and philosophers whether or not the market rewards them.

Both positions have merit, yet each overlooks something. The first underestimates how poorly anyone, employers included, predicts future needs; a curriculum tailored to current vacancies risks producing graduates fitted for jobs that no longer exist. The second, for its part, can sound complacent when voiced by those in secure posts to students facing debt. It also assumes, without much evidence, that intellectual rigour and practical relevance are in tension.

The more persuasive position, in my view, lies in refusing the dichotomy. A demanding academic education, properly taught, is itself the best preparation for work — provided universities take the trouble to help students recognise and articulate what they have learnt.`),
  P('wp2-c1-email-formal', 'C1', 'Email formal delicado', 'Rechaza una propuesta con tacto', 'A partner organisation has proposed a joint project that you cannot accept in its current form. Write an email declining diplomatically and leaving the door open.', 180, 240,
    ['Agradece primero; rechaza con claridad pero sin brusquedad.', 'Suaviza: I am afraid, regrettably, as things stand.', 'Ofrece una alternativa concreta.'],
    `Dear Dr Lindholm,

Thank you for your detailed proposal of 3 April regarding a joint training programme, and for the considerable thought that has clearly gone into it. My colleagues and I have now had the opportunity to discuss it at length.

We were impressed by the scope of the programme and share your view that there is real demand for it. Regrettably, however, I am afraid that we are not in a position to commit ourselves to the project as it stands. The proposed start date of September would coincide with the launch of our own new courses, and we could not release the three members of staff envisaged without compromising existing obligations. We also have some reservations about the funding model, under which the greater part of the financial risk would fall to us in the first year.

I should stress that this is in no sense a reflection on the quality of the proposal, nor on our wish to work with you. Were the timetable to be revised — a start in January, for instance — and the costs shared more evenly, we would be very glad to reconsider. It might also be worth exploring a smaller pilot, involving a single course, as a first step.

If you feel that either of these possibilities merits discussion, I would be delighted to arrange a call at your convenience.

With kind regards,
Helena Vidal
Director of Programmes`),
];
