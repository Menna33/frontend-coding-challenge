import React from "react";
import "../styles/row.css";

class Repo extends React.Component {
  render() {
    //const {userImg,userName,answeredSum,askedSum,score}=this.props
    const { repo } = this.props;
    console.log("repo : ", repo);
    return (
      <div className="repo-box">
        <h1> {repo.name} </h1>
        <p>{repo.description}</p>
        <img
          className="repo-img"
          src={repo.owner.avatar_url }
          alt={repo.owner.avatar_url}
        />
        <div className="repo-info">
         <div className="star-box">Stars:{repo.stargazers_count}</div>
         <div className="issue-box">Issues:{repo.open_issues_count}</div>
          <p>Created by{repo.owner.name}</p>
        </div>
      </div>
    );
  }
}

export default Repo;
