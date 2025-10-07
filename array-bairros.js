const users = [
{ username: 'admin', password: '1234', name: 'Administrador' },
{ username: 'user', password: 'senha', name: 'Usuário Teste' }
];


const form = document.getElementById('loginForm');
const msg = document.getElementById('message');
const fillDemo = document.getElementById('fillDemo');


fillDemo.addEventListener('click', () => {
document.getElementById('username').value = 'admin';
document.getElementById('password').value = '1234';
msg.textContent = '';
});


form.addEventListener('submit', (e) => {
e.preventDefault();
msg.textContent = '';


const username = form.username.value.trim();
const password = form.password.value;



if (!username || !password) {
msg.textContent = 'Preencha usuário e senha.';
return;
}


const found = users.find(u => u.username === username && u.password === password);


if (found) {

localStorage.setItem('loggedUser', JSON.stringify({ username: found.username, name: found.name, loggedAt: Date.now() }));
msg.textContent = '';

showDashboard(found.name);
} else {
msg.textContent = 'Usuário ou senha incorretos.';
}
});


function showDashboard(name) {

document.body.innerHTML = `\n <main style="min-height:100vh;display:grid;place-items:center;background:linear-gradient(180deg,#071025 0%,#081426 60%);color:#e6eef6">\n <div style="width:720px;padding:26px;border-radius:12px;background:rgba(255,255,255,0.02);box-shadow:0 8px 30px rgba(2,6,23,0.6)">\n <h2 style=\"margin:0 0 6px\">Bem-vindo, ${escapeHtml(name)}!</h2>\n <p style=\"color:var(--muted)\">Você está logado (simulação). Aqui você implementaria o painel real depois de autenticar no servidor.</p>\n <div style=\"margin-top:16px;display:flex;gap:8px\">\n <button id=\"logout\" style=\"padding:10px 12px;border-radius:8px;border:0;background:#ef4444;color:#fff;cursor:pointer\">Sair</button>\n </div>\n </div>\n </main>`;


const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
localStorage.removeItem('loggedUser');
location.reload();
});
}



function escapeHtml(str) {
return str.replace(/[&<>\"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":"&#39;"}[m]));
}


const existing = localStorage.getItem('loggedUser');
if (existing) {
try {
const obj = JSON.parse(existing);
showDashboard(obj.name || obj.username);
} catch (err) {
localStorage.removeItem('loggedUser');
}
}
