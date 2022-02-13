import React, { ReactElement } from "react";
import { User } from "../../models/user";
import { abbreviate, className } from "../../utils/format";

import styles from "./Avatar.module.scss";
import Tooltip from "./Tooltip";

interface AvatarProps {
    user: User;
    local?: boolean;
}

const Avatar : React.FC<AvatarProps> = ({ user, local }) : ReactElement => (
    <div className={`${styles.avatar} ${className(local, styles.local)}`}>
        {abbreviate(user.name)}
        <Tooltip text={user.name} orientation="bottom" />
    </div>
);
Avatar.defaultProps = {
    local: false,
};
export default Avatar;
