import React from 'react'
import * as API from '../utiles/api'
import InfiniteScroll from 'react-infinite-scroll-component';
import Repo from './Repo';

class App extends React.Component {
  state = {
    repos: []
}
  componentDidMount() {
   // API.getAll().then(data => this.setState({ repos:data.items }));
   
     fetch("https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc")
          .then((response) => response.json())
          .then((data) =>{ console.log(data)
            this.setState({ repos:data.items })});
        }
  

  render() {
    const { repos } = this.state;
    console.log("repos: ",repos)
    return(
      <div>
        {repos.map(repo=><Repo key={repo.id} repo={repo}/>)}
      </div>
    )
   
  }
}

export default App
