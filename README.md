# AP Multimarcas

## Resumo

Um sistema gerenciador de vendas e estoque desenvolvido para as necessidades da loja de roupas [A.P Multimarcas](https://www.instagram.com/a.p_multimarcas/). O sistema vai ser utilizado pelos funcionários, vendedores e gestores da loja.

## Arquitetura de Microserviços

![arquitetura](https://github.com/LucasAlves011/front-scarlet/blob/master/Projeto%20Sistemas%20Distribu%C3%ADdos%20(2).jpg)

A arquitetura escolhida foi a de microserviços, composta por 5 módulos, sendo eles 2 módulos de **serviços** e 2 módulos de **infraestutura** e 1 módulo **client**. 
O link do repositórios de cada módulo estarão disponíveis no fim do documento.

### Módulos:

#### Módulo de client

O módulo de client (Front-end) é responsável pela interação direta do usuário com o sistema.

As tecnologias empregadas foram a linguagem **JavaScript** em conjunto com _framework_ **React**.

#### Módulos de infraestrutura

Os módulos de infraestrutura são aqueles que não possuem funcionalidades específicas de negócio, mas que atuam como suporte para que os módulos de serviços possam se comunicar entre si e com o módulo do cliente. Esses módulos são responsáveis por fornecer recursos como comunicação em rede, autenticação, segurança, entre outros. Eles permitem que os módulos de serviços se concentrem em suas funcionalidades específicas e que a arquitetura como um todo seja mais modular, escalável e fácil de manter. Tecnologia empregadas foram a linguagem **Java** com o framework **Spring Boot**.

##### Gateway

O Gateway é o módulo responsável por receber todas as requisições do cliente, encaminhá-las para os serviços apropriados e, em seguida, repassar as respostas desses serviços de volta ao cliente. Pode atuar também como um balanceador de carga para momentos em que se tem duas ou mais instâncias de um mesmo serviços.

##### Service Discovery

Service Discovery é o módulo responsável por manter um registro completo de toda a arquitetura do Back-End, incluindo os módulos de infraestrutura e serviços. Todos os módulos que compõem o Back-End são configurados para se registrarem automaticamente no Service Discovery assim que são iniciados.

As instâncias dos módulos de serviços não possuem uma porta estática definida previamente, ou seja, ao serem inicializadas, elas recebem do sistema operacional portas aleatórias disponíveis no momento. Isso pode dificultar o trabalho do Gateway, já que ele não conhece antecipadamente as portas em que as instâncias estão sendo executadas. No entanto, o Service Discovery fornece ao Gateway informações atualizadas sobre a localização e o status das instâncias dos módulos de serviço, permitindo que ele redirecione corretamente as requisições para elas.

Essa abordagem simplifica a escalabilidade da infraestrutura de serviços, pois não é necessário configurar portas ou roteamentos para adicionar uma nova instância.

#### Módulos de Serviço

São os módulos que contém as regras de negócio. Todas as tecnologias empregadas para implementá-los foram a linguagem **Java** com o framework **Spring Boot**. 

##### Estoque 

É o módulo responsável por cadastrar, editar, manter e deletar os produtos. 

##### Venda

É o módulo responsável por cadastrar e validar as vendas realizadas pelo sistema.

### Banco de dados

Cada instância de serviço tem o seu banco de dados separado e a única forma de um serviço acessá-lo é fazendo requisições para a própria instância.
O SGBD escolhido foi o **PostgreSQL**.

### Funcionalidades da Interface:

- Cadastrar, editar e excluir produtos.
- Visualizar todos os produtos e suas unidades disponíves no estoque.
- Visualizar todas as marcas e seus produtos separados.
- Componente de carrinho para auxiliar a venda de mais de um produto.
- Tela de sacola para confirmar a venda e selecionar a forma de pagamento (Cartão, Dinheiro e Pix).
- Tela de confirmação de compra.
- Tela de resumo de venda do dia junto com um resumo das vendas realizadas na semana.
- Tela com as informações de todas as vendas de um dia selecionado (Hora, forma de pagamento, itens e o valor).

### Link para repositório de todos os módulos 

|Módulo|Categoria| Tipo |Link|
:------|:-------:|:----:|:----------------------------------------------|
|Client|Front-End|Client| https://github.com/LucasAlves011/front-scarlet|
|Gateway|Back-End|Infraestutura|https://github.com/LucasAlves011/scarlet-gateway|
|Service Discovery|Back-End|Infraestutura|https://github.com/LucasAlves011/scarlet-eureka|
|Estoque|Back-End|Serviço|https://github.com/LucasAlves011/scarlet-estoque|
|Venda|Back-End|Serviço|https://github.com/LucasAlves011/scarlet-venda|

