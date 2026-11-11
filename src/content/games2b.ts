/* Segunda parte de los datos de juegos (mismo formato que games2.ts). Frases originales. */

const EMPH = `
Never ___ such a beautiful sunset. | have I seen | I have seen / I saw / did I saw
Not only ___ late, but he also forgot the keys. | was he | he was / did he be / he did
Rarely ___ so angry. | does she get | she gets / she does get / gets she
Hardly ___ the house when it started to rain. | had we left | we had left / did we left / we left
No sooner ___ than the lights went out. | had I sat down | I had sat down / did I sit down / I sat down
Only then ___ what had happened. | did I realise | I realised / I did realise / realised I
Under no circumstances ___ this door. | should you open | you should open / you open / should open you
Little ___ that she was being watched. | did she know | she knew / she did know / knew she
Seldom ___ such dedication. | have we seen | we have seen / we saw / did we seen
At no time ___ the rules. | did he break | he broke / he did break / broke he
Only after the meeting ___ the truth. | did they learn | they learnt / they did learn / learnt they
Not until I got home ___ my wallet was missing. | did I notice | I noticed / I did notice / noticed I
So tired ___ that he fell asleep standing. | was he | he was / did he be / he had
Such ___ the damage that the road was closed. | was | it was / did / had
___ I you, I would accept the offer. | Were | Was / If / Would
___ you need help, call this number. | Should | Would / Could / Had
Had ___ earlier, we would have caught the train. | we left | we leave / left we / we had
What I need ___ a long holiday. | is | are / it is / that is
It was Maria ___ told me the news. | who | which / what / whom
It was in 2010 ___ they first met. | that | when it / which / what
What ___ me most was his arrogance. | annoyed | annoying / did annoy to / it annoyed
All I want ___ some peace and quiet. | is | are / it is / to be
The thing ___ worries me is the cost. | that | what / who / it
I ___ like your new haircut. | do | am / very / does | do + infinitivo para dar énfasis.
She ___ call you; I saw her do it. | did | does called / was / had | did + infinitivo = «sí que te llamó».
On no account ___ left unattended. | must luggage be | luggage must be / must be luggage / luggage be must
Nowhere ___ such friendly people. | will you find | you will find / you find / find you will
Not a single word ___ during the meal. | did he say | he said / he did say / said he
Only by working together ___ this problem. | can we solve | we can solve / we solve / solve we can
In vain ___ to change her mind. | did they try | they tried / they did try / tried they
Try as ___, he couldn't lift it. | he might | might he / he may / he did
Scarcely ___ when the phone rang again. | had I hung up | I had hung up / did I hung up / I hung up
Not for a moment ___ his honesty. | did I doubt | I doubted / I did doubt / doubted I
So ___ I. ("I love jazz.") | do | am / love / too | So do I = yo también.
Neither ___ I. ("I can't swim.") | can | can't / do / am
Here ___ the bus! | comes | does come / is coming it / come does
Down ___ the rain. | came | did come / it came / come did
Only when you see it ___ how big it is. | will you understand | you will understand / you understand / understand you
`;

