import type { ReadingText } from '../core/types.ts';

const TF = ['True', 'False', 'Not given'];

/* Textitos cortos originales (A1–A2): vida diaria, notas, anuncios, mensajes. 3–4 preguntas cada uno. */
export const READINGS_3: ReadingText[] = [
  /* ---------------- A1 ---------------- */
  {
    id: 'r3-a1-family', level: 'A1', title: 'My family', topic: 'Personas',
    text: `My name is Ana. I am twenty-five and I live in Valencia with my brother, Pablo. He is twenty-two. Our parents live in a small village near the sea. My mother is a nurse and my father is a baker. He gets up at four every morning! We visit them every Sunday. We have lunch together and then we walk on the beach with their dog, Toby.`,
    questions: [
      { q: 'Who does Ana live with?', options: ['Her brother', 'Her parents', 'Her dog', 'Her friend'], answer: 0 },
      { q: 'What is her father\'s job?', options: ['Baker', 'Nurse', 'Teacher', 'Doctor'], answer: 0 },
      { q: 'When do they visit their parents?', options: ['On Sundays', 'On Saturdays', 'Every day', 'In summer'], answer: 0 },
      { q: 'Pablo is older than Ana.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a1-note', level: 'A1', real: true, title: 'A note on the fridge', topic: 'Vida real',
    text: `Hi Sam,
I'm at work until 7. There's pasta in the fridge for lunch. Please feed the cat — her food is in the cupboard next to the window. Your football boots are in the garage. Don't forget: your guitar lesson is at 5 today!
Love,
Dad
P.S. The keys are on the table.`,
    questions: [
      { q: 'Where is the cat food?', options: ['In the cupboard', 'In the fridge', 'In the garage', 'On the table'], answer: 0 },
      { q: 'What does Sam have at 5?', options: ['A guitar lesson', 'Football', 'Lunch', 'Work'], answer: 0 },
      { q: 'Dad comes home at 5.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a1-day', level: 'A1', title: 'A day in my life', topic: 'Rutinas',
    text: `I get up at seven o'clock. I have a shower and I eat breakfast: coffee and toast. I go to work by bus. I work in an office in the city centre. I start at nine and finish at five. At lunchtime I eat a sandwich in the park. In the evening I go to the gym or I cook dinner. I go to bed at eleven. I'm always tired on Fridays!`,
    questions: [
      { q: 'How does the writer go to work?', options: ['By bus', 'By car', 'On foot', 'By bike'], answer: 0 },
      { q: 'Where does the writer eat lunch?', options: ['In the park', 'In the office', 'At home', 'At the gym'], answer: 0 },
      { q: 'What time does work finish?', options: ['At five', 'At seven', 'At nine', 'At eleven'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-flat', level: 'A1', real: true, title: 'Flat for rent', topic: 'Vida real',
    text: `FLAT FOR RENT — CITY CENTRE
Two bedrooms, one bathroom, big kitchen and a small balcony.
Second floor. No lift.
Near the train station and the market.
€750 a month (water included, electricity not included).
No pets, please.
Call Marta: 612 345 678 (after 6 pm).`,
    questions: [
      { q: 'How many bedrooms are there?', options: ['Two', 'One', 'Three', 'Four'], answer: 0 },
      { q: 'What is included in the price?', options: ['Water', 'Electricity', 'Water and electricity', 'Nothing'], answer: 0 },
      { q: 'You can live there with a dog.', options: TF, answer: 1 },
      { q: 'When can you call Marta?', options: ['After 6 pm', 'Before 6 pm', 'Only in the morning', 'At the weekend'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-weather', level: 'A1', title: 'The weather this week', topic: 'Tiempo',
    text: `Today, Monday, it is sunny and warm: 24 degrees. Tomorrow it will be cloudy, but it won't rain. On Wednesday and Thursday it will rain a lot, so take your umbrella! On Friday the sun comes back, but it will be windy. The weekend will be perfect for the beach: sunny and hot, 30 degrees on Sunday.`,
    questions: [
      { q: 'Which days will be rainy?', options: ['Wednesday and Thursday', 'Monday and Tuesday', 'Friday and Saturday', 'Saturday and Sunday'], answer: 0 },
      { q: 'What will Friday be like?', options: ['Sunny and windy', 'Rainy', 'Cloudy and cold', 'Snowy'], answer: 0 },
      { q: 'It will rain on Tuesday.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a1-shop', level: 'A1', real: true, title: 'Opening hours', topic: 'Vida real',
    text: `GREEN'S BOOKSHOP
Monday – Friday: 9.30 am – 7 pm
Saturday: 10 am – 2 pm
Sunday: closed
New this month: children's books — 20% off!
Coffee corner on the first floor. Free Wi-Fi.`,
    questions: [
      { q: 'When does the shop close on Saturday?', options: ['At 2 pm', 'At 7 pm', 'At 10 am', 'It doesn\'t open'], answer: 0 },
      { q: 'What is cheaper this month?', options: ['Children\'s books', 'Coffee', 'All books', 'Magazines'], answer: 0 },
      { q: 'Where is the coffee corner?', options: ['On the first floor', 'Next to the door', 'In the garden', 'On the ground floor'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-pet', level: 'A1', title: 'Our new dog', topic: 'Animales',
    text: `We have a new dog! His name is Rocky. He is small and brown, with big ears and a short tail. He is two years old. We found him at an animal centre. Rocky loves playing in the garden and eating cheese. He doesn't like cats or the rain. At night he sleeps in the kitchen, but in the morning he jumps on my bed!`,
    questions: [
      { q: 'Where did the family find Rocky?', options: ['At an animal centre', 'In the street', 'At a friend\'s house', 'In a shop'], answer: 0 },
      { q: 'What does Rocky love eating?', options: ['Cheese', 'Fish', 'Chicken', 'Bread'], answer: 0 },
      { q: 'Where does Rocky sleep at night?', options: ['In the kitchen', 'On the bed', 'In the garden', 'In the living room'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-class', level: 'A1', real: true, title: 'English class', topic: 'Vida real',
    text: `Hello everyone!
The English class on Thursday is NOT in Room 4. It's in Room 12, on the second floor. Please bring your dictionary and a pen. We have a short test on Thursday: the past simple and numbers. After class there is coffee and cake in the café — it's Lucy's birthday!
See you there,
Mr Jones`,
    questions: [
      { q: 'Where is Thursday\'s class?', options: ['In Room 12', 'In Room 4', 'In the café', 'On the first floor'], answer: 0 },
      { q: 'What is the test about?', options: ['The past simple and numbers', 'Vocabulary', 'Writing', 'Listening'], answer: 0 },
      { q: 'Why is there cake?', options: ['It\'s Lucy\'s birthday', 'It\'s the last class', 'Mr Jones is leaving', 'They passed the test'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-holiday', level: 'A1', title: 'A postcard from Rome', topic: 'Viajes',
    text: `Dear Grandma,
We are in Rome! The weather is hot and sunny. Our hotel is small but very nice, near a big square. Yesterday we visited the Colosseum. It was amazing! Today we are eating pizza and ice cream all day. Dad wants to see museums, but I want to go shopping. We come home on Saturday.
Lots of love,
Emma`,
    questions: [
      { q: 'What did they visit yesterday?', options: ['The Colosseum', 'A museum', 'A big square', 'The shops'], answer: 0 },
      { q: 'What does Emma want to do?', options: ['Go shopping', 'See museums', 'Go to the beach', 'Stay in the hotel'], answer: 0 },
      { q: 'The hotel is big.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a1-recipe', level: 'A1', real: true, title: 'Easy fruit salad', topic: 'Comida',
    text: `EASY FRUIT SALAD (for 4 people)
You need: 2 apples, 2 bananas, 1 orange, a cup of grapes, the juice of 1 lemon, 1 spoon of honey.
1. Wash the fruit.
2. Cut the apples, bananas and orange into small pieces.
3. Put all the fruit in a big bowl.
4. Add the lemon juice and the honey.
5. Put it in the fridge for 30 minutes. Enjoy!`,
    questions: [
      { q: 'How many people is the recipe for?', options: ['Four', 'Two', 'One', 'Six'], answer: 0 },
      { q: 'What do you do first?', options: ['Wash the fruit', 'Cut the apples', 'Add honey', 'Use the fridge'], answer: 0 },
      { q: 'How long does it stay in the fridge?', options: ['30 minutes', '1 hour', '10 minutes', 'All night'], answer: 0 },
    ],
  },
  {
    id: 'r3-a1-neighbour', level: 'A1', title: 'My neighbour', topic: 'Personas',
    text: `My neighbour Mr Lee is seventy-eight years old. He lives alone with three birds. Every morning he walks to the market and buys fresh bread and flowers. He was a music teacher, and he still plays the piano every afternoon. I love listening to him. Sometimes I help him with his shopping bags, and he gives me tea and biscuits.`,
    questions: [
      { q: 'What does Mr Lee buy at the market?', options: ['Bread and flowers', 'Birds', 'Tea and biscuits', 'Music'], answer: 0 },
      { q: 'What was his job?', options: ['Music teacher', 'Baker', 'Gardener', 'Doctor'], answer: 0 },
      { q: 'Mr Lee lives with his wife.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a1-sport', level: 'A1', real: true, title: 'Sports centre', topic: 'Vida real',
    text: `RIVERSIDE SPORTS CENTRE
Swimming pool: every day, 7 am – 9 pm
Yoga: Tuesday and Thursday, 6 pm
Tennis: book a court at reception (€8 an hour)
Children's swimming lessons: Saturday morning
Price: €30 a month for adults, €15 for students.
Bring a towel — no towels at the centre!`,
    questions: [
      { q: 'When is yoga?', options: ['Tuesday and Thursday', 'Every day', 'Saturday', 'Monday and Wednesday'], answer: 0 },
      { q: 'How much do students pay a month?', options: ['€15', '€30', '€8', 'Nothing'], answer: 0 },
      { q: 'The centre gives you a towel.', options: TF, answer: 1 },
    ],
  },
  /* ---------------- A2 ---------------- */
  {
    id: 'r3-a2-move', level: 'A2', title: 'Moving to a new city', topic: 'Vida',
    text: `Last year I moved from a small town to Barcelona for a new job. At first it was difficult. I didn't know anybody, the flat was expensive and the city was very noisy. But after a few months things got better. I joined a running club and made some good friends there. Now I know the best cafés and the quiet streets. I still miss my family, but I call them every weekend and I go home for the holidays.`,
    questions: [
      { q: 'Why did the writer move?', options: ['For a new job', 'To study', 'To be near family', 'For a holiday'], answer: 0 },
      { q: 'How did the writer make friends?', options: ['In a running club', 'At work', 'In a café', 'Online'], answer: 0 },
      { q: 'What was NOT a problem at first?', options: ['The weather', 'The noise', 'The price of the flat', 'Not knowing people'], answer: 0 },
      { q: 'The writer never goes back home.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a2-email-friend', level: 'A2', real: true, title: 'An email from a friend', topic: 'Vida real',
    text: `Hi Clara,
Thanks for your message! Sorry I didn't reply sooner — I was really busy with exams. They finished on Friday, so I'm free now! Do you want to meet next weekend? There's a street food festival in the old town on Saturday. We could go there for lunch and then see a film. If it rains, we can go to the new shopping centre instead.
Let me know!
Jess`,
    questions: [
      { q: 'Why didn\'t Jess reply sooner?', options: ['She had exams', 'She was ill', 'She was on holiday', 'She lost her phone'], answer: 0 },
      { q: 'What is happening on Saturday?', options: ['A street food festival', 'A concert', 'An exam', 'A football match'], answer: 0 },
      { q: 'What is the plan if it rains?', options: ['Go to the shopping centre', 'Stay at home', 'Go to the festival anyway', 'See two films'], answer: 0 },
    ],
  },
  {
    id: 'r3-a2-lost', level: 'A2', real: true, title: 'Lost and found', topic: 'Vida real',
    text: `LOST: BLUE BACKPACK
I lost my blue backpack on the number 14 bus on Tuesday evening, between the university and the train station. Inside there is a black laptop, a red notebook and my glasses. The notebook is very important — it has all my notes for my final exams!
If you find it, please call Tom on 07700 900123. Reward: €50.`,
    questions: [
      { q: 'Where did Tom lose his backpack?', options: ['On a bus', 'At the station', 'At the university', 'On a train'], answer: 0 },
      { q: 'Why is the notebook important?', options: ['It has his exam notes', 'It was a present', 'It is expensive', 'It has his phone number'], answer: 0 },
      { q: 'Tom will give money to the person who finds it.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r3-a2-review', level: 'A2', title: 'Restaurant review', topic: 'Comida',
    text: `★★★★☆ Mario's Kitchen
We went to Mario's for my sister's birthday. The restaurant is small, so you need to book a table. The food was delicious: I had a mushroom risotto and my sister had fish with vegetables. The desserts were the best part — try the lemon cake! The only problem was the service. Our waiter was friendly but very slow, and we waited forty minutes for our main course. Prices are fair: about €25 per person.`,
    questions: [
      { q: 'Why did they go to Mario\'s?', options: ['For a birthday', 'For a business lunch', 'Because it was cheap', 'For a wedding'], answer: 0 },
      { q: 'What was the best part, according to the writer?', options: ['The desserts', 'The risotto', 'The waiter', 'The prices'], answer: 0 },
      { q: 'What was the problem?', options: ['The service was slow', 'The food was cold', 'It was expensive', 'It was too noisy'], answer: 0 },
    ],
  },
  {
    id: 'r3-a2-train', level: 'A2', real: true, title: 'Train announcement', topic: 'Vida real',
    text: `Good afternoon. This is an announcement for passengers travelling to Manchester. The 15:40 train is delayed by approximately twenty-five minutes because of a problem with the signals. The train will now leave from platform 6, not platform 2. Passengers with a ticket for the 15:40 can also travel on the 16:10 train. Refreshments are available in the waiting room. We apologise for the delay.`,
    questions: [
      { q: 'Why is the train late?', options: ['A problem with the signals', 'Bad weather', 'A strike', 'A problem with the doors'], answer: 0 },
      { q: 'Which platform will the train leave from?', options: ['6', '2', '15', '16'], answer: 0 },
      { q: 'Passengers can take a later train with the same ticket.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r3-a2-hobby', level: 'A2', title: 'A new hobby', topic: 'Ocio',
    text: `Six months ago I started learning to bake bread. I watched some videos online and bought a good bag of flour. My first loaves were terrible — hard and flat! But I didn't give up. I learned that you need patience: the dough must rest for hours. Now I bake bread every Saturday morning, and my flat smells wonderful. My neighbours love it because I often give them a loaf. Next month I want to try making croissants.`,
    questions: [
      { q: 'How did the writer learn?', options: ['From videos online', 'In a class', 'From a book', 'From a neighbour'], answer: 0 },
      { q: 'What was wrong with the first loaves?', options: ['They were hard and flat', 'They were too sweet', 'They were burnt', 'They were too big'], answer: 0 },
      { q: 'What does the writer want to try next?', options: ['Croissants', 'Cakes', 'Pizza', 'Cookies'], answer: 0 },
    ],
  },
  {
    id: 'r3-a2-doctor', level: 'A2', title: 'At the doctor\'s', topic: 'Salud',
    text: `Doctor: Good morning. What's the problem?
Patient: I've had a sore throat and a headache for three days. And I feel very tired.
Doctor: Do you have a temperature?
Patient: Yes, a little — 38 degrees last night.
Doctor: Let me look... It's a throat infection, but it isn't serious. Drink a lot of water, rest, and take this medicine three times a day after meals. If you don't feel better in five days, come back.
Patient: Can I go to work?
Doctor: Better not. Stay at home until Friday.`,
    questions: [
      { q: 'How long has the patient been ill?', options: ['Three days', 'Five days', 'One day', 'A week'], answer: 0 },
      { q: 'When should the patient take the medicine?', options: ['After meals', 'Before bed', 'Once a day', 'Before meals'], answer: 0 },
      { q: 'The doctor says the patient should go to work.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a2-volunteer', level: 'A2', real: true, title: 'Volunteers wanted', topic: 'Vida real',
    text: `VOLUNTEERS WANTED!
Can you give us two hours a week? The City Library is looking for volunteers to read stories to children (ages 4–8) on Saturday mornings. You don't need experience, but you need to be patient and love books. We also need help to organise our summer book sale in July.
All volunteers get a free coffee and a library card.
Interested? Send an email to Pat at the library before 31 May.`,
    questions: [
      { q: 'What will volunteers do on Saturdays?', options: ['Read stories to children', 'Sell books', 'Clean the library', 'Make coffee'], answer: 0 },
      { q: 'Do you need experience?', options: ['No', 'Yes', 'Only for the book sale', 'Two years'], answer: 0 },
      { q: 'Volunteers are paid €10 an hour.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a2-phone', level: 'A2', title: 'A week without my phone', topic: 'Tecnología',
    text: `Last month I tried an experiment: one week without my smartphone. The first two days were really hard. I kept looking for it in my pocket, and I didn't know what time it was! I had to buy a cheap watch. But on the third day I started to enjoy it. I read two books, I talked more with my flatmates and I slept better. The worst part? I got lost twice because I couldn't use maps. Now I leave my phone in another room at night.`,
    questions: [
      { q: 'What did the writer buy?', options: ['A watch', 'A map', 'A new phone', 'Two books'], answer: 0 },
      { q: 'What was a good result of the experiment?', options: ['Sleeping better', 'Getting lost', 'Buying a phone', 'Working more'], answer: 0 },
      { q: 'What does the writer do now?', options: ['Leaves the phone in another room at night', 'Never uses the phone', 'Uses the phone more', 'Turns it off at weekends'], answer: 0 },
    ],
  },
  {
    id: 'r3-a2-festival', level: 'A2', title: 'A town festival', topic: 'Cultura',
    text: `Every August, the small town of Buñol in Spain has a very unusual festival: La Tomatina. Thousands of people from all over the world come to throw tomatoes at each other in the streets. It lasts only one hour, but by the end everybody is red from head to toe! Before the festival, shop owners cover their windows with plastic. After it, fire trucks clean the streets with water. Today you need a ticket because the town is too small for everyone who wants to come.`,
    questions: [
      { q: 'How long does the tomato fight last?', options: ['One hour', 'One day', 'One week', 'Ten minutes'], answer: 0 },
      { q: 'Why do shops cover their windows?', options: ['To protect them from tomatoes', 'Because they close for a month', 'To keep out the sun', 'For decoration'], answer: 0 },
      { q: 'Why do you need a ticket now?', options: ['Too many people want to come', 'To buy tomatoes', 'To pay the fire trucks', 'It\'s a law in Spain'], answer: 0 },
    ],
  },
  {
    id: 'r3-a2-invite', level: 'A2', real: true, title: 'Party invitation', topic: 'Vida real',
    text: `You're invited!
Come and celebrate Nina's 30th birthday!
When: Saturday 14 June, from 8 pm
Where: The Garden Bar, 22 High Street (upstairs)
Dress code: something yellow!
There will be food, music and a surprise at 10 pm. Please don't tell Nina — it's a secret party!
Please reply to Marc by Wednesday so we know how many people are coming.`,
    questions: [
      { q: 'What should guests wear?', options: ['Something yellow', 'Formal clothes', 'A costume', 'Anything'], answer: 0 },
      { q: 'Who do you reply to?', options: ['Marc', 'Nina', 'The bar', 'Nobody'], answer: 0 },
      { q: 'Nina knows about the party.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r3-a2-grandad', level: 'A2', title: 'When my grandad was young', topic: 'Pasado',
    text: `My grandad was born in 1948 in a village with no electricity. When he was a boy, he walked five kilometres to school every day, even in winter. There were no cars in the village, only donkeys and one old bus. In the evenings his family sat around the fire and his mother told stories. He left school at fourteen to work on the farm. At twenty he moved to the city and got a job in a factory. He says life was harder, but people helped each other more.`,
    questions: [
      { q: 'How did grandad get to school?', options: ['He walked', 'By bus', 'By donkey', 'By car'], answer: 0 },
      { q: 'How old was he when he started working on the farm?', options: ['Fourteen', 'Twenty', 'Ten', 'Eighteen'], answer: 0 },
      { q: 'What does grandad think about the past?', options: ['People helped each other more', 'Life was easier', 'School was fun', 'The city was better'], answer: 0 },
    ],
  },
];
