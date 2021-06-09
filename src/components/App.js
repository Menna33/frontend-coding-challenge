import React from "react";
import Repo from "./Repo";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import BASE_API_URL from '../env'



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

    let url = ` ${BASE_API_URL}${formattedDate}&sort=stars&order=desc&page=${pageNum}`;
    fetch(url)
      .then((res) =>
      { 
          if(res.status >= 400) {
        throw new Error("Server responds with error!");
      }
         return res.json()})
      .then((data) => {
        this.setState({
          repos: [...this.state.repos, ...data.items],
          loading:false,
        });
      },
      (error) => {
        if (error) {
          // handle error here
          console.log("error in fetching");
        }
      });
  };

  componentDidMount = () => {
    window.addEventListener("scroll", this.infiniteScroll);

    this.fetchData(this.state.pageNumber);
  };

  infiniteScroll = () => {
    // End of the document reached?
  
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      let newPage = this.state.pageNumber;
      newPage++;
      this.setState({
        pageNumber: newPage,
      });
      this.fetchData(newPage);
    }
  };

  render() {
    const { repos} = this.state;
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
            {repos?(repos.map((repo) => (
              <Repo key={repo.id} repo={repo} />
            ))):(<p>You have reached the end :)</p>)}
            </div>)
  }
           </div>
           
    );
  }
}
App.propTypes = {
    loading: PropTypes.bool,
    pageNumber: PropTypes.number,
    repos:PropTypes.array,
    fetchData:PropTypes.func,
    infiniteScroll:PropTypes.func, 
  };
  
export default App;