const SPELL = `
___ (tomorrow) | tomorrow | tomorow / tommorow / tommorrow
___ (because) | because | becouse / becuase / becose
___ (friend) | friend | freind / frend / friennd
___ (beautiful) | beautiful | beatiful / beautifull / beutiful
___ (different) | different | diferent / diffrent / diferrent
___ (necessary) | necessary | neccesary / necesary / neccessary
___ (which) | which | wich / whitch / wihch
___ (address) | address | adress / addres / adres
___ (comfortable) | comfortable | confortable / comfortible / comftable
___ (interesting) | interesting | intresting / interessting / interisting
___ (business) | business | bussiness / busness / buisness
___ (believe) | believe | beleive / belive / beleve
___ (receive) | receive | recieve / receve / recive
___ (government) | government | goverment / governement / govenment
___ (environment) | environment | enviroment / enviorment / environement
___ (definitely) | definitely | definately / definitly / defiantly
___ (separate) | separate | seperate / separete / seperete
___ (until) | until | untill / untile / untl
___ (beginning) | beginning | begining / beggining / beginnig
___ (writing) | writing | writting / writeing / wrinting
___ (accommodation) | accommodation | acommodation / accomodation / acomodation
___ (successful) | successful | succesful / successfull / sucessful
___ (occurred) | occurred | ocurred / occured / ocured
___ (embarrassed) | embarrassed | embarased / embarassed / embarrased
___ (recommend) | recommend | recomend / reccomend / reccommend
___ (possession) | possession | posession / possesion / posesion
___ (independent) | independent | independant / indipendent / independient
___ (responsible) | responsible | responsable / responsibel / resposible
___ (knowledge) | knowledge | knowlege / knowledgde / knoledge
___ (immediately) | immediately | inmediately / immediatly / imediately
___ (committee) | committee | commitee / comittee / comitee
___ (occasion) | occasion | ocassion / occassion / ocasion
___ (questionnaire) | questionnaire | questionaire / questionairre / questionnare
___ (maintenance) | maintenance | maintainance / maintenence / mantenance
___ (pronunciation) | pronunciation | pronounciation / pronuntiation / pronunsiation
___ (privilege) | privilege | priviledge / privelege / privilage
___ (consensus) | consensus | concensus / consensous / consenssus
___ (liaison) | liaison | liason / liasion / laison
___ (conscientious) | conscientious | consciencious / concientious / conscientous
___ (miscellaneous) | miscellaneous | miscelaneous / miscellanious / misellaneous
`;

const ODD = `
apple · pear · carrot · banana | carrot | apple / pear / banana | carrot es una verdura; las demás, fruta.
dog · cat · chair · horse | chair | dog / cat / horse
red · blue · big · green | big | red / blue / green
Monday · March · Friday · Sunday | March | Monday / Friday / Sunday
shirt · trousers · table · jacket | table | shirt / trousers / jacket
run · walk · jump · happy | happy | run / walk / jump | happy es un adjetivo; los demás, verbos.
bus · train · bridge · plane | bridge | bus / train / plane
doctor · hospital · nurse · dentist | hospital | doctor / nurse / dentist | hospital es un lugar, no una profesión.
kitchen · bedroom · garden · bathroom | garden | kitchen / bedroom / bathroom
milk · juice · bread · water | bread | milk / juice / water
went · saw · eaten · took | eaten | went / saw / took | eaten es participio; los demás, pasado simple.
quickly · slowly · friendly · carefully | friendly | quickly / slowly / carefully | friendly es adjetivo aunque acabe en -ly.
advice · furniture · chair · information | chair | advice / furniture / information | chair es contable.
must · should · want · might | want | must / should / might | want no es un verbo modal.
in · on · at · and | and | in / on / at | and es conjunción; las demás, preposiciones.
however · although · therefore · beautiful | beautiful | however / although / therefore
happy · glad · cheerful · miserable | miserable | happy / glad / cheerful
huge · enormous · tiny · massive | tiny | huge / enormous / massive
whisper · shout · yell · scream | whisper | shout / yell / scream
stroll · sprint · dash · rush | stroll | sprint / dash / rush | stroll = pasear tranquilamente.
give up · carry on · keep going · persist | give up | carry on / keep going / persist
borrow · lend · give · hand | borrow | lend / give / hand | borrow es recibir; los demás, dar.
rise · raise · lift · increase (needs an object) | rise | raise / lift / increase (needs an object) | rise es intransitivo: prices rise.
since · for · ago · during (with present perfect) | ago | since / for / during (with present perfect) | ago solo va con pasado simple.
salary · wage · fee · debt | debt | salary / wage / fee | debt es lo que debes; los demás, lo que cobras.
glance · stare · glimpse · listen | listen | glance / stare / glimpse
furthermore · moreover · besides · nevertheless | nevertheless | furthermore / moreover / besides | nevertheless contrasta; los demás añaden.
thrifty · stingy · mean · tight-fisted | thrifty | stingy / mean / tight-fisted | thrifty es positivo (ahorrador); los demás, tacaño.
slim · skinny · scrawny · bony | slim | skinny / scrawny / bony | slim es positivo.
stubborn · determined · pig-headed · obstinate | determined | stubborn / pig-headed / obstinate | determined tiene connotación positiva.
actually · currently · presently · at present | actually | currently / presently / at present | actually = en realidad (falso amigo).
sensible · sensitive · reasonable · practical | sensitive | sensible / reasonable / practical | sensitive = sensible (de sentimientos).
on time · in time · punctual · overdue | overdue | on time / in time / punctual
hypothesis · theory · assumption · proof | proof | hypothesis / theory / assumption
ubiquitous · widespread · pervasive · scarce | scarce | ubiquitous / widespread / pervasive
mitigate · alleviate · ease · exacerbate | exacerbate | mitigate / alleviate / ease | exacerbate = empeorar.
candid · frank · blunt · evasive | evasive | candid / frank / blunt
meticulous · thorough · painstaking · sloppy | sloppy | meticulous / thorough / painstaking
`;

