import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export default {
    title: 'Menu/NavHeaderBreadCrums',
};

type BreadCrumProps = {
    // height?: number,
    // bgColor?: string,
    // bbColor?: string,
    // logo?: React.ReactNode
    // text?: React.ReactNode
}

export const NavHeaderBreadCrums: FunctionComponent<BreadCrumProps> = ({
    // height = 55,
    // bgColor = "yellow",
    // bbColor = "black",
    // logo = null,
    // text = null,
}) => {
    return (
        <header className="bg-white black-80 avenir">
            <nav className="mw10 bb b--silver ph2">
                <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">About</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/portfolio">Demo</a>
                {/* <a className="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/shop">Shop</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/about">About</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/contact">Contact</a> */}
            </nav>
        </header>
    );
};