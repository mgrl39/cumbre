/* Ejercicios añadidos a los temas que ya existían (se anexan al final de cada tema, así los ids anteriores no
   cambian). Cada tema queda con material para todos sus juegos: elegir, completar, cazar el error, traducir… */
import { GRAMMAR_MORE_2 } from './grammarMore2.ts';

const MORE_1: Record<string, string> = {
  /* ---------------- A1.1 ---------------- */
  'to-be': `
You ___ (be) my best friend. | are
She ___ (not be) at home now. | isn't / is not / 's not
___ (be) they your parents? | Are
I ___ (be) a student. | am / 'm
We ___ happy today. | are | is / am / be
___ he a doctor? | Is | Are / Am / Does
! She are my teacher. | She is my teacher. / She's my teacher.
! They is from Italy. | They are from Italy. / They're from Italy.
! I am agree with you. | I agree with you. # agree no lleva «be»
= Somos amigos. | We are friends. / We're friends.
= Ella está en casa. | She is at home. / She's at home.
`,
  'present-simple': `
He ___ football every Saturday. | plays | play / is play / playing
I ___ in a small flat. | live | lives / am live / living
My parents ___ coffee. | don't drink | doesn't drink / not drink / aren't drink
___ she work here? | Does | Do / Is / Has
What time ___ the film start? | does | do / is / has
= Me levanto a las siete. | I get up at seven. / I get up at 7. / I wake up at seven.
= Ella no habla inglés. | She doesn't speak English. / She does not speak English.
= ¿Dónde vives? | Where do you live?
`,
  'articles-basic': `
I have ___ (a / an) orange and a banana. | an
She is ___ (a / an) engineer. | an
He's ___ (a / an) university student. | a
Can you close ___ (a / the) door, please? | the
There's a cat in the garden. ___ (A / The) cat is black. | The
We have ___ (a / an) hour to finish. | an
! She is teacher. | She is a teacher. / She's a teacher. # Las profesiones llevan a / an
! I have a apple. | I have an apple. / I've got an apple.
= Soy médico. | I am a doctor. / I'm a doctor.
= El sol es muy grande. | The sun is very big.
= Tengo un perro. El perro se llama Max. | I have a dog. The dog is called Max. / I have a dog. The dog's name is Max. / I've got a dog. The dog is called Max.
`,
  'plurals-demonstratives': `
Look at ___ birds over there! | those | that / this / these ones here
___ is my brother, Tom. (he is next to me) | This | These / Those / It's
I have two ___. | children | childs / childrens / child
There are three ___ in the room. | women | womans / womens / woman
Are ___ your keys here on the table? | these | this / that / those ones there
How much are ___ shoes in the window over there? | those | that / this / it
My ___ hurt after the walk. | feet | foots / feets / foot
= Estos libros son míos. | These books are mine. / These are my books.
= ¿Qué es eso? | What is that? / What's that?
= Hay dos hombres y tres mujeres. | There are two men and three women.
`,
  possessives: `
This is my sister. ___ (she) name is Laura. | Her
We love ___ (we) new house. | our
They live with ___ (they) parents. | their
Is this pen ___ (you)? | yours
That's not my bag. ___ (I) is blue. | Mine
This is ___ car. (Tom) | Tom's | Toms / of Tom / the Tom's
= Este es el coche de mi padre. | This is my father's car. / This is my dad's car.
= ¿Es tuyo? | Is it yours? / Is this yours? / Is that yours?
= Su casa es grande. (de ellos) | Their house is big.
= Me duele la cabeza. | My head hurts. / I have a headache. / I've got a headache.
`,
  /* ---------------- A1.2 ---------------- */
  'there-is': `
There ___ (be) a book on the table. | is / 's
There ___ (be) two parks in my town. | are
___ (be) there any milk in the fridge? | Is
There ___ (not be) any chairs. | aren't / are not
___ there a supermarket near here? | Is | Are / Have / Does
There ___ some apples in the bag. | are | is / have / has
There ___ any water in the bottle. | isn't | aren't / hasn't / not is
! Have a bank in this street. | There is a bank in this street. / There's a bank in this street.
! There is three people. | There are three people.
= Hay un problema. | There is a problem. / There's a problem.
= ¿Hay un baño aquí? | Is there a bathroom here? / Is there a toilet here?
= No hay sillas. | There aren't any chairs. / There are no chairs.
`,
  'can-ability': `
She ___ speak three languages. | can | cans / can to / is can
I ___ swim, so I never go to the pool. | can't | don't can / not can / can't to
___ you help me, please? | Can | Do you can / Are you can / Cans
My brother can ___ (drive). | drive
Can she ___ (dance)? Yes, she can. | dance
We ___ (can / not) come tomorrow. | can't / cannot / can not
What languages ___ (can / you) speak? | can you
= No sé cocinar. | I can't cook. / I cannot cook.
= ¿Puedes abrir la puerta? | Can you open the door? / Could you open the door?
= Ella sabe tocar el piano. | She can play the piano.
`,
  'prep-time': `
I get up ___ seven o'clock. | at
My birthday is ___ May. | in
We have English ___ Mondays. | on
The shop closes ___ night. | at
She was born ___ 2001. | in
The party is ___ 5 June. | on
I usually study ___ the evening. | in
= Nos vemos el lunes. | See you on Monday. / I'll see you on Monday. / We'll meet on Monday.
= Trabajo por la mañana. | I work in the morning. / I work in the mornings.
= La clase empieza a las nueve. | The class starts at nine. / The lesson starts at nine. / The class begins at nine.
= En verano voy a la playa. | In summer I go to the beach. / I go to the beach in summer. / In the summer I go to the beach.
`,
  frequency: `
I ___ breakfast at home. | always have | have always / always am having / am always have
He ___ late. | is never | never is / isn't never / never be
___ do you go to the gym? | How often | How many / How much often / How times
She ___ to bed before midnight. | usually goes | goes usually / usually go / is usually go
We go to the cinema ___ a month. | once | one time in / one / a time
! I go always to work by bus. | I always go to work by bus.
! She is late never. | She is never late. / She's never late.
! He doesn't never eat meat. | He never eats meat. / He doesn't ever eat meat.
= Nunca bebo café. | I never drink coffee.
= Siempre está cansado. | He is always tired. / He's always tired.
= ¿Con qué frecuencia estudias? | How often do you study?
`,
  imperatives: `
___ (not be) late! | Don't be / Do not be
___ (open) your books, please. | Open
Let's ___ (have) a break. | have
___ quiet, please. I'm working. | Be | Are / Do be you / To be
___ run in the corridor! | Don't | No / Not / Doesn't
Let's ___ argue about it. | not | don't / no / not to
! Don't to worry. | Don't worry. / Do not worry.
! No smoke here, please. | Don't smoke here, please. / Do not smoke here, please. / No smoking here, please.
= Siéntate, por favor. | Sit down, please. / Please sit down. / Have a seat, please.
= No lo toques. | Don't touch it. / Do not touch it.
= Vamos a comer. | Let's eat. / Let's have lunch.
`,
  'questions-basic': `
___ (where / you / live)? | Where do you live
___ old are you? | How
___ is your name? | What
___ (what / she / do) at weekends? | What does she do
___ (be / you) tired? | Are you
___ is that man? He's my uncle. | Who | What / Which / Whose
___ much is this? | How | What / Which / How many
= ¿De dónde eres? | Where are you from?
= ¿A qué hora empieza? | What time does it start? / What time does it begin?
= ¿Por qué estudias inglés? | Why do you study English? / Why are you studying English?
= ¿Cuántos hermanos tienes? | How many brothers do you have? / How many brothers and sisters do you have? / How many brothers have you got? / How many siblings do you have?
`,
  /* ---------------- A2.1 ---------------- */
  'present-continuous': `
Listen! Someone ___ (sing). | is singing / 's singing
We ___ (not watch) TV now. | aren't watching / are not watching / 're not watching
What ___ (you / do) right now? | are you doing
She usually ___ (walk) to work, but today she is taking the bus. | walks
I ___ what you mean. | understand | am understanding / understanding / do understanding
Look! It ___. | is snowing | snows / snow / is snow
He ___ to the gym every day. | goes | is going / go / going
! I am knowing the answer. | I know the answer. # Los verbos de estado no van en continuo
! She is work now. | She is working now. / She's working now.
= ¿Qué estás haciendo? | What are you doing?
= Ahora no estoy trabajando. | I'm not working now. / I am not working now. / I'm not working right now.
`,
  'past-simple': `
We ___ a great film last night. | saw | seen / see / did saw
She ___ like the food. | didn't | doesn't / wasn't / not
___ you call me yesterday? | Did | Do / Were / Have
I ___ to Paris in 2019. | went | goed / go / was go
He didn't ___ the email. | read | readed / reads / to read
They ___ (buy) a new car last month. | bought
I ___ (not sleep) well last night. | didn't sleep / did not sleep
Where ___ (you / go) on holiday? | did you go
= Ayer no fui a trabajar. | I didn't go to work yesterday. / Yesterday I didn't go to work. / I did not go to work yesterday.
= ¿Qué hiciste el sábado? | What did you do on Saturday?
= Compré pan y leche. | I bought bread and milk. / I bought some bread and milk.
`,
  'past-continuous': `
What ___ (you / do) at eight last night? | were you doing
I ___ (not listen) when the teacher asked me. | wasn't listening / was not listening
They ___ football when it started to rain. | were playing | played / are playing / was playing
I ___ my leg while I was skiing. | broke | was breaking / break / have broken
While she ___, I made dinner. | was sleeping | slept / is sleeping / sleeps
! I was cook when you called. | I was cooking when you called.
! When I was arriving, he was sleeping. | When I arrived, he was sleeping. # La acción corta va en pasado simple
! They was watching TV. | They were watching TV.
= Estaba durmiendo cuando llamaste. | I was sleeping when you called. / I was asleep when you called. / I was sleeping when you phoned.
= ¿Qué estabas haciendo? | What were you doing?
= Estábamos cenando. | We were having dinner. / We were eating dinner.
`,
  comparatives: `
My house is ___ (small) than yours. | smaller
This is the ___ (good) pizza in town. | best
English is ___ (easy) than German. | easier
She is the ___ (intelligent) person I know. | most intelligent
Today is ___ (bad) than yesterday. | worse
This book is ___ interesting than that one. | more | most / much / the more
He's ___ tallest boy in the class. | the | a / more / most
= Mi hermano es más alto que yo. | My brother is taller than me. / My brother is taller than I am.
= Es la ciudad más bonita de España. | It is the most beautiful city in Spain. / It's the most beautiful city in Spain.
= Este es peor. | This one is worse. / This is worse.
`,
  'prep-place': `
The keys are ___ the table. | on
She lives ___ London. | in
I'll meet you ___ the bus stop. | at
The cat is hiding ___ (debajo de) the bed. | under
The bank is ___ (entre) the post office and the café. | between
He walked ___ the room and sat down. | into | in to the / at / on
The pharmacy is ___ the supermarket. | next to | next / near of / beside of
! I arrived to the airport at six. | I arrived at the airport at six.
! She is in home. | She is at home. / She's at home.
= El libro está encima de la mesa. | The book is on the table.
= Vivo cerca de la estación. | I live near the station. / I live close to the station.
= Está enfrente del banco. | It is opposite the bank. / It's opposite the bank. / It's across from the bank. / It's in front of the bank.
`,
  'adjectives-adverbs': `
She sings ___ (beautiful). | beautifully
He drives very ___ (careful). | carefully
They speak English ___ (good). | well
The film was ___ (bore). I fell asleep. | boring
I'm ___ (interest) in history. | interested
He ran ___ (fast). | fast
She works very ___. | hard | hardly / hardy / more hard
! He speaks English very good. | He speaks English very well.
! I am boring in this class. | I am bored in this class. / I'm bored in this class. # -ed = cómo te sientes
! She drives careful. | She drives carefully.
= Conduce despacio. | Drive slowly. / He drives slowly. / She drives slowly.
= La película fue aburrida. | The film was boring. / The movie was boring.
= Estoy cansado. | I am tired. / I'm tired.
`,
  /* ---------------- A2.2 ---------------- */
  quantifiers: `
How ___ (much / many) sugar do you want? | much
How ___ (much / many) people came? | many
There isn't ___ (some / any) bread. | any
I'd like ___ (some / any) water, please. | some
We have a ___ (lot of / many of) time. | lot of
There are ___ (a few / a little) apples left. | a few
I don't have ___ friends here. | many | much / a lot / some of
= ¿Cuánto cuesta? | How much is it? / How much does it cost? / How much is this?
= No tengo dinero. | I don't have any money. / I have no money. / I haven't got any money. / I do not have any money.
= Hay mucha gente. | There are a lot of people. / There are lots of people. / There are many people.
= ¿Tienes hermanos? | Do you have any brothers? / Do you have any brothers or sisters? / Have you got any brothers? / Do you have any siblings?
`,
  'future-basic': `
Look at those clouds! It ___ rain. | is going to | will to / goes to / is going
I'm tired. I think I ___ go to bed. | will | am going / going to / will to
"The phone is ringing." "I ___ get it!" | 'll | 'm going to / go to / am
We ___ visit my grandparents next weekend; we've already bought the tickets. | are going to | will to / go to / are going
I promise I ___ tell anyone. | won't | am not going / don't will / not will
She ___ have a baby in June. | is going to | will to / goes to / is go to
! I will to call you tomorrow. | I will call you tomorrow. / I'll call you tomorrow.
! She going to study medicine. | She is going to study medicine. / She's going to study medicine.
= Voy a comprar un coche. | I am going to buy a car. / I'm going to buy a car.
= Te ayudaré. | I will help you. / I'll help you.
= Mañana lloverá. | It will rain tomorrow. / It's going to rain tomorrow. / Tomorrow it will rain. / It is going to rain tomorrow.
`,
  'present-perfect-basic': `
I ___ (never / eat) sushi. | have never eaten / 've never eaten
She has ___ finished her homework. | just | yet / ever / still not
Have you ___ been to London? | ever | never / yet / already been
I haven't done it ___. | yet | already / just / ever
We've ___ seen that film. Let's watch another one. | already | yet / ever / still
He ___ his keys. He can't get in. | has lost | have lost / lost has / has lose
They ___ to Japan twice. | have been | have gone to / has been / were been
= ¿Has estado alguna vez en París? | Have you ever been to Paris?
= Acabo de llegar. | I have just arrived. / I've just arrived.
= Todavía no he comido. | I haven't eaten yet. / I have not eaten yet. / I haven't had lunch yet.
`,
  'modals-obligation': `
You ___ (must / not) smoke here. It's forbidden. | mustn't / must not
She ___ (have to) get up early every day. | has to
You ___ (should) see a doctor. | should
I ___ (not have to) work tomorrow. It's a holiday. | don't have to / do not have to
You ___ pay; it's free. | don't have to | mustn't / haven't to / don't must
You ___ touch that. It's dangerous! | mustn't | don't have to / haven't / not must
___ I wear a tie? | Do I have to | Have I to / Must I to / Do I must
! You don't must park here. | You mustn't park here. / You must not park here.
! He have to work on Saturdays. | He has to work on Saturdays.
! You should to rest. | You should rest.
= Tengo que irme. | I have to go. / I must go. / I have to leave. / I've got to go.
= No hace falta que vengas. | You don't have to come. / You do not have to come. / You don't need to come.
= Deberías estudiar más. | You should study more.
`,
  'verb-patterns-basic': `
I want ___ (go) home. | to go
She enjoys ___ (read). | reading
We decided ___ (stay). | to stay
He finished ___ (work) at six. | working
I hope ___ you soon. | to see | seeing / see / to seeing
Do you mind ___ the window? | opening | to open / open / opened
She needs ___ a new phone. | to buy | buying / buy / to buying
They avoid ___ at night. | driving | to drive / drive / to driving
= Quiero aprender inglés. | I want to learn English.
= Me encanta bailar. | I love dancing. / I love to dance.
= Decidimos esperar. | We decided to wait.
= Terminé de leer el libro. | I finished reading the book.
`,
  'indefinite-pronouns': `
There's ___ (alguien) at the door. | someone / somebody
I don't know ___ (nadie) here. | anyone / anybody
___ (nadie) came to the meeting. | No one / Nobody
Is there ___ (algo) to eat? | anything
I have ___ (nada) to say. | nothing
___ (todo el mundo) likes pizza. | Everyone / Everybody
I looked ___ but I couldn't find it. | everywhere | everything / anywhere / everyplace all
! I don't know nobody. | I don't know anybody. / I don't know anyone. / I know nobody. / I know no one.
! Everybody are happy. | Everybody is happy. / Everyone is happy.
= No hay nadie en casa. | There is nobody at home. / There's nobody at home. / There is no one at home. / There isn't anybody at home.
= ¿Quieres algo de beber? | Do you want something to drink? / Would you like something to drink? / Do you want anything to drink?
= No dije nada. | I didn't say anything. / I said nothing. / I did not say anything.
`,
  'fn-requests-offers': `
___ you help me with this, please? | Could | Do / Are / May you
Would you like ___ (sit) down? | to sit
___ I help you? | Can / Shall / May
Would you mind ___ (close) the door? | closing
I'd like a table for two, ___. | please | thanks you / if please / kindly you
! I want that you help me. | I want you to help me. / Could you help me? / Can you help me?
! Do you like a drink now? | Would you like a drink now?
! Can you to open the window? | Can you open the window? / Could you open the window?
= ¿Me puedes ayudar? | Can you help me? / Could you help me?
= ¿Quieres un café? | Would you like a coffee? / Do you want a coffee?
= ¿Le importaría abrir la ventana? | Would you mind opening the window?
= Sí, claro. | Yes, of course. / Sure. / Of course. / Yes, sure.
`,
  /* ---------------- B1.1 ---------------- */
  'pp-vs-past': `
I ___ my keys. Can you help me look for them? | have lost | lost / lose / had lost
She ___ here in 2020. | moved | has moved / moves / has been moving
Have you ever ___ (ride) a horse? | ridden
We ___ (not see) that film yet. | haven't seen / have not seen
When ___ (you / buy) your car? | did you buy
My grandfather ___ three books before he died. | wrote | has written / writes / has been writing
! I have seen him yesterday. | I saw him yesterday.
! Did you ever go to Japan? I've never been. | Have you ever been to Japan? I've never been.
= He perdido el móvil. | I have lost my phone. / I've lost my phone. / I have lost my mobile. / I've lost my mobile.
= Ayer vi a María. | I saw María yesterday. / I saw Maria yesterday. / Yesterday I saw María. / Yesterday I saw Maria.
`,
  'pp-continuous': `
You look tired. Have you been ___ (work) all day? | working
She ___ English for three years. | has been learning | is learning / learns / has been learned
How long ___ here? | have you been living | are you living / do you live / you have been living
I ___ ten emails this morning. | have written | have been writing / write / am writing
It ___ all day. Everything is wet. | has been raining | is raining / rains / has rain
! I am studying English since 2020. | I have been studying English since 2020. / I've been studying English since 2020.
! She has been knowing him for years. | She has known him for years. / She's known him for years.
! How long are you waiting? | How long have you been waiting?
= ¿Cuánto tiempo llevas esperando? | How long have you been waiting?
= Llevo dos horas trabajando. | I have been working for two hours. / I've been working for two hours.
= Ha estado lloviendo toda la noche. | It has been raining all night. / It's been raining all night.
`,
  'past-perfect': `
I didn't recognise her because she ___ her hair. | had cut | has cut / cut / was cutting
We ___ the film before, so we knew the ending. | had seen | have seen / saw / were seeing
He told me he ___ the job. | had got | has got / gets / was get
By the time I woke up, she ___ (leave). | had left / 'd left
I was hungry because I ___ (not eat) all day. | hadn't eaten / had not eaten
! After I have finished, I went home. | After I had finished, I went home. / After I finished, I went home.
! She said she has never been there. | She said she had never been there. / She said she'd never been there.
! I had went to bed when he called. | I had gone to bed when he called. / I'd gone to bed when he called.
= Ya se había ido cuando llegué. | He had already left when I arrived. / She had already left when I arrived. / He'd already left when I arrived. / She'd already left when I arrived.
= No había comido nada. | I hadn't eaten anything. / I had not eaten anything. / I had eaten nothing.
= Me dijo que había perdido las llaves. | He told me he had lost his keys. / She told me she had lost her keys. / He told me that he had lost his keys. / She told me that she had lost her keys.
`,
  'conditionals-012': `
If you heat ice, it ___. | melts | will melt / would melt / melted
If I ___ you, I'd apologise. | were | am / would be / will be
If it rains tomorrow, we ___ at home. | will stay | would stay / stay / stayed
What would you do if you ___ the lottery? | won | win / would win / will win
I'll call you if I ___ (have) time. | have
If I had more money, I ___ (travel) more. | would travel / 'd travel
! If I will see him, I will tell him. | If I see him, I will tell him. / If I see him, I'll tell him.
! If I would have time, I would help you. | If I had time, I would help you. / If I had time, I'd help you.
! If she studies, she would pass. | If she studies, she will pass. / If she studied, she would pass. / If she studies, she'll pass.
= Si llueve, no iré. | If it rains, I won't go. / If it rains, I will not go.
= Si tuviera tiempo, te ayudaría. | If I had time, I would help you. / If I had time, I'd help you.
= Yo en tu lugar, no lo haría. | If I were you, I wouldn't do it. / If I were you, I would not do it. / I wouldn't do it if I were you.
`,
  'few-little': `
I have ___ (a few / a little) friends in London. | a few
There's ___ (a few / a little) milk left. | a little
___ (few / little) people know the truth. | Few
We have very ___ (few / little) time. | little
Can I ask you ___ (a few / a little) questions? | a few
! I have a little friends here. | I have a few friends here.
! There is few water in the bottle. | There is little water in the bottle. / There's little water in the bottle. / There is not much water in the bottle.
! He has few money. | He has little money. / He doesn't have much money.
= Tengo unos pocos amigos. | I have a few friends. / I've got a few friends.
= Queda un poco de café. | There is a little coffee left. / There's a little coffee left. / There is some coffee left.
= Poca gente lo sabe. | Few people know it. / Few people know. / Not many people know it. / Not many people know.
`,
  'fn-agree': `
"I love this song." "___" | So do I. | So I do. / Neither do I. / I love too.
"I can't swim." "___" | Neither can I. | So can I. / Neither I can. / Me too.
"I think we should wait." "I ___ with you." | agree | am agree / am agreeing / agree to
! I'm not agree. | I don't agree. / I disagree. / I do not agree.
! Neither I do. | Neither do I. / Me neither.
! I am disagree with that. | I disagree with that. / I don't agree with that.
= Estoy de acuerdo contigo. | I agree with you.
= Yo tampoco. | Neither do I. / Me neither. / Nor do I.
= No estoy tan seguro de eso. | I'm not so sure about that. / I am not so sure about that.
= Tienes razón. | You are right. / You're right.
`,
  'fn-opinions': `
___ my opinion, it's too expensive. | In | On / For / At
What do you think ___ the new teacher? | of | in / on / for
As far as I'm ___, it's a good idea. | concerned | concerning / concern / worried
I ___ it's a mistake. | think | am thinking that / think so that / opine
! According to me, it's wrong. | In my opinion, it's wrong. / I think it's wrong. # «According to» solo con otras personas
! I am thinking that he is right. | I think that he is right. / I think he is right. / I think he's right.
! What do you think about to move? | What do you think about moving?
= En mi opinión, es una buena idea. | In my opinion, it is a good idea. / In my opinion, it's a good idea.
= ¿Qué opinas? | What do you think? / What's your opinion?
= No creo que sea verdad. | I don't think it is true. / I don't think it's true. / I don't think that's true.
= Desde mi punto de vista, es caro. | From my point of view, it is expensive. / From my point of view, it's expensive. / In my view, it's expensive. / In my view, it is expensive.
`,
  'fn-clarification': `
Sorry, could you ___ that, please? | repeat | say again me / tell again / repeat me
What do you ___ by "soon"? | mean | say / want / tell
Could you speak more ___, please? | slowly | slow / slower please more / slowness
I'm sorry, I didn't ___ that. | catch | take / hear to / listen
! Can you repeat me the question? | Can you repeat the question? / Could you repeat the question?
! What means "deadline"? | What does "deadline" mean?
! How do you call this in English? | What do you call this in English? / What is this called in English? / What's this called in English?
= ¿Puedes repetir, por favor? | Can you repeat that, please? / Could you repeat that, please? / Can you say that again, please? / Could you say that again, please?
= ¿Qué significa esta palabra? | What does this word mean?
= No entiendo. | I don't understand. / I do not understand.
= ¿Cómo se escribe? | How do you spell it? / How do you spell that? / How is it spelt? / How is it spelled?
`,
  /* ---------------- B1.2 ---------------- */
  'passive-basic': `
English ___ all over the world. | is spoken | speaks / is speaking / spoken
The window ___ yesterday. | was broken | broke itself / is broken by / has broke
These cars ___ in Germany. | are made | make / are making / is made
The letter ___ (send) last week. | was sent
Breakfast ___ (serve) from seven to ten. | is served
! The house built in 1990. | The house was built in 1990.
! My bike was stole. | My bike was stolen.
! The book was wrote by Orwell. | The book was written by Orwell.
= Mi coche fue robado ayer. | My car was stolen yesterday.
= Aquí se habla español. | Spanish is spoken here.
= La casa fue construida en 1950. | The house was built in 1950.
`,
  'relative-defining': `
The woman ___ (who / which) lives next door is a nurse. | who
This is the book ___ (who / which) I told you about. | which
That's the hotel ___ (where / which) we stayed. | where
He's the man ___ (who / whose) car was stolen. | whose
The film ___ we saw last night was great. | that | who / what / whose
I know a shop ___ you can buy it. | where | which / that it / who
! The man which called is my boss. | The man who called is my boss. / The man that called is my boss.
! That's the girl who her father is a pilot. | That's the girl whose father is a pilot.
! The book what I read was good. | The book that I read was good. / The book which I read was good. / The book I read was good.
= La chica que vive aquí es mi amiga. | The girl who lives here is my friend. / The girl that lives here is my friend.
= Es el sitio donde nos conocimos. | It is the place where we met. / It's the place where we met. / That's the place where we met.
= El libro que compré es caro. | The book I bought is expensive. / The book that I bought is expensive. / The book which I bought is expensive.
`,
  'reported-statements': `
"I'm tired." → She said she ___ tired. | was
"I will call you." → He said he ___ call me. | would
"I have finished." → She said she ___ finished. | had
"I can swim." → He said he ___ swim. | could
She ___ me she was busy. | told | said / told to / say
He said that he ___ the film the day before. | had seen | has seen / sees / saw the
! He said me that he was ill. | He told me that he was ill. / He said that he was ill. / He told me he was ill. / He said he was ill.
! She told that she is coming. | She said that she was coming. / She said she was coming.
! He said he will help me yesterday. | He said he would help me yesterday. / Yesterday he said he would help me.
= Dijo que estaba cansado. | He said he was tired. / He said that he was tired.
= Me dijo que vendría. | He told me he would come. / She told me she would come. / He told me that he would come. / She told me that she would come.
= Dijeron que lo habían visto. | They said they had seen it. / They said that they had seen it. / They said they had seen him.
`,
  'used-to': `
I ___ smoke, but I stopped two years ago. | used to | use to / am used to / was used to
I'm not used to ___ up so early. | getting | get / got / to get
Did you ___ live in Madrid? | use to | used to / using to / use
She ___ (not / use to) like vegetables. | didn't use to / did not use to
It took me months to get used to ___ (drive) on the left. | driving
! Nowadays I use to go to the gym every day. | Nowadays I usually go to the gym every day. / Nowadays I go to the gym every day. # Para el presente: usually
! I am used to get up early. | I am used to getting up early. / I'm used to getting up early.
! Did you used to play football? | Did you use to play football?
= Antes vivía en Londres. | I used to live in London.
= Estoy acostumbrado al frío. | I am used to the cold. / I'm used to the cold.
= Antes no me gustaba el café. | I didn't use to like coffee. / I did not use to like coffee. / I never used to like coffee.
`,
  'modals-deduction': `
She's not answering. She ___ be asleep. | must | can / mustn't / has
That ___ be true! It's impossible. | can't | mustn't / don't must / might
He ___ be at home; I'm not sure. | might | must / can't / has to
They ___ be rich: they have three houses. | must | can't / should to / might not
It ___ (must / be) very late. Everything is closed. | must be
She ___ (can't / be) hungry. She's just eaten. | can't be / cannot be
! He mustn't be at home; the lights are off. | He can't be at home; the lights are off. / He cannot be at home; the lights are off.
! She can be ill; I don't know. | She might be ill; I don't know. / She may be ill; I don't know. / She could be ill; I don't know.
! It must to be a mistake. | It must be a mistake.
= Debe de estar cansado. | He must be tired.
= No puede ser verdad. | It can't be true. / It cannot be true. / That can't be true.
= Puede que esté en casa. | He might be at home. / She might be at home. / He may be at home. / She may be at home.
`,
  'too-enough-so-such': `
The soup is ___ (too / enough) hot to eat. | too
He isn't old ___ (too / enough) to drive. | enough
It was ___ (so / such) a good film! | such
I was ___ (so / such) tired that I fell asleep. | so
There are ___ people here. Let's go. | too many | too much / too / so much
We don't have ___ to finish. | enough time | time enough / too time / enough of time
! She is enough tall to play basketball. | She is tall enough to play basketball. / She's tall enough to play basketball.
! It was a so good day. | It was such a good day.
! I have too much friends. | I have too many friends.
= Es demasiado caro. | It is too expensive. / It's too expensive.
= No tengo suficiente dinero. | I don't have enough money. / I do not have enough money. / I haven't got enough money.
= Fue un día tan bonito. | It was such a beautiful day. / It was such a lovely day. / It was such a nice day.
`,
  'questions-indirect': `
It's cold, ___? (question tag) | isn't it
You like coffee, ___? (question tag) | don't you
She can't swim, ___? (question tag) | can she
They went home, ___? (question tag) | didn't they
Could you tell me where ___? | the station is | is the station / does the station is / the station it is
Do you know what time ___? | the film starts | does the film start / starts the film / the film does start
I wonder ___ she is married. | if | that / what / does
! Can you tell me where is the bank? | Can you tell me where the bank is? / Could you tell me where the bank is?
! Do you know what does he want? | Do you know what he wants?
= ¿Sabes dónde vive? | Do you know where he lives? / Do you know where she lives?
= ¿Me puede decir qué hora es? | Could you tell me what time it is? / Can you tell me what time it is?
= Hace calor, ¿verdad? | It's hot, isn't it? / It is hot, isn't it? / It's warm, isn't it?
`,
  'gerund-infinitive-b1': `
My parents let me ___ (go) to the party. | go
The teacher made us ___ (write) an essay. | write
They don't allow us ___ (use) phones. | to use
I had my hair ___ (cut) yesterday. | cut
She made me ___ for an hour. | wait | to wait / waiting / waited
We aren't allowed ___ here. | to park | park / parking / parked
I ___ my car repaired last week. | had | made / did / let
! My boss made me to work late. | My boss made me work late.
! They let me to leave early. | They let me leave early.
! I cut my hair at the hairdresser's yesterday. | I had my hair cut at the hairdresser's yesterday. / I got my hair cut at the hairdresser's yesterday. # Otra persona lo hace: have + objeto + participio
= Mis padres no me dejan salir. | My parents don't let me go out. / My parents do not let me go out. / My parents won't let me go out.
= Me hizo esperar. | He made me wait. / She made me wait.
= Me van a arreglar el coche. | I'm going to have my car repaired. / I am going to have my car repaired. / I'm having my car repaired. / I'm going to get my car repaired.
`,
  'passive-tenses': `
The road ___ (repair) at the moment. | is being repaired
The work ___ (finish) by next week. (future) | will be finished
The thief ___ (catch) already. | has been caught / has already been caught
The email must ___ (send) today. | be sent
The room ___ when I arrived. | was being cleaned | was cleaning / is being cleaned / has cleaned
! The bridge is building now. | The bridge is being built now.
! The results will announced tomorrow. | The results will be announced tomorrow.
! The letter has sent. | The letter has been sent.
! This must to be done today. | This must be done today.
= Están reparando la carretera. | The road is being repaired. / They are repairing the road. / They're repairing the road.
= Se ha tomado una decisión. | A decision has been made. / A decision has been taken.
= El paquete será entregado mañana. | The parcel will be delivered tomorrow. / The package will be delivered tomorrow.
`,
  'fn-refusal': `
I'd love to, ___ I'm busy on Friday. | but | so / and that / however that
I'm ___ I can't come. | afraid | scared / fear / sorry for
Thanks for the offer, but I'll ___ this time. | pass | refuse it you / no / leave
! I can't to come, sorry. | I can't come, sorry. / Sorry, I can't come.
! No, I don't want it, thanks you. | No, I don't want it, thank you. / No, I don't want it, thanks.
! I'm afraid that no. | I'm afraid not.
= Me encantaría, pero no puedo. | I'd love to, but I can't. / I would love to, but I can't.
= Me temo que no. | I'm afraid not. / I am afraid not.
= Quizá en otra ocasión. | Maybe another time. / Perhaps another time. / Maybe some other time.
= Gracias, pero no hace falta. | Thanks, but there's no need. / Thank you, but there's no need. / Thanks, but it's not necessary. / Thanks, but that's not necessary.
`,
  'fn-probability': `
It will ___ (probable) rain tomorrow. | probably
She is ___ (like) to win. | likely
There's a good ___ that he'll come. | chance | probable / possible / luck
I ___ if they'll arrive on time. | doubt | am doubt / don't sure / doubt that not
He ___ won't come. | probably | won't probably / probable / likely to
! It's probable that he will comes. | He will probably come. / It's likely that he will come. / He is likely to come. / He'll probably come.
! Maybe it will raining. | Maybe it will rain. / It might rain.
! He probably will not to come. | He probably won't come. / He probably will not come.
= Probablemente llegue tarde. | I will probably be late. / I'll probably be late. / I'll probably arrive late.
= Es poco probable. | It is unlikely. / It's unlikely. / It's not very likely.
= Seguro que gana. | He is sure to win. / She is sure to win. / He's sure to win. / I'm sure he'll win.
`,
};

export const GRAMMAR_MORE: Record<string, string> = { ...MORE_1, ...GRAMMAR_MORE_2 };
