import React from "react";
import './style.css'
import '../../index.css'

type ContainerProps = {
    children: React.ReactNode,
    style: {
        backgroundColor: string,
        color: string
    }
}
const Container = ({children, style}: ContainerProps) => {

    return (
        <div className="content" style = {style}>
            {children}
        </div>
    );
};

export default Container