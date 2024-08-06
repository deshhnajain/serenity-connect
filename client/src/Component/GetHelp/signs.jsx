import React from 'react'
import "./Signs.css"

function signs() {
  return (
    <div className="GetHelp">
      <h1>GET HELP</h1>
      <h3>Signs your mental health might need attention</h3>
      <div className="container1">
        <div className="image-container">
          <img
            src="https://cdn.prod.website-files.com/62ab7d5ccc9f587bce83c183/62cfdff0299f8cba0bad5250_Get%20Help%20-%20Vandrevala3%20(1).png"
            alt="Illustration of a person sitting with their head in their hands, surrounded by a messy thought bubble"
            width={400}
          />
          <div className="list list-right">
            {[
              "Feeling sad or down",
              "Inability to concentrate",
              "Excessive fears or worries",
              "Extreme feelings of guilt",
              "Low on energy",
              "Paranoia or hallucinations",
              "Inability to cope with daily problems",
            ].map((item, index) => (
              <div key={index} className="item">
                <img
                  src="https://cdn.prod.website-files.com/62ab7d5ccc9f587bce83c183/62cfdfef9b9e416f5baa7cba_Get%20Help%20-%20Vandrevala3%20(2).png"
                  alt="Arrow image"
                  width={20}
                  height={20}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="image-container">
          <div className="list list-left">
            {[
              "Sudden changes in personality and behavior",
              "Major changes in eating habits",
              "Inability to be productive at work/studies",
              "Dramatic change in sleeping patterns",
              "Sexual problems",
              "Excessive anger, hostility or violence",
              "Suicidal thoughts",
            ].map((item, index) => (
              <div key={index} className="item">
                <img
                  src="https://cdn.prod.website-files.com/62ab7d5ccc9f587bce83c183/62cfdfef9b9e416f5baa7cba_Get%20Help%20-%20Vandrevala3%20(2).png"
                  alt="Arrow image"
                  width={20}
                  height={20}
                />
                {item}
              </div>
            ))}
          </div>
          <img
            src="https://cdn.prod.website-files.com/62ab7d5ccc9f587bce83c183/62cfdff0299f8c65baad5251_Get%20Help%20-%20Vandrevala3.png"
            alt="Illustration of a person sitting with their head in their hands, surrounded by a messy thought bubble"
            width={400}
          />
        </div>
      </div>
    </div>
  )
}

export default signs;