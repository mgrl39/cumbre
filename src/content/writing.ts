import type { Level, WritingPrompt } from '../core/types.ts';

/* Mismo mini-DSL que gramática:  ! error | corrección   > original | KEY | inicio ___ | respuesta   = español | inglés   hueco | correcta | distractores */
export const WRITING_BLOCKS: { id: string; level: Level; list: string }[] = [
  {
    id: 'err-a', level: 'A2', list: `
! People is very friendly here. | People are very friendly here. # people es plural
! I have 20 years. | I am 20. / I'm 20. / I am 20 years old. / I'm 20 years old.
! It depends of the weather. | It depends on the weather.
! Can you explain me this? | Can you explain this to me?
! She is more taller than me. | She is taller than me. / She's taller than me.
! I am agree with you. | I agree with you.
! He doesn't likes football. | He doesn't like football.
! I want that you help me. | I want you to help me.
! Yesterday I go to the cinema. | Yesterday I went to the cinema.
! My brother has a car very fast. | My brother has a very fast car.
! I went to the shop for buy bread. | I went to the shop to buy bread.
! I'm living here since 2020. | I've lived here since 2020. / I have lived here since 2020. / I've been living here since 2020. / I have been living here since 2020.
! She said me the truth. | She told me the truth.
! We discussed about the problem. | We discussed the problem.
! I'm married with a doctor. | I'm married to a doctor. / I am married to a doctor.
! Is very important to study. | It is very important to study. / It's very important to study.
`,
  },
  {
    id: 'err-b', level: 'B1', list: `
! The life is very expensive in Madrid. | Life is very expensive in Madrid.
! I need some advices about my career. | I need some advice about my career.
! There are many informations on the website. | There is a lot of information on the website. / There is much information on the website.
! He suggested me to apply for the job. | He suggested that I apply for the job. / He suggested that I should apply for the job. / He suggested I apply for the job. / He suggested applying for the job.
! I am looking forward to meet you. | I am looking forward to meeting you. / I'm looking forward to meeting you.
! Although it was raining, but we went out. | Although it was raining, we went out.
! Despite of the problems, the project was a success. | Despite the problems, the project was a success. / In spite of the problems, the project was a success.
! If I would have money, I would travel more. | If I had money, I would travel more. / If I had money, I'd travel more.
! I didn't use to went out much. | I didn't use to go out much.
! The people think that the government is wrong. | People think that the government is wrong. / People think the government is wrong.
! I assisted to a conference last week. | I attended a conference last week.
! Actually I work as a teacher, since 2019. | Currently I work as a teacher, since 2019. / I currently work as a teacher, since 2019. # actually ≠ actualmente
! She made me a question. | She asked me a question.
! In the other hand, it is expensive. | On the other hand, it is expensive.
! How it is called in English? | What is it called in English?
! This research show that sleep matters. | This research shows that sleep matters.
`,
  },
  {
    id: 'err-c', level: 'B2', list: `
! The number of students have increased. | The number of students has increased.
! A number of studies has shown this. | A number of studies have shown this.
! The results was surprising. | The results were surprising.
! The data shows a clear tendency. | The data show a clear trend. / The data shows a clear trend. # tendency ≈ inclinación personal; trend = tendencia de datos
! It is important that he doesn't miss the deadline. | It is important that he not miss the deadline. / It is important that he should not miss the deadline. / It is important for him not to miss the deadline.
! The phenomena was studied in detail. | The phenomenon was studied in detail. / The phenomena were studied in detail.
! This is one of the most important problem. | This is one of the most important problems.
! Each of the participants were interviewed. | Each of the participants was interviewed.
! I'm used to work under pressure. | I'm used to working under pressure. / I am used to working under pressure.
! We need to make a research about this. | We need to do research on this. / We need to carry out research on this. / We need to do some research on this. / We need to conduct research on this.
! The informations were collected in 2021. | The information was collected in 2021.
! Neither the teacher nor the students was ready. | Neither the teacher nor the students were ready.
`,
  },
  {
    id: 'tr-b1', level: 'B1', list: `
= Llevo tres años viviendo aquí. | I have been living here for three years. / I've been living here for three years. / I have lived here for three years. / I've lived here for three years.
= Si fuera tú, no lo haría. | If I were you, I wouldn't do it. / If I were you, I would not do it. / If I was you, I wouldn't do it.
= Me cuesta entender a los nativos. | I find it hard to understand native speakers. / It's hard for me to understand native speakers. / I find it difficult to understand native speakers. / It is difficult for me to understand native speakers.
= Hace mucho que no la veo. | I haven't seen her for a long time. / I haven't seen her in a long time. / I have not seen her for a long time.
= Depende de lo que digas. | It depends on what you say.
= Tengo ganas de verte. | I'm looking forward to seeing you. / I am looking forward to seeing you. / I can't wait to see you.
= Ya no fumo. | I don't smoke anymore. / I don't smoke any more. / I no longer smoke.
= Acabo de llegar. | I have just arrived. / I've just arrived. / I just arrived.
= ¿Cuánto tiempo se tarda en llegar? | How long does it take to get there?
= Se me olvidó llamarte. | I forgot to call you. / I forgot to phone you.
= No hace falta que vengas. | You don't have to come. / You don't need to come. / You needn't come.
= Es la primera vez que vengo aquí. | It's the first time I've been here. / It is the first time I have been here. / This is the first time I've been here. / This is the first time I have been here. / It's the first time I've come here.
`,
  },
  {
    id: 'tr-b2', level: 'B2', list: `
= Ojalá hubiera estudiado medicina. | I wish I had studied medicine. / I wish I'd studied medicine. / If only I had studied medicine.
= Deberías haberme avisado. | You should have told me. / You should have warned me. / You should have let me know.
= Me hice la foto del pasaporte ayer. | I had my passport photo taken yesterday. / I got my passport photo taken yesterday.
= Se cree que el edificio es del siglo XV. | The building is believed to be from the 15th century. / It is believed that the building is from the 15th century. / The building is thought to date from the 15th century. / The building is believed to date from the 15th century.
= Por mucho que lo intente, no lo entiendo. | However hard I try, I don't understand it. / No matter how hard I try, I don't understand it. / However much I try, I can't understand it. / No matter how hard I try, I can't understand it.
= Cuanto antes empecemos, mejor. | The sooner we start, the better.
= No me importa esperar. | I don't mind waiting.
= Debe de haberse perdido. | He must have got lost. / She must have got lost. / He must have gotten lost. / She must have gotten lost. / It must have got lost. / It must have been lost.
= Tardé dos horas en acabar el informe. | It took me two hours to finish the report.
= Prefiero que no se lo digas a nadie. | I'd rather you didn't tell anyone. / I would rather you didn't tell anyone. / I'd prefer you not to tell anyone. / I'd rather you didn't tell anybody.
`,
  },
  {
    id: 'tr-c1', level: 'C1', list: `
= En ningún caso debe abrirse esta puerta. | Under no circumstances should this door be opened. / On no account should this door be opened.
= No solo llegó tarde, sino que además se olvidó los documentos. | Not only did he arrive late, but he also forgot the documents. / Not only did she arrive late, but she also forgot the documents. / Not only was he late, but he also forgot the documents.
= Lo que más me preocupa es la falta de tiempo. | What worries me most is the lack of time. / What worries me the most is the lack of time. / The thing that worries me most is the lack of time.
= Es imprescindible que todos los datos sean verificados. | It is essential that all the data be verified. / It is essential that all data be verified. / It is essential that all the data are verified. / It is essential that all the data should be verified.
= Habiendo terminado el análisis, redactaron las conclusiones. | Having finished the analysis, they wrote the conclusions. / Having completed the analysis, they wrote the conclusions. / Having finished the analysis, they drew up the conclusions.
= Cabría argumentar que la medida fue un fracaso. | It could be argued that the measure was a failure. / It could be argued that the measure failed.
= Los resultados parecen confirmar la hipótesis. | The results appear to confirm the hypothesis. / The results seem to confirm the hypothesis.
= Si no fuera por tu ayuda, no lo habría conseguido. | If it hadn't been for your help, I wouldn't have managed it. / Had it not been for your help, I wouldn't have managed it. / If it hadn't been for your help, I wouldn't have succeeded. / If it weren't for your help, I wouldn't have managed it. / Had it not been for your help, I would not have succeeded.
`,
  },
  {
    id: 'tf-b1', level: 'B1', list: `
> I haven't been to the cinema for ages. | LAST | It's ages since I ___ the cinema. | last went to
> It isn't necessary to bring food. | HAVE | You ___ bring food. | don't have to / do not have to
> She started learning English five years ago. | BEEN | She ___ English for five years. | has been learning / 's been learning
> "I'll help you," she said to me. | WOULD | She said that she ___ me. | would help
> The film was so boring that I fell asleep. | SUCH | It was ___ that I fell asleep. | such a boring film
> I prefer tea to coffee. | RATHER | I'd ___ coffee. | rather have tea than / rather drink tea than
> This is the best book I've ever read. | NEVER | I have ___ book. | never read a better / never read such a good
> We couldn't go out because of the rain. | PREVENTED | The rain ___ going out. | prevented us from
> It's possible that he's at home. | MIGHT | He ___ home. | might be at
> They built this bridge in 1890. | WAS | This bridge ___ 1890. | was built in
`,
  },
  {
    id: 'tf-b2', level: 'B2', list: `
> I regret not accepting the offer. | WISH | I ___ the offer. | wish I had accepted / wish I'd accepted
> It was a mistake to tell him. | SHOULDN'T | I ___ him. | shouldn't have told / should not have told
> People say he is a millionaire. | SAID | He ___ a millionaire. | is said to be
> They will probably cancel the match. | LIKELY | The match ___ cancelled. | is likely to be
> "You stole the money!" she said to him. | ACCUSED | She ___ the money. | accused him of stealing / accused him of having stolen
> I didn't know the answer, so I didn't say anything. | IF | ___ the answer, I would have said something. | If I had known / If I'd known
> The mechanic is going to repair my car tomorrow. | HAVE | I'm going to ___ tomorrow. | have my car repaired
> Although he was tired, he kept working. | DESPITE | ___ tired, he kept working. | Despite being / Despite feeling
> She didn't apologise at all. | NO | She made ___ apologise. | no attempt to / no effort to
> I'm sure she didn't see us. | CAN'T | She ___ us. | can't have seen / cannot have seen
> It's not worth arguing about it. | POINT | There's ___ about it. | no point in arguing / no point arguing
> We had hardly any time left. | RUN | We had almost ___ time. | run out of
`,
  },
  {
    id: 'tf-c1', level: 'C1', list: `
> I had never seen such a beautiful view. | NEVER | ___ such a beautiful view. | Never had I seen
> She not only sings but also dances. | ONLY | Not ___ but she also dances. | only does she sing
> We will only succeed if we work together. | ONLY | ___ will we succeed. | Only if we work together
> I didn't realise my mistake until later. | DID | Only later ___ my mistake. | did I realise / did I realize
> If you need any help, call me. | SHOULD | ___ any help, call me. | Should you need
> The project failed mainly because it lacked funding. | LACK | The project failed ___ funding. | mainly due to a lack of / mainly owing to a lack of / mainly because of a lack of / mainly because of the lack of
> The idea interested me but the price didn't. | WHAT | ___ the idea, not the price. | What interested me was
> There's no chance that he will agree. | MEANS | He will ___ agree. | by no means / in no way
> Everyone was surprised when she resigned. | CAME | Her resignation ___ everyone. | came as a surprise to
> It doesn't matter how hard you try; you won't convince him. | HOWEVER | ___ you try, you won't convince him. | However hard
`,
  },
  {
    id: 'lk-b1', level: 'B1', list: `
The hotel was expensive. ___, the service was excellent. | However | Because / Although / So
I stayed at home ___ I was ill. | because | because of / although / so that
It was raining, ___ we took a taxi. | so | because / although / however
I study English ___ I can work abroad. | so that | because of / although / such
___ the traffic, we arrived on time. | Despite | Although / However / Because
She speaks French ___ German. | as well as | moreover / in addition / besides of
I'll call you ___ I arrive. | as soon as | during / while / since
`,
  },
  {
    id: 'lk-b2', level: 'B2', list: `
The policy was unpopular. ___, it was effective. | Nevertheless | Whereas / Despite / Although
Some people prefer cities, ___ others prefer the countryside. | whereas | however / despite / therefore
Sales fell; ___, the company had to cut jobs. | consequently | whereas / albeit / despite
Several factors, ___ cost and time, were considered. | namely | thus / hence / whereas
The flight was delayed ___ bad weather. | owing to | because / since / although
___ the study had limitations, its findings are useful. | Although | Despite / However / Nevertheless
___ the results, more research is needed. | In light of | Albeit / Whereas / Hence
`,
  },
  {
    id: 'lk-c1', level: 'C1', list: `
The reform was successful, ___ only partially. | albeit | although / despite / whereas
The company invested in training, ___ improving productivity. | thereby | whereby / whereas / hence of
They introduced a scheme ___ employees could buy shares. | whereby | thereby / hence / whereas
___ the difficulties, the team met the deadline. | Notwithstanding | Albeit / Whereas / Insofar
The theory is useful ___ it explains the observed data. | insofar as | albeit / whereby / so as
Prices rose; ___, demand fell. | conversely | whereby / albeit / notwithstanding
`,
  },
];

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'wp-a2-intro', level: 'A2', genre: 'Email informal', title: 'Preséntate a tu nuevo profesor',
    task: 'Write an email to your new English teacher. Introduce yourself: where you are from, what you do, why you are learning English and what you find difficult.',
    min: 60, max: 100,
    tips: ['Empieza con «Hi/Dear …» y cierra con «Best wishes».', 'Usa present simple para rutinas y «I want to / I would like to» para objetivos.', 'Conecta ideas con and, but, because, so.'],
    model: `Dear Ms Taylor,

My name is Javier and I'm from Zaragoza, in Spain. I'm 27 and I work as a software developer in a small company.

I'm learning English because I need it for my job. I read a lot of technical documents in English and sometimes I have meetings with clients from other countries. I can understand quite a lot, but I find speaking difficult because I'm not confident. Grammar is also a problem for me, especially the past tenses.

I would like to improve my writing and speaking this year. I hope your classes will help me.

Best wishes,
Javier`,
  },
  {
    id: 'wp-b1-story', level: 'B1', genre: 'Narración', title: 'Un día que salió mal',
    task: 'Write a short story that begins with this sentence: "As soon as I opened the door, I knew something was wrong."',
    min: 120, max: 180,
    tips: ['Mezcla past simple (acciones), past continuous (fondo) y past perfect (lo anterior).', 'Usa conectores de tiempo: then, after that, suddenly, eventually, by the time.', 'Añade sentimientos: I felt…, I was shocked/relieved…'],
    model: `As soon as I opened the door, I knew something was wrong. The lights were off, although I had left them on that morning, and there was a strange smell in the air.

I walked slowly into the kitchen. The window was open and the curtains were moving in the wind. My heart was beating fast. Someone had been in my flat.

I picked up my phone and was about to call the police when I heard a noise behind me. I turned around, terrified — and saw my neighbour's cat sitting on the sofa, looking at me as if I was the intruder.

It turned out that I had forgotten to close the window, the cat had climbed in, and it had knocked over a bottle of vinegar. As for the lights, the electricity had gone off during a storm.

I laughed with relief, but since then I have always checked the windows twice before leaving home.`,
  },
  {
    id: 'wp-b1-opinion', level: 'B1', genre: 'Opinión', title: '¿Deberían los deberes desaparecer?',
    task: 'Some people think that schools should stop giving homework. Do you agree? Give reasons and examples.',
    min: 140, max: 190,
    tips: ['Párrafo 1: presenta el tema y tu opinión.', 'Párrafos 2–3: un argumento por párrafo, con ejemplo.', 'Conclusión: resume con «In conclusion / Overall».', 'Usa: In my opinion, Firstly, What is more, However, For example.'],
    model: `Many people believe that homework puts too much pressure on children and should be banned. In my opinion, homework is useful, but schools should give less of it and choose it more carefully.

Firstly, homework helps students to practise what they have learned in class. For example, it is very difficult to learn maths or a language without doing exercises regularly. It also teaches children to organise their time and work independently, which are important skills for the future.

However, too much homework can have negative effects. Many students spend hours every evening on tasks that are repetitive and boring, so they have no time for sport, hobbies or their families. As a result, some of them become stressed and lose interest in learning.

In conclusion, I do not think that homework should disappear completely. Instead, teachers should give short, meaningful tasks that really help students to learn.`,
  },
  {
    id: 'wp-b2-essay', level: 'B2', genre: 'Ensayo (for & against)', title: 'Teletrabajo: ¿ventaja o problema?',
    task: 'Write an essay discussing the advantages and disadvantages of working from home. Give your own opinion in the conclusion.',
    min: 200, max: 260,
    tips: ['Estructura: intro – ventajas – desventajas – conclusión con opinión.', 'Usa conectores variados: Moreover, Consequently, On the other hand, Nevertheless, Whereas.', 'Incluye al menos una pasiva, una relativa y un condicional.', 'Evita «I think» repetido: It could be argued that…, There is no doubt that…'],
    model: `Over the last few years, working from home has gone from being a rare privilege to an everyday reality for millions of employees. While this shift has brought clear benefits, it has also created new challenges that should not be overlooked.

On the one hand, remote work offers considerable flexibility. Employees who no longer have to commute save both time and money, which can significantly improve their quality of life. Moreover, many people report being more productive at home, where there are fewer interruptions than in a busy open-plan office. Companies, for their part, can reduce costs and recruit talent regardless of location.

On the other hand, working from home is not without drawbacks. Many workers feel isolated, and the informal exchanges that take place in an office — which often lead to new ideas — are difficult to reproduce online. Furthermore, the boundary between professional and personal life can become blurred, so some employees end up working longer hours. Younger staff, who learn a great deal by observing experienced colleagues, may be particularly disadvantaged.

In conclusion, although remote work has undeniable advantages, I believe that a hybrid model is the most sensible option. If companies combine the flexibility of home working with regular time in the office, they are likely to benefit from the best of both worlds.`,
  },
  {
    id: 'wp-b2-formal', level: 'B2', genre: 'Email formal', title: 'Reclamación a una academia online',
    task: 'You paid for an online course, but the materials were not available on time and the support team did not answer your messages. Write a formal email to complain and say what you expect them to do.',
    min: 150, max: 200,
    tips: ['Registro formal: nada de contracciones, «Dear Sir or Madam».', 'Explica los hechos en orden, con fechas.', 'Peticiones educadas: I would be grateful if…, I would appreciate it if…', 'Cierre: I look forward to hearing from you. Yours faithfully,'],
    model: `Dear Sir or Madam,

I am writing to complain about the Advanced Data Analysis course, which I purchased on 3rd March.

According to your website, all course materials were to be available from 10th March. However, the first three modules were not uploaded until 28th March, by which time I had already missed two of the live sessions. Furthermore, I contacted your support team on four occasions, both by email and through the online form, but I have not received a single reply.

As a result, I have been unable to follow the course as planned, and I feel that the service I have received does not correspond to the description on your website or to the price I paid.

I would therefore be grateful if you could either extend my access to the course by one month at no extra cost or provide a partial refund. I would also appreciate an explanation of why my messages were not answered.

I look forward to hearing from you.

Yours faithfully,
Laura Gómez`,
  },
  {
    id: 'wp-b2-summary', level: 'B2', genre: 'Resumen', title: 'Resume un artículo',
    task: 'Read "The attention economy" in Reading (B2) and write a summary of its main ideas in your own words. Do not copy sentences from the text.',
    min: 100, max: 150,
    tips: ['Empieza: «The article discusses / argues that…».', 'Solo ideas principales, sin ejemplos menores ni opinión propia.', 'Parafrasea: cambia estructuras y vocabulario (engaging → designed to hold our attention).', 'Verbos de reporte: the author claims, points out, suggests, concludes.'],
    model: `The article argues that, in the digital era, human attention has become an extremely valuable commodity. Although most apps and social networks are free to use, the author points out that users effectively pay for them with their time and personal data, since the platforms earn money from advertising.

For this reason, these services are deliberately designed to keep people online for as long as possible, using techniques such as endless feeds and personalised suggestions. The writer notes that some research has associated intensive use with anxiety and sleep problems, especially among adolescents, but stresses that the evidence is not yet conclusive.

Finally, the article describes how both individuals and governments are beginning to respond, and concludes by inviting readers to consider the real price of "free" products.`,
  },
  {
    id: 'wp-c1-essay', level: 'C1', genre: 'Ensayo académico', title: '¿Debe la universidad ser gratuita?',
    task: 'Write an academic essay discussing whether university education should be free for all students. Consider economic, social and educational arguments and reach a reasoned conclusion.',
    min: 260, max: 340,
    tips: ['Tesis clara en la introducción.', 'Hedging: it could be argued, arguably, to a certain extent, tends to.', 'Estructuras C1: inversión (Not only…), cleft (What is often overlooked is…), participle clauses.', 'Concesión antes de refutar: Admittedly…, While it is true that…, this does not necessarily mean…'],
    model: `Whether higher education should be funded entirely by the state is a question that divides policymakers across the world. While the principle of free tuition is undeniably appealing, I would argue that its effectiveness depends less on the price itself than on how access and quality are guaranteed.

Proponents of free university education contend that it is a matter of equal opportunity. Tuition fees, they argue, discourage talented students from low-income backgrounds, who tend to be more averse to debt. Moreover, a highly educated population generates benefits for society as a whole — higher tax revenues, better public health and greater civic participation — which arguably justify public investment.

Admittedly, these arguments carry considerable weight. What is often overlooked, however, is that abolishing fees does not automatically widen participation. In several countries with free tuition, the proportion of students from disadvantaged families remains stubbornly low, largely because inequalities emerge long before university. Not only do wealthier students benefit disproportionately from free places, but universities deprived of fee income may also struggle to maintain quality unless public funding increases substantially.

Critics therefore propose alternatives, such as income-contingent loans, whereby graduates repay only once they earn above a certain threshold, combined with generous grants for the poorest students. Such systems, it could be argued, preserve access while distributing costs more fairly between graduates and taxpayers.

In conclusion, free tuition is neither a guarantee of fairness nor an inherently wasteful policy. Were governments to focus on early education, financial support and institutional quality, the question of fees would become considerably less decisive than public debate tends to suggest.`,
  },
  {
    id: 'wp-c1-report', level: 'C1', genre: 'Informe', title: 'Informe sobre hábitos de estudio',
    task: 'A survey of 500 university students found that 68% study with their phone nearby, 45% sleep less than 7 hours during exams and only 22% use spaced repetition. Write a report presenting the findings and making recommendations.',
    min: 220, max: 300,
    tips: ['Usa títulos: Introduction, Findings, Recommendations.', 'Lenguaje de datos: a significant proportion, just under half, the vast majority, only a minority.', 'Recomendaciones con: It is recommended that…, Students would benefit from…, should be encouraged to…', 'Tono impersonal y pasivas.'],
    model: `Introduction
The aim of this report is to present the main findings of a survey on study habits conducted among 500 university students, and to make recommendations for improving academic performance.

Findings
The most striking finding is that over two thirds of respondents (68%) admitted to studying with their mobile phone within reach. Given the extensive research linking digital interruptions to reduced concentration, this is a cause for concern.
Sleep patterns also appear to be problematic. Just under half of the students surveyed reported sleeping fewer than seven hours a night during exam periods, precisely when adequate rest is most important for consolidating memory.
Finally, only a small minority (22%) make use of spaced repetition, despite its well-documented effectiveness for long-term retention. Most students instead rely on rereading their notes, a strategy that tends to create an illusion of knowledge rather than genuine learning.

Recommendations
In light of these findings, it is recommended that the university run short workshops on evidence-based study techniques, with particular emphasis on spaced repetition and self-testing. Students should also be encouraged to keep their phones in another room while studying, or to use applications that block notifications.
Furthermore, the university would benefit from scheduling exams in a way that allows students sufficient rest, and from raising awareness of the role sleep plays in learning.

Conclusion
Implementing these relatively simple measures could lead to a significant improvement in both students' results and their well-being.`,
  },
  {
    id: 'wp-b1-invite', level: 'B1', genre: 'Email de invitación', title: 'Invita a un amigo a una boda',
    task: 'Your cousin is getting married next month and you can bring a friend. Write an email to an English-speaking friend inviting them. Say when and where it is, what will happen, and what they need to know (clothes, travel, accommodation).',
    min: 100, max: 150,
    tips: ['Abre con algo personal: «How are you? I have some exciting news!»', 'Da datos concretos: día, hora, lugar.', 'Invita con «Would you like to…? / I\'d love you to come»', 'Cierra pidiendo respuesta: «Let me know by… / I hope you can make it!»'],
    model: `Hi Sam,

How are you? I hope your new job is going well. I have some exciting news: my cousin Lucía is getting married on Saturday 14th June, and I'm allowed to bring a friend. Would you like to come with me?

The ceremony will take place at 6 pm in a small church in a village near Valencia, and afterwards there will be dinner and a party in a garden by the sea. Spanish weddings go on very late, so be ready to dance until three in the morning!

You don't need to wear a suit, but it's quite a smart event, so a shirt and nice trousers would be perfect. My family has booked a few rooms in a hotel nearby, so you could stay there for free. If you fly to Valencia on Friday, I can pick you up at the airport.

Let me know by the end of the month if you can make it. I'd really love you to come!

Best wishes,
Marta`,
  },
  {
    id: 'wp-b1-compare', level: 'B1', genre: 'Párrafo comparativo', title: 'Tren o avión',
    task: 'Write a comparative paragraph about travelling between two cities by train or by plane. Compare at least three aspects (price, time, comfort, environment…) and say which you prefer.',
    min: 110, max: 160,
    tips: ['Frase temática al principio: qué comparas y con qué criterio.', 'Comparativos: cheaper than, not as fast as, much more comfortable.', 'Conectores de contraste: whereas, while, on the other hand, however.', 'Frase final con tu preferencia y por qué.'],
    model: `When travelling between Madrid and Barcelona, both the train and the plane are popular options, but they offer quite different experiences. In terms of time, the plane seems faster, as the flight only takes about an hour and a quarter, whereas the high-speed train takes around two and a half hours. However, once you add the time needed to get to the airport and go through security, the difference almost disappears. The train is also more comfortable: the seats are wider, you can walk around and the stations are in the city centre. As for price, flights can be cheaper if you book early, but trains often have good offers too. Finally, the train is much better for the environment, since it produces far fewer emissions per passenger. Overall, I prefer the train, because it is more relaxing and the total journey time is similar.`,
  },
  {
    id: 'wp-b2-cause', level: 'B2', genre: 'Ensayo causa–efecto', title: 'Por qué se derriten los glaciares',
    task: 'Write a cause-and-effect essay about the melting of glaciers. Explain the main causes and at least two important effects for people and the environment.',
    min: 180, max: 250,
    tips: ['Introducción: presenta el problema y anuncia causas y efectos.', 'Conectores de causa: because of, due to, as a result of, since.', 'Conectores de efecto: as a result, consequently, this leads to, therefore.', 'Un párrafo para causas y uno (o dos) para efectos.'],
    model: `Glaciers around the world are shrinking at an alarming rate. This essay will examine the main causes of this phenomenon and some of its most serious consequences.

The principal cause is global warming. Due to the burning of fossil fuels, the concentration of greenhouse gases in the atmosphere has risen sharply, and as a result average temperatures have increased. Glaciers now lose more ice in summer than they gain from snow in winter. In addition, soot and dust from pollution darken the surface of the ice, which therefore absorbs more sunlight and melts faster.

The effects are far-reaching. Firstly, many communities depend on glaciers for their water supply. Mountain glaciers store water in winter and release it slowly in the dry season, so their disappearance could lead to serious shortages for drinking and farming. Secondly, the melting of land ice contributes to rising sea levels, which consequently threatens coastal cities and low-lying islands with flooding. Finally, the loss of white ice reduces the amount of sunlight reflected back into space, which accelerates warming even further.

In conclusion, glacier melt is both a consequence of climate change and a cause of further problems. Reducing emissions is the only long-term way to slow it down.`,
  },
  {
    id: 'wp-b2-letter', level: 'B2', genre: 'Carta al periódico', title: 'Carta al director: carriles bici',
    task: 'Your local newspaper published an article criticising the city\'s plan to replace car lanes with bike lanes in the centre. Write a letter to the editor giving your opinion, with reasons and a suggestion.',
    min: 170, max: 230,
    tips: ['Empieza con «Dear Editor,» y menciona el artículo (título y fecha).', 'Di tu postura pronto: «I am writing to express my disagreement with…»', 'Argumenta con datos o ejemplos, no solo opiniones.', 'Termina con una propuesta y «Yours faithfully,» + nombre.'],
    model: `Dear Editor,

I am writing in response to the article "Bike lanes will kill the city centre", published on 3rd May. While I understand the concerns of some shop owners, I believe the article presented a very one-sided view of the plan.

Firstly, experience from other cities suggests the opposite of what the article claims. When Seville built its network of bike lanes, the number of daily cycling trips increased enormously, and many businesses in the centre reported more customers, not fewer. People on bicycles and on foot tend to stop and shop more often than drivers, who simply pass through.

Secondly, the article did not mention the health and environmental benefits. Fewer cars mean cleaner air and less noise, which would make the centre a more pleasant place to live and visit.

That said, the council should listen to the legitimate worries of local businesses. I would suggest introducing the changes gradually, guaranteeing loading zones for deliveries and improving bus connections, so that nobody is left behind.

A city centre designed for people rather than cars is not a threat; it is an opportunity.

Yours faithfully,
Daniel Ortega`,
  },
  {
    id: 'wp-b2-process', level: 'B2', genre: 'Describir un proceso', title: 'Cómo se recicla el papel',
    task: 'Describe the process of recycling paper, from the moment it is thrown into a recycling bin to the moment it becomes new paper. Use the passive where appropriate and sequence words.',
    min: 150, max: 210,
    tips: ['Frase de introducción: qué proceso y cuántas etapas tiene.', 'Pasiva: «the paper is collected», «it is then mixed with water».', 'Secuencia: first, next, after that, once…, finally.', 'Sin opiniones: es un texto descriptivo e impersonal.'],
    model: `The recycling of paper is a process that consists of several stages, which turn used paper into a new product.

First, paper is collected from recycling bins and taken to a recycling centre. There, it is sorted into different types, such as newspapers, cardboard and office paper, because each type is used to make different products.

Next, the sorted paper is put into a large machine called a pulper, where it is mixed with water and chemicals. This breaks the paper down into small fibres and creates a thick mixture known as pulp. After that, the pulp is cleaned and screened to remove ink, glue, plastic and other materials. In some cases, it is also bleached to make it whiter.

Once the pulp is clean, it is spread onto large flat screens, where most of the water drains away. The remaining sheet is then pressed between heavy rollers and dried with heated cylinders. Finally, the new paper is rolled up, cut to the required size and sent to manufacturers, who use it to make products such as newspapers, boxes and notebooks.`,
  },
  {
    id: 'wp-c1-proposal', level: 'C1', genre: 'Propuesta', title: 'Propuesta: aprender fuera del aula',
    task: 'Your university wants to encourage "learning outside the classroom". Write a proposal for the director suggesting two or three initiatives, explaining their benefits and how they could be implemented.',
    min: 220, max: 300,
    tips: ['Usa títulos de sección: Introduction / Proposed initiatives / Implementation / Conclusion.', 'Registro formal: «It is proposed that…», «This would enable students to…».', 'Recomendaciones con subjuntivo: «I recommend that the university set up…».', 'Termina con una frase persuasiva sobre el impacto.'],
    model: `Introduction
The aim of this proposal is to suggest ways in which the university could encourage students to learn outside the classroom, and to outline how these initiatives might be implemented.

Proposed initiatives
Firstly, it is proposed that the university establish partnerships with local companies and NGOs to offer short, credit-bearing projects. Working on real problems would enable students to apply theoretical knowledge and develop skills, such as teamwork and project management, which are difficult to acquire in lectures.

Secondly, a programme of student-led learning circles could be created. Small groups would meet weekly to discuss a topic of their choice, supported by a member of staff. Not only would this promote independent learning, but it would also help students from different faculties to connect.

Finally, I recommend that the library offer guided field trips to museums, laboratories and archives, linked to specific courses.

Implementation
These initiatives would require relatively modest resources. A coordinator could be appointed to manage partnerships, and existing rooms could be used for learning circles in the afternoons. A pilot scheme in two faculties would allow the university to evaluate the results before extending it.

Conclusion
Learning does not end at the classroom door. By adopting these measures, the university would equip its students with the practical experience and curiosity that employers and society increasingly value.`,
  },
];
