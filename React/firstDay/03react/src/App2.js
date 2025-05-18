import React from "https://esm.sh/react@19.1.0"
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client"


const Chai = (props) => {
  return React.createElement(
    "div",
    {},
    [
        React.createElement("h1", {}, props.name),
        React.createElement("p", {}, props.cost),
    ]
  )
}

const App = () => {
    return React.createElement(
        "div",
        {class: "test"},
        [
            React.createElement("h1", {}, "Heading"),
            React.createElement(Chai,{
                name: "ginger Tea",
                cost: "1000"
            }),
            React.createElement(Chai, {
                name: "adharak wali mast chai",
                cost: "2000"
            }),
        ]
    )
}

const container  = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App))