const DEFIN = `
a person who teaches in a school | teacher | student / lesson / classroom
the meal you eat in the morning | breakfast | dinner / lunch / snack
a place where you can borrow books | library | bookshop / bookcase / museum
the brother of your father or mother | uncle | cousin / nephew / grandfather
money you get regularly for your work | salary | bill / price / tax
a person who lives next to you | neighbour | flatmate / colleague / stranger
to stop working because of your age | retire | resign / quit / fire
to say sorry for something you did | apologise | forgive / excuse / regret
a period of ten years | decade | century / term / era
not having a job | unemployed | redundant / retired / lazy
the people who watch a play or concert | audience | spectators only / public / crowd funding
money you pay to the government | tax | fine / fee / tip
money you pay as a punishment | fine | tax / fee / bill
extra money you give a waiter | tip | fee / bonus / change
a piece of paper that proves you paid | receipt | recipe / ticket / bill
instructions for cooking a dish | recipe | receipt / menu / prescription
a doctor's written order for medicine | prescription | recipe / receipt / subscription
someone who sees a crime or accident happen | witness | suspect / victim / bystander only
a person who buys things from a shop | customer | client base / seller / supplier
a time by which something must be finished | deadline | timetable / schedule / lifetime
to make something less severe or painful | alleviate | aggravate / elevate / eliminate
to officially forbid something | ban | bin / allow / fine
to delay doing something until later | postpone | cancel / prolong / anticipate
to make a problem worse | exacerbate | alleviate / exaggerate / execute
able to be trusted or depended on | reliable | reliant / liable / relevant
happening or done every year | annual | daily / biannual / perennial
having good judgement; reasonable | sensible | sensitive / sensational / senseless
easily upset or affected | sensitive | sensible / sensory / sentimental
unwilling to spend money | mean | generous / average / thrifty
careful with money in a good way | thrifty | mean / wasteful / lavish
an advantage that comes with a job, besides pay | perk | perch / fee / raise
a long, detailed piece of writing for a degree | thesis | theme / essay plan / summary
the way a word is said | pronunciation | spelling / accent mark / definition
lasting for only a short time | temporary | contemporary / permanent / current
existing everywhere at the same time | ubiquitous | unique / ambiguous / unanimous
a solution that both sides accept by giving something up | compromise | commitment / promise / agreement form
to examine something carefully and critically | scrutinise | scan / skim / glance
a feeling of being sorry for something you did | remorse | resentment / grudge / nostalgia
not influenced by personal feelings; fair | impartial | partial / indifferent / uninterested
a sudden clever understanding of a problem | insight | oversight / foresight / hindsight
understanding of an event only after it happened | hindsight | insight / foresight / oversight
a mistake caused by not noticing something | oversight | hindsight / insight / overview
to reduce the bad effects of something | mitigate | migrate / instigate / imitate
difficult to find, catch or define | elusive | exclusive / illusive / inclusive
showing great attention to detail | meticulous | miraculous / ridiculous / tedious
`;

