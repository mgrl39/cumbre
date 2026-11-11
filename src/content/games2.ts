/* Datos de los juegos añadidos (formato: `enunciado | respuesta | d1 / d2 / d3 | explicación opcional`).
   Los conjuntos de escribir usan `enunciado | respuesta / alternativa | explicación opcional`.
   Dentro de cada conjunto, de fácil a difícil. Todas las frases son originales. */
import { SETS2B } from './games2b.ts';

const GERINF = `
I enjoy ___ in the evening. | reading | to read / read / to reading
She wants ___ a doctor. | to be | being / be / to being
We decided ___ at home. | to stay | staying / stay / stayed
He finished ___ his homework. | doing | to do / do / done
They hope ___ the match. | to win | winning / win / won
Do you mind ___ the window? | opening | to open / open / opened
I'd like ___ a table for two. | to book | booking / book / to booking
She avoided ___ about the problem. | talking | to talk / talk / talked
He promised ___ me tomorrow. | to call | calling / call / called
I can't stand ___ in queues. | waiting | to wait / wait / waited
We agreed ___ the costs. | to share | sharing / share / shared
Have you considered ___ jobs? | changing | to change / change / changed
He refused ___ the question. | to answer | answering / answer / answered
I'm looking forward to ___ you. | seeing | see / to seeing you / seen | «to» aquí es preposición: look forward to + -ing.
She suggested ___ a taxi. | taking | to take / take / took
They managed ___ the last train. | to catch | catching / catch / caught
I miss ___ near the sea. | living | to live / live / lived
He admitted ___ the money. | taking | to take / take / to taking
We can't afford ___ abroad this year. | to travel | travelling / travel / travelled
It's no use ___ about it now. | worrying | to worry / worry / worried
She pretended ___ asleep. | to be | being / be / been
I'm used to ___ up early. | getting | get / to getting up / got | be used to + -ing = estar acostumbrado.
I used to ___ up early. | get | getting / to get / got | used to + infinitivo = solía.
Remember ___ the door when you leave. | to lock | locking / lock / locked | remember to do = acordarse de hacerlo (futuro).
I remember ___ the door, I'm sure of it. | locking | to lock / lock / locked | remember doing = recordar haberlo hecho.
He stopped ___ when the doctor warned him. | smoking | to smoke / smoke / smoked | stop doing = dejar de hacerlo.
We stopped ___ a coffee on the way. | to have | having / have / had | stop to do = parar para hacer algo.
I regret ___ you that your application was unsuccessful. | to inform | informing / inform / informed | regret to inform = lamento comunicar.
I regret ___ so rude to her. | being | to be / be / been | regret doing = arrepentirse de algo hecho.
Try ___ the router off and on again. | turning | to turn / turn / turned | try doing = probar a ver si funciona.
She tried ___ the box, but it was too heavy. | to lift | lifting / lift / lifted | try to do = intentarlo (con esfuerzo).
The car needs ___ . | washing | to wash / wash / washed | need + -ing = sentido pasivo (needs to be washed).
He went on ___ for two hours. | talking | to talk / talk / talked | go on doing = seguir haciendo.
After school she went on ___ a famous lawyer. | to become | becoming / become / became | go on to do = pasar a hacer después.
I couldn't help ___ when I saw his face. | laughing | to laugh / laugh / laughed
There's no point ___ to persuade him. | trying | to try / try / tried
She was made ___ for an hour. | to wait | waiting / wait / waited | En pasiva, make lleva «to»: was made to wait.
I'd rather ___ at home tonight. | stay | to stay / staying / stayed
You'd better ___ now or you'll miss it. | leave | to leave / leaving / left
He denied ___ anything about it. | knowing | to know / know / known
They can't risk ___ another customer. | losing | to lose / lose / lost
It's worth ___ twice before you sign. | thinking | to think / think / thought
She has difficulty ___ in the mornings. | concentrating | to concentrate / concentrate / concentrated
I object to ___ treated like a child. | being | be / been / have been
`;

