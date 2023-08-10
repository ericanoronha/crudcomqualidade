import React from "react";
import { GlobalStyles } from "@ui/theme/GlobalStyles";

const bg = "/bg.jpg";

const todos = [
  {
    id: "bae6ae84-23e4-49e1-819e-2421cb621588",
    date: "2023-08-08T22:45:20.947Z",
    content: "Primeira TO-DO",
    done: false,
  },
  {
    id: "dd6dcace-011a-4425-ba75-b45dd1ada24e",
    date: "2023-08-08T22:45:20.950Z",
    content: "Terceira TODO está atualizada!",
    done: false,
  },
];

function HomePage() {
  return (
    <>
      <head>
        <title>Todo list</title>
        <meta
          name="description"
          content="Exercício do curso CrudComQualidade.io"
        />
      </head>
      <main>
        <GlobalStyles themeName="dangerPink" />
        <header
          style={{
            backgroundImage: `url('${bg}')`,
          }}
        >
          <div className="typewriter">
            <h1>O que fazer hoje?</h1>
          </div>
          <form>
            <input type="text" placeholder="Correr, Estudar..." />
            <button type="submit" aria-label="Adicionar novo item">
              +
            </button>
          </form>
        </header>

        <section>
          <form>
            <input
              type="text"
              placeholder="Filtrar lista atual, ex: Dentista"
            />
          </form>

          <table border={1}>
            <thead>
              <tr>
                <th align="left">
                  <input type="checkbox" disabled />
                </th>
                <th align="left">Id</th>
                <th align="left">Conteúdo</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {todos.map((currentTodo) => {
                return (
                  <tr key={currentTodo.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{currentTodo.id}</td>
                    <td>{currentTodo.content}</td>
                    <td align="right">
                      <button data-type="delete">Apagar</button>
                    </td>
                  </tr>
                );
              })}

              {/* <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  Carregando...
                </td>
              </tr> */}

              {/* <tr>
                <td colSpan={4} align="center">
                  Nenhum item encontrado
                </td>
              </tr> */}

              {/* <tr>
                <td colSpan={4} align="center" style={{ textAlign: "center" }}>
                  <button data-type="load-more">
                    Carregar mais{" "}
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        fontSize: "1.2em",
                      }}
                    >
                      ↓
                    </span>
                  </button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default HomePage;