const ADJN = `
___ rain | heavy | strong / big / hard
___ wind | strong | heavy / big / large
___ coffee | strong | heavy / hard / thick
a ___ smoker | heavy | strong / big / hard
___ traffic | heavy | strong / thick / big
a ___ mistake | big | large / high / tall
a ___ meal | quick | fast / rapid / speedy
___ food | fast | quick / rapid / speedy
a ___ price | high | tall / big / expensive
a ___ building | tall | high / big up / long
a ___ sleeper | heavy | thick / strong / hard
___ asleep | fast | heavy / strong / full
___ awake | wide | fast / full / open
a ___ argument (a serious quarrel) | heated | hot / warm / burning
a ___ argument (convincing) | compelling | forcing / heavy / pushing
a ___ resemblance | striking | hitting / knocking / beating
a ___ success | resounding | sounding / loud / ringing
a ___ majority | vast | wide / long / tall
a ___ chance (very small) | slim | thin / narrow / lean
a ___ escape | narrow | thin / slim / tight
___ aware | fully | bitterly / heavily / widely
___ disappointed | bitterly | sourly / acidly / sharply
___ opposed | strongly | hardly / heavily / widely
___ unlikely | highly | strongly / deeply / bitterly
___ impossible | virtually | highly / strongly / deeply
___ acclaimed | critically | criticly / severely / strongly
___ concerned | deeply | highly / widely / bitterly
___ grateful | deeply | highly / strongly / heavily
___ exhausted | utterly | vastly / highly / heavily
___ different | radically | deeply / highly / strongly
a ___ grasp of the subject | firm | hard / heavy / tight
a ___ contrast | stark | bare / hard / stiff
a ___ decline | steady | fixed / still / firm
a ___ rise in prices | sharp | pointed / acute / cutting
a ___ blow to his career | severe | strict / stern / rigid
___ consequences | far-reaching | long-going / far-arriving / wide-touching
a ___ reputation | well-deserved | good-won / well-gained in / fair-taken
___ evidence | conclusive | concluding / finalising / ending
a ___ point (still open to debate) | moot | mute / mood / mock
a ___ supporter | staunch | stale / steep / stout
`;

const PPHR = `
___ the morning | in | on / at / by
___ Monday | on | in / at / by
___ night | at | in / on / by
___ the weekend (UK) | at | in / by / to
___ home | at | in / on / to
___ holiday | on | in / at / of
___ foot | on | by / in / with
___ car | by | on / in / with
___ time (punctual) | on | in / at / by
___ time (early enough) | in | on / at / by
___ fire | on | in / at / with
___ love | in | on / at / with
___ purpose | on | by / in / with
___ mistake | by | on / in / for
___ accident | by | on / in / with
___ chance | by | on / in / for
___ a hurry | in | on / at / with
___ a diet | on | in / at / with
___ the end (finally) | in | at / on / by
___ the end of the film | at | in / on / by
___ common | in | on / at / by
___ danger | in | on / at / under
___ control | under | in control of it / on / at
___ pressure | under | in / on / below
___ debt | in | on / under / with
___ strike | on | in / at / under
___ sale (reduced) | on | in / at / for
___ sale (available to buy) | for | on / in / at
___ date (current) | up to | on / in / at
___ of date | out | off / away / over
___ of order | out | off / without / away
___ of the question | out | off / away / far
___ the long run | in | on / at / for
___ behalf of | on | in / at / by
___ the whole | on | in / at / by
___ no means | by | in / on / at
___ all costs | at | in / on / by
___ the verge of | on | in / at / by
___ accordance with | in | on / at / by
___ the brink of | on | in / at / by
___ the expense of | at | in / on / by
___ lieu of | in | on / at / by
`;

