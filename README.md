# NLW #4 - Cálculo de NPS

Essa aplicação foi desenvolvida para realizar o cálculo __NPS__ (Net Promoter Score) e claro, treinar o desenvolvimento backend utilizando Node.JS.

[![Assista o vídeo dessa aplicação!](/src/thumb.png)](https://youtu.be/MFa6CleR6Lw)

## Instalação
Para rodar essa aplicação em seu computador você deve clonar esse repositório em sua máquina e executar os seguintes comandos

```yarn install``` -> para instalar todas as dependências

```yarn dev``` -> para iniciar o servidor

## Tecnologias
Para desenvolver essa aplicação utilizei o framework ```express``` do Node, que me permite criar qualquer tipo de aplicativo e ferramenta do lado do servidor (backend) em JavaScript. Para criar as migrations, utilizei o ```Object Relational Mapper TypeORM```, que funciona como uma técnica de mapeamento dos objetos relacionais. O banco de dados utilizados foi o ```SQLite```, por ser uma aplicação com poucas requisições. Para enviar e-mails utilizei o módulo ```nodemailer``` e por fim, para criar o template do e-mail utilizei o ```Handlebars``` que me permitiu modelar a mensagem de envio de e-mail utilizando JavaScript e CSS.
