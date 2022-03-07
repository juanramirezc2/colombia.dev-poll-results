import cx from 'classnames';
import { Component } from 'react';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput : "",
      list:[]
    }
  }
  // Set a user input value
  updateInput = (value)=>{
    this.setState({
      userInput: value,
    });
  }

  addItem = () => {
    if(this.state.userInput !== '' ){
      const userInput = {
        id :  Math.random(),
        status: 'uncomplete',
        value : this.state.userInput
      };

      const list = [...this.state.list];
      list.push(userInput);

      this.setState({
        list,
        userInput:""
      });
    }
  }

  completeItem(key){
    const list = [...this.state.list];

    const updateList = list.map(item => {
      if(item.id !== key){
        return item;
      }
      else{
        return {
          ...item,
          status: item.status === 'uncomplete' ? 'complete' : 'uncomplete'
        }
      }
    } );

    this.setState({
      list:updateList,
    });

  }
  render() {
    return (
      <>
        <div>
          <input value={this.state.userInput} type="text" onChange={(e)=>this.updateInput(e.target.value)} />
          <button onClick={this.addItem}>Add</button>
        </div>
        <div>
          <div className="task-counter">
            {`${this.state.list.filter(task=>task.status==="uncomplete").length} remaining out of ${this.state.list.length} tasks`}
          </div>
          <ul>
            {this.state.list.map(item => (<li className={`${item.status === 'complete'? 'is-done':''}`} onClick={()=>this.completeItem(item.id)} key={item.id}>{item.value}</li>))}
          </ul>
        </div>

        <style>{`
.is-done {
text-decoration: line-through;
}
`}</style>
        </>
    );
  }
}

