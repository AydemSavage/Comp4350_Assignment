import React, {Component} from 'react'
import './App.css';

class App extends Component {

  state = {
    loading: false,
    tag: "",
    posts: []
  }

  updateAPI() {

    if(this.state.tag !== '') {
      var link = "https://api.stackexchange.com/2.2/questions?order=desc&sort=week&tagged=" + this.state.tag + "&site=stackoverflow"
      this.setState({loading: true})
      fetch(link)
        .then(response => {
          if(!response.ok) {
            throw Error("Could not fetch from API")
          }
          return response.json()
        })
        .then(data => {
          this.setState({loading: false})
          this.parseResponse(data)
        })
        .catch(err => {
          console.log(err.message)
        })
    }

  }

  parseResponse(data) {
    var post

    this.setState({ posts:[] }) // clear array

    for(var i = 0; i < 10; i++){ // fill array with posts
      post = {title: data.items[i].title, rating: data.items[i].score, date: data.items[i].creation_date, link: data.items[i].link}
      this.setState({
        posts: this.state.posts.concat(post)
      })
    }
    this.setState({
      loading: false
    })
  }

  // allows for changes to occur real-time
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // when form is submitted, call updateAPI to fetch new data
  submitHandler = (e) => {
    e.preventDefault();
    this.updateAPI();
  }

  render() {
    if(this.state.loading) { // displays text when loading 
      return <div>loading...</div>
    }

    return (
      <div>
        <header>
          <form className="search-form" onSubmit={this.submitHandler}>
            <label className="search-label">Enter a Tag</label>
            <input className="search-bar" type="text" name="tag" value={this.state.tag} onChange={this.changeHandler} placeholder="eg. Java or C++"/>
            <button className="search-button">Click me</button>
          </form>
        </header>
        <body>
          {this.state.posts.map(singlePost => (
            <div className="post" key={singlePost.title}>
              <a href={singlePost.link}>
              <p className="post-title">Question: {singlePost.title}</p>
              <p className="post-rating">Rating: {singlePost.rating}</p>
              <p className="post-creation">Created: {( Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(singlePost.date*1000))}</p>
            </a>
            </div>
          ))}
        </body>
      </div>
    )
  }
}

export default App
