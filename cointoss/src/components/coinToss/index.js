import {Component} from 'react'
import "./index.css"

class CoinToss extends Component {
  state = {result: 'head', head: 0, tail: 0, total: 0}

  generateAndSet = () => {
    const tossResult = Math.floor(Math.random() * 2)

    this.setState(prevState => ({
      total: prevState.total + 1,
    }))

    if (tossResult === 0) {
      this.setState(prevState => ({
        result: 'head',
        head: prevState.head + 1,
      }))
    } else {
      this.setState(prevState => ({
        result: 'tail',
        tail: prevState.tail + 1,
      }))
    }
  }

  render() {
    const {result, head, tail,total} = this.state
    const imgUrl =
      result === 'head'
        ? 'https://assets.ccbp.in/frontend/react-js/heads-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/tails-img.png'

    return (
        <div className='bg'>
      <div className='game-container'>
        <h1>Coin Toss Game</h1>
        <p>Head (or) Tails</p>
        <img className='toss-img' src={imgUrl} alt={result} />
        <button type="button" className='button' onClick={this.generateAndSet}>
          Toss Coin
        </button>
        <div className='result-container'>
        <p className='results'>Total: {total}</p>
        <p className='results'>Heads: {head}</p>
        <p className='results'>Tails: {tail}</p>
        </div>
      </div>
      </div>
    )
  }
}

export default CoinToss