const QUANT = `
How ___ apples do we need? | many | much / lot / few of
How ___ water do you drink a day? | much | many / lot / few
There are ___ eggs in the fridge. | some | any / much / a
There isn't ___ milk left. | any | some / many / no
I have ___ friends in London. | a few | a little / much / any
Add ___ salt, please. | a little | a few / many / several
She has ___ of books. | a lot | much / many / lots
We don't have ___ time. | much | many / few / a lot
There are too ___ people here. | many | much / lot / little
He drinks too ___ coffee. | much | many / few / lots
___ student has a locker. | Every | All / Both / Several
___ of my parents work in a bank. | Both | Every / Each of / All of
___ the students passed the exam. | All | Every / Each / Whole
I have ___ money, so I can't buy it. | little | few / a little / a few | little (sin «a») = casi nada, sentido negativo.
I have ___ money, so I can lend you some. | a little | little / few / a few | a little = algo, sentido positivo.
___ people came, so the room looked empty. | Few | A few / Little / A little
___ people came, enough to start the meeting. | A few | Few / Little / A little
There's ___ sugar; we must buy some. | no | none / any / not
"How many came?" "___." | None | No / Any / Nobody of them
___ of the two answers is right; both are wrong. | Neither | None / Either / Both
You can take ___ bus; they both go to the centre. | either | neither / both / each of
___ of the hotels in town had a free room. | None | No / Neither / Any | Más de dos: none of.
She spends ___ of her time online. | most | the most / most of the / almost
___ of the information was out of date. | Much | Many / Few / Several
We've had ___ of problems with the software. | plenty | much / many / several
A large ___ of people attended. | number | amount / deal / quantity of | number + contables.
A large ___ of money was stolen. | amount | number / many / deal of | amount + incontables.
A great ___ of effort went into this. | deal | number / many / lot
There were hardly ___ seats left. | any | no / some / none
___ a day goes by without rain. | Hardly | Hardly any / Few / None
He has ___ experience to apply for the post. | enough | too / plenty / much of
I've been to Paris ___ times. | several | much / a little / plenty
___ single ticket was sold. | Every | All / Each of / Whole
He ate the ___ cake by himself. | whole | all / every / entire of
___ of them was given a certificate. | Each | Every / All / Both
There is far too ___ traffic in the centre. | much | many / few / lots
We received ___ fewer complaints this year. | far | much more / very / lots | far / many fewer + contables.
Quite ___ people have asked me that. | a few | few / a little / little | quite a few = bastantes.
`;

const ART = `
She is ___ engineer. | an | a / the / —
I have ___ dog and two cats. | a | an / the / —
___ sun rises in the east. | The | A / An / —
I love ___ music. | — | the / a / an | En general, sin artículo.
Can you pass me ___ salt, please? | the | a / an / —
He plays ___ guitar very well. | the | a / an / —
We had ___ lunch at one. | — | the / a / an
She goes to ___ work by bus. | — | the / a / an
It takes ___ hour to get there. | an | a / the / —
He studies at ___ university in Leeds. | a | an / the / — | university empieza por sonido /j/: a university.
___ Nile is the longest river in Africa. | The | A / An / —
They live in ___ United States. | the | a / an / —
She speaks ___ French fluently. | — | the / a / an
I saw a film last night. ___ film was awful. | The | A / An / — | Segunda mención: the.
What ___ beautiful day! | a | an / the / —
He's in ___ hospital with a broken leg. | — | the / an / a | Como paciente (uso británico): in hospital.
We went to ___ hospital to visit him. | the | — / an / a | Como visitante: to the hospital.
___ rich should pay more tax. | The | A / An / — | the + adjetivo = grupo de personas.
She was ___ first woman to win the prize. | the | a / an / —
I go to the gym twice ___ week. | a | the / an / —
___ life is too short to worry. | — | The / A / An
___ life of a miner was hard. | The | — / A / An
He was elected ___ president in 2019. | — | the / a / an | Cargo único tras elect/appoint: sin artículo.
She plays ___ tennis on Sundays. | — | the / a / an
They climbed ___ Mount Everest. | — | the / a / an
We sailed across ___ Atlantic. | the | — / a / an
It's ___ honour to meet you. | an | a / the / — | h muda: an honour.
He has ___ MBA from Harvard. | an | a / the / — | Se pronuncia «em»: an MBA.
The more you practise, ___ better you get. | the | a / — / more | the + comparativo…, the + comparativo.
I had ___ headache all morning. | a | the / an / —
She's ___ only child. | an | a / the / —
Could you give me ___ advice? | some | an / a / the | advice es incontable.
___ tigers are in danger of extinction. | — | The / A / An
___ tiger is in danger of extinction. | The | — / An / Some | Singular genérico (la especie): the tiger.
He was sent to ___ prison for fraud. | — | the / a / an
What's on ___ television tonight? | — | the / a / an
In ___ 1990s, everything changed. | the | — / a / an
She arrived by ___ train. | — | the / a / an
`;

