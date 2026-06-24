const usuarios = [];
const fichas = [];

// CADASTRO
function cadastrarUsuario(req, res) {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
        return res.send(`
            <h1>Erro ao realizar cadastro</h1>
            <p>Preencha todos os campos</p>
            <a href="/cadastro.html">Voltar</a>
        `);
    }

    const usuarioExistente = usuarios.find(u => u.email === email);

    if (usuarioExistente) {
        return res.redirect("/cadastro?erro=email");
    }

    const novoUsuario = {
        id: Date.now(),
        nome,
        email,
        senha,
        tipo
    };

    usuarios.push(novoUsuario);

    console.log("Usuários:", usuarios);

    // REDIRECIONAMENTO
    if (tipo === "usuario") {
    return res.redirect(`/ficha.html?email=${encodeURIComponent(email)}`);
}

    if (tipo === "professor") {
        return res.redirect(`/ficha-professor.html?email=${encodeURIComponent(email)}`);
    }

    return res.send("Tipo inválido");
}

// FICHA USUÁRIO
function fichaUsuario(req, res) {
    const { idade, altura, peso, objetivo, nivel, email } = req.body;

    if (!idade || !altura || !peso || !objetivo || !nivel || !email) {
        return res.send("Preencha todos os campos");
    }

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        return res.send("Usuário não encontrado");
    }

    fichas.push({
        usuarioEmail: email,
        idade,
        altura,
        peso,
        objetivo,
        nivel
    });

    console.log("Fichas:", fichas);

    return res.redirect("/login.html");
}

// LOGIN
function realizarLogin(req, res) {
    const { email, senha } = req.body;

    const usuario = usuarios.find(
        u => u.email === email && u.senha === senha
    );

    if (!usuario) {
        return res.redirect("/login?erro=login");
    }

    // REDIRECIONAMENTO POR TIPO
    if (usuario.tipo === "usuario") {
        return res.redirect("/dashboard-usuario.html");
    }

    if (usuario.tipo === "professor") {
        return res.redirect("/dashboard-professor.html");
    }

    return res.redirect("/index.html");
}

module.exports = {
    cadastrarUsuario,
    fichaUsuario,
    realizarLogin
};