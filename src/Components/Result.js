
import React, {Component} from 'react'

export default class Result extends Component {
    render(){
        return(
            <li>
                <img src={this.props.imgSrc} />
            </li>
        )
    }
}