const TAGS = `
You're Spanish, ___? | aren't you | are you / don't you / isn't it
She likes coffee, ___? | doesn't she | does she / isn't she / don't she
It isn't cold, ___? | is it | isn't it / does it / it is
They went home, ___? | didn't they | did they / weren't they / don't they
He can swim, ___? | can't he | can he / doesn't he / isn't he
You don't smoke, ___? | do you | don't you / are you / you do
We've met before, ___? | haven't we | have we / didn't we / don't we
She won't be late, ___? | will she | won't she / does she / is she
You were there, ___? | weren't you | were you / didn't you / aren't you
He didn't call, ___? | did he | didn't he / does he / was he
It's raining, ___? | isn't it | is it / doesn't it / hasn't it
They aren't coming, ___? | are they | aren't they / do they / will they
I'm late, ___? | aren't I | am I not / amn't I / don't I | Con «I am», la coletilla es «aren't I?».
Let's go, ___? | shall we | will we / don't we / let us | Tras Let's: shall we?
Open the door, ___? | will you | do you / shall you / don't you | Tras un imperativo: will you?
Nobody called, ___? | did they | didn't they / did he / didn't he | Nobody es negativo y se retoma con «they».
Everyone has arrived, ___? | haven't they | hasn't he / have they / hasn't it
There's a problem, ___? | isn't there | is there / isn't it / hasn't there
You'd like a drink, ___? | wouldn't you | hadn't you / would you / didn't you
You'd better go, ___? | hadn't you | wouldn't you / didn't you / had you | you'd better = you had better.
He never complains, ___? | does he | doesn't he / is he / did he | never ya es negativo: coletilla afirmativa.
She hardly ever goes out, ___? | does she | doesn't she / is she / hasn't she
Nothing has changed, ___? | has it | hasn't it / have they / did it
This is yours, ___? | isn't it | is it / isn't this / aren't you
Those are mine, ___? | aren't they | aren't those / are they / isn't it
You used to live here, ___? | didn't you | usedn't you / did you / weren't you
He must be tired, ___? | mustn't he | isn't he / doesn't he / must he
We ought to leave, ___? | oughtn't we | don't we / ought we / shouldn't we to
Don't forget, ___? | will you | do you / won't you / don't you
I think he's right, ___? | isn't he | don't I / is he / doesn't he | La coletilla se refiere a la oración subordinada.
Somebody told you, ___? | didn't they | didn't he / did they / wasn't it
She's been working hard, ___? | hasn't she | isn't she / wasn't she / has she
He's got a car, ___? | hasn't he | isn't he / doesn't he got / has he
Few people know that, ___? | do they | don't they / did they / doesn't it | few = casi nadie (negativo).
You have to go, ___? | don't you | haven't you / have you / mustn't you
`;