const COND = `
If it rains, we ___ at home. | will stay | would stay / stayed / stay will
If you heat ice, it ___ . | melts | will melted / would melt / melted
If I ___ time, I'll call you. | have | will have / had / would have
I'll tell her if I ___ her. | see | will see / saw / would see
If I ___ rich, I would travel the world. | were | am / will be / would be
If she studied more, she ___ better marks. | would get | will get / gets / got
What would you do if you ___ the lottery? | won | win / will win / would win
If I were you, I ___ the job. | would take | will take / took / take
If we had left earlier, we ___ the train. | would have caught | would catch / will catch / caught
If he ___ harder, he would have passed. | had studied | studied / would study / has studied
I wouldn't have come if I ___ . | had known | knew / would know / have known
Unless you ___ , you'll be late. | hurry | don't hurry / will hurry / hurried
I'll go ___ it rains. | even if | unless not / in case of / so
Take a coat in case it ___ cold. | gets | will get / would get / got
As long as you ___ careful, you can use it. | are | will be / were / would be
If I had taken the job, I ___ in Paris now. | would be living | would have lived / will live / lived | Condicional mixta: pasado irreal → presente irreal.
If she ___ so shy, she would have spoken to him. | weren't | isn't / hadn't / wouldn't be | Condicional mixta: presente irreal → pasado irreal.
I wish I ___ more free time. | had | have / would have / will have
I wish I ___ so much last night. | hadn't eaten | didn't eat / wouldn't eat / haven't eaten
I wish you ___ making that noise. | would stop | stop / stopped it / will stop
If only I ___ what to say! | knew | know / would know / will know
___ I known, I would have helped. | Had | If / Would / Did
___ you change your mind, let me know. | Should | Would / Had / Did
___ it not for the rain, we would go out. | Were | Was / Had / Should
But ___ your help, I would have failed. | for | of / with / from
Supposing you ___ your job, what would you do? | lost | lose / will lose / would lose
Provided that he ___ on time, we can start at nine. | arrives | will arrive / would arrive / arrived
I'd rather you ___ here. | didn't smoke | don't smoke / won't smoke / not smoke
It's time we ___ home. | went | go / will go / would go
If you will ___ here, I'll fetch the manager. | wait | waiting / waited / to wait | will tras if = petición educada.
If he ___ win, it would be a miracle. | were to | would / will / is to | were to = hipótesis remota (formal).
He talks as if he ___ everything. | knew | knows it all / would know / will know
Had it not ___ for the delay, we would have won the contract. | been | be / being / was
If you ___ to see Tom, tell him to call me. | happen | will happen / happened it / would happen
We'd have arrived by now if we ___ the motorway. | had taken | took / would take / have taken
Were she ___ , the whole plan would collapse. | to resign | resign / resigning / resigned
`;

const ABBR = `
ASAP | as soon as possible | as simple as possible / at some agreed point / always say a please
e.g. | for example | that is / and so on / compare
i.e. | that is | for example / and others / namely not
etc. | and so on | for example / that is / in total
FAQ | frequently asked questions | fast answer queue / full account query / free advice quotes
N/A | not applicable | no answer / new account / not allowed
RSVP | please reply | reserved seat / return soon / very important
DIY | do it yourself | done in a year / do it young / daily income yield
ID | identification | internal data / in debt / idea
VAT | value added tax | very annoying tax / variable annual total / visa and travel
CV | curriculum vitae | career value / company visit / cover version
BTW | by the way | back to work / before the week / be there when
FYI | for your information | for your interest / find your item / from your inbox
a.m. | before noon | after noon / at midnight / all morning
p.m. | after noon | before noon / past midnight / per minute
PS | postscript | please send / personal signature / post service
approx. | approximately | appropriate / approved / appointment
no. | number | north / none / notice
Dept. | department | deposit / departure / depth
Ltd | limited company | long-term debt / listed / leading
HQ | headquarters | high quality / head question / human query
HR | human resources | hourly rate / high risk / home rental
CEO | chief executive officer | central export office / company event organiser / chief of every operation
ETA | estimated time of arrival | exact time agreed / extra travel allowance / early ticket access
TBC | to be confirmed | to be cancelled / time between calls / total basic cost
AKA | also known as | all known answers / as kindly asked / any kind allowed
vs. | against | very similar / versions / verses
et al. | and others | and so on / for example / in total
cf. | compare | confirm / see below / in fact
ibid. | in the same source | see above / on the same page only / in brief
PTO | please turn over | paid time only / part two omitted / please take one
c. 1850 | around 1850 | century 1850 / copyright 1850 / chapter 1850
viz. | namely | versus / compare / approximately
NB | note well | no bill / new block / not before
IOU | I owe you | in our use / input or update / it's on us
w/o | without | week of / work order / with others
`;

