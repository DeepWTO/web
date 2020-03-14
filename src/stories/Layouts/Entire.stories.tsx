import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { NavigationHeader, NavigationHeaderWithLogo, NavigationHeaderWithLogoWithoutBorderBottomLine } from './NavHeader.stories';
import { Article } from '../Articles/Article.stories'
import { ListOverflow, ListOverflowDS, ListOverflowArticle } from '../Menu/ListOverflow.stories'

export default {
    title: 'Layouts/Entire',
};

type EntireScreenProps = { components?: null | FunctionComponent<any>[] }

export const EntireScreen = ({ components = null }: EntireScreenProps) => {
    const div_cx = classNames('flex flex-column min-vh-100');
    return (
        <div className={div_cx}>
            {components ? components.map((Component, key: number) => (<Component key={key} />)) : null}
        </div>
    );
};

export const Entire = () => EntireScreen({ components: [NavigationHeaderWithLogoWithoutBorderBottomLine, ListOverflowDS, ListOverflowArticle, Article] });