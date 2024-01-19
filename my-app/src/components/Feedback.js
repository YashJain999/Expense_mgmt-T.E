import React, { PureComponent } from 'react'

export class Feedback extends PureComponent {
  render() {
    return (
      <div>
        <h2 style={{
        position:"relative",
        height: "40vmin",
        top:"200px",
        left: "490px",
        width: "calc(100% - 560px)",
        transition: "all 0.5s ease",
      }}>Feedback section</h2>
      </div>
    )
  }
}

export default Feedback
