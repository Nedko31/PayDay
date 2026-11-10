const API = 'https://api.frankfurter.dev/v2';
const CACHE_KEY = 'payday_fx_cache_v1';
const LANGS = {
 en:{tab:'Convert',title:'Currency converter',subtitle:'Reference exchange rates from official sources',amount:'Amount',from:'From',to:'To',convert:'Converted amount',rate:'Exchange rate',updated:'Rate date',refresh:'Refresh rates',loading:'Loading exchange rates…',offline:'Offline — showing the last saved rate when available.',error:'Rate unavailable for this currency pair.',disclaimer:'Reference rates, not live trading prices. Rates are normally published on business days.',swap:'Swap currencies',tools:'Money tools'},
 bg:{tab:'Конвертор',title:'Валутен калкулатор',subtitle:'Референтни курсове от официални източници',amount:'Сума',from:'От',to:'Към',convert:'Преизчислена сума',rate:'Обменен курс',updated:'Дата на курса',refresh:'Обнови курсовете',loading:'Зареждане на курсовете…',offline:'Офлайн — показваме последния запазен курс, ако има такъв.',error:'Няма наличен курс за тази валутна двойка.',disclaimer:'Референтни курсове, не борсови цени в реално време. Обикновено се публикуват в работни дни.',swap:'Размени валутите',tools:'Финансови инструменти'},
 es:{tab:'Convertir',title:'Conversor de divisas',subtitle:'Tipos de referencia de fuentes oficiales',amount:'Cantidad',from:'De',to:'A',convert:'Importe convertido',rate:'Tipo de cambio',updated:'Fecha del tipo',refresh:'Actualizar tipos',loading:'Cargando tipos…',offline:'Sin conexión: se muestra el último tipo guardado si está disponible.',error:'Tipo no disponible para este par.',disclaimer:'Tipos de referencia, no precios de negociación en directo. Se publican normalmente en días laborables.',swap:'Intercambiar monedas',tools:'Herramientas'},
 fr:{tab:'Convertir',title:'Convertisseur de devises',subtitle:'Taux de référence de sources officielles',amount:'Montant',from:'De',to:'Vers',convert:'Montant converti',rate:'Taux de change',updated:'Date du taux',refresh:'Actualiser les taux',loading:'Chargement des taux…',offline:'Hors ligne : dernier taux enregistré affiché si disponible.',error:'Taux indisponible pour cette paire.',disclaimer:'Taux de référence, pas des cours de trading en direct. Publication généralement les jours ouvrés.',swap:'Inverser les devises',tools:'Outils'},
 de:{tab:'Umrechnen',title:'Währungsrechner',subtitle:'Referenzkurse aus offiziellen Quellen',amount:'Betrag',from:'Von',to:'Nach',convert:'Umgerechneter Betrag',rate:'Wechselkurs',updated:'Kursdatum',refresh:'Kurse aktualisieren',loading:'Wechselkurse werden geladen…',offline:'Offline – letzter gespeicherter Kurs wird angezeigt, sofern vorhanden.',error:'Für dieses Währungspaar ist kein Kurs verfügbar.',disclaimer:'Referenzkurse, keine Live-Handelspreise. Veröffentlichung normalerweise an Werktagen.',swap:'Währungen tauschen',tools:'Finanztools'},
 tr:{tab:'Dönüştür',title:'Döviz çevirici',subtitle:'Resmî kaynaklardan referans kurlar',amount:'Tutar',from:'Kaynak',to:'Hedef',convert:'Dönüştürülen tutar',rate:'Döviz kuru',updated:'Kur tarihi',refresh:'Kurları yenile',loading:'Kurlar yükleniyor…',offline:'Çevrimdışı — varsa son kayıtlı kur gösteriliyor.',error:'Bu döviz çifti için kur bulunamadı.',disclaimer:'Referans kurlardır, canlı işlem fiyatları değildir. Genellikle iş günlerinde yayımlanır.',swap:'Para birimlerini değiştir',tools:'Finans araçları'},
 ru:{tab:'Конвертер',title:'Конвертер валют',subtitle:'Справочные курсы из официальных источников',amount:'Сумма',from:'Из',to:'В',convert:'После конвертации',rate:'Обменный курс',updated:'Дата курса',refresh:'Обновить курсы',loading:'Загрузка курсов…',offline:'Нет подключения — показан последний сохранённый курс, если он есть.',error:'Курс для этой пары недоступен.',disclaimer:'Справочные курсы, не биржевые цены в реальном времени. Обычно публикуются в рабочие дни.',swap:'Поменять валюты',tools:'Инструменты'},
 pt:{tab:'Converter',title:'Conversor de moedas',subtitle:'Taxas de referência de fontes oficiais',amount:'Valor',from:'De',to:'Para',convert:'Valor convertido',rate:'Taxa de câmbio',updated:'Data da taxa',refresh:'Atualizar taxas',loading:'A carregar taxas…',offline:'Offline — a mostrar a última taxa guardada, se disponível.',error:'Taxa indisponível para este par.',disclaimer:'Taxas de referência, não preços de negociação em tempo real. Normalmente publicadas em dias úteis.',swap:'Trocar moedas',tools:'Ferramentas'},
 it:{tab:'Converti',title:'Convertitore di valuta',subtitle:'Tassi di riferimento da fonti ufficiali',amount:'Importo',from:'Da',to:'A',convert:'Importo convertito',rate:'Tasso di cambio',updated:'Data del tasso',refresh:'Aggiorna tassi',loading:'Caricamento tassi…',offline:'Offline: ultimo tasso salvato mostrato se disponibile.',error:'Tasso non disponibile per questa coppia.',disclaimer:'Tassi di riferimento, non prezzi di negoziazione in tempo reale. Pubblicati normalmente nei giorni lavorativi.',swap:'Inverti valute',tools:'Strumenti'},
 nl:{tab:'Omrekenen',title:'Valutacalculator',subtitle:'Referentiekoersen uit officiële bronnen',amount:'Bedrag',from:'Van',to:'Naar',convert:'Omgerekend bedrag',rate:'Wisselkoers',updated:'Koersdatum',refresh:'Koersen vernieuwen',loading:'Koersen laden…',offline:'Offline — laatst opgeslagen koers wordt getoond indien beschikbaar.',error:'Koers niet beschikbaar voor dit paar.',disclaimer:'Referentiekoersen, geen live handelsprijzen. Meestal gepubliceerd op werkdagen.',swap:'Valuta wisselen',tools:'Hulpmiddelen'},
 pl:{tab:'Przelicz',title:'Przelicznik walut',subtitle:'Kursy referencyjne z oficjalnych źródeł',amount:'Kwota',from:'Z',to:'Na',convert:'Kwota po przeliczeniu',rate:'Kurs wymiany',updated:'Data kursu',refresh:'Odśwież kursy',loading:'Pobieranie kursów…',offline:'Offline — wyświetlamy ostatni zapisany kurs, jeśli jest dostępny.',error:'Kurs dla tej pary jest niedostępny.',disclaimer:'Kursy referencyjne, nie ceny transakcyjne na żywo. Zwykle publikowane w dni robocze.',swap:'Zamień waluty',tools:'Narzędzia'},
 uk:{tab:'Конвертер',title:'Конвертер валют',subtitle:'Довідкові курси з офіційних джерел',amount:'Сума',from:'З',to:'У',convert:'Конвертована сума',rate:'Обмінний курс',updated:'Дата курсу',refresh:'Оновити курси',loading:'Завантаження курсів…',offline:'Немає мережі — показано останній збережений курс, якщо він є.',error:'Курс для цієї пари недоступний.',disclaimer:'Довідкові курси, не біржові ціни в реальному часі. Зазвичай публікуються у робочі дні.',swap:'Поміняти валюти',tools:'Інструменти'},
 ro:{tab:'Conversie',title:'Convertor valutar',subtitle:'Cursuri de referință din surse oficiale',amount:'Sumă',from:'Din',to:'În',convert:'Sumă convertită',rate:'Curs valutar',updated:'Data cursului',refresh:'Actualizează cursurile',loading:'Se încarcă…',offline:'Offline — se afișează ultimul curs salvat, dacă există.',error:'Curs indisponibil pentru această pereche.',disclaimer:'Cursuri de referință, nu prețuri de tranzacționare în timp real. Publicate de regulă în zile lucrătoare.',swap:'Schimbă monedele',tools:'Instrumente'},
 el:{tab:'Μετατροπή',title:'Μετατροπέας νομισμάτων',subtitle:'Τιμές αναφοράς από επίσημες πηγές',amount:'Ποσό',from:'Από',to:'Σε',convert:'Μετατρεπόμενο ποσό',rate:'Συναλλαγματική ισοτιμία',updated:'Ημερομηνία ισοτιμίας',refresh:'Ανανέωση ισοτιμιών',loading:'Φόρτωση ισοτιμιών…',offline:'Εκτός σύνδεσης — εμφανίζεται η τελευταία αποθηκευμένη ισοτιμία.',error:'Δεν υπάρχει διαθέσιμη ισοτιμία για αυτό το ζεύγος.',disclaimer:'Τιμές αναφοράς, όχι ζωντανές τιμές συναλλαγών. Συνήθως δημοσιεύονται τις εργάσιμες ημέρες.',swap:'Ανταλλαγή νομισμάτων',tools:'Εργαλεία'},
 sv:{tab:'Konvertera',title:'Valutaomvandlare',subtitle:'Referenskurser från officiella källor',amount:'Belopp',from:'Från',to:'Till',convert:'Omräknat belopp',rate:'Växelkurs',updated:'Kursdatum',refresh:'Uppdatera kurser',loading:'Hämtar kurser…',offline:'Offline – visar senast sparade kurs om den finns.',error:'Kurs saknas för detta valutapar.',disclaimer:'Referenskurser, inte livepriser för handel. Publiceras normalt på vardagar.',swap:'Byt valutor',tools:'Verktyg'},
 no:{tab:'Konverter',title:'Valutakalkulator',subtitle:'Referansekurser fra offisielle kilder',amount:'Beløp',from:'Fra',to:'Til',convert:'Omregnet beløp',rate:'Valutakurs',updated:'Kursdato',refresh:'Oppdater kurser',loading:'Henter kurser…',offline:'Frakoblet – viser siste lagrede kurs hvis tilgjengelig.',error:'Kurs ikke tilgjengelig for dette paret.',disclaimer:'Referansekurser, ikke live handelspriser. Publiseres vanligvis på virkedager.',swap:'Bytt valuta',tools:'Verktøy'},
 da:{tab:'Omregn',title:'Valutaomregner',subtitle:'Referencekurser fra officielle kilder',amount:'Beløb',from:'Fra',to:'Til',convert:'Omregnet beløb',rate:'Valutakurs',updated:'Kursdato',refresh:'Opdater kurser',loading:'Henter kurser…',offline:'Offline – viser senest gemte kurs, hvis den findes.',error:'Kursen er ikke tilgængelig for dette par.',disclaimer:'Referencekurser, ikke live handelspriser. Udgives normalt på hverdage.',swap:'Skift valuta',tools:'Værktøjer'},
 fi:{tab:'Muunna',title:'Valuuttamuunnin',subtitle:'Virallisten lähteiden viitekurssit',amount:'Summa',from:'Mistä',to:'Mihin',convert:'Muunnettu summa',rate:'Vaihtokurssi',updated:'Kurssin päivämäärä',refresh:'Päivitä kurssit',loading:'Ladataan kursseja…',offline:'Ei verkkoyhteyttä — näytetään viimeisin tallennettu kurssi, jos saatavilla.',error:'Kurssia ei ole saatavilla tälle parille.',disclaimer:'Viitekursseja, eivät reaaliaikaisia kaupankäyntihintoja. Julkaistaan yleensä arkipäivisin.',swap:'Vaihda valuutat',tools:'Työkalut'},
 hi:{tab:'बदलें',title:'मुद्रा परिवर्तक',subtitle:'आधिकारिक स्रोतों से संदर्भ दरें',amount:'राशि',from:'से',to:'में',convert:'परिवर्तित राशि',rate:'विनिमय दर',updated:'दर की तारीख',refresh:'दरें अपडेट करें',loading:'दरें लोड हो रही हैं…',offline:'ऑफ़लाइन — उपलब्ध होने पर पिछली सहेजी गई दर दिखाई जाएगी।',error:'इस मुद्रा जोड़ी के लिए दर उपलब्ध नहीं है।',disclaimer:'संदर्भ दरें हैं, लाइव ट्रेडिंग कीमतें नहीं। आमतौर पर कार्यदिवसों में प्रकाशित होती हैं।',swap:'मुद्राएँ बदलें',tools:'वित्तीय टूल'},
 id:{tab:'Konversi',title:'Konverter mata uang',subtitle:'Kurs referensi dari sumber resmi',amount:'Jumlah',from:'Dari',to:'Ke',convert:'Jumlah hasil konversi',rate:'Nilai tukar',updated:'Tanggal kurs',refresh:'Perbarui kurs',loading:'Memuat kurs…',offline:'Offline — menampilkan kurs tersimpan terakhir jika tersedia.',error:'Kurs tidak tersedia untuk pasangan ini.',disclaimer:'Kurs referensi, bukan harga perdagangan langsung. Biasanya diterbitkan pada hari kerja.',swap:'Tukar mata uang',tools:'Alat keuangan'},
 ar:{tab:'تحويل',title:'محول العملات',subtitle:'أسعار مرجعية من مصادر رسمية',amount:'المبلغ',from:'من',to:'إلى',convert:'المبلغ بعد التحويل',rate:'سعر الصرف',updated:'تاريخ السعر',refresh:'تحديث الأسعار',loading:'جارٍ تحميل الأسعار…',offline:'غير متصل — يتم عرض آخر سعر محفوظ إن وجد.',error:'السعر غير متاح لهذا الزوج.',disclaimer:'أسعار مرجعية وليست أسعار تداول مباشرة. تُنشر عادةً في أيام العمل.',swap:'تبديل العملات',tools:'أدوات مالية'},
 zh:{tab:'换算',title:'货币转换器',subtitle:'来自官方来源的参考汇率',amount:'金额',from:'从',to:'到',convert:'换算金额',rate:'汇率',updated:'汇率日期',refresh:'刷新汇率',loading:'正在加载汇率…',offline:'离线 — 如有缓存则显示最近保存的汇率。',error:'此货币对暂无汇率。',disclaimer:'参考汇率，并非实时交易价格。通常在工作日发布。',swap:'交换货币',tools:'金融工具'},
 ja:{tab:'換算',title:'通貨コンバーター',subtitle:'公式情報源の参考為替レート',amount:'金額',from:'通貨',to:'変換先',convert:'換算額',rate:'為替レート',updated:'レート日付',refresh:'レートを更新',loading:'レートを読み込み中…',offline:'オフライン — 保存済みの最新レートがあれば表示します。',error:'この通貨ペアのレートはありません。',disclaimer:'参考レートであり、リアルタイム取引価格ではありません。通常は営業日に公表されます。',swap:'通貨を入れ替え',tools:'金融ツール'},
 ko:{tab:'환전',title:'환율 계산기',subtitle:'공식 출처의 기준 환율',amount:'금액',from:'기준 통화',to:'대상 통화',convert:'환산 금액',rate:'환율',updated:'환율 날짜',refresh:'환율 새로고침',loading:'환율 불러오는 중…',offline:'오프라인 — 저장된 최신 환율이 있으면 표시합니다.',error:'이 통화 쌍의 환율을 사용할 수 없습니다.',disclaimer:'기준 환율이며 실시간 거래 가격이 아닙니다. 일반적으로 영업일에 게시됩니다.',swap:'통화 바꾸기',tools:'금융 도구'},
 cs:{tab:'Převod',title:'Převodník měn',subtitle:'Referenční kurzy z oficiálních zdrojů',amount:'Částka',from:'Z',to:'Na',convert:'Převedená částka',rate:'Směnný kurz',updated:'Datum kurzu',refresh:'Obnovit kurzy',loading:'Načítání kurzů…',offline:'Offline — zobrazuje se poslední uložený kurz, pokud je k dispozici.',error:'Kurz pro tento pár není dostupný.',disclaimer:'Referenční kurzy, nikoli živé obchodní ceny. Obvykle se zveřejňují v pracovní dny.',swap:'Prohodit měny',tools:'Nástroje'},
 hu:{tab:'Átváltás',title:'Pénzváltó',subtitle:'Hivatalos források referenciaárfolyamai',amount:'Összeg',from:'Erről',to:'Erre',convert:'Átváltott összeg',rate:'Árfolyam',updated:'Árfolyam dátuma',refresh:'Árfolyam frissítése',loading:'Árfolyamok betöltése…',offline:'Offline — az utolsó mentett árfolyam látható, ha elérhető.',error:'Ehhez a devizapárhoz nincs árfolyam.',disclaimer:'Referenciaárfolyamok, nem élő kereskedési árak. Általában munkanapokon frissülnek.',swap:'Pénznemek felcserélése',tools:'Eszközök'},
 hr:{tab:'Pretvori',title:'Pretvarač valuta',subtitle:'Referentni tečajevi iz službenih izvora',amount:'Iznos',from:'Iz',to:'U',convert:'Preračunati iznos',rate:'Tečaj',updated:'Datum tečaja',refresh:'Osvježi tečajeve',loading:'Učitavanje tečajeva…',offline:'Izvan mreže — prikazuje se posljednji spremljeni tečaj ako postoji.',error:'Tečaj za ovaj par nije dostupan.',disclaimer:'Referentni tečajevi, ne cijene trgovanja uživo. Obično se objavljuju radnim danom.',swap:'Zamijeni valute',tools:'Alati'},
 sr:{tab:'Konvertuj',title:'Konverter valuta',subtitle:'Referentni kursevi iz zvaničnih izvora',amount:'Iznos',from:'Iz',to:'U',convert:'Konvertovani iznos',rate:'Kurs',updated:'Datum kursa',refresh:'Osveži kurseve',loading:'Učitavanje kurseva…',offline:'Van mreže — prikazuje se poslednji sačuvani kurs ako postoji.',error:'Kurs za ovaj par nije dostupan.',disclaimer:'Referentni kursevi, ne cene trgovanja uživo. Obično se objavljuju radnim danima.',swap:'Zameni valute',tools:'Alati'}
};
const CURRENCIES = ['AED','ARS','AUD','BDT','BGN','BHD','BND','BOB','BRL','BWP','BYN','CAD','CHF','CLP','CNY','COP','CRC','CZK','DKK','DOP','DZD','EGP','EUR','FJD','GBP','GEL','GHS','HKD','HNL','HRK','HUF','IDR','ILS','INR','ISK','JMD','JOD','JPY','KES','KRW','KWD','KZT','LBP','LKR','MAD','MDL','MKD','MMK','MUR','MXN','MYR','NAD','NGN','NOK','NPR','NZD','OMR','PEN','PHP','PKR','PLN','QAR','RON','RSD','SAR','SEK','SGD','THB','TND','TRY','TWD','TZS','UAH','UGX','USD','UYU','UZS','VND','XAF','XCD','XOF','ZAR','ZMW'];
const $ = id => document.getElementById(id);
const languageSelect = $('language');
const currentLang = () => (languageSelect?.value || localStorage.getItem('payday_language') || 'en').split('-')[0];
const tr = key => (LANGS[currentLang()] || LANGS.en)[key] || LANGS.en[key] || key;
let currencyNames = {};
let rates = {};
let rateDate = '';
let busy = false;
const formatter = (value, code) => {
  try { return new Intl.NumberFormat(navigator.language || 'en', {style:'currency',currency:code,maximumFractionDigits: code==='JPY'||code==='KRW'?0:2}).format(value); }
  catch { return value.toFixed(2)+' '+code; }
};
function addStyles(){
 const style=document.createElement('style');style.textContent=`
 .tabs{grid-template-columns:repeat(5,minmax(0,1fr))}.bottomnav .navitem{min-width:0}
 .fx-panel{display:none}.fx-panel.active{display:block}
 .fx-shell{background:linear-gradient(145deg,#102b46,#126b70);color:#fff;border-radius:22px;padding:20px;margin:4px 0 14px;box-shadow:0 14px 34px #102b4620}
 .fx-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#b8dedb;font-weight:800}
 .fx-shell h2{font-size:24px;line-height:1.15;margin:7px 0}.fx-sub{color:#d5e9e8;font-size:13px;margin:0 0 18px}
 .fx-field{display:grid;gap:6px;margin:12px 0}.fx-field label{font-size:12px;color:#d5e9e8;font-weight:800}
 .fx-field input,.fx-field select{width:100%;border:1px solid #ffffff3b;background:#fff;color:#142c4b;border-radius:12px;padding:13px;font-size:16px;min-width:0}
 .fx-pair{display:grid;grid-template-columns:1fr 48px 1fr;gap:8px;align-items:end}.fx-swap{height:45px;border:1px solid #ffffff45;background:#ffffff17;color:#fff;border-radius:12px;font-size:20px}
 .fx-result{background:#fff;color:#142c4b;border-radius:17px;padding:16px;margin-top:16px}.fx-result small{color:#66778a;font-weight:800;text-transform:uppercase;font-size:10px;letter-spacing:.08em}.fx-value{font-size:clamp(27px,7vw,38px);font-weight:900;letter-spacing:-1px;overflow-wrap:anywhere;margin:5px 0}
 .fx-meta{font-size:12px;color:#66778a;line-height:1.6}.fx-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}.fx-actions button{border:0;border-radius:11px;padding:11px 14px;font-weight:800;background:#dff3ef;color:#125e59}
 .fx-disclaimer{font-size:11px;line-height:1.5;color:#647589;padding:0 3px}.fx-status{font-size:12px;color:#d5e9e8;min-height:18px;margin-top:8px}
 @media(max-width:390px){.tabs{gap:4px}.tab{font-size:10px}.fx-pair{grid-template-columns:1fr 38px 1fr;gap:5px}}
 `;document.head.append(style);
}
function addInterface(){
 const tabs=document.querySelector('.tabs'), nav=document.querySelector('.bottomnav'), main=document.querySelector('.main');
 if(!tabs||!nav||!main||$('fxPanel'))return;
 const tab=document.createElement('button');tab.className='tab';tab.dataset.panel='fxPanel';tab.textContent=tr('tab');tabs.append(tab);
 const navItem=document.createElement('button');navItem.className='navitem';navItem.dataset.panel='fxPanel';navItem.innerHTML='<b>⇄</b><span></span>';navItem.querySelector('span').textContent=tr('tab');nav.append(navItem);
 const activate=()=>{document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id==='fxPanel'));document.querySelectorAll('[data-panel]').forEach(x=>x.classList.toggle('active',x.dataset.panel==='fxPanel'));window.scrollTo({top:0,behavior:'smooth'});};
 tab.addEventListener('click',activate);
 navItem.addEventListener('click',activate);
 const panel=document.createElement('section');panel.id='fxPanel';panel.className='panel fx-panel';
 panel.innerHTML=`<div class="fx-shell"><div class="fx-kicker">${tr('tools')}</div><h2>${tr('title')}</h2><p class="fx-sub">${tr('subtitle')}</p><div class="fx-field"><label for="fxAmount">${tr('amount')}</label><input id="fxAmount" type="number" min="0" step="any" value="100" inputmode="decimal"></div><div class="fx-pair"><div class="fx-field"><label for="fxFrom">${tr('from')}</label><select id="fxFrom"></select></div><button class="fx-swap" id="fxSwap" type="button" aria-label="${tr('swap')}">⇄</button><div class="fx-field"><label for="fxTo">${tr('to')}</label><select id="fxTo"></select></div></div><div class="fx-result"><small>${tr('convert')}</small><div class="fx-value" id="fxResult">—</div><div class="fx-meta" id="fxRate">${tr('loading')}</div><div class="fx-meta" id="fxDate"></div></div><div class="fx-status" id="fxStatus"></div><div class="fx-actions"><button id="fxRefresh" type="button">${tr('refresh')}</button></div></div><p class="fx-disclaimer">${tr('disclaimer')}</p>`;
 main.append(panel);
 const from=$('fxFrom'),to=$('fxTo');
 CURRENCIES.forEach(code=>{const label=code+(currencyNames[code]?' — '+currencyNames[code]:'');from.add(new Option(label,code));to.add(new Option(label,code));});
 const preferred=document.getElementById('currency')?.value||'EUR';from.value=CURRENCIES.includes(preferred)?preferred:'EUR';to.value=from.value==='USD'?'EUR':'USD';
 $('fxAmount').addEventListener('input',()=>calculate());
 from.addEventListener('change',()=>loadRate(true));
 to.addEventListener('change',()=>loadRate(true));
 $('fxSwap').addEventListener('click',()=>{const x=from.value;from.value=to.value;to.value=x;loadRate(true)});
 $('fxRefresh').addEventListener('click',()=>loadRate(true));
}
function refreshLabels(){
 const active=document.querySelector('.tab.active[data-panel="fxPanel"]');
 const tab=document.querySelector('.tab[data-panel="fxPanel"]'),nav=document.querySelector('.navitem[data-panel="fxPanel"]');
 if(tab)tab.textContent=tr('tab');if(nav)nav.querySelector('span').textContent=tr('tab');
 const panel=$('fxPanel');if(!panel)return;
 const oldTab=document.querySelector('.tab[data-panel=fxPanel]'),oldNav=document.querySelector('.navitem[data-panel=fxPanel]');
 const keep=active?'fxPanel':null;
 const amount=$('fxAmount')?.value||'100',from=$('fxFrom')?.value||'EUR',to=$('fxTo')?.value||'USD';
 const current=!!panel.classList.contains('active');
 panel.remove();oldTab?.remove();oldNav?.remove();
 addInterface();
 $('fxAmount').value=amount;$('fxFrom').value=from;$('fxTo').value=to;
 if(current){document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id==='fxPanel'));document.querySelectorAll('[data-panel]').forEach(x=>x.classList.toggle('active',x.dataset.panel==='fxPanel'));}
 calculate();
}
async function loadCurrencies(){
 try{
  const response=await fetch(API+'/currencies',{cache:'no-store'});if(!response.ok)throw new Error('currencies');
  const rows=(await response.json()).filter(x=>x.iso_code!=='RUB');currencyNames=Object.fromEntries(rows.map(x=>[x.iso_code,x.name]));
  const mainSelect=$('currency');if(mainSelect){
   const selected=mainSelect.value||'EUR';mainSelect.replaceChildren();
   rows.sort((a,b)=>a.iso_code.localeCompare(b.iso_code)).forEach(x=>mainSelect.add(new Option(x.iso_code+' — '+x.name,x.iso_code)));
   if(!rows.some(x=>x.iso_code===selected))mainSelect.add(new Option(selected,selected));
   mainSelect.value=selected;
  }
  if($('fxFrom')){const f=$('fxFrom').value,t=$('fxTo').value;['fxFrom','fxTo'].forEach(id=>$(id).replaceChildren(...rows.sort((a,b)=>a.iso_code.localeCompare(b.iso_code)).map(x=>new Option(x.iso_code+' — '+x.name,x.iso_code))));$('fxFrom').value=f;$('fxTo').value=t;}
 }catch(error){console.warn('PayDay: currency catalogue unavailable; using bundled currency list.',error);currencyNames=Object.fromEntries(CURRENCIES.map(x=>[x,x]));}
}
function cacheRates(from,to,record){try{const all=JSON.parse(localStorage.getItem(CACHE_KEY)||'{}');all[from+'_'+to]=record;localStorage.setItem(CACHE_KEY,JSON.stringify(all));}catch{}}
function getCached(from,to){try{return JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')[from+'_'+to]||null}catch{return null}}
async function loadRate(force=false){
 const from=$('fxFrom').value,to=$('fxTo').value;
 if(from===to){rates={base:from,quote:to,rate:1};rateDate=new Date().toISOString().slice(0,10);$('fxStatus').textContent='';renderConversion();return}
 if(busy)return;busy=true;$('fxStatus').textContent=tr('loading');
 try{
  if(!navigator.onLine)throw new Error('offline');
  const response=await fetch(API+'/rate/'+encodeURIComponent(from.toLowerCase())+'/'+encodeURIComponent(to.toLowerCase()),{cache:force?'no-store':'default'});
  if(!response.ok)throw new Error('rate');
  const record=await response.json();if(!Number.isFinite(Number(record.rate)))throw new Error('invalid rate');
  if(record.base!==from||record.quote!==to)throw new Error('invalid pair');
  rates=record;rateDate=record.date||'';cacheRates(from,to,record);$('fxStatus').textContent='';
 }catch(error){
  const cached=getCached(from,to);
  if(cached){rates=cached;rateDate=cached.date||'';$('fxStatus').textContent=tr('offline')}
  else{$('fxStatus').textContent=error.message==='offline'?tr('offline'):tr('error');rates={};rateDate=''}
 }finally{busy=false;renderConversion()}
}
function calculate(){renderConversion()}
function renderConversion(){
 const amount=Math.max(0,Number($('fxAmount').value)||0),from=$('fxFrom').value,to=$('fxTo').value;
 const valid=rates.base===from&&rates.quote===to&&Number.isFinite(Number(rates.rate))&&Number(rates.rate)>0;
 $('fxResult').textContent=valid?formatter(amount*Number(rates.rate),to):'—';
 $('fxRate').textContent=valid?'1 '+from+' = '+new Intl.NumberFormat('en',{maximumSignificantDigits:9}).format(Number(rates.rate))+' '+to:tr('error');
 $('fxDate').textContent=valid&&rateDate?tr('updated')+': '+rateDate:'';
}
function install(){
 addStyles();addInterface();loadCurrencies().then(()=>{if($('fxFrom'))loadRate()});
 languageSelect?.addEventListener('change',()=>setTimeout(refreshLabels,0));
 window.addEventListener('online',()=>loadRate(true));
 window.addEventListener('offline',()=>{if($('fxStatus'))$('fxStatus').textContent=tr('offline')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
