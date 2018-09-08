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
    console.log("[App.js] ComponentDidMount Called")
    const HOH_POSTS_URL = 'https://www.hourofhistory.com/wp-json/wp/v2/posts/?per_page=25';
    
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
        console.log("postsArray is :");
        console.log(postsArray);
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
    console.log("tableUpdateHandler() called");

    if (inputString !== "") {
      let localArray;
          localArray = this.state.posts.filter((row, index) => {
              let loweredDate = row.Date.toLowerCase();
              let loweredTitle = row.Title.toLowerCase();
              return (loweredDate.includes(inputString.toLowerCase())
                      || loweredTitle.includes(inputString.toLowerCase())
              )
          })
      console.log(localArray);
      this.setState({filteredPosts: localArray});
    } else {
      console.log("filterString eval'd to empty");
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
          <h5>Please wait while recent podcast data is gathered...</h5>
        </div>
      );
    }
    
    if (this.state.errorMessage) {
      return (
        <div className="ErrorContainer">
            <img src="https://www.hourofhistory.com/wp-content/uploads/2018/04/Mosaic_thumb_mock3.png" 
          className="App-logo" 
          alt="logo" 
          height="100px"
          width="100px" />
          <p style={{marginTop: '2em'}}>{this.state.errorMessage}</p>
        </div>
      )
    }  
    
    if (!this.state.loading) {
      return (
        <div className="App">
          <header className="App-header">
            <img src="https://www.hourofhistory.com/wp-content/uploads/2018/04/Mosaic_thumb_mock3.png" 
              className="App-logo" 
              alt="logo" 
              height="100px"
              width="100px" />
            <h1 className="App-title">Recommendations</h1>
          </header>
          <div className="Filter-Section">
            <div className="SearchInputContainer">
              <SearchComponent 
                className="SearchComponent"
                updateTable={this.tableUpdateHandler} />
            </div>
            <div className="SearchTable">
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
