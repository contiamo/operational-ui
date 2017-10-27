/// <reference types="react" />
import * as React from "react";
import TimelineItem from "./TimelineItem";
export interface IProps {
    style?: any;
    className?: string;
    children: any;
}
declare const Timeline: React.SFC<IProps>;
export default Timeline;
export { Timeline, TimelineItem };
