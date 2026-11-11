import type { ReadingText } from '../core/types.ts';

const TF = ['True', 'False', 'Not given'];

/* Textos originales. Temas inspirados en el temario Advanced English (medio ambiente, transporte, educación,
   tradiciones, Nobel) + documentos de la vida real + textos largos C1. */
export const READINGS_2: ReadingText[] = [
  {
    id: 'r-a1-messages', level: 'A1', real: true, title: 'Text messages', topic: 'Vida real',
    text: `Mum (10:15): Hi! Are you at home? I'm at the supermarket. Do we need milk?
Leo (10:17): Hi Mum. Yes, we need milk and eggs. There's no bread too.
Mum (10:18): OK. Anything else?
Leo (10:20): Can you buy some apples? And chocolate, please!
Mum (10:21): Apples yes, chocolate no 😄 Is your sister at home?
Leo (10:22): No, she's at the gym. She's back at 12.
Mum (10:23): OK. I'm home at 11. Please clean your room!
Leo (10:23): 👍`,
    questions: [
      { q: 'Where is Mum?', options: ['At the supermarket', 'At home', 'At the gym', 'At work'], answer: 0 },
      { q: 'What do they NOT need?', options: ['Rice', 'Milk', 'Eggs', 'Bread'], answer: 0 },
      { q: 'Will Mum buy chocolate?', options: ['No', 'Yes', 'Maybe', 'Only for the sister'], answer: 0 },
      { q: 'Where is Leo\'s sister?', options: ['At the gym', 'At home', 'At school', 'At the supermarket'], answer: 0 },
      { q: 'Mum is home at 12.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-a1-cafe', level: 'A1', real: true, title: 'At the café', topic: 'Vida real',
    text: `THE CORNER CAFÉ — MENU
Coffee £2.50 · Tea £2.00 · Orange juice £3.00
Toast with butter £3.50 · Eggs on toast £6.00 · Soup of the day £5.50
Chocolate cake £4.00 · Apple pie £4.00
Open every day 8 am – 6 pm. Closed on Christmas Day.

Waiter: Good morning! What would you like?
Customer: A coffee and eggs on toast, please.
Waiter: Anything else?
Customer: No, thank you. Oh — do you have Wi-Fi?
Waiter: Yes, the password is on the table. That's £8.50, please.`,
    questions: [
      { q: 'What does the customer order?', options: ['Coffee and eggs on toast', 'Tea and toast', 'Soup and coffee', 'Juice and cake'], answer: 0 },
      { q: 'How much does the customer pay?', options: ['£8.50', '£6.00', '£2.50', '£9.00'], answer: 0 },
      { q: 'When is the café closed?', options: ['On Christmas Day', 'On Sundays', 'In the evening only', 'Never'], answer: 0 },
      { q: 'Where is the Wi-Fi password?', options: ['On the table', 'On the menu', 'On the door', 'The waiter says it'], answer: 0 },
      { q: 'Apple pie is more expensive than chocolate cake.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-a2-flatad', level: 'A2', real: true, title: 'Room for rent', topic: 'Vida real · vivienda',
    text: `ROOM FOR RENT — CITY CENTRE
Large, bright double room in a friendly shared flat. The flat has three bedrooms, a modern kitchen, a living room and two bathrooms. You will share with two students (one from Italy, one from Ireland).
Rent: £650 per month, including bills (water, electricity, internet). Deposit: one month's rent.
The flat is a five-minute walk from the train station and there is a supermarket on the same street.
Sorry, no pets and no smoking. Minimum stay: six months.
Available from 1st September. If you are interested, send a message to Kate on 07700 900123 and tell us a little about yourself.`,
    questions: [
      { q: 'How many people will you share the flat with?', options: ['Two', 'Three', 'One', 'Four'], answer: 0 },
      { q: 'What is included in the rent?', options: ['Bills', 'Food', 'Parking', 'Cleaning'], answer: 0 },
      { q: 'How long must you stay at least?', options: ['Six months', 'One month', 'One year', 'Three months'], answer: 0 },
      { q: 'What should you do if you are interested?', options: ['Send a message to Kate', 'Visit the flat', 'Email the agency', 'Call the students'], answer: 0 },
      { q: 'You can have a cat in the flat.', options: TF, answer: 1 },
      { q: 'The room has its own bathroom.', options: TF, answer: 2 },
    ],
  },
  {
    id: 'r-a2-instructions', level: 'A2', real: true, title: 'How to use the library', topic: 'Vida real · universidad',
    text: `WELCOME TO THE UNIVERSITY LIBRARY
Borrowing books: You can borrow up to ten books at a time. Undergraduate students can keep books for three weeks; postgraduate students for six weeks. You can renew a book online twice, unless another student has reserved it.
Late returns: If you return a book late, you will pay 20p per day. You cannot borrow more books until you pay.
Study rooms: Group study rooms must be booked online. You can book a room for a maximum of three hours per day.
Quiet zones: The second and third floors are silent study areas. Please do not talk or make phone calls there. You can eat cold snacks on the ground floor only.
Opening hours: Monday–Friday 8 am – midnight. Weekends 10 am – 8 pm. During exam periods, the library is open 24 hours.`,
    questions: [
      { q: 'How long can an undergraduate keep a book?', options: ['Three weeks', 'Six weeks', 'Two weeks', 'Ten days'], answer: 0 },
      { q: 'When can you NOT renew a book?', options: ['When someone has reserved it', 'At weekends', 'After one week', 'If it is new'], answer: 0 },
      { q: 'What happens if you don\'t pay a late fee?', options: ['You can\'t borrow more books', 'You lose your student card', 'You pay double', 'Nothing'], answer: 0 },
      { q: 'Where can you eat?', options: ['On the ground floor', 'On the second floor', 'In study rooms', 'Anywhere'], answer: 0 },
      { q: 'The library is always open 24 hours.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-a2-traditions', level: 'A2', title: 'Wedding traditions around the world', topic: 'Cultura y tradiciones',
    text: `Weddings are important in almost every culture, but the traditions are very different from country to country.
In India, weddings often last for several days. Before the ceremony, the bride's hands and feet are decorated with beautiful designs made with henna.
In Spain, the groom traditionally gives the bride thirteen coins, called "arras". They are a symbol that he will take care of her and share everything with her.
In the United Kingdom, many brides follow an old rhyme: they wear "something old, something new, something borrowed, something blue" for good luck.
In some parts of Palestine and Jordan, family and friends perform a traditional group dance called the dabke at the wedding party. Everyone holds hands and moves together, stamping their feet to the music.
Although the traditions are different, the idea is always the same: two families come together to celebrate love.`,
    questions: [
      { q: 'How long do weddings in India often last?', options: ['Several days', 'One afternoon', 'One week exactly', 'A month'], answer: 0 },
      { q: 'What are "arras"?', options: ['Thirteen coins', 'A dance', 'A dress', 'Henna designs'], answer: 0 },
      { q: 'Why do some British brides wear "something blue"?', options: ['For good luck', 'Because it is the law', 'To be different', 'Because blue is cheap'], answer: 0 },
      { q: 'What is the dabke?', options: ['A group dance', 'A wedding song', 'A type of food', 'A gift'], answer: 0 },
      { q: 'What is the main idea of the last paragraph?', options: ['All weddings celebrate love and families', 'Spanish weddings are the best', 'Traditions are disappearing', 'Weddings are expensive'], answer: 0 },
    ],
  },
  {
    id: 'r-b1-climate', level: 'B1', title: 'Climate change in five questions', topic: 'Medio ambiente',
    text: `What is climate change? It refers to long-term changes in temperatures and weather patterns. Although some of these changes are natural, since the 1800s human activities have been the main cause, mainly because of the burning of fossil fuels such as coal, oil and gas.
Why does burning fuel warm the planet? When we burn fossil fuels, we release gases like carbon dioxide. These "greenhouse gases" act like a blanket around the Earth: they trap the sun's heat and raise temperatures.
What are the effects? The Earth is now about 1.1°C warmer than in the late 1800s. This may not sound like much, but it has already led to more intense droughts, heatwaves, floods and storms, as well as rising sea levels. Some species are struggling to survive because their habitats are changing too quickly.
Can we stop it? Scientists agree that we can still limit the worst effects if we drastically reduce emissions in the coming decades. This means switching to renewable energy, making buildings and transport more efficient and protecting forests, which absorb carbon dioxide.
What can individuals do? Personal choices — such as using public transport, eating less meat or wasting less energy — help, but experts stress that the biggest changes must come from governments and industry.`,
    questions: [
      { q: 'What has been the main cause of climate change since the 1800s?', options: ['Human activities', 'Natural changes', 'The sun', 'Volcanoes'], answer: 0 },
      { q: 'Greenhouse gases are compared to…', options: ['a blanket', 'a mirror', 'a fire', 'a wall'], answer: 0 },
      { q: 'Why are some species in danger?', options: ['Their habitats change too fast', 'They are hunted', 'They eat less', 'There are too many of them'], answer: 0 },
      { q: 'Why are forests important?', options: ['They absorb carbon dioxide', 'They produce oil', 'They cause floods', 'They make energy'], answer: 0 },
      { q: 'According to experts, the biggest changes must come from…', options: ['governments and industry', 'individuals only', 'scientists', 'schools'], answer: 0 },
      { q: 'The Earth is 3°C warmer than in the 1800s.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b1-jobad', level: 'B1', real: true, title: 'Job advert: Junior Data Analyst', topic: 'Vida real · trabajo',
    text: `JUNIOR DATA ANALYST — GreenLeaf Energy (Hybrid, Manchester)
About us: GreenLeaf Energy is a fast-growing company that helps households switch to solar power. We are looking for a curious and organised junior analyst to join our team of eight.
What you will do:
• Collect and clean data from our sales and customer systems.
• Create weekly reports and dashboards for the management team.
• Help to identify trends that could improve our services.
What we are looking for:
• A degree in maths, economics, computer science or a related field.
• Good knowledge of Excel; experience with SQL or Python is an advantage but not essential.
• Excellent attention to detail and the ability to explain numbers clearly to non-experts.
What we offer: A salary of £28,000–£32,000, 25 days' holiday, two days a week working from home and a training budget of £1,000 per year.
How to apply: Send your CV and a short cover letter explaining why you are interested in renewable energy to jobs@greenleaf.example by 30th June. Only shortlisted candidates will be contacted.`,
    questions: [
      { q: 'What does the company do?', options: ['Helps homes switch to solar power', 'Sells cars', 'Builds software', 'Trains analysts'], answer: 0 },
      { q: 'Which skill is NOT essential?', options: ['Python', 'Excel', 'Attention to detail', 'Explaining numbers clearly'], answer: 0 },
      { q: 'How many days can you work from home?', options: ['Two per week', 'Every day', 'None', 'Three per week'], answer: 0 },
      { q: 'What should the cover letter explain?', options: ['Your interest in renewable energy', 'Your salary expectations', 'Your hobbies', 'Your Python projects'], answer: 0 },
      { q: 'Every candidate will receive an answer.', options: TF, answer: 1 },
      { q: '"Shortlisted" candidates are…', options: ['candidates selected for the next stage', 'candidates with short CVs', 'rejected candidates', 'part-time candidates'], answer: 0 },
    ],
  },
  {
    id: 'r-b1-hybrid', level: 'B1', title: 'How hybrid cars work', topic: 'Transporte',
    text: `A hybrid car uses two sources of power: a conventional petrol engine and an electric motor with a battery. The car's computer decides which one to use, or combines both, depending on the situation.
At low speeds, for example in city traffic, many hybrids run on electricity alone, which is quiet and produces no exhaust emissions. When the driver accelerates hard or travels at high speed on a motorway, the petrol engine starts working, sometimes with help from the electric motor.
One of the cleverest features is "regenerative braking". In a normal car, the energy produced when you brake is lost as heat. In a hybrid, the electric motor works like a generator when the car slows down, and the energy is used to recharge the battery.
There are two main types. "Full hybrids" charge their batteries only by themselves, through the engine and braking. "Plug-in hybrids" have bigger batteries that can also be charged from a socket, so they can travel longer distances — often 40 to 80 kilometres — without using any fuel.
Hybrids use less fuel than traditional cars, especially in towns. However, critics point out that they are heavier and more expensive, and that plug-in hybrids only bring real benefits if their owners actually charge them regularly.`,
    questions: [
      { q: 'When do many hybrids use only electricity?', options: ['At low speeds in the city', 'On motorways', 'When accelerating hard', 'Never'], answer: 0 },
      { q: 'What is regenerative braking?', options: ['Using braking energy to recharge the battery', 'A special type of brake pedal', 'Braking with the engine', 'A safety system'], answer: 0 },
      { q: 'How is a plug-in hybrid different from a full hybrid?', options: ['It can be charged from a socket', 'It has no petrol engine', 'It is cheaper', 'It is lighter'], answer: 0 },
      { q: 'When do plug-in hybrids bring real benefits?', options: ['If owners charge them regularly', 'Only on motorways', 'When they are new', 'Always'], answer: 0 },
      { q: 'Hybrids are lighter than normal cars.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b2-hyperloop', level: 'B2', title: 'Hyperloop: the future that keeps being postponed', topic: 'Transporte',
    text: `In 2013, the entrepreneur Elon Musk published a paper describing a new form of transport he called the Hyperloop. Passengers would travel in pods through low-pressure tubes, floating on air or magnetic fields. With almost no air resistance or friction, the pods could reach speeds of over 1,000 kilometres per hour — faster than a plane — while using relatively little energy.
The idea captured the public imagination. Within a few years, dozens of start-ups and university teams were competing to develop the technology, and several governments signed agreements to study possible routes, from Los Angeles to San Francisco and from Dubai to Abu Dhabi.
A decade later, however, not a single passenger line is in operation. The most prominent company, Hyperloop One, closed down in 2023 after failing to secure enough contracts. The reasons are both technical and economic. Maintaining a near-vacuum inside hundreds of kilometres of tube is extremely difficult and expensive; even a small leak or a slight movement of the ground could be catastrophic at such speeds. Building perfectly straight, elevated or underground tubes across varied terrain would cost billions, and critics argue that the capacity of small pods would be far lower than that of conventional high-speed trains.
Supporters reply that every revolutionary technology seemed impossible at first, and some research continues, particularly in Europe and China. For now, though, the Hyperloop remains a fascinating example of how a brilliant concept can be much easier to imagine than to build.`,
    questions: [
      { q: 'Why could Hyperloop pods travel so fast?', options: ['There is almost no air resistance or friction', 'They use jet engines', 'The tubes go downhill', 'They are very light'], answer: 0 },
      { q: 'What happened to Hyperloop One?', options: ['It closed down in 2023', 'It opened a line in Dubai', 'It was bought by a government', 'It moved to China'], answer: 0 },
      { q: 'Which is mentioned as a technical problem?', options: ['Keeping a near-vacuum in the tubes', 'Finding drivers', 'The noise of the pods', 'Lack of electricity'], answer: 0 },
      { q: 'What do critics say about capacity?', options: ['Pods carry far fewer people than trains', 'Pods are too big', 'Planes carry fewer people', 'There is no capacity problem'], answer: 0 },
      { q: 'What is the writer\'s final conclusion?', options: ['A great idea can be much harder to build than to imagine', 'The Hyperloop will open soon', 'Trains are obsolete', 'Elon Musk was wrong about everything'], answer: 0 },
      { q: 'Research on the Hyperloop has completely stopped.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b2-melt', level: 'B2', title: 'The big melt', topic: 'Medio ambiente',
    text: `Glaciers and ice sheets hold about 69 percent of the world's fresh water. For thousands of years, they have grown in winter and shrunk in summer in a rough balance. Today, that balance has been broken: almost everywhere on Earth, ice is disappearing faster than it is being replaced.
The consequences are not limited to polar regions. Mountain glaciers in the Himalayas, the Andes and the Alps act as natural water towers, storing water in winter and releasing it gradually in the dry season. Hundreds of millions of people depend on this meltwater for drinking, farming and electricity. In the short term, faster melting can actually increase river flows, but once a glacier has shrunk past a certain point, the supply falls sharply — a phenomenon known as "peak water".
Melting ice on land also raises sea levels. The ice sheets of Greenland and Antarctica are now losing hundreds of billions of tonnes of ice a year. If Greenland's ice sheet melted completely — which would take centuries — global sea levels would rise by around seven metres.
There is also a dangerous feedback loop. White ice reflects most of the sunlight that reaches it, whereas darker land and ocean absorb it. As ice disappears, more heat is absorbed, which causes more melting. Scientists fear that some ice sheets may be approaching "tipping points", beyond which their loss would become unstoppable even if temperatures stopped rising.`,
    questions: [
      { q: 'Why are mountain glaciers called "water towers"?', options: ['They store water and release it gradually', 'They are very tall', 'They produce electricity', 'They are made of fresh water only'], answer: 0 },
      { q: 'What is "peak water"?', options: ['The point after which meltwater supply falls sharply', 'The highest glacier', 'A flood', 'The maximum sea level'], answer: 0 },
      { q: 'If Greenland\'s ice sheet melted completely, sea levels would rise by…', options: ['about seven metres', 'about seventy metres', 'one metre', 'a few centimetres'], answer: 0 },
      { q: 'Why does losing ice cause more warming?', options: ['Darker surfaces absorb more heat', 'Ice produces heat', 'Water is warmer than ice', 'Sunlight gets stronger'], answer: 0 },
      { q: 'A "tipping point" is a point…', options: ['beyond which change becomes unstoppable', 'where ice starts to grow', 'of maximum temperature', 'where glaciers meet the sea'], answer: 0 },
      { q: 'Faster melting always reduces river flows immediately.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b2-terms', level: 'B2', real: true, title: 'Terms and conditions: StreamPlus subscription', topic: 'Vida real · contratos',
    text: `1. Free trial. New members are entitled to a 30-day free trial. Unless you cancel at least 24 hours before the end of the trial, your subscription will automatically renew and the monthly fee will be charged to your payment method.
2. Fees and changes. We may change the price of the subscription. We will notify you at least 30 days in advance, and the new price will apply from your next billing date. If you do not agree with the change, you may cancel before it takes effect.
3. Cancellation. You may cancel at any time through your account settings. Cancellation will take effect at the end of the current billing period; no refunds will be given for partial months, except where required by law.
4. Account sharing. Your account is for personal use by members of your household only. Sharing your password with people outside your household may result in the suspension of your account.
5. Content availability. The selection of films and series varies by country and may change over time. We do not guarantee that any specific title will remain available.
6. Liability. To the extent permitted by law, we shall not be liable for any indirect loss arising from your use of the service.`,
    questions: [
      { q: 'What happens if you don\'t cancel the free trial in time?', options: ['You start paying automatically', 'The account is closed', 'You get another free month', 'You must call the company'], answer: 0 },
      { q: 'How much notice do they give before changing the price?', options: ['At least 30 days', '24 hours', 'None', 'One week'], answer: 0 },
      { q: 'If you cancel in the middle of the month…', options: ['you can use it until the end of the billing period', 'you get a refund for the rest of the month', 'it stops immediately', 'you pay a fine'], answer: 0 },
      { q: 'Who can use your account?', options: ['People in your household', 'Anyone you give the password to', 'Only you', 'Up to ten friends'], answer: 0 },
      { q: '"We shall not be liable" means…', options: ['we are not legally responsible', 'we will pay you', 'we are not reliable', 'we will ask you'], answer: 0 },
      { q: 'StreamPlus guarantees that all titles will stay available.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b2-nobel', level: 'B2', title: 'The man behind the Nobel Prize', topic: 'Historia',
    text: `In 1888, the Swedish chemist and industrialist Alfred Nobel opened a French newspaper and read his own obituary. His brother Ludvig had died, and the journalist had confused the two. The headline was brutal: "The merchant of death is dead." Nobel, who had made a fortune from the invention of dynamite and other explosives, was described as a man who had become rich by finding ways to kill more people faster than ever before.
Whether or not this episode really changed his mind — historians still debate it — Nobel spent his final years thinking about his legacy. When he died in 1896, his family was shocked to discover that he had left the vast majority of his fortune to create a series of prizes "to those who, during the preceding year, have conferred the greatest benefit to humankind".
The will specified five fields: physics, chemistry, physiology or medicine, literature and peace. A prize in economic sciences was added in 1968, funded by Sweden's central bank. The first prizes were awarded in 1901, and the Peace Prize, unusually, is decided by a committee in Norway rather than Sweden.
Over the years, the prizes have not been free of controversy. Some winners of the Peace Prize have later been criticised for their actions, and the science prizes have been accused of overlooking women and of rewarding individuals for discoveries that were in fact the result of large teams. Even so, more than a century later, the Nobel remains the most prestigious award in the world.`,
    questions: [
      { q: 'Why did Nobel read his own obituary?', options: ['A journalist confused him with his brother', 'He had faked his death', 'He was very ill', 'It was a joke'], answer: 0 },
      { q: 'What did the newspaper call him?', options: ['The merchant of death', 'The king of dynamite', 'The father of peace', 'The richest man alive'], answer: 0 },
      { q: 'What do historians debate?', options: ['Whether the obituary changed his mind', 'When he invented dynamite', 'Where he died', 'How rich he was'], answer: 0 },
      { q: 'Which prize was NOT in Nobel\'s original will?', options: ['Economic sciences', 'Literature', 'Peace', 'Chemistry'], answer: 0 },
      { q: 'What criticism of the science prizes is mentioned?', options: ['Overlooking women and team work', 'Being too easy to win', 'Being too expensive', 'Only rewarding Swedes'], answer: 0 },
      { q: 'The Peace Prize is decided in Sweden.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b2-procrastination', level: 'B2', title: 'Why we procrastinate', topic: 'Psicología',
    text: `Most people assume that procrastination is a problem of laziness or poor time management. Psychologists increasingly see it differently: as a problem of emotion regulation.
When we face a task that makes us feel bad — because it is boring, difficult, ambiguous or linked to a fear of failure — our brain looks for a quick way to feel better. Checking our phone, tidying the desk or watching "just one" video provides immediate relief. The task is still there, of course, and the relief is temporary, but the brain is wired to prioritise short-term mood over long-term goals.
This explains why procrastinators often feel guilty, which in turn makes the task even more unpleasant, creating a vicious circle. Research has found that students who forgave themselves for procrastinating on one exam procrastinated less before the next one. Self-criticism, it seems, does not motivate; it simply adds to the negative feelings we are trying to escape.
So what helps? Experts recommend making the first step ridiculously small ("open the document and write one sentence"), removing distractions before starting rather than relying on willpower, and getting curious about the feelings the task produces instead of fighting them. Breaking work into short, timed sessions with real breaks can also reduce the sense of being overwhelmed. The goal is not to become a perfectly disciplined machine, but to make starting easier than avoiding.`,
    questions: [
      { q: 'According to psychologists, procrastination is mainly a problem of…', options: ['emotion regulation', 'laziness', 'intelligence', 'time management'], answer: 0 },
      { q: 'Why do we check our phones instead of working?', options: ['It gives immediate relief from bad feelings', 'It helps us plan', 'It is part of the task', 'We are curious'], answer: 0 },
      { q: 'What did the research on students show?', options: ['Self-forgiveness reduced later procrastination', 'Guilt improves motivation', 'Students who procrastinate get better grades', 'Exams cause procrastination'], answer: 0 },
      { q: 'Which strategy is recommended?', options: ['Making the first step very small', 'Criticising yourself', 'Working without breaks', 'Relying on willpower'], answer: 0 },
      { q: 'The phrase "vicious circle" means…', options: ['a situation where a problem keeps making itself worse', 'a group of lazy people', 'a daily routine', 'a solution that works'], answer: 0 },
    ],
  },
  {
    id: 'r-c1-education-systems', level: 'C1', title: 'What makes an education system work?', topic: 'Educación',
    text: `Every few years, the publication of international rankings such as PISA prompts a familiar ritual. Politicians in countries that have slipped down the table announce reforms, while delegations travel to whichever nation currently tops the list in search of its secret. For a long time, that nation was Finland; more recently, it has tended to be Singapore, Estonia or parts of China.
What is striking about these high performers is how little they resemble one another on the surface. Finnish pupils start formal schooling at seven, take few standardised tests and spend comparatively short hours in class. Singaporean students, by contrast, follow a demanding, centrally designed curriculum and face high-stakes national examinations. Any attempt to distil a single formula from such different systems seems doomed to failure.
Look more closely, however, and certain common threads emerge. The first is the status of teaching. In the most successful systems, teaching is a selective, well-trained and respected profession; teachers are given time to plan, observe one another and improve their practice collaboratively. The second is coherence: curricula, teacher training and assessment are aligned, so that what is taught, how it is taught and what is measured reinforce rather than contradict each other. The third is equity. Top performers tend to identify struggling pupils early and direct resources towards them, so that a child's background is a weaker predictor of results than elsewhere.
Equally instructive is what does not appear to matter as much as public debate suggests. Class size, beyond a certain point, has a modest effect compared with teacher quality. Technology, introduced without a clear pedagogical purpose, often makes little difference — and occasionally a negative one.
Perhaps the most important lesson, though, concerns time. The reforms that transformed these systems typically took decades and survived several changes of government. Policies borrowed wholesale, implemented hastily and abandoned at the next election rarely live up to expectations. Education systems, it turns out, are less like machines that can be re-engineered than like ecosystems that must be cultivated.`,
    questions: [
      { q: 'What "ritual" does the writer describe?', options: ['Reacting to rankings with reforms and visits', 'Teachers going on strike', 'Students taking exams', 'Changing school hours'], answer: 0 },
      { q: 'Why is it hard to find one formula for success?', options: ['Top systems look very different on the surface', 'There is not enough data', 'Rankings are unreliable', 'All systems are the same'], answer: 0 },
      { q: 'What does "coherence" refer to?', options: ['Curriculum, training and assessment being aligned', 'Students behaving well', 'All schools being identical', 'Teachers agreeing with politicians'], answer: 0 },
      { q: 'How do top performers promote equity?', options: ['By identifying and helping struggling pupils early', 'By reducing taxes', 'By selecting the best pupils', 'By using more technology'], answer: 0 },
      { q: 'According to the text, class size…', options: ['matters less than teacher quality beyond a point', 'is the most important factor', 'has no effect at all', 'should be as large as possible'], answer: 0 },
      { q: 'The final metaphor suggests that education systems…', options: ['need long-term, patient development', 'can be quickly fixed', 'are like broken machines', 'should copy nature'], answer: 0 },
      { q: 'Finnish pupils face high-stakes national exams throughout school.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-c1-ethics-ai', level: 'C1', title: 'Who is responsible when an algorithm decides?', topic: 'Ética y tecnología',
    text: `Algorithms increasingly make, or heavily influence, decisions that were once the preserve of human judgement: who is shortlisted for a job, who is granted a loan, which neighbourhoods receive more police patrols and even, in some jurisdictions, who is released on bail. Proponents argue that well-designed systems can be more consistent than people, who are prone to fatigue, prejudice and mood. Critics counter that automation can entrench existing injustices while making them harder to see and to challenge.
The problem frequently lies in the data. A system trained on past hiring decisions will learn the patterns embedded in those decisions — including, potentially, a historical preference for candidates of a particular gender or background. Crucially, simply removing sensitive variables such as gender or ethnicity does not solve the issue, since other variables, such as postcode or the university attended, can act as proxies for them.
A second difficulty is opacity. Many of the most powerful models are, in effect, black boxes: even their designers cannot fully explain why a particular input produced a particular output. This poses an obvious challenge for the principle that people should be able to understand, and contest, decisions that significantly affect their lives.
Then there is the question of accountability. When a human loan officer makes a discriminatory decision, responsibility can, at least in principle, be assigned. When the decision emerges from the interaction between a dataset compiled by one organisation, a model built by a second and a deployment chosen by a third, responsibility risks becoming so diffuse that, in practice, nobody bears it.
Regulators have begun to respond. The European Union's AI Act, for instance, classifies certain uses — among them recruitment, credit scoring and access to public services — as "high-risk", subjecting them to requirements concerning data quality, documentation, human oversight and transparency. Whether such rules will prove effective remains to be seen. What seems clear is that the question is not whether algorithms should play a role in consequential decisions, but under what conditions, and with what safeguards, they should be allowed to.`,
    questions: [
      { q: 'What do proponents of algorithmic decisions claim?', options: ['They can be more consistent than humans', 'They are always fair', 'They are cheaper', 'They remove the need for data'], answer: 0 },
      { q: 'Why doesn\'t removing gender from the data solve bias?', options: ['Other variables can act as proxies', 'Gender is always needed', 'The law forbids it', 'Models ignore missing data'], answer: 0 },
      { q: 'What is meant by "black boxes"?', options: ['Models whose reasoning cannot be fully explained', 'Hidden servers', 'Illegal algorithms', 'Models without data'], answer: 0 },
      { q: 'Why is accountability a problem?', options: ['Responsibility is spread among several organisations', 'Loan officers refuse responsibility', 'There are no laws', 'Algorithms cannot be switched off'], answer: 0 },
      { q: 'Under the AI Act, recruitment systems are…', options: ['classified as high-risk', 'banned', 'unregulated', 'only allowed in public services'], answer: 0 },
      { q: 'The writer\'s conclusion is that the key question is…', options: ['under what conditions algorithms should decide', 'whether to ban algorithms', 'how to make algorithms faster', 'who invented the algorithms'], answer: 0 },
      { q: '"Diffuse" (paragraph 4) most nearly means…', options: ['spread out', 'clear', 'expensive', 'illegal'], answer: 0 },
    ],
  },
  {
    id: 'r-c1-abstract', level: 'C1', real: true, title: 'Reading a research abstract', topic: 'Vida real · artículos científicos',
    text: `Title: Spaced retrieval practice and long-term retention of vocabulary in adult second-language learners: a randomised controlled trial
Background: Although the benefits of spaced and retrieval-based practice are well established in laboratory settings, evidence from authentic language-learning contexts remains limited.
Methods: We randomly assigned 412 adult learners of English (CEFR levels A2–B2) to one of three conditions over eight weeks: (1) massed restudy, in which learners reread word lists in a single weekly session; (2) massed retrieval, in which learners tested themselves in a single weekly session; and (3) spaced retrieval, in which self-testing was distributed across four shorter sessions per week, with intervals adapted to individual performance. Total study time was held constant across conditions. Retention was assessed immediately after the intervention and at a six-month follow-up.
Results: At the immediate post-test, both retrieval conditions outperformed massed restudy (d = 0.41 and d = 0.58 respectively). At follow-up, the advantage of spaced retrieval increased substantially (d = 0.92 relative to massed restudy), whereas the advantage of massed retrieval was no longer statistically significant. Learners in the restudy condition rated their own learning as highest, despite performing worst.
Conclusions: Distributing self-testing over time yields markedly better long-term vocabulary retention than equivalent amounts of rereading. The mismatch between perceived and actual learning suggests that learners may systematically underuse the most effective strategies. Limitations include the reliance on a single outcome measure and a sample drawn predominantly from university settings.`,
    questions: [
      { q: 'What gap in research does the study address?', options: ['Lack of evidence from real language-learning contexts', 'Lack of laboratory studies', 'Lack of studies on children', 'Lack of studies on grammar'], answer: 0 },
      { q: 'Why was total study time "held constant"?', options: ['So differences were due to the method, not time', 'Because learners were busy', 'To save money', 'To make the study shorter'], answer: 0 },
      { q: 'What happened at the six-month follow-up?', options: ['Spaced retrieval\'s advantage grew', 'All groups performed the same', 'Massed retrieval was best', 'Restudy improved'], answer: 0 },
      { q: 'What surprising finding concerns the restudy group?', options: ['They rated their learning highest but performed worst', 'They performed best', 'They dropped out', 'They studied longer'], answer: 0 },
      { q: 'Which limitation do the authors mention?', options: ['A single outcome measure', 'Too few participants', 'No control group', 'Only children were studied'], answer: 0 },
      { q: 'The study included only university students.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-c1-oped', level: 'C1', title: 'Opinion: the four-day week is not a gift — it is overdue', topic: 'Opinión · trabajo',
    text: `It has become fashionable among business commentators to dismiss the four-day working week as a utopian indulgence, the kind of idea that sounds wonderful at a dinner party and collapses on contact with a balance sheet. I would like to suggest that the burden of proof lies the other way round.
The five-day week is not a law of nature. It is a historical compromise, won through decades of labour struggle and consolidated in the early twentieth century, when most work was physical and productivity was a fraction of what it is today. Since then, output per hour in advanced economies has multiplied several times over. Working time, however, has barely moved. If anything requires justification, it is the assumption that a schedule designed for the factories of the 1920s remains optimal for the knowledge work of the 2020s.
The evidence from recent trials, while not conclusive, is hard to ignore. In large-scale pilots across several countries, the majority of participating firms reported stable or improved productivity, lower absenteeism and markedly better staff retention — and most chose to keep the policy after the trial ended. Critics rightly point out that firms volunteering for such trials are hardly a random sample. Yet that objection cuts both ways: it suggests not that the model cannot work, but that it works best where it is implemented thoughtfully.
Nor should we pretend the transition is costless. Hospitals, schools and other services that depend on continuous human presence cannot simply close on Fridays; for them, a shorter week means hiring more staff, and that requires money. The point is not that every sector should adopt an identical model overnight, but that the default deserves to be questioned.
We have spent a century converting productivity gains into more output and more consumption. Converting a share of them into time — for care, for rest, for civic life — is not a gift to workers. It is a choice that previous generations made, repeatedly, and that ours has, so far, been reluctant to make.`,
    questions: [
      { q: 'What is the writer\'s main argument?', options: ['The five-day week, not the four-day week, needs justification', 'The four-day week is unrealistic', 'Productivity has fallen', 'Hospitals should close on Fridays'], answer: 0 },
      { q: 'Why does the writer mention the 1920s?', options: ['The five-day week was designed for very different work', 'Workers were happier then', 'Productivity was higher then', 'The four-day week was invented then'], answer: 0 },
      { q: 'How does the writer respond to the "non-random sample" criticism?', options: ['It suggests the model works best when implemented carefully', 'It proves the trials were fake', 'He ignores it', 'He agrees the model cannot work'], answer: 0 },
      { q: 'What concession does the writer make?', options: ['Some sectors would need more staff and money', 'Productivity would fall everywhere', 'The trials were failures', 'Workers do not want shorter weeks'], answer: 0 },
      { q: 'The phrase "cuts both ways" means the argument…', options: ['can be used to support both sides', 'is very sharp', 'is completely wrong', 'damages the writer\'s case'], answer: 0 },
      { q: 'The tone of the article is best described as…', options: ['persuasive but balanced', 'neutral and purely factual', 'angry and dismissive', 'humorous'], answer: 0 },
    ],
  },
  {
    id: 'r-c1-long-memory', level: 'C1', long: true, title: 'The science of forgetting', topic: 'Psicología cognitiva · texto largo',
    text: `In the 1880s, the German psychologist Hermann Ebbinghaus embarked on one of the most tedious experiments in the history of science. Over several years, he memorised thousands of meaningless three-letter syllables — "DAX", "BOK", "YAT" — and tested himself at intervals ranging from twenty minutes to a month to see how much he still remembered. The result was the now-famous "forgetting curve": memory declines steeply in the first hours and days after learning and then levels off. Without review, a substantial proportion of new information is lost within a day.
Ebbinghaus also noticed something more encouraging. Each time he relearned a list, it took less effort than before, and the subsequent decline was slower. Memories, it seemed, were not simply present or absent; they had a strength that could be built up through repetition — provided the repetitions were spread out over time.
This insight, known as the spacing effect, has been replicated in hundreds of studies over the following century, with everything from vocabulary to surgical skills. Learning distributed across several sessions consistently outperforms the same amount of learning crammed into one, especially when retention is measured weeks or months later. Why this should be so is still debated. One influential explanation holds that spacing introduces a degree of forgetting between sessions, and that the effort required to reconstruct a partially forgotten memory is precisely what strengthens it. On this view, forgetting is not the enemy of learning but, in moderation, one of its engines.
A closely related finding concerns the act of retrieval itself. Testing oneself — trying to recall an answer before checking it — produces considerably more durable learning than rereading the same material, even when the test is not graded and even when the learner initially fails. Psychologists call this the testing effect or retrieval practice. Combined with spacing, it forms the basis of the flashcard systems and spaced-repetition software that many language learners now use.
Paradoxically, the strategies that work best often feel least effective. Rereading a chapter produces a comfortable sense of familiarity: the material looks known, so we assume it is known. Struggling to retrieve a word that is on the tip of one's tongue feels like failure. The psychologist Robert Bjork coined the term "desirable difficulties" to describe conditions that make learning feel harder in the short term but improve it in the long term. Spacing, retrieval and interleaving — mixing different types of problems instead of practising one type at a time — all belong to this category.
None of this means that difficulty is always desirable. If a task is so hard that the learner cannot succeed even with effort, frustration replaces learning. The art lies in calibration: reviewing information at the point where it is beginning to fade, but before it has disappeared entirely, and practising at a level of challenge that is demanding but achievable. Modern spaced-repetition algorithms attempt to automate exactly this, adjusting intervals according to each learner's performance.
Sleep plays a surprisingly large part in this story. During the deep stages of sleep, the brain appears to replay and reorganise information acquired during the day, strengthening some connections and weakening others. Studies in which participants learned word pairs in the evening and were tested the following morning found better retention than when the same interval was spent awake. Pulling an all-nighter before an exam, in other words, sacrifices precisely the process that would have consolidated the material. Short, regular sessions followed by a good night's rest are not merely more pleasant than cramming; they are biologically better suited to the way memory works.
There is a broader lesson here, one that extends beyond memorising vocabulary. Our intuitions about how we learn are frequently unreliable, shaped by feelings of fluency rather than by evidence. Learners who understand this are better placed to resist the temptation of easy but ineffective methods — and to accept that a certain amount of struggle, far from being a sign that something is going wrong, is often a sign that something is going right.`,
    questions: [
      { q: 'What did Ebbinghaus memorise in his experiments?', options: ['Meaningless syllables', 'German poems', 'Lists of real words', 'Numbers'], answer: 0 },
      { q: 'What is the shape of the forgetting curve?', options: ['A steep drop at first, then levelling off', 'A slow, steady decline', 'A rise and then a fall', 'Flat'], answer: 0 },
      { q: 'According to one explanation, why does spacing help?', options: ['The effort of reconstructing a fading memory strengthens it', 'It reduces the total study time', 'It avoids forgetting completely', 'It makes learning more enjoyable'], answer: 0 },
      { q: 'What is the testing effect?', options: ['Trying to recall improves learning more than rereading', 'Tests cause stress', 'Graded tests are better than ungraded ones', 'Testing only works if you succeed'], answer: 0 },
      { q: 'Why do effective strategies often "feel" ineffective?', options: ['Struggle feels like failure while rereading feels familiar', 'They take more time', 'They are boring', 'Teachers do not recommend them'], answer: 0 },
      { q: 'What does "interleaving" mean?', options: ['Mixing different types of problems', 'Studying at night', 'Reading aloud', 'Repeating one type of problem'], answer: 0 },
      { q: 'What is the writer\'s point about difficulty?', options: ['It must be calibrated: demanding but achievable', 'The harder the better, always', 'Difficulty should be avoided', 'Only experts benefit from difficulty'], answer: 0 },
      { q: 'Ebbinghaus found that relearning a list became easier each time.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r-c1-long-cities', level: 'C1', long: true, title: 'The century of the city', topic: 'Urbanismo y sociedad · texto largo',
    text: `In 1800, roughly one in fifty people lived in a city. Today more than half of humanity does, and the United Nations projects that the proportion will approach seventy percent by the middle of this century. Most of that growth will not take place in the familiar metropolises of Europe and North America, but in Africa and Asia, in cities many readers in the West would struggle to locate on a map. Lagos, Dhaka and Kinshasa are expected to add tens of millions of inhabitants between them within a generation.
The reasons people move to cities have changed remarkably little over time. Cities concentrate jobs, services and, above all, opportunity. Economists have long observed that productivity tends to rise with city size: workers in large cities earn more, on average, than similar workers elsewhere, and patents and new businesses are disproportionately generated in urban areas. The explanation lies in what are known as agglomeration effects. When large numbers of people and firms cluster together, they can share infrastructure, draw on deep pools of specialised labour and, crucially, learn from one another. Ideas, as the economist Edward Glaeser has put it, cross corridors and streets far more easily than they cross continents.
Yet cities have always had a darker side. Nineteenth-century London and Manchester were notorious for overcrowding, disease and pollution; life expectancy in the industrial city was often lower than in the countryside. Many of today's fastest-growing cities face comparable challenges on a larger scale. An estimated one billion people live in informal settlements — often called slums — that lack secure housing, clean water or adequate sanitation. Traffic congestion costs some cities several percent of their economic output, and urban air pollution is linked to millions of premature deaths each year.
The history of the cities that overcame these problems offers some grounds for optimism. The sanitary reforms of the late nineteenth century — sewers, clean water supplies, building regulations — transformed urban mortality within a few decades. The lesson most urban historians draw is that the problems of cities are, to a large degree, problems of governance and investment rather than of size itself. Density, well managed, can be an environmental asset: city dwellers in compact, well-served neighbourhoods typically consume less energy and produce fewer emissions per person than suburban or rural residents, because they travel shorter distances and live in smaller, shared buildings.
The difficulty is that well-managed density requires precisely what many fast-growing cities lack: functioning land registries, sufficient tax revenue, competent local institutions and the political will to plan for decades rather than for the next election. Where formal housing supply fails to keep pace with demand, informal settlement becomes the default, and retrofitting infrastructure into unplanned neighbourhoods is far more expensive than building it in advance.
Transport illustrates the point particularly clearly. Cities that invested early in public transport, cycling infrastructure and walkable neighbourhoods, such as Copenhagen or Singapore, have managed to grow without being overwhelmed by traffic. Those that relied primarily on private cars have often found that building more roads simply generates more traffic, a phenomenon traffic engineers call "induced demand".
Climate change adds a further layer of urgency. Many of the world's largest cities are located on coasts and river deltas, exposing them to rising seas and more intense storms, while the "urban heat island" effect — the tendency of concrete and asphalt to absorb and retain heat — makes heatwaves more dangerous in cities than in surrounding areas. Adaptation measures, from green roofs and urban forests to flood barriers and early-warning systems, are increasingly regarded not as optional extras but as essential infrastructure.
Whether the century of the city turns out to be a story of shared prosperity or of deepening inequality will depend less on technology than on choices about land, investment and inclusion. Cities have always been humanity's most powerful engines of progress. The question is whether they can be made to work for the many who arrive in search of a better life, and not only for the few who are already there.`,
    questions: [
      { q: 'Where will most future urban growth take place?', options: ['Africa and Asia', 'Europe', 'North America', 'Australia'], answer: 0 },
      { q: 'What are "agglomeration effects"?', options: ['Benefits from people and firms clustering together', 'Problems caused by overcrowding', 'The growth of suburbs', 'Pollution in cities'], answer: 0 },
      { q: 'Why does the writer quote Edward Glaeser?', options: ['To show that ideas spread more easily at close range', 'To criticise cities', 'To describe slums', 'To explain climate change'], answer: 0 },
      { q: 'What lesson do urban historians draw?', options: ['City problems are mainly about governance and investment', 'Big cities cannot be fixed', 'Size is the main problem', 'Cities should stop growing'], answer: 0 },
      { q: 'Why can density be an environmental asset?', options: ['People travel less and share buildings', 'Cities have more trees', 'Cities are cooler', 'People consume more'], answer: 0 },
      { q: 'Why is retrofitting infrastructure problematic?', options: ['It is far more expensive than building in advance', 'It is illegal', 'Residents refuse it', 'It is too fast'], answer: 0 },
      { q: 'What is the "urban heat island" effect?', options: ['Cities retaining more heat than surrounding areas', 'Islands near cities', 'Hot weather in summer', 'Heating systems in buildings'], answer: 0 },
      { q: 'According to the conclusion, the future of cities depends mostly on…', options: ['choices about land, investment and inclusion', 'new technology', 'climate change alone', 'population size'], answer: 0 },
    ],
  },
  {
    id: 'r-c1-long-language', level: 'C1', long: true, title: 'How adults really learn a language', topic: 'Lingüística aplicada · texto largo',
    text: `A widespread belief holds that children are natural language learners while adults, past some biological window, are condemned to struggle. The reality is more nuanced. In controlled studies over the first months of learning, adults and adolescents typically progress faster than young children: they have better memories, more developed reasoning skills and a mature understanding of how language works. Where children have the advantage is in the long run, and primarily in pronunciation. Those who begin early and receive extensive exposure are far more likely to end up sounding like native speakers. For grammar and vocabulary, however, the picture is far less deterministic, and many adults reach very high levels of proficiency.
If age is not destiny, what does predict success? Researchers in second language acquisition point first to the quantity and quality of input — the language a learner hears and reads, and understands. The linguist Stephen Krashen famously argued that we acquire language when we understand messages that are slightly beyond our current level, which he summarised as "i + 1". Few researchers now accept the stronger version of his theory, which claimed that conscious study of grammar contributes little, but the central importance of large amounts of comprehensible input is widely accepted.
Input alone, however, appears to be insufficient for most adults. Studies of immersion programmes in Canada, where English-speaking children received years of schooling in French, found that the pupils developed excellent comprehension yet continued to make persistent grammatical errors in their own speech and writing. The psychologist Merrill Swain proposed that output — the effort to produce language — forces learners to notice gaps in their knowledge in a way that listening and reading do not. Trying to express an idea and discovering that one lacks the right structure creates exactly the kind of "teachable moment" in which feedback is most useful.
This brings us to the role of explicit instruction. A large body of research, including several meta-analyses, suggests that drawing learners' attention to grammatical form does help, particularly when it is brief, timely and connected to meaningful use rather than delivered as abstract rules in isolation. Explanation after an error, followed by further practice, tends to be more effective than long explanations in advance.
Motivation and emotion also play a role that is easy to underestimate. Learners who feel anxious about making mistakes tend to avoid speaking and writing, and so deprive themselves of exactly the output and feedback they need. Conversely, those who connect the language to something they genuinely care about — a profession, a hobby, a group of friends, a body of literature — find it far easier to sustain the effort over months and years. Researchers sometimes describe this as an "ideal L2 self": a vivid image of the person one wants to become in the new language, which acts as a compass during the long middle stage of learning, when progress is real but hard to perceive.
Finally, there is the question of time — not merely how many hours are invested, but how they are distributed. Language learning involves thousands of words, collocations and patterns, each of which must be encountered many times in varied contexts before it becomes automatic. Estimates vary, but reaching an advanced level in a language closely related to one's own is commonly put at somewhere between one and two thousand hours of engaged practice. Spread over a few years, this is an achievable commitment; compressed into intensive bursts followed by long breaks, much of it is lost.
Taken together, the evidence suggests a practical recipe that is undramatic but robust: read and listen a great deal, at a level that is challenging but comprehensible; write and speak regularly enough to expose the gaps; pay brief, focused attention to form, ideally prompted by one's own mistakes; review systematically; and, above all, keep going. The adult learner's greatest enemy is rarely age. It is discontinuity.`,
    questions: [
      { q: 'In the first months of learning, who usually progresses faster?', options: ['Adults and adolescents', 'Young children', 'Everyone equally', 'Only native speakers'], answer: 0 },
      { q: 'Where do early learners have a clear long-term advantage?', options: ['Pronunciation', 'Vocabulary', 'Reading speed', 'Grammar knowledge'], answer: 0 },
      { q: 'What does "i + 1" refer to?', options: ['Input slightly above the learner\'s level', 'One hour per day', 'One new word per lesson', 'Individual lessons'], answer: 0 },
      { q: 'What did the Canadian immersion studies show?', options: ['Great comprehension but persistent grammatical errors', 'Perfect production', 'No comprehension', 'Children forgot English'], answer: 0 },
      { q: 'According to Swain, output is useful because…', options: ['it makes learners notice gaps in their knowledge', 'it is more fun', 'it replaces input', 'it improves pronunciation only'], answer: 0 },
      { q: 'What kind of grammar instruction works best?', options: ['Brief, timely and linked to meaningful use', 'Long lectures before practice', 'None at all', 'Memorising rules in isolation'], answer: 0 },
      { q: 'What is the "greatest enemy" of the adult learner?', options: ['Discontinuity', 'Age', 'Grammar', 'Pronunciation'], answer: 0 },
      { q: 'Krashen\'s strong claim about grammar study is now widely accepted.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-c1-long-misinformation', level: 'C1', long: true, title: 'Why misinformation spreads', topic: 'Medios y sociedad · texto largo',
    text: `When a large study of Twitter analysed the spread of some 126,000 news stories over more than a decade, it reached an uncomfortable conclusion: false stories travelled farther, faster and more broadly than true ones. A falsehood was, on average, around seventy percent more likely to be shared than the truth. Strikingly, automated accounts — "bots" — spread true and false news at roughly the same rate. The difference was driven by people.
Why should human beings, who generally consider themselves committed to the truth, favour falsehood? Part of the answer lies in novelty. False stories, unconstrained by reality, can be more surprising than true ones, and surprising information attracts attention and confers a certain status on whoever shares it first. False stories in the study also tended to provoke stronger emotional reactions, particularly disgust and fear, which are known to increase the urge to pass information on.
A second factor is what psychologists call motivated reasoning. We are not neutral processors of evidence; we evaluate claims partly according to whether they fit what we already believe and the groups with which we identify. A dubious story that flatters our side or confirms our suspicions about the other side passes our mental filters far more easily than an accurate report that challenges them. Importantly, research suggests this is not simply a matter of intelligence or education: in some politically charged domains, more knowledgeable individuals are better at constructing arguments to defend their existing views.
Yet there is also evidence that many people share false content not because they believe it, but because they are not thinking about accuracy at the moment of sharing. In a series of experiments, simply asking social media users to rate the accuracy of a single unrelated headline made them noticeably more discerning about what they subsequently chose to share. The attention economy of social platforms, which rewards speed and engagement, appears to push accuracy to the back of users' minds.
The structure of online networks amplifies these tendencies. Recommendation algorithms are typically optimised to maximise engagement — the time users spend on a platform and the number of interactions they produce. Since content that provokes outrage, fear or surprise tends to generate more engagement, it is disproportionately promoted, regardless of its accuracy. At the same time, people tend to follow and interact with others who share their views, creating clusters in which a false claim can circulate repeatedly without ever encountering a correction. Each repetition, in turn, makes the claim feel more familiar, and psychologists have long known that familiarity is easily mistaken for truth: statements we have heard before are rated as more credible than new ones, even when we were explicitly told they were false. This "illusory truth effect" means that even well-intentioned attempts to debunk a myth can backfire if they repeat it prominently without clearly stating the facts first.
This suggests a range of possible responses, none of them sufficient on its own. Fact-checking is valuable but slow, and corrections rarely reach as many people as the original falsehood. Platform design can introduce "friction" — prompts, delays or labels — that nudge users to reflect before sharing. A more ambitious approach, sometimes called "prebunking", attempts to inoculate people in advance by teaching them the common techniques used in manipulative content, such as emotionally charged language, false dichotomies and scapegoating. Early studies suggest that even short games or videos explaining these techniques can improve people's ability to recognise them.
Individuals, too, can adopt simple habits. Before sharing a surprising claim, it helps to pause and ask three questions: who is behind this information, what is the evidence, and what do other sources say? Professional fact-checkers use a technique known as "lateral reading": rather than studying a dubious website in depth, they immediately open new tabs to see what independent sources say about it. This takes seconds and is often more revealing than the most careful reading of the original page.
None of these measures resolves the deeper tension between the open exchange of information that democracies value and the vulnerabilities that openness creates. But they share a common premise that is, in its way, optimistic: that susceptibility to misinformation is not a fixed character flaw, but a set of habits that can be changed.`,
    questions: [
      { q: 'What did the large Twitter study find?', options: ['False stories spread farther and faster than true ones', 'Bots spread most fake news', 'True stories spread faster', 'People rarely share news'], answer: 0 },
      { q: 'What role did bots play?', options: ['They spread true and false news at similar rates', 'They spread mostly false news', 'They spread only true news', 'They stopped fake news'], answer: 0 },
      { q: 'Why might false stories attract more attention?', options: ['They are more surprising and emotional', 'They are shorter', 'They come from famous people', 'They are better written'], answer: 0 },
      { q: 'What is motivated reasoning?', options: ['Evaluating claims according to existing beliefs and identity', 'Reasoning carefully about evidence', 'Being motivated to learn', 'Ignoring emotions'], answer: 0 },
      { q: 'What did the accuracy-prompt experiments show?', options: ['Thinking about accuracy made people share more carefully', 'People always know what is true', 'Prompts had no effect', 'People stopped using social media'], answer: 0 },
      { q: 'What is "prebunking"?', options: ['Teaching manipulation techniques in advance', 'Deleting false posts', 'Fact-checking after publication', 'Banning bots'], answer: 0 },
      { q: 'The writer\'s final position is…', options: ['cautiously optimistic', 'completely pessimistic', 'indifferent', 'opposed to free speech'], answer: 0 },
      { q: 'Research shows misinformation only affects less educated people.', options: TF, answer: 1 },
    ],
  },
];
