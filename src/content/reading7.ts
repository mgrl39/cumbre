import type { ReadingText } from '../core/types.ts';
import { mkReading as R } from './reading5.ts';

const real = { real: true };

/* Lecturas originales B2: artículos de divulgación, opinión, reportajes y documentos reales. */
export const READINGS_7: ReadingText[] = [
  R('r7-b2-open-plan', 'B2', 'The open-plan office on trial', 'Trabajo', `Open-plan offices were supposed to encourage collaboration by removing the walls between colleagues. The evidence, however, points in the opposite direction. When researchers tracked employees at two firms that had switched to open layouts, they found that face-to-face conversation fell by roughly 70 per cent, while emails and instant messages increased. It seems that, deprived of privacy, people put on headphones and withdraw. Companies are unlikely to bring back private offices, which are costly, but many are now experimenting with quiet rooms and "library rules" in certain areas.`, [
    ['What did researchers discover after firms switched to open layouts?', 'People talked face to face far less', 'Collaboration improved sharply', 'Emails decreased'],
    ['Why are private offices unlikely to return?', 'They are expensive', 'Employees dislike them', 'They are illegal'],
    ['The original aim of open-plan offices was to save money.', 'NG'],
  ]),
  R('r7-b2-rewilding', 'B2', 'Letting nature take over', 'Medio ambiente', `For centuries, conservation meant careful management: planting, fencing and controlling. Rewilding turns that idea on its head. Its supporters argue that, given enough space and a few key species, ecosystems can repair themselves. At Knepp, a former farm in southern England, the owners stopped ploughing in 2001 and introduced free-roaming cattle, ponies and pigs. Within two decades, nightingales and rare butterflies had returned in remarkable numbers. Critics point out that the approach takes land out of food production and that results are unpredictable; advocates reply that unpredictability is precisely the point.`, [
    ['What is the central idea of rewilding?', 'Ecosystems can recover with little intervention', 'Farms should use more technology', 'Rare species must be bred in zoos'],
    ['What happened at Knepp?', 'Rare wildlife returned', 'Crop yields doubled', 'The cattle were removed'],
    ['Critics worry about the loss of farmland.', 'T'],
  ]),
  R('r7-b2-decision-fatigue', 'B2', 'Why choosing is tiring', 'Psicología', `By the time we go to bed, most of us have made thousands of decisions, from what to wear to how to answer a difficult email. Psychologists use the term "decision fatigue" to describe the way the quality of our choices deteriorates after a long session of choosing. Tired decision-makers tend either to act impulsively or to avoid deciding at all. This may explain why supermarkets place sweets next to the till, where shoppers arrive mentally exhausted. A common piece of advice is to automate trivial choices so as to save energy for the ones that matter.`, [
    ['What is "decision fatigue"?', 'Worse choices after making many decisions', 'Fear of making decisions', 'Tiredness caused by lack of sleep'],
    ['Why are sweets placed near the till?', 'Shoppers have little willpower left by then', 'They are cheaper to stock there', 'Children can reach them'],
    ['The text recommends making trivial choices automatic.', 'T'],
  ]),
  R('r7-b2-language-death', 'B2', 'When a language falls silent', 'Lengua', `Of the roughly seven thousand languages spoken today, linguists estimate that half may disappear by the end of the century. A language usually dies not because its speakers do, but because parents stop passing it on, judging that a dominant language will offer their children better prospects. What is lost is more than vocabulary. Languages encode knowledge of local plants, weather and history that has rarely been written down. Revival is possible — Welsh and Māori have both gained speakers — but it demands schools, media and, above all, a community that wants its language back.`, [
    ['Why do most languages die?', 'Parents stop teaching them to children', 'Their speakers are killed', 'Governments ban them'],
    ['What is lost along with a language?', 'Unwritten local knowledge', 'Only a few words', 'Economic opportunities'],
    ['Welsh is given as an example of successful revival.', 'T'],
  ]),
  R('r7-b2-influencers', 'B2', 'Can you trust a recommendation?', 'Medios', `When a celebrity appears in a television advert, viewers understand that money has changed hands. On social media the line is blurrier. An influencer who seems to be chatting to friends about a favourite moisturiser may have been paid thousands to do so. Regulators in several countries now require sponsored posts to be clearly labelled, yet enforcement is patchy and labels are often buried among hashtags. Surveys suggest that younger users are well aware of the game; what worries researchers is not that followers are deceived, but that they have stopped minding.`, [
    ['How does social media advertising differ from TV adverts?', 'It is harder to recognise as advertising', 'It is more expensive', 'It is better regulated'],
    ['What do regulators demand?', 'Clear labelling of sponsored posts', 'A ban on influencers', 'Lower fees'],
    ['Researchers are mainly worried that young users are being fooled.', 'F'],
  ]),
  R('r7-b2-water', 'B2', 'The price of a pair of jeans', 'Consumo', `It takes around 7,500 litres of water to produce a single pair of jeans — roughly what one person drinks in seven years. Most of it goes on growing cotton, a thirsty crop often cultivated in regions where water is already scarce. Dyeing and finishing add chemical pollution to the bill. Some manufacturers have responded with techniques that use lasers instead of water to fade the fabric, cutting consumption dramatically. Even so, campaigners insist that the most effective measure is also the least glamorous: buying fewer pairs and wearing them for longer.`, [
    ['Where is most of the water used?', 'In growing cotton', 'In dyeing', 'In transport'],
    ['What innovation is mentioned?', 'Using lasers to fade fabric', 'Recycling old jeans', 'Synthetic cotton'],
    ['Campaigners believe technology alone will solve the problem.', 'F'],
  ]),
  R('r7-b2-commuting', 'B2', 'The hidden cost of a long commute', 'Sociedad', `When choosing a home, people consistently underestimate how miserable a long commute will make them. Economists have calculated that someone with an hour-long journey each way would need to earn 40 per cent more to be as satisfied with life as a person who walks to work. The reason seems to be that we adapt to a bigger house or a higher salary, which soon feel normal, whereas traffic jams and delayed trains remain unpredictable and therefore stressful. The lesson, researchers suggest, is to value time more highly than square metres.`, [
    ['What mistake do house-hunters make?', 'They underestimate the effect of commuting', 'They pay too much', 'They choose small houses'],
    ['Why don\'t we adapt to commuting?', 'It is unpredictable', 'It is expensive', 'It is boring'],
    ['The researchers recommend prioritising space over time.', 'F'],
  ]),
  R('r7-b2-insurance', 'B2', 'Travel insurance: key exclusions', 'Vida real', `WHAT IS NOT COVERED
This policy does not cover:
• any medical condition you knew about before buying the policy, unless you declared it and we accepted it in writing;
• claims arising from the use of alcohol or drugs;
• winter sports, scuba diving below 18 metres and other hazardous activities, unless the relevant extension has been purchased;
• valuables left unattended, including in a locked vehicle;
• cancellation due to a change of mind.
An excess of £75 applies to each claim. Theft must be reported to the local police within 24 hours and a written report obtained.`, [
    ['When are pre-existing conditions covered?', 'If declared and accepted in writing', 'Always', 'Never'],
    ['What must you do if something is stolen?', 'Report it to the police within 24 hours', 'Call the insurer within a week', 'Pay £75 at once'],
    ['A phone stolen from a locked car would be covered.', 'F'],
  ], real),
  R('r7-b2-esports', 'B2', 'Is gaming a sport?', 'Deporte', `Professional video gamers train for up to ten hours a day, employ coaches and nutritionists, and compete in stadiums before tens of thousands of spectators. Prize money at the largest tournaments rivals that of tennis. Does this make gaming a sport? Purists object that there is little physical exertion involved. Defenders reply that the same could be said of shooting or chess, and that elite players show reaction times and hand-eye coordination comparable to those of fighter pilots. Whatever the label, the careers are short: most professionals retire before the age of twenty-five.`, [
    ['What is the purists\' objection?', 'Gaming involves little physical effort', 'Gamers earn too much', 'Tournaments are too long'],
    ['Which argument do defenders use?', 'Other accepted sports are not very physical either', 'Gaming is healthier than football', 'Gamers are stronger than athletes'],
    ['Most professional gamers have long careers.', 'F'],
  ]),
  R('r7-b2-antibiotics', 'B2', 'A cure that is wearing out', 'Salud', `Antibiotics transformed medicine, turning once-fatal infections into minor inconveniences. Their very success has put them at risk. Every time the drugs are used, bacteria that happen to be resistant survive and multiply; the more we use, the faster resistance spreads. Overprescription by doctors is part of the problem, but so is agriculture, where antibiotics have routinely been given to healthy animals to make them grow faster. Developing new drugs is slow and unprofitable, since a medicine taken for a week earns far less than one taken for life. Without action, routine surgery could again become dangerous.`, [
    ['Why does resistance spread?', 'Resistant bacteria survive each use and multiply', 'Antibiotics lose strength with age', 'Patients become immune'],
    ['Why are companies reluctant to develop new antibiotics?', 'They are not very profitable', 'They are impossible to make', 'They are banned'],
    ['Farming has contributed to the problem.', 'T'],
  ]),
  R('r7-b2-tiny-houses', 'B2', 'Living small', 'Vivienda', `With property prices beyond the reach of many young adults, some are choosing homes no bigger than a garden shed. A typical "tiny house" measures under 30 square metres and costs a fraction of a conventional flat. Owners speak of freedom from mortgages and from the clutter that fills larger homes. The reality can be less romantic. Planning laws in many places do not recognise such dwellings, forcing owners to move regularly, and couples admit that privacy is hard to find. For most, it turns out, the tiny house is a stage of life rather than a permanent solution.`, [
    ['Why do people choose tiny houses?', 'They are far cheaper than ordinary homes', 'They are fashionable in cities', 'They are easier to sell'],
    ['What legal difficulty do owners face?', 'Planning laws often do not recognise them', 'They cannot get insurance', 'They pay higher taxes'],
    ['Most owners live in tiny houses permanently.', 'F'],
  ]),
  R('r7-b2-placebo-sport', 'B2', 'The lucky socks effect', 'Psicología', `Many athletes have rituals: a tennis player who bounces the ball exactly five times, a footballer who always puts on the left boot first. It is easy to dismiss these habits as superstition, but experiments indicate that they work — not through magic, but through confidence. In one study, golfers who were told they were using a "lucky" ball holed significantly more putts than those given an ordinary one. Rituals appear to reduce anxiety and give performers a sense of control. The danger comes when the ritual is impossible to perform and the athlete falls apart.`, [
    ['How do rituals help athletes?', 'They increase confidence and reduce anxiety', 'They bring real luck', 'They improve fitness'],
    ['What did the golf experiment show?', 'Believing a ball was lucky improved results', 'Lucky balls are heavier', 'Rituals make no difference'],
    ['Rituals can become a problem if they cannot be carried out.', 'T'],
  ]),
  R('r7-b2-museums', 'B2', 'Who owns the past?', 'Cultura', `Some of the world's most famous museum pieces were acquired in circumstances that would be unacceptable today — bought from occupying powers, removed during colonial rule or simply taken. Countries of origin are increasingly demanding their return. Museums have traditionally argued that they preserve the objects safely and display them to a global audience. That argument has weakened as countries such as Nigeria and Greece have built modern museums of their own. Several European institutions have begun returning items, though usually selectively and after long negotiations. The debate is no longer about whether, but about how much.`, [
    ['What have museums traditionally argued?', 'They protect objects and show them to the world', 'The objects were gifts', 'The countries of origin do not want them'],
    ['Why has that argument lost force?', 'Countries of origin now have modern museums', 'Visitors have lost interest', 'The objects have been damaged'],
    ['European museums have refused to return anything.', 'F'],
  ]),
  R('r7-b2-feedback', 'B2', 'Performance review: summary', 'Vida real', `ANNUAL REVIEW — SUMMARY
Strengths: Elena has exceeded her sales targets in three of the four quarters and is highly regarded by clients, two of whom wrote to commend her responsiveness. She has also mentored a new colleague informally.
Areas for development: Reports are occasionally submitted after the deadline, and Elena tends to take on tasks herself rather than delegate.
Agreed objectives: (1) attend the project management course in March; (2) hand over routine client updates to the junior team by June; (3) submit all monthly reports by the fifth working day.
A salary increase of 4% has been approved from 1 January.`, [
    ['What is one of Elena\'s strengths?', 'Clients value her highly', 'She always meets deadlines', 'She delegates well'],
    ['What should Elena do by June?', 'Pass routine updates to junior staff', 'Complete a course', 'Find new clients'],
    ['Elena met her sales targets in every quarter.', 'F'],
  ], real),
  R('r7-b2-light-pollution', 'B2', 'Losing the night', 'Medio ambiente', `For most of human history, the Milky Way was a familiar sight. Today, more than a third of the world's population cannot see it at all because of artificial light. The loss is not merely aesthetic. Migrating birds are disorientated by illuminated buildings, newly hatched turtles crawl towards streetlights instead of the sea, and human sleep cycles are disrupted. Fortunately, light pollution is one of the easiest environmental problems to fix. Shielded lamps that point downwards, warmer bulbs and motion sensors cut wasted light immediately — and reduce electricity bills as well.`, [
    ['How does artificial light affect wildlife?', 'It confuses birds and turtles', 'It attracts predators', 'It warms the oceans'],
    ['Why is light pollution relatively easy to solve?', 'Simple changes have an immediate effect', 'Few people care', 'Laws already forbid it'],
    ['The solutions mentioned also save money.', 'T'],
  ]),
  R('r7-b2-bilingual-brain', 'B2', 'Two languages, one mind', 'Ciencia', `It was once widely believed that raising children with two languages would confuse them and delay their development. Research over the past decades has overturned this view. Bilingual children may start speaking slightly later, but they catch up quickly and tend to outperform monolingual peers on tasks that require switching attention. The advantage may last a lifetime: some studies suggest that symptoms of dementia appear, on average, four years later in lifelong bilinguals. Not all findings have been replicated, however, and researchers caution against treating bilingualism as a miracle cure.`, [
    ['What was the old belief?', 'Two languages confuse children', 'Bilingual children are more intelligent', 'Children cannot learn two languages'],
    ['What possible long-term benefit is mentioned?', 'Later onset of dementia symptoms', 'Higher income', 'Better eyesight'],
    ['All the studies agree about the benefits.', 'F'],
  ]),
  R('r7-b2-cashless', 'B2', 'The end of cash?', 'Economía', `In Sweden, fewer than one in ten purchases is now made with notes and coins, and many shops display signs refusing cash altogether. For most customers this is a convenience; for banks and retailers it means lower costs and fewer robberies. There are losers, though. Elderly people, tourists and those without bank accounts can find themselves unable to buy a coffee. Security experts add a further concern: a society that relies entirely on electronic payments is vulnerable to power cuts and cyberattacks. The Swedish central bank has consequently urged shops to keep accepting cash.`, [
    ['Who benefits from a cashless society?', 'Banks and retailers', 'Elderly people', 'Tourists'],
    ['What risk do security experts mention?', 'Vulnerability to power cuts and cyberattacks', 'Higher prices', 'More robberies'],
    ['The Swedish central bank wants cash to disappear completely.', 'F'],
  ]),
  R('r7-b2-reference', 'B2', 'A letter of reference', 'Vida real', `To whom it may concern,
I am pleased to recommend Daniel Okafor, who worked under my supervision as a laboratory technician from September 2021 to July 2024.
Daniel was responsible for preparing samples and maintaining equipment. He proved to be meticulous and reliable, and he frequently stayed late to ensure that experiments were completed. When our senior technician was on leave, Daniel took over the ordering of supplies without being asked and handled it flawlessly.
He left us in order to pursue a master's degree. I would gladly employ him again and recommend him without reservation.
Dr Sarah Whitfield`, [
    ['Why did Daniel leave his job?', 'To study for a master\'s degree', 'He was dismissed', 'He found a better-paid post'],
    ['What example of initiative is given?', 'He took over ordering supplies', 'He trained new staff', 'He designed an experiment'],
    ['Dr Whitfield has some doubts about Daniel.', 'F'],
  ], real),
  R('r7-b2-boredom', 'B2', 'In praise of boredom', 'Psicología', `We treat boredom as an enemy to be defeated the instant it appears, usually by reaching for a phone. Yet psychologists increasingly regard it as useful. In experiments, volunteers who were first made to carry out a dull task, such as copying numbers from a phone book, later came up with more original ideas than those who had not. A wandering mind, it appears, makes unexpected connections. Parents who rush to fill every minute of their children's day may therefore be doing them no favours. Having nothing to do is often where imagination begins.`, [
    ['What did the experiments show?', 'Boring tasks led to more original ideas afterwards', 'Bored people perform worse', 'Phones increase creativity'],
    ['What does the writer imply about parents?', 'They should leave children some unstructured time', 'They should buy more toys', 'They should ban phones'],
    ['The writer considers boredom entirely negative.', 'F'],
  ]),
  R('r7-b2-vertical-farm', 'B2', 'Farms without fields', 'Tecnología', `In a warehouse on the outskirts of Copenhagen, lettuces grow in trays stacked fourteen layers high, bathed in pink LED light. Vertical farms like this use no soil, no pesticides and around 95 per cent less water than conventional agriculture. Because they can be located inside cities, transport is minimal and the produce reaches shops within hours. The drawback is energy: replacing sunlight with electricity is expensive, which is why such farms concentrate on high-value salad leaves and herbs. Nobody expects wheat or potatoes to move indoors any time soon.`, [
    ['What is an advantage of vertical farms?', 'They use far less water', 'They need no electricity', 'They produce cheap wheat'],
    ['What is the main disadvantage?', 'High energy costs', 'Poor taste', 'Distance from cities'],
    ['Vertical farms mostly grow salad leaves and herbs.', 'T'],
  ]),
  R('r7-b2-apology', 'B2', 'The art of saying sorry', 'Comunicación', `Not all apologies are equal. "I'm sorry if anyone was offended" manages to sound like an apology while admitting nothing. According to researchers who have analysed hundreds of public statements, an effective apology contains several elements: a clear acknowledgement of responsibility, an explanation that does not turn into an excuse, an expression of regret and an offer to put things right. Of these, accepting responsibility matters most. Organisations are often advised by lawyers to avoid doing so; ironically, studies of medical errors show that patients who receive a sincere apology are less likely to sue.`, [
    ['What is wrong with "I\'m sorry if anyone was offended"?', 'It accepts no responsibility', 'It is too long', 'It is rude'],
    ['Which element of an apology is most important?', 'Admitting responsibility', 'Offering money', 'Explaining the reasons'],
    ['Patients who receive an apology are more likely to take legal action.', 'F'],
  ]),
  R('r7-b2-noise', 'B2', 'The sound of the city', 'Salud', `Noise is often regarded as a mere nuisance, but the World Health Organization ranks it second only to air pollution among environmental threats to health in Europe. Long-term exposure to traffic noise has been linked to high blood pressure, heart disease and poorer school results in children. The damage occurs even when people believe they have got used to the sound: the body continues to release stress hormones during sleep. Some cities have responded with lower speed limits, quieter road surfaces and "quiet zones" in parks. Electric vehicles help only at low speeds, since above 50 km/h most noise comes from tyres.`, [
    ['How does noise harm people who think they are used to it?', 'The body still reacts with stress', 'They become deaf', 'They sleep longer'],
    ['Why are electric cars only a partial solution?', 'At higher speeds tyre noise dominates', 'They are too expensive', 'They are heavier'],
    ['Noise is considered a greater health threat than air pollution.', 'F'],
  ]),
  R('r7-b2-crowdfunding', 'B2', 'Asking the crowd', 'Economía', `Before crowdfunding, an inventor with a bright idea had to convince a bank or a wealthy investor. Now thousands of strangers can each contribute a small sum in exchange for an early version of the product. The model has financed everything from board games to smartwatches. It has also produced notable failures. Backers are not customers in the legal sense, and when a project collapses — as roughly one in ten does — they usually lose their money. Experienced supporters recommend treating a pledge as a donation to an idea you like rather than a purchase.`, [
    ['How has crowdfunding changed things for inventors?', 'They can raise small sums from many people', 'Banks lend more easily', 'They no longer need a product'],
    ['What happens when a project fails?', 'Backers usually lose their money', 'The platform refunds everyone', 'The government pays'],
    ['About half of all projects collapse.', 'F'],
  ]),
  R('r7-b2-conference', 'B2', 'Conference call for papers', 'Vida real', `CALL FOR PAPERS — 9th European Conference on Urban Mobility, Rotterdam, 14–16 May
We invite proposals for 20-minute presentations on topics including cycling infrastructure, shared transport and accessibility. Abstracts of no more than 300 words should be submitted through the conference website by 15 December. Authors will be notified of the committee's decision by the end of January.
Accepted speakers must register by 1 March to be included in the programme. A reduced fee is available to students and to delegates from low-income countries. Presentations will be recorded unless speakers object in writing.`, [
    ['What is the maximum length of an abstract?', '300 words', '20 minutes', '9 pages'],
    ['What must accepted speakers do by 1 March?', 'Register', 'Submit the full paper', 'Pay for a hotel'],
    ['Speakers can refuse to be recorded.', 'T'],
  ], real),
  R('r7-b2-slow-travel', 'B2', 'The case for going slowly', 'Viajes', `A weekend in Prague, three days in Marrakesh, a long weekend in New York: cheap flights have made the short break a habit. A growing number of travellers are rejecting it. Advocates of "slow travel" prefer to spend a fortnight in a single region, arriving by train where possible, renting a flat and shopping at the local market. They argue that a traveller who rushes through five capitals has seen five airports and little else. There is an environmental case too, though enthusiasts tend to stress something simpler: they come home rested rather than exhausted.`, [
    ['What do slow travellers prefer?', 'Staying longer in one area', 'Visiting many capitals', 'Travelling only by plane'],
    ['What criticism is made of rushed trips?', 'Travellers see little apart from airports', 'They are too cheap', 'They are dangerous'],
    ['Enthusiasts mainly emphasise the environmental benefits.', 'F'],
  ]),
  R('r7-b2-handwriting', 'B2', 'Pen versus keyboard', 'Educación', `As laptops have replaced notebooks in lecture halls, researchers have asked whether anything is lost. Several experiments suggest that it is. Students who type tend to transcribe lectures word for word, whereas those who write by hand, being slower, are forced to summarise and rephrase — and it is this processing that fixes ideas in memory. When tested a week later on concepts rather than facts, the hand-writers generally did better. Laptops do, of course, have advantages for editing and searching. The sensible conclusion is perhaps not to ban them but to teach students to take notes selectively.`, [
    ['Why might handwriting help learning?', 'Its slowness forces students to process ideas', 'It is faster', 'It looks neater'],
    ['On what kind of questions did hand-writers do better?', 'Conceptual ones', 'Factual ones', 'Mathematical ones'],
    ['The writer recommends banning laptops from lectures.', 'F'],
  ]),
  R('r7-b2-gig', 'B2', 'Freedom or insecurity?', 'Trabajo', `Delivery riders and app-based drivers are often described as their own bosses, free to work whenever they choose. Many value exactly that. Yet the flexibility is frequently one-sided: the platform sets the prices, controls access to customers through an algorithm and can deactivate an account without explanation. Because they are classified as self-employed, such workers typically receive no sick pay or paid holiday. Courts in several countries have ruled that some of them are, in practice, employees. Platforms warn that reclassification will raise prices and reduce the number of jobs available.`, [
    ['In what sense is the flexibility "one-sided"?', 'The platform keeps control over prices and access', 'Workers choose their hours', 'Customers set the rules'],
    ['What have some courts decided?', 'Some gig workers are really employees', 'Platforms must close', 'Workers must pay more tax'],
    ['Gig workers usually receive paid holidays.', 'F'],
  ]),
  R('r7-b2-coral', 'B2', 'Gardening under the sea', 'Ciencia', `Coral reefs cover less than one per cent of the ocean floor yet support a quarter of all marine species. Rising sea temperatures cause corals to expel the algae that feed them, leaving white skeletons behind — a process known as bleaching. In response, marine biologists have turned gardener. Fragments of heat-tolerant coral are grown on underwater frames and then transplanted onto damaged reefs. Early results are encouraging on a small scale. Scientists stress, however, that restoration buys time at best: unless emissions fall, even the toughest corals will eventually be overwhelmed.`, [
    ['What causes bleaching?', 'Warmer water makes corals expel algae', 'Pollution from ships', 'Overfishing'],
    ['What are biologists doing?', 'Growing resistant corals and replanting them', 'Cooling the sea', 'Building artificial islands'],
    ['Scientists believe restoration alone will save the reefs.', 'F'],
  ]),
  R('r7-b2-nostalgia', 'B2', 'Why the past looks better', 'Psicología', `Ask people about their school days or a holiday taken years ago, and the account is usually rosier than the diary they kept at the time. Memory, it turns out, edits. Unpleasant emotions fade faster than pleasant ones, a tendency psychologists call the "fading affect bias". Nostalgia was once classified as a medical disorder; today it is seen as largely beneficial, strengthening our sense of identity and connection to others. It becomes harmful only when the comparison with an idealised past makes the present seem unbearable — a weakness that advertisers and politicians know how to exploit.`, [
    ['What is the "fading affect bias"?', 'Negative feelings fade faster than positive ones', 'Old memories disappear', 'People invent memories'],
    ['How is nostalgia viewed today?', 'As mostly positive', 'As an illness', 'As a waste of time'],
    ['Advertisers are said to take advantage of nostalgia.', 'T'],
  ]),
  R('r7-b2-drones', 'B2', 'Deliveries from the sky', 'Tecnología', `In rural Rwanda, blood for transfusions arrives by drone. A hospital sends a text message, and within half an hour a small aircraft drops a padded package by parachute. The service has cut delivery times from hours to minutes and reduced waste, since supplies no longer have to be stockpiled in remote clinics. Its success owes much to geography: roads are poor, and airspace is uncrowded. Transferring the model to European cities, with their dense air traffic and strict privacy rules, has proved far harder, and most urban trials remain limited to a handful of routes.`, [
    ['What do the drones deliver in Rwanda?', 'Blood', 'Letters', 'Food'],
    ['Why has the service worked well there?', 'Poor roads and empty airspace', 'Low wages', 'Flat terrain'],
    ['The model has been easily copied in European cities.', 'F'],
  ]),
  R('r7-b2-complaint-formal', 'B2', 'A formal complaint', 'Vida real', `Dear Customer Relations Manager,
I am writing to express my dissatisfaction with the service I received at your Bristol branch on 2 November.
I had booked a hire car for 9 am. On arrival I was told that no vehicle of the category I had paid for was available, and I was kept waiting for almost two hours before being offered a smaller car at the same price. As a result, I missed a business meeting.
I would therefore request a refund of the difference in price and compensation for the inconvenience caused. Should I not receive a satisfactory reply within fourteen days, I shall refer the matter to the consumer ombudsman.
Yours faithfully,
Priya Nair`, [
    ['What went wrong?', 'The booked car was unavailable and she waited two hours', 'The car broke down', 'She was overcharged for petrol'],
    ['What does she ask for?', 'A partial refund and compensation', 'A free upgrade next time', 'An apology only'],
    ['She threatens to contact the ombudsman.', 'T'],
  ], real),
  R('r7-b2-sleep-debt', 'B2', 'Can you catch up on sleep?', 'Salud', `Plenty of people get by on six hours a night during the week and promise themselves a long lie-in on Saturday. Does it work? Only partly. Extra weekend sleep relieves tiredness, but laboratory studies show that attention and reaction times do not fully recover, and that irregular hours confuse the body clock — a state researchers have nicknamed "social jet lag". People who shift their sleep by more than two hours at weekends show higher rates of obesity and low mood. The dull but dependable advice is to go to bed and get up at roughly the same time every day.`, [
    ['Does weekend sleep make up for lost sleep?', 'Only partially', 'Completely', 'Not at all'],
    ['What is "social jet lag"?', 'A confused body clock from irregular hours', 'Tiredness after a party', 'Fear of flying'],
    ['The writer recommends regular sleeping hours.', 'T'],
  ]),
];
