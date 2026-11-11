import type { ReadingText } from '../core/types.ts';

const TF = ['True', 'False', 'Not given'];

/* Textitos cortos originales (B1–C1): noticias breves, opinión, divulgación y documentos reales. */
export const READINGS_4: ReadingText[] = [
  /* ---------------- B1 ---------------- */
  {
    id: 'r4-b1-coworking', level: 'B1', title: 'Working from a café', topic: 'Trabajo',
    text: `More and more people are working from cafés instead of offices. For freelancers, a café offers coffee, Wi-Fi and a bit of company. However, café owners have mixed feelings. Some customers buy one coffee and stay for five hours, taking a table that could be used by several paying customers. As a result, a few cafés in London have introduced "laptop-free" hours at lunchtime, while others charge a small fee for Wi-Fi after the first hour. Not everyone is happy about this, but most owners say they simply need to pay the rent.`,
    questions: [
      { q: 'Why are some café owners unhappy?', options: ['Some customers stay a long time but spend little', 'Freelancers are noisy', 'The Wi-Fi is too expensive', 'Customers bring their own food'], answer: 0 },
      { q: 'What have some cafés introduced?', options: ['Laptop-free hours at lunchtime', 'Free Wi-Fi all day', 'Bigger tables', 'Office rooms'], answer: 0 },
      { q: 'All customers agree with the new rules.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b1-complaint', level: 'B1', real: true, title: 'A complaint email', topic: 'Vida real',
    text: `Dear Sir or Madam,
I am writing to complain about a pair of headphones I ordered from your website on 3 March (order number 48211). They arrived a week late, and when I opened the box, the right side did not work at all. I tried them with two different phones, so I am sure the problem is not my device.
I would like a full refund rather than a replacement, as I have already bought another pair in a local shop. Please let me know how to return the product. I have attached a photo of the receipt.
Yours faithfully,
Daniel Ortiz`,
    questions: [
      { q: 'What was wrong with the headphones?', options: ['One side didn\'t work', 'They were the wrong colour', 'They were too big', 'The box was empty'], answer: 0 },
      { q: 'What does Daniel want?', options: ['His money back', 'A new pair', 'A discount', 'An apology only'], answer: 0 },
      { q: 'Why doesn\'t he want a replacement?', options: ['He has already bought another pair', 'He doesn\'t trust the shop', 'They are too expensive', 'The delivery is too slow'], answer: 0 },
    ],
  },
  {
    id: 'r4-b1-sleep', level: 'B1', title: 'Teenagers and sleep', topic: 'Salud',
    text: `Parents often complain that teenagers stay up late and can't get up in the morning. But scientists say it isn't just laziness. During adolescence, the body produces the sleep hormone melatonin later in the evening, so teenagers naturally feel sleepy around 11 pm or even later. At the same time, most schools start at 8 am. The result is that many teenagers are tired all week. Some schools in the USA have started classes an hour later, and they report better attendance, fewer car accidents and slightly better exam results.`,
    questions: [
      { q: 'According to scientists, why do teenagers go to bed late?', options: ['Their body clock changes', 'They are lazy', 'They use their phones', 'They have too much homework'], answer: 0 },
      { q: 'What happened in schools that started later?', options: ['Students attended more', 'Exams became easier', 'Teachers were happier', 'Students slept less'], answer: 0 },
      { q: 'The text says teenagers need more food in the morning.', options: TF, answer: 2 },
    ],
  },
  {
    id: 'r4-b1-gym', level: 'B1', real: true, title: 'Gym membership terms', topic: 'Vida real',
    text: `FITLIFE MEMBERSHIP — KEY TERMS
• The minimum contract is 12 months. After that, you can cancel with one month's notice.
• You can "freeze" your membership for up to 2 months a year (for example, if you are injured or travelling). You will not pay during this time.
• Guests are welcome on weekends only (€5 per visit). Members can bring up to 2 guests a month.
• Lockers must be emptied every night. Items left overnight will be removed.
• Prices may rise once a year. We will tell you at least 30 days before.`,
    questions: [
      { q: 'What can you do if you are injured?', options: ['Freeze your membership', 'Cancel immediately', 'Get a refund', 'Bring a guest'], answer: 0 },
      { q: 'When can members bring guests?', options: ['Only at weekends', 'Any day', 'Never', 'Only in the evening'], answer: 0 },
      { q: 'You can leave your things in the locker for a week.', options: TF, answer: 1 },
      { q: 'How much notice do you get before a price rise?', options: ['At least 30 days', 'One week', 'Two months', 'None'], answer: 0 },
    ],
  },
  {
    id: 'r4-b1-plastic', level: 'B1', title: 'A town without plastic bottles', topic: 'Medio ambiente',
    text: `In 2013, the small Australian town of Bundanoon became famous for a simple decision: it stopped selling bottled water. Instead, the town installed free water fountains in the main street, and shops started selling reusable bottles. At first some businesses were worried about losing money, but tourists actually came to see the "bottle-free town". The idea has spread to universities and national parks around the world. Supporters say it reduces plastic waste; critics say people simply buy other drinks in plastic bottles instead.`,
    questions: [
      { q: 'What did Bundanoon stop selling?', options: ['Bottled water', 'All drinks', 'Plastic bags', 'Soft drinks'], answer: 0 },
      { q: 'What happened to tourism?', options: ['Tourists came to see the town', 'It fell a lot', 'It stopped completely', 'Nothing changed'], answer: 0 },
      { q: 'What do critics say?', options: ['People buy other drinks in plastic', 'Fountains are dirty', 'Water is too expensive', 'It is illegal'], answer: 0 },
    ],
  },
  {
    id: 'r4-b1-language', level: 'B1', title: 'How I learned Italian in a year', topic: 'Aprender',
    text: `People often ask me how I learned Italian so quickly. The truth is, I didn't do anything special. I studied for just twenty minutes every day, but I never missed a day. In the morning I reviewed vocabulary on my phone while I had breakfast. On the way to work I listened to podcasts for learners. Once a week I had an online conversation with a teacher from Naples. The hardest part was the first three months, when I understood almost nothing. Then, suddenly, things started to make sense. My advice? Small steps, every single day.`,
    questions: [
      { q: 'What was the key to the writer\'s success?', options: ['Studying a little every day', 'Studying many hours at weekends', 'Living in Italy', 'Taking an intensive course'], answer: 0 },
      { q: 'When did the writer review vocabulary?', options: ['During breakfast', 'At work', 'Before bed', 'On weekends'], answer: 0 },
      { q: 'Which period was the most difficult?', options: ['The first three months', 'The last month', 'The middle of the year', 'Every weekend'], answer: 0 },
    ],
  },
  {
    id: 'r4-b1-cycle', level: 'B1', title: 'Cycling to work', topic: 'Transporte',
    text: `In Copenhagen, more than 40% of people cycle to work or school. This is not because Danes love sport more than anybody else, but because the city makes cycling the easiest option. There are wide bike lanes separated from cars, special traffic lights for cyclists and lots of places to park. In winter, the bike lanes are cleared of snow before the roads. Many other cities want to copy this model, but it takes years of investment — and some drivers are not happy about losing space on the road.`,
    questions: [
      { q: 'Why do so many people cycle in Copenhagen?', options: ['The city makes it easy', 'Danes love sport', 'Cars are banned', 'Public transport is expensive'], answer: 0 },
      { q: 'What happens in winter?', options: ['Bike lanes are cleaned first', 'People stop cycling', 'Bike lanes close', 'Buses are free'], answer: 0 },
      { q: 'All drivers support more bike lanes.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b1-interview', level: 'B1', title: 'Tips for a job interview', topic: 'Trabajo',
    text: `A job interview can be stressful, but good preparation makes a big difference. First, research the company: read its website and recent news, and think about why you want to work there. Second, prepare short stories about your experience — for example, a time when you solved a problem or worked in a team. Third, think of two or three questions to ask at the end; it shows you are interested. Finally, don't forget the basics: arrive ten minutes early, switch off your phone and send a short thank-you email afterwards.`,
    questions: [
      { q: 'Why should you ask questions at the end?', options: ['It shows interest', 'It saves time', 'It is the law', 'To talk about salary'], answer: 0 },
      { q: 'What should you do after the interview?', options: ['Send a thank-you email', 'Call the next day', 'Visit the office again', 'Post on social media'], answer: 0 },
      { q: 'The text recommends arriving 30 minutes early.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b1-hotel', level: 'B1', real: true, title: 'Hotel information', topic: 'Vida real',
    text: `WELCOME TO HOTEL MIRADOR
Breakfast is served in the restaurant on the ground floor from 7 to 10.30 am (weekends until 11). If you have an early flight, ask at reception for a breakfast bag the night before.
Check-out is at 12 noon. Late check-out until 3 pm is possible for €20, depending on availability.
The rooftop pool is open from May to September, 10 am to 8 pm. Children under 12 must be with an adult.
For room service, dial 9. For a taxi, dial 0 and reception will book one for you.`,
    questions: [
      { q: 'What can you get if you leave very early?', options: ['A breakfast bag', 'A free taxi', 'Late check-out', 'Room service'], answer: 0 },
      { q: 'How much does late check-out cost?', options: ['€20', 'Nothing', '€3', '€12'], answer: 0 },
      { q: 'The pool is open all year.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b1-volunteering', level: 'B1', title: 'A gap year with a difference', topic: 'Viajes',
    text: `After finishing school, Lucía didn't go straight to university. Instead, she spent six months working as a volunteer on a turtle conservation project in Costa Rica. Her job was to patrol the beach at night, protect the eggs from people and animals, and record data for scientists. "It was exhausting — we slept during the day and worked until 4 am," she says. "But watching hundreds of baby turtles run to the sea was unforgettable." She is now studying biology, and she says the experience helped her choose her degree.`,
    questions: [
      { q: 'What did Lucía do at night?', options: ['Patrolled the beach', 'Studied biology', 'Slept', 'Worked in a hotel'], answer: 0 },
      { q: 'How did the experience help her?', options: ['She chose her degree', 'She learned to swim', 'She got a job', 'She became a scientist'], answer: 0 },
      { q: 'Lucía went to university before Costa Rica.', options: TF, answer: 1 },
    ],
  },
  /* ---------------- B2 ---------------- */
  {
    id: 'r4-b2-fast-fashion', level: 'B2', title: 'The real cost of a cheap T-shirt', topic: 'Consumo',
    text: `A T-shirt that costs five euros seems like a bargain, but its true price is paid elsewhere. Producing a single cotton shirt can require around 2,700 litres of water, and many garments are worn only a handful of times before being thrown away. Fast-fashion brands release new collections almost every week, encouraging shoppers to treat clothes as disposable. In response, a growing number of consumers are turning to second-hand apps, clothing swaps and repair workshops. Critics argue, however, that individual choices are not enough: without regulation forcing brands to take responsibility for waste, the industry has little incentive to change.`,
    questions: [
      { q: 'What is the main idea of the text?', options: ['Cheap clothes have hidden environmental costs', 'Cotton is the best material', 'Second-hand clothes are expensive', 'Fast fashion is improving'], answer: 0 },
      { q: 'What do critics believe is necessary?', options: ['Regulation for brands', 'More clothing swaps', 'Cheaper T-shirts', 'Fewer second-hand apps'], answer: 0 },
      { q: 'The word "disposable" suggests clothes are…', options: ['used briefly and thrown away', 'easy to wash', 'made by hand', 'very valuable'], answer: 0 },
    ],
  },
  {
    id: 'r4-b2-remote', level: 'B2', title: 'Is remote work here to stay?', topic: 'Trabajo',
    text: `When offices closed during the pandemic, many managers assumed productivity would collapse. In fact, numerous studies found that it remained stable, and in some cases even improved. Employees saved hours of commuting and reported a better work–life balance. Yet the picture is not entirely positive. Younger workers, in particular, say they miss out on informal learning — the kind of advice you pick up by overhearing a colleague's phone call. Many companies have therefore settled on a hybrid model, with staff in the office two or three days a week. Whether this compromise will last remains to be seen.`,
    questions: [
      { q: 'What happened to productivity, according to studies?', options: ['It stayed stable or improved', 'It collapsed', 'It fell slightly', 'Nobody measured it'], answer: 0 },
      { q: 'What do younger workers miss?', options: ['Informal learning from colleagues', 'Commuting', 'Their managers', 'Office food'], answer: 0 },
      { q: 'The writer is certain the hybrid model will last.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b2-tenancy', level: 'B2', real: true, title: 'Tenancy agreement (extract)', topic: 'Vida real',
    text: `4. DEPOSIT
4.1 The Tenant shall pay a deposit equivalent to two months' rent before moving in.
4.2 The deposit will be returned within 30 days of the end of the tenancy, minus the cost of any damage beyond normal wear and tear.
5. OBLIGATIONS OF THE TENANT
5.1 The Tenant must not sublet the property or any part of it without the Landlord's written consent.
5.2 The Tenant is responsible for minor repairs (e.g. replacing light bulbs). Major repairs (e.g. boiler, roof) are the responsibility of the Landlord.
5.3 Pets are not permitted unless agreed in writing.`,
    questions: [
      { q: 'When will the deposit be returned?', options: ['Within 30 days of the end of the tenancy', 'When the tenant moves in', 'After two months', 'Never'], answer: 0 },
      { q: 'Who pays to fix the boiler?', options: ['The landlord', 'The tenant', 'Both equally', 'The insurance company'], answer: 0 },
      { q: '"Sublet" means…', options: ['rent the flat to another person', 'paint the walls', 'leave early', 'buy the flat'], answer: 0 },
      { q: 'The tenant can have a pet if the landlord agrees in writing.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r4-b2-bilingual', level: 'B2', title: 'The bilingual brain', topic: 'Ciencia',
    text: `For decades, parents were warned that raising children with two languages would confuse them. Today, research paints a very different picture. Bilingual children may initially have a slightly smaller vocabulary in each language, but their total vocabulary is usually comparable to that of monolingual peers. More interestingly, constantly switching between languages seems to train the brain's ability to focus and ignore distractions. Some studies have even suggested that lifelong bilingualism may delay the symptoms of dementia by several years, although scientists stress that these findings are still being debated.`,
    questions: [
      { q: 'What did people believe in the past?', options: ['Two languages would confuse children', 'Bilingual children were smarter', 'Children can\'t learn two languages', 'Bilingualism prevents dementia'], answer: 0 },
      { q: 'What skill may switching languages improve?', options: ['Focusing and ignoring distractions', 'Memory for numbers', 'Musical ability', 'Speed of reading'], answer: 0 },
      { q: 'The effect on dementia is fully proven.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-b2-tourism', level: 'B2', title: 'When tourists become too many', topic: 'Viajes',
    text: `Venice, Barcelona and Dubrovnik have something in common: they are struggling with overtourism. Residents complain that rising rents, crowded streets and souvenir shops have pushed out local life. Some cities have responded with drastic measures. Venice now charges day-trippers an entry fee on busy days, while Amsterdam has banned new hotels in the city centre. Supporters say these policies protect communities; opponents argue they turn cities into theme parks for the rich. Most experts agree on one point: spreading visitors across the year and beyond the famous sights would ease much of the pressure.`,
    questions: [
      { q: 'What does Venice do on busy days?', options: ['Charges an entry fee', 'Closes the city', 'Bans hotels', 'Limits cruise ships'], answer: 0 },
      { q: 'What do opponents of these policies argue?', options: ['Cities become places only for the rich', 'Tourism will disappear', 'Rents will fall', 'Hotels are necessary'], answer: 0 },
      { q: 'What solution do most experts agree on?', options: ['Spreading visitors over time and places', 'Banning tourists', 'Building more hotels', 'Raising rents'], answer: 0 },
    ],
  },
  {
    id: 'r4-b2-apology', level: 'B2', real: true, title: 'A company statement', topic: 'Vida real',
    text: `To our customers,
On Tuesday morning, a technical fault affected our payment system for approximately four hours. During this time, some customers were charged twice for the same order. We would like to apologise sincerely for the inconvenience this has caused.
All duplicate payments have now been identified and will be refunded automatically within five working days. You do not need to contact us. If, after this period, you still notice an incorrect charge, please get in touch with our support team, quoting your order number.
We have since introduced additional checks to prevent this from happening again.`,
    questions: [
      { q: 'What was the problem?', options: ['Some customers paid twice', 'Orders were lost', 'The website closed for a week', 'Prices were wrong'], answer: 0 },
      { q: 'What do affected customers need to do now?', options: ['Nothing, the refund is automatic', 'Call the company', 'Send their bank details', 'Cancel their order'], answer: 0 },
      { q: 'When should you contact support?', options: ['If the charge is still wrong after five working days', 'Immediately', 'Only on Tuesday', 'Never'], answer: 0 },
    ],
  },
  {
    id: 'r4-b2-food-waste', level: 'B2', title: 'Ugly vegetables', topic: 'Medio ambiente',
    text: `Up to a third of all fruit and vegetables grown in Europe never reach the shops simply because they look wrong: a carrot with two legs, an apple that is too small, a cucumber that isn't straight. Supermarkets argue that customers won't buy them. However, several start-ups have proved them wrong by delivering boxes of "imperfect" produce directly to homes at lower prices. Their success has pushed some big chains to launch their own ugly-vegetable ranges. It is a small step, but it shows how consumer demand can reshape an entire supply chain.`,
    questions: [
      { q: 'Why are many vegetables not sold?', options: ['Because of their appearance', 'Because they are unhealthy', 'Because they are too expensive', 'Because of bad weather'], answer: 0 },
      { q: 'What did start-ups do?', options: ['Sell imperfect produce at lower prices', 'Grow perfect vegetables', 'Open supermarkets', 'Ban ugly vegetables'], answer: 0 },
      { q: 'What is the main message?', options: ['Consumers can change how the industry works', 'Supermarkets are always right', 'Ugly vegetables are dangerous', 'Start-ups usually fail'], answer: 0 },
    ],
  },
  {
    id: 'r4-b2-volcano', level: 'B2', title: 'Living next to a volcano', topic: 'Naturaleza',
    text: `Around 800 million people live within 100 kilometres of an active volcano. Why would anyone choose such a dangerous home? The answer is largely the soil: volcanic ash makes land extremely fertile, which is ideal for farming. In places like Indonesia or Sicily, families have cultivated the slopes of volcanoes for generations. Modern monitoring has also reduced the risk. Scientists measure tiny earthquakes, changes in gas emissions and even the swelling of the ground, which often give days or weeks of warning before an eruption. Nevertheless, evacuations are never easy, as many people are reluctant to leave their land and animals.`,
    questions: [
      { q: 'Why do people farm near volcanoes?', options: ['The soil is very fertile', 'Land is free', 'The weather is warm', 'There is more water'], answer: 0 },
      { q: 'What can warn scientists of an eruption?', options: ['Small earthquakes and gas changes', 'The colour of the sky', 'Animals leaving', 'Heavy rain'], answer: 0 },
      { q: 'Why are evacuations difficult?', options: ['People don\'t want to leave their land and animals', 'There are no roads', 'Scientists disagree', 'It costs too much'], answer: 0 },
    ],
  },
  /* ---------------- C1 ---------------- */
  {
    id: 'r4-c1-attention', level: 'C1', title: 'The attention economy', topic: 'Tecnología',
    text: `Most of the apps on our phones are free, yet their parent companies are among the most valuable on earth. The apparent paradox dissolves once we recognise what is really being sold: our attention. Every scroll, pause and click is harvested to refine algorithms whose sole purpose is to keep us engaged for longer, since longer engagement translates directly into advertising revenue. Features such as infinite scroll and autoplay are not neutral design choices but deliberate mechanisms that remove natural stopping points. Critics argue that this business model is fundamentally at odds with users' wellbeing, and some have called for "attention" to be regulated in much the same way as other finite resources. Defenders counter that users remain free to switch off — a claim that rings somewhat hollow when the product has been engineered precisely to make that difficult.`,
    questions: [
      { q: 'According to the text, what do free apps really sell?', options: ['Users\' attention', 'Personal data only', 'Subscriptions', 'Hardware'], answer: 0 },
      { q: 'Why are infinite scroll and autoplay mentioned?', options: ['As examples of designs that remove stopping points', 'As neutral improvements', 'As features users requested', 'As outdated technologies'], answer: 0 },
      { q: 'What is the writer\'s attitude to the defenders\' argument?', options: ['Sceptical', 'Fully supportive', 'Neutral', 'Confused'], answer: 0 },
      { q: '"Rings hollow" most nearly means…', options: ['sounds insincere or unconvincing', 'is very loud', 'is completely true', 'is hard to understand'], answer: 0 },
    ],
  },
  {
    id: 'r4-c1-nudge', level: 'C1', title: 'Nudging citizens', topic: 'Sociedad',
    text: `Governments have long relied on two tools to change behaviour: laws and money. Over the past two decades, a third has gained prominence — the "nudge". Rather than banning or taxing, a nudge alters the way choices are presented. Making pension enrolment automatic, so that employees must actively opt out, has dramatically increased savings rates in several countries. Placing fruit at eye level in school canteens subtly boosts healthy eating. Proponents praise nudges as cheap and respectful of freedom of choice. Sceptics, however, warn of a slippery slope: if the state can steer decisions without people noticing, where should the line be drawn between gentle guidance and manipulation?`,
    questions: [
      { q: 'How is a nudge different from a law or tax?', options: ['It changes how choices are presented', 'It is more expensive', 'It forbids certain choices', 'It only applies to companies'], answer: 0 },
      { q: 'What effect did automatic pension enrolment have?', options: ['Savings increased', 'Employees complained', 'Taxes rose', 'Nothing changed'], answer: 0 },
      { q: 'What concern do sceptics raise?', options: ['Nudges could become manipulation', 'Nudges are too costly', 'Nudges never work', 'Nudges are illegal'], answer: 0 },
    ],
  },
  {
    id: 'r4-c1-cover-letter', level: 'C1', real: true, title: 'A cover letter', topic: 'Vida real',
    text: `Dear Ms Hartley,
I am writing to apply for the position of Communications Officer advertised on your website. Having spent the last four years coordinating campaigns for a mid-sized environmental charity, I believe I am well placed to contribute to your organisation's work.
In my current role, I have overhauled our social media strategy, which led to a 60% increase in online donations over two years. I have also liaised with journalists, drafted press releases at short notice and managed a modest budget. What draws me to your foundation in particular is its commitment to evidence-based advocacy, a principle I share.
I would welcome the opportunity to discuss how my experience aligns with your needs. Thank you for considering my application.
Yours sincerely,
Laura Méndez`,
    questions: [
      { q: 'What achievement does Laura highlight?', options: ['A large increase in online donations', 'Founding a charity', 'Writing a book', 'Managing a big team'], answer: 0 },
      { q: 'Why is she attracted to this foundation?', options: ['Its evidence-based advocacy', 'Its high salary', 'Its location', 'Its size'], answer: 0 },
      { q: '"Liaised with" is closest in meaning to…', options: ['worked and communicated with', 'argued with', 'replaced', 'interviewed'], answer: 0 },
    ],
  },
  {
    id: 'r4-c1-placebo', level: 'C1', title: 'The curious power of placebos', topic: 'Ciencia',
    text: `It has long been known that patients given sugar pills sometimes improve simply because they expect to. What is more surprising is that placebos can work even when patients know they are taking one. In several trials, people with chronic back pain or irritable bowel syndrome were openly told that their pills contained no active ingredient, yet many reported significant relief. Researchers believe the ritual of treatment — the consultation, the attention, the act of taking a pill — triggers genuine changes in how the brain processes pain. This does not mean that illness is "all in the mind"; rather, it underlines how deeply expectation and context are intertwined with our physical experience.`,
    questions: [
      { q: 'What is surprising about the trials mentioned?', options: ['Placebos worked even when patients knew', 'Placebos never worked', 'The pills contained drugs', 'Only children improved'], answer: 0 },
      { q: 'What do researchers think causes the effect?', options: ['The ritual and context of treatment', 'Hidden ingredients', 'Patients lying', 'The colour of the pills'], answer: 0 },
      { q: 'The writer claims that illness is all in the mind.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r4-c1-cities', level: 'C1', title: 'The fifteen-minute city', topic: 'Urbanismo',
    text: `The idea is disarmingly simple: everyone should be able to reach their daily needs — work, school, shops, healthcare and green space — within a fifteen-minute walk or bike ride from home. Popularised by the urbanist Carlos Moreno and embraced by the mayor of Paris, the concept promises cleaner air, stronger communities and less time wasted in traffic. Yet it has also become unexpectedly controversial. Some critics claim, without much evidence, that it is a plot to restrict movement. More grounded objections point out that redesigning neighbourhoods may drive up property prices, pushing out the very residents it is meant to benefit. As with many urban reforms, the devil lies in the implementation.`,
    questions: [
      { q: 'What is the core idea of the fifteen-minute city?', options: ['Daily needs within a short walk or ride', 'Faster cars', 'Shorter working days', 'Building more motorways'], answer: 0 },
      { q: 'What is described as a more reasonable objection?', options: ['Property prices may rise', 'It restricts movement', 'Bikes are dangerous', 'Parks are expensive'], answer: 0 },
      { q: '"The devil lies in the implementation" means…', options: ['the problems appear when putting it into practice', 'the idea is evil', 'the plan is perfect', 'nobody will implement it'], answer: 0 },
    ],
  },
];
