import React, { ReactElement } from "react";
import Button from "../components/controls/Button";
import Title from "../components/typography/Title";
import styles from "./IndexPage.module.scss";

const IndexPage : React.FC = () : ReactElement => (
    <div className="container">
        <Title>Greyboard</Title>
        <div className="flex h h-center v-center">
            <Button primary size="big" to="/b/0000000000">Start with a fresh board</Button>
            <div className={styles.buttonDivider}>or</div>
            <Button size="big">Load an existing board</Button>
        </div>
    </div>
);
export default IndexPage;
