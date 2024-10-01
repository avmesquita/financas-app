
# DATABASE


## Tecnologia

O database escolhido para esta implementação foi o MySQL 8.0.37.


## Configuração

Se o banco de dados não existir, criá-lo.

```bash
   CREATE DATABASE IF NOT EXISTS financasdb
```

O passo seguinte será gerar a estrutura.

```bash
   > mysql -u root -p financasdb < init.sql
```


## Licença

Este software é gratuito e de código livre, GNU GENERAL PUBLIC LICENSE 3.