import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalize=(word)=>{
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page: 1
    }
    let word=this.props.category
    document.title=`News-4-All - ${this.capitalize(word)}`
  }

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3dd4b7872f41b8a4de00c4b4adb83c&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState(
      {articles: parseData.articles, totalResults: parseData.totalResults, loading: false}
    )
  }

  handlePrevClick = async () => {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3dd4b7872f41b8a4de00c4b4adb83c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData=await data.json();
    console.log(parseData);
    this.setState({
      page: this.state.page-1,
      articles: parseData.articles,
      loading: false
    })
  }

  handleNextClick = async () => {
    if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
    }
    else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aa3dd4b7872f41b8a4de00c4b4adb83c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData=await data.json();
      this.setState({
        page: this.state.page+1,
        articles: parseData.articles,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News-4-All - Trending News</h1>
        {this.state.loading && <Spinner />}
        <div className="row my-3">
          {!this.state.loading && this.state.articles.map((ele)=>{
            return  <div className="col-md-4" key={ele.url}> 
                      <NewsItem title={ele.title?ele.title.slice(0, 45): ""} description={ele.description?ele.description.slice(0, 88): ""} imageUrl={ele.urlToImage} newsUrl={ele.url} source={ele.source.name} publishedAt={ele.publishedAt.slice(0, 10)}/>
                    </div>            
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