const LINK = `
I was tired, ___ I went to bed early. | so | but / because / although
I went to bed early ___ I was tired. | because | so / but / however
She's rich, ___ she isn't happy. | but | so / because / therefore
___ it was raining, we went for a walk. | Although | Because / However / Despite
___ the rain, we went for a walk. | Despite | Although / However / Even
It was raining. ___, we went for a walk. | However | Although / Despite / Whereas
He studied hard; ___, he passed with top marks. | as a result | however / whereas / nevertheless
I'll call you ___ I arrive. | as soon as | while / until that / during
Wait here ___ I come back. | until | while / as soon / by
She was cooking ___ I was laying the table. | while | during / until / unless
We won't go ___ the weather improves. | unless | if / in case / provided
Take an umbrella ___ it rains. | in case | unless / so that / if not
I left early ___ I could catch the first train. | so that | in order to / because of / so as
He works at night, ___ his wife works during the day. | whereas | despite / however / unless
The flight was cancelled ___ the storm. | because of | because / as / since that
___ being ill, she finished the race. | In spite of | Although / Even though / However
The plan is risky. ___, it is our only option. | Nevertheless | Therefore / Moreover / Likewise
The flat is small. ___, it is very expensive. | Moreover | Therefore / Otherwise / Instead
Prices rose sharply. ___, demand fell. | Consequently | Nevertheless / Likewise / Otherwise
You must pay by Friday; ___, your order will be cancelled. | otherwise | moreover / therefore / likewise
He didn't apologise. ___, he blamed everyone else. | Instead | Moreover / Therefore / Besides it
You can stay ___ you keep quiet. | as long as | unless / in case / so that
___ you need any help, just call me. | Should | Unless / Would / Had | Should you need… = If you need… (formal).
___ I known, I would have come earlier. | Had | Should / If / Would
The results were poor, ___ the effort invested. | given | although / despite of / even
___ the cost, the project went ahead. | Regardless of | Although / However / Nonetheless
Some people love the city, ___ others can't stand it. | while | despite / however / unless
The road was closed ___ an accident. | owing to | since / as / because
___ he had no experience, he got the job. | Even though | Despite / In spite / However
The report is long; ___, it is poorly organised. | furthermore | otherwise / thus / instead
The data are incomplete; ___ no firm conclusion can be drawn. | hence | whereas / albeit / notwithstanding that
It was a small, ___ significant, improvement. | albeit | although it / despite / nevertheless | albeit = aunque (formal, sin verbo).
___ the fact that sales fell, profits rose. | Notwithstanding | Albeit / Whereas / Nonetheless
I'll lend you the car ___ you bring it back by six. | provided that | in case / unless / so that
___ to popular belief, bats are not blind. | Contrary | Opposite / Against / Despite
He spoke quietly ___ not to wake the baby. | so as | so that / in order / for
She took notes ___ she might forget the details. | lest | unless / in case of / so as | lest = para no / no fuera a (muy formal).
___ as I admire him, I can't agree. | Much | Although / Despite / However | Much as = aunque… mucho.
`;

const ANTON = `
big | small | large / huge / tall
hot | cold | warm / heat / sunny
early | late | soon / fast / first
cheap | expensive | free / poor / low
empty | full | clean / open / whole
easy | difficult | simple / light / soft
strong | weak | thin / small / heavy
safe | dangerous | secure / brave / careful
noisy | quiet | loud / silent room / calm down
buy | sell | pay / spend / cost
arrive | leave | come / reach / stay
remember | forget | remind / lose / learn
win | lose | miss / fail / beat
borrow | lend | rent / owe / give back
increase | decrease | improve / raise / extend
accept | refuse | agree / receive / admit
polite | rude | kind / shy / honest
generous | mean | poor / kind / selfless
modern | old-fashioned | ancient history / current / recent
wide | narrow | thin / short / tight
deep | shallow | low / flat / thin
rough | smooth | soft / hard / plain
permanent | temporary | constant / lasting / current
innocent | guilty | wrong / fair / naive
ancient | modern | antique / old / former
scarce | plentiful | rare / short / few
voluntary | compulsory | optional / free / willing
vague | precise | unclear / brief / dull
reluctant | willing | eager for / unwilling / hesitant
cautious | reckless | careful / brave / wary
artificial | natural | fake / real time / synthetic
expand | contract | extend / grow / widen
praise | criticise | reward / flatter / admire
conceal | reveal | hide / cover / mask
abundant | scarce | plentiful / ample / rich
hostile | friendly | aggressive / cold / angry
trivial | significant | minor / petty / slight
transparent | opaque | clear / see-through / obvious
deteriorate | improve | worsen / decline / decay
lenient | strict | soft / mild / tolerant
`;