const PROV = `
Better late than ___ . | never | ever / early / soon
Practice makes ___ . | perfect | better / master / good
Actions speak louder than ___ . | words | thoughts / voices / promises
The early bird catches the ___ . | worm | fish / fly / seed
Don't judge a book by its ___ . | cover | title / pages / author
When in Rome, do as the ___ do. | Romans | Italians / locals / natives
Two heads are better than ___ . | one | none / three / many
An apple a day keeps the ___ away. | doctor | dentist / hunger / illness
Every cloud has a silver ___ . | lining | cover / border / shadow
Rome wasn't built in a ___ . | day | week / year / night
It's no use crying over spilt ___ . | milk | water / wine / tears
Don't put all your eggs in one ___ . | basket | box / bag / nest
A picture is worth a thousand ___ . | words | pounds / photos / stories
You can't have your cake and ___ it. | eat | keep / share / sell
The grass is always greener on the other ___ . | side | field / garden / hill
Don't count your chickens before they ___ . | hatch | fly / grow / lay
Kill two birds with one ___ . | stone | shot / arrow / hand
Out of sight, out of ___ . | mind | heart / reach / time
Where there's a will, there's a ___ . | way | wish / win / chance
Birds of a feather flock ___ . | together | away / alone / higher
Too many cooks spoil the ___ . | broth | meal / kitchen / soup pot
A bird in the hand is worth two in the ___ . | bush | tree / sky / nest
Beggars can't be ___ . | choosers | winners / buyers / askers
Let sleeping dogs ___ . | lie | sleep / rest / dream
The proof of the pudding is in the ___ . | eating | cooking / tasting / recipe
A stitch in time saves ___ . | nine | time / nothing / mine
Still waters run ___ . | deep | slow / clear / cold
Make hay while the sun ___ . | shines | rises / lasts / burns
A leopard can't change its ___ . | spots | stripes / skin / colours
Once bitten, twice ___ . | shy | sorry / hurt / careful
The pen is mightier than the ___ . | sword | gun / word / king
Don't bite the hand that ___ you. | feeds | holds / helps / pays
Every dog has its ___ . | day | bone / owner / bark
Absence makes the heart grow ___ . | fonder | colder / weaker / older
A rolling stone gathers no ___ . | moss | dust / speed / grass
Necessity is the mother of ___ . | invention | success / progress / courage
`;

const EMAIL = `
You open a formal email to someone whose name you don't know. | Dear Sir or Madam, | Hello you, / Dear Mister, / To who reads this,
You open an email to Mr Brown, a client. | Dear Mr Brown, | Dear Mr. Brown John, / Hi Brown, / Dear Sir Brown,
You close a formal letter that began "Dear Sir or Madam". | Yours faithfully, | Yours sincerely, / Lots of love, / Cheers,
You close a formal letter that began "Dear Ms Clark". | Yours sincerely, | Yours faithfully, / See you, / Yours truly friend,
You say why you are writing. | I am writing to enquire about your courses. | I write you for ask about your courses. / I am writing for to know your courses. / I'm here to ask your courses.
You refer to a previous email. | With reference to your email of 3 May, | About of your email from 3 May, / In reference of your email, / Talking about your email,
You attach a document. | Please find attached my CV. | I send you attached my CV here. / Find my CV in attach. / Attached you my CV.
You ask for information politely. | I would be grateful if you could send me further details. | Send me more details, please. / I want that you send me more details. / I would be grateful if you send me more informations.
You apologise for a late reply. | I apologise for the delay in replying. | Sorry for answer late. / I apologise me for the delay. / Excuse my late to reply.
You give bad news. | I regret to inform you that your application has been unsuccessful. | I'm sorry but you failed. / I regret informing that you are rejected. / Unluckily your application is bad.
You give good news. | I am pleased to inform you that you have been selected. | I am pleased informing you are selected. / Good news: you're in! / I have the pleasure of say you are selected.
You offer more help. | Please do not hesitate to contact me if you require any further information. | Don't doubt in contact me for more informations. / Call me if you want something more. / Please don't hesitate contacting me for any doubt.
You say you expect a reply. | I look forward to hearing from you. | I look forward to hear from you. / I am waiting your answer. / I wait your news soon.
You thank someone for their email. | Thank you for your email of 12 June. | Thanks you for your email. / Thank you for you email me. / I thank your email.
You make a formal complaint. | I am writing to express my dissatisfaction with the service I received. | I write to say I am very angry with you. / I am writing for complain the service. / This service was a disaster.
You ask for a refund. | I would therefore like to request a full refund. | So give me my money back. / I want you return me the money. / I would like requesting a full devolution.
You confirm a meeting. | I am writing to confirm our meeting on Tuesday at 10 a.m. | I write to confirm you the meeting of Tuesday. / I confirm you our meeting the Tuesday. / OK for Tuesday.
You ask to change a meeting. | Would it be possible to reschedule our meeting? | Can we change the date of the meeting or what? / Is possible to move our meeting? / I need that we move the meeting.
You make a polite suggestion. | Might I suggest postponing the launch until May? | I suggest you to postpone the launch. / We postpone the launch, OK? / My suggestion is that postpone the launch.
You introduce the main point after small talk. | I am writing in connection with the vacancy advertised on your website. | I write you by the vacancy of your website. / About the vacancy you put. / I am writing in relation of the vacancy.
You remind someone politely. | This is just a gentle reminder that the report is due on Friday. | Remember the report is for Friday! / I remember you that the report is due Friday. / Don't forget again the report.
You ask someone to confirm receipt. | I would appreciate it if you could confirm receipt of this email. | Tell me if you got this. / I would appreciate you confirm the reception. / Please confirm me the receipt of the email.
You refuse an invitation politely. | Unfortunately, I will be unable to attend due to a prior commitment. | Sorry, I can't go, I have things. / Unfortunately I will not can attend. / I am not able to assist because a compromise.
You end a semi-formal email to a colleague. | Best regards, | Yours faithfully, / Love, / Respectfully yours forever,
You say what you have attached, more formally. | I enclose a copy of the invoice for your records. | I put inside a copy of the invoice. / Enclosed you have the bill copy. / I include you a copy of the invoice.
You ask for a quick reply. | I would appreciate a prompt reply. | Answer me fast, please. / I would appreciate a fast answering. / Reply me as soon as you can.
You say you'll follow up. | I will be in touch again early next week. | I will touch you next week. / I contact you the next week. / We speak the other week.
You accept a job offer. | I am delighted to accept your offer of the position. | I accept happy the job. / I am delighted accepting your offer. / OK, I take the job.
You apologise for a mistake. | Please accept my sincere apologies for the error. | Sorry for the fail. / Please accept my sincerely apologise. / I apologise you for the error.
You ask for clarification. | Could you please clarify what you mean by "flexible hours"? | What means "flexible hours"? / Can you explain me "flexible hours"? / Clarify me the flexible hours.
`;

