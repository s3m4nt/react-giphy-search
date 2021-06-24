import React, {Component} from 'react'
import Search from './Search'
import Result from './Result'
import axios from 'axios'

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

    search = () => {
      axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: apiKey,
          q: this.state.searchValue
        }
      })
      .then((res) => {
        this.setState({
          searchResult: res.data.data
      })

    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.searchResult.length === 0 && this.state.searchValue === nextState.searchValue) {
        return false
    }
    return true
}

componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchValue !== this.state.searchValue) {
        this.search()
    }
}

runSearch = (e) => {
    const captSearch = e.target.value
    this.setState({
        searchValue: captSearch
    })
}

render() {
    let resultsToRender
    if (this.state.searchResult) {
        console.log(this.state.searchResult)
        resultsToRender = this.state.searchResult.map((res) => {
            return <Result imgSrc={res.images.fixed_height.url} />
        })
    }
    
    return (
        <div>
            <Search searchValue={this.state.searchValue} runSearch={this.runSearch} />
            <ul>
                {resultsToRender}
            </ul>
        </div>
    )
}
}