const PREFIX = `
happy | unhappy | inhappy / dishappy / imhappy
possible | impossible | unpossible / inpossible / dispossible
correct | incorrect | uncorrect / imcorrect / discorrect
legal | illegal | unlegal / inlegal / irlegal
regular | irregular | unregular / inregular / disregular
agree | disagree | unagree / inagree / misagree
honest | dishonest | unhonest / inhonest / imhonest
polite | impolite | unpolite / inpolite / dispolite
patient | impatient | unpatient / inpatient / dispatient
fair | unfair | infair / disfair / imfair
visible | invisible | unvisible / imvisible / disvisible
like (verb) | dislike | unlike / inlike / mislike
understand | misunderstand | disunderstand / ununderstand / inunderstand | mis- = hacerlo mal.
responsible | irresponsible | unresponsible / inresponsible / disresponsible
logical | illogical | unlogical / inlogical / irlogical
mature | immature | unmature / inmature / dismature
formal | informal | unformal / imformal / disformal
appear | disappear | unappear / inappear / misappear
lucky | unlucky | inlucky / dislucky / illucky
complete | incomplete | uncomplete / imcomplete / discomplete
relevant | irrelevant | unrelevant / inrelevant / disrelevant
literate | illiterate | unliterate / inliterate / irliterate
moral | immoral | unmoral / inmoral / dismoral
obey | disobey | unobey / inobey / misobey
behave | misbehave | disbehave / unbehave / inbehave
advantage | disadvantage | unadvantage / inadvantage / misadvantage
employed | unemployed | disemployed / inemployed / imemployed
accurate | inaccurate | unaccurate / imaccurate / disaccurate
rational | irrational | unrational / inrational / disrational
legible | illegible | unlegible / inlegible / irlegible
satisfied (not pleased) | dissatisfied | insatisfied / imsatisfied / missatisfied
lead (wrongly) | mislead | dislead / unlead / inlead
adequate | inadequate | unadequate / imadequate / disadequate
reversible | irreversible | unreversible / inreversible / disreversible
approve | disapprove | unapprove / inapprove / misapprove
conscious | unconscious | inconscious / disconscious / imconscious
plausible | implausible | unplausible / inplausible / displausible
replaceable | irreplaceable | unreplaceable / inreplaceable / disreplaceable
interpret (wrongly) | misinterpret | disinterpret / uninterpret / ininterpret
proportionate | disproportionate | unproportionate / inproportionate / improportionate
`;

const PLURAL = `
child | children
man | men
woman | women
foot | feet
tooth | teeth
mouse | mice
person | people
box | boxes
baby | babies
knife | knives
life | lives
wife | wives
leaf | leaves
shelf | shelves
half | halves
wolf | wolves
thief | thieves
potato | potatoes
tomato | tomatoes
hero | heroes
photo | photos
piano | pianos
bus | buses
watch | watches
city | cities
key | keys
sheep | sheep
fish | fish / fishes
deer | deer
goose | geese
ox | oxen
species | species
series | series
aircraft | aircraft
crisis | crises
analysis | analyses
thesis | theses
hypothesis | hypotheses
phenomenon | phenomena
criterion | criteria
bacterium | bacteria
curriculum | curricula / curriculums
medium | media
stimulus | stimuli
nucleus | nuclei
appendix | appendices / appendixes
passer-by | passers-by
mother-in-law | mothers-in-law
`;