const SIGNS = `
OUT OF ORDER | It isn't working. | It is very tidy. / You can't order here. / It has been sold.
NO ENTRY | You must not go in. | There is no ticket. / The entrance is free. / Nobody is inside.
MIND THE GAP | Be careful of the space between the train and the platform. | Think about the difference. / Remember your gap year. / Don't forget your bag.
KEEP OFF THE GRASS | Don't walk on the lawn. | Don't cut the grass. / Stay on the grass. / Keep the grass short.
STAFF ONLY | Customers may not go in. | Only one employee works here. / Staff are not allowed. / Ask the staff for help.
WET PAINT | Don't touch: the paint isn't dry. | Paint is sold here. / Wash the wall. / It is raining.
SOLD OUT | There are none left. | Everything is on sale. / The shop has closed down. / It is sold outside.
PAY AND DISPLAY | Buy a ticket and put it where it can be seen in your car. | Pay to see the exhibition. / Show your money before you pay. / Free parking for visitors.
BEWARE OF THE DOG | Be careful: there is a dog. | Dogs are welcome. / The dog is lost. / Take care of the dog.
PLEASE QUEUE HERE | Wait in line at this point. | Leave your questions here. / Pay here. / The queue ends in an hour.
NO VACANCIES | The hotel is full. | The hotel has no staff. / No holidays are allowed. / There are no jobs.
VACANCY: KITCHEN ASSISTANT | They are looking for someone to work in the kitchen. | The kitchen is empty. / The kitchen assistant is on holiday. / The kitchen is for hire.
TO LET | This property is available to rent. | This is the toilet. / You may enter. / This property is for sale.
CASH ONLY | You can't pay by card. | Cash machines only. / Cards only. / Money is not accepted.
MIND YOUR HEAD | Be careful: the ceiling or door is low. | Think before you act. / Wear a hat. / Remember your manners.
REDUCED TO CLEAR | The price is lower because the shop wants to sell the last ones. | The shelf has been cleaned. / Fewer items are clear. / The area must be emptied.
BUY ONE, GET ONE FREE | If you buy one, you get a second one at no cost. | One is free if you get there first. / Buy one and you are free to go. / You may buy only one.
BEST BEFORE 12 MAY | The food is at its best until that date. | It is the best food since 12 May. / You must buy it before 12 May. / It was made on 12 May.
KEEP OUT OF REACH OF CHILDREN | Store it where children can't get it. | Children must stay outside. / Don't let children reach the door. / Keep children far from here.
DO NOT EXCEED THE STATED DOSE | Don't take more than the amount indicated. | Don't take it after the date shown. / Don't take less than indicated. / Take all of it at once.
THIS DOOR IS ALARMED | An alarm will sound if you open it. | The door is frightened. / The door is broken. / Knock before entering.
DIVERSION AHEAD | You will have to follow a different route. | There is entertainment further on. / The road gets wider. / There is a fun park nearby.
GIVE WAY | Let other traffic go first. | Hand over your things. / Leave by this road. / This road is free.
NO THROUGH ROAD | This road doesn't lead anywhere else: it's a dead end. | You can't use this road at all. / The road is being repaired. / There is no road here.
TRESPASSERS WILL BE PROSECUTED | Legal action will be taken against anyone who enters without permission. | Visitors will be shown around. / Thieves will be followed. / Passers-by will be questioned.
SUBJECT TO AVAILABILITY | You can have it only if there are some left. | It is always available. / The subject is available now. / Availability is not their concern.
ALLOW 28 DAYS FOR DELIVERY | It may take up to four weeks to arrive. | Delivery is allowed for 28 days only. / You have 28 days to pay. / You must wait exactly 28 days to order.
NO REFUNDS WITHOUT A RECEIPT | You need proof of purchase to get your money back. | You get a receipt instead of your money. / Refunds are never given. / Keep your refund with the receipt.
PLEASE REFRAIN FROM SMOKING | You are asked not to smoke. | Smoke only in the refreshment area. / Please smoke quickly. / Smoking is allowed with restraint.
PATRONS ARE REQUESTED TO VACATE THE PREMISES BY 11 P.M. | Customers should leave the building by eleven. | Owners take holidays at eleven. / Customers may book until eleven. / The bar opens at eleven.
THE MANAGEMENT ACCEPTS NO LIABILITY FOR LOSS OR DAMAGE | The company is not responsible if your things are lost or broken. | The managers refuse to lose anything. / The company will pay for any damage. / Staff are not allowed to lie.
ADMISSION BY TICKET ONLY | You can't get in without a ticket. | Admit your ticket here. / Tickets are sold only at the entrance. / Only one ticket per person.
`;

