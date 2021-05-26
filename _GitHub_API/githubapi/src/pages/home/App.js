import '../../../src/App.css';
// import {Octokit} from "@octokit/core";
import React from 'react';


class Repositorios extends React.Component {

  constructor(props){

    super (props);
    this.state = {

      listarepositorios: [],
      username : ''

    }

  }

  atualziarEstadoUsername = async (userdigitado) => {

      await this.setState({ username : userdigitado.target.value })
      console.log( this.state.username)

  }

  ListarRepositorios = (repositorios) => {

    repositorios.preventDefault();
    console.log("formulario funcionando");

    fetch("https://api.github.com/users/"+this.state.username+"/repos")

    .then(resposta => resposta.json())

    .then( dados => this.setState ({listarepositorios : dados}))
    
      .then(console.log(dados))

    .then(
      resposta => resposta.status === 200 ? 
      console.log("buscou e achou") : 
      console.log("bucou nao achou")
    )

  }
  
  render(){
  
    return (
      
      <section>
        <div>
          <form onSubmit={this.ListarRepositorios}>

            <input 
            type="text" 
            value={this.state.username} 
            onChange={this.atualziarEstadoUsername} 
            placeholder="Usuário"/>

            <button type = "submit" onClick = { () => console.log("botao")}    > Buscar </button>

          </form>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td> #              </td>
                <td> Repositorio     </td>
                <td> Descrição       </td>
                <td> Criado          </td>
                <td> Size            </td>
              </tr>
            </thead>

            <tbody>

              {
                this.state.listarepositorios.map( (repository) => {
                    return(
                      <tr>
                        <td> {repository.id} </td>
                        <td> {repository.name} </td>
                        <td> {repository.description} </td>
                        <td> {repository.created_at} </td>
                        <td> {repository.size} </td>
                      </tr>
                      )
                    }
                  )
              }

            </tbody>

          </table>
        </div>
      </section>
  
    )
  
  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Repositorios/>
      </header>
    </div>
  );
}

export default App;
