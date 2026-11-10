import { Capacitor } from '@capacitor/core';
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

const FIAT_API='https://api.frankfurter.dev/v2';
const CRYPTO_API='https://api.coingecko.com/api/v3/simple/price';
const CRYPTO={
 BTC:{id:'bitcoin',name:'Bitcoin'},ETH:{id:'ethereum',name:'Ethereum'},USDT:{id:'tether',name:'Tether'},USDC:{id:'usd-coin',name:'USD Coin'},
 BNB:{id:'binancecoin',name:'BNB'},SOL:{id:'solana',name:'Solana'},XRP:{id:'ripple',name:'XRP'},DOGE:{id:'dogecoin',name:'Dogecoin'},
 ADA:{id:'cardano',name:'Cardano'},TON:{id:'the-open-network',name:'Toncoin'},LTC:{id:'litecoin',name:'Litecoin'},TRX:{id:'tron',name:'TRON'}
};
const $=id=>document.getElementById(id);
const state={fiat:{},crypto:{},date:'',last:null};
const fiatCodes=['AED','ARS','AUD','BGN','BRL','CAD','CHF','CNY','CZK','DKK','EUR','GBP','HKD','HUF','IDR','ILS','INR','ISK','JPY','KRW','MXN','MYR','NOK','NZD','PHP','PLN','RON','RSD','SAR','SEK','SGD','THB','TRY','UAH','USD','ZAR'];
const currencies=[...fiatCodes.map(code=>({code,label:code,type:'fiat'})),...Object.entries(CRYPTO).map(([code,x])=>({code,label:code+' — '+x.name,type:'crypto'}))];
function populate(){for(const id of ['from','to']){currencies.forEach(c=>$(id).add(new Option(c.label,c.code)));} $('from').value='EUR';$('to').value='TRY';}
async function fetchFiat(){
 const r=await fetch(FIAT_API+'/latest?base=USD');if(!r.ok)throw Error('Fiat rates unavailable');const rows=await r.json();
 state.fiat={USD:1};for(const x of rows)if(x.quote)state.fiat[x.quote]=Number(x.rate);
 state.date=rows[0]?.date||new Date().toISOString().slice(0,10);
}
async function fetchCrypto(){
 const ids=[...new Set(Object.values(CRYPTO).map(x=>x.id))].join(',');
 const r=await fetch(CRYPTO_API+'?ids='+encodeURIComponent(ids)+'&vs_currencies=usd');if(!r.ok)throw Error('Crypto prices unavailable (provider limit or network).');
 const data=await r.json();state.crypto={};for(const [code,x] of Object.entries(CRYPTO)){const p=Number(data[x.id]?.usd);if(p>0)state.crypto[code]=p;}
}
function usdValue(code){return CRYPTO[code]?state.crypto[code]:state.fiat[code]?1/state.fiat[code]:null;}
function fmt(n,code){const locale=localStorage.getItem('converter_locale')||navigator.language||'en';try{return new Intl.NumberFormat(locale,{maximumFractionDigits:code in CRYPTO?8:2}).format(n)+' '+code}catch{return n+' '+code}}
function calculate(){
 const amount=Math.max(0,Number($('amount').value)||0),from=$('from').value,to=$('to').value;
 const a=usdValue(from),b=usdValue(to);
 if(!(a>0&&b>0)){ $('output').textContent='—';$('rate').textContent='Rate unavailable. Refresh or try later.';return; }
 const result=amount*a/b; $('output').textContent=fmt(result,to);$('rate').textContent='1 '+from+' = '+fmt(a/b,to);$('updated').textContent='Fiat reference date: '+(state.date||'—')+' · Crypto prices may update independently.';
 state.last=$('output').textContent;
}
async function refresh(){
 $('status').textContent='Updating exchange rates…';$('refresh').disabled=true;
 try{await Promise.all([fetchFiat(),fetchCrypto()]);$('status').textContent='Rates updated.';calculate();}
 catch(e){$('status').textContent=e.message+' Existing displayed values may be outdated.';calculate();}
 finally{$('refresh').disabled=false;}
}
$('amount').addEventListener('input',calculate);$('from').addEventListener('change',calculate);$('to').addEventListener('change',calculate);
$('swap').addEventListener('click',()=>{const v=$('from').value;$('from').value=$('to').value;$('to').value=v;calculate();});
$('refresh').addEventListener('click',refresh);
$('copy').addEventListener('click',async()=>{if(state.last){try{await navigator.clipboard.writeText(state.last);$('status').textContent='Copied.'}catch{$('status').textContent='Copy is not available on this device.'}}});
populate();refresh();window.addEventListener('online',refresh);
const ADMOB_APP_ID='ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY';
const ADMOB_BANNER_ID='ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ';
let bannerHidden=false;
async function startAds(){
 if(Capacitor.getPlatform()!=='android'||!navigator.onLine||bannerHidden)return;
 if(ADMOB_APP_ID.includes('XXXX')||ADMOB_BANNER_ID.includes('XXXX')){$('ad-slot').textContent='AdMob IDs required';return;}
 try{
  await AdMob.initialize();
  await AdMob.showBanner({adId:ADMOB_BANNER_ID,adSize:BannerAdSize.ADAPTIVE_BANNER,position:BannerAdPosition.BOTTOM,margin:0,isTesting:true});
  $('adbar').classList.remove('hidden');
 }catch(e){console.warn('AdMob banner unavailable',e);}
}
$('hide-ad').addEventListener('click',async()=>{bannerHidden=true;$('adbar').classList.add('hidden');if(Capacitor.getPlatform()==='android'){try{await AdMob.hideBanner()}catch{}}});
startAds();window.addEventListener('online',startAds);
