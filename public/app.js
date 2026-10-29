(function(){
var G=500,$=function(i){return document.getElementById(i)},O=location.origin,P=new URLSearchParams(location.search),
esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var store={g:function(k){try{return localStorage.getItem(k)||''}catch(e){return''}},s:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
var K='';try{K=sessionStorage.getItem('nw_k')||''}catch(e){}
var regs=[],utm=(P.get('src')||'').slice(0,30);
$('s').innerHTML=['College club or WhatsApp group','Professor or T&P cell','Instagram or LinkedIn','NxtWave email or WhatsApp','Other'].map(function(s){return'<option>'+esc(s)+'</option>'}).join('');
if(P.get('ref'))$('rf').value=P.get('ref').toUpperCase().slice(0,6);
function api(p,o){return fetch(p,o).then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok)throw new Error(j.error||'Something went wrong. Please try again.');return j})})}
function cp(t,b){var d=function(){var o=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=o},1500)};
try{navigator.clipboard.writeText(t).then(d,fb)}catch(e){fb()}
function fb(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();d()}}
function hero(){api('/api/stats').then(function(j){$('hb').style.width=Math.min(100,j.count/G*100)+'%';$('hc').textContent=j.count+' of '+G+' free seats claimed'}).catch(function(){})}
function ok(r){$('rc').hidden=true;var o=$('ok');o.hidden=false;
var m='Final-years! Free live workshop: “Build Your First AI Project in 60 Minutes”. You leave with a working AI project and a GitHub link. Register in 20 seconds: '+O+'/?ref='+r.code;
o.innerHTML='<h2>You’re in, '+esc(r.name.split(' ')[0])+'. Seat confirmed.</h2><p class="mu">Joining details arrive on WhatsApp 24 hours before we start.</p><div class="code">'+esc(r.code)+'</div><p><b>This is your referral code.</b> Get 3 friends to register with your link and unlock the AI Project Starter Kit: prompt pack, GitHub template and resume bullets.</p><div class="bar"><i style="width:'+Math.min(100,r.referrals/3*100)+'%"></i></div><p class="sm mu">'+r.referrals+' of 3 friends joined. Top 5 referrers also win cash prizes.</p><div class="row"><a class="btn" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(m)+'">Share on WhatsApp</a><button class="btn g" id="cb">Copy message</button><button class="btn g" id="an">Register a friend</button></div>';
$('cb').onclick=function(e){cp(m,e.target)};
$('an').onclick=function(){o.hidden=true;$('rc').hidden=false;['n','p','c','rf'].forEach(function(i){$(i).value=''})}}
$('go').onclick=function(){var v=function(i){return $(i).value.trim()},b=$('go');b.disabled=true;
api('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:v('n'),phone:v('p'),college:v('c'),branch:v('b'),source:v('s'),ref:v('rf'),utm:utm})})
.then(function(r){$('er').textContent='';store.s('nw_me',r.code);hero();ok(r)}).catch(function(e){$('er').textContent=e.message}).then(function(){b.disabled=false})};
function tally(f){var m={};regs.forEach(function(r){var k=f(r);m[k]=(m[k]||0)+1});return Object.keys(m).map(function(k){return[k,m[k]]}).sort(function(a,b){return b[1]-a[1]})}
function bars(a){return a.length?a.map(function(x){return'<div class="br"><span>'+esc(x[0])+'</span><div class="bar s"><i style="width:'+x[1]/a[0][1]*100+'%"></i></div><b>'+x[1]+'</b></div>'}).join(''):'<p class="sm mu">No registrations yet.</p>'}
function dash(){var N=regs.length,rf=regs.filter(function(r){return r.source==='Friend referral'}).length,pr=[300,250,200,150,100],md=['1st','2nd','3rd','4th','5th'];
$('st').innerHTML=[[N,'registered'],[Math.round(N/G*100)+'%','of the 500 goal'],[(N?Math.round(rf/N*100):0)+'%','came via referral'],[Math.max(0,G-N),'still to go']].map(function(x){return'<div class="stat"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('');
$('d1').innerHTML=bars(tally(function(r){return r.source}));
$('d2').innerHTML=bars(tally(function(r){return r.college}).slice(0,6));
$('d3').innerHTML=bars(tally(function(r){return r.ref}).filter(function(x){return x[0]}).slice(0,5).map(function(x,i){var p=regs.filter(function(r){return r.code===x[0]})[0];return[md[i]+': '+(p?p.name:x[0])+' (₹'+pr[i]+')',x[1]]}))}
function adm(){if(!K)K=(prompt('Admin key (Render dashboard, Environment, ADMIN_KEY)')||'').trim();
if(!K){$('am').textContent='Enter the admin key to see registrations.';return}
api('/api/admin/regs',{headers:{'x-admin-key':K}}).then(function(j){regs=j.regs;$('am').textContent='';try{sessionStorage.setItem('nw_k',K)}catch(e){}dash()}).catch(function(e){K='';$('am').textContent=e.message+' Use “Change admin key” to retry.'})}
$('ak').onclick=function(){K='';adm()};
$('dl').onclick=function(){fetch('/api/admin/export',{headers:{'x-admin-key':K}}).then(function(r){if(!r.ok)throw 0;return r.blob()}).then(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='registrations.csv';a.click()}).catch(function(){$('am').textContent='Enter a valid admin key first.'})};
var T={club:function(c,k){return'Hi! I’m reaching out from NxtWave. We’re running a free 60-minute live workshop, “Build Your First AI Project in 60 Minutes”, for final-year engineering students. No AI experience needed, and everyone leaves with a working project and a GitHub link for their resume.\n\nCould you share it with '+(c||'your college')+'’s final-years? Registration takes 20 seconds: '+O+'/?src=club\n\nI can send a poster too. Thank you!'},
grp:function(c,k){return'Final-years'+(c?' of '+c:'')+': tired of a resume with no real project?\n\nFree live workshop, 60 minutes: build your first AI project and leave with a GitHub link. No prior AI knowledge needed.\n\nRegister in 20 seconds: '+O+'/?src=group'+(k?'&ref='+k:'')+'\nSeats are limited.'},
fac:function(c,k){return'Respected Sir/Madam,\n\nNxtWave is conducting a free 60-minute hands-on workshop for final-year students, “Build Your First AI Project in 60 Minutes”. It helps students add a practical, demonstrable AI project to their placement profile.\n\nWe would be grateful if you could share the registration link with '+(c||'your')+' final-year students: '+O+'/?src=faculty\n\nParticipants receive an e-certificate. Thank you for your support.'}};
function kit(){var t=T[$('ka').value]($('kc').value.trim(),$('kk').value.trim().toUpperCase());$('ko').textContent=t;$('kwa').href='https://wa.me/?text='+encodeURIComponent(t)}
['ka','kc','kk'].forEach(function(i){$(i).oninput=kit;$(i).onchange=kit});
$('kcp').onclick=function(e){cp($('ko').textContent,e.target)};
var tb=document.querySelectorAll('#tabs button');
tb.forEach(function(b){b.onclick=function(){tb.forEach(function(x){x.classList.toggle('on',x===b)});['reg','dash','kit'].forEach(function(i){$(i).hidden=i!==b.dataset.t});
if(b.dataset.t==='dash')adm();if(b.dataset.t==='kit'){var me=store.g('nw_me');if(me&&!$('kk').value)$('kk').value=me;kit()}}});
hero();var me=store.g('nw_me');if(me)api('/api/me/'+encodeURIComponent(me)).then(ok).catch(function(){store.s('nw_me','')});
})();
