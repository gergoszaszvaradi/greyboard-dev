import { mdiShare } from "@mdi/js";
import Icon from "@mdi/react";
import React, { ReactElement } from "react";
import User from "../models/user";
import { abbreviate } from "../utils/format";

import "./BoardUsers.scss";
import Tooltip from "./ui/Tooltip";

interface BoardUsersProps {
    users: User[],
}

const BoardUsers : React.FC<BoardUsersProps> = ({ users }) : ReactElement => {
    return (
        <div className="board-users">
            <div className="board-user-list">
                {users.map((user) => (
                    <div className="board-user">
                        {abbreviate(user.name)}
                        <Tooltip text={user.name} orientation="bottom" />
                    </div>
                ))}
            </div>
            <button type="button" className="board-share">
                <Icon path={mdiShare} size={0.9} />
                <Tooltip text="Share" orientation="bottom" />
            </button>
        </div>
    );
};
export default BoardUsers;
