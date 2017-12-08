/// <reference types="react" />
import TimelineItem from "./TimelineItem";
export interface IProps {
    id?: string | number;
    css?: {};
    className?: string;
    children: any;
}
declare const Timeline: (props: IProps) => JSX.Element;
export default Timeline;
export { Timeline, TimelineItem };
