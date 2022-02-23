import React, { ReactElement } from "react";
import Button from "../components/controls/Button";
import Title from "../components/typography/Title";

const IndexPage : React.FC = () : ReactElement => (
    <div className="container">
        <Title>Greyboard</Title>
        <div className="flex h h-center v-center">
            <Button primary size="big" to="/b/0000000000">Start with a fresh board</Button>
            <div className="button-divider">or</div>
            <Button size="big">Load an existing board</Button>
        </div>
    </div>
);
export default IndexPage;
