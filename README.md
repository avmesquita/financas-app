
# Finanças App


## Apresentação

A ideia do sistema é permitir que qualquer pessoa possa ter um sistema de educação financeira e controle de finanças pessoais, apesar de ser útil para pequenas empresas, pois é mono-usuário, ou seja, cada usuário possui suas contas e lançamentos.


## Conceito

Controlar o fluxo de caixa com os lançamentos de crédito ou débito.


## Requisitos

- Frontend para contole de contas e lançamentos com autenticação
- Serviço que faça o controle de contas e lançamentos
- Serviço do consolidado diário


## Documentação

- [Documentos de Desenvolvimento](https://financas-app.github.io)
- [Frontend](https://github.com/avmesquita/financas-app/tree/main/frontend#readme)
- [API Controle](https://github.com/avmesquita/financas-app/blob/main/api-controle/README.md)
- [API Consolidado](https://github.com/avmesquita/financas-app/tree/main/api-consolidado#readme)
- [Publicação](https://github.com/avmesquita/financas-app/tree/main/publicar#readme)


## Configuração

Como o frontend é um software estático após sua transpilação, a carga dos parâmetros de ambiente (environment) é feita em tempo de compilação e não de execução. Sendo assim precisa ser configurado antes da compilação.

Editar o arquivo "frontend/.env" com os dados da API-CONTROLE e API-CONSOLIDADO a apontar para os serviços publicados

```bash
    > copy .env.sample .env
```


## Publicação com Docker

```bash
    > cd publicar

    > copy .env.exemplo .env

    > docker-compose build --no-cache --pull

    > docker-compose up -d --force-recreate
```

## Versão sem backend

Nesta versão sem backend, os dados são armazenados apenas no navegador.

```bash
    > docker run -it - --name finance-app -p 80:80 avmesquita/finance-app
```


## Licença

Este software é gratuito e de código livre, GNU GENERAL PUBLIC LICENSE 3.


## Contribuição

Este projeto tem como objetivo criar um software livre para administração de lançamentos financeiros simples de forma a democratizar a utilização de um gestor de finanças. O projeto é criado e mantido por [Andre Mesquita](https://andremesquita.com), a aproveitar minha paixão de criar soluções e desenvolver software. 

Se for útil para ti e quiseres pagar um café ou contribuir, será aceito.

- [Café](https://buymeacoffee.com/avmesquita)
- [Paypal](https://www.paypal.com/paypalme/avmesquita)
- [Github Sponsor](https://github.com/sponsors/avmesquita)
- Bitcoin bc1qcnxq2n5geavxwdkcv534agkwtr6ghgkzcdsy6y
- Ethereum 0xBDF7C6E333696EEEa51C527E3C18A70C7801A4bf
