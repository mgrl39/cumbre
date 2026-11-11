import type { Level } from '../core/types.ts';

/* palabra | categoría | significado | ejemplo con *palabra* # nota */
export const VOCAB_BLOCKS: { level: Level; tag: string; list: string }[] = [
  {
    level: 'A1', tag: 'core', list: `
house | noun | casa | We live in a small *house*.
work | verb | trabajar | I *work* in an office.
eat | verb | comer | We *eat* dinner at nine.
buy | verb | comprar | I need to *buy* some bread.
know | verb | saber, conocer | I don't *know* the answer.
want | verb | querer | Do you *want* some tea?
need | verb | necesitar | I *need* your help.
give | verb | dar | Can you *give* me the pen?
take | verb | tomar, llevar | *Take* an umbrella with you.
come | verb | venir | *Come* to my house tomorrow.
find | verb | encontrar | I can't *find* my phone.
tell | verb | decir (a alguien), contar | *Tell* me the truth.
ask | verb | preguntar, pedir | Can I *ask* you a question?
help | verb | ayudar | Can you *help* me, please?
start | verb | empezar | The class *starts* at nine.
open | verb | abrir | Please *open* the window.
close | verb | cerrar | *Close* the door, please.
answer | noun | respuesta | I know the *answer*.
question | noun | pregunta | That's a good *question*.
week | noun | semana | I go to the gym twice a *week*.
year | noun | año | She is twenty *years* old.
job | noun | trabajo, empleo | He has a new *job*.
money | noun | dinero | I don't have much *money*.
food | noun | comida | The *food* here is great.
friend | noun | amigo/a | She's my best *friend*.
family | noun | familia | I have a big *family*.
city | noun | ciudad | London is a huge *city*.
street | noun | calle | I live on this *street*.
weather | noun | tiempo (clima) | The *weather* is nice today.
easy | adj | fácil | The test was *easy*.
difficult | adj | difícil | English pronunciation is *difficult*.
cheap | adj | barato | This shirt is *cheap*.
expensive | adj | caro | London is very *expensive*.
busy | adj | ocupado | I'm very *busy* today.
tired | adj | cansado | I'm *tired* after work.
hungry | adj | hambriento (tener hambre) | I'm *hungry*. Let's eat.
early | adv | temprano | I get up *early*.
late | adj/adv | tarde | Sorry I'm *late*.
always | adv | siempre | She *always* drinks tea.
often | adv | a menudo | I *often* read before bed.
`,
  },
  {
    level: 'A2', tag: 'core', list: `
borrow | verb | tomar prestado | Can I *borrow* your pen? # borrow = pedir prestado; lend = prestar
lend | verb | prestar | Could you *lend* me ten euros?
spend | verb | gastar; pasar (tiempo) | I *spend* too much money on clothes.
save | verb | ahorrar; guardar; salvar | I'm *saving* for a new laptop.
earn | verb | ganar (dinero trabajando) | She *earns* a good salary. # ganar un partido = win
win | verb | ganar (competición) | Our team *won* the match.
lose | verb | perder | Don't *lose* your keys.
miss | verb | echar de menos; perder (tren, clase) | I *missed* the bus this morning.
wait | verb | esperar | *Wait* for me here.
hope | verb | esperar (desear) | I *hope* you feel better soon.
expect | verb | esperar (prever) | I *expect* it will rain.
remember | verb | recordar, acordarse | I can't *remember* his name.
forget | verb | olvidar | Don't *forget* your passport.
choose | verb | elegir | You can *choose* any seat.
decide | verb | decidir | We *decided* to stay at home.
explain | verb | explicar | Can you *explain* this to me?
agree | verb | estar de acuerdo | I *agree* with you. # ❌ I am agree
improve | verb | mejorar | I want to *improve* my English.
prefer | verb | preferir | I *prefer* tea to coffee.
arrive | verb | llegar | We *arrived* in Rome at noon.
leave | verb | irse; dejar | The train *leaves* at six.
invite | verb | invitar | They *invited* us to dinner.
suggest | verb | sugerir | I *suggest* taking a taxi.
appointment | noun | cita (médico, trabajo) | I have a dentist *appointment* at 4.
advice | noun | consejo(s) | Can you give me some *advice*? # Incontable
journey | noun | viaje (trayecto) | The *journey* takes two hours.
trip | noun | viaje corto, excursión | We went on a *trip* to the coast.
health | noun | salud | Smoking is bad for your *health*.
skill | noun | habilidad, destreza | Writing is an important *skill*.
knowledge | noun | conocimiento | She has a deep *knowledge* of history. # Incontable
mistake | noun | error | I made a *mistake*. # make a mistake, no do
purpose | noun | propósito, fin | What's the *purpose* of your visit?
reason | noun | razón, motivo | There's no *reason* to worry.
enough | det | suficiente | We have *enough* time.
available | adj | disponible | Is this room *available*?
similar | adj | parecido | Our ideas are *similar*.
useful | adj | útil | This app is very *useful*.
worried | adj | preocupado | I'm *worried* about the exam.
bored | adj | aburrido (estar) | I'm *bored*. Let's go out. # boring = aburrido (ser)
however | adv | sin embargo | It was cheap. *However*, it was bad.
`,
  },
  {
    level: 'B1', tag: 'core', list: `
achieve | verb | lograr, conseguir | She *achieved* her goal.
afford | verb | permitirse (pagar) | I can't *afford* a new car.
apply | verb | solicitar; aplicar | He *applied* for the job.
avoid | verb | evitar | Try to *avoid* sugar.
belong | verb | pertenecer | This bag *belongs* to me.
complain | verb | quejarse | He always *complains* about the food.
deal with | verb | ocuparse de, lidiar con | I'll *deal with* the problem.
describe | verb | describir | *Describe* the picture.
develop | verb | desarrollar | They *developed* a new app.
encourage | verb | animar, fomentar | My teacher *encouraged* me to read more.
increase | verb | aumentar | Prices have *increased* this year.
reduce | verb | reducir | We must *reduce* waste.
manage | verb | conseguir; gestionar | I *managed* to finish on time.
mention | verb | mencionar | She didn't *mention* the price.
prevent | verb | prevenir, impedir | Vaccines *prevent* diseases.
provide | verb | proporcionar | The hotel *provides* free breakfast.
realise | verb | darse cuenta | I *realised* I was wrong. # ≠ realizar (carry out)
recognise | verb | reconocer | I didn't *recognise* you!
rely on | verb | depender de, confiar en | You can *rely on* me.
require | verb | requerir | The job *requires* experience.
solve | verb | resolver | We need to *solve* this problem.
succeed | verb | tener éxito | She *succeeded* in passing the exam.
support | verb | apoyar | My family *supports* me.
waste | verb | malgastar | Don't *waste* time.
attitude | noun | actitud | She has a positive *attitude*.
behaviour | noun | comportamiento | His *behaviour* was strange.
challenge | noun | reto, desafío | Learning a language is a *challenge*.
environment | noun | medio ambiente; entorno | We must protect the *environment*.
experience | noun | experiencia | Do you have work *experience*?
goal | noun | objetivo, meta | My *goal* is to reach C1.
opportunity | noun | oportunidad | This is a great *opportunity*.
progress | noun | progreso | You're making good *progress*. # Incontable
society | noun | sociedad | Technology affects *society*.
average | adj | medio, promedio | The *average* age is 30.
aware | adj | consciente | Are you *aware* of the risks?
confident | adj | seguro de sí mismo | She is *confident* when she speaks.
likely | adj | probable | It's *likely* to rain.
obvious | adj | obvio | The answer is *obvious*.
probably | adv | probablemente | He's *probably* at home.
although | conj | aunque | *Although* it rained, we went out.
`,
  },
  {
    level: 'B2', tag: 'core', list: `
acknowledge | verb | reconocer, admitir | He *acknowledged* his mistake.
address | verb | abordar (un tema) | The report *addresses* several issues.
assume | verb | suponer, dar por hecho | I *assumed* you knew.
claim | verb | afirmar, reclamar | He *claims* he is innocent.
contribute | verb | contribuir | Everyone *contributed* to the project.
convince | verb | convencer | She *convinced* me to stay.
cope with | verb | sobrellevar, hacer frente | How do you *cope with* stress?
emphasise | verb | enfatizar | The teacher *emphasised* the importance of practice.
ensure | verb | asegurar, garantizar | Please *ensure* the door is locked.
estimate | verb | estimar, calcular | They *estimate* the cost at $2 million.
exceed | verb | superar, exceder | Costs *exceeded* our budget.
highlight | verb | destacar, resaltar | The study *highlights* the risks.
imply | verb | implicar, insinuar | What are you *implying*?
overcome | verb | superar | She *overcame* her fear of flying.
persuade | verb | persuadir | He *persuaded* me to join.
pursue | verb | perseguir, dedicarse a | She decided to *pursue* a career in law.
reveal | verb | revelar | The survey *revealed* surprising results.
undermine | verb | socavar, minar | The scandal *undermined* public trust.
withdraw | verb | retirar(se) | The company *withdrew* the product.
awareness | noun | conciencia, concienciación | We need to raise *awareness* of the problem.
burden | noun | carga | Debt is a heavy *burden*.
drawback | noun | inconveniente | The main *drawback* is the price.
outcome | noun | resultado | The *outcome* of the vote was unexpected.
threat | noun | amenaza | Climate change is a serious *threat*.
trend | noun | tendencia | There is a growing *trend* towards remote work.
breakthrough | noun | avance (importante) | Scientists made a *breakthrough* in cancer research.
consequence | noun | consecuencia | Every action has *consequences*.
shortage | noun | escasez | There is a *shortage* of nurses.
feasible | adj | viable | Is the plan *feasible*?
reluctant | adj | reacio | He was *reluctant* to admit it.
reliable | adj | fiable | Is this source *reliable*?
widespread | adj | generalizado | The use of phones is *widespread*.
crucial | adj | crucial | Sleep is *crucial* for learning.
overwhelming | adj | abrumador | The response was *overwhelming*.
straightforward | adj | sencillo, directo | The instructions are *straightforward*.
thorough | adj | minucioso | They carried out a *thorough* investigation.
gradually | adv | gradualmente | Her English *gradually* improved.
merely | adv | meramente, solo | It was *merely* a suggestion.
nevertheless | adv | no obstante | It was hard. *Nevertheless*, we finished.
whereas | conj | mientras que | He likes cats, *whereas* I prefer dogs.
`,
  },
  {
    level: 'C1', tag: 'core', list: `
alleviate | verb | aliviar, mitigar | The drug *alleviates* pain.
curb | verb | frenar, restringir | Measures to *curb* inflation.
deteriorate | verb | deteriorarse | His health *deteriorated* quickly.
discern | verb | discernir | It is hard to *discern* any pattern.
exacerbate | verb | agravar, exacerbar | The drought *exacerbated* the crisis.
foster | verb | fomentar | Schools should *foster* creativity.
hinder | verb | obstaculizar | Bad weather *hindered* the rescue.
mitigate | verb | mitigar | Steps to *mitigate* the risks.
scrutinise | verb | examinar a fondo | The data were *scrutinised* by experts.
underpin | verb | sustentar, apuntalar | The theory that *underpins* the model.
undertake | verb | emprender, llevar a cabo | They *undertook* a major study.
yield | verb | producir, arrojar (resultados) | The experiment *yielded* interesting results.
advent | noun | llegada, advenimiento | The *advent* of the internet changed everything.
caveat | noun | salvedad, advertencia | One *caveat*: the sample was small.
discrepancy | noun | discrepancia | There is a *discrepancy* between the two figures.
leeway | noun | margen (de maniobra) | Teachers have little *leeway* in the curriculum.
pitfall | noun | escollo, trampa | Avoid common *pitfalls* in academic writing.
premise | noun | premisa | The argument rests on a false *premise*.
setback | noun | revés, contratiempo | The project suffered a *setback*.
upheaval | noun | agitación, trastorno | A period of political *upheaval*.
compelling | adj | convincente, poderoso | She made a *compelling* argument.
detrimental | adj | perjudicial | Stress is *detrimental* to health.
elusive | adj | esquivo, difícil de alcanzar | A cure remains *elusive*.
inherent | adj | inherente | Every investment has *inherent* risks.
meticulous | adj | meticuloso | Her research is *meticulous*.
negligible | adj | insignificante | The difference is *negligible*.
pervasive | adj | omnipresente | The *pervasive* influence of social media.
plausible | adj | plausible, verosímil | That's a *plausible* explanation.
prone | adj | propenso | He is *prone* to exaggeration.
robust | adj | sólido, robusto | The findings are *robust*.
tentative | adj | provisional, tímido | We reached a *tentative* agreement.
unprecedented | adj | sin precedentes | The pandemic caused *unprecedented* disruption.
arguably | adv | posiblemente, se podría decir | It is *arguably* the best novel of the decade.
inevitably | adv | inevitablemente | Prices will *inevitably* rise.
notably | adv | en particular, notablemente | Several countries, *notably* Japan, have ageing populations.
predominantly | adv | predominantemente | The population is *predominantly* urban.
`,
  },
  {
    level: 'B2', tag: 'academic', list: `
analyse | verb | analizar | We *analysed* the results carefully.
approach | noun | enfoque | This *approach* is more effective.
assess | verb | evaluar | Teachers *assess* students' progress.
concept | noun | concepto | The *concept* of freedom.
conclude | verb | concluir | The authors *conclude* that more research is needed.
consist of | verb | consistir en, constar de | The course *consists of* five modules.
constitute | verb | constituir | Women *constitute* 60% of the staff.
context | noun | contexto | You must read the quote in *context*.
data | noun | datos | The *data* show a clear trend.
define | verb | definir | How do you *define* success?
derive | verb | derivar, obtener | Many English words *derive* from Latin.
evidence | noun | pruebas, evidencia | There is no *evidence* to support this. # Incontable
factor | noun | factor | Cost is a key *factor*.
feature | noun | característica, rasgo | A key *feature* of the system is its speed.
framework | noun | marco | A legal *framework*.
function | noun | función | The *function* of the heart is to pump blood.
hypothesis | noun | hipótesis | The results support our *hypothesis*.
identify | verb | identificar | We *identified* three main problems.
indicate | verb | indicar | Studies *indicate* a link between sleep and memory.
interpret | verb | interpretar | How do you *interpret* these results?
issue | noun | cuestión, problema, tema | This is a complex *issue*.
method | noun | método | They used a new *method*.
occur | verb | ocurrir | Errors *occur* when the system is overloaded.
outline | verb | esbozar, resumir | The report *outlines* the main findings.
participant | noun | participante | The study had 200 *participants*.
perspective | noun | perspectiva | From a historical *perspective*…
principle | noun | principio | The basic *principles* of economics.
proportion | noun | proporción | A large *proportion* of students work part-time.
range | noun | gama, rango | A wide *range* of options.
relevant | adj | pertinente, relevante | Is this information *relevant*?
research | noun | investigación | *Research* shows that exercise helps. # Incontable: a piece of research
significant | adj | significativo, importante | A *significant* increase.
source | noun | fuente | Always cite your *sources*.
structure | noun | estructura | The *structure* of the essay.
sufficient | adj | suficiente | There is not *sufficient* evidence.
survey | noun | encuesta, estudio | A recent *survey* found that…
theory | noun | teoría | The *theory* of evolution.
variable | noun | variable | We controlled for several *variables*.
whereby | adv | por el cual | A system *whereby* students evaluate teachers.
valid | adj | válido | That is a *valid* point.
`,
  },
  {
    level: 'C1', tag: 'academic', list: `
ambiguous | adj | ambiguo | The wording is *ambiguous*.
anomaly | noun | anomalía | The result was an *anomaly*.
coherent | adj | coherente | A *coherent* argument.
comprehensive | adj | exhaustivo, completo | A *comprehensive* review of the literature.
correlation | noun | correlación | There is a strong *correlation* between income and health.
criterion | noun | criterio (pl. criteria) | Each *criterion* is explained below.
empirical | adj | empírico | There is little *empirical* evidence.
entail | verb | conllevar, implicar | The job *entails* a lot of travel.
explicit | adj | explícito | The instructions were *explicit*.
implicit | adj | implícito | An *implicit* assumption.
infer | verb | inferir, deducir | What can we *infer* from the data?
inhibit | verb | inhibir | Fear can *inhibit* learning.
notion | noun | noción, idea | The *notion* of progress.
paradigm | noun | paradigma | A *paradigm* shift in medicine.
phenomenon | noun | fenómeno (pl. phenomena) | A natural *phenomenon*.
preliminary | adj | preliminar | *Preliminary* results are promising.
rationale | noun | fundamento, razón de ser | The *rationale* behind the decision.
substantiate | verb | fundamentar, probar | He could not *substantiate* his claims.
subsequent | adj | posterior | *Subsequent* studies confirmed the findings.
underlying | adj | subyacente | The *underlying* causes of poverty.
validate | verb | validar | The model was *validated* with new data.
viable | adj | viable | A *viable* alternative.
discourse | noun | discurso (debate público) | Political *discourse* has become polarised.
cohesion | noun | cohesión | Social *cohesion*.
allocate | verb | asignar | Funds were *allocated* to research.
attribute | verb | atribuir | The decline is *attributed* to low demand.
bias | noun | sesgo | The study shows signs of *bias*.
coincide | verb | coincidir | His visit *coincided* with the election.
compile | verb | recopilar | They *compiled* a list of sources.
deviate | verb | desviarse | The results *deviated* from expectations.
`,
  },
  {
    level: 'B1', tag: 'linker', list: `
furthermore | adv | además (formal) | The plan is cheap. *Furthermore*, it is easy to implement.
moreover | adv | además, es más | The hotel was dirty. *Moreover*, it was expensive.
in addition | phrase | además | *In addition*, students must submit a report.
therefore | adv | por lo tanto | He was ill; *therefore*, he stayed at home.
as a result | phrase | como resultado | It rained heavily. *As a result*, the match was cancelled.
for instance | phrase | por ejemplo | Some animals, *for instance* bats, use echolocation.
on the other hand | phrase | por otro lado | It's fast. *On the other hand*, it's expensive.
in conclusion | phrase | en conclusión | *In conclusion*, the benefits outweigh the costs.
due to | phrase | debido a | The flight was delayed *due to* fog.
instead | adv | en su lugar | We didn't go out. We stayed home *instead*.
`,
  },
  {
    level: 'B2', tag: 'linker', list: `
consequently | adv | en consecuencia | Sales fell; *consequently*, jobs were cut.
nonetheless | adv | no obstante | The task was difficult; *nonetheless*, we succeeded.
in contrast | phrase | en cambio, por contraste | *In contrast*, the second group improved.
owing to | phrase | debido a | *Owing to* the strike, classes were cancelled.
in spite of | phrase | a pesar de | *In spite of* the rain, we went out.
namely | adv | a saber, concretamente | Two countries, *namely* Spain and Italy.
thus | adv | así, por tanto | Costs fell, *thus* increasing profits.
hence | adv | de ahí, por lo tanto | The data were incomplete; *hence* the delay.
to some extent | phrase | hasta cierto punto | I agree *to some extent*.
in terms of | phrase | en cuanto a | *In terms of* cost, the first option is better.
with regard to | phrase | con respecto a | *With regard to* your question…
overall | adv | en general, en conjunto | *Overall*, the results were positive.
`,
  },
  {
    level: 'C1', tag: 'linker', list: `
notwithstanding | prep | a pesar de, no obstante | *Notwithstanding* these problems, the project succeeded.
albeit | conj | aunque (+ adj/adv) | A small, *albeit* significant, improvement.
insofar as | conj | en la medida en que | The theory is useful *insofar as* it explains the data.
conversely | adv | a la inversa | *Conversely*, lower prices increase demand.
thereby | adv | de ese modo | They cut costs, *thereby* increasing profits.
by the same token | phrase | del mismo modo | *By the same token*, we must consider the risks.
in light of | phrase | a la luz de | *In light of* recent events, the plan was changed.
not to mention | phrase | por no hablar de | It's expensive, *not to mention* slow.
`,
  },
  {
    level: 'B1', tag: 'phrasal', list: `
find out | phrasal | averiguar, enterarse | I *found out* the truth yesterday.
give up | phrasal | dejar (un hábito), rendirse | He *gave up* smoking.
look for | phrasal | buscar | I'm *looking for* my keys.
look after | phrasal | cuidar | She *looks after* her grandmother.
look forward to | phrasal | tener ganas de | I'm *looking forward to* the holidays.
turn down | phrasal | rechazar; bajar (volumen) | She *turned down* the job offer.
put off | phrasal | posponer | Don't *put off* your homework.
take up | phrasal | empezar (afición) | I've *taken up* yoga.
run out of | phrasal | quedarse sin | We've *run out of* milk.
get on with | phrasal | llevarse bien con | I *get on with* my colleagues.
go on | phrasal | continuar; pasar | What's *going on*?
set up | phrasal | montar, establecer | They *set up* a company.
figure out | phrasal | descifrar, entender | I can't *figure out* this problem.
come back | phrasal | volver | When are you *coming back*?
`,
  },
  {
    level: 'B2', tag: 'phrasal', list: `
carry out | phrasal | llevar a cabo | Researchers *carried out* an experiment.
come up with | phrasal | idear, proponer | She *came up with* a great idea.
point out | phrasal | señalar | He *pointed out* a mistake.
bring about | phrasal | provocar, ocasionar | The war *brought about* many changes.
account for | phrasal | explicar; representar (%) | Women *account for* 60% of students.
break down | phrasal | averiarse; desglosar | My car *broke down*.
cut down on | phrasal | reducir (consumo) | I'm *cutting down on* sugar.
deal with | phrasal | tratar (un tema) | The book *deals with* immigration.
draw up | phrasal | redactar (documento) | We *drew up* a contract.
make up for | phrasal | compensar | Nothing can *make up for* lost time.
rule out | phrasal | descartar | The police *ruled out* murder.
set out | phrasal | exponer; proponerse | The report *sets out* the main objectives.
stem from | phrasal | derivar de, provenir de | The problem *stems from* poor planning.
take on | phrasal | asumir, contratar | She *took on* too much work.
turn out | phrasal | resultar | It *turned out* that he was right.
put forward | phrasal | proponer, plantear | He *put forward* a new theory.
`,
  },
  {
    level: 'B1', tag: 'false-friend', list: `
actually | adv | en realidad (NO actualmente) | *Actually*, I'm from Peru, not Mexico. # actualmente = currently / nowadays
eventually | adv | finalmente, al final (NO eventualmente) | After hours of waiting, the bus *eventually* came.
sensible | adj | sensato (NO sensible) | That's a *sensible* decision. # sensible (ES) = sensitive
library | noun | biblioteca (NO librería) | I study at the *library*. # librería = bookshop
embarrassed | adj | avergonzado (NO embarazada) | I was so *embarrassed* when I fell. # embarazada = pregnant
realise | verb | darse cuenta (NO realizar) | I *realised* I had forgotten my keys. # realizar = carry out
assist | verb | ayudar (NO asistir a) | Can I *assist* you? # asistir a = attend
attend | verb | asistir a | Over 100 people *attended* the conference.
carpet | noun | alfombra (NO carpeta) | A red *carpet*. # carpeta = folder
exit | noun | salida (NO éxito) | The *exit* is on the left. # éxito = success
success | noun | éxito | The event was a great *success*.
career | noun | trayectoria profesional (NO carrera universitaria) | She had a long *career* in politics. # carrera = degree
fabric | noun | tela (NO fábrica) | This *fabric* is soft. # fábrica = factory
argument | noun | discusión, pelea; argumento | They had an *argument* about money.
pretend | verb | fingir (NO pretender) | He *pretended* to be ill. # pretender = intend
`,
  },
  {
    level: 'B2', tag: 'false-friend', list: `
constipated | adj | estreñido (NO constipado) | I feel *constipated*. # constipado = have a cold
sympathetic | adj | comprensivo (NO simpático) | She was very *sympathetic* when I lost my job. # simpático = nice, friendly
large | adj | grande (NO largo) | A *large* number of people. # largo = long
lecture | noun | clase magistral, conferencia (NO lectura) | The *lecture* starts at ten. # lectura = reading
college | noun | universidad, facultad (NO colegio) | She's at *college* studying law. # colegio = school
record | verb | grabar, registrar (NO recordar) | They *recorded* a new album. # recordar = remember
introduce | verb | presentar (a alguien) (NO introducir) | Let me *introduce* you to my boss. # introducir = insert, put in
notice | verb | notar, darse cuenta | Did you *notice* anything strange? # noticia = news
compromise | noun | acuerdo mutuo, término medio | We reached a *compromise*. # compromiso = commitment
deception | noun | engaño (NO decepción) | The scam was based on *deception*. # decepción = disappointment
casualty | noun | víctima (herido/muerto) (NO casualidad) | There were no *casualties*. # casualidad = coincidence
miserable | adj | muy triste, deprimente | I felt *miserable* all day. # miserable (ES) = mean, wretched
`,
  },
  {
    level: 'A2', tag: 'phrase', list: `
Could you repeat that, please? | frase | ¿Puede repetirlo, por favor? | Clase o llamada: no has entendido.
Could you speak more slowly, please? | frase | ¿Puede hablar más despacio? | Cuando hablan muy rápido.
What does this word mean? | frase | ¿Qué significa esta palabra? | Para preguntar vocabulario.
How do you say this in English? | frase | ¿Cómo se dice esto en inglés? | Señalando algo.
Sorry, I didn't catch that. | frase | Perdona, no lo he pillado. | Muy natural en conversación.
Excuse me, where is the nearest station? | frase | Perdone, ¿dónde está la estación más cercana? | Por la calle.
I'd like to book a table for two. | frase | Quería reservar una mesa para dos. | Restaurante.
Can I pay by card? | frase | ¿Puedo pagar con tarjeta? | Tienda o restaurante.
I'm just looking, thanks. | frase | Solo estoy mirando, gracias. | En una tienda.
I've got a problem with my booking. | frase | Tengo un problema con mi reserva. | Hotel, vuelo.
`,
  },
  {
    level: 'B1', tag: 'phrase', list: `
Just to clarify, do you mean…? | frase | Solo para aclarar, ¿quieres decir…? | Comprobar que has entendido.
Let me think about it. | frase | Déjame pensarlo. | Ganar tiempo.
That's a good point, but… | frase | Buen argumento, pero… | Discrepar con educación.
I see what you mean. | frase | Entiendo lo que quieres decir. | Mostrar comprensión.
I'm not sure I follow you. | frase | No sé si te sigo. | Cuando te pierdes.
Could you give me an example? | frase | ¿Podría darme un ejemplo? | Clase o reunión.
I'll get back to you on that. | frase | Te respondo sobre eso más adelante. | Trabajo, reuniones.
I'm afraid I can't make it. | frase | Me temo que no puedo ir. | Rechazar una cita.
Would you mind if I…? | frase | ¿Le importa si…? | Pedir permiso educadamente.
Sorry to bother you, but… | frase | Perdona que te moleste, pero… | Interrumpir con educación.
`,
  },
  {
    level: 'B2', tag: 'phrase', list: `
I take your point, but I'd argue that… | frase | Entiendo tu argumento, pero yo diría que… | Debate formal.
To put it another way… | frase | Dicho de otro modo… | Reformular.
As far as I'm concerned… | frase | En lo que a mí respecta… | Dar opinión.
I'm writing with regard to… | frase | Le escribo en relación con… | Email formal.
Please find attached… | frase | Adjunto le envío… | Email formal.
I look forward to hearing from you. | frase | Quedo a la espera de su respuesta. | Cierre de email formal.
Would it be possible to…? | frase | ¿Sería posible…? | Petición formal.
That's not quite what I meant. | frase | No es exactamente lo que quería decir. | Corregir un malentendido.
`,
  },
];
