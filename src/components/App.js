import React from "react";
import Repo from "./Repo";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
//import LoadingBar from "react-redux-loading";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      pageNumber: 1,
      loading:true
    };
  }

  fetchData = (pageNum) => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 30);
    const year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const date = "";
    let intMonth = parseInt(month);
    let intDay = parseInt(day);
    let formattedDate = date.concat(
      year,
      "-",
      intMonth > 9 ? month : `0${month}`,
      "-",
      intDay > 9 ? day : `0${day}`
    );
    //console.log("formattedDate ; ", formattedDate);

    let url = ` https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${pageNum}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          repos: [...this.state.repos, ...data.items],
          loading:false,
        });
      });
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.infiniteScroll);

    this.fetchData(this.state.pageNumber);
  };

  infiniteScroll = () => {
    // End of the document reached?
    console.log('da55555555l hena')
    console.log(' window.innerHeight + document.documentElement.scrollTop ===document.documentElement.offsetHeight', window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight)
    console.log(`document.documentElement.scrollTop ${document.documentElement.scrollTop }`)
    console.log(`window.innerHeight ${window.innerHeight }`)
    console.log(`document.documentElement.offsetHeight ${document.documentElement.offsetHeight }`)
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      let newPage = this.state.pageNumber;
      console.log('this.state.page : ',this.state.pageNumber)
      newPage++;
      this.setState({
        pageNumber: newPage,
      });
      console.log('hy3ml fetch' ,newPage)
      this.fetchData(newPage);
      console.log('3ammmmmmmmmmmmml fetch')
    }
  };

  render() {
    const { repos,loading} = this.state;
    //console.log("repos: ", repos);
    return (<div>
        {this.state.loading? (<Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
         
          ) : (
            <div>
            {repos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))}
            </div>)
  }
           </div>
           
    );
  }
}

export default App;
