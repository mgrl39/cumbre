import type { ReadingText } from '../core/types.ts';
import { mkReading as R } from './reading5.ts';

const real = { real: true };

/* Lecturas originales B1: noticias breves, experiencias, opinión sencilla y documentos reales. */
export const READINGS_6: ReadingText[] = [
  R('r6-b1-libraries', 'B1', 'Libraries that lend more than books', 'Sociedad', `Public libraries are changing. In many towns you can now borrow tools, musical instruments and even cake tins as well as books. The idea is simple: most people only need a drill for a few minutes a year, so why should every household buy one? Librarians say the new services have brought in people who had not visited a library since they were children. Some critics argue that libraries should concentrate on reading, but visitor numbers suggest that the public disagrees.`, [
    ['Why do some libraries lend tools?', 'People rarely need to own them', 'Books are no longer popular', 'Tools are cheaper than books'],
    ['What effect have the new services had?', 'They have attracted new visitors', 'They have reduced reading', 'They have cost libraries money'],
    ['All experts support the change.', 'F'],
  ]),
  R('r6-b1-gap-year', 'B1', 'A year before university', 'Educación', `When Lucía finished school, she decided not to go straight to university. Instead, she spent six months working in a hotel in Ireland and then travelled around South America with the money she had saved. Her parents were worried that she would never go back to studying. In fact, the opposite happened. She came home more confident, with much better English and a clear idea of what she wanted to study. "I'm a year older than my classmates," she says, "but I know why I'm here."`, [
    ['How did Lucía pay for her travels?', 'With money from her hotel job', 'Her parents paid', 'She won a grant'],
    ['What were her parents afraid of?', 'That she would give up studying', 'That she would get ill', 'That she would stay in Ireland'],
    ['Lucía regrets taking a year off.', 'F'],
  ]),
  R('r6-b1-four-day', 'B1', 'The four-day week', 'Trabajo', `A software company in Leeds has been testing a four-day working week for the past year. Employees work Monday to Thursday and receive the same salary as before. The director admits she was nervous at the beginning, as she expected productivity to fall. However, the team has completed the same amount of work, and fewer people have taken days off sick. Staff say they use Fridays for family, sport or simply rest. The company has now decided to make the change permanent.`, [
    ['What happened to salaries?', 'They stayed the same', 'They were reduced', 'They increased'],
    ['What surprised the director?', 'Productivity did not fall', 'Staff wanted to work Fridays', 'Clients complained'],
    ['The company will return to five days.', 'F'],
  ]),
  R('r6-b1-refund', 'B1', 'Refund policy', 'Vida real', `RETURNS AND REFUNDS
You may return most items within 30 days of delivery, provided that they are unused and in their original packaging. To start a return, log in to your account and print the returns label. Refunds are made to the original payment method within five working days of our receiving the item.
Please note that we cannot accept returns of earphones, underwear or personalised products unless they are faulty. Delivery charges are only refunded if the item was damaged or incorrect.`, [
    ['When can you return an unused item?', 'Within 30 days of delivery', 'Within five working days', 'At any time'],
    ['Which item cannot normally be returned?', 'Personalised products', 'Shoes', 'Books'],
    ['Delivery costs are always refunded.', 'F'],
  ], real),
  R('r6-b1-street-food', 'B1', 'From office to food truck', 'Comida', `Three years ago, Marco had a well-paid job in a bank, but he was bored. One weekend he helped a friend sell tacos at a festival and realised he had never enjoyed work so much. He spent his savings on a second-hand van and started selling his grandmother's pasta dishes outside offices at lunchtime. The first winter was terrible: some days he sold only ten portions. Then a local journalist wrote about him, and queues began to form. He now has two vans and five employees.`, [
    ['Why did Marco leave the bank?', 'He was bored', 'He lost his job', 'He earned too little'],
    ['What changed his luck?', 'A newspaper article', 'A bank loan', 'A new recipe'],
    ['Marco\'s business was successful from the first day.', 'F'],
  ]),
  R('r6-b1-screen-time', 'B1', 'How much screen time is too much?', 'Tecnología', `Parents often ask how many hours a day children should spend in front of a screen. According to several researchers, this is the wrong question. What matters more is what children are doing and what the screen is replacing. An hour spent video-calling grandparents or making a film is very different from an hour of watching adverts. Problems appear when screens take time away from sleep, exercise and conversation. The experts' advice is to keep phones out of bedrooms at night and to eat together without devices.`, [
    ['According to the researchers, what matters most?', 'What the child is doing on the screen', 'The exact number of hours', 'The size of the screen'],
    ['When do screens become a problem?', 'When they replace sleep and exercise', 'When they are used for school', 'When children make films'],
    ['The experts say children should never use phones.', 'F'],
  ]),
  R('r6-b1-island', 'B1', 'Life on a small island', 'Lugares', `Only ninety people live on the island of Eigg, off the west coast of Scotland. There is one shop, one primary school and no police station. The ferry from the mainland takes over an hour and is often cancelled in winter storms. However, the islanders are not cut off from the modern world: since 2008 the island has produced almost all its own electricity from wind, water and sun. Young families have started to move there, attracted by the safety, the scenery and the strong sense of community.`, [
    ['How does the island get its electricity?', 'From renewable sources', 'From the mainland', 'From a diesel generator'],
    ['What can be a problem in winter?', 'The ferry is often cancelled', 'The school closes', 'There is no electricity'],
    ['The population of the island is falling.', 'NG'],
  ]),
  R('r6-b1-memory', 'B1', 'Why we forget names', 'Ciencia', `Have you ever been introduced to someone and forgotten their name ten seconds later? You are not alone. Psychologists explain that names are difficult because they are arbitrary: the word "Baker" as a name tells us nothing about the person, while "baker" as a job creates a picture in our mind. Another reason is that, when we meet somebody, we are usually thinking about what to say next rather than listening. Repeating the name aloud and connecting it with an image can help a great deal.`, [
    ['Why are names hard to remember?', 'They carry no meaning about the person', 'They are usually long', 'We hear them too often'],
    ['What are we often doing when we are introduced?', 'Thinking about what to say', 'Looking at our phones', 'Trying to leave'],
    ['The text suggests repeating the name aloud.', 'T'],
  ]),
  R('r6-b1-flight-email', 'B1', 'Your flight has been changed', 'Vida real', `Dear Mr Herrera,
We regret to inform you that your flight ZX418 from Madrid to Edinburgh on 12 October has been rescheduled. The new departure time is 16:55 instead of 11:20.
If the new time is not convenient, you may change to another flight free of charge or request a full refund through "Manage my booking" before 5 October. If we do not hear from you, we will assume that you accept the change. Your seat and luggage allowance remain the same.
We apologise for any inconvenience.`, [
    ['What has changed?', 'The departure time', 'The destination', 'The price'],
    ['What happens if Mr Herrera does nothing?', 'The airline assumes he accepts', 'He gets a refund', 'His booking is cancelled'],
    ['He has to pay to change to another flight.', 'F'],
  ], real),
  R('r6-b1-second-hand', 'B1', 'The rise of second-hand clothes', 'Consumo', `Buying used clothes used to be something people did because they had no choice. Today, it is fashionable. Apps for selling clothes have millions of users, most of them under thirty. Many say they want to reduce waste; others simply like finding unusual items at low prices. Charity shops have also benefited, although some complain that the best donations now go online instead. Fashion companies have noticed the trend, and several big brands have opened their own second-hand sections.`, [
    ['Who uses clothes-selling apps most?', 'People under thirty', 'Pensioners', 'Fashion companies'],
    ['What do some charity shops complain about?', 'Good items are sold online instead', 'They have too many customers', 'Prices are too low'],
    ['Big brands have ignored the trend.', 'F'],
  ]),
  R('r6-b1-night-shift', 'B1', 'Working while others sleep', 'Trabajo', `Hannah has been a night nurse for six years. She starts at nine in the evening and finishes at seven in the morning. She likes the calm atmosphere and the extra pay, and she can take her children to school before going to bed. Nevertheless, the timetable has a price. She finds it hard to sleep when the neighbours are mowing the lawn, and she misses most evening events with friends. "You need a very understanding family," she says. "And very thick curtains."`, [
    ['What is one advantage for Hannah?', 'She earns more', 'She sleeps better', 'She sees her friends more'],
    ['What makes sleeping difficult?', 'Daytime noise', 'Her children', 'The hospital calls her'],
    ['Hannah wants to change to the day shift.', 'NG'],
  ]),
  R('r6-b1-bees', 'B1', 'Bees on the roof', 'Medio ambiente', `If you look up in central Paris, you might be surprised to see beehives on the roofs of hotels, offices and even the opera house. City bees are often healthier than their country cousins. This is because parks and balconies offer a wide variety of flowers throughout the year, and far fewer pesticides are used in cities than on farms. The honey is sold in local shops at high prices. Beekeepers warn, however, that there may soon be too many hives for the number of flowers available.`, [
    ['Why are city bees often healthier?', 'More variety of flowers and fewer pesticides', 'Cities are warmer', 'There are fewer bees'],
    ['What are beekeepers worried about?', 'Too many hives for the flowers', 'The price of honey', 'Pollution'],
    ['City honey is cheap.', 'F'],
  ]),
  R('r6-b1-lost-luggage', 'B1', 'The wrong suitcase', 'Viajes', `After a twelve-hour flight to Tokyo, I picked up my black suitcase and took the train to my hotel. When I opened it, I found golf shoes and men's shirts. I had taken somebody else's bag. Fortunately, there was a business card inside. I rang the number and a very polite man answered — he had my suitcase and was just as embarrassed as I was. We met in a station café to exchange bags and ended up having lunch together. Since then I have tied a bright ribbon to my luggage.`, [
    ['How did the writer find the owner?', 'There was a business card in the bag', 'The airline called', 'The hotel helped'],
    ['How did the story end?', 'They exchanged bags and had lunch', 'The writer never got the bag back', 'The man was angry'],
    ['The writer now marks the suitcase.', 'T'],
  ]),
  R('r6-b1-school-phones', 'B1', 'Phones locked away', 'Educación', `A secondary school in Manchester has introduced a new rule: pupils must put their phones in locked bags when they arrive and can only open them at the end of the day. At first there were protests, and some parents worried about not being able to contact their children. Six months later, teachers report that pupils talk to each other more at break and concentrate better in lessons. Several students admit they feel less stressed. Parents can still phone the school office in an emergency.`, [
    ['What must pupils do with their phones?', 'Lock them in bags all day', 'Leave them at home', 'Give them to teachers each lesson'],
    ['What have teachers noticed?', 'Better concentration', 'More arguments', 'Lower marks'],
    ['Parents have no way of contacting their children.', 'F'],
  ]),
  R('r6-b1-car-share', 'B1', 'Do we still need to own a car?', 'Transporte', `In many European cities, young adults are choosing not to buy a car. Parking is expensive, public transport has improved, and car-sharing apps allow you to rent a vehicle by the minute. A typical private car is parked for about 95 per cent of the time, so sharing makes economic sense. Outside big cities, the situation is very different. Where buses run twice a day, a car is still the only practical way to get to work. Experts say the future will depend on where you live.`, [
    ['Why does car sharing make economic sense?', 'Private cars are rarely in use', 'Petrol is cheap', 'Shared cars are faster'],
    ['Why is a car still necessary in the countryside?', 'Public transport is poor', 'Roads are better', 'Cars are cheaper there'],
    ['All young adults have stopped buying cars.', 'F'],
  ]),
  R('r6-b1-job-ad', 'B1', 'Job advertisement', 'Vida real', `RECEPTIONIST — Riverside Language School
We are looking for a friendly, organised person to join our front desk team. You will welcome students, answer phone and email enquiries and help teachers with timetables.
Requirements: good spoken English and one other language; basic computer skills; experience in customer service is an advantage but not essential.
Hours: 30 per week, including one Saturday morning a month. Salary: £12.50 an hour.
To apply, send your CV and a short covering letter to jobs@riverside.example by 20 May.`, [
    ['What is essential for the job?', 'English plus another language', 'Customer service experience', 'A driving licence'],
    ['How often will the person work on Saturday?', 'One morning a month', 'Every week', 'Never'],
    ['Applicants must send a CV and a letter.', 'T'],
  ], real),
  R('r6-b1-marathon-gran', 'B1', 'Never too late', 'Personas', `Rosa Delgado ran her first marathon at the age of sixty-eight. She had never done any sport until she retired, when her doctor recommended walking. Walking became jogging, and jogging became running. Her children thought she had gone mad when she signed up for the Seville marathon, but they were all at the finish line when she crossed it, five and a half hours after the start. "I was last in my group," she laughs, "but I was faster than everyone who stayed on the sofa."`, [
    ['When did Rosa start exercising?', 'After she retired', 'As a child', 'At university'],
    ['What did her children think at first?', 'That she was crazy', 'That she would win', 'That it was a good idea'],
    ['Rosa finished the marathon.', 'T'],
  ]),
  R('r6-b1-local-shops', 'B1', 'Saving the high street', 'Sociedad', `Like many British towns, Haverton has lost half its shops in the last ten years, as customers moved to online stores and out-of-town supermarkets. Last year the council tried something new. It offered empty shops to young businesses at very low rents for twelve months. A bakery, a bike repair workshop and a board-game café have opened, and the street is busy again at weekends. It is too early to say whether the businesses will survive when the rents go up, but residents are optimistic.`, [
    ['Why did the shops close?', 'People shopped online and out of town', 'Rents were too high', 'The council closed them'],
    ['What did the council offer?', 'Cheap rent for a year', 'Free advertising', 'Loans'],
    ['It is certain that the new businesses will survive.', 'F'],
  ]),
  R('r6-b1-sugar', 'B1', 'Hidden sugar', 'Salud', `Most people know that fizzy drinks and biscuits contain a lot of sugar. What is less obvious is the sugar hidden in foods that seem healthy. A small pot of fruit yoghurt can contain four teaspoons, and some breakfast cereals are a third sugar. Even bread, soup and tomato sauce often have sugar added. Nutritionists recommend reading labels carefully: ingredients are listed in order of quantity, so if sugar is near the top of the list, it is better to choose something else.`, [
    ['What is the main idea of the text?', 'Many "healthy" foods contain hidden sugar', 'Sugar is not dangerous', 'Fizzy drinks should be banned'],
    ['How are ingredients listed on labels?', 'In order of quantity', 'In alphabetical order', 'By colour'],
    ['Some cereals are about 33% sugar.', 'T'],
  ]),
  R('r6-b1-wifi-notice', 'B1', 'Hotel Wi-Fi information', 'Vida real', `GUEST WI-FI
Network: SeaView-Guest. Your password is your room number followed by your surname (for example, 214smith).
The connection is free and suitable for email and browsing. For video calls or streaming, we recommend the Premium service (£5 per day), which you can add at reception.
Please be aware that the network is not encrypted. We advise you not to use it for online banking. The hotel accepts no responsibility for loss of data.`, [
    ['What is the password?', 'Room number and surname', 'The hotel name', 'It is given at reception'],
    ['What is the Premium service for?', 'Video calls and streaming', 'Online banking', 'Printing'],
    ['The hotel recommends using the network for banking.', 'F'],
  ], real),
  R('r6-b1-reading-habit', 'B1', 'Twenty pages a day', 'Cultura', `A year ago I realised that I hadn't finished a book for months. I always said I was too busy, yet I spent more than an hour a day on social media. So I made a rule: twenty pages every day before touching my phone in the evening. The first weeks were hard, because my concentration was terrible. Gradually it became a pleasure again. I have now read thirty-one books this year. I haven't become a different person, but I sleep better and I have far more to talk about.`, [
    ['What was the writer\'s rule?', 'Read twenty pages before using the phone', 'Read one book a week', 'Stop using social media'],
    ['Why were the first weeks hard?', 'It was difficult to concentrate', 'The books were boring', 'There was no time'],
    ['The writer has read more than thirty books this year.', 'T'],
  ]),
  R('r6-b1-volcano-village', 'B1', 'Living next to a volcano', 'Naturaleza', `Why would anyone live near an active volcano? For the farmers on the slopes of Mount Etna in Sicily, the answer is under their feet. Volcanic soil is extremely rich, and the grapes, oranges and pistachios grown there are famous throughout Italy. Eruptions are frequent but usually slow, so people have time to leave. Scientists watch the mountain day and night and can often predict activity. As one farmer puts it, "The volcano takes something from us now and then, but it gives us much more."`, [
    ['Why do farmers stay near Etna?', 'The soil is very fertile', 'Land is cheap', 'They cannot move'],
    ['Why are eruptions not usually deadly?', 'They are slow and often predicted', 'They are very rare', 'Nobody lives nearby'],
    ['The farmer thinks the volcano does more harm than good.', 'F'],
  ]),
  R('r6-b1-housemate', 'B1', 'Sharing a flat', 'Vida diaria', `Sharing a flat can be the best or the worst experience of your twenties. I have lived with eleven different people in eight years, and I have learned three things. First, talk about money and cleaning in the first week, not after the first argument. Second, a person who is a wonderful friend is not necessarily a good flatmate. Third, small things matter: nobody remembers who paid the electricity bill on time, but everybody remembers who finished the milk and didn't replace it.`, [
    ['When should flatmates discuss money and cleaning?', 'In the first week', 'After an argument', 'Never'],
    ['What does the writer say about friends?', 'Good friends are not always good flatmates', 'You should only live with friends', 'Friends never argue'],
    ['The writer has always lived alone.', 'F'],
  ]),
  R('r6-b1-parcel', 'B1', 'Delivery notice', 'Vida real', `SORRY WE MISSED YOU
We tried to deliver a parcel today at 11:42 but nobody was at home. It was too large for your letterbox.
What happens next?
• We will try again tomorrow between 8 am and 1 pm.
• Alternatively, you can collect it from our depot (14 Mill Lane) from tomorrow. Please bring this card and photo ID.
• Or go online to choose a different day or a neighbour's address.
We keep parcels for 10 days. After that, they are returned to the sender.`, [
    ['Why wasn\'t the parcel left?', 'It didn\'t fit and nobody was in', 'The address was wrong', 'It was damaged'],
    ['What do you need to collect it?', 'The card and photo ID', 'Only the card', 'A payment'],
    ['After ten days the parcel is sent back.', 'T'],
  ], real),
  R('r6-b1-exam-nerves', 'B1', 'Exam nerves', 'Educación', `Feeling nervous before an exam is completely normal, and a little stress actually helps you concentrate. The problem starts when the nerves are so strong that your mind goes blank. Teachers suggest a few simple techniques. Prepare your bag the night before so that the morning is calm. In the exam, read all the questions first and begin with the one you find easiest. If you panic, put down your pen and breathe slowly for a minute. And remember: nobody has ever improved their mark by studying at 3 am.`, [
    ['What does the text say about a little stress?', 'It can help concentration', 'It is dangerous', 'It causes failure'],
    ['Which question should you start with?', 'The easiest', 'The longest', 'The first'],
    ['The writer recommends studying late the night before.', 'F'],
  ]),
  R('r6-b1-city-trees', 'B1', 'A million trees', 'Medio ambiente', `The city of Milan has promised to plant three million trees by 2030 — more than two for every resident. Summers there are becoming hotter, and trees can lower the temperature of a street by several degrees. They also clean the air and reduce flooding by absorbing rainwater. Planting is the easy part, though. Young trees need watering for at least three years, and many die without care. For this reason, the council has asked schools and neighbourhood groups to "adopt" the trees near them.`, [
    ['Why does Milan want more trees?', 'To cool the city and clean the air', 'To sell wood', 'To attract tourists'],
    ['What is the difficult part?', 'Looking after young trees', 'Buying the trees', 'Finding space'],
    ['Schools have been asked to help.', 'T'],
  ]),
  R('r6-b1-podcast', 'B1', 'Learning on the move', 'Tecnología', `Ten years ago, few people knew what a podcast was. Now millions listen while they commute, cook or go for a run. Part of the attraction is choice: there are programmes about almost everything, from medieval history to football tactics. Another advantage is that you can listen while doing something else. Language teachers are especially enthusiastic. They say that fifteen minutes of listening every day does more for comprehension than a two-hour lesson once a week, because the brain needs regular contact with the language.`, [
    ['Why are podcasts convenient?', 'You can listen while doing other things', 'They are short', 'They are always free'],
    ['What do language teachers say?', 'Regular short listening is more effective', 'Lessons are useless', 'Podcasts are too fast'],
    ['Podcasts were very popular ten years ago.', 'F'],
  ]),
  R('r6-b1-landlord', 'B1', 'A message to the landlord', 'Vida real', `Dear Mrs Ahmed,
I'm writing about the heating in flat 3B. It stopped working on Sunday night, and since then we have had no hot water either. I called the emergency number on Monday, but the plumber who came said he needed a part that would take a week to arrive.
As it is January and we have a small baby, we can't wait that long. Could you please arrange for another plumber to come, or provide electric heaters in the meantime?
I look forward to hearing from you soon.
Kind regards,
Tom Reyes`, [
    ['What is the problem?', 'No heating or hot water', 'A broken window', 'Noisy neighbours'],
    ['Why can\'t the family wait a week?', 'It is winter and they have a baby', 'They are going on holiday', 'The rent is due'],
    ['Tom asks for a reduction in the rent.', 'F'],
  ], real),
  R('r6-b1-chess', 'B1', 'Chess makes a comeback', 'Tiempo libre', `Chess is more than 1,500 years old, yet it has never been so popular. During 2020, when many people were stuck at home, online chess sites gained millions of new players, helped by a successful TV series about a young champion. Unlike many trends, this one has lasted. School chess clubs are full, and top players have become internet celebrities. Teachers like the game because it trains patience and planning. Players say the real reason is simpler: every game is different, and you can always get better.`, [
    ['What helped chess become popular in 2020?', 'People were at home and a TV series', 'A new rule', 'Cheaper boards'],
    ['Why do teachers like chess?', 'It develops patience and planning', 'It is quiet', 'It is easy'],
    ['Interest in chess disappeared quickly.', 'F'],
  ]),
  R('r6-b1-tourist-tax', 'B1', 'A fee to visit Venice', 'Viajes', `Venice receives about twenty million visitors a year, but only fifty thousand people live in the historic centre. To control the crowds, the city now charges day visitors a small entrance fee on the busiest days. Tourists who stay overnight do not pay, since they already pay a hotel tax. Supporters say the money helps to clean the streets and repair bridges. Opponents argue that five euros will not stop anyone coming and that the city is being turned into a theme park.`, [
    ['Who has to pay the fee?', 'Day visitors on busy days', 'All tourists', 'Residents'],
    ['What do opponents say?', 'The fee is too low to reduce crowds', 'The fee is too expensive', 'Hotels should close'],
    ['More people live in Venice than visit it each year.', 'F'],
  ]),
  R('r6-b1-cooking-class', 'B1', 'Course description', 'Vida real', `BREAD FOR BEGINNERS — Saturday workshop
In this one-day course you will learn to make three kinds of bread by hand: a white loaf, wholemeal rolls and focaccia. No experience is necessary. All ingredients and an apron are provided, and you will take home everything you bake.
Time: 10 am – 4 pm, with a light lunch included. Price: £85. Maximum eight participants.
Cancellations made less than seven days before the course cannot be refunded, but you may send a friend in your place.`, [
    ['What do participants need to bring?', 'Nothing', 'Flour', 'An apron'],
    ['What happens if you cancel three days before?', 'No refund, but someone else can go', 'You get a full refund', 'You pay a fine'],
    ['The course is for experienced bakers.', 'F'],
  ], real),
  R('r6-b1-sleep-apps', 'B1', 'Can an app help you sleep?', 'Salud', `Millions of people now wear a watch that measures their sleep. Each morning it gives them a score and tells them how long they spent in deep sleep. Doctors have mixed opinions. On the one hand, the devices make people think about their habits and go to bed earlier. On the other hand, some users become so anxious about getting a good score that they sleep worse. Specialists point out that the best test is still the simplest one: if you feel rested during the day, you are sleeping enough.`, [
    ['What is a benefit of sleep trackers?', 'People pay attention to their habits', 'They cure insomnia', 'They are cheap'],
    ['What problem can they cause?', 'Anxiety about the score', 'Skin problems', 'Addiction to coffee'],
    ['According to specialists, feeling rested is the best test.', 'T'],
  ]),
];
