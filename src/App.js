import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchComponent from './components/SearchComponent/SearchComponent';

class App extends Component {
  state = {
    posts: [],
    filteredPosts: null,
    errorMessage: null,
    loading: true,
    loadError: false,
    inputString: null
  }
  
  componentWillMount () {
    const HOH_POSTS_URL = './../wp-json/wp/v2/posts/?per_page=25';
    
    let postsArray;

    axios.get(HOH_POSTS_URL)
      .then(res => {
        postsArray = res.data;
        //Map through data and return elements with only ID, Title, and Date
        postsArray = postsArray.map(post => {
          let replacedString;
          if (post.acf.amazon_links) {
            replacedString = post.acf.amazon_links.replace(/img border="0"/g, 'img border="0" height="120px"');
          }
          
          return {
            ID: post.id,
            Title: post.title.rendered,
            Date: post.date.substring(0,10),
            Amazon_Links: replacedString
          }
        })
        this.setState({posts: postsArray});
        this.setState({loading: false});
      })
      .catch(error =>{
        this.setState({loading: false});
        this.setState({errorMessage: 'Sorry! The page failed to retrieve posts from the server. Please contact us at www.hourofhistory.com/contact.'});
        console.log("Error Thrown -> " + error);
      }) 
      
    
  }

  tableUpdateHandler = ((inputString) => {
    //As name implies, this function will rerender the able on
    //keystrokes or explicit button click from the search component

    if (inputString !== "") {
      let localArray;
          localArray = this.state.posts.filter((row, index) => {
              let loweredDate = row.Date.toLowerCase();
              let loweredTitle = row.Title.toLowerCase();
              return (loweredDate.includes(inputString.toLowerCase())
                      || loweredTitle.includes(inputString.toLowerCase())
              )
          })
      this.setState({filteredPosts: localArray});
    } else {
      let localArray = this.state.originalArray;
      this.setState({filteredPosts: localArray});
    }
  })

  render() {

    if (this.state.loading) {
      return (
        <div style={{textAlign: 'center'}}>
          <div className="spinner">
            <div className="cube1"></div>
            <div className="cube2"></div>
          </div>
          <h5>Loading Podcast Recommendations...</h5>
        </div>
      );
    }
    
    if (this.state.errorMessage) {
      return (
        <div className="ErrorContainer">
           <a href="https://www.hourofhistory.com">
              <img 
                src={require("./assets/images/hoh-logo.png")} 
                srcSet={`${require('./assets/images/hoh-logo.png')} 1x, ${require('./assets/images/hoh-logo@2x.png')} 2x`}
                height="150" 
                width="150" 
                alt="Hour of History Logo">
              </img>
            </a>
          <p style={{marginTop: '2em'}}>{this.state.errorMessage}</p>
        </div>
      )
    }  
    
    if (!this.state.loading) {
      return (
        <div className="App">
          <header className="App-header">
            <a href="https://www.hourofhistory.com">
              <img 
                src={require('./assets/images/hoh-logo.png')}
                srcSet={`${require('./assets/images/hoh-logo.png')} 1x, ${require('./assets/images/hoh-logo@2x.png')} 2x`}
                height="150" 
                width="150" 
                alt="Hour of History Logo">
              </img>
            </a>
            <h1 className="App-title">Recommendations</h1>
            <a className="SourceCode" href="https://github.com/james0r/recs-reactjs/tree/master/">View Source Code</a>
          </header>
          <div className="Filter-Section">
            <div className="SearchInputContainer">
              <SearchComponent 
                className="SearchComponent"
                updateTable={this.tableUpdateHandler} />
            </div>
            <div className="ResultsTable">
              <ResultsTable 
                data={this.state.filteredPosts ? this.state.filteredPosts : this.state.posts}
              />
            </div>
          </div>
        </div>
      )
    }
    }
  }

export default App;