const RHYME = `
cat | hat | cut / cot / cart
day | they | die / dye / the
see | key | say / sea-side / sky
blue | shoe | blow / glow / show
make | break | speak / leak / bleak | break se pronuncia /breɪk/, como make.
night | white | eight / weight / wait
know | go | now / how / cow
two | blue | toe / go / so
said | bed | paid / maid / laid | said se pronuncia /sed/.
great | late | meat / heat / seat
friend | send | fiend / find / fried
does | buzz | goes / toes / shoes
word | bird | lord / sword / cord
heard | bird | beard / feared / heart
meat | street | great / sweat / threat
bear | hair | fear / hear / near
here | near | there / where / wear
food | mood | good / wood / flood
blood | mud | food / mood / good
good | could | food / mood / blood
though | go | through / tough / cough | though /ðəʊ/.
through | blue | though / tough / cough | through /θruː/.
tough | stuff | though / through / dough
cough | off | tough / though / through
bought | sort | boat / bout / drought
drought | out | bought / thought / brought
laugh | staff | cough / tough / caught
caught | sport | laughed / cat / coat
heart | part | heard / beard / hurt
height | bite | weight / eight / freight | height /haɪt/.
weight | late | height / white / sight
suit | boot | suite / quit / wait
suite | sweet | suit / boot / quite
choir | fire | chair / care / core | choir /ˈkwaɪə/.
queue | few | quay / key / cow
quay | key | queue / way / day | quay se pronuncia /kiː/.
sew | go | few / new / dew | sew /səʊ/.
lose | choose | loose / close / nose
loose | juice | lose / choose / shoes
bury | very | fury / jury / hurry | bury /ˈberi/.
`;

export const SETS2B: Record<string, string> = {
  emph: EMPH, spell: SPELL, odd: ODD, defin: DEFIN, adjn: ADJN, pphr: PPHR, cond: COND, abbr: ABBR, prov: PROV, email: EMAIL, signs: SIGNS, rhyme: RHYME,
};
