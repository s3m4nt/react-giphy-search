import React, {Component} from 'react'
import Search from './Search'
import Result from './Result'

const searchObj = {
    "data": [
      {
        "type": "gif",
        "id": "iuHaJ0D7macZq",
        "url": "http://giphy.com/gifs/cat-day-tomorrow-iuHaJ0D7macZq",
        "source": "https://www.reddit.com/r/CatGifs/comments/5f0h9a/tomorrow_is_legs_day/",
        "rating": "pg",
        "images": {
          "fixed_height": {
            "url": "http://media4.giphy.com/media/iuHaJ0D7macZq/200.gif"
          }
        }
      },
      {
        "type": "gif",
        "id": "Z1kpfgtHmpWHS",
        "url": "http://giphy.com/gifs/cat-way-make-Z1kpfgtHmpWHS",
        "source": "http://shewhoseeks.blogspot.com/2016/03/cat-gifs-that-make-me-laugh-way-more.html",
        "rating": "g",
        "images": {
          "fixed_height": {
            "url": "http://media4.giphy.com/media/Z1kpfgtHmpWHS/200.gif"
          }
        }
      }
    ],
    "meta": {
      "status": 200,
      "msg": "OK"
    },
    "pagination": {
      "total_count": 1947,
      "count": 25,
      "offset": 0
    }
  }

  let apiKey = process.env.REACT_APP_GIPHY_API_KEY
  console.log(apiKey)

export default class SearchContainer extends Component {

    constructor() {
        super()
        this.state = {
            searchValue: '',
            searchResult: []
        }
    }

    runSearch = (e) => {
        const captSearch = e.target.value
        let searchRunResults = searchObj.data.map((elem) => {
            if (elem.source.includes(captSearch.toLowerCase())) {
                return elem.images.fixed_height.url
            } else {
                return elem
            }
        })

        this.setState({
            searchValue: captSearch,
            searchResult: searchRunResults
        })
    }

    render(){
        const resultsToRender = this.state.searchResult.map((res) =>{
            return <Result imgSrc={res} />
        } )

        return(
            <div>
                <Search searchValue={this.state.searchValue} runSearch={this.runSearch} />
                <ul>
                    {resultsToRender}
                </ul>
                <Result />
            </div>
        )
    }
}