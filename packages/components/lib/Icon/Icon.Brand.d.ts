/// <reference types="react" />
import { Props as IconProps } from "./Icon";
export declare type Props = Pick<IconProps, Exclude<keyof IconProps, "name">>;
export declare type BrandIconName = "OperationalUI" | "Pantheon" | "Labs" | "Contiamo";
export declare const OperationalUI: (props: Pick<IconProps, "color" | "size" | "colored" | "rotation">) => JSX.Element;
export declare const Contiamo: (props: Pick<IconProps, "color" | "size" | "colored" | "rotation">) => JSX.Element;
export declare const Labs: (props: Pick<IconProps, "color" | "size" | "colored" | "rotation">) => JSX.Element;
export declare const Pantheon: (props: Pick<IconProps, "color" | "size" | "colored" | "rotation">) => JSX.Element;
