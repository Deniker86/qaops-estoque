describe('Teste do frontend estoque', () => {
  beforeEach(() => {
    // 🔄 Garante que o backend está no ar antes de prosseguir
    cy.log('Verificando se o backend está online');
    cy.request('http://backend-qaops:5000/health').should((response) => {
      expect(response.status).to.eq(200);
    });

    cy.log('Visitando o frontend');
    cy.visit('/');
    cy.wait(1500); // Espera curta só para o visual inicial
  });

  it('Deve mostrar título', () => {
    cy.log('Verificando se o título aparece');
    cy.contains('Controle de Estoque').should('be.visible');
    cy.wait(2000); // pausa para ver o título
  });

  it('Deve adicionar um produto', () => {
    cy.log('Preenchendo nome do produto');
    cy.get('input[placeholder="Nome do produto"]')
      .should('be.visible')
      .type('Produto Teste');
    cy.wait(2000); // pausa após digitar nome

    cy.log('Preenchendo quantidade');
    cy.get('input[placeholder="Quantidade"]')
      .should('be.visible')
      .type('1');
    cy.wait(2000); // pausa após digitar quantidade

    cy.log('Preenchendo preço unitário');
    cy.get('input[placeholder="Preço Unitário"]')
      .should('be.visible')
      .type('10');
    cy.wait(2000); // pausa após digitar preço

    cy.log('Clicando em Adicionar');
    cy.contains('Adicionar')
      .should('be.enabled')
      .click();
    cy.wait(2000); // pausa para o produto aparecer na tabela

    cy.log('Esperando o produto aparecer na tabela');
    cy.contains('td', 'Produto Teste', { timeout: 5000 }).should('exist');
    cy.wait(2000); // pausa pra ver o produto na tabela
  });

  it('Deve excluir um produto', () => {
    cy.log('Procurando o produto na tabela');
    cy.contains('tr', 'Produto Teste', { timeout: 5000 })
      .should('exist')
      .within(() => {
        cy.log('Clicando no botão Excluir');
        cy.contains('Excluir').click();
      });
    cy.wait(2000); // pausa após clicar excluir

    cy.log('Confirmando exclusão no modal');
    cy.get('button.btn-confirmar')
      .should('be.visible')
      .click();
    cy.wait(3000); // pausa para a exclusão acontecer

    cy.log('Verificando se o produto foi removido');
    cy.contains('td', 'Produto Teste', { timeout: 5000 }).should('not.exist');
    cy.wait(2000); // pausa final para confirmar que sumiu
  });
});
