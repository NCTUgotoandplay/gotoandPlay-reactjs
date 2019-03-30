import React from "react"

const Card = (props) =>　(
  <div className="card">
    <img src={props.img} alt="" />
    <div className="rightpart">
      <h3>{props.title}</h3>
      <p>{props.p}</p>
    </div>
  </div>
)

function Cards(props) {
  const listItems = props.cards.map((oj) =>
    <Card title={oj["title"]} img={oj["img"]} p={oj["p"]} />
  )
  return (
    <div className="cards">
      {listItems}
    </div>
  )
}

export default Cards;
