let times = JSON.parse(localStorage.getItem("times")) || [];
let partidas = [];

function salvar(){
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("partidas", JSON.stringify(partidas));
}

function adicionarTime(){
    let time = document.getElementById("time").value;
    if(time.trim()==="") return alert("Digite o nome do time!");
    
    times.push(time);
    salvar();
    listarTimes();
    document.getElementById("time").value="";
}

function listarTimes(){
    if(document.getElementById("listaTimes")){
        document.getElementById("listaTimes").innerHTML = times.map(t => `<li>${t}</li>`).join("");
    }
}
listarTimes();

function gerarChaveamento(){
    if(times.length < 2) return alert("Cadastre ao menos 2 times!");
    
    times = times.sort(()=> Math.random()-0.5);
    partidas = [];

    for(let i=0; i<times.length; i+=2){
        partidas.push({
            time1: times[i],
            time2: times[i+1] || "bye",
            vencedor: null
        });
    }
    salvar();
    window.location="chaveamento.html";
}

function mostrarPartidas(){
    let div = document.getElementById("tabela");
    if(!div) return;

    if(partidas.length==1 && partidas[0].vencedor){
        div.innerHTML = `<h2>🏆 Campeão: ${partidas[0].vencedor} 🏆</h2>`;
        return;
    }

    div.innerHTML = "<h2>Partidas</h2>";
    partidas.forEach((p,i)=>{
        div.innerHTML += `
        <div class="match">
            <strong>Jogo ${i+1}</strong><br>
            ${p.time1} vs ${p.time2}<br>
            <button onclick="vencer(${i},1)">${p.time1}</button>
            <button onclick="vencer(${i},2)">${p.time2}</button>
        </div>`;
    })
}
mostrarPartidas();

function vencer(i,op){
    partidas[i].vencedor = op==1? partidas[i].time1 : partidas[i].time2;
    proximaFase();
}

function proximaFase(){
    let vencedores = partidas.filter(p=>p.vencedor).map(p=>p.vencedor);
    if(vencedores.length == partidas.length){
        times = vencedores;
        partidas = [];
        for(let i=0;i<times.length;i+=2){
            partidas.push({
                time1: times[i],
                time2: times[i+1]||"bye",
                vencedor:null
            });
        }
        salvar();
        mostrarPartidas();
    }
}

function reiniciar(){
    if(confirm("Deseja apagar tudo?")){
        localStorage.clear();
        location="index.html";
    }
}