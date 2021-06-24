import React, {Component} from 'react'

export default class Search extends Component {

    render(){
        return(
            <input type="text" value={this.props.searchValue} onChange={this.props.runSearch}/>
        )
    }
}