const COMPAR = `
big (comparative) | bigger
good (comparative) | better
bad (comparative) | worse
happy (comparative) | happier
expensive (comparative) | more expensive
far (comparative) | further / farther
hot (comparative) | hotter
easy (comparative) | easier
tall (superlative) | the tallest / tallest
good (superlative) | the best / best
bad (superlative) | the worst / worst
far (superlative) | the furthest / the farthest / furthest / farthest
little (comparative) | less
much (comparative) | more
many (superlative) | the most / most
thin (comparative) | thinner
nice (comparative) | nicer
busy (superlative) | the busiest / busiest
interesting (superlative) | the most interesting / most interesting
old (family, comparative) | elder / older
clever (comparative) | cleverer / more clever
quiet (comparative) | quieter / more quiet
narrow (comparative) | narrower
simple (comparative) | simpler
modern (comparative) | more modern
careful (comparative) | more careful
quickly (comparative) | more quickly
well (comparative) | better
badly (comparative) | worse
hard (adverb, comparative) | harder
early (comparative) | earlier
late (superlative) | the latest / latest
dry (comparative) | drier / dryer
shy (comparative) | shyer / shier
tired (comparative) | more tired
fun (comparative) | more fun
real (comparative) | more real
polite (comparative) | more polite / politer
common (superlative) | the most common / most common / the commonest / commonest
little (superlative) | the least / least
`;

const UKUS = `
lift (UK) → US | elevator | lifter / stairs / escalator
flat (UK) → US | apartment | floor / house / condo room
autumn (UK) → US | fall | harvest / drop / winter
holiday (UK) → US | vacation | festival / leave day / weekend
biscuit (UK) → US | cookie | cracker bread / cake / toast
chips (UK) → US | fries | crisps / snacks / potatoes
crisps (UK) → US | chips | fries / flakes / snacks
trousers (UK) → US | pants | shorts / jeans / slacks only
petrol (UK) → US | gas | oil / fuel tank / diesel
lorry (UK) → US | truck | van / wagon / trailer
pavement (UK) → US | sidewalk | roadside / walkway line / kerb
rubbish (UK) → US | garbage | junk food / waste bin / dirt
queue (UK) → US | line | row / tail / file
football (UK) → US | soccer | rugby / handball / footgame
film (UK) → US | movie | cinema / picture house / show
shop (UK) → US | store | mall / market stall / stand
sweets (UK) → US | candy | sugar / desserts / treats box
tap (UK) → US | faucet | pipe / valve / sink
torch (UK) → US | flashlight | lantern / spotlight / candle
underground (UK) → US | subway | metroline / tunnel / tramway
motorway (UK) → US | highway | autoroute / carway / main street
car park (UK) → US | parking lot | garage place / car yard / parking site
chemist's (UK) → US | drugstore | medicine shop / clinic / pill store
post (UK) → US | mail | letterbox / parcel / stamp
mobile phone (UK) → US | cell phone | hand phone / pocket phone / wireless
nappy (UK) → US | diaper | napkin / wrapper / towel
bonnet of a car (UK) → US | hood | cap / roof / lid
boot of a car (UK) → US | trunk | back / box / case
timetable (UK) → US | schedule | calendar book / plan sheet / agenda
rubber (UK) → US | eraser | cleaner / wiper / corrector
fortnight (UK) → US | two weeks | forty nights / fourteen / half month
ground floor (UK) → US | first floor | zero floor / low floor / base floor
bill in a restaurant (UK) → US | check | ticket / receipt note / tab paper
jumper (UK) → US | sweater | jacket / hoodie top / coat
colour (UK) → US spelling | color | collor / coulor / colur
centre (UK) → US spelling | center | centar / senter / centr
travelling (UK) → US spelling | traveling | travveling / travelin / travaling
organise (UK) → US spelling | organize | organice / organyze / organisse
licence, noun (UK) → US spelling | license | lisence / licens / lisense
programme (UK) → US spelling | program | programm / programe / progam
`;

