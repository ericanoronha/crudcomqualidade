const BASE_URL = "http://localhost:3029";

describe("/ - Todos Feed", () => {
  it("should render the page", () => {
    // trailing slash
    cy.visit(BASE_URL);
  });
  it.only("should display a new todo on feed right after its creation", () => {
    // 0 - interceptações/interceptação
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "70905d7e-c969-45b1-99f0-1aa155477204",
            date: "2023-04-15T19:46:51.109Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo"); // intercept alias

    // 1 - abrir a página
    cy.visit(BASE_URL);
    // 2 - selecionar o input de criar nova todo e 3 - digitar no input de criar nova todo
    cy.get("input[name='add-todo']").type("Test todo");
    // 4 - clicar no botão
    const buttonAddTodo = "button[type='submit']";
    cy.get(buttonAddTodo).click();

    // 5 - Checar se na página surgiu um novo elemento
    cy.get("table > tbody").contains("Test todo");

    // Criar validações a partir de valores
    expect("texto").to.be.equal("texto");
  });
});
