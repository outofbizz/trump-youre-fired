import React, { Component } from "react";
import { render } from "react-dom";
import Transition from "react-transition-group/Transition";
import { Col, Block, Inline } from "jsxstyle";

import WhiteImage from "./images/white.jpg";
import LightPinkImage from "./images/light_pink.jpg";
import PinkImage from "./images/pink.jpg";
import OrangeImage from "./images/orange.jpg";
import BlackImage from "./images/black.jpg";

const DURATION = 2000;

const defaultStyles = {
  transition: `opacity ${DURATION}`,
  position: "absolute",
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const MAX_INDEX = 0;

const IMAGES = [
  WhiteImage,
  LightPinkImage,
  PinkImage,
  OrangeImage,
  BlackImage,
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  componentDidMount() {
    setInterval(this.transition, DURATION);
  }

  componentWillUnmount() {
    clearInterval(this.transition);
  }

  transition = () => {
    this.setState(({ index }) => ({ index: index + 1 == IMAGES.length ? 0 : index + 1 }));
  }

  render() {
    const { index } = this.state;
    return (
      <Col
        alignItems={"center"}
        height={"100%"}
      >
        <Block
          component={"h1"}
          fontSize={36}
          fontWeight={700}
          textAlign={"center"}
          marginTop={12}
          marginBottom={18}
        >
          {"Trump, You’re Fired"}
          <Inline
            component={"sup"}
            verticalAlign={"top"}
            fontSize={"60%"}
          >
            {"©"}
          </Inline>
        </Block>
        <Block
          marginTop={20}
          position={"relative"}
          width={"100%"}
          flex={4}
        >
          <Block height={"100%"}>
            {IMAGES.map((image, elIndex) => (
              <Transition
                in={elIndex == index}
                timeout={{ enter: DURATION, exit: DURATION }}
                key={elIndex}
              >
                {(state) =>  {
                  return (
                    <Block
                      height={"100%"}
                      width={"100%"}
                      position={"absolute"}
                      transition={`opacity ${DURATION}`}
                      backgroundImage={`url(${image})`}
                      backgroundPosition={"center center"}
                      backgroundSize={"auto 100%"}
                      opacity={1}
                      {...transitionStyles[state]}
                    />
                  )
                }}
              </Transition>
            ))}
          </Block>
        </Block>
        <Col
          flex={1}
          alignItems={"end"}
        >
          <Block
            marginTop={"auto"}
            marginBottom={10}
            component={"a"}
            background={"#ff0000"}
            textDecoration={"none"}
            padding={"10px 20px"}
            color={"#ffffff"}
            fontSize={24}
            fontWeight={700}
            props={{
              href: "https://www.amazon.com/We-People-Say-Novelty-t-Shirt/dp/B0772TPH3H/",
            }}
          >
            {"Buy Now"}
          </Block>
        </Col>
      </Col>
    );
  }
}

render(<Main />, document.getElementById("root"));