const BINOM = `
black and ___ | white | grey / blue / dark
salt and ___ | pepper | sugar / oil / spice
fish and ___ | chips | meat / rice / fries
ladies and ___ | gentlemen | men / lords / sirs
bed and ___ | breakfast | bath / board / dinner
knife and ___ | fork | spoon / plate / blade
bride and ___ | groom | husband / man / bridesman
husband and ___ | wife | woman / spouse / bride
rock and ___ | roll | pop / stone / rhythm
more or ___ | less | fewer / little / minus
sooner or ___ | later | after / longer / late
now and ___ | then | after / again / later
pros and ___ | cons | contras / negatives / againsts
ups and ___ | downs | lows / falls / backs
safe and ___ | sound | well / secure / saved
sick and ___ | tired | ill / bored / weak
peace and ___ | quiet | silence / calm / rest
law and ___ | order | justice / rule / right
trial and ___ | error | mistake / fail / test
give and ___ | take | get / receive / have
odds and ___ | ends | evens / bits / parts
bits and ___ | pieces | parts / bobs up / ends
wear and ___ | tear | use / break / rip
neat and ___ | tidy | clean / clear / nice
short and ___ | sweet | brief / quick / simple
first and ___ | foremost | last / main / primary
back and ___ | forth | front / forward / along
by and ___ | large | big / wide / long | by and large = en general.
on and ___ | off | on / out / over | on and off = de forma intermitente.
out and ___ | about | around / away / in | out and about = fuera, haciendo cosas.
part and ___ | parcel | piece / portion / package | part and parcel of = parte inseparable de.
spick and ___ | span | clean / spotless / shine
touch and ___ | go | feel / run / hold | touch-and-go = en el aire, muy incierto.
hustle and ___ | bustle | rush / noise / hurry
rant and ___ | rave | shout / roar / rage
leaps and ___ | bounds | jumps / steps / runs | by leaps and bounds = a pasos agigantados.
high and ___ | dry | low / tall / mighty up | leave someone high and dry = dejar tirado.
thick and ___ | thin | fat / hard / fine | through thick and thin = en las buenas y en las malas.
tooth and ___ | nail | claw / bone / jaw | fight tooth and nail = luchar con uñas y dientes.
null and ___ | void | zero / empty / gone | null and void = nulo y sin efecto.
`;

const OCLOZE = `
I have lived here ___ 2015. | since
She is afraid ___ spiders. | of
There isn't ___ milk in the fridge. | any
He is taller ___ his brother. | than
I'm looking forward ___ meeting you. | to
It was ___ a good film that I saw it twice. | such
She was ___ tired that she fell asleep at once. | so
This is the house ___ I was born. | where
The man ___ car was stolen called the police. | whose
I haven't seen him ___ ages. | for / in
You ___ better see a doctor. | had
I would rather you ___ not tell anyone. | did
It's high time we ___ a decision. | made / took
He succeeded ___ passing the exam. | in
We ran out ___ petrol on the motorway. | of
She takes ___ her mother: they have the same eyes. | after
I'm not used ___ driving on the left. | to
___ of the two brothers speaks French; they only know English. | Neither
Not ___ did he arrive late, but he also forgot the tickets. | only
No sooner had we sat down ___ the phone rang. | than
Hardly had I closed my eyes ___ the alarm went off. | when / before
___ I known you were ill, I would have visited you. | Had
He behaves as ___ he owned the place. | if / though
She did it on ___ own, without any help. | her
It makes no ___ to me which one you choose. | difference
I couldn't ___ laughing when he fell over. | help
The meeting was called ___ because of the strike. | off
He has little, if ___, interest in politics. | any
There is no point ___ arguing with her. | in
By the time we arrived, the film ___ already started. | had
___ from Maria, nobody passed the test. | Apart / Aside
In ___ of the bad weather, the match went ahead. | spite
The harder you work, ___ more you earn. | the
What ___ earth are you doing? | on
She came up ___ a brilliant idea. | with
I'd like to take this opportunity ___ thank you all. | to
It remains to ___ seen whether the plan will work. | be
He is said ___ have left the country. | to
Little ___ she know what was waiting for her. | did
___ it not been for your help, I would have failed. | Had
Try ___ I might, I couldn't open the jar. | as
The report, ___ was published yesterday, is alarming. | which
We have no choice ___ to accept the offer. | but
He took no notice ___ my warnings. | of
Scarcely ___ a week goes by without some new scandal. | ever
`;

