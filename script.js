
async function cadastrarUsuario(nome, email, senha) {

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: senha,

        options: {
            data: {
                nome: nome
            }
        }
    });

    if (error) {
        console.error("Erro no cadastro:", error.message);
        return;
    }

    console.log("Cadastro realizado:", data);

    alert("Cadastro realizado! Verifique seu e-mail, se solicitado.");
}
