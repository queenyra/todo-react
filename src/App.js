
import React from "react";

const todos=
[
    {id:"01", text:"Sholat Dhuha"},
    {id:"02", text:"Dzikir pagi petang"},
    {id:"03", text:"One Day One Juz"}
];

class App extends React.Component{
  constructor(props){
      super(props);
      this.state={
          inputTodo:"",
          pesanErrors: null,
          arrayTodo: todos,
          pesanSucces: null,
          pesanDelete: null,
      }   
  }
  
  handleInputChange=(e)=>{
      this.setState({inputTodo:e.target.value})
  }

  handleFormSubmit=(e)=>{

      e.preventDefault();

      if(this.state.inputTodo.trim()===""){
          this.setState({
            inputTodo: "", 
            pesanDelete: null,
            pesanSucces: null,
            pesanErrors:"Todo tidak boleh kosong"});
      }
      else{
          //Input todo baru ke dalam state
          const newTodos=[
              ...this.state.arrayTodo,
              {
                  id:new Date().getTime().toString(),
                  text:this.state.inputTodo
              }
          ];

          this.setState({
              arrayTodo:newTodos,
              inputTodo: "", 
              pesanErrors: null,
              pesanDelete: null,
              pesanSucces: "Todo berhasil ditambahkan"
          });

          
          //kosongkan input text
          this.state.inputTodo="";
      }
  }

  handleDeleteClick=(e)=>{
      //console.log(e.target.id);
      const newTodos=this.state.arrayTodo.filter(
          item => item.id !==e.target.id
      );
      this.setState({ 
          arrayTodo:newTodos,
          pesanErrors: null,
          pesanSucces: null,
          pesanDelete: "Todo sudah dikerjakan"
          
      });
  }


  render() {
      return(
          <div className="container">
              {
                  this.state.arrayTodo.map((todo)=>
                  <div className="todo" key={todo.id}>{todo.text}
                      <span id={todo.id} onClick={this.handleDeleteClick}>✓</span>
                  </div>
                  )

              }

              <form onSubmit={this.handleFormSubmit}>
                  <div>
                      <input type="text"placeholder="Add todo..."
                      value={this.state.inputTodo}
                      onChange={this.handleInputChange}
                      />
                      {this.state.pesanErrors && <small>
                          {this.state.pesanErrors}</small>
                      }
                      {this.state.pesanSucces && <smalll>
                          {this.state.pesanSucces}</smalll>
                      }
                      {this.state.pesanDelete && <smalll>
                          {this.state.pesanDelete}</smalll>
                      }
                  </div>
              </form>
              
          </div>
      )
  }
}

export default App