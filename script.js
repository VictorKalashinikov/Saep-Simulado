// --- CARGA INICIAL DE EQUIPAMENTOS NO LOCALSTORAGE ---
function inicializarBanco() {
    const equipamentosExistentes = JSON.parse(localStorage.getItem("equipamentos"));
    
    // Se não houver equipamentos gravados, insere pelo menos 4 equipamentos padrão
    if (!equipamentosExistentes || equipamentosExistentes.length === 0) {
        const equipamentosIniciais = [
            { id: 1, nome: "Torno CNC Giddings" },
            { id: 2, nome: "Prensa Hidráulica 50T" },
            { id: 3, nome: "Compressor Industrial" },
            { id: 4, nome: "Esteira Rolante Principal" }
        ];
        localStorage.setItem("equipamentos", JSON.stringify(equipamentosIniciais));
    }
}

// Executa a inicialização de dados
inicializarBanco();

// --- 1. CADASTRO DE USUÁRIO ---
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Validação de e-mail duplicado
        const jaExiste = usuarios.some(u => u.email === email);
        if (jaExiste) {
            alert("Erro: Este e-mail já está cadastrado!");
            return;
        }

        // Adiciona novo usuário
        const novoUsuario = {
            id: Date.now(),
            nome: nome,
            email: email,
            senha: senha
        };

        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    });
}

// --- 2. LOGIN DE USUÁRIO ---
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Procura credenciais válidas
        const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

        if (!usuarioValido) {
            alert("Erro: E-mail ou senha incorretos!");
            return;
        }

        // Cria a sessão ativa
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
        window.location.href = "painel.html";
    });
}

// --- 3. PAINEL DE CHAMADOS (PROTEGIDO) ---
const tabelaChamados = document.getElementById("tabelaChamados");
if (tabelaChamados) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    // Proteção de acesso
    if (!usuarioLogado) {
        alert("Acesso negado! Faça login primeiro.");
        window.location.href = "index.html";
    } else {
        document.getElementById("nomeUsuarioLogado").innerText = usuarioLogado.nome;

        // Botão de Logout
        document.getElementById("btnSair").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "index.html";
        });

        // Carrega chamados e simula JOIN com Equipamentos e Usuários
        const chamados = JSON.parse(localStorage.getItem("chamados")) || [];
        const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        tabelaChamados.innerHTML = "";

        if (chamados.length === 0) {
            tabelaChamados.innerHTML = `<tr><td colspan="6">Nenhum chamado registrado.</td></tr>`;
        } else {
            chamados.forEach(c => {
                // Simulação do JOIN pelo ID
                const eq = equipamentos.find(e => e.id === Number(c.equipamento_id));
                const us = usuarios.find(u => u.id === Number(c.usuario_id));

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>#${c.id}</td>
                    <td>${eq ? eq.nome : "Desconhecido"}</td>
                    <td>${c.descricao}</td>
                    <td>${c.prioridade}</td>
                    <td>${c.status}</td>
                    <td>${us ? us.nome : "Desconhecido"}</td>
                `;
                tabelaChamados.appendChild(tr);
            });
        }
    }
}

// --- 4. ABRIR CHAMADO (PROTEGIDO) ---
const formAbrirChamado = document.getElementById("formAbrirChamado");
if (formAbrirChamado) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        alert("Acesso negado! Faça login primeiro.");
        window.location.href = "index.html";
    } else {
        // Preenche o <select> com os equipamentos
        const selectEquipamento = document.getElementById("selectEquipamento");
        const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];

        equipamentos.forEach(eq => {
            const option = document.createElement("option");
            option.value = eq.id;
            option.innerText = eq.nome;
            selectEquipamento.appendChild(option);
        });

        // Registra o chamado
        formAbrirChamado.addEventListener("submit", (e) => {
            e.preventDefault();

            const equipamento_id = selectEquipamento.value;
            const descricao = document.getElementById("descricao").value.trim();
            const prioridade = document.getElementById("prioridade").value;

            if (!equipamento_id) {
                alert("Erro: Selecione um equipamento válido!");
                return;
            }

            const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

            const novoChamado = {
                id: Math.floor(1000 + Math.random() * 9000), // Gera um ID único simples
                equipamento_id: Number(equipamento_id),
                descricao: descricao,
                prioridade: prioridade,
                status: "Aberto",
                usuario_id: usuarioLogado.id
            };

            chamados.push(novoChamado);
            localStorage.setItem("chamados", JSON.stringify(chamados));

            alert("Chamado registrado com sucesso!");
            window.location.href = "painel.html";
        });
    }
}