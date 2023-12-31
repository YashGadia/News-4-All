import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, publishedAt, source}=this.props;
    return (
      <div>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title} ...</h5>
                <p className="card-text">{description} ...</p>
                <p class="card-text"><small class="text-body-secondary">By <b>{source}</b> on {publishedAt}</small></p>
                <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
