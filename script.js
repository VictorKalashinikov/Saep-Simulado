// --- 1. CADASTRO DE USUÁRIO ---
const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
    // Escuta o envio do formulário de cadastro
    formCadastro.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita recarregar a página ao enviar[cite: 9]

        // Captura os valores dos campos
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Envia o cadastro ao Supabase com o nome nos metadados do usuário[cite: 9]
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: senha,
            options: {
                data: { nome: nome } // Armazena o nome no perfil[cite: 9]
            }
        });

        if (error) {
            alert("Erro no cadastro: " + error.message);
            return;
        }

        alert("Cadastro realizado! Faça login para continuar.");
        window.location.href = "index.html"; // Redireciona para o login[cite: 7]
    });
}

// --- 2. LOGIN DE USUÁRIO ---
const formLogin = document.getElementById("formLogin");
if (formLogin) {
    // Escuta o envio do formulário de login
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita o recarregamento

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Autentica o usuário no Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            alert("Erro no login: " + error.message);
            return;
        }

        // Redireciona para a home caso o login dê certo
        window.location.href = "home.html";
    });
}

// --- 3. PROTEÇÃO E LOGOUT DA HOME ---
const infoUsuario = document.getElementById("infoUsuario");
if (infoUsuario) {
    // Função autoexecutável para validar se existe usuário logado na home
    async function verificarAutenticacao() {
        const { data, error } = await supabaseClient.auth.getUser();[cite: 7]

        // Se não houver sessão ativa, redireciona de volta ao login[cite: 7]
        if (error || !data.user) {[cite: 7]
            window.location.href = "index.html";[cite: 7]
            return;
        }

        // Recupera o nome salvo nos metadados ou usa o próprio e-mail[cite: 7]
        const nome = data.user.user_metadata?.nome || data.user.email;
        infoUsuario.innerText = "Bem-vindo, " + nome + "!";
    }

    verificarAutenticacao();

    // Evento para deslogar
    const btnSair = document.getElementById("btnSair");
    if (btnSair) {
        btnSair.addEventListener("click", async () => {
            await supabaseClient.auth.signOut(); // Encerra a sessão no Supabase
            window.location.href = "index.html"; // Manda de volta para o login
        });
    }
}