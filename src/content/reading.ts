import type { ReadingText } from '../core/types.ts';

const TF = ['True', 'False', 'Not given'];

export const READINGS: ReadingText[] = [
  {
    id: 'r-a1-day', level: 'A1', title: 'A day in my life', topic: 'Rutina',
    text: `My name is Lucas. I am 24 years old and I live in Valencia with my sister. I am a nurse and I work in a big hospital.
I get up at six o'clock every day. I have a coffee and some toast, and then I take the bus to work. My job is difficult, but I love it.
I finish work at three. In the afternoon I go to the gym or I study English. I want to work in London one day.
In the evening I cook dinner with my sister. We usually watch a film or a series. I go to bed at eleven.`,
    questions: [
      { q: 'Who does Lucas live with?', options: ['His sister', 'His parents', 'A friend', 'Alone'], answer: 0 },
      { q: 'What is his job?', options: ['Nurse', 'Doctor', 'Teacher', 'Bus driver'], answer: 0 },
      { q: 'How does he go to work?', options: ['By bus', 'By car', 'On foot', 'By bike'], answer: 0 },
      { q: 'Why does he study English?', options: ['He wants to work in London', 'His sister is English', 'His job requires it', 'He has an exam'], answer: 0 },
      { q: 'Lucas thinks his job is easy.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-a1-flat', level: 'A1', title: 'A new flat', topic: 'Vivienda',
    text: `Anna has a new flat in the city centre. It is small, but it is very nice. There is a living room, a kitchen, a bathroom and one bedroom.
The living room has a big window and there are a lot of plants. The kitchen is new and modern. There isn't a washing machine, so Anna goes to a launderette on Saturdays.
The flat is on the fourth floor and there is no lift. "It's good exercise," says Anna. Her favourite thing is the balcony. She has breakfast there every morning in summer.`,
    questions: [
      { q: 'Where is the flat?', options: ['In the city centre', 'Near the beach', 'In a village', 'Outside the city'], answer: 0 },
      { q: 'How many bedrooms does it have?', options: ['One', 'Two', 'Three', 'None'], answer: 0 },
      { q: 'Why does Anna go to a launderette?', options: ['There is no washing machine', 'The washing machine is broken', 'It is cheap', 'She likes it'], answer: 0 },
      { q: 'There is a lift in the building.', options: TF, answer: 1 },
      { q: 'What does she like most?', options: ['The balcony', 'The kitchen', 'The plants', 'The window'], answer: 0 },
    ],
  },
  {
    id: 'r-a2-online', level: 'A2', title: 'Learning online', topic: 'Educación',
    text: `More and more people are learning online. You can study a language, learn to cook or even get a university degree from your sofa.
Online courses have many advantages. They are usually cheaper than traditional classes, and you can study when you want. This is great for people who work full-time or have children.
However, learning online is not easy for everyone. Some students find it hard to stay motivated without a teacher in the room. Others miss the contact with classmates.
Experts say that the best results come from mixing both: some online study and some face-to-face classes. They also recommend studying a little every day instead of a lot once a week.`,
    questions: [
      { q: 'According to the text, online courses are…', options: ['usually cheaper', 'always better', 'only for languages', 'more difficult'], answer: 0 },
      { q: 'Who benefits most from the flexibility?', options: ['People with full-time jobs or children', 'Teachers', 'Young children', 'Retired people'], answer: 0 },
      { q: 'What is a problem for some online students?', options: ['Staying motivated', 'The price', 'The internet speed', 'Finding courses'], answer: 0 },
      { q: 'What do experts recommend?', options: ['Combining online and face-to-face learning', 'Only online learning', 'Studying once a week', 'Avoiding classmates'], answer: 0 },
      { q: 'Most online students are older than 40.', options: TF, answer: 2 },
    ],
  },
  {
    id: 'r-a2-email', level: 'A2', title: 'An email to a new colleague', topic: 'Trabajo',
    text: `Hi Sam,
Welcome to the team! I'm Priya and I'll be your mentor for the first few weeks.
On Monday, please arrive at 9:30, not 9:00, because the manager has a meeting first. Go to reception on the ground floor and ask for me. I'll show you your desk and introduce you to everyone.
In the afternoon you have a training session about our software. Don't worry if it seems complicated at first — everyone finds it confusing in the beginning.
We usually have lunch together on Fridays at a small Italian restaurant near the office. I hope you can join us!
If you have any questions before Monday, just send me a message.
Best wishes,
Priya`,
    questions: [
      { q: 'What is the purpose of the email?', options: ['To welcome a new colleague', 'To cancel a meeting', 'To invite Sam to a party', 'To complain about the software'], answer: 0 },
      { q: 'What time should Sam arrive on Monday?', options: ['9:30', '9:00', '10:00', '9:15'], answer: 0 },
      { q: 'Why should Sam arrive later?', options: ['The manager has a meeting', 'Priya is busy', 'The office opens late', 'There is training first'], answer: 0 },
      { q: 'What does Priya say about the software?', options: ['It is confusing at first for everyone', 'It is very easy', 'Sam must learn it before Monday', 'It is new'], answer: 0 },
      { q: 'The team has lunch together every day.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-b1-sleep', level: 'B1', title: 'Why sleep matters for learning', topic: 'Ciencia',
    text: `Many students believe that staying up late to study is a good idea before an exam. However, scientific research suggests that the opposite is true.
While we sleep, the brain does not simply switch off. In fact, it is very active. During deep sleep, it processes the information we have learned during the day and moves it from short-term to long-term memory. This means that sleep is not a break from learning; it is part of learning.
In one well-known experiment, two groups of students learned a list of words. The first group slept for eight hours, while the second group stayed awake all night. The next day, the students who had slept remembered significantly more words.
Lack of sleep also affects concentration and mood. People who sleep less than six hours a night tend to make more mistakes and feel more stressed.
So, if you want to remember what you study, the advice is simple: review your notes, and then go to bed.`,
    questions: [
      { q: 'What is the main idea of the text?', options: ['Sleep is an important part of learning', 'Students should study at night', 'The brain switches off during sleep', 'Exams cause stress'], answer: 0 },
      { q: 'What happens during deep sleep?', options: ['The brain moves information into long-term memory', 'The brain stops working', 'We forget what we learned', 'We learn new words'], answer: 0 },
      { q: 'In the experiment, the students who slept…', options: ['remembered more words', 'remembered fewer words', 'did the same as the others', 'learned a different list'], answer: 0 },
      { q: 'People who sleep less than six hours…', options: ['tend to make more mistakes', 'learn faster', 'need less food', 'feel more relaxed'], answer: 0 },
      { q: 'The experiment was carried out in the USA.', options: TF, answer: 2 },
    ],
  },
  {
    id: 'r-b1-plastic', level: 'B1', title: 'The problem with plastic', topic: 'Medio ambiente',
    text: `Plastic is cheap, light and strong, which is why we use it for almost everything. But these same qualities have created a serious environmental problem.
Every year, millions of tonnes of plastic end up in the oceans. Because plastic does not break down naturally, it can stay in the environment for hundreds of years. Instead, it slowly breaks into tiny pieces called microplastics. These have been found everywhere — from the deepest parts of the ocean to the ice in the Arctic, and even in the food we eat.
Recycling is often presented as the solution, but in reality only a small percentage of plastic is recycled. Much of it is too difficult or too expensive to process.
For this reason, many experts argue that we need to reduce the amount of plastic we produce in the first place. Some countries have already banned single-use plastic bags and straws, and the results have been encouraging.`,
    questions: [
      { q: 'Why is plastic so widely used?', options: ['It is cheap, light and strong', 'It is easy to recycle', 'It breaks down quickly', 'It is natural'], answer: 0 },
      { q: 'What are microplastics?', options: ['Tiny pieces of broken plastic', 'A type of recycled plastic', 'Plastic bags', 'A new material'], answer: 0 },
      { q: 'According to the text, recycling…', options: ['only deals with a small percentage of plastic', 'solves the problem', 'is cheap', 'is banned in some countries'], answer: 0 },
      { q: 'What do many experts suggest?', options: ['Producing less plastic', 'Recycling more', 'Making stronger plastic', 'Cleaning the oceans'], answer: 0 },
      { q: 'Banning plastic bags has had positive results in some countries.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r-b1-remote', level: 'B1', title: 'Working from home: a mixed blessing', topic: 'Trabajo',
    text: `Since 2020, working from home has become normal for millions of office workers. For many, it has been a positive change. They no longer spend hours commuting, they can organise their own time and they often feel more productive.
Companies have also discovered advantages. They can save money on office space and hire talented people who live far away.
However, remote work has its downsides. Some employees feel isolated and miss the informal conversations that happen in an office. Younger workers, in particular, say it is harder to learn from experienced colleagues when everybody is at home. Others find it difficult to separate their work and personal lives, and end up working longer hours.
As a result, many companies now use a "hybrid" model, in which staff work from home for part of the week and come to the office on the other days.`,
    questions: [
      { q: 'Which advantage for workers is mentioned?', options: ['No commuting', 'Higher salaries', 'Longer holidays', 'Free equipment'], answer: 0 },
      { q: 'How do companies benefit?', options: ['They save on office space', 'Workers work less', 'They pay less tax', 'They need fewer managers'], answer: 0 },
      { q: 'Why is remote work harder for younger workers?', options: ['It is harder to learn from experienced colleagues', 'They have no computers', 'They prefer the office', 'They earn less'], answer: 0 },
      { q: 'What is a "hybrid" model?', options: ['Working partly from home and partly in the office', 'Working only from home', 'Working two jobs', 'Working at night'], answer: 0 },
      { q: 'Some people end up working more hours at home.', options: TF, answer: 0 },
    ],
  },
  {
    id: 'r-b2-attention', level: 'B2', title: 'The attention economy', topic: 'Tecnología y sociedad',
    text: `In the digital age, our attention has become one of the most valuable resources in the world. Most of the apps and websites we use every day are free, but this does not mean they cost nothing. Instead of paying with money, we pay with our time and our data.
Social media platforms make money by selling advertising, and the more time users spend on them, the more adverts they can show. Consequently, these platforms are designed to be as engaging as possible. Features such as infinite scrolling, notifications and personalised recommendations are not accidental; they are carefully developed to keep us coming back.
Critics argue that this business model has serious consequences. Some studies have linked heavy social media use to anxiety and poor sleep, particularly among teenagers, although researchers stress that the evidence is still mixed and that correlation does not prove causation.
In response, a growing number of people are trying to take back control. Strategies range from turning off notifications to setting daily time limits or even deleting apps altogether. Some governments are also considering regulation, such as banning certain design features for younger users.
Whatever the solution, the debate highlights an important question: if a product is free, what exactly are we paying for it with?`,
    questions: [
      { q: 'According to the text, how do users "pay" for free apps?', options: ['With their time and data', 'With monthly subscriptions', 'By watching films', 'They do not pay at all'], answer: 0 },
      { q: 'Why are platforms designed to be engaging?', options: ['More time online means more advertising revenue', 'Users ask for it', 'Governments require it', 'It reduces costs'], answer: 0 },
      { q: 'What does the writer say about the research on social media and anxiety?', options: ['The evidence is still mixed', 'It proves social media causes anxiety', 'There is no research', 'It only concerns adults'], answer: 0 },
      { q: 'The phrase "correlation does not prove causation" means…', options: ['two things happening together does not mean one causes the other', 'the studies were wrong', 'social media is harmless', 'teenagers sleep less'], answer: 0 },
      { q: 'Infinite scrolling was invented by accident.', options: TF, answer: 1 },
      { q: 'What is the writer\'s purpose in the final paragraph?', options: ['To make the reader reflect', 'To recommend deleting apps', 'To criticise governments', 'To summarise research results'], answer: 0 },
    ],
  },
  {
    id: 'r-b2-bilingual', level: 'B2', title: 'Is there a bilingual advantage?', topic: 'Psicología / Lingüística',
    text: `For decades, bilingualism was viewed with suspicion. Early twentieth-century studies claimed that children raised with two languages were confused and performed worse at school. These studies, however, had serious flaws: they often compared children from very different social backgrounds and tested them in their weaker language.
In the 1960s, the picture began to change. New research suggested that bilinguals might actually have cognitive advantages. Because they constantly have to manage two languages and suppress the one they are not using, bilinguals were thought to develop stronger "executive functions" — the mental skills that help us focus, switch between tasks and ignore distractions.
This idea became extremely popular, and was widely reported in the media. More recently, though, some researchers have questioned it. Several large studies have failed to find any clear executive-function advantage, and critics point out that studies with positive results were more likely to be published than those that found nothing.
Today, most experts agree on a more modest conclusion. The cognitive benefits of bilingualism, if they exist, may be smaller than once believed. Nevertheless, the practical, social and cultural benefits of speaking more than one language are beyond doubt.`,
    questions: [
      { q: 'What was wrong with early studies on bilingualism?', options: ['They compared children from different backgrounds', 'They only studied adults', 'They were too recent', 'They used too many languages'], answer: 0 },
      { q: 'What are "executive functions"?', options: ['Skills for focusing and switching tasks', 'Language skills', 'Memory for words', 'Business skills'], answer: 0 },
      { q: 'Why might positive results be overrepresented?', options: ['They were more likely to be published', 'They were more accurate', 'The media invented them', 'They used larger samples'], answer: 0 },
      { q: 'What is the current view of most experts?', options: ['The cognitive benefits may be smaller than thought', 'Bilingualism harms children', 'Bilinguals are more intelligent', 'There are no benefits at all'], answer: 0 },
      { q: 'The writer doubts the social benefits of bilingualism.', options: TF, answer: 1 },
      { q: 'The word "flaws" in paragraph 1 is closest in meaning to…', options: ['weaknesses', 'results', 'advantages', 'questions'], answer: 0 },
    ],
  },
  {
    id: 'r-b2-urban', level: 'B2', title: 'Cities without cars?', topic: 'Urbanismo',
    text: `In recent years, a number of European cities have taken bold steps to reduce the presence of cars in their centres. Pontevedra in Spain, Oslo in Norway and parts of Paris have restricted traffic, removed parking spaces and given streets back to pedestrians and cyclists.
Supporters point to impressive results. Air quality has improved, road accidents have fallen and local businesses, contrary to many predictions, have often seen more customers rather than fewer. People who walk tend to visit shops more frequently, even if they spend less each time.
Nevertheless, these policies are not without controversy. Residents in suburbs, who may depend on cars because public transport is limited, sometimes feel that the changes favour wealthier city-centre residents. Delivery companies and people with reduced mobility have also raised concerns.
The most successful schemes seem to share certain features: they are introduced gradually, they are accompanied by real improvements in public transport, and they involve local people in the planning process from the beginning.`,
    questions: [
      { q: 'What have these cities done?', options: ['Reduced cars in their centres', 'Built more car parks', 'Banned bicycles', 'Closed local shops'], answer: 0 },
      { q: 'What happened to local businesses?', options: ['Many got more customers', 'Most of them closed', 'They lost money', 'They moved to the suburbs'], answer: 0 },
      { q: 'Who might feel the policies are unfair?', options: ['Suburban residents who depend on cars', 'Cyclists', 'Tourists', 'City-centre residents'], answer: 0 },
      { q: 'Which is NOT mentioned as a feature of successful schemes?', options: ['Free parking', 'Gradual introduction', 'Better public transport', 'Involving local people'], answer: 0 },
      { q: 'Pedestrians spend more money per visit than drivers.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-c1-replication', level: 'C1', title: 'The replication crisis', topic: 'Metodología científica',
    text: `Science is supposed to be self-correcting: if a finding is genuine, other researchers following the same procedure should be able to reproduce it. Over the last fifteen years, however, a series of large-scale replication projects has cast doubt on a considerable proportion of published research, particularly in psychology and biomedicine. In one widely cited effort, fewer than half of the replicated psychology studies produced results comparable to the originals.
The causes of this so-called "replication crisis" are not primarily fraud, which remains rare, but rather a set of incentives that subtly distort the research process. Academic careers depend heavily on publication, and journals have historically favoured novel, striking and statistically significant results. Under such pressure, researchers may — often without being fully aware of it — make a series of analytical decisions that increase the likelihood of obtaining a positive result: excluding certain data points, testing multiple hypotheses and reporting only those that "worked", or stopping data collection once significance has been reached.
Notwithstanding the alarm it has caused, the crisis has arguably had a salutary effect. Pre-registration, whereby researchers publicly specify their hypotheses and methods before collecting data, has become increasingly common. Many journals now accept "registered reports", committing to publish a study on the basis of its design rather than its results. Data sharing and larger sample sizes are also more widespread.
None of this implies that scientific knowledge as a whole is unreliable. Rather, it underlines that any single study should be treated as provisional, and that confidence in a finding ought to be proportional to the weight of accumulated, independently replicated evidence.`,
    questions: [
      { q: 'According to the text, the main cause of the crisis is…', options: ['incentives that distort research', 'widespread fraud', 'a lack of funding', 'poor equipment'], answer: 0 },
      { q: 'Why might researchers obtain false positive results?', options: ['They make analytical choices that favour significance', 'They invent their data', 'Journals reject all positive results', 'They use too many participants'], answer: 0 },
      { q: 'What is "pre-registration"?', options: ['Stating hypotheses and methods before collecting data', 'Registering at a university', 'Publishing results early', 'Paying a journal before submission'], answer: 0 },
      { q: 'What is special about "registered reports"?', options: ['They are accepted based on design, not results', 'They are only for psychology', 'They must have positive results', 'They are not peer-reviewed'], answer: 0 },
      { q: 'The writer\'s overall attitude towards science is…', options: ['cautiously confident', 'deeply pessimistic', 'completely indifferent', 'uncritically enthusiastic'], answer: 0 },
      { q: '"Salutary" (paragraph 3) most nearly means…', options: ['beneficial', 'dangerous', 'temporary', 'surprising'], answer: 0 },
      { q: 'Fraud is the most common reason studies fail to replicate.', options: TF, answer: 1 },
    ],
  },
  {
    id: 'r-c1-growth', level: 'C1', title: 'Beyond GDP', topic: 'Economía',
    text: `Gross domestic product, or GDP, has dominated economic policy for the best part of a century. Devised in the 1930s to measure a nation's productive capacity during the Depression, it has since become a shorthand for national success. Yet even its architect, the economist Simon Kuznets, warned that the welfare of a nation can scarcely be inferred from a measure of national income.
Critics have long pointed to GDP's blind spots. It counts the money spent cleaning up an oil spill as a positive contribution while ignoring the depletion of natural resources. Unpaid work, such as caring for children or elderly relatives, is excluded altogether, despite its enormous social value. Nor does GDP say anything about how income is distributed: an economy can grow rapidly while the majority of households see their living standards stagnate.
In response, a range of alternative indicators has been proposed. Some, such as the Human Development Index, combine income with measures of health and education. Others attempt to quantify well-being directly through large-scale surveys of life satisfaction. A few countries, notably New Zealand, have gone as far as framing their national budgets around well-being objectives.
Sceptics counter that these alternatives inevitably involve subjective judgements about what matters and how to weight it, whereas GDP, for all its flaws, is at least consistent and comparable across countries. The emerging consensus appears to be not that GDP should be abandoned, but that it should be complemented — treated as one dashboard light among many, rather than the sole measure of progress.`,
    questions: [
      { q: 'What did Simon Kuznets warn about?', options: ['GDP does not measure welfare well', 'GDP grows too slowly', 'The Depression would continue', 'Income should be taxed'], answer: 0 },
      { q: 'Which is presented as a "blind spot" of GDP?', options: ['It excludes unpaid care work', 'It measures health', 'It is hard to calculate', 'It ignores exports'], answer: 0 },
      { q: 'What point does the oil-spill example illustrate?', options: ['Harmful events can increase GDP', 'Oil is important for growth', 'GDP measures the environment', 'Cleaning is unpaid work'], answer: 0 },
      { q: 'What do sceptics say in favour of GDP?', options: ['It is consistent and comparable', 'It measures happiness', 'It includes unpaid work', 'It is subjective'], answer: 0 },
      { q: 'What is the "emerging consensus"?', options: ['GDP should be complemented by other indicators', 'GDP should be abandoned', 'Well-being cannot be measured', 'Only New Zealand is right'], answer: 0 },
      { q: 'New Zealand has stopped measuring GDP.', options: TF, answer: 2 },
    ],
  },
  {
    id: 'r-c1-ai-ed', level: 'C1', title: 'Machines in the classroom', topic: 'Educación y tecnología',
    text: `Few technologies have entered education as abruptly as generative artificial intelligence. Within months of becoming widely available, chatbots capable of producing fluent essays, solving problems and explaining concepts were being used by a substantial share of students — frequently before their institutions had formulated any policy on the matter.
The initial reaction in many schools and universities was defensive. Concerns about plagiarism prompted bans and a scramble for detection software, the reliability of which soon proved questionable. Detection tools generated false positives, disproportionately flagging the work of non-native speakers, whose prose tends to be more predictable.
A more nuanced position has since gained ground. Its proponents argue that the challenge is less about policing than about rethinking assessment. If a task can be completed convincingly by a machine in seconds, they contend, it may not have been measuring the skills educators truly care about. Oral examinations, in-class writing and assignments that require students to document their reasoning are being revived or redesigned.
There is, moreover, a genuine pedagogical opportunity. Used judiciously, these tools can provide immediate feedback, generate practice material tailored to a learner's level and offer explanations at any hour. The risk, educators caution, lies in outsourcing the very cognitive effort through which learning takes place. Struggling with a difficult text or a badly organised first draft is not an obstacle to learning; to a large extent, it is learning. The question, then, is not whether such tools should be used, but how to ensure they scaffold thinking rather than replace it.`,
    questions: [
      { q: 'What problem with detection software is mentioned?', options: ['It unfairly flagged non-native speakers\' work', 'It was too expensive', 'It was banned', 'It only worked in English'], answer: 0 },
      { q: 'According to proponents of the "nuanced position", the real challenge is…', options: ['rethinking assessment', 'improving detection', 'banning chatbots', 'training teachers in IT'], answer: 0 },
      { q: 'Why are oral exams and in-class writing being revived?', options: ['They are harder to complete with AI', 'They are cheaper', 'Students prefer them', 'They are faster to mark'], answer: 0 },
      { q: 'What risk do educators highlight?', options: ['Students may avoid the effort that produces learning', 'AI gives wrong answers', 'Teachers may lose jobs', 'Students will stop attending'], answer: 0 },
      { q: 'The phrase "scaffold thinking" means…', options: ['support thinking without doing it for you', 'replace thinking', 'test thinking', 'slow thinking down'], answer: 0 },
      { q: 'Most institutions had an AI policy before students began using chatbots.', options: TF, answer: 1 },
    ],
  },
];
