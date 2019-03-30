import React from "react"

const Deck = (props) => (
    <div className="deck">
      <img src={props.img} alt="" />
      <h3>{props.title}</h3>
    </div>
)
function Decks(props) {
  const listItems = props.decks.map((oj) =>
    <Deck title={oj["title"]} img={oj["img"]} />
  )
  return (
    <div className="decks">
      {listItems}
    </div>
  )
}

export default Decks;
