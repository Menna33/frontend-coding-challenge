import React from "react";
import moment from 'react-moment';
import "../styles/row.css";

class Repo extends React.Component {
  
  calculateTimeInterval(creationTime)
  {
    const timeDifference = new Date(Date.now() - Date.parse(creationTime));
      return Math.floor(timeDifference / (1000 * 3600 * 24));
  }
  render() {
    //const {userImg,userName,answeredSum,askedSum,score}=this.props
    console.log(`Date.now() ${Date.now()}`)
    const { repo } = this.props;
    console.log("repo : ", repo);
    return (
      <div className="repo-box">
        <h1> {repo.name} </h1>
        <p>{repo.description}</p>
        <img
          className="repo-img"
          src={repo.owner.avatar_url}
          alt={repo.owner.avatar_url}
        />
        <div className="repo-info">
          <div className="star-box">Stars:{repo.stargazers_count}</div>
          <div className="issue-box">Issues:{repo.open_issues_count}</div>
          {console.log(`repo.created_at ${repo.created_at}`)}
          <p>Submitted {this.calculateTimeInterval(repo.created_at)} ago by {repo.owner.login}</p>
         { /*<p>Submitted {moment(repo.created_at).fromNow()} ago by {repo.owner.login}</p>*/}
        </div>
      </div>
    );
  }
}

export default Repo;
