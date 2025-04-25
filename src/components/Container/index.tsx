import React from "react";
import './index.css'

type ContainerProps = {
    children: React.ReactNode
}
const Container = ({children}: ContainerProps) => {

    return (
        <div className="content">
            {children}
        </div>
    );
};

export default Container