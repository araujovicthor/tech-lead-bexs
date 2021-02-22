# Rota de Viagem
 
Um turista deseja viajar pelo mundo pagando o menor preço possível independentemente do número de conexões necessárias. Vamos construir um programa que facilite ao nosso turista, escolher a melhor rota para sua viagem.

Para isso precisamos inserir as rotas através de um arquivo de entrada.
 
## Input Example
```csv
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
ORL,CDG,5
SCL,ORL,20
```
 
## Explicando
Caso desejemos viajar de **GRU** para **CDG** existem as seguintes rotas:
 
1. GRU - BRC - SCL - ORL - CDG ao custo de **$40**
2. GRU - ORL - CGD ao custo de **$64**
3. GRU - CDG ao custo de **$75**
4. GRU - SCL - ORL - CDG ao custo de **$48**
5. GRU - BRC - CDG ao custo de **$45**
 
O melhor preço é da rota **1** logo, o output da consulta deve ser **GRU - BRC - SCL - ORL - CDG**.
 
# Solução

## Dependências
  - node - v14.15.5
  - yarn - 1.22.5
 
## Execução da solução
 
### Instalação das dependências
 
```cmd
$ yarn 
```
 
### Execução
 
Para usar a versão REST (disponível em: http://localhost:3333)
```cmd
$ yarn dev:server
```
 
Para usar a versão por linha de comando
```cmd
$ yarn cli input-example.csv
```

## Estrutura dos arquivos/pacotes
```
|-- tech-lead-bexs
    |-- README.md: "Documentação (you're here!)"
    |-- input-routes.csv: "Arquivo de rotas padrão"
    |-- input-routes-test.csv: "Arquivo de rotas usado para testes"
    |-- src
        -- modules: "Agrupa todos os módulos da aplicação"
            |-- trip
                |-- infra
                    |-- http
                        |-- controllers: "Controllers especifícos do módulo"
                            |-- TripController.ts: "Instancia o serviço correspondente injetando dependências" 
                        |-- routes: "Rotas específicas do módulo"
                            |-- trip.routes.ts: "Valida parâmetros da requisição e distribui ao controller"
                |-- services
                    |-- CreateRouteService.spec.ts: "Teste unitário ao serviço correspondente"
                    |-- CreateRouteService.ts: "Cria e armazena uma nova rota no .csv"
                    |-- ShowBestRouteService.spec.ts: "Teste unitário ao serviço correspondente"
                    |-- ShowBestRouteService.spec.ts: "Retorna a melhor rota e preço"
                |-- utils: "Armazena as utilidades particulares ao módulo"
                    |-- dijkstra.ts: "Executa função de grafos"
                    |-- readGraph.ts: "Lê arquivo de grafos"
        |-- shared: "Guardar todas as funcionalidades comuns a todos os módulos"'
            |-- errors
                |-- AppError.js: "Customização de error"
            |-- infra
                |-- cli
                    |-- index.ts: "Inicializador para cli da aplicação"
                |-- http
                    |-- routes
                        |-- index.ts: "Agrupa e distribui as rotas de todos os módulos"
                    |-- app.ts
                    |-- server.ts: "Inicializa o app na porta 3333" 
    |-- __tests__
        |-- functional
            |-- trip.spec.ts: "Testes funcionais da aplicação REST"
    |-- coverage: "Cobertura dos testes"
    |-- node_modules: "Dependências para funcionamento"
```
 
## Documentação da API REST
 
### Criação de novas rotas
- **URI:** /trip
- **METHOD:** POST
- **Payload:**
```json
{
	"to": "XYZ",
	"from": "ABC",
	"price": 20
}
```
- **RESPONSE:** 
```json
{
	"to": "XYZ",
	"from": "ABC",
	"price": 20
}
```
 
### Busca da melhor rota
- **URI:** /trip?from=*:from*&to=*:to*
- **METHOD:** GET
- **QUERY**:
  - **from**: Origem
    - Obrigatório
    - string
  - **to**: Destino
    - Obrigatório
    - string
- **RESPONSE:**
```json
{
  "bestRoute": "GRU - BRC - SCL - ORL - CDG",
  "price": 40
}
```
## Documentação CLI
 
A execução do comando 
```bash
yarn cli path
```

onde path é o caminho do arquivo csv utilizado para referência dos cálculos. Caso o arquivo não seja informado, o algoritmo finaliza.

Considerando que o arquivo csv foi informado, o cli enviará a pergunta: `please enter the route:`, que deve ser respondida com `from-to`, sendo obrigatório o uso do '-' separando a origem do destino.
 
Exemplo de resposta: 
**best route: GRU, BRC, SCL, ORL, CDG > 40**

