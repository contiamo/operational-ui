import Nodes from "../node";
import Link from "../link";
import { Scale, Object } from "../typings";
import * as d3 from "d3-selection";
export declare const sizeScale: (range: [number, number], data: Link[] | Nodes[]) => Scale;
export declare const filterByMatchers: (matchers: Object<any>) => (d: Nodes | Link) => boolean;
export declare const exitGroups: (groups: d3.Selection<any, Link, d3.BaseType, any> | d3.Selection<any, Nodes, d3.BaseType, any>) => void;