const MCLOZE = `
I ___ a mistake in the first exercise. | made | did / took / had
Could you ___ me a favour? | do | make / give / take
She ___ the bus every morning. | catches | picks / holds / grabs up
It's ___ heavily outside. | raining | dropping / falling / pouring down it
He ___ me the truth in the end. | told | said / spoke / talked
We ___ a great time at the party. | had | made / did / spent
Please ___ attention to the instructions. | pay | give / make / put
The company went ___ after two years. | bankrupt | broken / ruined out / failed
She ___ her temper and shouted at him. | lost | missed / dropped / broke
Let's ___ a break for ten minutes. | take | do / make / get up
He ___ his best to finish on time. | did | made / gave / put
I can't ___ the difference between them. | tell | say / speak / know out
The news came as a complete ___ . | surprise | wonder / amaze / astonish
The plan is ___ to fail. | bound | sure of / certain that / due for
He was ___ of murder and sent to prison. | convicted | accused / charged / blamed
She was ___ with stealing a car. | charged | accused / blamed / convicted
They ___ him of lying. | accused | charged / blamed / convicted
The government has ___ new measures to cut pollution. | introduced | inserted / installed / inducted
Scientists have ___ a link between diet and mood. | established | built / raised / formed up
The decision ___ a lot of controversy. | sparked | lit / fired / flamed
The new law will come into ___ next month. | force | power / action / strength
Unemployment has ___ a record high. | reached | arrived / gained / achieved to
He ___ a living as a freelance translator. | earns | wins / gains / takes
There is ___ evidence that the drug works. | compelling | persuading / forcing / pressing
She has a ___ knowledge of the subject. | thorough | deep-going / full-length / complete of
The project was ___ short of money. | desperately | deeply / strongly / heavily
It is ___ unlikely that he will resign. | highly | strongly / deeply / greatly much
I ___ recommend the fish. | strongly | highly much / deeply / greatly well
We ___ regret any inconvenience caused. | deeply | strongly much / heavily / highly
The two results are ___ different. | markedly | heavily / strongly / deeply
He ___ the blame for the accident. | took | held / made / carried on
The proposal ___ with fierce opposition. | met | found / faced up / had
She ___ a fortune when her aunt died. | inherited | heired / gained up / succeeded
The article ___ light on a neglected problem. | sheds | drops / puts / gives off
His argument doesn't ___ water. | hold | keep / carry / bear
The findings ___ doubt on the earlier study. | cast | throw away / put up / lay
Demand is expected to ___ supply. | outstrip | overrun / outgrow up / overtake on
The scandal ___ his reputation beyond repair. | tarnished | stained off / dirtied / spoiled out
They ___ a compromise after hours of talks. | reached | arrived / did / achieved at
The committee will ___ the issue next week. | address | direct / approach to / attend
`;

export const SETS2: Record<string, string> = {
  gerinf: GERINF, quant: QUANT, art: ART, tags: TAGS, link: LINK, anton: ANTON, prefix: PREFIX, plural: PLURAL, compar: COMPAR,
  ukus: UKUS, binom: BINOM, ocloze: OCLOZE, mcloze: MCLOZE,
  ...SETS2B,
};
