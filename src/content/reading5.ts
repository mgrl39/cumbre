import type { ReadingText, Level } from '../core/types.ts';

const TF = ['True', 'False', 'Not given'];
/** pregunta: [enunciado, correcta, mala, mala…] o [enunciado, 'T' | 'F' | 'NG'] */
export type RQ = string[];
export const mkReading = (id: string, level: Level, title: string, topic: string, text: string, qs: RQ[], flags: { real?: boolean; long?: boolean } = {}): ReadingText => ({
  id, level, title, topic, text, ...flags,
  questions: qs.map(([q, a, ...w]) => (w.length === 0 && ['T', 'F', 'NG'].includes(a) ? { q, options: TF, answer: ['T', 'F', 'NG'].indexOf(a) } : { q, options: [a, ...w], answer: 0 })),
});
const R = mkReading;
const real = { real: true };

/* Lecturas originales A1–A2: textos muy cortos sobre la vida diaria, más documentos reales sencillos. */
export const READINGS_5: ReadingText[] = [
  /* ---------------- A1 ---------------- */
  R('r5-a1-breakfast', 'A1', 'My breakfast', 'Comida', `I get up at seven o'clock. I have breakfast in the kitchen with my sister. I eat toast with butter and I drink orange juice. My sister doesn't like juice. She drinks milk. At the weekend we have eggs, and my dad makes pancakes. I love pancakes!`, [
    ['What does the writer drink?', 'Orange juice', 'Milk', 'Coffee'],
    ['Who makes pancakes?', 'Dad', 'The sister', 'Mum'],
    ['The sister likes juice.', 'F'],
  ]),
  R('r5-a1-bedroom', 'A1', 'My bedroom', 'Casa', `My bedroom is small but I like it. There is a bed next to the window and a desk near the door. My computer is on the desk. The walls are blue and there are two posters of my favourite band. I haven't got a TV in my room, but I have a lot of books.`, [
    ['Where is the bed?', 'Next to the window', 'Near the door', 'Under the desk'],
    ['What colour are the walls?', 'Blue', 'White', 'Green'],
    ['There is a TV in the bedroom.', 'F'],
  ]),
  R('r5-a1-friend', 'A1', 'My best friend', 'Personas', `My best friend is called Marta. She is twelve years old and she lives near my house. She has long brown hair and green eyes. Marta is very funny and she is good at maths. We go to school together every day. On Saturdays we play basketball in the park.`, [
    ['How old is Marta?', 'Twelve', 'Ten', 'Thirteen'],
    ['What is Marta good at?', 'Maths', 'English', 'Music'],
    ['When do they play basketball?', 'On Saturdays', 'Every day', 'On Sundays'],
  ]),
  R('r5-a1-bus', 'A1', 'The school bus', 'Transporte', `I go to school by bus. The bus stop is in front of the supermarket. The bus comes at ten past eight. It is always full, so I don't usually sit down. The journey takes fifteen minutes. My friend Leo goes to school by bike because he lives very near.`, [
    ['Where is the bus stop?', 'In front of the supermarket', 'Next to the school', 'Behind the park'],
    ['How long is the journey?', 'Fifteen minutes', 'Ten minutes', 'Eight minutes'],
    ['Leo goes to school by bus.', 'F'],
  ]),
  R('r5-a1-park', 'A1', 'In the park', 'Tiempo libre', `Today is Sunday and the weather is sunny. Many people are in the park. Two children are playing football. An old man is reading a newspaper on a bench. A woman is running with her dog. I am sitting under a tree and eating an ice cream. It is a beautiful day.`, [
    ['What is the old man doing?', 'Reading a newspaper', 'Playing football', 'Running'],
    ['Where is the writer?', 'Under a tree', 'On a bench', 'Near the lake'],
    ['It is raining.', 'F'],
  ]),
  R('r5-a1-birthday', 'A1', 'A birthday party', 'Familia', `It is my birthday on Friday. I am going to be eleven. My party is at my house at five o'clock. Eight friends are coming. My mum is making a chocolate cake and my dad is buying pizza. We are going to play games in the garden. I want a new bike for my birthday.`, [
    ['When is the party?', 'On Friday at five', 'On Saturday at five', 'On Friday at eight'],
    ['What does the writer want?', 'A new bike', 'A chocolate cake', 'A game'],
    ['Eleven friends are coming to the party.', 'F'],
  ]),
  R('r5-a1-teacher', 'A1', 'Our English teacher', 'Escuela', `Our English teacher is Mr Clark. He is from Scotland. He is tall and he wears glasses. His lessons are fun because we sing songs and play games. He gives us homework on Mondays and Wednesdays. He never shouts. Everybody in my class likes him.`, [
    ['Where is Mr Clark from?', 'Scotland', 'England', 'Ireland'],
    ['Why are his lessons fun?', 'They sing and play games', 'There is no homework', 'They watch films'],
    ['Mr Clark has got a brother.', 'NG'],
  ]),
  R('r5-a1-market', 'A1', 'At the market', 'Compras', `Every Saturday my grandmother goes to the market. She buys fruit, vegetables and fish. The apples cost two euros a kilo and the oranges cost one euro fifty. She doesn't buy meat there because it is expensive. After the market, she has a coffee with her friends in a café.`, [
    ['How much are the apples?', 'Two euros a kilo', 'One euro fifty a kilo', 'Three euros a kilo'],
    ['Why doesn\'t she buy meat at the market?', 'It is expensive', 'She doesn\'t eat meat', 'There isn\'t any'],
    ['She goes to the market with her friends.', 'NG'],
  ]),
  R('r5-a1-sign-pool', 'A1', 'Swimming pool notice', 'Vida real', `CITY SWIMMING POOL
Open: Monday to Friday, 7 am – 9 pm. Saturday, 9 am – 6 pm. Closed on Sundays.
Adults: £4. Children (under 12): £2.
Please shower before you swim. No food or drink near the pool.`, [
    ['When is the pool closed?', 'On Sundays', 'On Saturdays', 'On Mondays'],
    ['How much does a child of ten pay?', '£2', '£4', 'Nothing'],
    ['You can eat next to the pool.', 'F'],
  ], real),
  R('r5-a1-postcard', 'A1', 'A postcard from Lisbon', 'Viajes', `Hi Grandma!
We are in Lisbon. The hotel is small but very nice, and it is near the river. The weather is hot. Yesterday we visited a castle and today we are going to the beach. The food is fantastic — I eat fish every day!
See you next week.
Love, Pablo`, [
    ['Where is the hotel?', 'Near the river', 'Next to the castle', 'On the beach'],
    ['What did they do yesterday?', 'They visited a castle', 'They went to the beach', 'They ate pizza'],
    ['The weather is cold.', 'F'],
  ], real),
  R('r5-a1-pets', 'A1', 'Two cats and a fish', 'Animales', `We have three pets at home. Tiger and Luna are our cats. Tiger is orange and very lazy. He sleeps all day on the sofa. Luna is black and she likes playing with a ball. We also have a goldfish. Its name is Bubbles. The cats watch Bubbles for hours!`, [
    ['What colour is Luna?', 'Black', 'Orange', 'White'],
    ['What does Tiger do all day?', 'He sleeps', 'He plays with a ball', 'He watches TV'],
    ['The family has four pets.', 'F'],
  ]),
  R('r5-a1-job', 'A1', 'My mum\'s job', 'Trabajo', `My mum is a nurse. She works in a big hospital in the city centre. She starts work at seven in the morning and finishes at three in the afternoon. Sometimes she works at night. She likes her job because she helps people, but she is often tired.`, [
    ['Where does she work?', 'In a hospital', 'In a school', 'In a shop'],
    ['What time does she finish?', 'At three', 'At seven', 'At night'],
    ['She never works at night.', 'F'],
  ]),
  R('r5-a1-town', 'A1', 'My town', 'Lugares', `I live in a small town in the north of Spain. There is a church, a school, two supermarkets and a cinema. There isn't a train station, but there are buses to the city. In summer many tourists come because the beach is very beautiful. In winter the town is quiet.`, [
    ['What isn\'t there in the town?', 'A train station', 'A cinema', 'A school'],
    ['Why do tourists come in summer?', 'For the beach', 'For the church', 'For the shops'],
    ['The town is busy in winter.', 'F'],
  ]),
  R('r5-a1-clothes', 'A1', 'What I wear', 'Ropa', `At school I wear a uniform: grey trousers, a white shirt and a blue jumper. I don't like it very much. At the weekend I wear jeans and a T-shirt. My favourite T-shirt is red. When it is cold, I wear a big black coat and a hat.`, [
    ['What colour is the school jumper?', 'Blue', 'Grey', 'Red'],
    ['What does the writer wear at the weekend?', 'Jeans and a T-shirt', 'A uniform', 'A shirt and trousers'],
    ['The writer likes the uniform a lot.', 'F'],
  ]),
  R('r5-a1-menu', 'A1', 'Café menu', 'Vida real', `SUNNY CAFÉ
Sandwiches: cheese £3 · chicken £4 · egg £3.50
Soup of the day with bread: £4.50
Drinks: tea £1.50 · coffee £2 · juice £2.50
Cake: £3
Lunch offer (12–2 pm): sandwich + drink = £5`, [
    ['How much is a chicken sandwich?', '£4', '£3', '£4.50'],
    ['What is the cheapest drink?', 'Tea', 'Coffee', 'Juice'],
    ['When is the lunch offer?', 'From 12 to 2', 'All day', 'From 2 to 5'],
  ], real),
  R('r5-a1-weekend', 'A1', 'My weekend', 'Rutinas', `On Saturday morning I clean my room and then I do my homework. In the afternoon I meet my friends and we go to the shopping centre. On Sunday we visit my grandparents. My grandfather cooks lunch for everybody. In the evening I watch a film with my family.`, [
    ['What does the writer do on Saturday morning?', 'Cleans the room and does homework', 'Meets friends', 'Visits grandparents'],
    ['Who cooks on Sunday?', 'The grandfather', 'The grandmother', 'The writer'],
    ['The writer watches a film on Sunday evening.', 'T'],
  ]),
  R('r5-a1-family-photo', 'A1', 'A family photo', 'Familia', `This is a photo of my family. The man with the beard is my father. The woman next to him is my mother. She is a doctor. The two boys are my brothers, Dan and Sam. Dan is fifteen and Sam is eight. The baby is my cousin Emma. I am not in the photo because I am taking it!`, [
    ['Who has a beard?', 'The father', 'Dan', 'The uncle'],
    ['How old is Sam?', 'Eight', 'Fifteen', 'Twelve'],
    ['The writer is in the photo.', 'F'],
  ]),
  R('r5-a1-sport', 'A1', 'I love swimming', 'Deporte', `My favourite sport is swimming. I go to the swimming pool three times a week: on Mondays, Wednesdays and Fridays. My lesson starts at six and finishes at seven. My teacher is very good. I can swim fast, but I can't dive. Next month I have my first competition.`, [
    ['How often does the writer swim?', 'Three times a week', 'Every day', 'Once a week'],
    ['What can\'t the writer do?', 'Dive', 'Swim fast', 'Swim'],
    ['The competition is next week.', 'F'],
  ]),
  R('r5-a1-text', 'A1', 'Text messages', 'Vida real', `Ana: Hi! Where are you?
Ben: I'm on the bus. Sorry, I'm late.
Ana: No problem. I'm in the café next to the cinema.
Ben: OK. What time is the film?
Ana: Half past seven. We have twenty minutes.
Ben: Great. Can you buy me a coffee, please?`, [
    ['Where is Ana?', 'In a café', 'On the bus', 'In the cinema'],
    ['What time is the film?', 'Half past seven', 'Seven o\'clock', 'Twenty past seven'],
    ['Ben wants a coffee.', 'T'],
  ], real),
  R('r5-a1-seasons', 'A1', 'My favourite season', 'Tiempo', `There are four seasons. I don't like winter because it is cold and dark. Spring is nice — there are flowers in the parks. But my favourite season is summer. There is no school, the days are long and we go to the beach. In autumn the trees are red and yellow.`, [
    ['Why doesn\'t the writer like winter?', 'It is cold and dark', 'There is school', 'It rains'],
    ['What is the favourite season?', 'Summer', 'Spring', 'Autumn'],
    ['The writer goes to the mountains in summer.', 'NG'],
  ]),
  R('r5-a1-library', 'A1', 'The library', 'Lugares', `There is a library near my school. It is open from nine to eight. You can read books and magazines there, and you can use the computers. You can take four books home for two weeks. You can't eat or talk on the phone in the library. I go there every Tuesday.`, [
    ['How many books can you take home?', 'Four', 'Two', 'Eight'],
    ['What can\'t you do in the library?', 'Eat', 'Use the computers', 'Read magazines'],
    ['The writer goes to the library on Tuesdays.', 'T'],
  ]),
  R('r5-a1-dinner', 'A1', 'Dinner time', 'Comida', `In my family we have dinner at half past eight. My father usually cooks because my mother comes home late. Tonight we are having chicken with rice and a salad. I don't like tomatoes, so I don't eat the salad. After dinner, my brother and I wash the dishes.`, [
    ['Who usually cooks?', 'The father', 'The mother', 'The brother'],
    ['What doesn\'t the writer like?', 'Tomatoes', 'Chicken', 'Rice'],
    ['Who washes the dishes?', 'The writer and the brother', 'The mother', 'The father'],
  ]),
  R('r5-a1-newflat', 'A1', 'A new neighbour', 'Personas', `We have a new neighbour. Her name is Mrs Rossi and she is from Italy. She lives in the flat above us with her two children. She speaks English very well. Yesterday she gave us a big plate of pasta. It was delicious! My mother wants to invite her for coffee.`, [
    ['Where is Mrs Rossi from?', 'Italy', 'Spain', 'England'],
    ['What did she give the family?', 'Pasta', 'Coffee', 'A cake'],
    ['Mrs Rossi lives alone.', 'F'],
  ]),
  R('r5-a1-zoo', 'A1', 'A day at the zoo', 'Animales', `Last Saturday I went to the zoo with my class. We saw lions, elephants and monkeys. The monkeys were very funny. We had lunch at twelve o'clock next to the lake. I took a lot of photos. My favourite animal was the baby giraffe. We went home at four.`, [
    ['Who did the writer go with?', 'The class', 'The family', 'Friends'],
    ['What was the favourite animal?', 'The baby giraffe', 'The monkeys', 'The lions'],
    ['They went home at twelve.', 'F'],
  ]),
  R('r5-a1-timetable', 'A1', 'Class timetable', 'Vida real', `MONDAY
9:00 Maths · 10:00 English · 11:00 Break
11:30 Science · 12:30 Lunch
1:30 Art · 2:30 PE (bring trainers!)
3:30 Home`, [
    ['What lesson is at ten o\'clock?', 'English', 'Maths', 'Science'],
    ['What do students need for PE?', 'Trainers', 'A pencil', 'A book'],
    ['Lunch is at half past twelve.', 'T'],
  ], real),
  R('r5-a1-phone', 'A1', 'My new phone', 'Tecnología', `I have a new phone. It was a present from my parents. It is black and not very big. I use it to talk to my friends and to listen to music. I can't use it at school — that is the rule. My sister wants one too, but she is only seven.`, [
    ['Who gave the phone to the writer?', 'The parents', 'The sister', 'A friend'],
    ['Where can\'t the writer use the phone?', 'At school', 'At home', 'On the bus'],
    ['The sister has a phone too.', 'F'],
  ]),
  R('r5-a1-doctor', 'A1', 'At the doctor\'s', 'Salud', `Tom is ill today. He has a headache and a temperature. His mother takes him to the doctor. The doctor says, "Stay in bed for two days and drink a lot of water." Tom is happy because he doesn't have to go to school, but he can't play football with his friends.`, [
    ['What is wrong with Tom?', 'He has a headache and a temperature', 'He has a broken leg', 'He has a toothache'],
    ['What does the doctor say?', 'Stay in bed', 'Go to school', 'Play football'],
    ['Tom has to stay in bed for a week.', 'F'],
  ]),
  R('r5-a1-hobby', 'A1', 'I play the guitar', 'Tiempo libre', `I play the guitar. I started two years ago. I have a lesson every Thursday after school. My teacher is a young man called Hugo. I practise for thirty minutes every day. I can play ten songs now. My dream is to play in a band with my friends.`, [
    ['When is the guitar lesson?', 'On Thursdays', 'On Tuesdays', 'Every day'],
    ['How long does the writer practise every day?', 'Thirty minutes', 'Ten minutes', 'Two hours'],
    ['The writer plays in a band now.', 'F'],
  ]),
  R('r5-a1-shopping-list', 'A1', 'A note on the fridge', 'Vida real', `Sam,
I'm at work until six. Can you go to the supermarket, please? We need:
– bread
– six eggs
– milk (2 bottles)
– tomatoes
The money is on the table. Don't buy sweets!
Thanks, Mum`, [
    ['How many bottles of milk does Sam need to buy?', 'Two', 'Six', 'One'],
    ['Where is the money?', 'On the table', 'In the fridge', 'In Mum\'s bag'],
    ['Sam can buy sweets.', 'F'],
  ], real),
  R('r5-a1-train', 'A1', 'A train journey', 'Viajes', `Every summer we go to my uncle's house by train. The journey is three hours. I sit next to the window and look at the mountains and the rivers. My mother reads a book and my little brother sleeps. We eat sandwiches on the train. My uncle waits for us at the station.`, [
    ['How long is the journey?', 'Three hours', 'Two hours', 'One hour'],
    ['What does the mother do on the train?', 'She reads', 'She sleeps', 'She eats'],
    ['The uncle lives near the sea.', 'NG'],
  ]),
  R('r5-a1-cinema', 'A1', 'Cinema ticket', 'Vida real', `STAR CINEMA — Screen 3
Film: The Lost Island
Date: Saturday 12 May · Time: 18:15
Seat: Row F, number 9
Price: £7.50
Please arrive ten minutes before the film starts.`, [
    ['What time does the film start?', 'At 18:15', 'At 18:05', 'At 19:50'],
    ['Where is the seat?', 'Row F', 'Row 9', 'Screen F'],
    ['The ticket costs more than ten pounds.', 'F'],
  ], real),
  R('r5-a1-garden', 'A1', 'Grandpa\'s garden', 'Familia', `My grandfather has a big garden behind his house. He grows tomatoes, potatoes and carrots. There are also two apple trees. He works in the garden every morning. In summer I help him and we water the plants together. He always gives us vegetables to take home.`, [
    ['Where is the garden?', 'Behind the house', 'In front of the house', 'In the park'],
    ['When does he work in the garden?', 'Every morning', 'Every evening', 'At the weekend'],
    ['There are two apple trees.', 'T'],
  ]),
  R('r5-a1-rain', 'A1', 'A rainy day', 'Tiempo', `It is raining today, so we can't go to the park. I am at home with my brother. We are playing a board game in the living room. Mum is making hot chocolate. Later we are going to watch a film. I don't like rain, but I like days at home.`, [
    ['Why can\'t they go to the park?', 'It is raining', 'They are ill', 'It is closed'],
    ['What is Mum making?', 'Hot chocolate', 'Dinner', 'A cake'],
    ['The writer likes rain.', 'F'],
  ]),

  /* ---------------- A2 ---------------- */
  R('r5-a2-firstday', 'A2', 'My first day at work', 'Trabajo', `Last Monday was my first day in my new job. I was very nervous, so I arrived half an hour early. My boss, Karen, showed me the office and introduced me to the team. Everyone was friendly. In the morning I learned how to use the computer system. I made a few mistakes, but nobody was angry. At lunchtime, two colleagues invited me to eat with them. I went home tired but happy.`, [
    ['Why did the writer arrive early?', 'They were nervous', 'The boss asked them to', 'The bus was early'],
    ['What did the writer do in the morning?', 'Learned the computer system', 'Had a meeting', 'Wrote emails'],
    ['Some colleagues were angry about the mistakes.', 'F'],
  ]),
  R('r5-a2-camping', 'A2', 'A camping trip', 'Viajes', `Last weekend we went camping near a lake. We put up the tent on Friday evening and cooked sausages on a fire. On Saturday we walked ten kilometres in the forest and swam in the lake. The water was freezing! Unfortunately, it started to rain during the night and our sleeping bags got wet. On Sunday morning we packed everything and drove home early. It wasn't perfect, but I want to go again.`, [
    ['What did they do on Saturday?', 'They walked and swam', 'They drove home', 'They cooked on a fire'],
    ['What was the problem?', 'It rained at night', 'They lost the tent', 'The lake was dirty'],
    ['The writer never wants to go camping again.', 'F'],
  ]),
  R('r5-a2-recipe', 'A2', 'How to make a Spanish omelette', 'Vida real', `You need: 4 potatoes, 1 onion, 5 eggs, olive oil and salt.
1. Peel the potatoes and cut them into thin slices. Chop the onion.
2. Fry the potatoes and onion slowly in a lot of oil for about 20 minutes. Don't let them go brown.
3. Beat the eggs in a bowl with some salt. Add the potatoes and onion.
4. Cook the mixture in a pan for five minutes. Turn it over with a plate and cook the other side.
Serve hot or cold.`, [
    ['How long do you fry the potatoes?', 'About 20 minutes', 'Five minutes', 'An hour'],
    ['What do you use to turn the omelette?', 'A plate', 'A spoon', 'A knife'],
    ['The omelette must be eaten hot.', 'F'],
  ], real),
  R('r5-a2-lostcat', 'A2', 'Lost cat', 'Vida real', `LOST CAT
Our cat Milo disappeared on Tuesday evening near Park Road. He is two years old, grey with white feet, and he is wearing a red collar. He is very shy and may be hiding in a garage or garden shed. Please check yours!
If you see him, please call Jenny on 07700 900123 at any time. There is a £50 reward.`, [
    ['What does Milo look like?', 'Grey with white feet', 'White with a grey tail', 'Black and white'],
    ['Where might he be?', 'In a garage or shed', 'In the park', 'At the vet\'s'],
    ['You can only phone Jenny in the evening.', 'F'],
  ], real),
  R('r5-a2-languages', 'A2', 'Learning with films', 'Educación', `When I started learning English, I found it very difficult to understand people. Then a friend gave me some advice: watch films in English with English subtitles. At first I had to stop the film every few minutes to look up words. After three months, I could follow most of the story without stopping. Now I watch a series every evening. I still don't understand everything, but my listening is much better than before.`, [
    ['What advice did the friend give?', 'Watch films with English subtitles', 'Read more books', 'Go to England'],
    ['What happened after three months?', 'The writer could follow most of the story', 'The writer understood everything', 'The writer stopped watching'],
    ['The writer now understands everything.', 'F'],
  ]),
  R('r5-a2-bike', 'A2', 'Cycling to work', 'Transporte', `Two months ago, Peter sold his car and bought a bike. He used to spend forty minutes in traffic every morning. Now he cycles to the office in twenty-five minutes. He says he feels healthier and he saves about 150 euros a month. The only problem is the weather. When it rains heavily, he takes the bus. His colleagues thought he was crazy at first, but now two of them cycle too.`, [
    ['How long does Peter\'s journey take now?', 'Twenty-five minutes', 'Forty minutes', 'An hour'],
    ['What does he do when it rains a lot?', 'He takes the bus', 'He drives', 'He stays at home'],
    ['Peter saves money by cycling.', 'T'],
  ]),
  R('r5-a2-hotel-review', 'A2', 'Hotel review', 'Vida real', `★★★☆☆ "Good location, noisy room"
We stayed here for three nights in April. The hotel is only five minutes from the station and the staff were very helpful. Breakfast was excellent, with fresh fruit and good coffee. However, our room was above the bar and we couldn't sleep until midnight. The bathroom was clean but very small. I would stay again, but I would ask for a room on the top floor.`, [
    ['What was the best thing about the hotel?', 'The location and breakfast', 'The size of the bathroom', 'The quiet rooms'],
    ['Why couldn\'t they sleep?', 'The room was above the bar', 'The bed was uncomfortable', 'It was too hot'],
    ['The writer would never stay there again.', 'F'],
  ], real),
  R('r5-a2-grandma', 'A2', 'When my grandmother was young', 'Pasado', `My grandmother grew up in a small village in the 1950s. Her family didn't have a car or a television. She walked three kilometres to school every day, even in winter. After school she helped her mother with the animals. On Sundays, the whole village met in the square to talk and dance. She says life was harder then, but people had more time for each other.`, [
    ['How did she get to school?', 'On foot', 'By bus', 'By bike'],
    ['What did she do after school?', 'Helped with the animals', 'Watched television', 'Played in the square'],
    ['She thinks people had more time for each other.', 'T'],
  ]),
  R('r5-a2-concert', 'A2', 'My first concert', 'Música', `Last month I went to my first big concert. My favourite band was playing in the stadium. My cousin and I waited outside for three hours because we wanted to be near the stage. The concert started late, but it was amazing. Everybody sang and jumped. I lost my voice and my feet hurt the next day. The tickets were expensive, but it was worth it.`, [
    ['Why did they wait for three hours?', 'To be near the stage', 'The band was late', 'They had no tickets'],
    ['How did the writer feel the next day?', 'Their feet hurt and they had no voice', 'Sad', 'Angry about the price'],
    ['The writer went with a cousin.', 'T'],
  ]),
  R('r5-a2-appointment', 'A2', 'Appointment reminder', 'Vida real', `Dear Ms Lopez,
This is a reminder of your appointment with Dr Patel at Green Street Dental Clinic on Thursday 14 June at 10:40 am.
Please arrive ten minutes early and bring your health card. If you cannot come, call us at least 24 hours before. Missed appointments cost £20.
Reply YES to confirm.`, [
    ['When should Ms Lopez arrive?', 'At 10:30', 'At 10:40', 'At 10:50'],
    ['What happens if she doesn\'t go and doesn\'t call?', 'She pays £20', 'Nothing', 'She loses her health card'],
    ['She must bring her health card.', 'T'],
  ], real),
  R('r5-a2-cooking', 'A2', 'Learning to cook', 'Comida', `When I left home to study, I couldn't cook anything except pasta. For the first month, I ate pasta almost every day. Then my flatmate Yuki taught me how to make soup and rice dishes. She said cooking is easy if you start with simple recipes. Now I cook four or five times a week, and at weekends I try something new. Last Sunday I made a fish curry. It was too spicy, but we ate it all.`, [
    ['What could the writer cook before?', 'Only pasta', 'Soup', 'Fish curry'],
    ['Who taught the writer to cook?', 'A flatmate', 'Their mother', 'A teacher'],
    ['The fish curry was perfect.', 'F'],
  ]),
  R('r5-a2-city-village', 'A2', 'City or village?', 'Lugares', `My sister lives in a big city and I live in a village. She says the city is more exciting: there are theatres, restaurants and shops everywhere. But her flat is small and expensive, and the streets are noisy. My house is bigger and cheaper, and I can see fields from my window. Of course, there is only one shop here and the nearest cinema is thirty kilometres away. We both think our own place is better!`, [
    ['What is a problem in the city?', 'Flats are small and expensive', 'There are no shops', 'It is boring'],
    ['How far is the nearest cinema from the village?', 'Thirty kilometres', 'Three kilometres', 'Thirteen kilometres'],
    ['The sister wants to move to the village.', 'F'],
  ]),
  R('r5-a2-running', 'A2', 'My first race', 'Deporte', `In January I decided to get fit, so I started running. At first I could only run for five minutes without stopping. I ran three times a week and slowly got better. Last Sunday I ran my first five-kilometre race. There were 400 runners. I finished in 31 minutes — not fast, but I didn't stop. My family were waiting at the finish line. Next year I'd like to run ten kilometres.`, [
    ['How long could the writer run at first?', 'Five minutes', 'Thirty-one minutes', 'Five kilometres'],
    ['How did the race go?', 'The writer finished without stopping', 'The writer won', 'The writer stopped twice'],
    ['The writer wants to run a longer race next year.', 'T'],
  ]),
  R('r5-a2-ad-room', 'A2', 'Room to rent', 'Vida real', `ROOM TO RENT — £450 a month (bills included)
Large, bright room in a shared flat with two students. Ten minutes' walk from the university and close to bus routes. The flat has a kitchen, a living room and one bathroom. Washing machine and fast internet.
No smokers, no pets. Available from 1 September.
Email Chris: chris.flat@example.com`, [
    ['What is included in the price?', 'Bills', 'Food', 'A bus pass'],
    ['How many people live in the flat now?', 'Two', 'Three', 'One'],
    ['You can bring your dog.', 'F'],
  ], real),
  R('r5-a2-museum', 'A2', 'A school trip', 'Educación', `Yesterday our class visited the science museum. We left school at nine and arrived an hour later. First, a guide showed us a room about space, where we touched a real piece of rock from the moon. Then we did an experiment with electricity — my hair stood up! We had lunch in the museum café and bought souvenirs. On the bus home, almost everyone fell asleep.`, [
    ['What did they touch in the space room?', 'A rock from the moon', 'A spaceship', 'A star'],
    ['What happened during the experiment?', 'The writer\'s hair stood up', 'The lights went out', 'Someone got hurt'],
    ['They arrived at the museum at nine.', 'F'],
  ]),
  R('r5-a2-pen-friend', 'A2', 'An email to a host family', 'Vida real', `Dear Mr and Mrs Walker,
My name is Carla and I'm going to stay with you in July. I'm seventeen and I live in Valencia with my parents and my younger brother. I like music, cycling and animals. I eat almost everything, but I'm allergic to nuts.
My flight arrives at Manchester Airport on 3 July at 4 pm. Could you tell me how to get to your house?
I'm looking forward to meeting you.
Best wishes,
Carla`, [
    ['Why is Carla writing?', 'To introduce herself before her stay', 'To cancel her trip', 'To ask for a job'],
    ['What can\'t Carla eat?', 'Nuts', 'Meat', 'Fish'],
    ['Carla is travelling with her brother.', 'NG'],
  ], real),
  R('r5-a2-snow', 'A2', 'The day it snowed', 'Tiempo', `It almost never snows in my city, but last February we woke up and everything was white. The schools closed and the buses stopped running. My brother and I made a snowman in the street with our neighbours. People who usually don't speak to each other were laughing together. By the evening most of the snow had turned to water, but nobody will forget that day.`, [
    ['What happened to the schools?', 'They closed', 'They opened late', 'Nothing'],
    ['Who did they make the snowman with?', 'The neighbours', 'Their parents', 'Their teachers'],
    ['It often snows in the writer\'s city.', 'F'],
  ]),
  R('r5-a2-shopping-online', 'A2', 'Shopping online', 'Compras', `My mother never bought anything online until last year. She thought it was dangerous to pay with a card on the internet. Then she needed a special part for her sewing machine and couldn't find it in any shop. I helped her order it, and it arrived in two days. Now she buys books and clothes online too. However, she still prefers the market for food because she likes to see and smell what she buys.`, [
    ['Why didn\'t she shop online before?', 'She thought it wasn\'t safe', 'She had no computer', 'It was too slow'],
    ['What was her first online order?', 'A part for her sewing machine', 'A book', 'Clothes'],
    ['She buys her food online now.', 'F'],
  ]),
  R('r5-a2-instructions', 'A2', 'Washing instructions', 'Vida real', `WOOL JUMPER — CARE
• Wash by hand in cold water, or use the wool programme (30°C maximum).
• Do not use bleach.
• Do not put in the dryer. Dry flat, away from direct sun.
• Iron on low heat if necessary.
Colours may run: wash separately the first time.`, [
    ['What is the highest temperature for washing?', '30°C', '40°C', '60°C'],
    ['How should you dry the jumper?', 'Flat, out of the sun', 'In the dryer', 'Hanging in the sun'],
    ['The first time, you should wash it with other clothes.', 'F'],
  ], real),
  R('r5-a2-dog', 'A2', 'Getting a dog', 'Animales', `For years my children asked for a dog and I always said no. A dog needs walks, food and visits to the vet. But last spring we visited an animal shelter "just to look". An old brown dog called Rusty put his head on my knee, and that was it. Now I am the one who takes him out at seven every morning. The children help at weekends. I complain, but honestly, I love our walks.`, [
    ['Why did the writer say no at first?', 'A dog is a lot of work', 'They don\'t like dogs', 'The flat is too small'],
    ['Who walks the dog on weekday mornings?', 'The writer', 'The children', 'A neighbour'],
    ['They bought Rusty in a pet shop.', 'F'],
  ]),
  R('r5-a2-festival', 'A2', 'The village festival', 'Tradiciones', `Every August my village has a festival that lasts four days. On the first evening there is a parade with music and giant figures. The children love it. During the day there are games and a big lunch in the square for everyone — last year 600 people ate paella together. At night, bands play until three in the morning. People who have moved to the city always come back for the festival.`, [
    ['How long is the festival?', 'Four days', 'A week', 'One evening'],
    ['What happens in the square during the day?', 'A big lunch', 'A parade', 'A concert'],
    ['The festival is in winter.', 'F'],
  ]),
  R('r5-a2-interview', 'A2', 'A job interview', 'Trabajo', `Yesterday I had an interview for a job in a bookshop. I put on my best shirt and left home early, but the bus was late and I arrived exactly on time, a little out of breath. The manager asked me why I wanted the job and what books I liked. I talked too much about detective stories! She smiled and asked if I could work on Saturdays. I said yes. She is going to call me on Friday.`, [
    ['What was the job?', 'Working in a bookshop', 'Driving a bus', 'Writing stories'],
    ['What did the manager ask at the end?', 'If the writer could work on Saturdays', 'If the writer had experience', 'How old the writer was'],
    ['The writer arrived late.', 'F'],
  ]),
  R('r5-a2-gym-rules', 'A2', 'Gym rules', 'Vida real', `WELCOME TO FITZONE
• Show your membership card at reception.
• Bring a towel and use it on the machines.
• Clean the equipment after use.
• Maximum 20 minutes on running machines when the gym is busy.
• Lockers are free, but bring your own lock.
• Children under 16 must be with an adult.`, [
    ['What must you bring for the lockers?', 'A lock', 'A coin', 'A card'],
    ['When is there a time limit on the running machines?', 'When the gym is busy', 'Always', 'In the morning'],
    ['A fifteen-year-old can use the gym alone.', 'F'],
  ], real),
  R('r5-a2-holiday-plan', 'A2', 'Planning a holiday', 'Viajes', `This year we are going to Croatia in June. We are going to fly to Split and then rent a car. My husband wants to visit the national parks, and I want to relax on the beach, so we are going to do both. We have booked a flat near the sea for the first week. We haven't decided about the second week yet. Maybe we will take a boat to one of the islands.`, [
    ['How are they going to travel around Croatia?', 'By rented car', 'By train', 'By bus'],
    ['What have they booked?', 'A flat for the first week', 'A boat', 'A hotel for two weeks'],
    ['They have planned everything for the second week.', 'F'],
  ]),
  R('r5-a2-neighbours', 'A2', 'Noisy neighbours', 'Vida diaria', `The people in the flat above us are very nice, but they are also very noisy. Their son plays the drums every evening and they often have parties at the weekend. Last Saturday the music didn't stop until two in the morning. On Sunday I went upstairs and explained the problem politely. They were surprised — they didn't know we could hear everything. Now the son practises before eight, and they have promised to tell us before the next party.`, [
    ['What does the son do every evening?', 'He plays the drums', 'He has parties', 'He watches TV'],
    ['How did the neighbours react?', 'They were surprised and agreed to change', 'They were angry', 'They moved out'],
    ['The writer called the police.', 'F'],
  ]),
  R('r5-a2-healthy', 'A2', 'Small changes', 'Salud', `My doctor told me I needed to live more healthily, but I didn't want a strict diet. So I made three small changes. First, I stopped drinking sugary drinks and now I drink water. Second, I get off the bus two stops early and walk the rest. Third, I go to bed before midnight. After six months I have lost five kilos and I feel much less tired. Small changes are easier to keep.`, [
    ['What does the writer drink now?', 'Water', 'Juice', 'Sugary drinks'],
    ['How does the writer get more exercise?', 'By walking part of the way', 'By going to the gym', 'By running'],
    ['The writer followed a strict diet.', 'F'],
  ]),
  R('r5-a2-train-announce', 'A2', 'Train information', 'Vida real', `SERVICE UPDATE
The 14:25 train to Bristol is delayed by approximately 35 minutes because of a signal problem. It will now leave from platform 6, not platform 2.
Passengers for Bath can take the 14:40 from platform 4.
We are sorry for the delay. If you arrive more than 30 minutes late, you can ask for some of your money back at the ticket office.`, [
    ['Why is the train late?', 'A signal problem', 'Bad weather', 'A strike'],
    ['Which platform does the Bristol train leave from now?', 'Platform 6', 'Platform 2', 'Platform 4'],
    ['Passengers can sometimes get money back.', 'T'],
  ], real),
  R('r5-a2-pocket-money', 'A2', 'Pocket money', 'Familia', `When I was a child, my parents gave me two euros every Saturday. I could spend it on anything I wanted, but when it was gone, it was gone. Once I wanted a football that cost twenty euros. My father said, "Then you need to save for ten weeks." It was hard, but I did it. I think that football taught me more about money than any lesson at school.`, [
    ['How much pocket money did the writer get?', 'Two euros a week', 'Ten euros a week', 'Twenty euros a month'],
    ['How did the writer get the football?', 'By saving for ten weeks', 'As a birthday present', 'The father bought it'],
    ['The writer thinks the experience was useful.', 'T'],
  ]),
  R('r5-a2-moving', 'A2', 'Moving to another country', 'Vida', `Three years ago, Amira moved from Egypt to Canada to study. The first winter was a shock: she had never seen snow, and the temperature fell to minus twenty. She also missed her family and her mother's cooking. Things got better when she joined a university club and made friends from all over the world. Now she works in Toronto. She still calls her mother every day, but she says Canada feels like home.`, [
    ['Why did Amira go to Canada?', 'To study', 'To work', 'To visit family'],
    ['What helped her feel better?', 'Joining a club and making friends', 'The warm weather', 'Going back to Egypt'],
    ['Amira had seen snow before she moved.', 'F'],
  ]),
  R('r5-a2-phone-free', 'A2', 'A day without my phone', 'Tecnología', `Last week I left my phone at home by mistake. At first I felt lost. I couldn't check the time, read the news or message anyone on the train. But then something strange happened. I looked out of the window, and I noticed a park I had never seen before. At lunch I talked to a colleague instead of looking at a screen. When I got home, I had forty messages — and none of them was important.`, [
    ['Why didn\'t the writer have the phone?', 'They forgot it at home', 'It was broken', 'It was stolen'],
    ['What did the writer do at lunch?', 'Talked to a colleague', 'Read the news', 'Went to the park'],
    ['The messages were very important.', 'F'],
  ]),
  R('r5-a2-notice-lift', 'A2', 'Notice to residents', 'Vida real', `NOTICE TO ALL RESIDENTS
The lift will be out of service on Wednesday 8 March from 9 am to 5 pm for repairs. Please use the stairs.
If you need help carrying shopping or have difficulty with stairs, please contact the caretaker, Mr Novak (flat 1A), before Wednesday.
Thank you for your patience.`, [
    ['What is the problem?', 'The lift will not work for a day', 'The stairs are closed', 'There is no water'],
    ['Who should people contact for help?', 'The caretaker', 'The police', 'The repair company'],
    ['The repairs will take three days.', 'F'],
  ], real),
  R('r5-a2-volunteer', 'A2', 'Saturday mornings', 'Sociedad', `Every Saturday morning, sixteen-year-old Jake helps at a food bank. He puts tins and packets on shelves and prepares boxes for families who need them. He started because his school asked students to do twenty hours of community work. He finished those hours months ago, but he hasn't stopped. "I thought it would be boring," he says, "but the people here are great, and I feel useful."`, [
    ['What does Jake do at the food bank?', 'He organises food and prepares boxes', 'He cooks meals', 'He drives a van'],
    ['Why did he start?', 'His school asked for community work', 'His parents told him to', 'He needed money'],
    ['Jake stopped after twenty hours.', 'F'],
  ]),
  R('r5-a2-weather-forecast', 'A2', 'Weekend weather', 'Vida real', `WEEKEND FORECAST
Saturday will start cloudy with some light rain in the north. The south will be dry and sunny, with temperatures up to 24°C. On Sunday, strong winds will arrive from the west, and heavy rain is expected everywhere by the afternoon. If you are planning a barbecue, Saturday in the south is your best chance!`, [
    ['Where will it rain on Saturday?', 'In the north', 'In the south', 'Everywhere'],
    ['What will Sunday afternoon be like?', 'Wet and windy', 'Sunny', 'Snowy'],
    ['Sunday is the best day for a barbecue.', 'F'],
  ], real),
];
